// function written without using set
function hasDuplicate(args) {

    let count = {};
    for (let i = 0; i < args.length; i++) {
        count[args[i]] = 1 + (count[args[i]] || 0);
    }
    let found = Object.keys(count).filter(function (key) {
        return count[key] > 1;
    });
    return found.length ? true : false;
}
console.log(hasDuplicate([1, 2, 2, 5]))



// function written using set
function hasDuplicate2(arr) {

    let arrSet = new Set(arr);
    return arrSet.size !== arr.length;
}
console.log(hasDuplicate2([1,2,3,5]))