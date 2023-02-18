# 概述

Yomua

# md -> html

可以将 .md（文章）内容直接复制并存储到一个个 txt 中，然后获取 txt 的内容并存储到数组中，然后再渲染这个数组前，使用 [markdown](https://github.com/millerblack/markdown-js).js 库将内容编译成 html，最后再渲染到页面。

这样就成功把 .md 搞到了页面上。

# 要用什么

里面文章内容布局：左边目录，右边正文。可以使用 [antd - menu](https://ant.design/components/menu-cn/)

# theme

https://antdtheme.com/dark

# 流程

https://naotu.baidu.com/file/051d287cb41ee79e951017bf5980340d

# PR 合并流程

-   基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.
    由于 dev 是保护分支，所以 gitee 将会自动创建一个 pr 到 dev，不需要手动。
-   dev 有更新后，PR 到 release.
