import clsx from "clsx";

const styles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
  published: "bg-kai-50 text-kai-700 border-kai-200",
  draft: "bg-gray-50 text-gray-600 border-gray-200",
};

const labels = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
  published: "Terbit",
  draft: "Draft",
};

export default function StatusBadge({
  status,
}: {
  status: keyof typeof styles;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        styles[status] || styles.pending
      )}
    >
      {labels[status] || status}
    </span>
  );
}
