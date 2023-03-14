import { Parser } from 'n3';

export const rdfToCytoscape = async (rdf: string) => {
    const parser = new Parser({ format: 'application/trig' })
    const cytoscapeElems: any = []
    const graphs: any = {}

    parser.parse(
        rdf,
        (error: any, quad: any, prefixes: any): any => {
            if (error) {
            console.log("Error parsing the RDF with n3 to display in cytoscape", error)
            return null
            }
            if (quad && quad.subject.value && quad.object.value) {
            // console.log("quad", quad.object.termType)
            // Subject and Object nodes
            cytoscapeElems.push({ data: {
                id: quad.subject.value,
                label: quad.subject.value,
                shape: 'ellipse',
                backgroundColor: '#90caf9',
                // parent: 'graph-' + quad.graph.value,
                parent: quad.graph.value,
                valign : "center",
                fontSize: "30px",
                fontWeight: "300",
                textColor: '#212121',
                // https://stackoverflow.com/questions/58557196/group-nodes-together-in-cytoscape-js
            } })
            // For literal that are too long without spaces, like public keys
            const cutLongObject = (!quad.object.value.includes(' ') && quad.object.value.length > 100) ? quad.object.value.replace(/(.{60})/g,"$1\n") : quad.object.value
            cytoscapeElems.push({ data: {
                id: quad.object.value,
                label: cutLongObject,
                shape: (quad.object.termType == 'NamedNode') ? 'ellipse' : 'round-rectangle',
                backgroundColor: (quad.object.termType == 'NamedNode') ? '#90caf9' : '#80cbc4', // blue or green
                textColor: '#000000', // black
                // parent: 'graph-' + quad.graph.value,
                parent: quad.graph.value,
                valign : "center",
                fontSize: "30px",
                fontWeight: "300",
            } })
            // Add Predicate edge to cytoscape graph
            cytoscapeElems.push({ data: {
                source: quad.subject.value,
                target: quad.object.value,
                label: quad.predicate.value,
            } })
            // Add the graph to the list of graphs
            graphs[quad.graph.value] = quad.graph.value

            } else {
            Object.keys(graphs).map((g: string) => {
                let graphColor = '#eceff1'
                let graphTextColor = '#000000'
                if (g.endsWith('assertion')) {
                // blue
                graphColor = '#e3f2fd'
                graphTextColor = '#0d47a1'
                } else if (g.endsWith('provenance')) {
                // Red
                graphColor = '#ffebee'
                graphTextColor = '#b71c1c'
                } else if (g.toLowerCase().endsWith('pubinfo')) {
                // Yellow
                graphColor = '#fffde7'
                graphTextColor = '#f57f17'
                }
                // Add Graph node at start of cytoscape graph
                cytoscapeElems.unshift({ data: {
                    // id: 'graph-' + g,
                    id: g,
                    label: g,
                    shape: 'round-rectangle',
                    backgroundColor: graphColor,
                    textColor: graphTextColor,
                    valign : "top",
                    fontSize: "50px",
                    fontWeight: "700",
                } })
            })

            const allPrefixes = {...prefixes, 'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'}
            // Resolve prefixes
            cytoscapeElems.map((elem: any) => {
                if (elem.data.label) {
                elem.data.label = replacePrefix(elem.data.label, allPrefixes)
                }
            })
            }

        },
    )
    // console.log('cytoscapeElems:', cytoscapeElems)
    return cytoscapeElems
}

export const replacePrefix = (uri: string, prefixes: any) => {
    // const namespace = (uri.lastIndexOf('#') > 0) ? uri.lastIndexOf('#') : uri.lastIndexOf('/')
    for (let i = 0; i < Object.keys(prefixes).length; i++) {
        const prefix = Object.keys(prefixes)[i]
        if (uri.startsWith(prefixes[prefix])) {
        return uri.replace(prefixes[prefix], prefix + ':')
        }
    }
    return uri
}

export const displayLink = (urlString: string) => {
    if(/^(?:node[0-9]+)|((https?|ftp):.*)$/.test(urlString)) {
        return `<a href="${urlString}" target="_blank" rel="noopener noreferrer" style="text-decoration: none;">
            ${urlString}
        </a>`
    } else {
        return urlString
    }
}