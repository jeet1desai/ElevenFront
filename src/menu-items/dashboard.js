import { FormattedMessage } from 'react-intl';

import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  OrderedListOutlined,
  CommentOutlined,
  MessageOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  CalendarOutlined,
  AccountBookOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

const icons = {
  DashboardOutlined,
  OrderedListOutlined,
  TeamOutlined,
  CommentOutlined,
  MessageOutlined,
  FileDoneOutlined,
  EnvironmentOutlined,
  PaperClipOutlined,
  CalendarOutlined,
  AccountBookOutlined,
  SettingOutlined
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
      id: 'tasks',
      title: <FormattedMessage id="tasks" />,
      type: 'item',
      url: 'tasks',
      icon: icons.OrderedListOutlined,
      breadcrumbs: true
    },
    {
      id: 'RFIs',
      title: <FormattedMessage id="RFIs" />,
      type: 'item',
      url: 'rfis',
      icon: icons.CommentOutlined,
      breadcrumbs: false
    },
    {
      id: 'field-reports',
      title: <FormattedMessage id="field-reports" />,
      type: 'item',
      url: 'field-reports',
      icon: icons.FileDoneOutlined,
      breadcrumbs: false
    },
    {
      id: 'calender',
      title: <FormattedMessage id="calender" />,
      type: 'item',
      url: 'calender',
      icon: icons.CalendarOutlined,
      breadcrumbs: true
    },
    {
      id: 'document',
      title: <FormattedMessage id="document" />,
      type: 'item',
      url: 'document',
      icon: icons.PaperClipOutlined,
      breadcrumbs: true
    },
    {
      id: 'team',
      title: <FormattedMessage id="team" />,
      type: 'item',
      url: 'teams',
      icon: icons.TeamOutlined,
      breadcrumbs: true
    },
    {
      id: 'chat',
      title: <FormattedMessage id="chat" />,
      type: 'item',
      url: 'chat',
      icon: icons.MessageOutlined,
      breadcrumbs: false
    },
    // {
    //   id: 'invoice',
    //   title: <FormattedMessage id="invoice" />,
    //   type: 'item',
    //   url: 'invoice',
    //   icon: icons.AccountBookOutlined,
    //   breadcrumbs: true
    // },
    {
      id: 'setting',
      title: <FormattedMessage id="setting" />,
      type: 'item',
      url: 'setting',
      icon: icons.SettingOutlined,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
