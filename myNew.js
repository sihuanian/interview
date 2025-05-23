/**
 * 手写new 运算符
 * @param {Function} constructor 构造函数
 * @param  {...any} args 构造函数参数
 * @returns {Object} 实例对象
 */
function myNew(constructor, ...args) {
  // 1. 创建一个新对象，并继承构造函数的原型
  const obj = Object.create(constructor.prototype);

  // 2. 执行构造函数，并将 this 绑定到新对象
  const result = constructor.apply(obj, args);

  // 3. 如果构造函数返回了一个对象，则返回该对象；否则返回新对象
  return typeof result === 'object' && result !== null ? result : obj;
}