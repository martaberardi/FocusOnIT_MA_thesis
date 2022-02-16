/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAnalyticsData = /* GraphQL */ `
  query GetAnalyticsData($id: ID!) {
    getAnalyticsData(id: $id) {
      id
      event
      attributes
      userID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listAnalyticsData = /* GraphQL */ `
  query ListAnalyticsData(
    $filter: ModelAnalyticsDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnalyticsData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        event
        attributes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAnalyticsData = /* GraphQL */ `
  query SyncAnalyticsData(
    $filter: ModelAnalyticsDataFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAnalyticsData(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        event
        attributes
        userID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      Stats {
        items {
          id
          userID
          pos
          dialogId
          savedAt
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          owner
        }
        nextToken
        startedAt
      }
      cognitoId
      AnalyticsData {
        items {
          id
          event
          attributes
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      userPageViews
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        Stats {
          nextToken
          startedAt
        }
        cognitoId
        AnalyticsData {
          nextToken
          startedAt
        }
        userPageViews
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        Stats {
          nextToken
          startedAt
        }
        cognitoId
        AnalyticsData {
          nextToken
          startedAt
        }
        userPageViews
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getStats = /* GraphQL */ `
  query GetStats($id: ID!) {
    getStats(id: $id) {
      id
      userID
      pos
      dialogId
      wordsStats {
        firstHintShowed
        secondHintShowed
        answerShowed
        word {
          id
          position
          lemma
          part_of_speech
          part_of_speech2
          head
          dependency_relation
          form
          inflection
        }
        buttonClicks {
          isoDateTime
          userInput
        }
        wordId
        phraseId
      }
      savedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listStats = /* GraphQL */ `
  query ListStats(
    $filter: ModelStatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        pos
        dialogId
        wordsStats {
          firstHintShowed
          secondHintShowed
          answerShowed
          wordId
          phraseId
        }
        savedAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStats = /* GraphQL */ `
  query SyncStats(
    $filter: ModelStatsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStats(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        userID
        pos
        dialogId
        wordsStats {
          firstHintShowed
          secondHintShowed
          answerShowed
          wordId
          phraseId
        }
        savedAt
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getDialog = /* GraphQL */ `
  query GetDialog($id: ID!) {
    getDialog(id: $id) {
      id
      phrases {
        id
        words {
          id
          position
          lemma
          part_of_speech
          part_of_speech2
          head
          dependency_relation
          form
          inflection
        }
        speaker {
          name
          gender
          number
        }
        status
      }
      videoUrl
      title
      topic
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listDialogs = /* GraphQL */ `
  query ListDialogs(
    $filter: ModelDialogFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDialogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phrases {
          id
          status
        }
        videoUrl
        title
        topic
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDialogs = /* GraphQL */ `
  query SyncDialogs(
    $filter: ModelDialogFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDialogs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        phrases {
          id
          status
        }
        videoUrl
        title
        topic
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
