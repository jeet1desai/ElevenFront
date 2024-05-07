import React from 'react';

import { Box, Button, Typography, Grid } from '@mui/material';

import { IconEdit, IconTrash } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

const Account = () => {
  return (
    <>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Typography variant="h2">Account Settings</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <MainCard
                title="Profile"
                secondary={
                  <Box sx={{ display: 'flex', gap: '8px' }}>
                    <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                      Edit
                    </Button>
                    <Button variant="contained" color="error" startIcon={<IconEdit size={18} />}>
                      Change Password
                    </Button>
                  </Box>
                }
              ></MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard
                title="Region"
                secondary={
                  <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                    Edit
                  </Button>
                }
              ></MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard
                title="Status"
                secondary={
                  <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                    Edit
                  </Button>
                }
              ></MainCard>
            </Grid>
            <Grid item xs={12}>
              <MainCard>
                <Button variant="contained" color="error" startIcon={<IconTrash size={18} />}>
                  Delete Account
                </Button>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Account;
