import { CheckCircle2, ChevronRight, Upload } from "lucide-react";
import { PhoneFrame } from "../deck/frames/PhoneFrame";
import { TabletFrame } from "../deck/frames/TabletFrame";
import { DesktopFrame } from "../deck/frames/DesktopFrame";
import { SortChip, Tag, StatTile, SectionLabel } from "../deck/primitives";
import { archived } from "./data";

/* ------------------------------- PHONE ------------------------------------ */

export function ArchivePhone() {
  return (
    <PhoneFrame activeTab="Archive">
      <div className="flex flex-1 flex-col px-4 pt-4">
        <h1 className="text-[24px] font-bold text-ink">Archive</h1>
        <p className="mt-0.5 text-[12px] text-muted">00 cleared · $XXX,XX0 funded</p>

        <div className="mt-4 flex gap-2">
          <SortChip active sortIcon>
            Recently completed
          </SortChip>
          <SortChip>Amount</SortChip>
        </div>

        <div className="mt-4">
          {archived.map((g) => (
            <div key={g.name} className="flex items-start gap-3 border-b border-hair py-3">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-faint" strokeWidth={2} />
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-[15px] font-semibold text-ink">{g.name}</span>
                  <span className="text-[15px] font-semibold text-ink">{g.amount}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[11px] text-muted">{g.category} · {g.days}</span>
                  <span className="text-[11px] text-faint">{g.date}</span>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between py-3">
            <span className="text-[13px] text-muted">Set the next focus goal</span>
            <button className="inline-flex items-center gap-1 text-[13px] font-semibold text-pop">
              Choose <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ------------------------------- TABLET ----------------------------------- */

export function ArchiveTablet() {
  return (
    <TabletFrame activeRail="Archive">
      <div className="px-6 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[24px] font-bold text-ink">Archive</h1>
            <p className="mt-0.5 text-[13px] text-muted">00 cleared · $XXX,XX0 funded</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-hair px-3 py-2 text-[13px] font-medium text-ink">
            <Upload className="size-3.5" /> Export
          </button>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <SectionLabel>Sort</SectionLabel>
          <div className="ml-1 flex gap-2">
            <SortChip active sortIcon>
              Recently completed
            </SortChip>
            <SortChip>Amount</SortChip>
            <SortChip>Category</SortChip>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          <StatTile label="This quarter" value="0" />
          <StatTile label="Total funded" value="$XXX,XX0" />
          <StatTile label="Median clear" value="XX d" />
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-hair">
          <div className="grid grid-cols-[1.4fr_0.8fr_1fr_0.8fr] gap-4 bg-chip px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
            <span>Goal</span>
            <span>Funded</span>
            <span>Category</span>
            <span className="text-pop">Cleared ↓</span>
          </div>
          {archived.map((g) => (
            <div
              key={g.name}
              className="grid grid-cols-[1.4fr_0.8fr_1fr_0.8fr] items-center gap-4 border-t border-hair px-5 py-3.5"
            >
              <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                <CheckCircle2 className="size-4 text-faint" /> {g.name}
              </span>
              <span className="text-[13px] font-semibold text-ink">{g.amount}</span>
              <span><Tag>{g.category}</Tag></span>
              <span className="text-[13px] text-muted">{g.date}</span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-hair px-5 py-3.5">
            <span className="text-[13px] text-muted">Set the next focus goal</span>
            <button className="inline-flex items-center gap-1 text-[13px] font-semibold text-pop">
              Choose <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </TabletFrame>
  );
}

/* ------------------------------- DESKTOP ---------------------------------- */

export function ArchiveDesktop() {
  return (
    <DesktopFrame activeNav="Archive" nav={["Goals", "Archive", "Accounts"]}>
      <div className="px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[26px] font-bold text-ink">Archive</h1>
            <p className="mt-1 text-[13px] text-muted">00 goals cleared · $XXX,XX0 funded to date</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-hair px-3 py-2 text-[13px] font-medium text-ink">
              <Upload className="size-3.5" /> Export CSV
            </button>
            <button className="rounded-md bg-pop px-3 py-2 text-[13px] font-semibold text-pop-fg">
              Set next focus goal
            </button>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 border-b border-hair pb-5">
          <SectionLabel>Sort by</SectionLabel>
          <div className="ml-1 flex gap-2">
            <SortChip active sortIcon>
              Recently completed
            </SortChip>
            <SortChip>Amount funded</SortChip>
            <SortChip>Category</SortChip>
            <SortChip>Time to clear</SortChip>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          <StatTile label="Cleared this quarter" value="0" />
          <StatTile label="Total funded" value="$XXX,XX0" />
          <StatTile label="Median time to clear" value="XX days" />
          <StatTile label="Still active" value="0" />
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-hair">
          <div className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr_0.9fr] gap-4 bg-chip px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
            <span>Goal</span>
            <span>Amount funded</span>
            <span>Category</span>
            <span className="text-pop">Cleared ↓</span>
            <span>Time to clear</span>
          </div>
          {archived.map((g) => (
            <div
              key={g.name}
              className="grid grid-cols-[1.6fr_1fr_1fr_0.9fr_0.9fr] items-center gap-4 border-t border-hair px-5 py-4"
            >
              <span className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                <CheckCircle2 className="size-4 text-faint" /> {g.name}
              </span>
              <span className="text-[14px] font-semibold text-ink">{g.amount}</span>
              <span><Tag>{g.category}</Tag></span>
              <span className="text-[13px] text-muted">{g.date}</span>
              <span className="text-[13px] text-muted">{g.days}</span>
            </div>
          ))}
        </div>
      </div>
    </DesktopFrame>
  );
}
