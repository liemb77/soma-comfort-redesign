"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import type { MotionValue } from "framer-motion";
import WatchModel from "./WatchModel";

export default function HeroScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4.2], fov: 32 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.35} color="#f3e6d6" />
      <directionalLight position={[2.5, 3, 2]} intensity={1.5} color="#ffe8d1" castShadow />
      <directionalLight position={[-3, -1, -2]} intensity={0.4} color="#c4663d" />
      <pointLight position={[0.8, 0.6, 1.4]} intensity={0.6} color="#ffd9b0" />

      {/* Environment needs its own Suspense boundary — without one, its async
          HDRI load can silently break the whole scene instead of just itself. */}
      <Suspense fallback={null}>
        <Environment preset="apartment" />
      </Suspense>

      <Sparkles count={40} scale={[4, 5, 2]} size={2} speed={0.25} opacity={0.35} color="#c4663d" />

      <WatchModel progress={progress} />

      <ContactShadows position={[0, -1.6, 0]} opacity={0.35} scale={4} blur={2.4} far={2} color="#3a2a1f" />

      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.35}
          luminanceSmoothing={0.3}
          intensity={0.55}
          mipmapBlur
        />
        <Noise opacity={0.02} />
        <Vignette eskil={false} offset={0.15} darkness={0.6} />
      </EffectComposer>
    </Canvas>
  );
}