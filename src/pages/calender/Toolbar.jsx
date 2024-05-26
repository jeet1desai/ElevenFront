import React from 'react';

import { Button, Grid, IconButton, Stack, Typography, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';

import { IconChevronLeft, IconChevronRight, IconRefresh } from '@tabler/icons-react';

import { useSelector } from 'store/index';

const Toolbar = ({ date, onClickNext, onClickPrev, onClickToday, fetchData, ...others }) => {
  const { loading } = useSelector((state) => state.calendar);

  return (
    <Grid alignItems="center" container justifyContent="space-between" spacing={3} {...others} sx={{ pb: 3 }}>
      <Grid item>
        <Button variant="outlined" onClick={onClickToday}>
          Today
        </Button>
      </Grid>
      <Grid item>
        <Stack direction="row" alignItems="center" spacing={3}>
          <IconButton onClick={onClickPrev}>
            <IconChevronLeft />
          </IconButton>
          <Typography variant="h4" color="textPrimary">
            {dayjs(date).format('MMMM YYYY')}
          </Typography>
          <IconButton onClick={onClickNext}>
            <IconChevronRight />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item>
        <IconButton>
          {loading ? (
            <CircularProgress color="secondary" sx={{ height: 'unset !important' }} />
          ) : (
            <IconRefresh onClick={() => fetchData()} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
