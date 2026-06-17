export function Marquee() {
  const text = "Made for you, a 10/10";
  const items = ["Premium Lip Care", "DM to Order & Shine", "Made for you, a 10/10", "Free Delivery in Lagos"];
  return (
    <div className="relative overflow-hidden bg-gradient-red text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap py-3 text-sm font-medium tracking-[0.18em] uppercase">
        {Array.from({ length: 2 }).map((_, dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-8 px-8">
            {[text, ...items, text, ...items].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="text-gold">✦</span>
                <span>{t}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
