import React from 'react';

import { Grid, Avatar, Typography, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';

import { useSelector } from 'store/index';

import { handleUserName } from 'utils/utilsFn';
import { formatDate } from 'utils/format/date';

import { changeChatUserSuccess } from 'store/slices/chat';
import { useDispatch } from 'store/index';

const UserList = ({ userDetail, messages }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.account);

  if (!user || !userDetail) {
    return null;
  }

  const userMap = userDetail.participants[0].user.id === user.id ? userDetail.participants[1] : userDetail.participants[0];
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : { timestamp: '', content: '' };

  const handleChangeUser = () => {
    dispatch(changeChatUserSuccess({ chat: userDetail }));
  };

  return (
    <ListItemButton onClick={() => handleChangeUser()}>
      <ListItemAvatar>
        <Avatar src={userMap.user.profile_picture} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Grid container alignItems="center" spacing={1} component="span">
            <Grid item xs zeroMinWidth component="span">
              <Typography
                variant="h5"
                color="inherit"
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block'
                }}
              >
                {handleUserName(userMap.user)}
              </Typography>
            </Grid>
            <Grid item component="span">
              <Typography component="span" variant="subtitle2">
                {lastMessage.timestamp && formatDate(lastMessage.timestamp)}
              </Typography>
            </Grid>
          </Grid>
        }
        secondary={
          <Grid container alignItems="center" spacing={1} component="span">
            <Grid item xs zeroMinWidth component="span">
              <Typography
                variant="caption"
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block'
                }}
              >
                {lastMessage.content}
              </Typography>
            </Grid>
            <Grid item component="span">
              {/* <Chip
                label={2}
                component="span"
                color="primary"
                sx={{
                  width: 20,
                  height: 20,
                  '& .MuiChip-label': {
                    px: 0.5
                  }
                }}
              /> */}
            </Grid>
          </Grid>
        }
      />
    </ListItemButton>
  );
};

export default UserList;
