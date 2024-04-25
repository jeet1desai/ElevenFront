import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

import Loader from 'components/Loader';

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/projects');
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  if (isLoggedIn) return <Loader />;

  return children;
};

export default GuestGuard;
