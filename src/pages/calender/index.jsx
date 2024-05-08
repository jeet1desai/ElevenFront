import React, { useRef, useState } from 'react';

import { useMediaQuery } from '@mui/material';

import MainCard from 'components/MainCard';
import CalendarStyled from 'components/styled-css/CalendarStyled';
import Toolbar from './Toolbar';

import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { Dialog } from '../../../node_modules/@mui/material/index';

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
        hello
      </Dialog>
    </>
  );
};

export default Calender;
