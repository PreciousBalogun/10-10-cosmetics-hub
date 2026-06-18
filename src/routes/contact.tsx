import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SparkleField } from "@/components/site/Sparkle";
import { MessageSquare, Mail, Instagram, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — 10/10 Cosmetics" },
      { name: "description", content: "Get in touch with 10/10 Cosmetics. We are based in Lagos, Nigeria and love to connect!" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <div className="relative overflow-hidden bg-gradient-luxe py-20">
        <SparkleField density={8} />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              ✦ Say Hello
            </span>
            <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              We'd love to <em className="not-italic text-primary">connect</em>.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-muted-foreground">
              Have a question about our products, orders, or delivery? Reach out to us and we'll get back to you as soon as possible!
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-red text-white shadow-soft">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg">WhatsApp</h3>
              <p className="mt-1 text-xs text-muted-foreground">Instant chat & ordering</p>
            </a>

            <a
              href="https://instagram.com/10over10_cosmetics"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-red text-white shadow-soft">
                <Instagram className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg">Instagram</h3>
              <p className="mt-1 text-xs text-muted-foreground">@10over10_cosmetics</p>
            </a>

            <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-red text-white shadow-soft">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg">Email</h3>
              <p className="mt-1 text-xs text-muted-foreground">hello@10over10.com</p>
            </div>

            <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxe">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-red text-white shadow-soft">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-lg">Location</h3>
              <p className="mt-1 text-xs text-muted-foreground">Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
