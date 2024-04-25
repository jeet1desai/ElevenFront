import { useEffect } from 'react';

import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/Loader';

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (!isLoggedIn) return <Loader />;

  return children;
};

export default AuthGuard;
