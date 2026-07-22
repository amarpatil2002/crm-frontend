import { useEffect, useMemo, useState } from "react";
import { Plus, Users } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchMembers, inviteOrganizationMember } from "../redux/memberSlice";

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

  const [selectedMember, setSelectedMember] =
    useState<OrganizationMember | null>(null);

  const [editOpen, setEditOpen] = useState(false);
  const [changeRoleOpen, setChangeRoleOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [openInviteModal, setOpenInviteModal] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();

      const searchValue = search.toLowerCase();

      const matchesSearch =
        !search ||
        fullName.includes(searchValue) ||
        member.email.toLowerCase().includes(searchValue);

      const matchesRole = !role || member.role?._id === role;

      const matchesStatus = !status || member.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, search, role, status]);

  const activeMembers = members.filter(
    (member) => member.status === "ACTIVE",
  ).length;

  const invitedMembers = members.filter(
    (member) => member.status === "INVITED",
  ).length;

  const suspendedMembers = members.filter(
    (member) => member.status === "SUSPENDED",
  ).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-indigo-100 p-3">
            <Users className="h-7 w-7 text-indigo-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>

            <p className="text-sm text-gray-500">
              Manage your organization members and invitations.
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenInviteModal(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Total Members" value={members.length} />

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
        onInvite={() => setOpenInviteModal(true)}
      />

      {/* Table */}

      <MemberTable
        members={filteredMembers}
        loading={loading}
        onEdit={(member) => {
          setSelectedMember(member);
          setEditOpen(true);
        }}
        onChangeRole={(member) => {
          setSelectedMember(member);
          setChangeRoleOpen(true);
        }}
        onResendInvite={(member) => {
          dispatch(resendMemberInvite(member._id));
        }}
        onSuspend={(member) => {
          dispatch(
            changeMemberStatus({
              memberId: member._id,
              status: "SUSPENDED",
            }),
          );
        }}
        onDelete={(member) => {
          setSelectedMember(member);
          setDeleteOpen(true);
        }}
      />

      {/* Invite Modal */}

      <InviteMemberModal
        open={openInviteModal}
        loading={submitting}
        roles={roles}
        onClose={() => setOpenInviteModal(false)}
        onSubmit={async (data) => {
          const result = await dispatch(inviteOrganizationMember(data));

          if (inviteOrganizationMember.fulfilled.match(result)) {
            setOpenInviteModal(false);

            dispatch(fetchMembers());
          }
        }}
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

      <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
    </div>
  );
}
