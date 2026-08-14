"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValueEvent, useSpring, type MotionValue } from "framer-motion";

const FRAME_COUNT = 201;
const framePath = (i: number) => `/canyon-frames/frame_${String(i + 1).padStart(3, "0")}.jpg`;

// Scroll-scrubbed product hero: a Higgsfield-generated video (watch rotating,
// canyon walls closing in) pre-extracted into JPG frames and swapped onto a
// canvas based on scroll position. Never scrub a raw <video>'s currentTime —
// rapid seeks on a paused video don't reliably repaint in Chrome and fail
// silently. Canvas frame-swapping, driven by Framer Motion rather than a
// vanilla scroll listener, is the technique that actually works.
export default function CanyonScrubber({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  // Smooths out fast scroll flicks into an eased motion instead of jump-cutting
  // between frames — makes the scrub itself feel silky regardless of how the
  // source footage was paced.
  const smoothProgress = useSpring(progress, { stiffness: 120, damping: 24, mass: 0.4 });

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = canvasW / canvasH;

    let drawW: number;
    let drawH: number;
    if (imgRatio > canvasRatio) {
      drawH = canvasH;
      drawW = drawH * imgRatio;
    } else {
      drawW = canvasW;
      drawH = drawW / imgRatio;
    }
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      if (i === 0) img.onload = () => drawFrame(0);
      images.push(img);
    }
    imagesRef.current = images;

    function resize() {
      const canvas = canvasRef.current;
      const parent = canvas?.parentElement;
      if (!canvas || !parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      drawFrame(currentFrameRef.current);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  useMotionValueEvent(smoothProgress, "change", (p) => {
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(p * (FRAME_COUNT - 1))));
    if (index !== currentFrameRef.current) {
      currentFrameRef.current = index;
      drawFrame(index);
    }
  });

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}