class Node {
    value;
    next;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    add(value) {
        let newNode = new Node(value);
        if (this.head == null) {
            this.head = newNode;
            return;
        }
        let node = this.head;
        while (node.next) {
            node = node.next;
        }
        node.next = newNode;
    }
    addAt(index, value) {
        let node = this.head;
        let newNode = new Node(value);
        if (index == 0) {
            newNode.next = node;
            this.head = newNode;
        }
        while (--index) {
            if (node.next !== null)
                node = node.next
            else
                throw Error("Index Out of Bound")
        }
        let tempVal = node.next;
        node.next = newNode;
        newNode.next = tempVal;
    }
    removeAll() {
        this.head = null;
    }
    removeAt(index) {
        let node = this.head;
        if (index === 0) {
            if (node !== null) {
                node = node.next;
                this.head = node;
            } else {
                throw Error("Index Out of Bound");
            }
            return;
        }
        while (--index) {
            if (node.next !== null) {
                node = node.next;
            } else {
                throw Error("Index Out of Bound");
            }
            node.next = node.next.next;
        }
    }
    get(index) {
        let node = this.head;
        if (index == 0) {
            return this.head;
        }
        while (index--) {
            if (node.next !== null)
                node = node.next;
            else
                throw Error("Index Out of Bound");
        }
        return node;
    }
    print() {
        let node = this.head;
        process.stdout.write("HEAD-> ")
        while (node) {
            process.stdout.write(node.value + " -> ");
            node = node.next;
        }
        console.log("NULL");
    }
    reverse() {
        let previous = null;
        let currentNode = this.head;
        if (currentNode === null) return;

        let nextNode; let c = 0;
        while (currentNode) {
            // console.log("Iteration", c);c++;

            // console.log("Before Processing: ","Next Node",nextNode," CurrentNode ",currentNode,"Previous",previous)

            nextNode = currentNode.next;
            currentNode.next = previous;
            previous = currentNode;
            currentNode = nextNode;
            // console.log(" After Processing: ","Next Node".nextNode," CurrentNode ",currentNode,"Previous",previous)
        }
        this.head = previous;
    }
    indexOf(data) {
        let ind = -1;
        let node = this.head;
        while (node) {
            ++ind;
            if (node.value === data) return ind;

            node = node.next;
        }
        return -1;
    }
    isEmpty() {
        return (this.head == null)
    }
    listSize() {
        let size = 0;
        let node = this.head;
        while (node) {
            size++;
            node = node.next;
        }
        return size;
    }
    getFirst() {
        return this.head;
    }
    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
        }
        return lastNode;
    }
    rotate(k) {
        if (this.head === null) throw Error("List is Empty")
        let node = this.head;
        let previous = null;
        let kthNode = this.get(k)
        if (kthNode == null) throw Error("Index Out Of Bound")
        // console.log(kthNode)
        while (--k) {
            node = node.next;
        }
        node.next = null;
        let tmpNode = kthNode;
        while (tmpNode.next != null) {
            tmpNode = tmpNode.next
        }
        //console.log("Current Node ",node,kthNode)
        node = this.head
        tmpNode.next = node
        this.head = kthNode
        this.print()

    }
    rotateOptimised(k) {
        if (k == 0)
            return;
        var current = this.head;
        var count = 1;
        while (count < k && current != null) {
            current = current.next;
            count++;
        }
        if (current == null)
            return;
        var kthNode = current;
        while (current.next != null)
            current = current.next;
        current.next = this.head;
        this.head = kthNode.next;
        kthNode.next = null;
    }
    idCircular() {
        if (this.head === null) return true;
        let node = head.next;

        while (node != null && node != head) {
            node = node.next;
        }
        return (node == head);
    }
    isLooped() {
        let fast = this.head
        while (fast && fast.next) {
            fast = fast.next.next;
            this.head = this.head.next;
            if (this.head == fast)
                return true;
        }
        return false;
    }
    createLoop(k) {
        this.makeloop(this.head, k);
    }
    makeloop(head_ref, k) {
        var temp = head_ref;
        var count = 1;
        while (count < k) {
            temp = temp.next;
            count++;
        }

        // backup the joint point
        var joint_point = temp;

        // traverse remaining nodes
        while (temp.next != null)
            temp = temp.next;

        // joint the last node to k-th element
        temp.next = joint_point;
        return head_ref;
    }
}

let myList = new LinkedList();
myList.add(2);
myList.add(4);
myList.add(7);
myList.add(8);
myList.add(9);
myList.createLoop(1)
console.log(myList.isLooped())