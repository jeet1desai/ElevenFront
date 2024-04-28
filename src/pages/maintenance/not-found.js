import React from 'react';

import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { Link } from 'react-router-dom';

import { DashboardOutlined } from '@ant-design/icons';

const CardMediaWrapper = styled('div')({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative'
});

const ErrorWrapper = styled('div')({
  margin: '0 auto',
  textAlign: 'center'
});

const ErrorCard = styled(Card)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const NotFound = () => {
  return (
    <>
      <ErrorCard>
        <CardContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <CardMediaWrapper>
                <CardMedia component="img" image={'https://mantisdashboard.io/assets/Error404-BY9on4wS.png'} title="Slider5 image" />
              </CardMediaWrapper>
            </Grid>
            <Grid item xs={12}>
              <ErrorWrapper>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" component="div">
                      Something is wrong
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">The page you are looking was moved, removed, renamed, or might never exist! </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Link to="/">
                        <Button variant="contained" size="large">
                          <DashboardOutlined style={{ fontSize: '1rem', marginRight: 8 }} /> Home
                        </Button>
                      </Link>
                    </AnimateButton>
                  </Grid>
                </Grid>
              </ErrorWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </ErrorCard>
    </>
  );
};

export default NotFound;
