const deepClone = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  const isArray = Array.isArray(obj)

  let cloneResult = isArray ? [] : {}

  if (isArray) {
    for (const item of obj) {
      cloneResult.push(deepClone(item))
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        cloneResult[key] =  deepClone(element)
      }
    }
  }

  return cloneResult
}

const obj = { name: 'sihuanian', hobbies: [{ name: 'coding' }, { name: 'music' }] }
const cloneObj = deepClone(obj)
console.log('cloneObj: ', cloneObj)
console.log('cloneObj: ', cloneObj === obj)
console.log('cloneObj: ', cloneObj.hobbies === obj.hobbies)
console.log('cloneObj: ', cloneObj.hobbies[1] === obj.hobbies[1])

function deepClone1(obj, hash = new WeakMap()) {
  // 处理非对象或 null
  if (obj === null || typeof obj !== 'object') return obj;

  // 处理循环引用
  if (hash.has(obj)) return hash.get(obj);

  // 处理特殊对象类型
  const type = Object.prototype.toString.call(obj);
  let clone;

  switch (type) {
    case '[object Date]':
      clone = new Date(obj);
      break;
    case '[object RegExp]':
      clone = new RegExp(obj);
      break;
    case '[object Map]':
      clone = new Map();
      obj.forEach((value, key) => clone.set(key, deepClone1(value, hash)));
      break;
    case '[object Set]':
      clone = new Set();
      obj.forEach(value => clone.add(deepClone1(value, hash)));
      break;
    case '[object Array]':
    case '[object Object]':
      clone = new obj.constructor();
      hash.set(obj, clone); // 避免循环引用
      Reflect.ownKeys(obj).forEach(key => {
        clone[key] = deepClone1(obj[key], hash);
      });
      break;
    default:
      // 其他特殊类型（如Error、Function）直接返回
      return obj;
  }

  hash.set(obj, clone);
  return clone;
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

const cloned = deepClone1(original);

// 修改拷贝后的对象
cloned.b.push(4);
console.log(original.b); // [2, { c: 3 }]（未受影响）
console.log(original.e === cloned.e)