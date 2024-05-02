import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todo: []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    hasError(state) {
      state.loading = false;
    },
    createTodoSuccess(state, action) {
      const { todo } = action.payload;
      state.todo = [todo, ...state.todo];
    },
    deleteTodoSuccess(state, action) {
      const { id } = action.payload;
      state.todo = state.todo.filter((todoItem) => todoItem.id !== id);
    },
    checkedTodoSuccess(state, action) {
      const { todo, checked } = action.payload;
      state.todo = state.todo.map((todoItem) =>
        todoItem.id === todo.id ? { id: todo.id, title: todo.title, checked: checked } : todoItem
      );
    }
  }
});

export const { hasError, createTodoSuccess, deleteTodoSuccess, checkedTodoSuccess } = todoSlice.actions;

export default todoSlice.reducer;
