# 什么是 Reflect？

Reflect 是元编程的一类.

> Symbols 是 **实现了的反射（Reflection within implementation）**—— 你将 Symbols 应用到你已有的类和对象上去改变它们的行为。
>
> **Reflect** 是 **通过自省（introspection）实现反射（Reflection through introspection）** —— 通常用来探索非常底层的代码信息。
>
> Proxy 是 **通过调解（intercession）实现反射（Reflection through intercession）** —— 包裹对象并通过自陷（trap）来拦截对象行为。

Reflect 是 ES6 为了操作对象而设计出的新 API，而之所以设计 `Reflect`，详见：<a href='#Reflect 的设计目的'>Reflect 的设计目的</a> 

TIP: Reflect 不是一个函数, 只是一个对象.

```js
Reflect(); // Uncaught TypeError: Reflect is not a function
Reflect.__proto__ ; // 得到一个对象
```



# Reflect 的设计目的

## 拥有更好的语义化

比如: `Reflect.defineProperty` 和 `Object.defineProperty` 

相较于 `Object.defineProperty`，`Reflect.defineProperty` 要更加适合Obejct.* 暗示了它是作用在对象字面量上（毕竟 Object 是对象字面量的构造函数）

## 将 Object 属于语言内部的方法放到 Reflect 上

现阶段，某些方法同时在 `Object` 和 `Reflect` 对象上部署，未来的新方法将只部署在 `Reflect` 对象上。

也就是说，从 `Reflect` 对象上可以拿到语言内部的方法。

目的: 语义化

## 修改某些 Object 方法返回的结果，使其变得更加合理

修改某些 `Object` 方法的返回结果，让其变得更合理。

比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出一个错误，

而`Reflect.defineProperty(obj, name, desc)` 则会返回 `false`

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes); // success
} catch (e) {}  // failure
// 新写法
if (Reflect.defineProperty(target, property, attributes)) {  // success
} else {} // failure
```

## 让 Object 操作都变成函数行为

某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]`，

而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。

```javascript
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true
```

## 使得 Proxy 可以和 Reflect  “联动”

即：`Reflect` 对象上存在和 `Proxy` 对象上一一对应的方法，

只要是  `Proxy ` 对象的方法，就能在 `Reflect` 对象上找到对应的方法。

正是由于此机制，不论 `Proxy`  如何修改自身的默认方法的行为，都可以在方法中调用 `Reflect` 中对应的方法，

从而使得自身的默认行为完全不变。

```typescript
const obj = {}
const handler = {
	set: function (target, prop, value[, receiver]) {
        // 在 target 上，设置 prop 属性，其值为 value[,如果遇到 setter，this 将提供给目标调用。]
    	const sucess:Boolean = Reflect.set(target, prop, value, receiver)
        if (sucess) console.log(`成功为 target 设置 ${prop} 属性，对应值为：${value}`)
		return sucess;
	}
}
const proxy = new Proxy(obj,proxy)
proxy.name = 'yomua';
console.log(proxy.name); // yomua
console.log(obj.name); // yomua
```

在上面代码，`Proxy` 方法拦截 `target` 对象的属性赋值行为。

在拦截时（set [伪属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set)中），采用 `Reflect.set` 方法将值赋值给对象的属性，

确保完成原有的行为（为被代理对象定义属性和设置其值），然后再部署额外的功能。

让我们看看更多的例子：

```ts
var loggedObj = new Proxy(obj, {
  get(target, name) {
    console.log('get', target, name);
    return Reflect.get(target, name);
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
  has(target, name) {
    console.log('has' + name);
    return Reflect.has(target, name);
  }
});
```

上面代码中，`Proxy` 对象的拦截操作（`get`、`delete`、`has`），内部都调用对应的 `Reflect` 方法，

保证原生行为能够正常执行。而添加的额外工作，就是将每一个操作输出一行日志，当然你还可以做一些其他的。

以及以下原因：

1. Reflect 提供的所有静态方法和 Proxy 第 2 个 handle 参数方法是一模一样的。具体见后面的对比描述。
2. Proxy get/set() 方法需要的返回值正是Reflect的 get/set 方法的返回值，可以天然配合使用，比直接对象赋值/获取值要更方便和准确。
3. receiver 参数具有不可替代性。

# [Reflect 对象的静态方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect#%E9%9D%99%E6%80%81%E6%96%B9%E6%B3%95) 

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

# Reference

- [张鑫旭](https://www.zhangxinxu.com/wordpress/2021/07/js-proxy-reflect/) 
- [掘金: 元编程 - Reflect](https://juejin.cn/post/6844903511960846343#heading-3) 
- [MDN - Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect) 
- [ECMA 262 - Reflect](https://262.ecma-international.org/11.0/#sec-reflect-object) 













































