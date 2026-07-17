import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getRoles,
  getRoleById,
  createRole as createRoleApi,
  updateRole as updateRoleApi,
  deleteRole as deleteRoleApi,
  getPermissions,
} from "../api/role.api";

import type { Role, RoleFormValues } from "../types/role.type";

interface UpdateRolePayload {
  roleId: string;

  data: RoleFormValues;
}

interface RoleState {
  roles: Role[];

  selectedRole: Role | null;

  loading: boolean;

  creating: boolean;

  updating: boolean;

  deleting: boolean;

  error: string | null;
}

const initialState: RoleState = {
  roles: [],

  selectedRole: null,

  loading: false,

  creating: false,

  updating: false,

  deleting: false,

  error: null,
};

/**
 * Fetch All Roles
 */
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, thunkAPI) => {
    try {
      return await getRoles();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch roles.",
      );
    }
  },
);

/**
 * Fetch Single Role
 */
export const fetchRole = createAsyncThunk(
  "roles/fetchRole",
  async (roleId: string, thunkAPI) => {
    try {
      return await getRoleById(roleId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch role.",
      );
    }
  },
);

/**
 * Create Role
 */
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (data: RoleFormValues, thunkAPI) => {
    try {
      return await createRoleApi(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to create role.",
      );
    }
  },
);

/**
 * Update Role
 */
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ roleId, data }: UpdateRolePayload, thunkAPI) => {
    try {
      return await updateRoleApi(roleId, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to update role.",
      );
    }
  },
);

/**
 * Delete Role
 */
export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (roleId: string, thunkAPI) => {
    try {
      await deleteRoleApi(roleId);

      return roleId;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to delete role.",
      );
    }
  },
);

export const fetchPermissions = createAsyncThunk(
  "roles/fetchPermissions",
  async (_, thunkAPI) => {
    try {
      return await getPermissions();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Failed to fetch permissions.",
      );
    }
  },
);

const roleSlice = createSlice({
  name: "roles",

  initialState,

  reducers: {
    clearSelectedRole(state) {
      state.selectedRole = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===============================
      // Fetch Roles
      // ===============================

      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;

        state.roles = action.payload;
      })

      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;

        state.error = (action.payload as string) ?? "Failed to fetch roles.";
      })

      // ===============================
      // Fetch Role
      // ===============================

      .addCase(fetchRole.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(fetchRole.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedRole = action.payload;
      })

      .addCase(fetchRole.rejected, (state, action) => {
        state.loading = false;

        state.error = (action.payload as string) ?? "Failed to fetch role.";
      })

      // ===============================
      // Create Role
      // ===============================

      .addCase(createRole.pending, (state) => {
        state.creating = true;

        state.error = null;
      })

      .addCase(createRole.fulfilled, (state, action) => {
        state.creating = false;

        state.roles.unshift(action.payload);
      })

      .addCase(createRole.rejected, (state, action) => {
        state.creating = false;

        state.error = (action.payload as string) ?? "Failed to create role.";
      })

      // ===============================
      // Update Role
      // ===============================

      .addCase(updateRole.pending, (state) => {
        state.updating = true;

        state.error = null;
      })

      .addCase(updateRole.fulfilled, (state, action) => {
        state.updating = false;

        state.selectedRole = action.payload;

        state.roles = state.roles.map((role) =>
          role._id === action.payload._id ? action.payload : role,
        );
      })

      .addCase(updateRole.rejected, (state, action) => {
        state.updating = false;

        state.error = (action.payload as string) ?? "Failed to update role.";
      })

      // ===============================
      // Delete Role
      // ===============================

      .addCase(deleteRole.pending, (state) => {
        state.deleting = true;

        state.error = null;
      })

      .addCase(deleteRole.fulfilled, (state, action) => {
        state.deleting = false;

        state.roles = state.roles.filter((role) => role._id !== action.payload);

        if (state.selectedRole?._id === action.payload) {
          state.selectedRole = null;
        }
      })

      .addCase(deleteRole.rejected, (state, action) => {
        state.deleting = false;

        state.error = (action.payload as string) ?? "Failed to delete role.";
      });
  },
});

export const { clearSelectedRole } = roleSlice.actions;

export default roleSlice.reducer;
