# 🧬 Web Component to display Nanopublications

[![Run tests and update docs](https://github.com/vemonet/cytoscape-rdf/actions/workflows/build.yml/badge.svg)](https://github.com/vemonet/cytoscape-rdf/actions/workflows/build.yml)

A standard Web Component to display [Nanopublications](https://nanopub.net).

This document contains details on the development workflow used for the component.

Refer to the documentation website for more details on how to use the component: **[vemonet.github.io/cytoscape-rdf](https://vemonet.github.io/cytoscape-rdf)**

## 📥️ Install

Clone the repository:

```bash
git clone https://github.com/vemonet/cytoscape-rdf
cd cytoscape-rdf
```

Install dependencies:

```bash
yarn
```

> If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates.

## 🧑‍💻 Development

Start the component in development mode, it will automatically reload when the code is changed:

```bash
yarn dev
```

## 📦️ Build

To build the JavaScript version of your component:

```bash
yarn build
```

> This sample uses the TypeScript compiler and [rollup](https://rollupjs.org) to produce JavaScript that runs in modern browsers.

## ☑️ Testing

Tests can be run with the `test` script:

```bash
yarn test
```

Alternatively the `test:prod` command will run your tests in Lit's production mode.

> This project uses modern-web.dev's [@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the [modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for more information.

## ✒️ Formatting

[Prettier](https://prettier.io/) is used for code formatting:

```bash
yarn fmt
```

> You can change the configuration in the `package.json`. Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## ✅ Linting

To check if the project does not break any linting rule run:

```bash
yarn lint
```

> Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

## 📖 Documentation website

To build and run the documentation website, run:

```bash
yarn docs
```

To build the website for deployment, run:

```bash
yarn docs:build
```

## ℹ️ More information

🔨 Built with [Lit](https://lit.dev/) and [N3.js](https://github.com/rdfjs/N3.js)

Vite TS starter: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-lit-ts

Official lit TS starter: https://github.com/lit/lit-element-starter-ts