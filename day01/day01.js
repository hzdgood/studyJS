class listNode {
    constructor(key) {
        this.key = key;
        this.next = null;
    }
}
class list {
    constructor() {
        this.head = null;
        this.length = 0;
    }
    static creatNode(key) {
        return new listNode(key);
    }
    insert(node) {
        if (this.head) {
            node.next = this.head;
        } else {
            node.next = null;
        }
        this.head = node;
    }
    find(key) {
        let node = this.head;
        while (node != null && node.key !== key) {
            node = node.next;
        }
        return node;
    }
    delete(node) {
        if (node === this.head) {
            this.head = node.next;
            return;
        }
        let prevNode = this.head;
        while (prevNode.next != node) {
            prevNode = prevNode.next;
        }
        if (node.next === null) {
            console.log('111');
            prevNode.next = null;
        }
        if (node.next) {
            prevNode.next = node.next;
        }
    }
}

var node = new list();
var node1 = new listNode(40);
var node2 = new listNode(30);
var node3 = new listNode(20);
var node4 = new listNode(10);
node.insert(node1);
node.insert(node2);
node.insert(node3);
node.insert(node4);
node.delete(node2);

console.log(node);