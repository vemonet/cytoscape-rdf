const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy('docs/docs.css');
  eleventyConfig.addPassthroughCopy('docs/prism-solarizeddark.css');
  eleventyConfig.addPassthroughCopy('docs/.nojekyll');
  eleventyConfig.addPassthroughCopy('dist/*');
  eleventyConfig.addPassthroughCopy(
    'node_modules/@webcomponents/webcomponentsjs'
  );
  // eleventyConfig.addPassthroughCopy('node_modules/lit/polyfill-support.js');
  return {
    dir: {
      input: 'docs',
      output: 'docs-dist',
    },
    templateExtensionAliases: {
      '11ty.cjs': '11ty.js',
      '11tydata.cjs': '11tydata.js',
    },
  };
};
