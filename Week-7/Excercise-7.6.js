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
}
class Queue {
    constructor() {
        this.stack1 = new Stack()
        this.stack2 = new Stack()
    }
    enQueue(x) {
        let s2len = this.stack2.size();
        while (s2len > 0) {
            this.stack1.push(this.stack2.pop()); s2len--;
        }
        this.stack2.push(x)
        let s1len = this.stack1.size()
        while (s1len > 0) {
            this.stack2.push(this.stack1.pop())
            s1len--;
        }
    }
    deQueue() {
        this.stack2.pop();
    }
    printQueue() {
        this.stack2.print()
    }
}

const queue = new Queue()

console.log("----------------------")
queue.enQueue(1);
queue.enQueue(2);
queue.enQueue(3);
queue.enQueue(4);
queue.enQueue(5);
queue.enQueue(6);
queue.enQueue(7);
queue.printQueue()
queue.deQueue()
queue.deQueue()
queue.printQueue()
queue.deQueue()
queue.printQueue()