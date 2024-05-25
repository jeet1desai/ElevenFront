import React from 'react';

import { Avatar, Grid, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';

import { StyledContainer } from 'components/styled-css/CommentStyled';

import { handleUserName } from 'utils/utilsFn';
import { formatDate } from 'utils/format/date';

const Comment = ({ comment }) => {
  return (
    <StyledContainer>
      <ListItemButton sx={{ width: '100%', '&:hover': { background: 'white' } }}>
        <ListItemAvatar>
          <Avatar src={comment.created_by.profile_picture} />
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
            <Grid container alignItems="center" spacing={1} component="span">
              <Grid item xs zeroMinWidth component="span">
                <Typography
                  // variant="caption"
                  component="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'block'
                  }}
                >
                  {comment.comment}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItemButton>
    </StyledContainer>
  );
};

export default Comment;
