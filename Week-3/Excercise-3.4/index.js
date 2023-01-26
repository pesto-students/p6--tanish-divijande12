function createStack() {
    const items = [];
    return {
        push(item) {
            items.push(item);
        },
        pop() {
            return items.pop();
        }
    };
}
const stack = createStack();
stack.push(10);
console.log(stack.push()); // => undefined
stack.pop();
console.log(stack.pop()); // => 10
stack.push(5);
console.log(stack.push()); // => undefined
stack.items;
console.log(stack.items); // => undefined