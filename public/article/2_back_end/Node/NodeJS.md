# Node ——[官网](http://nodejs.cn/learn/introduction-to-nodejs) / [廖雪峰](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025235359040)

## 介绍

### [简介](http://nodejs.cn/learn/introduction-to-nodejs)

在安装 Node.js 前，我们需要为 Node 做一个简单的介绍。

Node.js 是一个开源与跨平台的 JavaScript 运行时的环境，它是一个可用于几乎任何项目的流行工具！

- 即：Node.js 是一个平台，或者说一个环境，类似 JDK 这样的，JavaScript 可以在该平台（Node）上运行。

Node.js 在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核）， 这使得 Node.js 表现得非常出色。

- Node.js 之所以可以独立于浏览器去运行 JavaScript 代码，核心是因为 Node.js 运行于 JavaScript 引擎—— V8 引擎上，而 V8 引擎可以独立于托管它的浏览器，正是这种特性使得 Node.js 可以独立于浏览器运行。

  参见：入门教程 - [V8 JavaScript 引擎](http://nodejs.cn/learn/the-v8-javascript-engine) 

Node.js 的应用程序运行于单个进程中，所以无需为每个请求创建新的线程。 

Node.js 在其标准库中提供了一组异步的 I/O 原生功能（用以防止 JavaScript 代码被阻塞），并且 Node.js 中的库通常是使用[非阻塞](https://www.zhihu.com/question/26393784)的范式编写的（从而使[阻塞](https://www.zhihu.com/question/26393784)行为成为例外而不是规范）。

当 Node.js 执行 I/O 操作时（例如从网络读取、访问数据库或文件系统），Node.js 会在响应返回时恢复操作，而不是阻塞线程并浪费 CPU 循环等待。

这使 Node.js 可以在一台服务器上处理数千个并发连接，而无需引入管理线程并发的负担（这可能是重大 bug 的来源）。

Node.js 具有独特的优势，因为为浏览器编写 JavaScript 的数百万前端开发者现在除了客户端代码之外还可以编写服务器端代码，而无需学习完全不同的语言。

在 Node.js 中，可以毫无问题地使用新的 ECMAScript 标准，因为不必等待所有用户更新其浏览器——Node.js 是服务于服务端的，而用户只与客户端（浏览器）进行交互，你可以通过更改 Node.js 版本来决定要使用的 ECMAScript 版本，并且还可以通过运行带有标志的 Node.js 来启用特定的实验中的特性。

Node.js 本身的生态系统也是非常优秀的，它拥有大量的优秀的库/框架，并且有许多开发人员在使用 Node.js——这是依赖于 npm（参见：<npm.md>）实现的

有关示例，参见：[Node.js 应用程序的示例](http://nodejs.cn/learn/introduction-to-nodejs#nodejs-%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E7%9A%84%E7%A4%BA%E4%BE%8B)

有关依赖于 Node.js 编写的框架和工具（值得学习的，这里并不是全部），参见这里：[Node.js 框架和工具](http://nodejs.cn/learn/introduction-to-nodejs#nodejs-%E6%A1%86%E6%9E%B6%E5%92%8C%E5%B7%A5%E5%85%B7)

### 安装 Node.js

由于 Node.js 不像普通的 JavaScript 代码一样在浏览器就可以直接运行的，所以我们需要现在本机安装 Node 环境。

首先你需要去官网 [Node 中文官网](http://nodejs.cn/)（[Node 英文官网](https://nodejs.org/en/)） 下载对应平台的安装程序，需要注意的是：当你选择 Windows 平台时，那么在安装 Node 时，请务必包括勾选 `Add to Path`。

安装完成后，在 Windows 环境下，请打开命令提示符（win 键 + r，再输入 cmd 即可），然后输入`node -v`，如果安装正常，你应该看到`v12.16.1`这样的输出：

```
C:\Users\Administrator>node -v
v12.16.1
```

注：在正是开始学习 Node 之前，你需要拥有 NPM 方面的知识，参见：***<npm.md>***

### [Node.js 的历史](http://nodejs.cn/learn/a-brief-history-of-nodejs)

以史为鉴，可以知兴替。通过这句话我们很能明确的知道——知道一件事物的历史，就可以大概推测出它的发展的好坏，所以了解 Node.js 的历史是有必要的。

参见：[Node.js 的历史](http://nodejs.cn/learn/a-brief-history-of-nodejs)

### Node.js 与浏览器的区别

浏览器和 Node.js 都是使用 JavaScript 作为其编程语言，但是构建运行于浏览器中的应用程序与构建 Node.js 应用程序完全不同，尽管都是 JavaScript，但一些关键的差异使体验相当不同，如：Node.js 可以进行 I/O 读写等（建议网上查找）

还有生态系统的不同：

在浏览器中，大多数时候做的是与 DOM 或其他 Web 平台 API（例如 Cookies）进行交互。 

而这些在 Node.js 中是不存在的，Node.js 中没有浏览器提供的 `document`、`window`、以及所有其他的对象，而浏览器中也不存在 Node.js 通过其模块（Node.js 模块）提供的所有不错的 API，例如文件系统访问功能（浏览器没有该功能）。

除了以上说的这几点，另一个很大的不同是，在 Node.js 中，可以控制运行环境，即： 除非构建的是任何人都可以在任何地方部署的开源应用程序，否则你能知道会在哪个版本的 Node.js 上运行该应用程序。 

而和浏览器环境（你无法选择访客会使用的浏览器）相比起来，这非常方便——JS 的前端开发者无法知道用户会使用什么浏览器来访问自己创建网页，但是 JS的后端开发者（使用  Node.js）可以控制自己的程序运行在哪个版本的 Node.js 上

使用 Node.js 能控制 JS 代码运行的环境，就意味着可以编写 Node.js 版本支持的所有现代的 ES6-7-8-9 JavaScript。

由于 JavaScript 发展的速度非常快，浏览器发展得慢一些且用户的升级速度也慢一些，因此有时在 web 上，不得不使用较旧的 JavaScript / ECMAScript 版本。

我们虽然可以使用 Babel 将代码转换为与 ES5 兼容的代码，再交付给浏览器*（这样做会显得很麻烦，而且转换过后的 ES5 兼容的代码将比未转换之前的代码的量多许多，导致应用变大）*，

但是在 Node.js 中，则不需要这样做（因为开发者可以控制 Node.js 的环境，使得 JS 代码运行在指定的 Node 环境上）。

还有一个区别则是：Node.js 使用 CommonJS 模块系统，而在浏览器中，则使用的是 ES 模块标准（***参见：<Module.md>***）。

在实践中，这意味着在 Node.js 中使用 `require()`，而在浏览器中则使用 `import` 导入模块。

### 使用 Node.js 的好处

前文讲了这么多有关 Node.js 的方面，我想你们一定想知道学习 Node.js 的好处吧：

从广泛使用 JavaScript 的前端开发者的角度来看，Node.js 应用程序具有巨大的优势：使用单一语言轻松编程所有一切（前端和后端）。

并且你会拥有巨大的机会，因为全面、深入地学习一门编程语言并通过使用同一语言完成 web（无论是在客户端还是在服务器）上的所有工作是非常困难的，但是如果你会使用 Node.js，那么你会处于独特的优势地位（因为你只使用了 JavaScript 就可以编写前端和后端的代码，而单一代表精通）。

因为这会让你的全栈开发之路变得更加简单，至少好比单独去学一门后端语言来得快得多（如：Java、PHP 等）

## 入门教程

### [V8 ——JavaScript 引擎](http://nodejs.cn/learn/the-v8-javascript-engine)

#### 概述

JavaScript 引擎：当用户使用浏览器时，会处理并执行 JavaScript 代码的引擎叫做 JavaScript引擎，而这也正是 JavaScript 引擎的作用，下面我们讲到的 V8 JavaScript 引擎也是如此。

在学习 Node.js 的过程中，我们之所以会提到 V8 引擎这个概念，是因为 Node 是运行于 V8 引擎上的。即：Node 将 V8 引擎选为为它提供 JavaScript 支持的引擎。

那 V8 引擎是什么呢？它是为 Google Chrome 提供执行并处理 JavaScript 代码的引擎。即：当使用 Chrome 进行浏览时，V8 引擎用来负责处理并执行 JavaScript 代码。

V8 引擎提供了执行 JavaScript 的运行时环境，而 DOM 和其他 Web 平台 API 则由浏览器提供。

并且，由于现代的 JavaScript 引擎都可以独立于托管它的浏览器，这一特性推动了 Node.js 的兴起，并且于 2009 年 Node.js 将 V8 引擎选为为它提供 JavaScript 代码支持的引擎；

现在随着 Node.js 的爆炸性发展，V8 已经成为了现在为大量的服务器端代码（使用 JavaScript 编写）提供支持的引擎*（用来作为执行并处理 JavaScript 代码）*。

#### 其他的浏览器的 JavaScript 引擎

这里，我们在介绍一些其他主流浏览器所用的 JavaScript 引擎：

1. Firefox 具有 [**SpiderMonkey**](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey)
2. Safari 具有 [**JavaScriptCore**](https://developer.apple.com/documentation/javascriptcore)（又称为 Nitro）
3. Edge 具有 [**Chakra**](https://github.com/Microsoft/ChakraCore)

虽然还有很多其他的 JavaScript 引擎，但不论是什么 JavaScript 引擎，它们都实现了 [ECMA ES-262 标准](https://www.ecma-international.org/publications/standards/Ecma-262.htm)（又称为 ECMAScript），这是 JavaScript 使用的标准。

#### V8 引擎对性能的追求

V8 使用 C++ 编写，并且不断地被改进。 它是可移植的，且可运行于 Mac、Windows、Linux 和其他一些系统。

在此 V8 的介绍中，省略了 V8 的实现细节：可以去更具权威性的网站（例如 [V8 官方网站](https://v8.dev/)）上查看。

与其他 JavaScript 引擎一样，V8 也在不断地发展以加速 Web 和 Node.js 的生态系统。

在 web 上，性能竞赛一直持续了很多年，作为用户和开发者从这场竞争中受益匪浅，因为年复一年地获得了更快、更优化的机器。

#### 编译

JavaScript 通常被认为是一门解释型的语言，但是**现代的 JavaScript 引擎不再只是解释 JavaScript，也会对其进行编译**。

这从 2009 年开始就一直在发生，当时 SpiderMonkey JavaScript 编译器被添加到 Firefox 3.5 中，所有人都跟进了这个想法。

JavaScript 是由 V8 在其内部编译的，使用了**即时**（JIT）**编译**以加快执行速度。

自 2004 年 Google 地图的引入以来，JavaScript 已经从一门通常执行几十行代码的语言演变为能在浏览器中运行具有成千上万行代码的完整的应用程序。

现在，应用程序可以在浏览器中运行数小时，而不仅仅是一些表单验证规则或简单的脚本。

在这个新世界中，编译 JavaScript 非常有意义，因为尽管可能需要多花费一点时间来为 JavaScript （的编译）做准备，但是一旦完成，则它会比纯解释型的代码具有更高的性能。

#### node.js 事件循环



## node_modules

其核心主要是开发者下载的一些package,如 jQuery，vue 等

nodejs的package.json中的依赖,都存放于node_modules文件夹. 且每个项目都存在自己的node_modules文件夹,它们是不共享的.	 

依赖管理是每个现代语言的标配。依赖管理和打包工具是两个概念，npm是依赖管理，webpack是打包工具。

Node这种node_modules文件夹的方式有利有弊。
最明显的坏处是：

- 每次都需要安装依赖，费流量，网速慢时很费时间
- 浪费磁盘空间，每个node_modules中包含的工具很多，动辄20M

最明显的好处是：

- 使用package.json安装好之后，node_modules文件夹中没有版本信息，从而package.json可以删掉了。
  移动/复制/打包项目比较简单，对于开发、部署都有好处

- 对于设计npm的人来说，这是最省事的包依赖方法。这就好比maven安装依赖之后自动将jar包安装到项目的lib里面。

- 随意改代码。安装在node_modules里面的东西，你可以随便改，无需担心对其它项目的影响。

  npm的设计者大概认为：前端都是经常修改库的源代码的。

# 安装和存储目录

由 nvm 管理的所有版本的 nodejs：

如何修改默认全局安装/缓存目录参见：[CSDN](https://blog.csdn.net/p445098355/article/details/104525919/)

- node.js的安装目录在:H:\ProgramWay\LibraryData\nvm
- node.js的全局缓存目录在:F:\Memory Way\ProgramWay\FrontEnd\JavaScript\Environment\Node\Node_Cache
- node.js的全局安装目录在：F:\Memory Way\ProgramWay\FrontEnd\JavaScript\Environment\Node\nodejs\node_modules\npm\node_global_modules

