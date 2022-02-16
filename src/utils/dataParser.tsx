import {Gender, PartOfSpeech, Person, WordNumber} from '../../models';

export const convertGenderInItalian = (gender: Gender) => {
  switch (gender) {
    case Gender.MALE:
      return 'maschile';
    case Gender.FEMALE:
      return 'femminile';
  }
};

export const convertGenderToSymbol = (gender: Gender) => {
  switch (gender) {
    case Gender.MALE:
      return <b style={{color: 'blue'}}>&#x2642;</b>;
    case Gender.FEMALE:
      return <b style={{color: 'purple'}}>&#x2640;</b>;
  }
};

export const convertNumberInItalian = (number: WordNumber) => {
  switch (number) {
    case WordNumber.SINGULAR:
      return 'singolare';
    case WordNumber.PLURAL:
      return 'plurale';
  }
};

export const convertPersonInItalian = (person: Person): string => {
  switch (person) {
    case Person.FIRST: {
      return "prima persona";
    }
    case Person.SECOND: {
      return "seconda persona";
    }
    case Person.THIRD: {
      return "terza persona";
    }
  }
}

const getPersonalPronouns = (person: Person, number: WordNumber): string => {
  if (number === WordNumber.SINGULAR) {
    switch (person) {
      case Person.FIRST:
        return "io"
      case Person.SECOND:
        return "tu"
      case Person.THIRD:
        return "lui/lei/Lei"
    }
  } else {
    switch (person) {
      case Person.FIRST:
        return "noi"
      case Person.SECOND:
        return "voi"
      case Person.THIRD:
        return "loro"
    }
  }
}

export const convertPersonAndNumberInItalian = (person: Person, number: WordNumber): string => {
  return `${convertPersonInItalian(person)} ${convertNumberInItalian(number)} (${getPersonalPronouns(person, number)})`
};

export const convertNumberToSymbol = (number: WordNumber) => {
  switch (number) {
    case WordNumber.SINGULAR:
      return <b>&#128100;</b>;
    case WordNumber.PLURAL:
      return <b>&#128101;</b>;
  }
};

export const convertPOSInItalian = (pos: PartOfSpeech): string => {
  switch (pos) {
    case PartOfSpeech.VERB:
      return "verbo"
    case PartOfSpeech.NOUN:
      return "nome"
    case PartOfSpeech.ARTICLE:
      return "articolo"
    case PartOfSpeech.ADJECTIVE:
      return "aggettivo"
    default:
      throw Error(`${pos} not handled in convertPOSInItalian`);
  }
}
