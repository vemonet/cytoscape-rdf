import {terser} from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';

import rollupConfig from './rollup.config';

export default {
  ...rollupConfig,
  external: [],
  output: [
    {
      file: 'dist/cytoscape-rdf.min.js',
      // NOTE: apparently esm is not supported by firefox web workers
      // format: "esm",
      format: 'iife',
      name: '[name].min.js',
      plugins: [
        terser({
          ecma: 2020,
          module: true,
          warnings: true,
        }),
      ],
    },
  ],
  plugins: [
    ...rollupConfig.plugins,
    // Minify HTML template literals
    minifyHTML(),
  ],
};
