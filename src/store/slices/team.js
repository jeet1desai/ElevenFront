import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  teams: []
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    inviteMemberSuccess(state) {
      state.loading = false;
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { inviteMemberSuccess, hasError } = teamSlice.actions;

export default teamSlice.reducer;
