import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles as SparkIcon, HeartHandshake, BadgeCheck, Instagram } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Marquee } from "@/components/site/Marquee";
import { ProductCard } from "@/components/site/ProductCard";
import { SparkleField, Sparkle } from "@/components/site/Sparkle";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "10/10 Cosmetics — Premium Lip Care, Made For You" },
      {
        name: "description",
        content:
          "Glam Nigerian lip care: glosses, oils, liners and pro tools. Made for you, a 10/10.",
      },
      { property: "og:title", content: "10/10 Cosmetics — Made For You, A 10/10" },
      {
        property: "og:description",
        content: "Shop premium lip care from Lagos. DM or WhatsApp to order.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-luxe">
        <SparkleField density={14} />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
          <div className="relative z-10 flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-card/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur">
              <Sparkle size={12} className="text-gold" />
              New · Made in Lagos
            </span>
            <h1 className="mt-5 font-serif text-5xl leading-[0.95] text-foreground text-balance sm:text-6xl lg:text-7xl">
              <span className="font-script text-7xl text-primary sm:text-8xl lg:text-[9rem]">
                10/10
              </span>
              <span className="mt-2 block">
                Lip care that <em className="not-italic text-primary">slays</em>.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              Glossy. Plumping. Pigmented. Premium lip care made for every girl who knows
              she's already a ten.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-luxe transition-all hover:bg-[var(--brand-red-deep)]"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://instagram.com/10over10_cosmetics"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-5 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
                @10over10_cosmetics
              </a>
            </div>
            <p className="mt-6 font-script text-2xl text-primary sm:text-3xl">
              Made for you, a 10/10.
            </p>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-[5/6] w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-card shadow-luxe">
              <img
                src={heroImg}
                alt="Glossy red lips with gold sparkles surrounded by 10/10 lip products"
                width={1536}
                height={1152}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-white/30 bg-white/70 px-4 py-3 backdrop-blur">
                <div className="min-w-0">
                  <p className="truncate font-serif text-sm text-foreground">Signature 10/10 Red</p>
                  <p className="truncate text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Bestseller · Ruby Shine Gloss
                  </p>
                </div>
                <Link
                  to="/product/$id"
                  params={{ id: "ruby-shine-gloss" }}
                  className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
                >
                  View
                </Link>
              </div>
            </div>
            <Sparkle
              size={32}
              className="absolute -left-2 top-6 text-gold animate-twinkle"
            />
            <Sparkle
              size={22}
              className="absolute -right-1 bottom-16 text-primary animate-twinkle"
              style={{ animationDelay: "1.2s" }}
            />
          </div>
        </div>
      </section>

      <Marquee />

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              ✦ Bestsellers
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">Loved by the girls.</h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary hover:text-[var(--brand-red-deep)]"
          >
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="relative overflow-hidden border-y border-border bg-gradient-luxe">
        <SparkleField density={8} />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              ✦ Why 10/10
            </span>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
              Because you deserve a <em className="not-italic text-primary">ten</em>.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: "Premium Quality",
                copy: "Salon-grade formulas, tested on real lips. Cushioned, pigmented, non-sticky.",
              },
              {
                icon: SparkIcon,
                title: "Affordable Luxury",
                copy: "Editorial finishes at a price you'll actually repurchase. Glam, not gatekept.",
              },
              {
                icon: HeartHandshake,
                title: "Made for You",
                copy: "Shades curated for melanin. Care packed with every order, straight from Lagos.",
              },
            ].map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-red text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            ✦ The Reviews
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            Five stars, every shade.
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              name: "Adaeze, Lagos",
              quote:
                "The Ruby Shine Gloss is now my whole personality. So glossy, zero stick. I've reordered twice.",
            },
            {
              name: "Tomi, Abuja",
              quote:
                "The Midnight Berry Oil is unreal. My lips look like glass and feel even better. 10/10 is right.",
            },
            {
              name: "Kemi, PH",
              quote:
                "Perfect Line Liner literally doesn't move. I wore it from brunch to club. Obsessed.",
            },
          ].map((r) => (
            <figure
              key={r.name}
              className="relative rounded-3xl border border-border bg-card p-7 shadow-soft"
            >
              <Sparkle
                size={18}
                className="absolute right-5 top-5 text-gold animate-twinkle"
              />
              <div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <blockquote className="mt-3 font-serif text-lg italic leading-snug text-foreground">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                — {r.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
