import { X, ChevronDown, Calendar, Flag, Bell, Plus } from "lucide-react";
import { PhoneFrame } from "../deck/frames/PhoneFrame";
import { TabletFrame } from "../deck/frames/TabletFrame";
import { DesktopFrame } from "../deck/frames/DesktopFrame";
import {
  SectionLabel,
  FilterChip,
  Segmented,
  Toggle,
} from "../deck/primitives";
import { goals } from "./data";

function TargetAmount() {
  return (
    <div className="flex items-end gap-1 border-b-2 border-pop pb-1">
      <span className="text-[28px] font-medium text-faint">$</span>
      <span className="text-[30px] font-bold tracking-tight text-ink">XX,XX0</span>
      <span className="mb-1 h-6 w-px animate-pulse bg-pop" />
    </div>
  );
}

function Field({ label, value, chevron, calendar }: { label: string; value: string; chevron?: boolean; calendar?: boolean }) {
  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-2 flex items-center justify-between rounded-md border border-hair px-3 py-2.5 text-[14px] text-ink">
        {value}
        {chevron && <ChevronDown className="size-4 text-faint" />}
        {calendar && <Calendar className="size-4 text-faint" />}
      </div>
    </div>
  );
}

const priorityIcons = [<Flag className="size-3.5 text-pop" />, null, null];

/* ------------------------------- PHONE ------------------------------------ */

export function AddGoalPhone() {
  return (
    <PhoneFrame activeTab="Goals" bottomNav={false}>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <button className="text-muted"><X className="size-5" /></button>
          <span className="text-[15px] font-semibold text-ink">New goal</span>
          <button className="text-[14px] font-medium text-faint">Save</button>
        </div>

        <div className="flex-1 space-y-4 px-4 pt-2">
          <div>
            <SectionLabel>Target amount</SectionLabel>
            <div className="mt-2"><TargetAmount /></div>
          </div>

          <div>
            <SectionLabel>Goal name</SectionLabel>
            <div className="mt-2 rounded-md border border-hair px-3 py-2.5 text-[14px] text-ink">Goal F</div>
          </div>

          <div>
            <SectionLabel>Category</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip active>Category A</FilterChip>
              <FilterChip>Category B</FilterChip>
              <FilterChip>Category C</FilterChip>
            </div>
            <button className="mt-2 inline-flex items-center gap-1 rounded-md border border-dashed border-hair px-3 py-1.5 text-[13px] text-faint">
              <Plus className="size-3.5" /> New
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Deadline" value="MM / DD" calendar />
            <Field label="Account" value="····0000" chevron />
          </div>

          <div>
            <SectionLabel>Priority</SectionLabel>
            <div className="mt-2">
              <Segmented options={["High", "Med", "Low"]} active={0} icons={priorityIcons} />
            </div>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2 text-[14px] text-ink">
              <Bell className="size-4 text-faint" /> Reminder at 90%
            </span>
            <Toggle on />
          </div>
        </div>

        <div className="border-t border-hair p-4">
          <button className="w-full rounded-md bg-pop py-3 text-[14px] font-semibold text-pop-fg">
            Create goal
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* --------------------------- shared modal body ---------------------------- */

function ModalBody({ withD = true, allCats = true }: { withD?: boolean; allCats?: boolean }) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <SectionLabel>Target amount</SectionLabel>
          <div className="mt-2"><TargetAmount /></div>
        </div>
        <div>
          <SectionLabel>Goal name</SectionLabel>
          <div className="mt-2 rounded-md border border-hair px-3 py-2.5 text-[14px] text-ink">Goal F</div>
        </div>
      </div>

      <div className="mt-5">
        <SectionLabel>Category</SectionLabel>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <FilterChip active>Category A</FilterChip>
          <FilterChip>Category B</FilterChip>
          <FilterChip>Category C</FilterChip>
          {allCats && <FilterChip>Category D</FilterChip>}
          {!withD && (
            <button className="inline-flex items-center gap-1 rounded-md border border-dashed border-hair px-3 py-1.5 text-[13px] text-faint">
              <Plus className="size-3.5" /> New category
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <Field label="Deadline" value="MM / DD / YY" calendar />
        <Field label={withD ? "Account" : "Funding account"} value={withD ? "····0000" : "Account ····0000"} chevron />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        <div>
          <SectionLabel>Priority</SectionLabel>
          <div className="mt-2">
            <Segmented options={["High", "Med", "Low"]} active={0} icons={priorityIcons} />
          </div>
        </div>
        <div>
          {!withD && <SectionLabel>Reminders</SectionLabel>}
          <div className={`flex items-center justify-between ${withD ? "mt-6" : "mt-2 rounded-md border border-hair px-3"} py-2.5`}>
            <span className="flex items-center gap-2 text-[14px] text-ink">
              <Bell className="size-4 text-faint" /> Reminder at 90%
            </span>
            <Toggle on />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- TABLET ----------------------------------- */

export function AddGoalTablet() {
  return (
    <TabletFrame activeRail="Goals">
      <div className="relative flex-1">
        <div className="px-6 pt-5 opacity-40">
          <h1 className="text-[24px] font-bold text-ink">Goals</h1>
          <div className="mt-4 space-y-3">
            {goals.map((g) => (
              <div key={g.name} className="flex justify-between border-b border-hair pb-3">
                <span className="text-[14px] font-semibold text-ink">{g.name}</span>
                <span className="text-[14px] font-semibold text-ink">{g.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-ink/20" />

        <div className="absolute inset-x-6 top-24 overflow-hidden rounded-xl border border-hair bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <div className="flex items-center justify-between border-b border-hair px-6 py-4">
            <h3 className="text-[17px] font-bold text-ink">New goal</h3>
            <button className="text-faint"><X className="size-4" /></button>
          </div>
          <ModalBody withD allCats />
          <div className="flex justify-end gap-2 border-t border-hair px-6 py-4">
            <button className="rounded-md border border-hair px-4 py-2 text-[13px] font-medium text-ink">Cancel</button>
            <button className="rounded-md bg-pop px-4 py-2 text-[13px] font-semibold text-pop-fg">Create goal</button>
          </div>
        </div>
      </div>
    </TabletFrame>
  );
}

/* ------------------------------- DESKTOP ---------------------------------- */

export function AddGoalDesktop() {
  return (
    <DesktopFrame activeNav="Goals" nav={["Goals", "Archive"]}>
      <div className="relative min-h-[640px]">
        <div className="px-8 py-6 opacity-30">
          <h1 className="text-[26px] font-bold text-ink">Goals</h1>
          <div className="mt-5 space-y-3">
            {goals.map((g) => (
              <div key={g.name} className="grid grid-cols-[1.6fr_1fr_0.8fr] border-b border-hair pb-3 text-[13px]">
                <span className="font-semibold text-ink">{g.name}</span>
                <span className="text-right text-muted">{g.amount}</span>
                <span className="pl-8 text-muted">{g.date}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-ink/20" />

        <div className="absolute left-1/2 top-16 w-[560px] -translate-x-1/2 overflow-hidden rounded-xl border border-hair bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
          <div className="flex items-start justify-between border-b border-hair px-6 py-4">
            <div>
              <h3 className="text-[17px] font-bold text-ink">New goal</h3>
              <p className="text-[12px] text-muted">Joins the list at the position the current sort gives it</p>
            </div>
            <button className="text-faint"><X className="size-4" /></button>
          </div>
          <ModalBody withD={false} allCats />
          <div className="flex items-center justify-between border-t border-hair px-6 py-4">
            <span className="text-[12px] text-faint">Editing reuses this form, pre-filled</span>
            <div className="flex gap-2">
              <button className="rounded-md border border-hair px-4 py-2 text-[13px] font-medium text-ink">Cancel</button>
              <button className="rounded-md bg-pop px-4 py-2 text-[13px] font-semibold text-pop-fg">Create goal</button>
            </div>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}
