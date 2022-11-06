/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// 前序遍历（递归）
var preorderTraversal = function(root) {
    const res = [];
    function preorder(root) {
        if (!root) return;

        res.push(root.val);
        preorder(root.left);
        preorder(root.right);
    }
    preorder(root);
    return res;
};

// 前序遍历（迭代）
var preorderTraversal = function(root) {
    const res = [];
    const stack = [];

    while (stack.length > 0 || root !== null) {
        while (root !== null) {
            res.push(root.val);
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        root = root.right;
    }
    return res;
};

// 中序遍历（递归）
var inorderTraversal = function(root) {
    const res = [];

    function inorder(root) {
        if (!root) return;

        inorder(root.left);
        res.push(root.val);
        inorder(root.right);
    }
    inorder(root);
    return res;
};

// 中序遍历（迭代）
var inorderTraversal = function(root) {
    const res = [];
    const stack = [];

    while (stack.length > 0 || root !== null) {
        while(root !== null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
};

// 后序遍历（递归）
var postorderTraversal = function(root) {
    const res = [];

    function postorder(root) {
        if (!root) return;

        postorder(root.left);
        postorder(root.right);
        res.push(root.val);
    }
    postorder(root)
    return res;
};

// 后序遍历（迭代）
var postorderTraversal = function(root) {
    const res = [];
    const stack = [];
    let pre = null;

    while (stack.length > 0 || root !== null) {
        while (root !== null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        // 判断 root 的右孩子是都已经遍历或者不存在 遍历 root
        if (root.right === null || root.right === pre) {
            res.push(root.val);
            pre = root;  // 标记 root 已经遍历过了
            root = null;  // 左孩子也已经遍历过 下次从栈中取 root
        } else {  // 右孩子还存在 root 再次入栈 root 指向右节点
            stack.push(root);
            root = root.right;
        }
    }
    return res;
};

// 层序遍历（广度优先）
var levelOrder = function(root) {
    if (!root) return [];

    const res = [];
    const queue = [];

    queue.push(root);
    while (queue.length > 0) {
        const size = queue.length;
        const temp = [];
        for (let i = 0; i < size; i++) {
            node = queue.shift();
            temp.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(temp);
    }
    return res;
};

// 层序遍历（深度优先）
var levelOrder = function(root) {
    if (!root) return [];

    const res = [];

    function dfs(root, level) {
        if (!root) return;

        if (!res[level]) res[level] = [];
        res[level].push(root.val);
        if (root.left) dfs(root.left, level + 1);
        if (root.right) dfs(root.right, level + 1);
    }
    dfs(root, 0);
    return res;
};

// 锯齿形层序遍历：
var zigzagLevelOrder = function(root) {
    if (!root) return [];

    const res = [];
    const queue = [];
    let isLeftOrder = true;

    queue.push(root);
    while (queue.length > 0) {
        const size = queue.length;
        const temp = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            // 双端队列
            if (isLeftOrder) {
                temp.push(node.val);
            } else {
                temp.unshift(node.val);
            }
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        isLeftOrder = !isLeftOrder;
        res.push(temp);
    }
    return res;
};

// 层序遍历 II（即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
var levelOrderBottom = function(root) {
    if (!root) return [];

    const res = [];
    const queue = [];

    queue.push(root);
    while (queue.length > 0) {
        const size = queue.length;
        const temp = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            temp.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.unshift(temp);
    }
    return res;
};
