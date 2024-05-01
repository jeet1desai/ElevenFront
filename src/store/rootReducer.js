import { combineReducers } from 'redux';

import menuReducer from './slices/menu';
import accountReducer from './slices/account';
import snackbarReducer from './slices/snackbar';
import projectReducer from './slices/project';
import teamReducer from './slices/team';
import documentSlice from './slices/document';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'account',
//   storage
// };

// const persistedReducer = persistReducer(persistConfig, accountReducer);

const reducers = combineReducers({
  menu: menuReducer,
  account: accountReducer,
  snackbar: snackbarReducer,
  project: projectReducer,
  document: documentSlice,
  team: teamReducer
});

export default reducers;
