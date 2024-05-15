import React, { useRef, useState } from 'react';

import { Dialog, useMediaQuery } from '@mui/material';

import MainCard from 'components/MainCard';
import CalendarStyled from 'components/styled-css/CalendarStyled';
import Toolbar from './Toolbar';

import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import EventForm from './EventForm';

const Calender = () => {
  const calendarRef = useRef(null);
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [date, setDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateToday = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleDatePrev = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleDateNext = () => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleRangeSelect = (arg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }

    console.log(arg.start, arg.end);
    setIsModalOpen(true);
  };

  const handleEventSelect = (arg) => {
    if (arg.event.id) {
      const selectEvent = events.find((_event) => _event.id === arg.event.id);
      console.log(selectEvent);
      // setSelectedEvent(selectEvent);
    } else {
      // setSelectedEvent(null);
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <MainCard>
        <CalendarStyled>
          <Toolbar date={date} onClickNext={handleDateNext} onClickPrev={handleDatePrev} onClickToday={handleDateToday} />
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            // events={events}
            ref={calendarRef}
            rerenderDelay={10}
            initialDate={date}
            initialView={'dayGridMonth'}
            dayMaxEventRows={3}
            eventDisplay="block"
            headerToolbar={false}
            allDayMaintainDuration
            eventResizableFromStart
            select={handleRangeSelect}
            // eventDrop={handleEventUpdate}
            eventClick={handleEventSelect}
            // eventResize={handleEventUpdate}
            height={matchSm ? 'auto' : 720}
            plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
          />
        </CalendarStyled>
      </MainCard>

      <Dialog maxWidth="sm" fullWidth onClose={handleModalClose} open={isModalOpen} sx={{ '& .MuiDialog-paper': { p: 0 } }}>
        {/* <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ flexWrap: 'nowrap' }}>
          <Grid item>
            <DialogTitle sx={{ fontSize: '1.3rem', fontWeight: '500' }}>
              {1 === Number('2') ? `Edit Event: task name` : 'Add Event'}
            </DialogTitle>
          </Grid>
          <Grid item sx={{ mr: 1.5 }}>
            <IconButton color="secondary" onClick={() => onClose(false)}>
              <IconX />
            </IconButton>
          </Grid>
        </Grid>
        <DialogActions sx={{ padding: '15px 24px', justifyContent: 'space-between' }}>
          {1 === Number('2') ? (
            <IconButton color="error">
              <IconTrash />
            </IconButton>
          ) : (
            <div></div>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button color="error" onClick={() => handleModalClose(false)}>
              Cancel
            </Button>
            <Button disableElevation variant="contained" type="submit">
              {1 === Number('2') ? 'Save' : 'Add'}
            </Button>
          </Box>
        </DialogActions> */}
        {isModalOpen && (
          <EventForm
            // event={selectedEvent}
            // range={selectedRange}
            onCancel={handleModalClose}
            // handleDelete={handleEventDelete}
            // handleCreate={handleEventCreate}
            // handleUpdate={handleUpdateEvent}
          />
        )}
      </Dialog>
    </>
  );
};

export default Calender;
