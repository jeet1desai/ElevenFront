import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  event: null,
  events: []
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
    },
    addCalendarEventSuccess(state, action) {
      const { calendar } = action.payload;
      const data = {
        ...calendar,
        start: calendar.start_date,
        end: calendar.end_date,
        color: calendar.background_color,
        textColor: calendar.color
      };
      state.events = [data, ...state.events];
      state.loading = false;
    },
    getCalendarEventsSuccess(state, action) {
      const { calendars } = action.payload;
      state.events = calendars.map((event) => ({
        ...event,
        start: event.start_date,
        end: event.end_date,
        color: event.background_color,
        textColor: event.color
      }));
      state.loading = false;
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { fetchRequest, hasError, addCalendarEventSuccess, getCalendarEventsSuccess } = calendarSlice.actions;

export default calendarSlice.reducer;
