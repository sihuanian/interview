function get(obj, path, defaultValue) {
  // 将路径统一转换为数组形式
  const pathArray = Array.isArray(path) ? path : parsePath(path);
  console.log('pathArray', pathArray)
  let current = obj;

  for (const key of pathArray) {
    // 如果当前值为 null 或 undefined，直接返回默认值
    if (current === null || current === undefined) {
      return defaultValue;
    }
    current = current[key]; // 深入下一层属性
  }

  // 最终值若为 undefined 则返回默认值，否则返回实际值
  return current === undefined ? defaultValue : current;
}

// 将字符串路径解析为数组（支持数字索引和简单路径）
function parsePath(pathStr) {
  if (typeof pathStr !== 'string') return [];

  // 处理方括号索引，如 a[0] → a.0
  const normalized = pathStr
    .replace(/\[(\d+)\]/g, '.$1') // 将 [0] 转换为 .0
    .replace(/^\./, ''); // 去除路径开头的点（如 .a.b）

  // 按点分割路径并过滤空值
  const parts = normalized.split('.').filter(Boolean);

  // 将数字字符串转换为数字类型（如 '0' → 0）
  return parts.map(p => /^\d+$/.test(p) ? parseInt(p, 10) : p);
}

const object = {
  name: 'sihuanian',
  hobbies: [
    { label: 'coding' },
    { label: 'pingpang' },
  ]
}
console.log('object.name: ', get(object, 'name'))
console.log('object.hobbies[1].label', get(object, 'hobbies[1].label'))
