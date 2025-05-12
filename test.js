function Foo() {
  this.a = 1;
  return {
    a: 4,
    b: 5,
  };
}
Foo.prototype.a = 6;
Foo.prototype.b = 7;
Foo.prototype.c = 8;

var o = new Foo();

console.log(o.a);
console.log(o.b);
console.log(o.c);
console.log('Foo.prototype', Foo.prototype)
console.log('o.__proto__', o.__proto__, o.__proto__ === Foo.prototype)
