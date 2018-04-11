// Object.keys()，Object.values()，Object.entries()
const proto = {
    foo: 'hello'
}

const obj1 = {
    foo: 'world',
    find() {
        return super.foo
    }
}

Object.setPrototypeOf(obj1, proto)
console.log('obj1',obj1.find())


var obj2 = {
    foo: 'bar',
    baz: 42
}
console.log('obj2 keys', Object.keys(obj2))

let {keys, values, entries} = Object;
var obj3 = {
    a: 1,
    b: 2,
    c: 3
}
for(let key of keys(obj3)) {
    console.log('obj3 key',key)
}
for(let value of values(obj3)) {
    console.log('obj3 value',value)
}
for (let [key, value] of entries(obj3)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

console.log('obj2 values', Object.values(obj2))
const obj4 = Object.create({},{p:{value: 42}})
console.log('obj4 values',Object.values(obj4))
// enumerable 可遍历
const obj5 = Object.create({},{p:{value: 42,enumerable: true}})
console.log('obj5 values',Object.values(obj5))

const obj6 = { one: 1, two: 2 };
for(let [k,v] of Object.entries(obj6)) {
    console.log(k,v,`${JSON.stringify(k)}: ${JSON.stringify(v)}`)
}

const map = new Map(Object.entries(obj6))
console.log(map)










