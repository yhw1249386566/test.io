# 前言

由于 react-native [更新频繁](https://reactnative.cn/versions)（一个月更新一次版本），所以本文档仅供参考，正式的请以官方文档-[EN](https://reactnative.dev/docs/getting-started)-[CN](https://reactnative.cn/docs/getting-started)作为标准使用。

注：尽管您的项目可能会因为 react-native 更新频繁而导致放弃新版本的 RN(react-native的简写)，但是笔者/官方仍然建议使用最新版本的RN，即使这会导致您在迁移项目时的困难，但这是最好的，因为旧版本的 RN 将不被开发团队维护更新（缺人和资源）

> 由于 RN 的频繁更新，故本文档尽可能不讲解详细的技术内容，而只是提供思路或解决办法。

# 快速开始

1. 安装[开发环境](https://reactnative.cn/docs/environment-setup) 

2. `npx react-native init OwnProjectName`使用 npx 初始化一个新的 RN 项目

   > 如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考[集成到现有原生应用](https://reactnative.cn/docs/integration-with-existing-apps)。

   选择指定版本的 RN 或某项目模板来创建 RN 项目：

   `npx react-native init AwesomeProject --version X.XX.X`

   `npx react-native init AwesomeTSProject --template react-native-template-typescript`

3. 准备 iOS 或 Android 或模拟器来运行程序。

# 术语

- [原生组件](https://reactnative.cn/docs/intro-react-native-components#%E5%8E%9F%E7%94%9F%E7%BB%84%E4%BB%B6) 

  RN 中指的原生组件是：封装了`在 Android 开发中使用 Kotlin 或 Java 编写的视图`、`在 iOS 开发中使用Swift 或 Objective-C 编写的视图`的相关视图组件。

  大概就是在代码构建中使用 React 组件，代码通过 RN 运行时，RN 就会为这些 React 组件创建相应的 Android 和 iOS 视图。

  RN 允许您为自己创建原生组件，而 RN 自身提供的组件也是原生组件，或称之为核心组件（RN 的）
  
  这意味着原生组件是跨平台的！

# [什么是 React Native](https://reactnative.cn/docs/getting-started) 

React- Native（也称为 RN）是依赖于 React，基于 JavaScript 的一个移动应用程序框架，它允许您为 iOS 和 Android 构建原生渲染的移动应用程序。

简单来说，你可以使用 RN 来编写 iOS 或 Android 或其他平台的 App，并且只需要编写一套代码即可多端运行。

注意：RN 编写的应用本质上是一个 native（原生）应用，但是由于中间需要经过解析（将 JS 代码解析为原生代码），所以性能上与 Native App 相比还是略逊一筹。

# 开发 RN 前所需知识

> 开发 RN 前首先需要你具备以下基本知识：
> - JavaScript、HTML5、CSS3
> - React、Node
> - Android 和 iOS 开发的基本知识
> - 等一些其他相关技术栈

接着就是需要准备开发环境，由于环境搭建过于繁琐，所以请直接看[官方文档-搭建开发环境](https://reactnative.cn/docs/environment-setup)；

当环境搭建完成后，你就可以开始使用任意编译器（推荐 [VSCode](https://code.visualstudio.com/)）做你的代码开发工作；

若你想知道如何创建一个新 RN 项目或运行一个已有的 RN 项目，请参见[此处](https://reactnative.cn/docs/environment-setup)（模拟器的使用也可参见）；

# 开发 RN 和开发 React 的区别

由于 RN 是依赖于 React，所以 React 需要的环境 RN 也需要，并且RN 还需要准备有关 iOS or Android 的相关开发环境；除此之外 RN 本身具有一些[原生组件](https://reactnative.cn/docs/components-and-apis)和[相关 API](https://reactnative.cn/docs/accessibilityinfo)。

实际上，仅以开发体验本身来说，除了你可能需要从 Web -> Mobile 以外，几乎没有体验上的差别；

值得注意的是：使用 RN 开发时，开发者可能不能随心所欲创建组件，而需要使用 RN 提供或相关社区提供的原生组件来作为你的组件，用于显示在 iOS 和 Android 中，否则若你以一个简单的 React 组件使用于 RN 项目中，该组件可能在 iOS 或 Android 上有 UI 以及兼容性等各种问题。

并且需要知道的是，由于 Mobile 并不想 Web 端那样有浏览器的支持，所以无法使用浏览器特有的 BOM 以及元素，如：div, p,span...这些元素自然无法使用，当然你可以使用 \<View />, \<Text /> 这些 RN 的原生组件来替代它们。

# 会 React 如何快速上手 React Native

在假设你会 React 的前提下，上手 React Native 是非常快的。

你完全可以将 React Native 的开发认为是组件的“搭积木”，换成 React 话来说就是：直接使用别人的组件，传递相应的 props 和写一些 state，来使得页面具有交互性，再用接口获取点数据，让页面动态起来。

很简单不是吗？只谈上手 RN，这是非常快的，掌握好 RN 组件的功能，以及组件对应的 prop，和看一看样式如何编写，那么这就和写 React 一样。

# Reference

- [react-native 中文网](https://reactnative.cn/docs/getting-started) 
- [Native App、Hybrid App、React Native App、Web App 区别](https://zhuanlan.zhihu.com/p/34082051)

