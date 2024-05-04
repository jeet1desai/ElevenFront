import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  teamMember: []
};

const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    getTeamMemberSuccess(state, action) {
      const { teamMember } = action.payload;
      state.loading = false;
      state.teamMember = teamMember;
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { hasError, getTeamMemberSuccess } = utilsSlice.actions;

export default utilsSlice.reducer;
