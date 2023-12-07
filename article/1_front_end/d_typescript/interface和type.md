# [接口](https://www.tslang.cn/docs/handbook/interfaces.html)

## 概念

TypeScript 的核心原则之一是对值所具有的结构进行类型检查，这种情况有时被称做“鸭式辨型法”或“结构性子类型化”。

在 TypeScript 中，接口起到的作用是创建一个类型并为之命名，或为你的代码/第三方代码定义契约（规则）。

接口是对抽象类再进一步抽象，为了克服子类不能继承多个类（单继承），我们引出接口概念，即：接口中所有方法都是抽象的。

你可以参考 Java 中的 interface，参见：\<Java Note.doc - 接口>

## 语法格式

```ts
interface Name [extends] A,[B,C..] {}
```

## 接口最基本的工作原理

请思考以下例子：

```ts
function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

- 首先 TS 的类型检查已经知道存在 printLabel 函数，且它有一个参数，并要求这个参数是一个对象，且必须存在 label 属性以及其值必须为 string 类型，否则就会报错。
- 然后 TS 的类型检查其会检查哪里调用了 printLabel 函数，若调用该函数时传递的参数并不符合限制的类型，则 TS 类型检查会报错。

<!-- 下面让我们用接口去描述 labelledObj 参数的类型 -->

```ts
interface LabelledValue {
    label: string;
}
function printLabel(labelledObj: LabelledValue) {
  console.log(LabelledValue.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

显然的，我们很容易发现：LabelledValue 接口就如同一个名字，用来描述（代表）第一例子中函数参数要求的类型。

**而该接口描述的是：有一个 label 属性且值的类型为 string 的对象。**

但请注意：我们在这里并不能像在其它语言里一样，说传给 printLabel 函数的对象实现了这个接口，因为我们只会去关注值的外形，只要传入的对象满足上面提到的必要条件，那么它就是被允许的。

还有需要注意的一点是：接口中存在一种**额外的属性检查机制**，即：你向某个函数传入一个【字面量对象】时，若该函数参数的类型限制为某个接口/某个对象类型*（这两者是相等的，即：这个对象类型可以用接口来描述）*，而恰巧你传入的这个字面量对象中的属性有该接口不存在的属性时，TS 的类型检查就会提示错误

这种额外的属性检查机制可以通过**三种方式**去避免：

1. 类型断言
2. 将字面量对象赋值给变量，使用该变量作为实参传入函数
3. 为接口添加索引签名

***详见：同级目录 - 额外的属性检查机制***

而**若没有额外属性检查机制**的情况下：只要传入的对象满足接口/对象类型提到的必要条件，那么它就是被允许的，即使传入的对象的属性是混乱的也没问题，只要相应的属性存在并且类型也是对的就可以。

这是因为 TS 类型检查器通常不会去检查属性的顺序，除非接口中存在函数类型，因为对于存在函数类型的接口来说，使用该接口作为限制类型的变量（函数），类型检查器会该变量（函数）的参数逐个进行检查，并要求对应位置上的参数类型是兼容的，而此时就要求函数参数的顺序是有序的。

***详见：同级目录 - 函数类型***

## 接口中的可选属性和只读属性

### 可选属性

#### 概念

在一个接口中，并不是每个属性我们都会使用到，有些属性只在某些条件下使用或者不适用。

此时，我们就可以使用 “options bags” 模式，而可选属性就是应用了该模式的一种属性，

即：当某个变量使用某个接口作为限制类型时，若该接口中存在可选属性，那么此时使用了该接口的变量可以**选择使用可选属性或不使用可选属性**，这两种选择 TS 的类型检查都不会报错。

而接口中的非可选属性，是必要的，如果不存在，则类型检查器报错。

#### 示例

下面是应用了 “option bags” 模式的可选属性的例子：

```ts
interface SquareConfig {
  // 创建两个可选属性
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

- `function createSquare(config: SquareConfig): {color: string; area: number}`

  声明 createSquare 函数，其返回值类型为：{color: string; area: number}，并且接收一个参数且该参数类型为：SquareConfig

- `color?: string; width?: number;`

  由于接口中的这两个属性是可选属性，所以使用该接口作为类型的函数参数，并不一样要向该参数中传递这两个属性，可以选择传递一个、两个或者干脆不传递任何属性都行，

  但请注意：可以选择不向 createSquare() 传递接口中的任何属性，但**至少要传递一个对象类型的参数**；这是因为我们在声明 createSquare() 时，为该函数限制了至少传递一个参数给它。

  还有一点需要注意：我们仍然无法传递接口中没有的属性或着说无法在使用某个接口作为类型的变量中，创建该接口中没有的属性，否则 TS 的类型检查机制仍然会报错。

显然的，通过以上的例子我们可以知道：带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 `?` 符号。

#### 好处

现在，我们已经知道了可选属性是一个接口中使用 `?` 拼接在属性名后面的一个属性，在使用该接口时，我们可以选择使用/不使用接口中的可选属性，那么：这到底有什么用呢，可选属性可以给我们带来什么好处呢：

1. 可以对可能存在的属性进行预定义

2. 可以捕获引用了不存在的属性时的错误

   即：当我们传递一个参数对象时没有出错，但是在函数中引用该对象的属性时出现了拼写错误或引用了不存在的属性，则 TS 编译器报错

好处1就不用说了，让我们谈谈好处2吧：现在我们故意将以上示例中 `createSquare` 里的 `color` 属性名拼错，就会得到一个错误提示：

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  // Error: Property 'clor' does not exist on type 'SquareConfig'
  if (config.clor) {
    newSquare.color = config.clor;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});
```

### 只读属性

#### 概念

在一个接口对象（即：接口，接口本来就是一个对象，***详见：接口最基本的工作原理***）中，一些属性只能在接口对象刚刚创建的时候修改其值，

若想使得某些属性拥有其只读特性，则你可以在属性名前用 `readonly` 来指定只读属性：

```ts
interface Point {
    readonly x: number; // 只读属性 x
    readonly y: number; // 只读属性 y
}
```

除了接口中存在只读属性之外**，TypeScript 中还存在只读数组**，其语法格式为：`ReadonlyArray<T>`，这种只读数组格式与 `Array<T>` 泛型相似，只读数组泛型只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

注：`<T>` 表示任意类型，如： `ReadonlyArray<number|string...>`

#### 示例

##### 接口中的只读属性

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 20 };
// Point 接口中的 x、y 都是只读属性，无法更改。
p1.x = 5; // error!
```

##### ReadonlyArray\<T> 只读数组

```ts
let a: number[] = [1, 2, 3, 4];
// 创建 ro 只读数组，并将 a 赋值给它
let ro: ReadonlyArray<number> = a;
// 无法更改 ro 只读数组中的任何属性。
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
// 只读数组类型无法分配给可变数组类型，但是只读数组可分配给只读数组
a = ro; // error!
(a as ReadonlyArray<number>) = ro; // okay
a = ro as number[]; // okay
```

#### readonly VS const

从只读属性的概念来看，很类似于使用 const 去定义的变量，都无法在变量被定义完之后去更改它，那么我们该什么时候去使用 readonly，还是 const 呢？

最简单判断该用 `readonly` 还是 `const` 的方法是看要把它做为变量使用还是做为一个属性。 

- 做为变量使用的话用 `const`，
- 做为属性则使用 `readonly`。

## 额外的属性检查

### 概念

当你向某个函数传入一个【字面量对象】时，若该函数参数的类型限制为某个接口/某个对象类型*（这两者是相等的，即：这个对象类型可以用接口来描述，**详见：接口最基本的工作原理**）*

而恰巧你传入的这个字面量对象中的属性有该接口不存在的属性时，TS 的类型检查机制就会提示错误。

### 示例

```ts
interface SquareConfig {
    color?: string;
    width?: number;
}

// 限制参数的类型为：SquareConfig
function createSquare(config: SquareConfig) {/**...*/}
var mySquare = createSquare(
    { colouuuuur: "red", width: 100 } // error
);
```

由于存在额外的属性检查机制，所以传入的字面量对象（`{ colouuuuur: "red", width: 100 }` ）存在限制类型所没有的属性（colouuuuur）时，TS 类型检查机制就会提示错误。

但是我们有三种方式去解决这种由于传入字面量对象导致额外属性检查机制的运行，从而使得 TS 类型检查机制报错的方法。

### 如何避免额外的属性检查机制的三种方法

<!-- 第一种：使用类型断言 -->

```ts
var mySquare = createSquare(
    { width: 100, opacity: 0.5 } as SquareConfig
); // okay
```

<!-- 第二种：将字面量对象赋值给变量，使用该变量作为实参传入函数-->

即：不要直接传入字面量对象，而是将字面量对象赋给另一个变量，使用这个变量作为实参，

这是因为 传入的实参变量（若不是字面量对象）不会经过额外属性检查，所以编译器不会报错。

注：但是仍然会经过正常的属性检查，即：检查必须的属性是否存在，且其值的类型是否对应。

```ts
var squareOptions = { colour: "red", width: 100 };
var mySquare = createSquare(squareOptions); // okay
```

<!-- 第三种：为接口添加一个索引签名 -->

字符串索引签名通常用来匹配对象中的 `propName:value`，因为对象中的属性都是 string 形式的。

数字索引签名通常用来匹配数组中的索引，这是因为数组中的索引都是 number 形式的。

而对于以下的 `colour:"red"` 来说，它会匹配 `[propName: string]: any;` 字符串索引签名。

而不论是字符串/数字索引签名都相当于为接口定义了一个匹配字符串/数字索引签名且其索引值类型为 any 的类型。

所以不论我们传入的字面量对象中是否有接口中没有的属性，字符串索引签名总能和我们传入的对象的属性相匹配，所以 TS 类型检查机制不会报错。

***详见：接口中的可索引签名***

```ts
interface SquareConfig {
    color?: string;
    width?: number;
    // 字符串索引签名，其索引值类型为：any
    [propName: string]: any;	
    // 数字索引签名，其索引值类型需要为字符串索引签名的索引值类型的子类型，详见：同级目录 - 接口中的可索引签名
    [attrName: number]: any;
}
function createSquare(config: SquareConfig) {/**...*/}

var mySquare = createSquare(
    { colour: "red", width: 100 }
); // okay
```

## 接口中的函数类型

### 概念

在上面的例子中，我们主要介绍了接口可以描述对象的普通属性（propName:type 这样描述对象的 propName:value）以及顺便介绍了接口可以描述具有索引的类型，现在在该节中，我将介绍：接口是如何描述函数类型的。

即：如何定一个契约，可以用来限制函数的参数个数和类型以及函数的返回值类型，我们通常称接口中【用来限制函数参数个数和类型以及函数返回值类型】的类型为（函数）**调用签名**。

注：某个调用签名成为了某个变量的类型，则该变量中的参数个数可以少于调用签名的参数个数，但是不能多，***详见：示例***

### 示例

为了使用接口表示函数类型，我们需要给接口定义一个调用签名，该**调用签名用来限制函数参数个数和类型以及函数返回值类型。** 

​	注：一个函数表达式使用存在调用签名的接口作为类型时，该函数表达式中的参数个数可以少于调用签名定义的参数个数，但是不能多，且对应位置上参数的类型要相同，***详见：<a href="#使用函数类型的接口作为类型的函数表达式，可以省略参数个数">使用函数类型的接口作为类型的函数表达式，可以省略参数个数</a>***

调用签名就像是一个只有参数列表和返回值类型的函数定义，并且需要注意的是：参数列表里的每个参数都需要名字和类型。

#### 存在调用签名的接口（函数类型接口）和它的用法

请思考以下例子：

```ts
interface SearchFunc {
	// 调用签名
	(source: string, subString: string): boolean;
}
// 创建 mySearch 变量，且限制它的类型为 SearchFunc
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string):boolean {
  let result = source.search(subString);
  return result > -1;
}
```

- ***let mySearch: SearchFunc;***

  创建 mySearch 变量，且限制它的类型为 SearchFunc，由于该接口描述的是函数类型，所以 mySearch 变量必须为一个函数，

  且参数个数、类型以及函数返回值要和接口中描述的函数类型的参数个数、类型以及函数返回值类型要一样。

  否则 TS 类型检查机制会报错。

#### 使用函数类型的接口的函数表达式的参数名字可以不同

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

```ts
interface SearchFunc {
	// 调用签名
	(source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
// 函数的参数名字和接口中的函数类型的参数名并不同
mySearch = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
}
```

需要注意的是：TS 的类型检查机制会对函数的参数逐个进行检查，要求对应位置上的参数类型是兼容的，且函数的返回值类型也要是兼容的。

#### 使用函数类型的接口作为类型的函数表达式，可以不指定参数类型和返回值类型

但是你在定义一个使用该接口（函数类型的接口）作为类型的函数时，即使**不对函数参数和返回值指定类型，也仍然是可以的**，

因为 TypeScript 的类型系统会**自动推断出参数类型**（前提是函数直接赋值给了 `SearchFunc ` 类型的变量），如，我们改写以上例子：

```ts
interface SearchFunc {
	// 调用签名
	(source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
// 函数参数的类型和函数返回值类型都没写，但并不报错。
mySearch = function(src, sub) {
  let result = src.search(sub);
  return result > -1;
}
```

#### 函数类型接口的限制不因省略参数类型和返回值类型从而消失

需要注意的是：没写函数参数类型、返回值类型，并不代表 TS  类型检查器就不检查了，

如若你将上面的例子的返回值类型改为非 boolean 类型，或参数类型改为和接口中对应的参数类型不同，则 TS 类型检查器就会报错：

```ts
let mySearch: SearchFunc;
// 函数参数的类型和函数返回值类型和接口中不同，则报错
mySearch = function(src:number, sub) { // error
  return 'result' // error
}
```

#### 使用函数类型的接口作为类型的函数表达式，可以省略参数个数

值得一提的是，我们不需要将接口中的调用签名定义的每个参数都写出来，只需要对应的位置上其参数类型相同就好：

注：这种只能减少，不能增多。

```ts
interface SearchFunc {
	// 调用签名
	(source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
// 后面的参数个数省略，也仍然正确。
mySearch = function(src:string) { // okay
  return true 
}
```

还值得注意的是：在使用某个接口中的调用签名定义函数表达式后，我们再调用该表达式，那么调用表达式（函数）传递的参数个数是要和表达式中定义的参数个数是一样的。

## 接口中的可索引签名

### 概念

我们在前面有顺便提到可索引签名，这与使用接口来描述函数类型差不多，即：我们使用接口来描述那些能够【通过索引】得到的类型，并且可以描述【索引值】的类型。

简单来说：**接口可以描述【具有索引和索引值】的类型，我们将接口描述的这种类型称之为：可索引签名。**比如：arr[0]、obj["propName"]。

其中 TypeScript 支持描述两种索引签名：

1. 数字索引签名 `[index: number]: type`（通常用来限制数组）
2. 字符串索引签名 `[index: string]: type`（通常用来限制对象）

并且这两种索引签名是可以是同时使用的，即：**一个接口中可以既存在数字索引签名，又可以存在字符串索引签名**。

但是当二者**同时存在时**：**数字索引签名的索引值类型以及其他属性的属性值类型（propName:type 中的 type)必须是字符串索引签名的索引值类型的子类型或其本身。** 

***详见：<a href='#详解为什么数字索引签名和接口中其他属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身'>详解为什么数字索引签名和接口中其他属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身</a>***

下面让我们看看示例。

### 示例

#### 使用接口描述数字索引签名的示例

```ts
interface numIndexSignature {
  [index: number]: string; // 数字索引签名，值类型为：string
}
let numArray: numIndexSignature;
numArray = ["Bob", "Fred"];
```

- ***let myArray: StringArray;***

  创建一个 StringArray 接口类型的变量，由于 StringArray 接口只描述了一个数字索引签名的类型，即：描述了一个【具有索引且索引类型为 number 以及索引值为 string 类型】的值，

  所以这要求 myArray 变量必须是一个【具有索引且索引类型为 number 以及索引值为 string 类型】的值。

  显然的，myArray 必须为一个数组，这才满足数字索引签名的要求（对象中的索引都是 string 类型，而数组中的索引都是 number 类型）。

#### 使用接口描述字符串索引签名的示例

上面我们已经提到了什么是数字索引签名以及用法，现在让我们来讲讲字符串索引签名的使用。

##### 以下是一个最简单的示例

```ts
interface strIndexSignature {
  [index: string]: string; // 字符串索引签名，值类型为：string
}
let strObject: strIndexSignature
strObject = {
    name: "Yomua",
    hobby: "Girl",
}
```

- ***let strObject: strIndexSignature***

  创建一个类型为 strIndexSignature 的变量，由于 strIndexSignature 接口只描述了一个字符串索引签名的类型，即：描述了一个【具有索引且索引类型为 string 以及索引值为 string 类型】的值，

  所以这要求 strObject 变量必须是一个【具有索引且索引类型为 string 以及索引值为 string 类型】的值。

  显然的，strObject 必须使为一个对象，这才满足字符串索引签名的要求（对象中的索引都是 string 类型，而数组中的索引都是 number 类型）。

##### 用字符串索引签名可以很好的描述 `dictionary`（字典）模式

字符串索引签名除了最基本的用法之外，还能够很好的描述 `dictionary`（字典）模式，并且它也会确保接口中的所有其他属性的值的类型和它的索引值类型相匹配，

而这也是为什么接口中其他属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身的原因：

```ts
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length 是 number 类型
  name: string       // 错误，`name`的类型与字符串索引的索引值的类型不匹配
}
```

#### 详解为什么数字索引签名和接口中其他属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身

<!-- 数字索引签名的索引值类型必须为字符串索引签名的索引值类型的子类型或其本身 -->

在前面，我们说过：数字索引签名和接口中其他属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身，那究竟是为什么呢？

 这是因为当使用 `number `（一个索引类型为 number 的值） 来索引时，JavaScript 会将它转换成 `string` 然后再去索引。 

也就是说用 `100`（一个`number` 类型的索引）去索引时，其实就相当于使用 `"100"`（一个`string` 类型的索引）去索引，因此【数字索引签名的索引值类型要和字符串索引签名的索引值类型】保持一致。

```ts
interface strIndexSignature {
  [index: string]: string; // 字符串索引签名
  [index: number]: number; // error,number 无法分配给 string
}
```

但是请注意：这并不代表字符串索引签名 === 数字索引签名，它们二者无法进行替换，

虽然使用 number 类型的索引去索引接口中的索引签名时，number 类型的索引会替换成 string 类型的索引，

但是仍然索引的是接口中的数字索引签名，而非字符串索引签名，只不过数字索引签名的值类型要是字符串索引签名的值类型的子类型或其本身。

如：

```ts
interface strIndexSignature {
  [index: string]: string; // 字符串索引签名
}
var arr: strIndexSignature
arr = ['1', '3', '4'] // error,对应接口中缺少（数字）索引签名
```

<!-- 同接口中的其他所有属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身 -->

在 ***<a href='#用字符串索引签名可以很好的描述 dictionary（字典）模式'>用字符串索引签名可以很好的描述 dictionary（字典）模式</a>***  一节中，

我们已经提到过——字符串索引签名所属的同接口中的其他属性的属性值的类型必须为字符串索引签名的索引值类型的子类型或其本身，是因为这是一个规范：

**字符串索引签名会确保它所属的接口中的所有其他属性的值的类型和它的索引值类型相匹配。**

这是因为字符串索引签名声明了 `obj.property `和 `obj["property"]` 两种形式，而这两种形式都可以代表字符串索引签名。

**那字符串索引签名声明了这两种形式和刚才说的规范有什么关系呢？**

当我们使用存在字符串索引签名的接口作为某个变量的限制类型时，那么变量.property 或 变量["property"] 都对应着接口中的某个 propName:type，

而这两种形式都可以代表字符串索引签名，也就是说 *变量.property 或* 
*变量["property"] 既对应接口中的某个 propName:type 又对应字符串索引签名*，

即：propName:type 就相当于字符串索引签名的子类型（后者包含前者）所以 propName:type 的类型要是字符串索引签名的值的子类型或其本身，而不是反过来

总而言之：字符串索引签名可以匹配同接口中的所有的 propName:type。

所以接口中的每个 propName:type 的 type(类型) 都要是字符串索引的索引值类型的子类型或其本身，否则类型不匹配，自然就会冲突，那么 TS 编译器会报错

#### 只读的索引签名

理所当然的，我们可以把索引签名（数字或字符串）设置为只读，这样一来，使用了存在索引签名的接口作为类型的变量，一旦创建成功，就无法继续给索引赋值或更改值，否则就报错：

```ts
interface ReadonlyStringIndexSignature {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// ReadonlyStringIndexSignature 接口的索引签名是只能读取的。
myIndexSignature[2] = "Mallory"; // error!
myIndexSignature[1] = '1'; // error
```

## class （类）类型的接口

### 概念

我们知道，ES6 新增了一个语法糖：class，使用 ES5 也完全可以实现 class 的大部分功能，它只不过是让 JavaScript 的对象原型的写法更加清晰、更像面向对象编程的语法。参见：[Gitee-privatenotes-class 的由来](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95.md) 

而在 TS 中，TS 能够使得 class 强制必须符合某种契约（通常指的是接口），而实现这种用处的方式是通过：`implement` 关键字，请详见示例。

注：获取更多 TypeScrip 中的 class 信息，***详见：<a href='#TypeScript 中的 class（类）'>TypeScript 中的 class（类）</a>*** 

而什么叫做 class （类）类型的接口呢？即：一个接口中存在构造器签名或定义了公共属性/公共方法，就叫做 class 类型的接口。

而什么是 class （类）类型呢？即：指的是使用 class 关键字定义的一个类，用这个 class 去定义各种属性/方法。

在 Java 中，我们通常使用 class 去实现一个 interface，TS 中也是如此。

### 示例

#### class 使用 implement 关键字实现 interface

##### 接口中为 class 定义公共属性

```ts
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date; // 如若不存在，则静态编译时报错。
    constructor(h: number, m: number) { }
}
```

- ***class Clock implements ClockInterface {...}***

  定义一个 Clock 类，让它实现 ClockInterface 接口，使得在 Clock 类中必须存在 ClockInterface  接口中的 currentTime 属性，且类型必须为 Date，否则 TS 类型检查机制会报错。

##### 接口中为 class 定义公共方法

除了使用接口为 class 定义必要的公共属性之外，还可以定义公共的方法：

```ts
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date); // 公共方法
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

- 在 ClockInterface 接口中，不仅为 class 定义了一个公共属性且值的类型为 Date 的 currentTime，

  还定义了一个公共方法且规定了该方法至多存在一个参数且类型必须为 Date*（any 也行，因为 any 可以赋给任何值，但为了方便，我们通常不写出来）*或没有参数：setTime

##### TS 类型检查机制并不会检查 class 是否具有私有属性

请注意，以上的两个例子中，我们说接口中可以为 class 定义公共属性和公共方法，

这是因为：**接口描述的是类的公共部分**，而不是公共和私有两部分，TS 类型检查机制只会关注 class 中是否具有必要的属性，它并不会帮你检查 class 中是否具有某些私有成员。

即：class 中存在接口中不存在的属性，TS 类型检查机制并不会报错：

```ts
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date; // 如若不存在，则静态编译时报错。
  getTime:Date; // 接口中不存在该属性，但不会报错
}
```

### 类静态部分与实例部分的区别

#### 无法直接使用 class 实现存在构造器签名的接口

当你操作类（class）和接口（interface）的时候，你要知道类是具有两个类型的：

1. 静态部分的类型
2. 实例部分的类型

 你会注意到，当你试图定义一个类去实现一个存在构造器签名的接口时会得到一个错误：

```ts
interface ClockConstructor {
    new (hour: number, minute: number);
}

// error
class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
```

`class Clock implements ClockConstructor {...}`

Clock 类无法实现 ClockConstructor 接口，

因为它和 ClockConstructor 接口中的 new (hour: number, minute: number):any（any 是 TS 类型推断出来的）构造器签名不匹配，

而之所以不匹配的原因是因为：

**当一个类实现了一个接口时，只对其实例部分进行类型检查**，而 constructor 构造函数存在于类的静态部分，所以不在检查的范围内.

那么自然的，由于接口中存在一个构造器签名，但是对应的实现类中并未实现，所以 TS 类型检查机制就会报错。

~~请注意：ES6 中的 class 的 constructor 存在于类的 Prototype 原型对象空间中~~（**这是错误理解，往下看**），~~且在一个 class 中，若属性/方法前面存在 static 关键字，则称之为静态属性/方法，否则属性/方法都存于类的 Prototype 原型对象空间中。~~

所以我有点搞不懂（**已搞懂，往下看**）~~为啥 [TS 官方文档](https://www.tslang.cn/docs/handbook/interfaces.html)说 constructor 是存在于类的静态部分，它不是应该存在于类的 Prototype 原型对象空间中（实例部分）吗？~~ 

管他的，**就记住 TS 中的 class 的 constructor 方法存在于类的静态部分就完事了。** 2020-11-05 16:38 

**2020-11-8 0:19** => class 中的 constructor() 之所以存在于类的静态部分是因为：

`A.prototype.constructor` 指的是 class A本身，而非 constructor 函数；而 `A.constructor` 才指的是 constructor 函数本身。

所以我们说 constructor 实际上存在于类的静态部分，而非实例部分。

你可以详见此节：<a href='#将 TS 中的 class 编译成 JS'>将 TS 中的 class 编译成 JS</a>，该节会通过将 TS 中的 class 编译成 ES5 的形式告诉你，constructor 实际的样子以及为什么是存于类的静态部分

#### 直接操作静态方法去使得 class 另类的实现存在构造器签名的接口

通过以上示例，我们知道了当一个类实现了一个接口时，只对其实例部分进行类型检查，而这就会导致存于类的静态部分的 constructor 函数无法使用接口作为类型，那么需要怎么做，才能使得 constructor 函数使用接口作为类型呢？

通常我们使用的方法是：将某个【需要限制 constructor 函数的参数个数、类型和返回值类型的】类当作参数，传递给一个函数 A ，

并在该函数 A 对应参数上，使用你想要限制该类中 constructor 的接口作为限制类型，这样一来，你调用该函数 A 时并传入一个参数（一个 class）时，

TS 类型检查机制就会去检查你传递的参数是否为你指定的接口类型，假如你传递的一个 class 和你在函数参数上限制的接口类型不匹配，那么 TS 的静态分析（类型检查机制）就会提示错误。

需要注意的是：这种方法，需要定义两个接口：

1. 接口1是存放构造器签名的，即：该接口用来限制传递给函数的参数（一个 class）的类型，使得传递的参数（一个 class）强制符合构造器签名。

   下面示例的 ClockConstructor 接口。

2. 接口2是让 class （需要传递给函数的参数）去实现的，该接口主要用来定义公共属性和公共方法以及它们的各种限制等。

   下面示例的 ClockInterface接口。

这样，我们就绕过了 TS 不对 class 的静态部分进行检查的机制，

请思考以下示例：

```ts
interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick();
}
// 使用该函数去实例化类（new DigitalClock）
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
// 将类当作参数传递给会实例化它的 createClock 函数
let digital = createClock(DigitalClock, 12, 17); 
```

- ***function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {return new ctor(hour, minute);}***

  创建一个函数：createClock，该函数的目的是：使得 class 中的 constructor 函数也能够使用接口作为限制类型。

  这是因为若我们直接使用一个 class 去实现某个接口，那么该接口即使定义了构造器签名，

  class 中的 constructor（它属于 class 的静态部分） 也会因 TS 不对 class 的静态部分进行检查的机制从而跳过检查，导致 TS 类型检查时发现 class 中并没有实现接口的构造器签名，从而报错。***详见： <a href=#类静态部分与实例部分的区别>这里</a>*** 

  而通过以上示例的方法，我们就绕过了 TS 不对 class 的静态部分进行检查的机制。***详见解释：<a href='#直接操作静态方法去限制 class 的 constructor 的类型'>点这</a>***

  该函数的使用：通过传入正确的参数，在函数体中实例化 class（某个参数就是 class），并向 class 的 constructor 函数传递参数。

  - ***return new ctor(hour, minute);***

    ctor 变量指向的是是一个 class，在这里是指：DigitalClock 类

    即：实例化一个 DigitalClock ，并向 DigitalClock 中的 constructor 传递两个参数。

- ***class DigitalClock implements ClockInterface {}***

  我们除了规定 DigitalClock 类的类型为 ClockConstructor 接口之外*（通过调用 createClock() 函数，向它传递 DigitalClock  作为参数，并在该函数对应 DigitalClock  类的参数上限制这个参数类型为 ClockConstructor  接口类型即可）*，

  还规定了 DigitalClock 类型需要实现 ClockInterface  接口。

  - ***constructor(h: number, m: number) { }***

  constructor 限制类型为：ClockConstructor，

  因为当调用 createClock(ctor: ClockConstructor...)  并将 DigitalClock 类作为第一个参数时，

  DigitalClock 中必须实现了 ClockConstructor 接口中的构造器签名。

  值得一提的是：每个 class 都会默认存在一个 constructor 函数，即使不明确声明也是如此。

  所以当该 class 中不存在 constructor 时，就会默认声明一个 constructor，并被 TS 类型推断为一个合适的接口类型（在这里是：ClockConstructor）。

  如果是这样修改这个构造函数：`constructor(h: string, m: number) { }`，则 TS 会报错，

  这是因为：属性 h 类型为 string，无法分配给 ClockConstructor 接口中的构造函数签名的第一个参数类型：number

  调用 createClock(ctor: ClockConstructor...) 时，向该函数传递 DigitalClock 类作为第一个参数，而函数限制第一个参数的类型为：ClockConstructor 接口，

  所以会由于 DigitalClock 类中的 constructor 没有正确实现 ClockConstructor  接口中的构造器签名而报错。

- ***let digital = createClock(DigitalClock, 12, 17);*** 

  调用构造函数 createClock，并传入三个参数，第一参数传入的是一个 class：DigitalClock 类，

  由于 createClock 函数的第一个参数类型为 ClockConstructor，所以 TS 类型检查机制会检查 DigitalClock 是否符合 ClockConstructor 接口中的构造函数签名，

  也就是我们前面强调的：只要通过 createClock() 去实例化 DigitalClock 类，

  那么 DigitalClock 类就必须实现 ClockConstructor 接口和 ClockInterface 接口*（class DigitalClock implements ClockInterface {}）*，否则 TS 类型检查机制就会报错。

## 接口之间的继承

### 概念

我们知道 ES6 中，class 之间是可以靠 extends 关键字实现一个类继承另一个类的；而在 TypeScript 中，接口之间也可以靠 extends 关键实现一个接口继承另一个接口。

而接口之间的继承能够让我们能够从一个接口里复制成员到另一个接口里，使得我们可以更灵活地将接口分割到可重用的模块里。

并且接口之间可以使用 extends 关键字实现一个接口继承多个接口，而在 ES6 中，就无法这么做（***参见：[class 之间不存在多继承](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/Class/class%E7%9A%84%E7%BB%A7%E6%89%BF.md#class-之间不存在多继承)***），详见以下示例。

### 示例

#### 一个接口继承单个接口

```ts
interface Shape {
    color: string;
}

// Square 只继承了一个接口
interface Square extends Shape {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
```

当 Square 接口继承 Shape 接口后，Square 接口将会拥有 Shape 接口的所有成员。

#### 一个接口继承多个接口

```ts
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

// Square 同时继承了 Shape 和 PenStroke
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

当 Square 接口继承 Shape 和 PenStroke 接口后，Square 接口将会拥有 Shape 和 PenStroke 接口的所有成员。

## 混合类型——一个接口中存在多个类型

### 概念

看到这里，我相信你们都已经大致了解接口是什么、做什么用的，并且也知道了接口中存在哪些类型了，那么你肯定也想过：我能不能在接口中写多个类型，然后使用该接口作为限制类型的变量，必须实现这个接口中的多个类型？

即：你希望一个对象（指接口，***详见：<a href='#接口最基本的工作原理'> 接口最基本的工作原理）</a>***可以同时具有上面提到的多种类型，如：一个接口中既可以当然函数类型使用，又可以当做对象来使用，并且还带一个额外定义的公共方法。

答案是：当然可以这么做，一个接口中可以允许存在多个类型，通常我们这个接口称之为混合类型的接口。

详见以下示例。

### 示例

#### 既当作函数类型又当作对象来使用的接口

```ts
// Counter 接口既可以作为函数使用，也可以作为对象使用
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

#### 接口中不一定能允许存在各种不同的类型 ???

如：我们无法使得一个接口中既有可索引类型，又有函数类型，这是因为：

这两者是冲突的，你在接口中定义了一个函数类型和可索引类型，那么你要怎么使得一个变量使用该接口作为限制类型时，让该变量符合接口中的所有条件呢？

就算你使用一个字面量对象去使用该接口中的可索引类型，并使用属性函数的方式去使用函数类型，但是这是会报错的。

而你又不能不同时使用这两个类型，否则也会报错，所以函数类型的接口和可索引类型的接口无法混合。

```ts
interface A {
    [index: string]: string;
    (parm: string): string;
}

var obj: A

// error，obj 无法分配给索引签名：[index: string]: string;
obj = function (parm) {
    return 'string'
}

// error，obj 无法分配给  (parm: string): boolean;
obj = {
   // error，预期的声明，该函数无法分配给类型 string，这代表 TS 类型检查机制看都不看 函数类型 一样，直接判断这里属于的是索引签名。
   func(parm: string) {
        return 's'
    }
    name: 'yhw'
}
```

## 接口继承 class

### 概念

在上面的 <a href='#接口之间的继承'> 接口之间的继承</a> 一节中，我们讲到了接口可以继承另一个/多个接口，而本节中，我们将重点介绍：接口继承 class 类型。

和一个接口可以继承多个接口一样，接口除了可以**继承一个 class，还能继承多个class**，class 和 class 之间使用 `,` 分割即可。

当接口继承了一个 class 类型时，接口会**继承 class 的成员但不包括其实现**，就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样（但是如果 需要继承的 class 中就已经存在了具体的实现，那么接口中的实现要和它一致）

并且接口同样**会继承到 class 中的 private（私有的）和 protected（受保护的） 成员**，那么这同时意味着：当你创建了一个接口 A 继承了一个拥有【私有或受保护的成员】的 class B 时，就表明该【接口 A 只能被这个 class B 的子类所实现（implement）】

- 这是一个很简单的道理，若这个接口 A 被一个非 B 的子类（如：class C）所实现了，

  那么接口 A 继承的 class B 中的私有或受保护的成员必须也要在 class C 中实现，但是这是不可能的：因为私有或受保护的成员读属于 class B 或其子类，

  那么这就会造成冲突：class C 必须实现 class B 中的私有或受保护的成员，但却因为这些成员是私有或受保护的无法实现，所以 TS 类型检查机制就会报错。

值得注意的是：私有或受保护的成员不需要在接口实现它们，即：一个接口 A  继承了class B 中的 private（私有的）和 protected（受保护的） 成员时，然后 class B 的子类实现接口 A 时，并不需要去实现 class B 中的私有或受保护的成员，否则会报错，***详见：<a href='某个类的子类并不需要去实现这个类的私有/受保护的成员'>某个类的子类并不需要去实现这个类的私有/受保护的成员</a>***

具体原因***详见：<a href='#TypeScript 中的 class'>TypeScript 中的 class（类）</a>***

更多关于接口继承类的详见以下示例。

### 示例

#### 接口继承一个普通 class

当一个接口继承了一个普通 class 时，接口就好像声明了继承的 class 中的所有成员，包括其私有/受保护的。

```ts
class B {
    name: string;
}
interface Inter extends B {
    age: number
}
let obj: Inter = {
    age: 21,
    name: 'yomua',
    value: 'value'
}
```

#### 接口继承多个 class

```ts
class B {
    name: string;
     // 定义一个公共值，若有接口继承该 class，则该属性和属性值都是必要的，并且属性值必须为：'value'
    value: 'value'; 
}
class C {
    hobby: string
}
interface Inter extends B, C {
    age: number
}
let obj: Inter = {
    age: 21,
    name: 'yomua',
    hobby: 'girl',
    value: 'value' // value 属性的值必须为 value
}
```

#### 接口继承一个存在私有/受保护的 class

当接口继承一个存在私有/受保护的 class 时，那么该接口只能被这个 class 或它的子类实现：

```ts
class Control {
    private state: any; // 类中的私有成员
}

// ExtendControl 接口实现了存在 私有/受保护成员的 class
interface ExtendControl extends Control {
    select(): void; // 在接口中定义一个返回值类型为 void 的方法
}

// Button 为 Control 的子类，可以实现 ExtendControl 接口
class Button extends Control implements ExtendControl {
    select() { }
}

// Image 非 Control 的子类，所以无法实现 ExtendControl 接口
class Image implements ExtendControl {
    select() { }
}


```

- ***class Image implements ExtendControl {}***

  Image 无法实现 ExtendControl  接口，因为 ExtendControl  接口继承了一个存在私有成员的 class，该私有成员为：`state: any`

  TS 报错为：Image 错误地实现了 ExtendControl 接口，在 ExtendControl 接口中，`state` 属性是私有的，但是 Image 中的 state 属性不是。

  而 Control 的子类 Button，同样的实现 ExtendControl 接口，TS　编译器就不会报错。

- ***class Button extends Control implements ExtendControl {}***

  Button 继承了 Conrrol，成为了 Control 的子类，然后实现了 ExtendControl 接口，TS 编译器并不会报错。

#### 父类的子类不需要去实现父类的私有/受保护的成员，因为它们是共享的

父类的子类不需要去实现父类的私有/受保护的成员，因为它们是共享的，详见：TypeScript 中的 class

```ts
class A {
    private name: any
    protected o: any
}

interface Inter extends A {
    hobby: any
}

// class B 中不需要实现 class A 中的私有/受保护的成员
class B extends A implements Inter {
    hobby: 'girl'
}   
```

## 接口中使用自定义的类型作为声明的属性的类型

我们在一个接口中，除了使用系统内置类型（如：string、number 等）作为某个声明属性的的类型，也可以使用自己定义的类型，作为声明属性的类型，如：

```ts
interface A {
    name: 'yhw'
}

class B implements A {
    // name 的值必为 'yhw'
    name: "yhw";
}
```

以上例子中，我们很容易发现：接口 A 中声明了一个属性：name，且类型是开发者自定义的一个使用确切值的类型，所以当 class B 要实现接口 A 时，其 class 中实现的接口 A 的 name 属性的值必须为 'yhw'

注意：虽然我们可以使用另一个接口来限制接口 A 中的 name 属性的类型，但是这似乎没多大意义：

```ts
interface B {
    name: 'yhw'
}
interface A {
    // 使用接口 B 来限制接口 A 中的 name 属性的类型。
    name: B
}
class C implements A {
    name: B;
    name: 'yomua'; // error
}
```

以上例子中，我们在接口 A  中，使用接口 B 来限制 name 属性类型，然后使用 class C 去实现接口 A，但是我们在实现时，仍然只能使用接口 B 作为 name 的类型，而不能是具体的值，否则报错：

class C 中的 name 无法分配给 interface A 中的 name，因为：'string' 类型的 name 属性无法分配给 B 类型的 name 属性。

# [CN-type(old)](https://www.tslang.cn/docs/handbook/advanced-types.html)、[知乎](https://zhuanlan.zhihu.com/p/131393833) | [EN-type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)、[EN](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html)

`type` 类似接口，但是和接口又有些不同，`type` 可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型，而 `interface` 不行。

```tsx
// 类型别名定义类型时，必须使用 =，而 interface 不能使用 = 
type Second = {} // okay
type Second  {} // error '=' expected
```

```ts
// 类型别名可以做如下形式书写，而 interface 不行。
type Second = number;　// 将 Second 的类型设置为 number
let time: Second = 10;
let t: Second = '10'; // error  Type 'string' is not assignable to type 'number'.ts(2322)
```

```tsx
// 接口似的类型别名
type Source = {
    value: number
    name: string
    prop: object
}

let obj: Source
obj = {
    value: 1,
    name: "string",
    prop: { '': '' },
}
```

```tsx
// 类型别名可以使用泛型
type Tree<T> = {
    value: T,
    name: T,
    hobby: T,
}

let obj: Tree<string>;
obj = {
    value:'1', // okay
    //  若 value 为以下值
    value: 1, // error Type 'number' is not assignable to type 'string'.
    name:'Yomua', // okay
    hobby:'girl', // okay
}	
```

# [type 和 interface 区别](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript#comment124468641_37233735) 
