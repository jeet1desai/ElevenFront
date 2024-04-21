import { combineReducers } from 'redux';

import menuReducer from './slices/menu';

const reducers = combineReducers({ menu: menuReducer });

export default reducers;
