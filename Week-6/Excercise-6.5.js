let A = [5, 10, 3, 2, 50, 80]
let B = 78

const checkPair = function (A, B) {
    let map = new Map()

    for (let element of A) {
        let em = Math.abs(B - element)
        let ep = B + element;
        if (map.has(em) || map.has(ep) || map.has(element)) {
            return 1
        } else {
            map.set(ep, element);
            map.set(element, em)
            map.set(B + element, element)
            map.set(element, ep)
        }
    }
    return 0;
}
console.log(checkPair(A, B))
A = [-10, 20]
B = 30
console.log(checkPair(A, B))