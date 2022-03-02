import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const markdown = `
### plugins(插件)

loader 被用于转换某些类型的模块,而插件则可以用于执行范围更广的任务.

插件的范围包括,从打包优化和压缩,一直到重新定义环境中的变量.[插件接口](https://www.webpackjs.com/api/plugins)功能极其强大,可以用来处理各种各样的任务.

想要使用一个插件,你只需要 ~require()~ 它,然后把它添加到 ~plugins~ 数组中.多数插件可以通过选项(option)自定义.

你也可以在一个配置文件中因为不同目的而多次使用同一个插件,这时需要通过使用 ~new~ 操作符来创建它的一个实例.

插件实则是相当于开放mod,就是让其余开发者自己开发一个个好用的东西,然后上传供别人使用.

**webpack.config.js**

~~~js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

const config = {
  module: {
    rules: [
      { test: /\\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};

const A = () =>{
    <div>
     1231
    </div>
}

module.exports = config;
~~~

webpack 提供许多开箱可用的插件！查阅我们的[插件列表](https://www.webpackjs.com/plugins)获取更多信息.

在 webpack 配置中使用插件是简单直接的,然而也有很多值得我们进一步探讨的用例.

[了解更多！](https://www.webpackjs.com/concepts/plugins)

## 其余概念
`
export default function Index() {
    return (
        <>
            <ReactMarkdown
                /* eslint-disable react/no-children-prop */
                children={markdown}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={dark}
                                language={match[1]}
                                PreTag='div'
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                }}
                /* eslint-disable react/no-children-prop */
            />
        </>
    )
}
