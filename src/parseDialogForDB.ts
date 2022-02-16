import {v4 as uuidv4} from 'uuid';
import {
  Dialog,
  Gender,
  PartOfSpeech,
  Person,
  Phrase,
  Speaker,
  Topic,
  Word,
  WordFeatures,
  WordNumber,
} from '../models';

const parseDialogForDB = (title: string, topic: Topic, videoUrl: string, rawData: string): Dialog => {
  const dialog: Dialog = {
    id: uuidv4(),
    phrases: [],
    title,
    videoUrl,
    topic,
  };
  let tempWords: TempWord[] = [];
  let rawSpeaker = '';

  const lines = rawData.split(/\r?\n/); // array of lines
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.startsWith('SPEAKER')) {
      rawSpeaker = line;
      continue;
    }

    const splitLine = line.trim().split('\t');

    if (splitLine.length > 1) {
      const featuresDictionary = rawFeatureToDictionary(splitLine[5]);
      const partOfSpeech: PartOfSpeech | undefined = partOfSpeechParser(splitLine[3]);

      try {
        const features = partOfSpeech && Object.keys(featuresDictionary).length > 0
          ? generateFeatures(featuresDictionary, partOfSpeech)
          : undefined;
        const word: TempWord = {
          id: uuidv4(),
          position: Number(splitLine[0]),
          form: splitLine[1],
          lemma: splitLine[2],
          part_of_speech: partOfSpeech,
          part_of_speech2: splitLine[4],
          head: headStringToNumber(splitLine[6]),
          dependency_relation: splitLine[7],
          features,
          inflection: splitLine.length > 8 ? splitLine[8] : undefined,
        };
        tempWords.push(word);
      } catch (e) {
        console.error(`Failed trying to parse: ${line}`);
        console.error('Probably an invalid feature.');
        console.error('Error: ', e);
      }
    } else {
      const phrase: Phrase = {
        id: uuidv4(),
        words: tempWordsToWords(tempWords),
        speaker: speakerParser(rawSpeaker),
      };
      rawSpeaker = '';

      dialog.phrases.push(phrase);
      tempWords = [];
    }
  }

  if (tempWords.length > 0) {
    const phrase: Phrase = {
      id: uuidv4(),
      words: tempWordsToWords(tempWords),
      speaker: speakerParser(rawSpeaker),
    };
    rawSpeaker = '';
    dialog.phrases.push(phrase);
  }

  return dialog;
};

function speakerParser(rawSpeaker: string): Speaker {
  const speakerArray = rawSpeaker.split('|');
  const speaker: Speaker = {
    name: speakerArray[1],
    gender: genderParser(speakerArray[2]),
    number: numberParser(speakerArray[3]),
  };
  return speaker;
}

function genderParser(rawGender: string): Gender {
  switch (rawGender) {
    case 'f': {
      return Gender.FEMALE;
    }
    case 'm': {
      return Gender.MALE;
    }
    default: {
      console.warn(`Invalid gender: genderParser(${rawGender})`);
      // throw `Unexpected gender value: ${rawGender}`;
      return Gender.MALE;
    }
  }
}

function personParser(rawPerson: string): Person {
  switch (rawPerson) {
    case '1': {
      return Person.FIRST;
    }
    case '2': {
      return Person.SECOND;
    }
    case '3': {
      return Person.THIRD;
    }
    default: {
      console.warn(`Invalid person: personParser(${rawPerson})`);
      // throw `Unexpected person value: ${rawPerson}`;
      return Person.FIRST;
    }
  }
}

function numberParser(rawNumber: string): WordNumber {
  switch (rawNumber) {
    case 's': {
      return WordNumber.SINGULAR;
    }
    case 'p': {
      return WordNumber.PLURAL;
    }
    default: {
      console.warn(`Error is coming from: numberParser(${rawNumber})`);
      // throw `Unexpected number value: ${rawNumber}`;
      return WordNumber.SINGULAR;
    }
  }
}

function partOfSpeechParser(rawPOS: string): PartOfSpeech | undefined {
  switch (rawPOS) {
    case 'V': {
      return PartOfSpeech.VERB;
    }
    case 'A': {
      return PartOfSpeech.ADJECTIVE;
    }
    case 'S': {
      return PartOfSpeech.NOUN;
    }
    case 'R': {
      return PartOfSpeech.ARTICLE;
    }
    case 'E': {
      return PartOfSpeech.PREPOSITION_ARTICLE;
    }
    default: {
      return undefined;
    }
  }
}

function rawFeatureToDictionary(rawFeature: string): FeatureDictionary {
  return rawFeature
    .trim()
    .split('|')
    .reduce((result, currentKeyValue) => {
      const [key, value] = currentKeyValue.split('=').map((s) => s.trim());
      return {...result, [key]: value};
    }, {});
}

function generateFeatures(features: FeatureDictionary, partOfSpeech: PartOfSpeech): WordFeatures | undefined {
  try {
    const number = features.num ? numberParser(features.num) : undefined;
    const gender = features.gen ? genderParser(features.gen) : undefined;
    const person = features.per ? personParser(features.per) : undefined;
    const mode = features.mod || undefined;
    const tense = features.ten || undefined;

    switch (partOfSpeech) {
      case PartOfSpeech.ARTICLE: {
        return {
          number,
          gender,
        };
      }
      case PartOfSpeech.NOUN: {
        return {number, gender};
      }
      case PartOfSpeech.ADJECTIVE: {
        return {number, gender};
      }
      case PartOfSpeech.VERB: {
        return {
          number,
          person,
          mode,
          tense,
        };
      }
      case PartOfSpeech.PREPOSITION_ARTICLE: {
        return {number, gender};
      }
      default: {
        return undefined;
      }
    }
  } catch (e) {
    console.error(e);
  }
  return undefined;
}

function headStringToNumber(head: string) {
  const number = Number(head);

  return number > 0 ? number - 1 : undefined;
}

function tempWordsToWords(tempWords: TempWord[]): Word[] {
  const words: Word[] = [];
  for (let i = 0; i < tempWords.length; i += 1) {
    const tempWord = tempWords[i];
    const word: Word = {
      ...tempWord,
      head: typeof tempWord.head === 'undefined' ? undefined : tempWords[tempWord.head].id,
    };
    words.push(word);
  }

  return words;
}

export default parseDialogForDB;

interface TempWord {
  readonly id: string
  readonly form: string;
  readonly position: number;
  readonly lemma: string;
  // eslint-disable-next-line camelcase
  readonly part_of_speech?: PartOfSpeech | keyof typeof PartOfSpeech;
  // eslint-disable-next-line camelcase
  readonly part_of_speech2: string;
  head?: number;
  // eslint-disable-next-line camelcase
  readonly dependency_relation: string;
  readonly features?: WordFeatures;
  readonly inflection?: string;
}
