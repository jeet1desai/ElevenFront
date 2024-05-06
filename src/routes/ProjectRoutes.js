import { lazy } from 'react';

import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'layout/RouteGuard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('pages/dashboard')));
const Teams = Loadable(lazy(() => import('pages/teams')));
const Tasks = Loadable(lazy(() => import('pages/tasks')));
const ViewTask = Loadable(lazy(() => import('pages/tasks/ViewTask')));
const RequestInformation = Loadable(lazy(() => import('pages/request-information')));
const FieldReports = Loadable(lazy(() => import('pages/field-reports')));
const Invoice = Loadable(lazy(() => import('pages/invoice')));
const Document = Loadable(lazy(() => import('pages/document')));
const Chat = Loadable(lazy(() => import('pages/chat')));
const Calender = Loadable(lazy(() => import('pages/calender')));
const Setting = Loadable(lazy(() => import('pages/setting')));

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
      element: <Dashboard />
    },
    {
      path: 'projects/:id/tasks',
      element: <Tasks />
    },
    {
      path: 'projects/:id/tasks/view/:taskId',
      element: <ViewTask />
    },
    {
      path: 'projects/:id/rfis',
      element: <RequestInformation />
    },
    {
      path: 'projects/:id/field-reports',
      element: <FieldReports />
    },
    {
      path: 'projects/:id/invoice',
      element: <Invoice />
    },
    {
      path: 'projects/:id/document',
      element: <Document />
    },
    {
      path: 'projects/:id/teams',
      element: <Teams />
    },
    {
      path: 'projects/:id/chat',
      element: <Chat />
    },
    {
      path: 'projects/:id/calender',
      element: <Calender />
    },
    {
      path: 'projects/:id/setting',
      element: <Setting />
    }
  ]
};

export default ProjectRoutes;
