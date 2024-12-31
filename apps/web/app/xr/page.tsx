"use client";

import { useApp } from "@playcanvas/react/hooks";
import { useXrPageContext } from "./hooks";
import { Entity } from "@playcanvas/react";
import { Camera, Light, Render, EnvAtlas, Script } from "@playcanvas/react/components";
import { OrbitControls } from "@playcanvas/react/scripts";
import { useModel, useEnvAtlas } from "../../utils/hooks";
import { AutoRotator } from "@playcanvas/react/scripts";
import { Rotator, Scaler } from "@repo/scripts";
import { MetalMaterial } from "@repo/materials";
import { useMaterial } from "../../utils/hooks/useMaterial";

const XRControls = () => {
  const { isInXR, isInAR, startXR, endXR, startAR, endAR } = useXrPageContext();

  const buttonStyles = {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#ffffff",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.2s",
    ":hover": {
      backgroundColor: "#1d4ed8",
    },
    ":active": {
      backgroundColor: "#1e40af",
    }
  };

  const containerStyles = {
    position: "absolute" as const,
    top: 50,
    left: 50,
    zIndex: 1000,
    display: "flex",
    gap: "10px"
  };

  return (
    <div style={containerStyles}>
      {!isInXR && (
        <button onClick={startXR} style={buttonStyles}>
          Start VR
        </button>
      )}
      {isInXR && (
        <button onClick={endXR} style={buttonStyles}>
          End VR
        </button>
      )}
      {!isInAR && (
        <button onClick={startAR} style={buttonStyles}>
          Start AR
        </button>
      )}
      {isInAR && (
        <button onClick={endAR} style={buttonStyles}>
          End AR
        </button>
      )}
    </div>
  );
};

const XRScene = () => {
  const app = useApp();
  const { data: envMap, isPending: isEnvLoading } = useEnvAtlas(
    "./environment-map.png"
  );
  const { material, isLoading: isMaterialLoading } = useMaterial(
    app,
    MetalMaterial
  );

  if (isEnvLoading || !envMap || isMaterialLoading || !material)  return null;
  material?.update();
  return (
    <>
      <XRControls />
      <EnvAtlas asset={envMap} />
      <Entity name="camera" position={[0, 0, 5]}>
        <Camera clearColor="#00000000" />
      </Entity>
      <Entity name="model">
        {Array.from({ length: 15 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 10; // -5 to 5
          const y = (Math.random() - 0.5) * 10; // -5 to 5 
          const z = (Math.random() - 0.5) * 10; // -5 to 5
          return (
            <Entity key={i} position={[x, y, z]}>
              <Render type="box"  material={material}/>
              <Script script={Rotator} />
              <Script script={Scaler} maxScale={100} />
            </Entity>
          );
        })}
      </Entity>
    </>
  );
};

const XRPage = () => {  
  return <XRScene />;
};

export default XRPage;
