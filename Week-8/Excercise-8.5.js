function findJudge(n, trust) {
    const truste = []
    const judge = {}
    for (let i in trust) {
        truste.push(trust[i][0])
        if (trust[i][1] in judge) {
            judge[trust[i][1]] = judge[trust[i][1]] + 1
        } else {
            judge[trust[i][1]] = 1
        }
    }
    if (truste.length !== n - 1)
        return -1;
    let final = -1
    let value = -1
    for (let key in judge) {
        if (judge[key] > final) {
            final = judge[key]
            value = key
        }
    }
    return value
}

let n = 2;
let trust = [[1, 2]]
console.log(findJudge(n, trust))
n = 3, trust = [[1, 3], [2, 3]]
console.log(findJudge(n, trust))
n = 3, trust = [[1, 3], [2, 3], [3, 1]]
console.log(findJudge(n, trust))