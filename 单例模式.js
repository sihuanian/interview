class Singleton {
  constructor(data) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = data;
    Singleton.instance = this;
  }

  static getInstance(data) {
    if (!this.instance) {
      this.instance = new Singleton(data);
    }
    return this.instance;
  }
}

// 使用示例
const s1 = new Singleton('first');
const s2 = new Singleton('second');
console.log(s1 === s2); // true
console.log(s1.data); // 'first'
console.log(s2.data); // 'first' (不会被'second'覆盖)
const instance = Singleton.getInstance('third')
console.log('instance', instance)
