# 什么是 TypeScript

TypeScript 是 JavaScript 的超集，它对 JavaScript 进行扩展，其目的在于使得 JavaScript 的代码更具有规则、可预测性、可控性、易于维护和调试以及可以对 JavaScript 代码进行类型限制。

TypeScript 可以运行在任何 JavaScript 可以运行的平台上，如：浏览器、Node.js 以及任何支持 ECMAScript 3（或更高版本）的 JavaScript 引擎中。

并且 TypeScript 的开发者可以使用现有的 JavaScript 代码，包括流行的JavaScript 库，并从 JavaScript 代码中调用 TypeScript 代码。

现在，让我们总结一下 TypeScript 的优势：

- 它有更多的规则和类型限制：代码具有更高的预测性、可控性，易于维护和调试；
- 对模块、命名空间和面向对象的支持，更容易组织代码开发大型复杂程序
- TypeScript 的编译步骤可以捕获运行之前的错误。

注：TypeScript 只是 JavaScript 的一个超集，最终，TypeScript 代码会编译成 JavaScript 代码。

# 查看 TypeScript 的版本

> npm view typescript version

# 安装 TypeScript

- 安装

  `npm install -g typescript`

- 编译

  `tsc helloworld.ts`


- 注： `tsc ts的文件名` 命令只是将一个 TS 文件编译成 JS 文件，node 并不会主动执行 TS 编译后的文件，我们可以通过下载库：ts-node 库，编译后使得 node 主动执行 JS 文件

  安装：`npm install -g ts-node `

  编译 `ts-node helloworld.ts`.

更多参见：在 node 中配置 TS 开发环境

# 命令和配置

## tsconifig.json 的作用

指定你要编译什么文件，用哪个标准编译，编译结果的位置，以及一些其他编译选项。

## 命令

- **生成配置文件**

  `tsc --init`

  常用配置如下：

  ```json
  {
    "compilerOptions": {
      // 编译选项
      "target": "es2016", // 编译目标代码的版本标准
      "module": "commonjs", // 编译目标使用的模块化标准
      "lib": ["es2016"], // 指定ts环境
      "outDir": "./dist", // 编译结果位置
      "removeComments": true, // 编译结果移除注释
      "strictNullChecks": true // 在严格的null检查模式下，null和undefined值不包含在任何类型里，只允许赋值给void和本身对应的类型
    },
    "include": ["./src"] // 指定tsc编译的范围
    // "files": ["./src/index.ts"] // 指定编译文件，须删除"include"配置
  }
  ```

  ##### 'lib'指定ts环境之后，node环境不存在了，需要重新安装：

  `npm i -D @types/node`

  注意：使用了配置文件之后 tsc编译的时候不需要跟文件名，否则不会使用配置文件，如：`tsc hellowold`

  ```json
  // 一些行之有效的配置
  compilerOptions:{
      // 额外添加
      "allowSyntheticDefaultImports": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "removeComments": true,
      "noImplicitAny": false,
      "noImplicitThis": false
  }
  ```

  TIPS：当你配置完 tsconfig.json 文件却报错，这可能是因为 "include" 字段定义的文件夹中没有任何可编译的 ts 文件，任意新建一个就可以。

- ts-node: 将ts文件在内存中完成编译、同时完成运行

  `npm i -g ts-node`

  使用： ts-node src/index.ts

- nodemon: 用于检测文件变化

  `cnpm i -g nodemon`

  使用：`nodemon --exec ts-node src/index.ts`

  *tips: 可以将检测文件变化添加到脚本、方便调用*

  在package.json中添加：

  ```
  "scripts": {
      "dev": "nodemon --watch src -e ts --exec ts-node src/index.ts"
   }
   
   --watch src: 只检测src文件夹
   -e ts: 只检.ts文件
  ```

  使用时直接：`npm run dev` 

## [配置](https://www.typescriptlang.org/zh/tsconfig) - [中文](https://www.tslang.cn/docs/handbook/tsconfig-json.html) 

```json
{
  "compilerOptions": {
    // 规定在以下配置中，引用目录时，相对的路径；如：在这份配置中，excludeFiles 文件将排除 "./files.ts"
    // 注：此项配置若使用相对路径，则相对于 tsconfig.ts 所在的目录，或你可以使用绝对路径。
    "baseUrl":"./",
    // 编译 .ts 文件后输入的目录
    "outDir": "build/main",
    "module": "commonjs",
    // 为每个 .ts 文件生成 .d.ts 文件
    "declaration": true,
    // 规定将 .ts 文件编译后生成的对应的 .d.ts 文件的目录
    "declarationDir": "build/main",
    // 指定哪些包的 @types 能包含在你的编译过程中，若不写则默认为所有在 node_module 下的包
    // 即：./node_modules/@types/jest，../node_modules/@types/jest，
    // ../../node_modules/@types/jest 等
    "types": ["jest"], 
    // typeRoots 若指定，则只有指定的包会包含在编译过程中，不包含 node_moudles 下的文件
    // 和 tyeps 的区别就在于此，types 指的是 node_modules/@types，typeRoots 是指定的精确目录
    "typeRoots": ["node_modules/@types", "src/types"]
  },
  // 排除包
  "exclude": ["jest"],
  // 排除目录
  "excludeDirectories":["**/node_modules"], 
  // 排除文件
  "excludeFiles":["files.ts"],
}

```

# module & namescape

### [module](https://www.tslang.cn/docs/handbook/modules.html)-[深入理解 TypeScript-module](https://jkchao.github.io/typescript-book-chinese/project/modules.html#%E6%A8%A1%E5%9D%97)

### [namescape](https://www.tslang.cn/docs/handbook/namespaces.html)-[深入理解 TypeScript-namescape](https://jkchao.github.io/typescript-book-chinese/project/namespaces.html)

## [module 和 namescape](https://www.tslang.cn/docs/handbook/namespaces-and-modules.html)

命名空间是为了提供逻辑分组和避免命名冲突，通常是用在一个文件中，为该文件的变量进行分组和避免变量命名冲突；

而模块本身已经是一个逻辑分组，在 TS 中，每个文件实际上都是一个单独的模块，每个文件中相同的变量名并不在同一作用域，所以千万不要把模块包裹在命名空间中，如：

```ts
/**
 * bad
 */

// shapes.ts
export namespace Shapes { 
    export class Triangle { /* ... */ }
    export class Square { /* ... */ }
}
    
// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Shapes.Triangle(); // shapes.Shapes?
```

下面让我们改进一下：

```ts
/**
 * good
 */

// shapes.ts
export class Triangle { /* ... */ }
export class Square { /* ... */ }


// shapeConsumer.ts
import * as shapes from "./shapes";
let t = new shapes.Triangle();
```



# [声明文件](https://jkchao.github.io/typescript-book-chinese/typings/ambient.html) & [官方中文文档](https://www.tslang.cn/docs/handbook/declaration-files/introduction.html)

## 什么是声明文件？

在普通使用 JS 时，我们可以随意的引用任意的 JS 库，并且当我们引用这些 JS 库时，我们亦是可以直接使用 JS 库中的全局变量、方法等。

但是在 TS 中，我们虽然也能引用 JS 库，然后通过直接调用 JS 库中的类和方法、属性等，但是却无法使用 TS 注入类型检查类型等一系列功能。

并且如果在 TS 中直接使用 JS 库的全局类型变量等也会报错，如：

```js
// 已经存在全局的 jquery

// demo.js
${'#app'}; // 不会报错，查找 #app 元素
```

```ts
// 已经存在全局的 jquery

// demo.ts
${'#app'}; // 报错，$ 找不到，即：未定义
```

所以为了解决在 TS 中引入 JS 库时：无法为 JS 库的函数、变量作类型检查等一系列功能以及无法使用全局变量等的问题，我们需要将这些库里的函数和方法体去掉，然后只保留导出的类型声明，这样就可以为这些导出的类型声明应用 TS 的一些列功能，而这些类型声明汇在一起，就产生了一个描述 JavaScript 库和模块信息的声明文件。

最后我们只需要在 TS 中引入这个声明文件，就可以使用 TS 的各种特性运用到每个 JS 库上，真是令人激动。

## 简单示例

比如：加入我们想要使用第三方库：jQuery：

```js
// .js
$('#foo');
// 或
jQuery('#foo');
```

但是在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西：

```ts
// .ts
jQuery('#foo');

// error TS2304: Cannot find name 'jQuery'.
```

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对：

```ts
// 声明定义 jQuery，它的限制类型为一个函数类型，该函数接收一个类型为 string 的参数，且返回值类型为 any
declare var jQuery: (selector: string) => any;

jQuery('#foo');
```

当然，我们可以将以上的声明写到一个 `.d.ts`（建议） 或 `.ts` 文件中，并将之作为声明文件，如：

```ts
// xx.d.ts
declare var jQuery: (selector: string) => any;

// xx.ts
jQuery('#foo'); // okay
```

注：declare 定义的类型只会用于编译时的检查，编译结果中会被删除，即：declare 定义的各种变量会在编译完成后结果中被删除。

上例的编译结果是：`jQuery('#foo');`



# 有关 TypeScript、Pit、扩展

## .tsx

.tsx 指的是 TypeScript 和 JSX 相结合的一个东西，值得注意的是：当你使用 .tsx 作为文件后缀名时，你书写的一切都要按照 TypeScript 中的要求来，也就是：

当你在 .tsx 中书写要一个组件，然后你要向这个组件传递 props，那么你必须在该组件中要明确传递的 props 的类型，如：

```tsx
// Counter 组件
class Counter extends React.Component<{ count:number }>{ 
    render(){
        return (
        	<div>
            	{this.props.count} // okay
            </div>
        )
    }
}
export default Counter

// Show 组件
import Counter from './counter'
class Show extends React.Component {
    render(){
        return (
        	<Counter count={5}/> // okay
        )
    }
}
```

TIP：在以上的示例中，若没写 `<{ count:number }>` 则会报错：`No overload matches this call`，这甚至会影响到你在 Counter 组件中，无法输出 this.props.count，它会报错：`Property 'count' does not exist on type 'Readonly<{}> & Readonly<{ children?: ReactNode; }>'`，

简单的说就是：在 props 上不存在 count 属性，因为你并没在该组件声明它，身为 TypeScript 的我是不知道的。

参考文档：

- [Typescript + React - No overload matches this call](https://stackoverflow.com/questions/60490456/typescript-react-no-overload-matches-this-call)

## Pit

### [Parameter 'xxx' implicitly has an 'any' type](https://stackoverflow.com/questions/43064221/typescript-ts7006-parameter-xxx-implicitly-has-an-any-type)

在当前项目的 tsconfig.json 添加以下选项则错误消失。

:smile:：这并没有解决根本问题，你应该尝试使用类型去约束它！

```json
// tsconfig.json
"compilerOptions": {
    "noImplicitAny": false
}
```

你可以参见[此处](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9)查看更多有关 `tsconfig.json` 的选项。

### 使用 useState 设置一个值将为组件/HTML 内置元素的默认值

```tsx
import React, { useState } from 'react';
const OwnPagination = () => {
    // 注意：el 的默认值为一个 <div /> 标签
    const [obj, setObj] = useState({ el: <div></div> })
    const handleChange = (e: any)
    	=> e.target.value === '1' ? setObj({ el: <div>1</div> }) : null
    return (<><input onChange={handleChange} />{obj.el}</>)
}
export default OwnPagination;
```

一开始你可能想为 obj.el 属性设置一个类型，比如：any,Element,object 等等，但是很快你会发现这行不通；虽然你可以设置 obj.el 为 Object、String、Element 等这样的类型，但是你使用 obj.el 时仍然会报错；

此时你只需要将 obj.el 设置成一个任意的 HTML 元素，这样，你在使用 setObj() 时，可以为 obj.el 赋任意的 HTML 内置元素或你自己定义的 React-Component.

# React 中的 TypeScript

## typescript 给 props 定义 DOM 节点的类型

你如果基于 html5 封装了一个组件 A，你想让 typescript 给你提示【向 A 能传入哪些 prop】：

```react
...

// 关键一步:需要将这些类型单独抽出来，然后使用（可以继承或直接使用于 props），
// 这样 typescript 会给你提示正确的类型
// 注：有时不需要这样做也能提示正确类型，但是这是不确定的。
type IText = React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>
interface IProps extends IText {....}

const Text = (props: IProps) => (
	<span {...props} />
)
export default Text
```

# FAQ

## 编译时，.d.ts 文件不被一起编译到目标目录 

这因为编译器在编译 typescript 时，不会去引入那些可能做为输出的文件到编译目标目录，参见：[搜索：编译器不会去引入那些可能做为输出的文件](https://www.tslang.cn/docs/handbook/tsconfig-json.html)。

目前已知解决方法有三种：[Typescript does not copy d.ts files to build](https://stackoverflow.com/questions/56018167/typescript-does-not-copy-d-ts-files-to-build) 

1. 将 .d.ts 这种文件改为 .ts 文件，然后在每一个使用类型的地方，导入一遍 .ts 中对应的类型声明。

2. 在编译完成后，复制 .d.ts 或相关目录到编译后生成的目录

   复制命令，参见：[cp 命令](http://c.biancheng.net/view/746.html) 

3. 通过一些打包工具 (webpack, [rollup](https://www.rollupjs.com/tutorial/) 的 [dts](https://github.com/Swatinem/rollup-plugin-dts) 等) 帮助我们做这种工作.

实行第 2 种方法最后可能在 package.json 中的配置：

```json
{
  "scripts": {
    // 编译完成后，将 src/types 下的所有文件递归复制到 dist 下（-r 目录是递归复制，用来复制目录）
    "build": "run-p build:* && cp -r src/types dist"
  }
}
```



