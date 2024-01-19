# [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)  

## 作用

使用 `tsconfig` 配置, 然后通过 `tsc` 用来将 `.ts` 文件编译成 `.js`.

注: 这里说是编译, 其实也就是个**翻译**, 只是将 .ts 翻译成 .js, 并不会给你的 .ts 文件做什么优化, 比如: tree shaking, 代码压缩之类的.

## 命令

- `tsc <FileName> [options]` 
  -> `tsc index.ts` 

## 快速开始

1. `yarn add typescript` 
2. 项目根目录添加 `tsconfig.json` 
3. `npx tsc` 

## 使用时的问题

使用 ts 的项目, 你可以安装 `typescript`, 然后使用自带的 `tsc` 插件去编译 ts 为 js;

这么做通常没有什么问题, 但有些情况却经常出现, 这会导致项目服务无法启动, 或者启动后, 做了某些操作后, 然后挂掉.

**若一个模块只支持 ESModule, 不支持 CommonJS**

```js
package.json - types: 'commonjs'
tsconfig.json - module": "CommonJS"
```

以上配置将会在编译时使用 tsconfig - module, 通过 `Commonjs` 的方式解析 ts 文件, 然后输出成 js 文件;

在 node 环境运行时(比如: `node index.js`), 将会使用 `package.json - types`, 通过 `commonjs` 的方式运行,

这样就可以使用 node 环境自带的变量, 包等, 比如: `__dirname` 之类的.

但是问题来了, 由于使用的是 `commonjs` 方式编译, 且执行, 所以只能使用 `require`, `module.exports` 方式导入/导出包, 

如果现在有个包只支持 `ESModule`, 比如: `chalk`, 那么 `require('chalk')` 就会报错, 运行就会失败;

**没啥用的解决方法是**: 使用 `import()` 语法 -> `await import('chalk').default`; 

但是由于 commonjs 并不支持 ([issue - 为什么 cjs 不支持](https://github.com/nodejs/node/issues/21267)) 在[模块顶层使用 await - ESModule](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await#%E5%9C%A8%E9%A1%B6%E5%B1%82%E4%BD%BF%E7%94%A8_await), 且 `tsc` 本身也只是翻译工具, 所以这个解决方法基本是很难用的.

- 也不是不能用, 你可以在书写 .ts 文件时, 自己判断某个模块是否只支持 esmodule, 然后自己处理成 `await import().default` 形式.

**比较好的解决方法是**: 使用 tsc 直接翻译成 ESModule 的 .js 代码, 然后 node 环境运行时使用 ESModule 解析并执行 .js 代码: 

```js
package.json - types: 'module'
tsconfig.json - module": "ES6"
```

当然这么做, 还有个问题: 在 **ESModule 中, 你必须显示指定文件后缀名**, 否则 node 运行时(如: node index.js) 将无法解析: [为什么?](https://www.zhihu.com/question/453620623) 

```js
// index.js
import {show} from './utils' // 将会无法解析 utils, 报错.

// utils.js
export { show: () => {} }
```

简略点来说: 

在 node 环境中:`CommonJS` 早于 `ESModule`, 对于  cjs 的 `require` 来说, 早就已经有了一套[自己的解析逻辑 - require](https://nodejs.cn/api/v18/modules.html#文件模块).

而对于目前 (2024年1月10日) node 需要支持的 `ESModule`, 并没有照搬 cjs 的 require 的解析逻辑, node 需要通过文件扩展名([.mjs](https://nodejs.cn/api/v18/esm.html#启用) 和 [.cjs](https://nodejs.cn/api/v18/modules.html#启用)) 来识别哪个是 mjs 或 cjs.

- 当然**可以通过 package.json - type 字段**, 指定当前项目所有 .js 文件, 通过哪种模块方式解析

  ```js
  // package.json
  {
    type: "module", // 通过 ESModule
    type: "commonjs", // 通过 CommonJS
  }
  ```

你可以在[官网示例 - ESModule](https://nodejs.cn/api/v18/esm.html#%E4%BB%8B%E7%BB%8D) 中, 也能看到每个示例都用了文件扩展名 `.mjs`; 

因为不这么使用, 通过 `node index.js` 运行 ESModule 的 .js 文件时, 无法正确识别你写的 `import utils fom './utils '` 到底是个啥, 文件? 照片?

这就好像你在 css 中使用 `import(./a.jpg)` 一样, 使用文件后缀名的目的只是一个资源定位符,

`require(./utils)` 不用是因为 node 对其进行特殊处理罢了. 

同样的道理, 你使用一些脚手架: umi, 或者通过 webpack 自己配置, 你会发现 `import utils from './utils'` 即使没有文件扩展名, 你的服务也能在 node 环境运行起来, 根本原因就是因为这些脚手架或者 webpack 你配置时都已经处理过了.

## FAQ

### tsc 编译时不使用 tsconfig.json 配置

- package.json - scripts - ` "build": "npx tsc"` 
  会自动选择离这个 package.json 最近的 tsconfig.json 文件
- package.json - scripts - ` "build": "npx tsc -p tsconfig.json"`

添加 `-p tsconfig.json` 指定即可.

注意: 这里用的是 `npx tsc`, 不需要指定具体文件名, 因为可以在 `tsconfig.json - rootDir` 设置.

### .js, .cjs, .mjs 区别

- js 扩展名是 JavaScript 文件最常见的文件扩展名。

  它用于指示文件包含 JavaScript 代码, .js 文件可以在**不同的** JavaScript 环境中执行，例如 Web 浏览器、服务器和其他 JavaScript 运行时环境。

- CommonJS 是在 **Node.js** 环境的服务器端中使用的 JavaScript 模块系统。

  CJS 模块格式允许您使用`require` 和 `module.exports` 语法定义模块。

  在 CommonJS 中，每个文件都被视为一个单独的模块.

- MJS 是用于遵守 ECMAScript 模块 (ESM) 规范的 JavaScript 文件的扩展。

  ECMAScript 模块是 JavaScript 语言标准的一部分，提供了一种更现代, 更标准化的模块定义方式。

  [NodeJS 实现了 ESModule](https://nodejs.cn/api/v18/esm.html#介绍), 所以才可以在 node 中使用 ESModule.

  [浏览器也实现了 ESModule](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules), [所以可以在浏览器中使用 ESModule.](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules#导入功能到你的脚本) 

  ```html
  <script type="module">
    import { show } from "./module.js";
    show(); // 输出 yomua
  </script>
  ```

  ```js
  // module.js
  function show() { console.log('yomua') }
  export { show }
  ```

  ​