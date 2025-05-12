function asyncAdd(a, b, callback) {
  setTimeout(function() {
    callback(a + b);
  }, 1000);
}

// 将 asyncAdd 转换为 Promise 形式
function asyncAddPromise(a, b) {
  return new Promise(resolve => {
    asyncAdd(a, b, sum => resolve(sum));
  });
}

// 主函数：递归两两相加
async function sum(...args) {
  if (args.length === 1) return args[0];
  
  const promises = [];
  // 两两分组相加（如果是奇数，最后一个数单独保留）
  for (let i = 0; i < args.length - 1; i += 2) {
    promises.push(asyncAddPromise(args[i], args[i + 1]));
  }
  if (args.length % 2 !== 0) {
    promises.push(Promise.resolve(args[args.length - 1]));
  }

  // 等待当前轮次的所有加法完成
  const results = await Promise.all(promises);
  // 递归处理下一轮
  return sum(...results);
}

// 测试
sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11).then(result => console.log(result)); // 66