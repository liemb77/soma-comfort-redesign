interface Tier {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    features: [
      "Real-time Comfort Score",
      "1 climate device",
      "1 lighting device",
      "1 wearable",
      "Unlimited Soma hardware",
      "Basic schedule automation",
      "7-day history",
      "Basic Soma AI",
    ],
    cta: "Get started free",
  },
  {
    name: "Pro",
    price: "$9.99",
    cadence: "per month · 7-day free trial",
    features: [
      "Everything in Free",
      "Unlimited devices",
      "Real-time AI automation",
      "90-day history",
      "Advanced sleep intelligence",
      "Shared environment mode",
    ],
    cta: "Start free trial",
    highlighted: true,
    badge: "Most popular",
  },
  {
    name: "Pro Yearly",
    price: "$99",
    cadence: "per year · save $21",
    features: ["Same features as Pro monthly", "2 months free"],
    cta: "Get started",
  },
];

export default function Pricing() {
  return (
    <section className="bg-background px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Pricing</p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            Start free. Automate everything.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-3xl border p-8 ${
                tier.highlighted
                  ? "border-primary/40 bg-surface shadow-[0_0_0_1px_rgba(196,102,61,0.15),0_20px_40px_-20px_rgba(58,42,31,0.25)]"
                  : "border-foreground/10 bg-surface/60"
              }`}
            >
              {tier.badge && (
                <span className="mb-4 self-start rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-background">
                  {tier.badge}
                </span>
              )}
              <h3 className="font-display text-2xl text-foreground">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl text-foreground">{tier.price}</span>
              </div>
              <p className="mt-1 text-sm text-foreground/55">{tier.cadence}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/75">
                    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-primary">
                      <path
                        d="M4 10.5l3.5 3.5L16 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-8 cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  tier.highlighted
                    ? "bg-primary text-background"
                    : "border border-foreground/15 bg-transparent text-foreground"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}