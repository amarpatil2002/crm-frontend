import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getProfile, updateProfile, uploadAvatar } from "../api/profile.api";

import type { Profile, ProfileFormValues } from "../types/profile.type";

interface ProfileState {
  profile: Profile | null;

  loading: boolean;

  updating: boolean;

  uploading: boolean;

  error: string | null;
}

const initialState: ProfileState = {
  profile: null,

  loading: false,

  updating: false,

  uploading: false,

  error: null,
};

/**
 * Fetch Logged In User Profile
 */
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, thunkAPI) => {
    try {
      return await getProfile();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch profile.",
      );
    }
  },
);

/**
 * Update Profile
 */
export const updateUserProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data: ProfileFormValues, thunkAPI) => {
    try {
      return await updateProfile(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to update profile.",
      );
    }
  },
);

/**
 * Upload Avatar
 */
export const uploadUserAvatar = createAsyncThunk(
  "profile/uploadAvatar",
  async (file: File, thunkAPI) => {
    try {
      const avatar = await uploadAvatar(file);

      return avatar;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to upload avatar.",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===============================
      // Fetch Profile
      // ===============================

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload;
      })

      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = (action.payload as string) ?? "Failed to fetch profile.";
      })

      // ===============================
      // Update Profile
      // ===============================

      .addCase(updateUserProfile.pending, (state) => {
        state.updating = true;

        state.error = null;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.updating = false;

        state.profile = action.payload;
      })

      .addCase(updateUserProfile.rejected, (state, action) => {
        state.updating = false;

        state.error = (action.payload as string) ?? "Failed to update profile.";
      })

      // ===============================
      // Upload Avatar
      // ===============================

      .addCase(uploadUserAvatar.pending, (state) => {
        state.uploading = true;

        state.error = null;
      })

      .addCase(uploadUserAvatar.fulfilled, (state, action) => {
        state.uploading = false;

        if (state.profile) {
          state.profile.avatar = action.payload;
        }
      })

      .addCase(uploadUserAvatar.rejected, (state, action) => {
        state.uploading = false;

        state.error = (action.payload as string) ?? "Failed to upload avatar.";
      });
  },
});

export default profileSlice.reducer;
