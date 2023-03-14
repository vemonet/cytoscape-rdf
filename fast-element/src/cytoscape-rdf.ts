import {
    attr,
    ref,
    html,
    css,
    customElement,
    observable,
    when,
    FASTElement,
} from "@microsoft/fast-element";
import cytoscape, { Core } from 'cytoscape';
import popper from 'cytoscape-popper';
import COSEBilkent from 'cytoscape-cose-bilkent';

import { layoutsConfig, defaultCytoscapeStyle } from './layouts'
import { rdfToCytoscape, displayLink } from './utils'

cytoscape.use(popper);
cytoscape.use(COSEBilkent);

// <div id="cytoscapeRdf" ${ref('cyContainer')}><slot></slot></div>
// <div id=${x => x.id}><slot></slot></div>
const template = html<CytoscapeRdf>`
  <div class="cytoscapeContainer" ${ref('cyContainer')}></div>

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

  .cytoscapeContainer {
    width: 100%;
    height: 100%;
  }

  .cytoscapePop {
    background: #eceff1;
    padding: 8px;
    border-radius: 8px;
  }
`;


// Stencil cytoscape web component: https://github.com/graphaware/ga-cytoscape/blob/master/src/components/ga-cytoscape/ga-cytoscape.tsx
@customElement({
    name: "cytoscape-rdf",
    template,
    styles,
    // shadowOptions: {
    //   delegatesFocus: true,
    //   mode: 'open',
    // },
})
export class CytoscapeRdf extends FASTElement {
    @attr id: string = "cytoscapeRdf";
    @attr url: string = "";
    @attr rdf: string = "";
    @attr elements: any = null;
    @attr cytoscapeStyle: any = defaultCytoscapeStyle;

    cyContainer?: HTMLDivElement;
    cy?: Core;

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

      console.log(this.cyContainer)
      if (typeof document === "object") {
        const config = {
          container: this.cyContainer,
          style: this.cytoscapeStyle,
          elements: this.elements,
          layout: this.layout,
          boxSelectionEnabled: true,
          autounselectify: true,
          autoungrabify: false,
          wheelSensitivity: 0.1,
          showOverlay: true,
        };

        // TODO: Fix issue with ctr not defined? https://stackoverflow.com/questions/43998777/cytoscape-typeerror-even-with-the-tutorial
        // setTimeout(this.render)
        // setTimeout( () => {
        //   console.log("Delayed for 1 second.");
        // }, 1000)

        this.cy = cytoscape(config);

        // Add on click actions to show cards with more details on an object
        this.cy.on('tap', "node",  (e: any) => {
          this.cy?.edges().style({
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
        this.cy.on('tap', 'node', (e: any) => {
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
        this.cy.on('tap', (event: any) => {
          if( event.target === this.cy ){
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
      if (this.cy) {
        this.cy.destroy();
        this.cy = undefined;
      }
      // if (typeof document === "object") {
      //   const oldEle = document.getElementById("cytoPop");
      //   if (oldEle) oldEle.remove();
      // }
    }

}

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       ['cytoscape-rdf']: CustomElement<CytoscapeRdf>;
//     }
//   }
// }