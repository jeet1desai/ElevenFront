import { styled } from '@mui/material/styles';
import { InputLabel } from '@mui/material';

export const StyledTitleInput = styled('input')(({ value }) => ({
  color: value ? '#333333' : '#b3b3b3',
  background: 'transparent',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '1.54rem',
  fontWeight: 600,
  lineHeight: 1.2,
  padding: '0 !important',
  outline: 'none',
  '&::placeholder': {
    color: '#b3b3b3'
  }
}));

export const StyledInputLabel = styled(InputLabel)({
  width: '200px',
  minWidth: '200px'
});
