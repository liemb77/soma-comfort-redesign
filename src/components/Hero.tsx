"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const CanyonScrubber = dynamic(() => import("./CanyonScrubber"), { ssr: false });

interface Beat {
  text: string;
  range: [number, number, number, number];
}

const STORY_BEATS: Beat[] = [
  { text: "One loop. Endless comfort.", range: [0.16, 0.22, 0.32, 0.38] },
  { text: "Built for people who feel everything.", range: [0.42, 0.48, 0.58, 0.64] },
  { text: "Your devices, finally connected.", range: [0.68, 0.74, 0.82, 0.88] },
];

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

function StoryBeat({ beat, progress }: { beat: Beat; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, (p) => keyframes(p, beat.range, [0, 1, 1, 0]));
  const y = useTransform(progress, (p) => keyframes(p, beat.range, [16, 0, 0, -16]));

  return (
    <motion.p
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-0 font-display text-2xl italic leading-tight text-white sm:text-3xl"
    >
      {beat.text}
    </motion.p>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, (p) => keyframes(p, [0, 0.09], [1, 0]));
  const textY = useTransform(scrollYProgress, (p) => keyframes(p, [0, 0.12], [0, -24]));
  const scrollHintOpacity = useTransform(scrollYProgress, (p) => keyframes(p, [0, 0.1], [1, 0]));
  const finalLineOpacity = useTransform(scrollYProgress, (p) => keyframes(p, [0.88, 0.97], [0, 1]));

  return (
    <section ref={containerRef} className="relative h-[500vh]">
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
              "linear-gradient(to bottom, rgba(18,13,9,0.6) 0%, rgba(18,13,9,0.25) 40%, rgba(18,13,9,0) 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 hidden sm:block"
          style={{
            background:
              "linear-gradient(to right, rgba(18,13,9,0.55) 0%, rgba(18,13,9,0.28) 32%, rgba(18,13,9,0) 50%)",
          }}
        />

        <div className="absolute inset-x-0 top-0 flex h-[46%] flex-col justify-center px-6 sm:inset-y-0 sm:left-0 sm:top-auto sm:h-full sm:w-[52%] sm:justify-center sm:px-10 lg:w-[44%] lg:px-14">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="pointer-events-none flex flex-col items-start text-left"
          >
            <span className="mb-4 rounded-full border border-white/25 bg-black/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
              Works with the watch you already own
            </span>
            <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-white">
              Comfort, <span className="italic text-primary">Automated.</span>
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base">
              Soma reads your body, learns your preferences, and silently adjusts your environment —
              temperature, light, airflow — before you feel uncomfortable.
            </p>
            <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#waitlist"
                className="cursor-pointer rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                Join the waitlist
              </a>
              <a
                href="#how-it-works"
                className="cursor-pointer rounded-full border border-white/30 bg-black/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50"
              >
                See how it works
              </a>
            </div>
          </motion.div>

          <div className="relative mt-8 h-24 sm:h-28">
            {STORY_BEATS.map((beat) => (
              <StoryBeat key={beat.text} beat={beat} progress={scrollYProgress} />
            ))}
            <motion.p
              style={{ opacity: finalLineOpacity }}
              className="pointer-events-none absolute inset-x-0 bottom-0 font-display text-2xl italic leading-tight text-white sm:text-3xl"
            >
              Comfort, from your wrist.
            </motion.p>
          </div>
        </div>

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