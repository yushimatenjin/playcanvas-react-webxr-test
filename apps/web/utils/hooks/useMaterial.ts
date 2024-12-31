import { Application, StandardMaterial } from "playcanvas";
import { useState, useEffect, useRef } from "react";

type MaterialLoader = (app: Application) => Promise<StandardMaterial>;

interface MaterialLoadingState {
  material: StandardMaterial | null;
  isLoading: boolean;
  error: Error | null;
}

export const useMaterials = (app: Application | null, loaders: MaterialLoader[]) => {
  const [materials, setMaterials] = useState<MaterialLoadingState[]>(() =>
    loaders.map(() => ({
      material: null,
      isLoading: true,
      error: null,
    }))
  );

  const loadersRef = useRef(loaders);

  useEffect(() => {
    if (!app) return;

    const loadMaterials = async () => {
      const materialPromises = loadersRef.current.map(async (loader, index) => {
        try {
          const material = await loader(app);
          setMaterials(prev => prev.map((state, i) =>
            i === index ? {
              material,
              isLoading: false,
              error: null
            } : state
          ));
          return material;
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Failed to load material');
          setMaterials(prev => prev.map((state, i) =>
            i === index ? {
              material: null,
              isLoading: false,
              error
            } : state
          ));
          return null;
        }
      });

      await Promise.all(materialPromises);
    };

    loadMaterials();
  }, [app]);

  const isLoading = materials.some(m => m.isLoading);
  const errors = materials.map(m => m.error).filter(Boolean);
  const loadedMaterials = materials.map(m => m.material);

  return {
    materials: loadedMaterials,
    isLoading,
    errors,
    states: materials
  };
};

export const useMaterial = (app: Application | null, loader: MaterialLoader) => {
  const { materials, isLoading, errors } = useMaterials(app, [loader]);
  return {
    material: materials[0],
    isLoading,
    error: errors[0] || null
  };
}; 