import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  projects: [],
  projectId: '',
  role: '',
  project: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjectSuccess(state, action) {
      const { projects } = action.payload;
      state.loading = false;
      state.projects = projects;

      if (state.projectId !== '') {
        state.project = projects.find((project) => project.id === Number(state.projectId));
      }
    },
    createProjectSuccess(state, action) {
      const { project } = action.payload;
      state.loading = false;
      state.projects = [...state.projects, project];
    },
    setProjectIdSuccess(state, action) {
      const { id } = action.payload;
      state.project = state.projects.find((project) => project.id === Number(id));
      state.projectId = id;
      state.loading = false;
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { getProjectSuccess, createProjectSuccess, setProjectIdSuccess, hasError } = projectSlice.actions;

export default projectSlice.reducer;
