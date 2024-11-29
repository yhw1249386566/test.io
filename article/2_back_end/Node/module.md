# 术语

- CJS

  CommonJS

- ESM

  ESModule

- 模块

  一个文件就是一个模块

# 描述

Node 支持 CommonJS 和 ESModule 模块。

其中 node 默认使用 CommonJS 解析 .js 文件。

- 注意: 未来 node 可能选择默认优先解析 esm 文件.

  参见 - [搜索 - 面向未来](https://nodejs.cn/api/v20/packages.html#%E4%BB%8B%E7%BB%8D_1) 

# ESM 和 CJS 互相引用

## CJS 使用 ESM

```js
/** index.cjs */
import('./user.mjs').then(module => {
  return {
    ...module, // module 返回所有 getUsername.mjs 导出的变量
    default: module.default // 返回 getUsername.mjs 的默认导出
  }
})
```

```js
/** user.mjs */
export const name = 'yomua'
export default function () {
  console.log('_Default')
}
```

## ESM 使用 CJS

```js
/** index.mjs */

// 通过 * as 
import * as user from './user.cjs'
user.default.name // yomua
user.default.getUsername() // getUsername

// 或者 { default as xx }
import { default as user } from './tet.cjs'
user.name // yomua
user.getUsername() // getUsername

// 通过 import
import('./user.cjs').then((module) => {
  module.default.name // yomua
  module.default.getUsername() // getUsername
})

```

```js
/** getUsername.cjs */
module.exports = {
  name: 'yomua',
  getUsername: function () {
    console.log('getUsername')
  },
}
```

## 总结

- CJS 中使用 ESM 只能通过 **import()**

- ESM 中使用 CJS 可以通过: 

   `import *  as 'xx'`  

   `import()` 


# 同时支持 cjs 和 esm

如果你开发某个库，需要同时支持 cjs 和 esm, 大概有以下 2 种方法:

1. 自行在入口代码做判断, 判断是 cjs 或 esm, 然后自行处理.
2. 依赖 package.json 的字段来告诉每个打包器 (如: webpack, vite, rollup), 和 Node.js, cjs 和 esm 模块入口.

这里着重讲述第 2 点: package.json 字段.

[exports](https://nodejs.cn/api/v20/packages.html#conditional-exports): 从 `Node.js v12.16.0 ` 开始, 支持此字段, 解决应当加载 cjs 还是 esm.

main, module, 优先级则是比 exports 低, 适合支持低版本 `Node < v12.16.0`

- [type](https://nodejs.cn/api/v20/packages.html#type): 指定 `*.js` 被认为是哪种模块文件, 可取的值有: `commonjs`, `module`,

  现在 node 默认值为 `commonjs`, 但应当始终包含此字段, 以防未来 node 将默认值改为 `module`, 且包含此字段语义更清晰.

  注意: 包含此字段的前提是, 你没有自行对入口文件做 cjs 和 esm 判断, 来决定加载哪些文件.

```json
// package.json
{
  "type": "module", // 假定所有使用者通过 esm 加载模块
  "main": "./dist/cjs/index.cjs", // 为使用 cjs 加载的方式提供 cjs 模块
  "module": "./dist/index.js", // 为 esm 加载方式提供 esm 模块
  "types": "./dist/index.d.ts", // 提供类型声明文件
  "exports": {
    ".": {
      "types": "./dist/index.d.ts", // 提供类型声明文件
      // 由于声明了 type: 'module', 所以这里的后缀不需要有 .mjs
      "import": "./dist/index.js", // 提供 esm 模块
      "require": "./dist/cjs/index.cjs" // 提供 cjs 模块

    }

  },

}
```








