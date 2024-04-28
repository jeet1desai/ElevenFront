import React from 'react';

import { Grid, Avatar, Typography, ListItemButton, ListItemAvatar, ListItemText, Chip } from '@mui/material';

const UserList = () => {
  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar url="" />
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
                Name
              </Typography>
            </Grid>
            <Grid item component="span">
              <Typography component="span" variant="subtitle2">
                2h ago
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
                Last message
              </Typography>
            </Grid>
            <Grid item component="span">
              <Chip
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
              />
            </Grid>
          </Grid>
        }
      />
    </ListItemButton>
  );
};

export default UserList;
