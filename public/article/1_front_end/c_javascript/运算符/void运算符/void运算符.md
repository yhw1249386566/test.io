# [void](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

##  描述

void运算符的作用:给指定的的表达式进行求值,然后返回undefined.

也就是这个表达式的返回会是一个undefined.

void运算符还可以让一个函数声明转换成一个函数表达式,不过void转换的函数声明,其返回值将会为undefined.

void 运算符通常只用于获取 undefined的原始值,一般使用void(0)（等同于void 0）

## 语法

`void expression`;

## 示例

### void运算符转换函数声明为函数表达式并返回undefined

我们可以利用void能将函数声明转换成函数表达式这一点,让一个函数变成立即调用的函数表达式,只需要在一个函数表达式后添加圆括号即可.

能达到这一点的还有其他能让函数声明转换成函数表达式的运算符,如! 或 将整个函数声明用圆括号包起来,参见:[此处](https://segmentfault.com/a/1190000003031456)

```js
    void function say() {
        console.log('hello');
        return 'yomua';
    }()
	say(); // say is not a defined.
```

需要注意的是:当一个函数声明转换成函数表达式后,就无法继续调用该函数表达式了,否则将会报错,如同上面的say()语句一样.

### JavaScript URIs

我们知道,void(0)或void 0是一个JS中的表达式且返回值一定为undefined,

由于a标签中的href属性可以执行各种不同协议***(参见<a.md>***),其中就包括javascript,所以我们可以使用void(0)或void 0 这种方式,使一个a标签被单击后不会做任何事情:

```html
<a href="javascript:void(0);">
  这个链接点击之后不会做任何事情,
  但是如果去掉 void(),点击之后整个页面会被替换成一个字符 0。
</a>
```

```html
<p> 
    chrome中即使<a href="javascript:0;">也没变化,
    firefox中会变成一个字符串0 
</p>
<a 
  href="javascript:void(document.body.style
        .backgroundColor='green');">
  点击这个链接会让页面背景变成绿色。
</a>
```

需要注意的是,void只是一个会让表达式返回undefined的运算符罢了,void(0)并不是什么都没做,而是由于在a标签中体现不出void运算符会返回一个undefined,所以就表现得什么都没做一样,

实际上,如果你愿意,你可以使用void(1),void(1241123)等等,只要void右边的表达式是一个不会改变任何事物的表达式,则点击这个a标签都会如同什么都没做一样.

### 在箭头函数中使用void运算符从而避免泄漏

由于箭头函数标准中,允许在函数体不使用括号来直接返回值: `()=>2`,

但是如果右侧调用了一个原本没有返回值的函数,其返回值改变后,则会导致非预期的副作用: `()=>func();` (func函数不存在返回值)

安全起见,当函数返回值是一个不会被使用到的时候,应该使用 void 运算符,来确保返回 [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)（如下方示例）.

这样,当 API 改变时,并不会影响箭头函数的行为:

```js
button.onclick = () => void doSomething();
// 当点击一个按钮,会执行匿名函数,然后返回一个doSomething()函数.
```

存在一个匿名函数,这个匿名函数的返回值是一个函数doSomething,但是由于返回的值是一个函数doSomething,所以若doSomething函数被调用,则它的返回值会成为匿名函数的返回值,从而可能改变匿名函数索引项的onclick事件,

所以为了确保 doSomething 的返回值并不会改变onclick事件,我们需要使用void运算符来保证doSomething函数返回一个undefined(函数返回值的默认值),从而改变不了onclick事件.

​	你不妨想想: 假如doSomethind()函数没有使用void运算符且该函数返回一个Boolean值:false,那么当我们点击button时,可能触发不了onclick事件,因为button.oncolic=false;

**请记住:**

一个函数a的返回值若是一个函数b,则函数b的返回值会称为函数a的返回值,除非a函数中的返回值b函数是返回一个函数整体,如return b,而不是return b(); 因为b()代表调用b函数.

```js
    function a () {return b();}
    function b() {return '我爱你'}
    console.log(a()); // 我爱你
```



