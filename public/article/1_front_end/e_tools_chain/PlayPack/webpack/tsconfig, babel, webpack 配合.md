# tsconfig、webpack、babel 的配合

[tsconfig.json](https://www.typescriptlang.org/zh/docs/handbook/tsconfig-json.html) 来指定要编译哪些 ts 文件/目录和规定使用 .ts 后缀的文件它们应该按照哪些规则去书写。

然后由于现代的浏览器通常不支持新版本的 JavaScript 或者是根本不认识的 TypeScript、.jsx、.tsx 等文件，所以我们要使用 [babel](https://www.babeljs.cn/docs/usage) 将这些浏览器不认识的代码编译成认识的代码（旧的 JS 版本，如 ES2015 等）。

这样一看，我们似乎不用 [wepack](https://www.webpackjs.com/concepts/) 都能愉快的编写并编译、运行代码，是这样没错，babel 可以帮助我们将 tsx、ts、jsx、新版本的 js 运行起来；那我们使用 webpack 是为了什么呢？

这是因为，[webpack](https://www.webpackjs.com/concepts/) 能帮助我们将每个文件、每种类型都视之为一个模块，将我们的项目的依赖关系整理的更加清楚，并且能帮我们将暂时用不到的依赖隔绝（懒加载）。

但是 webpack 其实自身只识别 .js 文件，不识别 tsx, ts, jsx, html, img, png 等这些类型的文件，需要通过 "loader" 字段去配置这些类型对应的编译库才可以让 webpack 将这些文件识别为模块。

所以我们使用 babel + webpack 的目的是让：webpack 通过 "loader" 配置 babel-loader 库，去使用我们配置的 .babelrc 文件配置。

这样通过 babel 的编译， 将各种类型的 js 编译成旧的 js 文件，在让 webpack 识别并打包。
