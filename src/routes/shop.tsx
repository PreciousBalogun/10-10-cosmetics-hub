import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { categories, products, type Category } from "@/lib/products";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { SparkleField } from "@/components/site/Sparkle";

const search = z.object({
  c: z.enum(["Lip Gloss", "Lip Oil", "Lip Liner", "Tools"]).optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop — 10/10 Cosmetics" },
      {
        name: "description",
        content:
          "Shop premium lip glosses, lip oils, lip liners and pro tools from 10/10 Cosmetics.",
      },
      { property: "og:title", content: "Shop — 10/10 Cosmetics" },
      { property: "og:description", content: "Glam Nigerian lip care, shipped nationwide." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { c } = Route.useSearch();
  const active: "All" | Category = c ?? "All";
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border bg-gradient-luxe">
        <SparkleField density={6} />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            ✦ The Shop
          </span>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
            Pick your <em className="not-italic text-primary">ten</em>.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Glosses, oils, liners and tools — curated for high-shine, all-day wear.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = active === cat;
            return (
              <Link
                key={cat}
                to="/shop"
                search={cat === "All" ? {} : { c: cat }}
                className={
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-all " +
                  (isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary")
                }
              >
                {cat}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">
            Nothing here yet — check back soon ✦
          </p>
        )}
      </section>
    </SiteLayout>
  );
}
