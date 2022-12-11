function allPaths(edges) {
    end = edges.length - 1
    const output = []
    const path = []

    const dfs = function (node) {
        path.push(node)
        if (node == end) {
            output.push([...path])
        }
        const nextNodes = edges[node]
        for (let i = 0; i < nextNodes.length; i++) {
            dfs(nextNodes[i])
        }
        path.pop();
    }
    dfs(0);

    return output;
}

graph = [[1, 2], [3], [3], []]
console.log(allPaths(graph))

graph = [[4, 3, 1], [3, 2, 4], [3], [4], []]
console.log(allPaths(graph))