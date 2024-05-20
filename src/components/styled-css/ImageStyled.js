import { styled } from '@mui/material/styles';

import { IconButton, Paper } from '@mui/material';

export const StyledImageContainer = styled('div')({
  width: 100,
  height: 100,
  borderRadius: 0.25,
  overflow: 'hidden',
  position: 'relative'
});

export const StyledRemoveButton = styled(IconButton)({
  p: '1px',
  color: '#f44336',
  bgcolor: '#fff',
  border: '1px solid red',
  borderRadius: '50px !important',
  width: '20px',
  background: 'transparent',
  height: '20px',
  '&:hover': {
    bgcolor: '#fff'
  }
});

export const StyledImage = styled(Paper)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  border: '1px solid #e6ebf1',
  borderRadius: 8
});
