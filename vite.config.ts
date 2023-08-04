import { defineConfig } from 'vite'

const path = require("path");

export default defineConfig({
  build: {
    outDir: "./out",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, 'src/extension.ts'),
      name: 'css-loader-for-vs-code',
      // the proper extensions will be added
      fileName: 'extension',
      formats: [
        "cjs"
      ]
    },
    sourcemap: true,
    rollupOptions: {
      external: ['vscode', 'os', 'fs', 'path'],
    },
    minify: false
  },
});