import { Texture, PIXELFORMAT_R8_G8_B8, Application } from "playcanvas";

interface TextureData {
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
    width: number;
    height: number;
    src: string;
}

/**
 * Creates a PlayCanvas Texture from texture data
 */
const createTexture = async (
    textureData: TextureData,
    app: Application,
    options: { pixelFormat?: number } = {}
): Promise<Texture> => {
    const { pixelFormat = PIXELFORMAT_R8_G8_B8 } = options;
    const { width, height, src, blurDataURL } = textureData;

    // Create texture with actual dimensions
    const texture = new Texture(app.graphicsDevice, {
        format: pixelFormat,
        width,
        height
    });

    // First load blur data if available
    if (blurDataURL) {
        const blurImg = new Image();
        blurImg.src = blurDataURL;
        await new Promise<void>((resolve) => {
            blurImg.onload = (): void => {
                texture.setSource(blurImg);
                texture.upload();
                resolve();
            };
        });
    }

    // Then load full resolution image
    const img = new Image();
    img.src = src;
    await new Promise<void>((resolve) => {
        img.onload = (): void => {
            texture.setSource(img);
            texture.upload();
            resolve();
        };
    });

    return texture;
};

export { createTexture };