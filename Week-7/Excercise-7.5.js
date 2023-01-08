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
    nextGreaterElement(arr) {
        let previousItem = -1;
        for (let i = arr.length - 1; i >= 0; i--) {
            let max = -1;
            for (let j = i; j < arr.length; j++) {
                if (arr[i] < arr[j]) {
                    this.push(arr[j]);
                    max = arr[j]
                    break;
                }
            }
            if (max == -1) {
                this.push(-1)
            }
        }
        let len = this.arr.length; let str = []
        for (let i = 0; i < len; i++) {
            str.push(this.pop())
        }
        return str;
    }
    populateStack(arr) {
        this.arr = arr;
    }
}
const stack = new Stack();
console.log(stack.nextGreaterElement([1, 3, 2, 4]));
