// addition logic
const add = (n) => (n + 10);
add(9);

// memoize function
const memoizedAdd = () => {
    let cache = {};
    return (n) => {
        console.log('calculating result');
        let result = n + 10;
        cache[n] = result;
        return result;
    }
}

const newAdd = memoizedAdd();
console.log(newAdd(9));
console.log(newAdd(10));