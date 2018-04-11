console.log(...[1, 2, 3]
)
console.log(1,...[2, 3, 4], 5
)

function push(array,

...
items
)
{
    array.push(...items
)

}

function add(x, y) {
    return x + y
}

const numbers = [4, 38]
console.log(add(...numbers)
)

function f(a, b, c, d, e, f) {
    console.log(a + b + c + d + e + f)
}


const args = [0, 1]
f(-1,...args, 2,
...
[3, 4]
)

console.log(Math.max.apply(null, [14, 3, 77]));
console.log(Math.max(...[14, 3, 77])
)
;
console.log(Math.max(14, 3, 77));


// 复制数组
const a1 = [1, 2]
const a2 = a1
a2[0] = 3
console.log(a1); // [3,2]
// 上面代码中，a2并不是a1的克隆，而是指向同一份数据的另一个指针。修改a2，会直接导致a1的变化。

const a3 = [1, 2]
const a4 = a3.concat()
a4[0] = 4
console.log(a3, a4);
// 上面代码中，a1会返回原数组的克隆，再修改a2就不会对a1产生影响。

// 合并数组
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
])
console.log('map', [...map.keys()
],
[...map.values()
])
const go = function* () {
    yield 1;
    yield 2;
    yield 3;
}
console.log([...go()
])


let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

var arr11 = [].slice.call(arrayLike)
let arr21 = Array.from(arrayLike)

console.log('Array.from', arr11, arr21);


// 函数的name属性，返回函数名。对象方法也是函数，因此也有name属性
const person = {
    sayName() {
        console.log('hello!')
    }
}

console.log(person.sayName.name)


const obj12 = {
    get foo() {

    },
    set foo(x) {

    }
}
// console.log(obj12.foo.name) // TypeError: Cannot read property 'name' of undefined
const desc = Object.getOwnPropertyDescriptor(obj12, 'foo')
console.log(desc.get.name, desc.set.name)


// ES5 可以通过下面的代码，部署Object.is
Object.defineProperty(Object, 'is', {
    value: function (x, y) {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
        }
        return x !== x && y !== y
    },
    configurable: true,
    enumerable: false,
    writable: true
})


const target = {a: 1}
const source1 = {b: 2}
const source2 = {c: 3}
Object.assign(target, source1, source2)
// Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）
console.log(target)

const target2 = {a: 1, b: 1};
const source3 = {b: 2, c: 2};
const source4 = {c: 3};
Object.assign(target2, source3, source4)
console.log(target2)
// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性

console.log(Object.assign(2))


const obj123 = {
    method: function () {

    }
}
// Object.setPrototypeOf() 写操作
// Object.getPrototypeOf() 读操作
// Object.create() 生成操作


Object.defineProperty(Object.prototype, '__proto__', {
    get() {
        let _thisObj = Object(this);
        return Object.getPrototypeOf(_thisObj)
    },
    set(proto) {
        if (this === undefined || this === null) {
            throw new TypeError();
        }
        if (!isObject(this)) {
            return undefined
        }
        if(!isObject(proto)) {
            return undefined
        }
        let status = Reflect.setPrototypeof(this,proto)
        if(!status) {
            throw new TypeError()
        }
    }
})

function isObject(value) {
    return Object(value) === value
}

// super指向当前对象的原型对象
const proto1 = {
    foo: 'hello'
}
const obj1234 = {
    foo: 'world',
    find(){
        return super.foo;
    }
}

Object.setPrototypeOf(obj1234,proto1)
console.log('obj1234.find()',obj1234.find())

