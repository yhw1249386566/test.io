# Api  [CN-MobX 5.x](https://cn.mobx.js.org/refguide/api.html) | [EN-MobX 6.x](https://mobx.js.org/api.html) 

您可以[购买 Mobx 6 的备忘单](https://gumroad.com/l/fSocU)，它只有一页，但是它含有 Mobx 中所有重要的的 API，并且针对 MobX 6.x 进行了更新，包括 mobx-react/-lite.

## [makeObservable](https://mobx.js.org/observable-state.html#makeobservable)(MobX 6.x)

### 用法

- `makeObservable(target, annotations?, options?)`

PS：makeObservable 只能用于 class component 中

### 介绍

#### target

`makeObservable` 可以用来捕获现有对象的属性并使得这些属性成为可观察属性，我们可以把任何 JS 对象包括 class 的实例（这和 observable 不同，<a href=#基本类型和类实例无法将之转为可观察的数据>observable 永远无法观察 class 实例</a>）传递到 `makeObservable` 的第 1 个参数 target 中,

但请注意：通常，我们会把 `makeObservable` 用在 class 的 constructor，并使得它的第 1 个参数 target 为 this：

```js
class A {
	constructor() {
		makeObservable(this,{}) 
	}
}
```

功能性并且具有参数的函数不需要任何注释，如：`findUsersOlderThan(age: number): User[]`

> 原文：Methods that derive information and take arguments (for example `findUsersOlderThan(age: number): User[]`) don't need any annotation. 

从 reaction 调用它们时，将会跟踪它们的读取操作，但是不会记住它们的输出，以防内存泄漏

> 原文：Their read operations will still be tracked when they are called from a reaction, but their output won't be memoized to avoid memory leaks. 

看看这个： [MobX-utils computedFn {🚀}](https://github.com/mobxjs/mobx-utils#computedfn) 

#### annotations?

`makeObservable` 的第 2 个参数通常是一个对象，用来映射第 1 个参数对象（通常为 this）的每个属性，我们为这些属性赋予 mobx 中的各种 api，标志着它们的用处：

```js
// 在 class 中使用 makeObservable 的实例
import { makeObservable, observable, computed, action } from "mobx"

class Doubler {
    value

    constructor(value) {
        makeObservable(this, {
            value: observable,
            double: computed,
            increment: action
        })
        this.value = value
    }

    get double() {
        return this.value * 2
    }

    increment() {
        this.value++
    }
}
```

```js
// 在工厂函数中使用 makeAutoObservable 的实例
// 注意：这里用的是 makeAutoObservable
import { makeAutoObservable } from "mobx"

function createDoubler(value) {
    return makeAutoObservable({
        value,
        get double() {
            return this.value * 2
        },
        increment() {
            this.value++
        }
    })
}
/**
 * NOTE：class 也可以利用 makeAutoObservable。
 * 这里之所以使用 makeAutoObservable，是为了演示这些示例之间的差异，仅仅说明了如何将 MobX 应用于不同的编程样式。
 */
```

#### [options?](https://mobx.js.org/observable-state.html#options-)

`makeObservable` 和 `makeAutoObservable` 它们的第 3 个参数的行为是一样的。

## [makeAutoObservable](https://mobx.js.org/observable-state.html#makeautoobservable)(Mobx 6.x)

### 用法

- `makeAutoObservable(target, overrides?, options?)` 

PS：makeAutoObservable 只能用于 class component 中

### 介绍

`makeAutoObservable` 类似于 steroids 上的 `makeObservable`，

> 原文：`makeAutoObservable` is like `makeObservable` on steroids

因为它会默认推断所有属性，其推断规则为：<a href="#:zap:[Interference rules](https://mobx.js.org/observable-state.html#makeautoobservable)">Interference rules </a>

但是你仍然可以使用带有特定注释的 `overrides` 参数来覆盖默认的推断行为。

TIP：使用 `makeAutoObservable` 和使用 `makeObservable` 相比，`makeAutoObservable` 函数更加紧凑且易于维护，因为新成员不必明确提及。

### Note

`makeAutoObservable` 无法用在具有 super() 或子类上。

#### makeObservable VS makeAutoObservable

`makeAutoObservable()` 和 `makeObservable()` 相比，其结构更加紧凑与容易维护，这是因为 new members don't have to be mentioned explicitly（新成员不必明确提及）。

Howerver，在具有 super 或 subclassed（子类中） 的 class 中，无法使用 makeAutoObservable()，否则会在编译完成后运行报错：

`Error: [MobX] 'makeAutoObservable' can only be used for classes that don't have a superclass`，有如下示例：

```tsx
class A {
    constructor() {
        makeAutoObservable(this) 
    }
};

class B extends A {
    constructor() {
        super()
        makeAutoObservable(this) //error，这会在编译完成后运行时失败
    }
}
```

### 参考文档

- [makeAutoObservable](https://mobx.js.org/observable-state.html#makeautoobservable)(Mobx 6.x)

## [CN-(@)observable](https://cn.mobx.js.org/refguide/api.html)|[EN-observable](https://mobx.js.org/observable-state.html#observable)

### 用法

1. `observable(source, overrides?, options?)` [EN-MobX 6.x](https://mobx.js.org/observable-state.html#observable)
2. `observable(value)` [CN-MobX 5.x](https://cn.mobx.js.org/refguide/api.html#observablevalue)
3. `@observable classProperty = value` [CN-MobX 5.x](https://cn.mobx.js.org/refguide/api.html#observablevalue)

NOTE：MobX 6.x 中，@observable 是可选的。

以上的三种用法其行为是等价的，只不过 MobX 6.x 中，似乎多了两个参数，我将会在后面解释。

在这里，笔者始终建议使用第 1 种写法，它更为的安全以及够新（2020-12-11），或者说是标准。

### 介绍

> 在本节中，我将以 MobX 6.x 中的 `observable` 去介绍。
>
> `observable(source, overrides?, options?)` MobX 6.x

#### source

当我们调用 `observable` 函数时，向之传递 source 参数，那么 mobx 就会观察到整个 source 对象一次，并且 mobx 将会克隆你传过来的 source 参数对象（克隆的对象是一个 [Proxy（代理） 对象](https://mobx.js.org/configuration.html#proxy-support)），同时会观察  source 对象的所有成员（观察 source，而非克隆 source 的对象），使它们变为可观察属性，这类似于 `makAutoObservable` 的实现。

简单来说： `observable()` 将返回一个源对象的 Proxy 对象，这意味着：你向 `observable()` 传递的 source 即使在未来又添加了成员，那么该成员也将自动的成为 mobx 的可观察成员（除非禁用了 [Proxy 用法](https://mobx.js.org/configuration.html#proxy-support)），

sure，我们也可以向 `observable()` 中传入集合类型，如：Set、Map、Array。同样的，mobx 也会克隆这些集合类型（一个 Proxy）并将之转为可观察对象，即：这些集合类型即使在未来添加了成员，这些添加的成员也将转为可观察成员。

#### overrides?

你可以提供一个 `overrides` 映射（override map）来为特定成员指定注释（annotations），这个行为类似于 <a href="#[makeAutoObservable](https://mobx.js.org/observable-state.html#makeautoobservable)(Mobx 6.x)">makeAutoObservable</a>：

```js
makeObservable(this, {
    value: observable,
    double: computed,
    increment: action
})

// 直观示例
observable({
    setAge(){}
},{
    setAge:action
})
```

在以上的直观示例中，我们使用向 `observable` 传入第 2 个参数（overrides）来改变 MobX 的 <a href="#:zap:[Interference rules](https://mobx.js.org/observable-state.html#makeautoobservable)">默认注释推断规则</a>，使得 `observable` 观察的对象中的 setAge() 的注释从 autoAction（默认） 改变为 action（自设置）。

#### [options?](https://mobx.js.org/observable-state.html#options-)

> The above APIs take an optional `options` argument which is an object that supports the following options:
>
> - `autoBind: true` automatically binds all created actions to the instance.
> - `deep: false` uses `observable.ref` by default, rather than `observable` to create new observable members.
> - `name: <string>` gives the object a debug name that is printed in error messages and reflection APIs.

#### 使用 done 排除属性或方法

你可以使用 `false` 把一个正在处理的属性或方法排除，PS：这需要你手动去做它，使用 done:boolean 去标志一个需要排除的属性或方法。

```js
import { observable } from "mobx"

const todosById = observable({
    "TODO-123": {
        title: "find a decent task management system",
        done: false
    }
})

todosById["TODO-456"] = {
    title: "close all tickets older than two weeks",
    done: true
}

const tags = observable(["high prio", "medium prio", "low prio"])
tags.push("prio: for fun")
/**
	In contrast to the first example with makeObservable, observable supports adding (and removing) fields to an object. This makes observable great for collections like dynamically keyed objects, arrays, Maps and Sets.
	与 makeObservable 的第一个示例不同，observable 支持向对象添加（和删除）字段。这使得 observable 非常适合于动态键控对象、数组、映射和集合等集合。
 */
```

PS：这点在 [makeAutoObservable](https://mobx.js.org/observable-state.html#makeautoobservable) 中 ` In particular false can be used...`

### Note

#### `make(Auto)Observable` and `observable` 的主要区别

`make(Auto)Observable` and `observable` 的主要区别是：`observable` 的第一个参数将接收一个需要被观察的对象，同时它还会创建这个可观察对象的克隆对象（Proxy 对象）。

第 2 个不同点就是：observable 会创建一个 Proxy 对象，来防止你把一个对象视作动态的查找映射（即：防止你在未来往这个对象上继续添加属性），这是因为创建的这个 Proxy 对象能够捕获未来添加的属性。

> 简单来说：observable 会创建一个 Proxy 对象，来捕获[被代理对象]以后可能添加的属性，使得你使用 observable 观察到的对象在以后添加属性时，这些属性也将是可观察的。

TIP：如果你想要使可观察的对象具有一个规则结构，并且你保证其中所有成员都已预先声明，那么我们建议使用 `makeObservable`，因为非代理对象的速度更快，并且非代理对象更加容易 debugger 和 console.log 中进行审查。

因此，在工厂函数中推荐使用 `make(Auto)Observable` API。

值得一提的是：未来有可能通过 `{proxy: false}` 作为一个 observable 的选项得到一个非代理的克隆。

#### 基本类型和类实例无法将之转为可观察的数据

`observable` 无法将基本类型（原始值）和类实例（new class()）转变成可观察的数据。

其中前者（基本类型转为可观察的数据）在 MobX 中，没有任何方法可以将之转为可观察对象；而后者（类实例）在 MobX 中存在方法（如：`observe`）将之转为可观察的数据，只是 `observable` 做不到罢了。

而 MobX 无法把基本类型转为可观察的数据的原因很简单：在 JS 中，[基本类型（原始值）是不可改变的](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B(%E5%8E%9F%E5%A7%8B%E7%B1%BB%E5%9E%8B)/%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B(%E5%8E%9F%E5%A7%8B%E7%B1%BB%E5%9E%8B).md#%E5%AE%9A%E4%B9%89)-[见这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)，这条规则是定死的！

而把类实例传递给 `observable` 或一个已经使用 `observable` 观察的对象作为其属性，都永远不会使得类实例成为一个可观察的数据是因为：让 class 中的成员转为可观察的状态是 class constructor 的责任。

且即使你将一个可观察的对象（`observable(obj)`）中的某个属性——*一个基本类型的值或一个类实例*，当作 props 传递给子组件，即使该子组件是响应式的（`@observer class... / observer(class)`），也无法在你改变 obj.value 时，去进行响应。

### [可用的方法](https://mobx.js.org/observable-state.html#available-annotations) 

### 示例

#### 组件中属性无法更新？

### Reference

- [EN-observable MobX 6.x ](https://mobx.js.org/observable-state.html#observable) 
- [CN-observable MobX 5.x](https://cn.mobx.js.org/refguide/api.html#observablevalue)

## :zap:[Interference rules](https://mobx.js.org/observable-state.html#makeautoobservable)

### 概念

MobX 中存在自己的一套推断注释的规则。

简单来说就是：当你使用 `observable` 或 `make[Auto]Observable` 去观察一个对象时，那么 MobX 将对该对象中的属性、函数、get() 等进行默认注释，其中默认注释推断规则如下：

1. 所有包含 function  值的成员（属性）都将使用 `autoAction` 进行注释。

   TIP：这是类似继承链的关系，即：对象的属性若是一个对象，在该子对象中若存在 function，则也会注释为：`autoAction`

2. 所有 get 属性都将注释为：`computed`

3. 所有其他字段都将注释为：`observable`

4. [机翻]作为生成器函数的任何(继承的)成员都将被标注为“流”。(请注意，在某些transpiler配置中，生成器功能是无法检测到的，如果流程没有按预期工作，请确保明确指定“流程”。)

5. 在 `overrides` 参数中将不会注释带有 `false` 的成员标记，如：使用只读字段（标识符）

> 原文：
>
> 1. Any (inherited) member that contains a `function` value will be annotated with `autoAction`.
> 2. Any `get`ter will be annotated with `computed`.
> 3. Any other *own* field will be marked with `observable`.
> 4. Any (inherited) member that is a generator function will be annotated with `flow`. (Note that generators functions are not detectable in some transpiler configurations, if flow doesn't work as expected, make sure to specify `flow` explicitly.)
> 5. Members marked with `false` in the `overrides` argument will not be annotated. For example, using it for read only fields such as identifiers.

PS：在 <a href="#[makeAutoObservable](https://mobx.js.org/observable-state.html#makeautoobservable)(Mobx 6.x)">makeAutoObservable</a> 一节中，我们已经提到过！

### 示例

一个更直观且阐述了 mobx 中（注释）推断规则的例子：

```js
var person = observable({
    /**
     * mobx 会将以下的 3 个成员（属性）注释为：observable
     */
    name: "John",
    age: 42,
    showAge: false,
	
    // mobx 将推断该 get 的注释为：computed
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },
	
    /** 动作
     * 本来 mobx 将会推断 setAge() 函数的注释为：autoAction，
     * 但由于我们传递给 observable() 的第 2 个参数将之重新设置了注释
     * 所以此时 mobx 会将 setAge() 注释为：action
     */
    setAge(age) {
        this.age = age;
    }
}, {
    setAge: action
    // 其他属性默认为 observable / computed
});
```



## Reactions(反应) & Derivations(衍生)

### CN-[(@)observer](https://cn.mobx.js.org/refguide/observer-component.html#observer)(MobX 5.x) | [EN-observer](https://mobx.js.org/api.html#react-integration)(MobX 6.x)

#### 用法

1. ```tsx
   class MyComponent extends React.Component { ... })
   observer(MyComponent)
   // 等价于
   const MyComponent = () => observer( (prpos:any)=>{...}  ) // 建议使用
   ```

2. ```tsx
   // 装饰器是可选的！MobX 6.x 中也是如此。
   @observer
   class MyComponent extends React.Component { ... })
   ```

3. `observer(React.createClass({ ... }))`

4. `observer((props, context) => ReactElement)`

5. `observer(class MyComponent extends React.Component { ... }`+

以上 5 中用法其效果是等价的，但是前面两种是最常见的用法。

不过在这里，笔者始终建议使用第一种，即：不要在 MobX 中使用装饰器（这是非标准的，参见：[从 MobX 4/5 迁移到 6](https://mobx.js.org/migrating-from-4-or-5.html)）

*PS：也请根据实际情况选择 Mobx 的相应版本。*

#### 介绍

`observer` 函数/装饰器可以用来将 React 组件转变成响应式组件。 类似于 class 的组件中使用 makeAutoObservable(this) 使得当前 class 组件的实例变为响应式的。

它用 `mobx.autorun` 包装了组件的 render 函数，以确保当任何组件的渲染中（render 中）使用的[被观察的数据]变化时都可以强制刷新组件。  

简单来说就是：当组件的 render 中存在的[被观察的状态]发生改变时，将会强制刷新组件，即：重新执行一次  render，这和 [setState()](https://zh-hans.reactjs.org/docs/react-component.html#setstate) 或 [useState Hook](https://zh-hans.reactjs.org/docs/hooks-state.html) 的行为一致，它们都会重新刷新组件（重新执行一次 render）。

并且 `observer` 还会确保当组件中的[被观察的状态]没有发生改变时，组件不会重新进行渲染，因此：即使组件中存在[被观察的状态]，但是该状态从未改变过，那么该组件将永远不会因为这个状态导致重新渲染。

`observer` 不关心可观察状态是怎么存于组件中的，它只需要读取组件中可观察状态即可。

#### Note 注意点

##### `observer` 是 `mobx-react` 包中的

:zap: `observer` 是由**单独的** `mobx-react` or `mobx-react-lite`（mobx-react 集成 mobx-react-lite） 包提供的。

##### 确保 `observer` 是第 1 个装饰器或函数

:heavy_exclamation_mark: 当 `observer` 需要组合其它装饰器或[高阶组件](https://zh-hans.reactjs.org/docs/higher-order-components.html)时，请确保 `observer` 是最深处(第一个应用)的装饰器，否则它可能什么都不做。

##### 禁止将 `observervable` 的值传递到非 `observer` 组件

不要将使用 `observable` 观察到的值的 Proxy 传递到一个非 `observer` 的组件中。参见：[MobX 6.x-Don't pass observables into components that aren't `observer`](https://mobx.js.org/react-integration.html#dont-pass-observables-into-components-that-arent-observer) 

```TSX
class Todo {
    title = "test"
    done = true
    constructor() {makeAutoObservable(this)}
}
const todo = new Todo();

const TodoView = observer( ({ todo }: { todo: Todo }) =>
   // 错误！GridRow 组件将不会因为 todo.titie 或 todo.done 改变从而重新渲染
   return <GridRow data={todo} />

   // 正确！让 TodoView 组件检查 Todo 可观察状态的改变，并传递 JS 原始数据结构。
   return <GridRow data={{
       title: todo.title,
       done: todo.done
   }} />

   // 正确，使用工具函数 'toJs' 当然也是好的，但是前一个更为简单直白。
   return <GridRow data={toJS(todo)} />
)
<TodoView todo={todo} />
```

- [EN-toJS-MobX 6.x](https://mobx.js.org/api.html#tojs)
- [CN-toJS-MobX 5.x](https://cn.mobx.js.org/refguide/tojson.html#tojs)

以上示例中正确的原因：您可以看看[此处](https://mobx.js.org/observable-state.html#converting-observables-back-to-vanilla-javascript-collections)，以及这么做的[原因](https://mobx.js.org/react-integration.html#dont-pass-observables-into-components-that-arent-observer)。

```js
/*
 * 这是因为当 observable 等函数去装饰状态（数据）时，会返回一个 Proxy 对象，而 mobx 
 * 正是通过这个 Proxy 去监听数据改变并作出对应处理的。
 * 但是你如果将一个 Proxy 对象传递给一个非 observer 的 React 组件这是没有任何用处的，
 * 所以你需要以普通的 JS 数据结构传递给非 observer 组件，使得包裹非 observer 组件的
 * observer 组件能观察在非 observer 组件上的变化，而不是让非 observer 组件自己去观察！
 * 这样，才能使得 observable 值更新时，非 observer 组件也能进行重新渲染。
 */
```

其原理是：GridRow 是属于 TodoView 的子组件，当 GirdRow 中的 Proxy 的原始数据发生改变后，TodoView 将会因为 observer() 去强制更新 render，而这里的 render() 所执行的代码包含 GridRow，所以也就相当于去更新了 GridRow.

参见[更多示例](https://mobx.js.org/react-integration.html#callback-components-might-require-observer)

##### `observer` 组件访问其他模块中的 `observable` 

当我们使用 `observer` 去使一个 React 组件变成响应式时，那么在该响应式组件的渲染函数中（可能是 class 组件的 render 或函数式组件的 return），

若存在当前模块（当前组件所属文件）的可观察状态，那么若该可观察状态改变，则响应式组件的的渲染函数将会强制重新执行。

若还存在其他模块（其他文件）的可观察状态（如：通过 inject 注入过来的可观察数据），那么若我们直接在渲染函数中使用其他模块的可观察状态（如：props.store（访问 inject 注入的 stroe）），

即使其他模块的可观察状态通过某种方式改变，当前响应式组件也并不会强制重新执行渲染函数。

这通常是因为你在 `observer` 组件的渲染函数中访问的是其他模块的 `observable` 函数返回的 Proxy 对象，而非直接访问其他模块的 `observable` 值，如：

```tsx
// store.tsx
class Store {
    todos: any = [] // 存放所有 list
    constructor() {makeAutoObservable(this)}
}
const store = new Store()
export default store
```

```tsx
// a.tsx 修改前
const TodoHeader = inject('store')(observer(
    (props: any) =>(<div> {console.log(props.store.todos)}</div>)
))
```

在 `a.tsx` 中，当 `props.store.todos` 发生改变时，`TodoHeader` 并不会重新渲染。

这是因为：`TodoHeader` 的渲染函数中访问的是 `props.store.todos` 的 Proxy 对象，而不是其本身，但是对于 MobX 来说，只有使用 `observable` 直接观察的 `value` 才能使得 Reactions 进行响应。

所以自然的，这里的 `TodoHeader` 并不会重新渲染；若要让它重新渲染，则必须使得 `TodoHeader` 访问到 store.todos 的本身，而非 Proxy  对象，做如下更改：

```tsx
// a.tsx 修改后
const TodoHeader = inject('store')(observer(
    (props: any) =>(<div> {console.log(...props.store.todos)}</div>)
   	// 上行做法有时也无法触发组件响应，可能是因为一些其他原因，所以有更好的写法，即：访问 store.todos 下的具体的某个 observable 值。
    (props: any) =>(props.store.todos.map((todo) => { console.log(todo.finished) }))
))
```

##### 应该将 `observer` 用于有访问 `observable value` 的所有组件

在使用 `observer` 装饰/包裹组件时，应该确保该组件的渲染函数中有访问某个 `observable`，否则我们不应该使用 `observer`.

#### 参考文档

- [CN-[@]observer](https://cn.mobx.js.org/refguide/observer-component.html#observer)(MobX 5.x)
- [EN-observer](https://mobx.js.org/api.html#react-integration)(MobX 6.x)
- https://cn.mobx.js.org/refguide/api.html

### [CN-(@)autorun(MobX 5.x)](https://cn.mobx.js.org/refguide/autorun.html#autorun) | [EN-autorun(MobX 6.x)](https://mobx.js.org/reactions.html#autorun) 

#### 用法

1. `autorun(() => { sideEffect }, options?)` [MobX 5.x](https://cn.mobx.js.org/refguide/api.html#autorun)

   [options?](https://cn.mobx.js.org/refguide/autorun.html#%E9%80%89%E9%A1%B9)

2. `autorun(effect: (reaction) => void)` MobX 6.x

   实际上使用起来和 MobX 5.x 是一样的，参见：[MobX 6.x Example](https://mobx.js.org/reactions.html#example)

#### 介绍

`autorun` 创建一个响应式函数：当提供的函数中，可观察的状态改变时，就调用的响应式函数。

`autorun` 主要是用来执行 *启动效果 (initiating effects)* 的一个函数，记住 :heavy_exclamation_mark:：永远不要用 `autorun` 去产生一个新值，这是 `computed` 该做的事情。

使用 `autorun` 时，会立即调用一次提供的函数。

`autorun`  函数只会观察[提供的函数中所使用的数据]，即：`autorun` 本身虽然会返回一个函数，但是调用它是无效的：

```tsx
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

// 输出 '6'，这是因为使用 autorun 时，会立即调用一次提供的函数。
var disposer = autorun(() => console.log(sum.get()));
numbers.push(4); // 输出 '10'


// 调用 autorun 返回的函数没有任何用处
disposer(); 
// 不会再输出任何值。`sum` 不会再重新计算。
numbers.push(5);


```

### [CN-reaction](https://cn.mobx.js.org/refguide/reaction.html#reaction) | [EN-reaction](https://mobx.js.org/reactions.html#reaction)

#### 用法

1. ```tsx
   // MobX 5.x https://cn.mobx.js.org/refguide/reaction.html#reaction
   reaction(
       () => data, // 称之为： data funciton
       (data, reaction) => { sideEffect }, // 称之为： effect function
       options?
   )
   ```

   

2. ```tsx
   // MobX 6.x https://mobx.js.org/reactions.html#reaction
   reaction(
       () => value, // 称之为： data funciton
       (value, previousValue, reaction) => { sideEffect }, // 称之为： effect function
       options?
   )
   ```

**以 MobX 5.x 介绍**

`reaction` 接收 3 个参数（2 个函数，1 个配置选项）：

1. **data funciton**

   `data function` 用来追踪 `observable` value，并返回一个 data（你想要返回的任何数据），然后此 data 将会作为 `effect function` 的第 1 个参数，

2. **effect function： function(data, reaction)**

   `effect function` 接收 2 个参数：

   1. data

      `data function` 的返回值

   2. reaction

      当前的 reaction，可以用来在执行期间清理 `reaction` 

   `effect function`  是用来执行动作的，且 `effech funciton` 仅仅只对 `data function` 中访问（存在）的 `observable` 做出反应。

3. [**options?(MobX 5.x)**](https://cn.mobx.js.org/refguide/reaction.html#%E9%80%89%E9%A1%B9)

返回值：返回一个清理函数

#### 介绍

`reaction` 类似于 `autorun`，但不同的是：对于如何追踪 `observable` 的数据提供了更为细粒度的控制。

`reaction` 的第 1 个参数函数的返回值只要改变（一开始赋予的初始值不算改变其返回值），则第 2 个参数函数就会执行；若第 1  个参数函数的返回值永远未改变，则第 2 个参数就永远不会执行。

#### 示例

```tsx
import { observable, action, reaction, computed } from 'mobx';
import { observer } from "mobx-react";
import { Component } from 'react';
import ReactDOM from "react-dom";
// 观察一个对象
let obj = observable({
    hungryLevel: 100,
})
// 使得 Animal 变成响应式的
@observer
class Animal extends Component {
    constructor(props: any) {
        super(props)
        // reaction 也可以放在组件外面
        reaction(
            () => this.isHungry,
            isHungry => {
                // 如果饥饿水平 < 50，则输出：我饿了
                if (isHungry) { console.log("我饿") }
                else { console.log("我不饿") }
                console.log("目前饥饿水平:", obj.hungryLevel)
            })
    }
    // 饥饿水平 累减 10
    @action reduceEnergy() { obj.hungryLevel -= 10 }
    // 当饥饿水平 < 50，则返回 true（我饿了），反之我不饿
    @computed get isHungry() { return obj.hungryLevel < 50 }
    
    render() { return (<div></div>) }
}
const giraffe = new Animal("")
console.log("现在开始改变可观察状态：obj.hungryLevel")
for (let i = 0; i < 10; i++) {
    giraffe.reduceEnergy()
}
ReactDOM.render(
    // <Computed />,
    <Animal />,
    document.getElementById('root')
);
/** 将会输出：
 * 现在开始改变可观察状态：obj.hungryLevel
 * 我饿
 * 目前饥饿水平: 40
 */
```

### [CN-when](https://cn.mobx.js.org/refguide/when.html#when) | [EN-when](https://mobx.js.org/reactions.html#when)

#### 用法

1. ```tsx
   // MobX 5.x
   when(
       predicate: () => boolean, 
       effect?: () => void, 
       options?
   )
   ```

2. ```tsx
   // MobX 6.x
   when(
       predicate: () => boolean, 
       effect?: () => void, 
       options?
   )
   ```

3. ```tsx
   // MobX 6.x
   when(
       predicate: () => boolean, 
       options?
   ): Promise
   ```

以上 3 种用法都是常见的，只不过第 1 种是 MobX 5.x 的，而第 2、3 种用法属于 MobX 6.x。

#### 介绍

`when` 将一直观察给定的 `predicate function`，当 `predicate function` 的返回值为 true 时，`effect function` 就会自动执行。

且 `when` 函数将会返回一个 `handler` ，你可以使用这个 `handler` 去手动使得 `when` 不再观察 `predicate function`。

有意思的是，若你不提供第 2 个参数：`effect function`，那么 `when` 函数将会返回一个 Promise，

### [谨慎使用 Reactions](https://mobx.js.org/reactions.html#use-reactions-sparingly)

### [理解 Reactions](https://mobx.js.org/understanding-reactivity.html) 

不论是 `observer`、`reaction`，以及 `autorun` 等 Reactions，它们都只会对 `observable` / `可观察状态`做出响应，其中存在的一些坑是非常危险的，它们可能会导致你的程序不会预期执行。

你可以看看这个小节：<a href="#`observer` 组件访问其他模块中的 `observable` ">`observer` 组件访问其他模块中的 `observable` </a>





## [CN-(@)computed(MobX 5.x)](https://cn.mobx.js.org/refguide/computed-decorator.html) | [EN-computed(MobX 6.x)](https://mobx.js.org/computeds.html)

### 用法

1. `computed(() => expression)` 

2. `computed(() => expression, (newValue) => void)` 

3. `computed(() => expression, options)` 

4. `@computed({equals: compareFn}) get classProperty() { return expression; }` 

5. `@computed get classProperty() { return expression; }` 

   > 以下为 MobX 6.x 的用法：参见[这里](https://mobx.js.org/computeds.html#deriving-information-with-computeds) 

6. `computed` *(annotation)* 

7. `computed(options)` *(annotation)* 

8. `computed(fn, options?)` 

### 介绍

`computed` 专门用来根据现有的状态（通常指： `observable` value）或其他计算值**衍生出一个新值的**

`computed` 是高度优化过后的，尽情随意使用，不用担心性能问题；

注意：不要将 `computed` 和 `autorun` 搞混，尽管它们都是响应式调用的表达式；即：若你想产生一个可以用于 observer 的新值，则请使用 `computed`；但若你并不想产生一个新值，而只是想响应式的达到一个效果，则使用 `autorun`，如：打印日志、发送网络请求等的 effect.

使用 `computed` 修饰过的表达式（通常是一个计算属性（属性函数），如：get/set）将是响应式的，当 `computed` 的 expression 中存在可观察的状态改变时，则 `computed` 整个表达式将会执行，而如果 `computed` 的 value 中不存在或存在的可观察的状态未发生改变，则 `computed` 表达式将不会执行——这就是所谓的响应式。

:zap:：凡是使用 `computed` 修饰的 value 都无法枚举，因为计算属性是不可枚举的！

### 示例



```tsx
// MobX 5.x
import {observable, computed} from "mobx";

class OrderLine {
    @observable price = 0;
    @observable amount = 1;
    constructor(price) {
        this.price = price;
    }
	
    // 计算属性；会产生新值
    @computed get total() {
        return this.price * this.amount;
	}
}


```

以上示例可以改成 `decorate` 方式：

```tsx
// MobX 5.x
import {decorate, observable, computed} from "mobx";

class OrderLine {
    price = 0;
    amount = 1;
    constructor(price) {
        this.price = price;
    }

    get total() {
        return this.price * this.amount;
    }
}
decorate(OrderLine, {
    price: observable,
    amount: observable,
    total: computed
})
```

我们也可以使用 MobX 6.x 书写此示例：

```tsx
// MobX 6.x，注：6.x 版本中，decorate 已移除
import {observable, computed, makeAutoObservable} from "mobx";

class OrderLine {
    price = 0;
    amount = 1;
    constructor(price) {
        this.price = price;
        makeAutoObservable(this,{
            price:observable,
            amount:observable,
            total:computed
        })
    }

    get total() {
        return this.price * this.amount;
    }
}
```

## Action(MobX 5.x | MobX 6.x)

### [CN-(@)action(MobX 5.x)](https://suprise.github.io/mobx-cn/refguide/action.html) | [EN-action(MobX 6.x)](https://mobx.js.org/actions.html)

#### 用法

1. `action(fn)`
2. `@action.bound(function() {}`
3. `@action classMethod() {}`
4. `action(name, fn)`
5. `@action.bound classMethod() {}`
6. `@action(name) classMethod () {}`
7. `@action boundClassMethod = (args) => { body }`
8. `@action(name) boundClassMethod = (args) => { body }`
9. `action` *(annotation)* MobX 6.x

以上的用法都是常用的用法，你可以任意选择你喜欢的。

#### 介绍

我们将改变应用状态的动作称之为“行为”，由此可见，任何应用都有行为。

在  MobX 中，所有行为都应该使用 action() 或 @action 将之包裹/注释，当然即使你不这么做，MobX 仅仅只会警示你，而不会让你程序编译失败，但是这并不是好行为。

**使用 Action 让你代码更加易阅读，清晰，代码结构更优！**并且使用 Action 会给你有效的提示信息。

Action 返回一个使用 `untracked` , `transaction` and `allowStateChanges` 包裹的函数。

#### `async` 行为 和`runInAction`

`action` 只影响**当前运行**的函数，不是当前被**调度**（不是调用）的函数。

如：一个`setTimeout`，promise `.then` 或 `async`  构造，在这些回调函数中将有状态改变，那么这些回调应该使用 `action` 包裹/注释 =>

```tsx
// 改变状态的行为，应该使用 action 包裹，注意：并非包裹 setTimeOut，否则 setTimeout 将不会运行 
setTimeout(action(()=>{ 
	this.setState({
        name:'yomua',
        time:'2020-12-21 18:20'
    })
}),1000)
```

### [action.bound](https://mobx.js.org/actions.html#actionbound)（MobX 6.x）

### [runInAction](https://mobx.js.org/actions.html#runinaction)（MobX 6.x）

### [使用 flow 替代 async/await（可阅读知识）](https://mobx.js.org/actions.html#using-flow-instead-of-async--await-)（MobX 6.x）

### [Cancelling flows](https://mobx.js.org/actions.html#cancelling-flows-)（MobX 6.x）

## [tool-funciton API of mobx-react](https://github.com/mobxjs/mobx-react) 

### inject [CN-inject](https://cn.mobx.js.org/refguide/api.html#inject-mobx-react-%E5%8C%85) | [EN-inject](https://github.com/mobxjs/mobx-react#provider-and-inject)

####  用法	

1. ```tsx
   @inject("注入的属性名")
   MyComponent：你的组件
   ```

2. ```tsx
   @inject(callback)   callback 基本用法：(allStore,nextProps?,nextContext?)=>additionalProps
   MyComponent：你的组件
   ```

   callback 接收 3 个参数，且自身返回一个对象（additionalProps），该对象中的属性就是我们能在组件中使用 `this.props.propName` 访问到的注入的属性的值

   1. **allStore ** 

      将所有可用的属性*（离当前使用 @inject 最近的 Provider 组件中的属性）*放入到该参数对象中

   2. **nextProps?** 

   3. **nextContext? ** 

   **返回值：** 

   ```tsx
   {
   	value1:(allStore as any).Provider 组件上的属性名
       value2:(allStore as any).Provider 组件上的属性名
       ...
   }
   ```

   **小示例：** 

   ```tsx
   @inject(
   	allStore=> {
           value1:(allStore as any).Provider 组件上的属性名,
           value2:(allStore as any).Provider 组件上的属性名
       }
   )
   class A extends Component<{...}> {
       render() {
           return(
           	<div>
               	{this.props.value1}
                   {this.props.value2}
                   ...
               </div>
           )
       }
   }
   ```

   

3. ```tsx
   @inject("store1", "store2") 
   @observer 
   MyComponent：你的组件
   ```

   这种是 `@inject` 和 `@observer` 的组合写法。

   请记住：`@inject` 始终在最外面，因为它属于外部装饰，而 `@observer` 属于内部装饰。

4. [`inject("store")(observer(MyComponent))`](https://github.com/mobxjs/mobx-react#inject-as-function) 

在以上用法中，前两种是最常见的用法，第 3 个则是  `@inject` 和 `@observer` 的组合写法，第 4 个则是不用装饰器的写法。

笔者始终建议使用[第 4 种](https://github.com/mobxjs/mobx-react#inject-as-function)写法，因为它够简洁，而且它是最新的（对于 MobX 6.x 来说）

#### 介绍

`mobx-react`  提供的 `inject` 函数实现了 React 提供的 [Context 机制](https://zh-hans.reactjs.org/docs/context.html)，它可以让我们在一个组件树中，不必使得中间组件帮忙传递数据，就能使的顶层直接传递数据给底层，

其用法为：使用 `mobx-react` 提供的 `Provider` 组件，将之作为一个组件的根组件，那么 `Provider` 组件包裹的组件以及一系列相关组件都能通过 `inject`，将 `Provide` 组件上的属性注入到组件树的任意组件中

从而在组件中通过 `this.props.Provider 属性名` 访问 `Provider` 组件的属性。

下面看看这一个简单的示例吧：<a href="#使用 Provider 和 inject 完成数据传递">使用 Provider 和 inject 完成数据传递</a>

#### 示例

##### 使用 Provider 和 inject 完成数据传递（MobX 6.x）

环境：

```json
  "dependencies": {
    "mobx": "^6.0.4",
    "mobx-react": "^7.0.5",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1",
    "typescript": "^4.1.3",
  },
```

```tsx
import React, { Component } from 'react';
import { makeAutoObservable } from 'mobx';
import { Provider, inject } from 'mobx-react';
import ReactDOM from 'react-dom';
// 数据结构（Store）
class Todo {
    todos = [
        { id: 1, title: '任务1', finished: false },
        { id: 2, title: '任务2', finished: false },
    ];
    constructor() { makeAutoObservable(this) }
    // computed 属性（用来判断）
    get unfinishedTodoCount() { return this.todos.filter(todo => !todo.finished).length; }
}
let todoList = new Todo(); // 获取 Store
// todoList 将可以通过 @inject 注入 <Yomua /> 一系列相关的组件树中
const Testinject = () => (<Provider todoList={todoList}><Yomua /></Provider>)
const Yomua = () => (<ZY />) // 中间组件 
const ZY = () => (<YHW />) // 中间组件

/** 使用 @inject(callback) 将 Provider 上的所有可用 Store 经过提炼之后注入到 YHW 组件中
 * 注意：@inject 只能用于 class，或者说装饰器只能用于 class 组件。
 * 使用 @inject('todoList') 这种方式也可以
 * 这里的 allStore 指的是：<Provider /> 上所有要传递的 props
 */
@inject(allStore => (
    // 可以通过 this.props.todoList 就能访问到 Provider.todoList 属性。
    { todoList: (allStore as any).todoList }
))
class YHW extends Component<{ todoList?: any }> {
    render() {
        // 返回 Todo.title
        return (<div>{this.props.todoList.todos.map(todo => { console.log(todo.title) })}</div>)
    }
}
export default Testinject;
ReactDOM.render(
    <Testinject />,
    document.getElementById('id')
)
/** 控制台将输出：
 * 	任务1
 	任务2
 */
```

在以上示例中，显然的，我们的组件树为：`Provider 包裹 Yomua -> ZY -> YHW`，而我们的目的是：将 Provider 上的 todoList 直接传递到 YHW 中，使得中间组件（Yomua、ZY）不需要帮忙传递。

在这里，我们巧妙地利用了 `mobx-react` 提供的 `inject` 函数完成了这个目的。

即：我们使用 Provider 将 Yomua 包裹，使得 Provider 上的所有属性都能通过 `inject` 传递给 Yomua 的一系列相关组件，然后我们在想要注入 Provider 的属性的组件那，使用 `@inject()/inject()`  将 Provider 的属性注入到当前组件，这样，在当前组件的 JSX 中就可以使用 `{this.props.xx}`  访问 Provider 的属性！

真是方便的解决方案！

但是请记住，在使用 Provider 前不妨考虑[组合组件](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html)？因为 [Context 机制会使得组件复用性变差！](https://zh-hans.reactjs.org/docs/context.html#before-you-use-context) 

##### 使用 inject 来完成一个简单示例（非 @inject）

```tsx
// 将 stroe 注入到 ComponentName 组件中，注意：这是标准的写法！
const ComponentName = inject('store')(
	// observer 是必要的
    observer(
        (props: any) => (<div>...</div>)
    )
)
```



#### Reference

- [CN-inject](https://cn.mobx.js.org/refguide/api.html#inject-mobx-react-%E5%8C%85)
- [EN-Provider and inject](https://github.com/mobxjs/mobx-react#provider-and-inject)

# 