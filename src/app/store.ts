import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/authSlice";
import organizationReducer from "../features/organization/redux/organizationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
