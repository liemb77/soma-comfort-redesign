const BENEFITS = ["Early app access", "Founder pricing on Pro", "Hardware launch updates", "Beta feature testing"];

export default function Waitlist() {
  return (
    <section id="waitlist" className="bg-background px-6 py-28 sm:py-36">
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[32px] border border-accent/25 bg-surface px-8 py-16 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] sm:px-16">
        <h2 className="font-display text-3xl leading-tight text-foreground sm:text-4xl">
          The app is almost ready. <span className="italic text-accent">Get in early.</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/65">
          Soma app early access is opening soon. Sign up and we&rsquo;ll send you a link the moment it&rsquo;s live —
          plus founder pricing on Pro.
        </p>

        <form className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            placeholder="you@email.com"
            className="w-full flex-1 rounded-full border border-foreground/15 bg-background px-5 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none focus:border-primary/50"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-[0_0_24px_rgba(47,134,255,0.3)] ring-1 ring-accent/30 transition-transform hover:scale-[1.03]"
          >
            Join waitlist
          </button>
        </form>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-1.5 text-xs text-foreground/55">
              <span className="h-1 w-1 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}