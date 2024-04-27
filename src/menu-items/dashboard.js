import { FormattedMessage } from 'react-intl';

import { DashboardOutlined, TeamOutlined } from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  TeamOutlined
};

const dashboard = {
  id: 'group-home',
  title: 'Eleven - CPM',
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="home" />,
      type: 'item',
      url: 'home',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'team',
      title: <FormattedMessage id="team" />,
      type: 'item',
      url: 'teams',
      icon: icons.TeamOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
