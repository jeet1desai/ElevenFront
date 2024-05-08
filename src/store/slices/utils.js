import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  teamMember: [],
  dashboardStats: {
    teamCount: 0,
    documentCount: 0,
    taskCount: 0
  }
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
    getDashboardStatsSuccess(state, action) {
      const { count } = action.payload;
      state.loading = false;
      state.dashboardStats = {
        teamCount: count.team_count,
        documentCount: count.document_count,
        taskCount: count.task_count
      };
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { hasError, getTeamMemberSuccess, getDashboardStatsSuccess } = utilsSlice.actions;

export default utilsSlice.reducer;
