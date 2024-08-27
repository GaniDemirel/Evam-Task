import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./EmployeesSlice";
import notificationReducer from "./NotificationSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    notification: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
