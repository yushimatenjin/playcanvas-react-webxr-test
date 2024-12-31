import { StandardMaterial, PIXELFORMAT_R8_G8_B8, Application, Color } from "playcanvas";
import { createTexture } from "../utils/texture";

import metalColorMap from "../../assets/Metal048A_1K-JPG_Color.jpg";
import metalNormalMap from "../../assets/Metal048A_1K-JPG_NormalGL.jpg";
import metalRoughnessMap from "../../assets/Metal048A_1K-JPG_Roughness.jpg";
import metalMetalnessMap from "../../assets/Metal048A_1K-JPG_Metalness.jpg";

const MetalMaterial = async (app: Application): Promise<StandardMaterial> => {
    const textureOptions = { pixelFormat: PIXELFORMAT_R8_G8_B8 };
    const diffuse = await createTexture(metalColorMap, app, textureOptions);
    const normal = await createTexture(metalNormalMap, app, textureOptions);
    const roughness = await createTexture(metalRoughnessMap, app, textureOptions);
    const metalness = await createTexture(metalMetalnessMap, app, textureOptions);

    const material = new StandardMaterial();

    // Diffuse
    material.diffuse = new Color(0.1, 0.1, 0.1);
    material.diffuseMap = diffuse;

    // Metalness
    material.metalnessMap = metalness;
    material.metalness = 1;

    // Roughness
    material.glossMap = roughness;
    material.gloss = 1;

    // Normal
    material.normalMap = normal;

    // Clear Coat
    material.clearCoat = 0.5;

    return material;
};

export { MetalMaterial };
