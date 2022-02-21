import {Action} from './actions';
import {PartOfSpeech, WordStats} from "../../models";

const initialState: UserData = {stats: {}};

// eslint-disable-next-line default-param-last
const userDataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'addWordStats': {
      const {
        dialogId, phraseId, word, firstHintShowed, secondHintShowed, answerShowed
      } = action.payload;
      const pos = word.part_of_speech as PartOfSpeech;
      const newState = {...state};

      if (!(pos in newState.stats)) {
        newState.stats[pos] = {};
      }

      if (!(dialogId in newState.stats[pos])) {
        newState.stats[pos][dialogId] = new Map();
      }

      const newDialog = new Map(newState.stats[pos][dialogId]);

      if (newDialog.has(word.id)) {
        newDialog.set(word.id, {
          ...newDialog.get(word.id)!,
          firstHintShowed,
          secondHintShowed,
          answerShowed,
        })
      } else {
        newDialog.set(word.id, {
          word,
          firstHintShowed,
          secondHintShowed,
          answerShowed,
          buttonClicks: [],
          wordId: word.id,
          phraseId
        })
      }

      newState.stats = {
        ...newState.stats,
        [pos]: {
          ...newState.stats[pos],
          [dialogId]: newDialog
        }
      };

      return newState;
    }
    case 'addButtonClick': {
      const {dialogId, isoDateTime, word, userInput} = action.payload;
      const pos = word.part_of_speech as PartOfSpeech;
      const newState = {...state};
      if (!(pos in newState.stats)) {
        newState.stats[pos] = {};
      }
      if (!(dialogId in newState.stats[pos])) {
        newState.stats[pos][dialogId] = new Map();
      }

      const buttonClick: ButtonClick = {userInput, isoDateTime}

      const newDialog = new Map(newState.stats[pos][dialogId]);
      const buttonClicks = [...newDialog.get(word.id)!.buttonClicks, buttonClick];
      newDialog.set(word.id, {...newDialog.get(word.id)!, buttonClicks})

      newState.stats = {
        ...newState.stats,
        [pos]: {
          ...newState.stats[pos],
          [dialogId]: newDialog
        }
      };

      return newState;
    }
    case "setUser": {
      const {id, name} = action.payload;

      return {
        ...state,
        user: {id, name}
      }
    }
    default:
      return state;
  }
};

export default userDataReducer;

export type UserData = {
  user?: PartialUserData,
  stats: Stats
}

export type Stats = {
  [pos: string]: {
    [dialogId: string]: Map<string, WordStats>
  }
}

export type PartialUserData = { id: string, name?: string };
