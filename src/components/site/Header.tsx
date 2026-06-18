import { Link } from "@tanstack/react-router";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { useCart } from "@/lib/cart";

export function Header() {
  const { count, hydrated } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:grid-cols-3 sm:px-6">
        <div className="flex min-w-0 items-center sm:justify-start">
          <BrandMark />
        </div>
        <nav className="hidden items-center justify-center gap-7 text-sm font-medium text-foreground/80 sm:flex">
          <Link
            to="/"
            className="transition-colors hover:text-primary"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-primary" }}
          >
            Home
          </Link>
          <div className="relative group py-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              Shop
              <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
            </Link>
            <div className="absolute left-1/2 top-full z-50 mt-1 w-44 -translate-x-1/2 scale-95 opacity-0 pointer-events-none rounded-2xl border border-border/80 bg-background/95 p-2 shadow-luxe backdrop-blur transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto">
              <Link
                to="/shop"
                className="block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted/50 hover:text-primary transition-colors"
                activeOptions={{ exact: true }}
              >
                All Products
              </Link>
              <div className="my-1 border-t border-border/50" />
              {[
                { label: "Lip Gloss", val: "Lip Gloss" },
                { label: "Lip Oil", val: "Lip Oil" },
                { label: "Lip Liner", val: "Lip Liner" },
                { label: "Tools", val: "Tools" }
              ].map((cat) => (
                <Link
                  key={cat.val}
                  to="/shop"
                  search={{ c: cat.val }}
                  className="block rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted/50 hover:text-primary transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/about"
            className="transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="transition-colors hover:text-primary"
            activeProps={{ className: "text-primary" }}
          >
            Contact
          </Link>
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
