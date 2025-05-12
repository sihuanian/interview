function promisify(original) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // 添加回调函数作为最后一个参数
      original.call(this, ...args, (err, ...values) => {
        if (err) {
          return reject(err);
        }
        // 如果只有一个返回值，直接返回它
        // 如果有多个返回值，返回数组
        resolve(values.length > 1 ? values : values[0]);
      });
    });
  };
}

function foo(callback) {
  setTimeout(() => {
    console.log('setTimeout')
    callback(null)
  }, 1000)
}

async function main() {
  try {
    console.log('start')
    const fooPromisify = promisify(foo)
    await fooPromisify()
    console.log('end')

  } catch (error) {
    console.log('error: ', error)
  }
}

main()