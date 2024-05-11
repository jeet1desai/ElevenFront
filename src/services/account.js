import { dispatch } from 'store/index';
import {
  createCompanySuccess,
  editCompanySuccess,
  getCompanySuccess,
  loginSuccess,
  logoutSuccess,
  updateAccountSuccess
} from 'store/slices/account';
import axios from 'utils/axios';
import { cookieStorage } from 'utils/cookie';
import { openErrorSnackbar } from 'utils/utilsFn';

export const meUserService = () => {
  return async () => {
    try {
      const response = await axios.get('user/me');
      dispatch(loginSuccess({ user: response.data.user, isCompany: response.data.is_company }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
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
    }
  };
};

export const updateAccountService = (data) => {
  return async () => {
    try {
      const response = await axios.put(`user/update_user`, data);
      dispatch(updateAccountSuccess({ user: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
    }
  };
};

export const changePasswordService = (data) => {
  return async () => {
    try {
      await axios.post(`user/change-password`, data);
      openErrorSnackbar('Successfully updated', 'success');
      cookieStorage.clear();
      dispatch(logoutSuccess());
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
    }
  };
};

export const deleteAccountService = () => {
  return async () => {
    try {
      await axios.delete(`user/delete`);
      openErrorSnackbar('Successfully deleted', 'success');
      cookieStorage.clear();
      dispatch(logoutSuccess());
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
    }
  };
};
