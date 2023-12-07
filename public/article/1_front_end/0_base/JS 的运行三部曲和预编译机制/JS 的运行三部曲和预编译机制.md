# JS 运行三部曲

1. 语法分析
   
   编译器会将需要执行的脚本扫一遍，看看是否有语法错误
   
   若有，则报错；若无，则什么都不做。

2. 预编译
   
   在执行脚本的前一刻，会进行全局预编译；
   
   - 全局预编译完成之后，开始解释执行，
     
     遇到函数，就进行局部预编译 ，再解释执行，直到程序执行完毕。
     
     当然其中可能会遇到宏任务、微任务、异步等问题。
     
     参见：[JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/JS%E5%B9%B6%E5%8F%91%E6%A8%A1%E5%9E%8B%E4%B8%8E%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-%E5%A0%86-%E6%A0%88-%E9%98%9F%E5%88%97-%E5%90%8C%E6%AD%A5%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E5%AE%8F%E8%A7%82%E5%BE%AE%E4%BB%BB%E5%8A%A1/JS%E5%B9%B6%E5%8F%91%E6%A8%A1%E5%9E%8B%E4%B8%8E%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-%E5%A0%86-%E6%A0%88-%E9%98%9F%E5%88%97-%E5%90%8C%E6%AD%A5%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E5%AE%8F%E8%A7%82%E5%BE%AE%E4%BB%BB%E5%8A%A1.md)
   
   在执行函数的前一刻，会执行局部预编译。

3. 解释执行
   
   解释一行，执行一行。

# 预编译机制

## 概念

在 JavaScript 中存在一种预编译机制，这种预编译机制是 Java 没有的一种特性，而正是因为 JavaScript 的这种预编译机制，会使得变量提升带来以下两个问题：

1. 函数声明整体提升（提升变量包括函数体）    
2. 变量的声明部分（只提升声明，不提升值）

这两个问题能概括开发过程中一部分问题，但是不能概括所有问题，还有一些问题是你必须学习预编译才能解决。

通常来说，预编译分为**全局预编译**和**局部预编译**；全局预编译发生在页面加载完后执行，而局部预编译发生在函数执行前（要准备执行函数体前）的那一刻。

## 全局预编译

全局预编译，分为三个步骤：

1. 创建 GO（Global Object）对象
2. 找到变量声明，将变量名作为 GO 属性名，值赋为 undefined
3. 找到函数声明，将函数名作为 GO 属性名，值赋为函数体

## 局部预编译

局部预编译通常发生在函数执行前的一刻，比全局预编译多了一个步骤，共有四个步骤：

1. 创建 AO（Activation Object）执行对象上下文

2. 找到形参和变量声明，将变量名作为 AO 属性名，值赋为 undefined 

3. 将形参和实参的值统一（即：实参的值赋值给形参）
   
   注：全局预编译并没有这步骤，因为全局中没有参数概念，
   
   即：不存在传递参数一说。

4. 找到函数声明，将函数名作为 AO 属性名，值赋为函数体

## 示例

```js
console.log(myname) // function(){}
myname = 'global'
var myname = 'yomua'
function myname() {}
console.log(myname) // yomua
function func(myname) {
    console.log(myname) // ƒ myname() { }
    var myname = 'local'
    function myname() {}
    console.log(myname) // local
}
func(1)
```

首先一开始，会进行语法分析（无错），接下来会进行到预编译阶段，在该阶段，首先会进行全局预编译，以上代码被全局预编译时，会经历以下 3 步骤：

**全局预编译**

```js
// 1、创建 GO 对象
let GO = {};

// 2、找到变量声明，将之作为 GO 的属性名并赋值为 undefined
GO = {
    myname: "undefined" // 提升的变量
}

// 3、找到函数声明，将之作为 GO 属性名并赋值函数体作为值
GO = {
    myname: "undefined", // 提升的变量 
    myname: function(){}
}

/** 由于 GO 中有多个 myname 属性，那么后者将会覆盖前者的值，即:*/
GO = {
    myname: function(){}
}
```

这样**全局预编译完成之后**，相当于已经执行完了一遍 GO 对象，也就是说，在当前脚本还未进入到【解释执行】这一步骤时，全局对象中就已经存在了：`var myname = function(){}` 这个函数。

现在预编译完成，程序开始执行脚本（进入【解释执行】步骤），会先执行：

```js
console.log(myname) // function(){}
```

这是由于全局与编译已经存在：myname: function(){}

然后再执行以下两行代码：

```js
myname = "global";
var myname = 'yomua'
```

这趟由于 `var myname = function(){}`  之后最后存在 `myname = 'yomua'`，所以现在 myname 变量的值就变成 yomua，那么这也就解释了为什么 `console.log(myname)` 的输出结果为 yomua 

接下来执行到 func(1)，由于它是一个函数，所以编译器将会对 func 函数进行预编译，而函数（局部）预编译将会有以下 4 步骤：

**局部预编译**

```js
// 1、创建 AO（Activation Object）对象上下文
let AO = { }

// 2、找到形参和变量声明，将变量声明作为属性名放入 AO，并赋值为 undefined
AO {
    myname: undefined, // 函数中定义的 myname 变量
    myname: undefined, // 形参
}

// 3、将实参和形参的值统一
AO {
    myname: undefined, 
    myname: 1,  // 实参的的值（1）赋值给形参：myname
}

// 4、找到函数声明，将函数名作为 AO 属性名，并将函数体作为值
AO {
    myname: 1,
    myname: function(){ },
}

/** 由于 AO 中有多个 myname 属性，那么后者将会覆盖前者的值，即:*/
AO = {
    myname: function(){ }
}
```

这样，局部预编译完成后，相当于在函数体中，已经存在了 `var myname = function(){}`  这个函数，所以当执行 func 函数体中的 `console.log(myname)` 时

会输出：`ƒ myname() {}`，接下来又会执行 `myname = local`，这会把 myname 这个变量重新赋值，所以再接下来的 `console.log(myname)` 中，将会输出：`local`

这样，程序就运行完成了。