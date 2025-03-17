const deepClone = (obj, hash = new WeakMap()) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (hash.has(obj)) return hash.get(obj);

  const type = Object.prototype.toString.call(obj)
  let cloned

  switch (type) {
    case '[object Array]':
    case '[object Object]':
      cloned = new obj.constructor()
      console.log('keys ', Reflect.ownKeys(obj))
      hash.set(obj, cloned);
      for (const key of Reflect.ownKeys(obj)) {
        cloned[key] = deepClone(obj[key], hash)
      }
      // Reflect.ownKeys(obj).forEach(key => {
      //   cloned[key] = deepClone(obj[key], hash);
      // });
      break;

    case '[object Date]':
    case '[object RegExp]':
      cloned = new obj.constructor(obj)
      break;

    case '[object Map]':
      cloned = new Map()
      for (const key of obj.keys()) {
        cloned.set(key, deepClone(obj.get(key), hash))
      }
      break;

    case '[object Set]':
      cloned = new Set()
      for (const key of obj.keys()) {
        cloned.add(key, deepClone(obj.get(key), hash))
      }
      break;

    default:
      return obj
  }

  hash.set(obj, cloned)

  return cloned
}

const original = {
  a: 1,
  b: [2, { c: 3 }],
  d: new Date(),
  e: /regex/,
  f: new Map([['key', 'value']]),
  self: null
};
original.self = original; // 循环引用

const cloned = deepClone(original);
console.log('cloned: ', cloned)

// 修改拷贝后的对象
cloned.b.push(4);
console.log(original.b); // [2, { c: 3 }]（未受影响）
console.log(original.e === cloned.e)