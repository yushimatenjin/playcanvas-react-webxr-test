"use client";
import { Color } from "playcanvas";
import { Entity } from "@playcanvas/react";
import { Camera, Light, EnvAtlas, Render, Script } from "@playcanvas/react/components";
import { OrbitControls } from "@playcanvas/react/scripts";
import { Rotator } from "@repo/scripts";

const Scene = () => {
  return (
    <>
      <Entity name="light" rotation={[45, 45, 0]}>
        {/* @ts-ignore */}
        <Light type="directional" color={Color.WHITE} />
      </Entity>
      <Entity name="camera" position={[0, 0.5,2]}>
        <Camera clearColor="#ccccff" />
        <OrbitControls inertiaFactor={0.6} distanceMin={2.4} />
      </Entity>
      <Entity name="model">
        <Render type="box"/>
        <Script script={Rotator} />
      </Entity>
    </>
  );
};

export default Scene;
