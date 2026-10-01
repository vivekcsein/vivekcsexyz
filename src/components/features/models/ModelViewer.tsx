"use client";

import {
  OrbitControls,
  PerformanceMonitor,
  PerspectiveCamera,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import {
  getModel,
  type Model3D,
  type ModelKey,
} from "@/packages/configs/model3d.config";
import { useReducedMotion, useThemeColors } from "@/packages/hooks";
import { cn } from "@/packages/utils/cn";
import { resolveModelSrc } from "@/packages/utils/model3d";
import { Effect } from "./effects";
import { PointerParallax } from "./effects/PointerParallax";
import { GlbModel } from "./GlbModel";
import { ModelErrorBoundary } from "./ModelErrorBoundary";
import { PlaceholderModel } from "./PlaceholderModel";
import { SceneLights } from "./SceneLights";

/** Anything in the registry entry except its identity can be overridden (used by the dev lab). */
export type ModelOverrides = Partial<Omit<Model3D, "key" | "file">>;

type ModelViewerProps = {
  modelKey: ModelKey;
  className?: string;
  /** Let visitors drag-orbit the model. Keep off for decorative tiles. */
  interactive?: boolean;
  overrides?: ModelOverrides;
  /** false pauses rendering (section scrolled out of view). */
  active?: boolean;
  /** FPS / frame-time overlay (dev lab). */
  showStats?: boolean;
};

const MAX_DPR = 1.75;

export const ModelViewer = ({
  modelKey,
  className,
  interactive = false,
  overrides,
  active = true,
  showStats = false,
}: ModelViewerProps) => {
  const model: Model3D = { ...getModel(modelKey), ...overrides };
  const colors = useThemeColors();
  const reducedMotion = useReducedMotion();
  const [maxDpr, setMaxDpr] = useState(MAX_DPR);

  const motion = !reducedMotion;
  const src = resolveModelSrc(model);
  const parallax = model.effects.find((e) => e.type === "pointer-parallax");

  const placeholder = (
    <PlaceholderModel colors={colors} model={model} motion={motion} />
  );

  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas
        dpr={[1, maxDpr]}
        frameloop={active && motion ? "always" : "demand"}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        // Non-interactive scenes must not swallow clicks or touch-scrolling.
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      >
        <PerspectiveCamera
          fov={model.camera.fov}
          makeDefault
          position={[...model.camera.position]}
        />
        <PerformanceMonitor
          onDecline={() => setMaxDpr(1)}
          onIncline={() => setMaxDpr(MAX_DPR)}
        />
        <SceneLights colors={colors} />

        <PointerParallax
          enabled={motion && parallax !== undefined}
          strength={
            parallax?.type === "pointer-parallax"
              ? parallax.strength
              : undefined
          }
        >
          <ModelErrorBoundary fallback={placeholder}>
            <Suspense fallback={null}>
              {src ? (
                <GlbModel model={model} motion={motion} src={src} />
              ) : (
                placeholder
              )}
            </Suspense>
          </ModelErrorBoundary>

          {model.effects.map((effect) => (
            <Effect
              key={effect.type}
              colors={colors}
              effect={effect}
              motion={motion}
              size={model.size}
            />
          ))}
        </PointerParallax>

        {interactive && <OrbitControls enablePan={false} enableZoom={false} />}
        {showStats && <Stats />}
      </Canvas>
    </div>
  );
};
