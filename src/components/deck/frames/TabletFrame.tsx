import type { ReactNode } from "react";
import { List, Archive } from "lucide-react";
import { StatusBar } from "./StatusBar";

const railItems = [
  { icon: List, label: "Goals" },
  { icon: Archive, label: "Archive" },
];

export function TabletFrame({
  children,
  activeRail = "Goals",
}: {
  children: ReactNode;
  activeRail?: string;
}) {
  return (
    <div className="flex w-[620px] overflow-hidden rounded-2xl border border-hair bg-white shadow-sm">
      {/* icon rail */}
      <div className="flex w-[72px] flex-col items-center gap-4 border-r border-hair bg-white py-4">
        <div className="grid size-9 place-items-center rounded-lg bg-pop text-[15px] font-bold text-pop-fg">
          S
        </div>
        <div className="mt-1 flex flex-col gap-2">
          {railItems.map(({ icon: Icon, label }) => {
            const active = label === activeRail;
            return (
              <div
                key={label}
                className={`flex w-14 flex-col items-center gap-1 rounded-lg py-2 ${
                  active ? "bg-pop/10 text-pop" : "text-faint"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={2} />
                <span className="text-[10px] font-medium">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* screen */}
      <div className="flex min-h-[720px] flex-1 flex-col">
        <StatusBar />
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
