import axios from 'utils/axios';
import { dispatch } from 'store/index';
import { createProjectSuccess, getProjectSuccess, hasError } from 'store/slices/project';
import { openErrorSnackbar } from 'utils/utilsFn';

export const getProjectListService = () => {
  return async () => {
    try {
      const response = await axios.get('project/projects');
      dispatch(getProjectSuccess({ projects: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const createProjectListService = (data) => {
  return async () => {
    try {
      const response = await axios.post('project/projects', data);
      dispatch(createProjectSuccess({ project: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
