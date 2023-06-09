import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/AuthSlice"
import taskReducer from "./features/task/TaskSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
