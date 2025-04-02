// 假设硬币面额为 [1, 5, 10, 25]（如美元系统），用最少数量的硬币凑出 36 美分：
/* function tanxin(coins, target) {
  let rest = target
  const result = []
  const sortCoins = coins.sort((a, b) => b - a)
  for (let i = 0; i < sortCoins.length; i++) {
    const current = sortCoins[i];
    if (current <= rest) {
      const count = Math.floor(rest / current)
      result.push(count)
      rest = rest - count * current
    } else {
      result.push(0)
    }
  }

  return result
}

const result = tanxin([1, 5, 10, 25], 36)
console.log('result: ', result)
const result2 = tanxin([1, 3, 4], 6)
console.log('result2: ', result2) */

function coinChange(coins, amount) {
  // 初始化动态规划数组，dp[i] 表示组成金额 i 所需的最小硬币数
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 金额 0 需要 0 个硬币

  // 遍历所有金额，从 1 到 amount
  for (let i = 1; i <= amount; i++) {
      // 尝试使用每一个硬币
      for (const coin of coins) {
          // 如果当前硬币面值 <= 当前金额 i
          if (coin <= i) {
              // 更新 dp[i]：比较使用当前硬币后的结果与之前的记录
              dp[i] = Math.min(dp[i], dp[i - coin] + 1);
          }
      }
  }

  // 如果无法组成金额，返回 -1，否则返回 dp[amount]
  return dp[amount] === Infinity ? -1 : dp[amount];
}