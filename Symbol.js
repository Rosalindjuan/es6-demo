// 作为属性名的 Symbol

let mySymbol1 = Symbol()
// 第一种写法
let a = {}
a[mySymbol1] = 'Hello'
// 第二种写法
let b ={
    [mySymbol1]: 'Hello'
}
// 第三种写法
let c = {}
Object.defineProperty(c,mySymbol1,{value: 'Hello'})
console.log(a,b,c)

// tips:  Symbol 值作为对象属性名时，不能用点运算符。



// 属性名的遍历
// Symbol作为属性名，不会出现在for...in for...of循环中
// 也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。
// 但是它也不是私有属性，有一个Object.getOwnPropertySymbols方法，可以获取指定对象的所有 Symbol 属性名。
// eg.
const obj = {}
let aa = Symbol('aa')
let bb = Symbol('bb')
obj[aa] = 'Hello'
obj[bb] = 'world'


const objectSymbols = Object.getOwnPropertySymbols(obj)
console.log('属性名遍历', objectSymbols, Object.keys(obj),Object.getOwnPropertyNames(obj))
obj['enum'] = 2
console.log('属性名遍历 键名',Reflect.ownKeys(obj))

let size = Symbol('size')
class Collection {
    constructor(){
        this[size] = 0
    }
    add(item) {
        this[this[size]] = item
        this[size]++;
    }
    static sizeOf(instance){
        return instance[size]
    }
}
let x = new Collection();
console.log(Collection.sizeOf(x))
x.add('foo')
console.log(Collection.sizeOf(x))
console.log(Object.keys(x))
console.log(Object.getOwnPropertyNames(x))
console.log(Object.getOwnPropertySymbols(x))
console.log(Reflect.ownKeys(x))
x.add('z00')
console.log(Collection.sizeOf(x))
console.log(Object.keys(x))
console.log(Object.getOwnPropertyNames(x))
console.log(Object.getOwnPropertySymbols(x))
console.log(Reflect.ownKeys(x),x)

// Symbol.for() Symbol.keyFor()
// Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的key是否已经存在，如果不存在才会新建一个值。
let s1 = Symbol.for('foo')
let s2 = Symbol.for('foo')
console.log(s1 === s2) // true
console.log(Symbol.keyFor(s1),Symbol.keyFor(s2))

// iframe = document.createElement('iframe')
// iframe.src=String(window.location)
// document.body.appendChild(iframe)
// console.log(iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'))


// global._foo = { foo: 'world' };
// global[Symbol('foo')] = { foo: 'world' };
// const aaa = require('./mod.js')
// console.log('aaa',aaa.foo)



// Symbol.isConcatSpreadable
// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，表示该对象用于Array.prototype.concat()时，是否可以展开。
let arr1 = ['c','d']
console.log('Symbol.isConcatSpreadable',['a','b'].concat(arr1,'e'), arr1[Symbol.isConcatSpreadable])

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
console.log('Symbol.isConcatSpreadable',['a', 'b'].concat(arr2, 'e'))



class A1 extends Array {
    constructor(args){
        super(args)
        this[Symbol.isConcatSpreadable] = true
    }
}

class A2 extends Array {
    constructor(args){
        super(args)
        // this[Symbol.isConcatSpreadable] = false
    }
    
    get [Symbol.isConcatSpreadable](){
        return false;
    }
}

let a1 = new A1()
a1[0] = 3
a1[1] = 4
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
console.log([1,2].concat(a1).concat(a2))


// 对象的Symbol.species属性，指向一个构造函数。创建衍生对象时，会使用该属性
class MyArray extends Array {
    static get [Symbol.species](){
        return Array
    }
}
const aa1 = new MyArray(1,2,3)
const bb1 = aa1.map(x=>x)
const cc1 = aa1.filter(x=>x>1)
console.log('Symbol.species',bb1 instanceof Array,bb1 instanceof MyArray,cc1 instanceof MyArray)



