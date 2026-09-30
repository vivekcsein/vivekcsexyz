export type Vec3 = readonly [number, number, number];

export type Model3D = {
  id: string;
  name: string;
  src: string;
  scale: number;
  position: Vec3;
  rotation: Vec3;
  autoRotate: boolean;
};

// Single source of truth for all 3D model metadata.
// Add a model: drop the file in src/assets/models and add one entry here.
export const MODELS = [
  {
    id: "work-station",
    name: "work-station",
    src: new URL("../../assets/models/work-station.glb", import.meta.url).href,
    scale: 1,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    autoRotate: true,
  },
] as const satisfies readonly Model3D[];

export type ModelId = (typeof MODELS)[number]["id"];

export const getModel = (id: ModelId): Model3D =>
  MODELS.find((m) => m.id === id) ?? MODELS[0];
