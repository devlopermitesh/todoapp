import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: false, // false means light mode, true means dark mode
  todolists: [
   
  ],
  categories: ['All','play', "personal", "work", "school", "office", "new habit", 'workout']
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos(state, { payload }) {
      // Set the todos to the payload
      state.todolists = payload;
    },
    toggleTheme(state) {
      // Toggle the theme
      state.theme = !state.theme;
    },
    createTask(state, { payload }) {
      // Add new task to the list
      state.todolists.push(payload);
    },
    deleteTask(state, { payload }) {
      // Remove task with the given id
      state.todolists = state.todolists.filter(todo => todo.id !== payload.id);
    },
    editTask(state, { payload }) {
      // Update the task if the id matches
      state.todolists = state.todolists.map(todo =>
        todo.id === payload.id ? { ...todo, ...payload } : todo
      );
    }
  }
});

// Export the actions
export const { toggleTheme, createTask, deleteTask, editTask, setTodos } = TodoSlice.actions;

// Export the reducer
export default TodoSlice.reducer;
