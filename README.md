## 🧬 A web component to visualize RDF with Cytoscape

A [web component](https://www.webcomponents.org/introduction) to easily display [RDF](https://www.w3.org/RDF/) quads data as a [Cytoscape JS](https://js.cytoscape.org/) network. 

This component has been built specifically to visualize [Nanopublications](https://nanopub.net/), but can be used with any RDF quads data (composed of subject, predicate, object, graph). 

> ⚠️ Currently the component only supports RDF in the `trig` format 

## Getting started

Install:

```bash
npm install --save cytoscape-rdf
# or
yarn add cytoscape-rdf
```

Use in your HTML, or any other framework, to visualize RDF:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Cytoscape RDF</title>
        <meta charset="UTF-8" />
        <script type="module" src="/src/cytoscape-rdf.ts"></script>
    </head>

    <body>
        <div style="height: 100vh; width: 70%;">
            <cytoscape-rdf
				url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU.trig"
                id="cytoscapeNanopub"
            />
        </div>
    </body>
</html>
```

Attributes available on `<cytoscape-rdf>`:

* `url`: to pass a URL to retrieve the RDF to display
* `rdf`: to pass the RDF directly as a string in the `trig` format
* `elements`: to pass directly the cytoscape elements
* `cytoscapeStyle`: to pass the style object for cytoscape
* `layout`: to pass the layout object for cytoscape

## Development

Requirements: [Node.js](https://nodejs.org/) version >=12.2.0

```shell
git clone https://github.com/vemonet/cytoscape-rdf.git
cd cytoscape-rdf
```

Install:

```shell
yarn
```

Run in development:

```bash
yarn dev
```

Build: 

```bash
yarn build
```

## Aknowledgments

Built with:

- [FAST design elements](https://www.fast.design/)

- [TypeScript](https://www.typescriptlang.org/)

- [Vite](https://vitejs.dev/)