import { lazy } from 'react';

import Loadable from 'components/Loadable';
import AuthGuard from 'layout/RouteGuard/AuthGuard';
import SimpleLayout from 'layout/MainLayout/SimpleLayout';

const ProjectsPage = Loadable(lazy(() => import('pages/projects')));
const AccountPage = Loadable(lazy(() => import('pages/account')));
const HelpSupportPage = Loadable(lazy(() => import('pages/help-feedback/help')));
const FeedbackPage = Loadable(lazy(() => import('pages/help-feedback/feedback')));
const ReleasePage = Loadable(lazy(() => import('pages/release')));
const BillingPage = Loadable(lazy(() => import('pages/billing')));

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
      path: 'help-support',
      element: <HelpSupportPage />
    },
    {
      path: 'feedback',
      element: <FeedbackPage />
    },
    {
      path: 'releases',
      element: <ReleasePage />
    },
    {
      path: 'billing',
      element: <BillingPage />
    },
    {
      path: 'account',
      element: <AccountPage />
    }
  ]
};

export default MainRoutes;
