# 描述

将一些所有的零碎东西,编译(打包)成最基本的类: img,css,js,html这些,因为浏览器只能识别这些.

## 概念

webpack是一个现代 JavaScript应用程序的静态模块打包器(module bundler）.

当 webpack处理应用程序时,它会递归地构建一个依赖关系图(dependency graph）,其中包含应用程序需要的每个模块,

然后将所有这些模块打包成个或多个 bundle

把东西打包完成之后,我们只需要把打包后的文件上传到服务器就行,旧的文件不需要,留着维护,更新之后再重新打包更新的那部分就可以了.



# 安装

- 初始化工程文件(可以省略,后期补)pckage.json（npm init）

- 使用 `npm i webpack webpack-cli -D`
  
  最好是本地安装.

# 使用webpack的目的

假如你有个index.html和一个存于./src/index.js,此时你在index.html中引入./src/index.js.

若此若做就代表: index.html依赖于./src/index.js,此时如果你的./src/index.js中需要某个外部依赖*(指项目之外的,比如在互联网上的包)*才能继续运行的话,则:./src/index.js存在一个隐式依赖.

​    为什么说是隐式依赖呢:

- index.js脚本无法立即体现,脚本的执行依赖于外部扩展库(external library)
- 如果./src/index.js用不到话,这个外部依赖也就用不到,但是它却仍会被浏览器加载,会造成浏览器的运行缓慢.
- 如果引入顺序错误或者这个外部依赖不存在,则index.js无法编译.

所以为了解决这个问题,我们使用另一个包来管理这些文件,脚本,图片,以及任何类库之间的依赖关系.

这里我们使用webpack来替我们管理, 它可以让整个项目的依赖关系变得更加清楚,让项目更加容易维护.

# 模式-概要

通过选择 `development` 或 `production` 之中的一个,来设置 `mode` 参数,你可以启用相应模式下的 webpack 内置的优化

```javascript
module.exports = {
  mode: 'production'
};
```

# 依赖图

在任何时候,一个文件依赖于另一个文件(直接/间接),那么webpack就将此两个文件视为存在依赖关系, 

所以这使得webpack可以接收非代码资源(如图像或web字体等),并且可以把它们当作 依赖 提供给你的应用程序.

- webpack 从命令行或配置文件中定义的一个模块列表开始,处理你的应用程序. 
  
  从这些 *入口起点* 开始,webpack 递归地构建一个 依赖图 ,这个依赖图包含着应用程序所需的每个模块,
  
  然后webpack会将所有这些模块打包为少量的 *bundle* - 通常只有一个 - 且可由浏览器加载.

> *对于* *HTTP/1.1* 客户端,由 webpack 打包你的应用程序会尤其强大,因为在浏览器发起一个新请求时,它能够减少应用程序必须等待的时间.
> 
> *对于* HTTP/2,你还可以使用代码拆分(Code Splitting)以及通过 webpack 打包来实现*[最佳优化](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6#.7y5d3hz59)*.

# import 命令

使用 import 命令导入的是一个文件夹时，那么该文件夹下的以 `.ts、.tsx、.js、.jsx` 的 index 文件将会是默认导入文件。

如：`import A from './filea/fileb'` 等价于 `import A from './filea/fileb/index.js/jsx/ts/tsx'`

# [解析（resolve）](https://www.webpackjs.com/configuration/resolve/)

## [relove.alias](https://www.webpackjs.com/configuration/resolve/#resolve-alias)

resolve 配置对象用来为导入的模块的路径设置一个“别名”：

```js
/** webpack.config.js */
module.exports = {
  resolve: {
    alias: {
      // $：在给定的键后加$，表示精准匹配路径
      Utilities$: 'src/module/utilities/', 
    },
  },
};
/** demo.js */
// 相当于：import Utilities from 'src/module/utilities/';
import Utilities from 'Utilities';
```

通过 reolve.alias 就可以把一个路径用一个“别名”来替代，从而告别冗长的导入路径，特别是一个路径要经常使用时：

```js
/** webpack.config.js */
module.exports = {
  resolve: {
    alias: {
      // ../quick/reset/js：js 文件夹的路径所在位置
      Utilities$: '../quick/reset/js', 
    },
  },
};
/** demo.js */
// import Utilities from '../quick/reset/js/love';
import Utilities from 'Utilities/love';
```

如果不为 resolve.alias 的键添加 $，则代表非精准匹配（非精准匹配不理他了）。

反正大概就是这样子把，用来给路径添加别名，从而使用这个别名作为这个路径，简化导入模块时路径的冗长性，至于添加“别名”后的详细细节，参见：[relove.alias](https://www.webpackjs.com/configuration/resolve/#resolve-alias)

# Reference

- [Webpack](https://www.webpackjs.com/)  