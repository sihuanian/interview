const obj = {}

function add(a, b) {
  return a + b
}

function Person(name, age) {
  this.name = name
  this.age = age
}

const p = new Person('Leo', 27)

const arr = []

const condition1 = obj.__proto__ === Object.prototype // true
const condition2 = obj.__proto__.__proto__ === null // true
const condition3 = add.__proto__ === Function.prototype // true
const condition4 = add.__proto__.__proto__ === Object.prototype // true
const condition5 = p.__proto__ === Person.prototype // true
const condition6 = p.__proto__.__proto__ === Object.prototype // true
const condition7 = Object.__proto__ === Function.prototype // true
const condition8 = arr.__proto__ === Array.prototype // true
const condition9 = arr.__proto__.__proto__ === Object.prototype // true
const condition10 = Person.__proto__ === Object.__proto__ // true

console.log({ condition1, condition2, condition3, condition4, condition5, condition6, condition7, condition8, condition9, condition10 })
