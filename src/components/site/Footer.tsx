import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-luxe">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <BrandMark />
          <p className="font-serif text-lg italic text-foreground/80">
            Made for you, a 10/10.
          </p>
          <p className="text-sm text-muted-foreground">
            Premium lip care, crafted in Lagos. Shipped with love across Nigeria.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
            Shop
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop" className="hover:text-primary">All Products</Link></li>
            <li><Link to="/shop" search={{ c: "Lip Gloss" }} className="hover:text-primary">Lip Gloss</Link></li>
            <li><Link to="/shop" search={{ c: "Lip Oil" }} className="hover:text-primary">Lip Oil</Link></li>
            <li><Link to="/shop" search={{ c: "Lip Liner" }} className="hover:text-primary">Lip Liner</Link></li>
            <li><Link to="/shop" search={{ c: "Tools" }} className="hover:text-primary">Tools</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
            Orders
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/cart" className="hover:text-primary">Your Cart</Link></li>
            <li>DM or WhatsApp to order</li>
            <li>Delivery: 1–5 days nationwide</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
            Follow
          </h4>
          <a
            href="https://instagram.com/10over10_cosmetics"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-3.5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <Instagram className="h-4 w-4" />
            @10over10_cosmetics
          </a>
          <p className="mt-4 text-xs text-muted-foreground">
            DM to order. We reply fast ✦
          </p>
        </div>
      </div>
      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} 10/10 Cosmetics. All rights reserved.</span>
          <span className="font-script text-base text-primary">Shine on ❤</span>
        </div>
      </div>
    </footer>
  );
}
