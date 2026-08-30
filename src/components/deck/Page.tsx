import type { ReactNode } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

const deviceIcon = {
  PHONE: Smartphone,
  TABLET: Tablet,
  DESKTOP: Monitor,
};

export function DeviceLabel({ children }: { children: string }) {
  const key = children.split(" ")[0] as keyof typeof deviceIcon;
  const Icon = deviceIcon[key] ?? Smartphone;
  return (
    <div className="mb-4 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-faint">
      <Icon className="size-3.5" strokeWidth={2} />
      {children}
    </div>
  );
}

export function Page({
  pageNumber,
  index,
  title,
  suffix,
  description,
  children,
}: {
  pageNumber: string;
  index: string;
  title: string;
  suffix?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-[1120px] px-6 py-14">
      {/* running header */}
      <div className="flex items-baseline justify-between border-b border-ink pb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
        <span>Sortable · Mid-Fidelity Wireframes</span>
        <span>{pageNumber}</span>
      </div>

      {/* section title */}
      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-[13px] font-semibold text-pop">{index}</span>
        <h2 className="text-[19px] font-bold text-ink">{title}</h2>
        {suffix && <span className="text-[13px] text-faint">{suffix}</span>}
      </div>
      {description && (
        <p className="mt-3 max-w-[640px] text-[13px] leading-relaxed text-muted">{description}</p>
      )}

      <div className="mt-8">{children}</div>
    </section>
  );
}
