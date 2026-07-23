import { useEffect, useMemo, useState } from "react";
import { Plus, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchMembers, inviteOrganizationMember } from "../redux/memberSlice";

import type { OrganizationMember } from "../types/member.type";

import MemberSearch from "../components/MemberSearch";
import MemberTable from "../components/MemberTable";
import InviteMemberModal from "../components/InviteMemberModal";

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

  const [editOpen, setEditOpen] = useState(false);
  const [changeRoleOpen, setChangeRoleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const keyword = search.toLowerCase();

      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();

      const matchSearch =
        !keyword ||
        fullName.includes(keyword) ||
        member.email.toLowerCase().includes(keyword);

      const matchStatus = !status || member.status === status;

      const matchRole = !role || member.role?._id === role;

      return matchSearch && matchStatus && matchRole;
    });
  }, [members, search, status, role]);

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "ACTIVE",
  ).length;

  const invitedMembers = members.filter(
    (member) => member.status === "INVITED",
  ).length;

  const suspendedMembers = members.filter(
    (member) => member.status === "SUSPENDED",
  ).length;

  const handleInvite = async (data: any) => {
    const result = await dispatch(inviteOrganizationMember(data));

    if (inviteOrganizationMember.fulfilled.match(result)) {
      setInviteOpen(false);

      dispatch(fetchMembers());
    }
  };

  const handleEdit = (member: OrganizationMember) => {
    setSelectedMember(member);
    setEditOpen(true);
  };

  const handleChangeRole = (member: OrganizationMember) => {
    setSelectedMember(member);
    setChangeRoleOpen(true);
  };

  const handleResendInvite = async (member: OrganizationMember) => {
    console.log(member);

    // dispatch(resendMemberInvite(member._id));
  };

  const handleSuspend = async (member: OrganizationMember) => {
    console.log(member);

    // dispatch(changeMemberStatus({
    //   memberId: member._id,
    //   status: "SUSPENDED",
    // }));
  };

  const handleDelete = (member: OrganizationMember) => {
    setSelectedMember(member);
    setDeleteOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
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

        <button
          onClick={() => setInviteOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <StatCard title="Total Members" value={totalMembers} />

        <StatCard title="Active" value={activeMembers} />

        <StatCard title="Invited" value={invitedMembers} />

        <StatCard title="Suspended" value={suspendedMembers} />
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
        onEdit={handleEdit}
        onChangeRole={handleChangeRole}
        onResendInvite={handleResendInvite}
        onSuspend={handleSuspend}
        onDelete={handleDelete}
      />

      {/* Invite */}

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

interface StatCardProps {
  title: string;
  value: number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}
