interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const FEATURES: Feature[] = [
  {
    title: "Real-time Comfort Score",
    desc: "A live 0–100 score that fuses your physiological state with your environment. Updates every few seconds.",
    icon: (
      <>
        <path d="M4 16a8 8 0 0 1 16 0" strokeLinecap="round" />
        <path d="M12 16l4.5-4.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Personal learning engine",
    desc: "Soma learns your baselines over days and weeks. Your comfort profile becomes uniquely yours — impossible to replicate.",
    icon: (
      <path
        d="M12 3a5 5 0 0 0-5 5c0 2 1 3 1 5v2h8v-2c0-2 1-3 1-5a5 5 0 0 0-5-5ZM9 19h6M10 22h4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Sleep intelligence",
    desc: "Tracks sleep stages, micro-awakenings, and restlessness. Automatically optimizes temperature through every phase of your night.",
    icon: (
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Multi-room zones",
    desc: "Soma Nodes bring comfort intelligence to every room. Bedroom, office, living room — each optimized independently.",
    icon: (
      <>
        <rect x="3" y="3" width="8" height="8" rx="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" />
      </>
    ),
  },
  {
    title: "Soma AI",
    desc: "Ask anything about your comfort data. “Why was my score low last night?” gets you a real answer grounded in your actual data.",
    icon: (
      <path
        d="M4 5h16v11H8l-4 4V5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Shared comfort",
    desc: "Two people, one room. Soma averages comfort scores and finds the environment that works best for both of you.",
    icon: (
      <>
        <circle cx="8.5" cy="9" r="3" />
        <circle cx="15.5" cy="9" r="3" />
        <path d="M3 20c.5-3.5 2.8-5.5 5.5-5.5s5 2 5.5 5.5M10 20c.5-3.5 2.8-5.5 5.5-5.5s5 2 5.5 5.5" strokeLinecap="round" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-surface px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">What Soma does</p>
          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            Comfort, quietly engineered.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-9 w-9 text-primary"
              >
                {feature.icon}
              </svg>
              <h3 className="mt-5 font-display text-xl text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}