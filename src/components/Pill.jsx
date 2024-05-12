import React from 'react';
import { styled } from '@mui/material/styles';

const StyledPill = styled('span')({
  alignItems: 'center',
  background: 'white',
  borderRadius: '999px',
  color: '#b3b3b3',
  display: 'flex',
  fontSize: '0.85rem',
  fontStyle: 'normal',
  fontWeight: '500',
  gap: '4px',
  height: '8px',
  justifyContent: 'flex-end',
  lineHeight: '1.5',
  padding: '10px',
  border: '1px solid #e6ebf1'
});

export const Pill = ({ className, label }) => {
  return <StyledPill className={className}>{label}</StyledPill>;
};
