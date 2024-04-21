import { FormattedMessage } from 'react-intl';

import { DashboardOutlined } from '@ant-design/icons';

const icons = {
  DashboardOutlined
};

const dashboard = {
  id: 'group-home',
  // title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'home',
      title: <FormattedMessage id="home" />,
      type: 'item',
      url: '/home',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
