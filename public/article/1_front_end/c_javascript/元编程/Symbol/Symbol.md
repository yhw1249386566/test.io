# 术语

- Symbol.xxx: 将返回 `Symbol(Symbol.xxx)` 的称之为静态属性

  如: `Symbol.iterator`, `Symbol.toPrimitive`

- Symbol.xxx: 将返回 `ƒ xxx() { [native code] }` 的称之为静态方法
  如: `Symbol.for`, `Symbol.keyFor`

- Symbol 函数

  是一个函数, 但是不能 `new`.

# 概念

一个元编程中关于反射的概念, Symbol 是一个**已经实现**了的反射

> - [`Symbols  `](https://juejin.cn/post/6844903511960846350) 是 **实现了的反射（Reflection within implementation）**—— 你将 Symbols 应用到你已有的类和对象上去改变它们的行为。
> - [`Reflect `](https://juejin.cn/post/6844903511960846343) 是 **通过自省（introspection）实现反射（Reflection through introspection）** —— 通常用来探索非常底层的代码信息。
> - [`Proxy `](https://juejin.cn/post/6844903512157978631) 是 **通过调解（intercession）实现反射（Reflection through intercession）** —— 包裹对象并通过自陷（trap）来拦截对象行为。
>

即: 通过 Symbol, 允许你改变应用程序的内部工作机制.

在 JavaScript 中, 可以通过 Symbol 提供的静态属性改变对象的一些默认行为.

# 作用

创造唯一的 symbol 值, 此值能作为对象属性的标识符；

**这是 Symbol 数据类型仅有的目的.**

Symbol 内置的静态属性也是一个 Symbol 标识: 通过 Symbol.XXX 将它写作对象的 key, 就可以改变对象对应的默认行为.

Symbol 内置的静态方法则是用来注册[全局 Symbol 标识](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol#%E5%85%A8%E5%B1%80%E5%85%B1%E4%BA%AB%E7%9A%84_symbol).

# [Symbol 的内置属性-ECMA](https://262.ecma-international.org/11.0/#sec-well-known-symbols) | [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol#%E5%B1%9E%E6%80%A7)  

## 自定义数组迭代器	

```js
const myArray = [1, 2, 3];

// 使用 `for of` 的实现
for (let value of myArray) {
  console.log(value);
}

/** 没有 `for of` 的实现 */
// 获取数组本身实现的 [Symbol.iterator] 方法
const _myArray = myArray[Symbol.iterator]();
let _iteration = null;

while ((_iteration = _myArray.next()) && !_iteration.done) {
  const value = _iteration.value;
  console.log(value); // 1 2 3
}
```

## 自定义 String.prototype.match 行为

```js
class MyMatcher {
  constructor(value) {
    this.value = value;
  }
  
  // 参数 string: 哪个字符串调用 Symbol.match, 指的就是哪个值
  [Symbol.match](string) {
    var index = string.indexOf(this.value);
    if (index === -1) {
      return null;
    }
    return [this.value, "yomua"];
  }
}
var fooMatcher = "foobar".match(new MyMatcher("foo"));
var barMatcher = "foobar".match(new MyMatcher("bar"));
console.log(fooMatcher); // ['foo', 'yomua']
console.log(barMatcher); // ['bar', 'yomua']
```

## 自定义 JavaScript 转原始值时调用的 Symbol.toPrimitive

当 JavaScript 引擎需要将你对象转换为原始值时，`Symbol.toPrimitive` 会被用到

- 执行 `+{}`，那么 JavaScript 会调用 `object[Symbol.toPrimitive]('number');`
- 执行 `String({})` ，那么 JavaScript 会调用 `object[Symbol.toPrimive]('string')`
- 执行 `if(object)`，JavaScript 则会调用 `object[Symbol.toPrimitive]('default')`

```js
class OverToPrimitive {
  [Symbol.toPrimitive](hint) {
    if (hint === "string") {
      return "Like, 42, man";
    } else if (hint === "number") {
      return 42;
    } else {
      // 大多数类（除了 Date）都默认返回一个数值原始值
      return 42;
    }
  }
}

var answer = new OverToPrimitive();

// 数组
console.log(+answer === 42);
console.log(Number(answer) === 42);

// 字符串
console.log(String(answer) === "Like, 42, man");

// 这里 "" + answer 时, hint 为 default
// why? 这是因为规范中，规定了对象转换为字符串的默认行为是将 hint 设置为 "default",
// String(answer) 这种显式调用 String 函数的情况，会将 hint 显式地设置为 "string"
// 这是问 chatGPT 的, 实际在规范我没有找到相关说明.
console.log("" + answer === "42"); // default
```



### Reference

- [Symbol.prototype[@@toPrimitive](hint)](https://262.ecma-international.org/11.0/#sec-symbol.prototype-@@toprimitive) 


# Symbol 值转为对象

我们知道, 实际上, Symbol 函数创建的值, 是一个带有描述的 Symbol 值, 可以通过点运算符对此值进行操作, 如:

- `Symbol(1).description` => 返回:  `1` 
- `Symbol(1).valueOf()` => 返回: `Symbol(1)` 

虽然 `Symbol(X)` 返回一个带有描述的 Symbol 值: `Symbol(X)`, 并不是一个明确的对 (使用 `console.log(Symbol(1)` 时, 不会输出一个对象, 而是输出 Symbol 值), 

但是我们可以显示地将它转为对象:

- `Object(Symbol(1))`

  返回 Symbol 对象: 

  ```js
  {
    Symbol(1), 
    description: '1', 
    [[Prototype]]: Symbol,
    [[PrimitiveValue]]: Symbol(1)
  }
  ```

  ​

# FAQ

## 为什么要加中括号 -> [Symbol.XXX]

给对象的 key 加中括号表示: 使得中括号里面的语句成为一个表达式.

```js
class OverToPrimitive {
  // 加中括号, 用来获取标识符: 得到唯一值 - toPrimitive
  // => 会得到: Symbol(Symbol.toPrimitive)
  [Symbol.toPrimitive](hint) {}
}
```

因为对于 Symbol 构建的值来说, 即使是相同的描述, 也是不一样的, 如:

```js
Symbol(1) !== Symbol(1) // true
```

这是因为, 实际上 `Symbol(xxx)` 返回的是一个[带有`描述 xxx` 的 Symbol 对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol).

- 描述 xxx: 通过 `symbol.description` 即可以获取, 如:

  `Symbol(1).description` -> 得到描述: `1 ` 

所以, Symbol 才提供了[内置的属性 `Symbol.XXX`](https://262.ecma-international.org/11.0/#sec-well-known-symbols), 来允许我们通过这些属性得到 Symbol 标识, 从而将这些标识作为对象的 key, 用来覆盖对象中的原本的内置功能.

# Reference

- [掘金: 元编程 - Symbol](https://juejin.cn/post/6844903511960846350#heading-0) 
- [MDN - Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 