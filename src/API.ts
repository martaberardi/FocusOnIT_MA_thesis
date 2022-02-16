/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAnalyticsDataInput = {
  id?: string | null,
  event: string,
  attributes?: string | null,
  userID: string,
  _version?: number | null,
};

export type ModelAnalyticsDataConditionInput = {
  event?: ModelStringInput | null,
  attributes?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelAnalyticsDataConditionInput | null > | null,
  or?: Array< ModelAnalyticsDataConditionInput | null > | null,
  not?: ModelAnalyticsDataConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type AnalyticsData = {
  __typename: "AnalyticsData",
  id: string,
  event: string,
  attributes?: string | null,
  userID: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateAnalyticsDataInput = {
  id: string,
  event?: string | null,
  attributes?: string | null,
  userID?: string | null,
  _version?: number | null,
};

export type DeleteAnalyticsDataInput = {
  id: string,
  _version?: number | null,
};

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  cognitoId: string,
  userPageViews?: number | null,
  _version?: number | null,
};

export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  cognitoId?: ModelStringInput | null,
  userPageViews?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  Stats?: ModelStatsConnection | null,
  cognitoId: string,
  AnalyticsData?: ModelAnalyticsDataConnection | null,
  userPageViews?: number | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type ModelStatsConnection = {
  __typename: "ModelStatsConnection",
  items:  Array<Stats | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type Stats = {
  __typename: "Stats",
  id: string,
  userID?: string | null,
  pos: PartOfSpeech,
  dialogId: string,
  wordsStats:  Array<WordStats >,
  savedAt?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export enum PartOfSpeech {
  VERB = "VERB",
  NOUN = "NOUN",
  ARTICLE = "ARTICLE",
  ADJECTIVE = "ADJECTIVE",
  PREPOSITION_ARTICLE = "PREPOSITION_ARTICLE",
}


export type WordStats = {
  __typename: "WordStats",
  firstHintShowed: boolean,
  secondHintShowed: boolean,
  answerShowed: boolean,
  word: Word,
  buttonClicks:  Array<ButtonClick >,
  wordId: string,
  phraseId: string,
};

export type Word = {
  __typename: "Word",
  id: string,
  position: number,
  lemma: string,
  part_of_speech?: PartOfSpeech | null,
  part_of_speech2: string,
  head?: string | null,
  dependency_relation: string,
  features?: WordFeatures | null,
  form: string,
  inflection?: string | null,
};

export type WordFeatures = {
  __typename: "WordFeatures",
  gender?: Gender | null,
  person?: Person | null,
  mode?: string | null,
  tense?: string | null,
  number?: WordNumber | null,
};

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}


export enum Person {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}


export enum WordNumber {
  SINGULAR = "SINGULAR",
  PLURAL = "PLURAL",
}


export type ButtonClick = {
  __typename: "ButtonClick",
  isoDateTime: string,
  userInput: string,
};

export type ModelAnalyticsDataConnection = {
  __typename: "ModelAnalyticsDataConnection",
  items:  Array<AnalyticsData | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  cognitoId?: string | null,
  userPageViews?: number | null,
  _version?: number | null,
};

export type DeleteUserInput = {
  id: string,
  _version?: number | null,
};

export type CreateStatsInput = {
  id?: string | null,
  userID?: string | null,
  pos: PartOfSpeech,
  dialogId: string,
  wordsStats: Array< WordStatsInput >,
  savedAt?: string | null,
  _version?: number | null,
};

export type WordStatsInput = {
  firstHintShowed: boolean,
  secondHintShowed: boolean,
  answerShowed: boolean,
  word: WordInput,
  buttonClicks: Array< ButtonClickInput >,
  wordId: string,
  phraseId: string,
};

export type WordInput = {
  id?: string | null,
  position: number,
  lemma: string,
  part_of_speech?: PartOfSpeech | null,
  part_of_speech2: string,
  head?: string | null,
  dependency_relation: string,
  features?: WordFeaturesInput | null,
  form: string,
  inflection?: string | null,
};

export type WordFeaturesInput = {
  gender?: Gender | null,
  person?: Person | null,
  mode?: string | null,
  tense?: string | null,
  number?: WordNumber | null,
};

export type ButtonClickInput = {
  isoDateTime: string,
  userInput: string,
};

export type ModelStatsConditionInput = {
  userID?: ModelIDInput | null,
  pos?: ModelPartOfSpeechInput | null,
  dialogId?: ModelIDInput | null,
  savedAt?: ModelStringInput | null,
  and?: Array< ModelStatsConditionInput | null > | null,
  or?: Array< ModelStatsConditionInput | null > | null,
  not?: ModelStatsConditionInput | null,
};

export type ModelPartOfSpeechInput = {
  eq?: PartOfSpeech | null,
  ne?: PartOfSpeech | null,
};

export type UpdateStatsInput = {
  id: string,
  userID?: string | null,
  pos?: PartOfSpeech | null,
  dialogId?: string | null,
  wordsStats?: Array< WordStatsInput > | null,
  savedAt?: string | null,
  _version?: number | null,
};

export type DeleteStatsInput = {
  id: string,
  _version?: number | null,
};

export type CreateDialogInput = {
  id?: string | null,
  phrases: Array< PhraseInput >,
  videoUrl: string,
  title: string,
  topic: Topic,
  _version?: number | null,
};

export type PhraseInput = {
  id?: string | null,
  words: Array< WordInput >,
  speaker: SpeakerInput,
  status?: PhraseStatus | null,
};

export type SpeakerInput = {
  name: string,
  gender: Gender,
  number: WordNumber,
};

export enum PhraseStatus {
  TO_COMPLETE = "TO_COMPLETE",
  COMPLETED = "COMPLETED",
  UNNECESSARY = "UNNECESSARY",
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
  TEMPO_LIBERO = "TEMPO_LIBERO",
}


export type ModelDialogConditionInput = {
  videoUrl?: ModelStringInput | null,
  title?: ModelStringInput | null,
  topic?: ModelTopicInput | null,
  and?: Array< ModelDialogConditionInput | null > | null,
  or?: Array< ModelDialogConditionInput | null > | null,
  not?: ModelDialogConditionInput | null,
};

export type ModelTopicInput = {
  eq?: Topic | null,
  ne?: Topic | null,
};

export type Dialog = {
  __typename: "Dialog",
  id: string,
  phrases:  Array<Phrase >,
  videoUrl: string,
  title: string,
  topic: Topic,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type Phrase = {
  __typename: "Phrase",
  id: string,
  words:  Array<Word >,
  speaker: Speaker,
  status?: PhraseStatus | null,
};

export type Speaker = {
  __typename: "Speaker",
  name: string,
  gender: Gender,
  number: WordNumber,
};

export type UpdateDialogInput = {
  id: string,
  phrases?: Array< PhraseInput > | null,
  videoUrl?: string | null,
  title?: string | null,
  topic?: Topic | null,
  _version?: number | null,
};

export type DeleteDialogInput = {
  id: string,
  _version?: number | null,
};

export type ModelAnalyticsDataFilterInput = {
  id?: ModelIDInput | null,
  event?: ModelStringInput | null,
  attributes?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelAnalyticsDataFilterInput | null > | null,
  or?: Array< ModelAnalyticsDataFilterInput | null > | null,
  not?: ModelAnalyticsDataFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  cognitoId?: ModelStringInput | null,
  userPageViews?: ModelIntInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStatsFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  pos?: ModelPartOfSpeechInput | null,
  dialogId?: ModelIDInput | null,
  savedAt?: ModelStringInput | null,
  and?: Array< ModelStatsFilterInput | null > | null,
  or?: Array< ModelStatsFilterInput | null > | null,
  not?: ModelStatsFilterInput | null,
};

export type ModelDialogFilterInput = {
  id?: ModelIDInput | null,
  videoUrl?: ModelStringInput | null,
  title?: ModelStringInput | null,
  topic?: ModelTopicInput | null,
  and?: Array< ModelDialogFilterInput | null > | null,
  or?: Array< ModelDialogFilterInput | null > | null,
  not?: ModelDialogFilterInput | null,
};

export type ModelDialogConnection = {
  __typename: "ModelDialogConnection",
  items:  Array<Dialog | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateAnalyticsDataMutationVariables = {
  input: CreateAnalyticsDataInput,
  condition?: ModelAnalyticsDataConditionInput | null,
};

export type CreateAnalyticsDataMutation = {
  createAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateAnalyticsDataMutationVariables = {
  input: UpdateAnalyticsDataInput,
  condition?: ModelAnalyticsDataConditionInput | null,
};

export type UpdateAnalyticsDataMutation = {
  updateAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteAnalyticsDataMutationVariables = {
  input: DeleteAnalyticsDataInput,
  condition?: ModelAnalyticsDataConditionInput | null,
};

export type DeleteAnalyticsDataMutation = {
  deleteAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateStatsMutationVariables = {
  input: CreateStatsInput,
  condition?: ModelStatsConditionInput | null,
};

export type CreateStatsMutation = {
  createStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateStatsMutationVariables = {
  input: UpdateStatsInput,
  condition?: ModelStatsConditionInput | null,
};

export type UpdateStatsMutation = {
  updateStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteStatsMutationVariables = {
  input: DeleteStatsInput,
  condition?: ModelStatsConditionInput | null,
};

export type DeleteStatsMutation = {
  deleteStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateDialogMutationVariables = {
  input: CreateDialogInput,
  condition?: ModelDialogConditionInput | null,
};

export type CreateDialogMutation = {
  createDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateDialogMutationVariables = {
  input: UpdateDialogInput,
  condition?: ModelDialogConditionInput | null,
};

export type UpdateDialogMutation = {
  updateDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteDialogMutationVariables = {
  input: DeleteDialogInput,
  condition?: ModelDialogConditionInput | null,
};

export type DeleteDialogMutation = {
  deleteDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetAnalyticsDataQueryVariables = {
  id: string,
};

export type GetAnalyticsDataQuery = {
  getAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListAnalyticsDataQueryVariables = {
  filter?: ModelAnalyticsDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAnalyticsDataQuery = {
  listAnalyticsData?:  {
    __typename: "ModelAnalyticsDataConnection",
    items:  Array< {
      __typename: "AnalyticsData",
      id: string,
      event: string,
      attributes?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAnalyticsDataQueryVariables = {
  filter?: ModelAnalyticsDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAnalyticsDataQuery = {
  syncAnalyticsData?:  {
    __typename: "ModelAnalyticsDataConnection",
    items:  Array< {
      __typename: "AnalyticsData",
      id: string,
      event: string,
      attributes?: string | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      Stats?:  {
        __typename: "ModelStatsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      cognitoId: string,
      AnalyticsData?:  {
        __typename: "ModelAnalyticsDataConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      userPageViews?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUsersQuery = {
  syncUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      Stats?:  {
        __typename: "ModelStatsConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      cognitoId: string,
      AnalyticsData?:  {
        __typename: "ModelAnalyticsDataConnection",
        nextToken?: string | null,
        startedAt?: number | null,
      } | null,
      userPageViews?: number | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetStatsQueryVariables = {
  id: string,
};

export type GetStatsQuery = {
  getStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListStatsQueryVariables = {
  filter?: ModelStatsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStatsQuery = {
  listStats?:  {
    __typename: "ModelStatsConnection",
    items:  Array< {
      __typename: "Stats",
      id: string,
      userID?: string | null,
      pos: PartOfSpeech,
      dialogId: string,
      wordsStats:  Array< {
        __typename: "WordStats",
        firstHintShowed: boolean,
        secondHintShowed: boolean,
        answerShowed: boolean,
        wordId: string,
        phraseId: string,
      } >,
      savedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncStatsQueryVariables = {
  filter?: ModelStatsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncStatsQuery = {
  syncStats?:  {
    __typename: "ModelStatsConnection",
    items:  Array< {
      __typename: "Stats",
      id: string,
      userID?: string | null,
      pos: PartOfSpeech,
      dialogId: string,
      wordsStats:  Array< {
        __typename: "WordStats",
        firstHintShowed: boolean,
        secondHintShowed: boolean,
        answerShowed: boolean,
        wordId: string,
        phraseId: string,
      } >,
      savedAt?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetDialogQueryVariables = {
  id: string,
};

export type GetDialogQuery = {
  getDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListDialogsQueryVariables = {
  filter?: ModelDialogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDialogsQuery = {
  listDialogs?:  {
    __typename: "ModelDialogConnection",
    items:  Array< {
      __typename: "Dialog",
      id: string,
      phrases:  Array< {
        __typename: "Phrase",
        id: string,
        status?: PhraseStatus | null,
      } >,
      videoUrl: string,
      title: string,
      topic: Topic,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncDialogsQueryVariables = {
  filter?: ModelDialogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncDialogsQuery = {
  syncDialogs?:  {
    __typename: "ModelDialogConnection",
    items:  Array< {
      __typename: "Dialog",
      id: string,
      phrases:  Array< {
        __typename: "Phrase",
        id: string,
        status?: PhraseStatus | null,
      } >,
      videoUrl: string,
      title: string,
      topic: Topic,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateAnalyticsDataSubscription = {
  onCreateAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateAnalyticsDataSubscription = {
  onUpdateAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteAnalyticsDataSubscription = {
  onDeleteAnalyticsData?:  {
    __typename: "AnalyticsData",
    id: string,
    event: string,
    attributes?: string | null,
    userID: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    Stats?:  {
      __typename: "ModelStatsConnection",
      items:  Array< {
        __typename: "Stats",
        id: string,
        userID?: string | null,
        pos: PartOfSpeech,
        dialogId: string,
        savedAt?: string | null,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    cognitoId: string,
    AnalyticsData?:  {
      __typename: "ModelAnalyticsDataConnection",
      items:  Array< {
        __typename: "AnalyticsData",
        id: string,
        event: string,
        attributes?: string | null,
        userID: string,
        createdAt: string,
        updatedAt: string,
        _version: number,
        _deleted?: boolean | null,
        _lastChangedAt: number,
      } | null >,
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    userPageViews?: number | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateStatsSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateStatsSubscription = {
  onCreateStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateStatsSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateStatsSubscription = {
  onUpdateStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteStatsSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteStatsSubscription = {
  onDeleteStats?:  {
    __typename: "Stats",
    id: string,
    userID?: string | null,
    pos: PartOfSpeech,
    dialogId: string,
    wordsStats:  Array< {
      __typename: "WordStats",
      firstHintShowed: boolean,
      secondHintShowed: boolean,
      answerShowed: boolean,
      word:  {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      },
      buttonClicks:  Array< {
        __typename: "ButtonClick",
        isoDateTime: string,
        userInput: string,
      } >,
      wordId: string,
      phraseId: string,
    } >,
    savedAt?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateDialogSubscription = {
  onCreateDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateDialogSubscription = {
  onUpdateDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteDialogSubscription = {
  onDeleteDialog?:  {
    __typename: "Dialog",
    id: string,
    phrases:  Array< {
      __typename: "Phrase",
      id: string,
      words:  Array< {
        __typename: "Word",
        id: string,
        position: number,
        lemma: string,
        part_of_speech?: PartOfSpeech | null,
        part_of_speech2: string,
        head?: string | null,
        dependency_relation: string,
        form: string,
        inflection?: string | null,
      } >,
      speaker:  {
        __typename: "Speaker",
        name: string,
        gender: Gender,
        number: WordNumber,
      },
      status?: PhraseStatus | null,
    } >,
    videoUrl: string,
    title: string,
    topic: Topic,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
