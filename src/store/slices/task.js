import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  tasks: []
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskSuccess(state, action) {
      const { task } = action.payload;
      state.loading = false;
      state.tasks = [task, ...state.tasks];
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const { hasError, addTaskSuccess } = taskSlice.actions;

export default taskSlice.reducer;
