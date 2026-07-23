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
  PaginationMeta,
} from "../types/member.type";

interface MemberState {
  members: OrganizationMember[];

  selectedMember: OrganizationMember | null;

  pagination: PaginationMeta | null;

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
/*                               FETCH MEMBERS                                */
/* -------------------------------------------------------------------------- */

export const fetchMembers = createAsyncThunk(
  "member/fetchMembers",
  async (query?: MemberQuery) => {
    return await getMembers(query);
  },
);

/* -------------------------------------------------------------------------- */
/*                              FETCH MEMBER BY ID                            */
/* -------------------------------------------------------------------------- */

export const fetchMemberById = createAsyncThunk(
  "member/fetchMemberById",
  async (memberId: string) => {
    const response = await getMemberById(memberId);

    return response.data;
  },
);

/* -------------------------------------------------------------------------- */
/*                               INVITE MEMBER                                */
/* -------------------------------------------------------------------------- */

export const inviteOrganizationMember = createAsyncThunk(
  "member/inviteOrganizationMember",
  async (payload: InviteMemberFormValues) => {
    const response = await inviteMember(payload);

    return response.data;
  },
);

/* -------------------------------------------------------------------------- */
/*                               UPDATE MEMBER                                */
/* -------------------------------------------------------------------------- */

export const updateOrganizationMember = createAsyncThunk(
  "member/updateOrganizationMember",
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

/* -------------------------------------------------------------------------- */
/*                               CHANGE ROLE                                  */
/* -------------------------------------------------------------------------- */

export const changeMemberRole = createAsyncThunk(
  "member/changeMemberRole",
  async ({ memberId, role }: { memberId: string; role: string }) => {
    const response = await updateMemberRole(memberId, role);

    return {
      memberId,
      role,
      response,
    };
  },
);

/* -------------------------------------------------------------------------- */
/*                              CHANGE STATUS                                 */
/* -------------------------------------------------------------------------- */

export const changeMemberStatus = createAsyncThunk(
  "member/changeMemberStatus",
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

/* -------------------------------------------------------------------------- */
/*                               DELETE MEMBER                                */
/* -------------------------------------------------------------------------- */

export const removeMember = createAsyncThunk(
  "member/removeMember",
  async (memberId: string) => {
    await deleteMember(memberId);

    return memberId;
  },
);

/* -------------------------------------------------------------------------- */
/*                              RESEND INVITE                                 */
/* -------------------------------------------------------------------------- */

export const resendMemberInvite = createAsyncThunk(
  "member/resendMemberInvite",
  async (memberId: string) => {
    await resendInvitation(memberId);

    return memberId;
  },
); /* -------------------------------------------------------------------------- */
/*                                    SLICE                                   */
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

  extraReducers: (builder) => {
    /* ---------------------------------------------------------------------- */
    /*                               FETCH MEMBERS                            */
    /* ---------------------------------------------------------------------- */

    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.loading = false;

        state.members = action.payload.data;

        state.pagination = action.payload.meta;
      })

      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message ?? "Failed to fetch members";
      });

    /* ---------------------------------------------------------------------- */
    /*                            FETCH MEMBER BY ID                          */
    /* ---------------------------------------------------------------------- */

    builder
      .addCase(fetchMemberById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMemberById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedMember = action.payload;
      })

      .addCase(fetchMemberById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message ?? "Failed to fetch member";
      });

    /* ---------------------------------------------------------------------- */
    /*                               INVITE MEMBER                            */
    /* ---------------------------------------------------------------------- */

    builder
      .addCase(inviteOrganizationMember.pending, (state) => {
        state.submitting = true;

        state.error = null;
      })

      .addCase(inviteOrganizationMember.fulfilled, (state) => {
        state.submitting = false;

        // MembersPage calls fetchMembers()
        // so we don't manually insert here.
      })

      .addCase(inviteOrganizationMember.rejected, (state, action) => {
        state.submitting = false;

        state.error = action.error.message ?? "Failed to invite member";
      });

    /* ---------------------------------------------------------------------- */
    /*                               UPDATE MEMBER                            */
    /* ---------------------------------------------------------------------- */

    builder
      .addCase(updateOrganizationMember.pending, (state) => {
        state.submitting = true;
      })

      .addCase(updateOrganizationMember.fulfilled, (state, action) => {
        state.submitting = false;

        const index = state.members.findIndex(
          (member) => member._id === action.payload._id,
        );

        if (index !== -1) {
          state.members[index] = action.payload;
        }

        state.selectedMember = action.payload;
      })

      .addCase(updateOrganizationMember.rejected, (state, action) => {
        state.submitting = false;

        state.error = action.error.message ?? "Failed to update member";
      });

    /* ---------------------------------------------------------------------- */
    /*                               CHANGE ROLE                              */
    /* ---------------------------------------------------------------------- */

    builder.addCase(changeMemberRole.fulfilled, (state, action) => {
      const member = state.members.find(
        (item) => item._id === action.payload.memberId,
      );

      if (!member) return;

      // If your API returns updated role object
      if (action.payload.response?.data?.role) {
        member.role = action.payload.response.data.role;
      }
    });

    /* ---------------------------------------------------------------------- */
    /*                              CHANGE STATUS                             */
    /* ---------------------------------------------------------------------- */

    builder.addCase(changeMemberStatus.fulfilled, (state, action) => {
      const member = state.members.find(
        (item) => item._id === action.payload.memberId,
      );

      if (member) {
        member.status = action.payload.status;
      }
    });

    /* ---------------------------------------------------------------------- */
    /*                               DELETE MEMBER                            */
    /* ---------------------------------------------------------------------- */

    builder.addCase(removeMember.fulfilled, (state, action) => {
      state.members = state.members.filter(
        (member) => member._id !== action.payload,
      );
    });

    /* ---------------------------------------------------------------------- */
    /*                              RESEND INVITE                             */
    /* ---------------------------------------------------------------------- */

    builder.addCase(resendMemberInvite.pending, (state) => {
      state.submitting = true;
    });

    builder.addCase(resendMemberInvite.fulfilled, (state) => {
      state.submitting = false;
    });

    builder.addCase(resendMemberInvite.rejected, (state, action) => {
      state.submitting = false;

      state.error = action.error.message ?? "Failed to resend invitation";
    });
  },
});

export const { clearSelectedMember, clearMemberError } = memberSlice.actions;

export default memberSlice.reducer;
