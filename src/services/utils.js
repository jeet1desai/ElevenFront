import { dispatch } from 'store/index';
import { getTeamMemberSuccess, hasError } from 'store/slices/utils';
import axios from 'utils/axios';
import { openErrorSnackbar } from 'utils/utilsFn';

export const getTeamMemberService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`teams/team/member/${projectId}`);
      dispatch(getTeamMemberSuccess({ teamMember: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
