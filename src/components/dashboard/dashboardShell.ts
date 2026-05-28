/** Shared surface classes for dashboard demos (compose with DashboardCard or plain divs). */
export const dashboardShell = {
  glassInteractive:
    "rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-lg shadow-slate-900/5 backdrop-blur dark:bg-slate-900/70 dark:border-slate-700",
  glassRaised:
    "rounded-3xl border border-slate-200/60 bg-white/90 p-6 shadow-lg shadow-slate-900/5 backdrop-blur dark:bg-slate-950/80 dark:border-slate-700",
  dataTable:
    "overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 shadow-lg shadow-slate-900/5 backdrop-blur dark:bg-slate-950/80 dark:border-slate-700",
  nestedPayment:
    "rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/80",
  nestedNotification: "rounded-3xl border border-white/10 bg-white/10 p-4",
  nestedMutedStat: "rounded-3xl bg-slate-50 p-4 dark:bg-slate-900/80",
  heroGlassPanel:
    "rounded-2xl border border-white/10 bg-white/10 p-3.5 shadow-xl shadow-slate-950/10 backdrop-blur sm:rounded-[28px] sm:p-5 lg:rounded-[32px] lg:p-6",
  heroInsightTile: "rounded-2xl bg-white/10 p-3.5 sm:rounded-3xl sm:p-5",
  liveHighlight: "rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 p-4 text-white",
} as const;
