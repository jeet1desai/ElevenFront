import { dispatch } from 'store/index';
import { addTaskSuccess, deleteTaskSuccess, getTaskSuccess, hasError } from 'store/slices/task';

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

export const getProjectTaskService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`tasks/team/${projectId}`);
      dispatch(getTaskSuccess({ tasks: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const assignedTaskService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`tasks/my/${projectId}`);
      dispatch(getTaskSuccess({ tasks: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const deleteTaskService = (taskId) => {
  return async () => {
    try {
      const response = await axios.delete(`tasks/task/${taskId}`);
      dispatch(deleteTaskSuccess({ task: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
