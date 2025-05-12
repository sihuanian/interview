/**
 * Promise.retry 实现
 * @param {Function} fn - 返回Promise的异步函数
 * @param {number} maxRetries - 最大重试次数
 * @param {number} [delay=0] - 重试延迟时间(毫秒)
 * @returns {Promise} 最终成功或失败的Promise
 */
Promise.retry = function (fn, maxRetries, delay = 0) {
  return new Promise((resolve, reject) => {
    const attempt = (remainingAttempts) => {
      fn()
        .then(resolve)
        .catch((error) => {
          if (remainingAttempts <= 0) {
            return reject(error);
          }

          console.log(`Retry attempt ${maxRetries - remainingAttempts + 1}/${maxRetries}`);

          if (delay > 0) {
            setTimeout(() => attempt(remainingAttempts - 1), delay);
          } else {
            attempt(remainingAttempts - 1);
          }
        });
    };

    attempt(maxRetries);
  });
};

// 模拟一个可能失败的请求
function mockRequest() {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random > 0.8) {
      resolve('Success!');
    } else {
      reject(new Error('Request failed'));
    }
  });
}

// 使用retry方法
Promise.retry(mockRequest, 3, 1000)
  .then(result => console.log('最终成功:', result))
  .catch(error => console.log('最终失败:', error.message));