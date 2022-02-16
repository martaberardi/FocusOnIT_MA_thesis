import {WordUI} from "../../store/dialogReducer";
import {PartOfSpeech} from "../../../models";

export const generateLemma = (word: WordUI) => {
  switch (word.part_of_speech as PartOfSpeech) {
    case PartOfSpeech.ADJECTIVE:
      return getAdjectiveLemma(word);
    case PartOfSpeech.NOUN:
      return getNounLemma(word);
    case PartOfSpeech.ARTICLE:
      return getArticleLemma(word);
    case PartOfSpeech.VERB:
    case PartOfSpeech.PREPOSITION_ARTICLE:
    default:
      return word.lemma

  }
};

const getAdjectiveLemma = (word: WordUI) => {
  if (typeof word.inflection === "string") {
    return word.inflection;
  }

  return word.lemma.endsWith('o') ? `${word.lemma}/-a/-i/-e` : `${word.lemma}/-i`
}

const getNounLemma = (word: WordUI) => {
  if (typeof word.inflection === "string") {
    return word.inflection;
  }

  switch (word.lemma[word.lemma.length - 1]) {
    case 'o':
      return `${word.lemma}/-i`;
    case 'a':
      return `${word.lemma}/-e`;
    case 'e':
      return `${word.lemma}/-i`;
    default:
      return `${word.lemma}`;
  }
};

const getArticleLemma = (word: WordUI) => (word.lemma === 'il' ? "il/lo/la/l' - i/gli/le" : "un/un'/uno/una");
