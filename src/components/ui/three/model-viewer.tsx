"use client";

import {
  Bounds,
  Center,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { getModel, type ModelId } from "@/packages/configs/model3d.config";

type ModelProps = { id: ModelId };

const Model = ({ id }: ModelProps) => {
  const { src, scale, position, rotation } = getModel(id);
  const { scene } = useGLTF(src);
  return (
    <Center>
      <primitive
        object={scene}
        scale={scale}
        position={[...position]}
        rotation={[...rotation]}
      />
    </Center>
  );
};

export const ModelViewer = ({ id }: ModelProps) => {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 45 }} dpr={[1, 5]}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <Bounds fit clip observe margin={1.2}>
          <Model id={id} />
        </Bounds>
      </Suspense>
      <OrbitControls makeDefault />
    </Canvas>
  );
};
