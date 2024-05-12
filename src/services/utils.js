import { dispatch } from 'store/index';
import { getDashboardStatsSuccess, getTeamMemberSuccess, hasError } from 'store/slices/utils';
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

export const dashboardStatCountService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`user/stats/${projectId}`);
      dispatch(getDashboardStatsSuccess({ count: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
