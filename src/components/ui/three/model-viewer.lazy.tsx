"use client";

import dynamic from "next/dynamic";

export const ModelViewerLazy = dynamic(
  () => import("./model-viewer").then((m) => m.ModelViewer),
  { ssr: false },
);
