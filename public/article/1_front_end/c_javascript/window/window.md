# [Window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)

Window 是一个接口，并不是构造函数，所以它不能使用 `new` 去实例化。

- 为什么它是一个接口？可能它挂载了太多可以由使用者实现的方法了吧，而且还支持使用者能通过 `var` 去声明变量，将此变量挂载到 `window`  对象上。
  
  如：`window.location` 实际上 `location` 属于浏览器（BOM）自己的实现，而每一个浏览器的实现细节可能有些许不同。
  
  如：`var `
