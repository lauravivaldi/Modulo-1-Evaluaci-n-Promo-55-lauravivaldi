import { defineConfig } from "vite";
// html partials
import injectHTML from "vite-plugin-html-inject";
// optimize images
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
// Calculate paths
import FastGlob from 'fast-glob'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get all html files
const htmlFilesList = Object.fromEntries(
  FastGlob.sync('src/*.html').map(file => [
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

const inputFilesList = {
  ...htmlFilesList,
  // Eliminado 'main' porque no tienes main.js
}

export default defineConfig({
  base: "./",
  root: "src",
  publicDir: "../public",
  build: {
    minify: "esbuild",
    outDir: "../docs",
    sourcemap: "inline",
    emptyOutDir: true,
    rollupOptions: {
      input: inputFilesList,
      // Puedes eliminar la configuración de entryFileNames para 'main' si no tienes JS
    },
  },
  server: {
    open: "/index.html",
    watch: {
      usePolling: true
    }
  },
  plugins: [
    injectHTML(),
    ViteImageOptimizer({
      /* configuración que necesites */
    }),
    // Eliminado concat porque no hay archivos JS que concatenar
  ],
});

