function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 使用方式 (需要在 async 函数中)
async function demo() {
  console.log('开始等待...');
  await sleep(5000); // 等待1秒
  console.log('5秒后执行');
}

demo()