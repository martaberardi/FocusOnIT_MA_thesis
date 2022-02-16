import {Dialog, PhraseStatus, Word} from '../../models';
import {WordStatus, WordUI} from './dialogReducer';

export const generateActionInitializeDialogs: (dialogs: Dialog[]) => InitializeDialogs = (dialogs) => (
  {type: 'initializeDialogs', payload: {dialogs}});

export const generateActionAddDialog: (dialog: Dialog) => AddDialog = (dialog) => (
  {type: 'addDialog', payload: {dialog}}
);

export const generateActionSetUser: (id: string, name: string) => SetUser = (id: string, name: string) => ({
  type: 'setUser',
  payload: {id, name},
});

export const generateActionSetPhraseStatus: (dialogId: string, phraseId: string, status: PhraseStatus) => SetPhraseStatus = (dialogId, phraseId, status) => ({
  type: 'setPhraseStatus',
  payload: {dialogId, phraseId, status},
});

export const generateActionShowHint: (dialogId: string, phraseId: string, suggestionFor: WordUI) => ShowHint = (dialogId, phraseId, suggestionFor) => ({
  type: 'showHint',
  payload: {
    dialogId, phraseId, suggestionFor,
  },
});

export const generateActionHideHint: (dialogId: string, phraseId: string, suggestionFor: WordUI) => HideHint = (dialogId, phraseId, suggestionFor) => ({
  type: 'hideHint',
  payload: {
    dialogId, phraseId, suggestionFor,
  },
});

export const generateActionSetWordStatus: (dialogId: string, phraseId: string, wordId: string, status: WordStatus) => SetWordStatus = (dialogId, phraseId, wordId, status) => ({
  type: 'setWordStatus',
  payload: {
    dialogId, phraseId, wordId, status
  },
});

export const generateActionAddWordStats: (dialogId: string, phraseId: string, word: Word, firstHintShowed: boolean, secondHintShowed: boolean, answerShowed: boolean) => AddWordStats = (dialogId, phraseId, word, firstHintShowed, secondHintShowed, answerShowed) => (
  {
    type: 'addWordStats',
    payload: {
      dialogId, phraseId, word, firstHintShowed, secondHintShowed, answerShowed,
    },
  }
);

export const generateActionAddButtonClick: (dialogId: string, word: WordUI, userInput: string, isoDateTime: string) => AddButtonClick = (dialogId, word, userInput, isoDateTime) => (
  {
    type: 'addButtonClick',
    payload: {
      dialogId, word, isoDateTime, userInput
    },
  }
);

type InitializeDialogs = { type: 'initializeDialogs', payload: { dialogs: Dialog[] } };
type AddDialog = { type: 'addDialog', payload: { dialog: Dialog } };
type SetUser = { type: 'setUser', payload: { id: string, name: string } };
type SetPhraseStatus = { type: 'setPhraseStatus', payload: { dialogId: string, phraseId: string, status: PhraseStatus } };
type ShowHint = { type: 'showHint', payload: { dialogId: string, phraseId: string, suggestionFor: WordUI } }
type HideHint = { type: 'hideHint', payload: { dialogId: string, phraseId: string, suggestionFor: WordUI } }
type AddWordStats = { type: 'addWordStats', payload: { dialogId: string, phraseId: string, word: Word, firstHintShowed: boolean, secondHintShowed: boolean, answerShowed: boolean } }
type AddButtonClick = { type: 'addButtonClick', payload: { dialogId: string, isoDateTime: string, word: Word, userInput: string } }
type SetWordStatus = { type: 'setWordStatus', payload: { dialogId: string, phraseId: string, wordId: string, status: WordStatus } }

export type Action =
  InitializeDialogs
  | AddDialog
  | SetUser
  | SetPhraseStatus
  | ShowHint
  | HideHint
  | AddWordStats
  | AddButtonClick
  | SetWordStatus
  ;
