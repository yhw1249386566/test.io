## Refs

### 被弃用的 this.refs 属性

2020-11-23 日，this.refs 已经被弃用了，当你在 VSCode 或任何一款优秀的编译器中使用 this.refs，则编译器会提示你，该属性已经 deprecated.

你可以参加最新的官方文档：[Refs and the DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 

```react
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class UseRefs extends Component {
    componentDidMount() {
       // deprecated 
        this.refs.myRef; // <input />
    }
    render() {
        return (
            <input ref='myRef' />
        );
    }
}

ReactDOM.render(
  <UseRefs />,
  document.getElementById('root')
);
```

### 目前使用 Refs 的方法（在 class component 中）

- [React.createRef()](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#creating-refs) 
- [回调 Refs](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html#callback-refs) 

### 函数式组件中通过 Hooks 使用 Refs

#### 首先需掌握

在函数式组件中想要使用 ref 属性，那么则首先需要掌握以下基本知识：

1. [Hook useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 

   用于父组件，返回一个可变的 `ref` 对象，且返回的 ref 对象在组件的整个生命周期内保持不变。

   该对象中存在一个固定的 `current` 属性，你可以在使用 `useRef(iniValue)` 传入一个对象（如：子组件实例或节点对象）初始化值，也可以 以 `<div ref={useRef()返回的对象} />` 这样的方式获取一个节点/组件的实例。

   简单来说：当我们使用 useRef() 时能获取可变的 ref 对象并赋值给变量 A，然后我们将 A 赋给某个 JSX 上的元素的 ref 属性，这样经过 React 内部的某些操作，ref 对象（也可以说变量 A）就有了 `current` 属性，我们可以使用这个 `current` 属性获取到我们把 A 传递给的那个 JSX 上的元素。

   TIP：useRef() 可以[很方便地保存任何可变值](https://zh-hans.reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) => 

   `const store = useRef(new Store()).current;` 将 new Store() 保存为一个 ref 对象，使得返回的 ref 对象在组件的整个生命周期内保持不变，并获取它存值的 current 属性赋值给 store 变量。

   这样，在该代码行所存在的组件的整个生命周期中，store（ref 对象）将保持不变。

2. [Hook useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 

   使用于子组件，需向 `useImperativeHandle Hook` 传递 2 个必选参数，1 个可选参数。

   1. ref

      接收组件函数的 2 个参数：(props,ref) => { useImperativeHandle(ref,createHandle) }

      组件函数第 1 个参数为 props，第 2 个参数为 ref.

   2. createHandle 

      一个 callback，其返回值是一个对象，这个对象中的属性名将作为子组件暴露出去的 ref

   3. deps?

   使用 `useImperativeHandle Hook` 的组件将可以决定暴露出去什么属性。

3. [React.forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 

   子组件中使用，将子组件函数（即：函数式组件的形式）作为参数传递给 `React.forwardRef()` ，它会返回一个 React 组件，这个 React 组件相当于原来的组件函数会渲染出的组件，

   - `const Child = React.forwardRef( (props,ref)=>{...} )`

   只不过`React.forwardRef()` 返回的这个组件还能够将其接受的 [ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 属性转发到其组件树下的另一个组件中，虽然这种技术并不常见，但在以下两种场景中特别有用：

   1. [转发 refs 到 DOM 组件](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
   2. [在高阶组件中转发 refs](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

#### 基本流程

**子组件中：**

1. 将子组件的渲染函数当作 [React.forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 函数的第 1 个参数

   并使得子组件的渲染函数接收 2 个参数：

   1. props
   2. ref（关键）

   ```tsx
   const ClassChild = React.forwardRef( (props: any, ref: any) => {...} )
   ```

2. 在子组件的渲染函数中使用 [useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) Hook 函数接收 3 个参数

   1. ref（渲染函数的 2 个参数）

   2. createHandle 

      一个 callback，其返回值是一个对象，这个对象中的属性名将作为子组件暴露出去的 ref

   3. deps?

   ```tsx
   const ClassChild = React.forwardRef( 
       (props: any, ref: any) => {
           ...
           useImperativeHandle(ref, ()=> {
               key1:value1,
               key2:value2,
               ...
           },deps?)
           ...
   	}
   )
   ```

**父组件中：**

1. 在父组件的渲染函数中使用 [useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) Hook 函数赋值给一个变量，该变量是你用来引用子组件实例并使用其暴露出来的 ref 属性的。

   ```tsx
   const ClassParent = () => { const classChildRef: any = useRef(null) }
   ```

2. 在父组件的渲染函数的 return 的 JSX 中使用子组件时，在子组件的 JSX 上使用 `ref = {myRef}`，其中 myRef 指的是你使用的`某个变量指向 useRef()`，在本示例中，指的是 `classChildRef`。

   这个目的是：将 `ref = {myRef}` 传递给子组件*（注意：ref 属性不属于 prop，key 也不属于，这里说的传递指的是 React 内部做的一些其他操作）*，

   子组件将接收以及做一些处理从而使得父组件可以使用 [useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 返回的对象来操作子组件暴露出来的 ref 属性。

   ```tsx
   const ClassParent = () => { 
   	const classChildRef: any = useRef(null) 
       return (
       	<div>
           	<ClassChild ref={classChildRef} />
           </div>
       )
   }
   ```

3. 最后你可以通过在父组件的某个位置（前提是子组件已挂载）使用 `classChildRef.current.xx` 访问子组件中 [useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) Hook 函数的第 2 个参数暴露出来的属性。

   或你可以这么写：`const classChildRef: any = useRef(null).current`，这样你可以直接通过 `classChildRef.xxx` 访问子组件暴露出的属性。

完整示例详见：<a href="#通过 ref 将子组件的方法/属性暴露给父组件">通过 ref 将子组件的方法/属性暴露给父组件</a>（React.md）

#### Reference

1. [Hook useRef](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 
2. [Hook useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle) 
3. [React.forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 

### Reference

- [Refs and the DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 
- [Refs 转发](https://zh-hans.reactjs.org/docs/forwarding-refs.html) 

## [Refs 转发](https://zh-hans.reactjs.org/docs/forwarding-refs.html) 

### 概念

`ref 转发` 指的是将一个组件中的任意节点对象用于其他组件的一项可选特性。

即：将子组件的某个节点对象转发给父组件，使得父组件可以使用子组件转发的节点对象，

下面让我们通过一个简单的小示例来了解了解吧：

```tsx
// child.tsx
import React, { useEffect } from "react"

// 使用 React.forwardRef() 将 ref 属性暴露（使得任意一个组件都可以使用该 ref），该函数本身返回一个 React 结点。
const Child = React.forwardRef(
    (props: any, ref: any) => {
        useEffect(() => { console.log(ref.current) }) // 子组件也能使用 ref
        return (
            <>
            	<button ref={ref}>被转发的 ref（指当前 button 节点对象）</button>
                {/* 转发的 ref 只会有 1 个节点对象，即：最后使用 ref 的节点对象，即：后者会覆盖前者。*/}
                <span ref={ref}>span</span> // 如果存在，则 ref 为这个 span 节点对象，而非 button
        	</>
        )
    }
)
export default Child

// parent.tsx
import React, { useEffect, useRef } from "react"
import Child from "./child"
const Parent = () => {
    // userRef() 也等价于 React.createRef()
    const classChildRef: any = useRef(null)
    useEffect(() => y{ console.log(classChildRef) })
    return (<Child ref={classChildRef} />)
}
export default Parent
```

1. 在 Parent 组件中创建一个 ref（可以使用 [useRef Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 或 [React.createRef](https://zh-hans.reactjs.org/docs/react-api.html#reactcreateref)），并通过在 Parent 组件中向 Child 组件传递
   `ref ={classChildRef}`

2. 然后我们在 Child 组件中，通过 [`React.forwardRef(props, ref)`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref) 的第 2 个参数 `ref` 接收从 Child 组件的 JSX 元素中
   （`<Child ref={classChildRef} />` ） 传递过来的 ref 属性，

3. 你可以将这个接收传递 `ref` 属性的参数 ref 用于 Child 组件的任意元素上`（只可应用一个，如若应用多次，则后者将覆盖前者）`

4. 最后你就可以在父组件 Parent 上使用它，即：当前示例中，classChildRef 将为 button 节点对象 或 span 节点对象。

   当然了你可以在子组件 Child 使用，就像上面的例子一样。

TIP：[ref 不属于 props](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)，就像 `key`  也不属于 props 一样。

且值得一提的是：如果你在子组件 Child 中使用 [useImperativeHandle Hook](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)，那么你在该 Hook 中暴露的属性将会作为转发的 ref，即作为：`classChildRef` 的值，其他的 ref 则立马失效！

```tsx
// Child 组件中使用了该 Hook
useImperativeHandle(ref, () => ({
	childGet() { console.log(state.index) },
}))
// 此时的 classChildRef = { current: {childGet: ƒ}  }
```

### [在高阶组件中转发 refs](https://zh-hans.reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components) 

#### 示例

在 <a href='#通过 ref 将子组件的方法/属性暴露给父组件'>通过 ref 将子组件的方法/属性暴露给父组件</a>（React.md）一节中，我们已经讨论过了 [`useRef`](https://zh-hans.reactjs.org/docs/hooks-reference.html#useref) 和 [`React.forwardRef`](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref)， 它们是转发高阶组件的关键。

```tsx
// withqueryfield.tsx：该 HOC 将可以获取到被包装组件的节点对象，并能为其配置一些信息。
const withQueryField = (WrappedComment, config: IConfig) => {
    const QueryField = React.memo((props: any) => (
        <div>
            <!-- 使得被包装组件的 ref 能被获取，或赋予给任意其他元素 -->
            <WrappedComment ref={props.forwardedref}  {...props}>
                {props.children}
            </WrappedComment>
        </div>
    ))
    QueryField.displayName = `查询字段(${QueryField.name})`
    return React.forwardRef((props: any, ref) =>
        <QueryField
            {...props}
            forwardedref={ref}
        />);
};
export default withQueryField;
```

```tsx
// 任意一个组件.tsx
import withQueryField from "./withqueryfield";
import React, { useRef } from "react";

// 相当于得到了 <QueryField />
const TaskID = withQueryField(AnyComponent, {/** 一些配置 */})

const NewComponent = (props:any) => {
    const task_id_ref = useRef(null); 
    return (<TaskID 
        onClick={ ()=>console.log(task_id_ref.current) } // 能获取到 AnyComponent 节点对象
		ref={task_id_ref} 
	/>)
}
```

- `const task_id_ref = useRef(null);` 

  先得到一个可变的 ref 对象（我们将在 withqueryfield.tsx）中将它绑定到一个组件上。

- `<TaskID ref={task_id_ref} />`

  将可变的 ref 对象（task_id_ref）赋值给 TaskID 的 ref 属性。

  由于使用 \<TaskID> 时，我们已经在它的渲染函数中，使用了 `React.forwardRef(props,ref)`，

  所以该 ref 属性将传递给 forwardRef() 的第 2 个参数。

- `return React.forwardRef( (props,ref) => <QueryField /> )`

  [React.forwardRef](https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref)：该函数将会使用 props,ref 调用传进来的渲染函数（函数式组件），

  并返回该渲染函数所返回的组件。也就是说：React.forwardRef 应该返回一个 React 节点。

  返回 \<QueryField />，在使用返回的组件 A 时，使用 A 的 ref 属性，就能通过 React.forwardRef(函数式组件) 的处理获取到 ref 对象，

  并将 ref 对象作为 prop 传递给你真正想要获取的元素（节点对象、组件），

  然后在该元素上使用 ref={props.xx} 就能使得 ref 可变对象绑该元素，

  那么我们就可以通过 ref 对象的 current 属性获取到该绑定元素。

- `<QueryField forwardedref={ref} />`

  将 React.forwardRef() 的第 2 个参数赋值给 forwardref，并将 forwardref 作为 prop 往下传递到\<QueryField> 的 JSX 里面。

- ` <WrappedComment ref={props.forwardedref} />` 

  被包装组件通过 ref 属性接收传过来的 forwardref，

  从而最后使得 useRef() 创建的可变对象绑定为被包装组件的节点对象。

  这样我们就能使用 useRef() 返回的对象的 current 属性，获取到被包装组件的节点对象。

  就能愉快的使用诸如 focus() 这样的方法或属性了。

**总结：** 

1. 获取 ref 可变对象

2. 将 ref 可变对象赋值给某个组件的 ref 属性

3. 在 HOC 的 return 中，返回 React.forwardRef( (props, forwardref)=><EnhanceComponent  xx=forwardref / > ) 

4. 将 forwardref 参数赋值给 EnhanceComponent 组件的某个属性（如：xx），

   并将该属性作为 prop 传递到该组件的 JSX 中。

5. 在 EnhanceComponent 组件的 JSX 的 renturn 中，找到一个任意的元素（组件），

   使用它的 ref 属性接收 `forwardref` prop（ref=forwardref)

这样 ref 可变对象就成功绑定到了这个使用 ref 属性接收 `forwardref` prop 的组件或元素。

PS：你可以继续将 `forwardref` prop 往下传递，直到到你想要获取的节点对象，在它上面使用 `ref=forwardref` 即可
