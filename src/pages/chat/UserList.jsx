import React from 'react';

import { Grid, Avatar, Typography, ListItemButton, ListItemAvatar, ListItemText } from '@mui/material';

import { useSelector } from 'store/index';

import { handleUserName } from 'utils/utilsFn';

const UserList = ({ userDetail }) => {
  const { user } = useSelector((state) => state.account);

  if (!user || !userDetail) {
    return null;
  }

  const userMap = userDetail.participants[0].user.id === user.id ? userDetail.participants[1] : userDetail.participants[0];

  return (
    <ListItemButton>
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
              {/* <Typography component="span" variant="subtitle2">
                2h ago
              </Typography> */}
            </Grid>
          </Grid>
        }
        secondary={
          <Grid container alignItems="center" spacing={1} component="span">
            <Grid item xs zeroMinWidth component="span">
              {/* <Typography
                variant="caption"
                component="span"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block'
                }}
              >
                Last message
              </Typography> */}
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
