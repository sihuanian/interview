// 1
let number = 1234567.89;
let formattedNumber = number.toLocaleString(); // "1,234,567.89"

/**
 * 千分位格式化（支持正负、整数小数、大数）
 * @param {number|string} num 
 * @returns {string}
 */
function formatThousands(num) {
  const str = num.toString();
  if (str.includes('e')) return num; // 科学计数法不处理
  const [integer, decimal] = str.split('.');
  const formatted = integer.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return decimal ? `${formatted}.${decimal}` : formatted;
}

// (\d)          // 第1组：匹配单个数字
// (?=           // 正向先行断言（零宽断言），匹配后面必须满足的条件
//   (\d{3})+    // 第2组：连续3个数字重复1次或多次
//   (?!\d)      // 负向先行断言：确保后面没有其他数字
// )

// 测试
console.log(formatThousands(1234567.89));    // "1,234,567.89"
console.log(formatThousands(-1234567));      // "-1,234,567"
console.log(formatThousands('1234567890'));  // "1,234,567,890"
