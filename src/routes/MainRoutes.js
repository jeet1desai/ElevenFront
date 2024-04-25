import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'layout/RouteGuard/AuthGuard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/home',
      element: <DashboardDefault />
    }
    // {
    //   path: 'home',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // },
  ]
};

export default MainRoutes;
