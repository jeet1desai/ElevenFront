import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  tasks: []
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    getTaskSuccess(state, action) {
      const { tasks } = action.payload;
      state.tasks = tasks;
    },
    addTaskSuccess(state, action) {
      const { task } = action.payload;
      state.loading = false;
      state.tasks = [task, ...state.tasks];
    },
    deleteTaskSuccess(state, action) {
      const { task } = action.payload;
      state.loading = false;
      state.tasks = state.tasks.filter((taskItem) => taskItem.id !== task.id);
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { hasError, addTaskSuccess, getTaskSuccess, deleteTaskSuccess } = taskSlice.actions;

export default taskSlice.reducer;
