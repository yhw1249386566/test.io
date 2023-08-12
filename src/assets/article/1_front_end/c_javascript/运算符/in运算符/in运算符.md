# [in运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)

## 描述

in运算符是一个非常简单的运算符,它会返回一个Boolean值.

in运算符表示:如果指定的属性*(一个字符串或symbol类型的值)*存在于指定的对象或该对象的原型链中,

则in运算符会返回一个true,若不存在,则返回false.

需要注意的是:in运算符的右边一定是一个对象,否则会报错.

## 语法

`property in object`

### 参数解析

#### property

一个字符串类型 | symbol 类型  | 数组索引 的属性,对于非这三种类型的值来说,in运算符会强制将property转为字符串类型.

PS:数组索引也可以被当作属性名使用,即表示当前对象或其原型链中是否存在指定的索引. 且如果指定的对象为数组,那么指定的属性一定只能是索引,而不是能是索引值,***详见:示例 - in运算符使用于数组***

#### object

一个对象: 检查该对象或其原型链中是否包含指定的属性名.

## 示例

### in运算符使用于数组

如果指定的对象为数组,那么指定的属性一定只能是索引,而不是能是索引值,否则会报错.

PS:数组是特殊的对象 => typeof array ; // object

```js
    let arr = ['a', 'b', 'c'];
    '0' in arr;  // true
     0 in arr;   // true
    'a' in arr;  // false
```

### in运算符可以检测属性是否属于某个对象

```js
let arr = ['a', 'b', 'c'];
'length' in arr;        // true
Symbol.iterator in arr; // true
```

- ***Symbol.iterator in arr; // true***

  使用in运算符也可以判断一个对象是否实现了可迭代协议和迭代器协议,***参见<迭代器和生成器以及协议.md>***

### in运算符检测某个属性是否属于对象的原型链中

```js
"toString" in {}; // 返回true
```

object的toString()方法存于原型链上的,即: [Object.prototype.toString();](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)

### in运算符检测某个属性是否属于内置对象

```js
// 内置对象
"PI" in Math          // 返回true
```

### in运算符右侧必须为一个对象,否则报错

```js
let color1 = new String("green");
"length" in color1 // 返回true
let color2 = "yomua";
"length" in color2 // 报错(color2不是对象)
```

Uncaught TypeError:Cannot use 'in' operator to search for 'length' in yomua

### in运算符用于检测被删除的对象的属性是否还存与对象中

```js
    let arr = ['a', 'b', 'c'];
    delete arr[0]
    console.log(arr); // [empty, "b", "c"]
    console.log(0 in arr); // false

    arr[0] = undefined;
    console.log(arr); // [undefined, "b", "c"]
    console.log(0 in arr); // true
```

- 如果你使用 delete 运算符删除了一个属性，则 `in` 运算符对所删除属性返回 false。
- 如果你只是将一个属性的值赋值为[`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，而没有删除它，则 in 运算仍然会返回true。

