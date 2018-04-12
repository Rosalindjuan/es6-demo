/**
 * 用于改变某些操作的默认行为，等同于在语言层面做出修改，属于一种元编程 即对编程语言进行编程
 * proxy在目标对象的外层搭建了一层拦截，外界对目标对象的某些操作必须通过这层拦截
 */


var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`)
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver)
    }
})

console.log(obj)

var prox1 = new Proxy({}, {
    get: function (target, property) {
        return 35
    }
})
console.log(prox1.time, prox1.name, prox1.title);


var target = {}
var handler = {
    get: function (target, name) {
        console.log(name);
        if (name === 'prototype') {
            return Object.prototype
        }
        return 'Hello, ' + name
    },
    apply: function (target, thisBinding, args) {
        console.log('apply', thisBinding, args);
        return args[0]
    },
    construct: function (target, args) {
        console.log('construct', args);
        return {value: args[1]}
    }
}
var pro2 = new Proxy(function (x, y) {
    return x + y
}, handler)


console.log('代理：');
console.log('sdsd', pro2(1, 2), new pro2(1, 2));
console.log(pro2.prototype === Object.prototype);
console.log(pro2.foo === 'Hello, foo');


var person = {
    name: 'zhangjuan'
}

var pro3 = new Proxy(person, {
    get: function (target, property) {
        if (property in target) {
            return target[property]
        } else {
            // throw new ReferenceError("Property \"" + property + "\" does not exist.")
        }
    }
})
console.log(pro3.name, pro3.age);


// get 可继承
let pro4 = new Proxy({}, {
    get(target, propertyKey, receiver) {
        console.log('get ' + propertyKey);
        return target[propertyKey]
    }
})
let obj1 = Object.create(pro4)
console.log(obj1.foo);


// 使用get拦截，实现数组读取负数的索引。
function createArray(...elements) {
    let handler = {
        get(target, propKey, receiver) {
            let index = Number(propKey)
            if (index < 0) {
                propKey = String(target.length + index)
            }
            return Reflect.get(target, propKey, receiver)
        }
    }

    let target = [];
    target.push(...elements);
    return new Proxy(target, handler)
}

let arr = createArray('a', 'b', 'c')
console.log(arr[-1]);


var pipe = (function () {
    return function (value) {
        var funStack = []
        var oproxy = new Proxy({}, {
            get: function (pipeObject, fnName) {
                if (fnName === 'get') {
                    return funStack.reduce(function (val, fn) {
                        return fn(val)
                    }, value)
                }
                funStack.push(window[fnName])
                return oproxy
            }
        })
        return oproxy
    }
}())

var double = n => n * 2
var pow = n => n * n
var reverseInt = n => n.toString().split('').reverse().join('') | 0
console.log(pipe(3).double.pow.reverseInt.get);


const dom = new Proxy({}, {
    get(target, property) {
        console.log(22222, property);
        return function (attrs = {}, ...children) {
            // console.log(11, attrs, '1111111111111', children);
            const el = document.createElement(property)
            for (const prop of Object.keys(attrs)) {
                el.setAttribute(prop, attrs[prop])
            }
            for (let child of children) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child)
                }
                // console.log('child', child);
                el.appendChild(child)
            }
            console.log('el', el);
            return el
        }
    }
})

const el = dom.div({},
    'Hello, my name is ',

    dom.a(
        {href: '//example.com'},
        'Mark',
        '张娟'
    ),
    '. I like:',
    dom.ul({},
        dom.li({}, 'The web'),
        dom.li({}, 'Food'),
        dom.li({}, '…actually that\'s it')
    )
);

document.body.appendChild(el)

// get方法的第三个参数receiver，总是为当前的 Proxy 实例
const pro5 = new Proxy({}, {
    get: function (target, property, receiver) {
        return receiver
    }
})
console.log(pro5.getReceiver === pro5)  // true


// 如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错。
var obj2 = {}
Object.defineProperties(obj2, {
    foo: {
        value: '123',
        writable: false,
        configurable: true
    }
})
const handl = {
    // get(target, propKey) {
    //     return 'abc'
    // },
    set(obj, key, value, receiver) {
        obj[key] = 'barrrrr'
    }
}
const pro6 = new Proxy(obj2, handl)
pro6.foo = 'bar'
console.log('configurable writable', pro6.foo);


// set 可接受4个参数 目标对象，属性名，属性值，实例对象
let validator = {
    set: function (obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new ReferenceError('The age is not an integer')
            }
            if (value > 200) {
                throw new ReferenceError('the age seems invalid')
            }
            obj[prop] = value
        }
    }
}
let p1 = new Proxy({}, validator)
p1.age = 100
console.log(p1.age);
// p1.age = 12.3
// p1.age = '12.3'
// p1.age = 201
// console.log(p1.age);

// 只要读写的属性名的第一个字符是下划线，一律抛错，从而达到禁止读写内部属性的目的。
function invariant(key, action) {
    // console.log(key);
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`)
    }
}

const handl2 = {
    get(target, key) {
        invariant(key, 'get')
        return target[key]
    },
    set(target, key, value) {
        invariant(key, 'set')
        target[key] = value
        return true
    }
}
const tar2 = {}
const pro7 = new Proxy(tar2, handl2)
// console.log(pro7._prop);
// pro7._prop = 'c'


/**
 * apply
 * apply()拦截函数的调用、call和apply操作
 * 可接受三个参数 目标对象，目标对象的上下文对象（this）和目标对象的参数数组
 */

var tar3 = function () {
    return 'I am the target'
}
var handl3 = {
    apply(target, ctx, args) {
        return 'I am the proxy'
    }
}
var p2 = new Proxy(tar3, handl3)
console.log(p2());

var handl4 = {
    apply(target, ctx, args) {
        return Reflect.apply(...arguments) * 2
    }
}

function sum(left, right) {
    return left + right
}

var p3 = new Proxy(sum, handl4)
console.log(p3(1, 2), p3.call(null, 5, 6), p3.apply(null, [7, 8]));

/**
 * has
 * 用来拦截HasProperty操作
 */

// 如果原对象的属性名的第一个字符是下划线，proxy.has就会返回false，从而不会被in运算符发现。
var handl5 = {
    has(target, key) {
        if (key[0] === '_') {
            return false
        }
        return key in target
    }
}

var tar4 = {
    _prop: 'foo',
    prop: 'foo'
}
var p4 = new Proxy(tar4, handl5)
console.log('_prop' in p4, 'prop' in p4, 'a' in p4);

// 如果原对象不可配置或者禁止扩展，这时has拦截会报错。
var obj = {a: 10}
Object.preventExtensions(obj)
var p5 = new Proxy(obj, {
    has: function (target, prop) {
        return false
    }
})
// console.log('a' in p5);

let stu1 = {name: '张三', score: 59};
let stu2 = {name: '李四', score: 99};

let handl6 = {
    has(target, prop) {
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name} 不及格`);
            return false;
        }
        return prop in target;
    }
}
// has拦截只对in运算符生效，对for...in循环不生效，导致不符合要求的属性没有被排除在for...in循环之外
let oproxy1 = new Proxy(stu1, handl6);
let oproxy2 = new Proxy(stu2, handl6);
console.log('score' in oproxy1);
console.log('score' in oproxy2);
for (let a in oproxy1) {
    console.log(oproxy1[a]);
}



/**
 * construct()
 * construct方法用于拦截new 命令
 */
// construct 有两个参数 target：目标对象  args：构建函数的参数对象
// construct方法返回的必须是一个对象，否则会报错
var p6 = new Proxy(function () {
}, {
    construct: function (target, args) {
        console.log('called:' + args.join(', '));
        return {value: args[0] * 10}
        // return args[0]*10
    }
})

console.log((new p6(1)).value);

/**
 * deleteProperty()
 * 用于拦截delete操作
 */
var handl7 = {
    deleteProperty(target, key) {
        invariant(key, 'delete')
        return true
    }
}
var tar7 = {
    _prop: 'foo'
}
// deleteProperty方法拦截了delete操作符，删除第一个字符为下划线的属性会报错。
// 注意，目标对象自身的不可配置（configurable）的属性，不能被deleteProperty方法删除，否则报错。
var p7 = new Proxy(tar7, handl7)
console.log(delete p7._prop);

/**
 * defineProperty()
 * defineProperty方法拦截了Object.defineProperty操作
 */










