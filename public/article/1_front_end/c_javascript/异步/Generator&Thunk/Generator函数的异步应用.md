[TOC]



# 异步

## 异步的概念(是什么)

- **参见:<异步.md>**

异步: 先执行其他的任务,待到其他非异步任务执行完成后,再来执行这个异步任务.

## 为什么要有异步

对于JS来说,异步编程非常的重要. 因为JS语言的执行环境是'单线程'的,如果没有异步编程,一旦遇到非常大的脚本执行,则会给人一种'卡死,崩溃'了的感觉,而且通常来说,这'大的'脚本又不会立马用到.

所以我们需要异步的方式去执行这段脚本,即:这个非常大的脚本,我们**使它先不去执行,而是先执行浏览器的渲染工作**,等到整个页面正常的渲染完毕之后,我们在让JS浏览器去执行这个大脚本．

这样对于用户来说,浏览器的执行速度似乎非常的快,非常的流畅,因为用户是先看见视图,然后才会去执行事件(即浏览器的事件,如:单击按钮,双击,,滚动等),最后才会触发事件对应的脚本.

所以在趁着用户还未触发事件时,让脚本在'后台'偷偷执行(异步执行),这样用户既不会感觉'卡',也会因为脚本未执行而导致浏览器变成'静态页面'.

## 使用异步的传统方法

### 描述

在ES6诞生之前,JS的异步大概有如下四种:

1. 回调函数 callback
2. 事件监听
3. 发布/订阅
4. Promise对象

ES6诞生了**Generator函数**,将JavaScript异步编程带入了一个全新的阶段.

### 使用回调函数的异步

#### 描述

ES6之前,JS对异步编程的实现,就是回调函数***(参见:<函数.md - 回调函数>)***,即:

​	*一个函数 a 调用callback另一个函数b,而这另一个函数b就是回调函数.* 

如：函数 a 调用函数 b，则函数 b 为回调函数。

运用到实例也就是说: 在一个任务中,我们将这个任务分成两段,把后半段需要执行的任务单独写在一个函数中,

然后等到前半段任务执行完毕后,需要执行后半段任务时,再直接调用这个函数,执行后半段任务.

#### 示例

我们使用node中的一个fs(filesystem)模块,异步读取一个文件数据.

- ***(参见:node使用库和模块.md>***

```js
const fs = require('fs');
fs.readFile('./data.json', 'utf-8', function (err, buffer) {
    if (err) throw err;
    console.log(buffer)
})
```

当操作系统返回了./data.json这个文件时,function(err,buffer){}回调函数才会执行, 而从你提交请求→操作系统返回文件的过程中,可以去干其他事情,程序不必等到操作系统返回了文件才等往下执行,(这是同步任务才会这么做).

这就是一个很简单的使用回调函数执行的异步任务.	

- ​	有趣的是: Node 约定,回调函数的第一个参数,必须是错误对象`err`（如果没有错误,该参数就是`null`）,但是为什么这么做呢?

  ​	原因是执行如果分成两段,第一段执行完以后,任务所在的上下文环境就已经结束了,而在这以后抛出的错误,原来的上下文环境已经无法捕捉,只能当作参数,传入第二段.

  ​		比如,操作系统找不到文件/读取文件失败等,那么就会抛出一个错误,但是由于这个第一阶段任务只是请求文件,它已经被执行完毕了,

  ​		那么操作系统抛出去的错误已经无法被第一阶段捕获,所以我们只能将这个错误当作参数传给回调函数的第一个参数,至于为什么不是第二个? who cares?.

#### 为什么不使用回调函数?

回调函数本身没有问题,执行异步也是可以的,但是如果存在一个任务中,需要分多个阶段完成,则就必须嵌套回调函数,而就是因为这个嵌套的回调函数,导致了问题.

比如:我们此时有个任务: A文件读取完成之后,再读取B文件,再读取C文件...

```js
const fs = require('fs');
fs.readFile('fileA', 'utf-8', function (err, buffer) {
    ....
    fs.readFile('fileB',function(e,b) {
        ....
        fs.readFile('fileC',function(e,b) {
            ....
            fileD
            	....
        }
    })

})
```

通过这简单的示例,不难想象,一旦依次需要读取两个以上的文件,就会出现多重嵌套的回调函数调用,而且代码的书写是横向发展,而不是纵向发展,

很快就会乱成一团,而且极难阅读和理解以及管理和维护. 因为一个任务中出现的多个异步操作形成了强耦合,

​	比如: 我需要改变fileB文件的路径或者其他操作,则上层的回调函数和下层的回调函数可能都要跟着修改,而且可能不止一层需要修改,而是多层.

那么这种情况一旦发生,我们将之称为:'回调(函数)地狱' callback hell.

- 所以回调函数这种方案并不是特别靠谱,我们需要一个新的方案,例如:Promise对象的异步. 请继续往下看.

### 使用Promise对象的异步

#### 描述

Promise对象是为了解决callback hell问题而提出来的,它并不是一个新的语法功能,而是一种新的写法,即允许将回调函数的嵌套改成链式调用.

#### 示例

##### 示例

使用Promise对象,连续读取多个文件:

```js
const readfile = require('fs-readfile-promise');
// readfile()返回的是一个promise对象
readfile('./mes.txt') 
    .then(function (data) { 
        console.log(data.toString())
    })
    .then(function () { 
        return readfile('./data.json', 'utf-8'); 
    })
    .then(function (data) { 
        console.log(data)
    })
    ...
```

- ***readfile('./mes.txt')*** 

  ​	返回一个Promise对象, 并将异步操作的结果作为参数传递出去(resolved和rejected都会将其对应结果传递)

  - `.then(function (data)` 

    ​	上面异步状态变为成功时执行的callback并接收来自上面抛出的数据.

- ***.then(function () { return readfile('./data.json', 'utf-8');})***

  ​	当上面的操作都成功时执行该then()方法

  ​	return...,此时这个.then()的返回值为一个promise对象

  - `.then(function (data)` 

    ​	上面promise对象的异步状态变为成功时执行的callback并接收来自上面抛出的数据.

上面代码中的fs-readfile-promise模块,***参见:<node实用库和模块.md>***

​	它的作用就是返回一个 Promise 版本的readFile函数.Promise 提供then方法加载回调函数,catch方法捕捉执行过程中抛出的错误.

##### 总结

可以看到,Promise 的写法只是回调函数的改进,使用then方法以后,异步任务的两段执行看得更清楚了,除此以外,并无新意.

Promise 的最大问题是代码冗余,原来的任务被 Promise 包装了一下,不管什么操作,一眼看去都是一堆then,这会导致让原来的语义变得很不清楚,让维护和阅读变得更加的艰难.

那么,有没有更好的写法呢? Generator函数就是为此而生,请往下看

### 使用Generator函数的异步(本章核心)

#### 描述

传统的编程语言,早有异步编程的解决方案,也就是多任务的解决方案). 有一种方式,叫做: '协程'coroutine.

意为:多个线程相互协作,完成异步任务.***(线程意思,参见:<操作系统基础.md>)***

协程有点像函数,又有点像线程,它的运行流程大致如下:

1. 协程A开始执行
2. 协程A执行到某一时刻,被暂定,将执行权交给协程B
3. 协程B执行完成后交还执行权给协程A
4. 协程A恢复执行,直到执行完成或某一时刻又将执行权交给协程X.

举例来说,有个使用Generator*(这里我们提前讲,详见:协程的 Generator 函数实现*)函数读取文件的协程 的 写法如下:

```js
function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
```

- asyncJob是一个协程函数,它的奥妙在于内部的yield语句,它表示在执行此处时,将执行权交给某个Expression(协程).

  然后自身暂停执行.

- 也就是说:yield命令是异步的两个阶段的分界线.

- 协程遇到yield命令就暂停,等到执行权返回,再从暂停的地方继续往后执行.

  它的最大优点,就是代码的写法非常像同步操作,如果去除yield命令,简直一模一样.

#### Generator 函数实现协程

##### 描述

Generator函数是协程在ES6中的实现,它的最大特点就是可以交出函数的执行权,也可以暂停执行.

整个Generator函数就是一个封装的异步任务,或者说是异步任务的容器. 当想让一个异步操作暂停时,就能使用yield语句注明.

##### 示例

Generator函数执行过程如下,参见:***<迭代器和生成器以及协议.md>***

```js
function* gen(x) {
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

上面代码中,调用 Generator 函数,会返回一个内部指针（即遍历器(生成器)）g.

这是 Generator 函数不同于普通函数的另一个地方,即**执行它不会返回结果,返回的是指针对象(一个生成器对象)**.

调用指针g的next方法,会移动内部指针（即执行异步任务的第一段）,指向第一个遇到的yield语句,上例是执行到x + 2为止.

换言之,next方法的作用是分阶段执行Generator函数.

每次调用next方法,都会返回一个Common对象,表示当前阶段的信息,这个对象存在两个属性: value属性和done属性.

value属性是yield语句后面表达式的值,表示当前阶段的值；done属性是一个布尔值,表示 Generator 函数是否执行完毕,即是否还有下一个阶段.

#### Generator 函数的数据交换和错误处理

##### 描述

Generator 函数可以暂停执行和恢复执行,这是它能封装异步任务的根本原因.除此之外,它还有两个特性,使它可以作为异步编程的完整解决方案：

1. 函数体 内**(yield抛出,value属性获取)** 外(**next(传参)**) 的数据交换
2. 错误处理机制 try...catch

##### 数据交换

迭代器对象的next返回的Common对象的 value 属性: 是 Generator 函数向外输出数据的关键;且next方法还可以接受参数,向 Generator 函数体内输入数据.

```javascript
function* gen(x){
  var y = yield x + 2;
  return y;
}

var g = gen(1);
g.next() // { value: 3, done: false }
g.next(2) // { value: 2, done: true }
```

- 上面代码中,第一个next方法的value属性,返回表达式x + 2的值3.

- 第二个next方法带有参数2,这个参数可以传入 Generator 函数,作为上个阶段异步任务的返回结果被函数体内的变量y接收

  ​    *(即:赋值给上一个yield语句左边的变量)*

  因此,这一步的value属性,返回的就是2（变量y的值）.

##### 错误处理

Generator 函数内部还可以部署错误处理代码,捕获函数体外 抛出的错误.

```javascript
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  yield 2;
  return y;
}

var g = gen(1);
g.next();
g.throw('出错');
g.next(); // {value:undefined, done: false}
// 出错
```

- ***g.throw('出错');***

  ​    Generator函数体外部使用其返回的生成器对象(指针)抛出的错误,可以被函数内部的catch所捕获,

  ​	注意:这并不会让其Generator函数结束执行,而是正常的去执行.

  ​	这并不同于在Generator函数内部抛出错误会导致整个函数结束执行***(参见:<迭代器和生成器以及协议.md>)***,

  ​	即: g.throw()抛出一个错误之后,如果函数体内部存在catch,则该错误会被捕获,然后Generator函数正常继续向下执行,直到遇到yield,return,throw语句或执行完必.

  ​	*如果不存在catch,则g.throw()的使用是错误的,会被浏览器报错.*

- ***g.next();***

  ​	其结果返回value:undefined的原因是因为:

  ​	g.throw()抛出错误,被生成器函数所捕获到时,就相当于调用了一次g.next()方法,从而让yield 2这个语句已经被执行了. 

  ​	所以**当前这个**g.next()代码行并不会获取到2这个数据. 

  ---

  ​	这个数据应该是由g.throw()方法获取的,但是这个方法是抛出错误,并不会获取到的数据,

  ​	所以yield 2这语句相当于没有任何Common对象能获取到它的值,**它此时只能相当于一个暂停Generator函数的作用了.**

以上的g.throw()代码行可以被函数体内的try...catch代码块捕获,这意味着:

​	出错的代码(我们可以在函数体外捕获一个错误,然后使用指针(生成器)对象将其抛到Generator函数内部,这样:

​		出错的代码与处理错误的代码,就实现了时间(异步)和空间(Generator函数内外部)上的分离,这对于异步编程无疑是很重要的.

### 一个真实的异步任务封装(使用Generator函数)

#### 实例

在nodejs中,使用Generator函数封装一个获取来自服务器的数据的操作,

```js
const fetch = require('node-fetch')
function* gen() {
    var url = 'http://whyhw.com/api/data';
    var data = yield fetch(url);
    console.log(data.login); // github
}

let g = gen();

g.next().value
    .then(response => { return response.json() })
    .then(data => {
        // console.log(data);
        g.next(data)
    })
```

**其代码意思详情参见:<fetch.md>**

***代码解析***

- ***g.next().value***

  ​	返回一个promise对象,且在该fetch请求被响应时*(promise对象为resolved时)*,即:服务器会回传一个Response对象给fetch(),而这个对象就会被作为当前的Promsie对象异步操作的结果.

-  ***.then(response => { return response.json() })***

  ​	当上个Promise对象的状态变成resolved时,就执行该resolved回调函数,并接收Promise对象的异步操作结果: 一个Response对象

  - **return response.json()** 

    ​	.json():挂起一个流操作并在该操作完成时读取其(Response对象的)值

    ​	然后返回一个Promise对象.而这个读取到的值就是Promise对象异步操作的结果.

    ​	最后使用return语句将该Promise对象和值一起抛出去./

- ***data=>{...}***

  ​	该回调函数的data形参接收json()返回的Promise对象的异步操作结果,即:读取的Response对象的值,也就是url中的数据

  -  **g.next(data)**

    ​	再一次调用生成器对象(生成器函数的内部指针)的next()方法(移动指针),并向之传入data参数.

    ​	即传入的data会被赋值给上一条yield语句左边的变量,即 *var data = yield fetch(url);* 这个的data变量

- ***data.login***

  ​	调用data数据中的login属性,其结果为:github

#### 该实例的执行顺序

1. **const fetch = require('node-fetch');** 加载模块

2. **let g = gen();** 调用生成器函数,获取生成器对象.(生成器函数此时为暂停状态)

3. **g.next();** 调用next()方法,执行一次生成器函数.

4.  **var url = 'http://whyhw.com/api/data';**
    **var data = yield fetch(url);**

   ​	执行完必yield语句时,生成器函数再一次被暂停,并抛出一个Promise对象,即:由next()返回的Common对象的value属性

   ​	当fetch()发出的请求被响应后,即:服务器会回传一个Response对象给fetch(),而这个对象就会被作为当前的Promsie对象异步操作的结果.

5. **.value.then(response => { return response.json() })**

   ​	取得value属性的值:一个Promise对象. 然后调用存于Promise()构造器的prototype属性上的then()方法,

   ​	用来判断当前的Promise对象的状态,如果状态由pending->fulfilled(resolved),则执行回调函数resolved.

6. ***response => { return response.json() }***

   ​	Promise对象为resolved时,执行该回调函数.

   ​	该回调函数接收一个参数,此时这个参数为当前的Promise对象的异步操作结果:一个Response对象.

   - return response.json()

     ​	详见上面的代码解析.

   ​	

7. ***.then(data => {...})***

   ​	判断当前的Promise对象的状态(json()返回的),当状态为resolved时执行其中的回调函数

   ​	rejected回调函数可以省略.***参见:<Promise.md>***

8. ***data => {g.next(data)}***

   ​	接收一个来自当前的Promise对象(json()返回)的异步操作结果: 从Response对象读取的值.

   ​	接着再一次让生成器函数执行,并向next()传递data数据,即:将data赋值给生成器函数的上一个yield语句左边的变量:

   ​		*var data = yield fetch(url);* 即这个data变量.

9. ***console.log(data.login); // github***

   ​	执行该代码行,在控制台输出data.login =>github.

   ​	然后继续往下执行,由于不存在yield/yield*/return/throw语句,所以该生成器函数将被执行完毕.

10. 生成器函数执行完毕后(被生成器函数封装的异步任务完成后,继续执行下一个异步任务)

    ​	同步任务会先于异步任务经被执行. 参见***<Promise.md - 用法示例及讲解 - 基本用法 - Promise实例和then方法执行的顺序>***
    
    ​		即:如果最后一行存在一个console.log('同步'),则此时这行代码将被执行,最后的结果为:
    
    ​			同步
    
    ​			github

#### 总结

虽然使用Generator函数来执行异步任务,并使用回调函数更简洁,更明了许多,但是Generator函数仍然存在不足,即: 异步任务的流程管理并不方便,

也就是说我们很并不清楚异步任务的第一阶段什么时候执行,第二阶段又是什么时候执行.

# Thunk函数

## 什么是Thunk函数?

### 定义

**Thunk函数是'传名调用'的一种实现方式,用来替换某个需要被计算的表达式.**

### 描述

在参数求值策略的传名调用中,Thunk函数是将一个需要被计算的表达式放入一个temp Function,再在这个tempFunc中写入函数体,

即:写入需要被执行的过程,才从而达到我们想要的效果,而这个tempFunc就叫做Thunk函数. ***详见: 同级目录: 参数的求值策略.***

- Thunk函数同时也是是自动执行Generator函数的一种方法.

  在我们详情了解Generator函数自动执行的方法时,我们先来了解一下基础知识.

## 参数的求值策略

### 什么是参数求值策略

#### 定义

Thunk 函数早在上个世纪 60 年代就诞生了.

那时,编程语言刚刚起步,计算机学家还在研究,编译器怎么写比较好.

一个争论的焦点是"求值策略",即: **函数的参数到底应该何时求值.**

```js
var x = 1;
function f(m) {
  return m * 2;
}
f(x + 5)
```

上面代码定义的函数f,然后向它传入表达式x + 5。

请问,这个表达式应该何时求值,这个求值的过程或者说是方式就是求值策略.

#### 传值调用和传名调用的求值方式

##### 传值调用

一种意见是"传值调用"（call by value）

即:在进入函数体之前,就计算x + 5的值(等于 6),再将这个值传入函数f。

C 语言就采用这种策略.

```js
f(x + 5)
// 传值调用时,等同于
f(6)
```

##### 传名调用

另一种意见是“传名调用”（call by name）

即:直接将表达式x + 5传入函数体,只在用到它的时候求值.

Haskell 语言采用这种策略.

```js
f(x + 5)
// 传名调用时,等同于
(x + 5) * 2
```

#### 传值调用和传名调用哪个好?

**回答是各有利弊.**

**传值调用**比较简单,但是对参数求值的时候,实际上还没用到这个参数,有可能造成性能损失.

- ```javascript
  function f(a, b){
    return b;
  }
  
  f(3 * x * x - 2 * x - 1, x);
  ```

  ​	上面代码中,函数`f`的第一个参数是一个复杂的表达式,但是函数体内根本没用到.

  ​    对这个参数求值,实际上是不必要的.

  ​	因此,有一些计算机学家倾向于"传名调用",即只在执行时求值.

**传名调用**相对于传值调用就比较复杂,因为实际上传名调用是将一个需要被计算的表达式放入一个temp Function,再在这个tempFunc中写入函数体,即:写入需要被执行的过程.

而这个临时函数就叫做Thunk函数.而这正也是Thunk函数的定义.***详见:什么是Thunk函数.***

## JavaScript语言的Thunk函数

### 定义

**将多个参数的函数,替换成只接收单个参数的参数,这个接收的参数为: 一个回调函数callback.**

### 描述

JavaScript语言是传值调用的,即:先计算表达式的值在,再传入到到函数的参数中. 不过JS计算表达式的值时,需要使用到Thunk函数.

在 JavaScript 语言中,Thunk 函数替换的不是表达式,而是将多个参数的函数,替换成一个只接受回调函数作为参数的单参数函数.

​	即:**将多个参数的函数,替换成单参数参数,该参数为: 回调函数callback.**

同时Thunk函数也是自动执行Generator函数实现的一种方式.***(详见: Generator函数的流程管理)***

### 示例

#### one

```javascript
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

1. 即Thunk函数本身接收第一个参数fileName作为其形参,
2. 然后Thunk函数在返回一个函数接收第二个参数callback作为形参,
3. 最后这个函数再统一将fileName和callback参数写入我们需要指定的方法中,然后将此作为返回值返回给第二个函数.

即此时:

- ***var readFileThunk = Thunk(fileName);***

  ​	Thunk(fileName):其返回值为一个函数,即:

  ```js
   functino (callback) {
   	return fs.readFile(filename,callback)
   }
  ```

  ​	需要知道的是,此时的callback已经创建了一个我们传递的实参fileName的副本.

- ***readFileThunk(callback);***

  ​	调用返回的函数,并传递callback作为该函数的形参,最后返回:

  *fs.readFile(filename,callback);* 这个作为返回值.

  ​	注意:这行代码就相当于fs.readFile(filename,callback); 而以上的代码行都是Thunk函数将多参数函数转为单参数函数的转换步骤.

即通过以上的调用Thunk函数,传入参数 -> 获取返回值(函数),传入参数 -> 得到返回值 : fs.readFile(filename,callback) ; 

经过这一系列操作,就相当于直接调用 : fs.readFile(fileName, callback);

---

- 上面的Thunk函数就相当于一个转换器. 

fs模块的readFile方法是一个接收多个参数的函数*(我们省略了一个编码,参见:<node实用库和模块.md>)*,

两个参数分别为文件名和回调函数,经过转换器处理后,它变成了一个接收单个参数的函数,即:只接受回调函数作为参数,

- ​	也就是说,再Thunk函数处理完成之后,就相当于我们执行readFileThunk(callback); 

  ​	而这行代码以上的其他代码行都是Thunk函数自动转换,即JS引擎自己来做,我们调用fs.readFile(fileName, callback);

  ​	在JS引擎内部就相当于先经过Thunk函数转换之后,最后再调用: readFileThunk(callback);

  ​	**所以我们才说,readFile被Thunk函数转换成了只接受一个回调函数作为参数的函数.**

注意:任何函数,只要参数有回调函数,就能写成 Thunk 函数的形式,即被Thunk函数转换,

#### two

- 任何函数,只要参数有回调函数,就能写成 Thunk 函数的形式.

下面是一个简单的 Thunk 函数转换器:

```javascript
// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(func) {
  return function (...args) {
    return function (callback) {
      return func.call(this, ...args, callback);
    }
  };
};
```

- ES6版本释义:

- Thunk函数接收一个函数作为参数,且返回值为:一个函数A

- 函数A接收传递过来所有参数并将之放在一个数组中,返回值为:一个函数B

- 函数B接收callback函数作为参数,其返回值为: 使用指定的this 值和参数计算出的fn函数的返回值.

  若该fn函数没有返回值,则返回 undefined。

使用上面的Thunk转换器,生成fs.readFile的 Thunk 函数.

```javascript
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```

下面是另一个完整的例子,这里使用的上面的ES6版本的Thunk函数转换器.

```javascript
function func(a, callback) {
  callback(a);
}
const funcThunk = Thunk(func);

funcThunk(1)(console.log) // 1
```

整个流程

1. ***const funcThunk = Thunk(func);***

   -  **return function (...args) {...}接着会执行这个**

   ​	Thunk()函数接收一个函数作为参数,并返回一个函数赋值给funcThunk =>该函数接收你传递过来的所有参数.

2. ***funcThunk(1)***

   - **return function (callback) {...}**

   ​	调用funcThunk函数,并传递其实参1给...args,其返回为一个函数=>该函数接收一个callback,即接收一个回调函数

   ​	*(虽然也可以是变量,但是这就没有意义了,因为这个函数中我们会将callbcak作为参数传递给call())*

3. ***funcThunk(1)(console.log)*** 

   - **return fn.call(this, ...args, callback);**

   ​    调用接收callback参数的那个函数,向之传递log()作为参数,然后返回一个:

   ​		func函数*(Thun()中的参数)*的[中使用指定的this 值和参数计算出的]返回值.

4. ***function func(a, callback){...}***

   ​	接下来,会执行这个函数,其中a为...args传过来的参数(这里为1),callback就是callback,即=>log()函数

   - **{callback(a);}**

     ​	即执行console.log(a);  输出: 1

### [Thunkify Module](https://www.npmjs.com/package/thunkify)

#### 源码

生产环境的转换器,建议使用 Thunkify 模块.

这里给出源码:

```javascript
function thunkify(fn) {
  return function() {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

 
    return function (done) {
      var called; // 确保arr.puth(function(){})只运行一次

      args.push(function () {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    }
  }
};
```

- ***thunkify(fn){}*** 

  -  **return function() {}**

  ​	接受一个函数,并返回一个无参函数

-  ***return function() {}***

  - **return function (done) {}**

  ​    该无参函数,返回一个有参函数; 这个有参函数function(done){} 是整个thunkify Module的关键.

  ​	 done参数一般是一个回调函数,这个回调函数用来获取其异步操作的结果和执行时可能会发生的错误.

Thunkify的源码主要多了一个检查机制,变量called确保回调函数只运行一次.这样的设计与下文的 Generator 函数相关.请看下面的例子.

```javascript
function f(a, b, callback){
  var sum = a + b;
  callback(sum);
  callback(sum);
}

var ft = thunkify(f);
var print = console.log.bind(console);
ft(1, 2)(print);
// 3
```

上面代码中,由于`thunkify`只允许回调函数执行一次,所以只输出一行结果.

# Genrator函数的流程管理

## 描述

现在你可能会有疑惑?Thunk函数有什么用呢? 将多个参数的函数变为只接收一个callback的函数,就这吗?

是的,以前Thunk函数确实没有什么用,但是ES6有了Generator函数后,Thunk函数现在可以用于Generator函数的自动流程管理.

因为Thunk函数是递归的,即它会等到上一个执行的异步任务完成之后,才会执行下一个Thunk函数.



## 流程管理

### Generator函数自动执行完所有步骤

```javascript
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while(!res.done){ // 当仍存在下一个序列值,就继续循环.
  console.log(res.value);
  res = g.next(); // 让gen函数继续执行
}
```

上面代码中,Generator 函数gen会自动执行完所有步骤.

但是,这不适合异步操作.

如果必须保证前一步执行完,才能执行后一步,上面的自动执行就不可行,因为我们无法保证它的下一次循环时,上一次循环需要处理的任务已经完成.

所以,此时,Thunk 函数就能派上用处.请继续往下看.

### Thunk函数的自动流程管理

#### 存在一个异步读取文件的生成器函数

```js
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFileThunk('./one.txt');
    console.log(r1.toString());
    var r2 = yield readFileThunk('./two.txt' );
    console.log(r2.toString());
    var r3 = yield readFileThunk('./three.txt');
    console.log('r3:' + r3.toString());
};
```

该gen变量存储了一个生成器函数,整个函数为一个生成器函数表达式***(想知道什么是函数表达式吗?参见:<函数.md>)***

封装了三个读取文件的异步任务,yield语句就是异步任务的关键:

- ​	它将生成器函数的执行权转移给右边的expression,待到expression被计算出来后,才又将执行权返还给Generator函数,
- ​	最后由Generator函数将计算出来的表达式结果抛给next()返回的Common对象的value属性.

#### 手动递归执行上面的Generator函数

在了解Thunk函数的自动流程管理前,我们先来了解一下:如何手动操作使用递归的方式执行Generator函数的流程管理.

我们用下面的代码块执行上面的异步读取文件的生成器函数.

```js
var g = gen();
var r1 = g.next();
r1.value(function (err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function (err, data) {
        if (err) throw err;
        var r3 = g.next(data)
        r3.value(function (err, data) {
            if (err) throw err;
            g.next(data)
        }); // of r3
    }); // of r2
}); // of r1
```

- r1,r2,r3都指向一个Common对象,里面存在value和done属性.

- 其中value属性存的是:  return function (done) {...}

  ​	详见:*Thunk函数 - JavaScript语言的Thunk函数 - Thunkify Module*

- value属性的值(函数): 接收一个回调函数*(详见:<ndoe实用库和模块.md - module - fs - 读取文件-第三个参数>)*

  ​	即:该回调函数会接收你读取到的文件中的数据. 

  ​		然后我们在回调函数内部再一次调用生成器函数返回的生成器对象的next()方法,使得生成器函数再一次执行,

  ​		并向next()中传入该回调函数接收到的本地文件的数据.这样,上一条yield语句左边的变量就是我们向next()中传入的数据了.

我们仔细查看以上的代码可以发现,只要通过以上的方式,在某个回调函数中层层递归调用next()方法,使得生成器函数一直往下执行,直到结束,就可以让生成器函数的每一次执行都在上一个任务完成后.

- ​	因为,只要上一个任务完成,function(err,data){...}回调函数才会被调用,而我们得.next()是存在于这个回调函数中的. 
- ​		*(详见:<ndoe实用库和模块.md - module - fs - 读取文件-第三个参数>) ,你可以发现这么一句话:* 
  ​				readFile方法的第三个参数是读取文件完成后才会执行的回调函数,这个回调函数也就是 function(err,data){...}函数

所以现在我们只需要让该生成器函数能自动的被执行,而不需要让我们自己手动的反复递归next(),请继续往下看.

#### 自动执行上面的异步读取文件的Generator函数

我们了解手动执行Generator函数之后,现在是时候了解如何使用Thunk函数自动自动执行Generator函数.

```javascript
function run(fn) {
  var gen = fn();

  function next(err, data) {
    // 这是gen的next,而不是function next();
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }

  next();
}

function* g() {
  // ...
}

run(g);
```

- ***function run(fn) {...}***

  ​	封装的自动执行器,其中执行的每一个异步操作都必须为Thunk函数,也就是说,生成器函数中的yield语句后面只能是Thunk函数.

-  ***function next(err, data) {...}***

  ​	该next()函数其实就是Thunk函数的回调函数,即:return function (done) {}中的done参数(回调函数) 	*(详见: Thunkify Module)*

  ​		done参数一般是一个回调函数,这个回调函数用来获取其异步操作的结果和执行时可能会发生的错误.

- ***var result = gen.next(data);***

  ​	先启动一次生成器函数,然后为上一个yield语句左边的变量赋data值.(注意:第一次执行时,没有上一条yield语句)

-  ***if (result.done) return;***

  ​	判断Generator函数是否可以继续执行,如果done为true,则代表Generator已经执行完毕,结束整个run的运行

-  ***result.value(next);***

  ​	将next函数当作参数传递给value属性.

  ​	value属性的值其实就相当于Thunk函数的返回值:一个函数.即:如同
  var Thunk = function(fn){....} => **Thunk() == result.value()**

  ​	详见:*Thunkify Module / 示例 - two*



## 总结

Thunk 函数并不是 Generator 函数自动执行的唯一方案。

因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。

回调函数可以做到这一点，Promise 对象也可以做到这一点。

---

利用Thunk函数在自动执行Generator函数时,其Generator函数内部的yield右边必须为一个Thunk函数

Thunk函数可以是自己实现,也可以由他人实现(我们直接以用模块即可,如co模块,Thunkify模块)

Thunk函数有多个不同的封装方式,通常是根据需求封装Thunk函数或直接使用一个扩展性好的Thunk函数直接搞定大部分需求.

无论Thunk函数以什么方式封装的,它最后的目的都会返回一个整体的我们需要的值,即经过异步操作后,所得到的值.

# 其他自动执行Generator函数的方案

## co 模块

### 基本用法

[co 模块](https://github.com/tj/co)是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

下面是一个 Generator 函数，用于依次读取两个文件。

```javascript
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

co 模块可以让你不用编写 Generator 函数的执行器。

```javascript
var co = require('co');
co(gen);
```

上面代码中，Generator 函数只要传入`co`函数，就会自动执行。

`co`函数返回一个`Promise`对象，因此可以用`then`方法添加回调函数。

```javascript
co(gen).then(function (){
  console.log('Generator 函数执行完成');
});
```

上面代码中，等到 Generator 函数执行结束，就会输出一行提示。

### co 模块的原理

为什么 co 可以自动执行 Generator 函数？

前面说过，Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。

（1）回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用`then`方法交回执行权。

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的`yield`命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。

上一节已经介绍了基于 Thunk 函数的自动执行器。下面来看，基于 Promise 对象的自动执行器。这是理解 co 模块必须的。

### 基于 Promise 对象的自动执行

还是沿用上面的例子。首先，把`fs`模块的`readFile`方法包装成一个 Promise 对象。

```javascript
var fs = require('fs');

var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) return reject(error);
      resolve(data);
    });
  });
};

var gen = function* (){
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

然后，手动执行上面的 Generator 函数。

```javascript
var g = gen();

g.next().value.then(function(data){
  g.next(data).value.then(function(data){
    g.next(data);
  });
});
```

手动执行其实就是用`then`方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。

```javascript
function run(gen){
  var g = gen();

  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

run(gen);
```

上面代码中，只要 Generator 函数还没执行到最后一步，`next`函数就调用自身，以此实现自动执行。

### co 模块的源码

co 就是上面那个自动执行器的扩展，它的源码只有几十行，非常简单。

首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
  });
}
```

在返回的 Promise 对象里面，co 先检查参数`gen`是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为`resolved`。

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
  });
}
```

接着，co 将 Generator 函数的内部指针对象的`next`方法，包装成`onFulfilled`函数。这主要是为了能够捕捉抛出的错误。

```javascript
function co(gen) {
  var ctx = this;

  return new Promise(function(resolve, reject) {
    if (typeof gen === 'function') gen = gen.call(ctx);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
  });
}
```

最后，就是关键的`next`函数，它会反复调用自身。

```javascript
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(
    new TypeError(
      'You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "'
      + String(ret.value)
      + '"'
    )
  );
}
```

上面代码中，`next`函数的内部代码，一共只有四行命令。

第一行，检查当前是否为 Generator 函数的最后一步，如果是就返回。

第二行，确保每一步的返回值，是 Promise 对象。

第三行，使用`then`方法，为返回值加上回调函数，然后通过`onFulfilled`函数再次调用`next`函数。

第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为`rejected`，从而终止执行。

### 处理并发的异步操作

co 支持并发的异步操作，即允许某些操作同时进行，等到它们全部完成，才进行下一步。

这时，要把并发的操作都放在数组或对象里面，跟在`yield`语句后面。

```javascript
// 数组的写法
co(function* () {
  var res = yield [
    Promise.resolve(1),
    Promise.resolve(2)
  ];
  console.log(res);
}).catch(onerror);

// 对象的写法
co(function* () {
  var res = yield {
    1: Promise.resolve(1),
    2: Promise.resolve(2),
  };
  console.log(res);
}).catch(onerror);
```

下面是另一个例子。

```javascript
co(function* () {
  var values = [n1, n2, n3];
  yield values.map(somethingAsync);
});

function* somethingAsync(x) {
  // do something async
  return y
}
```

上面的代码允许并发三个`somethingAsync`异步操作，等到它们全部完成，才会进行下一步。

### 实例：处理 Stream

Node 提供 Stream 模式读写数据，特点是一次只处理数据的一部分，数据分成一块块依次处理，就好像“数据流”一样。这对于处理大规模数据非常有利。Stream 模式使用 EventEmitter API，会释放三个事件。

- `data`事件：下一块数据块已经准备好了。
- `end`事件：整个“数据流”处理完了。
- `error`事件：发生错误。

使用`Promise.race()`函数，可以判断这三个事件之中哪一个最先发生，只有当`data`事件最先发生时，才进入下一个数据块的处理。从而，我们可以通过一个`while`循环，完成所有数据的读取。

```javascript
const co = require('co');
const fs = require('fs');

const stream = fs.createReadStream('./les_miserables.txt');
let valjeanCount = 0;

co(function*() {
  while(true) {
    const res = yield Promise.race([
      new Promise(resolve => stream.once('data', resolve)),
      new Promise(resolve => stream.once('end', resolve)),
      new Promise((resolve, reject) => stream.once('error', reject))
    ]);
    if (!res) {
      break;
    }
    stream.removeAllListeners('data');
    stream.removeAllListeners('end');
    stream.removeAllListeners('error');
    valjeanCount += (res.toString().match(/valjean/ig) || []).length;
  }
  console.log('count:', valjeanCount); // count: 1120
});
```

上面代码采用 Stream 模式读取《悲惨世界》的文本文件，对于每个数据块都使用`stream.once`方法，在`data`、`end`、`error`三个事件上添加一次性回调函数。变量`res`只有在`data`事件发生时才有值，然后累加每个数据块之中`valjean`这个词出现的次数。

