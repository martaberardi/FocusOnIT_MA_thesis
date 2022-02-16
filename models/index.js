// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PartOfSpeech = {
  "VERB": "VERB",
  "NOUN": "NOUN",
  "ARTICLE": "ARTICLE",
  "ADJECTIVE": "ADJECTIVE",
  "PREPOSITION_ARTICLE": "PREPOSITION_ARTICLE"
};

const Gender = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const Person = {
  "FIRST": "FIRST",
  "SECOND": "SECOND",
  "THIRD": "THIRD"
};

const WordNumber = {
  "SINGULAR": "SINGULAR",
  "PLURAL": "PLURAL"
};

const PhraseStatus = {
  "TO_COMPLETE": "TO_COMPLETE",
  "COMPLETED": "COMPLETED",
  "UNNECESSARY": "UNNECESSARY"
};

const Topic = {
  "CIBO": "CIBO",
  "MEZZI": "MEZZI",
  "LAVORO": "LAVORO",
  "APPUNTAMENTO": "APPUNTAMENTO",
  "INFORMAZIONI_PERSONALI": "INFORMAZIONI_PERSONALI",
  "DOTTORE": "DOTTORE",
  "SPESA": "SPESA",
  "DESCRIZIONE_FISICA": "DESCRIZIONE_FISICA",
  "EMOZIONI_E_SALUTE": "EMOZIONI_E_SALUTE",
  "MERCATO": "MERCATO",
  "TEMPO_LIBERO": "TEMPO_LIBERO"
};

const { AnalyticsData, User, Stats, Dialog, ButtonClick, WordStats, Word, WordFeatures, Speaker, Phrase } = initSchema(schema);

export {
  AnalyticsData,
  User,
  Stats,
  Dialog,
  PartOfSpeech,
  Gender,
  Person,
  WordNumber,
  PhraseStatus,
  Topic,
  ButtonClick,
  WordStats,
  Word,
  WordFeatures,
  Speaker,
  Phrase
};