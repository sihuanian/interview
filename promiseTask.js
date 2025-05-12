class SuperTask1 {
  constructor() {
    this.pendingPromise = Promise.resolve(); // 初始一个已解决的Promise
  }

  add(task) {
    // 将新任务添加到链的末尾
    this.pendingPromise = this.pendingPromise.then(() => task());
    return this.pendingPromise; // 返回当前任务的Promise
  }
}

class SuperTask {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  async add(task) {
    return new Promise((resolve) => {
      this.queue.push(() => task().then(resolve));
      if (!this.running) this.run();
    });
  }

  async run() {
    this.running = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task();
    }
    this.running = false;
  }
}

function timeout(time) {
  return new Promise((resolve) => (
    setTimeout(() => {
      resolve();
    }, time)))
}

const superTask = new SuperTask();

function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}
addTask(10000, 1);  //10000ms后输出:任务1完成
addTask(5000, 2);    //5000ms后输出:任旁2完成
addTask(3000, 3);    //8000ms后输出:任务3完成
addTask(4080, 4);    //12000ms后输出:任务4完成
addTask(5000, 5);    //15000ms后输出:任务5完成
