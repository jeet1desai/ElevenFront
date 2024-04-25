import { lazy } from 'react';

import Loadable from 'components/Loadable';
import AuthGuard from 'layout/RouteGuard/AuthGuard';
import SimpleLayout from 'layout/MainLayout/SimpleLayout';

const ProjectsPage = Loadable(lazy(() => import('pages/projects')));

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
    }
  ]
};

export default MainRoutes;
