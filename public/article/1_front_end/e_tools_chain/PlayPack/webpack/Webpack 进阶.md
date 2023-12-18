# webpack进阶及其用法

## 进阶

### [webpack开发时设置的环境](https://www.webpackjs.com/guides/development/)

#### source map--devtool

##### 描述

当 webpack 打包源代码时,可能会很难追踪到错误和警告在源代码中的原始位置.

例如,如果将三个源文件（a.js, b.js 和 c.js）打包到一个 bundle（bundle.js）中,而其中一个源文件包含一个错误,那么堆栈跟踪就会简单地指向到bundle.js。

这并通常没有太多帮助,因为你可能需要准确地知道错误来自于哪个源文件.

为了更容易地追踪错误和警告,JavaScript 提供了 [source map](http://blog.teamtreehouse.com/introduction-source-maps) 功能,将编译后的代码映射回原始源代码.

如果一个错误来自于 b.js,source map 就会明确的告诉你.

source map 有很多[不同的选项--devtool](https://www.webpackjs.com/configuration/devtool)可用,请务必仔细阅读它们,以便可以根据需要进行配置.

对于本指南,我们使用 inline-source-map 选项,这有助于解释说明我们的目的（仅解释说明,不要用于生产环境）

##### 不使用source map(devtool)

**只会显示打包后的文件的错误**

![](picture\devtool未使用时.png)

##### 使用source map(devtool)

**会显示源文件中的错误**

![](picture\devtool使用时.png)

#### 使用观察者模式

##### 描述

在默认情况下,我们更新任何一个源文件,则就要重新使用CLI进行编译,且需要一段时间才能编译完成,然后才能查看,当如果进行多次修改时,就会浪费大量开发时间,这是非常不利于开发的,所以我们开启观察者模式.

你可以指示 **webpack : "watch"**  依赖图中的所有文件以进行更改。如果其中一个文件被更新，代码将被重新编译，所以你不必手动运行整个构建。

##### 用法

在package.json文件 => scripts, 添加:

```bash
"scripts": {
    "watch": "webpack --watch",
},
```

​    然后在CLI中直接执行 `npm run watch`命令,此时,你会看到 webpack 正在重新编译代码，但是编译(打包)完成后却不会退出命令行。这是因为 script 脚本还在观察文件。

​    此时,当你修改源文件中的任意行代码并保存后,webpack将实时自动编译,但是我们仍然需要刷新浏览器才能看到效果***,所以就有了webpack-dev-server环境,请继续往下看***

​    PS: 这不是重新编译,而是在前后一次的基础上进行更新,速度会极快,并且解放了你输入命令的时间,这极大的简约了操作和加强开发.

![](picture\观察者模式.png)

- 如上图,将不会被退出,而是一直"观察",一旦被改编,webpack将自动重新更新.
- PS: 终止"观察"模式,则使用 ctrl + c

#### [webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/)

##### 描述

webpack-dev-server 为你提供了一个简单的 web 服务器，并且能够实时重新加载(live reloading)。

##### 使用

- 下载该服务: npm install --save-dev webpack-dev-server

- 将该服务器添加到webpack.config.js配置文件中:
  
  ```bash
  module.exports = {
      devServer: {
          contentBase: './dist',
          ...
      },
  }
  ```
  
  使用`npx webpack-dev-server --open` 命令,即可运行localhost:8080服务器.
  
  ​    也可以使用自己配置的命令(在package.json的scripts属性中自己配置)    
  
  ​    如果你想停止,则:使用 ctrl + c即可停止(按一次/两次)

- 以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件。
  
  ​    需要注意的是,我们**监听的是编译后的文件,而不是源文件**. 我们需要在源文件进行更改,然后在服务器中会自动生效.
  
  ​    **(只存在这个服务器,编译文件(编译源代码后的文件)并不会被自动更新,除非你还设置了其他配置,如:使用了观察者模式)**

*现在，服务器正在运行，你可能需要尝试*[模块热替换(Hot Module Replacement)](https://www.webpackjs.com/guides/hot-module-replacement)*！*

### wepack及插件为何知道哪些文件应该生成?

#### 描述

你可能会感兴趣,webpack及其插件似乎“知道”应该生成哪些文件.

答案是:通过 manifest,webpack 能够对「你的模块映射到输出 bundle 的过程」保持追踪.

如果你对通过其他方式来管理 webpack 的[输出](https://www.webpackjs.com/configuration/output)更感兴趣,那么首先了解 manifest 是个好的开始.

通过使用 [`WebpackManifestPlugin`](https://github.com/danethurber/webpack-manifest-plugin),可以直接将数据提取到一个 json 文件,以供使用.

我们不会在此展示一个关于如何在你的项目中使用此插件的完整示例,但是你可以仔细深入阅读 [manifest 的概念页面](https://www.webpackjs.com/concepts/manifest),以及通过[缓存指南](https://www.webpackjs.com/guides/caching)来弄清如何与长期缓存相关联.

- ​    通常情况下:webpack幕后所做的工作是对你没有影响的,runtime 做自己该做的,使用 manifest 来执行其操作,
  
  ​    然后,一旦你的应用程序加载到浏览器中,所有内容将展现出魔幻般运行.
  
  ​    然而,如果你决定通过使用浏览器缓存来改善项目的性能,理解这一过程将突然变得尤为重要.

## 用法

### 基本用法

#### 前置条件

首先我们需要:安装完webpack和webpack-cli包

其次需要基本的项目目录*(这些目录只是一个示例,如果你愿意,你完全可以在webpack.config.js中去定制你的配置,而不必按照此示例来)*,存在两个核心文件夹和一个核心配置文件:

1. src文件夹
2. dist文件夹
3. webpack.config.js

以下为一个项目最基本的配置:

```js
webpack-demo
|- package.json
|- package-lock.json  // npm5及以上才有
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
|- /node_modules
```

- ***webpack-demo***
  
  你的整个项目的根目录,所有东西都放入此文件夹中.

- ***package.json 和 package-lock.json***
  
  项目中的包的配置 .参见:<npm.md>

- ***webpack.config.js***
  
  ​    可以说是webpack中的核心模块,其目的使用nodejs实现的CommonJS模块的module对象设置webpack所有配置. 
  
  ​    *虽然也可以不使用这个直接进行打包,但是我们无法设置属于自己的配置,无法量身定做,所以建议每个使用webpack的项目都使用此配置文件*
  
  ​        参见: *webpack中的概念 - 其余概念 - webpack.config.js中的配置* *以及<CommonJS.md>* 

- ***dist文件夹***
  
  ​    核心文件夹. 源代码的输出目录,最后用来显示在浏览器中的代码.即存放经过webpack打包优化src文件夹中的源代码后所生成的各种文件
  
  - ***bundle.js***
    
    ​    一个由开发定义在webpack.config.js配置文件中的(输出)文件名.
    
    ​    其对应的是src文件夹中的某个.js源代码文件.
    
    ​    该.js文件可以有多个(即:我们能设置多个出口)
  
  - ***index.html***
    
    ​    一个web页面,可能是作为首页,里面导入了当前文件夹(dist)中的各种被打包生成的文件(如bundle.js或某个xxx.png等)

- ***scr文件夹***
  
  ​    核心文件夹. 用来存放"源代码",即用来书写和编辑的代码文件.
  
  - ***index.js***
    
    ​    可能是用来编辑一下会在页面输出的事件或者DOM操作等.
    
    ​    类似这样的文件可以有很多,而且不限种类,例如:某个图片(这也是文件),JSON格式的文件等等.
    
    ​    即:可能存在多个入口.

- ***node_modules***
  
  ​    使用npm下载任意一个包到本地文件夹中就会出现的一个文件,其包含了你已经下载完成的各种package以及一些其他信息.

#### 整个过程

1. 前置条件完成后,就可以开始打包你的src中的源代码到dist中去了.

2. 在你需要打包的本地文件夹中,使用CLI,输入[npx](http://nodejs.cn/learn/the-npx-nodejs-package-runner) webpack命令,执行webpack,即打包开始.
   
   1. 开始前，请记得配置webpack.config.js配置文件中的入口,出口,以及module等属性哟.
      
      别忘记配置module:rules:[]时也要下载对应的解析工具,如file-loader,css-loader等.
   
   2. 你也可以在package.json的scripts属性中,设置webpack打包命令,而不必使用npx webpack.
      
      如:"build-webpack": "webpack" 
      
      此时在CLI中输入: npm run build-webpack,也就等效于npx webpack.

3. 如果一切没错的话,你指定的入口文件以及所有有关依赖都会打包到你指定的出口文件夹中的某个文件中去.
   
   ​     *(你可以指定多个入口文件/多个出口文件,它们都会按照一一对应关系打包的)*
   
   - ```bash
     entry: {
         name1: '路径/name1.js',
         name2: '路径/name2.js',
         ....
     }
     output: {
         path: path.resolve(__dirname, '出口文件夹名字'),
         filename: '[name].bundle.js'
     }
     ```
     
     - [path.resolve([...paths])](http://nodejs.cn/api/path.html#path_path_resolve_paths)
       
       将路径或路径片段的序列解析为绝对路径。
     
     ​    以上述配置,可以配置多个入口,并使用属性指定其出口中的:[name] 名字.
     
     ​    '[name].bundle.js': 即使用出口中的nameX作为[name]的名字, 然后加上.bundle(可自定义).js作为其生成的文件名.
     
     ​        PS: 多入口多出口通常是一一对应关系

### 插件的使用

#### [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#options)

- 更多配置,请点击标题哟. 可以配置默认的html文件名字和路径(及你要打包的html文件)等

##### 描述

如果你看到这段,通常说明已经大致了解webpack的打包流程是什么样子的了,如果你也了解CommonJS模块***(参见:<CommonJS.md>)***,那么你也应该很清楚什么是module.exports和require()函数了.

而且我想你也发现了,如果你需要**多次进行打包入口文件,并且可能会更新或者添加入口文件时,会发现index.html **(dist中的集合脚本和样式的html文件,可以存在多个)**仍然是引用旧的脚本文件,**

index.html中并不会动态更新,要我们手动去添加或者修改,这样做,在一些体量不够大的项目中,当然没问题,

可是如果一个体量足够的项目,就会很麻烦,而且容易出错,所以我们**可以使用一个插件解决该问题:HtmlWebpackPlugin**

##### 流程(安装)

1. 首先使用CLI下载: npm i -D html-webpack-plugin

2. 将插件导入到webpack.config.js配置文件中

3. 在webpack.config.js的module.exports对象中设置plugins属性为:
   
   ```js
       plugins:[
           new HtmlWebpackPlugin({
               title:'Output Management' //网页标题
               template:'自己编写的模板',
               filename:'设置你要输出的目录在哪并指定其输出文件的名字'        
           })
       ]
   ```
   
   - [template](https://github.com/jantimon/html-webpack-plugin#writing-your-own-templates):'src/assets/test.html'
     
     如果默认生成的HTML不能满足您的需求，那么您可以提供自己的模板。
     
     最简单的方法是使用该`template`选项并传递自定义HTML文件。
     
     html-webpack-plugin会自动将所有必要的CSS，JS，清单和收藏夹文件注入标记。
   
   - `filename:'assets/demo.html'`
   
   html-webpack-plugins中的设置详情请看github文档.
   
   注：如果要生成多个HTML文件，请在插件数组中多次声明该插件

4. 重新使用npx webpack或自己编写的package.json中scripts属性的值去再次运行,即可发现你指定的出口文件,将会被自动的加载在一个新的index.html文件中
   
   ​    *(这里之所以说是新的,请看下面同级目录: 原理)*

##### 原理

html-webpack-plugin会默认生成 inxdex.html 文件.这就是说,它会用新生成的 index.html文件将你存于出口文件夹中的index.html文件替换.

而默认生成的这个文件夹也是打包过后的,同时添加了你的所有依赖以及其他配置(详见:[官方文档](https://github.com/jantimon/html-webpack-plugin#options))

#### [mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)

##### 描述

该插件目的在于能够从某个js文件中单独提取出所有css或less样式,并指定其输出目录.

##### 使用

###### 将所有CSS或less提取到一个文件中

```js
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css", 
    })
  ],
```

- filename: "[name].css"
  
  name:自定义的名字. 将自动把你的出口文件夹作为输出目录.

- 如果你在这里使用相对/绝对路径,则也会在输出目录的下面创建你指定的路径,如 `filename:'demo/css/style.css`,
  
  则此时你的输出文件夹(如dist)会存在: demo / css ,即demo文件夹中有个css文件夹,里面又有个style.css.
  
  ​    **在使用时特别注意:**这样指定路径打包css,然后你又使用了html-webpack-plugin插件,
  
  ​    则该插件只会引用你的输出文件夹目录 + css文件名 => dist/style.css, 而不会dist/demo/css/style.css, 
  
  ​    需要使用其他方法,我们稍后讲

- 接着我们需要在module.exports中的module属性的rules值(数组)总添加loader,来告诉webpack打包css时,先用什么转换一下
  
  ```js
      module: {
          rules: [
              {
                  test: /\.(css|less)$/,
                  use: [
                      CssExtractPlugin.loader,
                      'css-loader',
                      'less-loader'
                  ]
              },
          ]
      },
  ```
  
  - test: /\.(css|less)$/
    
    ​    指定less和css都能被转换,然后被打包
    
    需要注意的是：在将less打包时,本地文件夹(node_modules)中,也要存在 less 库。

- 最后配置好webpack.config.js即可.

#### [copy-webpack-plugin](https://www.webpackjs.com/plugins/copy-webpack-plugin/)

[---简书](https://www.jianshu.com/p/5f1229395ca4) 

##### 描述

将你指定的单个文件或整个目录复制到你指定的某个目录中.

##### 使用

```js
plugins:[
    new CopyWebpackPlugin([
        {
            from: path.join(__dirname, 'src/png'),
            to: path.join(__dirname, 'output/png')
        }
    ])
]        
```

- [path.json()](http://nodejs.cn/api/path.html#path_path_join_paths)
  
  将所有给定的 `path` 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。

- from: 将_dirname(当前webpack.config.js所在的目录)下的src/png文件夹中的所有文件拷贝

- to:  拷贝到 当前目录的output/png文件夹中去(会自动生成)

```csharp
from  定义要拷贝的源文件    
to      定义要拷贝到的目标文件夹  
toType  file 或者 dir             //  可选，默认是文件
force   强制覆盖前面的插件          //  可选，默认是文件
context     // 可选，默认base   context可用specific  context
flatten  只拷贝指定的文件          //   可以用模糊匹配
ignore  忽略拷贝指定的文件         //    可以模糊匹配
```

### webpack如何打包的?

- 没有单独能把css打包的(大概吧),所以我们需要导入进js中(less也是如此)

#### 打包less

由于入口文件只能是js模块,所以我们需要向js中导入less,然后使用loader:

​    CssExtractPlugin.loader和less.loader和css.loader 

意思为:webpack会遇到你的的less文件后,会将之转为css文件, 然后从js这个模块中把转为的所有的css取出来,放入你指定的文件.

​    即:你在new CssExtractPlugin插件中指定的目录

### 总结用法

1. *同级目录:基本用法*  设置完成(其中可以不用先打包)

2. 设置你想要的开发环境 =>*webpack进阶及其用法->进阶->webpack开发时设置的环境* 

3. 安装你想要的插件=> *同级目录: 插件的使用*

4. 在webpack.config.js和package中配置你的设置.=>*webpack中的概念及其用法->其余概念-<webpack.config.js中的配置.*
   
   ​     有关package.json文件的请看: *<npm.md>*

### wepack.config.js和package.json通常用到的配置

#### wepack.config.js

```js
/**
 * 配置webpack的设置,webpack将以据此文件进行打包处理,更多设置请看:https://www.webpackjs.com/configuration/
 * 或详见: webpack中的概念及其用法 - 其余概念 - webpack.config.js中的配置
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        编译后的文件名字: '路径/要编译的文件的名字.js', // 可多个
    },
    output: {
        path: path.resolve(__dirname, '出口文件夹名'),
        filename: 'js/[name].replace.js'
    }, // 详见: output(出口)
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    CssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }, // 详见:webpack进阶及其用法->用法->插件的使用->mini-css-extract-plugin
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '../images/[name]-[hash:8].[ext]' // 详见:module.rules[]配置(loader)
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '' //网页标题
        }),
        new CssExtractPlugin({

            // name:自定义的名字. 将自动把你的出口文件夹作为输出目录.可指定路径,从而创建文件夹.详见:mini-css-extract-plugin
            filename: "demo/[name].css"
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '某个要拷贝的文件夹/某个要拷贝的文件夹'),
                to: path.join(__dirname, '拷贝到这的文件夹/拷贝到这的文件夹') // 其目录为:webpack.config.js所在的目录
            }
        ]), // 拷贝文件/文件夹到指定目录,存在许多配置,详见:插件的使用 - copy-webpack-plugin
    ],

    mode: '', // 设置为dev或production,详见:模式-概要

    // production:source-map ; dev: inline-source-map 详见:webpack开发时设置的环境 - webpack-dev-server
    devtool: ' inline-source-map ',
    //    devServer: '' //  webpack-dev-server,详见:webpack开发时设置的环境 - webpack-dev-server
}
```

#### package.json

```js
  "devDependencies": {
    "css-loader": "^3.5.1",
    "html-webpack-plugin": "^4.0.4",
    "less": "^3.11.1",
    "mini-css-extract-plugin": "^0.9.0",
    "url-loader": "^4.0.0",
    "webpack": "^4.42.1",
    "webpack-cli": "^3.3.11"
  },
```

## 前后端分离

### json-server
