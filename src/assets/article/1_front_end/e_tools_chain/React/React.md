# 快速开始

1. `yarn create @umijs/umi-app`
2. `yarn` / `yarn install`
3. `yarn start`

以上三步即可开始一个简单的 react 项目（使用 [umi 脚手](https://umijs.org/zh-CN/docs)架配置），当然或你愿意使用 [CRA（Create-React-App）](https://create-react-app.dev/docs/getting-started)，步骤为：

1. `yarn create react-app your-project-name`
2. `cd your-project-name`
3. `yarn start`

- TIP：你可以使用 `npm run eject` 显示使用 React  [create-react-app](https://create-react-app.dev/) 脚手架的配置。

  简单说明：

  1. **entry**

     src/index 

  2. **output**

     ./build 

PS：建议使用 `yarn` 作为管理工具 -> `npm i yarn -g`

# 环境配置

- [使用 Babel 编译 JSX](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/FrontEndToolsChain/library/babel/babel.md#babel-%E4%B9%8B-jsx-%E4%B8%8E-react)

- 在 VSCode 中 下载 `React-Native/React/Redux snippets for es6/es7` 插件——一键生成react代码块以及快速补全react代码、

  `React Native Tools`——代码提示、

   `One Dark Pro` 对 VSCode 主题以及其中代码进行美化

# 什么是 React？

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库，当然，你可以将它称之为框架。

我们可以通过使用 React 可以将一些简短、独立的代码片段进行组合，使之成为更复杂的一个集合，我们将这些组合起来的代码片段称之为——组件。

如果你熟悉 Vue，那你对组件一定不陌生，React 中的组件概念和 Vue 中的组件概念实际上是类似的，只不过它们的实现方式各有不同——

Vue 2.x 中使用的是模板语法（通常通过 template 属性）/使用 `.vue` 文件，而 React 可以在 JS 中通过使用 JSX 来更清晰的表达 HTML

下面跟着我的脚步，一起来看看吧。



# 函数式组件 和 Class

## [Class 组件的生命周期](https://juejin.cn/post/6845166891711856654)转为函数式组件（按照先后顺序）或[对应到 HOOK](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks)

### render

Class 组件的 render 就相当于整个函数式组件的执行，如：

```tsx
class A extends React.Component {
    render() {
        console.log('会执行')
        return xx
    }
}
// 相当于
const A = () => {
    console.log('会执行')
    return xx;
}
```



### componentWillMount

`componentWillMount` 在函数式组件中，相当于在 return 前，如：

```tsx
class A extends React.Component {
	componentWillMount() {console.log('组件挂载前执行')}
    render() {return xx}
}
// 相当于
const A = () => {
    console.log('组件挂载前执行')
    return xx;
}
```

### componentDidMount

相当于 [useEffect() Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)

```tsx
class A extends React.Component {
	componentDidMount() {console.log('组件挂载完成后执行')}
    render() {return xx}
}
// 相当于
const A = () => {
    // useEffect 相当于：componentDidMount、componentDidUpdate 、componentWillUnmount
    useEffect(()=>{console.log('组件挂载完成后执行')},[1]);
    return xx;
}
```

### [componentWillUpdate](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillupdate) （过时的）

xxxx暂未有结果xxxx

### [componentDidUpdate](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate) 

```tsx
class A extends React.Component {
	componentWillUnmount() {console.log('组件更新完成后立即执行，首次渲染不会执行')}
    render() {return xx}
}
// 相当于
const A = () => {
    // useEffect 相当于：componentDidMount、componentDidUpdate 、componentWillUnmount
    useEffect(()=>{console.log('组件更新完成后立即执行')},[1]);
    return xx;
}
```

### componentWillUnmount

```tsx
class A extends React.Component {
	componentWillUnmount() {console.log('组件卸载前执行')}
    render() {return xx}
}
// 相当于
const A = () => {
    // useEffect 相当于：componentDidMount、componentDidUpdate 、componentWillUnmount
    useEffect(()=>{console.log('组件卸载前执行')},[1]);
    return xx;
}
```



# React 中使用其他东西

## React 中使用 Icon

要在 react 中使用 icon，先下载对应的 icon.js，如：[Iconfont](https://www.iconfont.cn/) 中下载的 Symbol 的使用。

然后需要在**入口文件**中导入 iconfont.js（import './inonfont.js'），最后再正常使用即可。

## [React 中使用 TypeScript](https://create-react-app.dev/docs/adding-typescript)以及 Pit

### CRA 新建项目添加 TS 

```bash
npx create-react-app my-app --template typescript
# 由于 create-react-app 已经不支持全局安装，所以以下命令可能会错误
create-react-app my-app --template typescript
```

### 现有使用 CRA 项目添加 TS

```bash
npx create-react-app my-app --template typescript

# or

yarn create react-app my-app --template typescript
```

### Pit

### 在向现有 CRA 项目添加 TS 后，导入图片报错

在 src 目录中，添加：`index.d.ts` 文件，并在其中书写：`declare module '*.png';`。

注：你应该可以为任何不同的图片后缀名使用这种方式，使得图片可以导入。

### [Property 'xxx' does not exist on type 'Readonly<{}>'](https://stackoverflow.com/questions/47561848/property-value-does-not-exist-on-type-readonly) 

# 注意项

## 不要直接将这样形式的 \<xx /> 组件作为函数的返回值

```tsx
const A = () => <div>A</div> // no
const func = () => <A /> // no
```

假如一个**函数**的返回值是 `<ComponentName />` or `<xx><xx/>` 这样的形式，那么你使用该函数时，会得到一个对象。

这是因为 React 编译时，会将 `<xx/>` 编译为：`React.createElement(type,[props],[...children])`，它会返回一个对象用来描述组件的信息。

```tsx
console.log(func()); 
// {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}
```

虽然你可以这样使用：`<func />`，但这是使用自定义组件的方式，它已经丢失了函数的用途。

上述示例可以改成：

```tsx
const A = () => <div>A</div> // 保持不变
const func = () => { // 高阶组件
	const OtherA = () => <A />
  return OtherA;
}
const NewComponent = func(); // 能得到一个新组件
```

这样我们就能通过函数的形式获得一个组件。

如果你足够仔细，你会发现如果将以上错误的高阶组件的变量名改成大写，它就神奇的成为了一个正确的组件=>

```tsx
 const Func = () => <A /> // 正确的
```

- 这是<a href='#[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html) | [React-小书](http://huziketang.mangojuice.top/books/react/lesson28) '>高阶组件</a>的用法。

## useEffect 的顺序很重要

如果你使用两个 useEffect() 并监听同样的值，则对于 React 来讲，它们会有先后顺序的执行，先写的先执行，后写的后执行。

若不知道这个规则，很容易出现不可预料的 Bug.

# 组件触发更新的条件

据目前（2021-01-20）所知，会让 React 组件更新的方式有以下几种：

1. [this.setState()](https://zh-hans.reactjs.org/docs/react-component.html#setstate) | [useState()](https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate) 

   [setState 实际做了什么](https://zh-hans.reactjs.org/docs/faq-state.html) 

2. [useReducer() 的 dispatch](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer) 

3. 子组件因父组件重新渲染而重新渲染

4. [forceUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#forceupdate) 

当然，有时候我们并不想让子组件随着父组件更新就更新，而是只有当 props 发生改变时才更新或永远不更新，这时候我们可以在子组件使用：[shouldComponentUpdate()](https://zh-hans.reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action) 来判断在什么条件下才去更新子组件。

- Tips: shouldComponentUpdate() 返回 false 时并不能保证一定能使当前组件不更新，且 props 和 state 发生改变，该函数都会在 render 之前调用。

并且当组件更新时，React 会采用 [Diff 算法](https://zh-hans.reactjs.org/docs/reconciliation.html)去对比新组件和旧组件的差别，从而决定更新哪部分。而不是只要组件存在更新，就直接删除旧 DOM，然后插入新 DOM.

子组件通过 props 的更改触发更新，通常是因为父组件主动更改了向子组件传递的 props（对于父组件来说这通常是 state），而这种更改通常也会触发父组件重新渲染，所以子组件通过 props 的更改触发更新也可以认为是因为父组件重新渲染而更更新的，当然了，我们可以通过 [shouldComponentUpdate()](https://zh-hans.reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action) 来判断在什么条件下才去更新子组件。



