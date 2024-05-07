import React from 'react';

import { Button, Grid, Typography } from '../../../node_modules/@mui/material/index';

import { IconEdit } from '@tabler/icons-react';

import MainCard from 'components/MainCard';

const Setting = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MainCard
            title="Project"
            secondary={
              <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                Edit
              </Button>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Project Name
                </Typography>
                <Typography variant="body1">Project Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Project Code
                </Typography>
                <Typography variant="body1">Project Code</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Status
                </Typography>
                <Typography variant="body1">Status</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Address
                </Typography>
                <Typography variant="body1">Address</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Start Date
                </Typography>
                <Typography variant="body1">Start Date</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  End Date
                </Typography>
                <Typography variant="body1">End Date</Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12}>
          <MainCard
            title="Company"
            secondary={
              <Button variant="contained" color="success" startIcon={<IconEdit size={18} />}>
                Edit
              </Button>
            }
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Company Name
                </Typography>
                <Typography variant="body1">Company Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Phone Number
                </Typography>
                <Typography variant="body1">Phone Number</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Title
                </Typography>
                <Typography variant="body1">Title</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Type
                </Typography>
                <Typography variant="body1">Type</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1" sx={{ color: '#8c8c8c' }}>
                  Industry
                </Typography>
                <Typography variant="body1">Industry</Typography>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Setting;
