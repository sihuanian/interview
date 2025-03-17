// 原型链继承
/* function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log('eat')
}

function Dog(gender) {
  this.gender = gender;
}
Dog.prototype = new Animal('旺财');
Dog.prototype.say = function() {
  console.log('汪汪汪')
}
const wangcai = new Dog('male');

wangcai.eat(); // eat
wangcai.say(); // 汪汪汪 */

// 构造函数继承
// function Animal(name) {
//   this.name = name;
// }

// Animal.prototype.eat = function() {
//   console.log('eat')
// }

// function Dog(name, gender) {
//   Animal.call(this, name); // 调用父类的构造函数
//   this.gender = gender;
// }

// Dog.prototype.say = function() {
//   console.log('汪汪汪')
// }

// const wangcai = new Dog('旺财', 'male');

// // wangcai.eat(); // 无法继承原型链上的方法 wangcai.eat is not a function
// wangcai.say(); // 汪汪汪 */

// 组合继承
/* function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log('eat')
}

function Dog(name, gender) {
  Animal.call(this, name); // 调用父类的构造函数
  this.gender = gender;
}
Dog.prototype = new Animal(); // 继承父类的原型链
Dog.prototype.constructor = Dog; // 修正 constructor

Dog.prototype.say = function () {
  console.log('汪汪汪')
}

const wangcai = new Dog('旺财', 'male');

wangcai.eat(); // eat
wangcai.say(); // 汪汪汪 */

// 寄生组合继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log('eat')
}

function inherit(child, parent) {
  const prototype = Object.create(parent.prototype); // 创建一个新对象，作为子类的原型
  prototype.constructor = child; // 修正 constructor
  child.prototype = prototype; // 修正原型链
}

function Dog(name, gender) {
  Animal.call(this, name); // 调用父类的构造函数
  this.gender = gender;
}
inherit(Dog, Animal); // 继承父类的原型链
Dog.prototype.say = function () {
  console.log('汪汪汪')
}



/* function Parent() {
  this.name = 'parent';
}

Parent.prototype.eat = function () {
  console.log('eat')
}

function inheritPrototype(child, parent) {
  const prototype = Object.create(parent.prototype); // 创建父类原型的副本
  prototype.constructor = child;
  child.prototype = prototype;
}

function Child(name, gender) { Parent.call(this, name); this.gender = gender; }
inheritPrototype(Child, Parent);

Child.prototype.say = function () {
  console.log('Hi')
} */

const wangcai = new Dog('旺财', 'male');

console.log(wangcai.name); // parent
console.log(wangcai.gender); // male
wangcai.eat();
wangcai.say();

