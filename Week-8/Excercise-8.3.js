class Node {
    constructor(data) {
        this.value = data
        this.left = null
        this.right = null
        this.lcount = 0;
        this.rcount = 0;
    }
}
class BinaryTree {
    constructor() {
        this.root = null
    }
    insert(data) {
        let node = new Node(data)
        if (this.root == null) {
            this.root = node;
            return;
        }
        return this.#insertNode(this.root, node)
    }
    #insertNode(root, node) {
        if (root == null)
            return node;
        if (root.rcount == root.lcount) {
            root.left = this.#insertNode(root.left, node)
            root.lcount += 1
        } else if (root.rcount < root.lcount) {
            if (this.isPBT(root.lcount)) {
                root.right = this.#insertNode(root.right, node)
                root.rcount += 1
            } else {
                root.left = this.#insertNode(root.left, node)
                root.lcount += 1
            }
        }
        return root
    }
    printLevelOrder() {
        var queue = [];
        queue.push(this.root);
        while (queue.length != 0) {
            var tempNode = queue.shift();
            console.log(tempNode.value + " ");

            /* Enqueue left child */
            if (tempNode.left != null) {
                queue.push(tempNode.left);
            }

            /* Enqueue right child */
            if (tempNode.right != null) {
                queue.push(tempNode.right);
            }
        }
    }
    isPBT(count) {
        count = count + 1
        while (count % 2 == 0)
            count = count / 2

        if (count == 1)
            return true
        else
            return false
    }
}
const bTree = new BinaryTree();

let arr = [3, 9, 20, null, null, 15, 7]
let size = arr.length
for (let i in arr)
    bTree.insert(arr[i])

bTree.printLevelOrder()