import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {ref, createRef, Ref} from 'lit/directives/ref.js';

import cytoscape, { Core } from 'cytoscape';
import popper from 'cytoscape-popper';
import COSEBilkent from 'cytoscape-cose-bilkent';

import { layoutsConfig, defaultCytoscapeStyle } from './layouts'
import { rdfToCytoscape, defaultNodeClick } from './utils'

cytoscape.use(popper);
cytoscape.use(COSEBilkent);


/**
 * A component to display a Nanopublication.
 */
@customElement('cytoscape-rdf')
export class CytoscapeRdf extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      height: 100%;
      width: 100%;
    }

    .cytoscapeContainer {
      width: 100%;
      height: 100%;
    }

    .cytoscapePopper {
      background: #eceff1;
      padding: 8px;
      border-radius: 8px;
    }
  `;

  /**
   * The URL of the nanopublication to display
   */
  @property({type: String})
  url = '';
  /**
   * The RDF string of the nanopublication to display. Will be downloaded from URL if not provided.
   */
  @property({type: String})
  rdf = '';

  /**
   * The RDF string of the nanopublication to display. Will be downloaded from URL if not provided.
   */
  @property({type: Object})
  elements: any = null;

  @property({type: Object})
  cytoscapeStyle: any = defaultCytoscapeStyle;

  @property({type: Object})
  layout: any = layoutsConfig['cose-bilkent'];

  @property({type: Function})
  nodeClick: any = defaultNodeClick;

  cyContainer: Ref<HTMLInputElement> = createRef();
  cy?: Core;

  /**
   * Error message to show if there is a problem displaying the nanopub
   */
  @state()
  error?: string;


  /**
   * Fetch the Nanopub if needed, parse the RDF TRiG using n3.js,
   * and generate the cytoscape visualization to represent the nanopub
   */
  override async firstUpdated() {
    // Get elements from nanopub URL or RDF if not provided directly
    if (!this.elements) {
      if (!this.url && !this.rdf) {
        this.error = `⚠️ No nanopublication has been provided, use the "url" or "rdf"
          attribute to provide the URL, or RDF in the TRiG format, of the nanopublication.`;
      }


      if (!this.error && this.url && !this.rdf) {
        if (
          this.url.startsWith('https://purl.org/np/') &&
          !this.url.endsWith('.trig')
        ) {
          this.url = this.url + '.trig';
        }
        try {
          const response = await fetch(this.url);
          this.rdf = await response.text();
        } catch (error) {
          this.error = `⚠️ Issue fetching the nanopublication RDF at ${this.url}. ${error}`;
        }
      }

      if (!this.error && this.rdf) {
        this.elements = rdfToCytoscape(this.rdf)
      }
    }

    console.log(this.cyContainer.value)
    // Enable cytoscape container
    if (!this.error && this.elements) {
      const config = {
        container: this.cyContainer.value,
        style: this.cytoscapeStyle,
        elements: this.elements,
        layout: this.layout,
        boxSelectionEnabled: true,
        autounselectify: true,
        autoungrabify: false,
        wheelSensitivity: 0.1,
        showOverlay: true,
      };

      this.cy = cytoscape(config);

      // Add on click actions to show cards with more details on an object
      this.cy.on('tap', "node",  (e: any) => {
        this.cy?.edges().style({
          'line-color': '#263238', 'color': '#263238',
          'width': 2, 'target-arrow-color': '#263238',
          'font-size': '30px'
        }); // Grey
        const ele = e.target;
        ele.connectedEdges().style({
          'line-color': '#c62828', 'color': '#c62828', // red
          'width': 4, 'target-arrow-color': '#c62828',
          'font-size': '40px',
        });
      });

      // Show a card with the value of the node (e.g. clickable link for URI)
      this.cy.on('tap', 'node', this.nodeClick);

    }
  }


  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.cy) {
      this.cy.destroy();
      this.cy = undefined;
    }
  }


  override render() {
    return html`
      ${!this.elements
        ? html`<p>Loading...</p>`
        : this.error
        ? html`${this.error}`
        : html``}
      <div class="cytoscapeContainer" ${ref(this.cyContainer)}></div>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'cytoscape-rdf': CytoscapeRdf;
  }
}


declare namespace LocalJSX {
  interface CytoscapeRdf {
    /**
     * The URL
     */
    url?: string;
    /**
     * The RDF
     */
    rdf?: string;
    /**
     * The RDF
     */
    elements?: object;
  }
  interface IntrinsicElements {
    'cytoscape-rdf': CytoscapeRdf;
  }
}
export {LocalJSX as JSX};


// declare namespace JSX {
//   interface IntrinsicElements {
//       "cytoscape-rdf": React.DetailedHTMLProps<
//           React.HTMLAttributes<HTMLElement>,
//           HTMLElement
//       > & {
//           url?: string;
//           rdf?: string;
//       };
//   }
// }