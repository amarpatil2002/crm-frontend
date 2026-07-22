import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchMembers, inviteOrganizationMember } from "../redux/memberSlice";

import InviteMemberModal from "../components/InviteMemberModal";
import MemberTable from "../components/MemberTable";
import MemberSearch from "../components/MemberSearch";

export default function MembersPage() {
  const dispatch = useAppDispatch();

  const { members, loading, submitting } = useAppSelector(
    (state) => state.member,
  );

  const { roles } = useAppSelector((state) => state.roles);

  const [inviteOpen, setInviteOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Team Members</h1>

          <p className="text-sm text-gray-500">
            Manage members in your organization.
          </p>
        </div>

        <button
          onClick={() => setInviteOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          Invite Member
        </button>
      </div>

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

      <MemberTable members={members} loading={loading} />

      <InviteMemberModal
        open={inviteOpen}
        loading={submitting}
        roles={roles}
        onClose={() => setInviteOpen(false)}
        onSubmit={(data) => {
          dispatch(inviteOrganizationMember(data));
        }}
      />
    </div>
  );
}
