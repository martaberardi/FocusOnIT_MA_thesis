import {Dialog, PartOfSpeech, Person, Phrase, PhraseStatus, Word,} from '../../models';
import {Action} from './actions';
import {
  initializeWord,
  isSpeakerToBeHighlightedForAdjectives,
  isSpeakerToBeHighlightedForVerb
} from "../utils/wordUtils";

const initialState: DialogState = new Map<string, DialogUI>();

// eslint-disable-next-line default-param-last
export const dialogReducer = (state = initialState, action: Action): DialogState => {
  switch (action.type) {
    case 'initializeDialogs': {
      const {dialogs} = action.payload;
      const newState = new Map(state);

      dialogs.forEach((dialog) => newState.set(dialog.id, initializeDialog(dialog)));

      return newState;
    }
    case 'addDialog': {
      const {dialog} = action.payload;
      const newDialog = initializeDialog(dialog);
      const newState = new Map(state);
      newState.set(newDialog.id, newDialog);

      return newState;
    }
    case 'setPhraseStatus': {
      const {dialogId, phraseId, status} = action.payload;

      const phraseUpdater = (p: PhraseUI) => ({...p, status});

      return updatePhrase(state, dialogId, phraseId, phraseUpdater);
    }
    case 'showHint': {
      const {dialogId, phraseId, suggestionFor} = action.payload;
      return updateHints(state, dialogId, phraseId, suggestionFor, true);
    }
    case 'hideHint': {
      const {dialogId, phraseId, suggestionFor} = action.payload;
      return updateHints(state, dialogId, phraseId, suggestionFor);
    }
    case 'setWordStatus': {
      const {dialogId, phraseId, wordId, status} = action.payload;

      const wordUpdater: WordUpdater = (w: WordUI) => ({...w, status});

      return updateWord(state, dialogId, phraseId, wordId, wordUpdater);
    }
    default:
      return state;
  }
};

function updateWord(state: DialogState, dialogId: string, phraseId: string, wordId: string, wordUpdater: WordUpdater): DialogState {
  const newWords: WordUI[] = state.get(dialogId)!.phrases.find((p) => p.id === phraseId)!.words.map(
    (word) => {
      if (word.id === wordId) {
        return wordUpdater(word);
      }
      return {...word};
    },
  );

  const newPhrases = state.get(dialogId)!.phrases.map(
    (phrase) => {
      if (phrase.id === phraseId) {
        return {
          ...phrase,
          words: newWords,
        };
      }
      return {...phrase};
    },
  );

  const newState = new Map(state);

  newState.set(dialogId, {
    ...state.get(dialogId)!,
    phrases: newPhrases,
  });

  return newState;
}

function updateHints(state: DialogState, dialogId: string, phraseId: string, suggestionFor: WordUI, isShowed?: boolean): DialogState {
  let newState = new Map(state);
  const phrase: PhraseUI = state.get(dialogId)!
    .phrases.find(({id}) => id === phraseId)!;

  const headWord: WordUI | undefined = phrase
    .words.find(({id}) => id === suggestionFor.head);

  if ((headWord && isSpeakerToBeHighlightedForAdjectives(suggestionFor, headWord, phrase))
      || isSpeakerToBeHighlightedForVerb(suggestionFor, phrase)) {
    const phraseUpdater: PhraseUpdater = (phrase) => (
      {
        ...phrase, isSpeakerHighlighted: isShowed, words: phrase.words.map(w => {
          if (w.id === suggestionFor.id) {
            return {
              ...w, hint: {
                type: getHintTypeForPOS(suggestionFor.part_of_speech as PartOfSpeech),
                suggestionFor
              }
            }
          }
          return w;
        })
      }
    );
    return updatePhrase(newState, dialogId, phraseId, phraseUpdater);
  }


  const hint = isShowed ?
    ({
      type: getHintTypeForPOS(suggestionFor.part_of_speech as PartOfSpeech),
      suggestionFor
    })
    : undefined;

  const wordUpdater: WordUpdater = (w: WordUI) => ({...w, hint});

  if (suggestionFor.head) {
    newState = updateWord(state, dialogId, phraseId, suggestionFor.head, wordUpdater);
  }

  if (suggestionFor.additionalHead.size > 0) {
    const heads: string[] = Array.from(suggestionFor.additionalHead);
    newState = heads.reduce((currentState, currentHead) =>
        updateWord(currentState, dialogId, phraseId, currentHead, wordUpdater)
      , newState);
  }

  return newState;
}

function updatePhrase(state: DialogState, dialogId: string, phraseId: string, phraseUpdater: PhraseUpdater): DialogState {
  const newPhrases = state.get(dialogId)!.phrases
    .map((p) => {
      if (p.id === phraseId) {
        return phraseUpdater(p);
      }
      return p;
    });

  const newState = new Map(state);

  newState.set(dialogId, {...state.get(dialogId)!, phrases: newPhrases})

  return newState;
}

function initializeDialog(dialog: Dialog) {
  return {
    ...dialog,
    phrases: dialog.phrases.map((phrase) => {
      const words = phrase.words.map((word) => initializeWord(word, phrase));

      return ({
        ...phrase,
        words,
        status: words.some(w => w.status && w.status === "ToBeFilled") ? PhraseStatus.TO_COMPLETE : PhraseStatus.UNNECESSARY,
      })
    }),
  };
}

function getHintTypeForPOS(pos: PartOfSpeech): HintType {
  switch (pos) {
    case PartOfSpeech.VERB:
      return 'VerbHint'
    case PartOfSpeech.NOUN:
      return 'NounHint'
    case PartOfSpeech.ARTICLE:
      return 'ArticleHint'
    case PartOfSpeech.ADJECTIVE:
      return 'AdjectiveHint'
    default:
      throw Error(`Hint for an unexpected POS: ${pos}`)
  }
}

export type DialogState = Map<string, DialogUI>;

export interface DialogUI extends Dialog {
  phrases: PhraseUI[],
}

export interface PhraseUI extends Phrase {
  words: WordUI[],
  isSpeakerHighlighted?: boolean,
}

export interface WordUI extends Word {
  hint?: Hint,
  additionalHead: Set<string>,
  status: WordStatus,
  phraseId: string,
}

export type WordStatus = 'Unblankable' | 'ToBeFilled' | 'Completed';
export type HintType = 'ArticleHint' | 'NounHint' | 'AdjectiveHint' | 'VerbHint'
type Hint = { type: HintType, suggestionFor: WordUI };

type PhraseUpdater = (phrase: PhraseUI) => PhraseUI
type WordUpdater = (word: WordUI) => WordUI;
