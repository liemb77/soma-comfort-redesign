interface Product {
  name: string;
  tagline: string;
  price: string;
  note?: string;
  specs: string[];
  cta: string;
}

const PRODUCTS: Product[] = [
  {
    name: "Soma Band",
    tagline: "Wrist sensor · EDA + temp + motion",
    price: "$179",
    specs: [
      "Continuous EDA stress tracking",
      "Skin temperature",
      "Motion tracking",
      "7-day battery",
      "Waterproof 50m",
      "Wireless charging",
    ],
    cta: "Pre-order Band",
  },
  {
    name: "Soma Hub",
    tagline: "Room sensor · environmental intelligence",
    price: "$99",
    specs: [
      "Temperature, humidity, CO₂",
      "Light and noise sensing",
      "Smart plug control",
      "Works with Nest, Govee, Hue",
    ],
    cta: "Pre-order Hub",
  },
  {
    name: "Starter Kit",
    tagline: "Band + Hub + Smart Plug included",
    price: "$299",
    note: "Save $38",
    specs: ["Priority shipping", "1 month Soma Pro free"],
    cta: "Get the Starter Kit",
  },
  {
    name: "Founder Edition",
    tagline: "Band + Hub + Smart Plug + Lifetime Pro",
    price: "$499",
    note: "Limited — 50 units",
    specs: ["Lifetime Pro subscription included", "Priority support"],
    cta: "Claim Founder Edition",
  },
];

export default function Hardware() {
  return (
    <section className="bg-surface px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Optional hardware</p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            More sensors, more precision.
          </h2>
          <p className="mt-3 text-sm text-foreground/60">
            None of this is required — Soma already works with the watch and devices you own. These just make it sharper.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="flex flex-col rounded-3xl border border-foreground/10 bg-background p-7">
              {product.note && (
                <span className="mb-3 self-start rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary">
                  {product.note}
                </span>
              )}
              <h3 className="font-display text-xl text-foreground">{product.name}</h3>
              <p className="mt-1 text-xs text-foreground/55">{product.tagline}</p>
              <p className="mt-4 font-display text-3xl text-foreground">{product.price}</p>

              <ul className="mt-5 flex flex-1 flex-col gap-2">
                {product.specs.map((s) => (
                  <li key={s} className="text-xs leading-relaxed text-foreground/65">
                    {s}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-6 cursor-pointer rounded-full border border-primary/30 px-5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-background"
              >
                {product.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}