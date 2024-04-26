import { dispatch } from 'store/index';
import { loginSuccess, logoutSuccess } from 'store/slices/account';
import axios from 'utils/axios';

export const meUserService = () => {
  return async () => {
    try {
      const response = await axios.get('user/me');
      dispatch(loginSuccess({ user: response.data.user }));
    } catch (error) {
      dispatch(logoutSuccess());
    }
  };
};
