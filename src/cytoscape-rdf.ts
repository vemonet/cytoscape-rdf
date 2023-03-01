import {
    attr,
    html,
    css,
    customElement,
    observable,
    when,
    FASTElement,
} from "@microsoft/fast-element";
import cytoscape from 'cytoscape';
import popper from 'cytoscape-popper';
import COSEBilkent from 'cytoscape-cose-bilkent';

import { layoutsConfig, defaultCytoscapeStyle } from './layouts'
import { rdfToCytoscape, displayLink } from './utils'

cytoscape.use(popper);
cytoscape.use(COSEBilkent);

const template = html<CytoscapeRdf>`
  <div id=${x => x.id}><slot></slot></div>

  ${when(x => !x.elements, html<CytoscapeRdf>`
    Loading...
  `)}
`;

const styles = css`
  :host {
    display: flex;
    height: 100%;
    width: 100%;
  }

  .cytoscapePop {
    background: #eceff1;
    padding: 8px;
    border-radius: 8px;
  }
`;

@customElement({
    name: "cytoscape-rdf",
    template,
    styles,
})
export class CytoscapeRdf extends FASTElement {
    @attr id: string = "cytoscapeRdf";
    @attr url: string = "";
    @attr rdf: string = "";
    @attr elements: any = null;
    @attr cytoscapeStyle: any = defaultCytoscapeStyle;

    @observable
    public layout: any = layoutsConfig['cose-bilkent'];


    async connectedCallback() {
      super.connectedCallback();
      if (this.url && !this.rdf) {
        const response = await fetch(this.url);
        this.rdf = await response.text();
      }
      if (!this.elements && this.rdf) {
        this.elements = rdfToCytoscape(this.rdf)
      }

      if (typeof document === "object") {
        const config = {
          container: document.getElementById(this.id),
          style: this.cytoscapeStyle,
          elements: this.elements,
          layout: this.layout,
          boxSelectionEnabled: true,
          autounselectify: true,
          autoungrabify: false,
          wheelSensitivity: 0.1,
          showOverlay: true,
        };

        // @ts-ignore
        const cy = cytoscape(config);

        // Add on click actions to show cards with more details on an object
        cy.on('tap', "node", function (e: any) {
          cy.edges().style({
            'line-color': '#263238', 'color': '#263238',
            'width': 2, 'target-arrow-color': '#263238',
            'font-size': '30px'
          }); // Grey
          var ele = e.target;
          ele.connectedEdges().style({
            'line-color': '#c62828', 'color': '#c62828', // red
            'width': 4, 'target-arrow-color': '#c62828',
            'font-size': '40px',
          });
        });
        // Show a card with the value of the node (e.g. clickable link for URI)
        cy.on('tap', 'node', function (e: any) {
          const oldEle = document.getElementById("cytoPop");
          if (oldEle) oldEle.remove();
          var ele = e.target;

          ele.popper({
            content: () => {
              // console.log(ele)
              let div = document.createElement('div');
              // Replace the start "graph-http" for graphs nodes URIs
              const elementLabel = (ele.id().startsWith('graph-http')) ? ele.id().replace('graph-http', 'http') : ele.id()

              // TODO: improve
              div.innerHTML = `<div id="cytoPop" class="cytoscapePop"
                style="background: #eceff1; padding: 8px; border-radius: 8px;"
              >
                <span>${displayLink(elementLabel)}</span>
              </div>`
              document.body.appendChild( div );
              return div;
            }
          });
        });
        // Remove Card when click on the canvas
        cy.on('tap', function(event: any){
          if( event.target === cy ){
            // tap on background
            if (typeof document === "object") {
              const oldEle = document.getElementById("cytoPop");
              if (oldEle) oldEle.remove();
            }
          }
        });
        // TODO: Remove Card when click outside the canvas
        // cy.on('click touchend', function(event: any){
        //   event.stopPropagation()
        // });
      }
    }


    disconnectedCallback() {
      super.disconnectedCallback();
      const oldEle = document.getElementById("cytoPop");
      if (oldEle) oldEle.remove();
    }

}