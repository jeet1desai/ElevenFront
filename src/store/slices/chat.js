import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  chatUserList: [],
  chat: null,
  chatId: ''
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
        state.chatId = chatUser[0].id;
      }
      state.chatUserList = chatUser;
      state.loading = false;
    },
    changeChatUserSuccess(state, action) {
      const { chat } = action.payload;
      state.chat = chat;
      state.chatId = chat.id;
      state.loading = false;
    }
  }
});

export const { hasError, getChatUserSuccess, changeChatUserSuccess } = chatSlice.actions;

export default chatSlice.reducer;
