import type { ReactNode } from "react";
import {
  ChevronRight,
  ChevronDown,
  Flag,
  Calendar,
  Landmark,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";

/* --- Small labels --------------------------------------------------------- */

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
      {children}
    </div>
  );
}

export function NewBadge() {
  return (
    <span className="rounded-sm border border-pop/30 px-1.5 py-px text-[8px] font-semibold uppercase tracking-[0.1em] text-pop">
      New
    </span>
  );
}

/* --- Sort chips ----------------------------------------------------------- */

export function SortChip({
  children,
  active = false,
  sortIcon = false,
  dropdown = false,
}: {
  children: ReactNode;
  active?: boolean;
  sortIcon?: boolean;
  dropdown?: boolean;
}) {
  return (
    <button
      className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors ${
        active
          ? "border-pop bg-pop text-pop-fg"
          : "border-hair bg-white text-ink hover:bg-chip"
      }`}
    >
      {sortIcon && <ArrowUpDown className="size-3.5 opacity-90" strokeWidth={2} />}
      {children}
      {dropdown && <ChevronDown className="size-3.5 opacity-90" />}
    </button>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-chip px-2 py-1 text-[12px] text-muted">
      {children}
    </span>
  );
}

/* --- Progress ------------------------------------------------------------- */

export function ProgressBar({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <div className={`h-1 w-full overflow-hidden rounded-full bg-hair ${className}`}>
      <div className="h-full rounded-full bg-pop" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* --- Priority ------------------------------------------------------------- */

export function PriorityFlag({ level }: { level: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[13px] text-muted">
      <Flag className="size-3.5 text-faint" strokeWidth={2} />
      {level}
    </span>
  );
}

/* --- Radio / toggle ------------------------------------------------------- */

export function Radio({ label, checked = false }: { label: ReactNode; checked?: boolean }) {
  return (
    <label className="flex items-center gap-3 py-2 text-[14px] text-ink">
      <span
        className={`grid size-[18px] place-items-center rounded-full border ${
          checked ? "border-pop" : "border-hair"
        }`}
      >
        {checked && <span className="size-2.5 rounded-full bg-pop" />}
      </span>
      <span className="flex items-center gap-2">{label}</span>
    </label>
  );
}

export function Toggle({ on = true }: { on?: boolean }) {
  return (
    <span
      className={`inline-flex h-6 w-11 items-center rounded-full px-0.5 ${
        on ? "justify-end bg-pop" : "justify-start bg-hair"
      }`}
    >
      <span className="size-5 rounded-full bg-white shadow-sm" />
    </span>
  );
}

/* --- Segmented control (High / Med / Low, Asc / Desc) --------------------- */

export function Segmented({
  options,
  active,
  icons,
}: {
  options: string[];
  active: number;
  icons?: (ReactNode | null)[];
}) {
  return (
    <div className="flex overflow-hidden rounded-md border border-hair">
      {options.map((opt, i) => (
        <button
          key={opt}
          className={`flex flex-1 items-center justify-center gap-1.5 py-2 text-[13px] font-medium ${
            i === active ? "bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-hair)]" : "bg-chip text-faint"
          }`}
        >
          {icons?.[i]}
          {opt}
        </button>
      ))}
    </div>
  );
}

/* --- Category filter chips ------------------------------------------------ */

export function FilterChip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <button
      className={`rounded-md px-3 py-1.5 text-[13px] font-medium ${
        active ? "bg-pop text-pop-fg" : "bg-chip text-ink hover:bg-hair"
      }`}
    >
      {children}
    </button>
  );
}

/* --- Stat tile ------------------------------------------------------------ */

export function StatTile({
  label,
  value,
  big = false,
}: {
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div className="rounded-lg border border-hair bg-white px-4 py-3">
      <SectionLabel>{label}</SectionLabel>
      <div className={`mt-2 font-semibold text-ink ${big ? "text-[26px]" : "text-[22px]"}`}>
        {value}
      </div>
    </div>
  );
}

/* --- Detail row ----------------------------------------------------------- */

export function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-hair py-3 last:border-b-0">
      <span className="flex items-center gap-2 text-[13px] text-muted">
        {icon}
        {label}
      </span>
      <span className="text-[13px] font-semibold text-ink">{value}</span>
    </div>
  );
}

/* --- Activity row --------------------------------------------------------- */

export function ActivityRow({
  label,
  date,
  amount,
}: {
  label: string;
  date: string;
  amount: string;
}) {
  return (
    <div className="flex items-start justify-between py-2.5">
      <div>
        <div className="text-[13px] font-semibold text-ink">{label}</div>
        <div className="text-[11px] text-faint">{date}</div>
      </div>
      <div className="text-[13px] font-semibold text-ink">{amount}</div>
    </div>
  );
}

export {
  ChevronRight,
  ChevronDown,
  Flag,
  Calendar,
  Landmark,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
};
