import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  external: ['three'],
  input: path.join(__dirname, 'src', 'raymarcher.js'),
  output: {
    file: path.join(__dirname, 'module.js'),
    format: 'esm',
  },
  plugins: [
    {
      name: 'shaders',
      transform(code, id) {
        if (/\.(frag|glsl|vert)$/g.test(id)) {
          return {
            code: `export default ${JSON.stringify(code)};`,
            map: { mappings: '' }
          };
        }
      }
    },
  ],
  watch: { clearScreen: false },
};
