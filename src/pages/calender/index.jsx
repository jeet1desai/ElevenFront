import React, { useEffect, useRef, useState } from 'react';

import { useMediaQuery } from '@mui/material';
import dayjs from 'dayjs';

import MainCard from 'components/MainCard';
import CalendarStyled from 'components/styled-css/CalendarStyled';
import Toolbar from './Toolbar';
import EventForm from './EventForm';

import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';

import { useDispatch, useSelector } from 'store/index';
import { setEventSuccess } from 'store/slices/calendar';
import { addCalendarEventService, getProjectEventsService } from 'services/calendar';

import { handleUserName } from 'utils/utilsFn';

const Calender = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const matchSm = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const { projectId } = useSelector((state) => state.project);
  const { events } = useSelector((state) => state.calendar);

  const [date, setDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [formValue, setFormValue] = useState(null);

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
    setSelectedRange({
      start: dayjs(arg.start).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      end: dayjs(arg.end).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    });
    setIsModalOpen(true);
  };

  const handleEventSelect = (arg) => {
    if (arg.event.id !== undefined) {
      const selectEvent = events.find((_event) => _event.id === Number(arg.event.id));
      dispatch(setEventSuccess({ calendar: selectEvent }));
      setFormValue({
        title: selectEvent.title,
        assign: selectEvent.assign.map((user) => {
          return { label: handleUserName(user), id: user.id };
        }),
        description: JSON.parse(selectEvent.description),
        color: selectEvent.color,
        background_color: selectEvent.background_color,
        start_date: selectEvent.start_date,
        end_date: selectEvent.end_date
      });
    } else {
      setFormValue(null);
    }
    setIsModalOpen(true);
  };

  const handleEventCreate = async (data) => {
    dispatch(addCalendarEventService(data));
    handleModalClose();
  };

  const handleFetchEvents = () => {
    dispatch(getProjectEventsService(projectId));
  };

  useEffect(() => {
    if (projectId) {
      handleFetchEvents();
    }
  }, [dispatch, projectId]);

  return (
    <>
      <MainCard>
        <CalendarStyled>
          <Toolbar
            date={date}
            onClickNext={handleDateNext}
            onClickPrev={handleDatePrev}
            onClickToday={handleDateToday}
            fetchData={handleFetchEvents}
          />
          <FullCalendar
            weekends
            editable
            droppable
            selectable
            events={events}
            ref={calendarRef}
            rerenderDelay={10}
            initialDate={date}
            initialView={'dayGridMonth'}
            dayMaxEventRows={2}
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

      {isModalOpen && (
        <EventForm
          isOpen={isModalOpen}
          event={formValue}
          range={selectedRange}
          onCancel={handleModalClose}
          // handleDelete={handleEventDelete}
          handleCreate={handleEventCreate}
          // handleUpdate={handleUpdateEvent}
        />
      )}
    </>
  );
};

export default Calender;
