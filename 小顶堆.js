class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 获取父节点索引
  getParentIndex(index) {
    return Math.floor((index - 1) / 2); // 等同于 (index - 1) >> 1
  }

  // 获取左子节点索引
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // 获取右子节点索引
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // 交换元素
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 插入元素（上浮调整）
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  // 上浮操作
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // 提取最小值（下沉调整）
  extractMin() {
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  // 下沉操作
  sinkDown(index) {
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);
    let smallest = index;

    if (left < this.size() && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < this.size() && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.sinkDown(smallest);
    }
  }

  // 查看堆顶元素
  peek() {
    return this.heap[0] ?? null;
  }

  // 堆大小
  size() {
    return this.heap.length;
  }

  // 批量建堆
  buildHeap(arr) {
    this.heap = [...arr];
    for (let i = Math.floor(this.size() / 2); i >= 0; i--) {
      this.sinkDown(i);
    }
  }
}

// 测试用例
const heap = new MinHeap();
heap.insert(10);
heap.insert(5);
heap.insert(20);
heap.insert(3);
heap.insert(8);

console.log("Extracted Min:", heap.extractMin()); // 3
console.log("Current Min:", heap.peek());        // 5
console.log("Heap Size:", heap.size());          // 3