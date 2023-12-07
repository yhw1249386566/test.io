# [Context 机制](https://zh-hans.reactjs.org/docs/context.html) 

## :triangular_flag_on_post: 称呼规定

- **组件树：一系列相关的组件**

  ```tsx
  <Hello>
  	<World /> 
  </Hello>
  
  <World>
  	<Kit />
  </World>
  
  <Kit> 
  	<Button />
  </Kit>
  
  <!-- 
  	这样，以上的组件树就是：
  	Hello(ROOT) -> World -> Kit -> Button
  -->
  ```

- **Context 机制**

  [创建一个 Context 对象](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)，再使用以下方式包裹 1 个或多个组件，

  ```tsx
  // 参见：https://zh-hans.reactjs.org/docs/context.html#contextprovider
  <MyContext.Provider value={...}> 
      <某个组件 A />
      <某个组件 B />
      ....
  </MyContext.Provider>
  ```

  这样 `Context.Provider` 包裹的 1 个或多个组件的任意下级组件只要使用 [static contextType = MyContext](https://zh-hans.reactjs.org/docs/context.html#classcontexttype)（使用 contextType 读取 Context 对象），就可以在任何生命周期中访问到 value 属性，包括 render 函数中，其读取方式为：使用 `this.context` 访问。

  注：虽然 class 上有挂载 `contextType` 属性用来读取  [React.createContext()](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext) 创建的 Context 对象，从而可以使用 `this.context`  访问最近的 MyContext.Provider 上的 value 属性的；

  但是在函数式组件中，我们完全可以通过 [React Hook](https://zh-hans.reactjs.org/docs/hooks-intro.html) 中的 [useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 做到一样的效果！参见：
  <a href="#[Hooks 中使用 Context](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)">Hooks 中使用 Context</a> 

## 介绍

所谓的 Context 也可以称之为 Context  机制，这种机制提供了一个无需为每层组件手动添加 props，就能在组件树中传递数据，甚至能直接在底层使用顶层的数据，而中间层完全不需要任何显式传递。

让我们看看这个例子：<a href="#繁琐的 props 传递">繁琐的 props 传递</a>，如果需要从一个组件树的顶层向底层传递一个数据，中间要多么麻烦吧。

那我们如何使用 Context 机制去解决这样繁琐的 props 传递呢？参见：<a href="#使用 Context 机制解决繁琐的 props 传递">使用 Context 机制解决繁琐的 props 传递</a>

## 繁琐的 props 传递

```tsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

const Toolbar = (props) => (
    <div>
    	<ThemedButton theme={props.theme} />,
    </div>
)

const ThemedButton = () => (
	<Button theme={this.props.theme} />;
)
```

显然的，以上示例是一个典型的 React 的 props 传递示例，我们从组件树的顶层（App）把 `theme='dark'` 传递到组件树的底层（ThemedButton），

这看起来似乎很好，但是由于该组件树的中间存在一个 Toolbar 组件，所以从顶层 -> 底层 时，我们不得不让中间的 Toolbar 组件也要传递一次数据，然后使用 Toolbar 组件向 底层传递，

在这个只有 3 个组件的示例中，似乎没什么大不了的，但是你要知道：当组件树变多，甚至嵌套的更为复杂，那么从顶层 -> 底层，势必需要使得数据传递到中间所有的组件中，甚至这些中间的组件唯一的用处就是将数据继续往下传递的底层，

很显然，这不是一个好的解决方法，所以 React 提供了一个 Context 机制，使得我们无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

## 使用 Context 机制解决繁琐的 props 传递

在 <a href="#繁琐的 props 传递">繁琐的 props 传递</a> 节中，我们已经知道如果一个组件树中的组件过于复杂，那么想要从该组件树的顶层传递数据到底层，需要用到中间的所有组件帮忙一起传递，这是一件很麻烦你的事情，所以现在，我们尝试用React 提供的 Context 机制去解决它！

- ThemeContext.Provider 包裹 App -> ToolBar -> ThemedButton -> Button，在 Button 中读取 Context 对象完毕后，使用 this.context（获取数据）
- ThemeContext.Provider 包裹 Yomua -> YHW，在 YWH 中读取 Context 对象完毕后，使用 this.context 获取数据

```tsx
// usecontext.tsx
import React, { Component } from 'react';
const ThemeContext = React.createContext('light');
// 并不一定需要从顶层组件开始具有 Context 机制
const App = () => (
    // 请注意：确保 <MyContext.Provider> 始终是根组件
    <ThemeContext.Provider value="dark">
        {/** Context.Provider 可以包裹多个组件 */}
    		<ToolBar />
      	<Yomua />
    </ThemeContext.Provider>
)
/** 我们完全可以从组件树的任意位置开始，使得从该位置起的下级组件都具有 Context 机制。
const ToolBar = () => (
    <div>
        <ThemeContext.Provider value="dark">
            <ThemedButton />
        </ThemeContext.Provider>
    </div>
)
*/
const ToolBar = () => (<ThemedButton />)
const ThemedButton = () => (<Button />)
/**
 * 这里之所以使用 class，而不用函数式组件，是因为函数式组件不支持挂载于 class 的 contextType 属性、
 * 参见：https://zh-hans.reactjs.org/docs/context.html#classcontexttype
 */
class Button extends Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div>
                {console.log(this.context) /* dark */} 
                {console.log(Button.contextType /* 一串长长的对象 */)}
            </div>
        );
    }
}

// 有意思的是：Context.Provider 可以包裹多个组件
const Yomua = () => (<YHW />)
class YHW extends Component {
    static contextType = ThemeContext;
    render() {
        return (
            <div>
                YHW
                {this.context}
            </div>
        );
    }
}
export default App

// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import Context from "./usecontext";

ReactDOM.render(
    <Context />,
    document.getElementById('root')
);
```

- **Context 机制**

  [创建一个 Context 对象](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext)，再使用以下方式包裹 1 个或多个组件，

  ```tsx
  // 参见：https://zh-hans.reactjs.org/docs/context.html#contextprovider
  <MyContext.Provider value={...}> 
      <某个组件 A/>
      <某个组件 B/>
      ....
  </MyContext.Provider>
  ```

  这样 `Context.Provider` *（请注意：确保 <MyContext.Provider> 始终是根组件）*包裹的 1 个或多个组件的任意下级组件只要使用 [static contextType = MyContext](https://zh-hans.reactjs.org/docs/context.html#classcontexttype)（使用 contextType 读取 Context 对象），就可以在任何生命周期中访问到 value 属性，包括 render 函数中，其读取方式为：使用 `this.context` 访问。

  TIP: 在 class 组件中，你必须让当前 class 组件的 contextType 属性指向 MyContext 对象，否则 this.context 获取不到任何值。

在本示例中，我们巧妙地利用了 Context 机制，使得从组件树的顶层组件（App，Yomua）向底层组件（Button，YHW）传递数据时，并不需要在中间的所有组件（ToolBar，ThemeButton）帮忙传递，

而是通过 `Context（React.createContext 返回的对象）.Provider（固定组件）` 组件包裹顶层组件，使得这一系列相关的组件树具有 Context 机制。

即：在 `Context.Provider` 组件上使用 `value` 属性，那么被包裹的组件的所有下级组件只**要有使用 contextType 读取当前的 Context 对象**（static contextType = ThemeContext;）。

> contextType 属性是 React 内置在 Class 上的，参见：[Class.contextType](https://zh-hans.reactjs.org/docs/context.html#classcontexttype)，但函数式组件存在 [useContext Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 来使用 contextType

就能通过 `this.context` 访问到离该（下级）组件最近的 `Context.Provider` 组件上使用的 `value` 属性

注意：你只通过该 API 订阅单一 context。如果你想订阅多个，阅读[使用多个 Context](https://zh-hans.reactjs.org/docs/context.html#consuming-multiple-contexts) 章节

:zap:：确保 <MyContext.Provider> 始终是根组件，当然了，如果是多个嵌套的 MyContext.Provider 除外。

原因想想也简单：组件树的顶层若不是 MyContext.Provider 组件，而是使用其他组件或 div 等元素作根，那根组件就变成了它们，

而它们很显然不存在 Context 机制的特性，所以自然无法使用 Context 机制向下传递数数据，而这也就是为什么我们要将 MyContext.Provider 作为根组件的原因。

## [Hooks 中使用 Context](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext) 

我们可以在函数组件中使用 `useContext(MyContext)` 去接收一个 context 对象（`React.createContext` 的返回值），这样就能在函数式组件使用使用 Context 机制。

调用了 `useContext` 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 [通过使用 memoization 来优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)。

```tsx
// light
const light =  {
    moonSun: '#f7eead',
    primaryBgColor: '#f9d3e3',
    secondaryColor: '',
    primaryColor,
    pureSameColor,
    color: pureDark,
    backgroundColor: pureDark,
    primaryTextColor: primaryColor,
}
// contexts
const ThemeContext = createContext(light)
const ThemeProvider = (props: ThemeProviderProps) => {
    const { theme } = props
    const [currentTheme, setCurrentTheme] = useState(light)
    useEffect(() => {
        if (theme === 'light') {
            setCurrentTheme(light)
            return
        }
        setCurrentTheme(dark)
    }, [theme])

    return (
      	// 若 currentTheme 发生改变，则当前 Provider 下所有调用 useContex(ThemeContext) 的子组件将重新渲染以获取最新的 context 值。
        <ThemeContext.Provider value={currentTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
}

// hooks
import { useContext } from 'react'
import { ThemeContext } from '../contexts'

const useTheme = () => {
    return useContext(ThemeContext)
}

export default useTheme

// 某个组件中使用
const themeContext = useTheme() // => return type: light 
```



## Reference

- [React-Context](https://zh-hans.reactjs.org/docs/context.html)
