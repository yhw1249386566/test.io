[TOC]



# class的继承

## 描述

在普通的构造函数之间,我们一般都通过原型链的方式实现继承.而class之间,可以通过extends关键字实现class和class之间的继承,这比通过原型链实现继承清晰的多.***参见:<h5_css_js.doc>***

## 语法 

`class B extends A {// do something}`

### 注意点

请注意**extends是复数形式,**其中文翻译为:延伸. 通过这中文翻译我们可以很轻松的得出: B 延伸于 A, 不过这似乎优点不通顺,可以有更好的翻译,如: B 派生于 A、B继承于A.

派生和继承这两个翻译都很不错,但是本章中使用继承一词来作为标准.

还有一点需要注意的则是:**被继承的父类,是不需要使用class来修饰的**,直接类名紧跟于extends. 如: extends A,若写成:extends class Point,这样会在编译时就报错.

## 继承用法

### 普通构造函数之间的继承

#### 描述

普通构造函数之间的继承除了通过原型链我们也可以通过对象冒充的方式实现继承,或者其语法糖:call和apply. ***参见:<h5_css_js.doc>***

这里是一个通过原型链实现继承的方式.

#### 示例

```js
    // 父类
    function ClassA() {...}
    ClassA.prototype.say = function () {
        console.log('hello')
    }


    // 子类
    function ClassB() {...}
    ClassB.prototype = new ClassA()
    let b = new ClassB();
    b.say(); // hello
```

- ***ClassA.prototype.say = function () {console.log('hello')}***

  ​	将首先被执行.

  ​	即:向Class的prototype属性指向的Prototype原型对象的内存地址空间中添加一个say方法.让其所有实例都能访问.

- ***ClassB.prototype = new ClassA()***

  ​	接着会执行这个.

  ​	即:将ClassA的实例作为ClassB的prototype. 也就是说作为ClassB的原型.

  ​	即:ClassA的实例能使用的prototype属性指向的方法/属性,ClassB的实例也能使用.

- ***b.say()***

  ​	由于ClassB本身不存在say(),所以将会去原型对象上找,即:ClassA找,若找到了则调用ClassA中的say.(*这里找不到,因为在ClassA.prototype上),*

  ​	找不到,就往ClassA的原型链上找,找到了则调用.找不到则报错*(因为ClassA的原型对象并不是另一个对象,它是默认的Prototype)*

  ​	所以会调用ClassA.prototype.say = function () {}该方法,输出:hello

### class之间的继承

#### 描述

在***语法***中我想你们也应该了解过了,class之间的继承全靠extends关键字.

下面我们就能详细看一吧.

#### 用法

```js
class A {}
class B extends A{}
```

上面代码定义了一个B类,该类通过extends关键字,继承了A类的所有属性和方法。

但是由于没有部署任何代码,所以这两个类完全一样,等于复制了一个A类，注意：**子类若不显式声明 constructor()，则 JS 编译器自动帮你隐式声明且隐式调用 super()。**

下面,我们在B内部加上代码。

```js
class B extends A {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString();//调用父类的toString()
  }
}

```

上面代码中,constructor方法和toString方法之中,都出现了super关键字,它在这里表示父类的构造函数,用来新建父类的this对象。***详见:super关键字***

### 继承原理

class之间的继承和普通的构造函数之间的通过原型继承是不一样的.

#### ES5的继承(普通的构造函数的继承)

普通的构造函数继承:是先创建子类的实例对象,然后再将父类的方法/属性添加到this（子类的对象）上面，（this.xxx=(){}，或 this.xxx=value），

再使用: Parent.apply(this)，使得父类被执行，这样我们调用Function.prototype.apply()方法,

将Parent函数中的this对象改为我们指定的(子类前)this对象，这样在 Parent() 中写的 this.xxx=(){} 或 this.xxx=value，就会添加到我们指定的 this 上，

如下所示：

```js
function Son(){}
function Parent(){
    // 这里的 this 指向 new Son()，即： son 对象
    this.showName = ()=>{console.log('yomua')}
}
Parent.prototype.showColor=()=>{console.log('red')}
// 创建子类的实例
let son = new Son();
/** 
 *	使得 Parent 中的 this 指向 son 对象，	
 * 	返回值：调用由指定this值和参数的函数的结果。
 */
Parent.apply(son);
son.showName(); // yomua
son.showColor(); // 报错,son 不存在 showColor()
```

1. 创建子类（function Son(){}）和父类（function Parent(){}）

2. 在父类中，使用 this 为父类添加方法或属性。

   这样可以使得父类被执行时，将我们所使用的 this 添加的方法或属性绑定当前运行环境中的 this

3. 实例化子类：son

4. 使用 Function.prototype.apply(this) ，将 this 设置为指定的子类对象：son

   Parent.apply(son)

当完成以上步骤后，我们就可以使用子类的实例调用我们在父类（Parent()）中使用 this 添加的方法或属性了。

这是因为当 Parent.apply(son) 被执行时，程序将会执行 Parent() 这个构造函数，由于此时我们使得该构造函数的 this 指向了 son（子类的实例），

所以去执行 this.xxx=functino(){} 或 this.xxx=value 时，就相当于为 son（子类的实例）绑定方法或属性。

#### ES6(class)的继承

class之间的继承和ES5的继承其原理大相径庭,class之间的继承实质上是:

先将父类的实例对象的属性和方法添加到this上面(所以要先调用super()),然后再用子类的构造方法修改父类中的this,将之变成子类的this.(JS内部实现机制会自动帮我们修改)，这样子类的实例就可以使用它本身和父类的方法/属性了。

且super()函数就如同new了一次父类,创建了个父类的实例对象,在这个实例对象上进行操作.

- 这里的this:指的就是实例对象.(***详见:super***)

简单解释:B继承A,则必须在B的constructor()中最先调用super(),好创建父类的实例对象,从而将其父类的实例对象的属性和方法添加到this上面,

最后再修改父类中的this,将之变成子类的this,这样父类的实例有什么属性和方法,子类的实例同样也有了;因为它们都是一个this(JS内部实现机制会自动帮我们修改)

​	而这其中的this,就是指的是:实例对象.即super(). 即super()就如同new了一次父类,创建一个父类的实例对象,获取了实例能获取的所有属性和方法之后

​	*(即:类的prototype属性上的属性/方法,以及每个实例自身的属性/方法,这些都会被子类的实例继承.)*,

再将该实例对象改成子类的实例对象,也就相当于:子类的每个实例对象都用父类的属性/方法.

**所以我们在使用 ES6 的继承时，子类的 constructor() 中，必须首先调用 super()，否则无法实现继承。**

当然了，如果是由于在子类中未写 constructor()，从而导致隐式声明和隐式调用 super()，你自然可以不主动调用 super()。

#### 对比

- ES5的继承

  - 先创建子类的实例对象,将父类的方法/属性添加到this(即子类的实例)

- class(ES6)的继承

  - 先将父类的实例对象的属性/方法添加到this,然后再用子类的构造方法修改父类中的this,将之变成子类的this

    ​	所以必须要先使用super()执行一次父类(super()就如同new了一次父类)
    
  - 不妨想想: 父类中是不是存在了父类实例的所有属性和方法(class Parent{...}), 这是不是就相当于将父类的实例对象的属性/方法添加到this.
  
    然后我们 new 子类时,让子类的实例(this)通过 constructor 函数去执行(super())一遍父类,再把父类中的this指向修改成指向子类实例,
  
    ​	这样子类中的当前实例(this)不仅有当前子类本身的属性/方法,还同时指向父类的实例的属性/方法.

### 继承会让子类的实例同时也是父类的实例

```js
    class A {}
    class B extends A {}

    let b = new B();
    console.log(b instanceof B); // true
    console.log(b instanceof A); // true
```

通过以上代码我们很显然发现,b即是B的实例也是A的实例.其中原因***详见:继承原理 - ES6(class)的继承***

​	即:因为B继承A,其实就是先实例化A得到一个对象,然后再将这个对象也作为B的实例对象,然后使用B作为这个实例对象的主类,

​	这样,这个实例对象即有父类A的方法/属性,也有B的,同时也可以在B为这个实例对象增添属性/方法.

### class 之间不存在多继承

```js
class B {
    sayHello() {
        console.log('hello')
    }
}
class C {
    sayName() {
        console.log('name')
    }
}
 // error，错误写法
class A extends B, C { // error 
    sayAll() {
        this.sayHello()
        this.sayName()
    }
}
let a = new A()
a.sayAll()
```

想实现一个 class 继承多个 class，我们可以这么写：

```js
    class C {
        sayName() {
            console.log('name')
        }
    }
    class B extends C {
        sayHello() {
            console.log('hello')
        }
    }
    class A extends B {
        sayAll() {
            this.sayHello()
            this.sayName()
        }
    }
    let a = new A()
    a.sayAll(); // hello （折行） name
```

或使用 Mixin 方式，***参见：[阮一峰- Mixin 模式的实现](https://es6.ruanyifeng.com/#docs/class-extends#Mixin-模式的实现)***

### 若不写 constructor()，则子类将自动存在 constructor() 且在其中自动调用 super()

假设我们使用一个 class A 继承 class B，在 A 中我们若不写 constructor()，则 JS 的编译器会自动的帮我们实现 constructor()，且在其中调用 super()；

但我们若在 class A （子类）中显示声明 constructor()，却不写 super()，则会报错。

```js
class B {
    sayHello() {
        console.log('hello')
    }
}
// 在子类中非显示声明 constructor，则会自动实现继承
class A extends B {}

// 在子类中显示声明 constructor，却不写 super，则无法实现继承
class A extends B {
    constructor(){}
}

let a = new A()
a.sayHello() // 可以调用，输出：hello
console.log(a instanceof B) // true
```

注：TypeScript 的 class，也遵守该规则。

## super关键字

### 描述

super这个关键字存在两个用法:被当作函数时使用和被当作对象时使用.在这两种情况下,super的用法是大相径庭的.***详见:用法***

若super使用在了其他用法上,则会报错,它只存在这两种用法.

### 用法

#### 描述

super是用来调用父类/父对象的,除此之外无其他用法.

#### 被当作函数时使用

##### 描述

若super关键字用来作为函数时:super(),代表着父类的构造函数.

##### 用法

```js
class A {
    constructor() {
        console.log(new.target.name)
    }
    
}
class B extends A {
	constructor() {
		super();
    }
}
```

上面代码中,子类B的构造函数之中的super(),代表调用父类的构造函数。

注意:这是必须的,否则 JavaScript 引擎会报错。其原因请***详见:继承用法 - 继承原理*** . 

有意思的是:super虽然代表的是父类A的constructor(),但是其super内部的this指的是子类(B)的实例. 也就是说,super()相当于: A.prototype.constructor.call(this)

=> 即将类A的原型对象内存地址空间中的constructor方法的this改成我们指定的this.

​		由于A.prototype.constructor === A,所以这里的call(this)将会把类A的内部的this,全部变成指向我们指定的对象this,

​		即:子类的实例,因为new B()时才会执行B中的constructor的super(),不是吗

- 这里的this:指的都是类的实例对象.

- ***console.log(new.target.name)***

  ​	 在类的构造方法中,new.target指向直接被new执行的构造函数.并且当一个父类构造方法在子类构造方法中被调用时,情况与之相同。

  - 意思为: 谁因为new执行了new.target语句,则该语句返回值就为那个类(整体返回). 

    即使是通过super()调用父类的构造方法从而导致new.targer语句被执行也依然是一样的.
  
  ​    所以这里的new.targer是因为class B被new,从而导致super()函数被执行,最后又导致new.target被执行,所以new.target返回值为:class B{}
  
  ​	那么class B.name当然等于B了. ***name属性,参见:<class的基本用法.md>***

##### 注意

需要注意的是,如果将super关键字用作函数时,则只能使用在类的constructor()函数中,用在其他例放则报错,因为其他地方指的就是:prototype上或类的属性上,这是不行的.

```javascript
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

#### 被当作对象时使用

当super关键字被当作对象来使用时:

- 在类的普通的方法或者constructor()方法（存于原型对象空间中的方法）中,super指向父类的原型对象Prototype,并且将父类中的this都改为指向子类的实例.
- 在静态方法中,super指向父类本身,并将父类中的this改为指向子类本身.

也就是说,打破了super当作函数的限制,即:无法在constructor()函数之外使用.即将**super关键字当对象使用,则可以在constructor()函数之外使用.**

##### 在子类的普通的方法/constructor()中使用

###### 描述

即super对象用在子类的普通方法或者constructor()方法时,其调用的是父类的Prototype原型对象上中的属性/方法.

并将其调用的父类(Prototype中)的方法中的this,改成指向当前子类的实例.

###### super指向父类的原型对象Prototype.

```js
class A {
    constructor() {}
    p(){return 2}
}

class B extends A {
    constructor() {
        super();
        console.log(super.p()); // 得到的值为2
    }
}
new B(); 
```

在类的普通的方法/constructor方法中,super指向父类的原型对象Prototype.

- ***super.p()***

  ​	所以super.p()就指的是:A.prototype.p(); 

  ​	所以最后的输出结果为: 2

###### 无法使用super调用定义在父类的实例的属性/方法

- 注:不是无法使用 super.xx 调用父类的静态属性/方法.

也正由于super指向的是父类的prototype属性,所以**无法使用super调用定义在父类的实例属性/方法**,否则报错:

```js
class A {
    constructor() {
        this.p = function() {
            return 2;
        }
    }
    
}
class B extends A {
    constructor() {
        super();
        console.log(super.p()); // Error
    }
}
new B(); 
```

- ***console.log(super.p());***

  ​    Uncaught TypeError: (intermediate value).p is not a function

  ​	这里的intermediate value,其实就是:A.prototype.p(),但是由于父类中只有一个定义在实例上的p(),所以这里报错:not a function.

###### 定义在父类的原型对象上的属性/方法,super可取到

如果属性定义在父类的原型对象上,super就可以取到。

```js
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}
let b = new B();
```

###### 方法内部的this指向当前的子类实例

ES6 规定,在子类普通方法中通过super对象调用父类的方法时,该(父类的)方法内部的this指向当前的子类实例。

也就是说实际上相当于执行的是:super.xxx.call(this); 

- xxx:父类的普通方法(prototype属性定义的)

  即: 将父类的prototype.print方法中的this指向改成我们指定的this

  (**当前调用**super所处的子类的**普通方法的实例对象**,通常是子类的实例对象)

```js
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x); // 此时这里的this指向b
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

**执行顺序为:**

- ***let b = new B();***

- ***b.m()***

  ​	此时这里的b.m()会首先去寻找b实例对象是否本身存在m()方法,若没有就去prototype指向的Prototype原型对象上去找(这里会去这找)

  ​	因为B中的m()方法为B.prototype.m

  ​	找到了m()方法之后则执行:

  - ***super.print();***

    ​	这里的super,指的是:父类的prototype属性指向的Prototype原型对象.

    ​	即调用,父类.prototype.print()

- ***print() {console.log(this.x);*** 

  ​	此时这里的this指向b, 因为它是由子类的普通方法中的super对象调用的.也就是说实际上相当于执行的是:super.print.call(this).

  ​	即:将父类的prototype.print方法中的this指向改成我们指定的this(**当前调用s**uper所处的子类的普通方法的**实例对象**,通常是子类的实例对象)

###### super用在constructor()中创建实例属性

在子类的constructor方法中,如果**通过super对某个属性赋值,这时super就是this,赋值的属性会变成子类实例的属性**

```js
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3; // 此时 super 指的是 this
    super.get = function(){console.log('method')}
    console.log(super.x); // undefined
    console.log(this.x); // 3
    this.get(); // method
  }
}

let b = new B();
```

其实这没多大意义,就是让你们知道,super能作为子类的实例对象创建其属性和方法而已.

注意:我们却不能直接使用super.xxx的形式调用子类的实例属性,因为super是调用父类的方法/属性用的.

​	即:读取super.x的时候:读的是A.prototype.x，而 Class A 中的 constructor 中的 this.x = 1 其中的 this 指的是 Class B 的实例，所以返回 A.prototype.x 返回 的是 undefined。

##### 在类的静态方法中使用

###### 描述

super被当作对象,在class中的静态方法使用时,其子类使用super对象调用父类的方法时,父类方法的内部的this将指向子类本身,而不是子类的实例.

###### super将指向父类静态方法且当前父类静态方法内部this指向子类

```js
    // 在静态方法中使用super对象
    class A {
        constructor() { }
        parentProtoype() { console.log('原型链上的方法') }
        static parentStatic() {
            console.log('父类本身的方法')
            console.log(this);// 将指向当前的子类,即类B本身

        }
    }
    class B extends A {
        constructor() { super() }
        static get() {
            super.parentStatic();
            super.parentProtoype(); // 报错
        }
    }
    B.get();
```

- ***static get() {}***

  ​	该方法为子类的静态方法,其中使用了两个super对象分别调用了父类的方法/属性.注意:是属于父类本身的方法/属性,而不是原型链上的.

  - **super.parentStatic();**和**super.parentProtoype();**

    ​	两个super对象都调用的是父类本身的方法.

    ​	前者成功调用,后则则会报错,因为它是父类原型链上的方法,Error person:

    ​		*parentProtoype is not a function.* 

    ​		*也就是说:父类不存在该方法.super对象用在子类静态方法调用的是父类本身的属性/方法.*

- ***parentProtoype(){}***

  ​	这是父类的原型对象上的方法,即如同:

  ​	A.prototype.parentProtoype = function(){}. 所以它无法在子类的静态方法中使用super对象调用(可以在普通方法中调用)

- ***static parentStatic() {}***

  ​	父类本身的方法,即: A.parentStatic = functino(){}

  ​	可以在子类的静态方法中使用

- ***console.log(this);***

  输出结果为:

  ```js
class B extends A {
      constructor() { super() }
    static get() {
        super.parentStatic();
      super.parentProtoype(); // 报错
      }
    }
  ```
  
  ​	这里的this将指向子类本身,而不是子类实例*(详见:在子类的普通的方法/constructor()中使用)*
  
  - ***console.log(this.get());***
  
    ​	千万不要在这里面使用this.get();为什么呢?
  
    ​	你不妨仔细想想:this指的是子类,这里调用的是子类的static get(),而这get()中又调用的是什么呢?
  
    ​	~~~(会形成无限调用,即死循环)

##### 几乎可以在任意对象中使用super关键字

由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

```js
    let obj = {
        toString() {
            return `myObject: ${super.toString()}`
        }
    }
    console.log(obj.toString());//myObject:[object Object]
```



#### 注意点

需要注意的是:使用super时,必须显示的声明super是用作函数(只能用于子类的constructor()中)还是对象,否则就会报错.

```javascript
class A {}

class B extends A {
  constructor() {
    super();
    console.log(super); // 报错
  }
}
```

上面代码中，console.log(super)当中的super，无法看出是作为函数使用，还是作为对象使用，所以 JavaScript 引擎解析代码的时候就会报错。

#### 总结

使用super作为对象时

- 在子类的普通方法/constructor()方法中,super只能调用父类的普通方法,且父类被调用的该普通方法中的内部的this将会指向子类的实例.

  - reason: 此时的super相当于指向: **父类名.prototype**

    那么当然的,父类对应的普通方法中的内部的this也对应的是"prototype"了,即:实例(子类的)

    ​	*因为prototype对实例最有用*

- 在子类的静态方法中,super只能调用父类静态方法,且父类被调用的静态方法中的this将会指向子类本身,而不是实例对象.

  - reason: 此时的super相当于: 父类名,即调用super.xx()如同调用 父类名.xx();

    父类中对应的静态方法的this当然也指向子类本身,而不是子类实例了

话说,你们知道为什么在我的描述下,两个reason中的this指向 和super相当于xxx 要放在一起,它们是有什么关系吗?

hhh当然有关系(我个人理解):prototype是不是对实例更友好? 而父类.xx()是不是指的是父类本身的方法? 

​	那么在这两个中的this当然也会对应它们的"属性",即prototype代表实例对象,父类本身就是代表父类. 

- 则prototype中的this => 子类实例
- 父类本身(方法)中的this => 子类

# 未看的

ES6 ---阮一峰 的 class继承一章 往下滑的

- 类的prototype 属性和_proto _属性
- 实例的 __ proto__ 属性
- 原生构造函数的继承
- Mixin 模式的实现