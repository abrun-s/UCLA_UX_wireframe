import {
  ChevronLeft,
  MoreHorizontal,
  Plus,
  CheckCircle2,
  X,
  Tag,
  Flag,
  Landmark,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { PhoneFrame } from "../deck/frames/PhoneFrame";
import { TabletFrame } from "../deck/frames/TabletFrame";
import { DesktopFrame } from "../deck/frames/DesktopFrame";
import { ProgressBar, DetailRow, ActivityRow, SectionLabel } from "../deck/primitives";
import { activity, goals } from "./data";

function ActivityList() {
  return (
    <div>
      {activity.map((a) => (
        <ActivityRow key={a.label} label={a.label} date={a.date} amount={a.amount} />
      ))}
    </div>
  );
}

/* ------------------------------- PHONE ------------------------------------ */

export function GoalDetailPhone() {
  return (
    <PhoneFrame activeTab="Goals" bottomNav={false}>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="text-pop"><ChevronLeft className="size-5" /></button>
          <span className="text-[15px] font-semibold text-ink">Goal A</span>
          <button className="text-muted"><MoreHorizontal className="size-5" /></button>
        </div>

        <div className="flex-1 px-4">
          <div className="rounded-xl border border-hair p-4">
            <SectionLabel>Remaining</SectionLabel>
            <div className="mt-1 text-[40px] font-extrabold leading-none tracking-tight text-ink">
              $0X,XX0
            </div>
            <p className="mt-2 text-[12px] text-muted">of $XX,XX0 · due MM / 30</p>
            <div className="mt-3"><ProgressBar pct={94} /></div>
            <div className="mt-2 flex justify-between text-[12px]">
              <span className="font-semibold text-pop">94% complete</span>
              <span className="text-faint">$XX,XX0 saved</span>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-hair px-4">
            <DetailRow icon={<Tag className="size-3.5 text-faint" />} label="Category" value="Category A" />
            <DetailRow icon={<Flag className="size-3.5 text-faint" />} label="Priority" value="High" />
            <DetailRow icon={<Landmark className="size-3.5 text-faint" />} label="Account" value="Account ····0000" />
            <DetailRow icon={<Calendar className="size-3.5 text-faint" />} label="Created" value="MM / DD / YY" />
          </div>

          <div className="mt-4 rounded-xl border border-hair px-4 py-3">
            <SectionLabel>Recent activity</SectionLabel>
            <ActivityList />
          </div>
        </div>

        <div className="flex gap-2 border-t border-hair p-4">
          <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-hair py-3 text-[14px] font-medium text-muted">
            <CheckCircle2 className="size-4" /> Complete
          </button>
          <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-pop py-3 text-[14px] font-semibold text-pop-fg">
            <Plus className="size-4" /> Add funds
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------- TABLET ----------------------------------- */

export function GoalDetailTablet() {
  return (
    <TabletFrame activeRail="Goals">
      <div className="px-6 pt-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button className="grid size-9 place-items-center rounded-md border border-hair text-pop">
              <ChevronLeft className="size-5" />
            </button>
            <div>
              <h1 className="text-[22px] font-bold text-ink">Goal A</h1>
              <p className="text-[12px] text-muted">Category A · due MM / 30</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-hair px-3 py-2 text-[13px] font-medium text-muted">
              <CheckCircle2 className="size-4" /> Complete
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-pop px-3 py-2 text-[13px] font-semibold text-pop-fg">
              <Plus className="size-4" /> Add funds
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl border border-hair p-5">
          <div>
            <SectionLabel>Remaining</SectionLabel>
            <div className="mt-1 text-[40px] font-extrabold leading-none tracking-tight text-ink">
              $0X,XX0
            </div>
            <p className="mt-2 text-[12px] text-muted">of $XX,XX0 target</p>
          </div>
          <div className="w-[45%]">
            <ProgressBar pct={94} />
            <div className="mt-2 flex justify-between text-[12px]">
              <span className="font-semibold text-pop">94%</span>
              <span className="text-faint">$XX,XX0 saved</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-hair px-4 pb-2 pt-3">
            <SectionLabel>Details</SectionLabel>
            <DetailRow icon={<Tag className="size-3.5 text-faint" />} label="Category" value="Category A" />
            <DetailRow icon={<Flag className="size-3.5 text-faint" />} label="Priority" value="High" />
            <DetailRow icon={<Landmark className="size-3.5 text-faint" />} label="Account" value="····0000" />
            <DetailRow icon={<Calendar className="size-3.5 text-faint" />} label="Created" value="MM / DD / YY" />
            <DetailRow icon={<ArrowUpDown className="size-3.5 text-faint" />} label="Sort position" value="1 of 5" />
          </div>
          <div className="rounded-xl border border-hair px-4 pb-2 pt-3">
            <SectionLabel>Recent activity</SectionLabel>
            <ActivityList />
          </div>
        </div>
      </div>
    </TabletFrame>
  );
}

/* ------------------------------- DESKTOP ---------------------------------- */

export function GoalDetailDesktop() {
  return (
    <DesktopFrame activeNav="Goals" nav={["Goals", "Archive", "Accounts"]}>
      <div className="flex">
        {/* dimmed list */}
        <div className="flex-1 px-8 py-6">
          <h1 className="text-[26px] font-bold text-ink">Goals</h1>
          <div className="mt-5 overflow-hidden rounded-lg border border-hair opacity-40">
            {goals.map((g) => (
              <div
                key={g.name}
                className="grid grid-cols-[1.6fr_1fr_0.8fr] items-center gap-4 border-b border-hair px-5 py-4 last:border-b-0"
              >
                <span className="text-[14px] font-semibold text-ink">{g.name}</span>
                <span className="text-right text-[14px] font-semibold text-ink">{g.amount}</span>
                <span className="text-[13px] text-muted">{g.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* side panel */}
        <aside className="w-[340px] border-l border-hair px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <SectionLabel>Remaining</SectionLabel>
              <div className="mt-1 text-[34px] font-extrabold leading-none tracking-tight text-ink">
                $0X,XX0
              </div>
              <p className="mt-1 text-[13px] text-muted">Goal A</p>
            </div>
            <button className="text-faint"><X className="size-4" /></button>
          </div>

          <div className="mt-4"><ProgressBar pct={94} /></div>
          <div className="mt-2 flex justify-between text-[12px]">
            <span className="font-semibold text-pop">94% complete</span>
            <span className="text-faint">$XX,XX0 of $XX,XX0</span>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-pop py-2.5 text-[13px] font-semibold text-pop-fg">
              <Plus className="size-4" /> Add funds
            </button>
            <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-hair py-2.5 text-[13px] font-medium text-muted">
              <CheckCircle2 className="size-4" /> Complete
            </button>
          </div>

          <div className="mt-5 border-t border-hair">
            <DetailRow icon={<Calendar className="size-3.5 text-faint" />} label="Deadline" value="MM / DD / YY" />
            <DetailRow icon={<Flag className="size-3.5 text-faint" />} label="Priority" value="High" />
            <DetailRow icon={<Tag className="size-3.5 text-faint" />} label="Category" value="Category A" />
            <DetailRow icon={<Landmark className="size-3.5 text-faint" />} label="Account" value="····0000" />
            <DetailRow icon={<ArrowUpDown className="size-3.5 text-faint" />} label="Sort position" value="1 of 5" />
          </div>

          <div className="mt-5">
            <SectionLabel>Recent activity</SectionLabel>
            <ActivityList />
          </div>
        </aside>
      </div>
    </DesktopFrame>
  );
}
