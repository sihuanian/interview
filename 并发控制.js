class ConcurrencyControl {
  constructor(concurrency) {
    this.queue = [];
    this.running = 0;
    this.concurrency = concurrency;
  }

  add(task) {
    this.queue.push(task);
    this.run();
  }

  run() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();
      this.running++;
      task().finally(() => {
        this.running--;
        this.run(); // 递归触发下一任务
      });
    }
  }
}

async function asyncPool(poolLimit, tasks) {
  const executing = new Set(); // 运行池
  const results = [];
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);
    executing.add(p);
    p.finally(() => executing.delete(p));

    if (executing.size >= poolLimit) {
      await Promise.race(executing); // 等待任一任务完成
    }
  }
  return Promise.all(results);
}