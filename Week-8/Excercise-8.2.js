class Node {
    constructor(data){
        this.value = data
        this.left = null
        this.right = null
        this.lcount = 0;
        this.rcount = 0;
    }
}

class BinaryTree {
    constructor(){
        this.root = null;
    }
    isPBT(count){
        count = count + 1
        while (count % 2 == 0)
            count = count / 2
     
        if (count == 1)
            return true
        else
            return false
    }
    insert(data){
        var node = new Node(data);
        if(this.root === null)
             this.root = node;
        else
            this.#insertNode(this.root, node);
    }
    insertBST(data){
        if(data==null)
            return ;
        var node = new Node(data);
        if(this.root === null)
            this.root = node;
        else
            this.#insertBSTNode(this.root, node);
    }
    #insertBSTNode(node, newNode) {
   
        if(newNode.value < node.value) {
            if(node.left === null)
                node.left = newNode;
            else
                this.#insertNode(node.left, newNode);
        } else {
            if(node.right === null)
                node.right = newNode;
            else
                this.#insertNode(node.right,newNode);
        }
    }
    #insertNode(root,node){
        if(root == null)
            return node;
        if (root.rcount == root.lcount){
            root.left = this.#insertNode(root.left, node)
            root.lcount += 1
        } else if (root.rcount < root.lcount){
            if (this.isPBT(root.lcount)){
                root.right = this.#insertNode(root.right, node)
                root.rcount += 1
            } else{
                root.left = this.#insertNode(root.left, node)
                root.lcount += 1
            }
        }
        return root
    }
    inorder() {
        let node = this.root
        this.#inorderTraversal(node)
    }
    #inorderTraversal(node){
        if(node !== null) {
            this.#inorderTraversal(node.left);
            console.log(node.value);
            this.#inorderTraversal(node.right);
        }
    }
    isBST(){
        let node = this.root
        
        return this.#isBSTUtil(node,null)
    }
    #isBSTUtil(root,prev) {
        //console.log(root.value," <--> ",root.left,root.right)
        if(root.left !=null && root.left.value > root.value)
            return false
        else if(root.right !=null && root.right.value < root.value)
            return false
        if(root.left != null)
            this.#isBSTUtil(root.left,null);
        if(root.right != null)
            this.#isBSTUtil(root.right,null);    
        return true;
    }
}
let arr = [2,1,3]//
let arr1 = [5,1,4,null,null,3,6]//
const binaryTree = new BinaryTree();
const binaryTree1 = new BinaryTree();
for(let i in arr)
    binaryTree.insert(arr[i])

for(let i in arr1)
    binaryTree1.insert(arr1[i])
console.log(arr," Is BST : ",binaryTree.isBST())
console.log(arr1," Is BST : ",binaryTree1.isBST())