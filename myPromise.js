// Promise 的三种状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.state = PENDING;     // 初始状态
    this.value = undefined;  // 成功值
    this.reason = undefined; // 失败原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = [];  // 失败回调队列

    // 定义 resolve 函数（箭头函数绑定 this）
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        // 异步执行所有成功回调
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    // 定义 reject 函数
    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        // 异步执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 执行 executor，捕获同步错误
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // 实现 then 方法（核心）
  then(onFulfilled, onRejected) {
    // 处理值穿透：如果参数不是函数，则创建默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

    // 返回新的 Promise，实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      // 封装处理成功回调的微任务
      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            // 解析新 Promise 的结果
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      // 封装处理失败回调的微任务
      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      };

      // 根据当前状态决定执行方式
      if (this.state === FULFILLED) {
        handleFulfilled();
      } else if (this.state === REJECTED) {
        handleRejected();
      } else { // PENDING 状态，将回调存入队列
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });

    return promise2;
  }

  // 实现 catch 方法（语法糖）
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 解析 Promise 的递归函数（符合 Promise A+ 规范）
function resolvePromise(promise2, x, resolve, reject) {
  // 禁止循环引用：promise2 不能与 x 相同
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 如果 x 是 Promise 实例，则让 promise2 接受其状态
  if (x instanceof MyPromise) {
    x.then(
      value => resolve(value),
      reason => reject(reason)
    );
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 处理 thenable 对象（例如第三方 Promise 实现）
    let then;
    try {
      then = x.then;
    } catch (err) {
      return reject(err);
    }

    // 如果 then 是函数，则调用它并递归解析
    if (typeof then === 'function') {
      let called = false; // 防止重复调用
      try {
        then.call(
          x,
          value => {
            if (!called) {
              called = true;
              resolvePromise(promise2, value, resolve, reject);
            }
          },
          reason => {
            if (!called) {
              called = true;
              reject(reason);
            }
          }
        );
      } catch (err) {
        if (!called) {
          reject(err);
        }
      }
    } else {
      // 普通对象/值，直接 resolve
      resolve(x);
    }
  } else {
    // 基础类型值，直接 resolve
    resolve(x);
  }
}

// 测试用例
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 1000);
});

p.then((value) => {
  console.log(value); // 1秒后输出 "success"
  return new MyPromise(resolve => resolve('new promise'));
}).then((value) => {
  console.log(value); // 输出 "new promise"
  throw new Error('error');
}).catch((err) => {
  console.error(err.message); // 输出 "error"
});