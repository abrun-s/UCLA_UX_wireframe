import type { ReactNode } from "react";
import { List, Archive, Landmark, Settings } from "lucide-react";
import { StatusBar } from "./StatusBar";

const navItems = [
  { icon: List, label: "Goals" },
  { icon: Archive, label: "Archive" },
  { icon: Landmark, label: "Accounts" },
  { icon: Settings, label: "Settings" },
];

export function PhoneFrame({
  children,
  activeTab,
  bottomNav = true,
}: {
  children: ReactNode;
  activeTab?: string;
  bottomNav?: boolean;
}) {
  return (
    <div className="flex w-[300px] flex-col overflow-hidden rounded-[28px] border border-hair bg-white shadow-sm">
      <StatusBar rounded />
      <div className="flex min-h-[560px] flex-1 flex-col">{children}</div>
      {bottomNav && (
        <nav className="flex items-center justify-around border-t border-hair px-2 py-2.5">
          {navItems.map(({ icon: Icon, label }) => {
            const active = label === activeTab;
            return (
              <div
                key={label}
                className={`flex flex-col items-center gap-1 ${active ? "text-pop" : "text-faint"}`}
              >
                <Icon className="size-[18px]" strokeWidth={2} />
                <span className="text-[10px] font-medium">{label}</span>
              </div>
            );
          })}
        </nav>
      )}
    </div>
  );
}
