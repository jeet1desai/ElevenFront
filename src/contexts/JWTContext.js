import React, { createContext, useEffect, useReducer } from 'react';

import { jwtDecode } from 'jwt-decode';

import { LOGOUT } from '../store/actions/account';
import accountReducer from '../store/reducers/account';

import Loader from 'components/Loader';
import axios from 'utils/axios';

const initialState = {
  loading: true,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded = jwtDecode(serviceToken);
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          // const response = await axios.get('/api/account/me');
          // const { user } = response.data;
          // dispatch({
          //   type: LOGIN,
          //   payload: {
          //     isLoggedIn: true,
          //     user
          //   }
          // });
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        console.error(err);
        dispatch({ type: LOGOUT });
      }
      login('demo@yopmail.com', 'Demo@123');
    };
    init();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(
      'user/login/',
      { email: email, password: password },
      {
        headers: {}
      }
    );

    console.log(response);
    // const { serviceToken, user } = response.data;
    // setSession(serviceToken);
    // dispatch({
    //   type: LOGIN,
    //   payload: {
    //     isLoggedIn: true,
    //     user
    //   }
    // });
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  if (state.loading) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, logout, login }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
