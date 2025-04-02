/**
 * 给定数组 nums 和目标值 target，找出和为目标值的两个元素索引
 * @param {*} nums 
 * @param {*} target 
 */

function twoNumberSum(nums, target) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    if (map.has(target - item)) return [map.get(target - item), i]
    map.set(item, i)
  }

  return null
}

const nums = [2,7,11,15]
const target = 18

const result = twoNumberSum(nums, target)
console.log('result: ', result)