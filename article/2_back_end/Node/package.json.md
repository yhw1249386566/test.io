

# 概述

package.json 是最初时, node 需要一个包管理器, 从此蕴育而生的, 其目的是用来描述一个 Node.js 项目的元数据和配置信息的标准文件.

其中很多框架, 库都会利用 package.json 做一些配置, 比如: prettier, eslint 等等.

其中最主要的是: 

- package.json 由 npm 定义的字段参见: [npm - package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json).
- package.json 由 node.js 定义的字段参见: [node -package.json](https://nodejs.cn/api/v20/packages.html#self-referencing-a-package-using-its-name).



# node 字段解释

## [type](https://nodejs.cn/api/v20/packages.html#packagejson-%E5%92%8C%E6%96%87%E4%BB%B6%E6%89%A9%E5%B1%95%E5%90%8D) 

node 通过此字段来判断如何将包中的 `*.js` 解释为 cjs 或 esm.

```js
{
  "type": "module" 或 "commonjs"
}
```

注意: 后缀 .mjs 或 .cjs 的文件, 优先级最高, 不受任何字段, 包括 type 的影响.

若没有 type 字段, node 则根据 `*.js` 文件中的导入/导出方式判断, 如:

- `import * from xx` 

- `export xxx` / `export default xxx` 

  为 esm

- `require()` 

  `module.exports = {}` 

  为 cjs



## [exports](https://nodejs.org/api/packages.html#exports)  

用于定义模块的导出方式，以便在不同的环境中（如 ES 模块和 CommonJS 模块）提供不同的入口点。

允许开发者精细地控制模块的公开 API，使得模块能够在不同的模块系统和工具链中更好地工作。

注意: exports (从 Node.js V12.16.0 开始支持) 的优先级大于 main, module, types 字段.

```js
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/cjs/index.js"
    }
  }
}
```

1. **"."**:

   - 这个键表示模块的根入口点。

     它相当于 `import "your-package"` 或

     `require("your-package")` 时的路径。

2. **types**:

   - `types` 字段用于 TypeScript，指定了类型定义文件的位置。

     当使用 TypeScript 时，这个路径会告诉编译器从哪里加载类型定义。

3. **import**:

   - `import` 字段用于指定 ES 模块（ESM）的入口点.

     这通常用于现代 JavaScript 环境，如使用 `import` 语法的 Node.js 或现代浏览器。

4. **require**:

   - `require` 字段用于指定 CommonJS 模块的入口点这.

     通常用于使用 `require` 语法的 Node.js 环境。

## [imports](https://nodejs.org/api/packages.html#imports)  

用于定义私有导入映射，它们在 Node.js 的 ES 模块解析中起作用, 能够创建别名路径.

使用相对路径时: 路径为当前 package.json 所处目录.

```js
{
  "imports": {
    "#test/*": "./test/*",
    "#src/*": "./src/*"
  }
}
```

- `#test`

  `import something from '#test/utils'` 将解析为 `import something from './test/utils'`。

- `#src/`

  `import something from '#src/components/Button'` 将解析为 `import something from './src/components/Button'`

# Reference

- [Node - modules-pakcages](https://nodejs.org/api/packages.html#modules-packages) 

