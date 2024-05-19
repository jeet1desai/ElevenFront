import { styled } from '@mui/material/styles';

export const StyledContainer = styled('div')({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  justifyContent: 'flex-start',
  width: '100%'
});

export const StyledCommentHeaderContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  gap: '8px',
  padding: '4px 4px 4px 16px',
  width: `calc(100% - 4px)`
});

export const StyledCommentUserName = styled('div')({
  color: '#333333',
  fontWeight: 400,
  maxWidth: '160px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

export const StyledCommentDate = styled('div')({
  color: '#b3b3b3',
  fontWeight: 400,
  marginLeft: '4px'
});

export const StyledCommentBody = styled('div')({
  color: '#666666',
  fontSize: '1rem',
  lineHeight: 1.2,
  overflowWrap: 'anywhere',
  paddingLeft: '36px',
  textAlign: 'left'
});

export const StyledThreadItemListContainer = styled('div')({
  alignItems: 'flex-start',
  borderTop: `1px solid #f1f1f1`,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  justifyContent: 'flex-start',
  padding: '32px',
  width: '100%'
});

export const StyledCommentActionBar = styled('div')({
  background: '#ffffff',
  borderTop: `1px solid #f1f1f1`,
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  padding: '16px 24px 16px 48px',
  width: '100%'
});
