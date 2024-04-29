import axios from 'utils/axios';
import { dispatch } from 'store/index';
import { getTeamMembersSuccess, hasError, inviteMemberSuccess, removeTeamMemberSuccess } from 'store/slices/team';
import { openErrorSnackbar } from 'utils/utilsFn';

export const inviteUserService = (data) => {
  return async () => {
    try {
      const response = await axios.post('user/invite', data);
      dispatch(inviteMemberSuccess({ team: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const getTeamsService = (projectId) => {
  return async () => {
    try {
      const response = await axios.get(`teams/team/${projectId}`);
      dispatch(getTeamMembersSuccess({ teams: response.data.data }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};

export const removeTeamMemberService = (memberId, projectId, userId) => {
  return async () => {
    try {
      await axios.delete(`teams/team/${projectId}/${userId}`);
      dispatch(removeTeamMemberSuccess({ id: memberId }));
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
