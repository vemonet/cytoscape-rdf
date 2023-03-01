// https://github.com/microsoft/fast/blob/master/packages/web-components/fast-element/rollup.config.js
import filesize from "rollup-plugin-filesize";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import nodeGlobals from 'rollup-plugin-node-globals'
import commonjs from '@rollup/plugin-commonjs';
import nodeBuiltins from 'rollup-plugin-node-builtins';

const plugins = [
    typescript({
        compilerOptions: {
            declaration: true,
            // declarationDir: "types/",
        },
    }),
    // TODO: resolves imports, but fail due to N3.js https://github.com/rdfjs/N3.js/issues/257
    commonjs(),
    nodeResolve({ preferBuiltins: false }),
    // nodeGlobals(),
    // nodeBuiltins(),
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