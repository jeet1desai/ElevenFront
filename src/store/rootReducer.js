import { combineReducers } from 'redux';

import menuReducer from './slices/menu';
import accountReducer from './slices/account';
import snackbarReducer from './slices/snackbar';
import projectReducer from './slices/project';
import teamReducer from './slices/team';
import documentReduce from './slices/document';
import todoReduce from './slices/todo';
import taskReduce from './slices/task';
import utilsReduce from './slices/utils';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'todo',
  storage
};

const reducers = combineReducers({
  menu: menuReducer,
  account: accountReducer,
  snackbar: snackbarReducer,
  project: projectReducer,
  document: documentReduce,
  team: teamReducer,
  task: taskReduce,
  utils: utilsReduce,
  todo: persistReducer(persistConfig, todoReduce)
});

export default reducers;
