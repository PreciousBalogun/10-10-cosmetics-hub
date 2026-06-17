import gloss from "@/assets/product-gloss.jpg";
import glossNude from "@/assets/product-gloss-nude.jpg";
import oil from "@/assets/product-oil.jpg";
import oilBerry from "@/assets/product-oil-berry.jpg";
import liner from "@/assets/product-liner.jpg";
import tool from "@/assets/product-tool.jpg";

export type Category = "Lip Gloss" | "Lip Oil" | "Lip Liner" | "Tools";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  shades: string[];
};

export const products: Product[] = [
  {
    id: "ruby-shine-gloss",
    name: "Ruby Shine Gloss",
    tagline: "High-shine, never sticky.",
    description:
      "A mirror-finish lip gloss in our signature 10/10 red. Cushioned, non-sticky, and made to glide. One swipe is a whole moment.",
    price: 7500,
    category: "Lip Gloss",
    image: gloss,
    shades: ["10/10 Red", "Cherry Wine", "Bare Kiss"],
  },
  {
    id: "soft-pout-gloss",
    name: "Soft Pout Gloss",
    tagline: "Your lips, but glossier.",
    description:
      "A weightless nude-pink gloss that lights up every undertone. Subtle shimmer, serious shine.",
    price: 7500,
    category: "Lip Gloss",
    image: glossNude,
    shades: ["Bare Kiss", "Soft Peach", "Honey Glaze"],
  },
  {
    id: "glow-drop-lip-oil",
    name: "Glow Drop Lip Oil",
    tagline: "A drop of devotion.",
    description:
      "Hydrating lip oil infused with vitamin E. A sheer flush of colour with a glassy, plumping finish.",
    price: 8500,
    category: "Lip Oil",
    image: oil,
    shades: ["Sunset", "Plum", "Clear Halo"],
  },
  {
    id: "midnight-berry-oil",
    name: "Midnight Berry Oil",
    tagline: "Deep colour, soft care.",
    description:
      "A rich berry lip oil that conditions and tints in one. Perfect for evenings that go a little longer.",
    price: 8500,
    category: "Lip Oil",
    image: oilBerry,
    shades: ["Berry", "Wine", "Mulberry"],
  },
  {
    id: "perfect-line-liner",
    name: "Perfect Line Liner",
    tagline: "Sharp lines, no bleeding.",
    description:
      "A creamy, long-wear lip liner that defines, fills and lasts. Pairs with every gloss in the drawer.",
    price: 5500,
    category: "Lip Liner",
    image: liner,
    shades: ["10/10 Red", "Nude Brown", "Brick"],
  },
  {
    id: "pro-lip-kit",
    name: "Pro Lip Tool Kit",
    tagline: "Studio-grade, palm-sized.",
    description:
      "A precision lip brush and sharpener duo. Built for clean edges and a flawless blend, every time.",
    price: 6500,
    category: "Tools",
    image: tool,
    shades: ["One Size"],
  },
];

export const categories: ("All" | Category)[] = [
  "All",
  "Lip Gloss",
  "Lip Oil",
  "Lip Liner",
  "Tools",
];

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export const getProduct = (id: string) => products.find((p) => p.id === id);
