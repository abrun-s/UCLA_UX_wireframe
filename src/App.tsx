import { useState, useMemo } from "react";
import {
  Plus,
  Filter,
  ArrowLeft,
  ChevronDown,
  Tag as TagIcon,
  Calendar,
  Flag,
  CheckCircle2,
  X,
  Landmark,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Bell,
  List,
  Archive as ArchiveIcon,
} from "lucide-react";
import {
  goals as GOALS_RAW,
  archived as ARCHIVED_RAW,
  sortKeys as SORT_KEYS_DATA,
  activity as ACTIVITY,
} from "./components/screens/data";

// ── Types ──────────────────────────────────────────────────────────────────

type Priority = "High" | "Med" | "Low";
type SortLabel = string;
type Tab = "goals" | "archive";
type Screen = "list" | "detail" | "add" | "edit";

interface Goal {
  id: string;
  name: string;
  amount: string;
  category: string;
  date: string;
  priority: Priority;
  pct: number;
}

interface Archived {
  id: string;
  name: string;
  amount: string;
  category: string;
  days: string;
  date: string;
}

// ── Seed data (wireframe placeholders) ────────────────────────────────────

const GOALS: Goal[] = GOALS_RAW.map((g, i) => ({
  ...g,
  id: String(i + 1),
  priority: g.priority as Priority,
}));

const ARCHIVED: Archived[] = ARCHIVED_RAW.map((g, i) => ({
  ...g,
  id: `a${i + 1}`,
}));

const CATS = ["Category A", "Category B", "Category C", "Category D"];
const PRIORITY_ORDER: Record<Priority, number> = { High: 0, Med: 1, Low: 2 };

// quick sort keys shown as chips (first 3 from deck)
const QUICK_SORT = ["Deadline", "Amount", "Priority"];

let _nextId = 10;

// ── ProgressBar ────────────────────────────────────────────────────────────

function ProgressBar({ pct, className = "" }: { pct: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full overflow-hidden rounded-full bg-hair ${className}`}>
      <div
        className="h-full rounded-full bg-pop transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── M3 section label ───────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
      {children}
    </p>
  );
}

// ── M3 "New" badge ─────────────────────────────────────────────────────────

function NewBadge() {
  return (
    <span className="rounded-sm border border-pop/30 px-1.5 py-px text-[8px] font-semibold uppercase tracking-[0.1em] text-pop">
      New
    </span>
  );
}

// ── M3 Top App Bar ─────────────────────────────────────────────────────────

function TopAppBar({
  title,
  onBack,
  onClose,
  action,
}: {
  title: string;
  onBack?: () => void;
  onClose?: () => void;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 px-2 pb-2 pt-3">
      {onBack && (
        <button
          onClick={onBack}
          className="grid size-10 place-items-center rounded-full text-ink"
        >
          <ArrowLeft className="size-5" />
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="grid size-10 place-items-center rounded-full text-ink"
        >
          <X className="size-5" />
        </button>
      )}
      <span className="flex-1 px-2 text-[20px] font-semibold text-ink">{title}</span>
      {action}
    </div>
  );
}

// ── Add-funds bottom sheet ─────────────────────────────────────────────────

function AddFundsSheet({
  goal,
  onClose,
  onAdd,
}: {
  goal: Goal;
  onClose: () => void;
  onAdd: (pctDelta: number) => void;
}) {
  const [val, setVal] = useState("");

  return (
    <>
      <div className="fixed inset-0 z-50 bg-ink/20" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-white px-5 pb-10 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.10)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-hair" />
        <h3 className="text-[18px] font-semibold text-ink">Add funds</h3>
        <p className="mt-0.5 text-[13px] text-muted">
          {goal.amount} remaining · {goal.pct}% complete
        </p>
        <div className="mt-5">
          <Label>Amount</Label>
          <div className="mt-2 flex items-center rounded-2xl border-2 border-pop bg-pop/5 px-4 py-3">
            <span className="mr-1 text-[22px] font-medium text-faint">$</span>
            <input
              autoFocus
              type="number"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              placeholder="X,XX0"
              className="flex-1 bg-transparent text-[24px] font-bold text-ink outline-none placeholder:text-faint"
            />
          </div>
        </div>
        <button
          onClick={() => {
            onAdd(10);
            onClose();
          }}
          className="mt-5 w-full rounded-full bg-pop py-3.5 text-[15px] font-semibold text-pop-fg"
        >
          Add funds
        </button>
        <button onClick={onClose} className="mt-2 w-full py-2.5 text-[14px] text-muted">
          Cancel
        </button>
      </div>
    </>
  );
}

// ── Sort & filter bottom sheet ─────────────────────────────────────────────

function SortFilterSheet({
  sortLabel,
  sortAsc,
  filterCat,
  onSortLabel,
  onToggleDir,
  onFilterCat,
  onApply,
  onClose,
}: {
  sortLabel: SortLabel;
  sortAsc: boolean;
  filterCat: string | null;
  onSortLabel: (l: string) => void;
  onToggleDir: () => void;
  onFilterCat: (c: string | null) => void;
  onApply: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-ink/20" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-50 max-h-[88dvh] overflow-auto rounded-t-3xl bg-white px-5 pb-10 pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.10)]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-hair" />
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-ink">Sort &amp; filter</h3>
          <button
            onClick={() => { onSortLabel("Deadline"); onFilterCat(null); }}
            className="text-[13px] font-semibold text-pop"
          >
            Reset
          </button>
        </div>

        {/* Sort keys — all 8 from the deck */}
        <div className="mt-4">
          <Label>Sort by</Label>
          <div className="mt-1">
            {SORT_KEYS_DATA.map((k) => (
              <label
                key={k.label}
                className="flex cursor-pointer items-center gap-3 py-2.5 text-[14px] text-ink"
              >
                <span
                  className={`grid size-[18px] shrink-0 place-items-center rounded-full border ${
                    sortLabel === k.label ? "border-pop" : "border-hair"
                  }`}
                >
                  {sortLabel === k.label && (
                    <span className="size-2.5 rounded-full bg-pop" />
                  )}
                </span>
                <span
                  className="flex items-center gap-2"
                  onClick={() => onSortLabel(k.label)}
                >
                  {k.label}
                  {k.isNew && <NewBadge />}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div className="mt-3">
          <Label>Direction</Label>
          <div className="mt-2 flex overflow-hidden rounded-2xl border border-hair">
            {[
              { asc: true, icon: <ArrowUp className="size-3.5" />, label: "Ascending" },
              { asc: false, icon: <ArrowDown className="size-3.5" />, label: "Descending" },
            ].map(({ asc, icon, label }) => (
              <button
                key={label}
                onClick={() => asc !== sortAsc && onToggleDir()}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium ${
                  sortAsc === asc
                    ? "bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-hair)]"
                    : "bg-chip text-faint"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-4">
          <Label>Filter category</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={() => onFilterCat(null)}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                filterCat === null ? "bg-pop text-pop-fg" : "bg-chip text-ink"
              }`}
            >
              All
            </button>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => onFilterCat(filterCat === c ? null : c)}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                  filterCat === c ? "bg-pop text-pop-fg" : "bg-chip text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onApply}
          className="mt-6 w-full rounded-full bg-pop py-3.5 text-[15px] font-semibold text-pop-fg"
        >
          Apply
        </button>
      </div>
    </>
  );
}

// ── Goal list screen ───────────────────────────────────────────────────────

function GoalListScreen({
  goals,
  sortLabel,
  onOpenSort,
  onSortLabel,
  onOpenGoal,
  onAddGoal,
}: {
  goals: Goal[];
  sortLabel: SortLabel;
  onOpenSort: () => void;
  onSortLabel: (l: string) => void;
  onOpenGoal: (id: string) => void;
  onAddGoal: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Large title header (M3 pattern — no top app bar chrome) */}
      <div className="flex shrink-0 items-start justify-between px-5 pt-[54px]">
        <div>
          <h1 className="text-[24px] font-bold text-ink">Goals</h1>
          <p className="mt-0.5 text-[12px] text-muted">0 active · $XXX,XX0 remaining</p>
        </div>
        <button
          onClick={onAddGoal}
          className="flex items-center gap-2 rounded-2xl bg-pop px-5 py-4 text-[14px] font-semibold text-pop-fg shadow-[0_4px_14px_rgba(13,106,131,0.4)]"
        >
          <Plus className="size-5" aria-hidden="true" />
          {" "}
        </button>
      </div>

      {/* Sort chips */}
      <div className="flex shrink-0 items-center gap-2 px-5 pb-3">
        {QUICK_SORT.map((l) => {
          const active = sortLabel === l;
          return (
            <button
              key={l}
              onClick={() => onSortLabel(l)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active
                  ? "border-pop bg-pop text-pop-fg"
                  : "border-hair bg-white text-ink"
              }`}
            >
              {active && <ArrowUpDown className="size-3.5" strokeWidth={2} />}
              {l}
            </button>
          );
        })}
        <button
          onClick={onOpenSort}
          className="ml-auto grid size-9 place-items-center rounded-full border border-hair text-muted"
        >
          <Filter className="size-4" />
        </button>
      </div>

      {/* Goal list */}
      <div className="flex-1 overflow-auto px-5">
        {goals.length === 0 ? (
          <p className="pt-10 text-center text-[14px] text-faint">
            No goals match the current filter.
          </p>
        ) : (
          goals.map((g) => (
            <button
              key={g.id}
              onClick={() => onOpenGoal(g.id)}
              className="w-full border-b border-hair py-3.5 text-left last:border-b-0"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-semibold text-ink">{g.name}</span>
                <span className="text-[15px] font-semibold text-ink">{g.amount}</span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                <span className="flex items-center gap-1">
                  <TagIcon className="size-3 text-faint" strokeWidth={2} />
                  {g.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="size-3 text-faint" strokeWidth={2} />
                  {g.date}
                </span>
                <span className="flex items-center gap-1">
                  <Flag className="size-3 text-faint" strokeWidth={2} />
                  {g.priority}
                </span>
              </div>
              <div className="mt-2.5 flex items-center gap-2">
                <ProgressBar pct={g.pct} />
                <span className="w-8 shrink-0 text-right text-[11px] text-faint">{g.pct}%</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// ── Goal detail screen ─────────────────────────────────────────────────────

function GoalDetailScreen({
  goal,
  onBack,
  onAddFunds,
  onComplete,
  onEdit,
}: {
  goal: Goal;
  onBack: () => void;
  onAddFunds: () => void;
  onComplete: () => void;
  onEdit: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopAppBar
        title={goal.name}
        onBack={onBack}
        action={
          <button
            onClick={onEdit}
            className="mr-2 text-[14px] font-semibold text-pop"
          >
            Edit
          </button>
        }
      />

      <div className="flex-1 overflow-auto px-5 pb-4 space-y-4">
        {/* Progress card */}
        <div className="rounded-3xl border border-hair p-5">
          <Label>Remaining</Label>
          <div className="mt-1 text-[42px] font-extrabold leading-none tracking-tight text-ink">
            {goal.amount}
          </div>
          <p className="mt-2 text-[12px] text-muted">of $XX,XX0 · due {goal.date}</p>
          <div className="mt-4">
            <ProgressBar pct={goal.pct} />
          </div>
          <div className="mt-2 flex justify-between text-[12px]">
            <span className="font-semibold text-pop">{goal.pct}% complete</span>
            <span className="text-faint">$XX,XX0 saved</span>
          </div>
        </div>

        {/* Meta rows */}
        <div className="overflow-hidden rounded-3xl border border-hair">
          {(
            [
              { icon: <TagIcon className="size-3.5 text-faint" />, label: "Category", value: goal.category },
              { icon: <Flag className="size-3.5 text-faint" />, label: "Priority", value: goal.priority },
              { icon: <Landmark className="size-3.5 text-faint" />, label: "Account", value: "Account ····0000" },
              { icon: <Calendar className="size-3.5 text-faint" />, label: "Created", value: "MM / DD / YY" },
            ] as { icon: React.ReactNode; label: string; value: string }[]
          ).map((row, i, arr) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-4 py-3 ${
                i < arr.length - 1 ? "border-b border-hair" : ""
              }`}
            >
              <span className="flex items-center gap-2 text-[13px] text-muted">
                {row.icon}
                {row.label}
              </span>
              <span className="text-[13px] font-semibold text-ink">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div className="overflow-hidden rounded-3xl border border-hair px-4 py-3">
          <Label>Recent activity</Label>
          {ACTIVITY.map((a) => (
            <div key={a.label} className="flex items-start justify-between py-2.5">
              <div>
                <div className="text-[13px] font-semibold text-ink">{a.label}</div>
                <div className="text-[11px] text-faint">{a.date}</div>
              </div>
              <div className="text-[13px] font-semibold text-ink">{a.amount}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="shrink-0 border-t border-hair p-4">
        {confirming ? (
          <div className="flex items-center gap-3">
            <p className="flex-1 text-[13px] text-muted">Mark as complete?</p>
            <button
              onClick={() => setConfirming(false)}
              className="rounded-full border border-hair px-4 py-2.5 text-[13px] font-medium text-ink"
            >
              Cancel
            </button>
            <button
              onClick={onComplete}
              className="rounded-full bg-pop px-4 py-2.5 text-[13px] font-semibold text-pop-fg"
            >
              Complete
            </button>
          </div>
        ) : (
          <div className="flex gap-2.5">
            <button
              onClick={() => setConfirming(true)}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-hair py-3 text-[14px] font-medium text-muted"
            >
              <CheckCircle2 className="size-4" />
              Complete
            </button>
            <button
              onClick={onAddFunds}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-pop py-3 text-[14px] font-semibold text-pop-fg"
            >
              <Plus className="size-4" />
              Add funds
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Add / edit goal screen ─────────────────────────────────────────────────

function AddGoalScreen({
  isEdit,
  editGoal,
  onSave,
  onCancel,
}: {
  isEdit: boolean;
  editGoal: Goal | null;
  onSave: (name: string, priority: Priority) => void;
  onCancel: () => void;
}) {
  const [priority, setPriority] = useState<Priority>(editGoal?.priority ?? "Med");

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <TopAppBar
        title={isEdit ? "Edit goal" : "New goal"}
        onClose={onCancel}
      />

      <div className="flex-1 overflow-auto px-5 pb-4 space-y-5">
        {/* Target amount */}
        <div>
          <Label>Target amount</Label>
          <div className="mt-2 flex items-end gap-1 border-b-2 border-pop pb-1">
            <span className="mb-1 text-[26px] font-medium text-faint">$</span>
            <span className="flex-1 text-[30px] font-bold tracking-tight text-ink">
              {editGoal?.amount.replace("$", "") ?? "XX,XX0"}
            </span>
            <span className="mb-1 h-6 w-px bg-pop opacity-70" />
          </div>
        </div>

        {/* Goal name */}
        <div>
          <Label>Goal name</Label>
          <div className="mt-2 rounded-2xl border border-hair px-3 py-2.5 text-[14px] text-ink">
            {editGoal?.name ?? "Goal X"}
          </div>
        </div>

        {/* Category chips */}
        <div>
          <Label>Category</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
                  (editGoal?.category ?? "Category A") === c
                    ? "bg-pop text-pop-fg"
                    : "bg-chip text-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline + Account */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Deadline</Label>
            <div className="mt-2 flex items-center justify-between rounded-2xl border border-hair px-3 py-2.5">
              <span className="text-[13px] text-ink">{editGoal?.date ?? "MM / DD"}</span>
              <Calendar className="size-4 text-faint" />
            </div>
          </div>
          <div>
            <Label>Account</Label>
            <div className="mt-2 flex items-center justify-between rounded-2xl border border-hair px-3 py-2.5">
              <span className="text-[13px] text-ink">····0000</span>
              <ChevronDown className="size-4 text-faint" />
            </div>
          </div>
        </div>

        {/* Priority */}
        <div>
          <Label>Priority</Label>
          <div className="mt-2 flex overflow-hidden rounded-2xl border border-hair">
            {(["High", "Med", "Low"] as Priority[]).map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex flex-1 items-center justify-center gap-1.5 py-2.5 text-[13px] font-medium ${
                  priority === p
                    ? "bg-white text-ink shadow-[inset_0_0_0_1px_var(--color-hair)]"
                    : "bg-chip text-faint"
                }`}
              >
                {p === "High" && <Flag className="size-3.5 text-pop" />}
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Reminder toggle */}
        <div className="flex items-center justify-between py-1">
          <span className="flex items-center gap-2 text-[14px] text-ink">
            <Bell className="size-4 text-faint" />
            Reminder at 90%
          </span>
          <span className="inline-flex h-6 w-11 items-center justify-end rounded-full bg-pop px-0.5">
            <span className="size-5 rounded-full bg-white shadow-sm" />
          </span>
        </div>
      </div>

      <div className="shrink-0 border-t border-hair p-4">
        <button
          onClick={() => onSave("Goal X", priority)}
          className="w-full rounded-full bg-pop py-3.5 text-[15px] font-semibold text-pop-fg"
        >
          {isEdit ? "Save changes" : "Create goal"}
        </button>
      </div>
    </div>
  );
}

// ── Archive screen ─────────────────────────────────────────────────────────

function ArchiveScreen({ items }: { items: Archived[] }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="shrink-0 px-5 pb-3 pt-5">
        <h1 className="text-[24px] font-bold text-ink">Archive</h1>
        <p className="mt-0.5 text-[12px] text-muted">00 cleared · $XXX,XX0 funded</p>
      </div>

      {/* Sort chips */}
      <div className="flex shrink-0 items-center gap-2 px-5 pb-3">
        <button className="inline-flex items-center gap-1.5 rounded-full border border-pop bg-pop px-3.5 py-1.5 text-[13px] font-medium text-pop-fg">
          <ArrowUpDown className="size-3.5" strokeWidth={2} />
          Recently completed
        </button>
        <button className="inline-flex items-center rounded-full border border-hair bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink">
          Amount
        </button>
      </div>

      <div className="flex-1 overflow-auto px-5">
        {items.map((g) => (
          <div
            key={g.id}
            className="flex items-start gap-3 border-b border-hair py-3.5 last:border-b-0"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-faint" strokeWidth={2} />
            <div className="flex-1">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-semibold text-ink">{g.name}</span>
                <span className="text-[15px] font-semibold text-ink">{g.amount}</span>
              </div>
              <div className="mt-0.5 flex items-baseline justify-between">
                <span className="text-[11px] text-muted">
                  {g.category} · {g.days}
                </span>
                <span className="text-[11px] text-faint">{g.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── M3 Bottom Navigation ───────────────────────────────────────────────────

function BottomNav({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const items: { id: Tab; icon: React.ReactNode; label: string }[] = [
    {
      id: "goals",
      icon: <List className="size-[22px]" strokeWidth={2} />,
      label: "Goals",
    },
    {
      id: "archive",
      icon: <ArchiveIcon className="size-[22px]" strokeWidth={2} />,
      label: "Archive",
    },
  ];

  return (
    <nav className="flex shrink-0 border-t border-hair bg-white md:hidden" style={{ height: 80 }}>
      {items.map(({ id, icon, label }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            onClick={() => onTab(id)}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            {/* M3 pill indicator behind icon */}
            <span
              className={`flex items-center justify-center rounded-full px-5 py-1 transition-colors ${
                active ? "bg-pop/15" : ""
              }`}
            >
              <span className={active ? "text-pop" : "text-faint"}>{icon}</span>
            </span>
            <span
              className={`text-[10px] font-semibold ${active ? "text-pop" : "text-faint"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ── Sidebar (tablet / desktop) ─────────────────────────────────────────────

function Sidebar({ tab, onTab }: { tab: Tab; onTab: (t: Tab) => void }) {
  const items: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: "goals", icon: <List className="size-[18px]" strokeWidth={2} />, label: "Goals" },
    { id: "archive", icon: <ArchiveIcon className="size-[18px]" strokeWidth={2} />, label: "Archive" },
  ];

  return (
    <aside className="hidden md:flex w-[200px] shrink-0 flex-col border-r border-hair bg-white">
      <div className="px-5 py-5">
        <span className="text-[17px] font-bold tracking-tight text-ink">Sortable</span>
      </div>
      <nav className="flex-1 space-y-0.5 px-3">
        {items.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => onTab(id)}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
              tab === id ? "bg-pop/10 text-pop" : "text-muted hover:bg-chip"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// ── App root ───────────────────────────────────────────────────────────────

export default function App() {
  const [goals, setGoals] = useState<Goal[]>(GOALS);
  const [archived, setArchived] = useState<Archived[]>(ARCHIVED);
  const [tab, setTab] = useState<Tab>("goals");
  const [screen, setScreen] = useState<Screen>("list");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sortLabel, setSortLabel] = useState("Deadline");
  const [sortAsc, setSortAsc] = useState(true);
  const [filterCat, setFilterCat] = useState<string | null>(null);
  const [showSort, setShowSort] = useState(false);
  const [showAddFunds, setShowAddFunds] = useState(false);

  const sortedGoals = useMemo(() => {
    let gs = filterCat ? goals.filter((g) => g.category === filterCat) : [...goals];
    gs.sort((a, b) => {
      let d = 0;
      if (sortLabel === "Deadline") d = a.date.localeCompare(b.date);
      else if (sortLabel === "Amount") d = a.amount.localeCompare(b.amount);
      else if (sortLabel === "Priority") d = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      else if (sortLabel === "Category") d = a.category.localeCompare(b.category);
      else if (sortLabel === "Closest to completion") d = b.pct - a.pct;
      return sortAsc ? d : -d;
    });
    return gs;
  }, [goals, sortLabel, sortAsc, filterCat]);

  const activeGoal = goals.find((g) => g.id === activeId) ?? null;

  function openGoal(id: string) {
    setActiveId(id);
    setScreen("detail");
  }

  function handleAddFunds(delta: number) {
    if (!activeId) return;
    setGoals((gs) =>
      gs.map((g) =>
        g.id === activeId
          ? { ...g, pct: Math.min(g.pct + delta, 100) }
          : g
      )
    );
  }

  function handleComplete() {
    if (!activeId) return;
    const goal = goals.find((g) => g.id === activeId);
    if (!goal) return;
    setArchived((a) => [
      {
        id: "a" + _nextId++,
        name: goal.name,
        amount: goal.amount,
        category: goal.category,
        days: "XX days",
        date: "MM / DD",
      },
      ...a,
    ]);
    setGoals((gs) => gs.filter((g) => g.id !== activeId));
    setActiveId(null);
    setScreen("list");
  }

  function handleSaveGoal(_name: string, priority: Priority) {
    if (activeId && screen === "edit") {
      setGoals((gs) =>
        gs.map((g) => (g.id === activeId ? { ...g, priority } : g))
      );
      setScreen("detail");
    } else {
      const next = String.fromCharCode(
        65 + goals.length + archived.length
      );
      setGoals((gs) => [
        ...gs,
        {
          id: String(_nextId++),
          name: `Goal ${next}`,
          amount: "$XX,XX0",
          category: "Category A",
          date: "MM / DD",
          priority,
          pct: 0,
        },
      ]);
      setScreen("list");
    }
  }

  function handleTab(t: Tab) {
    setTab(t);
    setScreen("list");
    setActiveId(null);
  }

  return (
    /* relative so the FAB can position absolutely within this container */
    <div className="relative flex h-full flex-col bg-white md:flex-row">
      <Sidebar tab={tab} onTab={handleTab} />

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {tab === "goals" && screen === "list" && (
          <GoalListScreen
            goals={sortedGoals}
            sortLabel={sortLabel}
            onOpenSort={() => setShowSort(true)}
            onSortLabel={(l) => setSortLabel(l)}
            onOpenGoal={openGoal}
            onAddGoal={() => setScreen("add")}
          />
        )}

        {tab === "goals" && screen === "detail" && activeGoal && (
          <GoalDetailScreen
            goal={activeGoal}
            onBack={() => setScreen("list")}
            onAddFunds={() => setShowAddFunds(true)}
            onComplete={handleComplete}
            onEdit={() => setScreen("edit")}
          />
        )}

        {tab === "goals" && (screen === "add" || screen === "edit") && (
          <AddGoalScreen
            isEdit={screen === "edit"}
            editGoal={screen === "edit" ? activeGoal : null}
            onSave={handleSaveGoal}
            onCancel={() => setScreen(screen === "edit" ? "detail" : "list")}
          />
        )}

        {tab === "archive" && <ArchiveScreen items={archived} />}
      </main>

      <BottomNav tab={tab} onTab={handleTab} />

      {showSort && (
        <SortFilterSheet
          sortLabel={sortLabel}
          sortAsc={sortAsc}
          filterCat={filterCat}
          onSortLabel={setSortLabel}
          onToggleDir={() => setSortAsc((v) => !v)}
          onFilterCat={setFilterCat}
          onApply={() => setShowSort(false)}
          onClose={() => setShowSort(false)}
        />
      )}

      {showAddFunds && activeGoal && (
        <AddFundsSheet
          goal={activeGoal}
          onClose={() => setShowAddFunds(false)}
          onAdd={handleAddFunds}
        />
      )}
    </div>
  );
}
