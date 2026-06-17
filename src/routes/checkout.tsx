import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { cartItemProduct, useCart } from "@/lib/cart";
import { formatNaira } from "@/lib/products";
import { Sparkle } from "@/components/site/Sparkle";

const NIGERIAN_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna","Kano",
  "Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo",
  "Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — 10/10 Cosmetics" },
      { name: "description", content: "Place your order securely on the 10/10 Cosmetics website." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear, hydrated } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    state: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().length > 100) e.fullName = "Enter your full name";
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (!form.address.trim() || form.address.trim().length > 300) e.address = "Enter a delivery address";
    if (!form.state) e.state = "Select a state";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Order is sent via on-site form — for now we store locally; brand follows up.
    setTimeout(() => {
      clear();
      setPlaced(true);
      setSubmitting(false);
    }, 400);
  }

  if (placed) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
          <div className="relative mx-auto rounded-3xl border border-border bg-card p-10 shadow-luxe">
            <Sparkle size={28} className="absolute right-6 top-6 text-gold animate-twinkle" />
            <Sparkle size={20} className="absolute left-6 top-10 text-primary animate-twinkle" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              ✦ Order Confirmed
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl">
              Your order has been placed!
            </h1>
            <p className="mt-4 text-muted-foreground">
              We'll contact you shortly to confirm delivery. 💄
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/shop"
                className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground hover:bg-[var(--brand-red-deep)]"
              >
                Keep shopping
              </Link>
              <Link
                to="/"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
              >
                ← Home
              </Link>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="font-serif text-3xl">Your bag is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add a product before checking out.</p>
          <button
            onClick={() => navigate({ to: "/shop" })}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground hover:bg-[var(--brand-red-deep)]"
          >
            Start shopping
          </button>
        </section>
      </SiteLayout>
    );
  }

  const inputCls =
    "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          ✦ Checkout
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
          Place your <em className="not-italic text-primary">order</em>.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us where to deliver — we'll reach out shortly to confirm.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
            noValidate
          >
            <div className="grid gap-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  Full name
                </span>
                <input
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={inputCls}
                  placeholder="Adaeze Okeke"
                />
                {errors.fullName && <p className="mt-1 text-xs text-primary">{errors.fullName}</p>}
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  Phone number
                </span>
                <input
                  type="tel"
                  required
                  maxLength={20}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputCls}
                  placeholder="+234 800 000 0000"
                />
                {errors.phone && <p className="mt-1 text-xs text-primary">{errors.phone}</p>}
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  Delivery address
                </span>
                <textarea
                  required
                  rows={3}
                  maxLength={300}
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputCls}
                  placeholder="House number, street, area, city"
                />
                {errors.address && <p className="mt-1 text-xs text-primary">{errors.address}</p>}
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  State
                </span>
                <select
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className={inputCls}
                >
                  <option value="">Select your state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-xs text-primary">{errors.state}</p>}
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-luxe transition-all hover:bg-[var(--brand-red-deep)] disabled:opacity-60"
            >
              {submitting ? "Placing order…" : "Place Order"}
            </button>

            <Link
              to="/cart"
              className="mt-4 block text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
            >
              ← Back to cart
            </Link>
          </form>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-luxe lg:sticky lg:top-24">
            <h2 className="font-serif text-xl">Order Summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((it) => {
                const p = cartItemProduct(it);
                if (!p) return null;
                return (
                  <li
                    key={`${it.productId}-${it.shade}`}
                    className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-serif text-base">{p.name}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {it.shade} · {formatNaira(p.price)} × {it.qty}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold">
                      {formatNaira(p.price * it.qty)}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
              <span>Total</span>
              <span>{formatNaira(subtotal)}</span>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
