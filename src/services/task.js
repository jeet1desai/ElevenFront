import { dispatch } from 'store/index';
import {
  addTaskCommentSuccess,
  addTaskSuccess,
  deleteTaskSuccess,
  editTaskSuccess,
  fetchRequest,
  getTaskSuccess,
  getTasksSuccess,
  hasError
} from 'store/slices/task';

import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';

export const addTaskService = (data) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.post('tasks/task', data);
      dispatch(addTaskSuccess({ task: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const editTaskService = (taskId, data) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.put(`tasks/task/${taskId}`, data);
      dispatch(editTaskSuccess({ task: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getProjectTaskService = (projectId, search, status, user) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.get(`tasks/team/${projectId}?search=${search}&status=${status}&user=${user}`);
      dispatch(getTasksSuccess({ tasks: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const assignedTaskService = (projectId, search, status) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.get(`tasks/my/${projectId}?search=${search}&status=${status}`);
      dispatch(getTasksSuccess({ tasks: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const deleteTaskService = (taskId) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.delete(`tasks/task/${taskId}`);
      dispatch(deleteTaskSuccess({ task: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getTaskService = (taskId) => {
  return async () => {
    try {
      dispatch(fetchRequest());
      const response = await axios.get(`tasks/task/${taskId}`);
      dispatch(getTaskSuccess({ task: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const addTaskCommentService = (taskId, data) => {
  return async () => {
    try {
      const response = await axios.post(`tasks/task/comment/${taskId}`, data);
      dispatch(addTaskCommentSuccess({ comment: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getDashboardTaskService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`tasks/dash/${projectId}`);
      dispatch(getTasksSuccess({ tasks: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
