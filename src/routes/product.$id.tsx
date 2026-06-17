import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { Sparkle } from "@/components/site/Sparkle";
import { formatNaira, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Product — 10/10 Cosmetics" }] };
    return {
      meta: [
        { title: `${p.name} — 10/10 Cosmetics` },
        { name: "description", content: `${p.tagline} ${p.description}` },
        { property: "og:title", content: `${p.name} — 10/10 Cosmetics` },
        { property: "og:description", content: p.tagline },
        { property: "og:image", content: p.image },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-serif text-3xl">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-primary underline">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-serif text-2xl">Something went wrong</h1>
        <button onClick={reset} className="mt-6 text-primary underline">Try again</button>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [shade, setShade] = useState(product.shades[0]);
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);
  const fallback = products.filter((p) => p.id !== product.id).slice(0, 3);
  const youMayLike = related.length > 0 ? related : fallback;

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-secondary/40 shadow-soft">
            <img
              src={product.image}
              alt={product.name}
              width={1000}
              height={1000}
              className="aspect-square w-full object-cover"
            />
            <Sparkle size={26} className="absolute right-5 top-5 text-gold animate-twinkle" />
          </div>
          <Link
            to="/shop"
            className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary"
          >
            ← Back to shop
          </Link>
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            ✦ {product.category}
          </span>
          <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{product.name}</h1>
          <p className="mt-3 font-script text-2xl text-primary">{product.tagline}</p>
          <p className="mt-5 max-w-md text-muted-foreground">{product.description}</p>

          <div className="mt-6 text-2xl font-semibold text-foreground">
            {formatNaira(product.price)}
          </div>

          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Shade · <span className="text-muted-foreground">{shade}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.shades.map((s: string) => {
                const active = s === shade;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setShade(s)}
                    className={
                      "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all " +
                      (active
                        ? "border-primary bg-primary text-primary-foreground shadow-soft"
                        : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2 text-lg text-foreground/70 hover:text-primary"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-8 text-center text-sm font-semibold">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2 text-lg text-foreground/70 hover:text-primary"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                add(product.id, shade, qty);
                toast.success(`${product.name} (${shade}) × ${qty} added`);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-luxe transition-all hover:bg-[var(--brand-red-deep)]"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-foreground hover:text-primary"
            >
              View cart <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground">
            <li>✦ Free delivery in Lagos over ₦25,000</li>
            <li>✦ Nationwide shipping in 1–5 days</li>
            <li>✦ DM @10over10_cosmetics for shade help</li>
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-gradient-luxe">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl">You may also like</h2>
            <Link to="/shop" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Shop all →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {youMayLike.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
