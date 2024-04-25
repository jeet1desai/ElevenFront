import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'layout/RouteGuard/AuthGuard';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const ProjectRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: 'projects/:id/home',
      element: <DashboardDefault />
    },
    {
      path: 'projects/:id/team',
      element: <DashboardDefault />
    }
  ]
};

export default ProjectRoutes;
