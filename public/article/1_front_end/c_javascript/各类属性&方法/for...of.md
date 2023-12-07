# for...of

***<详情请看,for...of.md>***

我们曾经学过for ... in 的概念*(各类属性&方法.md>)*,现在我们来讲一个和它类似又有所区别的for...of的概念.

注意:for...of并不是只用来遍历对象的,请往下看:

## 定义

(这里假设的都是合格语法)

调用for...of语句,for...of会先尝试调用指定的Iterator对象一次,再根据done属性判断是否要继续调用第二次,如果需要继续,

则继续调用next()方法并获取其返回对象的value属性的值,在一直重复此过程,并以done属性为判断标准决定是否结束当前迭代(循环),

for...of功能在则是:代替你调用指定的数据结构的@@iterator方法,并从该数据结构返回的迭代器对象的next()方法返回的common对象的value属性中获取其属性值.

即会代替你使用@@iterator方法获取迭代过程中的值.

- **数据结构,即数据的构成方法,或者说组合数据的方式.例如对象,数组,字符串等它们都属于数据结构.**

## 描述

for...of语句是在ES6中提出来的为所有具有Iterator接口的数据结构,提供了一种统一的访问(迭代)机制 ,

而ES6规定:默认的Iterator接口部署在Symbol.Iterator属性上,所以一个数据结构只要存在Symbol.Iterator属性,那么此数据结构默认就是可遍历的.

- 数据结构,即数据的构成方法,或者说组合数据的方式.例如对象,数组,字符串等它们都属数据结构.

for...of语句在[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)上创建一个迭代循环,调用自定义钩子,并为每个不同属性的值执行语句.

​    可迭代对象,如:Array,Map,Set,String,arguments,TypedArray对象等等.

for...of的本质很简单,即调用Iterator接口,也就是调用@@iterator方法*(<迭代器和生成器以及协议.md>)*,

**但是区别在于**,for...of还会直接调用@@iterator方法所返回的迭代器对象的next()方法返回的common对象的value属性的值.

**简单来说,就是: for...of将使用@@iterator方法能直接获取被迭代的序列的任何值.**

也就是相当于 调用`generatorObj.next().value` .

同时这也是for...of能判断一个可迭代对象是否已经被迭代完成的原因.因为具有next()返回的对象的done属性.

省略了当使用默认实现的@@iterator这个方法获取序列值得步骤,但是这也表明我们也没有自定义某个数据结构得迭代行为.

- **数据结构,即数据的构成方法,或者说组合数据的方式.例如对象,数组,字符串等它们都属于数据结构.**

## 语法

for...of的语法在表现形式上和for...in没有什么区别,请往下看

`for(variable of iterator){do something};`

### variable 必选

这个参数是一个变量,**存储的是:** 

​    因为调用for...of语句,然后for...of会代替你调用@@iterator方法,并从返回的迭代器对象的next()方法返回的common对象的value属性中获取其属性值,

​    然后存在variable变量中.

**简单来说,就是存储: 在迭代(循环) 迭代器的序列的过程中,获取到的任何JS值.**

且有趣的是: 这个变量支持解构赋值,即可以使用 [a,b,...],或者{key,value...}这样的形式 . 如果使用对象的解构赋值,那么被迭代的对象的属性必须和定义的属性名一样,否则属性的值为undefined.

### iterator 必选

一个具有Iterator接口的数据接口,即由于Iterator接口被默认部署在Symbol.Iterator属性中,

所以也可以说该iteration参数必须拥有Symbol.Iterator属性.

如果不具有Iterator接口,也就是不具有Symbol.Iterator属性.则程序运行会报错:Uncaught TypeError: Not iterable,未捕获的类型错误: 不具备Iterator接口.

## 示例

迭代Array

JS中的数组是默认实现了Iterator接口得数据结构之一,所以它可以被for...of迭代,也就是for...of语法能调用数组得@@iterator方法,并通过next()方法返回的对象的values属性直接获取其属性值,也就是获取其迭代过程中的任何JS值．

```js
    let arr = ['yomua',1,2,3];
    // 使用@@iterator方法,直接获取其迭代过程中的值.
    for(let value of arr) { // value是存取获取到的JS值,
        document.write(value); // yomua 1 2 3
    }
```

如果我们不向修改for...of语句中的便来给你的值,则可以使用const代替let,即:

for(`const` value of arr){..}

### 迭代String

```js
let iterable = "boo";
for (let value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"
```

String(对象)数据结构也实现了迭代器协议和可迭代协议.

### 迭代[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

```js
let iterable = new Uint8Array([0x00, 0xff]);
for (let value of iterable) {
  console.log(value);
}
// 0
// 255
```

### 迭代[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Map)

```js
let iterable = new Map([["a", 1], ["b", 2], ["c", 3]]);

for (let entry of iterable) {
  console.log(entry);
}
// ["a", 1]
// ["b", 2]
// ["c", 3]

for (let [key, value] of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

### 迭代 [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

```js
let iterable = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable) {
  console.log(value);
}
// 1
// 2
// 3
```

### 迭代 `arguments` 对象

```js
(function() {
  for (let argument of arguments) {
    console.log(argument);
  }
})(1, 2, 3);

// 1
// 2
// 3
```

### 迭代 DOM 集合

```js
//注意：这只能在实现了NodeList.prototype[Symbol.iterator]的平台上运行
let articleParagraphs = document.querySelectorAll("article > p");

for (let paragraph of articleParagraphs) {
  paragraph.classList.add("read");
}
```

### 迭代大于`0xFFFF`的码点CodePoint

- Unicode(统一码,万国码,单一码)是一项标准,Unicode需要被进行编码,常见的将Unicode编码的有:UTF-8, UTF-16,UTF-32.
  
  而代码点(点代码/码点)也是包含于Unicode的.

普通的for循环语句是无法识别这样的代码点(可以识别<OxFFFF的码点),会输出""或乱码, 但是for...of循环语句却可以识别大于`0xFFFF`的代码点, 也可以识别<= `0xFFFF`的代码点

```js
let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);// "" "" or � �
}

for (let i of text) {
  console.log(i);// "𠮷"
}
```

- ***String.fromCodePoint(0x20BB7);***
  
  ​     静态方法返回使用指定的代码点序列创建的字符串。
  
  ​     该方法返回一个字符串，而不是一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 对象。因为 `fromCodePoint()` 是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 的一个静态方法，
  
  ​    所以只能通过 `String.fromCodePoint()` 这样的方式来使用，不能在你创建的 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 对象实例上直接调用。

```js
let text = String.fromCodePoint(111);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);// o
}

for (let i of text) {
  console.log(i);// o
}
```

### 关闭迭代器

对于`for...of`的循环，可以由`break`, `throw continue `  或`return`终止。在这些情况下，迭代器关闭。

```js
function* foo(){ 
  yield 1; 
  yield 2; 
  yield 3; 
}; 

// 迭代foo()生成器函数并返回一个生成器对象.
for (let o of foo()) { 
  console.log(o); // 1
  break; // closes iterator
}
```

在这里for...ofr相当于自动调用foo生成器函数返回的生成器对象的: `genObj.next().value`语句.

所以for...of才能判断一个可迭代对象是否已经被迭代完成.因为具有next()返回的对象的done属性.

但是这里我们使用了break;即强行终止了当前循环,所以我们只会迭代foo()一次然后返回生成器对象.

## for...of和for...in的区别

无论是`for...in`还是`for...of`语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。

- [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序迭代对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。
- `for...of` 语句遍历[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#Iterables)定义要迭代的数据。

```js
Object.prototype.objCustom = function() {}; 
Array.prototype.arrCustom = function() {};



let iterable = [3, 5, 7];
iterable.foo = 'hello';

for (let i in iterable) {
  //  0 1  2  "foo"  "arrCustom"  "objCustom"
  console.log(i); 
}

for (let i in iterable) {
  if (iterable.hasOwnProperty(i)) {
    console.log(i); //  0  1  2  "foo"
  }
}

for (let i of iterable) {
  console.log(i); //  3  5  7
}
```

**代码解析**

- ***Object.prototype.objCustom = function() {};*** 

- ***Array.prototype.arrCustom = function() {};***
  
  ​    以上两个Object和Array对象使用prototype属性分别让各自的实例都能使用objCustom属性方法和arrCustom属性方法
  
  ​    但是需要注意的是: 数组也是特殊对象,所以objCustom也是数组的属性方法.

- ***for (let i in iterable) {..}***
  
  ​    使用for...in遍历数组这个特殊对象,依次输出:
  
  ​    0 1  2  "foo"  "arrCustom"  "objCustom"
  
  ​    很显然的是,0,1,2分别代表数组的索引,foo为定义在数组之外的数组本身的属性, 
  
  ​    arrCustom则是定义在Array构造函数中的属性,简单来说就是因为是定义在原型链上的属性,所以其Array构造函数的实例(对象)都能使用此属性,所以该属性也会会遍历
  
  ​    objCustom属性和arrCustom属性差不多的解释,还有个原因则是因为数组也是特殊的对象,Array的实例当然也算是Object的实例,所以自然能能被遍历.

- ***for (let i of iterable) {...}***
  
  ​    使用for...of迭代数组这个特殊对象,我们会发现i存入的不是其数组的属性(索引),而是其属性对应的值,具体原因定义中我们也说过,这里不再赘述了.
  
  ​    此时你继续看会发现,我们之获取到了3,5,7这三个数值,也就是我们只获取到了处于指定的数据结构(对象)本身代码块中的值,
  
  ​    连代码块外部的属性的值都无法获取,更别说原型链上的了(或者说Prototype原型对象内存地址空间中)

- ***if (iterable.hasOwnProperty(i)) {...}***
  
  ​    此方法用来判断:调用该方法的对象是否在自身中存在指定的属性,其返回值为一个布尔值,即如果此属性不存在则返回false,如果存在则返回true.
  
  ​    所以这里才会输出: 0  1  2  "foo",因为返回false则不会执行if语句代码块.
  
  ​    而不会输出:arrCustom和objCustom属性名.
  
  ​    **所以我们才说[`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序迭代对象的[可枚举属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)。**
