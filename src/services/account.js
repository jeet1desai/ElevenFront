import { dispatch } from 'store/index';
import { createCompanySuccess, editCompanySuccess, getCompanySuccess, loginSuccess, logoutSuccess } from 'store/slices/account';
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

export const getCompanyService = () => {
  return async () => {
    try {
      const response = await axios.get('user/company');
      dispatch(getCompanySuccess({ company: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(logoutSuccess());
    }
  };
};

export const editCompanyService = (companyId, data) => {
  return async () => {
    try {
      const response = await axios.put(`user/company/${companyId}`, data);
      dispatch(editCompanySuccess({ company: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(logoutSuccess());
    }
  };
};
