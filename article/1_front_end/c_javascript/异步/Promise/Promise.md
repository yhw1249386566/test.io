# [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)（微任务）

- 一个宏任务执行完毕，就会执行所有微任务。
  
  参见：***《JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md》***

## 描述

Promises是JS异步编程的一种解决方案,比传统的解决方案更合理,更强大----回调函数和事件.

最开始时,Promise由社区最早提出和实现,最后ES6将其写进了语言标准,统一了用法,原生提供Promise对象.

## 定义

从语法层面来说,Promise是一个构造函数,是一个构造器,如同Function,String,Boolean这样的构造器(构造函数).我们可以使用new操作符实例化Promise.

Promise被实例化后,如同一个容器,里面保存着某个未来才会结束的事件的结果-----这个事件通常是一个异步操作.

## 特点(优点)

Promise构造器创建的实例(对象)有以下两个特点

### 特点一

- **对象的状态不受外界影响.**

对于Promise的对象(实例)来说,它代表的是一个异步操作,其存在三种状态*(就和ajax请求那般,存在onreadystatechange一样)*: 

1. pending (进行中)
2. fulfilled (已成功)
3. rejected (已失败)

请记住:**只有异步操作的结果,可以决定当前是哪一种状态,任何其他操作都无法改变这个状态.**

​    即:只有异步任务执行完成后,promise对象的状态才会被改变,被固定(settled),否则都是pending,除非function(resolved,rejected)(){}内部抛出一个错误.

​        *而如果我们直接将resolved()/rejected()放在异步任务外面,而不是里面,则promise对象状态会虚假的改变成resolved,因为会被.then()方法捕获,从而导致程序会先执行.then()方法中的函数,然后再执行异步任务.*

​        *而不是先执行异步任务,等到异步任务的结果彻底将promise对象状态settled之后再执行.then().*

​        *所以只要我们将resolved()/rejected()放在某个异步任务内部,等到异步任务完成后再改变promise对象的状态,则这个异步任务就会优于.then()方法执行,然后再执行异步任务,这是一个很不错的选择.*

这也是Promise这个名字的由来,它的英语意思就是“承诺”,表示其他手段无法改变.

### 特点二

- **Promise的实例(对象)的状态一旦被改变,就不会再变,任何时候都可以得到这个结果.**

Promise的对象的状态改变,只有两种可能:

1. pending(进行中) => fulfilled(已完成)
2. pending(进行中) => rejected(已失败)

只要以上两种情况发生,则promise对象的状态将会被凝固,不会再被改变,会一直保持这个结果,**此时,我们将promise对象的状态凝固称之为: resolved(已定型)**

如果promise对象的改变已经发生了,即使再对promise对象添加回调函数,也会立即得到凝固的结果.

​    *PS:这与事件(Event)完全不同.事件的特点是:如果你错过了它,再去监听,是得不到结果的.*

### 注意

注意,为了行文方便,本章**后面的resolved统一只指fulfilled状态**,不包含rejected状态.

有了Promise对象,就可以将异步操作以同步操作的流程表达出来,避免了层层嵌套的回调函数.

此外,Promise对象提供统一的接口,使得控制异步操作更加容易.

## 缺点

Promise当然也有缺点了,没有任何事情是完美的.

1. 无法取消Promise,一旦新建它就会立即执行,无法中途取消.
   
   ​    --即: new Promise(function(resolved,rejected){...}); 一旦创建Promise的实例,则会立即执行这个实例.

2. 如果不设置回调函数,Promise实例内部抛出的错误,不会反应到外部.

3. 处于pending状态时,无法得知目前进展到哪一个阶段(刚刚开始还是即将完成)

如果某些事件不断地反复发生,一般来说,使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署Promise更好的选择.

## 语法

### 基本语法

#### 语法

`new Promise( /* executor */ function(resolve, reject){})`

#### 参数解析

##### executor

- **即指的是function(resolve,reject){}这个函数本身.**

executor是带有 resolve 和 reject 两个参数的函数,Promise构造函数执行时会立即调用executor 函数, resolve 和 reject 两个参数函数作为参数传递给executor

请注意:executor 函数在Promise构造函数返回所建的promise实例对象前就被调用,否则如果已经返回了promise对象后,怎么改变它的状态?***详见:特点(优点) - 特点二***

resolve 和 reject 函数被调用时,它们的作用是:分别将promise的状态改为*fulfilled(*完成)或rejected(失败).

executor 内部通常会执行一些异步操作,一旦异步操作执行完毕(可能成功/失败),要么调用resolve函数来将promise状态改成*fulfilled*,要么调用reject 函数将promise的状态改为rejected.

如果在executor函数中抛出一个错误,那么该promise 状态为rejected.

executor函数的返回值被忽略.

##### function(resolve, reject){...}

Promise构造器接收一个函数作为其参数,然后该函数只接收两个参数,这两个参数都为函数: 

1. 异步操作成功后执行的函数:resolve
2. 异步操作失败后执行的函数:reject

**且这个function(){}函数以及其中的两个参数函数并不需要由开发者部署,而是ES6内部自己实现的,我们只需要使用即可.**

###### resolve函数 (成功)

resolve函数的作用为: 将Promise对象的状态从"未完成"变成"成功"'; 该函数在异步操作成功时调用,**并将异步操作的结果作为参数传递出去.**

- 异步操作的结果指的是调用resolve函数时，向 resolve 函数传递的实参，如：
  
  resolve('我是异步操作时，成功的结果')

###### reject函数 (失败)

reject函数的作用为:将Promise对象的状态"从未完成"变成"失败"; 该函数在异步操作失败时调用,**并将异步操作的结果作为参数传递出去.**

- 异步操作的结果指的是调用reject函数时，向 reject函数传递的实参，如：
  
  reject('我是异步操作时，失败的结果')

## Pormise构造函数的方法

### Promise.prototype.then()

#### 描述

由于then方法是通过prototype属性指针指向的一个方法,所以其Promise构造函数的所有实例皆可使用then()方法.

且then()方法接收两个参数,这两个参数都是函数,分别为:

1. resolved
2. rejected

​    **且then()方法指定的回调函数(即以上两个参数),将在当前脚本所有同步任务执行完才会执行.** 

注意:这两个参数函数你可以自定义.

​        *详见: 2级目录: 用法示例 - 基本用法 - Promise实例和then方法执行的顺序*

#### 语法和参数解析

##### 语法

`promiseObj.then(resolved, rejected);`

##### 参数解析

###### resolved 必须

resolved: 是一个回调函数,当调用then()方法的Promise实例的状态被改变成"已成功"时,则该回调函数resolved会被执行

​    *(前提是new Promise()里的函数已经执行完毕且需要按照程序执行顺序规则，参见：**<JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md>**)*,

并且接收当前使该方法执行的Promise对象的异步操作的结果.

- 这个回调函数可以传参,可以自定义该函数

###### rejected 可选

rejected : 是一个回调函数,当调用then()方法的Promise实例的状态被改变成"已失败"时,则该回调函数rejected 会被执行.

- 这个回调函数可以传参,可以自定义该函数

##### 返回值

then() 方法返回一个 Promise对象. 若then()方法是被其他then()方法调用,则当前被调用的then方法将创建一个没有经过回调函数处理的新 Promise 对象，这个新 Promise 只是简单地接受调用这个 then 的原 Promise 的终态作为它的终态。

```js
   Promise.resolve().then(function () {
        console.log('promise1');
    }).then(function () {
        console.log('promise2');
    });
```

以上示例,只有一个Promise.resolve(), 它返回的promise对象结果已经被紧随其后的then()方法捕捉了,所以第二个then()将不能捕捉什么,它只是简单的创建了promise对象,其终态和Promise.resolve()返回的Promise的终态一样.

此时，这里的两个 then() 方法使用的 Promise 对象的终态为：fulfilled，即第一个参数 resolve() 函数会被调用。

#### 作用

then()方法的作用为: 为Promise实例添加状态被改变时的回调函数,也就是说如果Promise实例的状态改变,则then()方法就会依照程序执行规则被调用,参见：***<JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md>***

然后根据其状态被改变成:"已成功" 或是 "已失败",去调用对应的回调函数:

- resolved(第一参数) 
- rejected(第二个参数) 可选

#### 示例

##### 简单示例

### [Promise.prototype.catch()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

#### 描述

catch() 方法返回一个Promise,并且处理拒绝(rejected)的情况.

它的行为与调用Promise.prototype.then(undefined, onRejected)相同.

#### 返回值

catch()方法本身返回一个Promise对象.

#### 语法

promiseObj.catch(onRejected)

##### 参数解析

###### onRejected

当Promise被rejected时,被调用的一个Function,即一个回调函数,该function函数拥有一个参数:reason, 即指的是:Promise对象rejected 的原因.

 如果 onRejected回调函数中抛出一个错误或回调函数返回一个本身失败的 Promise,  则通过 catch() 返回的Promise将被rejected;

除此之外,catch()返回的Promise都将为resolved. 

### Promise.prototype.finally()

### [Promise.all(iterator)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

#### 作用

此方法在集合多个promise对象的返回结果时很有用。

**即:Promise.all(iterator)方法让一组的promise对象在同一时间被完成**

​    为什么这么说呢?因为只有all方法的iterator参数中所有的promise都为resolved时,该all()方法返回的promise对象才会为resolved,***详见:语法-返回值***)

​        *否则除了空的iterator/不包含任何的promise对象,返回的promise都为rejected.*

​    而.then()方法捕捉的就是all()方法返回的promise对象的状态*(all()方法的返回值: 里面的所有promise对象都resolve后才返回resolved,否则返回rejected)*

​    这样就相当于变相的让每个在all()方法中的promise对象"同时"完成(其实还是有先后执行之分的,但是在all()方法中就等于同时完成)

​        且这在iterator对象里面的promise对象都是**并发**的,即:**它们会同时在一定时间内完成**,所以我们iterator对象里面的各个数据其实都可以认为是一起执行的.*参见<操作系统基础.md>*

​        *(因为同时完成,all()方法返回的promise对象才会被改变状态)*

​    ***详见,同级目录: 描述***

#### 描述

它返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 实例,此对象(实例)在 iterator 参数对象中所有的promise对象都完成（resolved）或参数中没有一个promise对象时状态会被改变为:resolve；

如果参数中 promise 有一个失败（rejected）,此实例回调失败（reject）,**失败原因是第一个失败 promise 的结果。**

-----

此方法在集合多个 `promise` 的返回结果时很有用。

*all返回的promise对象的状态何时为:完成（Fulfillment）：*

- **如果传入的可迭代对象为空:**
  
  Promise.all **会同步地返回**一个已完成（resolved）状态的promise。

- **如果所有传入的 promise 都变为完成状态,或者传入的可迭代对象内没有 promise:**
  
  Promise.all 返回的 promise 异步地变为完成。

*all返回的promise对象的状态何时为:失败/拒绝（Rejection）：*

- 如果传入的 promise 中有一个失败（rejected）,
  
  Promise.all 异步地将失败的那个结果给then()方法的失败状态的回调函数,而不管其它 promise 是否完成。

#### 语法

`Promise.all(iterator);`

##### 参数解析

###### iterator

一个[可迭代](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol)对象,如 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 或 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)

***参见:<迭代器和生成器以及协议.md>***

##### 返回值

- 如果传入的参数是一个空的可迭代对象,则会返回一个**已完成（already resolved）**状态的 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的对象(实例)
  
  ​    注意:`Promise.all` **当且仅当**传入的可迭代对象 为空 时为同步.

- 如果传入的参数不包含任何 promise,则返回一个**异步完成（asynchronously resolved）** [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
  
  ​    注意：Google Chrome 58 在这种情况下返回一个**已完成（already resolved）**状态的 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。

- 其它情况下,即:iterator参数包含promise对象或非promise值时,
  
  ​    返回一个**处理中（pending）**的[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)。
  
  ​    这个返回的 promise 会在所有的 promise 都完成或有一个 promise 失败时**异步**地变为完成或失败。 
  
  ​    返回值将会按照参数内的 promise 顺序排列,而不是由调用 promise 的完成顺序决定。

- 注意:在任何情况下,Promise.all 返回的 promise 的完成状态的结果都是一个数组,它包含所有的传入迭代参数对象的值（也包括非 promise 值）。
  
  ​    **即:all()返回的promise对象的异步操作结果无论如何都是一个数组.**
  
  ​    换句话说,就是: iterator参数对象的所有值将被转为一个数组,作为all()返回的promise对象的异步操作结果.

#### 总结

all()方法接收一个iterator对象并返回一个promise对象.

它的目的是将多个的不同的promise对象写在一个iterator对象中,让这些不同的promise对象能在同一个时间完成.

当这些promise对象都完成之后,all()返回的promise对象的状态将被改为: resolved,*否则状态为pending.*

​    *如果这些promise对象只要有一个状态变为:rejected,则all返回的promise对象也将直接被改为rejected,且失败原因(异步操作结果):第一个失败 promise 的结果*

并将iterator对象中的*promise对象/非promise值(如原始值)*的异步操作结果根据参数的先后顺序放入一个数组中,最后把这个数组作为all()返回的promise对象的异步操作结果.

但是如果传给all()的参数为*除了promise对象/非promise值(如原始值)*以外的其他结果,***则参见: 语法 - 返回值***

#### 示例

##### 简单示例

```js
    var p1 = Promise.resolve(3); // p1 是 Promise 的实例
    var p2 = 1337;
    var p3 = new Promise((resolve, reject) => { // p3 是 Promise 的实例
        setTimeout(resolve, 100, 'foo');
    });

    // 等待 p1,p2,p3 的 promise 都为 resolve，.then 的 values 就会得到值
    Promise.all([p1, p2, p3]).then(values => {
        console.log(values); // [3, 1337, "foo"] 
    });
    console.log('同步')
/**
    同步
    [3, 1337, "foo"] 
*/
```

- ***Promise.resolve(3);***
  
  ​    由于resolve()方法的参数是一个原始值:3,所以其返回的promise对象的状态直接变为fulfilled,且将值:3作为异步操作的结果.
  
  ​    返回的promise对象会赋值给p1变量.
  
  ​    ***详见:Promise.resolve(value)***

- ***new Promise((resolve, reject)=>{setTimeout(resolve, 100, 'foo'); });***
  
  ​    实例化Promise,创建promise对象,并向之传入一个参数函数,接收两个回调函数***(详见:语法)***,然后立即执行 new Promise({...}). 
  
  ​    由于该函数是异步任务,所以它将会先被挂起,先执行完所有同步任务才会执行该异步任务.
  
  ​    该异步任务被执行后,由于是setTimeoutI()函数:所以需要等待100ms,才会执行resolve函数,并向该函数传入'foo'作为参数.
  
  ​    注意:resolve函数会将该Promise实例改为resolved状态,并将异步操作的结果抛出去,即:'foo'为异步操作的结果.

- ***console.log('同步')***
  
  ​    同步任务优先于异步任务执行.

- ***Promise.all([p1, p2, p3])***
  
  ​    使用all()方法,让p1,p2,p3这三个变量'同时'完成并返回一个promise对象且将各个变量的操作结果放入一个数组作为promise对象的异步操作结果,
  
  ​    所以此时p1:3, p2:1337,p3:foo, 即为: [3, 1337, "foo"] 

- ***.then(value=>{...})***
  
  ​    捕获当前的promise对象的状态(all返回的promise对象),根据其状态执行对应的函数,并分别接收异步操作的结果 / 错误的原因.
  
  ​    这里的promise对象状态为:resolved. 而value接收到的异步操作结果为:  [3, 1337, "foo"] ,  所以最后console.log(values); 也输出该结果.

### Promise.race()

### Promise.allSettled()

### Promise.any()

### [Promise.resolve(value)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

#### 描述

resolve()方法返回一个以给定的参数解析后的Promise对象.具体用法***详见:语法***

#### 语法

`Promise.resolve(value);`

##### 参数解析

###### value

该value参数决定resolve返回的Promise对象的状态.

- 若该参数为一个promise对象,则resolve()将返回这个promise对象.
- 若该参数为一个thenable对象(带有"then"方法的对象),则resolve()返回的promise对象会“跟随”这个thenable的对象,采用它的最终状态
- 若该参数为空/基本类型/不带then方法的对象,则返回的Promise对象状态为fulfilled,并且将该value传递给对应的then方法

##### 返回值

resolve()返回值为:一个promise对象,其状态由value参数决定.

如果参数本身就是一个Promise对象，则直接返回这个Promise对象。

#### 警告

不要在解析为自身的thenable 上调用`Promise.resolve`。

这将导致无限递归，因为它试图展平无限嵌套的promise。一个例子是将它与Angular中的异步管道一起使用。在[此处](https://angular.io/guide/template-syntax#avoid-side-effects)了解更多信息。

### [Promise.reject(reason)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

#### 描述

静态函数Promise.reject返回一个被拒绝(rejected)的Promise对象.

通过使用[Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)的实例获取错误原因reason,对调试和选择性错误捕捉很有帮助.

#### 返回值

该方法会返回一个带有拒绝(rejected)原因的Promise对象

#### 语法

`Promise.reject(reason);`

##### 参数解析

###### reason

表示Promise被拒绝的原因.

##### 返回值

一个给定原因了的被拒绝的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise).

## 用法示例及讲解

### 基本用法

```js
function resolved(result) {
  console.log('Resolved');
}

function rejected(result) {
  console.error(result);
}

Promise.reject(new Error('fail'))
    .then(resolved, rejected); // 执行 rejected 回调函数
// Error: fail
```

#### 创建一个Promise实例(对象)

一个Promise实例(对象):

```js
const promise = new Promise(function(resolved, rejected) {
  // ... some code

  if (/* 异步操作成功 */){
    resolved(value); // 成功就 resolved
  } else {
    rejected(error); // 失败就 rejected
  }
});
```

resolved和rejected参数函数具体有什么作用,***详见:语法-基本语法-参数解析***

当Promise实例生成之后,我们可以使用其Promise构造函数的prototype属性指向的then方法,用这个then方法分别执行resolved状态和rejected状态的回调函数.

- ```js
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
  ```
  
  详见:***Promise构造函数的方法 - Promise.prototype.then()***

#### 使用then方法

```js
    function promiseFunc(resolved, rejected) {
        resolved();    
    }
    const promise = new Promise(promiseFunc);

    promise.then(function () {
        console.log('sucess');
    },function(error) {
        console.log(error)
    });
    console.log('同步堵塞');
/**
    同步堵塞
    sucess
*/
```

- ***const promise = new Promise(promiseFunc);***
  
  ​    实例化Promise,并向Promise构造函数传递一个函数*(内置的一个函数),*该函数(只能)接收两个参数函数:resolved, rejected.

- ***function promiseFunc(resolved, rejected) {resolved(); }***
  
  ​    使用*传递给Promise构造器的*函数中的两个ES实现的内置参数函数,改变其Promise的实例的状态.
  
  ​    将Promise的实例的状态由:
  
  ​    pending(进行中) 改变为=> fulfilled(已成功)

- ***promise.then(resolved, rejected);*** 
  
  ​    使用Pormise构造函数的prototype属性指向的then方法,捕获Promise的对象的状态,根据其状态选择执行哪个(回调)函数. 
  
  ​        回调函数可接收*(改变Promise对象为成功/失败时执行的函数,在这里为:resolved()函数的结果)*异步操作的结果作为参数.
  
  ​    (这个异步操作的结果: 为resolved / rejected 函数的参数)

#### Promise实例和then方法执行的顺序

```js
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});


promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

/** 
    Promise
    Hi!
    resolved
*/    
```

- ***let promise = new Promise(function(resolve, reject) {...}***
  
  ​    当Promise被实例化时,其参数函数中的代码就会立即被执行,所以会首先输出Promise.

- ***promise.then(resolved, rejected);***
  
  ​    then()方法指定的回调函数,将在当前脚本所有同步任务执行完才会执行,所以resolved最后输出.
  
  ​    这是因为它是微任务，参见：\<JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md />
  
  ​    *(详见: Promise.prototype.then() - 描述)*

- ***console.log('Hi!');***
  
  ​    当前脚本的同步任务.

#### 详细讲解(then+promise)

```js
let promise = new Promise(function (resolved, rejected) {
  setTimeout(function () {
    console.log("1秒后");
    resolved("我是异步操作的结果");
    console.log('promise',promise); //当异步任务完成后,promsie对象的状态才会被改变,否则都是pending状态.
  });
}).then(
  function (resolveResult) {
    console.log('then',promise); // pending状态
    console.log(`接收异步操作的结果:${resolveResult}`);
  },
  function (rejectResult) {
    console.log(`失败的异步任务:${rejectResult}`);
  }
);

console.log('console',promise); // pending状态
```

- ***setTimeout(function () { });*** 
  
       需要异步操作的任务

- ***resolved('我是异步操作的结果');***
  
  ​    改变promise对象为fulfilled状态,并抛出一个异步操作的结果.
  
  ​    **注意:只有异步任务执行完成后,promise对象的状态才会被改变,否则都是pending,除非function(resolved,rejected)(){}内部抛出一个错误.**
  
  ​    ***详见: 特点(优点) - 特点一***

- ***.then(...) {}***
  
  ​    捕获其promise对象的状态,根据状态判断要执行哪个函数

- ***function (resolveResult){}***
  
  ​     成功执行的函数,其参数接收promise对象异步操作的结果

- ***function (rejectResult){}***
  
  ​    失败执行的函数,其参数接收promise对象异步操作的结果

---

其示例执行顺序:

- let promise = new Promise(...);
- setTimeout(function () { }
- .then(...)（其实不是执行，只是先让程序知道有这个函数）
- 执行所有同步任务 console.log(promise); 

***详见: 特点(优点) - 特点一***

- 执行setTimeout()函数内部的代码行
- 执行.then()方法内部的对应promise对象状态的函数
- 结束执行

## Promise的术语

- pending:等待状态

- fulfilled:成功状态

- rejected:失败状态

- resolved:锁定状态,通常被代指成功状态.
  
  表示promise对象处于settled状态,即一个promise对象处在fulfilled或rejected状态而不是pending状态

更多参见: [官方文档](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)