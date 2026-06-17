import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = {
  productId: string;
  shade: string;
  qty: number;
};

type CartCtx = {
  items: CartItem[];
  add: (productId: string, shade: string, qty?: number) => void;
  remove: (productId: string, shade: string) => void;
  setQty: (productId: string, shade: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  hydrated: boolean;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "ten-over-ten-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = items.reduce((sum, it) => {
      const p = products.find((p) => p.id === it.productId);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
    const count = items.reduce((s, it) => s + it.qty, 0);
    return {
      items,
      hydrated,
      count,
      subtotal,
      add: (productId, shade, qty = 1) =>
        setItems((prev) => {
          const i = prev.findIndex((it) => it.productId === productId && it.shade === shade);
          if (i >= 0) {
            const copy = [...prev];
            copy[i] = { ...copy[i], qty: copy[i].qty + qty };
            return copy;
          }
          return [...prev, { productId, shade, qty }];
        }),
      remove: (productId, shade) =>
        setItems((prev) => prev.filter((it) => !(it.productId === productId && it.shade === shade))),
      setQty: (productId, shade, qty) =>
        setItems((prev) =>
          prev
            .map((it) => (it.productId === productId && it.shade === shade ? { ...it, qty } : it))
            .filter((it) => it.qty > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items, hydrated]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function cartItemProduct(it: CartItem): Product | undefined {
  return products.find((p) => p.id === it.productId);
}
