import { dispatch } from 'store/index';
import { addCalendarEventSuccess, fetchRequest, getCalendarEventsSuccess, hasError } from 'store/slices/calendar';
import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';

export const addCalendarEventService = (data) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.post('calenders/calender', data);
      dispatch(addCalendarEventSuccess({ calendar: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getProjectEventsService = (projectId) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.get(`calenders/calender/${projectId}`);
      dispatch(getCalendarEventsSuccess({ calendars: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
