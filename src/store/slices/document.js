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
      if (document.is_published) {
        state.teamDocument = [...state.teamDocument, document];
        state.myDocument = [...state.myDocument, document];
      } else {
        state.myDocument = [...state.myDocument, document];
      }
    },
    removeDocumentSuccess(state, action) {
      const { document } = action.payload;
      state.teamDocument = state.teamDocument.filter((file) => file.id !== document.id);
      state.myDocument = state.myDocument.filter((file) => file.id !== document.id);
    },
    publishDocumentSuccess(state, action) {
      const { document } = action.payload;
      if (!document.is_published) {
        state.teamDocument = state.teamDocument.filter((file) => file.id !== document.id);
      }
    },
    getMyDocumentSuccess(state, action) {
      const { documents } = action.payload;
      state.myDocument = [...documents];
    },
    getTeamDocumentSuccess(state, action) {
      const { documents } = action.payload;
      state.teamDocument = [...documents];
    }
  }
});

export const {
  hasError,
  addNewDocumentSuccess,
  getMyDocumentSuccess,
  getTeamDocumentSuccess,
  removeDocumentSuccess,
  publishDocumentSuccess
} = documentSlice.actions;

export default documentSlice.reducer;
