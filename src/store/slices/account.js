import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  isLoggedIn: false,
  user: null,
  company: null,
  isCompany: true
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { user, isCompany } = action.payload;
      state.isLoggedIn = true;
      state.user = user;
      state.isCompany = isCompany;
      state.loading = false;
    },
    createCompanySuccess(state) {
      state.isCompany = true;
      state.loading = false;
    },
    getCompanySuccess(state, action) {
      const { company } = action.payload;
      state.company = company;
      state.loading = false;
    },
    editCompanySuccess(state, action) {
      const { company } = action.payload;
      state.company = company;
      state.loading = false;
    },
    updateAccountSuccess(state, action) {
      const { user } = action.payload;
      state.user = user;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.loading = false;
    }
  }
});

export const { loginSuccess, createCompanySuccess, getCompanySuccess, editCompanySuccess, logoutSuccess, updateAccountSuccess } =
  accountSlice.actions;

export default accountSlice.reducer;
