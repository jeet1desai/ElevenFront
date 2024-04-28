import axios from 'utils/axios';
import { dispatch } from 'store/index';
import { hasError, inviteMemberSuccess } from 'store/slices/team';
import { openErrorSnackbar } from 'utils/utilsFn';

export const inviteUserService = (data) => {
  return async () => {
    try {
      await axios.post('user/invite', data);
      dispatch(inviteMemberSuccess());
    } catch (error) {
      openErrorSnackbar(error.msg, 'error');
      dispatch(hasError());
    }
  };
};
