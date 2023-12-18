# CommonJS是什么

## 一

[CommonJS](http://wiki.commonjs.org/wiki/CommonJS)是一个有志于构建JavaScript生态圈的组织.

它有一个 [邮件列表](http://groups.google.com/group/commonjs),很多开发者参与其中. 整个社区致力于提高 JavaScript 程序的可移植性和可交换性,无论是在服务端还是浏览器端.

## 二

CommonJS是一种规范,而node(即node.js)是这种规范的实现。就好像ES是规范,然后JS实现了它一样.

- CommonJS规范了模块这个概念的实现,这是它的核心.

## 三

[CommonJS](https://zh.wikipedia.org/wiki/CommonJS)是一个项目,其目标是为[JavaScript](https://zh.wikipedia.org/wiki/JavaScript)在[网页浏览器](https://zh.wikipedia.org/wiki/网页浏览器)之外创建[模块](https://zh.wikipedia.org/wiki/子程序)约定,其实就和第二点观点差不多:即CommonJS是一个规范.

创建这个项目的主要原因是当时缺乏普遍可接受形式的JavaScript脚本模块单元,模块在与运行JavaScript脚本的常规网页浏览器所提供的不同的环境下可以重复使用.

- 注意: 现在ES6已经实现了模块化,即module. 

  即: export和import命令. ***参见: <Module.md>***

## 注意

有趣的是: 在2013年5月,[Node.js](https://zh.wikipedia.org/wiki/Node.js)包管理器[npm](https://zh.wikipedia.org/wiki/Npm)的作者Isaac Z. Schlueter，宣布Node.js已经废弃了CommonJS，Node.js核心开发者应避免使用它[[5\]](https://zh.wikipedia.org/wiki/CommonJS#cite_note-commonjdisdead-5).

​		----[维基百科](https://zh.wikipedia.org/wiki/CommonJS) 

# 为什么会出现CommonJS规范?

## 描述

在ES6只是个提案,未实践之前,我们编写JavaScript代码时,通常为了一个变量能在全局中使用,而去将这个变量提到.js文件的顶层,即让之成为全局变量.

在一个.js文件中或许全局变量不多,比如只有十来个,不会相互影响,但是如果是一个体量足够的项目,那么复数的js文件中的全局变量将会相互影响

## 示例

假如: 

- a.js中有个全局变量yomua,它是一个属性
- b.js中也有个全局变量yomua,它是一个函数

倘若它们未被导入同一个.js文件或这一个html文件等,还就还好,不会相互影响,可以独立使用. 

但是前提是它们没有被导入到同一个文件,在一个体量足够的项目(需要多人开发)中,总会出现两个不同的js文件存在两个相同名字的全局变量,它们也总是可能会被同时使用.

**此时问题来了:**

 JS引擎该使用哪个呢?由于任何编程语言都不允许出现二义性这种事情,所以JS引擎会报错,即:	

- Uncaught SyntaxError: Identifier 'yomua' has already been declared

  => yomua标识符已被声明.

即使这两个不同的js文件没有被一起使用,项目也成功运行了,但是后期维护该如何? 

因为大量的使用相同的变量,导致维护过程会非常的艰辛,增加功能也很难,因为维护人员需要知道每个相同名字的全局变量处于哪个文件中,防止由于同时使用相同全局变量的多个不同文件而引起的标识符已被声明这种错误.

- 越大的项目,越是难.

所以CommonJS在此时应运而出,提供了module这个概念,让不同的文件有相同的全局变量,然后在一起使用,也不会因此出现错误.

因为module中的变量/全局部变量都相当于局部变量,详见:
***module.exports和exports基本实现原理***



# module

## 描述

所谓的module,也就是一个模块,或者说是一个文件,里面放了许多代码的文件,然后这文件中的所有代码都是独立的,如:相同名字的变量在不同的模块中,然后这些不同的模块被一起使用,这些相同名字的变量并不会互相影响

## module的名字

假如存在一个 `hello.js`的文件,那么在node中:

- 会将此文件认为是一个module,文件名为:hello.js的module, 
- 而module的名字则是:不带后缀名的名字,即:hello.

所以在node中,

- hello:是模块名. 
- hello.js是文件名.

在以下的require函数一小节中,你们将会发现我们加载(导入)module时,使用的就是不带后缀的模块名,而不是带后缀的文件名.

但是这并不代表我们不能写带后缀的模块名(即文件名)了, `require './xx.js'`也是可以的

# module.exports和exports及require

- 请注意CommonJS中的module.exports对象的属性和exports属性及require函数 和 ES6中的import,export命令的区别.

  详见: ***<Module.md - Module的加载实现 - Node加载 - ES6模块与CommonJS模块的差异>***

## 描述

在学习以下知识前,我们需要知道,CommonJS是运行时加载的,而不是编译时加载,这是因为module.export/exports和require其实是对象的属性和一个函数.

只有程序执行时,才能确定对象中有什么,函数的结果是什么,所以CommonJS是执行时才会使用到.

并且moudle.exports/exports和require是输出,输入缓存,而不是动态绑定(详见同级目录:module.exports和exports基本实现原理和 **<Module.md>**)

> ​	ES6中的exports和import大为不同,或者说是相反的,因为它们两个都是编译时加载且exports是动态绑定module的对外接口.**参见<Module.md>**

## module.exports

### 描述

module.exports其实是一个对象的属性,而exports这个属性的值又是另一个对象.其作用和ES6中的exports命令类似.***详见:同级目录 ...基本实现原理*** 

我想你们也应该大概知道了什么是CoomonJS组织和CommonJS规范,且知道node实现CommonJS规范,究竟实现的是什么了(module),

是的,我们可以简要的认为CommonJS是个有关JS module的规范,node实现了它. 下面让我们开始了解CommonJS的实现和基本原理.

### 语法

```js
/** 写法一 */
module.exports = {
	属性:值,
	key:value,
	....
}
```

```js
/** 写法二 */
module.exports.属性名 = 属性值;
....
```

- **以上两者的作用是等效的**



```js
module.exports = 属性变量/属性函数
```

- 以上写法不建议使用,只能为module.exports属性添加一个值,没有任何意义,因为exports的值是对象，

  一旦你写了以上写法，则就相当于，将 exports 这个变量的值改变为你指定的值，且以后如果想要再改变 exports 变量的值，则你上一个指定的值将会被覆盖。

这里我们建议使用第一种或第二种写法,不过**大多数人都钟爱第一种写法**,因为简单快捷,在这里我也强烈建议你们使用第一种写法:**易维护,易阅读等优点.** 

### 核心用法

```js
/** 一个名为:module.exports.js文件,在当前目录./ */
'use strict';
function hello(name) {
    console.log(`你好:${name}`);
}
module.exports = {
    show: hello
}
```

这里写'use strict'是为了让该module文件以严格模式执行,以防存在一些潜在陷阱(不是严格模式的js文件容易出现不容易发现的问题)

- ***module.exports ={show:hello }greet;***

  ​	将show属性这个函数暴露出去,即此时的show属性函数是一个对外接口,这样我们就可以在另一个module中导入这个对外接口,通过CoomonJS特有的require函数.

  show属性:一个字符串.

  hello属性值:一个变量,指向hello函数.

<!--请注意,以下的require函数我们提前来讲,详见同级目录:require函数,你们只需要知道,它能加载一个module的对外接口即可. -->

```js
/** 一个require.js文件 */
let sayHello = require('./module.exports');
sayHello.show('yhw');
```

请注意这个require()函数,这个函数是node提供的,并不是我们自定义的函数,所以如果你直接将该require.js文件用在浏览器上,那么会报错:require is not defined.

因为我们需要在CLI使用node,让node执行该文件: `node 路径/require.js` ,
这样我们就能得到执行结果: `你好:yhw`

![](picture\node命令执行结果.png)

## exports

不建议使用,它的作用都被module.exports覆盖. 即exports就是module.exports.

## require函数

### 描述

require函数如同ES6的imports命令一般,其都是加载指定路径或某个模块的对外接口. 

不过require()函数是直接将整个module全部加载(导入),很难(或不能)指定需要加载哪个对外接口,import命令却可以指定也能加载全部(*详见:<Module.md>*)

且由于require是一个函数,所以它只能在程序执行时运行,不能在编译时加载,并且加载的结果也是缓存中的数据. import命令则是编译时输入(加载),动态绑定exports,输出的不是缓存.

## module.exports和exports基本实现原理

- [廖雪峰---](https://www.liaoxuefeng.com/wiki/1022910821149312/1023027697415616)

### 描述

Node.js是如何实现"模块"这个功能,让每个文件的全局变量,即使名字相同都能在一起使用呢?

其实这并不难,nodejs实现模块功能,并不需要语法层面的支持,nodejs本身也不会增加任何js语法,

实现的奥妙在于js是一种函数式编程语言***(参见:<函数式编程.md>)***,它支持闭包,我们如果将一个.js中的全局变量用一个函数包起来,那么该全局变量就变成了局部变量(这是一句废话)

### 原理

#### 如何实现模块的隔离?

假设在一个hello.js文件中,存在下面一段代码:

```js
var s = 'Hello';
var name = 'world';
console.log(`s:${name}`);
```

当使用 `node 路径/hello.js`执行该js文件后,node会自动将该js文件中的所有代码放入一个立即执行函数中,然后这个执行这个函数,即:

```js
/** hello.js文件被node执行的本质 */
(function () {
    // 读取的hello.js代码:
    var s = 'Hello';
    var name = 'world';

    console.log(s + ' ' + name + '!');
    // hello.js代码结束
})();
```

通过node的自身包装,hello.js文件中的所有代码都变成了局部作用域中的代码,当函数执行完时,未被返回的值将会被自动销毁(垃圾回收机制).

也就是这样,node通过js函数式编程的特性,轻而易举的实现了module的隔离.

**读到这里你就可能疑惑,modle.exports是怎么实现的呢,它又是如何获取到立即执行函数中的值的呢?又是怎么确定我们需要暴露出那些对外接口的呢?**

请继续往下看

#### module.exports如何实现

##### 实现的基本过程

首先假设存在一个 名为:module.exports.js的模块,代码如下:

```js
'use strict';
function hello(name) {
    console.log(`你好:${name}`);
}
module.exports = {
    show: hello
}
```

则module.exports的是如何实现以上代码的呢?

-  **node.js首先**会自身准备一个名为:module的对象 => 

```js
var module = {
    // .js后缀名可写可不写
	id:'moduleName,如:module.exports', 
	exports:{}
}
```

- 其次会准备一个名为:load的函数,接收上面的module对象 ,然后向module对象的属性exoports*(存放的是另一个对象)*中添加你想要对外输出的接口（即我们在模块中使用 module.exports 导出的值），最后 load 函数的返回值返回 module.exports

  ```js
var load = function(module) {
      
      function hello(name) {
      	console.log(`你好:${name}`);
  	}
      
      module.exports = {
          show:hello
      }
      // return被执行完之后,整个模块就执行结束.
      return module.exports;
          
  }
  ```
  
  ​	需要注意的是:这个函数中,存放的是模块内部需要对外暴露出接口的有关代码.
  
  ​	然后被这个函数的返回值为module.exports,当load()函数被执行,那么外部的module对象中的exports属性值将被改变成load()函数的返回值.
  
  ​	因为对象是易变的,***参见<对象.md>,***不像普通的变量(存值)传入过去之后,形参如同一个实参的副本.
  
  ​		*实参为对象,则形参只会指向这个对象所在的内存地址空间,而不会生成一个副本**(参见:<对象.md>)***

- 然后会调用以上load(module)函数,向之传入module对象,并赋值给一个变量.

```js
/** exported:代表执行完load()函数 */
var exported = load(module);
```

- 接着，nodejs会使用一个内置的方法去保存module对象和exported变量,即向某个函数中传入module和exported.

  在这个内置的方法,如：save(module,exported)中,它将会自己去处理，将module和exported在save()函数中处理完成之后保存到某个地方去.

  ```js
  save(module,exported);
  ```
  
- 最后，当你使用 require(路径名)  导入暴露出的 module 时，其实就是导入 node 帮你存的 module.exports。

--------------

- 上面的整体代码如下:

```js
var module = {
    // .js后缀名可写可不写
	id:'moduleName,如:module.exports', 
	exports:{}
}
var load = function(module) {
  	// 我们自己写的需要导出的方法
    function hello(name) {console.log(`你好:${name}`);}
  	module.exports = {show:hello}
    // return被执行完之后,整个模块就执行结束.
    return module.exports;      
}

/** exported:代表执行完load()函数 */
var exported = load(module);
save(module,exported);
```

##### 总结

通过以上的*module.exports如何实现*一节,我们现在应该很清楚的知道:
在nodejs实现的CommonJS中: 

`module.exports其实代表的是module这个对象的exports属性`,我们常常使用的module.exports={...}或module.exports=xxx ,以及任何有关module.exports的代码,其实都是为exports属性(里面存放的是对象)赋值罢了.

而module对象本身能让我们直接使用,然后使用node去执行(文件),而不报"module is not defined原因,也就是因为: 

​	这个module对象其实就是nodejs自身内置的,会自动为每个模块生成的一个对象,然后将这个module对象传入到将我们的代码封装到内部的函数的参数(save())罢了.

而模块隔离也只是将模块中的所有代码放入一个函数中,然后调用这个函数,从而将变量都变成局部变量.

#### exports

这里的exports指的不是ES6中的export命令,而是CommonJS中的exports***(export命令没有s)***.

在很多时候 ,你可能会在node环境中,看见一个module使用了两种方法输出变量: 

1. module.exports= {...}
2. exports.xxx = xxxx;

这两种方法是等效的. 因为 *module.exports如何实现*一节中 我们已讲到exports是module对象中的一个存放对象的属性.

所以当然可以使用exports.xxx=xxx的方式去赋值,去暴露对外接口,因为`module.exports.a=b`和`exports.a=`b其实都是使 exports 对象的 a 属性指向 b 这个内存地址空间.

不过请注意: **我们无法直接给exports赋值**,比如: exports = xxx; epxorts ={}等等, 例如：exports = c，

那么就相当于将 exports 属性指向一个新的 c 这个内存地址空间，module.exports 就会变成 module.c，

而在load()函数中,返回的是module.exports, 而不是exports（module.c）, 所以使用exports = xx这样的形式是没有用的,因为最后返回的module.exports仍然是undefined,而不是我们想要对外暴露的接口. 

- 除非最后在函数中（load()）返回return exports;

**所以,在这里,我们强烈建议使用module.exports = {} / module.exports.xxx=xxx的方式来输出模块变量，这样，你只需要记忆一种方法。**

















