import { Plus, Filter, ChevronRight, Tag as TagGlyph, Calendar, Flag, Upload } from "lucide-react";
import { PhoneFrame } from "../deck/frames/PhoneFrame";
import { TabletFrame } from "../deck/frames/TabletFrame";
import { DesktopFrame } from "../deck/frames/DesktopFrame";
import {
  SortChip,
  Tag,
  ProgressBar,
  PriorityFlag,
  SectionLabel,
} from "../deck/primitives";
import { goals } from "./data";

/* ------------------------------- PHONE ------------------------------------ */

export function GoalListPhone() {
  return (
    <PhoneFrame activeTab="Goals">
      <div className="flex flex-1 flex-col px-4 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-ink">Goals</h1>
            <p className="mt-0.5 text-[12px] text-muted">0 active · $XXX,XX0 remaining</p>
          </div>
          <button className="grid size-9 place-items-center rounded-lg bg-pop text-pop-fg">
            <Plus className="size-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <SortChip active sortIcon>
            Deadline
          </SortChip>
          <SortChip>Amount</SortChip>
          <SortChip>Priority</SortChip>
          <button className="ml-auto grid size-9 place-items-center rounded-md border border-hair text-muted">
            <Filter className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex-1">
          {goals.map((g) => (
            <div key={g.name} className="border-b border-hair py-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-semibold text-ink">{g.name}</span>
                <span className="text-[15px] font-semibold text-ink">{g.amount}</span>
              </div>
              <div className="mt-1 flex items-center gap-3 text-[11px] text-muted">
                <span className="flex items-center gap-1">
                  <TagDot /> {g.category}
                </span>
                <span className="flex items-center gap-1">
                  <CalDot /> {g.date}
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted">
                <FlagDot /> {g.priority}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <ProgressBar pct={g.pct} />
                <span className="w-8 shrink-0 text-right text-[11px] text-faint">{g.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------- TABLET ----------------------------------- */

export function GoalListTablet() {
  return (
    <TabletFrame activeRail="Goals">
      <div className="px-6 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-ink">Goals</h1>
            <p className="mt-0.5 text-[13px] text-muted">
              0 active · $XXX,XX0 remaining of $XXX,XX0
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-hair px-3 py-2 text-[13px] font-medium text-ink">
              <Filter className="size-3.5" /> Filter
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-pop px-3 py-2 text-[13px] font-medium text-pop-fg">
              <Plus className="size-3.5" /> New goal
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <SectionLabel>Sort</SectionLabel>
          <div className="ml-1 flex items-center gap-2">
            <SortChip active sortIcon>
              Deadline
            </SortChip>
            <SortChip>Amount remaining</SortChip>
            <SortChip>Priority</SortChip>
            <SortChip>Category</SortChip>
          </div>
        </div>

        <div className="mt-4">
          {goals.map((g) => (
            <div key={g.name} className="border-b border-hair py-3.5">
              <div className="flex items-baseline justify-between">
                <span className="text-[15px] font-semibold text-ink">{g.name}</span>
                <span className="text-[15px] font-semibold text-ink">{g.amount}</span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-[12px] text-muted">
                <span className="flex items-center gap-1"><TagDot /> {g.category}</span>
                <span className="flex items-center gap-1"><CalDot /> {g.date}</span>
                <span className="flex items-center gap-1"><FlagDot /> {g.priority}</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar pct={g.pct} className="max-w-[60%]" />
                <span className="text-[11px] text-faint">{g.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TabletFrame>
  );
}

/* ------------------------------- DESKTOP ---------------------------------- */

export function GoalListDesktop() {
  return (
    <DesktopFrame activeNav="Goals" savedViews>
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-ink">Goals</h1>
            <p className="mt-1 text-[13px] text-muted">
              0 active · $XXX,XX0 remaining of $XXX,XX0 committed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-hair px-3 py-2 text-[13px] font-medium text-ink">
              <Filter className="size-3.5" /> Filter
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-hair px-3 py-2 text-[13px] font-medium text-ink">
              <ExportDot /> Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-pop px-3 py-2 text-[13px] font-medium text-pop-fg">
              <Plus className="size-3.5" /> New goal
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-b border-hair pb-5">
          <SectionLabel>Sort by</SectionLabel>
          <div className="ml-1 flex items-center gap-2">
            <SortChip active sortIcon>
              Deadline
            </SortChip>
            <SortChip>Amount remaining</SortChip>
            <SortChip>Priority</SortChip>
            <SortChip>Category</SortChip>
            <SortChip>Recently completed</SortChip>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-hair px-3 py-1.5 text-[13px] font-medium text-faint">
              <Plus className="size-3.5" /> Save view
            </button>
          </div>
        </div>

        {/* table */}
        <div className="mt-6 overflow-hidden rounded-lg border border-hair">
          <div className="grid grid-cols-[1.6fr_1fr_0.8fr_0.9fr_1fr_auto] items-center gap-4 bg-chip px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
            <span>Goal</span>
            <span className="text-right">Amount remaining</span>
            <span className="flex items-center gap-1 text-pop">Deadline ↑</span>
            <span>Priority</span>
            <span>Category</span>
            <span className="w-4" />
          </div>
          {goals.map((g) => (
            <div
              key={g.name}
              className="grid grid-cols-[1.6fr_1fr_0.8fr_0.9fr_1fr_auto] items-center gap-4 border-t border-hair px-5 py-4"
            >
              <div>
                <div className="text-[14px] font-semibold text-ink">{g.name}</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <ProgressBar pct={g.pct} className="max-w-[140px]" />
                  <span className="text-[11px] text-faint">{g.pct}%</span>
                </div>
              </div>
              <div className="text-right text-[14px] font-semibold text-ink">{g.amount}</div>
              <div className="text-[13px] text-muted">{g.date}</div>
              <div><PriorityFlag level={g.priority} /></div>
              <div><Tag>{g.category}</Tag></div>
              <ChevronRight className="size-4 text-faint" />
            </div>
          ))}
        </div>
      </div>
    </DesktopFrame>
  );
}

/* --- tiny inline glyphs matching the wireframe metadata icons ------------- */

function TagDot() {
  return <TagGlyph className="size-3 text-faint" strokeWidth={2} />;
}
function CalDot() {
  return <Calendar className="size-3 text-faint" strokeWidth={2} />;
}
function FlagDot() {
  return <Flag className="size-3 text-faint" strokeWidth={2} />;
}
function ExportDot() {
  return <Upload className="size-3.5 text-faint" strokeWidth={2} />;
}
