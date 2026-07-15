import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
import organizationReducer from "../features/organization/redux/organizationSlice";
import profileReducer from "../features/profile/redux/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    profile: profileReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
