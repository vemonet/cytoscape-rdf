import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { terser } from "rollup-plugin-terser";

// import { terser } from "rollup-plugin-terser";
// import typescript from "@rollup/plugin-typescript";
// import filesize from "rollup-plugin-filesize";

// import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
// import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// import rollupNodePolyFill from "rollup-plugin-node-polyfills";


// const plugins = [
//     typescript({
//         compilerOptions: {
//             declaration: false,
//             declarationDir: undefined,
//         },
//     }),
//     filesize({
//         showMinifiedSize: false,
//         showBrotliSize: true,
//     }),
// ];

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        target: ['esnext'],
        lib: {
            entry: "src/index.ts",
            name: "nanopub-rdf",
            fileName: (format) => `nanopub-rdf.${format}.js`,
            // formats: ["es"],
        },
        minify: true,
        sourcemap: true,
        cssCodeSplit: true,
        rollupOptions: {
            external: /^@microsoft\/fast-element/,
            // Added from rollup.config.js
            // input: "src/index.ts",
            // output: [
            //     {
            //         // file: "dist/cytoscape-rdf.js",
            //         dir: "dist",
            //         format: "esm",
            //     },
            //     {
            //         // file: "dist/cytoscape-rdf.min.js",
            //         dir: "dist",
            //         format: "esm",
            //         plugins: [terser()],
            //     },
            // ],
            // plugins,
        },
    },
    optimizeDeps: {
        include: [
            '@microsoft/fast-element',
            'n3',
            'cytoscape', 'cytoscape-popper', 'cytoscape-cose-bilkent'
        ]
    },
    plugins: [
        dts(),
        // terser(),
        // input https://www.npmjs.com/package/html-minifier-terser options
        // ViteMinifyPlugin({}),
    ],
});
