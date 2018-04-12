const arr = [2, 3, 5, 4, 5, 2, 2]

const s = new Set()
arr.forEach(x => s.add(x));
console.log('set 成员唯一',s,[...s])

const s1 = new Set([1, 2, 3, 4, 4])
console.log('set 成员唯一',s1,[...s1],'长度', s1.size)
// 两个对象总是不相等的  两个NAN只会有一个
s1.add({})
s1.add({})
let a = NaN;
let b = NaN;
s1.add(a)
s1.add(b)
console.log('set 成员唯一',s1,[...s1],'长度', s1.size)
// 实例方法
// add delete  has clear

// 遍历
// keys()：返回键名的遍历器
// values()：返回键值的遍历器
// entries()：返回键值对的遍历器
// forEach()：使用回调函数遍历每个成员

let s2 = new Set(['red', 'green', 'blue']);
for (let item of s2.keys()){
    console.log(item)
}
// 可以省略values方法，直接用for...of循环遍历 Set
for (let item of s2){
    console.log(item)
}
console.log('set 键名遍历: ',s2.keys(),'\nset 键值遍历: ',s2.values(),'\nset 键值对遍历: ',s2.entries())
// Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
let s3 = new Set([1,4,9])
s3.forEach((value,key) => console.log(key + ": " + value))



// WeakSet
const arr1 = [[1,2],[3,4]]
const arr2 = [[3,4,5]]
const ws1 = new WeakSet(arr1)
console.log('WeakSet', ws1, )
ws1.add([5,6])
console.log('WeakSet add', ws1 )
const ws2 = new WeakSet(arr2)
console.log('WeakSet', ws2 )
// add(value)
// delete(value)
// has(value)
// WeakSet 没有size属性，没有办法遍历它的成员。


// Map
// set  将对象o当作m的一个键，然后又使用get方法读取这个键，接着使用delete方法删除了这个键。
const m = new Map();
const o = {p: 'hello'}
m.set('content',o)
m.set(o,'content')
console.log('Map m',m,m.get('content'),m.has('content'))
console.log('Map m',m,m.delete('content'),m.has('content'))

console.log('Map m',m,m.get(o),m.has(o))
console.log('Map m',m,m.delete(o),m.has(o))

const m1 = new Map([
    ['name', '张三'],
    ['title', 'Author']
])

console.log('Map m1',m1,m1.size)

const m2 = new Map()
m2.set(1,'aaa')
m2.set(1,'bbb')
// 对键1连续赋值两次，后一次的值覆盖前一次的值。

// 如果读取一个未知的键，则返回undefined
console.log('Map m2',m2.get(1),m2.get('sdfa'))
m2.set(['a'],333)
let nameA = ['a']
let nameB = ['a']
m2.set(nameA,444)
m2.set(nameB,555)
// nameA 与nameB的值是一样，但是在Map结构中被视为两个键
// Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。
console.log('map m2', m2.get(['a']), m2.get(nameA), m2.get(nameB));
// 如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，

// 属性
// 1.size
console.log(m2.size);

// 2.set 3.get(key) 4.has(key) 5.delete(key) 6. clear()
m2.set('set','value')
console.log(m2.get('set'),m2.has('set'),m2.delete('set'),m2.size ,m2.clear(),m2.size );

// 遍历方法
// keys()：返回键名的遍历器。
// values()：返回键值的遍历器。
// entries()：返回所有成员的遍历器。
// forEach()：遍历 Map 的所有成员。

const m3 = new Map([
    ['n','no'],
    ['y','yes'],
    ['F','no'],
    ['T','yes'],
])
for(let key of m3.keys()){
    console.log(key);
}
for(let value of m3.values()){
    console.log(value);
}
for(let item of m3.entries()){
    console.log(item,'key: ' + item[0],'value: ' + item[1]);
}
// or
for(let [key,value] of m3.entries()){
    console.log('key: ' + key + '   value: ' + value);
}
// Map转数组 [...map]
// 数组转Map  new Map(Array)  
const arrM = [[1,2],[{foo: 3}, ['abc']]]
console.log(new Map(arrM))

// 如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
    let obj = Object.create(null)
    for(let [k,v] of strMap){
        obj[k] = v
    }
    return obj
}

const m4 = new Map().set('yes', true).set('no',false)
console.log('Map 转 obj',strMapToObj(m4));

function objToStrMap(obj){
    let strMap = new Map()
    for(let k of Object.keys(obj)){
        strMap.set(k,obj[k])
    }
    return strMap
}
console.log('obj 转 Map',objToStrMap({yes: true, no: false}));

function strMapToJson(strMap){
    return JSON.stringify(strMapToObj(strMap));
}
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
}
console.log(strMapToJson(m4));

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
console.log(mapToArrayJson([...myMap]));

function jsonToStrMap(json){
    return objToStrMap(json)
}
console.log(jsonToStrMap({"yes": true, "no": false}));

function jsontoMap(json){
    return new Map(json)
}
console.log(jsontoMap([[true,7],[{"foo":3},["abc"]]]))


