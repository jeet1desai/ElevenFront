import { dispatch } from 'store/index';
import { getProjectSuccess, hasError } from 'store/slices/project';
import axios from 'utils/axios';
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
