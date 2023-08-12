# [高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html) | [React-小书](http://huziketang.mangojuice.top/books/react/lesson28)

## :triangular_flag_on_post: 称呼规定

- **高阶组件**：一个函数，简称为：HOC -> 且可以基于参数（组件）派生并返回另一个组件。

- **高阶函数**：一个函数，返回值为 HOC（必须）的函数。

- **被包装组件**：使用高阶组件时，向高阶组件中传递的组件。

- **包装组件**：高阶组件内部，基于被包装组件创建的新组件。
  
  TIP：对于高阶组件来说，通常包装组件就是它的返回值。

## 概念

**一言以蔽之高阶组件：基于一个组件派生出另一个组件的函数。** 

让我们用一个形象点的概念来介绍吧。

比如：假设现在有复数个组件，我们需要为每个组件都添加 n 个不同的元素：

- 最笨的方法就是去每个组件中手动写 JSX.

- 而聪明的方法则是：
  
  将【添加不同元素】这个逻辑抽离，形成一个高阶组件（函数），然后在每个组件中调用该高阶组件即可。

该高阶组件的逻辑大致是这样：

- 使得高阶组件接收 1 个传入的组件和一些参数
  
  在该高阶组件内部：只需要基于传入的组件和根据不同的参数添加不同的元素即可；

若此若做，我们只需要在每个组件中调用该高阶组件，然后传递1个要添加元素的组件以及规定要添加什么元素的参数，就能得到一个达到目的的新组件，这样子，我们只需要使用这个新组件即可。请详见：<a href='#高阶组件-向指定组件添加不同元素（通过组合组件通信）'>高阶组件-向指定组件添加不同元素（通过组合组件）</a>

注意：**高阶组件内部的创建的新组件（包装组件）和传入的组件（被包装组件）之间通过 `props` 传递数据（或许还有其他方法）。** 

- 详见：
  
  <a href='#高阶组件-查询指定数据中的用户名并返回用户数据（通过 props 通信）'>高阶组件-查询指定数据中的用户名并返回用户数据（通过 props 通信）</a> 
  
  <a href='#高阶组件-向指定组件添加不同元素（通过组合组件通信）'>高阶组件-向指定组件添加不同元素（通过组合组件）</a>

## 目的

复用组件之间的逻辑，增加阅读性，简化代码，

## 什么时候使用高阶函数

基于某些数据返回的 HOC 有一些公共逻辑，此时就可以使用高阶函数，在高阶函数内部把这些公共逻辑抽离，然后执行或传递下去，再返回 HOC

这样调用返回的 HOC 时，就可以减少这些公共逻辑的编写。

## 示例

#### 高阶组件-向指定组件添加不同元素（通过组合组件通信）

让我们来看看这个示例吧：

```tsx
// usewrappedcomponent.tsx 使用高阶组件
import React from 'react';
import ReactDOM from 'react-dom'
import withAddElement from "./withaddelements";

const A = (props: any) => (<div>{props.children}</div>)

// 向高阶组件中传递组件和参数
const data = { 
    span: { text: '传递的文本 span' }, 
    div: { text: '传递的文本 div' },
}
const NewComponent = withAddElement(A, data)

ReactDOM.render(
  NewComponent,
  document.getElementById('root')
);
```

- 通过调用高阶组件：addElement，我们向它传入组件 A 和一些参数，就能得到参数对应的元素，
  
  并且元素中的文本是我们指定的内容。

```tsx
// withddelements.tsx 高阶组件
import React from 'react';

interface IData {
    div?: { text?: string },
    p?: { text?: string },
    span?: { text?: string },
    a?: { text?: string },
}
const withAddElement = (WrappedComponent, data: IData) => {
    const ReturnedComponent = () => (
        <WrappedComponent>
            {data.div ? <div>{data.div.text}</div> : null}
            {data.span ? <span>{data.span.text}</span> : null}
            {data.p ? <p>{data.p.text}</p> : null}
            {data.a ? <a>{data.a.text}</a> : null}
        </WrappedComponent>
    )
    return ReturnedComponent;
}

export default withAddElement;
```

- 高阶组件中的包装组件使用 props 向被包装组件通信；
  
  在包装组件内部会自动生成参数对应的元素，并以【调用高阶组件向其传入的值】作为生成元素的文本。
  
  TIPS：这里通过[组合组件](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)的方式向被包装组件通信。

以上示例虽然简单，但是却充分的展示了包装组件的主要用途：**基于指定组件派生成新的组件，从而达到复用组件之间的逻辑。**

并且你可以扩展以上示例，如：在包装组件中会生成参数对应的元素的子元素、为子元素或被包装组件添加状态诸如此类。

### 高阶组件-查询指定数据中的用户名并返回用户数据（通过 props 通信）

```tsx
// datasource.tsx 数据源
export default [
    {name: 'Yomua',id: 333333,time: Date.now(),tel: 18825901952,data: {text: '我的名字是 Yomua'}},
    {name: 'Yhw'  ,id: 666666,time: Date.now(),tel: 18029856478,data: {text: '我的名字是 Yhw'  }},
];
```

```tsx
// type.tsx
interface IReturnData {
    name: string,id: number,time: number,tel: number,data: { text: string, },
    children?: React.ReactNode,
}
```

```tsx
// withgetdata.tsx 高阶组件
import React, { useEffect, useState } from 'react';
import './type' // 查询数据方法会返回的数据类型
type ISelectUserData = (DataSource: Array<any>, userName: string) => IReturnData // 查询数据方法的类型
type IWithGetData = (WrappedComponent: any, DataSource: Array<any>, userName: string) => any 
// 高阶组件（arg1:被包装组件,arg2:指定数据源,arg3:数据源中的指定用户名）
const withGetData: IWithGetData = (WrappedComponent, DataSource, userName) => {
    const selectUserData: ISelectUserData   // 从指定的源数据中获取指定用户的数据
        = (DataSource, userName) => DataSource.find(v => v.name === userName);
    const HOC = (props: any) => { 
        // 预留一个 setUserData，用来改变用户数据
        const [userData, setUserData] = useState(selectUserData(DataSource, userName))
        // 使用包装组件时，可能向透传一些 props 到被包装组件中。
        return (<WrappedComponent data={userData} {...props} />)
    }
    HOC.displayName = `通过 props 和被包装组件通信(${HOC.name})` // 设置包装组件在 DevTools 中的显示名称
    return HOC;
}
export default withGetData;
```

- withGetData 高阶组件：
  
  基于指定的组件、数据和用户名，派生出一个新的组件
  
  使用新组件时，它会将指定数据中的**用户数据作为 props 传递给被包装组件**。
  
  以及在使用包装组件时，将向包装组件传递的 props 也传递给被包装组件。

```tsx
// getyhw.tsx
import React from 'react';
import withGetData from "./withgetdata";import DataSource from "./datasource";import "./type";
type ISource = (props: IRetrunData) => any;
const GetYhw: ISource = (props) => { 
    console.log(props.data); // 输出 datasource.tsx 中 name:'Yhw' 数据
    return (<>GetYhw</>)
}
export default withGetData(GetYhw, DataSource, 'Yhw');
```

```tsx
// getyomua.tsx
import React from 'react';import withGetData from "./withgetdata";
import DataSource from "./datasource";import GetYhw from "./getyhw"; import "./type";
type ISource = (props: IRetrunData) => any;
const GetYomua: ISource = React.memo((props) => {
    console.log(props.data) // 输出 datasource.tsx 中 name:'Yomua' 数据
    return (<div> <GetYhw />  <p>GetYomua</p>< /div>)
})
const NewComponent = withGetData(GetYomua, DataSource, 'Yomua');;
ReactDOM.render(NewComponent,document.getElementById('root'));
```

1. 向 withGetData 高阶组件中传递：*被包装组件*、*数据源*和*指定用户名*会得到一个新组件。
   
   使用该新组件就相当于：向【被包装组件】传递指定数据源中的指定用户数据[以及向新组件传递的 props]

2. 这样，就正如你说看到的：我们在两个被包装组件中都输出了 `props.data`，都能得到我们想要的内容，
   
   而我们只不过是简单的调用了高阶组件 withGetData 并向之传入了指定参数罢了。

大致流程：

1. 调用 withGetData 并向之传递参数，得到一个新组件。

2. 使用该新组件作为默认导出组件；在调用新组件时：相当于向被包装组件传递 props 并渲染它，
   
   唯一的区别就是我们可以在渲染被包装组件之前添加一些状态 或 向被包装组件传递 props.

通过本节示例，我们已经了解了高阶组件的使用、作用和目的了，虽然高阶组件这名字听起来似乎很难，但是它却是非常简单的东西，仅仅只是一个函数而已，不是吗？

## 编写高阶组件时的一些规则

### [禁止改变*被包装组件*](https://zh-hans.reactjs.org/docs/higher-order-components.html#dont-mutate-the-original-component-use-composition)

- 不要修改被包装组件（传入给高阶组件的组件）的原型或以任何方式去改变被包装组件。

```tsx
import React from 'react';

function withLogProps(InputComponent) {
    // 这里无论是 cdm 或 cwm，亦或者是 cdu 都不会打印...why?
    InputComponent.prototype.componentDidUpdate = function (prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
    };
    // 返回原始的 input 组件，暗示它已经被修改。
    return InputComponent;
}

function InputComponent() {return (<div>InputComponent</div>)}
// InputComponent：原始组件
// 每次调用 withLogProps 时，EnhancedComponent 组件（包装组件）都会有 log 输出
// 但笔者试了一下，并不会输出，不知道为啥 2020-01-18 20:18 坐标：福建紫光科技有限公司。
const EnhancedComponent = withLogProps(InputComponent);
export default EnhancedComponent;
```

如果你真的想在使用包装组件时执行一些行为，可以这么写：（这个可以正确打印）

```tsx
import React from 'react';

function withLogProps(WrappedComponent) {
    return class extends React.Component {
        componentWillMount() { console.log('Current props: ', this.props); }
        render() {
            // 将 input 组件包装在容器中，而不对其进行修改。Good!
            return <WrappedComponent {...this.props} />;
        }
    }
}

function InputComponent() { return (<div>InputComponent</div>) }
// 每次调用 withLogProps 时，增强组件都会有 log 输出。
const EnhancedComponent = withLogProps(InputComponent);

export default EnhancedComponent;
```

### [约定：禁止将不相关的 props 传给被包装组件](https://zh-hans.reactjs.org/docs/higher-order-components.html#convention-pass-unrelated-props-through-to-wrapped-component)

在编写 HOC 时，我们可以给被包装组件添加一些特性，但是不应该去修改原有（被包装组件）的约定；

从 HOC 返回的包装组件应该和被包装组件一样，拥有着相同的接口。

这表明，HOC 不应该将和被包装组件无关的 prop 传递给它。

一个常见的 HOC 类似以下这样：

```tsx
// 任意一个 HOC 返回的包装组件的 render 中
render() {
  const { extraProp, ...passThroughProps } = this.props;
  const injectedProp = someStateOrInstanceMethod;
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

- `const { extraProp1,extraProp2,..., ...passThroughProps } = this.props;` 
  
  筛选出 HOC 特有且不应该传递下去的属性：extraProp
  passThroughProps 则是应该透传给被包装组件的 props

- `const injectedProp = someStateOrInstanceMethod;` 
  
  将需要的 props 注入到被包裹的组件中
  这里通常会是一些需要注入到被包装组件中的 props，
  
  也就是常说的：基于被包装组件派生成一个新组件时，为它添加的**某些特性**。
  如：一些状态 或是 一些方法。

### [约定：最大化可组合性](https://zh-hans.reactjs.org/docs/higher-order-components.html#convention-maximizing-composability)

即：HOC  可以接收 1 个或多个参数，并且 HOC 可以成为一个函数的返回值，通常我们将返回 HOC 的函数称之为高阶函数。

TIPS：并不称之为高阶组件，因为只有返回另一个组件的函数才会称之为高阶组件，而高阶函数只是返回 HOC 的函数。

让我们来看看以下的小示例吧：

```tsx
// 只接收 1 个参数的 HOC（传入 1 个组件）
const NavbarWithRouter = withRouter(Navbar);

// 接收多个参数的 HOC。比如在 Relay 中，HOC 额外接收了一个配置对象用于指定组件的数据依赖：
const CommentWithRelay = Relay.createContainer(Comment, config);
```

下面让让我们来看一下高阶函数吧：

```tsx
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// 让我们进行拆分

// connect 是一个函数，它的返回值为一个 HOC。
const enhance = connect(commentListSelector, commentListActions);
// echance HOC 会返回已经连接到 Redux store 的 HOC
const ConnectedComment = enhance(CommentList);
```

这种形式可能看上去有点迷惑，但语义却比以下的形式更清晰：

```tsx
// 这个逻辑和以上的示例是一样的。 即：往 HOC 中传入一个 HOC（由高阶函数返回 HOC 后，又调用该 HOC 向之传入参数）
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent));
```

并且高阶函数是一个很不错的工具函数，你可以将在 HOC 中的一些无关逻辑抽离，写在高阶函数中，就如以上高阶函数示例做的那样。而 withRouter HOC 很明显的里面存在了一些无关逻辑，使得整个 HOC 显得混乱。

如果你愿意，你可以编写组合工具函数：

```tsx
// compose(f, g, h) 等同于 (...args) => f(g(h(...args)))
const enhance = compose(
  // 这些都是单参数的 HOC
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

（同样的属性也允许 `connect` 和其他 HOC 承担装饰器的角色，装饰器是一个实验性的 JavaScript 提案。）

许多第三方库都提供了 `compose` 工具函数，包括 lodash （比如 [`lodash.flowRight`](https://lodash.com/docs/#flowRight)）， [Redux](https://redux.js.org/api/compose) 和 [Ramda](https://ramdajs.com/docs/#compose).

### [约定：包装显示名称以便轻松调试](https://zh-hans.reactjs.org/docs/higher-order-components.html#convention-maximizing-composability)

HOC 返回的包装组件会向任何其他组件一样，会显示在 [React Developer Tools](https://github.com/facebook/react-devtools) 中。

为了方便调试，请选择一个显示名称，以表明它是 HOC 的产物，你可以看看<a href='#高阶组件-查询指定数据中的用户名并返回用户数据（通过 props 通信）'>这个</a>示例。

```tsx
// 任意一个 HOC 中。
const withGetData:  = (WrappedComponent [, ...]) => {
    const WrapComponent = (props: any) => {return (<WrappedComponentdata ... />)}
    // 设置包装组件在 DevTools 中的显示名称。
    WrapComponent.displayName = `通过 props 和被包装组件通信(${WrapComponent.name})`
    return HOCWrappedComponent
}
export default withGetData;
```

- ```tsx
  WrapComponent.displayName = `通过 props 和被包装组件通信(${WrapComponent.name})`
  ```
  
  其中如果将 `${}` 阔在圆括号中，如：`(${WrapComponent})`，`WrapComponent.name` 会显示在前面，作为组件名字。
  
  并且其他文字将会出现在 `WrapComponent.name` 后面，作为注释。
  
  ![](./picture/hight-order-component-usedisplayname.png)
  
  如果没有圆括号包裹，则显示为：
  
  ![](./picture/hight-order-component-usedisplayname-noparentheses.png)

## [注意事项](https://zh-hans.reactjs.org/docs/higher-order-components.html#caveats)

编写 HOC 时，有一些需要注意的地方，对于 React 新手来说可能并不容易发现。

以下是一些新手可能会犯错的地方。

### [不要在 render 方法中使用 HOC](https://zh-hans.reactjs.org/docs/higher-order-components.html#dont-use-hocs-inside-the-render-method)

### [务必复制静态方法](https://zh-hans.reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over)

### [Refs 不会被传递](https://zh-hans.reactjs.org/docs/higher-order-components.html#refs-arent-passed-through)
