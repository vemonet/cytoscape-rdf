export const defaultCytoscapeStyle = [
  {
    selector: 'edge',
    style: {
      'label': 'data(label)',
      'color': '#263238', // Grey
      'line-color': '#263238',
      'width': 2,
      'arrow-scale': 2,
      'target-arrow-color': '#263238',
      // 'target-arrow-color': '#ccc',
      'text-wrap': 'wrap' as const,
      'font-size': '30px',
      'text-opacity': 0.9,
      'target-arrow-shape': 'triangle' as const,
      // Control multi edge on 2 nodes:
      'curve-style': 'bezier' as const,
      'control-point-step-size': 300,
      // width: 15
    }
  },
  {
    selector: 'edge:parent',
    style: {
      'color': '#c62828', // red
      'line-color': '#c62828',
      'width': 2,
      'arrow-scale': 2,
      'target-arrow-color': '#c62828',
      // 'target-arrow-color': '#ccc',
    }
  },
  // {
  //   selector: 'edge.highlighted',
  //   style: {
  //     'color': '#0d47a1', // blue
  //   }
  // },
  {
    selector: 'node',
    style: {
      'label': 'data(label)',
      'text-wrap': 'wrap' as const,
      // 'word-break': 'break-all',
      'overflow-wrap': 'break-word',
      // 'white-space': 'pre-wrap',
      "text-max-width": '800px',
      'font-size': 'data(fontSize)',
      // 'font-weight': 'data(fontWeight)',
      "text-valign" : "data(valign)" as const,
      "text-halign" : "center" as const,
      "width": 'label',
      // width: 20,
      "height": 'label',
      "padding": '25px',
      // https://js.cytoscape.org/#style/node-body
      "shape": 'data(shape)',
      "background-color": 'data(backgroundColor)',
      "color": 'data(textColor)',
      // "color": 'data(color)',
    }
  }
]

// Change Cytoscape layout: https://js.cytoscape.org/#layouts
// Layout options for dagre:
export const layoutsConfig = {
    'fcose': {
        name: 'fcose',
        // 'draft', 'default' or 'proof'
        // - "draft" only applies spectral layout
        // - "default" improves the quality with incremental layout (fast cooling rate)
        // - "proof" improves the quality with incremental layout (slow cooling rate)
        quality: "default",
        // Use random node positions at beginning of layout
        // if this is set to false, then quality option must be "proof"
        randomize: true,
        infinite: false,
        // Whether or not to animate the layout
        animate: false,
        // Duration of animation in ms, if enabled
        animationDuration: 1000,
        // Easing of animation, if enabled
        animationEasing: undefined,
        // Fit the viewport to the repositioned nodes
        fit: true,
        // Padding around layout
        padding: 30,
        // Whether to include labels in node dimensions. Valid in "proof" quality
        nodeDimensionsIncludeLabels: true,
        // Whether or not simple nodes (non-compound nodes) are of uniform dimensions
        uniformNodeDimensions: false,
        // Whether to pack disconnected components - cytoscape-layout-utilities extension should be registered and initialized
        packComponents: false,
        // Layout step - all, transformed, enforced, cose - for debug purpose only
        step: "all",
        // False for random, true for greedy sampling
        samplingType: true,
        // Sample size to construct distance matrix
        sampleSize: 25,
        // Separation amount between nodes
        nodeSeparation: 200,
        // Power iteration tolerance
        piTol: 0.0000001,
        /* incremental layout options */
        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: (node: any) => 4500,
        // Ideal edge (non nested) length
        idealEdgeLength: (edge: any) => 300,
        // Divisor to compute edge forces
        edgeElasticity: (edge: any) => 0.45,
        // Nesting factor (multiplier) to compute ideal edge length for nested edges
        nestingFactor: 0.4,
        // Maximum number of iterations to perform - this is a suggested value and might be adjusted by the algorithm as required
        numIter: 2500,
        // For enabling tiling
        tile: true,
        // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
        tilingPaddingVertical: 10,
        // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
        tilingPaddingHorizontal: 10,
        // Gravity force (constant)
        gravity: 0.25,
        // Gravity range (constant) for compounds
        gravityRangeCompound: 2,
        // Gravity force (constant) for compounds
        gravityCompound: 0.5,
        // Gravity range (constant)
        gravityRange: 3.8,
        // Initial cooling factor for incremental layout
        initialEnergyOnIncremental: 0.3,
        /* constraint options */
        // Fix desired nodes to predefined positions
        // [{nodeId: 'n1', position: {x: 100, y: 200}}, {...}]
        fixedNodeConstraint: undefined,
        // Align desired nodes in vertical/horizontal direction
        // {vertical: [['n1', 'n2'], [...]], horizontal: [['n2', 'n4'], [...]]}
        alignmentConstraint: undefined,
        // Place two nodes relatively in vertical/horizontal direction
        // [{top: 'n1', bottom: 'n2', gap: 100}, {left: 'n3', right: 'n4', gap: 75}, {...}]
        relativePlacementConstraint: undefined,
        /* layout event callbacks */
        // ready: () => {}, // on layoutready
        // stop: () => {} // on layoutstop
    },
    'dagre': {
        name: 'dagre',
        // dagre algo options, uses default value on undefined
        nodeSep: undefined, // the separation between adjacent nodes in the same rank
        edgeSep: undefined, // the separation between adjacent edges in the same rank
        rankSep: undefined, // the separation between each rank in the layout
        rankDir: 'TB', // 'TB' for top to bottom flow, 'LR' for left to right,
        align: 'DR',  // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
        acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
                            // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
        ranker: 'network-simplex', // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
        minLen: function( edge: any ){ return 2; }, // number of ranks to keep between the source and target of the edge
        edgeWeight: function( edge: any ){ return 1; }, // higher weight edges are generally made shorter and straighter than lower weight edges

        // general layout options
        fit: true, // whether to fit to viewport
        padding: 30, // fit padding
        spacingFactor: 1, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
        animate: false, // whether to transition the node positions
        animateFilter: function( node: any, i: any ){ return true; }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        transform: function( node: any, pos: any ){ return pos; }, // a function that applies a transform to the final node position
        ready: function(){}, // on layoutready
        stop: function(){} // on layoutstop
    },
    'cola': {
        name: 'cola',
        nodeSpacing: 150,
        // edgeLengthVal: 1000,
        animate: false,
        randomize: false,
        maxSimulationTime: 1500
    },
    // Spread: https://github.com/cytoscape/cytoscape.js-spread
    'spread': {
        name: 'spread',
        animate: true, // Whether to show the layout as it's running
        ready: undefined, // Callback on layoutready
        stop: undefined, // Callback on layoutstop
        fit: true, // Reset viewport to fit default simulationBounds
        minDist: 20, // Minimum distance between nodes
        padding: 20, // Padding
        expandingFactor: -1.0, // If the network does not satisfy the minDist
        // criterium then it expands the network of this amount
        // If it is set to -1.0 the amount of expansion is automatically
        // calculated based on the minDist, the aspect ratio and the
        // number of nodes
        prelayout: { name: 'cose' }, // Layout options for the first phase
        maxExpandIterations: 4, // Maximum number of expanding iterations
        boundingBox: undefined, // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        randomize: false // Uses random initial node positions on true
    },
    'cose-bilkent': {
        name: 'cose-bilkent',
        // Called on `layoutready`
        ready: function () {
        },
        // Called on `layoutstop`
        stop: function () {
        },
        // 'draft', 'default' or 'proof"
        // - 'draft' fast cooling rate
        // - 'default' moderate cooling rate
        // - "proof" slow cooling rate
        quality: 'default',
        // Whether to include labels in node dimensions. Useful for avoiding label overlap
        nodeDimensionsIncludeLabels: false,
        // number of ticks per frame; higher is faster but more jerky
        refresh: 30,
        // Whether to fit the network view after when done
        fit: true,
        // Padding on fit
        padding: 10,
        // Whether to enable incremental mode
        randomize: true,
        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: 4500,
        // Ideal (intra-graph) edge length
        idealEdgeLength: 200,
        // Divisor to compute edge forces
        edgeElasticity: 0.45,
        // Nesting factor (multiplier) to compute ideal edge length for inter-graph edges
        nestingFactor: 0.1,
        // Gravity force (constant)
        gravity: 0.25,
        // Maximum number of iterations to perform
        numIter: 2500,
        // Whether to tile disconnected nodes
        tile: true,
        // Type of layout animation. The option set is {'during', 'end', false}
        animate: false,
        // Duration for animate:end
        animationDuration: 500,
        // Amount of vertical space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingVertical: 10,
        // Amount of horizontal space to put between degree zero nodes during tiling (can also be a function)
        tilingPaddingHorizontal: 10,
        // Gravity range (constant) for compounds
        gravityRangeCompound: 1.5,
        // Gravity force (constant) for compounds
        gravityCompound: 1.0,
        // Gravity range (constant)
        gravityRange: 3.8,
        // Initial cooling factor for incremental layout
        initialEnergyOnIncremental: 0.5
    }
}