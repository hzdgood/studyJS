function Node(key){
    this.children = [];
    this.key = key;
}
var n1 = new Node(1);
var n2 = new Node(2);
var n3 = new Node(3);
var n4 = new Node(4);
var n5 = new Node(5);
var n6 = new Node(6);

n1.children.push(n2,n5);
n2.children.push(n3,n4);
n5.children.push(n6);

function dfs(node){
    const stack = [node];
    while(stack.length > 0){
        const first = stack.shift();
        console.log(first.key);
        first.children.slice().reverse().forEach(element => {
            stack.unshift(element);
        });
    }
}
function bfs(node){
    const stack = [node];
    while(stack.length > 0){
        const first = stack.shift();
        console.log(first.key);
        first.children.slice().reverse().forEach(element => {
            stack.push(element);
        });
    }
}
//dfs(n1);
bfs(n1);