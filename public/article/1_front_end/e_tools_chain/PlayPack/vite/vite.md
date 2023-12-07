# 简介

跳过打包过程，使用 [ES6 的模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)概念，让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

使用 Vite:

1. 下达命令运行服务
2. 使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://cn.vitejs.dev/guide/dep-pre-bundling.html)
3. 服务运行
4. 启动的服务对应的页面中需要什么模块，Vite 在获取该模块并编译成适合的 JS，交由浏览器执行。

打包概念：打包的概念是开发者利用打包工具将应用各个模块集合在一起形成 bundle，以一定规则读取模块的代码——以便在不支持模块化的浏览器里使用。

为了在浏览器里加载各模块，打包工具会借助胶水代码用来组装各模块，比如 webpack 使用 `map`存放模块 id 和路径，使用 `__webpack_require__` 方法获取模块导出。

vite 利用浏览器原生支持模块化导入这一特性，省略了对模块的组装，也就不需要生成 bundle，所以打包这一步就可以省略了。

webpack 之类的打包工具会将各模块提前打包进 bundle 里，但打包的过程是静态的——不管某个模块的代码是否执行到，这个模块都要打包到 bundle 里，这样的坏处就是随着项目越来越大打包后的 bundle 也越来越大。

开发者为了减少 bundle 大小，会使用动态引入 `import()` 的方式异步的加载模块（ 被引入模块依然需要提前打包)，又或者使用 tree shaking 等方式尽力的去掉未引用的模块，然而这些方式都不如 vite 的优雅，vite 可以只在需要某个模块的时候动态（借助 `import()` ）的引入它，而不需要提前打包，虽然只能用在开发环境，不过这就够了。

vite 如何处理 ESM

既然 vite 使用 ESM 在浏览器里使用模块，那么这一步究竟是怎么做的？

上文提到过，在浏览器里使用 ES module 是使用 http 请求拿到模块，所以 vite 必须提供一个 web server 去代理这些模块，vite 中使用 `koa` 负责这个事情，vite 通过对请求路径的劫持获取资源的内容返回给浏览器，不过 vite 对于模块导入做了特殊处理。

# Reference

- [Vite](https://cn.vitejs.dev/) 

