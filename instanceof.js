function myInstanceOf(left, right) {
  /* if (left === null || typeof left !== 'object') return false

  while (!left) {
    left = left.__proto__
    const flag = left === right.prototype
    if (flag) return true
  }
  return false */

  if (left === null || typeof left !== 'object') return false
  const proto = left.__proto__ // Object.getPrototypeOf(left)
  while (proto) {
    if (proto === right.prototype) return true
    proto = proto.__proto__ // Object.getPrototypeOf(proto)
  }
}

const obj = {}
console.log('typeof {}', typeof {})
console.log(myInstanceOf(obj, Object)) // true
console.log(obj instanceof Object)

