import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/redux/authSlice";
import organizationReducer from "../features/organization/redux/organizationSlice";
import profileReducer from "../features/profile/redux/profileSlice";
import rolesReducer from "../features/rolesandpermissions/redux/roleSlice";
import memberReducer from "../features/members/redux/memberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    organization: organizationReducer,
    profile: profileReducer,
    roles: rolesReducer,
    member: memberReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
