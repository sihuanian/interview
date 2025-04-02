class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // 按层级插入（完全二叉树方式）
  insert(value) {
    const newNode = new TreeNode(value)
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let queue = [this.root]
    while (queue.length) {
      const node = queue.shift();
      if (!node.left) {
        node.left = newNode
        break
      } else {
        queue.push(node.left)
      }
      if (!node.right) {
        node.right = newNode
        break
      } else {
        queue.push(node.right)
      }
    }
    return this
  }

  // 删除节点（替换为最后一个节点）
  delete(value) {
    if (!this.root) return false;

    // 查找目标节点
    let targetNode = null;
    let queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (node.value === value) targetNode = node;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    if (!targetNode) return false;

    // 获取最后一个节点及其父节点
    const { lastNode, parent } = this._findLastNodeAndParent();
    targetNode.value = lastNode.value; // 替换值

    // 删除最后一个节点
    if (parent) {
      parent.left === lastNode ? parent.left = null : parent.right = null;
    } else {
      this.root = null; // 树只有一个节点
    }
    return true;
  }

  // 查找节点是否存在
  contains(value) {
    const queue = [this.root];
    while (queue.length) {
      const node = queue.shift();
      if (!node) continue;
      if (node.value === value) return true;
      queue.push(node.left, node.right);
    }
    return false;
  }

  // 前序遍历
  preOrder() {
    const result = []
    const traverse = (node) => {
      if (!node) return
      result.push(node.value)
      traverse(node.left)
      traverse(node.right)
    }

    traverse(this.root)

    return result
  }

  // 中序遍历
  inOrder() {
    const result = []

    const traverse = (node) => {
      if (!node) return
      traverse(node.left)
      result.push(node.value)
      traverse(node.right)
    }

    traverse(this.root)

    return result
  }

  // 后序遍历
  postOrder() {
    const result = [];

    const traverse = (node) => {
      if (!node) return
      traverse(node.left)
      traverse(node.right)
      result.push(node.value)
    }

    traverse(this.root)

    return result
  }

  // 层序遍历
  levelOrder() {
    const result = []
    const queue = [this.root]

    while (queue.length) {
      const node = queue.shift()
      if (!node) continue
      result.push(node.value)
      queue.push(...[node.left, node.right])
    }

    return result
  }

  // 获取树高度
  getHeight(node = this.root) {
    if (!node) return 0
    let leftHeight = 0
    let rightHeight = 0
    const leftQueue = [node]
    const rightQueue = [node]
    while (leftQueue.length && rightQueue.length) {
      const leftNode = leftQueue.shift()
      const rightNode = rightQueue.shift()
      if (!leftNode && !rightNode) return 0
      if (leftNode.left) {
        leftHeight++
        leftQueue.push(leftNode.left)
      }
      if (rightNode.right) {
        rightHeight++
        rightQueue.push(rightNode.right)
      }
    }

    return 1 + Math.max(leftHeight, rightHeight)
  }

  // 获取节点数量
  size() {
    let count = 0
    const queue = [this.root]

    while (queue.length) {
      const node = queue.shift()
      if (node) {
        count++
        node.left && queue.push(node.left)
        node.right && queue.push(node.right)
      }
    }

    return count
  }

  // 镜像反转
  mirror() {
    const swap = node => {
      if (!node) return;
      [node.left, node.right] = [node.right, node.left];
      swap(node.left);
      swap(node.right);
    };
    swap(this.root);
  }

  // 检查是否完全二叉树
  isComplete() {
    if (!this.root) return true;
    const queue = [this.root];
    let hasNull = false;

    while (queue.length) {
      const node = queue.shift();
      if (!node) {
        hasNull = true;
      } else {
        if (hasNull) return false; // 发现非空节点在空节点之后
        queue.push(node.left);
        queue.push(node.right);
      }
    }
    return true;
  }

  // 辅助方法：查找最后一个节点及其父节点
  _findLastNodeAndParent() {
    if (!this.root) return { lastNode: null, parent: null };

    let parent = null;
    let lastNode = this.root;
    const queue = [this.root];

    while (queue.length) {
      const node = queue.shift();
      if (node.left) {
        queue.push(node.left);
        parent = node;
        lastNode = node.left;
      }
      if (node.right) {
        queue.push(node.right);
        parent = node;
        lastNode = node.right;
      }
    }
    return { lastNode, parent };
  }
}

// 使用示例
const tree = new BinaryTree();
tree.insert(1).insert(2).insert(3).insert(4).insert(5).insert(6).insert(7).insert(8).insert(9).insert(10).insert(11).insert(12).insert(13).insert(14).insert(15).insert(16);

console.log('层序遍历:', tree.levelOrder()); // [1, 2, 3, 4, 5]
console.log('前序遍历:', tree.preOrder());   // [1, 2, 4, 5, 3]
console.log('高度:', tree.getHeight());      // 3
console.log('节点数:', tree.size());         // 5

tree.delete(2);
console.log('删除后的层序:', tree.levelOrder()); // [1, 5, 3, 4]

tree.mirror();
console.log('镜像后的层序:', tree.levelOrder()); // [1, 3, 5, 4]

console.log('是否完全二叉树:', tree.isComplete()); // false