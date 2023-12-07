# 基本使用

## JSX 中使用数组

在 JSX 中，如果你往 `{}` 放一个数组，则 React 会优秀的将数组里面一个个元素罗列并且渲染出来。

PS：这是因为浏览器特性。

即：若你把数组插入/添加到任何一个 HTML DOM 中， 那么该数组的值将会自动地被浏览器一一渲染。

```html
<body>
    <div></div>
</body>
<script>
    document.querySelector('div').innerHTML=[1,2,3,4]
</script>
```

- 浏览器将自动的把数组渲染为：1,2,3,4
  
  TIP：对象并不支持这种“取值渲染”，如果强制把对象插入到 DOM 中，浏览器会进行转换为：[object object]

参见：[更多](http://huziketang.mangojuice.top/books/react/lesson13) 

## 自定义组件

自定义组件的名字开头必须大写，和 HTML 内置元素区分，且实际上由于 JSX 语法上更接近 JavaScript 而不是 HTML，

所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定。例如：JSX 里的 `class` 变成了 [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)，而 `tabindex` 则变为 [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)；

还有个原因是因为 JSX 会被编译成 JS 对象结构的形式，所以在 JSX 中书写如：class（html 中表类名）、for（html 中标关联） 这些 JS 的关键字时，需要改成 className、htmlFor；而其他并非 JS 关键字的 HTML 属性则就可以直接写，如：id、data-\* 等；

且在使用 class 去实现组件时，必须继承 React.Component（或 [React.PureComponent](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent)），如：

参见：[此处](https://www.lagou.com/lgeduarticle/93368.html) 

```react
class Hello extends React.Component
```

## 组件内部的 render()

我们在一个组件内部可以直接使用其他组件，React 会自动地将你使用的组件的  render 方法返回的 JSX 渲染到对应位置，最后将所有组件（经过编译成 JS 对象结构后）渲染成 DOM 树且渲染进入根节点中。

## React 事件

[React 事件](https://zh-hans.reactjs.org/docs/handling-events.html)的命名采用小驼峰式（camelCase），而不是纯小写。使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件内部（即：当前所属的 class），这个对象被称之为 “props”。

## state 和 props

### [props](https://zh-hans.reactjs.org/docs/components-and-props.html)

#### 概念

[如何向组件传递 props 中的参数](http://huziketang.mangojuice.top/books/react/lesson11)：

组件所属的 class 中的 constructor(props) 接收第一个参数作为 props，通过在 使用组件的地方（JSX 标签中）向组件所属的 class 传递的任何键值对，都会作为 props 中的键值对，包括子组件（children）转换的单个对象（利用[组合组件](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)（[组合组件](https://zh-hans.reactjs.org/docs/components-and-props.html#composing-components
)）的方式，向组件的 props.chidlren 传递另一个组件作为数据），即：props 将包含传递过来的所有参数，而不是参数替换掉 props 作为组件的形参。

当你使用 class 作为组件的定义时，class 中的 constructor() 的第一个参数会接收一个 props：当前使用这个 class 名字（组件名）作为 JSX 时，在这个组件名作为的 JSX 上所书写的属性（attributes）以及子组件（children）转换的单个对象。

```react
class Welcome extends React.Component {
  // props 将接收 <Welcome name="Yomua" /> 上的 name="Yomua" 作为键值对。 注意：props 定义在实例上。
  constructor(props) {
    super(props)
  }
  render() {
     // 使用 this.props 访问 props
     return <h1>Hello, {this.props.name}</h1>;
  }
}

// 向 Welcome 组件所属的 class 的 constructor(props) 中传递 name="Yomua" 作为 props 的键值对。
const element = <Welcome name="Yomua" />;
ReactDOM.render(element, document.getElementById('root'));
```

注：有意思的是，即使显式声明了 constructor()，也可以不接收 props 作为参数，不写 super(props)，但是依然能够在 `render` 和其它方法中访问 `this.props`，如：

```react
class Welcome extends React.Component {
  // props 可写可不写
  constructor(props) {
    super()
  }
  render() {
     // 以然能访问 this.props
     return <h1>Hello, {this.props.name}</h1>;
  }
}

// 向 Welcome 组件所属的 class 的 constructor(props) 中传递 name="Yomua" 作为 props 的键值对。
const element = <Welcome name="Yomua" />;
ReactDOM.render(element, document.getElementById('root'));
```

这是因为什么？其实 **React 在调用你的构造函数之后，马上又给实例设置了一遍 `props`**：

```react
// React 内部
const instance = new YourComponent(props);
instance.props = props;
```

因此，即便你忘了把 `props` 传入 `super()`，React 依然会在事后设置它们。这是有理由的（这里只做一个解释）

但是为了不必要的麻烦，请依旧使用 `constructor(props){super(props)}` 的写法，参见：[此处](https://juejin.cn/post/6844903729980768269)-[原文](https://overreacted.io/why-do-we-write-super-props/)

#### 在组件标签中（JSX）书写键值对，从而向组件所属的 class 传递 props   中的参数

在使用一个组件的时候，可以**把参数放在标签的属性当中，所有的属性都会作为 `props` 对象的键值**：参见：[React 小书](http://huziketang.mangojuice.top/books/react/lesson11)

注：你可以向组件中传入任务正确的值，如：函数、对象、数组等。

```react
class Index extends Component {
  render () {
    return (
      <div>
        <!-- likedText 和 unlikedText 将会被当做对象的键值对传入 LikeButton 组件 -->
        <LikeButton likedText='已赞' unlikedText='赞' />

        <!-- 在 {} 中嵌入对象（这可不是 Vue 中的 mustache 语法） -->    
        <LikeButton wordings={{likedText: '已赞', unlikedText: '赞'}} />    

        <!-- 传递函数给 LikeButton 组件 -->
         <LikeButton onClick={() => console.log('function')}/> 
      </div>
    )
  }
}
```

在组件所属的 class 中（某个 class 组件）使用 static 为 class 添加静态属性，则相当于向该组件内部（class 的 constructor）传递键值对，我们可以利用这个机制，高效且易阅读的方式去赋予组件默认值：

```react
class LikeButton extends Component {
  /**
   * 向组件自传递一个 defaultProps 对象
   * 相当于：为 LikeButton 组件赋予一个默认值
   */
  static defaultProps = {
    likedText: '取消',
    unlikedText: '点赞'
  }

  constructor () {
    super()
    this.state = { isLiked: false }
  }

  handleClickOnLikeButton () {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render () {
    return (
      <button onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isLiked
          ? this.props.likedText
          : this.props.unlikedText} 👍
      </button>
    )
  }
}
```

#### props 不可变（可通过重新渲染再传值的方式改变）

`props` 一旦传入进来就不能改变。

即：你不能改变一个组件被渲染的时候传进来的 `props`。React.js 希望一个组件在输入确定的 `props` 的时候，能够输出确定的 UI 显示形态。如果 `props` 渲染过程中可以被修改，那么就会导致这个组件显示形态和行为变得不可预测，这样会可能会给组件使用者带来困惑。

但这**并不意味着由 `props` 决定的显示形态不能被修改**。组件的使用者可以**主动地通过重新渲染**的方式把新的 `props` 传入组件当中，这样这个组件中由 `props` 决定的显示形态也会得到相应的改变。

#### Reference

- [React 小书 - 配置组件的 props](http://huziketang.mangojuice.top/books/react/lesson11)
- [React 官网 - props 的使用](https://zh-hans.reactjs.org/docs/components-and-props.html#rendering-a-component)

### [state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)

#### 概念

state 可以算是包含 props 的概念，这是因为我们可以把 props 赋值给 state 中的 key。

且 state 是需要在子类的 constructor 中去进行初始化的。

注意：构造函数是唯一可以给 `this.state` 赋值的地方

```react
<!-- 将 props 迁移到 state 前 -->
class Hello extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>{this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

<!-- 将 props 迁移到 state 后 -->
class Hello extends React.Component {
  constructor(props) {
    super(props);
    // 初始化 state
    this.state = {
        date: new Date(),
        name:'yomua'
    };
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
         <h2>{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

注：通过向内置的 this.setState() 方法传递传递新的对象去改变组件所属的 class 中的的 state 时，这个新的对象并不会覆盖掉组件的 state 对象，而是只会做“合并”操作，

即：传入的新对象中的属性名（key）若和组件的 state 对象的属性名（key）相同，则新对象的属性值（value）将覆盖组件 state 对象中对应的属性值（value），

也就是说：state 对象中的属性值将被更新，而 state 中其他的 key:value 并不受影响，如：

```react
// NameForm 是一个有状态的组件
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    // NameForm 组件初始化 state
    this.state = {
        value: '',
        name:'yomua'
    };
    // 将 NameForm 的实例（this）永久绑定至对应的方法上。
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    /**
     * 通过向内置的 this.setState() 传递新对象去更新 state，
     * state 中若和新对象中的 key 相同，则新对象的值将覆盖 state 对象 key 对应的 value，且 state 对象的其 key:value 不受影响。
     */
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    //
    console.log('this.state.name 并没有被新对象覆盖：' + this.state.name)
    console.log('用户输入的值为：'+this.state.value)
    // 阻止当前事件的默认动作发生。
    event.preventDefault();
  }

  render() {
    return (
      // 受控组件
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
```

#### [正确使用 state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)

#### Reference

- [React 小书 -  组件的 state 和 setState](http://huziketang.mangojuice.top/books/react/lesson10) 
- [React 小苏和- state vs props](http://huziketang.mangojuice.top/books/react/lesson12)
- [React 官网 - 正确使用 state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html#using-state-correctly) 

### setState(object | function)——[组件状态](https://zh-hans.reactjs.org/docs/faq-state.html)——[API](https://zh-hans.reactjs.org/docs/react-component.html#setstate)

#### :triangular_flag_on_post: 称呼规定

- **重新渲染**：重新调用组件的 render() 。
  
  这不会使该组件重新完整经历一边生命周期，这太消耗资源了。
  
  - 在 setStateAction（函数组件的 setState()）后，将会完整执行这个函数（即：组件），包括 return.
  
  当然了，这会触发 [componentWillMount](https://zh-hans.reactjs.org/docs/react-component.html#unsafe_componentwillmount)（过时的 API）等相关的生命周期函数。

#### 语法

setState(object|Function [, callback])

- object，详见：<a href='#[传入对象](http://huziketang.mangojuice.top/books/react/lesson10#setstate-接受对象参数) '>传入对象</a> 

- Function，详见：<a href='#[传入函数](http://huziketang.mangojuice.top/books/react/lesson10#setstate-接受函数参数) '>传入函数</a> 

- callback 可选
  
  该 callback 将在 `setState` 完成合并并重新渲染组件后执行。
  
  通常，我们建议使用 `componentDidUpdate()` 来代替此方式。

#### 什么是 setState?

- 第 2 个参数我们暂不考虑。

setState() 是 React 内置的一个方法，它接受一个对象或函数作为参数，且 setState() 是异步的，所以你可能会需要向它传递一个函数，使得 state 可以同步进行更新。

```react
// setState warning
// DO NOT USE
this.setState({
  count: this.state.count + 1
});
```

- 以上示例看起来没错，并且不会抛出语法错误，可能你在某一些地方还能看到使用这样的示例，但这并不是非常正确，除非你很想这么做。
  
  因为这没有考虑到 setState() 是异步的特性，这很可能会抛出一个 state 数据错误。

#### setState 的作用

`setState` 作用大致为以下三点：

1. `setState` 会将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。

2. `setState` 是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式。

3. 为了更好的性能，React 会延迟调用 `setState` ，然后一次更新多个组件。
   
   > 注：React 并不会保证 state 的变更会立即生效；

基于以上 3 点，你应该将 `setState` 视为***请求***而不是立即更新组件的命令。

也是如此，`setState()` 并不总是立即更新组件，它会批量推迟更新。

这使得在调用 `setState()` 后立即读取 `this.state` 成为了隐患。为了消除隐患，请使用：

1. [`componentDidUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate) 中读取 state
2. 向 `setState` <a href='#[传入函数](http://huziketang.mangojuice.top/books/react/lesson10#setstate-接受函数参数) '>传入函数</a>。

这两种方式都可以保证能获取到最新的 state.

通常来说：`setState()` 总是会让组件重新渲染，但是若 [`shouldComponentUpdate()`](https://zh-hans.reactjs.org/docs/optimizing-performance.html#shouldcomponentupdate-in-action) 返回 `true`，React 就可以根据条件去决定是否渲染该组件。

#### [setState 实际做了什么？](https://zh-hans.reactjs.org/docs/faq-state.html#what-does-setstate-do)

`setState()` 会对一个组件的 `state` 对象安排一次更新。

当一个组件的 state 发生了改变，则该组件将会重新进行一次渲染。（直接修改 state 并不会触发组件的重新渲染）

- 直接修改 state：`this.state.xx = 1` 

并且如果只调用 this.setState()，不向它传递任何数据或传递 null、undefined，那么 this.setState() 并不会使得组件重新渲染（重新调用 render() ）；但是如果向 setState({}) 传递了一个对象，即使是空对象，则组件也仍然会重新渲染。

PS：想想也是，React 内部应该是做了一个判断：当开发者往 setState() 传递了一个对象/函数 才重新调用组件的 render()

如：

```react
import React, { Component } from 'react'
class LifeCycle1 extends Component {
  constructor() {
    super()
    this.state = {
      name: 'yomua'
    }
  }
  // 单机 <h1 /> 时的事件处理
  handlerClick() {
    console.log("更新 state.name:'yomua' => state.name:'yhw'")
    this.setState(undefined) // 不会重新调用 render()
    this.setState(null) // 不会重新调用 render()
    this.setState() // 不会重新调用 render()
    this.setState({}) // 会重新调用 render()
  }
  render() {
    console.log('调用 render')
    return (
        <h1
          className='title'
          onClick={this.handlerClick.bind(this)}>
          {this.state.name}
        </h1>
    )
  }
}
export default LifeCycle1;
```

#### [传入对象](http://huziketang.mangojuice.top/books/react/lesson10#setstate-接受对象参数)

传入一个对象的时候，这个对象表示该组件的新状态。但你只需要传入需要更新的部分就可以了，而不需要传入整个对象。

例如，假设现在我们有另外一个状态 `name` ：

```react
...
  constructor (props) {
    super(props)
    this.state = {
      name: 'Tomy',
      isLiked: false
    }
  }

  handleClickOnLikeButton () {
    // 只需要传递更新的那部分即可
    this.setState({
      isLiked: !this.state.isLiked
    })
  }
```

以上例子中：Tomy 还是那个 Tomy，而 `isLiked` 已经不是那个 `isLiked` 了。

#### [传入函数](http://huziketang.mangojuice.top/books/react/lesson10#setstate-接受函数参数)

这里还有要注意的是，当你调用 `setState` 的时候（传递对象），*React.js 并不会马上修改 state*。

而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 `state` 当中，然后再触发组件更新。这一点要好好注意。可以体会一下下面的代码：

```javascript
...
  this.state={isLiked:false}
  handleClickOnLikeButton () {
    console.log(this.state.isLiked)
    this.setState({
      isLiked: !this.state.isLiked
    })
    console.log(this.state.isLiked)
  }
...
```

你会发现两次打印的都是 `false`，即使我们中间已经 `setState` 过一次了。这并不是什么 bug，只是 React.js 的 `setState` 把你的传进来的状态缓存起来（异步），稍后（当组件重新渲染后）才会帮你更新到 `state` 上，所以你获取到的还是原来的 `isLiked`。

这是为了增加性能，参见：[setState()](https://zh-hans.reactjs.org/docs/react-component.html#setstate)

所以如果你想在 `setState` 之后使用新的 `state` 来做后续运算就做不到了，例如：

```javascript
incrementCount() {
  // 注意：这样 *不会* 像预期的那样工作。
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // 假设 `this.state.count` 从 0 开始。
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
  // 当 React 重新渲染该组件时，`this.state.count` 会变为 1，而不是你期望的 3。
  // 这是因为上面的 `incrementCount()` 函数是从 `this.state.count` 中读取数据的，
  // 但是 React 在组件重新渲染钱并不会更新 `this.state.count`
  // 所以最终 `incrementCount()` 每次读取 `this.state.count` 的值都是 0，并将它设为 1。
  // 问题的修复参见下面的说明。
}
```

上面的代码的运行结果并不能达到我们的预期，我们希望 `count` 运行结果是 `3` ，可是最后得到的是 `NaN`。但是这种后续操作依赖前一个 `setState` 的结果的情况并不罕见。

这里就自然地引出了 `setState` 的第二种使用方式，可以接受一个函数作为参数，那么这就相当于基于当前的 state 来计算出新的 state，从而在组件重新渲染后，state 将会立即以前一个 state 作为基值计算出新值。

即：React.js 会把上一个 `setState` 的结果（当前 state）传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 `state` 的对象：

```javascript
...
    this.state={count:0}
  handleClickOnLikeButton () {
    this.setState((prevState) => {
      return { count: prevState.count + 1 } // 上一个 setState 的返回是 count 为 0，当前返回 1
    })
    this.setState((prevState) => {
      return { count: prevState.count + 2 } // 上一个 setState 的返回是 count 为 1，当前返回 3
    })
    // 如果在这里直接输出，那么结果仍然为 0 => console.log(this.state.count) // 0
    // 这是因为组件未重新渲染
      // 当组件重新渲染后，结果为：this.state.count 为 3
  }
...
```

这样就可以达到上述的*利用上一次 `setState` 结果进行运算*的效果。

#### setState 合并（更新批处理）

上面我们进行了三次 `setState`，但是实际上组件只会重新渲染一次，而不是三次；这是因为在 React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 `setState` 都进行合并以后再重新渲染组件。

> React 18 以前：React 只在事件处理程序期间批量更新。默认情况下，Promise、setTimeout、本机事件处理程序或任何其他事件内部的更新不会在 React 中批处理。
> 
> React 18 开始：所有更新（如：setState）都将自动进行批处理，无论此次更新来自何处。
> 
> 参见：[React 18 自动批处理](https://github.com/reactwg/react-18/discussions/21) 

深层的原理并不需要过多纠结，你只需要记住的是：**在使用 React.js 的时候，并不需要担心多次进行 `setState` 会带来性能问题。** 

#### [setState 什么时候是异步的？](https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)

**目前**，在事件处理函数内部的 `setState` 是异步的。

例如，如果 `Parent` 和 `Child` 在同一个 click 事件中都调用了 `setState` ，这样就可以确保 `Child` 不会被重新渲染两次。取而代之的是，React 会将该 state “冲洗” 到浏览器事件结束的时候，再统一地进行更新。这种机制可以在大型应用中得到很好的性能提升。

**这只是一个实现的细节，所以请不要直接依赖于这种机制**。在以后的版本当中，React 会在更多的情况下静默地使用 state 的批更新机制。

#### 异步执行的 this.setState()

```react
import React, { Component } from 'react'
class LifeCycle1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
    }
  }
  // 单机 <h1 /> 时的事件处理
  handlerClick() {
    this.setState((preState) => {
      console.log('setState() 将异步执行')
      return { count: preState.count + 1 }
    })
    // 第一次点击 h1 时，先输出：1
    console.log(this.state.count)
  }
  render() {
    console.log('调用 render')
    return (
        <h1
          onClick={this.handlerClick.bind(this)}>
        </h1>
    )
  }
}
export default A;
```

- 由于在事件处理函数中 setState() 是异步执行的，所以第一次单机 h1 时，将先输出 1，然后才会调用 this.setState(callback)，去同步更新 state。

请记住：若你向 setState() 传递的是对象去更新 state，那么即使 setState() 被调用，state 也仍然不会立即映射为新值。

但是若你向 setState() 传递的是一个函数，通过函数返回值去更新 state，则 setState() 被调用后，state 将会立即被映射为新值。

### [**state vs props**](http://huziketang.mangojuice.top/books/react/lesson12)

#### 共同点

- state 和 props 都是一个对象

- state 和 props 的改变都会触发组件的重新渲染（重新调用 render()）
  
  注：[你不应该更改 props](https://zh-hans.reactjs.org/docs/components-and-props.html#props-are-read-only)

- Both *props* and *state* are **deterministic.** If your Component generates different outputs for the same combination of *props* and *state* then you're doing something wrong.
  
  即：它们都是确定性的，若你的组件在使用它们时做出了不一样的行为，那么应该是你做错了什么。

#### 区别

`state` 是让组件控制自己的状态，`props` 是让外部对组件自己进行配置。

如果你觉得还是搞不清 `state` 和 `props` 的使用场景，那么请记住一个简单的规则：尽量少地用 `state`，尽量多地用 `props`。

没有 `state` 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。

React.js 非常鼓励无状态组件，在 0.14 版本引入了函数式组件

```react
class HelloWorld extends Component {
  constructor() {
    super()
  }

  sayHi () {
    alert('Hello World')
  }

  render () {
    return (
      <div onClick={this.sayHi.bind(this)}>Hello World</div>
    )
  }
}
```

用函数式组件的编写方式就是：

```react
const HelloWorld = (props) => {
  const sayHi = (event) => alert('Hello World')
  return (
    <div onClick={sayHi}>Hello World</div>
  )
```

以前一个组件是通过继承 `Component` 来构建，一个子类就是一个组件。而用函数式的组件编写方式是一个函数就是一个组件，你可以和以前一样通过 `<HellWorld />` 使用该组件。不同的是，函数式组件只能接受 `props` 而无法像跟类组件一样可以在 `constructor` 里面初始化 `state`。你可以理解函数式组件就是一种只能接受 `props` 和提供 `render` 方法的类组件。

#### Reference

下面是一些不错的资源，能让你清楚的了解 state 和 props 的区别：

- [Props vs State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
- [ReactJS: Props vs. State](https://lucybain.com/blog/2016/react-state-vs-pros/)
- [React Small Book: state vs props](http://huziketang.mangojuice.top/books/react/lesson12)

## [渲染列表数据](http://huziketang.mangojuice.top/books/react/lesson13)

在渲染列表数据时，需要记住：对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 `key` 属性，这个 `key` 必须是每个元素唯一的标识，其目的和使用 Vue 时给每个列表元素加上唯一的 key 值是一样的 =>提高性能。

更多原因参见：高级指引-[React Diff（协调）](https://zh-hans.reactjs.org/docs/reconciliation.html) 

## [表单](https://zh-hans.reactjs.org/docs/forms.html)

### 概念

在 React 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同，这是因为表单元素通常会保持一些内部的 state

例如这个纯 HTML 表单只接受一个名称：

```
<form>
  <label>
    名字:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="提交" />
</form>
```

此表单具有默认的 HTML 表单行为，即在用户提交表单后浏览到新页面。如果你在 React 中执行相同的代码，它依然有效。但大多数情况下，使用 JavaScript 函数可以很方便的处理表单的提交， 同时还可以访问用户填写的表单数据。实现这种效果的标准方式是使用“受控组件”。

### [受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://zh-hans.reactjs.org/docs/react-component.html#setstate) 或 HOOKS 来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

例如，如果我们想让前一个示例在提交时打印出名称，我们可以将表单写为受控组件：

```react
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

[**在 CodePen 上尝试**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。由于 `handlechange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。

## React  组件编写内容顺序规则

按照以下规则去编写 React class，会使得协作、维护、可阅读性带来极大的便利性。

1. static 开头的类属性，如 `defaultProps`、`propTypes`。
2. 构造函数，`constructor`。
3. getter/setter（还不了解的同学可以暂时忽略）。
4. 组件生命周期。
5. `_` 开头的私有方法。
6. 事件监听方法，`handle*`。
7. `render*`开头的方法，有时候 `render()` 方法里面的内容会分开到不同函数里面进行，这些函数都以 `render*` 开头。
8. `render()` 方法。

## [React 引入图片坑](https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory)-[RN 图片](https://reactnative.cn/docs/images)

- https://zh-hans.reactjs.org/docs/context.html)

## 有关父子组件

### 渲染顺序

```js
Parent constructor
Parent componentWillMount
Parent render
Child constructor
Child componentWillMount
Child render
Child componentDidMount
Parent componentDidMount
```

当子组件挂载完毕后，父组件才会挂载完毕，想想也是——父组件包含子组件，若子组件没有挂在完毕，那么父组件肯定也没有挂载完毕。

### 子组件如何暴露方法给父组件（使用 Hooks 和函数式组件）

默认子组件已导出（export）

1. <a href="#通过 ref">通过 ref</a> 
   
   父组件通过 ref 获取子组件的引用（相当于获取子组件的实例，无法获取到子组件的静态属性/方法，如果使用 ref 获取子组件的静态属性/方法则会报错：`Property '子组件的静态属性/方法' is a static member of type 'ClassChild'` 

2. <a href="#父组件向子组件传递 props">父组件向子组件传递 props  </a> 
   
   父组件导入子组件并使用时，向子组件传递 props，然后子组件中判断父组件使用子组件时有没有传递对应的 props，如果有传递，则调用对应的方法，否则就不调用。

3. <a href="#子组件存在静态属性">子组件存在静态属性  </a> 
   
   让子组件拥有静态属性/方法，这样父组件导入子组件时，可以直接使用 `子组件.属性/方法` 使用。

4. <a href="#父组件实例子组件">父组件实例子组件  </a> 
   
   子组件存在实例属性/方法，然后父组件导入子组件时，`let child =  new 子组件(props)`，这样就可以使用 `child.子组件属性/方法` 访问到自组建的属性/方法。

**NOTE：**以上的方法都不是绝对的，可能会有更好的方式实现，又或者会有更多的方式去暴露子组件的 API，这里只是提供一个思路。

#### 通过 ref 将子组件的方法/属性暴露给父组件

注：本节示例使用的是[函数式组件 Ref](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) （[Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html)）的方式，你可以在此之前看看这个 <a href='#函数式组件中通过 Hooks 使用 Refs'>details</a>.

这其中有关基本知识如下：

1. [Hook useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 
2. [Hook useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 
3. [React.forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 

```tsx
// index.tsx
import React from "react"
import ReactDOM from 'react-dom';
import ClassParent from "./parent";
ReactDOM.render(
    <Parent />,
    document.getElementById('root')
);
```

```tsx
// parent.tsx
import React, { useRef } from "react"
import Child from "./child"

const Parent = () => {
    // userRef() 也等价于 React.createRef()
    const classChildRef: any = useRef(null) // 创建一个 ref 对象
//  => 相当于 const lassChildRef: any = React.createRef()

    // 调用子组件实例上的 childGet()
    const getClassChildFn = () => classChildRef.current.childGet()
    return (
        <div>
            <Child ref={classChildRef} />
            <button onClick={getClassChildFn}>获取子组件值</button>
        </div>
    )
}
export default Parent
```

```tsx
// child.tsx
import React, { useImperativeHandle, useRef } from "react"

// React.forwardRef 会创建一个React组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中
// 使用 React.forwardRef 后，并使用 useImperativeHandle，可以自定义准备暴露给父组件的实例值，
// 当你未使用 React.forwardRef 时，大概率会报错：Cannot add property current, object is not extensible
const Child = React.forwardRef(
    (props: any, ref: any) => {
        let state = { index: 0 }
        // 第 1 个参数：暴露 ref 属性。
        // 第 2 个参数：向父组件具体暴露的属性（若不存在这里面，则父组件无法通过 ref 获取）
        useImperativeHandle(ref, () => (
            {
                childGet() { console.log(state.index) },
            }
        ))
        return (<div>Child</div>)
    }
)

export default Child
```

当单击父组件按钮（获取子组件值）时，就会调用子组件实例使用 `useImperativeHandle Hook` 暴露出来的  `childGet()`，从而在控制台输出子组件实例的 `state.index` 值。

#### 通过父组件向子组件传递 props

```tsx
// parent.tsx
import React from 'react';
import Child from "./child";
const Parent = () => (<Child sayHello={{ sayHello: "hello" }} />)
export Parent
```

```tsx
// child.tsx
import {useEffect} from 'react';
const Child = (props: any) => {
    const sayHello = (v: any) => { console.log(v) }
    // 当父组件有向子组件传递 props(sayHello) 时，就调用子组件的某个方法，或干脆调用父组件传递这个 props.
    useEffect(() => props.sayHello 
              ? sayHello(props.sayHello) 
              : console.error('sayHello is not passed'))
    return (<div className="child"></div>)
}
export default Child;
```

当在父组件使用子组件时，只需要向子组件传递约定的 props，那么子组件将按照某种方式对传递的 props 进行处理，或者说是工作，否则就提示：使用本组件的父组件并未按约定传递 props.

#### 子组件存在静态属性

```tsx
// parent.tsx
import React from 'react';
import Child from "./child";
const Parent = () => (<UseExport />)
Child.say('Yomua'); // 控制台输出：Yomua
export default Parent;
```

```tsx
// child.tsx
import React from 'react';
const Child = () => {
    const say = () => console.log(this)
    return (<div>Child</div>)
}
// 为 Child 定义静态属性
Child.say = (v: any) => { console.log(v) }
export default Child;
```

由于子组件存在静态属性，所以父组件中只要导入子组件，就可以直接使用：`子组件.静态属性`

#### 父组件将子组件实例化

```tsx
// parent.tsx
import React, { Component } from 'react';
import Child from "./child";    
const ClassParent = () => {
    const getChildValue = () => {
        let child = new ClassChild("")
        child.childGet(); // 输出：0
    }
    return (
        <div>
            <ClassChild />
            <button onClick={getChildValue}>获取子组件值</button>
        </div>
    )
}
export default Parent
```

```tsx
// child.tsx
import {Component} from "react"
class ClassChild extends Component {
    static childGet: Function;
    state: { index: number, }
    constructor(props: any) {
        super(props)
        this.state = { index: 0 }
    }
    // 这个方法 可以被父组件获取到（只要父组件实例化子组件即可）
    childGet = () => { console.log(this.state.index) }
    render() {return (<div>Child</div>) }
}
export default ClassChild;
```

由于父组件需要实例化子组件，所以子组件最好使用 class component 的形式，或者使用函数式组件（除了箭头式的函数式组件除外）

## 技巧

### react 异步请求数据时，render 先行渲染报错，导致未拿到数据

解决方法：设置 1 个开关，当请求成功使得开关为 true。

```tsx
...
const AsyncRequest = () => {
    const [switchState, setSwitchState] = useState(false)
    const [apiData, setApiData] = useState({})
    useEffect(() => {
        axios.get('xxx')
            .then(({data,status}) => {
                status === 200 
                    ? setSwitchState(true) || setApiData(data)
                    :''
            })
    }, [switchState]) // 当 switchState 改变时再执行，在这里：此 useEffect 只会执行一次
    return (<div>{apiData.map((v)=>console.log(v))}</div>)
}
```

1. 先执行声明

2. 执行 return（此时 apiData 数据为空）

3. 执行 useEffect
   
   由于执行 useEffect 时，更改了 switchState 和 apiData 的值，所以渲染函数（return）会再一次执行

4. 执行 return（此时 apiData 已获取数据）
   
   此时就可以正常渲染出数据来了

请注意：switchState 在这里是必要的，它可以使得 useEffect 不陷入死循环，否则该组件会因为你在请求中调用了 setXXX()，导致 useEffect 和 渲染函数之间一直相互执行（死循环）

而设置 switchState 的目的是将它用作开关，即：当请求成功时，我们使得 switchState 的值永远为 true（静态的），所以 useEffect 只会执行 2 次，并不会陷入死循环。

PS：由于是异步的原因，渲染函数可能会执行 5 次。

## [组件模式](https://segmentfault.com/a/1190000018189123) （待撰写）

- Container （容器组件）"容器组件就是取数据，然后渲染子组件而已"

- Presentational （展示组件）
  
  "仅从 `props` 接收数据和回调，这些数据和回调可以由其容器组件(父组件)提供，然后将数据渲染到页面。

- [Higher order components](https://zh-hans.reactjs.org/docs/higher-order-components.html) 

- [Render Props](https://zh-hans.reactjs.org/docs/render-props.html) 
