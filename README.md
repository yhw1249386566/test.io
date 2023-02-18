# 概述

Yomua

# md -> html

可以将 .md（文章）内容直接复制并存储到一个个 txt 中，然后获取 txt 的内容并存储到数组中，然后再渲染这个数组前，使用 [markdown](https://github.com/millerblack/markdown-js).js 库将内容编译成 html，最后再渲染到页面。

这样就成功把 .md 搞到了页面上。

# 要用什么

里面文章内容布局：左边目录，右边正文。可以使用 [antd - menu](https://ant.design/components/menu-cn/)

# Theme

https://antdtheme.com/dark

-   为组件添加 theme，请把 css 写在当前组件所在的文件夹中。这个目的是为了达到 [关注点分离](https://zh.wikipedia.org/zh-hans/%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB) 的目的。

-   如果一定要存在全局 css 变量，参见 `如何添加 theme 对应的 className 和 变量名` 一节。

## 如何添加 theme 对应的 className 和 变量名

组件中：

-   className => 组件名-{theme}；
    例如：text-dark, text-light

-   css 变量名 => 所在文件夹名-组件名-{任意要取的 className 名}；
    例如：--component-text-primary-color

全局变量 \_global.css 中：

-   global-{任意要去的 className 名}；
    例如：--global-primary-background-color

# 如何为项目封装一个组件

1. 在 component 文件夹中创建组件名
2. 使用 useTheme() 获取 theme，基于 theme 设置 className-light/dark
3. 在 className-light/dark 中添加 css theme 变量
4. 应用 css 变量，为组件提供 light & dark 模式样式

注意：组件必须要高内聚，低耦合！且在封装中的组件中，禁止存在任何全局变量！！！

# 流程

https://naotu.baidu.com/file/051d287cb41ee79e951017bf5980340d

# PR 合并流程

-   基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.
    由于 dev 是保护分支，所以 gitee 将会自动创建一个 pr 到 dev，不需要手动。
-   dev 有更新后，PR 到 release.

# Todo

这是以前在实习的时候，在紫讯公司写的 todo,
如果后面要重构，那么 mobx, mobx-react 可以删除，这两个库目前只用于 Todo
