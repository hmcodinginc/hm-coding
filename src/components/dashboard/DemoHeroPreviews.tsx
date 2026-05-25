import { motion } from "framer-motion";
import { StatusBadge } from "./DashboardPrimitives";
import type { DemoHeroWorkflowRow } from "../../types/demoHeroTypes";

type HeroWorkflowPreviewProps = {
  rows: DemoHeroWorkflowRow[];
  statusClassName: (status: string) => string;
};

function HeroWorkflowPreview({ rows, statusClassName }: HeroWorkflowPreviewProps) {
  return (
    <ul className="space-y-2">
      {rows.map((row, index) => (
        <motion.li
          key={row.id}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 + index * 0.06, duration: 0.35 }}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
          className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-colors"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{row.primary}</p>
            <p className="truncate text-xs text-white/60">
              {row.secondary} · {row.meta}
            </p>
          </div>
          <StatusBadge toneClassName={statusClassName(row.status)} className="shrink-0 capitalize text-[10px]">
            {row.status}
          </StatusBadge>
        </motion.li>
      ))}
    </ul>
  );
}

const posStatusClass: Record<string, string> = {
  open: "bg-amber-200/90 text-amber-900",
  fired: "bg-sky-200/90 text-sky-900",
  ready: "bg-emerald-200/90 text-emerald-900",
};

const gymStatusClass: Record<string, string> = {
  open: "bg-emerald-200/90 text-emerald-900",
  waitlist: "bg-amber-200/90 text-amber-900",
  full: "bg-white/25 text-white",
};

const inventoryStatusClass: Record<string, string> = {
  critical: "bg-rose-200/90 text-rose-900",
  warning: "bg-amber-200/90 text-amber-900",
  watch: "bg-white/25 text-white",
};

const crmStatusClass: Record<string, string> = {
  Pending: "bg-amber-200/90 text-amber-900",
  Confirmed: "bg-emerald-200/90 text-emerald-900",
  Overdue: "bg-rose-200/90 text-rose-900",
};

const estateStatusClass: Record<string, string> = {
  showing: "bg-amber-200/90 text-amber-900",
  offer: "bg-sky-200/90 text-sky-900",
  closed: "bg-emerald-200/90 text-emerald-900",
  lead: "bg-white/25 text-white",
};

export function PosHeroPreview({ rows }: { rows: DemoHeroWorkflowRow[] }) {
  return <HeroWorkflowPreview rows={rows} statusClassName={(s) => posStatusClass[s] ?? "bg-white/20 text-white"} />;
}

export function GymHeroPreview({ rows }: { rows: DemoHeroWorkflowRow[] }) {
  return <HeroWorkflowPreview rows={rows} statusClassName={(s) => gymStatusClass[s] ?? "bg-white/20 text-white"} />;
}

export function InventoryHeroPreview({ rows }: { rows: DemoHeroWorkflowRow[] }) {
  return (
    <HeroWorkflowPreview rows={rows} statusClassName={(s) => inventoryStatusClass[s] ?? "bg-white/20 text-white"} />
  );
}

export function CrmHeroPreview({ rows }: { rows: DemoHeroWorkflowRow[] }) {
  return <HeroWorkflowPreview rows={rows} statusClassName={(s) => crmStatusClass[s] ?? "bg-white/20 text-white"} />;
}

export function RealEstateHeroPreview({ rows }: { rows: DemoHeroWorkflowRow[] }) {
  return (
    <HeroWorkflowPreview rows={rows} statusClassName={(s) => estateStatusClass[s] ?? "bg-white/20 text-white"} />
  );
}

type PipelineStagePreviewProps = {
  stages: { label: string; count: number; value: string }[];
};

export function PipelineStagePreview({ stages }: PipelineStagePreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {stages.map((stage, index) => (
        <motion.div
          key={stage.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 + index * 0.05, duration: 0.35 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-shadow hover:shadow-md hover:shadow-black/10"
        >
          <p className="text-[10px] uppercase tracking-wider text-white/50">{stage.label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{stage.count}</p>
          <p className="text-xs text-white/60">{stage.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
