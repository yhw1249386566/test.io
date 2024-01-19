[TOC]

# class基本语法

## class'类'的由来

在ES6之前,生成实例(对象)的传统方法是通过new 构造函数(构造器),比如:

```js
function Yomua(x,y){
    this.x = x;
     this.y = y;
};
Yomua.prototype.add = function() {
    return `1+2=${this.x + this.y}`
}
let y = new Yomua(1,2);
console.log(y.add()); // 3 
```

- 以上示例就是:混合的构造函数/原型方式=>***参见:<h5_css_js.doc>***
  
  即:我们使用这种方式,达到如同Java/C语言这种可以:每个实例都有自己的属性,能使用公有方法.

上面这种写法跟传统的面向对象语言(比如 C++ 和 Java)差异很大,很容易让新学习这门语言的程序员感到困惑.

所以ES6人性化的提供了一个class('类')这个概念,作为对象的模板(即构造函数的替代品).我们需要使用class关键字,就能定义类.***详见:用法***

## 描述

基本上,ES6 的class可以看作只是一个语法糖,它的绝大部分功能,ES5 都可以做到,新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已.

## 用法和详解

### 基本用法和详解

#### class的构造方法和'方法'详解

##### 描述

还记得:***class'类'的由来*** 中的那个混合的构造函数/原型方式的示例吗?以下的写法就是那个示例class写法.

```js
// ES5的写法
function Yomua(x,y){
    this.x = x;
     this.y = y;
};
Yomua.prototype.add = function() {
    return `1+2=${this.x + this.y}`
}

// ES6的写法
class Yomua {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    add() {
        return `1+2=${this.x + this.y}`
    }
}
```

上面代码使用class关键字,定义了一个"类":Yomua,在这个类中,我们可以清楚的发现里面存在两个方法:constructor()和add(),在***同级目录constructor详解,add详解*** 中,我们将详解它们的意思.

##### constructor详解('类'的构造方法详解)

constructor:顾名思义=>构造器.

即:这个方法其实就是构造函数,也就是说这个constructor函数的函数体和构造器的函数体是一模一样的.

它接收的参数(x,y)正是构造函数接收的参数.我们换一种言简意赅的表述方式:

**ES5的构造函数(*function Yomua(x,y){...}*) 对应的就是 ES6的类的constructor(x,y)方法;且它们接收的参数也是对应的.**

且constructor方法是类的默认方法,通过**new命令生成对象实例时,自动调用该方法**.一个类必须有constructor方法,如果没有显式定义,一个空的constructor方法会被默认添加.

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```

---

constructor方法默认返回实例对象（即this）,但是完全可以指定返回另外一个对象.

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```

上面代码中,constructor函数返回一个全新的对象,结果导致实例对象不是Foo类的实例.

##### '类'的方法详解

以上的 ***class的构造方法和'方法'详解*** add是一个函数,且需要注意的是:我们在定义这个'类'的函数(方法)时,并没有使用function关键字,而是直接写name(...){...} 

​    还有一点需要注意:方法之间不需要逗号分隔,加了会报错.

add不单纯的只是一个类的方法,它其实是定义在prototype属性指向的公共内存地址空间的一个方法,即,如同: **Yomua.prototype.add = function(...){...};** 

这就是我们实例化类时,可以使用类方法的"真面目",事实上,**类中的不加static关键字的方法都定义在prototype属性上面**.*(实例属性则是实例自己的,而不是prototype定义的,参见:**class中定义实例属性)***

- PS: 当然了,这存在例外,比如使用static关键字定义的方法,也存在于class内部,但是并不存在于prototype属性指向的原型对象中.
  
  ​    ***详见: 用法和详解 - 静态方法***

如:

```js
class Yomua {
    constructor(){return}
    toString(){}
    toValule(){}
}
// 等同于

function Yomua(){
    return
}
Yomua.prototype = {
    constructor() { return },
    toString() { },
    toValule() { }
}
```

- ***Yomua.prototype = {}***
  
  使用这种方式可以快速的为每个构造器添加prototype属性上的方法.

通过以上的示例,我们能轻松得出:实例化class Yomua,并调用toString()等方法,其实就相当于ES5中调用原型上的方法:

```javascript
class B {}
let b = new B();

// b 中如果存在 constructor()
b.constructor === B.prototype.constructor // true
```

#### class的类型和XXX.prototype.constructor

```javascript
class Yomua {
    constructor() {return}
    toString() { }
    toValule() { }
}
console.log(typeof Yomua); // function
console.log(Yomua)
console.log(Yomua.prototype.constructor)
console.log(Yomua === Yomua.prototype.constructor);//true
console.log(Yomua.constructor) // 指定的 Yomau 的 constructor() {...} 
/** 
console.log(Yomua);

    class Yomua {
        constructor() {
            return
        }
        toString() { }
        toValule() { }
    }
-----------------------------------------------------
console.log(Yomua.prototype.constructor)

    class Yomua {
        constructor() {
            return
        }
        toString() { }
        toValule() { }
    }
*/
```

上面代码表明,类的数据(返回)类型就是函数,类本身就指向构造函数.

至于为什么Yomua.prototype.constructor 中也包含其他prototype属性上的方法,是因为prototype对象的constructor属性,也直接指向“类”的本身，即: `Yomua.prototype.constructor === Yomua`

注意：constructor() 存在于 class 上面，而非 prototype，`Yomua.prototype.constructor` 值得是 class 本身，而非 constructor()

***[(参见:阮一峰的ES6文档)](https://es6.ruanyifeng.com/)***

PS:这与 ES5 的行为是一致的.

#### class '类'如何使用

我们再使用class创建类时,想要使用它,该怎么使用呢? 即:仍然是直接对类使用new命令,跟构造函数的用法完全一致.

- PS:如果使用new操作符,new一个构造函数,则该构造函数立即被执行.
  
  ```js
  function Yomua() {console.log(1)}
  let y = new Yomua(); // 1
  ```

```javascript
class Bar {
  doStuff() {
    console.log('stuff');
  }
}

var b = new Bar();
b.doStuff() // "stuff"
```

有意思的是:类必须使用new调用,否则会报错.这是它跟普通构造函数的一个主要区别,因为普通构造函数不用new也可以执行.

笔者注: 我们可以通过 new.target 属性使得 Function 也只能通过 new 的方法进行调用,详见: ***new.targer属性***

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}

Foo()
// TypeError: Class constructor Foo cannot be invoked without 'new'
```

#### class中的所有定义的方法都是不可枚举的

```javascript
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}
// []
Object.keys(Point.prototype)
// ["constructor","toString"]
Object.getOwnPropertyNames(Point.prototype)
```

上面代码中,toString方法是Point类内部定义的方法,它是不可枚举的.这一点与 ES5 的行为不一致.

- ***Object.keys()*** 
  
  ​    会返回一个由一个给定对象的自身可枚举属性组成的数组.
  
  ​    这里不存在返回toString(),所以这代表类内部定义的方法,都是不可枚举的

#### 可以使用_proto _属性为类添加方法(不建议)

由于ES6和ES5 一样,类的所有实例共享一个原型对象,所以这也意味着,我们可以通过实例的__proto__属性为“类”添加方法.

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__ //true
```

- 使用_proto _ 属性为类添加方法

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__.printName = function () { return 'Oops' };

p1.printName() // "Oops"
p2.printName() // "Oops"

var p3 = new Point(4,2);
p3.printName() // "Oops"
```

> __proto__ 并不是语言本身的特性,这是各大厂商具体实现时添加的私有属性,虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性,但依旧不建议在生产中使用该属性,避免对环境产生依赖.
> 
> 生产环境中,我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型,然后再来为原型添加方法/属性.

上面代码在p1的原型上添加了一个printName方法,由于p1的原型就是p2的原型,因此p2也可以调用这个方法.

而且,此后新建的实例p3也可以调用这个方法.这意味着,使用实例的__proto__属性改写原型,必须相当谨慎,不推荐使用,因为这会改变“类”的原始定义,影响到所有实例.

#### getter和setter(对象访问器)用在class中

*其实这就是对象访问器,**参见:<对象.md - 对象访问器>***

```javascript
    class MyClass {
        constructor() {
        }
        get prop() {
            return this.name;
        }
        set prop(value) {
            this.name = value;
        }
    }
    let inst = new MyClass();

    inst.prop = 'yomua';
    console.log(inst.prop); // yomua
```

上面代码中,prop属性有对应的存值函数和取值函数,因此赋值和读取行为都被自定义了.

- 注意:虽说getter和setter看上去是一个函数,但是实际上却不是.因为它们实际上它们是一个[伪属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set),只能使用调用属性的方式调用它们.

---

存值函数和取值函数是设置在属性的 Descriptor 对象上的.

```javascript
class CustomHTMLElement {
  constructor(element) {
    this.element = element;
  }

  get html() {
    return this.element.innerHTML;
  }

  set html(value) {
    this.element.innerHTML = value;
  }
}

var descriptor = Object.getOwnPropertyDescriptor(
  CustomHTMLElement.prototype, "html"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

上面代码中,存值函数和取值函数是定义在`html`属性的描述对象上面,这与 ES5 完全一致.

- ***Object.getOwnPropertyDescriptor(obj, prop)***
  
  ​    返回指定对象的上一个自有属性对应的属性描述符.(自有属性指的是直接赋予该对象的属性,不需要从原型链上进行查找的属性)
  
  ​    **obj**:需要查找的目标对象 ; **prop**: 目标对象内需要查找的属性名称
  
  ​    返回值:如果指定的属性存在于对象上,则返回其属性描述符对象（property descriptor）,否则返回 [`undefined`](db35d98c3293670a2e3d56d18027152b.html).

#### class种使用表达式作为方法名

类的属性名,可以采用表达式.

```javascript
    let methodName = 'get';
    class Yomua {
        constructor(length) {
            // ...
        }
        [methodName]() {
            console.log('I am a expression name')
        }
    }
    let y = new Yomua();
    y.get();
```

上面的示例中,[methodName]的Yomua的方法就是从变量methodName上得到的. 我们可以通过该变量的值就可以直接调用该Yomua类的方法.

这样其实也就相当于:我们能将类的方法名字变成变量.

如果你仔细想想的话,你会发现[methodName]这种写法似乎在哪里看见过,即:***<对象的扩展.md - 属性名和方法名使用表达式>***

你会发现这种写法和对象的属性方法使用表达式是一样的,没有任何区别.

#### class表达式

##### 普通的class表达式

与ES中的函数表达式一样,类也能使用表达式来定义.

```js
const MyClass = class Me {
  getClassName() {
    console.log(Me);
    return Me.name;
  }
};
let inst = new MyClass();
inst.getClassName() // Me
Me.name // ReferenceError: Me is not defined

/**
console.log(Me)

class Me {
        getClassName() {
            console.log(Me)
            return Me.name;
        }
    }
*/
```

上面代码使用表达式定义了一个类.需要注意的是,这个类的名字是Me,但是Me只在 Class 的内部可用,指代当前类.

在 Class 外部,这个类只能用MyClass引用,否则就会报错.

如果在class的内部,并不需要使用到Me,则可以省略Me,变成以下形式:

```javascript
const MyClass = class { /* ... */ };
```

##### 立即被执行的class表达式

由于class表达式实际上相当于定义一个变量/常量,所以我们可以直接new class{}后,用左边的变量作为class的实例,这样在new class时,class中的内容则会被立即执行.

```js
    let person = new class {
        constructor(name) {
            console.log('我立即被执行')
            this.name = name;
        }
        sayName() {
            console.log(`我名字:${this.name}`);
        }
    }('张三');

    person.sayName(); // "张三"
```

- ***let person = new class {}('张三')***
  
  ​    实例化class,使用person作为该实例的名字,并向class的constructor方法中传入 "张三"作为参数.

#### 实例(单独)属性的新写法

##### 描述

 在这小节之前,你们应该发现了,如果我们想要为每个类的实例添加单独的属性,则要在constructor()方法中使用this.xxx的形式为之添加独立的属性.

这样写虽说是很不错的选择,but,却没有那么优雅和直观,于是,新的写法出现了(一个语法糖),即:将你需要的定义的每个类的实例的属性写在类的最顶层,不用加任何的关键字,只需要-> 属性 = 值; 即可.

并且在new时,写在class最顶层的实例属性,也会被执行,就如同存于constructor()中的this.xxx一样.

且这种写法存在"提升"效果,即:实例属性会自动的被提升到当前class的最前面去执行,多个实例属性则按照当前的顺序被提升.***详见:当前层级=>用法 - 实例属性的新写法详解***

##### 语法

`属性 = value;` 

- PS:加不加分号都可以,因为class只规定在方法之间不允许使用分号,逗号什么的,没规定其他(如属性)之间不能使用分号.
  
  一切如常就可以.

##### 用法

###### 不使用实例属性的新写法

```js
class Yomua {
    constructor() {
        this.x = '1';
        this.y = '2';
    }
}
```

###### 使用实例属性的新写法

```js
class Yomua {
    //为当前实例定义 x,y,并赋值.
    x = '1';
    y = '2';
    constructor() {
        // somecode
    }
}
```

这种新写法的好处是,所有实例对象自身的属性都定义在类的头部,看上去比较整齐,一眼就能看出这个类有哪些实例属性.

###### 实例属性的新写法详解(提升和被覆盖)

```js
    class Add {
        static myStaticProp = 42; 
        constructor() {
            this._count = 2
        }
        _count = 0;
        get value() {
            return this._count;// 返回实例的_count值
        }
        increment() {
            this._count++;;// 将实例的_count值 累加
        }
    }
    let d = new Add();
    console.log(Add.prototype._count); // undefined
    console.log(Add._count);// undefined
    d.increment(); // 2++ 即：3
    console.log(d.value); // 3
    console.log(`静态属性:${Add.myStaticProp}`);
```

实例属性.即,如同定义在constructor()中的:this._count=0; *这是另一种写法,不是prototype指向的属性.*

- ***static myStaticProp = 42;***
  
  ​    静态属性,即Add本身的属性,如Add.mymyStaticProp = 42
  
  ​    ***详见: 用法和详解 - 静态属性***

- ***_count = 0;***
  
  ​    实例属性:即class的每个实例都会存在这个独立的属性.

- ***console.log(Add.prototype._count);和console.log(Add. _count);***
  
  ​    这两个得到的结果都是:undefined. 所以我们再一次清楚的了解到:
  
  ​    这种直接在class顶层:属性=value;的写法就是实例属性,而不是prototype执行的Prototype原型对象或者class本身的属性.

- ***_count = 0; 和  constructor() {this. _count = 2}***
  
  ​    由于在class顶层的属性将会被先执行(即这种写法存在"提升"效果,它会自动的被提升到当前class的最前面去执行,多个实例属性则按照当前的顺序被提升)
  
  ​    所以constructor()方法中的同样的实例属性将会覆盖class中的实例属性.
  
  ​    这就会导致,此时的每个实例的属性的值为:2,而不是0. 如以下得出的值:
  
  - ***d.increment();*** ***和 console.log(d.value);***
    
    ​    2++ 和 3

### 注意点

#### class的严格模式

类和模块的内部,默认就是严格模式,所以不需要使用use strict指定运行模式.

只要你的代码写在类或模块之中,就只有严格模式可用.考虑到未来所有的代码,其实都是运行在模块之中,所以 ES6 实际上把整个语言升级到了严格模式.

#### class不存在提升

类不存在变量提升（hoist）,这一点与 ES5 的构造函数(普通函数)完全不同.

```javascript
new Foo(); // ReferenceError
class Foo {}
```

上面代码中,`Foo`类使用在前,定义在后,这样会报错,因为 ES6 不会把类的声明提升到代码头部.

这种规定的原因与下文要提到的继承有关,必须保证子类在父类之后定义.

​    *这里我先提一下,方便你们理解,为什么类不会变量提升.*

```javascript
{
  let Foo = class {};
  class Bar extends Foo {}
}
/** 若存在提升相当于：*/
{
  // Foo 还未定义就已经使用，报错
  class Bar extends Foo {}
  let Foo = class {};
}
```

上面的代码不会报错,因为Bar继承Foo的时候,Foo已经有定义了.

但是,如果存在class的提升,上面代码就会报错,因为class Bar...会被提升到代码头部,而let命令是不提升的,所以导致Bar继承Foo的时候,Foo还没有定义.

因为,ES6规范规定:类不存在变量提升(但是class中的实例属性存在提升***,详见:实例属性的新写法 - 用法 - 实例属性的新写法详解)***

#### class存在name属性

由于本质上,ES6 的类只是 ES5 的构造函数的一层包装,所以函数的许多特性都被Class继承,包括name属性.

```javascript
class Point {}
Point.name // "Point"
```

name属性总是返回紧跟在class关键字后面的类名.

#### class中的Generator函数方法(唯一)

如果在class中的某个方法之前加上星号（`*`）,就表示该方法是一个 Generator 函数.

```javascript
    class Foo {
        constructor(...args) {
            console.log(args)
            this.args = args;
        }

        // 为当前类自定义了一个迭代器
        *[Symbol.iterator]() {
            for (let arg of this.args) {
                yield arg;
            }
        }
    }

    let f = new Foo('hello', 'world')
    // 相当于调用 *[Symbol.iterator]() 中我们自定义的迭代器
    for (let x of f) {
        console.log(x);
    }

// hello
// world
```

上面代码中,Foo类的Symbol.iterator方法前有一个星号,表示该方法是一个 Generator 函数.

Symbol.iterator方法返回一个Foo类的默认遍历器,for...of循环会自动调用这个遍历器. ***参见:<迭代器和生成器以及协议.md>以及<for...of.md>***

也就是说,一个类只有一个@@iterator方法.

#### this的指向

##### 使用单个方法,this指向全局(undefined)的问题

类的方法内部如果含有this,它默认指向类的实例.但是,必须非常小心,一旦单独使用某个class的方法,很可能报错.

```js
    class Logger {
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }

        print(text) {
            console.log(text);
        }
    }

    const logger = new Logger();

    const { printName } = logger;
    printName(); // TypeError: Cannot read property 'print' of undefined
```

- ***const { printName } = logger;***
  
  ​    将 printName 单独提出来使用,则调用printName()时,Logger类内部的this就不是指向logger对象,而是指向printName()运行时的环境

想要解决这种问题也很简单,有多个解决办法,解决方法如下

##### 解决方案:使用bind()绑定this

我们只需要使用Function.prototype.bind()就能轻松的解决因为单独使用class中的方法而导致this指向全局(undefined)的问题.

因为bind(this,arg1,arg2..)方法一旦被使用,则会克隆调用它的那个函数,并传入执定的this作为其克隆函数的this,**[注意:](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)this将永久地被绑定到了bind的第一个参数,无论这个函数是如何被调用的.**

​    ***参见:<apply和call和bind.md>***

```js
    class Logger {
        constructor() {
            this.printName = this.printName.bind(this);
            console.log(this)
        }
        printName(name = 'there') {
            this.print(`Hello ${name}`)
        }

        print(text) {
            console.log(text);
        }
    }

    const logger = new Logger();
    const { printName } = logger;
    printName(); 
```

- ***constructor() {this.printName = this.printName.bind(this);}***
  
  ​    使用constructor方法,让该class被实例时就执行的函数(方法)
  
  **this.printName = this.printName.bind(this);** 
  
  ​    指的就是:克隆一个当前对象(实例)的printName方法,然后让该克隆的函数中的this永远指向(this)当前对象(这里是logger),最后将得到的克隆的函数替换(赋值)原来的printName方法.
  
  ​    这样就相当于:将当前实例的printName()方法中的this指向,永远让它指向当前实例,不允许指向其他实例.
  
  ​    这样就解决了使用单个方法,this指向全局(undefined)的问题.

- ***const { printName } = logger;***
  
  ​    使用对象的解构赋值: 使用printName属性去匹配右边的logger对象中的对应的属性(包括存于prototype上的),若logger中存在对应的属性,则将之赋值给printName值.
  
  ​    其完整写法应该为:
  
  ​    const {printName:printName} = logger;
  
  ​    ***参见:<变量的解构赋值.md>以及<对象的扩展.md>***

- ***printName();***
  
  ​    若在constructor()方法中,没有使用bind(),则运行此方法则会报错,因为printName()中的this将指向的是全局,
  
  ​    由于class自带严格模式,所以指向undefined,而undefined哪来的print()方法?

- ***printName(name = 'there') {this.print(Hello ${name})}***
  
  ​    name='there',即为name形参设定默认值***(参见:<函数的扩展.md>)***
  
  this.print(...)
  
  ​    很明显的,经过上一个代码解析的解释,我们知道,这个printName()方法中的this将永远指向当前实例,所以this.print() === logger.print();

##### 解决方案:Proxy

获取方法的时候,自动绑定this.***参见:<Proxy .md>***

```javascript
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const logger = selfish(new Logger());
```

### 静态方法

#### 描述

class相当于实例(对象)的prototype,即:所有定义在class中的方法,都等同于定义在prototype属性指向的Prototype原型对象上.

但是,如果在一个方法前,加上static关键字,就表示该方法不会被实例继承,而是直接通过类来调用,这就称为“静态方法”.

​    是不是越来越觉得有意思了,越来越像Java/C语言这种了..好吧,只是像而已,大家本质还不都是函数!

**注意:JS 的静态方法不会像Java那样,在类被实例化时就执行,只有constructor()在实例化时会被执行.**

PS:除非,该静态方法很特殊,例如: 它是一个生命周期钩子函数,如:
`static get observedAttributes(){return [...]}`

- 该静态get伪属性是会在当前它所属的类被执行(实例化)后,就会被调用.参见:
  
  ***<UseCustomElements.md ->*** 
  
  ***使用自定义函数中生命周期钩子(回调函数) ->***
  
  ***如何使用自定义函数中生命周期钩子 ->*** 
  
  ***attributeChangedCallback(){}>***

#### 示例

##### 创建一个静态方法

```js
    class Yomua {
        constructor() { }
        static sayHello(v) { console.log(v) }
    }
    let y = new Yomua();
    Yomua.sayHello('hello')
    y.sayHello(); // Uncaught TypeError: y.sayHello is not a function
```

在上面代码中class中的sayHello前面有static关键字,则代表该方法是一个静态方法,只能直接使用类名(函数名)调用:Yomua.sayHello(); 而不能使用其类的实例名调用,否则会报错.

因为被static关键字所指定的方法,不会存于prototype属性指向的Prototype原型对象上,而是直接被当前类所拥有.

##### 静态方法中若存在this关键字

如果静态方法包含this关键字,这个this指的是整个类,而不是实例.

```js
class Yomua {
    constructor() { }
    static thisMe() { console.log(this) }
    mua() { }
}
    Yomua.thisMe();
/**
    class Yomua {
        constructor() { }
        static thisMe() { console.log(this) }
        mua() { }
    }
*/
```

从得到的结果,我们可以很容易发现:里的this指的是Yomua类,

##### 静态方法能与非静态方法重名且不会相互覆盖

根据 ***静态方法中若存在this关键字*** 一同级小节中,我们知道静态方法中的this就是指的整个class Yomua,

但是我们只能在静态方法中使用this调用类中的静态方法/静态属性,不能调用非静态属性/静态方法.这是因为this是代表整个class,

而不是代表class的实例的prototype属性,所以自然只能调用class本身有的属性/方法了:即静态属性和静态方法.

且因为以上的关系,即:静态方法和非静态方法它们并不是同一个调用者:一个为实例,一个为class本身,所以静态方法和非静态方法重名并不冲突.

请看以下示例:

```js
    class Yomua {
        constructor() { }
        static show() { this.foo() }
        static foo() { console.log('我是静态方法') }
        show() { console.log('我和静态方法show重名,我是非静态方法,存于prototype属性上.') }
    }
    let y = new Yomua();
    y.show();
    Yomua.show()
```

- ***static show() { this.foo() }*** 和 ***show(){...}***
  
  ​    静态方法和非静态方法重名了,但是它们并不冲突.因为一个使用的是new Yomua()的实例调用show(),一个使用的是class Yomua本身直接调用show.

- ***this.foo()***
  
  ​    这里的this:指的是整个class,而foo则指的是静态方法:foo.

##### 静态方法能被继承

父类的静态方法,可以被子类继承.***参见:<class的继承>***

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
}

Bar.classMethod() // 'hello'
```

上面代码中,父类Foo有一个静态方法,子类Bar可以调用这个方法.

静态方法也是可以从super对象上调用的.

```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ', too';
  }
}

Bar.classMethod() // "hello, too"
```

### 静态属性(提案,已通过)

#### 描述

所谓的静态属性:指的是 class 本身的属性,即Class.propName,而不是定义在实例对象（this）上或prototype属性指向的原型对象上的属性.

#### 用法

##### 提案未通过前的写法

```js
class Foo{}
Foo.prop = 1;
console.log(Foo.prop); // 1
```

上面的写法为Foo类定义了一个静态属性prop.

##### 提案通过后的写法

```js
class Foo {
    static prop = 1;
    constructor() {}
}
console.log(Foo.prop); // 1
```

这种新写法大大方便了静态属性的表达.

- PS:需要注意的是,静态属性和实例属性不同,它是class自身的方法,它并不会在实例化类时被调用,如: new Foo();
  - 此时只会执行constructor()方法,而会执行static prop这个代码行.

#### 未通过和通过之后的对比

上面代码中,老写法的静态属性定义在类的外部.整个类生成以后,再生成静态属性.这样让人很容易忽略这个静态属性,也不符合相关代码应该放在一起的代码组织原则.

另外,新写法是显式声明（declarative）,而不是赋值处理,语义更好,且能让人一目了然.

### 私有方法和私有属性(提案,未通过2020/4/17)

#### 现有的解决方案

私有方法和私有属性,是只能在类的内部访问的方法和属性,外部不能访问.这是常见需求,有利于代码的封装,但 ES6 不提供,只能通过变通方法模拟实现.

一种做法是在命名上加以区别.

```javascript
class Widget {

  // 公有方法
  foo (baz) {
    this._bar(baz);
  }

  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }

  // ...
}
```

上面代码中,`_bar`方法前面的下划线,表示这是一个只限于内部使用的私有方法.但是,这种命名是不保险的,在类的外部,还是可以调用到这个方法.

另一种方法就是索性将私有方法移出模块,因为模块内部的所有方法都是对外可见的.

```javascript
class Widget {
  foo (baz) {
    bar.call(this, baz);
  }

  // ...
}

function bar(baz) {
  return this.snaf = baz;
}
```

上面代码中,`foo`是公开方法,内部调用了`bar.call(this, baz)`.这使得`bar`实际上成为了当前模块的私有方法.

还有一种方法是利用`Symbol`值的唯一性,将私有方法的名字命名为一个`Symbol`值.

```javascript
const bar = Symbol('bar');
const snaf = Symbol('snaf');

export default class myClass{

  // 公有方法
  foo(baz) {
    this[bar](baz);
  }

  // 私有方法
  [bar](baz) {
    return this[snaf] = baz;
  }

  // ...
};
```

上面代码中,`bar`和`snaf`都是`Symbol`值,一般情况下无法获取到它们,因此达到了私有方法和私有属性的效果.但是也不是绝对不行,`Reflect.ownKeys()`依然可以拿到它们.

```javascript
const inst = new myClass();

Reflect.ownKeys(myClass.prototype)
// [ 'constructor', 'foo', Symbol(bar) ]
```

上面代码中,Symbol 值的属性名依然可以从类的外部拿到.

#### 私有属性的提案

目前,有一个[提案](https://github.com/tc39/proposal-private-methods),为`class`加了私有属性.方法是在属性名之前,使用`#`表示.

```javascript
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
```

上面代码中,`#count`就是私有属性,只能在类的内部使用（`this.#count`）.如果在类的外部使用,就会报错.

```javascript
const counter = new IncreasingCounter();
counter.#count // 报错
counter.#count = 42 // 报错
```

上面代码在类的外部,读取私有属性,就会报错.

下面是另一个例子.

```javascript
class Point {
  #x;

  constructor(x = 0) {
    this.#x = +x;
  }

  get x() {
    return this.#x;
  }

  set x(value) {
    this.#x = +value;
  }
}
```

上面代码中,`#x`就是私有属性,在`Point`类之外是读取不到这个属性的.由于井号`#`是属性名的一部分,使用时必须带有`#`一起使用,所以`#x`和`x`是两个不同的属性.

之所以要引入一个新的前缀`#`表示私有属性,而没有采用`private`关键字,是因为 JavaScript 是一门动态语言,没有类型声明,使用独立的符号似乎是唯一的比较方便可靠的方法,能够准确地区分一种属性是否为私有属性.另外,Ruby 语言使用`@`表示私有属性,ES6 没有用这个符号而使用`#`,是因为`@`已经被留给了 Decorator.

这种写法不仅可以写私有属性,还可以用来写私有方法.

```javascript
class Foo {
  #a;
  #b;
  constructor(a, b) {
    this.#a = a;
    this.#b = b;
  }
  #sum() {
    return #a + #b;
  }
  printSum() {
    console.log(this.#sum());
  }
}
```

上面代码中,`#sum()`就是一个私有方法.

另外,私有属性也可以设置 getter 和 setter 方法.

```javascript
class Counter {
  #xValue = 0;

  constructor() {
    super();
    // ...
  }

  get #x() { return #xValue; }
  set #x(value) {
    this.#xValue = value;
  }
}
```

上面代码中,`#x`是一个私有属性,它的读写都通过`get #x()`和`set #x()`来完成.

私有属性不限于从`this`引用,只要是在类的内部,实例也可以引用私有属性.

```javascript
class Foo {
  #privateValue = 42;
  static getPrivateValue(foo) {
    return foo.#privateValue;
  }
}

Foo.getPrivateValue(new Foo()); // 42
```

上面代码允许从实例`foo`上面引用私有属性.

私有属性和私有方法前面,也可以加上`static`关键字,表示这是一个静态的私有属性或私有方法.

```javascript
class FakeMath {
  static PI = 22 / 7;
  static #totallyRandomNumber = 4;

  static #computeRandomNumber() {
    return FakeMath.#totallyRandomNumber;
  }

  static random() {
    console.log('I heard you like random numbers…')
    return FakeMath.#computeRandomNumber();
  }
}

FakeMath.PI // 3.142857142857143
FakeMath.random()
// I heard you like random numbers…
// 4
FakeMath.#totallyRandomNumber // 报错
FakeMath.#computeRandomNumber() // 报错
```

上面代码中,`#totallyRandomNumber`是私有属性,`#computeRandomNumber()`是私有方法,只能在`FakeMath`这个类的内部调用,外部调用就会报错.

### [new.targer属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target)

#### 描述

new是从构造函数生成实例对象的命令.它允许你检测函数或构造方法是否是通过[new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)运算符被调用的

ES6 为new命令引入了一个new.target属性,该属性一般用在构造函数之中,返回new命令作用于的那个构造函数,即:

​    如果构造函数不是通过new命令或Reflect.construct()调用的,new.target会返回undefined,因此这个属性可以用来确定构造函数是怎么调用的.

- PS:Reflect.construct()我不知道如何使用(按照文档使用,我这里报错)

注意:在函数外部,使用new.target会报错. 也就是说,我们无法在类中直接时候用new.targer,必须要处于一个函数内部:如constructor(),或任意的函数

#### 用法

##### 用在普通的(构造)函数中

```js
    function Foo() {
        if (new.target === undefined) {
            console.log('Sorry,"Foo" must use new!');
            return;
        }
        console.log('1'); 
    }
    Foo()
```

- ***if (new.target === undefined) {}***
  
  ​    非new/Reflect.construct()调用此构造函数,则不允许执行该函数.
  
  - ***console.log('1');*** 
    
    ​    如果不是通过new/Reflect.construct()调用此函数,则该语句并不会被执行

上面的示例确保构造函数只能通过new命令调用.

##### 用在class中

class 内部调用new.target,返回当前 class.

```js
    class Rectangle {
        constructor() {
            console.log(new.target === Rectangle);
            console.log(new.target)
        }
    }
    var obj = new Rectangle(); // 输出 true
/**
console.log(new.target)结果为:

    class Rectangle {
        constructor() {
            console.log(new.target === Rectangle);
            console.log(new.target)
        }
    }
/*    
```

##### 父类的new.targer在某种情况下返回子类本身

需要注意的是,子类继承父类时,new.target会返回子类.

即:new.target写在父类的构造方法时,我们再new 子类,则写在父类的new.target会返回子类.

官方说法: 在类的构造方法中，new.target指向直接被new执行的构造函数。并且当一个父类构造方法在子类构造方法中被调用时，情况与之相同。

- 意思为: **谁*(哪个类)*因为new*(它)*让某个new.target语句执行了,则new.target的返回值就为那个类(整体返回).** 
  
  即使是通过super()调用父类的构造方法从而导致new.targer语句被执行也依然是一样的.

```javascript
    class Rectangle {
        constructor(length, width) {
            console.log(new.target===Rectangle);// false
            console.log(new.target===Square); // true
            // ...
        }
    }

    class Square extends Rectangle {
        constructor(length,width) {
            super(length, width);
        }
    }

    var obj = new Square(3, 4); 
/**
    false
    true
*/    
```

##### 创建接口?

由于new.target在一个类中时,会返回当前类本身.

且又由于如果一个类b继承一个类a,类a中存在new.targer,然后我们实例化b,在b的constructor()中使用super调用类a,则此时的类a的new.target将会指向子类b.

所以利用这两个特性,我们能写出一个类只能被某个类继承,而不能被单独使用.

- 即:new.targer === 当前类名,就报错.
- 而被继承时,在继承中调用父类,new.targer !== 当前类名,而是 ===子类名.

```js
    class Interface {
        constructor() {
            if (new.target === Interface) {
                throw new Error('Interface cannot be new')
            }
            console.log('正常执行')
        }
    }
    class SonClass extends Interface {
        constructor() {
            super();
        }
    }
    let inte = new Interface(); // 报错Uncaught Error: Interface cannot be new
    let son = new SonClass(); // 正常执行
```

上面代码中,`Interface`类('接口')不能被实例化,只能用于继承.

注意:在函数外部,使用new.target会报错. 也就是说,我们无法在类中直接时候用new.targer,必须要处于一个函数内部:如constructor(),或任意的函数
