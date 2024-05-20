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
          <Grid container spacing={2} sx={{ mt: 0 }} justifyContent="center">
            <Grid item xs={12} sm={8}>
              <MainCard>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ mt: 3, width: '150px', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Typography variant="body2" sx={{ color: '#b3b3b3', fontSize: '18px' }}>
                      0.11.0
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px' }}>
                      May 3rd
                    </Typography>
                  </Box>
                  <Box>
                    <h1>Google Calendar Integration</h1>
                    <p>
                      With Google Calendar integration, you can track all your team`s events with a company or person in your CRM. Choose
                      the information level visible to your teammates for better control.
                    </p>
                    <img
                      style={{ width: '100%', height: '400px', margin: '20px 0', border: '1px solid #e6ebf1', borderRadius: '8px' }}
                      src="https://mantisdashboard.io/assets/Error404-BY9on4wS.png"
                      alt=""
                    />
                    <h1>Google Calendar Integration</h1>
                    <p>
                      With Google Calendar integration, you can track all your team`s events with a company or person in your CRM. Choose
                      the information level visible to your teammates for better control.
                    </p>
                    <img
                      style={{ width: '100%', height: '400px', margin: '20px 0', border: '1px solid #e6ebf1', borderRadius: '8px' }}
                      src="https://mantisdashboard.io/assets/Error404-BY9on4wS.png"
                      alt=""
                    />
                  </Box>
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Release;
