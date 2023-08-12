# [Vue Loader](https://vue-loader.vuejs.org/zh/)

## 用处

- 对于一个使用 Vue CLI 构建的项目来说，使用 
  vue inspect > output.js 命令（[点这](https://cli.vuejs.org/zh/guide/cli-service.html#vue-cli-service-inspect)）可以将当前项目的所有配置文件输出到 output.js 文件中。

  从该文件中，你可以通过查询 vue-loader，很明显的就可以知道 vue-loader 对 .vue 文件的重要性。

vue loader 能够把 .vue 文件中的语言块的内容提取出来，使用 webpack 的其他 loader 来对其解析，

甚至 vue loader 还能做到把语言的 lang 属性值(若有)作为其匹配 webpack loader 规则的值，如果 lang 属性值匹配到了同样的 webpack loader，则就使用匹配到的 webpack loader 解析其具有 lang 属性值的语言块的内容。

这就表明，我们可以为 \<style> 语言块使用 lang="less/sass/..."，从而可以在 \<style> 语言块中应用 less/sass/... 语法也能被 webapck 对应的 loader 解析。

\<template>、\<script>、\<其他语言块> 也是如此。

vue loader 需要搭配 vue-template-compiler（npm)包使用，这是因为 \<template> 语言块不需要使用 webpack loader，而是使用这个 vue-template-compiler 包来进行内容的解析，

[vue-template-compiler 的用处：](https://vue-loader.vuejs.org/zh/spec.html#%E6%A8%A1%E6%9D%BF)可以将 \<template> 语言块块内容（被 vue-loader 提取并转换成字符串且传递给 vue-template-compiler 后）预处理为 JavaScript 渲染函数，并最终注入到当前 \<template> 语言块所在的 .vue 文件的 \<script> 中默认导出（export default ...)的组件中。

并且应用 vue-loader 时，还需要使用 node_modules/vue-loader/lib/plugin 路径下的 plugin.js 这个文件，这是必须的，它的[职责](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块

## [Scoped CSS](https://vue-loader.vuejs.org/zh/guide/scoped-css.html)

### [深度作用选择器](https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B1%E5%BA%A6%E4%BD%9C%E7%94%A8%E9%80%89%E6%8B%A9%E5%99%A8)

在一个组件 A 中使用另一个组件 B 作为其子组件，对组件 A 这个 .vue 文件的某个 style 使用如下：

```html
<!--
  如果使用 style scoped ，则当前 style scoped  所处的组件的根元素，（在这里为：<yy>）在解析时会加入 data-v-* 属性，来确保 style scoped 仅作用域当前组件的元素（<yy> 元素）而不会污染全局。
  而根元素的内部子元素则不会加入 data-v-*，但是 style scoped 在解析里面的元素选择符时，都会自动加入 [data-v-*]，这就导致由于实际上根元素的所有子元素不存在 data-v-* 属性（即使子元素在其他 .vue 文件中使用了 style scoped 而导致存在 data-v-* 属性，也没用，因为，
-->
<template>
    <yy class="one">
        <dd class="two"></dd>
    </yy>
</template>

<!--
以下的 style 会被编译成：
	.one[data-v-17bb9a05] .two[data-v-17bb9a05{...}
 但是实际上，这是没用的，因为上面的 template 中的内容只有最外层会加入 data-v-17bb9a05 属性，而内容 <dd> 则不会加入 data-v-*，
 这就会导致 .one[data-v-17bb9a05] .two[data-v-17bb9a05{...}是无效的，因为 class="two" 的 <dd> 元素不存在 data-v-* 属性
-->
<style scoped>
    .one .two {
        ...
    }
</style>
```

要想解决以上的问题，可以使用深入作用选择符，如：

```html
<template>
    <yy class="one">
        <dd class="two"></dd>
    </yy>
</template>


<!--
以下的 style 会被编译成：
	.one[data-v-17bb9a05] .two{...}
  这样，class="two" 的 <dd> 元素即使不存在 data-v-* 属性也可以被选择到。
  即使 <dd> 元素所在的 .vue(若有)文件存在 style scoped，导致 <dd> 元素存在 data-v-* 属性，.one[data-v-17bb9a05] .two{...} 选择符也依然能选择到 .two，
  显然的，只要满足 class="two" 就可以选择，而不是还要满足具有 data-v-* 属性。
-->
<style scoped>
    .one >>> .two {
        ...
    }
</style>
```

来源于：[此处](https://www.cnblogs.com/CyLee/p/10006065.html)

## CSS Modules

#### [使用](https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95)

可以使 .vue 文件中的具有 module 属性的 \<style\> 语言块中的内容存储在名为 $style 的计算属性中，接着向组件注入具有 module 属性的 \<style\> 局部对象（即：注入 $style 计算属性），就可以在模板中通过一个动态类绑定来使用 CSS Module 中的内容。











