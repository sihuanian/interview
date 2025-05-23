// console.log('1')
// const p = new Promise((resolve, reject) => {
//   console.log('2')

//   setTimeout(() => {
//     console.log('3')
//     resolve('4')
//     console.log('5')
//   }, 0)
// })

// p.then((res) => {
//   console.log(res)
// }).finally(() => {
//   console.log('6')
// })

// console.log('7')

// 1 2 7 3 5 4 6 

/**
 *   1. if else 优化
2. plugins loader的区别
3. 模块联邦共享模块，是否要有其他技术栈的运行时（A React引用B Vue的组件，A是否有Vue的运行时）
4. React Fiber机制
5. 多语言适配
 */

/* setTimeout(() => console.log('A'), 0);

Promise.resolve()
  .then(() => {
    console.log('B');
    setTimeout(() => console.log('C'), 0);
  });

Promise.resolve().then(() => console.log('D')); */

// B D A C 对

/* Promise.resolve().then(() => console.log('Promise'));
process.nextTick(() => console.log('nextTick'));
setImmediate(() => console.log('setImmediate'));
setTimeout(() => console.log('setTimeout'), 0); */
// nextTick Promise setTimeout setImmediate // 微任务nextTick的优先级高

/* async function func1() {
  console.log('A');
  await func2();
  console.log('B');
}

async function func2() {
  console.log('C');
  await Promise.resolve();
  console.log('D');
}

setTimeout(() => console.log('E'), 0);
func1();
Promise.resolve().then(() => console.log('F')); */

// A C D F B E 

/* const p = new Promise((resolve) => {
  console.log("A")
  resolve('B')
  console.log('C')
}).then((res) => {
  console.log(res)
  return 'D'
})
  .then((res) => {
    console.log(res)
  })

const p1 = new Promise((resolve) => {
  console.log("E")
  resolve('F')
  console.log('G')
}).then((res) => {
  console.log(res)
  return 'H'
})
  .then((res) => {
    console.log(res)
  }) */

// A C E G B F D H 对

/* Promise.reject('Error')
  .catch((err) => console.log(err))
  .then(() => console.log('Continue'));

setTimeout(() => console.log('Timeout'), 0); */

// Error Continue Timeout

/* console.log('Start');

setTimeout(() => {
  console.log('A');
  Promise.resolve().then(() => console.log('B'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('C');
    setTimeout(() => console.log('D'), 0);
  })
  .then(() => {
    console.log('E');
  });

console.log('End'); */

// Start End C E A B D 对

/* const p1 = new Promise((resolve, reject) => {
  console.log('1');
  resolve();
  console.log('2');
})

p1.then(() => {
  console.log('3');
  Promise.resolve(() => {
    console.log('4');
  }).then((res) => {
    console.log('5', res);
  });
  console.log('6');
})

console.log('7'); */
// 1 2 7 3 6 5 不会输出4，因为Promise.resolve的是一个函数，res没有被执行
/* async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}

console.log('illegalscript start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('illegalscript end'); */ // 4
//  illegalscript start async1 start async2 promise1 illegalscript end async1 end promise2 setTimeout 错
/* async function async1() {
  console.log("a");
  await  async2();
  console.log("b");
}
async function async2() {
 console.log( 'c');
}
console.log("d");
setTimeout(function () {
  console.log("e");
},0);
async1();
new Promise(function (resolve) {
  console.log("f");
  resolve();
}).then(function () {
  console.log("g");
});
console.log('h'); */
// d
// a
// c
// f
// h
// b
// g
// e