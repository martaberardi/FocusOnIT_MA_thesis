import {PartOfSpeech, Person, Phrase, Word} from "../../models";
import {WordStatus, WordUI} from "../store/dialogReducer";
import {wordHasGenderAndNumber, wordHasSameGenderAndNumber} from "./index";

export const initializeWord = (word: Word, phrase: Phrase): WordUI => {
  switch (word.part_of_speech as PartOfSpeech) {
    case PartOfSpeech.VERB:
      return initializeVerb(word, phrase);
    case PartOfSpeech.NOUN:
      return initializeNoun(word, phrase);
    case PartOfSpeech.ARTICLE:
      return initializeArticle(word, phrase);
    case PartOfSpeech.ADJECTIVE:
      return initializeAdjective(word, phrase);
    case PartOfSpeech.PREPOSITION_ARTICLE:
      return initializePrepositionArticle(word, phrase);
    default:
      return {...word, status: 'Unblankable', additionalHead: new Set(), phraseId: phrase.id};
  }
}

const initializeVerb = (word: Word, phrase: Phrase): WordUI => {
  let status: WordStatus = 'ToBeFilled';
  const additionalHeads = new Set<string>();

  if (word.features?.mode !== 'i' || word.features?.tense !== 'p') {
    status = 'Unblankable'
  } else {
    additionalHeads.add(word.id);

    phrase.words.forEach((w) => {
      if (w.id === word.head && w.part_of_speech === PartOfSpeech.VERB && w.features?.mode === 'p') {
        status = 'Unblankable';
      } else if (w.head === word.id && w.dependency_relation === 'subj' && (w.part_of_speech === PartOfSpeech.NOUN || w.part_of_speech2 === 'PE')) {
        additionalHeads.add(w.id);
      }
    });
  }
  return {...word, additionalHead: additionalHeads, status, phraseId: phrase.id};
}

const initializeNoun = (word: Word, phrase: Phrase): WordUI => {
  let status: WordStatus = 'ToBeFilled';
  let head = word.head;
  const additionalHead = new Set<string>();

  if (word.part_of_speech2 === 'SP') {
    status = 'Unblankable'
  } else {

    phrase.words.forEach((w) => {
      if (w.id === word.head && !wordHasGenderAndNumber(w)) {
        const w2 = phrase.words.find((analysedWord) => analysedWord.head === word.id && wordHasSameGenderAndNumber(word, analysedWord));
        if (w2) {
          head = w2.id;
        } else {
          status = 'Unblankable';
        }
      }
      phrase.words.forEach((analysedWord) => {
        if (analysedWord.head === word.id && wordHasGenderAndNumber(analysedWord) && wordHasSameGenderAndNumber(word, analysedWord)) {
          additionalHead.add(analysedWord.id);
        }
      });
    });
  }
  return {...word, head, status, additionalHead, phraseId: phrase.id};
}

const initializeArticle = (word: Word, phrase: Phrase): WordUI => {
  //article points to its following word (can be a noun, can be an adj)
  //phrase --> word.id --> index
  // word index + 1 = next word index
  //head = next word id

  const currentWordIndex = phrase.words.findIndex((cw: Word) => cw.id === word.id);
  const followingWordIndex = currentWordIndex + 1;
  const followingWord = phrase.words[followingWordIndex];

  return ({
    ...word,
    head: followingWord.id,
    status: 'ToBeFilled',
    additionalHead: new Set(),
    phraseId: phrase.id
  })
}

const initializeAdjective = (word: Word, phrase: Phrase): WordUI => {
  let head = word.head;

  phrase.words.forEach((headWord: Word) => {
    if (headWord.id === word.head) {
      if (!isSpeakerToBeHighlightedForAdjectives(word, headWord, phrase) && !wordHasGenderAndNumber(headWord)) {
        if (headWord.lemma === "essere") {
          const subj = phrase.words.find((w) => w.dependency_relation === "subj" && w.head === headWord.id);
          head = (subj || word).id
        } else {
          head = word.id
        }
      }
    }
  });

  return ({...word, status: 'ToBeFilled', additionalHead: new Set(), head, phraseId: phrase.id})
}

const initializePrepositionArticle = (word: Word, phrase: Phrase): WordUI =>
  ({...word, status: 'ToBeFilled', additionalHead: new Set(), phraseId: phrase.id})

export const isSpeakerToBeHighlightedForAdjectives = (word: Word, headWord: Word, phrase: Phrase) =>
  (word.part_of_speech === PartOfSpeech.ADJECTIVE
    && headWord?.lemma === "essere"
    && headWord.features?.person === Person.FIRST
    && word.features?.gender === phrase.speaker.gender
    && word.features.number === phrase.speaker.number)


export const isSpeakerToBeHighlightedForVerb = (word: Word, phrase: Phrase) =>
  (word.part_of_speech === PartOfSpeech.VERB
    && word.features?.person === Person.FIRST
    && word.features?.number === phrase.speaker.number
    && (phrase.words.findIndex(w => w.form.toLowerCase() === "io") === -1)
  )

export const wordUIToWord: (word: WordUI) => Word = (word) => {
  const {
    id,
    part_of_speech,
    features,
    lemma,
    head,
    form,
    dependency_relation,
    part_of_speech2,
    position,
    inflection
  } = word;

  const newWord: Word = {
    id,
    part_of_speech,
    features,
    lemma,
    head,
    form,
    inflection,
    dependency_relation,
    part_of_speech2,
    position,
  };

  return newWord;
}

export const isAlphanumeric = (s: string): boolean =>
  new RegExp(/[a-zA-Z0-9èéòùàìÈ\s]+/).test(s);
