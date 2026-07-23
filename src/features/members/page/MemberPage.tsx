import { useEffect, useMemo, useState } from "react";
import { Plus, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import {
  fetchMembers,
  fetchMemberById,
  inviteOrganizationMember,
  updateOrganizationMember,
  changeMemberRole,
  changeMemberStatus,
  removeMember,
} from "../redux/memberSlice";

import type {
  InviteMemberFormValues,
  OrganizationMember,
} from "../types/member.type";

import MemberSearch from "../components/MemberSearch";
import MemberTable from "../components/MemberTable";
import InviteMemberModal from "../components/InviteMemberModal";
import MemberDetailsDrawer from "../components/MemberDetailsDrawer";

export default function MembersPage() {
  const dispatch = useAppDispatch();

  const {
    members = [],
    selectedMember,
    loading,
    submitting,
  } = useAppSelector((state) => state.member);

  const { roles = [] } = useAppSelector((state) => state.roles);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const keyword = search.toLowerCase();

      const fullName =
        `${member.user.firstName} ${member.user.lastName}`.toLowerCase();

      const matchSearch =
        !keyword ||
        fullName.includes(keyword) ||
        member.user.email.toLowerCase().includes(keyword);

      const matchStatus = !status || member.status === status;

      const matchRole = !role || member.role._id === role;

      return matchSearch && matchStatus && matchRole;
    });
  }, [members, search, role, status]);

  const handleMemberClick = async (member: OrganizationMember) => {
    const result = await dispatch(fetchMemberById(member._id));

    if (fetchMemberById.fulfilled.match(result)) {
      setDrawerOpen(true);
    }
  };

  const handleInvite = async (data: InviteMemberFormValues) => {
    const result = await dispatch(inviteOrganizationMember(data));

    if (inviteOrganizationMember.fulfilled.match(result)) {
      setInviteOpen(false);

      dispatch(fetchMembers());
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-indigo-600" />

          <div>
            <h1 className="text-2xl font-semibold">Team Members</h1>

            <p className="text-sm text-gray-500">
              Manage organization members.
            </p>
          </div>
        </div>

        <button
          onClick={() => setInviteOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 px-4 py-2 text-white"
        >
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      {/* Search */}

      <MemberSearch
        search={search}
        status={status}
        role={role}
        roles={roles}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onRoleChange={setRole}
        onInvite={() => setInviteOpen(true)}
      />

      {/* Members */}

      <MemberTable
        members={filteredMembers}
        loading={loading}
        onSelectMember={async (member) => {
          const result = await dispatch(fetchMemberById(member._id));

          if (fetchMemberById.fulfilled.match(result)) {
            setDrawerOpen(true);
          }
        }}
      />

      {/* Invite */}

      <InviteMemberModal
        open={inviteOpen}
        loading={submitting}
        roles={roles}
        onClose={() => setInviteOpen(false)}
        onSubmit={handleInvite}
      />

      {/* Member Drawer */}

      <MemberDetailsDrawer
        open={drawerOpen}
        member={selectedMember}
        roles={roles}
        saving={submitting}
        onClose={() => setDrawerOpen(false)}
        onSave={(memberId, data) => {
          dispatch(
            updateOrganizationMember({
              memberId,
              payload: data,
            }),
          );
        }}
        onUpdateRole={(memberId, roleId) => {
          dispatch(
            changeMemberRole({
              memberId,
              role: roleId,
            }),
          );
        }}
        onUpdateStatus={(memberId, status) => {
          dispatch(
            changeMemberStatus({
              memberId,
              status,
            }),
          );
        }}
        onDelete={(memberId) => {
          dispatch(removeMember(memberId));

          setDrawerOpen(false);
        }}
      />
    </div>
  );
}
