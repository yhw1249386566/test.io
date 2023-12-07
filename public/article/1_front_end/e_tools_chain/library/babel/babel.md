# 安装和简单的使用



***看不懂安装命令的,请看<Node.js - npm.md>***

*https://www.babeljs.cn/docs/babel-cli*请看里面.

注意:不能按照里面的安装进行安装,因为会出现错误,具体原因可能是因为babel的cli,core等版本和ES2015(ES6),ES2017版本不匹配.

​	*不信的话,你下载个babel包, npm instale babel -g,看里面的README.md,它里面的说明安装就是说的我这种安装方法*

可能是吧,所以请看我自己写的安装和使用,和用法就可以看这个网站里面的用法,它是一样的.

## 前置config

`先初始化项目,npm init.`

然后创建 `.babelrc`文件,其蓝图内容为:

```javascript
{
  "presets": [],
  "plugins": []
}
```

`presets:字段设定转码规则. 官方提供如下规则:`

> ES2015转码规则
>
> ​	 `npm install --save-dev babel-preset-es2015`
>
> react转码规则
>
> ​	 npm install --save-dev babel-preset-react
>
> ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
>
> npm install --save-dev babel-preset-stage-0
>
> npm install --save-dev babel-preset-stage-1
>
> npm install --save-dev babel-preset-stage-2
>
> npm install --save-dev babel-preset-stage-3

然后根据需要将这些规则,加入presets中,例如:

但是请注意:多余的预设值需要删除,否则会报错,因为babel-cli会找不到不存在的预设.

```javascript
  {
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
  }
```

## 配置babel-cli,即命令行转码

Babel提供`babel-cli`工具，用于命令行转码.

- 全局安装命令为:

  `npm install --global babel-cli`

  全局安装虽然所有项目都能使用,但是无法为每个项目适配版本,所以可以将之安装到当前项目.

- 当前项目安装命令为: 

  `npm install --save-dev babel-cli`

  此时项目中会存在node_modules和package-lock.json文件.

  然后你的package.json中应该有

  ```javascript
    "devDependencies": {
      "babel-cli": "^x.x.x"
    }
  ```

## [使用npx命令进行转码编译（BabelCLI 的用法）](https://www.babeljs.cn/docs/babel-cli)

- npx: 可以调用本地package的一个命令.

### 	用法

`babel script.js`

> 注意：这些说明使用出色的[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)命令来运行本地安装的可执行文件。
>
> 您可以其放在npm运行脚本中，也可以改为使用相对路径执
>
> 执行: ./node_modules/.bin/babel

#### 编译文件

##### 输出到命令窗口(stdout,标准输出)

`npx babel script.js`

编译文件script.js并输出到stdout,即标准输出直接输出到命令窗口.

##### 输出到文件

使用`--out-file`或`-o`。

`npx babel script.js --out-file script-compiled.js`

将script.js文件转码编译到script-compiled.js文件中去.

##### 每次更改文件时进行编译

使用`--watch`或`-w` 以及 `--out-file`或 `-o`

`npx babel script.js --watch --out-file script-compiled.js`

即每次保存script.js文件,都会自动将之转码编译到script-compiled.js文件中去.

##### 编译源地图

然后，如果您想添加**源地图文件**，则可以使用 `--source-maps`或`-s`。[了解有关源地图的更多信息](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)。

`npx babel script.js --out-file script-compiled.js --source-maps`

或者，如果您希望使用**内联源地图**，请`--source-maps inline`改用。

`npx babel script.js --out-file script-compiled.js --source-maps inline`

##### 编译目录

编译整个`src`目录，并使用`-out-dir`或`-d`将其输出到`lib`目录。这不会覆盖lib中的任何其他文件或目录。

`npx babel src --out-dir lib`

编译整个`src`目录，并将其输出为单个串联文件。

`npx babel src --out-file script-compiled.js`

# 使用

## 用于浏览器的babel

Babel 也可以用于浏览器环境，使用[@babel/standalone](https://babeljs.io/docs/en/next/babel-standalone.html)模块提供的浏览器版本，将其插入网页。

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
// Your ES6 code
</script>
```

注意，网页实时将 ES6 代码转为 ES5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

Babel 提供一个[REPL 在线编译器](https://babeljs.io/repl/)，可以在线将 ES6 代码转为 ES5 代码。转换后的代码，可以直接作为 ES5 代码插入网页运行。

## Babel 之 JSX 与 React

1. 首先你需要使用 npm init -y 初始化一个项目

2. 其次你得运行以下命令，下载最基本的 Babel 功能（***参见：[Babel 的使用指南](https://www.babeljs.cn/docs/usage#overview)***）：

   注：以下的命令在安装 包时，无法将之安装到全局目录，否则将由于未知原因，我们可能无法在当前项目中使用以下包。

   ```bash
   npm/cnpm install --save-dev @babel/core @babel/cli @babel/preset-env
   ```

   [cnpm 的安装](https://www.cnblogs.com/liyuspace/p/10338570.html)

3. 然后下载 react 的 Babel 预设：[preset-react](https://www.babeljs.cn/docs/babel-preset-react#babelrcjs)

   ```bash
   npm install --save-dev @babel/preset-react
   ```

   [Babel 中 预设的作用](https://www.babeljs.cn/docs/presets)

4. 最后当 [preset-react 预设](https://www.babeljs.cn/docs/babel-preset-react#babelrcjs) 下载完成之后，需要将 `@babel/preset-react` 该预设包添加到 Babel 配置文件中。

   ```js
   /** .babelrc.js */
   module.exports = {
     presets: [
       [
         "@babel/preset-react",
         {
           development: process.env.BABEL_ENV === "development",
         },
       ],
     ],
   };
   ```

   可能你会细心地发现这里的 Babel 配置文件是：.babelrc.js，而不是 .babelrc，这其实并没有什么关系，

   使用 .babelrc.js 或者是 .babelrc，它们二者的功能作用都是一样的。

   ***参见：[有关 Config Babel ](https://www.babeljs.cn/docs/configuration)***

5. 当前面四个步骤完成之后，你的当前目录中的配置，就有了一个简略的可以编译 React 和 JSX 的 Babel 了，使用命令参见：<a href='#编译文件'>编译文件</a> 一节

## VScode中使用babel技巧

我们在在VScode中将babel-cli和babel-preset-es2015等安装到和其他文件夹同一级目录,那么这些同一级目录中的所有文件都可以使用babel-cli进行转码编译.

# 参考文档

- [Babel 非官方中文文档](https://www.javascriptc.com/docs/babel-manual/guide)
- [Babel 官方中文文档](https://www.babeljs.cn/)

注：当非官方和官方发生冲突，请以官方文档为准。