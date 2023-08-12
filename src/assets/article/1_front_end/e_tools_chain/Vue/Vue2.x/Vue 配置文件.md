# [vue.config.js](https://cli.vuejs.org/zh/config/) 和 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9)

## vue.config.js

若使用 [Vue CLI](https://cli.vuejs.org/zh/guide/) 创建的项目，则请使用 [vue.config.js 去配置](https://cli.vuejs.org/zh/config/#%E9%85%8D%E7%BD%AE%E5%8F%82%E8%80%83)选项对象，即配置 ：`module.exports = {/**...*/)}`。

这是因为使用 [Vue CLI](https://cli.vuejs.org/zh/guide/) 创建的项目，会默认存在一个 [@vue/cli-service](https://cli.vuejs.org/zh/guide/#cli-%E6%9C%8D%E5%8A%A1) 开发环境依赖包（npm 包）和一个 [@vue/cli](https://cli.vuejs.org/zh/guide/#cli) 包（npm 包)，

前者提供关于 vue-cli-service 的命令：后者提供关于 vue 的命令。这两个包我们通常统称为 Vue CLI。

其中的  [@vue/cli-service](https://cli.vuejs.org/zh/guide/#cli-%E6%9C%8D%E5%8A%A1) 包是加载其他 CLI 插件的核心服务，且该包提供了针对大部分应用优化过后的内置的 webpack 配置，并且还内置了 vue-cli-service 命令，该命令提供：serve、build 和 inspect 命令。

另一个包 [@vue/cli](https://cli.vuejs.org/zh/guide/#cli) 则提供了诸如：vue create、vue serve、vue ui 等命令。

回到刚才的问题：为什么使用 [Vue CLI](https://cli.vuejs.org/zh/guide/) 创建的项目，则需要使用 [vue.config.js 去配置](https://cli.vuejs.org/zh/config/#%E9%85%8D%E7%BD%AE%E5%8F%82%E8%80%83)选项对象。

显然的：由于 [Vue CLI](https://cli.vuejs.org/zh/guide/) 内置了 webpack 配置，则导致开发者即使显示的书写 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 配置文件，也无法生效；而必须使用 [Vue CLI](https://cli.vuejs.org/zh/guide/) 提供的 [vue.config.js 配置](https://cli.vuejs.org/zh/config/)文件，这样在 [vue.config.js 配置](https://cli.vuejs.org/zh/config/)文件去配置选项对象，才会使 vue-cli-service serve/build/inspect 命令生效。

仔细想想，`npm run serve/build/inspect` 命令就是执行的是 vue-cli-service serve/build/inspect 命令，这样理所当然要在 [vue.config.js 去配置](https://cli.vuejs.org/zh/config/)选项对象，而不是在 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 去配置。

## [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9)

若不是使用 [Vue CLI](https://cli.vuejs.org/zh/guide/) 去创建的 Vue 项目，则可以通过 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 去配置选项对象。

值得注意的是：[webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 的 loader 规则（module.rules 配置属性）中，需要使用 [vue-loader](https://vue-loader.vuejs.org/zh/) 且 [VueLoaderPlugin](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE) 插件（ node_modules/vue-loader/lib/plugin）必须被应用于 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 的 plugins 配置属性中。

​	*该插件的目的：将你定义过的其它规则复制并应用到  .vue 文件里相应语言的块，什么意思？参见：.vue 文件解析过程*

这样，.vue 文件中的语言块才会正确的 webpack loader 规则解析；此时你就可以在 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 中去配置一些其他选项，如：[入口](https://www.webpackjs.com/concepts/entry-points/)文件、[出口](https://www.webpackjs.com/concepts/output/)文件、loader、plugins 等。

那不是使用 [Vue CLI](https://cli.vuejs.org/zh/guide/) 创建的 Vue 项目，除了使用 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 之外，还能使用 vue.config.js 吗？应该是可以的，但没有意义。前提是需要为项目安装 [Vue CLI 的两个包](https://cli.vuejs.org/zh/guide/#%E8%AF%A5%E7%B3%BB%E7%BB%9F%E7%9A%84%E7%BB%84%E4%BB%B6)：[@vue/cli](https://cli.vuejs.org/zh/guide/#cli)（全局安装），[@vue/cli-service](https://cli.vuejs.org/zh/guide/#cli-%E6%9C%8D%E5%8A%A1)（局部安装）。

这样就应该可以使用 vue.config.js 去配置当前项目的选项，但是由于此时又因为存在 [@vue/cli-service](https://cli.vuejs.org/zh/guide/#cli-%E6%9C%8D%E5%8A%A1)，导致存在 Vue CLI 又内置了 webpack 默认配置，所以很可能显示配置的 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 无法使用*（详见：同级目录 - vue.config.js）*。

## 总结

使用 Vue CLI 创建的 Vue 项目，建议只使用 vue.config.js 去配置选项

未使用 Vue CLI 创建的 Vue 项目，建议只使用 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 去配置选项

前者能让你不操心 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 中的配置，因为 Vue CLI 已经针对大部分应用对 webpage 配置做了优化，并内置进了 Vue CLI 中，且还能通过构建于 webpack 之上的 vue.config.js 配置文件去再深入做一些当前项目的配置。

后者则是提供给那些 Vue CLI 内置的 webpack 配置没有满足项目需求 或 乐于从零开始创建自己项目的 webpack 配置的人；

好处有：从零开始自己配置 webpack 规则是非常贴合于自己项目的，也不会存在其他的 webpack 规则冗余或多余的包，也不会存在需要的 webpack 规则没有的这种情况。

对于非专业人员：笔者建议直接使用 Vue CLI 创建脚手架使用；

对于专业人员：则是从零开始为项目配置 webpack 规则 或 使用 Vue CLI 创建完脚手架后，在其中针对项目进行一些规则修改。

- 你可以选择直接在 vue.config.js 文件中直接调整 webpack.config.js 文件的配置，参见：[Vue CLI - webpack 相关](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)

