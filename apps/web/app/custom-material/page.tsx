"use client";
import { Entity } from "@playcanvas/react";
import { Camera, EnvAtlas, Render } from "@playcanvas/react/components";
import { OrbitControls } from "@playcanvas/react/scripts";
import { useEnvAtlas } from "../../utils/hooks";
import { MetalMaterial } from "@repo/materials";
import { useApp } from "@playcanvas/react/hooks";
import { useMaterial } from "../../utils/hooks/useMaterial";

const Scene = () => {
  const app = useApp();
  const { data: envMap, isPending: isEnvLoading } = useEnvAtlas(
    "./environment-map.png"
  );
  const { material, isLoading: isMaterialLoading } = useMaterial(
    app,
    MetalMaterial
  );

  if (isEnvLoading || isMaterialLoading || !envMap || !material) return null;

  return (
    <>
      <EnvAtlas asset={envMap} />
      <Entity name="camera">
        <Camera clearColor="#ccccff" />
        <OrbitControls inertiaFactor={0.6} distanceMin={2.4} />
      </Entity>
      <Entity name="model">
        <Render type="sphere" material={material} />
      </Entity>
    </>
  );
};

export default Scene;
