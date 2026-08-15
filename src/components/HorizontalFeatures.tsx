"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface Panel {
  index: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const PANELS: Panel[] = [
  {
    index: "01",
    title: "Sense your body",
    desc: "Soma reads physiological signals from your Apple Watch, Fitbit, Oura Ring, or Soma Band — HRV, skin temperature, motion, and stress patterns.",
    icon: <path d="M4 12h4l2-7 4 14 2-7h4" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    index: "02",
    title: "Read your environment",
    desc: "Connected to your Nest thermostat, Govee lights, smart plugs, and sensors — Soma knows exactly what your room feels like right now.",
    icon: (
      <path
        d="M4 22V11l8-7 8 7v11M9 22v-7h6v7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    index: "03",
    title: "Compute your score",
    desc: "A real-time Comfort Score (0–100) fuses your body data and environment into a single signal. The engine learns your personal baselines over time.",
    icon: (
      <>
        <path d="M4 16a8 8 0 0 1 16 0" strokeLinecap="round" />
        <path d="M12 16l4.5-4.5" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    index: "04",
    title: "Adjust invisibly",
    desc: "Soma acts before you notice discomfort. Temperature drifts, lights shift, airflow adjusts. No notifications. No dashboards. Just comfort.",
    icon: (
      <>
        <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
        <path d="M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" strokeLinecap="round" />
      </>
    ),
  },
];

function ProgressDot({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  // A function transform (not a keyframe array) so there's no risk of
  // duplicate/non-monotonic input stops near the first or last dot.
  const opacity = useTransform(progress, (p) => {
    const active = Math.round(p * (total - 1));
    return active === index ? 1 : 0.25;
  });
  return <motion.span style={{ opacity }} className="h-1.5 w-6 rounded-full bg-primary" />;
}

export default function HorizontalFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(PANELS.length - 1) * 100}vw`]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x: trackX }} className="flex h-full">
          {PANELS.map((panel) => (
            <div
              key={panel.index}
              className="relative flex h-full w-screen shrink-0 items-center justify-center gap-10 overflow-hidden px-6 sm:justify-start sm:gap-16 sm:px-16 lg:px-28"
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-[6vw]">
                <div
                  className="pointer-events-none absolute"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%)",
                    width: "70vw",
                    height: "70vw",
                    maxWidth: 700,
                    maxHeight: 700,
                  }}
                />
              </div>

              <div className="relative z-10 flex max-w-lg flex-col items-start">
                <span className="font-display text-sm text-primary">{panel.index}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="my-6 h-12 w-12 text-primary"
                >
                  {panel.icon}
                </svg>
                <h3 className="font-display text-3xl text-foreground sm:text-4xl">{panel.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/65">{panel.desc}</p>
              </div>

              <div className="relative z-10 hidden shrink-0 items-center justify-center sm:flex">
                <span
                  className="absolute font-display text-foreground/[0.06]"
                  style={{ fontSize: "min(38vw, 420px)", lineHeight: 1 }}
                >
                  {panel.index}
                </span>
                <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-primary/10 bg-surface/60 backdrop-blur-md lg:h-72 lg:w-72">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="h-24 w-24 text-primary lg:h-28 lg:w-28"
                  >
                    {panel.icon}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center gap-2">
          {PANELS.map((panel, i) => (
            <ProgressDot key={panel.index} index={i} total={PANELS.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}