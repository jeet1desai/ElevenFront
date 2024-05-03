import { IconUpload } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';

export const StyledUploadDragTitle = styled('div')({
  color: '#333333',
  fontSize: '1.23rem',
  fontWeight: '500',
  lineHeight: '1.2',
  marginBottom: '8px'
});

export const StyledUploadDragSubTitle = styled('div')({
  color: '#999999',
  fontSize: '1rem',
  fontWeight: '400',
  lineHeight: '1.2',
  marginBottom: '8px'
});

export const StyledUploadDragIcon = styled(IconUpload)({
  color: '#999999',
  marginBottom: '12px'
});

export const StyledContainer = styled('div')({
  alignItems: 'center',
  background: '#fcfcfc',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  height: '200px'
});
