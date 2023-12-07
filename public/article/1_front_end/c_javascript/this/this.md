# [this](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)

## preface

 我们知道，在 JavaScript 中，this 一直是值得让人诟病的一点，它太灵活了，如果你不了解 this 的其中门道，你就会很有可能陷入 ”xxx is not defined" 或者是 “xxx" is not a function，诸如此类的问题。

所以，让我们来了解一下 this 吧。

## The Core Primitive

首先，若存在一个函数，我们使用 ”Primitive“（原语）的方式去调用它，则应该会是以下形式：

```js
function hello(thing) {
  console.log(this + " says hello " + thing);
}

hello.call("Yomua", "world"); //=> Yomua says hello world
```

> 在 ES5 的规范中，call 方法由更为底层的 primitive 描述，*but it's a very thin wrapper on top of that primitive, so I'm simplifying a bit here. See the end of this post for more information.*
>
> reference：[传送门](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)

注：call()、apply()、bind() 方法的第一个参数都接收的是 thisArg，但这个 thisArg 可以是任何类型的值，并不局限于某个实例或对象，可以是字符串、数组等，参见：[apply/call/bind](apply/call/bind)

## 在严格和非严格模式中的 parens 语法

当然，如果每次调用一个函数就要调用 call()，并为之传递 thisArg 和可选参数列表是很麻烦的事情，所以 ES 规范允许我们使用 parens 语法去调用函数，下面让我们来试试吧：

```js
function hello(thing) {
  console.log(this + thing);
}

// parens syntax:
hello("world");// [object Window]world

// 相当于以下语法：

// desugars to:（不使用语法糖： praens 语法）
hello.call(window, "world"); // [object Window]world
```

当使用严格模式（`'use strict'`）时，parens 语法中的 this 将指向 undefined，如：

```js
'use strict'

hello("world"); // undefinedworld

// 相当于

// desuagars to：
hello.call(undefined, "world"); // // undefinedworld
```

在严格模式中，即使使用内联声明，其 this 也指向 undefined：

```js
(function(){})() 
// 相当于：
(function(){}).call(window[ES5-strict:undefined])
```



## Member Functions

在 <a href="#在严格和非严格模式中的 parens 语法">在严格和非严格模式中的 parens 语法</a> 一节中，我们只提到了一个普通的 JS 函数如果在进行调用时，它的 primitive 会是什么样子，它里面的 this 又会是什么。

现在，我们来讲讲，当一个函数是某个对象的成员时，它的 primitive 和里面的 this 又分别是什么。

```js
var person = {
  name: "Yomua",
  hello: function(thing) {
    console.log(this); // {name: "Yomua", hello: ƒ}
  }
}

// parens syntax:
person.hello();
// primitive:
person.hello.call(person, "world");
```

以上例子中，我们调用了 person 对象中的 propFunc:hello，很显然，我们两次获取到的 this 都指向 person 对象，这并没有什么。

那如果我们尝试的将 person.hello() 独立出来，会发生什么呢：

```js
    var person = {
        name: "Yomua",
        hello: function (thing) {
            console.log(this)
        }
    }
    person.hello(); // {name: "Yomua", hello: ƒ}
    let hello = person.hello
    // parens syntax:
    hello() // window
	// primitive:
    hello.call(windowp[ES5-strict:undefined]) // window
```

是的，你会发现：hello() 函数在非严格模式中的 this 指向 window 对象，在严格模式中将指向 undefined，那么这是为什么呢？

这是因为：函数没有 this 的“持久”概念，也就是说，函数中的 this 指向取决于调用函数时，函数所处的 context（上下文），也就是我们常讲的：this 总是指向调用它的对象，这个“它”就指的是 context.

但是有时候开发者就需要使得一个函数具有 "this" 的持久概念，那么该怎么做呢？请继续往下看。

## 一个由开发者包装的 bind()

在还不存在 Function.prototype.bind() 之前，开发者通常使用以下方法来对自己的函数进行 this 的持久化：

```js
// 创建一个 bind()
var bind = function(func, thisArg) {
  return function() {
    return func.apply(thisArg, arguments);
  }
}

var person = {
  name: "Yomua",
  hello: function(thing,lastName) {
    console.log(lastName)
    console.log(this.name + " says hello " + thing);
  }
}

var boundHello = bind(person.hello, person);
boundHello("world",'Y') 
/**
 * Y
 * "Yomua says hello world" 
 */
```

- ***var bind = function(func, thisArg) {}***

  创建一个 bind()，接收一个函数和 thisArg，当开发者调用 bind() 时，会返回给开发者另一个新函数（可以认为原函数的拷贝）

  这个新函数的 this 将指向你调用 bind() 时向它传入的 thisArg，同时你可以向该新函数传入参数列表，它会负责把你传入的参入列表传入【使用你指定的 this 进行调用的函数】，并去使得程序执行一遍。

- ***arguments***

  `arguments` 是一个对应于传递给函数的参数的类数组对象。

  `arguments` 对象是所有（非箭头）函数中都可用的**局部变量**，你可以使用 `arguments` 对象在函数中引用函数的参数。

  此对象包含传递给函数的每个参数，第一个参数在索引0处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

  `arguments[0]、arguments[1]、arguments[2]`。

  且参数也可以被设置：`arguments[1] = 'new value';`

  `arguments`对象不是一个 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 。它类似于`Array`，但除了length属性和索引元素之外没有任何`Array`属性。

  

这是一个非常常见的解决方法，所以在 ES5 中，制定者规范了这种行为，并为之添加了一个语法糖：Function.prototype.bind()

## Function.prototype.bind()

有关 bind() 参见：[gitee-privatenotes](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/apply%E5%92%8Ccall%E5%92%8Cbind/apply%E5%92%8Ccall%E5%92%8Cbind.md)

我们将 <a href='#一个由开发者包装的 bind()'>一个由开发者包装的 bind()</a> 节中的示例使用 Function.prototype.bind() 重写：

```js
/**
var bind = function(func, thisArg) {
  return function() {
    return func.apply(thisArg, arguments);
  }
}
var boundHello = bind(person.hello, person);
*/
	var person = {
        name: "Yomua",
        hello: function (thing, lastName) {
            console.log(lastName)
            console.log(this.name + " says jshello " + thing);
        }
    }
    var boundHello = person.hello.bind(person)
```

这一切都并没有多大的改变，只不过 ES5 规范了 bind() 这一语法糖的行为。

> This is, of course, somewhat clunky, and TC39 (the committee that works on the next version(s) of ECMAScript) continues to work on a more elegant, still-backwards-compatible solution.

## 箭头函数的 this

箭头函数的 this 和它所在的 context 的 this 一样，如：

```js
    var person = {
        name: "Yomua",
        hello: function (thing, lastName) {
            console.log(this)
        },
        h: () => { console.log(this) }
    }

    person.hello(); // person 对象
    person.h(); // window 对象
```



## Reference

- [Understanding JavaScript Function Invocation and "this"](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/)



