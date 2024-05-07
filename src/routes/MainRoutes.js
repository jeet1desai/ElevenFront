import { lazy } from 'react';

import Loadable from 'components/Loadable';
import AuthGuard from 'layout/RouteGuard/AuthGuard';
import SimpleLayout from 'layout/MainLayout/SimpleLayout';

const ProjectsPage = Loadable(lazy(() => import('pages/projects')));
const AccountPage = Loadable(lazy(() => import('pages/account')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <SimpleLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: 'projects',
      element: <ProjectsPage />
    },
    {
      path: 'account',
      element: <AccountPage />
    }
  ]
};

export default MainRoutes;
