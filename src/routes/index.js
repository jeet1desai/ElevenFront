import { useRoutes } from 'react-router-dom';

import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ProjectRoutes from './ProjectRoutes';
import NotFound from 'pages/maintenance/not-found';

export default function ThemeRoutes() {
  return useRoutes([LoginRoutes, MainRoutes, ProjectRoutes, { path: '*', element: <NotFound /> }]);
}
