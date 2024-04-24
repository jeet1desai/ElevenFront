import { configureStore } from '@reduxjs/toolkit';
import reducers from './rootReducer';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['account']
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

const store = configureStore({
  reducer: reducers
});

const { dispatch } = store;

export { store, useDispatch, useSelector, dispatch };
