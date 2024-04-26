import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: null
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user } = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.user = user;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.loading = false;
      state.user = null;
    }
  }
});

export const { loginSuccess, logoutSuccess } = accountSlice.actions;

export default accountSlice.reducer;
