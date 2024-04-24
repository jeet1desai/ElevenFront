import { combineReducers } from 'redux';

import menuReducer from './slices/menu';
import accountReducer from './slices/account';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'account',
  storage,
  whitelist: ['user', 'loading']
};

const persistedReducer = persistReducer(persistConfig, accountReducer);

const reducers = combineReducers({ menu: menuReducer, account: persistedReducer });

export default reducers;
