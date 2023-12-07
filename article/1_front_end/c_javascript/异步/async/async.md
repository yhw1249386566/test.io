[TOC]

# async函数

## 什么是async函数

### 描述

async: asynchronous,即异步的.

async函数是ES2017(即ES6)标准中引入的一个函数,这个函数使得异步操作变得更加方便.

而async函数是什么呢?说白了,就是: **Generator函数的语句糖**.*(参见:<迭代器和生成器以及协议.md>)* 

### 比较Generator函数和async函数的区别

现在有一个Generator函数,依次读取两个文件:

```js
// 引入fs模块
const fs = require('fs');

// 异步读取文件的生成器函数
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 一个Thunk函数
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};
```

- Thunk函数,***参见:<Generator函数的异步应用.md>***

  ​	简单介绍一些,即: 将JS是传值调用的,将JS中的多个参数函数转换成只接收单个回调函数作为参数 的函数,

  ​	即Thunk是一个转换器,同时Thunk函数也是自动执行Generator函数实现的一种方式.

  ​	利用Thunk函数在自动执行Generator函数时,其Generator函数内部的yield右边必须为一个Thunk函数

  ---

  ​	Thunk函数可以是自己实现,也可以由他人实现(我们直接以用模块即可,如co模块,Thunkify模块)

  ​	Thunk函数有多个不同的封装方式,通常是根据需求封装Thunk函数或直接使用一个扩展性好的Thunk函数直接搞定大部分需求.

  ​	无论Thunk函数以什么方式封装的,它最后的目的都会返回一个整体的我们需要的值.

  ​	即经过异步操作后,所得到的值

上面代码的gen()生成器函数可以写成以下形式:

```js
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

**一比较就会发现,async函数就是将 Generator 函数的星号（*）替换成async,将yield替换成await,仅此而已.** 

### async函数对Generator函数的改进

那么除了改进Generator函数的语义以外,还有什么用呢?

即: async函数基于Generator函数上,总共改进了以下4个方面(包括语义):

#### 内置执行器

Generator函数想要执行必须的依靠一个执行器,如co模块; 而async函数本身自带执行器.也就是说,async函数的自动执行,不依赖于任何模块,与普通函数一摸一样,只要一行就足够了.

- `asyncReadFile()`

上面的代码调用了asyncReadFile函数,然后它就会自动执行,输出最后结果.

这完全不像 Generator 函数,需要调用next方法,或者用co模块,才能真正执行,得到最后结果.

#### 更好的语义

async和await,比起星号和yield,语义更清楚async表示函数里有异步操作,await表示紧跟在后面的表达式需要等待结果.

#### 更广的适用性

co模块约定,yield命令后面只能是 Thunk 函数或 Promise 对象; 而async函数的await命令后面,可以是 Promise 对象和原始类型的值.

原始类型的值: 可以是数值、字符串和布尔值,但这时会自动转成立即 resolved 的 Promise 对象.

​	即:此时的await就相当于抛出了一个Promise对象(resolved)

#### 返回值是Promise对象

async函数的返回值是 Promise 对象,这比 Generator 函数的返回值是 Iterator 对象方便多了,你可以直接使用then方法指定下一步的操作.

即:当async函数返回的Promise对象的异步任务都执行成功/有个失败时, then(resolved,rejected)就会捕获该Promise对象的状态,从而执行对应的回调函数.

## 描述

async 函数内部可以存在 await 语句,还能存在其他语句,而 await 语句只能存在于 async 函数中(详见:await)

async函数返回一个 Promise 对象,且只有当async函数中的所有异步操作都成功之后(resolved),也就是说await语句后的所有表达式都执行完成后,其async函数返回的promise对象才会resolved,

但是这样并不会马上执行对应的then()方法,而是等到async函数整体执行完毕并依照程序执行规则后（参见：***<JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md>***）,其then()方法才会捕获返回的promise对象的状态.

​	*还需要注意的是:在执行异步任务的时候,如果有同步任务,则异步任务会被挂起,先执行完同步任务,才执行异步任务.参见: **<Promise.md> 和 <JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md>***

​	*同时详见:用法 - 基本用法 - async函数返回的promise对象的状态变化*

async函数内部return语句返回的值,会成为then方法回调函数的参数.

***详见:用法 - 基本用法 - async函数的返回值:promise对象的异步操作结果***

## 语法

`async function funcName(arg...){statements}`

`const asyncFunc = async function() {}`

### 参数解析

#### arg 

要传递给函数的参数.

#### statements

函数体语句,通常为一些异步任务.

### 返回值

一个promise对象.***参见:<Promise.md>***

## 用法

### 基本用法

由于async函数返回的值是promise对象,所以我们可以使用then()方法捕捉该promise对象的状态和接收其异步操作的结果作为参数.

#### 指定多少ms后,输出值并捕获promise对象状态

```js
    function timeout(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms, '1');
            // timeoutData 为异步操作结果
        }).then(timeoutData=>{
            console.log(`timeout:${timeoutData}`)
        });
    }

    async function asyncPrint(value, ms) {
        // asyncPrintData 为异步操作结果
        await timeout(ms).then(asyncPrintData => { 
            console.log(`asyncPrintData:${asyncPrintData}`); 
        });
        console.log(value);
        return 2;
    }

    asyncPrint('hello world', 50).then(data => { 
        console.log(`asyncPrint异步操作的结果:${data}`) 
    });
/**
timeout:1
asyncPrintData:undefined
hello world
asyncPrint异步操作的结果:2
*/
```

**代码解析**

注意:该代码解析同时也是按照程序执行的顺序来写的.

- ***asyncPrint('hello world', 50)***

  ​	首先该async函数会被执行,并向之传入参数.

- ***await timeout(ms)***

  ​	将asyncPrint函数的执行权交给timeout()表达式,由于该表达式是一个函数,所以会去执行这个函数.(不执行这个函数,怎么知道哪里有异步任务?)

- ***return new Promise(...)***

  ​	timeout()函数会实例化一个Promise,并返回这个promise对象,由于实例化Promise时,会立即执行Promise,所以Promise中的参数函数将被执行.function(resolved, rejected){...}

- ***(resolve) => {setTimeout(resolve, ms, '1');}***

  ​	其完整写法为:function(rsolve){setTimeout(resolve, ms, '1');}

  ​	即会立即执行该匿名函数,由于其代码块中的是setTimeout()参数,所以将在ms时间后,执行resolve参数函数,并向之传入'1'作为其参数.

  ​	同时: resolve参数函数的参数'1'也正式该new Promise()的实例(对象)异步操作的结果.***参见:<Promise.md>***

- ***.then(timeoutData=>{console.log(timeout:${timeoutData})});***

  ​	该then()方法捕获的是timeout中的promsie对象的状态. 所以需要等到promise对象异步完成/失败之后,该then()方法才会执行.

  ​	ms事件后,执行resolve参数函数,并向之传入'1'作为其参数,此时promise对象的状态由于执行了resolve函数,所以被改变成了fulfilled.

  ​	then()方法被执行,输出: timeout:1

-  await timeout(ms)**.then(asyncPrintData => { })**

  ​	由于我们在return new Promise(....);语句后面已经存在了promise.prototype的then()方法,所以该then()方法的参数并不会接收到来自promise对象的异步操作结果.

  ​	所以,输出结果为: asyncPrintData:undefined；如果将 .then(timeoutData=>{}); 删除，则 asyncPrintData 将接受从 timeout() 返回的 promise 对象的异步操作结果。

- ***console.log(value);***    ***return 2;***

  ​	前者就不说了,将会被直接执行,后者是asyncPrint()函数的异步操作结果,***详见:语法 - 描述***

#### async函数的返回值:promise对象的异步操作结果如何获取

##### 描述

在async函数中,其内部return语句返回的值,会成为then()方法中的回调函数的参数,

也就是return语句其返回的值为async函数的(返回的)promise对象的异步操作结果,会作为then()方法中的对应的回调函数的参数.

##### 示例

###### resolved示例

```js
async function foo() {
	return 'hello world'
}
foo().then(data => { console.log(data) }); // hello world
```

###### rejected示例

async函数内部抛出错误,会导致async函数返回的 Promise 对象变为reject状态,无论这个错误是不是被return出来的,(即使是await语句后面抛出的错误也是如此)

抛出的错误对象会被catch方法或then()中的回调函数接收到.

```javascript
async function f() {
	await new Promise((resolve, rejecte) => {
		throw new Error('出错了'); //该promise对象状态变为:rejected;
	});

}
f().then(
	v => console.log(v), // resolved执行
	e => console.log(e) // rejected执行
);
// 以下写法也能捕获其f()返回的promise对象抛出的错误;
f().catch((e) => console.log(e));

/** 输出: Error: 出错了 */
```

- ***f().catch((e) => console.log(e));***

  ​	参见:<Promise.md>

#### async函数返回的promise对象的状态变化

##### 描述

async函数返回的 Promise 对象,必须等到内部所有await命令后面的 Promise 对象执行完,才会发生状态改变,除非遇到return语句或者抛出错误.

只有async函数内部的异步操作执行完包括整个函数体执行完,才会执行对应的then方法指定的回调函数.

##### 示例

```javascript
/** 获取某个url中的title */
const fetch = require('node-fetch')
async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('http://www.whyhw.com').then(console.log)
 // Arbitrary
```

上面代码中,函数getTitle内部有三个操作：抓取网页、取出文本、匹配页面标题并作为其async函数返回的promise对象的异步操作结果,还包括一个log()方法

只有这三个操作全部完成外加log()方法执行完成,才会执行then方法里面的console.log.

且注意: 这段代码作者是在node环境下运行的,所以并不会出现同源策略的问题
否则在去掉require语句,并将其与代码放入htmL中执行,可能出现同源策略,

此时要么使用JSONP模式跨域***,(参见:<JSON和JSONP.md>),要么使用其他方法.***比如:直接放如一个服务器中运行.

### async函数具有多种使用形式(方法)

```js
// 最为正常的函数声明
async function foo(){...};

// 函数表达式
let asyncFuntion = async function(){...};

// 对象的方法
let obj = {
	async foo() { return '异步操作的结果' }
}
obj.foo().then(data => {
	console.log(data); // 会输出: '异步操作的结果'
})     
                                    
// 箭头函数
const foo = async () => {...};                           
                         
// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }
  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
};
                         
const storage = new Storage();
storage.getAvatar('jake').then(…);                       
```



# [await](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)

## 称呼

await可以叫做await操作符,或者await指令,或await语句,其实叫什么并不重要,重要是你知道它是做什么用.(这里我们称之为await语句)

## 描述

await语句只能用在async function中(即async函数中),用在其他地方都将报错,*至少2020/4/14日之前是这样子的.*

await语句用于等待一个Promise对象或其他需要异步执行的任务,即:任何需要等待的值.***详见:同级目录,语句***

await语句将会暂停当前的async函数的执行(如yield/yield*一样),只有当右边的表达式被计算完成后,即需要被执行的任务完成后,如:promise对象转为fulfilled时, async函数才会继续往下执行,

同时await语句也会将右边的异步任务的操作的结果作为该await表达式的值然后抛出去给next()的value,再将此value作为下一个:调用next()时,传入的参数.

​	这样就传递给了上一个await(yield)语句左边的变量,所以我们也可以将之理解为:await语句**最后**会将异步操作的结果赋值给左边的变量(如果有的话).

***详见:同级目录,用法-基本用法和async函数实现原理***

注意:我们可以认为await语句是yield语句和yield *语句的结合体,因为await语句也能将执行权交给一个函数.

且若await语句右边的 Promise 正常处理(fulfilled),其回调的resolve函数参数(异步操作的结果)作为 await 表达式的值,继续执行 [async function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function)

## 语句

`[return value] = await expression;`

### 参数解析

#### return value(可以说是await语句的返回值) 可选

这是一个变量: 右边的(一个表达式expression)promise对象的返回值,如果不是promise对象,则该变量直接等于(右边的表达式的)值本身.

#### expression 必选

一个表达式. 通常为Promise对象,但是也可以是任何要等待的值,即任何需要被异步操作的任务.

### 返回值

返回 Promise 对象的处理结果（即：异步操作的结果，通常是：new Promise(function(resolve,rejected)){...} 的 resolve() 的参数，***参见：<Promise.md>***）

如果等待的不是 Promise 对象,则返回该值本身.

## 用法

### 基本用法

#### await后若promise对象为rejected

任何一个await语句后面的 Promise 对象变为reject状态,那么整个async函数都会中断执行.

​	其原因是因为:一旦await语句后面的promise对象出现了错误导致其状态为rejected,则会向step()函数传递一个function(){return gen.throw(e)},

​	当该函数被执行时,生成器函数返回的生成器对象将直接使用throw方法,抛出一个错误:e,这将导致整个生成器函数的终止.

​		*因为 throw()方法(参见:迭代器和生成器以及协议.md - 生成器(对象))会让生成器函数完全停止执行，而不是暂停执行，且又因为执行function(){return gen.throw(e)};这段函数是在try...catch中的,*

​		*而这个try...catch又存于return new Promise()中,所以throw()抛出的函数将被catch捕获,而catch中又执行的是reject(e)方法.*

​		*即:将promise对象的状态改为rejected。也就是说：return new Promise() 将返回一个 rejected(e)（失败的 Promise 对象）*

​		*所以只要一个await语句后面的promise对象为rejected,则整个async函数也将rejected，并且 async 函数将完全停止执行。*

***这段解析的各种函数,请详见:async函数实现原理 - 详细实现代码***

```js
async function f() {
  await Promise.reject('出错了');
  await Promise.resolve('hello world'); // 不会执行
}
```

上面代码中,第二个await语句是不会执行的,因为第一个await语句状态变成了reject.

#### await后promise对象为rejected,会被catch()捕获

```javascript
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了
```

- [Promise.reject(reason)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

  返回一个被拒绝(rejected)的Promise对象，通过使用[Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)的实例获取错误原因reason,对调试和选择性错误捕捉很有帮助.

  参见：***<Promise.md>***

- 这里的 .then() 并不会被执行，而是执行 .catch()

  [Promise.prototype.catch(reason)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)：reason 是一个回调函数，该回调函数用来捕获使得 .cathc() 函数被执行的 Promise 对象 rejected 的原因，其中 reason() 回调函数的第一个参数就是 rejected 原因，即：指的是 `new Promise(function(resolve, reject){})` 的 reject 函数的异步操作结果，即：调用 reject() 函数时传入的参数。

  参见：***<Promise.md>***

注意,上面代码中,await语句前面没有return,但是reject方法的参数依然传入了catch方法的回调函数.

这里如果在await前面加上return,效果是一样的:
`return await Promise.reject('出错了');`

#### await后promise对象为rejected也不终止asynch函数

##### 第一种方法

有时,我们希望即使前一个异步操作失败,也不要中断后面的异步操作.

这时可以将第一个await放在try...catch结构里面,这样不管这个异步操作是否成功,第二个await都会执行.

因为其错误已经捕获然后被抛出,相当于"正常执行"

```javascript
    async function fn() {
        try {
            await Promise.reject('被拒绝的原因')
        } catch (error) {
            console.log(error); 
        }
        return await 2;
    }
    fn().then(data => { console.log(data) })
```

***Promise.reject():参见:<Promise.md>***

##### 第二种方法

直接在await后面再跟.catch()方法,直接处理前面promise对象可能出现的错误.

```js
async function foo(value) {
	await Promise.reject(new Error('失败'))
        .catch(e => console.log(e))
	return value;
}
foo('foo(spawn函数:详见:asynch函数实现原理)返回的promise对象异步操作结果')
	.then(v => console.log(v));
/** 
	Error: 失败
	foo(spawn函数:详见:asynch函数实现原理)返回的promise对象异步操作结果
*/
```

***Promise.prototype.catch():参见<Promise.md>***

#### await后跟存在then方法的对象(thenable对象)

若await命令后面是一个thenable对象（即定义then方法的对象）,那么await会将其等同于 Promise 对象,同时then()方法本身也会被当作promise对象.

```js
    class Sleep {
        constructor(timeout) {
            this.timeout = timeout;
        }
        then(resolve, reject) {
            const startTime = Date.now();
            setTimeout(
                () => resolve(Date.now() - startTime),
                this.timeout
            );
        }
    }

    (async () => {
        const sleepTime = await new Sleep(1000)
        	// 输出结果大概在: 1000ms左右
            .then(data => { console.log(data) });
    })();
	console.log('同步任务')
```

-  ***() => {...}***

  ​	该匿名函数被执行

- ***await new Sleep(1000)***

  ​	转交函数执行权给new Sleep(1000)的对象.

  ​	PS:由于该对象存在then方法,所以new Sleep的实例会被当作Promise对象

- ***[constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor)(timeout) {}***

  ​	***参见:<Class.md>***

  - **this.timeout = timeout;**

    ​	将传入给Sleep类的参数赋值给this.timeout

- ***then(resolve, reject) {}***

  ​	被当作promise对象,接收两个ES6内置实现的参数函数.

  ​	该then()方法并不会被立即执行,而是先执行同步任务.

  - **console.log('同步任务')**

    ​	会先执行这个,同步任务执行完才执行异步任务，实际上 then() 方法属于微任务，***参见：<JS并发模型与事件循环-堆-栈-队列-同步异步任务-宏观微任务.md>***

  ​    不直接执行这个then()方法的原因是因为:这是一个异步任务,而不是同步任务,如果一个console.log()存于该方法,那么会执行console.log(),因为这是一个同步任务.

  ​	而上面的constructor是class特有的,被创建时则会被立马执行.***参见:<Class.md>***

- ***const startTime = Date.now();***

  ​	获取1970年1月1日 00:00:00 UTC到当前时间的毫秒数

- ***setTimeout(() => resolve(Date.now() - startTime),this.timeout);***

  ​	即:this.timeout毫秒后执行()=>resolve(Date.now()); 这个函数.

  ​	这个函数一旦被执行,会使用当前的时间(ms)-刚刚执行该方法时获取的时间,这样通过差,我们能知道then()方法从开始到结束用了多久.

  ​	注意:执行该匿名函数的时间才是this.timeout,而该匿名函数结束的时间,通常不是this.timeout,应为JS引擎执行函数也需要时间的~.

这个例子还演示了如何实现休眠效果.JavaScript 一直没有休眠的语法,但是借助await命令就可以让程序停顿指定的时间.下面给出了一个简化的sleep实现.

```javascript
function sleep(interval) {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  })
}
// 用法
async function one2FiveInAsync() {
  for(let i = 1; i <= 5; i++) {
    console.log(i);
    await sleep(1000);
  }
}
one2FiveInAsync();
```

#### 使用try...catch多次尝试执行异步任务

```javascript
const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();
```

上面代码中,如果await操作成功,就会使用break语句退出循环；如果失败,会被catch语句捕捉,然后进入下一轮循环.

### 使用注意点

#### await语句最好放在try...catch中(或使用catch()捕获)

前面已经说过(用法-基本用法),await命令后面的Promise对象,运行结果可能是rejected,所以最好把await命令放在try...catch代码块中或使用prototype.catch()捕获.

```javascript
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
```

#### 多个await语句,根据情况让它们并发执行

多个await命令后面的异步操作,如果不存在继发关系,最好让它们同时触发.其使用的是Promise.call():***参见:<Promise.md>***

```javascript
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

```

以上的方式可以让await命令并发执行,即:在一定时间内都会完成.

#### await语句只能直接存于async函数中

await命令只能用在async函数之中,如果用在其他任何地方,就会报错.

```javascript
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  // 报错
  docs.forEach(function (doc) {
    await db.post(doc);
  });
}
```

上面代码会报错,因为await用在普通函数之中了:Uncaught SyntaxError: await is only valid in async function.

即使docs.forEach()存在于async函数中,await看上去也是存于async函数中,但是,await语句必须要直接存于async函数中,而不能间接的.

---

你可能会说,我们只需要将forEach()方法中的参数函数改成async函数不就行了吗,但是这样也存在问题.

```javascript
    (function dbFuc() { //这里不需要 async了
        let docs = [{ a: 1 }, { b: 2 }, { c: 3 }];

        // 可能得到错误结果
        docs.forEach(async function (currentValue) {
            let value = await currentValue;
            console.log(value)
        });
    })()
```

上面代码可能不会正常工作,原因是这时三个await currentValue操作将会并发执行,而不是继发执行.

在这么简单的(await右边只是个原始值)表达式中,需要继发执行的但是我们使用并发执行,可能不出错,但是如果再比较复杂的表达式中,如:await右边为promise对象,/另一个async函数/普通函数等,就可能出现意料之外的错误.

- 正确的写法是采用for循环,使之await迭代,而不是继发.

```javascript
    async function dbFuc() { 
        let docs = [{ a: 1 }, { b: 2 }, { c: 3 }];

        for (let doc of docs) {
            let value = await doc;
            console.log(value)
        }
    }
    dbFuc()
```

#### await Promise.all()并发执行异步任务

如果希望多个请求并发执行,可以使用Promise.all方法.当三个请求都会resolved时,下面两种写法效果相同.

```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法

async function dbFuc(db) {
  let docs = [{}, {}, {}];
  // Array.prototype.map()
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}
```

***参见:<Promise.all.md>***

####  async 函数可以保留运行堆栈

```javascript
const a = () => {
  b().then(() => c());
};
```

上面代码中,函数a内部运行了一个异步任务b().当b()运行的时候,函数a()不会中断,而是继续执行.

等到b()运行结束,可能a()早就运行结束了,b()所在的上下文环境已经消失了.如果b()或c()报错,错误堆栈将不包括a().

- 现在将这个例子改成`async`函数.

```javascript
const a = async () => {
  await b();
  c();
};
```

上面代码中,b()运行的时候,a()是暂停执行,上下文环境都保存着.一旦b()或c()报错,错误堆栈将包括a().

# async函数实现原理



## 描述

async函数的实现原理,就是将Generator函数和自动执行器是用一个函数封装在一起,而调用这个封装的函数的命令,就是: async.

## 大致实现代码

```js
async function fn(args) {...};
                     
/** 等同于 */

function fn(args) {
	return function spawn(function*(){
        return new Promise(...)
    });
}                     
```

- ***return function spawn(function*(){});***

  ​	返回一个spawn()函数的值.

- ​    调用async function fn,实际上相当于(原理)**执行fn函数中的spawn函数,它返回的是一个promsie对象.**

  ​	所以async function xx(){}函数的返回值才会为promise对象.

  ​	因为其实就相当于**async帮你调用了fn()函数获得的一个返回值spawn()函数,**

  ​    **然后你写的整个生成器函数函数作为参数传递给spawn函数**,也就是说spawn函数会接受一个生成器函数,自动的帮你执行这个生成器函数***.参见:<Generator函数的异步应用.md>.***

  ​	那我们为什么不用调用spawn函数,这个函数就能被执行呢?因为async命令会帮你先直接执行一次fn()函数获取到spawn函数,然后我们在**外面调用fn()时,相当于调用spawn(fn)**,		

  ​	然后执行器才帮我们自动执行fn这个生成器函数,直到执行完成.***详见:详细实现代码.***

- args参数

  ​	目的:在spawn函数中使用你向fn函数传递的值

  ​	这个参数可以用在fn()函数内部所有地方,包括spawn函数,这样由于spawn函数接收的时你自己写的整个生成器函数fn包括其参数,

  ​	所以我们也能在spawn()函数中使用你向fn函数传递的值.

所有的async函数都可以写成以上的第二种方式,其中的spawn就是自动执行器.spawn是ES6自己的实现.

在 *详细实现代码* 中,我们给出async函数的详细实现原理,这基本上是*<Generator函数的异步应用.md - Genrator函数的流程管理 - 自动执行上面的异步读取文件的Generator函数>* 的翻版.

## 详细实现代码

### 首先给出spawn函数的实现(important)

将你写的生成器函数整体作为参数传递给spawn函数,你写的生成器函数的参数作为参数传递给在外面的封装函数(一个普通函数),这样spawn函数中也可以用此参数.

- **spawn函数**

 接收一个生成器函数作为参数(我们写的async function xx(){} => 这个function xx(){}作为spawn的参数),并返回一个promise对象(return new Promise(...) ),作为async函数的返回值.

由于返回的是: new Promise(...)所以会立即执行Promise()中的参数.

我们知道Promise构造函数接收一个函数作为参数,这个函数又接收两个ES6内置实现的参数函数,用来改变Promise的实例(对象)的状态的.

其中Promise构造函数的主体,通常是用来执行异步任务的,当异步任务完成之后,我们在使用这个参数函数中的ES6实现的两个参数函数,来改变promise对象达到我们想要的状态.

在spawn函数中,又有个step函数,它是用来递归的,即:它会自己调用自己,且每一次调用自身的递归行为,都会让生成器函数执行一次,直到执行完成.

需要注意的是:这个step函数需要手动去执行一次,才会开始递归, 即在step函数下方(spawn里面)调用一次:step(nextGenFunc);

nextFenFunc参数:它是一个普通函数,返回一个gen.next(value);即当这个函数被调用执行,则生成器函数会被执行一次,且会返回一个Common对象,里面存在value和done属性.



```js
function spawn(genFunc) { 
	return new Promise(function (resolve, reject) { 
		/** 需要执行的异步任务,执行一遍我们的生成器函数,并将返回的生成器对象赋值给gen变量 */
		const gen = genFunc();
		function step(nextGenFunc) {
            // 这个变量将用来接收next()返回的Common对象
			let next; 
			try {
                // next = nextGenFunc();执行成功,则往下执行.
				next = nextGenFunc();
			} catch (e) {
				return reject(e); 
			}
			if (next.done) return resolve(next.value);
			Promise.resolve(next.value).then(function(v){
				step(function () { return gen.next(v) })
			}, function (e) {
				step(function(){ return gen.throw(e) });
			}); // of .then()d
		}; // of step()
		step( function () {return gen.next(undefined) });
	}); // of return new Promise()
}
```

- ***function spawn(genFunc) {}***

  ​	自动执行器. 其genFunc:我们写的async右边的function xx(){}

- ***return new Promise(function (resolve, reject) { })***

  ​	将会立即执行Promise构造函数中的那个参数函数.***参见:<Promise.md>***

  ​	该参数函数接收两个ES6内置实现的函数作为参数,用来改变promise对象的状态.

  ​	即:async函数能返回promise对象的关键,一旦实例Promise,则立即执行它.

- ***const gen = genFunc();***

  ​	调用一次接收的生成器函数genFunc,然后会返回一个生成器对象.
  于:让JS引擎知道有个生成器函数被挂起.

  ​	使用gen常量指向spawn接收的生成器函数,更为安全和高效(常量在JS引擎中优化做的比变量好),同时也方便维护和调用.

  ​		并将返回的生成器对象赋值给该gen常量

- ***function step(nextGenFunc) {...}***

  ​	step普通函数: 它会自己调用自己,且每一次调用自身的递归行为,都会让生成器函数执行一次,直到执行完成.

  ​	其nextGenFunc参数:一个普通的函数,就是因为这个函数step才有让生成器函数执行的功能.

  ​	因为这个函数中的函数体将会执行一次生成器函数,即:它会调用一次next()方法,并向之传入yield语句右边的表达式计算出来的值(可能是原始类型/promise对象/无then方法的对象).

  ​	最后将next()返回的common对象作为该函数的返回值.

- ***try...catch***

  - ***next = nextGenFunc();***

    ​	执行一次nextGenFunc函数:会导致生成器函数执行的函数,且会返回一个=>next()返回的Common对象,并将此对象赋值给另一个变量:next.

    ​	nextGenFunc函数作用可以去看 ***function step(nextGenFunc) {...}***这个代码行的解析

  - ***return reject(e);***

    ​	若这行代码:next = nextGenFunc();错误,则promise对象:rejected,并将错误原因抛出

    

- ***if (next.done) {return resolve(next.value);}***

  ​	若生成器函数执行完毕,则将promise对象改为:resolved,并将next()返回的common对象的value属性的值作为异步操作的结果抛出.

  ​	**即**:这行代码不仅是判断生成器函数是否已经迭代完成,还会将生成器函数中的return语句右边表达式的值作为next.value中的值.

  ​	具体原因是因为:当next.done为真时,就说明生成器函数已经没有了可迭代的序列值,自然这里的next.value也不可能获取的是yield语句抛出的值.

  ​	而return语句的目的:就是将IteratorResult(迭代的结果)返回给调用者*(next()返回的common对象的value属性,详见:<迭代器和生成器以及协议.md>)*并终止整个生成器函数的执行,并且会使done为true.

  ​	所以这里的next.value的值自然就是生成器函数中的
  return expression抛出来的值了.

  ​	**而最后next.value就是作为整个return new Promise(xxx)**实例(promise对象)的异步操作结果.

  ​	没有发现 是 **resolve**(next.value)吗? 而同时由于下面那Promise.resolve()的存在,所以只要最后有返回async函数的异步操作结果,那么自然就代表async函数内部的Promise对象都为resolve.

- ***Promise.resolve(next.value).then(v,e)***

  ​	根据next.value中的值的状态,去返回一个promise对象.

  ​	next.value:生成器函数中:yield语句右边的表达式计算过后的值.

  ​	*Promise.resolve():参见<Promise.md>*

  - ***function(v){step(function () { return gen.next(v) })}***

    ​	若next.value中的值如果为一个resolved状态的promise对象,或一个为空/基本类型/不带then方法的对象,则执行此方法

    ​		*这是因为Promise.resolve()方法的原因,参见:<Promise.md>*

    ​	能执行到该方法说明,genFunc生成器函数中还存在下一个可迭代的值,所以继续递归此step函数.
    ​    gen.next(v):将yield语句抛出的值赋值给上一个yield语句左边的变量.
    ​    由于: next()方法会使生成器函数继续执行,所以对于next来说,现在的上一个yield语句就是:刚才yield语句本身.
    ​    所以就相当于yield语句抛出的值会赋值yield语句自身的左边的变量.

    ​	且此时生成器函数又将开始继续往下执行,直到遇到下一个yield/throw/return/执行完毕.

  - ***function (e) {step(function () { return gen.throw(e) });***

    ​	Promise.resolve(next.value)返回的promise对象为rejected,就执行该函数

    ​	调用一次step函数:传入的函数作为参数,一旦这个函数被执行,则生成器函数会抛出一个错误e的值(一个promise对象)出现的错误的原因.

    ​	如果next.value是一个原始值/空/无then方法的对象,则执行的是上面成功的函数

- ***step(function () { return gen.next(undefined) });***

  ​	启动递归函数:step,并传入生成器函数.

  ​	目的:将传入的生成器函数执行一次,作为递归step()函数的关键.

### 给出整体实现

假如现在有个async function fn(args){},则async函数等效于:

```js
function fn(args) {
	return spawn(genFunc){
        return new Promise(function(resolve,rejected) {
			// 以上的内容
        })
    }
}
```

显然的,我们可以推出:

```js
async function fn(args){};
fn();
```

调用async函数: 实际上相当于

```js
let spawn = fn(args);
spawn(genFunc); // genFunc:将开发者写的生成器函数传入
```

相当于**async帮你调用了fn()函数获得的一个返回值spawn()函数,**

**然后你写的整个生成器函数函数作为参数传递给spawn函数**,也就是说spawn函数会接收一个生成器函数,**自动的帮你执行**这个生成器函数.***参见:<Generator函数的异步应用.md>.***

那我们为什么不用调用spawn函数,这个fn()函数就能被执行呢?因为async命令会**帮你先直接执行一次fn()函数获取到spawn函数**,然后我们在**外面调用fn()时,相当于调用spawn(fn)**,		

然后执行器才帮我们自动执行fn这个生成器函数,直到执行完成.***详见:详细实现代码.***

- **args参数**

目的:在spawn函数中使用你向fn函数传递的值

这个参数可以用在fn()函数内部所有地方,包括spawn函数,这样由于spawn函数接收的时你自己写的整个生成器函数fn包括其参数,

所以我们也能在spawn()函数中使用你向fn函数传递的值.

# async与其他异步处理方法的比较

## 问题描述

我们通过一个例子,来看 async 函数与 Promise、Generator 函数的比较。

假定某个 DOM 元素上面,部署了一系列的动画,前一个动画结束,才能开始后一个。如果当中有一个动画出错,就不再往下执行,返回上一个成功执行的动画的返回值。

### Promise写法

首先是 Promise 的写法。

```javascript
function chainAnimationsPromise(elem, animations) {

  // 变量ret用来保存上一个动画的返回值
  let ret = null;

  // 新建一个空的Promise
  let p = Promise.resolve();

  // 使用then方法,添加所有动画
  for(let anim of animations) {
    p = p.then(function(val) {
      ret = val;
      return anim(elem);
    });
  }

  // 返回一个部署了错误捕捉机制的Promise
  return p.catch(function(e) {
    /* 忽略错误,继续执行 */
  }).then(function() {
    return ret;
  });

}
```

虽然 Promise 的写法比回调函数的写法大大改进,但是一眼看上去,代码完全都是 Promise 的 API（`then`、`catch`等等）,操作本身的语义反而不容易看出来。

### Generator 写法

接着是 Generator 函数的写法。

```javascript
function chainAnimationsGenerator(elem, animations) {

  return spawn(function*() {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = yield anim(elem);
      }
    } catch(e) {
      /* 忽略错误,继续执行 */
    }
    return ret;
  });

}
```

上面代码使用 Generator 函数遍历了每个动画,语义比 Promise 写法更清晰,用户定义的操作全部都出现在`spawn`函数的内部。

这个写法的问题在于,必须有一个任务运行器,自动执行 Generator 函数,上面代码的`spawn`函数就是自动执行器,它返回一个 Promise 对象,

而且必须保证`yield`语句后面的表达式,必须返回一个 Promise。

### async 写法

最后是 async 函数的写法。

```javascript
async function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) {
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误,继续执行 */
  }
  return ret;
}
```

可以看到 Async 函数的实现最简洁,最符合语义,几乎没有语义不相关的代码。

它将 Generator 写法中的自动执行器,改在语言层面提供,不暴露给用户,因此代码量最少。如果使用 Generator 写法,自动执行器需要用户自己提供。

# 实例：按顺序完成异步操作

实际开发中，经常遇到一组异步操作，需要按照顺序完成。比如，依次远程读取一组 URL，然后按照读取的顺序输出结果。

Promise 的写法如下。

```javascript
function logInOrder(urls) {
  // 远程读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```

上面代码使用fetch方法，同时远程读取一组 URL。每个fetch操作都返回一个 Promise 对象，放入textPromises数组。然后，reduce方法依次处理每个 Promise 对象，然后使用then，将所有 Promise 对象连起来，因此就可以依次输出结果。

这种写法不太直观，可读性比较差。下面是 async 函数实现。

```javascript
async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}
```

上面代码确实大大简化，问题是所有远程操作都是继发。只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。我们需要的是并发发出远程请求。

```javascript
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

上面代码中，虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。

- const textPromises = xxx

  当 url.map() 执行完毕后，map() 所创建的新数组将会赋值给 textPromises，即：textPormises 指向心数组的内存地址。

- return response.text();

  将指定的 url 的 Response 对象的 text 文本作为返回值，当作 map() 创建的新数组的值

# Example

## [一个执行栈中,当前执行的语句时异步任务时,此任务将挂起,主线程将执行下一个同步任务](https://codesandbox.io/s/duo-ge-async-de-zhi-xing-shun-xu-3fymg?file=/src/index.js)

```js
const one = async () => {
  console.log("one-1");
  await 1;
  console.log("one-2");
  await 1;
  console.log("one-3");
};

const two = async () => {
  console.log("two-1");
  await 1;
  console.log("two-2");
  await 1;
  console.log("two-3");
};

one();
console.log("主线程 同步任务");
two();
```

**解析：**

1. 主线程先执行 one()，然后在 one 中遇到 await 语句时，会直接判断它是一个异步任务（这是 async 机制导致的->封装的步进器+生成器函数，即使你右边代码块是一个简单的 1），从而主线程会先挂起该异步任务，去执行当前调用栈中接下来的同步任务(console 和 two() )<sup style="color:red">1</sup>，
2. 当进入到 two 函数里面，遇到了 await 时，主线程会挂起该异步任务，去执行当前调用栈的同步任务，但目前执行栈中的同步任务已经执行完毕，所以主线程将等待挂起的异步任务完成（这是一个队列，如果后入队列的任务完成，也不会去执行它，一定会先等待先入队列的任务完成），
3. 当第一个入队列的的异步任务完成后，主线程将会去执行它，并执行此异步任务所在的调用栈的代码（console.log("one-2"); await 1），此时又遇到了 await 语句，所以主线程又将会挂起它，等待此异步任务完成。
   1. TIP: 即使此异步任务瞬间完成，主线程也不会先执行它，因为在消息队列中，还存在着一个先进来的异步任务还未完成且执行（two 中的第一个 await 1）
4. 此时，当 two 中的第一个 await 1 异步任务完成后，去重复 1 和接下来的步骤，执行当前示例执行完毕。

大概思想就是这样，以下是正确执行结果：

1. one-1 
2. 主线程 同步任务 
3. two-1 
4. one-2 
5. two-2 
6. one-3 
7. two-3

## 一个 async 中,使用 await 执行异步任务,一定会保证此任务执行完成后才会执行下一个任务

通过以上示例，其实还能发现一点，**在一个 async 函数中，使用 await 去执行一个异步任务，一定可以保证在当前异步任务未完成时，不会去执行下一个同步任务<sup style="color:red">2</sup>，**，如：

```js
const one = async () => {
  console.log("one-1");
  await 1;
  console.log("one-2");
  await 1;
  console.log("one-3");
};

const two = async () => {
  console.log("two-1");
  await 1;
  console.log("two-2");
  await 1;
  console.log("two-3");
};

const exe = async () => {
  await one();
  console.log("主线程 同步任务");
  await two();
};

exe();
```

根据上标 2 我们可以知道， exe 中由于使用了 await 语句，这将会保证 one 和 two 函数一定会先完成才会执行下一个语句，所以 exe() 将会从上到下依次执行语句。

而在第一个示例中，执行 one 和 two 函数时，它们并没有在一个 async 中，也不存在 await 命令，所以当去执行 one 或 two 时，如果在它们两个函数中遇到异步任务，则该异步任务将被挂起，主线程将会移动到下一个任务去执行。

以下是正确执行结果：

1. 
   one-1 
2. one-2 
3. one-3 
4. 主线程 同步任务 
5. two-1 
6. two-2 
7. two-3 

# 顶层 await(提案,至2020/4/16日未实现)

根据语法规格，await命令只能出现在 async 函数内部，否则都会报错。

```javascript
// 报错
const data = await fetch('https://api.example.com');
```

上面代码中，`await`命令独立使用，没有放在 async 函数里面，就会报错。

目前，有一个[语法提案](https://github.com/tc39/proposal-top-level-await)，允许在模块的顶层独立使用`await`命令。这个提案的目的，是借用`await`解决模块异步加载的问题。

```javascript
// awaiting.js
let output;
async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
}
main();
export { output };
```

上面代码中，模块`awaiting.js`的输出值`output`，取决于异步操作。我们把异步操作包装在一个 async 函数里面，然后调用这个函数，只有等里面的异步操作都执行，变量`output`才会有值，否则就返回`undefined`。

上面的代码也可以写成立即执行函数的形式。

```javascript
// awaiting.js
let output;
(async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };
```

下面是加载这个模块的写法。

```javascript
// usage.js
import { output } from "./awaiting.js";

function outputPlusValue(value) { return output + value }

console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100), 1000);
```

上面代码中，`outputPlusValue()`的执行结果，完全取决于执行的时间。如果`awaiting.js`里面的异步操作没执行完，加载进来的`output`的值就是`undefined`。

目前的解决方法，就是让原始模块输出一个 Promise 对象，从这个 Promise 对象判断异步操作有没有结束。

```javascript
// awaiting.js
let output;
export default (async function main() {
  const dynamic = await import(someMission);
  const data = await fetch(url);
  output = someProcess(dynamic.default, data);
})();
export { output };
```

上面代码中，`awaiting.js`除了输出`output`，还默认输出一个 Promise 对象（async 函数立即执行后，返回一个 Promise 对象），从这个对象判断异步操作是否结束。

下面是加载这个模块的新的写法。

```javascript
// usage.js
import promise, { output } from "./awaiting.js";

function outputPlusValue(value) { return output + value }

promise.then(() => {
  console.log(outputPlusValue(100));
  setTimeout(() => console.log(outputPlusValue(100), 1000);
});
```

上面代码中，将`awaiting.js`对象的输出，放在`promise.then()`里面，这样就能保证异步操作完成以后，才去读取`output`。

这种写法比较麻烦，等于要求模块的使用者遵守一个额外的使用协议，按照特殊的方法使用这个模块。一旦你忘了要用 Promise 加载，只使用正常的加载方法，依赖这个模块的代码就可能出错。而且，如果上面的`usage.js`又有对外的输出，等于这个依赖链的所有模块都要使用 Promise 加载。

顶层的`await`命令，就是为了解决这个问题。它保证只有异步操作完成，模块才会输出值。

```javascript
// awaiting.js
const dynamic = import(someMission);
const data = fetch(url);
export const output = someProcess((await dynamic).default, await data);
```

上面代码中，两个异步操作在输出的时候，都加上了`await`命令。只有等到异步操作完成，这个模块才会输出值。

加载这个模块的写法如下。

```javascript
// usage.js
import { output } from "./awaiting.js";
function outputPlusValue(value) { return output + value }

console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100), 1000);
```

上面代码的写法，与普通的模块加载完全一样。也就是说，模块的使用者完全不用关心，依赖模块的内部有没有异步操作，正常加载即可。

这时，模块的加载会等待依赖模块（上例是`awaiting.js`）的异步操作完成，才执行后面的代码，有点像暂停在那里。所以，它总是会得到正确的`output`，不会因为加载时机的不同，而得到不一样的值。

下面是顶层`await`的一些使用场景。

```javascript
// import() 方法加载
const strings = await import(`/i18n/${navigator.language}`);

// 数据库操作
const connection = await dbConnector();

// 依赖回滚
let jQuery;
try {
  jQuery = await import('https://cdn-a.com/jQuery');
} catch {
  jQuery = await import('https://cdn-b.com/jQuery');
}
```

注意，如果加载多个包含顶层`await`命令的模块，加载命令是同步执行的。

```javascript
// x.js
console.log("X1");
await new Promise(r => setTimeout(r, 1000));
console.log("X2");

// y.js
console.log("Y");

// z.js
import "./x.js";
import "./y.js";
console.log("Z");
```

上面代码有三个模块，最后的`z.js`加载`x.js`和`y.js`，打印结果是`X1`、`Y`、`X2`、`Z`。这说明，`z.js`并没有等待`x.js`加载完成，再去加载`y.js`。

顶层的`await`命令有点像，交出代码的执行权给其他的模块加载，等异步操作完成后，再拿回执行权，继续向下执行。