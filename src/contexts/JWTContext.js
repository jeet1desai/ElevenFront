import React, { createContext, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';

import Loader from 'components/Loader';
import axios from 'utils/axios';
import { deleteCookie, getCookie, setCookie } from 'utils/cookie';
import { useSelector, useDispatch } from 'store/index';
import { loginSuccess, logoutSuccess } from 'store/slices/account';
import { loginService } from 'services/account';

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    setCookie('serviceToken', serviceToken, 7);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    deleteCookie('serviceToken');
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
        const serviceToken = getCookie('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          // Me API
          dispatch(loginService('demo@yopmail.com', 'Demo@123'));
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
    const response = await axios.post('user/login/', { email: email, password: password });
    setSession(response.data.token.access);
    dispatch(loginSuccess(response.data.data));
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
