// import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
// import typescript from '@rollup/plugin-typescript';
// import resolve from '@rollup/plugin-node-resolve';
// import cleaner from 'rollup-plugin-cleaner';
// import copy from 'rollup-plugin-copy';
// import serve from 'rollup-plugin-serve';
// import { terser } from 'rollup-plugin-terser';

// export default {
//   input: 'src/index.ts',
//   output: {
//     file: 'dist/bundle.js',
//     name: 'bundle',
//     format: 'umd',
//     sourcemap: true
//   },
//   plugins: [
//     transformTaggedTemplate({
//       tagsToProcess: ['html','css'],
//       parserOptions: {
//         sourceType: "module",
//         plugins: [
//             "typescript",
//             [
//                 "decorators",
//                 { decoratorsBeforeExport: true }
//             ]
//         ]
//       },
//       transformer(data) {
//           data = data.replace(/\s([{}()>~+=^$:!;])\s/gm, '$1');
//           data = data.replace(/([",[]])\s+/gm, '$1');
//           data = data.replace(/\s{2,}/gm, ' ');
//           return data.trim();
//       }
//     }),
//     typescript(),
//     resolve(),
//     cleaner({
//       targets: [
//       'dist'
//       ]
//     }),
//     copy({
//       targets: [
//         { src: 'index.html', dest: 'dist' },
//       ]
//     }),
//     serve({
//       open: true,
//       contentBase: 'dist'
//     }),
//     terser(),
//   ]
// };



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
    // nodeResolve({ preferBuiltins: false }),
    // commonjs(),
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