import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";

const plugins = [
    typescript({
        compilerOptions: {
            declaration: false,
            declarationDir: undefined,
        },
    }),
    filesize({
        showMinifiedSize: false,
        showBrotliSize: true,
    }),
];

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "dist/cytoscape-rdf.js",
                format: "esm",
            },
            {
                file: "dist/cytoscape-rdf.min.js",
                format: "esm",
                plugins: [terser()],
            },
        ],
        plugins,
    },
];