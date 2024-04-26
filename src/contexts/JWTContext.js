import React, { createContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import Loader from 'components/Loader';

import axios from 'utils/axios';
import { deleteCookie, getCookie, setCookie } from 'utils/cookie';

import { meUserService } from 'services/account';
import { getProjectListService } from 'services/project';

import { useSelector, useDispatch } from 'store/index';

import { loginSuccess, logoutSuccess } from 'store/slices/account';
import { openSnackbar } from 'store/slices/snackbar';
import { getProjectSuccess } from 'store/slices/project';

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    setCookie('token', serviceToken, 7);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    deleteCookie('token');
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
        const serviceToken = getCookie('token');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          dispatch(meUserService());
          dispatch(getProjectListService());
        } else {
          dispatch(logoutSuccess());
        }
      } catch (err) {
        dispatch(logoutSuccess());
      }
    };
    init();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('user/login', { email: email, password: password });
      setSession(response.data.token.access);
      dispatch(loginSuccess({ user: response.data.user }));
      dispatch(getProjectSuccess({ projects: response.data.projects }));

      dispatch(
        openSnackbar({
          open: true,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          message: response.data.msg,
          transition: 'SlideUp',
          variant: 'alert',
          close: true
        })
      );
    } catch (err) {
      dispatch(
        openSnackbar({
          open: true,
          message: err.msg,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          transition: 'SlideUp',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
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
