import {combineReducers, createStore} from 'redux';
import {dialogReducer, DialogState} from './dialogReducer';
import userDataReducer, {UserData} from './userDataReducer';

const rootReducer = combineReducers({
  dialogs: dialogReducer,
  userData: userDataReducer,
});

export type Store = { dialogs: DialogState, userData: UserData }
// @ts-ignore
// eslint-disable-next-line no-underscore-dangle
const store = createStore(rootReducer, process.browser && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
