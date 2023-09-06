# Hook

## [useReducer()](https://zh-hans.reactjs.org/docs/hooks-reference.html#usereducer)

### 语法

```tsx
const [state, dispatch] = useReducer(reducer, initState, init?)
```

- `reducer` 
  
  reducer:(state,action)=>void
  
  用户定义的一个函数，调用 dispatch(action) 时，会调用它
  
  `reducer` 将根据 initState 以及传入的 action，去计算出 newState

- `initState` 
  
  initState: number | Array<number|string|object|[]> | object
  
  初始 state，首次调用 dispatch(action) 时，将根据该 state 计算出 newState，接着后续的每一次调用 dispatch(action)，都将根据这个 newState 去计算并返回新 state.

- `init` 参见：[useRedcer-惰性初始化](https://zh-hans.reactjs.org/docs/hooks-reference.html#lazy-initialization) 
  
  (initState) => newInitState
  
  init() 函数可以惰性创建 initState，并且不改变原有 initState
  
  即：根据你传入的 initStateValue，去将之赋值一个新的 initState 中的属性，然后返回新的 initState，这样当我们调用 init(initStateValue) 时，该函数就会返回一个新的 initState。
  
  ```tsx
  const init = (initStateValue = 10) => ({value:initStateValue})
  ```
  
  此新的 initState（`{value:initStateValue`}) 将作为 useReducer() 的 initState，而原本的第二个参数 initState 只是一个基值。

**返回值**

- `state`
  
  根据上 1 个 dispatch(action) 的 state 所得到的，其中首次调用 dispatch(action) 时，则是基于 initState 计算。

- `dispatch: (action) => void`
  
  我们向 `dispatch` 中传入描述事情的 `action`
  
  且在 `dispatch` 中将会调用用户自定义的 `reducer(state, action)` 并返回一个 newState
  
  最后 `dispatch` 函数将会把 newState 记住（`setState(newState)`），
  
  每一次调用同一个 `useReducer()` 返回的 dispatch() 时，所得到的 state 将【基于上 1 个 dispacth(action) 的 state】,
  
  其中首次调用 dispatch(action) 时，返回的 state 是基于 initState 得到的。
  
  **TIP： 每一次调用 `dispatch` 都会使得组件重新渲染，即：重新执行一次渲染函数，**其原因是：`dispatch` 中将会调用 useState() 返回的函数（setXX），详见：<a href='#[useReducer 的简单原理](https://zh-hans.reactjs.org/docs/hooks-custom.html#useyourimagination)'>useReducer 的简单原理</a>

### 作用

用来根据 initState，调用 dispatch(action) 得到一个【基于上 1 个 dispacth(action) 的 state 的】newState 值，

其中首次调用 dispatch(action) 时，返回的 newState 是基于 initState 得到的。

### [useReducer 的简单原理](https://zh-hans.reactjs.org/docs/hooks-custom.html#useyourimagination)

reducer（自定义函数：(state, action)=>newState）去得到一个

```tsx
const useReducer = (reducer, initState, init?) => {
  const [state, setState] = useState(initState);
  const dispatch = (action) => {
    // 只有首次调用时 initStata 才是初始 state，
    // 后续每一次调用同一个 dispatch，都将【基于上 1 个 dispacth(action) 的 state】
    const newState = reducer(state, action); 
    setState(newState)    
  }
  return [state, dispatch]
}    
/** 用户定义的一个函数，调用 dispatch(action) 时，会调用它
 * => 根据 initState 以及传入的 action，去计算出 newState
 */
const reducer = (initState, action) => {
  switch (action.type) { // reducer 函数会根据 action 描述的不同事返回不同的 newSstate
    case 'add':
      return { count: initState.count++ } 
    case 'reduce':
      return { count: initState.count-- }
    default:
      return initState; // 若 action 描述的事是未知类型,则返回 initState
  }
}
const initState = { count: 1 } // 初始state
const [state, dispatch] = useReducer(reducer, initState)
const Button = () => (
  <div>
    count:{state.count}
    {/* 单击时将根据 action 的类型去指定对应的计算，从而得到一个基于初始 state 的新 state */}
    <button onClick={() => { dispatch({ type: 'add' }) }}>-</button>
    <button onClick={() => { dispatch({ type: 'reduce' }) }}>+</button>
  </div>
)
```

1. 当我们单击按钮时，将会调用 dispatch()，并传入一个 action 来描述这个 dispatch 将要干什么
2. 然后根据这个 action 描述的信息，userReducer() 将返回一个计算得到的 newState

注：newState（在这里指的是 state）是根据上 1 个dispatch(action) 的 state 所得到的，

其中首次调用 dispatch(action) 时，则是基于 initState 计算。

:zap:并且如果直接在组件中使用 `dispatch({})` 则可能会导致无限循环：

```tsx
const Button = () => {
    dispatch({ type: 'add' }) // 会使得当前程序无限循环，因为每次调用该函数都会是的组件重新渲染。
    return (<div></div>)
}
```

### 简单示例

```tsx
import React, { useReducer } from 'react';

const Index = () => {
  const initState = { count: 1 } // 创建初始 state
  const reducer = (initState, action) => { // 创建 reducer
    switch (action.type) { // reducer 将根据 action 描述了什么来返回对应的 newState
      case 'add':
        return { count: initState.count + 1 } // 根据 action 描述的不同事返回不同的 newState
      case 'reduce':
        return { count: initState.count - 1 }
      default:
        return initState; // 若 action 描述的事是未知类型,则原封不同返回 initState
        // throw new Error('Action is unknown!') // 或你可以抛出一个错误
    }
  }
  // 这里的 state 是根据上一次调用 dispatch 所计算出的 newState
  // 第一次调用 dispatch 则是根据 initState 计算得到 newState
  const [state, dispatch] = useReducer(reducer, initState); // 调用 useReducer
  return (
    <div>
      {/* 单击时将根据 action 的类型去指定对应的计算，从而得到一个基于 initState 的 newState */}
      <button onClick={() => { dispatch({ type: 'add' }) }}>+{state.count}</button>
      <button onClick={() => { dispatch({ type: 'reduce' }) }}>-{state.count}</button>
    </div>
  );
}

export default Index;
```

使用 `useReducer(reducer, initState)` 将返回一个 `newState` 和 `dispatch`

1. 当我们单击按钮时，将会调用 dispatch()，并传入一个 action 来描述这个 dispatch 将要干什么
2. 然后根据这个 action 描述的信息，userReducer() 将返回一个计算得到的 newState

TIP：每一次调用 `dispatch` 都会使得组件重新渲染，即：重新执行一次渲染函数。

### 总结

调用 useReducer(reduce, initState); 将会返回一个 dispatch(action)，

而在 dispatch 函数中，它将会调用 reduce(state, action)，并将 reduce 函数所返回的 state 使用 setState(state) 保存，使得 useReducer() 可以根据上一次 state 的值来计算 newState.

其中第一次调用 dispatch() 时，所得到的 newState 是根据 initState 计算。

- TIP：这里的 state 指的是第一次时的 initState 和根据上一次 state 计算所得到的 newState.

```ts
useReducer(reducer, initState):    (arg1,arg2) => [newState, dispatch]

reducer:(initState, action) => newState
initStae: inital state | object | [] | any...
dispatch(action): (action:any(doSomething)) => newState
```

## [uesMemo()](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo)

## [useImperativeHandle()](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 

## [useDeferredValue()](https://zh-hans.react.dev/reference/react/useDeferredValue) 

## 概念

此 hook 可以延迟更新 UI 的某些部分。

当此 hook 安排了一个后台渲染时，如果此时又有新事件导出此 hook 又需要被重新执行，那么它会中断前一个后台渲染，从头开始重新启动一个新的后台渲染，如此直到更新完。

- 注意：被中断的每个前一个渲染是被缓存下来的，当再次使用的 deferred 结果是被缓存的，那么此结果所对应的输入再次被重新输入时，不会重新触发渲染（如：重新发送请求、获取数据等）
  可以参考例子：[例子](https://zh-hans.react.dev/reference/react/useDeferredValue#showing-stale-content-while-fresh-content-is-loading)，以及[结论](https://zh-hans.react.dev/reference/react/useDeferredValue#how-does-deferring-a-value-work-under-the-hood)。

# 从 Class 迁移到 Hook

## [生命周期方法要如何对应到 Hook？](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks)
