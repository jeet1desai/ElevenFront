import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { LockOutlined, QuestionCircleOutlined, CommentOutlined } from '@ant-design/icons';

const SettingTab = ({ setOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(Number(index));

    if (index === 0) {
      navigate('/help-support');
    } else if (index === 2) {
      navigate('/feedback');
    } else {
      navigate('/releases');
    }

    setOpen(false);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Releases" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
