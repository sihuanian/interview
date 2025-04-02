function mergeSort(nums) {
  if (nums.length <= 1) return nums
  let  middle = Math.floor(nums.length / 2)
  let left = nums.slice(0, middle), right = nums.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(nums1, nums2) {
  const result = []
  let left = 0, right = 0

  while (left < nums1.length && right < nums2.length) {
    if (nums1[left] <= nums2[right]) {
      result.push(nums1[left])
      left++
    } else {
      result.push(nums2[right])
      right++
    }
  }

  return result.concat(nums1.slice(left), nums2.slice(right))
}

const unsortedArray = [6, 5, 3, 1, 8, 7, 2, 4];
const sortedArray = mergeSort(unsortedArray);
console.log(sortedArray); // 输出: [1, 2, 3, 4, 5, 6, 7, 8]