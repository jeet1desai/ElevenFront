import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  teams: []
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    inviteMemberSuccess(state, action) {
      const { team } = action.payload;
      state.loading = false;
      state.teams = [...state.teams, team];
    },
    getTeamMembersSuccess(state, action) {
      const { teams } = action.payload;
      state.loading = false;
      state.teams = teams;
    },
    getTeamMemberRoleSuccess(state, action) {
      const { team } = action.payload;
      state.loading = false;
      state.teams = state.teams.map((teamMember) => (teamMember.id !== team.id ? teamMember : team));
    },
    removeTeamMemberSuccess(state, action) {
      const { id } = action.payload;
      state.loading = false;
      state.teams = state.teams.filter((team) => team.id !== id);
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { inviteMemberSuccess, getTeamMembersSuccess, removeTeamMemberSuccess, getTeamMemberRoleSuccess, hasError } =
  teamSlice.actions;

export default teamSlice.reducer;
