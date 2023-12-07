# React 组件设计

## 哲学

- 划分组件应根据单一功能原则
- 善用高阶组件、高阶函数，将组件的公共逻辑抽离
- 善用组合组件，避免逻辑相同的组件重复编写
- 规定 state 和 props
  - 凡是能从父组件传下来的值都写为 props
  - 判断某个值是否属于 state 
    - 该数据是否是由父组件通过 props 传递而来的？如果是，那它应该不是 state。
    - 该数据是否随时间的推移而保持不变？如果是，那它应该也不是 state。
    - 你能否根据其他 state 或 props 计算出该数据的值？如果是，那它也不是 state。
  - 精简 state，确定 state 最小集合表示，其他值均由这些 state 计算而来。
  - 确定 state 的使用者。

​	Reference

- [React 哲学](https://zh-hans.reactjs.org/docs/thinking-in-react.html) 

## 定义组件的“事件” / 当组件层级嵌套过多如何更新数据

即：在设计组件时，组件可能存在 `onChange`, `onBlur` 等 props，我把这些 `onXXX` prop 称之为此组件的事件。

如：

```tsx
function Input({value, onChange}) {
  return <input value={value} onChange={onChange}/>
}
```

在以上例子中，onChange 就是 Input 组件的事件 => 当 Input 组件的 value 发生改变时，onChange 将被触发。

类似这样的，我们就可以制定一项规则：组件 props 中的 `onXXX` prop，就代指此组件在某种情况时，会触发 `onXXX`

这项规则有一个好处：减少我们的心智负担。即，当我们向组件 A 传递 `onXXX`时，就知道一定是组件 A 在某种情况会触发 `onXXX`

- PS：即使组件 A 将 `onXXX` 向下继续传递给子组件 A2，我们也可以用这项规则：当组件A的子组件A2发生某种情况时， `onXXX` 将被触发。

减少心智负担的情况：组件A1中有子组件A2，A2中有子组件A3，A1，A2，A3 这三个组件都分别有 onChange 事件（prop），但是它们回传的值的数据格式不同，并且A3 中的回传值是A2的一部分，A2的回传值是A1的一部分 =>

```ts
const DataSouce = { // 传给 A1
  id: string
  steps: [
    { // A2
      id: string;
      questions: [
      	{ // A3
      		id:string
      		name:'yomua'
    		}
      ]
    }
  ]
}
```

- 最外层是 A1 的数据，在A1中，会根据 steps 数组的项(step)循环渲染 A2，A2又会根据 steps 项的 questions 的项(question)循环渲染 A3，

  然后当 A3 发生某种情况，将触发 onChange(question) 回传给 A2；

  - A2 使用 A3 的 onChange 部分需要根据 question.id 来确定需要更新 questions 中的哪个question

    ```tsx
    function A2({value:step, onChange:onA2Change}) {
      
      // 更新 step.questions 的 question 项
      function handleA3Change(question) {
       const newQuestions = step.questions.map(({que})=>{
          if(que.id === question) {
            return question
          }
          return que
        })
        // 当 A3 question 更新时，同时出发 A2change，更新 step
        onA2Change({
          ...step,
          question:newQuestions
        })
      }
      
      return step.questions.map((question) => <A3 value={question} onCHange={handleA3Change}/>)
    }
    ```

    

  A2 发生某种情况，将触发 onChange(step) 回传给 A1；

  - A1 使用 A2 的 onChange 部分需要根据 step.id 来确定需要更新 steps 中的哪个 step

    ```tsx
    function A1({value:类型是 DataSouce, onChange:onA1Change}) {
      
      // 更新 step
      function handleA2Change(step) {
       const newSteps= value.steps.map(({sp})=>{
          if(sp.id === step.id) {
            return step
          }
          return sp
        })
       //当 A2 触发了更新 step 时，更新 value（最外层的数据源）
       onA1Change(steps)
      }
      return value.steps.map((step) => <A2 value={step)} onChange={handleA2Change}/>)
    }
    ```

  最后

  ```tsx
  function Container() {
    const [dataSource,setDataSource] = useState<DataSouce>([])
    // 更新 dataSource，
    // 然后又使用最新的 dataSource 下传给 A1，从而更新 A1, A2, A3
    function handleA1Change(steps) {
      setDataSource({
        ...dataSource,
        steps,
      })
    }
    return <A1 value={dataSourcce} onChange={handleA1Change}/>
  }
  ```

  数据下流：Container -> A1 -> A2 -> A3

  数据回传：A3 -回传 question-> A2 -回传 step-> A1 -回传 steps-> Container，更新 steps

通过以上的实例，我们就可以知道当组件层级多层，且子层级是父层级数据结构中的一部分时，整个组件设计就会变得复杂起来，

所以当我们规定 => 传递给组件X的 props (value, onXXX  等) 就是此组件X要使用的值或方法，就是为了减少我们的心智负担。

TIPS：此节的实例中，当子组件发生改变回传数据时，总会接着调用父组件的 onChange，相当于父组件的 onChange 触发条件为：子组件发生某种改变时，

这样的好处是：可以使得父子组件更具有联动性；

坏处是：不能单独使用A2，或 A1，因为它们都都需要子组件作为它们的一部分。不过这也不算什么坏处，因为它们本身就是一体的，

并且 A2 或 A1 也不属于 base 组件，而**属于业务组件中用来展示数据的组件**，在这里只有 A3 才是 base 组件，它是最小单元，并且能单独使用哦，

## 受控和非受控状态或组件

当我们在自定义一个组件时，可以思考是否需要此组件必须是受控组件，或者说有些状态可以受控，也可以非受控，比如一个 `Button` 组件的 `loading`:

```tsx
const Button = memo(
    (props: {
        children: React.ReactNode
        loading?: boolean
        onClick?: (() => void) | (() => Promise<void>)
    }) => {
        const { children, loading, onClick } = props ?? {}
        const [activeLoading, setActiveLoading] = useState(false)
        const isLoading = useMemo(() => loading || activeLoading, [loading, activeLoading])
        const handleClick = async function () {
            if (loading === undefined || loading === null) {
                onClick()
                return
            }

            setActiveLoading(true)
            await onClick()
            setActiveLoading(false)
        }

        return (
            <div>
                {children}
                {isLoading && <Icon type='spinner' />}
            </div>
        )
    }
)
```

以上这么做的目的是为了：我们希望某种情况 `Button`  自动 loading，也希望 `Button` 不 loading.

# 书写

```react
const Example = (props) => {
  // 取 props
  const {test} = props 
  // useState
  const [state, setState] = useState()
  // 非 useState hook
  const testMemo = useMemo(()=>{},[a]) // 有依赖
  const testMemo = useMemo(()=>{},[]) // 无依赖
  // 自定义 hook
  const customHook = useCustomHook()
  // 常量
  const {stateA,stateB} = state
  const c = '123'
  // 方法
  const testFunc = () => {}
  // 处理函数
  const handleClick = () => {}
  // 元素
  const footer = (<div></div>)
  // 组件
  const Header = () => (<div></div>)
  // 封装 useEffect 的钩子
  useLayoutEffect(()=>{},[a])
	useLayoutEffect(()=>{},[])
  // useEffect 依赖多->少 或。少->多
  useEffect(()=>{}, [a,b])
  useEffect(()=>{
     // 若 getUser() 只用在此处，则将它写在 useEffect 中 -> 高内聚且关注点分离
    // 参见：https://zh-hans.reactjs.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns
    const getUser = async () => {};
    getUser()
  },[c])
  useEffect(()=>{},[])
  
  return (
		<Text 
      a={2} // constants number
      vvv={vvv} // constatns string
      cccc={true/false} // constants boolean
    	style={{color:'red'}}  // constants object
      test={test} // variable 短放在上面
      value={value} // variable
      onChange={(v)=>setValue(v)}
    />
  )
}
```

