import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SparkleField, Sparkle } from "@/components/site/Sparkle";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — 10/10 Cosmetics" },
      { name: "description", content: "Learn more about 10/10 Cosmetics, premium lip care crafted in Lagos, Nigeria." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden bg-gradient-luxe py-20">
        <SparkleField density={10} />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            ✦ Our Story
          </span>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
            Made for you, <br />
            <span className="font-script text-5xl text-primary sm:text-6xl">a 10/10.</span>
          </h1>
          
          <div className="mt-12 space-y-6 text-left text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              At <strong>10/10 Cosmetics</strong>, we believe beauty isn't about fitting into a mold—it's about celebrating the absolute ten that you already are. Based in Lagos, Nigeria, we specialize in high-shine lip glosses, nourishing lip oils, ultra-pigmented lip liners, and premium cosmetic tools.
            </p>
            <p>
              Every formula we design is carefully crafted to deliver luxury quality without the luxury gatekeeping. From rich, non-sticky textures to shades beautifully curated for melanin-rich skin, our products are made to elevate your daily routine into a glamorous ritual.
            </p>
            <p>
              We pride ourselves on attention to detail, gorgeous aesthetics, and authentic connections with our community. When you wear 10/10, you aren't just wearing makeup—you're wearing confidence.
            </p>
          </div>

          <div className="mt-16 inline-flex items-center gap-2 rounded-2xl border border-primary/20 bg-card/60 p-6 text-left backdrop-blur">
            <Sparkle size={24} className="shrink-0 text-gold animate-twinkle" />
            <div>
              <p className="font-serif text-lg text-foreground">The 10/10 Promise</p>
              <p className="text-sm text-muted-foreground">Premium ingredients, rich pigmentation, and 100% cruelty-free formulation.</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
