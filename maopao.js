function maoPao(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('类型错误')
  }

  const len = arr.length

  function swap(index1, index2) {
    const temp = arr[index1]
    arr[index1] = arr[index2]
    arr[index2] = temp
  }

  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (arr[i] > arr[j]) {
        swap(i, j)
        console.log('i j', { i, j, arr })
      }
    }
  }

  return arr
}

const list = [5, 21, 1, 8, 11, -1, 8]
const sorted = maoPao(list)
console.log('sorted: ', list)