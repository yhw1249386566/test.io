# [React Diff（协调）](https://zh-hans.reactjs.org/docs/reconciliation.html)

## :triangular_flag_on_post: 称呼规定

- **diff**：一种差异比较算法，使用[广度优先遍历](https://zh.wikipedia.org/wiki/%E5%B9%BF%E5%BA%A6%E4%BC%98%E5%85%88%E6%90%9C%E7%B4%A2)，在 React 中该算法能预测组件更新，使 React 项目提升。

  广度优先遍历：从根节点开始遍历，先遍历同层的所有节点，遍历完成之后，若存在子层，则继续遍历同一个子层的所有节点，如此反复，直到遍历完成所有节点。

  下图是执行广度优先遍历时，遍历节点的顺序。

  ![](.//picture/breadth-first-search.png)

  （breadth-first-search）
  
- 重新渲染

  在 class 组件内部调用 `render` 方法 或 表示重新执行函数式组件。

  > 执行 class 组件的 `render` 方法 === 执行整个函数式组件

## diff 算法作用

React Diff 会帮助我们计算出 [Virtual DOM](https://zh-hans.reactjs.org/docs/faq-internals.html) 中**真正发生变化的部分**，并且只针对该部分进行实际的DOM操作，而不是对整个页面进行重新渲染。

TIP:单纯论使得页面渲染来说，直接操作 DOM 比任何方式都要快，特别是让静态页面渲染时。这是因为这种方式中间不需要进行任何操作。

但当一个页面是动态的，经常性的渲染 DOM 会存在多次重绘，这使得性能消耗大幅度上升，所以我们需要 Diff 算法来帮助我们减少不必要的重绘，使得性能消耗降低。

## [diff 策略](https://zh-hans.reactjs.org/docs/reconciliation.html#motivation) 

### 概念

我们知道：在某一时间节点调用 React 的 `render()` 方法，会创建一棵由 React 元素组成的树；在下一次 state 或 props 更新时，相同的 `render()` 方法会返回一棵不同的树。

而 React 正是需要基于这两棵树之间的差别来判断如何有效率的更新 UI 以保证当前 UI 与最新的树保持同步。

本来这个问题有一些通用的解决方法，但是即使是[最前沿的算法](http://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf)它的时间复杂度仍然高达：O(n<sup>3</sup>)，其中 n 表示元素的数量。也就是说：React 若使用了该算法，则若存在 1000 个元素，那么所需要执行的计算量将在十亿的量级范围。

这个开销实在是太过高昂，所以 React 开发者们针对 React 在以下两个假设的基础之上提出了一套时间复杂度为 O(n) 的启发式算法：

1. **两个不同类型的元素会产生出不同的树**，反之：**两个同类型的元素会产生出相似的树** 
2. **开发者可以通过 `key` prop 来暗示哪些子元素在不同的渲染下能保持稳定；** 
3. **Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。**

> 在实践中，我们发现以上假设在几乎所有实用的场景下都成立。

在 React 中，存在三种 Diff：

1. **tree diff** 同层对比
2. **component diff** 基于 tree diff，重要点是：不同类型的组件所构建的 tree 不同，即使在相似也一样
3. **element diff** 通过使用 key 来降低渲染

### React Diff 大致流程

假设存在以下新旧 React Tree：

```tsx
// old tree
<div>
	<p> <Counter /> </p>
</div>

// new tree
<nav>
	<p> <Counter /> </p>
</nav>
```

首先 React 会对 new tree 和 old tree 进行<a href='#同层对比'>同层对比</a>，只要在对比过程中发现 tree 的某层新旧元素的类型不同，就会立即停止 diff，并将该位置的 tree 和对应的 DOM 销毁，再以对应的 new tree 构建新 DOM，然后插入到销毁旧 DOM 的那个位置。

- PS：销毁和创建时都会触发对应的生命周期函数。

  即：拆卸一棵树并销毁对应的 DOM 时，会触发 `componentWillUnmount`；

  当建立一棵 new tree 时，对应的 DOM 节点会被创建以及插入到 DOM 中，

  - 若当前元素在组件中，则组件实例将触发 `constructor` ->`UNSAFE_componentWillMount` -> `render` -> `componentDidMount` 

    > 注意：`UNSAFE_componentWillMount()` 是过时的，在新的代码中应该[避免使用它们](https://zh-hans.reactjs.org/blog/2018/03/27/update-on-async-rendering.html)。

很显然，在以上示例中，新元素的根节点（nav）和旧元素的根节点（div）是不同的，所以 React 在 diff 到这里时，就会停止 diff，然后销毁 old tree 和对应的 DOM（这会触发 `componentWillUnmount`）；

接着 React 会再以 new tree 为新树去构建新的 DOM（触发 `constructor`），然后插入到旧 DOM 被销毁的位置（触发 `constructor` -> `cwm` -> `cdm`）。

那假设现在新旧 tree 的每层元素相同，但是只有 JSX 上的属性不同，React Diff 算法又会怎样对比呢？详见：<a href='#[新旧元素类型相同，但属性不同](https://zh-hans.reactjs.org/docs/reconciliation.html#dom-elements-of-the-same-type) '>新旧元素类型相同，但属性不同</a>。

### tree diff 同层对比 

查找两个随机树之间的最小差异是一个 O(n^3) 问题，其中 n 代表元素，则若 1 个 tree 有 1000 个元素就要对比 10 亿次；
如你所想，这么高复杂度的算法是无法满足我们的需求的。

所以 React 使用了一种更为简单且直观的算法（称之为：React Diff）使得算法复杂度优化至 O(n)，即：同层对比。

同层对比指的是：**在一个 Tree 中，React 只会让两棵随机树（old tree 和 new tree）使用广度优先遍历进行逐层比较。**

请看下图：

![](.//picture/diff-treediff.png)

​																					（diff-treediff）

即：React 只会逐层对比新旧树，以上图来看，就是对比颜色相同的层级中的节点（元素）。当颜色相同的层级对比完成之后，React Diff 算法将会继续往下一层对比（若有），如此反复，直到对比完所有层的节点或找到某层的节点类型不同；

若找到某层的节点类型不同，则销毁对应位置的 old tree 和其下所有子树，同时也会销毁对应的所有 DOM，并以 new tree 构建的新 DOM 插入到旧 DOM 所在的位置；

这样在对比完成或找到某层节点类型不同时对比就停止了，不会继续往下比较；

以这种 Diff 算法只需要对树进行一次遍历，便能完成整个 DOM 树的比较。这大大降低了 diff 算法的时间复杂度：O(n)

### [新旧元素类型相同，但属性不同](https://zh-hans.reactjs.org/docs/reconciliation.html#dom-elements-of-the-same-type) 

- 当新元素和旧元素进行对比时，如果两个元素的类型是相等的，

  那么 React 会保留 DOM 节点，仅比对及更新有改变的属性

```tsx
<div>
    <p className="before" title="stuff" /><
</div>

<div>
    <p  className="after" title="stuff" />
</div>
```

通过同层对比这两个元素，React 知道只需要修改 `p` DOM 元素上的 `className` 属性，而 title 将不会做任何更新，并且 DOM 本身不会发生任何变换。

但是如果是 `style` 这种是对象的属性，React Diff 该怎么判断呢？即：当有 `style` 属性需要更新时，React 仅更新有所更变的属性，比如：

```tsx
<div style={{color: 'red', fontWeight: 'bold'}} />
 
<div style={{color: 'green', fontWeight: 'bold'}} />
```

通过对比这两个元素，React 知道只需要修改 DOM 元素上的 `color` 样式，无需修改 `fontWeight`。

而这种 React Diff 算法将会优化大量性能，因为操作 JS 永远比操作 DOM 来的快速。

在处理完当前节点之后，React 会继续对子节点进行递归，继续同层对比。

### element diff 对子节点进行递归 

在以上的讲解中，我们有提到新旧树种若发生节点类型或节点属性改变时，React Diff 算法的对比方式。

但是却没有提到：当新旧两棵树在对比时，如果节点类型不变，而是**增加 / 减少 / 移动了某个节点时**，React Diff 算法的行为

即：React Diff 算法会同时遍历新旧树的同层子节点，当产生差异时，就生成一个 mutation.

我们将同时对两棵子节点进行 diff 的方法分为两种：

1. **without key diff**
2. **with key diff**

#### without key diff

存在以下两棵新旧树：

```tsx
// old tree
<ul>
  <li>first</li>
  <li>second</li>
</ul>

// new tree
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

在将两颗树的 \<ul> 层遍对比完之后，React 会先对比两个树的 `<li>first</li>` ，然后对比 `<li>second</li>` ；

最后 React Diff 以 new tree 的 `<li>third</li>` 时，发现 old tree 对应的同层并没有该节点，所以 React 会直接插入第三个元素`<li>third</li>` 到 DOM 中。

这种简单的插入节点到子元素的末尾，更新开销是非常小的；但若不是插入元素到子元素末尾，而是开头呢？又或是移动某个/多个子元素 React Diff 算法的行为又该怎么做呢？详见：<a href='#[with key diff](https://zh-hans.reactjs.org/docs/reconciliation.html#keys) | [列表 & key](https://zh-hans.reactjs.org/docs/lists-and-keys.html)'>with key diff | 列表 & key</a>

#### [with key diff](https://zh-hans.reactjs.org/docs/reconciliation.html#keys) | [列表 & key](https://zh-hans.reactjs.org/docs/lists-and-keys.html) 

##### 为什么么要给子节点一个 key?

思考以下新旧树：

```tsx
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

显然的，我们将 `<li key="2014">Connecticut</li>` 插入到了子元素的开头。

但是 React Diff 在将 new tree 的子层和 old tree 对应的同级子层对比时，React 不会意识到应该保留 `<li>Duke</li>` 和 `<li>Villanova</li>`，而是会重建每一个子元素 。

形象点来说就是：React 发现 new tree 子层的第一个元素和  old tree 同级子层的第一个元素不匹配，就会销毁 old tree 中不匹配的 tree 元素和真实的 DOM，并以 new tree 对应位置上的 tree 构建新 DOM 插入到 old tree 中。

继续往下对比，发现第 2、3 或是更多元素也是如此，那么就重复以上步骤，直到将子层对比完成*（接着会对比下一层直到没有节点可以对比 或 发现某个节点类型不同，则就结束 diff*）。

很明显，这是会造成大量性能浪费，因为我们只是简单的插入了 1 个节点到子层的开头，其他节点并没有改变，所以为了解决这个问题，React 使用 `key` 属性去解决它！

##### 使用 key 解决

为了解决以上问题，React 支持 `key` 属性。

当子元素拥有 key 时，React 将使用 `key` 来匹配原有树上的子元素以及最新树上的子元素。

**key 帮助 React 识别哪些元素改变了，比如被添加或删除或仅仅是移动了。**

**令人惊叹的是：key 只需要在兄弟节点（同层节点）是唯一的即可，不需要全局唯一，**也就是说：下面做法是完全正确的：

```tsx
import React from 'react';
const posts = [
    { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', content: 'You can install React from npm.' }
];
function Blog(props) {
    const sidebar = (<ul>{props.posts.map((post) => <li key={post.id}>{post.title}</li>)}</ul>);
    const content = (<ul>{props.posts.map((post) => <li key={post.id}>{post.content}</li>)}</ul>);
    return (<div>{sidebar} {content}</div>);
}
ReactDOM.render(<Blog posts={posts} />,document.getElementById('root'));
```

在 sidebar 和 content 元素中，我们使用了 map 进行渲染一个列表元素，并给每一个列（\<li>）添加了 key，显而易见：这两个元素的同层 \<li> 的 key 是相同的；

但是这并不会妨碍 React 去通过 key 识别这两个元素 \<li> 所在的同层元素，这是非常有用的！这意味着我们不需要为添加标志而苦恼。

> TIPS：Key 属性并非 prop，它不会通过 JSX 传递给 JSX 所属的组件中。
>
> 即：组件内部 props.key 是无法获取到的。

现在我们来解决 <a href='#为什么么要给子节点一个 key?'>为什么么要给子节点一个 key?</a> 一节中的例子的元素更新是效率不高的问题。 

即：只需要在为 old tree 的每个 \<li> 添加 key 即可，这会使得在更新 \<li> 时，让之前的低效转换变得高效：

```tsx
// old tree
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

// new tree
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

当为 \<ul> 子元素的开头插入一个新 \<li> 时，由于我们为 old tree 中的每一个 \<li> 都添加了一个唯一的 key，所以 React 使用 Diff 算法将 new tree 和 old tree 进行对比时，

会发现 new tree 的子层开头多了一个 \<li>，接着会识别到 key="2015" 和 key="2016" 的两个 \<li> 仅仅只是移动了，

所以当停止 Diff 时，React 只会向 old DOM 的子层开头插入一个 \<li>， key="2015" 和 key="2016" 所属的 DOM 并不会做任何更新。

这将减大量性能消耗。

通常来说，我们将 key 使用在中具有大量元素的一层中，如：通过 map 渲染的元素。就如同本节中最开头的那个示例一般。

> 注意：在使用诸如 map 这类方法渲染大量元素时，尽量不要用索引当作元素的 key，这会造成一些 bug。
>
> 参见：[深度解析使用索引作为 key 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) 
>
> 若你有兴趣可以看看这篇文章：[深入解析为什么 key 是必须的](https://zh-hans.reactjs.org/docs/reconciliation.html#recursing-on-children) 

### component diff 组件的对比

前面我们已经谈论了更新元素时 diff 算法的行为，现在让我们来聊聊组件吧。

当一个**组件更新时，组件的实例会保持不变**，这是维持一个未卸载组件的状态（state）的关键。

同时 React 将会更新该组件实例的 props（从父组件传递过来的）和自身的 state 以跟最新的元素保持一致，并且调用该实例的三个生命周期：

- `UNSAFE_componentWillReceiveProps()` 
- `UNSAFE_componentWillUpdate() ` 
- `componentDidUpdate()`  

下一步，调用 `render()` 方法，diff 算法将在之前的结果以及新的结果中进行递归。

- 之前的结果：以旧 props 和 state 所构建的组件。
- 新的结果：以新 props 和 state 所构建的组件。

而这个递归的就是组件 return 的 JSX。

即：通过使用 React Diff 算法将以 new state 和 new props 产生的新的 JSX 和旧 JSX 进行对比，然后差异合并或销毁、重建整个组件或组件的一部分。

这新的 JSX 和旧的 JSX 进行 Diff 的方式，详见：<a href='#React Diff 大致流程'>React Diff 大致流程</a>、<a href='#同层对比'>同层对比</a>、<a href='#[新旧元素类型相同，但属性不同](https://zh-hans.reactjs.org/docs/reconciliation.html#dom-elements-of-the-same-type) '>新旧元素类型相同，但属性不同</a> 

## 权衡

请谨记协调（Diff）算法是一个实现细节，React 大可以在每个 action（行为，如：this.setState() 等）后对整个应用进行重新渲染，所得到的最终结果和不用 Diff 算法也是一样的。

但是使用 React Diff 算法，可以让 React 组件更新更为高效，当在对组件进行重新渲染时，React 只会基于以上章节提到的规则来决定如何进行差异合并，或是销毁、重构 DOM.

注：对于 React 来说，它会假设一棵子树能在其兄弟之间移动，但不能移动到其他位置，否则 Diff 算法将会重新渲染整棵树，从而导致更多的消耗性能。

> 由于 React 依赖探索的算法，因此若以下假设未成立，性能会损耗。
>
> 1. 该算法不会尝试匹配不同组件类型的子树。
>
>    如果你发现你在两种不同类型的组件中切换，但输出非常相似的内容，建议把它们改成同一类型。在实践中，我们没有遇到这类问题。
>
> 2. Key 应该具有稳定，可预测，以及列表内唯一的特质。
>
>    不稳定的 key（比如通过 `Math.random()` 生成的）会导致许多组件实例和 DOM 节点被不必要地重新创建，这可能导致性能下降和子组件中的状态丢失。

## Reference

- [官方中文-Diffing 算法](https://zh-hans.reactjs.org/docs/reconciliation.htm) 
- [React Diff 算法](http://zencode.in/12.react-diff%E7%AE%97%E6%B3%95.html)-[Christopher Chedeau](http://blog.vjeux.com/) 的 [React’s diff algorithm](http://calendar.perfplanet.com/2013/diff/) 译文
- [知乎-React Diff](https://zhuanlan.zhihu.com/p/20346379) 





























​	