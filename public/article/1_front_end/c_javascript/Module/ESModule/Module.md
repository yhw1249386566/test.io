[TOC]

# 名词提要

## 依赖关系

 一个模块要导入另一个模块才能使用.

​    或者一个模块a导入的另一个模块b,这个模块b必须又要导入另一个模块c. 那么这样,我们将c称之为a模块的间接依赖,即使嵌套多层也是称之为间接依赖.

​    所以不论是直接依赖或者是间接依赖,我们都认为是存在依赖关系.

# 概述

在ES6之前,JS一直没有module(模块)体系,无法将一个大程序拆分成互相依赖的小文件,再用简单的方法拼装起来.

其他语言都有这项功能,比如 Ruby 的`require`、Python 的`import`,甚至就连 CSS 都有`@import`,但是 JavaScript 任何这方面的支持都没有,这对开发大型的、复杂的项目形成了巨大障碍.

所以社区指定了一些模块module方案,最主要的有commonJS和AMD两种,前者用于服务器,后者用于浏览器.

----

而ES6在语言标准的层面上,实现了模块功能,而且实现得相当简单,完全可以取代commonJS和AMD规范,称为浏览器和服务器通用的模块解决方案.

ES6module的设计思想是尽量的静态化,使得编译时就能确定模块的依赖关系,以及输入和输出的变量. 

而前面所提到的CommonJS和AMD模块,都只能在运行时才能获取这些信息,比如CommonJS模块其实就是对象,输出时必须查找对象的属性(相当于使用模块里面的东西)

```js
let {stat,exists,readFile} = require('fs');
// 解构赋值展开后
let {stat:stat,exists:exists,readFile:readFile} = require('fs');
// 等效于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readFile = _fs.readFile;
```

- ***let {stat,exists,readFile} = require('fs');***
  
  ​    加载整个fs模块(require('fs'),里面的所有方法),然后读取里面的stat,exists,readFile方法分别赋值给等号左边的三个属性值.
  
  ​    *是的,这其实就相当于解构赋值.参见<变量的解构赋值.md>*
  
  ​    这种加载方法称为'运行时加载',因为只有运行时才能得到'fs'模块(对象),这样做,会让我们完全没办法在编译时做"静态优化"

- 下面的代码就是将_fs对象中的各个属性整个赋给对应的变量.

----

而在ES6中,模块并不是对象,而是通过`export`命令显示 指定输出的代码,再通过 `import`命令输入:

```js
// ES6模块
import {stat, exists, readFile} from 'fs';
```

- ​    即从fs模块中只加载stat,exists,readFile三个方法,其余方法不加载(即不会主动加载整个模块,除非你主动调用). 
  
  ​    这种加载方法称之为"编译器时加载"
  
  ​    即 ES6 可以在编译时就完成模块加载,效率要比 CommonJS 模块的加载方式高.
  
  ​    当然,这也导致了没法引用 ES6 模块本身,因为它不是对象.

由于 ES6 模块是编译时加载,使得静态分析成为可能.有了它,就能进一步拓宽 JavaScript 的语法,比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能.

除了静态加载带来的各种好处,ES6 模块还有以下好处.

- 不再需要`UMD`模块格式了,将来服务器和浏览器都会支持 ES6 模块格式.目前,通过各种工具库,其实已经做到了这一点.
- 将来浏览器的新 API 就能用模块格式提供,不再必须做成全局变量或者`navigator`对象的属性.
- 不再需要对象作为命名空间（比如`Math`对象）,未来这些功能可以通过模块提供.

# ES6模块自动采用严格模式

ES6 的模块自动采用严格模式,不管你有没有在模块头部加上`"use strict";`.

严格模式**主要**有以下限制.

- 变量必须声明后再使用
- 函数的参数不能有同名属性,否则报错
- 不能使用`with`语句
- 不能对只读属性赋值,否则报错
- 不能使用前缀 0 表示八进制数,否则报错
- 不能删除不可删除的属性,否则报错
- 不能删除变量`delete prop`,会报错,只能删除属性`delete global[prop]`
- `eval`不会在它的外层作用域引入变量
- `eval`和`arguments`不能被重新赋值
- `arguments`不会自动反映函数参数的变化
- 不能使用`arguments.callee`
- 不能使用`arguments.caller`
- 禁止`this`指向全局对象
- 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
- 增加了保留字（比如`protected`、`static`和`interface`）

上面这些限制,模块都必须遵守.由于严格模式是 ES5 引入的,不属于 ES6,所以请参阅相关 ES5 书籍,这里将不再赘述.

其中,尤其需要注意`this`的限制.ES6 模块之中,顶层的`this`指向`undefined`,即不应该在顶层代码使用`this`.

# module模块命令

## 描述

ES6的模块module中的功能,主要由: export和import命令构成

- export命令(导出命令)规定模块的对外接口
- import命令用于导入其他模块的对外接口(即提供的功能)

## export命令

### 描述

export命令,即可称之为导出命令,将某个指定的模块整体/部分功能导出(暴露出

因为在我们常说的module(模块)是指一个单独的,独立的文件,即一个module就是一个单独且独立的文件,该文件(module)内部的所有变量/方法,外部无法获取.

但是如果我们需要获取这个独立的module里面的部分/全部变量及方法时,该怎么做呢?所以我们就必须**使用 `export`命令(一个关键字)将我们想要获取的变量/属性/方法暴露出来(导出来),**让其他模块可以通过import命令导入并使用.

且需要注意的是:export命令**只能处于模块的顶层,**无法存在于块级作用域/条件/函数中,这是因为export命令是编译时就会加载,且export命令的设计就是为了静态优化,

### 作用

将一个module中的部分/所有变量/属性/方法等全部暴露出来(导出来),让另一个module可使用import命令将这些暴露出来的接口导入并使用.

### 语法

`export 整个函数声明/变量声明/类`

`export {一个变量/一组以逗号分隔的变量}`

### export用法

#### 核心基本用法

##### export命令输出变量

假设存在一个 profile.js文件:

```js
export let firstName = 'yomua';
export var lastNmae = 'yhw';
export let year = 1999;
let unkown = '999';
```

意为: 在一个名为profile的.js文件中,存在三个变量:用户姓名+出生年,然后ES6会将这个profile.js文件视作一个模块,并且会对外暴露出这个模块中的三个变量,

在其它模块中可以使用import命令将之导入并使用(参见同级 import命令),而其他未曾暴露出来的变量(接口)无法在其它模块导入使用,如该示例最后一行

- 或许会提示:*'unkown' is declared but its value is never read*
  
  即:*声明了“未知”,但从未读取其值.*

----

除了上面的写法,我们还可以用另一种写法:

```js
let firstName = 'Michael';
var lastName = 'Jackson';
let year = 1958;

export { firstName, lastName, year };
```

这种写法是将export放在一个module的最后面,然后**使用大括号{}**将之括起来,
            *(这样的写法就类似是解构赋值,使用和属性值的名字相同的 属性名去匹配内部变量,然后将内部变量赋值给属性值,参见<变量的解构赋值.md>)*

在里面指定一组要暴露的接口(导出接口/变量). 

这种写法和前面的一个个导出变量是等价的,但是我们极力推荐使用该方式,因为这样就可以在一个module的尾部,一眼看清楚输出(暴露出)哪些接口,非常易于阅读和维护.

- 请注意:一定要使用大括号将之括起来,否则将报错,且是在编译时就会提示出错.

##### export命令输出函数

在上面一节 *输出变量* 中,我们export的都是变量,但是我们一直再说的是暴露出接口,这是因为export除了输出变量外,还能输出函数,"类(class)"等,即凡是接口都可以输出.

```js
export function multiply(x,y) {
    return x * y;
}
```

即对外暴露出一个名为 multiply 的函数

##### export命令必须建立一一对应关系

在前文中,我们经常性使用{}大括号括住一组变量或一个函数以及一个类什么的

​    **这是因为export命令是规定的是对外的接口,且这些被暴露出的接口必须与module内部的变量建立一一对应的关系.**

<!--以下为错误的示例:-->

```js
export 1; // error

let m = 1;
export m; // error
```

以上示例在编译时就会给出错误警告:Declaration or statement expected, 即声明 或 预期的声明 (声明).

这是因为export输出的对外接口没有和当前module的内部与之对应的变量/其他什么,没有建立一种对应关系,而是直接输出一个值.

- 第一个export 1; 相当于直接输出1这个值
- 第二个export m; 只是通过m这个变量,还是输出1,并没有和第1个export 1有什么本质区别.
- PS: 1只是一个值,而不是一个接口,所以无法这样做,请看下面的正确示例:

<!--以下为正确的的示例:-->

```js
// 写法1
export let m = 1;

// 写法2
var m = 1;
export {m};

// 写法3: 利用as改变一个变量名字变成m
var n = 1;
export {n as m};
```

这三种写法都是正确的写法,它们规定的对外接口m和module内部变量之间,建立了一种一一对应的关系,其他脚本可以通过m这个对外接口取到值`1`.

​    *你也可以将大括号内部写变量当作对象的解构赋值,只不过其变量名要和module内部的变量名一致罢了,*

​    *如果没有{},module内部的变量就无法赋值给{}中的变量,这样就无法导出/暴露出,所以必须加大括号.*

- 同样的: 暴露出的function和class也要遵循这种一一对应的关系.

```js
/** 一个名为: ./test.js的模块文件 */

function test(...) {...};
export test;        // error写法     

export function text(){}; // right

function test(){};
export {test}; // right                    
```

-----

还有一点值得说明,即:export命令暴露出(输出)的接口与模块内部的变量除了一一对应关系之外,还是动态绑定关系,即:通过该对外接口,可以取到module内部实时的值,即使这个变量会改变也是如此.

<!--请思考以下例子-->

```js
/** 有个JS类型的模块,名为: profile.js,在当前目录下,即:./ */

let a = 'yhw';
// 等到100ms后,将'yomua'字符串赋值给变量time
setTimeout(()=>a='youmua',100); // 计时器
export {a};
```

- 这里先使用 *<u>import命令</u>* 和 *<u>module的加载实现</u>* 二节中才会讲到的知识,不过暂时不需要你们懂,
  
  只需要记住: 
  
  ​    当导入当前目录下的./profile.js文件的module,过了100ms之后,将实时的获取到profile.js模块被动态改变的值

```html
<!-- 一个名为:test.html的文件,
    使用<script type='module'>导入profile.js模块
-->
<script type='module'>
    import {a} from './profile.js'
    console.log(a); // yhw
    setTimeout(console.log(a), 99); // yomua
</script>
```

以上就是在一个模块内部导入另一个模块中的对外接口*(注意使用的是type='module',这是属于 <u>module的加载实现</u>一节,现在不需要你们懂)*,

当使用import命令导入一个module的对外接口完成后,我们就可以使用被导入的接口了.

- ***console.log(a); // yhw***
  
  ​    这里输出yhw的原因是因为:
  
  ​    在profile.js模块中,我们设置了100ms之后才将a变量的值改成yomua. 所以在运行到console.log(a);这段代码会输出yhw,
  
  ​    除非当程序运行到这段代码之时,已经过了100ms,那么该console语句才会输出yomua.
  
  ​         *(因为100ms之后,profile.js模块之中已经改变了a变量的值)*

- ***setTimeout(console.log(a), 99); // yomua***
  
  ​    这句意思是说,过99ms之后,在控制台输出a这个变量,这里将会输出yomua.
  
  ​    很明显的,我们说过,export命令导出的对外接口和其内部变量是实时(动态)绑定的,那么这样子,
  
  ​        我们import命令导入的接口也会随着实时更新数据,所以我们将在启动test.htm文件后的99ms后,将会得到yomua值.
  
  ​    但是为什么是99ms,而不是98,97,或者100ms呢? 这是因为至少当程序运行到setTimeout()函数时,已经过了1ms, 所以其等待时间为:100ms - 1ms = 99ms, 所以这里只需要在等待99ms就行了.

----

export动态的绑定关系与CommonJS规范完全不同,CommonJS输出的是值的缓存,不存在动态更新数据什么的,详见*module的加载实现*一节.

最后,**export命令只能处于模块的顶层,无法存在于块级作用域/条件/函数中,这是因为export命令是编译时就会加载,且export命令的设计就是为了静态优化,**

如果不存在模块顶层中,则export命令代码行就会报错:SytntaxError.

```js
// 一个模块中: 
function demo() {
    export default 'bar';
}
```

- 上面的示例中,export命令处于一个函数作用域中,这将在运行有关文件时将报错: `SyntaxError: export declarations may only appear at top level of a module`
  
  即: **SyntaxError：导出声明只能出现在模块的顶层.**

- 至于default关键字,请参见 本节中的 *<u>export default命令</u>* 一小节.

#### 复杂示例

### export default命令

由于用户在使用import命令(参见同级 import命令)时,需要知道所要加载的变量名或函数名,否则无法加载.但是,用户肯定希望快速上手,未必愿意阅读文档,去了解模块有哪些属性和方法.

为了给用户提供方便,让他们不用阅读文档就能加载模块,就可以使用用到`export default`命令,为模块指定默认输出.

且由于一个module只有一个export default命令,所以我们在使用import命令导入对外接口时,不需要为default(自己定义的变量)使用大括号括起来.

```js
/** 一个名为exportTest.js的模块,在当前路径./ */
export default function love(name) {
    return `I Love ${name}`;
}
    // 以上等效于
function love(name) {
    return `I Love ${name}`;
}
export default love;    

/** 一个名为test.html文件 */
<script type='module'>
    import arbitraryName from './exportTest.js';
    console.log(arbitraryName('yomua')); // I Love yomua
 </script>
```

- ​    很明显,在test.html文件的script中,我们在导入exportTest.js模块的对外接口时,并没有使用到大括号,
  
  ​    甚至在exportTest.js模块中,我们也可以不用使用大括号就能暴露出被default关键字所定义的对外接口.
  
  ​    这是因为一个模块只能由一个default关键字(多个就会报错),所以无论是使用export或import命令导出还是导入都指的是同一个东西,所以不必使用大括号区分.

-----

本质上,`export default`就是输出一个叫做`default`的变量或方法,然后系统允许你在使用import命令时为它取任意名字,又由于default的唯一性,所以系统能精准的找到对外接口.

于是,下面的写法也都是正确的:

```js
/** exportTest.js 模块 */
function love(name) {
    return `I Love ${name}`;
}
export { love as default };    
```

```html
<!-- test.html -->
<script type="module">
    import {default as foo} from './exportTest.js';
    console.log(foo('yomua')); // I Love yomua
</script>

<!-- 也可以写成 -->
<script type="module">
    import arbitraryName from './exportTest.js';
    console.log(arbitraryName('yomua')); // I Love yomua
</script>
```

- 在test.html中, 以上两种写法都是正确的.

- 第一种是将default这个名字使用as改成foo, 由于使用了as,就变成了一个变量名重命名成另一个变量名,所以就要使用大括号,让它们存在一一对应关系(即可以进行解构赋值)

- 第二种是直接重命名,不用任何关键字(如as等),所以系统将可以直接判断你的自定名字和使用default关键字导出的对外接口的关系.
  
  这样就不需要使用大括号了.

----

所以经过以上一节,我们知道`export default`命令其实只是输出一个叫做`default`的变量,所以它后面不能跟变量声明语句.

```js
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```

- 第二句:  export default a的含义是将: 变量a的值赋给变量default,所以是正确的
- 第三句: 则是将var a = 1赋值给 变量default, 这是什么意思? 即: default = var a = 1, 从来不存在这种写法,所以自然是错误的.

同样地,因为`export default`命令的本质是将后面的值,赋给`default`变量,所以可以直接将一个值写在`export default`之后.

```javascript
// 正确
export default 42;

// 报错
export 42;
```

- export default 42前一句指定对外接口为`default`,所以正确
- export 42: 报错是因为没有指定对外的接口,所以错误

----

`export default`也可以用来输出类.

```javascript
// MyClass.js
export default class { ... }

// main.js
import MyClass from './MyClass';
let o = new MyClass();
```

-----

在使用import命令时,可以同时使用自定义的变量名(被export default导出的对外接口)和指定名字的对外接口.

**且有趣的是: 如果我们在使用export命令时,将一个变量重命名为另一个变量然后导出这个变量,则就相当于我此时存在两个变量同时指向一个内存地址空间,即相当于复制了一个变量:**

```js
/** exportTest.js */
export default function (obj) {}

export function one() { return 1 }
export { one  as two };

/** test.html */
import _, { one, two } from './exportTest.js2';
```

- 自定义 `_` 变量,对应default... ,
- one 和 two都是对外接口,它们指向的是同一个内存地址空间,如果使用import命令将它们从所处的module中导入进来,则使用它们任意一个都是等效的.

## import命令

### 描述

当我们使用export命令定义一个某块的对外接口之后,其他JS文件(module)就可以通过import命令将这些对外接口加载进当前JS文件(module).

需要注意的是: import命令导入(输入)的变量都是只读的,因为import的本质只是一个输入接口.也就是说:不允许在被导入的module中,改写被导入的变量.

​    参见 *示例 - 简单示例*

且import命令具有提升效果,即JS引擎会自动的将模块中的import命令提升到模块的最顶部,首先执行,

这种行为的本质是:import命令是编译时就会执行,在代码运行之前,

> export命令则不是如此,因为export命令是导出接口,如果不导出,里面的内部变量将无法在其他module中导入.

​    但是如果import命令在块级作用域中或者条件中等地方,无法被提升,将会报错,其错误原因与export报错的原因一样,即,:

​    因为importt命令是编译时就会加载,详见同级*export命令 - 描述*

### 语法

`import {一组以逗号分隔的变量,或一个变量} from '相对/绝对路径,模块名字'`

- 如果直接写模块名字(即不带路径),那么该module必须有配置文件,告诉JS引擎该模块的位置
  
  配置文件,如: xxx.config.js

`import '模块名字'`

- 可以这样写是因为:`import`语句会执行所加载的模块,但是仅仅只是加载模块,却不会导入任何的变量,相当于只是给当前Module一个依赖关系.
  
  **请别把这种写法误认为是将整个模块导入到当前模块中,这种错误的思想!**

### import用法

#### 核心基本用法

##### 导入对外接口

假设存在一个main.js模块文件=件,和一个./test.js模块文件:

- test.js中导出了两个变量firstName 和lastName,值分别为:yhw,yomua

```js
import {firstName, lastName} from './test.js'
function setName() {
    return firstName + " : " + lastName;
}
console.log(setName()); // yhw : yomua
```

上面的示例意为: 导入(加载)当前路径下的test.js文件中的firstName和lastName两个变量,使这两个变量可以在当前文件(module)中使用.

- {}打括号中的变量名必须和被导入的module的对外接口名字相同.
  
  即使用as修改名字也要先输入旧的名字*参见as关键字...一节.*

##### 无法修改被导入的模块及其内部所有变量

当我们在一个module中导入另一个module的对外接口时,我们无法改变这个对外接口的值,因为它是只读的.

```js
/** exportModule.js */
export let a = 1;

/** importModule.js */
import {a} form './exportModule.js'
console.log(a); // 1
a = 3;
 //此时会报错:TypeError: "a" is read-only
```

上面代码中,脚本加载了变量a,对其重新赋值就会报错,因为a是一个只读的接口.但是,如果a是一个对象,改写a的属性是允许的.

##### 若被导入的变量是对象,则可以修改对象的属性

当一个module中,若被导入的变量是对象,则我们可以修改对象的属性.

注意:这并不代表我们修改了对象了,只是修改了其中的属性,对象本身无法修改,比如无法重新赋值给这个变量 一个对象. 

- 如: 以下的mportFile.js Module中,无法 obj = {}; 否则会报错`TypeError: "obj" is read-only`

但是我们却能对 对象的属性进行任意地修改,可以: 删除,重新赋值,创建属性,添加方法等.

```js
/** exportFile.js Module */
export let obj = {
    name,
    hobby
};

/** importFile.js Module */
import {obj} from './obj';
console.log(obj); // Object{name: "yhw", hobby: "girls" }

obj.name = 'yomua';
obj.func = function() {return 21};
obj.property = "who are you?";
delete obj.hobby;

console.log(obj);
/**
    name: "yomua"
    func: function func(){...}
    property: "who are you?"
*/
```

通过以上示例,我们很明显可以知道,我们可以对一个module的对外接口在是对象时,对这个对象的属性进行任意改写(增删,改查).

当然!由于改写被导入的对象的属性,会导致若后面的代码因这个错误时,可能会非常的难以查错(因为存在于不同的模块,相互之间依赖关系会随着项目越大越不好理解)

所以,这里我强烈建议: 凡是导入(输入)的模块,**都将此模块中的所有变量,包括对象的属性都当做是read only,不要轻易的改变对象的属性!**

##### import使用相对/绝对/不带路径导入module

<!--直接写模块名字,不带路径-->

```js
import {myMethod} from 'util';
```

- 上面代码中,`util`是模块文件名,由于不带有路径,必须通过配置,告诉引擎怎么取到这个模块.

<!--相对路径导入-->

```js
import {myMethod} from './util';
```

<!--绝对路径导入-->

```js
import {myMethod} form '/util'
```

- 当前根目录下的util文件(注意,不是指从盘符开始),而是从整个项目的根目录开始.

##### import命令存在提升,会首先执行

```js
foo();
import { foo } from 'my_module';
```

上面的代码不会报错,因为`import`的执行早于`foo`的调用.这种行为的本质是,`import`命令是编译阶段执行的,在代码运行之前.

##### import无法使用在运行时才能获得值的结构中

```js
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

- 第一种用到了表达式,则代表运行时才能知道表达式的结果,而这违反import会在编译时就加载的规则,所以错误
- 第二种将from 后面使用变量导入module,也是错误,其原因如同第1中.
- 第三种也是,原因如第一种.

##### import的另一种写法

最后,`import`语句会执行所加载的模块,因此可以有下面的写法.

```javascript
import 'lodash';
```

- 上仅仅执行`lodash`模块,但是不输入任何值

- 这个用法可以用来导入一个css文件 => `import './style.css';`
  
  (可由webpack打包的)
  
  TIPS：`import Style from './xxx.css'` 这种写法可以让导入的 css 文件有个声明空间，我们可以这样使用：`<div className='Style.div'> /`，然后经过编译后 `.div` 会被编译成 `.div-xxxxx` 的形式，这可以防止因为类名冲突造成的样式冲突问题。参见：[CSS Module-阮一峰](http://www.ruanyifeng.com/blog/2016/06/css_modules.html) 

如果多次重复执行同一句`import`语句,那么只会执行一次,而不会执行多次.

```javascript
import 'lodash';
import 'lodash';
```

- 加载了两次`lodash`,但是只会执行一次.

```javascript
import { foo } from 'my_module';
import { bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
```

上面代码中,虽然`foo`和`bar`在两个语句中加载,但是它们对应的是同一个`my_module`实例.也就是说,`import`语句是 Singleton(单例)模式.

- **请别把这种写法误认为是将整个模块导入到当前模块中,这是从错误的思想!**

-----

目前阶段,通过 Babel 转码,CommonJS 模块的`require`命令和 ES6 模块的`import`命令,可以写在同一个模块里面,**但是最好不要这样做**.

因为`import`在静态解析阶段执行,所以它是一个模块之中最早执行的.下面的代码可能不会得到预期结果.

```javascript
require('core-js/modules/es6.symbol');
require('core-js/modules/es6.promise');
import React from 'React';
```

##### 使用import整体加载模块(*:通配符)

使用import输入一个模块的对外接口时,除了指定这些对外接口的变量名,我们还可以使用 `*` 将这个需要被输入的module进行整体加载.

但是由于 `* `是个特殊的字符,所以我们需要将之重命名,使用as关键字,改成另一个可使用的变量名.

此时我们只需要使用这个**自定义的变量 + 被导入的模块的对外接口名字**就可以实现调用这些对外界接口了,而不需要再加上大括号.

<一个导出对外接口的module,名为:exportTest.js;--> 

```js
let name = 'yhw', hobby = 'girls';

export function multiply(x, y) {
    return x * y;
};
export let obj = {
    name,
    hobby
};
```

<!--导入cirle.js模块的另一个js模块:main.js-->

```html
                <--常规导入方式-->
<script type='module'>
    import { obj, multiply } from './exportTest.js';
    console.log(multiply(1, 2));
</script>

    <--模块的整体加载: * as ownVariableName-->
<script type="module">
    import * as one from './exportTest.js';
    console.log(one.multiply(1, 2));
</script>
```

我们无法使用单独的 \*,若使用了,则会直接在编译时错误*(但是,却可以在export时,单独使用 \*,参见:export 与 import 的复合写法(类似继承) )*

- `import * as './circle';`

- `import * {as} './circle';`
  
  都是错误的.

所以在使用module的整体加载 ( `* as ownVariableName`) 在有时候会非常的方便. 

不过模块的整体加载也仍然是会在编译时就执行,也是静态分析的,所以不允许运行时改变.详见: *import命令 - 描述 或 export命令 - 描述 或 同级小节:import无法使用....*

#### 复杂示例

## as关键字重命名导出/导入接口的名字

在导出/导入一个接口时,我们可以使用as关键字去重命名该接口,然后使用自定义的名字就可以去调用该接口,旧名字也仍然可以使用. 

即:其实就相当于使用"自定义名"这个指针去指"旧名字"指向的那个内存地址空间,这样就相当于克隆"旧名字"指针并重新命名.

```js
// 存在这么一个module,它为js类型的: ./test.js =>且在当前路径下
function v1(...){...};
function v2(...){...};

export {
    v1 as newV1,
    v2 as newV2,
    v2 as newV2V2
};

// 一个需要导入test.js的main.js文件.
import {newV1} from './test.js';
newV1(); // 此时我们将能使用这个新的变量,但是无法使用旧的v1变量
```

- ./test.js 指的是当前路径下,在import导入一个文module时,如果不适用./ *(或其他相对/绝对路径)*,
  
  则导入的module必须存在config文件,告诉JavaScript引擎该需要被导入的module的位置,否则将会在编译时报错.
  
  参见下面的 *import命令*

## export 与 import 的复合写法(类似继承)

如果在一个模块之中,先输入后输出同一个模块,`import`语句可以与`export`语句写在一起.

```javascript
/** ./exportTest.js */
export const a = 1;
```

```html
<!-- useimport.html -->
<script type="module">
    // 以下是正确的写法
    // 导入模块的a并输出模块的a
    export {a} from './exportTest.js';
    console.log(a); // a is not defined
</script>
```

上面代码中,`export`和`import`语句可以结合在一起,写成一行.但需要注意的是,写成一行以后,a实际上并没有被导入当前模块,

**只是相当于对外转发了这两个接口,导致当前模块不能直接使用a,但是却让当前文件(模块)和被导入的模块产生了直接/间接的关系.**(使用如webpack这样的打包文件时,间接/直接的依赖对应的包也会被打包)

上面的 `export {a} from` 其实可以理解为以下形式,但是只是无法在当前模块使用转发的接口:

```html
<!-- useimport.html -->
<script type="module">
    import {a} from './exportTest.js';
    export {a}; // 
    console.log(a); // a is not defined
</script>
```

- 如果你们看了 module的继承(下一节),你们就会发现,这种复合写法其实相当于继承了exportTest.js模块的对外接口*.(但是无法直接使用,以下的module继承一些也无法直接使用)*

----

模块的接口改名和整体输出,也可以采用这种写法.

```javascript
// 接口改名
export { foo as myFoo } from 'my_module';

// 整体输出
export * from 'my_module';
```

默认接口的写法如下.

```javascript
export { default } from 'foo';
```

具名接口改为默认接口的写法如下.

```javascript
export { es6 as default } from './someModule';

// 等同于
import { es6 } from './someModule';
export default es6;
```

同样地,默认接口也可以改名为具名接口.

```javascript
export { default as es6 } from './someModule';
```

下面三种`import`语句,没有对应的复合写法.

```javascript
import * as someIdentifier from "someModule";
import someIdentifier from "someModule";
import someIdentifier, { namedIdentifier } from "someModule";
```

为了做到形式的对称,现在有[提案](https://github.com/leebyron/ecmascript-export-default-from),提出补上这三种复合写法.

```javascript
export * as someIdentifier from "someModule";
export someIdentifier from "someModule";
export someIdentifier, { namedIdentifier } from "someModule";
```

# module的继承

## 描述

模块与模块之间是可以继承的,即一个模块可以继承另一个模块内部所有被导出的对外接口.

- **PS: 一个模块a继承另一个模块b, a只是相当于对外转发了模块b的对外接口,a模块在内部不能直接使用模块b的对外接口,除非将之导入.**

假如存在`exportOne.js` Module && `extendOne.js Module`, 其中 extendOne.js 继承 exportOne模块

```js
/** exportOne.js, 被继承的模块 */
export function getName(name) {return name;}

/** extendOne.js, 继承的模块*/
export * from './exportOne.js';
export function showLove() {return 'I love you.'}
```

```html
<!-- test.html, 导入模块的并使用其中的对外接口的一个html文件 -->
<script type="module">
    import { getName, showLove } from './extendOne.js';
    console.log(getName('yomua'))
    console.log(showLove())
</script>
```

通过以上示例,我们很容易发现: extendOne.js模块继承了exportOne.js模块,此时,我们只需要导入其中那个extendOne.js(继承)模块,就可以使用exportOne.js和extendOne.js两个模块的所有对外接口了.

## 语法

`export * from '相对/绝对路径,无路径(必须存在配置文件)'`

- 为什么必须存在配置文件呢? 参见: *同级目录 module模块命令 - import命令 - 语法*

`export {指定哪个对外接口} from'相对/绝对路径,无路径(必须存在配置文件)'`

## 跨模块常量

- 我们可以使用跨模块常量的思想,去防止变量的全局污染,*(不知道什么意思,请自己搜索,这里不再赘述)*

```js
/** exportTest.js模块 */
export const a = 1;
export const b = 2;
export const c = 3;
```

```html
<!-- useimport.html文件,用来将对外接口导入另一个模块,然后通过网页的控制台输出的一个文件-->
<script type="module">
    import * as container from './exportTest.js';
    console.log(container.a); // 1
    console.log(container.b); // 2
    console.log(container.c); // 3    
</script>
```

## export继承的用法

如果要使用的常量非常多,你可以建一个专门的`constants`目录,将各种常量写在不同的文件里面,保存在该目录下,如:

```javascript
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'admin password'
};

// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

// 然后将这两个模块使用继承合并到另一个模块中:constants/index.js
export * from './db';
export {users} from './users';
```

- 通过以上这样做,我们就让整个项目模块化,工程化,维护起来更方便了.因为使用的时候,直接加载`index.js`就可以了,比如:
  
  ```javascript
  // script.js
  import {db, users} from './constants/index';
  ```

- 注意: 使用export命令继承另另一个模块的对外接口时,我们可以使用 `*`将之所有对外接口继承,也可以依然使用 {}大括号括住,并执行需要继承的对外界接口.

# module的加载实现

## 讲在前面的话

在同级目录: *module的模块命令*中,我们已经介绍了一些核心的module的概念和两个命令:import,export. 

这节主要是讲如何在浏览器和Node中加载ES6的module,以及实际开发中经常遇到的问题,如:循环加载.

请注意:这节并不难,知识点不多. 关键是如果将ES6的module使用在浏览器和Node中,以及一些基础原理.

## 浏览器加载

### 描述

在默认情况下,浏览器中内嵌的JavaScript脚本是同步加载的,即:渲染引擎在执行到\<script\>标签时就会停下来去执行这个脚本中的内容,

只有这个脚本中的内容执行完毕后,才会继续向下渲染, 如果是一个外部脚本,还得加上这个外部脚本下载的时间.

如果脚本体积很大,下载和执行的时间就会很长,因此造成浏览器堵塞,用户会感觉到浏览器“卡死”了,没有任何响应.

这显然是很不好的体验,所以浏览器允许脚本异步加载,在同级目录: *用法*中,我将给出两种异步加载脚本的示例.

### 用法

#### 浏览器默认同步加载脚本.js

HTML 网页中,浏览器通过script标签加载 JavaScript 脚本.

```html
<!-- 页面内嵌的脚本 -->
<script type="application/javascript"></script>

<!-- 加载外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

上面代码中,由于浏览器脚本的默认语言是 JavaScript,因此`type="application/javascript"`可以省略.

#### 浏览器异步加载脚本的两种方法

##### 描述

如果在script标签中加上:defer和async关键字,那么浏览器就会异步加载脚本.

```html
<script src="path" defer></script>
<script src="path" async></script>
```

##### defer

- defer:推迟,延迟

defer延迟加载: 即当整个页面在内存中正常渲染*(DOM 结构完全生成,以及其他脚本执行完成)*完成后,才会下载并执行使用defer关键字的脚本,

如果存在defer脚本,会按照它们在页面出现的顺序加载,而多个以下的`async`脚本是不能保证加载顺序的

##### async

- async => asynchronous,异步的

async异步加载:即使用async关键字的脚本一旦被下载完成,则立即执行,如果有多个async脚本,我们并不知道会先执行哪个async脚本,

因为几乎不可能在同一时间下刚好有两个/以上的脚本被下载完.

##### 总结

- `defer`是“渲染完再执行”,`async`是“下载完就执行”.
- 另外如果有多个`defer`脚本,会按照它们在页面出现的顺序加载,而多个`async`脚本是不能保证加载顺序的.

所以请根据情况,选择是同步,延迟又或者是异步加载脚本,请根据实际情况而定!

#### 浏览器加载ES6的模块

浏览器加载 ES6 模块,也使用script标签,但是要加入`type="module"`属性,告诉浏览器这是一个模块,而不是脚本,否在在脚本中使用import或者script这种命令是会报错的

```html
<script type="module" src="./demo.js"></script>
```

当然了如果是外部脚本不存在script标签,则无需使用type='module',这样即使直接使用import和export命令也不会出错

前提是你不会把这个使用了import或者export命令的模块当作脚本加载到浏览器然后使用浏览器执行,否则依然会报错.

- PS: 2020/4/5: 测试环境:FireFox.  正确的使用模块,去执行一些如console.log()这样的命令的代码,可以在FireFox上显示.
  
  **但是似乎其余浏览器还不支持ES6的模块直接在浏览器中执行.**

----

且请注意: 浏览器对于带有type='module'的\<script\>标签,都是默认使用defer进行延迟加载,即:等到页面正常在内存中渲染完必以及其他普通脚本执行完成,才会开始执行或下载脚本.

```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

同样的,如果网页有多个 \<script type="module">,它们也会按照在页面出现的顺序依次执行,毕竟其实它们默认使用了defer关键字延迟加载,不是吗?

- 如果你改变了defer默认值,变成asyn异步加载,则这时只要脚本下载完成,渲染引擎就会中断渲染立即执行该脚本.
  
  执行完成后,再恢复渲染.

```html
<script type="module" src="./foo.js" async></script>
```

### 对于模块脚本来说,有几点需要注意

- 代码是在模块作用域之中运行,而不是在全局作用域运行.模块内部的顶层变量,外部不可见.
- 模块脚本自动采用严格模式,不管有没有声明`use strict`.
- 模块之中,可以使用`import`命令加载其他模块（`.js`后缀不可省略,需要提供绝对 URL 或相对 URL）,也可以使用`export`命令输出对外接口.
- 模块之中,顶层的`this`关键字返回`undefined`,而不是指向`window`.也就是说,在模块顶层使用`this`关键字,是无意义的.
- 同一个模块如果加载多次,将只执行一次.

下面是一个示例模块.

```javascript
import utils from 'https://example.com/js/utils.js';

const x = 1;

console.log(x === window.x); //false
console.log(this === undefined); // true
```

利用顶层的`this`等于`undefined`这个语法点,可以侦测当前代码是否在 ES6 模块之中.

```javascript
const isNotModuleScript = this !== undefined;
```

## Node加载

### ES6模块与CommonJS模块的差异

- ***不知道什么是CommonJS? 请参见:<CommonJS.md>***

#### 描述

讨论 Node 加载 ES6 模块之前,必须了解 ES6 模块与 CommonJS 模块完全不同.

对于ES6和CommonJS的模块来说,它们有两个非常重要的差异:

1. CommonJS 模块输出的是一个值的拷贝
   
   ES6 模块输出的是值的引用.

2. CommonJS 模块是运行时执行(加载)
   
   ES6 模块是编译时就执行(加载).

第二个差异是因为 CommonJS 加载的是一个对象(即`module.exports`属性),该对象只有在脚本运行完才会生成,即由nodejs自动生成.参见:<CommonJS.md>

而 ES6 模块不是对象,它的对外接口只是一种静态定义,在代码静态解析阶段就会生成.

当你了解完<CommonjS.md>中的内容和这章的前文module模块命令时你就知道为什么了,所以这里我们不再赘述. 我们重点讲讲第一个差异是什么东西.

- CommonJS中的module需要在node环境中,由node执行,否则我们在一个module中写的module.exports/exports 以及require函数,
  
  在浏览器中执行都是无法被识别的,其原因***参见:<CommonjS.md>***

#### CommonJS输出值的拷贝,ES6模块输出值的引用

##### CommonJS输出值的拷贝

###### 值的拷贝示例

CommonJS 模块输出的是值的拷贝,也就是说,一旦输出一个值,模块内部的变化就影响不到这个值.请看下面这个模块文件`a.js`的例子.

```js
// a.js
var count = 3;
function addCount() {
    return count++;
}
module.exports = {
    count:count,
    addCount:addCount
}
```

- 在a.js模块中,我们对外暴露出module对象以及module对象中的所有属性(如exports属性)
  
  > ​    这里说暴露出module对象,而不是module.exports,其原因是因为nodejs在执行一个模块时,最后保存的是:
  > 
  > ​    save(module,exported),即保存的是module这个对象,exports属性只是附带品,参见:<CommonJS.md

在 `b.js`中,我们使用require函数来导入刚刚我们在a.js中暴露出来的接口(module对象)

```js
// b.js
//获取nodejs执行时自动保存的sava(module,exported);中的module对象,赋值给moduleObj变量
let moduleObj = require('./a');
moduleObj.addCount();
console.log(moduleObj)
console.log(moduleObj.addCount())
/**
    moduleObj输出:{count:3,addCount: [Function: addCount] }
    moduleObj.addCount()输出:4
*/
```

我们可以发现 moduleObj.addCount()是先执行的,即会执行count++,所以moduleObj.addcount()会输出4, 但是我们输出moduleObj(module对象)时,却发现,**里面的count属性的值仍然为3.**

这说明,`a.js`模块加载以后,它的内部变化就影响不到输出的`moduleObj.count`了.

这是因为`moduleObj.count`是一个原始类型的值,会被缓存.除非将moduleObj.count这个属性的值写成一个函数,才能得到内部变动后的值.

​    这是因为：*函数里面的值不会被缓存的,因为函数执行完之后内部的所有变量及其代码都会被自动销毁,但是函数仍然存在.*

​    *返回的值(return)都是实时的,因为每次想要返回值,都必须在执行一次这个函数,这也就相当于重新更新了函数内部的变量和外部变量建立的连接,就得到了最新的外部的变量的值.*

###### 解决办法

在前一节我们已经说过解决办法为: 将我们暴露出的接口的值,改成方法的形式,原因:详见:同级目录 - ***值的拷贝示例 最下面***

```js
/** a.js模块 (需要被导入的模块) */
var count = 3;
module.exports = {
    count() {
        count++;
        return count;
    }
}

/** b.js模块, 需要导入a.js的模块,使用node执行 */
let moduleObj = require('./a'); // 获取nodejs执行时,自动保存的sava(module,exported);中的module对象,赋值给all变量
console.log(moduleObj.count()); // 4
console.log(moduleObj.count()); // 5
```

通过上面代码,我们很容易发现,我们可以实时获取到最新值了. 

其实count属性实际上是一个取值器函数,在内部执行了count++之后,其外部的变量count就会+1, 然后再将这个+1过后的coutn当作count属性函数的返回值.

这样每次想要获取count++值,我们都必须执行一遍count()属性函数,这样又会执行上面的步骤,相当于更新~

所以此时,我们就可以正确读取内部变量`count`的变动了.

##### ES6模块输出值的引用

###### 描述

首先,我们得确定一点,**ES6模块的import和export命令是静态编译的**,即程序即使未执行,也会提前输出或输入.

JS引擎对脚本静态分析的时候,遇到模块加载命令`import`,就**会生成一个只读引用.**即我们无法重新赋值给导入模块的对外接口.***详见:modue模块命令 - import命令***

等到脚本真正执行时,再根据这个只读引用,到被加载的那个模块里面去取值.换句话说,ES6 的`import`有点像 Unix 系统的“符号连接”,原始值变了,`import`加载的值也会跟着变.

因此,**ES6 模块是动态引用,并且不会缓存值,模块里面的变量绑定其所在的模块,且导入模块无法重新赋值给对外接口(对象的属性可以任意修改)**.

而不是如同CommonJS的中的module.exports或require函数这种,在不存在循环加载的前提下:

​    一旦require函数加载了来自x模块的module对象并赋值给了一个变量y后,则x模块的module对象就如同一个"快照"般被定格下来,除了像函数这种会"更新"数据的代码块,否则一切都被缓存到了变量y中(即y指向x模块的module对象)

###### 示例

```js
/** 一个需要导出对外接口的a.js模块 */
var count = 3;
function addCount() {count++;}
export { addCount,count };
```

```html
<!-- 导入a.js的模块,其放入一个test.html文件中运行在浏览器中 -->
<script type="module">
    import { addCount, count } from './a.js';
    console.log(count); // 3
    addCount(); // 调用让count++的函数
    console.log(count); // 4
</script>
```

上面代码说明,ES6 模块输入的变量`count`是活的,完全反应其所在模块`a.js`内部的变化,即导入a.js的模块,若调用自增函数,是会影响到a.js模块中的值的,这是因为它们是动态绑定关系.

​    详见: ***module模块命令 - export命令 - export用法 - 核心基本用法 - export命令必须建立一一对应关系.***

- ​    同时,在这个目录下,也有动态绑定的例子,即使用setTimeout()函数,延迟被导入模块多久改变某个变量值,然后再导入模块,
  
  ​    过了足够的事件后获取这个被改变的数据,事实证明,这是可以实时获取的.

### Node加载ES6模块

#### 描述

Node 对 ES6 模块的处理比较麻烦,因为它有自己的 CommonJS 模块格式,与 ES6 模块格式是不兼容的.

目前的解决方案是:将两者分开,ES6 模块和 CommonJS 采用各自的加载方案,它们是不能混合使用的,如果混合使用,则会在运行时出错.

- **Node 要求 ES6 模块采用.mjs作为文件名的后缀.**

​    也就是说,只要脚本文件里面使用import或者export命令,那么就必须采用.mjs后缀名,否则无法使用node命令执行该模块.

- require命令不能加载.mjs文件,会报错.

只有import命令才可以加载.mjs文件,.mjs文件里面也不能使用require命令,必须使用import.

#### nodejs执行ES6模块的命令

想要让nodejs执行ES6模块的命令为: `node --experimental-modules yourModuleName.mjs`

但是请注意:这项功能还在试验阶段,需要安装 Node v8.5.0 或以上版本.

且当你成功使用该命令执行一个ES6模块时,node也会给出警告:

- ExperimentalWarning: The ESM module loader is experimental 
  
  => **警告:ESM模块加载器是实验性的.**

#### .mjs文件

什么是.mjs后缀呢?我想你们在同级目录:*描述* 中也有初步的了解了.即:

​    Node需要执行ES6模块时,必须将该模块的.js后缀改成.mjs后缀,否则nodejs无法执行ES6模块.

​    即：.mjs 文件是 node 要执行 ES6 模块时的文件后缀名（需要将使用 ES6 模块的 .js 文件改为 .mjs 文件）

所以此时的**.mjs和js文件其实已经是两个不同的种类了**,一个是JavaScript文件,一个是被node执行的mjs文件

不过为了与浏览器的import加载规则相同,Node 的.mjs文件也同样支持js(ES6)模块的export命令和import命令输出/输入时用的绝对/相对/无路径.

> ​    看不懂....
> 
> 看懂了...2020-06-17:
> 
> 这是HTTP的get方法, 后面的 ?query=1是拼接字符串,即:queryString.
> 
> 参见:<get和post.md>
> 
> ```javascript
> import './foo?query=1'; // 加载 ./foo 传入参数 ?query=1
> ```
> 
> 上面代码中,脚本路径带有参数`?query=1`,Node 会按 URL 规则解读.同一个脚本只要参数不同,就会被加载多次,并且保存成不同的缓存.由于这个原因,只要文件名中含有`:`、`%`、`#`、`?`等特殊字符,最好对这些字符进行转义.

目前,**Node 的import命令(.mjs文件中的import命令)**只支持加载本地模块（file:协议）,不支持加载远程模块.

- .mjs如果只有import和export命令,则依然能在浏览器环境中使用,不一定非要使用node执行

#### node的import命令(即.mjs文件中的import命令)

对于nodejs在执行.mjs文件时,如果模块名不含路径,那么import命令会去node_modules目录寻找这个模块.

```javascript
import 'baz';
import 'abc/123';
```

- 第一行将回去node_modules目录中寻找 'baz'这个module,若没找到,则报错.
- 第二行依然是不存在路径(需要./),所以也是如同第一行一般.

---

如果模块名包含路径,那么import命令会按照路径去寻找这个名字的脚本文件.

```javascript
import 'file:///etc/config/app.json';
import './foo';
import './foo?search';
import '../bar';
import '/baz';
```

---

如果脚本文件省略了后缀名,比如`import './foo'`,Node 会依次尝试四个后缀名：

1. ./foo.mjs
2. ./foo.js
3. ./foo.json
4. ./foo.node

如果这些脚本文件都不存在,Node 就会去加载./foo/package.json的main字段指定的脚本.

如果./foo/package.json不存在或者没有main字段,那么就会依次加载:

1. ./foo/index.mjs
2. ./foo/index.js
3. ./foo/index.json
4. ./foo/index.node

即,寻找这四个文件,如果以上四个文件还是都不存在,就会抛出错误.

最后,Node 的import命令是异步(延迟defer)加载,这一点与浏览器的处理方法相同.

#### 示例

```js
/** exportTest.mjs */
export let foo = 'foo';
export function func() {return arguments.length};

/** demo.mjs */
import {foo,func} from './exportTest.mjs';
console.log(foo); // foo
console.log(func()); // 0
```

当我们使用`node --experimental-modules demo.mjs`命令在CLI中执行demo.mjs文件时,我们就可以在CLI中看见输出的值.

- **.mjs如果只有import和export命令,则依然能在浏览器环境中使用,不一定非要使用node执行**
- 我们无法混合使用import/export和module.exports/require(),否则编译错误.

```html
<!-- userMJS Module -->
<script type="module">
    import * as one from './demo.mjs';
    console.log(one)
</script>
```

其输出结果为:

```
foo
0
Object { … }
即:Symbol(Symbol.toStringTag): "Module"
```

第三行输出的Symbol(Symbol.toStringTag): "Module"  , 这个值是因为.mjs代表的是node可执行的文件.所以会出一个Symbol对象类型的唯一值(是不是,我也不清楚)

### 循环加载

#### 描述

循环加载（circular dependency）指的是,`a`脚本的执行依赖`b`脚本,而`b`脚本的执行又依赖`a`脚本.

```javascript
// a.js
var b = require('b');

// b.js
var a = require('a');
```

通常,“循环加载”表示存在强耦合,如果处理不好,还可能导致递归加载,使得程序无法执行,因此应该避免出现.

但是实际上,这是很难避免的,尤其是依赖关系复杂的大项目,很容易出现`a`依赖`b`,`b`依赖`c`,`c`又依赖`a`这样的情况.

这意味着,模块加载机制必须考虑“循环加载”的情况.

对于 JavaScript 语言来说,目前最常见的两种模块格式 CommonJS 和 ES6,处理“循环加载”的方法是不一样的,返回的结果也不一样.

#### CommonJS模块循环加载

##### 其原理

介绍 ES6 如何处理“循环加载”之前,先介绍目前最流行的 CommonJS 模块格式的加载原理.

CommonJS 的一个模块,就是一个脚本文件.`require`命令第一次加载该脚本,就会执行整个脚本,然后在内存生成一个对象.

```javascript
{
  id: '...',
  exports: { ... },
  loaded: true,
  ...
}
```

上面代码就是 Node 内部加载模块后生成的一个对象.该对象的`id`属性是模块名,`exports`属性是模块输出的各个接口,`loaded`属性是一个布尔值,表示该模块的脚本是否执行完毕.其他还有很多属性,这里都省略了.

以后需要用到这个模块的时候,就会到exports属性上面取值.

即使再次执行require命令,也不会再次执行该模块,而是到缓存之中取值.也就是说,CommonJS 模块无论加载多少次,都只会在第一次加载时运行一次,以后再加载,就返回第一次运行的结果,除非手动清除系统缓存.

​    ***参见:<CommonJS.md> - module.exports和exports基本实现原理***

##### CommonJS 模块的循环加载

###### 循环加载示例讲解

CommonJS 模块的重要特性是加载时执行,即脚本代码在require的时候,就会全部执行.

**一旦出现某个模块被"循环加载",就只输出已经执行的部分,还未执行的部分不会输出.**

让我们来看,Node [官方文档](https://nodejs.org/api/modules.html#modules_cycles)里面的例子.脚本文件`a.js`代码如下.

```javascript
// a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中,b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
```

上面代码之中,a.js脚本先输出一个done变量,然后加载另一个脚本文件`b.js`.注意,**此时a.js代码就停在这里**,**等待b.js执行完毕**,再往下执行.

- 注意:是等待b.js执行完毕,即使b.js中又加载a.js也是没用的,原因下面有写,即**:JS引擎会知道a.js已经被执行过一次,不会回去加载第二次.**

- **即使ES6模块的循环加载也是如此.** 先被执行的模块a去加载(导入)另一个模块b时,不会被模块b中的[循环]加载(下载)模块a所加载,
  
  **一定先是模块b被执行完毕,再会回头执行模块a,否则如果JS引擎不这样做,就如同陷入死循环般.**

再看`b.js`的代码.

```javascript
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中,a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
```

- 上面代码之中,b.js执行到第二行,就会去加载a.js,这时,就发生了“循环加载”.
- 系统会去a.js模块对应对象的exports属性取值,可是因为a.js还没有执行完,从exports属性只能取回已经执行的部分,而不是最后的值.
- **注意,这里只是取值,而不是去重新执行a模块!**

`a.js`已经执行的部分,只有一行:`exports.done = false;`

因此,对于b.js来说,它从a.js只输入一个变量done,值为false。

然后,**b.js接着往下执行,等到全部执行完毕,再把执行权交还给a.js**,a.js接着往下执行,直到执行完毕.我们写一个脚本main.js,验证这个过程.

```javascript
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);
```

执行`main.js`,运行结果如下.

```bash
node main.js //需要在node环境中执行.

在 b.js 之中,a.done = false
b.js 执行完毕
在 a.js 之中,b.done = true
a.js 执行完毕
在 main.js 之中, a.done=true, b.done=true
```

上面的代码证明了两件事.

1. 一是,在b.js之中,a.js没有执行完毕,只执行了第一行.
2. 二是,main.js执行到第二行时,不会再次执行b.js,而是输出缓存的b.js的执行结果,即它的第四行: `exports.done = true;`

**总之,CommonJS 输入的是被输出值的拷贝,不是引用.**

###### 总结

即,我们可以说: 

- 在某两个模块a,b若发生循环加载
- 则如果a先加载b模块,此时JS引擎就会知道a模块已经执行过
- 所以在b模块去加载a模块时,并不会将a执行完必,而是只拿a暴露出的对外接口
- 然后将自身(b模块)执行完毕后
- 才会返回a模块,最后将a模块执行完毕.

所以,我们得出一个结论:

- 循环加载中,一个模块被加载后,这个模块一定会先执行完毕,才会返回到加载模块的模块去执行.

---

另外,由于 CommonJS 模块遇到循环加载时,返回的是当前已经执行的部分的值,而不是代码全部执行后的值,两者可能会有差异.

所以,输入变量的时候,必须非常小心.

```javascript
var a = require('a'); // 安全的写法
var foo = require('a').foo; // 危险的写法

exports.good = function (arg) {
  return a.foo('good', arg); // 使用的是 a.foo 的最新值
};

exports.bad = function (arg) {
  return foo('bad', arg); // 使用的是一个部分加载时的值
};
```

上面代码中,如果发生循环加载,require('a').foo的值很可能后面会被改写,改用require('a')会更保险一点.

- 把整个模块a加载,而不是单纯的一个函数,否则这个函数会被先缓存,后面即使再调用该foo函数也是会优先获取返回的值.
  
  只要加载a模块,那么程序才会"被迫"找不到exports属性中foo函数的缓存,然后会去a模块找foo这个函数,然后调用这个函数.
  
  这样就相当于"更新"了foo函数中内部的实时数据.

#### ES6 模块的循环加载

##### 描述

ES6 处理“循环加载”与 CommonJS 有本质的不同.

ES6 模块是动态引用,如果使用import从一个模块加载变量（即import foo from 'foo'）,那些**变量不会被缓存,而是成为一个指向被加载模块的引用**,需要开发者自己保证,真正取值的时候能够取到值.

##### ES6模块循环加载示例讲解

###### 讲解

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
```

- 上面代码中,a.mjs加载b.mjs,b.mjs又加载a.mjs,构成循环加载.执行a.mjs,结果如下.

- 记住:循环加载中,被加载的模块b.mjs一定会先执行完毕!

- ***import {foo} from './a';***
  
  执行a.mjs,这行代码只会取a.mjs中已经暴露出的对外接口,而不会执行a.mjs后续代码.

```basic
node --experimental-modules a.mjs // 参见:Node加载ES6模块

/** 输出结果 */
b.mjs
ReferenceError: foo is not defined
```

上面代码中,执行a.mjs以后会报错,foo变量未定义,这是为什么？

让我们一行行来看,ES6 循环加载是怎么处理的:

- 首先,执行a.mjs以后,引擎发现它加载了b.mjs,因此会优先执行b.mjs,然后再执行a.mjs。
- 接着,执行b.mjs的时候,已知它从a.mjs输入了foo接口,**这时不会去执行a.mjs,而是认为这个接口已经存在了,继续往下执行.**
- 执行到第三行console.log(foo)的时候,才发现这个接口根本没定义,因此报错.

###### 解决方法

解决这个问题的方法:

​    就是让b.mjs运行的时候,foo已经有定义了.这可以通过将foo写成函数来解决.

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
```

这时再执行a.mjs就可以得到预期结果.

```bash
 node --experimental-modules a.mjs
b.mjs
foo
a.mjs
bar
```

- **这是因为函数具有提升作用**
- 在执行import {bar} from './b'时,函数foo就已经有定义了,所以b.mjs加载的时候不会报错
- **这也意味着,如果把函数foo改写成函数表达式,也会报错.**

```javascript
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
const foo = () => 'foo';
export {foo};
```

- 上面代码的第四行,改成了函数表达式,就不具有提升作用
  
  执行就会报错.

## ES6 模块的转码

浏览器目前还不支持 ES6 模块,为了现在就能使用,可以将其转为 ES5 的写法.除了 Babel 可以用来转码之外,还有以下两个方法,也可以用来转码.

### ES6 module transpiler

[ES6 module transpiler](https://github.com/esnext/es6-module-transpiler)是 square 公司开源的一个转码器,可以将 ES6 模块转为 CommonJS 模块或 AMD 模块的写法,从而在浏览器中使用.

首先,安装这个转码器.

```bash
$ npm install -g es6-module-transpiler
```

然后,使用`compile-modules convert`命令,将 ES6 模块文件转码.

```bash
$ compile-modules convert file1.js file2.js
```

`-o`参数可以指定转码后的文件名.

```bash
$ compile-modules convert -o out.js file1.js
```

### SystemJS

另一种解决方法是使用 [SystemJS](https://github.com/systemjs/systemjs).它是一个垫片库（polyfill）,可以在浏览器内加载 ES6 模块、AMD 模块和 CommonJS 模块,将其转为 ES5 格式.它在后台调用的是 Google 的 Traceur 转码器.

使用时,先在网页内载入`system.js`文件.

```html
<script src="system.js"></script>
```

然后,使用`System.import`方法加载模块文件.

```html
<script>
  System.import('./app.js');
</script>
```

上面代码中的`./app`,指的是当前目录下的 app.js 文件.它可以是 ES6 模块文件,`System.import`会自动将其转码.

需要注意的是,`System.import`使用异步加载,返回一个 Promise 对象,可以针对这个对象编程.下面是一个模块文件.

```javascript
// app/es6-file.js:

export class q {
  constructor() {
    this.es6 = 'hello';
  }
}
```

然后,在网页内加载这个模块文件.

```html
<script>

System.import('app/es6-file').then(function(m) {
  console.log(new m.q().es6); // hello
});

</script>
```

上面代码中,`System.import`方法返回的是一个 Promise 对象,所以可以用`then`方法指定回调函数.

# 提案或可能已经实现的功能

## import()

### 简介

前面介绍过,`import`命令会被 JavaScript 引擎静态分析,先于模块内的其他语句执行（`import`命令叫做“连接” binding 其实更合适）.所以,下面的代码会报错.

```javascript
// 报错
if (x === 2) {
  import MyModual from './myModual';
}
```

上面代码中,引擎处理`import`语句是在编译时,这时不会去分析或执行`if`语句,所以`import`语句放在`if`代码块之中毫无意义,因此会报句法错误,而不是执行时错误.

也就是说,`import`和`export`命令只能在模块的顶层,不能在代码块之中（比如,在`if`代码块之中,或在函数之中）.

这样的设计,固然有利于编译器提高效率,但也导致无法在运行时加载模块.在语法上,条件加载就不可能实现.

如果`import`命令要取代 Node 的`require`方法,这就形成了一个障碍.因为`require`是运行时加载模块,`import`命令无法取代`require`的动态加载功能.

```javascript
const path = './' + fileName;
const myModual = require(path);
```

上面的语句就是动态加载,`require`到底加载哪一个模块,只有运行时才知道.`import`命令做不到这一点.

因此,有一个[提案](https://github.com/tc39/proposal-dynamic-import),建议引入`import()`函数,完成动态加载.

```javascript
import(specifier)
```

上面代码中,`import`函数的参数`specifier`,指定所要加载的模块的位置.`import`命令能够接受什么参数,`import()`函数就能接受什么参数,两者区别主要是后者为动态加载.

`import()`返回一个 Promise 对象.下面是一个例子.

```javascript
const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });
```

`import()`函数可以用在任何地方,不仅仅是模块,非模块的脚本也可以使用.它是运行时执行,

也就是说,什么时候运行到这一句,就会加载指定的模块.另外,`import()`函数与所加载的模块没有静态连接关系,

这点也是与`import`语句不相同.`import()`类似于 Node 的`require`方法,区别主要是前者是异步加载,后者是同步加载.

### 适用场合

下面是`import()`的一些适用场合.

（1）按需加载.

`import()`可以在需要的时候,再加载某个模块.

```javascript
button.addEventListener('click', event => {
  import('./dialogBox.js')
  .then(dialogBox => {
    dialogBox.open();
  })
  .catch(error => {
    /* Error handling */
  })
});
```

上面代码中,`import()`方法放在`click`事件的监听函数之中,只有用户点击了按钮,才会加载这个模块.

（2）条件加载

`import()`可以放在`if`代码块,根据不同的情况,加载不同的模块.

```javascript
if (condition) {
  import('moduleA').then(...);
} else {
  import('moduleB').then(...);
}
```

上面代码中,如果满足条件,就加载模块 A,否则加载模块 B.

（3）动态的模块路径

`import()`允许模块路径动态生成.

```javascript
import(f())
.then(...);
```

上面代码中,根据函数`f`的返回结果,加载不同的模块.

### 注意点

`import()`加载模块成功以后,这个模块会作为一个对象,当作`then`方法的参数.因此,可以使用对象解构赋值的语法,获取输出接口.

```javascript
import('./myModule.js')
.then(({export1, export2}) => {
  // ...·
});
```

上面代码中,`export1`和`export2`都是`myModule.js`的输出接口,可以解构获得.

如果模块有`default`输出接口,可以用参数直接获得.

```javascript
import('./myModule.js')
.then(myModule => {
  console.log(myModule.default);
});
```

上面的代码也可以使用具名输入的形式.

```javascript
import('./myModule.js')
.then(({default: theDefault}) => {
  console.log(theDefault);
});
```

如果想同时加载多个模块,可以采用下面的写法.

```javascript
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});
```

`import()`也可以用在 async 函数之中.

```javascript
async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();x`
```