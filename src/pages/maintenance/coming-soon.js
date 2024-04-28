import React from 'react';

import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import { Link } from 'react-router-dom';

import { useTimer } from 'react-timer-hook';

const ComingSoonCard = styled(Card)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const PageContentWrapper = styled('div')({
  maxWidth: 450,
  margin: '0 auto',
  textAlign: 'center'
});

const TimerWrapper = styled('div')({
  maxWidth: 450,
  margin: '0 auto'
});

const TimeBlock = styled('div')(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
  color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.main,
  borderRadius: '8px 8px 0 0',
  padding: '24px 0',
  textAlign: 'center',
  fontWeight: 700,
  fontSize: '3rem'
}));

const TimeTitleBlock = styled('div')(({ theme }) => ({
  background: '#fff',
  color: theme.palette.mode === 'dark' ? theme.palette.dark.light : theme.palette.secondary.main,
  borderRadius: '0 0 8px 8px',
  border: '1px solid #e6ebf1',
  padding: '8px 0',
  textAlign: 'center',
  fontSize: '14px'
}));

const ComingSoon = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600 * 24 * 2 - 3600 * 15.5);

  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });

  return (
    <>
      <ComingSoonCard>
        <CardContent>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              <PageContentWrapper>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h1">Coming Soon</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">Something new is on it&apos;s way</Typography>
                  </Grid>
                </Grid>
              </PageContentWrapper>
            </Grid>
            <Grid item xs={12}>
              <TimerWrapper>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TimeBlock>{days}</TimeBlock>
                    <TimeTitleBlock>day</TimeTitleBlock>
                  </Grid>
                  <Grid item xs={3}>
                    <TimeBlock>{hours}</TimeBlock>
                    <TimeTitleBlock>hour</TimeTitleBlock>
                  </Grid>
                  <Grid item xs={3}>
                    <TimeBlock>{minutes}</TimeBlock>
                    <TimeTitleBlock>min</TimeTitleBlock>
                  </Grid>
                  <Grid item xs={3}>
                    <TimeBlock>{seconds}</TimeBlock>
                    <TimeTitleBlock>sec</TimeTitleBlock>
                  </Grid>
                </Grid>
              </TimerWrapper>
            </Grid>
            <Grid item xs={12}>
              <PageContentWrapper>
                <AnimateButton>
                  <Link to="/login">
                    <Button variant="contained" size="large">
                      Login
                    </Button>
                  </Link>
                </AnimateButton>
              </PageContentWrapper>
            </Grid>
          </Grid>
        </CardContent>
      </ComingSoonCard>
    </>
  );
};

export default ComingSoon;
