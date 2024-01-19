# class

## 概念

在 ES6 中，我们已经学到过了 [class](https://gitee.com/yomua/privatenotes/tree/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class) 的相关概念，它实际上是一个语法糖，class 的大部分功能都可以通过 ES5（function）来实现。

而 TypeScript 中的 class 和 ES6 的关系是什么呢？即：实现与被实现关系——TS  实现了 ES6 中的 class，派生出了自己的 class 规则。

但是 TS 中的 class 仍然是遵循 ES6 中 class 的相关规则，只不过在其基础上，多出了一些独属于自己的规则。

下面让我们跟着示例一步步看吧。

## 语法格式

```ts
// 普通类
class A [extends] B {}

// 抽象类
abstract A [extends] B {}
```

## 示例

### 在 class 中声明属性、方法

```ts
class Greeter {
    // 创建 greeting 属性，且值类型为 string
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    // 创建 greet 函数
    greet() {
        return "Hello, " + this.greeting;
    }
}
// 实例化 Greeter
let greeter = new Greeter("world");
```

在以上例子中，我们在 class Greeter 中创建了3个成员：greeting 属性，greet方法以及构造函数 constructor。

注：这里的构造函数是在 class 中显式声明的，所以若该类要继承某个类时，必须在构造函数中首先调用 super()

下面让我们逐步解析一下该示例吧：

- ***greeting: string;***

  在 Greeter.prototype 上创建一个类型为 string，名字为 greeting 的属性。

  注：`propName:type`  这种写法形式是 TS 特有的，我们无法在 ES6 中使用该形式，只能使用 `propName:value`。

  而这种  `propName:value` 形式，在 TS 中也能进行书写，若此若做，会使得继承类 A 的接口 C 在被类 B 实现时，类 B 中的对应属性的值必须为类 A 中 `propName:value` 的 value

  我们可以这么认为：在 TS 的 class 中，使用 `propName:value` 形式声明一个属性，就相当于为该属性声明一个确定的 value 值的类型。

  详见：<a href='#class 中使用自定义的类型作为声明的属性的类型'>class 中使用自定义的类型作为声明的属性的类型</a>

### class 中使用自定义的类型作为声明的属性的类型

```ts
class A {
    // 将 'yhw' 作为 name 属性的类型
    name: 'yhw'
}

interface Inter extends A {}

class B implements Inter {
    name: "yhw";
    // error, 'yyy' 无法分配给 'yhw'
    name: 'yyy';
}
```

- ***class A {name: 'yhw'}***

  在类 A 中声明一个 'yhw' 类型的 name 属性。

- ***class B implements Inter {name: "yhw";}***

  B 实现继承 A 的 Inter 接口时，由于类 A  中使用了确切的 value 作为 name 属性的类型，

  所以在类 B 中，我们在实现 name 属性时，必须以 'yhw' 作为 name 属性的值，

  否则会报错：Type '"yyy"' is not assignable to type '"yhw"，

  正是通过这个报错信息，我们才知道：在一个接口/类中时，你用一个确切的值作为某个属性的类型时，TS 会将这个确切的值直接认为是该属性的类型，而不是赋值，除非是实现该接口的类。

  就如同本节中上面的例子。

注：我们在接口中，我们也可以使用确切的 value 作为 interface 中声明的属性的类型，详见：<a href='接口中使用自定义的类型作为声明的属性的类型'>接口中使用自定义的类型作为声明的属性的类型</a>

### class 的继承

#### 概念

在 ES6 的 class 中，我们知道：若在子类中不显式的声明 constructor()，则程序将会自动的隐式声明，且在其中自动调用 super()，参见：[隐式调用的 constructor() 和 super()](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E7%9A%84%E7%BB%A7%E6%89%BF.md#若不写-constructor则子类将自动存在-constructor-且在其中自动调用-super)

而 TS 也是完美的实现了 ES6 的这一规则，详见以下示例：<a href='#隐式调用的 constructor() 和 super()'>隐式调用的 constructor() 和 super()</a>

#### 隐式调用的 constructor() 和 super()

假设我们使用一个 class A 继承 class B，在 A 中我们若不写 constructor()，则 TS 的编译器会自动的帮我们实现 constructor()，且在其中调用 super()；

但我们若在 class A （子类）中显示声明 constructor()，却不写 super()，则会报错，这是由于 [ES6 中 class 的继承特性](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E7%9A%84%E7%BB%A7%E6%89%BF.md#es6class的继承)导致的。

```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(
            `Animal moved ${distanceInMeters}m.`);
    }
}

// Dog 将隐式声明 constructor，并在其中自动调用 super()
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
/**
    Woof! Woof!
    Animal moved 10m.
    Woof! Woof!
*/
```

#### 显式声明 constructor()，则子类必须调用 super()

在 <a href='#隐式调用的 constructor() 和 super()'>隐式调用的 constructor() 和 super()</a> 一节中，我们讲到：TS 编译器会自动的帮我们在没有显式声明 constructor() 的子类中，隐式声明 constructor 并调用 super()；

但是若在子类中显示声明 constructor()，则一定要在其中首先调用 super()，否则会报错，这规则和 [ES6 的 class 规则](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E7%9A%84%E7%BB%A7%E6%89%BF.md#若不写-constructor则子类将自动存在-constructor-且在其中自动调用-super)是一样的，而之所以会这样：是由于 [ES6 中 class 的继承特性](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E7%9A%84%E7%BB%A7%E6%89%BF.md#es6class的继承)导致的。

```ts
// 父类
class Animal {
    constructor() {}
}
// 子类
class Snake extends Animal {
    // 显式声明 constructor()，必须调用 super()
    constructor(name: string) { 
        super(); 
    }
}
let sam = new Snake("Sammy the Python");
```

#### 子类重写父类的方法

```ts
// 父类
class Animal {
    // 为每个实例声明一个类型为 string 的 name 属性
    name: string;
    constructor(theName: string) { this.name = theName; }
    // 父类 Prototype 上的方法
    move(distanceInMeters: number = 0) {
        console.log(
            `${this.name} moved ${distanceInMeters}m.`);
    }
}

// 子类
class Snake extends Animal {
    constructor(name: string) { super(name); }
    // 重写父类的 move()
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        // 调用父类 Prototype 上的 move()
        super.move(distanceInMeters);
    }
}

// 子类
class Horse extends Animal {
    constructor(name: string) { super(name); }
    // 重写父类的 move()
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        // 调用父类 Prototype 上的 move()
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
/** 最终输出：
 * Slithering...
 * Sammy the Python moved 5m.
 * Galloping...
 * Tommy the Palomino moved 34m.
 */
```

- ***name: string;***

  为父类的每个实例声明一个类型为 string 的 name 属性。

  注：直接写在 class 中的属性并非存在 类.prototype 上，而是存在于每个实例上，参见：[此处](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.md#实例单独属性的新写法)。

  定义在类.prototpe 上的是方法，而不是属性。

- ***move(distanceInMeters: number = 0) {}***

  父类 Prototype 上的方法，接口一个 number 类型的参数，且为参数赋予默认值：0

- ***let tom: Animal = new Horse("Tommy the Palomino");***

  虽然我们声明的 tom 变量的限制类型为：Animal，但因为它是 Horse 的实例（new Horse()），调用 tom.move(34)时，	

  它会调用 Horse 里重写的方法，而不是 Animal 中。

  至于为什么这里限制 tom 的类型为 Animal 却不报错，是因为：Horse 是 Animal 的子类，也属于 Animal.

上面的例子中， 我们使用 extends 关键字创建了 Animal的两个子类： Horse和  Snake，并在这两个子类中都从写了父类的 move()，

这样做的目的是：使得每个子类必须实现父类的 move()，但是实现的方式可以有多种，这种形式我们称之为多态（是的，这是 OO 的概念）

### 在 constructor/class 外使用 实例.xx，则必须在当前所属的 class 的最顶层作用域声明 xx

TS 中的 class 虽然实现了 ES6 中的 class，但是有些规则和 ES6 的 class 是不一样的，比如，使用 ES6 的写法书写 class 是这样子的：

```js
// ES6 的写法
class A {
    constructor(name) {
        // 为每个实例添加独立的 name 属性。
		this.name = name // okay
    }
}
```

以上的 ES6 写法 class，编译器的语法分析是不会报错，但是若照本宣科的，在 TS 中，也是用这种写法，则编译在语法分析时，就会报错，如以下示例：

```ts
// TypeScript 的写法
class A {
    constructor(name) {
        // Property 'name' does not exist on type 'A'.
		this.name = name // error

    }
}
```

TS 中，若想要在一个 class 的 constructor() 使用 this 为每个实例添加独立的属性，则首先必须在该 class 最顶层作用域中声明你想要使用 this 添加的属性，

然后才能使用 this 去调用声明的属性，至于为什么这样？大概是因为 TS 比 JS 更加严格吧，即：**TS 必须先声明属性/方法才能使用**，ES6 中就不需要如此。

下面让我们将以上错误的 TS 的 class 写法改正：

```ts
// TypeScript 的写法
class A {
    // 为每个 A 的实例声明一个类型为 string 的 name 属性
    name: string;
    constructor(name) {
        this.name = name // okay
    }
}
let a = new A('yomua')
```

请注意：不论是 ES6 的 class 还是 TS 的 class，在它们 class 最顶层作用域中直接定义一个属性，实际上都是在 this 上添加属性，***参见：[在 class 的最顶层作用域上声明实例的每个属性](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.md#实例单独属性的新写法)***

### public、private、protected、readonly 修饰符

#### 概念

如果你了解其他语言（如：Java），那么想必你对 public、private、protected  三种修饰符并不陌生，它们分别可以定义：公共、私有、受保护的成员。

而在 TypeScript 中，这三种修饰符同样存在，且功能和 Java 中描述的几乎是类似的。

下面让我们单独讲讲这三个修饰符吧。

#### public

public 修饰符意味着声明一个公共的属性/方法，在 TS 的 class 中，每一个属性/方法 在不存在修饰符时，默认都是以 public 修饰，如：

```ts
class Animal {
    // 相当于 name:string
    public name: string;
    // constructor()
    public constructor(theName: string) { this.name = theName; }
    // move()
    public move(distanceInMeters: number) {
        console.log(
            `${this.name} moved ${distanceInMeters}m.`);
    }
}
```

需要注意的是：对于【参数属性】来说，我们必须显式的在 constructor() 的参数中，使用修饰符，即使是 public 也是一样，否则参数就只是参数，而不是拥有【声明一个类的成员，且自身同时也是形参】功能，详见：<a href='#参数属性'>参数属性</a>。

#### private

##### private 成员无法在它所属的类之外访问

当 class 中的某个成员通过 private 进行修饰的时候，该成员就不能在**声明它的类的外部访问**，即使是该类的派生类（子类）也是如此，并且即便是它的实例也是如此。

> 笔者注：使用 protected 修饰的成员，可以在派生类访问，
>
> 详见：<a href='#protected'>protected</a> 一节

如：

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Cat extends Animal {
    getName() {
        console.log(super.name);// Error: 'name' 是私有的.
    }
}
// 具有私有成员的 class，即使是它的实例，也不能访问它的私有成员。
new Animal("Cat").name; // Error: 'name' 是私有的.
```

##### 存在 private 成员的类，只有其子类和它兼容

TS 使用的是结构性类型系统：当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 private 或 protected 成员的类型的时候，情况就不同了，即：如果其中一个类包含一个 private 成员，那么只有这个类的子类才会和该类兼容。

这是因为：当一个类 A 存在 private 成员时，那么只有当另外一个类 B 中也存在这样一个 private 成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的，而想要符合这个条件的【另一个类】，那么只能是类 A 的子类了。

注：对于存在 protected 的成员也使用这个规则

> protected 修饰符与 private 修饰符的行为很相似，但有一点不同， 
>
> protected 成员在派生类中仍然可以访问

下面来看一个例子，更好地说明了这一点：

```ts
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
// Animal 的子类：Rhino
class Rhino extends Animal { // 类 'B' 继承 A，具有了私有的 name 属性，且和 A 是来自同一处（都是来自 A），所以该类 Rhino 和 Animal 兼容
    constructor() { super("Rhino"); }
}
// 非 Animal 的子类：Employee
class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
// Animal 的子类
let rhino = new Rhino();
// 非 Animal 的子类
let employee = new Employee("Bob");
animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```

通过以上例子，我们容易可以发现：Animal 的子类 Rhino 的实例，可以赋值给 Animal 的实例，而 非 Animal 的子类 Employee 的实例不能赋值给 Animal 的实例。

这是因为：Employee 和 Animal 类不兼容，因为 Animal 类存在私有属性：name。

#### protected	

##### protected 修饰的成员可以在其派生类访问（private 成员则不行）

使用 protected 修饰符修饰的成员，和使用 private 修饰符修饰的成员，是具有相似之处的，但有一点不同：protected 成员在派生类中仍然可以访问。例如：

```ts
//  Person 类的 constructor() 是受保护的
class Person {
    protected name: string;
    constructor(theName: string) { this.name = theName; }
}

// Employee 继承 Person
class Employee extends Person {
    constructor(name: string) {
        super(name);
    }
    public getElevatorPitch() {
        // 可以访问父类中受保护的成员（即：name 属性）
        return this.name
    }
}
let howard = new Employee("Howard");
console.log(howard.getElevatorPitch()); // Howard
```

在以上的例子中，我们使 Employee 继承 Person，并在父类 Person 中声明了一个受保护的且类型为 string 的 name 属性。

然后我们在子类 Employee 的公共方法 getElevatorPitch() 中访问父类的受保护成员：name.

而如果 name 属性是一个私有属性，则当我们使用 `return this.name` 时，TS 编译器会报错：Property 'name' is private and only accessible within class 'Person'

##### 使用 protected 修饰 constructor

###### 无法实例化一个 【constructor 是受保护】的类，但是可以继承它

当我们在一个 class 中，使用 protected 修饰 constructor 时，就意味着这个类无法进行实例化了，但是其他类仍然可以继承它：

```ts
// 使用 protected 修饰 constructor 的父类
class Person {
    protected constructor() { }
}

// Employee 继承 Person
class Employee extends Person { 
    constructor() { super() } 
}
// 可以正常实例化子类
let employee = new Employee();
// error，无法实例化一个 constructor 受保护的类。
let person = new Person(); 
```

###### 无法实例化继承使用 `protected 修饰 constructor 的类` 的类

有意思的是：如果我们在子类中不显式声明 constructor，且子类继承一个使用 protected 修饰 constructor 的类，那么我们就无法实例化这个子类：

```ts
// 使用 protected 修饰 constructor 的父类
class Person {
    protected constructor() { }
}

// Employee 继承 Person
class Employee extends Person {}

// error，无法实例化子类
let employee = new Employee();
```

虽然我们知道，在 TS 的 class 中，若子类不显式声明 constructor，则 TS 编译器会隐式帮我们声明 constructor，且自动调用 super() 去继承父类；但是这种隐式声明和调用可能存在一些问题，

比如：若这种隐式声明和调用不存在问题的话，本节中的例子应该是能实例化成功子类 Employee 的。

#### readonly 修饰符

除了 public、private、protected 三个修饰符之外，还存在 readonly 修饰符，顾名思义，readonly 关键字可以将属性设置为只读的，在 interface 中，<a href='#只读属性'>readonly</a> 具有同样的作用。

唯一需要注意的是：只读属性的初始化只能在它们被声明时，或在 constructor() 中调用只读属性并赋值，完成初始化。

```ts
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
// 错误! name 是只读的，只能在声明时或构造函数中初始化。
dad.name = "Man with the 3-piece suit"; 
```

### 参数属性

#### 参数属性的概念

使用 TS 的 class 中的 constructor()，在 constructor() 参数中使用 public/private/protected/readonly 这四个修饰符之一去修饰一个变量，使得这个变量具有两种功能：

1. 声明一个成员变量
2. 作为 constructor() 的形参

这样做的目的是，可以简化一些操作，***详见： <a href='#参数属性的作用'>参数属性的作用</a>***

#### 参数属性的作用

参数属性是一个很有趣的概念，它可以让我们简化一些流程，比如： 在大部分情况下，你可能会遇到：

我们需要在一个 class 的 constructor() 中，为每一个实例添加独立的属性，并将 constructor() 的参数作为这些属性的值，如以下示例：

```ts
class A {
    readonly name: string;
    constructor (theName: string) {
        this.name = theName;
        console.log(this.name); // yomua
    }
}
let a = new A("yomua");
```

在上面的例子中，我们在 A 类中声明了一个类型为 string 的只读属性：name，并在 constructor() 中使 new A() 时传递的参数赋值给只读属性 name

这种情况是很容易遇见的，所以 TS 特地提供了一种 参数属性 的使用方式来简化这个流程，请思考以下代码：

```ts
class A {
    constructor(readonly name: string) {
        // 相当于在 A 的顶层：readonly name: string
        console.log(this.name); // yomua
    }
}
let a = new A("yomua");
```

- ***constructor(`readonly name: string`) {}***

  在 constructor() 中，使用 参数属性 声明一个成员变量：name，且使得 name 是一个类型为 string 的只读属性，并使得该属性是 constructor() 的形参。

通过以上参数属性的简单示例，不难发现，参数属性具有两个功能：

1. 声明一个成员变量
2. 作为 constructor() 的形参

#### 参数属性的使用

参数属性只能使用于 constructor() 的参数中，且必须在参数名前使用 public/private/protected/readonly 修饰符修饰，若不这么做，就会报错。

至于在 <a href='#public'>public</a> 这节中，我们说：

> 在 TS 的 class 中，每一个属性/方法 在不存在修饰符时，默认都是以 public 修饰。

但是，这并不是说：constructor() 的参数中默认也是以 public 修饰符修饰的，constructor() 的参数仍然只是参数，而不是成员便变量，

除非使用了 public/private/protected/readonly 这四个修饰符修饰，这才会使得 constructor() 中的参数变成参数属性，使得它们具有 <a href='#参数属性的作用'>参数属性的作用 </a> 一节中所说的两个作用：

```ts
class A {
    constructor(public name: string) {
        // 相当于在 A 的顶层：public name: string
        console.log(this.name); // yomua
    }
}
let a = new A("yomua");
```

### class 中的存取器-getter 和 setter

#### 概念

TypeScript 支持通过 getters/setters 来截取对对象成员的访问， 它能帮助你有效的控制对对象成员的访问。

我们知道不论是 TS 还是 ES6 中的 class 本质上不过是一个语法糖，而 class 中的成员属性，不过是每个实例（对象）的独立属性（this.xxx），

又由于 TS 是实现 ES 的，所以我们自然的可以使用 ES5(2009) 中所定义的[对象访问器](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/%E5%AF%B9%E8%B1%A1/%E5%AF%B9%E8%B1%A1.md#javascript%E5%AF%B9%E8%B1%A1%E8%AE%BF%E9%97%AE%E5%99%A8-getter-setter)来控制对一个对象成语的方法；这个成员通常是属性，但也可以是一个属性函数。

下面让我们跟着示例详细看看吧。

#### 示例

##### 通过 get 和 set 控制 class 的成员属性的访问

下面来看如何把一个简单的类改写成使用 get 和 set。 首先，我们从一个没有使用存取器的例子开始：

```ts
class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
```

在以上的例子中，我们可以随意的设置 fullName，这是非常方便的，但是这也可能会带来麻烦，如：当一个项目稍大时，fullName 属性这个名字可能会存在于各个模块，导致模块之间可能会造成冲突，

所以在下面这个版本里，我们使用 get 和 set **伪属性**来控制对成员属性 fullName 的访问，使得当成员属性 fullName 每一次修改时都可以检查其修改的值是否正确，同时，使用 get 伪属性去得到 fullName 修改后的值：

```ts
class Employee {
    // 私有变量只能在它所属的类中访问，即使派生类也不行
    private _fullName: string;
    
    // 伪属性 get，调用时只能使用 对象.属性名 的方式
    get fullName(): string {
        return this._fullName;
    }
    
    // 伪属性 set，调用时只能使用 对象.属性名 的方式，传递参数使用：对象.属性名 = 参数值
    set fullName(newName: string) {
        if (newName === 'yomua') {
            this._fullName = newName;

        }
        else {
            console.log("Error: FULLNAME Exception");
        }
    }s
}

let employee = new Employee();
// 调用 Employee 类中的伪属性 set：fullName，并使用属性的方式向伪属性传递参数
employee.fullName = "yomua";
// 调用 Employee 类中的伪属性 get：fullName
console.log(employee.fullName)
```

当调用 Employee 中的伪属性 set 并向之传递参数时，若参数非 'yomua'，则会提示错误信息并输出一个 undefined 的 _fullName（employee.fullName）；

若参数为 'yomua'，则不会输出错误信息，且会直接输出：yomua

#### 使用存取器的注意点

对于存取器有下面几点需要注意的：

首先，存取器要求你将编译器设置为输出 ECMAScript 5 或更高，且不支持降级到ECMAScript 3。 

其次，只带有 get，但不带有 set 的存取器，get 将自动被推断为 readonly，这在从代码生成 `.d.ts` 文件时是有帮助的，因为利用这个属性的用户会看到：不允许够改变它的值。

### 静态属性

#### 概念

当然的，TS 实现了 ES6 的 class 中的静态属性，在前面的章节中，们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。

现在，我们在本节准备讨论的是类的静态成员：存在于类本身上面而不是类的实例上。

请思考以下示例。

#### 示例

##### 静态成员存在于类本身，而非类的 Prototype 上

```ts
class Grid {
    static origin = { x: 0, y: 0 };
    constructor(){}
}

console.log(Grid.origin) // okay
console.log(Grid.prototype.origin) // error，origin 是静态成员，而非实例成员
```

##### 一个较复杂的示例

```ts
class Grid {
    static origin = { x: 0, y: 0 };
    // x=10,y=10
    computed(point: { x: number; y: number; }) {
        // 10 - 0 
        let xDist = (point.x - Grid.origin.x);
        // 10 - 0
        let yDist = (point.y - Grid.origin.y);
        /**
         * Math.sqrt()：返回一个数的平方根
         * Math.sqrt(100 + 100) / 5.0
         */
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    // 声明一个类型为 number 的成员属性：scale，并将其作为 constructor() 的参数
    constructor(public scale: number) { }
}

let grid = new Grid(5.0);  // 5x scale

console.log(grid.computed({ x: 10, y: 10 }));
```

在以上示例中，我们通过参数属性的方法声明了一个类的成员属性：scale，然后类中使用 static 关键字声明了一个类的静态属性：origin

接着我们在类的 Prototype 上又声明了一个 computed 方法（不是成员方法啊，这是公共的方法），在该方法中：用来计算成员属性和静态属性。

静态属性需要使用：类.属性 的形式访问。

成员属性在 class 中则可以使用：this.属性 访问，或者在 class 外直接使用 类.prototype.属性 形式访问，

注：这种 *类.prototype.属性* 形式只是访问该属性，而非访问成员属性；成员属性指的是：在 class 中声明一个属性后，并在 constructor() 方法中使用 this.属性名 的方式去为每个类的实例创建一个独立的属性，这个独立的属性才会被称之为成员属性。

### 抽象类

#### 概念

学过 Java 的你看到此节标题一定不陌生吧，在 Java 中，也存在抽象类，且 TS 的抽象类的概念和 Java 中抽象类的概念是高度相似的。

TS 中，抽象类的主要用处是做为派生类的基类使用，且抽象类无法被实例化

在抽象类中，使用 abstract 声明的方法/属性称之为抽象方法/属性，它们不能存在具体的实现，且必须在派生类中实现它们。

但是我们不能使用 abstract 去修饰 constructor()，如果你想了解更多关于抽象类的概念，可以参见：《Java Note.doc - 抽象类》

#### 示例

##### 抽象类的基本使用

```ts
abstract class Department {

    // 使用参数属性声明一个类型为 string 的 public 成员属性：name，并使得它为 constructor() 的参数
    constructor(public name: string) { }

    // 抽象方法，必须在派生类（在这里要在 AD 类 中）中实现
    abstract printMeeting(): void;

    // 抽象属性，必须在派生类实现
    abstract hobby: string;

    // 非抽象方法，不需要在其派生类实现
    printName(): void {
        console.log(this.name); // yomua
    }
}

// 派生类
class AD extends Department {
    constructor() {
        super('yomua');
    }

    // 实现抽象方法：printMeeting
    printMeeting(): void {
        console.log('实现抽象方法：printMeeting');
    }

    // 实现抽象属性：hobby
    hobby: '实现抽象属性：hobby'

    // 派生类自己的方法
    generateReports(): void {
        console.log('派生类自己的方法');
    }
}
```

##### 无法实例化一个抽象类

```ts
abstract class Department {}
// error,Cannot create an instance of an abstract class.
let d = new Department()
```

##### 无法使用 abstract 修饰抽象类的 constructor

```ts
abstract class Department {
    // error,'abstract' modifier can only appear on a class, method, or property declaration.
    abstract constructor() { }ts
}

```

错误提示告诉我们：abstract 修饰符只能用来修饰 class、属性、方法

#### 抽象类和接口

##### 抽象类和接口的区别

以下的表格中的内容实际上是 Java 中的接口和抽象类的区别，但是在前文中，我们有说过：TS 中的抽象类和接口的功能和 Java 中的抽象类和接口的功能是类似的，所以它们之间的区别也很类似，

那么自然的，我就引用了 Java 中的类和抽象类的区别作为 TS 中的类和接口的区别：

| 参数                   | 抽象类                                                       | 接口                                                         |
| ---------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| 默认的  方法实现       | 它可以有默认的方法实现                                       | 接口完全是抽象的。               它根本不存在方法的实现      |
| 实现                   | 子类使用extends关键字来继承抽象类。如果子类不是抽象类的话，它需要提供抽象类中所有声明的方法的实现。 | 子类使用关键字implements来实现接口。它需要提供接口中所有声明的方法的实现 |
| 构造器                 | 抽象类可以有构造器                                           | 接口不能有构造器                                             |
| 与  正常 TS 类的  区别 | 除了你不能实例化抽象类之外，              它和普通 TS 类没有任何区别 | 接口是完全不同的类型                                         |
| 速度                   | 它比接口速度要快                                             | 接口是稍微有点慢的，          因为它需要时间去寻找在类中实现的方法。 |
| 添加新  方法           | 如果你往抽象类中添加新的方法，你可以给它提供默认的实现。                                因此你不需要改变你现在的代码。 | 如果你往接口中添加方法，那么你必须改变实现该接口的类 因为类如果实现一个接口，则需要实现接口中的所有必要属性和方法 |

##### 什么时候使用抽象类，什么时候使用接口

- 如果你拥有一些方法并且想让它们中的一些有默认实现，那么使用抽象类吧。

- 如果你想实现多重继承，那么你必须使用接口。

  由于 TS（ES 也是）中的 class 不支持直接使用 extends 进行多继承，即：子类不能够继承多个类，但可以实现多个接口。

  因此你就可以使用接口来解决它。

  `interface A extends B,C,D...{}`

- 如果基本功能在不断改变，那么就需要使用抽象类。

  因为如果接口中存在不断改变基本功能的方法，那么就需要改变所有实现了该接口的类。

### 将 TS 中的 class 编译成 JS

在 <a href='#无法直接使用 class 实现存在构造器签名的接口'>无法直接使用 class 实现存在构造器签名的接口</a> 这节中，我们说过：class 中的 constructor 函数是存在于类的静态部分，而非实例部分的，那我们怎么肯定的呢？

这是因为我们通过 TS 把 class 编译成 JS 的形式所知道的：

```ts
/**
 * TS 中的代码
 */
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
let g = new Greeter('love you')
```

将以上 TS 中的 class 编译成 JS 的形式如下：

```ts
let Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    // 关键，返回 Greeter 函数
    return Greeter;
})();
let g;
g = new Greeter('love you')
```

- ***let Greeter = (function () {})()***

  这是一个立即执行函数的表达式，当程序运行当这行代码时，右边的函数将会立即被执行。

  所以此时 Greeter 将是一个函数（function Greeter(message){}），且该函数的 Prototype 上存在 greet 方法。

  注意：function Greeter(message){} 并不会立即被执行，它只会被预编译后进行暂存，当调用 Greeter() 或使用 new Greeter() 的时候，该函数才会被执行，更多详见下一个点的解释。

- ***function Greeter(message) {}***

  function Greeter(message){...} 这个就是 class 中的 constructor()，所以我们才会说，constructor() 实际上是 class 的静态部分。

  这是因为存于 Prototype 上的 constructor() 和存于 class 中的 constructor() 是不一样的。

  即：若有一个 class A，然后我们使用 A.prototype.constructor，只会得到 class A 本身；而我们**使用 A.constructor，则会得到的是 constructor() 这个函数，这才是我们所需要的**。

- ***this.greeting = message;***

  在 JS 中，并不需要先在 class 的最顶层作用域声明成员属性，才能使用，而是可以直接使用。

- ***Greeter.prototype.greet = function () {}***

  在 Greeter 的 Prototype 原型对象空间中添加一个 greet()，

  使得每个 Greeter 的实例都能使用 greet 方法（这是实例的公有方法，而非实例本身所具有）

- ***let g;***

  ***g = new Greeter('love you')***

  调用 Greeter 函数，并向之传递参数时。

### 把类当做接口使用

在 <a href='#接口继承 class'>接口继承 class</a> 一节，我们演示了接口实际上是可以继承一个 class 的，而之所以可以这样，是因为：在定义一个 class 时，实际上会创建两个东西：

1. 类的实例
2. 一个构造函数

这在 <a href='#将 TS 中的 class 编译成 JS'>将 TS 中的 class 编译成 JS</a> 这一节中我们有说过。那么又因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```ts
class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    z: number;
}
let point3d: Point3d = {x: 1, y: 2, z: 3};
```

需要注意的是：你顶多使用一个接口继承一个 class，虽然你可以使用一个 class 去实现（implement）另一个 class，但是这并没有意义：

```ts
class A {
    name: string
}
// 类 B 实现 类 A
class B implements A {
    name: 'yomua'
}

let b = new B()
b.name; // undefined
```

以上示例是没有意义的，因为 B 实现 A，那么这就代表 B 中必须有 name 属性的存在，而以上的示例的 B 中，虽然存在 name 属性，且值为 'yomua'，

但是你要知道，在一个 class 的顶层去声明一个成员属性时，其值就相当于自定义类型，即：name: 'yomua' => 声明一个 'yomua' 类型的成员属性：name

声明成员属性完成之后，还需要在 constructor 去为 this.name 这个类型为 'yomua' 的成员属性赋值，否则就如同以上的 b.name 一样，得到的是 undefined。
详见：<a href='#class 中使用自定义的类型作为声明的属性的类型'>class 中使用自定义的类型作为声明的属性的类型</a> 一节。

所以这样子，有没有父类（A）都是一样的，比如把代码改成一下的样子，其功能一样：

```ts
class B {
    name: 'yomua' //  Property 'name' has no initializer and is not definitely assigned in the constructor.
}

let b = new B()
```

这才是我说的：一个类实现另一个类虽然不会报错，但是似乎没有什么意义的原因。2020-11-09 17:21

