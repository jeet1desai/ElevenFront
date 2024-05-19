import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';
import { MessageOutlined } from '@ant-design/icons';

const Chat = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton sx={{ color: 'text.primary', borderRadius: '8px' }} onClick={() => navigate(`/chat`)}>
        <MessageOutlined />
      </IconButton>
    </Box>
  );
};

export default Chat;
