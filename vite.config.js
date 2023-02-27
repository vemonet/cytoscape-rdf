import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: ['esnext'],
        lib: {
            entry: "src/cytoscape-rdf.ts",
            formats: ["es"],
        },
        rollupOptions: {
            external: /^@microsoft\/fast-element/,
        },
    },
});
