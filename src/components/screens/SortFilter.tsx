import { X, ChevronDown } from "lucide-react";
import { PhoneFrame } from "../deck/frames/PhoneFrame";
import { TabletFrame } from "../deck/frames/TabletFrame";
import { DesktopFrame } from "../deck/frames/DesktopFrame";
import {
  Radio,
  NewBadge,
  Segmented,
  FilterChip,
  SectionLabel,
  SortChip,
  ArrowUp,
  ArrowDown,
} from "../deck/primitives";
import { sortKeys, goals } from "./data";

function KeyList({ withRadio = true }: { withRadio?: boolean }) {
  return (
    <div>
      {sortKeys.map((k, i) => (
        <Radio
          key={k.label}
          checked={withRadio && i === 0}
          label={
            <>
              {k.label}
              {k.isNew && <NewBadge />}
            </>
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------- PHONE ------------------------------------ */

export function SortFilterPhone() {
  return (
    <PhoneFrame activeTab="Goals" bottomNav={false}>
      <div className="relative flex flex-1 flex-col">
        {/* dimmed list behind */}
        <div className="px-4 pt-4 opacity-40">
          <h1 className="text-[24px] font-bold text-ink">Goals</h1>
          <div className="mt-4 space-y-3">
            {goals.slice(0, 3).map((g) => (
              <div key={g.name} className="flex justify-between rounded-md border border-hair px-3 py-3">
                <span className="text-[14px] font-semibold text-ink">{g.name}</span>
                <span className="text-[14px] font-semibold text-ink">{g.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-ink/10" />

        {/* bottom sheet */}
        <div className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-hair bg-white px-4 pb-5 pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-hair" />
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-ink">Sort &amp; filter</h3>
            <button className="text-[13px] font-semibold text-pop">Reset</button>
          </div>

          <div className="mt-3">
            <SectionLabel>Sort by</SectionLabel>
            <div className="mt-1"><KeyList /></div>
          </div>

          <div className="mt-2">
            <Segmented
              options={["Ascending", "Descending"]}
              active={0}
              icons={[<ArrowUp className="size-3.5" />, <ArrowDown className="size-3.5" />]}
            />
          </div>

          <div className="mt-4">
            <SectionLabel>Filter category</SectionLabel>
            <div className="mt-2 flex flex-wrap gap-2">
              <FilterChip active>All</FilterChip>
              <FilterChip>Category A</FilterChip>
              <FilterChip>Category B</FilterChip>
              <FilterChip>Category C</FilterChip>
            </div>
          </div>

          <button className="mt-5 w-full rounded-md bg-pop py-3 text-[14px] font-semibold text-pop-fg">
            Apply
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------- TABLET ----------------------------------- */

export function SortFilterTablet() {
  return (
    <TabletFrame activeRail="Goals">
      <div className="relative flex flex-1">
        {/* dimmed list */}
        <div className="flex-1 px-6 pt-5 opacity-40">
          <h1 className="text-[24px] font-bold text-ink">Goals</h1>
          <div className="mt-4 space-y-3">
            {goals.map((g) => (
              <div key={g.name} className="flex justify-between border-b border-hair pb-3">
                <span className="text-[14px] font-semibold text-ink">{g.name}</span>
                <span className="text-[14px] text-muted">
                  {g.amount} <span className="ml-3">{g.date}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* side drawer */}
        <div className="flex w-[320px] flex-col border-l border-hair bg-white shadow-[-8px_0_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between px-5 pt-5">
            <h3 className="text-[16px] font-bold text-ink">Sort &amp; filter</h3>
            <button className="text-faint"><X className="size-4" /></button>
          </div>
          <div className="flex-1 overflow-auto px-5 pt-4">
            <SectionLabel>Primary sort</SectionLabel>
            <div className="mt-1"><KeyList /></div>

            <div className="mt-4">
              <SectionLabel>Then by</SectionLabel>
              <button className="mt-2 flex w-full items-center justify-between rounded-md border border-hair px-3 py-2.5 text-[13px] text-muted">
                Secondary key <ChevronDown className="size-4" />
              </button>
            </div>

            <div className="mt-4">
              <SectionLabel>Direction</SectionLabel>
              <div className="mt-2">
                <Segmented
                  options={["Asc", "Desc"]}
                  active={0}
                  icons={[<ArrowUp className="size-3.5" />, <ArrowDown className="size-3.5" />]}
                />
              </div>
            </div>

            <div className="mt-4">
              <SectionLabel>Category</SectionLabel>
              <div className="mt-2 flex flex-wrap gap-2">
                <FilterChip active>All</FilterChip>
                <FilterChip>Category A</FilterChip>
                <FilterChip>Category B</FilterChip>
                <FilterChip>Category C</FilterChip>
                <FilterChip>Category D</FilterChip>
              </div>
            </div>
          </div>
          <div className="space-y-2 border-t border-hair p-5">
            <button className="w-full rounded-md bg-pop py-3 text-[14px] font-semibold text-pop-fg">
              Apply
            </button>
            <button className="w-full rounded-md border border-hair py-3 text-[14px] font-medium text-ink">
              Save as a view
            </button>
          </div>
        </div>
      </div>
    </TabletFrame>
  );
}

/* ------------------------------- DESKTOP ---------------------------------- */

export function SortFilterDesktop() {
  return (
    <DesktopFrame activeNav="Goals" nav={["Goals", "Archive", "Accounts"]}>
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <h1 className="text-[26px] font-bold text-ink">Goals</h1>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-pop px-3 py-2 text-[13px] font-medium text-pop-fg">
            + New goal
          </button>
        </div>

        <div className="relative mt-5">
          <div className="flex items-center gap-2">
            <SectionLabel>Sort by</SectionLabel>
            <SortChip active sortIcon dropdown>
              Deadline
            </SortChip>
            <SortChip>Amount remaining</SortChip>
            <SortChip>Priority</SortChip>
          </div>

          {/* dimmed table behind */}
          <div className="mt-5 space-y-3 opacity-30">
            {goals.map((g) => (
              <div key={g.name} className="grid grid-cols-4 border-b border-hair pb-3 text-[13px]">
                <span className="font-semibold text-ink">{g.name}</span>
                <span className="text-muted">{g.amount}</span>
                <span className="text-muted">{g.date}</span>
                <span className="text-muted">{g.priority}</span>
              </div>
            ))}
          </div>

          {/* popover anchored under the sort chip */}
          <div className="absolute left-16 top-11 w-[440px] overflow-hidden rounded-xl border border-hair bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14)]">
            <div className="grid grid-cols-2">
              <div className="border-r border-hair p-4">
                <SectionLabel>Primary sort</SectionLabel>
                <div className="mt-1"><KeyList /></div>
              </div>
              <div className="p-4">
                <SectionLabel>Direction</SectionLabel>
                <div className="mt-2">
                  <Segmented
                    options={["Asc", "Desc"]}
                    active={0}
                    icons={[<ArrowUp className="size-3.5" />, <ArrowDown className="size-3.5" />]}
                  />
                </div>
                <div className="mt-4">
                  <SectionLabel>Then by</SectionLabel>
                  <button className="mt-2 flex w-full items-center justify-between rounded-md border border-hair px-3 py-2 text-[13px] text-muted">
                    Secondary key <ChevronDown className="size-4" />
                  </button>
                </div>
                <div className="mt-4">
                  <SectionLabel>Filter category</SectionLabel>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <FilterChip active>All</FilterChip>
                    <FilterChip>Category A</FilterChip>
                    <FilterChip>Category B</FilterChip>
                    <FilterChip>Category C</FilterChip>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  <button className="rounded-md bg-pop px-5 py-2 text-[13px] font-semibold text-pop-fg">
                    Apply
                  </button>
                  <button className="rounded-md border border-hair px-5 py-2 text-[13px] font-medium text-ink">
                    Save view
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopFrame>
  );
}
