# Preface

apply()、call()、bind() 这三个函数被调用时，第一个参数都接收的是一个 thisArg，但是请注意：不要陷入思维盲区，我们可以向这三个函数的第一个参数传递任何类型的值作为其 this，如：

```js
    let obj = {}
    function hello(thing) {
        console.log(this + " says hello " + thing);
    }
    hello.apply(obj) //=> [object Object] says hello undefined
	hello.call('yomua','hello world') //=> yomua says hello hello world
	let copyFunc = hello.bind([1,2],'hello world')
    copyFunc(); // 1,2 says hello hello world
```

注意：若当前函数是箭头函数，则此函数的 this 指向 window，若处于严格模式，则没有 this，即使使用 apply、call、bind 去显示指定 this 也是没用的。

# apply()

改变调用此方法的函数的this的指向,让函数中的this指向我们指定的对象,即第一个参数.

我们可以使用第二个参数向函数中传入一个数组/类数组对象

当指定的thisArg值为null或undefined时,那么调用apply()方法的函数中的this将会被改变成指向全局对象Window

`func.apply(thisArg, [argsArray])` 

返回值：调用有指定 this 值和参数的函数的返回结果。

即：使用指定的 this 去执行某一个调用了 apply 的函数，并且也能向调用了 apply 的函数传递参数（数组/类数组对象）。

值得一提是：使用 apply()  时：function.apply(thisArg,[arg1,arg2,arg3])，我们**向 function 传递的数组/类数组对象将被解构出来**，一 一对应的向成为 function 中的参数值，如：

```js
    let obj = {
        a: 1,
        b: 2
    }
    function getName(v1,v2) { 
        console.log(this) // {a: 1, b: 2}
        console.log(this.a) // 1
        console.log(this.b) // 2
        console.log(v1) // 66
        console.log(v2) // 77
    }

    getName.apply(obj, [66, 77]) 
/**
 * 
 */
```



# call()

该方法和apply()方法类似,唯一的区别在于,它们的第二个参数.

**call()的第二个参数是一个参数列表**,而apply()的第二个参数必须为数组/类数组对象.

`fun.call(thisArg, arg1, arg2, ...)`

**返回值为**: 使用指定的this 值和参数计算出的fun函数的返回值。

若该fun函数没有返回值,则返回 undefined。

即：使用指定的 this 去执行某一个调用了 apply 的函数，并且也能向调用了 apply 的函数传递参数（参数列表）。

# bind()

## 概念

当 bind() 被调用时，会返回一个原函数的拷贝，并且我们能指定这个拷贝函数的 this，以及参数（可选，是一个参数列表）。

若此若做，拷贝函数的 this 将永远是我们指定的 this。

## 语法

`function.bind(thisArg[,arg1[,arg2[, ...]]])`

### thisArg

调用bind()时将`this`参数传递给目标函数(创建的函数)的this的指向. 

如果使用[`new`](dfa702e50f3c5601f03e4afcda8b36c0.html)运算符构造绑定函数，则忽略该值。当使用`bind`在`setTimeout`中创建一个函数（作为回调提供）时，

作为`thisArg`传递的任何原始值都将转换为`object`。如果`bind`函数的参数列表为空，执行作用域的`this`将被视为新函数的`thisArg`。

### arg1, arg2, ...

当目标函数被调用时，预先添加到绑定函数的参数列表中的参数。

### 返回值

   返回一个原函数的拷贝，并拥有指定的**`this`**值和初始参数。

### 描述

当函数 a 调用 bind() 时会返回一个 a 函数的拷贝。

姑且当作:新的函数b,此时函数b中所有this都会指向bind()方法中的第一个参数thisArg,

且新的函数里面的代码和参数会和调用bind()方法的函数中的代码没有任何区别,除了this的指向.(因为返回的是一个原函数的拷贝，并拥有指定的**`this`**值和初始参数。)

​	[注意:](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)this将永久地被绑定到了bind的第一个参数，无论这个函数是如何被调用的。

而bind()方法若存在其他参数,则会依次的传入这个新函数b之中.

```js
	this.x = 'yomua'; // this指向window
    function a(n1,n2) {
        console.log(n1,n2)
        return this.x;
    }
   console.log(a()); //undefined undefined yomua

    let b = a.bind(window,1,2);
    console.log(b()); // 1 2 yomua
```

- ***let b = a.bind(window,1,2);***

  ​    返回一个原函数的拷贝,并让一个变量b指向此原函数的拷贝,,此时变量b等于一个匿名函数,这个匿名函数中的this指向window,且接收1,2两个实参.

  ​	所以输出 1 2 yomua.

## 作用

### 创建绑定函数

`bind()` 最简单的用法是创建一个函数，不论怎么调用，这个函数都有同样的 **`this`** 值。

JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，期望方法中的 `this` 是原来的对象（比如在回调中传入这个方法）。

如果不做特殊处理的话，一般会丢失原来的对象。基于这个函数，用原始的对象创建一个绑定函数，巧妙地解决了这个问题：

```js
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};
module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数并将bind()返回的拷贝函数赋值给它，再把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

### 偏函数

`bind()`的另一个最简单的用法是使一个函数拥有预设的初始参数。

只要将这些参数（如果有的话）作为`bind()`的参数写在`this`后面。

当bind函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置，传递给绑定函数的参数会跟在它们后面。

```js
function list() {
  return Array.prototype.slice.call(arguments);
}

function addArguments(arg1, arg2) {
    return arg1 + arg2
}

var list1 = list(1, 2, 3); // [1, 2, 3]

var result1 = addArguments(1, 2); // 3

// 创建一个函数，它拥有预设参数列表。
var leadingThirtysevenList = list.bind(null, 37);

// 创建一个函数，它拥有预设的第一个参数
var addThirtySeven = addArguments.bind(null, 37); 

var list2 = leadingThirtysevenList(); 
// [37]

var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]

var result2 = addThirtySeven(5); 
// 37 + 5 = 42 

var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 ，第二个参数被忽略
```

### 配合 setTimeout

在默认情况下，使用 [`window.setTimeout()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout) 时，`this` 关键字会指向 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)（或`global`）对象。当类的方法中需要 `this` 指向类的实例时，你可能需要显式地把 `this` 绑定到回调函数，就不会丢失该实例的引用。

```js
function LateBloomer() {
  this.petalCount = Math.ceil(Math.random() * 12) + 1;
}

// 在 1 秒钟后声明 bloom
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};

LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};

var flower = new LateBloomer();
flower.bloom();  // 一秒钟后, 调用'declare'方法
```

### 快捷调用

在你想要为一个需要特定的 **`this`** 值的函数创建一个捷径（shortcut）的时候，`bind()` 也很好用。

你可以用 [`Array.prototype.slice`](dbcc7b478d1ab61e3a70813a1f482519.html) 来将一个类似于数组的对象（array-like object）转换成一个真正的数组，就拿它来举例子吧。你可以简单地这样写：

```
var slice = Array.prototype.slice;

// ...

slice.apply(arguments);
```

用 `bind()`可以使这个过程变得简单。在下面这段代码里面，`slice` 是 [`Function.prototype`](e1754d73602f583b631634ad879aea41.html) 的 [`apply()`](9fe1ccf962bd4846a2594aab30eeff79.html) 方法的绑定函数，并且将 [`Array.prototype`](e3564bf6f1e706387b0c993c0c31e5d5.html) 的 [`slice()`](dbcc7b478d1ab61e3a70813a1f482519.html) 方法作为 **`this`** 的值。

这意味着我们压根儿用不着上面那个 `apply()`调用了。

```jss
// 与前一段代码的 "slice" 效果相同
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);

// ...

slice(arguments);
```

### Polyfill

你可以将这段代码插入到你的脚本开头，从而使你的 `bind()` 在没有内置实现支持的环境中也可以部分地使用`bind`。

```js
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
          return fToBind.apply(this instanceof fBound
                 ? this
                 : oThis,
                 // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // 当执行Function.prototype.bind()时, this为Function.prototype 
      // this.prototype(即Function.prototype.prototype)为undefined
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

上述算法和实际的实现算法还有许多其他的不同 （尽管可能还有其他不同之处，却没有那个必要去穷尽）：

- 这部分实现依赖于[`Array.prototype.slice()`](dbcc7b478d1ab61e3a70813a1f482519.html)， [`Array.prototype.concat()`](319564d05b83d3e24fd194f71eee7117.html)， [`Function.prototype.call()`](2c060b8d2a5f7f8371bc3743d6772c93.html)这些原生方法。
- 这部分实现创建的函数并没有[`caller`](78dbe46c2ee994fbbb9e74a569d67cdf.html) 以及会在 get，set或者deletion上抛出[`TypeError`](d00a68fa97e570f49e3185e301d6b56b.html)错误的 arguments 属性这两个不可改变的“毒药” 。（假如环境支持[`Object.defineProperty()`](776b458edb2eaa89e4c903f1b10cd7b4.html)， 或者实现支持[`__defineGetter__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineGetter) 和 [`__defineSetter__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineSetter) 扩展）
- 这部分实现创建的函数有 `prototype` 属性。（正确的绑定函数没有）
- 这部分实现创建的绑定函数所有的 length 属性并不是同ECMA-262标准一致的：它创建的函数的 length 是0，而在实际的实现中根据目标函数的 length 和预先指定的参数个数可能会返回非零的 length。

如果你选择使用这部分实现，**你不能依赖于那些与 ECMA-262, 5th edition 规定的行为偏离的例子。**在 `bind()` 函数被广泛支持之前，某些情况下（或者为了兼容某些特定需求对其做一些特定修改后）可以选择用这个实现作为过渡。

请访问 https://github.com/Raynos/function-bind 以查找更完整的解决方案

# FAQ

## Function.prototype.apply.call(fn, thisArg, ArrayLike)

大白话相当于:` fn.apply(thisArg, ArrayLike)`, 为什么要这么做? 

答: 防御性编程.

- TIP: 现在可以通过 Reflect.apply 解决这种防御性编程问题

  `Reflect.apply(fn, thisArg, ArrayLike)`

```js
function print(...args) {
  console.log('this:', this)
  console.log('args:', args)
}

// 由于 JavaScript 引擎会优先寻找最近匹配的代码执行,
// 所以如果调用 print.apply() 不会执行 Function.prototype.apply
// 而是执行你手动挂载到 print 的 apply
print.apply = function(){
  throw new Error('error')
}

print.apply({}, []); // error

// 输出
// this: [1, 2, 3]
// args: [4, 5, 6]
Function.prototype.apply.call(print, [1,2,3],[4,5,6])
```

解析标题这样的使用: 用 `.call` 调用 `Function.prototype.apply` 函数.

```js
function print(...args) {
  console.log('this:', this)
  console.log('args:', args)
}

// 输出
// this: [1, 2, 3]
// args: [4, 5, 6]
Function.prototype.apply.call(print, [1,2,3],[4,5,6])
```

- `Function.prototype.apply` 返回一个内置的在 Function.prototype 上的 apply 方法

  `ƒ apply() { [native code] }`

- `Function.prototype.apply.call`

  相当于对内置的 apply 方法调用 `.call`:

  `( ƒ apply() { [native code] } ).call`

- `.call(print, [1,2,3],[4,5,6])`

  将 print 作为 this 传递给内置方法 apply, 并传递 2 个参数: `[1, 2, 3]`, `[4, 5, 6]`

- `( ƒ apply() { [native code] } ).call(print, [1,2,3],[4,5,6])`

  相当于: 将 print 作为 this 传递给 apply, 并将  `[1, 2, 3]`, `[4, 5, 6]` 分别作为 apply 的第 1 个参数和 第 2 个参数.

  由于 调用 `.call` 时, 会执行调用它的函数 (在这里会执行 apply), 所以 apply 将被执行, 

  由于 apply 内部实现: **apply 方法是 Function.prototype 上的方法，只能当 this 为函数时才能调用。** 

  所以当 `.call(print) 时`, apply 内部将会调用 print, 然后 `.call(print, [1,2,3],[4,5,6])`: 

  - .call 的第 2 个参数作为 apply 方法的第一个参数, 

    用作 apply 方法的 this

  - .call 的第 3 个参数作为 apply 方法的第二个参数

    用作 apply 方法的 ArrayLike

具以上分析, 我们我们就可以得出结论: 

执行 Function.prototype.apply.call 时,JS 执行引擎规定第一个参数 this 必须是一个函数, 同时会把第 2 个参数传入给 apply 的第一个参数, 第 3 个参数传入给 apply 的第二个参数,,

然后调用 this (这里是 print), 并将这两个参数, 第一个作为 print 的 this, 第二个作为 print 的参数 (类数组对象), 

最后就是正常执行 print 调用过程了.



