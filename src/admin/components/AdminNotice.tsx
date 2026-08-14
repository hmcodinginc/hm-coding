type AdminNoticeProps = {
  tone?: "error" | "success" | "info";
  message: string;
  onRetry?: () => void;
};

const toneClass = {
  error: "border-red-500/40 bg-red-500/10 text-red-300",
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  info: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
};

export function AdminNotice({ tone = "error", message, onRetry }: AdminNoticeProps) {
  return (
    <div className={`rounded-xl border p-4 text-sm ${toneClass[tone]}`} role="status">
      <p>{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold"
        >
          Retry
        </button>
      )}
    </div>
  );
}
