import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getOrganizationProfile,
  updateOrganization,
} from "../api/organization.api";

import type {
  Organization,
  OrganizationFormValues,
} from "../types/organization.type";

interface OrganizationState {
  organization: Organization | null;

  loading: boolean;

  updating: boolean;

  error: string | null;
}

const initialState: OrganizationState = {
  organization: null,

  loading: false,

  updating: false,

  error: null,
};

/**
 * Fetch Organization
 */
export const fetchOrganization = createAsyncThunk(
  "organization/fetchOrganization",
  async (_, thunkAPI) => {
    try {
      return await getOrganizationProfile();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch organization.",
      );
    }
  },
);

/**
 * Update Organization
 */
export const updateOrganizationProfile = createAsyncThunk(
  "organization/updateOrganization",
  async (data: OrganizationFormValues, thunkAPI) => {
    try {
      return await updateOrganization(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to update organization.",
      );
    }
  },
);

const organizationSlice = createSlice({
  name: "organization",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ===============================
      // Fetch Organization
      // ===============================

      .addCase(fetchOrganization.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.loading = false;

        state.organization = action.payload;
      })

      .addCase(fetchOrganization.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ?? "Failed to fetch organization.";
      })

      // ===============================
      // Update Organization
      // ===============================

      .addCase(updateOrganizationProfile.pending, (state) => {
        state.updating = true;

        state.error = null;
      })

      .addCase(updateOrganizationProfile.fulfilled, (state, action) => {
        state.updating = false;

        state.organization = action.payload;
      })

      .addCase(updateOrganizationProfile.rejected, (state, action) => {
        state.updating = false;

        state.error =
          (action.payload as string) ?? "Failed to update organization.";
      });
  },
});

export default organizationSlice.reducer;
