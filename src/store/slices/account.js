import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  user: null,
  project: []
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user } = action.payload;
      state.loading = false;
      state.user = user;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
    }
  }
});

export const { loginSuccess, logoutSuccess } = accountSlice.actions;

export default accountSlice.reducer;
