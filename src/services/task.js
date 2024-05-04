import { dispatch } from 'store/index';
import { hasError } from 'store/slices/task';

import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';

export const addTaskService = (data) => {
  return async () => {
    try {
      const response = await axios.post('tasks/task', data);
      dispatch(addTaskSuccess({ task: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};