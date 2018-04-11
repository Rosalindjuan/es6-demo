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










