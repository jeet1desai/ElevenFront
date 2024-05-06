import React from 'react';

import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const Toolbar = ({ date, onClickNext, onClickPrev, onClickToday, ...others }) => {
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
      <Grid item></Grid>
    </Grid>
  );
};

export default Toolbar;
