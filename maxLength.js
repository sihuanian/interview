// 最长不重复子串
function lengthOfLongestSubstring(s) {
  const charMap = new Map(); // 存储字符及其最新索引
  let maxLength = 0;
  let left = 0; // 滑动窗口左指针

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    // 如果字符已存在且在窗口内，移动左指针到重复字符的下一位
    if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
      left = charMap.get(currentChar) + 1;
    }
    // 更新字符的索引
    charMap.set(currentChar, right);
    // 计算当前窗口长度，更新最大值
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
