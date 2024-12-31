import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/materials/index.ts'),
      name: 'PlayCanvasMaterials', 
      fileName: (format) => `playcanvas-materials.${format}.js`,
    },
    rollupOptions: {
      external: ['playcanvas'],
      output: {
        globals: {
          playcanvas: 'pc'
        }
      }
    }
  },
  plugins: [
    {
      name: 'image-base64',
      transform(code, id) {
        if (id.match(/\.(png|jpe?g|gif|webp)$/)) {
          const buffer = fs.readFileSync(id);
          const base64 = buffer.toString('base64');
          const ext = path.extname(id).slice(1);
          return {
            code: `export default "data:image/${ext};base64,${base64}"`,
            map: null
          };
        }
      }
    }
  ]
});