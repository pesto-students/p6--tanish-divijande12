const fib = {
    // Change the value of n if you want series till nth series
    n: 7,
    // iterator function
    [Symbol.iterator]: function () {
        let i = 1;
        let old = 0, new1 = 0;
        return {
            next: () => {
                if (i++ <= this.n) {
                    [old, new1] = [new1, (old + new1) || 1];
                    return { value: old, done: false }
                }
                else {
                    return { done: true }
                }
            }
        }
    }
};

// print fibonacci series
for (let num of fib) {
    console.log(num);
}