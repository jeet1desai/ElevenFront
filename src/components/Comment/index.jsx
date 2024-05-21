import React from 'react';

import { Avatar } from '@mui/material';

import { StyledContainer } from 'components/styled-css/CommentStyled';
import { Grid, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';

const Comment = ({ comment }) => {
  return (
    <StyledContainer>
      <ListItemButton sx={{ width: '100%' }}>
        <ListItemAvatar>
          <Avatar src="" />
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
                  Time
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
                  {comment.body}
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
