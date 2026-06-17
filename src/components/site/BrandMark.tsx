import { Link } from "@tanstack/react-router";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5">
      <span
        aria-hidden
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-red text-white shadow-soft"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 21s-7-4.35-7-10a4.5 4.5 0 0 1 8-2.83A4.5 4.5 0 0 1 19 11c0 5.65-7 10-7 10z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-script text-2xl text-primary -mb-1">10/10</span>
        {!compact && (
          <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            Cosmetics
          </span>
        )}
      </span>
    </Link>
  );
}
