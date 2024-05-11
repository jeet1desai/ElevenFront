import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';

export const StyledCrossIcon = styled(IconButton)({
  background: '#1677ff',
  color: '#ffffff',
  '&:hover': { background: '#1677ff', color: '#ffffff' }
});

export const StyledPlusIcon = styled(IconButton)({
  position: 'absolute',
  bottom: '15px',
  right: '20px',
  background: '#1677ff',
  color: '#ffffff',
  '&:hover': { background: '#1677ff', color: '#ffffff' }
});

export const StyledRow = styled('div')({
  alignItems: 'center',
  alignSelf: 'stretch',
  borderBottom: '1px solid #f1f1f1',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 18px',
  '&:last-child': {
    borderBottom: '0'
  }
});

export const StyledColText = styled('p')({
  textAlign: 'center',
  width: '100%',
  color: '#333333',
  fontSize: '1rem',
  fontWeight: '500'
});
