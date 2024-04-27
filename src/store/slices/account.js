import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: null,
  isCompany: true
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, isCompany } = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
      state.user = user;
      state.isCompany = isCompany;
    },
    createCompanySuccess(state) {
      state.loading = false;
      state.isCompany = true;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.loading = false;
      state.user = null;
    }
  }
});

export const { loginSuccess, createCompanySuccess, logoutSuccess } = accountSlice.actions;

export default accountSlice.reducer;
