# React 细节

- [React 设计思想](https://github.com/react-guide/react-basic/blob/master/README.md) 

- [React 哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 

- [React 设计原则](https://zh-hans.reactjs.org/docs/design-principles.html) 

- [你的 React 组件看起来怎么样？](https://antongunnarsson.com/react-component-code-smells/#too-many-props) 

- [有价值的 React 组件](https://overreacted.io/zh-hans/writing-resilient-components/) 

- 思考组件的状态、props 和之间的联系是非常重要的，它们将帮助你构建更为简单、高校的组件。
  
  在写一些复杂的组件或页面时，请首先思考它们三者，并以画图来辅助你的思考。

- 如果一个受控组件 input，你想要限制它的长度，你不一定非要通过 maxLength，忘了吗？它是一个受控组件，你完全可以在 onChange 中，当它要改变值之前，进行判断：若当前输入值的长度 > maxLength，就直接 return，不将本次的输入值显示和存入。
  
  以此类推，很多情况都可以这么做，即：当某个方式实现不了某个需求，则换个方式去实现。

- 除了业务组件之外，请保证组件的数据无关性，可复用性，简单性等。
  
  即：除业务组件外，组件不应该和业务有强耦合关系。若某个非业务组件需要通过某个状态从 prop(data) 中获取对应数据，请直接往该组件传入正确的数据，而非在组件内部去判断。

- React 组件的 prop 名字是要深思熟虑的，尽量请和行业潜规则对标，如：单击事件：onClick，值改变事件：onChange Or onValueChange 等。

- React 组件关于函数的 prop，请让此 prop 是个事件，而非是个函数。
  
  如：当子组件隐藏时会触发名为 onHide 的 prop，子组件内部并不规定 onHide 如何实现，只是在它隐藏前/后直接调用 `onHide(或传入某些参数)` 即可。
  
  TIP：对于新手而言，会在父组件创建一个如 `function setComponentHide(...params){}` 的函数，然后将它传入给子组件，而 prop 的名字也为：setComponentHide，最后再在子组件隐藏前/后调用此函数。**这是错误的行为！** 

- 副作用请尽量通过 useEffect 去做。

如：若某个状态改变，就要去发送请求，获取数据，请不要在 onChange 等事件里面发送请求，而是在 onChange 事件改变 state，然后以 useEffect(()=>{发送请求},[某个状态]) 这样的形式去发送请求。

# React 泛型组件

```typescript
interface Props<T> {
  value?: T;
}

const Yomua = (props: Props<T>) => {
  const { value, } = props

  return <input value={value}/>
}

// 使用 Yomua
const Son = () =>{
  return (
      <div>
        <Yomua<number> value={123}/> 
        <Yomua<number> value={'123'}/> //the type of value is number
    </div>
  )
}
```

# React 缓存

## [useCallback返回一个函数时如何记忆此函数](https://codesandbox.io/s/usecallbackfan-hui-yi-ge-han-shu-shi-ru-he-ji-yi-ci-han-shu-1vsk22?file=/src/App.tsx) 

对于以下组件，即使 使用了 `useCallback`，当 `Yomua` 重新渲染时，`Input` 也将会重新渲染。

这是因为：`useCallback` 包裹的函数返回了另一个函数，而这个函数并不会被记忆，所以当 `Yomua` 重新渲染时，`Input` 也会被重新渲染。

```tsx
const Yomua = memo(() => {
		const [update, setUpdate] = useState(Date.now())
    const handleChange = useCallback((name: string) => {
        return () => {}
    }, [])

  return ( 
    <div>
      <button onClick={() => setUpdate(Date.now())}>update Yomua </button>
      <Input onChange={handleChange("yomua")} />
    </div>)
    
}, [])

```

我们可以使用以下方法，解决以上问题：

```tsx
const cache = {};

const handleChange = useCallback((name: string) => {
    // 这里用来缓存的 key, 可以是任何有效的标识性符
  	if (!cache[name]) {
        cache[name] = (inputValue: string) => {
            console.log('_inputValue', inputValue)
        }
    }

    return cache[name]
}, [])

```

