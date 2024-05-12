import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chatUserList: [],
  chat: null
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    hasError(state) {
      state.loading = false;
    },
    getChatUserSuccess(state, action) {
      const { chatUser } = action.payload;
      if (chatUser.length > 0) {
        state.chat = chatUser[0];
      }
      state.chatUserList = chatUser;
      state.loading = false;
    }
  }
});

export const { hasError, getChatUserSuccess } = chatSlice.actions;

export default chatSlice.reducer;
