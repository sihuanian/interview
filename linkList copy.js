class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // 1. 尾部追加节点
  append(val) {
    const newNode = new ListNode(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
    return this;
  }

  // 2. 头部插入节点
  prepend(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
    return this;
  }

  // 3. 删除指定值节点
  delete(val) {
    if (!this.head) return false;

    // 处理头节点匹配的情况
    if (this.head.val === val) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.val === val) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // 4. 查找节点
  find(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) return current;
      current = current.next;
    }
    return null;
  }

  // 5. 反转链表（迭代法）
  reverse() {
    let prev = null;
    let current = this.head;
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    this.head = prev;
    return this;
  }

  // 6. 检测环（快慢指针法）
  hasCycle() {
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  }

  // 7. 获取中间节点
  getMiddle() {
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  // 8. 转换为数组（调试用）
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  // 9. K个一组反转链表（附加方法）
  reverseKGroup(k) {
    const dummy = new ListNode(0, this.head);
    let prevGroupEnd = dummy;

    while (true) {
      let groupStart = prevGroupEnd.next;
      let groupEnd = this._findGroupEnd(prevGroupEnd, k);
      if (!groupEnd) break;

      const nextGroupStart = groupEnd.next;
      groupEnd.next = null;

      prevGroupEnd.next = this._reverseList(groupStart);
      groupStart.next = nextGroupStart;

      prevGroupEnd = groupStart;
    }

    this.head = dummy.next;
    return this;
  }

  // 辅助方法：查找分组尾节点
  _findGroupEnd(node, k) {
    while (node && k > 0) {
      node = node.next;
      k--;
    }
    return k === 0 ? node : null;
  }

  // 辅助方法：反转子链表
  _reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return prev;
  }
}

// ================= 测试用例 =================
const list = new LinkedList();

// 构建链表: 1 -> 2 -> 3 -> 4 -> 5
list.append(1).append(2).append(3).append(4).append(5);
console.log("初始链表:", list.toArray()); // [1,2,3,4,5]

// 头部插入
list.prepend(0);
console.log("头部插入0:", list.toArray()); // [0,1,2,3,4,5]

// 删除节点
list.delete(3);
console.log("删除3:", list.toArray()); // [0,1,2,4,5]

// 反转链表
list.reverse();
console.log("反转后:", list.toArray()); // [5,4,2,1,0]

// K个一组反转
list.reverseKGroup(2);
console.log("2个一组反转:", list.toArray()); // [4,5,1,2,0]

// 检测环
console.log("是否有环:", list.hasCycle()); // false

// 添加环检测
const cycleNode = list.find(0);
if (cycleNode) cycleNode.next = list.head;
console.log("添加环后检测:", list.hasCycle()); // true
