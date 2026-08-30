import type { ReactNode } from "react";
import { List, Archive, Landmark, Settings } from "lucide-react";

const allNav = [
  { icon: List, label: "Goals" },
  { icon: Archive, label: "Archive" },
  { icon: Landmark, label: "Accounts" },
  { icon: Settings, label: "Settings" },
];

export function DesktopFrame({
  children,
  activeNav = "Goals",
  nav = ["Goals", "Archive", "Accounts", "Settings"],
  savedViews = false,
}: {
  children: ReactNode;
  activeNav?: string;
  nav?: string[];
  savedViews?: boolean;
}) {
  const items = allNav.filter((n) => nav.includes(n.label));
  return (
    <div className="w-full overflow-hidden rounded-xl border border-hair bg-white shadow-sm">
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-hair bg-chip px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-3 rounded-full bg-faint/50" />
          <span className="size-3 rounded-full bg-faint/50" />
          <span className="size-3 rounded-full bg-faint/50" />
        </span>
        <div className="ml-3 h-6 w-[280px] rounded-md border border-hair bg-white" />
      </div>
      <div className="flex min-h-[640px]">
        {/* sidebar */}
        <aside className="flex w-[210px] flex-col border-r border-hair bg-white p-4">
          <div className="mb-6 flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-pop text-[14px] font-bold text-pop-fg">
              S
            </div>
            <span className="text-[15px] font-semibold text-ink">Sortable</span>
          </div>
          <nav className="flex flex-col gap-1">
            {items.map(({ icon: Icon, label }) => {
              const active = label === activeNav;
              return (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-[14px] ${
                    active ? "bg-pop/10 font-semibold text-pop" : "font-medium text-muted"
                  }`}
                >
                  <Icon className="size-4" strokeWidth={2} />
                  {label}
                </div>
              );
            })}
          </nav>
          {savedViews && (
            <div className="mt-auto rounded-lg border border-hair p-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
                Saved views
              </div>
              <div className="mt-2 text-[13px] font-medium text-pop">Saved view 1</div>
              <div className="mt-1.5 text-[13px] text-ink">Saved view 2</div>
            </div>
          )}
        </aside>
        {/* content */}
        <div className="relative flex-1">{children}</div>
      </div>
    </div>
  );
}
