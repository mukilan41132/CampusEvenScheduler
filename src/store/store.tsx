import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slices/create-student/studentSlice";
import authReducer from "../slices/auth/authSlice";
import ManageEventReducer from "../slices/manage-events/manage-eventSlice";
export const store = configureStore({
  reducer: {
    students: studentReducer,
    eventsList: ManageEventReducer,
    authlogin: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
