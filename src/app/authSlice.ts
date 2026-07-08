import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../features/auth/types/auth.type";
import { storage } from "../utils/storage";

interface SetCredentialsPayload {
  user: User;
  accessToken: string;
}

const initialState: AuthState = {
  user: storage.getUser(),
  accessToken: storage.getAccessToken(),
  refreshToken: storage.getRefreshToken(),
  isAuthenticated: Boolean(storage.getAccessToken() && storage.getUser()),
  isBootstrapped: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<SetCredentialsPayload>) {
      const { user, accessToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;

      storage.setUser(user);
      storage.setAccessToken(accessToken);
    },

    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      storage.clearAuth();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
