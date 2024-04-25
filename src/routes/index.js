import { useRoutes } from 'react-router-dom';

import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import ProjectRoutes from './ProjectRoutes';

export default function ThemeRoutes() {
  return useRoutes([LoginRoutes, MainRoutes, ProjectRoutes]);
}
