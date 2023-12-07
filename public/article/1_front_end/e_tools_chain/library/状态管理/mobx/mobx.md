# Preface

- MobX 已经存在 6.0 版本
  - 相较于 5.0 版本，6.0 将默认禁用 5.0 版本的 decorate，它将使用新的 API 去替代 decorate. 参见：[MobX](https://mobx.js.org/migrating-from-4-or-5.html) EN 6.X

如果你想从 MobX 4.x/5.x 版本迁移到 6.x 版本…唔，我知道这在大型项目中很困难，所以我们提供了一个解决方法：[MobX 6.x 版本](https://michel.codes/blogs/mobx6)（它在这段：*Migrating an entire code-base from decorators to makeObservablemight be challenging*）

而使用非装饰器的原因除了它们不是标准的以外，还有因为装饰器无法和 React Hook 一起结合使用，即：装饰器只能用于装饰 class component，而不是装饰函数式组件。

# What's the MobX ?

MobX 是一个**状态管理 library**，；同样的，有相似作用的有：Redux，Vuex，它们都是对状态进行管理，只不过可能其实现过程不同。

其中 MobX 是通过透明的函数响应式编程 *(transparently applying functional reactive programming - TFRP)* 来对状态进行管理并使得状态管理变得简单和可扩展

MobX 背后的哲学：任何源自应用状态的东西都应该自动地获得。

TIP: React 和 MobX 是一对强力组合。React 通过提供机制把应用状态转换为可渲染组件树并对其进行渲染。而 MobX 提供机制来**存储和更新应用状态**供 React 使用。

# Use MobX in React 

1. 首先需要安装 mobx 和 mobx-react

  > TIP: mobx-react-lite 更适用于 react hook，即：没有 class components 的项目，虽然 mobx-react 已经集成了 mobx-react-lite，但是它更轻便。
  >
  > 下载使用：`npm i --save mobx-react-lite` 

  ```bash
  # 建议使用 yarn
  yarn add mobx --save
  yarn add mobx-react --save
  # or
  npm install --save mobx mobx-react
  ```

  - > 值得一提的是：如果你完全使用 MobX 6.x 版本，那么你可能不需要使用到以下的将装饰器编译，这是因为 MobX 6.x 版本将默认不启用装饰器，你也完全不需要使用它。

2. 在 `tsconfig.json` 中启用编译器选项 `"experimentalDecorators": true` 

3. 安装 babel-preset-mobx  和 babel-plugin-transform-decorators-legacy

   ```bash
   npm i --save-dev babel-preset-mobx babel-plugin-transform-decorators-legacy
   ```

   并在 `.babelrc` 中添加以下配置：

   ```json
   {
     "presets": [
         "mobx",
         "es2015", 
         "stage-1
     ],
     "plugins": ["transform-decorators-legacy"]
   }
   ```

   TIP：插件的顺序很重要: `transform-decorators-legacy` 应该放在**首位**。

4. 然后在文件中导入即可，如：

   `import { observer } from "mobx-react";` 

   `import { observable, computed, action } from "mobx";`

参考文档：

- [Mobx-启用装饰器语法](https://cn.mobx.js.org/best/decorators.html#%E5%90%AF%E7%94%A8%E8%A3%85%E9%A5%B0%E5%99%A8%E8%AF%AD%E6%B3%95)

# Mobx and Redux

## Reference

- [Rdux 和 Mobx 区别](https://segmentfault.com/a/1190000017538995) 
- Mobx 较为灵活，Redux 有点类似于 Vuex

# Translate

> we now recommend `mobx-react-lite`over `mobx-react`for (greenfield) projects that don't use class components
>
> => 对于不使用 class components 的项目,我们推荐使用 `mobx-react-lite`，而非 `mobx-react`，

## [observable](https://mobx.js.org/observable-state.html#avoid-proxies)

### 概念和用法翻译

- `observable(source, overrides?, options?)`

可以把 `observable` 注释作为一个函数调用，以便使得 mobx 立即观察到整个对象。

mobx 将会克隆 `observable()` 中的第一个参数：source 对象，并且 mobx 会观察  source 对象的所有成员（观察 source，而非克隆 source 的对象），这类似于 `makAutoObservable` 的实现。

同样的，你可以提供一个 `overrides` 参数映射（override map）来指定特定成员的注释。

 `observable()` 将返回一个 Proxy 对象，这意味着：你向 `observable()` 传递的 source 即使在未来又添加了成员，那么该成员也将自动的成为 mobx 的可观察成员（除非禁用了 [Proxy 用法](https://mobx.js.org/configuration.html#proxy-support)）

也可以向 `observable()` 中传入集合类型，如：Set、Map、Array，同样的，mobx 也就克隆这些集合类型（一个 Proxy）并将之转为可观察对象，即：这些集合类型即使在未来添加了成员，这些添加的成员也将转为可观察成员。

###  TIP 翻译

`make(Auto)Observable` and `observable` 的主要区别是：`observable` 的第一个参数将接收一个需要被观察的对象，同时它还会创建这个可观察对象的克隆。

第 2 个不同点就是：observable 会创建一个 Proxy 对象，来防止你把一个对象视作动态的查找映射，这是因为创建的这个 Proxy 对象能够捕获未来添加的属性。

> 简单来说：observable 会创建一个 Proxy 对象，来捕获被代理对象以后可能添加的属性，使得你使用 observable 观察到的对象在以后添加属性时，这些属性也将是可观察的。

如果你想要使可观察的对象具有一个规则结构，并且其中所有成员都是预先声明的，那么我们建议使用 `makeObservable`，因为非代理对象的速度更快，并且非代理对象更加容易 debugger 和 console.log 中进行审查。

因此，在工厂函数中推荐使用 `make(Auto)Observable` API，请注意：未来有可能通过 `{proxy: false}` 作为一个 observable 的选项得到一个非代理的克隆。

# Time

- 2020-12-15 add inject		
- 2020-12-11
- 2020-12-10 
- 2020-12-09 add mobx

# Reference

- [MobX CN 5.X](https://cn.mobx.js.org/) => 中文文档目前只更新到 5.x | 2020-12-09

- [MobX EN 6.X](https://mobx.js.org/README.html)

  - [MobX-6](https://www.infoq.com/news/2020/10/mobx-6-release/) 

  - [Announcing mobx 6（官方发布）](https://michel.codes/blogs/mobx6) 

  - [Proposal: About drop decorators](https://github.com/mobxjs/mobx/issues/2325) 

    PS:装饰器最后并没有从 MobX 6.x 中删除，它只是默认禁用了。你可以详见此处开启它：<a href="#消除新提案（装饰器）的警告">消除新提案（装饰器）的警告</a>

