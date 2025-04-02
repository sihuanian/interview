class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(val) {
    const node = new Node(val)
    if (this.size === 0) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.size++
    return this
  }

  prepend(val) {
    const node = new Node(val)
    node.next = this.head
    this.head = node
    this.size++
    return this
  }

  toArray() {
    let current = this.head
    const list = []
    while(current) {
      list.push(current.val)
      current = current.next
    }
    return list
  }

  delete(val) {
    if (this.size === 1 && this.head === val) {
      this.head = this.head.next
      this.size--
    }
    let pre = new Node(null)
    let current = this.head
    while (current) {
      if (current.val === val) {
        pre.next = current.next
        this.size--
        break
      }
      pre = current
      current = current.next
    }
    return this
  }

  find(val) {
    let current = this.head
    while (current) {
      if (current.val === val) {
        return current
      } else {
        current = current.next
      }
    }
    return null
  }

  reverse() {
    let current = this.head
    let pre = null
    while (current) {
      const next = current.next
      current.next = pre
      pre = current
      current = next
    }
    this.head = pre
    return this
  }

  hasCycle() {
    let slow = this.head
    let fast = this.head

    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
      if (slow === fast) {
        return true
      }
    }
    return false
  }

  getMiddle() {
    let slow = this.head
    let fast = this.head
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
    }
    return slow
  }

  reverseKGroup(k) {
    let start = this.head
    let end = this._findGroupEnd(start, k)
    let target = new Node(null)
    let current = target
    console.log('end: ', end)
    while (end) {
      let endNext = end.next
      end.next = null
      while (current.next) {
        current = current.next
      }
      current.next = this._reverse(start)
      start = endNext
      end = this._findGroupEnd(start, k)
    }
    this.head = target.next
    return this
  }

  _findGroupEnd(node, k) {
    let current = node
    while (current) {
      k--
      if (k === 0) return current
      current = current.next
    }
    return null
  }

  _reverse(head) {
    let pre = null
    let current = head
    while (current) {
      const next = current.next
      current.next = pre
      pre = current
      current = next
    }
    return pre
  }
}

function toArray(head) {
  let current = head
  const list = []
  while(current) {
    list.push(current.val)
    current = current.next
  }
  return list
}

const linkList = new LinkList()

linkList.append(1).append(2).append(3).append(4).append(5).append(6)
console.log('shape1: ', linkList.toArray())
// linkList.reverse()
// linkList.delete(2)
console.log('k group: ', toArray(linkList.reverseKGroup(2)))
console.log('shape2: ', linkList.toArray())
// console.log('has cycle: ', linkList.hasCycle())
// const node = linkList.find(1)
// console.log('node: ', node, linkList.head)
// node.next = linkList.head
// console.log('has cycle: ', linkList.hasCycle())
// console.log('getMiddle', linkList.getMiddle())