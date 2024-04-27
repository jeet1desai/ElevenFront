import { dispatch } from 'store/index';
import { createCompanySuccess, loginSuccess, logoutSuccess } from 'store/slices/account';
import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';

export const meUserService = () => {
  return async () => {
    try {
      const response = await axios.get('user/me');
      dispatch(loginSuccess({ user: response.data.user, isCompany: response.data.is_company }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(logoutSuccess());
    }
  };
};

export const createCompanyService = (data) => {
  return async () => {
    try {
      const response = await axios.post('user/company', data);
      dispatch(createCompanySuccess(response.data));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(logoutSuccess());
    }
  };
};
