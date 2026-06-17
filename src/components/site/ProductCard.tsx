import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { formatNaira, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
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
          <button
            type="button"
            onClick={() => {
              add(product.id, product.shades[0], 1);
              toast.success(`${product.name} added to cart`);
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-all hover:bg-[var(--brand-red-deep)] hover:shadow-luxe"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
