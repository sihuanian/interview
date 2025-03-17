function myBind(obj, fn, ...args) {
    return function() {
        fn.apply(obj, [...args])
    }
}


function greet(greeting, punctuation) {
    console.log(greeting + ', ' + this.name + punctuation);
}

const person = { name: 'sihuanian' };

// 绑定this并预设参数
const boundGreet = myBind(person, greet, 'Hello';

// 调用时补充剩余参数
boundGreet('!'); // 输出: "Hello, sihuanian!"
