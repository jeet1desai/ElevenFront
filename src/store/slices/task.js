import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  task: null,
  tasks: [],
  stats: {
    stat: {
      closed: 0,
      in_review: 0,
      open: 0,
      pending: 0
    },
    user: []
  }
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
    },
    getTasksSuccess(state, action) {
      const { tasks } = action.payload;
      state.tasks = tasks;
      state.loading = false;
    },
    getTaskSuccess(state, action) {
      const { task } = action.payload;
      state.task = task;
      state.loading = false;
    },
    addTaskSuccess(state, action) {
      const { task } = action.payload;
      state.tasks = [task, ...state.tasks];
      state.loading = false;
    },
    editTaskSuccess(state, action) {
      const { task } = action.payload;
      state.tasks = state.tasks.map((taskItem) => (taskItem.id === task.id ? task : taskItem));
      state.task = task;
      state.loading = false;
    },
    addTaskCommentSuccess(state, action) {
      const { comment } = action.payload;
      state.task = { ...state.task, comments: [comment, ...state.task.comments] };
      state.loading = false;
    },
    deleteTaskSuccess(state, action) {
      const { task } = action.payload;
      state.tasks = state.tasks.filter((taskItem) => taskItem.id !== task.id);
      state.loading = false;
    },
    getTasksStatsSuccess(state, action) {
      const { stats } = action.payload;
      state.stats = {
        stat: stats.stats,
        user: stats.user
      };
      state.loading = false;
    },
    hasError(state) {
      state.loading = false;
    }
  }
});

export const {
  fetchRequest,
  hasError,
  addTaskSuccess,
  editTaskSuccess,
  getTasksSuccess,
  getTaskSuccess,
  deleteTaskSuccess,
  getTasksStatsSuccess,
  addTaskCommentSuccess
} = taskSlice.actions;

export default taskSlice.reducer;
