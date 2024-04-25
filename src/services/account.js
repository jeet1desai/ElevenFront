import { dispatch } from 'store/index';
import { loginSuccess, logoutSuccess } from 'store/slices/account';
import axios from 'utils/axios';

export const loginService = (email, password) => {
  return async () => {
    try {
      const response = await axios.post('user/login/', { email: email, password: password });
      dispatch(loginSuccess(response.data.data));
    } catch (error) {
      dispatch(logoutSuccess());
    }
  };
};
