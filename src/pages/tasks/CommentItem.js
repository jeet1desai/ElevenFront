import React from 'react';

import { Avatar, Grid, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';

import { formatDate, handleUserName } from 'utils/utilsFn';

const CommentItem = ({ comment }) => {
  return (
    <>
      <ListItemButton alignItems="flex-start">
        <ListItemAvatar>
          <Avatar url={comment.created_by.profile_picture} />
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
                  {handleUserName(comment.created_by)}
                </Typography>
              </Grid>
              <Grid item component="span">
                <Typography component="span" variant="subtitle2">
                  {formatDate(comment.created_date)}
                </Typography>
              </Grid>
            </Grid>
          }
          secondary={
            <Typography
              variant="h6"
              component="span"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}
            >
              {comment.comment}
            </Typography>
          }
        />
      </ListItemButton>
    </>
  );
};

export default CommentItem;
