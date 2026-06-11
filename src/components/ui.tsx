import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  numeral,
  label,
  title,
  sub,
  align = "center",
}: {
  numeral: string;
  label: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignCls} gap-4`}>
      <p className="font-display text-sm tracking-[0.35em] text-brass uppercase">
        <span className="mr-3">{numeral}</span>
        {label}
      </p>
      <h2 className="font-display text-4xl leading-[1.08] font-light text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {sub ? <p className="max-w-xl text-base leading-relaxed text-cocoa">{sub}</p> : null}
    </div>
  );
}

export function Em({ children }: { children: ReactNode }) {
  return <em className="font-display italic">{children}</em>;
}

export function CtaLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-[13px] font-semibold tracking-[0.18em] uppercase transition-colors duration-200";
  const styles =
    variant === "solid"
      ? "bg-espresso text-ivory hover:bg-brass-deep"
      : "border border-espresso/30 text-espresso hover:border-espresso";
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span aria-label="5.0 star rating" className={`tracking-[0.2em] text-brass ${className}`}>
      ★★★★★
    </span>
  );
}
