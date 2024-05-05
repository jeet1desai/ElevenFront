import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  tasks: []
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
    },
    getTaskSuccess(state, action) {
      const { tasks } = action.payload;
      state.loading = false;
      state.tasks = tasks;
    },
    addTaskSuccess(state, action) {
      const { task } = action.payload;
      state.loading = false;
      state.tasks = [task, ...state.tasks];
    },
    editTaskSuccess(state, action) {
      const { task } = action.payload;
      state.loading = false;
      state.tasks = state.tasks.map((taskItem) => (taskItem.id === task.id ? task : taskItem));
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

export const { fetchRequest, hasError, addTaskSuccess, editTaskSuccess, getTaskSuccess, deleteTaskSuccess } = taskSlice.actions;

export default taskSlice.reducer;
