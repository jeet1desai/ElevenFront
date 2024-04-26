import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  projects: [],
  projectId: '1'
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjectSuccess(state, action) {
      const { projects } = action.payload;
      state.loading = false;
      state.projects = projects;
    },
    setProjectIdSuccess(state, action) {
      const { id } = action.payload;
      state.loading = false;
      state.projectId = id;
    },
    hasError(state) {
      state.loading = false;
      state.projects = [];
      state.projectId = '';
    }
  }
});

export const { getProjectSuccess, setProjectIdSuccess, hasError } = projectSlice.actions;

export default projectSlice.reducer;
