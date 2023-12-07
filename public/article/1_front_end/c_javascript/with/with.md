# [with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with) 

## 概念

with 语句扩展一个语句的作用域链。

TIP：建议不使用 with，难查错，且有性能和语义上的弊端，参见：[性能利弊](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with#%E6%80%A7%E8%83%BD%E6%96%B9%E9%9D%A2%E7%9A%84%E5%88%A9%E4%B8%8E%E5%BC%8A)，[语义不明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with#%E8%AF%AD%E4%B9%89%E4%B8%8D%E6%98%8E%E7%9A%84%E5%BC%8A%E7%AB%AF) 

## 语法

```js
with (expression) {
    statement
}
```

- expression

  将给定的表达式添加到 `{ }` 的 作用域链上。表达式周围的括号是必需的

- statement

  任何语句。要执行多个语句，请使用一个[块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)语句 ({ ... })对这些语句进行分组。

## 示例

```js
let a, x, y;
let r = 10;

with (Math) { // 可以直接在这个作用域中使用 Math 对象的相关所有属性，包括在 prototype 上的。
  a = PI * r * r;
  x = r * cos(PI);
  y = r * sin(PI / 2);
}
```

