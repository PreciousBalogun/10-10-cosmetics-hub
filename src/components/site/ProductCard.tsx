import { Link } from "@tanstack/react-router";
import { Plus, Minus, X } from "lucide-react";
import { useState } from "react";
import { formatNaira, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [picking, setPicking] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-luxe">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-secondary/40"
        aria-label={product.name}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground/80 backdrop-blur">
          <span className="text-gold">✦</span> {product.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="min-w-0">
          <h3 className="font-serif text-lg leading-tight text-foreground">
            <Link to="/product/$id" params={{ id: product.id }} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-base font-semibold text-foreground">
            {formatNaira(product.price)}
          </span>

          {!picking ? (
            <button
              type="button"
              onClick={() => {
                setQty(1);
                setPicking(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-[var(--brand-red-deep)] hover:shadow-luxe"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <div
                className="inline-flex items-center overflow-hidden rounded-full border border-primary bg-white"
                aria-label="Quantity selector"
              >
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-7 w-7 place-items-center text-primary hover:bg-primary hover:text-white"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="min-w-6 text-center text-xs font-semibold text-primary">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  className="grid h-7 w-7 place-items-center text-primary hover:bg-primary hover:text-white"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  add(product.id, product.shades[0], qty);
                  toast.success(`${product.name} × ${qty} added to cart`);
                  setPicking(false);
                }}
                className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white hover:bg-[var(--brand-red-deep)]"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setPicking(false)}
                className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:text-primary"
                aria-label="Cancel"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
