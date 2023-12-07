# webpack.config.js 中的配置

官方:[webpack中文文档](https://www.webpackjs.com/configuration/) 

## 描述

webpack 是需要传入一个配置对象(configuration object):module.exports={...}

这取决于你如何使用 webpack,可以通过两种方式之一：

1. 终端,即使用webpack.config.js
2. Node.js,即直接在node中使用命令执行

下面指定了webpack.config.js中所有可用的配置选项

由于太多了,请移步官方文档:[webpack中文文档](https://www.webpackjs.com/configuration/)

## [配置 loader](https://www.webpackjs.com/guides/asset-management)

### 描述

即用来解析如png,css,json这些文件,讲这些文件解析后在进行打包,否则无法打包成功. 详见: ***核心概念-概要 - loader(加载)***

也就是说,在解析这些文件之前,告诉webpack,先使用某个loader转换一下,在解析.

### [url-loader](https://www.webpackjs.com/loaders/url-loader/)

#### 参考

- [思否](https://segmentfault.com/a/1190000015946766)

#### 描述

url-loader封装了file-loader,但是并不依赖于file-loader,我们可以单独使用它.

它的功能类似于 [file-loader](https://github.com/webpack-contrib/file-loader)，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

并且能解决css,html,js中对图片的引用的路径问题,虽然file-loader同样的也可以解决,但是url-loader会将引入的图片进行编码， 我们引用的时候只需要引入这个文件就可以访问图片了， 可以大大减少 HTTP请求的次数。

#### 使用

```bash
module.epxorts = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "../images/[name]-[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
};
```

- ***option:{}***
  
  ​    一看就知道,设置在将各种文件转码前的一些配置,详见:*参考*

- ***limit: 8192***
  
  ​    限制图片打包大小.
  
  ​    如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串

- ***name: '../images/[name]-[hash:8].[ext]'***
  
  ​    images:出口文件夹中的文件夹.
  
  ​    [name].[ext]:设定图片按照本来的文件名和扩展名打包，不用进行额外编码
  
  ​    [hash:8] :如果一个项目中两个文件夹中的图片重名，打包图片就会被覆盖，所以我们在`name`后面加上`-hash`值的前八位作为图片名，可以避免重名=>002-23db0f85.png,后面8个数字,即为hash值
  
  ​    **../** :  引用打包图片时,其引用的路径 => 
  ../images/demo/002-23db0f85.png
  
  ​        这个路径是可选的,防止你还打包并生成了css文件,且将该css文件夹放到了出口文件夹中的另一个文件夹下面,而不是直接在出口文件夹下面.

### css-loader

详见: ***webpack进阶及其用法->用法->插件的使用->mini-css-extract-plugin***

```bash
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

### style-loader

可以被mini-css-extract-plugin 插件替换 , 即:mini-css-extract-plugin.loader

### less-loader

若你想要将less直接打包的时候就自动转成css并生成在你指定的文件夹中,可以参见:[点击](https://www.cnblogs.com/goloving/p/8654176.html)

- 使用一个js文件将我们需要打包的less导入进去
- 然后打包这个js文件(在entry中)
- 再使用html-webpack-plugin插件设定其less转为css后文件在出口文件夹的哪里

## 多入口多出口

### 描述

- 更多了解,请参见:[官方文档--配置](https://www.webpackjs.com/configuration/)

你可以指定多个入口文件/多个出口文件,它们都会按照一一对应关系打包的

```bash
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

​    以上述配置,可以配置多个入口,并使用属性指定其出口中的:[name] 名字.

​    '[name].bundle.js': 即使用出口中的nameX作为[name]的名字, 然后加上.bundle(可自定义).js作为其生成的文件名.

- PS: 多入口多出口通常是一一对应关系

### 示例

```js
/** D:/demo/webpack-demo/webpack.config.js */
entry: {
    index: './moduleName.js',
    love: './modName.js',
    ....
}
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].ArbitraryName.js'
}
```

- [path.resolve()](http://nodejs.cn/api/path.html#path_path_resolve_paths)

以上示例,会将当前模块所在的路径转换成绝对路径再 + dist 文件夹,如 => /demo/webpack-demo/dist, 作为出口文件夹,并输出指定的文件名字:

​    => index.ArbitraryName.js 和 love.ArbitraryName.js

## 多入口单出口

与多入口多出口差别在于,将output属性的值使用一个固定的文件名字即可,这样所有的入口文件及所有有关依赖都会被打包到该出口文件.

```js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'allEntryModule.bundle.js'
  }
```

即会在:当前模块根目录的绝对路径 + dist文件夹中,自生成一个allEntryModule.bundle.js 文件,这里面存的是所有入口文件及所有有关入口文件的依赖.

- PS: 如果你用了 *用法 - 进行用法* 中的html-webpack-plugin插件,则出口文件夹中的生成的.js出口文件,会被添加到一个自动生成的index.html页面中去. 

## entry

```bash
entry: {
    编译后的文件名字:'路径/要编译的文件的名字.js',
    ....
}
```

## output

### 常用配置

```js
output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'js/[name].replace.js'
}
```

- path:
  
  ​    指定出口文件夹的位置在哪, [path.resolve()](http://nodejs.cn/api/path.html#path_path_resolve_paths)=>返回一个字符串:
  ​    绝对路径. 从右→左计算,每个参数都是一个路径,最后加起来返回绝对路径,
  
  ​    整个意思为: 当前模块的绝对路径 + output=>/demo/output

- filename
  
  ​    用来设置打包后js后的名字, 也可以为止这些打包完成的js文件设置存放路径. 对于这些js文件来说,根目录基于: 
  
  ​    你设置的出口文件夹的位置.=> /demo/output/js/[name].replace.js

- 具体用法,详见: ***核心概念-概要 - output(出口)***

## plugins:[]

其语法格式为:

```js
plugins: [
    new xxxx(), // 通常是new xxxx(),xxxx为加载模块时赋予的名字
    new xxxx(),
    ....
]
```
