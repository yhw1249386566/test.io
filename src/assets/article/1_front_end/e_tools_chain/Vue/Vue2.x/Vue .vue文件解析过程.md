# .vue 文件解析过程

若 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 的 loader 中应用（默认应用）了 vue-loader，则 [.vue 文件中的语言块](https://vue-loader.vuejs.org/zh/spec.html#%E7%AE%80%E4%BB%8B)（template、style、script 以及其他自定义块）就会根据 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 的其他相对应的 loader 去被 [Webpack](https://www.webpackjs.com/concepts/) 解析。

vue-loader 将会解析 .vue 文件中的内容，提取每个语言块（如有必要，某些语言块将会通过其他 webapck.config.js 的 loader 处理），最后会将这些解析过后的语言块组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。

也就是说，你导入一个 .vue 文件，相当于就导入了它通过 vue-loader 解析后变成的 ES Module 的默认导出（export default）对象。

1. [\<template\> 语言块](https://vue-loader.vuejs.org/zh/spec.html#%E6%A8%A1%E6%9D%BF)的内容会被提取并以字符串的形式传递给 [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)（一个 npm 包），然后提取的内容会被该包预处理为 JavaScript 渲染函数，最后会注入到 [\<template\>](https://vue-loader.vuejs.org/zh/spec.html#%E6%A8%A1%E6%9D%BF) 当前所在的 .vue 文件的默认从 \<script\> 导出的默认组件中。

2. [\<style\> 语言块](https://vue-loader.vuejs.org/zh/spec.html#%E6%A0%B7%E5%BC%8F)会按照 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 中所有匹配 .css（默认匹配 `/\.css$/` ）文件规则的 loader 去解析自身内容；

   若 [\<style\> 语言块]()存在 lang 属性，则该语言块所匹配的 [webpack 规则的 loader](https://www.webpackjs.com/concepts/#loader) 会按照 lang 属性指定的扩展名去解析自身内容。

   ---

   [\<script\> 语言块](https://vue-loader.vuejs.org/zh/spec.html#%E8%84%9A%E6%9C%AC)和 [\<style\> 语言块](https://vue-loader.vuejs.org/zh/spec.html#%E6%A0%B7%E5%BC%8F)是类似的做法，只不过匹配的 [webpack.config.js](https://www.webpackjs.com/configuration/#%E9%80%89%E9%A1%B9) 的 loader 由 .css 换成 .js；

   同样的，[\<script\> 语言块](https://vue-loader.vuejs.org/zh/spec.html#%E8%84%9A%E6%9C%AC)若存在 lang 属性，则也会按照 lang 属性指定的扩展名去匹配对应的 webpack 规则，从而被 Webpack 按照 [loader](https://www.webpackjs.com/concepts/#loader) 去解析自身内容。

   ---

   [自定义块](https://vue-loader.vuejs.org/zh/spec.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9D%97)-[自定义快](https://vue-loader.vuejs.org/zh/guide/custom-blocks.html)是 .vue 文件中除了 \<style> \<template> \<script> 的其他语言块，如 \<docs> 块；

   [vue-loader](https://vue-loader.vuejs.org/zh/guide/custom-blocks.html#example) 将会使用自定义块的标签名去匹配对应的 [webpack loader](https://www.webpackjs.com/concepts/#loader)，从而将这个匹配到的 [webpack loader](https://www.webpackjs.com/concepts/#loader) 应用在与之对应的自顶块上，即：自定义块的内容会被以自定义块的标签名匹配到的 [webpack loader](https://www.webpackjs.com/concepts/#loader) 规则解析。

3. 当 .vue 文件中的所有语言块都被按照对应的 [webpack loader](https://www.webpackjs.com/concepts/#loader) 规则解析之后，vue-loader 就会将这些解析过后的语言块的内容组装成一个 [ES Module](https://es6.ruanyifeng.com/#docs/module)，最后将之导出成一个 Vue.js 的组件选项对象。

   ​	参见：[此处](https://vue-loader.vuejs.org/zh/spec.html#%E7%AE%80%E4%BB%8B)

   也正是因为如此，当在其他 [Module](https://es6.ruanyifeng.com/#docs/module)（如其他 .vue 文件的 \<script>，或 [type="module" 的 \<script>](https://es6.ruanyifeng.com/#docs/module-loader)）中导入被暴露出的 .vue 文件中的默认导出组件时，就可以将导入的模块当做一个‘对象’使用在其他组件选项对象的 components 或 component 属性中，作为一个‘子组件’。

   ```js
   // HelloWorld.vue
   export default {/**...*/}
   
   // Main.vue
   <template>
      	<div>
       	// 应用 HelloWorld.vue 暴露出的默认组件
       	<HelloWorld></HelloWorld>
       </div>
   </template>
   import HelloWorld from './HelloWorld'
   export default {
       components:{
           // 将 HelloWorld.vue 作为子组件使用
           HelloWorld
       },
       // 或
       component:HelloWorld,
   }
   ```

   笔者注：.vue 文件中的语言块被解析，最后被组装成一个 ES Module 时，此时这个 ES Module 就相当于一个完整的具有样式、html 标签、业务逻辑（\<script>）以及其他自定义内容的组件。

   该组件可以被导入并应用在其他组件作为子组件来使用。

