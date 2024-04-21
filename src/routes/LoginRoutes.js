import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const ForgetPassword = Loadable(lazy(() => import('pages/authentication/ForgetPassword')));
const LandPage = Loadable(lazy(() => import('pages/LandPage')));

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <LandPage />
    },
    {
      path: 'login',
      element: <AuthLogin />
    },
    {
      path: 'forgot-password',
      element: <ForgetPassword />
    }
  ]
};

export default LoginRoutes;
