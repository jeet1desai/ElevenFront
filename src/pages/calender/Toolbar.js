import React, { useEffect, useState } from 'react';

import { Button, ButtonGroup, Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

import { IconChevronLeft, IconChevronRight, IconLayoutGrid, IconTemplate, IconLayoutList, IconListNumbers } from '@tabler/icons-react';

const viewOptions = [
  {
    label: 'Month',
    value: 'dayGridMonth',
    icon: IconLayoutGrid
  },
  {
    label: 'Week',
    value: 'timeGridWeek',
    icon: IconTemplate
  },
  {
    label: 'Day',
    value: 'timeGridDay',
    icon: IconLayoutList
  },
  {
    label: 'Agenda',
    value: 'listWeek',
    icon: IconListNumbers
  }
];

const Toolbar = ({ date, view, onClickNext, onClickPrev, onClickToday, onChangeView, ...others }) => {
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [newViewOption, setNewViewOption] = useState(viewOptions);

  useEffect(() => {
    let newOption = viewOptions;
    if (matchSm) {
      newOption = viewOptions.filter((options) => options.value !== 'dayGridMonth' && options.value !== 'timeGridWeek');
    }
    setNewViewOption(newOption);
  }, [matchSm]);

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
        <ButtonGroup variant="outlined">
          {newViewOption.map((viewOption) => {
            const Icon = viewOption.icon;
            return (
              <Button
                key={viewOption.value}
                disableElevation
                variant={viewOption.value === view ? 'contained' : 'outlined'}
                onClick={() => onChangeView(viewOption.value)}
                sx={{ borderWidth: '0px !important' }}
              >
                <Icon stroke="2" size="20px" />
              </Button>
            );
          })}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Toolbar;
