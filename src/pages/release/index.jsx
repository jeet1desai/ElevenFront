import React from 'react';

import { Box, IconButton, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { IconFolders } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

const Release = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h2">Releases</Typography>
            <IconButton sx={{ bgcolor: 'primary.lighter' }} onClick={() => navigate('/projects')}>
              <IconFolders />
            </IconButton>
          </Box>
          <Grid container spacing={2} sx={{ mt: 0 }}>
            <Grid item xs={12}>
              <MainCard></MainCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Release;
