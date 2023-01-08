class Stack {
    constructor(size = 50) {
        this.arr = []
    }

    push(element) {
        this.arr.push(element)
    }
    pop() {
        return this.arr.pop();
    }
    top() {
        return this.arr[this.arr.length - 1];
    }
    isEmpty() {
        return this.arr.length > 0 ? true : false;
    }
    isFull() {
    }
    print() {
        console.log(this.arr);
    }
    size() {
        return this.arr.length;
    }
    paranthesisChecker(str) {
        if (str.length % 2 !== 0)
            return false;
        for (let i = 0; i < str.length; i++) {
            let x = str[i];
            if (x == "[" || x == "{" || x == "(") {
                this.push(x);
                continue;
            }
            if (x == "}" && this.pop() !== "{") {
                return false;
            }
            if (x == "]" && this.pop() !== "[") {
                return false;
            }
            if (x == ")" && this.pop() !== "(") {
                return false;
            }
        }
        return true;
    }
}
const stack = new Stack();
console.log(stack.paranthesisChecker("{([])}"));

console.log(stack.paranthesisChecker("{([]}"));

console.log(stack.paranthesisChecker("{}"));