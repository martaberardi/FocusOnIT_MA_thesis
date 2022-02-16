/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAnalyticsData = /* GraphQL */ `
  mutation CreateAnalyticsData(
    $input: CreateAnalyticsDataInput!
    $condition: ModelAnalyticsDataConditionInput
  ) {
    createAnalyticsData(input: $input, condition: $condition) {
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
export const updateAnalyticsData = /* GraphQL */ `
  mutation UpdateAnalyticsData(
    $input: UpdateAnalyticsDataInput!
    $condition: ModelAnalyticsDataConditionInput
  ) {
    updateAnalyticsData(input: $input, condition: $condition) {
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
export const deleteAnalyticsData = /* GraphQL */ `
  mutation DeleteAnalyticsData(
    $input: DeleteAnalyticsDataInput!
    $condition: ModelAnalyticsDataConditionInput
  ) {
    deleteAnalyticsData(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createStats = /* GraphQL */ `
  mutation CreateStats(
    $input: CreateStatsInput!
    $condition: ModelStatsConditionInput
  ) {
    createStats(input: $input, condition: $condition) {
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
export const updateStats = /* GraphQL */ `
  mutation UpdateStats(
    $input: UpdateStatsInput!
    $condition: ModelStatsConditionInput
  ) {
    updateStats(input: $input, condition: $condition) {
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
export const deleteStats = /* GraphQL */ `
  mutation DeleteStats(
    $input: DeleteStatsInput!
    $condition: ModelStatsConditionInput
  ) {
    deleteStats(input: $input, condition: $condition) {
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
export const createDialog = /* GraphQL */ `
  mutation CreateDialog(
    $input: CreateDialogInput!
    $condition: ModelDialogConditionInput
  ) {
    createDialog(input: $input, condition: $condition) {
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
export const updateDialog = /* GraphQL */ `
  mutation UpdateDialog(
    $input: UpdateDialogInput!
    $condition: ModelDialogConditionInput
  ) {
    updateDialog(input: $input, condition: $condition) {
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
export const deleteDialog = /* GraphQL */ `
  mutation DeleteDialog(
    $input: DeleteDialogInput!
    $condition: ModelDialogConditionInput
  ) {
    deleteDialog(input: $input, condition: $condition) {
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
