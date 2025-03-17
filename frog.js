function frog(n) {
  if (n <= 2) return n;
  let pre = 1, current = 2;
  for (let i = 3; i <= n; i++) {
    // [pre, current] = [current, pre + current];
    let temp = current
    current = pre + temp
    pre = temp
  }
  return current;
}

console.time('sss')
const result = frog(1000)
console.log('result: ', result)
console.timeEnd('sss')

let arr = [1, 2]
let a, b
[a, b] = arr
[a, b] = [b, a]
console.log(arr)