import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PartOfSpeech {
  VERB = "VERB",
  NOUN = "NOUN",
  ARTICLE = "ARTICLE",
  ADJECTIVE = "ADJECTIVE",
  PREPOSITION_ARTICLE = "PREPOSITION_ARTICLE"
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum Person {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD"
}

export enum WordNumber {
  SINGULAR = "SINGULAR",
  PLURAL = "PLURAL"
}

export enum PhraseStatus {
  TO_COMPLETE = "TO_COMPLETE",
  COMPLETED = "COMPLETED",
  UNNECESSARY = "UNNECESSARY"
}

export enum Topic {
  CIBO = "CIBO",
  MEZZI = "MEZZI",
  LAVORO = "LAVORO",
  APPUNTAMENTO = "APPUNTAMENTO",
  INFORMAZIONI_PERSONALI = "INFORMAZIONI_PERSONALI",
  DOTTORE = "DOTTORE",
  SPESA = "SPESA",
  DESCRIZIONE_FISICA = "DESCRIZIONE_FISICA",
  EMOZIONI_E_SALUTE = "EMOZIONI_E_SALUTE",
  MERCATO = "MERCATO",
  TEMPO_LIBERO = "TEMPO_LIBERO"
}

export declare class ButtonClick {
  readonly isoDateTime: string;
  readonly userInput: string;
  constructor(init: ModelInit<ButtonClick>);
}

export declare class WordStats {
  readonly firstHintShowed: boolean;
  readonly secondHintShowed: boolean;
  readonly answerShowed: boolean;
  readonly word: Word;
  readonly buttonClicks: ButtonClick[];
  readonly wordId: string;
  readonly phraseId: string;
  constructor(init: ModelInit<WordStats>);
}

export declare class Word {
  readonly id: string;
  readonly position: number;
  readonly lemma: string;
  readonly part_of_speech?: PartOfSpeech | keyof typeof PartOfSpeech;
  readonly part_of_speech2: string;
  readonly head?: string;
  readonly dependency_relation: string;
  readonly features?: WordFeatures;
  readonly form: string;
  readonly inflection?: string;
  constructor(init: ModelInit<Word>);
}

export declare class WordFeatures {
  readonly gender?: Gender | keyof typeof Gender;
  readonly person?: Person | keyof typeof Person;
  readonly mode?: string;
  readonly tense?: string;
  readonly number?: WordNumber | keyof typeof WordNumber;
  constructor(init: ModelInit<WordFeatures>);
}

export declare class Speaker {
  readonly name: string;
  readonly gender: Gender | keyof typeof Gender;
  readonly number: WordNumber | keyof typeof WordNumber;
  constructor(init: ModelInit<Speaker>);
}

export declare class Phrase {
  readonly id: string;
  readonly words: Word[];
  readonly speaker: Speaker;
  readonly status?: PhraseStatus | keyof typeof PhraseStatus;
  constructor(init: ModelInit<Phrase>);
}

type AnalyticsDataMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type StatsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DialogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class AnalyticsData {
  readonly id: string;
  readonly event: string;
  readonly attributes?: string;
  readonly userID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<AnalyticsData, AnalyticsDataMetaData>);
  static copyOf(source: AnalyticsData, mutator: (draft: MutableModel<AnalyticsData, AnalyticsDataMetaData>) => MutableModel<AnalyticsData, AnalyticsDataMetaData> | void): AnalyticsData;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly Stats?: (Stats | null)[];
  readonly cognitoId: string;
  readonly AnalyticsData?: (AnalyticsData | null)[];
  readonly userPageViews?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Stats {
  readonly id: string;
  readonly userID?: string;
  readonly pos: PartOfSpeech | keyof typeof PartOfSpeech;
  readonly dialogId: string;
  readonly wordsStats: WordStats[];
  readonly savedAt?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Stats, StatsMetaData>);
  static copyOf(source: Stats, mutator: (draft: MutableModel<Stats, StatsMetaData>) => MutableModel<Stats, StatsMetaData> | void): Stats;
}

export declare class Dialog {
  readonly id: string;
  readonly phrases: Phrase[];
  readonly videoUrl: string;
  readonly title: string;
  readonly topic: Topic | keyof typeof Topic;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Dialog, DialogMetaData>);
  static copyOf(source: Dialog, mutator: (draft: MutableModel<Dialog, DialogMetaData>) => MutableModel<Dialog, DialogMetaData> | void): Dialog;
}