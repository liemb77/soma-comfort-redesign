interface Tier {
  name: string;
  price: string;
  cadence: string;
  features: string[];
  cta: string;
  dark?: boolean;
  badge?: string;
}

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    features: [
      "1 integration per category",
      "Comfort alerts — tells you what to adjust",
      "Comfort score updates every ~30 min",
      "7-day history",
      "No automations, no AI",
    ],
    cta: "Get started free",
  },
  {
    name: "Plus",
    price: "$9.99",
    cadence: "per month · no annual plan",
    features: [
      "3 devices per category",
      "Full automations",
      "30-day history",
      "Faster updates — every ~15 min",
      "Limited device compatibility",
      "No multi-zone, no shared access, no AI",
    ],
    cta: "Upgrade to Plus",
  },
  {
    name: "Pro",
    price: "$29.99",
    cadence: "per month, or $299/year",
    features: [
      "Unlimited devices, full API access",
      "Automations, alerts & notifications",
      "90-day history",
      "Multi-zone control",
      "Shared environment — family & friends, guest mode",
      "Full AI + comfort pattern learning",
      "Schedules & vacation mode",
      "Daily comfort & sleep reports",
      "Mic + camera as ambient sensors",
      "Live updates — every 2–3 min",
    ],
    cta: "Go Pro",
    dark: true,
    badge: "Most popular",
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
              className={`flex flex-col rounded-3xl border p-8 backdrop-blur-xl ${
                tier.dark
                  ? "border-accent/40 bg-black text-white shadow-[0_20px_60px_-20px_rgba(47,134,255,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] sm:-translate-y-3"
                  : "border-foreground/10 bg-surface/60 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
              }`}
            >
              {tier.badge && (
                <span className="mb-4 self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  {tier.badge}
                </span>
              )}
              <h3 className="font-display text-2xl">{tier.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl">{tier.price}</span>
              </div>
              <p className={`mt-1 text-sm ${tier.dark ? "text-white/55" : "text-foreground/55"}`}>{tier.cadence}</p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2.5 text-sm ${tier.dark ? "text-white/80" : "text-foreground/75"}`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`mt-0.5 h-4 w-4 shrink-0 ${tier.dark ? "text-white" : "text-black"}`}
                    >
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
                  tier.dark
                    ? "bg-white text-black shadow-[0_0_24px_rgba(47,134,255,0.35)] ring-1 ring-accent/30"
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