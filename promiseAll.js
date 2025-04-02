function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Arguments must be an array')); // 参数校验
    }

    let results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise) // 包装非Promise类型参数
        .then(res => {
          results[index] = res; // 按顺序存储结果
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results); // 全部成功时返回
          }
        })
        .catch(err => {
          reject(err); // 任一失败立即终止
        });
    });
  });
}

function debounce(func, wait, immediate = false) {
  let timeout, result;

  return function (...args) {
    const context = this; // 保留执行上下文[2](@ref)
    
    const later = () => {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout); // 清除旧定时器[2](@ref)
    timeout = setTimeout(later, wait);

    if (callNow) result = func.apply(context, args); // 立即执行逻辑[2](@ref)
    return result;
  };
}