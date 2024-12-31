interface TextureData {
    blurDataURL?: string;
    blurWidth?: number; 
    blurHeight?: number;
    width: number;
    height: number;
    src: string;
}

declare module '*.jpg' {
    const value: TextureData;
    export default value;
}

declare module '*.png' {
    const value: TextureData;
    export default value;
} 

