function curry(fn) {
  const len = fn.length
  return function curried(...args) {
    if (args.length >= len) {
      return fn.apply(this, args)
    } else {
      return function(...args1) {
        return curried.apply(this, [...args, ...args1])
      }
    }
  }
}

function add(a, b, c, d) {
  return a + b + c + d
}
const curryAdd = curry(add)
const sum = curryAdd(1)(2)(3)(4)
console.log('sum', sum)