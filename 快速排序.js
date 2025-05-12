function quickSort(nums) {
  if (nums.length <= 1) return nums
  let left = [], right = []
  const point = nums[0]
  for (let i = 1; i < nums.length; i++) {
    const item = nums[i]
    if (item <= point) left.push(item)
    else right.push(item)
  }
  return [...quickSort(left), point, ...quickSort(right)]
}

const unsortedArray = [6, 5, 3, 1, 8, 7, 2, 4];
const sortedArray = quickSort(unsortedArray)
console.log('sortedArray', sortedArray)