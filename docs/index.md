---
layout: page.11ty.cjs
title: cytoscape-rdf
---

<br/>

`<cytoscape-rdf>` is a standard web component to easily display [Nanopublications](https://nanopub.net) anywhere you can use HTML.

It enables developers and users to control which graphs from the nanopublication are displayed.

## 🏷️ As easy as HTML

<section>
  <div>

`<cytoscape-rdf>` is just an HTML element, you can use it anywhere you can use HTML:

```html
<html lang="en">
  <head>
    <script type="module" src="https://unpkg.com/cytoscape-rdf?module"></script>
  </head>

  <body>
    <div style="min-height: 100vh; width: 100%;">
      <cytoscape-rdf
        url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"
      />
    </div>
  </body>
</html>
```

  </div>
  <div>

<cytoscape-rdf url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"></cytoscape-rdf>

  </div>
</section>

## 💫 Declarative rendering

<section>
  <div>

`<cytoscape-rdf>` can be used with declarative rendering libraries like Angular, React, Vue, and lit-html

```js
import {html, render} from 'lit-html';

const np = 'https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU';

render(
  html`
    <h4>This is a &lt;cytoscape-rdf&gt;</h4>
    <cytoscape-rdf url=${np} />
  `,
  document.body
);
```

  </div>
  <div>

<h4>This is a &lt;cytoscape-rdf&gt;</h4>
<cytoscape-rdf url="https://purl.org/np/RAHtkscyyyJDLvWRuINckQrn5rbHzQKvwakNVC3fmRzGU"></cytoscape-rdf>

  </div>
</section>
