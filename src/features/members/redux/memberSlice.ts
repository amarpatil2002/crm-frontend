import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  deleteMember,
  getMemberById,
  getMembers,
  inviteMember,
  resendInvitation,
  updateMember,
  updateMemberRole,
  updateMemberStatus,
  type MemberQuery,
} from "../api/member.api";

import type {
  InviteMemberFormValues,
  OrganizationMember,
} from "../types/member.type";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface MemberState {
  members: OrganizationMember[];
  selectedMember: OrganizationMember | null;

  pagination: Pagination | null;

  loading: boolean;
  submitting: boolean;

  error: string | null;
}

const initialState: MemberState = {
  members: [],
  selectedMember: null,

  pagination: null,

  loading: false,
  submitting: false,

  error: null,
};

/* -------------------------------------------------------------------------- */
/*                                   THUNKS                                   */
/* -------------------------------------------------------------------------- */

export const fetchMembers = createAsyncThunk(
  "member/fetchMembers",
  async (query?: MemberQuery) => {
    const response = await getMembers(query);
    return response.data;
  },
);

export const fetchMemberById = createAsyncThunk(
  "member/fetchMemberById",
  async (memberId: string) => {
    const response = await getMemberById(memberId);
    return response.data;
  },
);

export const inviteOrganizationMember = createAsyncThunk(
  "member/invite",
  async (payload: InviteMemberFormValues) => {
    const response = await inviteMember(payload);
    return response.data;
  },
);

export const updateOrganizationMember = createAsyncThunk(
  "member/update",
  async ({
    memberId,
    payload,
  }: {
    memberId: string;
    payload: Partial<InviteMemberFormValues>;
  }) => {
    const response = await updateMember(memberId, payload);
    return response.data;
  },
);

export const changeMemberRole = createAsyncThunk(
  "member/changeRole",
  async ({ memberId, role }: { memberId: string; role: string }) => {
    const response = await updateMemberRole(memberId, role);

    return {
      memberId,
      role,
      response,
    };
  },
);

export const changeMemberStatus = createAsyncThunk(
  "member/changeStatus",
  async ({
    memberId,
    status,
  }: {
    memberId: string;
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  }) => {
    const response = await updateMemberStatus(memberId, status);

    return {
      memberId,
      status,
      response,
    };
  },
);

export const removeMember = createAsyncThunk(
  "member/delete",
  async (memberId: string) => {
    await deleteMember(memberId);

    return memberId;
  },
);

export const resendMemberInvite = createAsyncThunk(
  "member/resendInvite",
  async (memberId: string) => {
    await resendInvitation(memberId);

    return memberId;
  },
);

/* -------------------------------------------------------------------------- */
/*                                   SLICE                                    */
/* -------------------------------------------------------------------------- */

const memberSlice = createSlice({
  name: "member",

  initialState,

  reducers: {
    clearSelectedMember(state) {
      state.selectedMember = null;
    },

    clearMemberError(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    /* ---------------- Fetch Members ---------------- */

    builder.addCase(fetchMembers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.loading = false;

      state.members = action.payload.items;
      state.pagination = action.payload.pagination;
    });

    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.loading = false;

      state.error = action.error.message || "Failed to fetch members";
    });

    /* ---------------- Fetch By Id ---------------- */

    builder.addCase(fetchMemberById.fulfilled, (state, action) => {
      state.selectedMember = action.payload;
    });

    /* ---------------- Invite ---------------- */

    builder.addCase(inviteOrganizationMember.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(inviteOrganizationMember.fulfilled, (state, action) => {
      state.submitting = false;

      state.members.unshift(action.payload);
    });

    builder.addCase(inviteOrganizationMember.rejected, (state, action) => {
      state.submitting = false;

      state.error = action.error.message || "Invite failed";
    });

    /* ---------------- Update ---------------- */

    builder.addCase(updateOrganizationMember.fulfilled, (state, action) => {
      const index = state.members.findIndex(
        (member) => member._id === action.payload._id,
      );

      if (index !== -1) {
        state.members[index] = action.payload;
      }

      state.selectedMember = action.payload;
    });

    /* ---------------- Change Status ---------------- */

    builder.addCase(changeMemberStatus.fulfilled, (state, action) => {
      const member = state.members.find(
        (item) => item._id === action.payload.memberId,
      );

      if (member) {
        member.status = action.payload.status;
      }
    });

    /* ---------------- Delete ---------------- */

    builder.addCase(removeMember.fulfilled, (state, action) => {
      state.members = state.members.filter(
        (member) => member._id !== action.payload,
      );
    });
  },
});

export const { clearMemberError, clearSelectedMember } = memberSlice.actions;

export default memberSlice.reducer;
