import React, { createContext, useEffect } from 'react';

import Loader from 'components/Loader';

import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';
import { cookieStorage } from 'utils/cookie';

import { meUserService } from 'services/account';
import { getProjectListService } from 'services/project';

import { useSelector, useDispatch } from 'store/index';

import { loginSuccess, logoutSuccess } from 'store/slices/account';
import { getProjectSuccess } from 'store/slices/project';

const setSession = (serviceToken) => {
  if (serviceToken) {
    cookieStorage.setItem('token', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    cookieStorage.clear();
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isLoggedIn, loading } = useSelector((state) => state.account);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = cookieStorage.getItem('token');
        if (serviceToken) {
          setSession(serviceToken);
          await dispatch(meUserService());
          await dispatch(getProjectListService());
        } else {
          cookieStorage.clear();
          dispatch(logoutSuccess());
        }
      } catch (err) {
        cookieStorage.clear();
        dispatch(logoutSuccess());
      }
    };

    if (!isLoggedIn) {
      init();
    }
  }, [dispatch, isLoggedIn]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('user/login', { email: email, password: password });
      setSession(response.data.token.access);
      dispatch(loginSuccess({ user: response.data.user, isCompany: response.data.is_company }));
      dispatch(getProjectSuccess({ projects: response.data.projects }));

      openErrorSnackbar(response.data.msg, 'primary');
    } catch (err) {
      openErrorSnackbar(err.msg, 'error');
    }
  };

  const logout = () => {
    setSession(null);
    dispatch(logoutSuccess());
  };

  if (loading) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ isLoggedIn, logout, login }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
