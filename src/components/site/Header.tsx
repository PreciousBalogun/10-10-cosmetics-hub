import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "Lip Gloss", search: { c: "Lip Gloss" as const } },
  { to: "/shop", label: "Lip Oil", search: { c: "Lip Oil" as const } },
] as const;

export function Header() {
  const { count, hydrated } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:grid-cols-3 sm:px-6">
        <div className="flex min-w-0 items-center sm:justify-start">
          <BrandMark />
        </div>
        <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-foreground/80 sm:flex">
          {nav.map((n, i) => (
            <Link
              key={i}
              to={n.to}
              // @ts-expect-error optional search
              search={n.search}
              className="transition-colors hover:text-primary"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:border-primary hover:text-primary"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span
              aria-label={`${count} items in cart`}
              className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground"
            >
              {hydrated ? count : 0}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
