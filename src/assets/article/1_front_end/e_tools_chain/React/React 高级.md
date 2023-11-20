## 术语

- 根元素：这里指 React 挂载的根元素，比如：
  `<div id='root'></div>`
- html 元素：指页面的 html 元素。

# React 合成事件

React 16 及 16 之前，都会将原生事件委托到 document 上统一处理，在 17 及 17 之后，是委托到根元素（`<div id='root'></div>`）上统一处理。

## React 17 - React 18 合成和原生事件的执行顺序

原生事件将会先冒泡执行，直到（不包括） React 根元素（（`<div id='root'></div>`） ，然后再冒泡执行合成事件，最后再从根元素（包括）冒泡执行，直到 html. 	参考在线例子：[React 合成事件和原生事件](https://codesandbox.io/s/react-he-cheng-shi-jian-he-yuan-sheng-shi-jian-mgs9gv)。

注意：我们可以认为，在 react 18 中，其事件执行是：先冒泡执行所有原生事件，然后再冒泡执行所有合成事件（毕竟 React 所有东西都在根元素里面，所以对根元素不做计算）

## 使用 stopPropagation 和 stopImmediatePropagation

合成事件中没有 `e.stopImmediatePropagation();`，会报错。

合成事件中使用 `e.stopPropagation();`

- 阻止合成事件往上冒泡，不会阻止原生事件冒泡

合成事件中使用 `event.nativeEvent.stopPropagation();`

- 只会阻止原生事件冒泡根元素（不包括）之上的祖先元素（比如 html），
  在冒泡到根元素之前（包括根元素）是不会被阻止的。

合成事件中使用 `event.nativeEvent.stopImmediatePropagation()`

- 阻止原生事件冒泡到 React 的根元素（包括根元素）

## 合成事件和原生事件的对比

合成事件的优点：

- 更好的兼容性：抹平浏览器之间事件的差异性。
- 更好的性能：通过事件委托（委托到 React 根元素），减少在子元素注册事件处理器的数量，从而减少内存开销，并且也因此能增加页面初始化速度。
  即：不用为多个元素绑定事件，而是只需要在 React 根元素上处理。
- 开发的一致性：在写组件时，我们可以用同样的语法来定义事件处理器。
- React 17 删除了事件池，所有我们可以直接通过事件处理函数的参数 event 就能获取到所有事件对象。
  在 React 17 （不包括）之前，需要调用 `event.persist()` 才能得到事件对象，否则值都为 null. 

## Reference

- [合成事件](https://zh-hans.react.dev/reference/react-dom/components/common#react-event-object) 
- 在线例子：[React 合成事件和原生事件](https://codesandbox.io/s/react-he-cheng-shi-jian-he-yuan-sheng-shi-jian-mgs9gv)。

# React Fiber

## Reference

- [React Filter 原理](https://medium.com/starbugs/react-%E9%96%8B%E7%99%BC%E8%80%85%E4%B8%80%E5%AE%9A%E8%A6%81%E7%9F%A5%E9%81%93%E7%9A%84%E5%BA%95%E5%B1%A4%E6%9E%B6%E6%A7%8B-react-fiber-c3ccd3b047a1) 