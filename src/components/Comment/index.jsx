import React from 'react';

import { Avatar } from '@mui/material';

import {
  StyledCommentBody,
  StyledCommentDate,
  StyledCommentHeaderContainer,
  StyledCommentUserName,
  StyledContainer
} from 'components/styled-css/CommentStyled';

const Comment = ({ comment }) => {
  return (
    <StyledContainer>
      <StyledCommentHeaderContainer>
        <Avatar src="" size="md" entityId={comment.id} placeholder="" sx={{ width: 30, height: 30 }} />
        <StyledCommentUserName>Name</StyledCommentUserName>
        <StyledCommentDate>Date</StyledCommentDate>
      </StyledCommentHeaderContainer>
      <StyledCommentBody>{comment.body}</StyledCommentBody>
    </StyledContainer>
  );
};

export default Comment;
