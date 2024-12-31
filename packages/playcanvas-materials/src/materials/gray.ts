import { StandardMaterial } from "playcanvas";


const GrayMaterial = new StandardMaterial();
GrayMaterial.diffuse.set(0.2, 0.2, 0.2);
GrayMaterial.emissive.set(0.2, 0.2, 0.2);

export { GrayMaterial };
