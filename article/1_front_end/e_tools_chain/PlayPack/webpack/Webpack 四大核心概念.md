# 核心概念-概要

在webpack中,存在四个核心概念,分别是:

1. entry(入口)
2. output(出口)
3. loader(加载)
4. plugins(插件)

## entry(入口)

### 描述

**入口起点(entry point)即指示webpack应该使用哪个/多个模块,来作为构建其内部依赖图的开始. **

**当webpack进入入口起点后,webpack会从中找出哪些模块和库 是入口起点依赖或被依赖或直接/间接依赖的.**

- 即webpack会自己找到和入口起点模块(可能存在多个)有关的所有依赖,不论是直接或者间接的,不论是入口起点依赖的模块和库,还是依赖于入口起点的模块和库.

每找到一个依赖webpack就会立即处理这个依赖,当每个依赖项都被处理完之后,最后就会统一输出到一个称之为bundles的文件中(我们将稍后讨论详细过程，该目录文件名可自定义)。

我们可以通过在[webpack配置](https://www.webpackjs.com/configuration/)中配置entry的属性,来指定一个/多个入口起点,默认的入口起点在./src目录.

- webpack配置: 通常以对象的形式出现,然后使用对象的属性和值来设置webpack的各种配置.

在JS中,配置一个最简单的entry:

```js
module.exports = {
    entry:'./path/to/my/entry/file.js'
}
```

- module.exports = {};
  
  这个是就是 webpack配置 的代码表示，大括号里面的内容就是需要配置的一些属性及其对应的值。

注意:这是最简单的一个entry配置,在实际中,我们可以根据应用程序的特定需求,有多种方式可以配置entry属性.

​    *这其实就是CommonJS中的模块的写法,其原理为nodejs会自动生成....,参见:<CommonJS.md>*

## output(出口)

**output** 属性告诉 webpack 在哪里输出它所创建的 *bundles*,以及如何命名这些文件,默认值为 `./dist`.

基本上,整个应用程序结构,都会被编译到你指定的输出路径的文件夹中.你可以通过在配置中指定一个 `output` 字段,来配置这些处理过程：

**webpack.config.js**

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

在上面的示例中,我们通过 `filename` 和 `path` 属性,来告诉 webpack bundle 的名称,

以及我们想要 bundle 生成(emit)到哪里.

最后:可能你想要了解在代码最上面导入的 path 模块是什么,它是一个 [Node.js 核心模块](https://nodejs.org/api/modules.html),用于操作文件路径.

注意:这是最简单的一个output配置,output还有更多可配置的特性,你可以通过*[阅读概念章节](https://www.webpackjs.com/concepts/output)*来了解更多.

也可以详见: ***其余概念-webpack.config.js中的配置 - entry和output配置***

## loader(加载,module:rules[])

loader让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）.

loader 可以将所有类型的文件转换为 webpack 能够处理的有效[模块](https://www.webpackjs.com/concepts/modules),然后你就可以利用 webpack 的打包能力,对它们进行处理.

本质上,webpack loader 将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块.

> 注意,loader 能够 `import` (导入)任何类型的模块（例如 [`.css` 文件](https://www.webpackjs.com/concepts/modules/#%E4%BB%80%E4%B9%88%E6%98%AF-webpack-%E6%A8%A1%E5%9D%97)、[具有 src 或 url 的元素](https://www.webpackjs.com/concepts/modules/#%E4%BB%80%E4%B9%88%E6%98%AF-webpack-%E6%A8%A1%E5%9D%97)（可以将之视为一个模块）),这是 webpack 特有的功能,其他打包程序或任务执行器的可能并不支持.
> 
> 我们认为这种语言扩展是有很必要的,因为这可以使开发人员创建出更准确的依赖关系图.

在更高层面,在 webpack 的配置中 **loader** 有两个目标：

1. `test` 属性,用于标识出应该被对应的 loader 进行转换的某个或某些文件（通常使用正则表达式去进行匹配）。
2. `use` 属性,表示进行转换时,应该使用哪个 loader。

**webpack.config.js**

```javascript
const path = require('path');

const config = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
};

module.exports = config;
```

以上配置中,对一个单独的 module 对象定义了 `rules` 属性,里面包含两个必须属性：`test` 和 `use`.这告诉 webpack 编译器(compiler) 如下信息：

> “嘿,webpack 编译器,当你碰到「在 `require()`/`import` 语句中被解析为 '.txt' 的路径」时,在你对它打包之前,先**使用** `raw-loader` 转换一下.”

> 重要的是要记得,**在 webpack 配置中定义 loader 时,要定义在 `module.rules` 中,而不是 `rules`**.
> 
> 在定义错误时 webpack 会给出严重的警告.为了使你受益于此,如果没有按照正确方式去做,webpack 会“给出严重的警告”

loader 还有更多我们尚未提到的具体配置属性.

[了解更多！](https://www.webpackjs.com/concepts/loaders)

## plugins(插件)

loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务.

插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量.[插件接口](https://www.webpackjs.com/api/plugins)功能极其强大,可以用来处理各种各样的任务.

想要使用一个插件,你只需要 `require()` 它,然后把它添加到 `plugins` 数组中.多数插件可以通过选项(option)自定义.

你也可以在一个配置文件中因为不同目的而多次使用同一个插件,这时需要通过使用 `new` 操作符来创建它的一个实例.

插件实则是相当于开放mod,就是让其余开发者自己开发一个个好用的东西,然后上传供别人使用.

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

module.exports = config;
```

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](https://www.webpackjs.com/plugins)获取更多信息.

在 webpack 配置中使用插件是简单直接的,然而也有很多值得我们进一步探讨的用例.

[了解更多！](https://www.webpackjs.com/concepts/plugins) 
