import { useEffect, useMemo, useState } from "react";
import { Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchMembers, inviteOrganizationMember } from "../redux/memberSlice";

import MemberSearch from "../components/MemberSearch";
import MemberTable from "../components/MemberTable";
import InviteMemberModal from "../components/InviteMemberModal";
import type { OrganizationMember } from "../types/member.type";
import MemberDetailsDrawer from "../components/MemberDetailsDrawer";

export default function MembersPage() {
  const dispatch = useAppDispatch();

  const {
    members = [],
    loading,
    submitting,
  } = useAppSelector((state) => state.member);

  const { roles = [] } = useAppSelector((state) => state.roles);

  const [inviteOpen, setInviteOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const [selectedMember, setSelectedMember] =
    useState<OrganizationMember | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

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

      const matchRole = !role || member.role?._id === role;

      return matchSearch && matchStatus && matchRole;
    });
  }, [members, search, status, role]);

  const handleInvite = async (data: any) => {
    const result = await dispatch(inviteOrganizationMember(data));

    if (inviteOrganizationMember.fulfilled.match(result)) {
      setInviteOpen(false);

      dispatch(fetchMembers());
    }
  };

  const handleSelectMember = (member: OrganizationMember) => {
    setSelectedMember(member);
    setDetailsOpen(true);
  };

  const handleCloseDrawer = () => {
    setDetailsOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-2 ">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-indigo-100 p-3">
            <Users className="h-7 w-7 text-indigo-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Team Members</h1>

            <p className="text-sm text-gray-500">
              Manage organization members.
            </p>
          </div>
        </div>
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
        onSelectMember={handleSelectMember}
      />
      {/* Invite */}

      <MemberDetailsDrawer
        open={detailsOpen}
        member={selectedMember}
        roles={roles}
        saving={submitting}
        onClose={handleCloseDrawer}
        onSave={(memberId, data) => {
          dispatch(
            updateOrganizationMember({
              memberId,
              payload: data,
            }),
          );
        }}
      />

      <InviteMemberModal
        open={inviteOpen}
        loading={submitting}
        roles={roles}
        onClose={() => setInviteOpen(false)}
        onSubmit={handleInvite}
      />
    </div>
  );
}
