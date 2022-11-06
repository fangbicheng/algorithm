// 相同的树（递归）
var isSameTree = function(p, q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p.val !== q.val) return false;

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// 相同的树（迭代）
var isSameTree = function(p, q) {
    const queue1 = [];
    const queue2 = [];

    queue1.push(p);
    queue2.push(q);
    while(queue1.length > 0 && queue2.length > 0) {
        const node1 = queue1.shift();
        const node2 = queue2.shift();
        if (!node1 && !node2) continue;
        if (!node1 || !node2) return false;
        if (node1.val !== node2.val) return false;
        queue1.push(node1.left);
        queue1.push(node1.right);
        queue2.push(node2.left);
        queue2.push(node2.right);
    }
    return true;
};

// 对称二叉树（递归）
var isSymmetric = function(root) {
    if (!root) return true;

    function isSame(left, right) {
        if (!left && !right) return true;
        if (!left || !right) return false;
        if (left.val !== right.val) return false;

        return isSame(left.left, right.right) && isSame(left.right, right.left);
    }
    return isSame(root.left, root.right);
};

// 对称二叉树（迭代）
var isSymmetric = function(root) {
    if (!root) return true;

    const queue = [];
    queue.push(root.left, root.right);
    while (queue.length > 0) {
        const left = queue.shift();
        const right = queue.shift();
        if (!left && !right) continue;
        if (!left || !right) return false;
        if (left.val !== right.val) {
            return false;
        }
        queue.push(left.left);
        queue.push(right.right);
        queue.push(left.right);
        queue.push(right.left);
    }
    return true;
};

// 二叉树的最大深度（深度优先）
var maxDepth = function(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

// 二叉树的最大深度（广度优先）
var maxDepth = function(root) {
    if (!root) return 0;
    
    let depth = 0;
    const queue = [];

    queue.push(root);
    while (queue.length > 0) {
        depth++;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return depth;
};

// 二叉树的最小深度（深度优先）
var minDepth = function(root) {
    if (!root) return 0;

    const leftDepth = minDepth(root.left);
    const rightDepth = minDepth(root.right);
    if (!root.left && !root.right) return 1;
    if (!root.left) return rightDepth + 1;
    if (!root.right) return leftDepth + 1;
    if (root.left && root.right) return Math.min(leftDepth, rightDepth) + 1;
};

// 二叉树的最小深度（广度优先）
var minDepth = function(root) {
    if (!root) return 0;

    let depth = 0;
    const queue = [];

    queue.push(root);
    while (queue.length > 0) {
        depth++;
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            if (!node.left && !node.right) return depth;
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    return depth;
};

// 平衡二叉树（自顶向下）
var isBalanced = function(root) {
    if (!root) return true;

    function getHeight(root) {
        if (!root) return 0;

        return Math.max(getHeight(root.left), getHeight(root.right)) + 1;
    }
    return Math.abs(getHeight(root.left) - getHeight(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};

// 平衡二叉树（自底向上）
var isBalanced = function(root) {
    if (!root) return true;

    function getHeight(root) {
        if (!root) return 0;

        const leftHeight = getHeight(root.left);
        const rightHeight = getHeight(root.right);
        if (leftHeight === -1 || rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
            return -1;
        } else {
            return Math.max(leftHeight, rightHeight) + 1;
        }
    }
    return getHeight(root) >= 0;
};