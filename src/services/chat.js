import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';
import { dispatch } from 'store/index';
import { getChatUserSuccess } from 'store/slices/chat';

export const getChatsService = () => {
  return async () => {
    try {
      const response = await axios.get('chats/chat/list');
      dispatch(getChatUserSuccess({ chatUser: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
    }
  };
};

export const createChatService = (user, friend) => {
  return async () => {
    try {
      await axios.post('chats/chat/create', {
        participants: [user.toString(), friend.toString()]
      });
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
    }
  };
};
