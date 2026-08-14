"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

const CASE_COLOR = "#867e73";
const RIM_COLOR = "#d8d2c6";
const BAND_COLOR = "#c4663d";
const BEZEL_COLOR = "#141110";

export default function WatchModel({ progress }: { progress: MotionValue<number> }) {
  const group = useRef<THREE.Group>(null);
  const screenContent = useRef<HTMLDivElement>(null);

  useFrame(() => {
    const p = progress.get();
    if (!group.current) return;

    // Beat 1 (0 -> 0.35 of scroll): watch turns from a three-quarter angle to face the camera,
    // finishing before the sequential story text starts playing over it
    const turn = THREE.MathUtils.smoothstep(p, 0, 0.35);
    group.current.rotation.y = THREE.MathUtils.lerp(-0.6, 0, turn);
    group.current.rotation.x = THREE.MathUtils.lerp(0.14, 0, turn);

    // Beat 2 (0.3 -> 0.95 of scroll): slow continuous "camera dolly" via scale across the
    // whole story sequence, so the watch keeps growing as each line of text plays
    const grow = THREE.MathUtils.smoothstep(p, 0.3, 0.95);
    group.current.scale.setScalar(THREE.MathUtils.lerp(0.46, 1.2, grow));
    group.current.position.y = THREE.MathUtils.lerp(-0.95, -0.15, grow);

    if (screenContent.current) {
      const reveal = THREE.MathUtils.smoothstep(p, 0.82, 0.96);
      screenContent.current.style.opacity = String(reveal);
    }
  });

  return (
    <group ref={group}>
      {/* Case */}
      <RoundedBox args={[1.15, 1.4, 0.26]} radius={0.16} smoothness={7} castShadow>
        <meshStandardMaterial color={CASE_COLOR} roughness={0.38} metalness={0.6} />
      </RoundedBox>

      {/* Polished rim between case and screen — the detail that reads as "metal",
          with a faint emissive kick so it catches bloom like a real light-edge */}
      <RoundedBox args={[1.01, 1.25, 0.03]} radius={0.135} smoothness={7} position={[0, 0, 0.135]}>
        <meshStandardMaterial
          color={RIM_COLOR}
          roughness={0.15}
          metalness={0.85}
          emissive={RIM_COLOR}
          emissiveIntensity={0.15}
        />
      </RoundedBox>

      {/* Bezel + screen */}
      <RoundedBox args={[0.96, 1.2, 0.04]} radius={0.12} smoothness={7} position={[0, 0, 0.155]}>
        <meshStandardMaterial color={BEZEL_COLOR} roughness={0.2} metalness={0.1} />
      </RoundedBox>

      {/* Digital crown */}
      <mesh position={[0.6, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 24]} />
        <meshStandardMaterial color={CASE_COLOR} roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0.6, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.07, 24]} />
        <meshStandardMaterial color={CASE_COLOR} roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Band, top and bottom */}
      <RoundedBox args={[0.55, 1.6, 0.22]} radius={0.14} smoothness={7} position={[0, 1.45, 0]}>
        <meshStandardMaterial color={BAND_COLOR} roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.55, 1.6, 0.22]} radius={0.14} smoothness={7} position={[0, -1.45, 0]}>
        <meshStandardMaterial color={BAND_COLOR} roughness={0.75} />
      </RoundedBox>

      {/* App/screen UI, mapped onto the watch face and revealed as it turns to face camera */}
      <Html transform position={[0, 0, 0.175]} distanceFactor={1.9} style={{ pointerEvents: "none" }}>
        <div
          ref={screenContent}
          style={{ opacity: 0 }}
          className="w-[168px] h-[210px] rounded-[26px] bg-background flex flex-col items-center justify-center gap-2 px-3"
        >
          <p className="font-display text-[13px] text-foreground">9:41</p>
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="27" fill="none" stroke="#f3e6d6" strokeWidth="6" />
              <circle
                cx="32"
                cy="32"
                r="27"
                fill="none"
                stroke="#c4663d"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 27}
                strokeDashoffset={2 * Math.PI * 27 * 0.22}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-foreground">
              78%
            </span>
          </div>
          <p className="text-[9px] tracking-wide text-secondary font-semibold uppercase">Comfort score</p>
          <p className="text-[8px] text-foreground/60 text-center leading-tight">Auto-adjusting your room</p>
        </div>
      </Html>
    </group>
  );
}