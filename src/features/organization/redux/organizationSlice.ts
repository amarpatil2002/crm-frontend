import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getOrganizationProfile,
  updateOrganization,
} from "../api/organization.api";

import type { Organization } from "../types/organization.type";

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

export const fetchOrganization = createAsyncThunk(
  "organization/fetchOrganization",
  async () => {
    return await getOrganizationProfile();
  },
);

export const updateOrganizationProfile = createAsyncThunk(
  "organization/updateOrganization",
  async (data: Partial<Organization>) => {
    return await updateOrganization(data);
  },
);

const organizationSlice = createSlice({
  name: "organization",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchOrganization.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.loading = false;

        state.organization = action.payload;
      })

      .addCase(fetchOrganization.rejected, (state) => {
        state.loading = false;

        state.error = "Failed to fetch organization.";
      })

      .addCase(updateOrganizationProfile.pending, (state) => {
        state.updating = true;

        state.error = null;
      })

      .addCase(updateOrganizationProfile.fulfilled, (state, action) => {
        state.updating = false;

        state.organization = action.payload;
      })

      .addCase(updateOrganizationProfile.rejected, (state) => {
        state.updating = false;

        state.error = "Failed to update organization.";
      });
  },
});

export default organizationSlice.reducer;
