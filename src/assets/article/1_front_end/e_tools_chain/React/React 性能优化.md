# 介绍

优化 React 组件，其本质是：

1. 减少组件的渲染次数
2. 减少事件的触发次数
3. 减少大量的无谓开销

我们只要从这三个方面着手，那么就能极大的增加 React 组件的性能，从而使得项目更加健壮。

当然，除了以上三个方面，我们还能使用一些额外的手段，达到增加性能的目的：

- 对项目的体积进行减少
- 缓存资源

# class 组件的优化

## [shouldComponentUpdate()](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)  

## [PureComponent](https://zh-hans.reactjs.org/docs/react-api.html#reactpurecomponent) 

PureComponent 组件本身已经实现了 shouldComponentUpdate()，它会浅层对比 prop 和 state 从而决定当前继承了该组件的自定义组件是否更新。

### 提早在 constructor 中绑定 this

当我们在 React 中创建 class 组件时，我们需要使用 bind 关键字将函数绑定到当前上下文。绑定可以在构造函数中完成，也可以在我们将函数绑定到 DOM 元素的位置上完成。两者之间似乎没有太大差异，但性能表现是不一样的。

```react
class Yomua extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this);
  } 
  handlerClick() {}
  render() {
    return (
    	<>
      	<button onClick={this.handlerClick} />
      	<button onClick={this.handlerClick.bind(this)} /> // 这种方式会导致增加额外开销。
      </>
    )
  }
}
```

第二种方式增加额外开销的原因和在组件内部使用内联函数***[详见：避免使用内联数]***的原因是类似的，这是因为使用第二种方式时：在每次调用 render 函数时都会创建并使用绑定到当前上下文的新函数，

这种方式让 React 在每次渲染时都认为这是一个新函数实例，所以我们使用第一种方式：渲染时使用已存在的函数，让 React 不去创建新函数。

# function 组件的优化

## [React.memo(MyComponent, areEqual?)](https://zh-hans.reactjs.org/docs/react-api.html#reactmemo) 

记忆一个组件，当 当前组件的 props 未发生变化时，就阻止因父组件更新从而导致子组件的更新。

React.memo(MyComponent, areEqual?);

该 HOC 默认情况下是浅比较上一个 props 和下一个 props 的区别的，如过想要自定义比较过程请使用第二个参数函数 areQual:

```react
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
    如果把 nextProps 传入 render 方法的返回结果与 将 prevProps 传入 render 方法的返回结果一致则返回 true: 不更新，否则返回 false: 更新
    这和 class 组件的 shouldComponentUpdate() 返回结果相反 => true: 更新, false: 不更新
  */
}
export default React.memo(MyComponent, areEqual);
```

Tips：使用状态管理： mobx 的 observer 观察过的函数式组件，无法在通过 React.memo() 进行包装，因为它们会导致冲突。这是因为：` The observer already applies 'React.memo' for you.` mobx 的 observer 已经在内部帮我们使用了 React.memo

且这是一个性能优化手段，不要依赖它来“阻止”渲染，因为这会产生 bug。

TIP: memo 通常与 useCallback 一起使用。

## [useCallback](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback)

当使用 useMemo 包装组件A时，我们需要使用 useCallback 来包装 props -> 包装由组件 A 的父组件，传递给组件 A 的函数或对象，

这是因为函数/对象等值若不使用 useCallback 包装，那么每次父组件更新时，函数/对象等值将被重新创建，如果一个新值传递给子组件（A），从而导致即使组件 A 使用的 useMemo 包装，也会因为函数/对象等值的重新创建而重新渲染。

###  useCallback deps 请包含传入参数使用的所有外部变量

useCallback 的 deps 需要包含在函数中*（传递给 useCallback 的被包装函数）*的所有外部变 => 除了 state，还有 props，如：

```tsx
function B(props) {
  const { onChange } = props;
}
export default React.memo(B);
```

```tsx
function A(props) {
  const {data, onChange } = props;
  const handleChangeB = useCallback(
    (value) => { 
      onChange({
        ...data,
        ...value
			});
    },
    [data, onChange], // 需要依赖 onChange，因为传递给 useCallback 的函数中包含 onChange
  );

  return (
    <div>
      <B onChange={handleChangeB} />
    </div>
  );
}
```

若依赖中不包含 onChange，那么这可能会导致意料之外的 BUG，比如：在组件 A 的 props.onChange 中，改变了 data，那么在 handleChangeB 得到的 data 有可能不是最新值，**即使你的依赖中包含 data.**

=> 说 “有可能” 是因为这行为很难预测 =>***仅当*** A 的 props.onChange 改变了 data，handleChangeB 的 data 不会是最新值，而是上一次的值；

但若 A 的 props.onChange 中不仅改变了 data，还改变了其他值，而其他值会导致 data 刷新，那么此时由于 handleChangeB 中的依赖包含 data，所以此时的 data 是最新值。

### 若 useCallback deps 不包含 props

承接上面的小节。

如果我们将 onChange 作为 dep 传给 useCallback，这会使 useCallabck 在 onChange 改变时就刷新 => handleChangeB 重新被创建 => B 组件即使包装于 memo 中，也会因为 handeChangeB 的重新创建而重新执行一遍渲染。

- 注意：虽然即使重新执行一遍渲染，可能不会导致 B 组件被浏览器重新绘制（参见：《React Diff.md》），但是会执行一遍 B 组件重新 diff，这仍然会造成不必要的性能消耗。

所以，我们可以使用以下方法来解决此问题：

```tsx
function A(props) {
  const {data, onChange } = props;
  const [activeValue, setActiveValue] = useState()
  const handleChangeB = useCallback(
    (value) => { 
        setActiveValue(value) 
    },
    []
  );
  useEffect(()=>{
      onChange({
        ...data,
        ...value
			});
  },[activeValue])

  return (
    <div>
      <B onChange={handleChangeB} />
    </div>
  );
}
```

如上所示：当 handleChangeB 被触发会改变 activeValue，从而触发 useEffect，

这操作会导致 useEffect 重新创建，从而得到一个最新的 data，然后将此 data 传递给 onChange，这就会让 onChange 接受的值是最新值了。

注意：我们不需要在 useEffect 的 deps 中传入 data，为什么？参见：[不将值添加到useEffect的依赖,当useEffect重创后仍然能得到此值的最新值](https://codesandbox.io/s/bu-jiang-zhi-tian-jia-dao-useeffectde-yi-lai-dang-useeffectchong-chuang-hou-reng-ran-neng-de-dao-ci-zhi-de-zui-xin-zhi-5wvwbu)。

简略来说就是：useEffect 被重新创建后，得到了外部变量和存在内存中的 state 的最新值；

即使是在 useEffect 中调用了一个方法 A 并里面使用了 state，方法 A 也能获取到最新值，除非方法 A 被 useCallaback 包裹且不传入**任何** deps。

这是因为方法 A 会被刷新，一旦有 deps，且方法 A 被重新创建，那么即使是和 state 不相关的 dep，也会让方法 A 中的 state 是最新值。

##### 总结

不论是 useEffect, 还是 useCallback, useMemo 等，**只要它们被重新创建**，那么就会刷新里面的变量，从而获取到最新值，即使传入的依赖和在它们内部使用的变量毫不相关也没关系，

## [useMemo(function,[...])](https://zh-hans.reactjs.org/docs/hooks-reference.html#usememo) 

记忆一个值（memoized 值），当依赖项*（一个数组，里面的值就是依赖）*改变时，才会重新计算这个记忆值。该函数通常用来避免在每次渲染时都进行高开销的计算。

如：有一个值计算起来很消耗性能，但是每次组件渲染时它却都会被计算，此时，我们就可以使用 useMemo() 来优化它，将这个值记忆，并在它未改变时不重新计算，而是直接返回这个记忆值作为我们需要的结果。

Tips: React.memo() 是记忆一个组件，useMemo() 是记忆一个值，它们之间是有区别的，详见：<a href='#React API 之间的差异'>React API 之间的差异</a> 

# 公用优化

## 使用 [React Fragments](https://zh-hans.reactjs.org/docs/fragments.html#gatsby-focus-wrapper) 避免无意义标识

```react
const Yomua = () => (
	<div>
  	<h1>yomua</h1>
    <h2>whyhw.com</h2>
  </div>
)
```

类似以上这种组件，其中该组件的跟元素 div 是无意义的，它只是为里面的标签提供一个容器，以及为了防止出现多个根元素导致 error 的问题，所以此时我们可以使用 Fragments 避免这种无意义标识：

```react
// 由于这种方式不会创建一个新节点，所以它不支持 key 或任何其他属性。
const Yomua = () => (
	<>...</> // 简写
  或
  <React.Fragments>...<React.Fragments/>
)
```

## [为每个列表项添加唯一 key](https://zh-hans.reactjs.org/docs/reconciliation.html#keys) 

这是因为 [diffing 算法-keys](https://zh-hans.reactjs.org/docs/reconciliation.html#keys) 的原因。

## 使用防抖和节流

防抖：停止做某事才触发某事件

节流：每隔一个单位时间就触发一次事件

## 使用 [CDN](https://www.cloudflare.com/zh-cn/learning/cdn/what-is-a-cdn/)  

将项目的外部资源托管到多个异地服务器，当用户访问这些资源时，就会从最近的服务器拉去资源，从而节约了传输效率，且通过 CDN 加载的资源是可以缓存的（在资源未更改时，用户可以使用缓存资源）

## 使用 CSS 动画代替 JS 动画

- 如果 CSS 可以实现某些 JS 功能，那就用 CSS。
- 如果 HTML 可以实现某些 JS 功能，那就用 HTML。

理由如下：

1. 破损的 CSS 规则和样式不会导致网页损坏，而 JavaScript 则不然。
2. 解析 CSS 是非常便宜的，因为它是声明性的。我们可以为样式并行创建内存中的表达，可以推迟样式属性的计算，直到元素绘制完成。
3. 为动画加载 JavaScript 库的成本相对较高，消耗更多网络带宽和计算时间。
4. 虽然 JavaScript 可以提供比 CSS 更多的优化，但优化过的 JavaScript 代码也可能卡住 UI 并导致 Web 浏览器崩溃。

参见：[CSS 对比 JS 动画](https://developers.google.com/web/fundamentals/design-and-ux/animations/css-vs-javascript) 

## SSR 服务端渲染

服务端渲染可以减少初始页面加载延迟，我们可以让网页从服务端加载初始页面，而不是在客户端上渲染。这样对 SEO 非常有利。

服务端渲染是指第一个组件显示的内容是从服务器本身发送的，而不是在浏览器级别操作。之后的页面直接从客户端加载，这样我们就能把初始内容放在服务端渲染，客户端只按需加载部分页面。

其好处包括：

1. 性能：初始页面内容和数据是从服务器本身加载的，因此我们不需要添加加载器和下拉列表，而是等待初始页面加载完毕后再加载初始组件。

2. SEO 优化：爬虫在应用初始加载时查找页面内容。在客户端渲染时初始 Web 页面不包含所需的组件，这些组件需要等 React 脚本等文件加载完毕后才渲染出来。

3. 减少出现首页白屏现象（服务端性能通常不错，由它直接将渲染逻辑处理好，然后直接将 HTML 返回给前端，浏览器直接根据 HTML 展示页面，这样能极大程度避免首页白屏现象）。

   PS：如果首屏渲染逻辑过度，可能会需要让用户等待服务器返回资源。

坏处：

- 增加项目复杂度
- 不易维护（前、后端都具有代码，且语言不同）
- 对服务器压力较大

## [使用 Web Workers 处理 CPU 密集任务](https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7) 

## [避免使用内联函数](https://zh.wikipedia.org/wiki/%E5%86%85%E8%81%94%E5%87%BD%E6%95%B0) 

虽然内联函数的初衷是节约因[函数调用所来的效率问题](https://www.huaweicloud.com/articles/3c9d1c1d2c026d0b992c3d483adc1324.html)，但是由于 React 机制的原因，在组件中使用内联函数反而会降低性能。

```react
const Yomua = () => (
  const handlerClick = () => {}
	<>
  	<button onClick={(e)=>{}} /> // 使用内联函数
  	<button onClick={handlerClick} // 不使用内联函数
  </>
)
```

这是因为当 React 使用 [diffing](https://zh-hans.reactjs.org/docs/reconciliation.html#the-diffing-algorithm) 算法时，React **每次都会认为使用内联函数的处理器是一个新的函数实例**，所以在渲染阶段 React 每次都会重新绑定新的函数实例，从而将旧的函数实例扔给垃圾回收，但是实际上，该函数并没有变，所以使用内联函数反而会增加性能消耗。

## 避免使用内联样式

使用内联样式时浏览器需要花费更多时间来处理脚本和渲染，因为它必须映射传递给实际 CSS 属性的所有样式规则。

```react
const Yomua = () => (
	<b style={{"backgroundColor": "blue"}}>Yomua Love me</b>
)
```

由于实际上，JSX 是一个对象（通过 [React.createElement()](https://zh-hans.reactjs.org/docs/react-api.html#createelement) 创建），所以使用以上内联样式时，添加的内联样式是 JavaScript 对象而不是样式标记，这会使得内联样式需要转换为等效的 CSS 样式属性，然后才能应用。

那么这样就需要额外的脚本处理和 JS 执行工作，当然就会降低效率，最好的办法是将 CSS 文件导入组件。

## 将组件细分

一个大的组件更新是一件非常消耗性能的事，而若将它分成一个个小的组件，再拼起来成为一个大组件，这样，性能会提升很多，并且也更加清楚的知道每个部分的功能。

## 提前得出并记忆函数的返回值

将可以通过某个函数能计算出来的值，先将这个值计算赋值给一个变量，然后再使用这个变量，这可以避免重复调用某个函数，浪费计算力和内存，如：

```react
import React, {useMemo} from 'react'

const Yomua = () => {
  const [sex, setSex] = useState('')
  const getName = useCallback((name) => sex === '男' ? name : 'God', [sex])
  // 使用此变量来作为显示值，这样避免了重复调用 getName，导致的计算力和内存浪费。
  const name = useMemo(()=>getName('Yomua'), [sexÏ]) 
  
  return (
  	<div>我是 {name} </div>
  )
}
```

# 缓存优化

## [prop: 函数返回一个函数时如何记忆此函数](https://codesandbox.io/s/usecallbackfan-hui-yi-ge-han-shu-shi-ru-he-ji-yi-ci-han-shu-1vsk22?file=/src/App.tsx) 

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



# Reference

- [React 性能优化](https://zh-hans.reactjs.org/docs/hooks-faq.html#performance-optimizations) 