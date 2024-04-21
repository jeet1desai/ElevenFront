import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import rootReducers from './rootReducer';

const store = configureStore({
  reducer: rootReducers
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
