var myObj1={
    foo:4,
    set bar(value){
        return this.foo = value
    }
}
var myReObj1 = {
    foo: 0
}
Reflect.set(myObj1,'bar',1,myReObj1)
console.log(myObj1.foo,myReObj1.foo);

let p = {
    a: 'a'
}

let handl1 = {
    set(target,key,value,receiver){
        console.log('set');
        Reflect.set(target,key,value,receiver)
    },
    defineProperty(target,key,attribute){
        console.log('defineProperty');
        Reflect.defineProperty(target,key,attribute)
    }
}
let myObj2 = new Proxy(p,handl1)
myObj2.a = 'A'



















