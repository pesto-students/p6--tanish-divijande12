class Node {
    constructor(data) {
        this.value = data;
        this.left = null;
        this.right = null;
        this.lcount = 0;
        this.rcount = 0;
    }
}

class BinaryTree {
    constructor() {
        this.root = null
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
    insert(data) {
        var node = new Node(data);
        if (this.root === null)
            this.root = node;
        else
            this.#insertNode(this.root, node);
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
    inorder() {
        let node = this.root
        // console.log(node)
        this.#inorderTraversal(node);
    }
    #inorderTraversal(node) {
        if (node != null) {
            this.#inorderTraversal(node.left)
            console.log(node.value, " ")
            this.#inorderTraversal(node.right)
        }
    }
    depth() {
        let node = this.root
        if (node == null) return 0;
        return this.#maximumDepth(node)
    }
    #maximumDepth(node) {
        if (node == null) return 0;
        let lh = this.#maximumDepth(node.left);
        let rh = this.#maximumDepth(node.right);

        return 1 + Math.max(lh, rh);
    }
}

const bTree = new BinaryTree();

let arr = [1, null, 2]//[ 3, 9,20,null,null,15, 7 ]
let size = arr.length
for (let i in arr)
    bTree.insert(arr[i])
//bTree.inorder()
console.log(" Maximum Depth of Binary Tree : ", bTree.depth())