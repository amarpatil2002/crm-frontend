interface MemberStatusBadgeProps {
  status: "INVITED" | "ACTIVE" | "INACTIVE" | "SUSPENDED";
}

const statusStyles = {
  ACTIVE: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
    label: "Active",
  },

  INVITED: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-500",
    label: "Invited",
  },

  INACTIVE: {
    bg: "bg-gray-100",
    text: "text-gray-700",
    dot: "bg-gray-500",
    label: "Inactive",
  },

  SUSPENDED: {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
    label: "Suspended",
  },
} as const;

export default function MemberStatusBadge({ status }: MemberStatusBadgeProps) {
  const current = statusStyles[status] ?? statusStyles.INACTIVE;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${current.bg} ${current.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${current.dot}`} />

      {current.label}
    </span>
  );
}
