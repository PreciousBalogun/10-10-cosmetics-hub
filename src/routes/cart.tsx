import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cartItemProduct, useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";

const WHATSAPP_NUMBER = "2348000000000"; // replace with real number

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — 10/10 Cosmetics" },
      { name: "description", content: "Review your bag and complete your order via WhatsApp." },
      { property: "og:title", content: "Your Cart — 10/10 Cosmetics" },
      { property: "og:description", content: "Complete your order via WhatsApp." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, count, clear, hydrated } = useCart();

  const whatsappText = encodeURIComponent(
    "Hi 10/10 Cosmetics ✨, I'd like to order:\n\n" +
      items
        .map((it) => {
          const p = cartItemProduct(it);
          if (!p) return "";
          return `• ${p.name} — ${it.shade} × ${it.qty} (${formatNaira(p.price * it.qty)})`;
        })
        .filter(Boolean)
        .join("\n") +
      `\n\nSubtotal: ${formatNaira(subtotal)}\n\nName:\nAddress:\nState:`,
  );

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          ✦ Your Bag
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
          Almost a <em className="not-italic text-primary">ten</em>.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We process orders via WhatsApp & DM — tap the green button to send us your bag.
        </p>

        {hydrated && items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-border bg-card p-12 text-center shadow-soft">
            <p className="font-serif text-2xl">Your bag is empty.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Start with a bestseller — your lips will thank you.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-soft hover:bg-[var(--brand-red-deep)]"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <ul className="space-y-4">
              {items.map((it) => {
                const p = cartItemProduct(it);
                if (!p) return null;
                return (
                  <li
                    key={`${it.productId}-${it.shade}`}
                    className="grid grid-cols-[80px_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-card p-3 shadow-soft sm:grid-cols-[96px_minmax(0,1fr)_auto_auto]"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      width={96}
                      height={96}
                      loading="lazy"
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-serif text-lg">{p.name}</p>
                      <p className="truncate text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Shade · {it.shade}
                      </p>
                      <p className="mt-1 text-sm font-semibold sm:hidden">
                        {formatNaira(p.price * it.qty)}
                      </p>
                    </div>
                    <div className="col-span-3 flex items-center justify-between gap-3 sm:col-span-1 sm:justify-center">
                      <div className="inline-flex items-center rounded-full border border-border bg-background">
                        <button
                          onClick={() => setQty(it.productId, it.shade, it.qty - 1)}
                          className="px-3 py-1.5 text-lg text-foreground/70 hover:text-primary"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold">{it.qty}</span>
                        <button
                          onClick={() => setQty(it.productId, it.shade, it.qty + 1)}
                          className="px-3 py-1.5 text-lg text-foreground/70 hover:text-primary"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(it.productId, it.shade)}
                        className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-primary"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="hidden text-right text-sm font-semibold sm:block">
                      {formatNaira(p.price * it.qty)}
                    </span>
                  </li>
                );
              })}
              <li className="flex justify-end">
                <button
                  onClick={clear}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
                >
                  Clear bag
                </button>
              </li>
            </ul>

            <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-luxe lg:sticky lg:top-24">
              <h2 className="font-serif text-xl">Order Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Items</dt>
                  <dd>{count}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>Delivery</dt>
                  <dd>Confirmed via DM</dd>
                </div>
                <div className="my-3 border-t border-border" />
                <div className="flex justify-between text-base font-semibold text-foreground">
                  <dt>Subtotal</dt>
                  <dd>{formatNaira(subtotal)}</dd>
                </div>
              </dl>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-luxe transition-all hover:opacity-95"
                style={{ backgroundColor: "var(--whatsapp)" }}
              >
                <MessageCircle className="h-4 w-4" />
                Complete Order via WhatsApp
              </a>

              <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>

              <Link
                to="/checkout"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-luxe transition-all hover:bg-[var(--brand-red-deep)]"
              >
                Order on Website
              </Link>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                We process orders via WhatsApp & DM. You'll confirm delivery and payment with us
                directly.
              </p>

              <Link
                to="/shop"
                className="mt-6 block text-center text-xs font-semibold uppercase tracking-[0.16em] text-primary hover:underline"
              >
                ← Keep shopping
              </Link>
            </aside>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
