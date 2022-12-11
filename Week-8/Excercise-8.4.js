class Graph {
    constructor(noOfVertices) {
        this.noOfVertices = noOfVertices;
        this.adjList = new Map()
    }
    // add vertex to the graph
    addVertex(v) {
        // initialize the adjacent list with a
        // null array
        this.adjList.set(v, []);
    }
    addEdge(v, w) {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.adjList.get(v).push(w);

        // Since graph is undirected,
        // add an edge from w to v also
        this.adjList.get(w).push(v);
    }
    // Prints the vertex and adjacency list
    printGraph() {
        // get all the vertices
        var get_keys = this.adjList.keys();

        // iterate over the vertices
        for (var i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.adjList.get(i);
            var conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
    getNeighbors(index, edges) {
        const result = [];

        // nodes could be connected in both directions
        for (const [a, b] of edges) {
            if (a === index) {
                result.push(b)
            }

            if (b === index) {
                result.push(a)
            }
        }

        return result;
    }
    bfs(start, edges, destination) {
        // queue the first item
        const queue = [start];
        // keep track of the visited nodes
        const visited = new Set();
        // add current node
        visited.add(start);

        while (queue.length > 0) {
            const node = queue.shift();
            // we found a path
            if (node === destination) {
                return true;
            }

            // build the graph on the fly
            for (let neighbor of this.getNeighbors(node, edges)) {
                // skip visited node
                if (visited.has(neighbor)) {
                    continue;
                }

                // enqueue the node and mark it as visited
                queue.push(neighbor);
                visited.add(neighbor)
            }
        }

        // if we make it here there was no path
        return false
    }
    isValidPath(n, edges, source, destination) {
        if (source === destination) {
            return true;
        }
        return this.bfs(source, edges, destination)
    }
}

var g = new Graph(3);
let edges = [[0, 1], [1, 2], [2, 0]]
var vertices = [0, 1, 2];

// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}
for (let i = 0; i < edges.length; i++) {
    let edge = edges[i]
    // adding edges
    g.addEdge(edge[0], edge[1]);
}

g.printGraph();
console.log(" Is Valid Path : ", g.isValidPath(3, edges, 0, 2));

var g = new Graph(6);
edges = [[0, 1], [0, 2], [3, 5], [5, 4], [4, 3]];
var vertices = [0, 1, 2, 3, 4, 5]
// adding vertices
for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
}
for (let i = 0; i < edges.length; i++) {
    let edge = edges[i]
    // adding edges
    g.addEdge(edge[0], edge[1]);
}

g.printGraph();
console.log(" Is Valid Path : ", g.isValidPath(6, edges, 0, 5));