import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  projects: [],
  projectId: '',
  project: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjectSuccess(state, action) {
      const { projects } = action.payload;
      state.projects = projects;

      if (state.projectId !== '') {
        state.project = projects.find((project) => project.id === Number(state.projectId));
      }
      state.loading = false;
    },
    createProjectSuccess(state, action) {
      const { project } = action.payload;
      state.projects = [...state.projects, project];
      state.loading = false;
    },
    editProjectSuccess(state, action) {
      const { project } = action.payload;
      state.project = project;
      state.projects = state.projects.map((item) => (item.id === Number(project.id) ? project : item));
      state.loading = false;
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

export const { getProjectSuccess, createProjectSuccess, setProjectIdSuccess, editProjectSuccess, hasError } = projectSlice.actions;

export default projectSlice.reducer;
