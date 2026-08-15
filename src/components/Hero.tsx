"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const CanyonScrubber = dynamic(() => import("./CanyonScrubber"), { ssr: false });

// Generic clamped piecewise-linear interpolation, computed directly rather
// than via a keyframe-array useTransform — keyframe arrays here were
// observed producing a mirrored/ping-pong curve instead of clamping past
// their range (values fade out correctly, then climb back up instead of
// staying put). A plain function transform sidesteps whatever that
// interaction is.
function keyframes(p: number, inputs: readonly number[], outputs: readonly number[]): number {
  if (p <= inputs[0]) return outputs[0];
  const last = inputs.length - 1;
  if (p >= inputs[last]) return outputs[last];
  for (let i = 0; i < last; i++) {
    if (p <= inputs[i + 1]) {
      const t = (p - inputs[i]) / (inputs[i + 1] - inputs[i]);
      return outputs[i] + t * (outputs[i + 1] - outputs[i]);
    }
  }
  return outputs[last];
}

type Motion = "drop" | "fade" | "slide" | "rise";

interface Callout {
  index: string;
  title: string;
  accent: string;
  desc: string;
  range: [number, number, number, number];
  motion: Motion;
}

const CALLOUTS: Callout[] = [
  {
    index: "01",
    title: "Sense your",
    accent: "body.",
    desc: "Reads HRV, skin temperature, motion and stress patterns from your Apple Watch, Fitbit, Oura Ring — or the dedicated Soma Band. It runs quietly in the background, so there's never an app to open or a reading to check.",
    range: [0.1, 0.16, 0.27, 0.33],
    motion: "drop",
  },
  {
    index: "02",
    title: "Read your",
    accent: "environment.",
    desc: "Connected to your thermostat, smart lights, plugs and sensors, Soma knows exactly what your room feels like right now — not just what the thermostat is set to.",
    range: [0.35, 0.41, 0.52, 0.58],
    motion: "fade",
  },
  {
    index: "03",
    title: "Compute your",
    accent: "score.",
    desc: "A live Comfort Score from 0–100 fuses your body data with your environment into one number. The engine learns your personal baseline over days and weeks, so it knows what \"comfortable\" actually means for you.",
    range: [0.6, 0.66, 0.77, 0.83],
    motion: "slide",
  },
  {
    index: "04",
    title: "Adjust",
    accent: "invisibly.",
    desc: "Temperature drifts, lights shift, airflow adjusts — before you'd ever notice discomfort. No notifications to dismiss, no dashboard to check. It just works, quietly, in the background.",
    range: [0.85, 0.89, 0.96, 0.99],
    motion: "rise",
  },
];

function ScrollCallout({ callout, progress }: { callout: Callout; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (p) => keyframes(p, callout.range, [0, 1, 1, 0]));

  // Each callout enters on its own axis — a drop from above, a plain fade
  // with no movement, a slide in from the side, or a rise from below — so
  // scrolling through all four reads as distinct movement, not one repeated
  // animation firing four times. They all land in the same slot the headline
  // used (not scattered around the frame), so the motion is the only thing
  // that varies, not the position.
  const y = useTransform(progress, (p) => {
    if (callout.motion === "drop") return keyframes(p, callout.range, [-40, 0, 0, -14]);
    if (callout.motion === "rise") return keyframes(p, callout.range, [40, 0, 0, 14]);
    return 0;
  });
  const x = useTransform(progress, (p) => {
    if (callout.motion !== "slide") return 0;
    return keyframes(p, callout.range, [36, 0, 0, 12]);
  });

  return (
    <motion.div style={{ opacity, y, x }} className="pointer-events-none absolute inset-0 flex flex-col justify-center">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{callout.index}</span>
      <h4 className="mt-3 font-display text-[clamp(1.75rem,4.2vw,3rem)] font-medium leading-[1.05] text-white">
        {callout.title} <span className="italic font-extrabold">{callout.accent}</span>
      </h4>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-base">{callout.desc}</p>
    </motion.div>
  );
}

function CalloutDot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const start = 0.08;
  const end = 1.0;
  const opacity = useTransform(progress, (p) => {
    if (p < start) return 0.3;
    const local = Math.min(1, (p - start) / (end - start));
    const active = Math.round(local * (total - 1));
    return active === index ? 1 : 0.3;
  });
  return <motion.span style={{ opacity }} className="h-1.5 w-6 rounded-full bg-accent" />;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, (p) => keyframes(p, [0, 0.06], [1, 0]));
  const textY = useTransform(scrollYProgress, (p) => keyframes(p, [0, 0.08], [0, -24]));
  const scrollHintOpacity = useTransform(scrollYProgress, (p) => keyframes(p, [0, 0.06], [1, 0]));
  const dotsOpacity = useTransform(scrollYProgress, (p) => keyframes(p, [0.04, 0.09], [0, 1]));

  return (
    <section ref={containerRef} className="relative h-[700vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-background">
        <CanyonScrubber progress={scrollYProgress} />

        {/* Text lives in its own zone — top band on mobile, left column on
            larger screens — so it never sits on top of the watch itself.
            Full-bleed gradients (not boxes clipped to the column width) so
            the fade dissolves naturally instead of leaving a visible edge. */}
        <div
          className="pointer-events-none absolute inset-0 sm:hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0) 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.32) 32%, rgba(0,0,0,0) 50%)",
          }}
        />

        {/* Headline and the four scroll callouts share this exact zone —
            the callouts replace the headline in place once it fades,
            rather than appearing scattered around the frame. */}
        <div className="absolute inset-x-0 top-0 flex h-[46%] flex-col justify-center px-6 sm:inset-y-0 sm:left-0 sm:top-auto sm:h-full sm:w-[52%] sm:justify-center sm:px-10 lg:w-[44%] lg:px-14">
          <div className="relative h-full w-full">
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="pointer-events-none absolute inset-0 flex flex-col justify-center text-left"
            >
              <span className="mb-4 flex w-fit items-center gap-2 rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Works with the watch you already own
              </span>
              <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.05] text-white">
                Comfort, <span className="italic font-extrabold">Automated.</span>
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70 sm:text-base">
                Soma reads your body, learns your preferences, and silently adjusts your environment —
                temperature, light, airflow — before you feel uncomfortable.
              </p>
              <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#waitlist"
                  className="cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_36px_rgba(47,134,255,0.35)] ring-1 ring-accent/30 transition-transform hover:scale-[1.03]"
                >
                  Join the waitlist
                </a>
                <a
                  href="#how-it-works"
                  className="cursor-pointer rounded-full border border-white/30 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:border-white/50"
                >
                  See how it works
                </a>
              </div>
            </motion.div>

            {CALLOUTS.map((callout) => (
              <ScrollCallout key={callout.index} callout={callout} progress={scrollYProgress} />
            ))}
          </div>
        </div>

        <motion.div
          style={{ opacity: dotsOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center gap-2 sm:bottom-10"
        >
          {CALLOUTS.map((callout, i) => (
            <CalloutDot key={callout.index} index={i} total={CALLOUTS.length} progress={scrollYProgress} />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <span className="h-8 w-px bg-white/30" />
        </motion.div>
      </div>
    </section>
  );
}