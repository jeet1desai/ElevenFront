import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  teamDocument: [],
  myDocument: []
};

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    hasError(state) {
      state.loading = false;
    },
    addNewDocumentSuccess(state, action) {
      const { document } = action.payload;
      state.myDocument = [document, ...state.myDocument];
    },
    getMyDocumentSuccess(state, action) {
      const { documents } = action.payload;
      state.myDocument = [...documents];
    }
  }
});

export const { hasError, addNewDocumentSuccess, getMyDocumentSuccess } = documentSlice.actions;

export default documentSlice.reducer;
