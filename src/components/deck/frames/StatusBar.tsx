import { Wifi, BatteryMedium } from "lucide-react";

export function StatusBar({ rounded = false }: { rounded?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between bg-chip px-4 py-2 text-[11px] font-medium text-muted ${
        rounded ? "rounded-t-[28px]" : ""
      }`}
    >
      <span>0:00</span>
      <span className="flex items-center gap-1.5">
        <Wifi className="size-3.5" />
        <BatteryMedium className="size-4" />
      </span>
    </div>
  );
}
