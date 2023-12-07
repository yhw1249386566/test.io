



# Reference

- [官方文档翻译](https://segmentfault.com/a/1190000039366485)

# \<Route />

## [render prop](https://segmentfault.com/a/1190000039366485#item-14-63)

- [React 中有关 render  prop 的知识](https://zh-hans.reactjs.org/docs/render-props.html)

react-route-dom 使用 \<Route /> 的 render prop 时，render 函数将会作为 prop 传递到 \<Route /> 组件内部，在该组件内部会调用 render 函数并向之传入一个对象，

该对象是 <*Route* /> 自己本身的一些信息，至少存在这三个属性：history，location ，match.

```tsx
import { Route } from 'react-router-dom';
<Route
	path='/'
    location={ {...} }
    render={props => <ComponentA ...props/>}
/>
```

- [history](https://segmentfault.com/a/1190000039366485#item-17) 
- [location](https://segmentfault.com/a/1190000039366485#item-18) 
- [match](https://segmentfault.com/a/1190000039366485#item-19) 

# [react-router-dom 和 react-router](https://github.com/mrdulin/blog/issues/42)

`react-router-dom`依赖`react-router`，所以我们使用`npm`安装依赖的时候，只需要安装相应环境下的库即可，不用再显式安装`react-router`。基于浏览器环境的开发，只需要安装`react-router-dom`；

`npm`会自动解析`react-router-dom`包中`package.json`的依赖并安装。

`react-router-dom`中`package.json`依赖:

```
"dependencies": {
    "history": "^4.7.2",
    "invariant": "^2.2.2",
    "loose-envify": "^1.3.1",
    "prop-types": "^15.5.4",
    "react-router": "^4.2.0",
    "warning": "^3.0.0"
  }
```

安装了`react-router-dom`，`npm`会解析并安装上述依赖包。可以看到，其中包括`react-router`。

























