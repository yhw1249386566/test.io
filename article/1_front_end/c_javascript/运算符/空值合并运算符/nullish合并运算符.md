# `??` nullish合并运算符

## 描述

nullish合并运算符又称空值合并运算符,它是一个逻辑运算符,其运算符符号位: `??`

 空值合并运算符的作用是: 当左侧操作数为 null 或 undefined 时，就返回右侧的操作数,否则直接返回左侧的操作数. `a ?? b` =>若a为null/undefined,则返回b,否则返回a.

空值合并运算符看上去和[逻辑或(||)运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators#Logical_OR_2)有些类似,但是实际上是不同的,逻辑或会在左操作数为假值时返回右侧操作数,而不是为null/undefined.

这就导致如果使用逻辑或运算符为一个变量赋予默认值,则可能会产生预料之外的后果,如:赋予变量的值是 0 | '' | NaN | null | undefined,

即任何假值都不会被返回 => `let x = 0或''或 NaN或null或undefined || 默认值`,x将不会等于这五个*(假)*值,而是会等于默认值. 

- ***详见: 示例 - 为变量赋默认值***,

  若你对逻辑或运算符生疏,***请参见:<逻辑运算符.md>***

## 语法

`leftExpression ?? rightExpression`

## 示例

### 为变量赋默认值

#### 使用逻辑或运算符为变量赋于默认值

早在其不存在nullish合并运算符时,开发者想为一个变量赋予默认值,通常使用的是逻辑或运算符(||):

```js
let x = y || 1;
console.log(x); // 若y为假值,则x=1,否则x=y.
```

然后使用逻辑或运算符为某个变量赋予默认值这种行为,是非常危险的,因为对于逻辑或运算符来说,如果左操作数y为假值(如:`0`，`''`，`NaN`，`null`，`undefined`)

那么都不会被返回,而是返回右操作数,这就导致如果你将 `0, '', NaN`作为有效值,就会出现不可以意料的后果,因为这些值并不会被返回.

#### 使用空值合并运算符为变量赋于默认值

而空值合并运算符 `??`可以避免这些陷阱*(除非你将null或undefined作为有效值)*,下面来看看基于空值合并运算符,为变量赋于默认值的例子:

```js
let x = y ?? 1;
console.log(x); // 若y为null/undefined,则x=1,否则x=y.
```

通常来说,开发者更愿意使用空值合并运算符来为一个变量赋予默认值.

### 空值合并运算符是短路运算

`??`运算符和`|| 逻辑或`及 `&&逻辑与` 操作符相似，当左表达式不为 null 或 undefined 时，不会对右表达式进行求值。

```js
    let a = 0;
    let x = 'yomau' ?? ++a;
    console.log(a); // 0
	console.log(x); // yomua
```

### `??`运算符不能直接与 AND 或 OR 操作符共用

使用 `??` 运算符直接和 逻辑与（`&&`）和逻辑或（`||`）操作符组合是不可取的。这种情况下会抛出 SyntaxError。

```js
let x = a || b ?? c;
let y = a ?? b && c
console.log(x); //UncaughtSyntaxError:Unexpectedtoken '??'
```

但当使用括号来显式表明优先级时是正确的：

```js
(null || undefined ) ?? "foo"; //  "foo"
```

### 空值合并运算符和可选链运算符

由于 `??`和 `?.`运算符它们都和null/undefined有关系,所以如果将这两个运算符连起来用会达到一种很好的效果,如:

当访问对象的某个深层次属性时,在一系列引用过程中,如果某个引用的属性的值为null或undefined,则我们可以使用 `??`运算符为这整个语句赋予默认值,而不必让它返回undefined,如:

```js
    let userInf = {
        name: 'yomua',
        age: '21',
        details: {
            city: '成都',
            hobby: 'girl',
            love: {
                one: 'yhw',
                two: 'yomua'
            }
        }
    }

    let loveHuman = userInf.details?.love?.one ?? 'me';
    console.log(loveHuman); // yhw
```

- ***userInf.details?.love?.one ?? 'me';***

  这个赋值语句巧妙的使用了 `??`和 `?.`运算符,表示: 若在这条链上的引用的属性有一个为null或undefined,则这个语句的值将会返回me这个默认值.

# `??=` 逻辑空赋值

当表达式的值为 `null` 或 `undefined` 时，进行赋值。

```js
let a = null
a ??= 'yomua' // a 的值现在为 yomua
```

