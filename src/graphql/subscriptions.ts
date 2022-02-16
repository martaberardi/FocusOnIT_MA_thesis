/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAnalyticsData = /* GraphQL */ `
  subscription OnCreateAnalyticsData {
    onCreateAnalyticsData {
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
export const onUpdateAnalyticsData = /* GraphQL */ `
  subscription OnUpdateAnalyticsData {
    onUpdateAnalyticsData {
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
export const onDeleteAnalyticsData = /* GraphQL */ `
  subscription OnDeleteAnalyticsData {
    onDeleteAnalyticsData {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateStats = /* GraphQL */ `
  subscription OnCreateStats($owner: String) {
    onCreateStats(owner: $owner) {
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
export const onUpdateStats = /* GraphQL */ `
  subscription OnUpdateStats($owner: String) {
    onUpdateStats(owner: $owner) {
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
export const onDeleteStats = /* GraphQL */ `
  subscription OnDeleteStats($owner: String) {
    onDeleteStats(owner: $owner) {
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
export const onCreateDialog = /* GraphQL */ `
  subscription OnCreateDialog {
    onCreateDialog {
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
export const onUpdateDialog = /* GraphQL */ `
  subscription OnUpdateDialog {
    onUpdateDialog {
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
export const onDeleteDialog = /* GraphQL */ `
  subscription OnDeleteDialog {
    onDeleteDialog {
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
