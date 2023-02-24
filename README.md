# 概述

Author: Yomua

# md -> html

直接将 .md 导出成 html 即可

# 要用什么

里面文章内容布局：左边目录，右边正文。可以使用 [antd - menu](https://ant.design/components/menu-cn/)

# Theme

https://antdtheme.com/dark

https://naotu.baidu.com/file/051d287cb41ee79e951017bf5980340d

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

# 开发流程

1.  基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.

    由于 dev 是保护分支，所以 gitee 将会自动创建一个 pr 到 dev，不需要手动。

2.  dev 有更新后，PR 到 release

# Build & Deploy

项目设置了 github action, 且 gitee 上设置了仓库镜像（push 到 github yomua 仓库），

我们只需要在 gitee 上做以下操作，即可自动将更新推送到 Github Pages，

1. 将 feature 分支合并到 dev
2. 将 dev 合并到 release

若此若做，我们就成功将项目部署到 whyhw.com 上，经过的步骤有：

1. Gitee yomua 仓库将会同步到 Github yomua 仓库，

2. release 有更新时，将会自动触发工作流

    因为 Github yomua 仓库中设置了 workflow（即：github action）

    workflow 触发将自动将项目打包编译到 github gh-pages 分支，

3. Github Pages 将会使用 gh-pages 作为基分支，将它部署到线上，

    最后我们使用 Custom Domain，让 www.whyhw.com 作为代理，这样访问 whyhw.com 时，将能看到部署成功的项目。

# Function

## Todo

# 流程

https://naotu.baidu.com/file/051d287cb41ee79e951017bf5980340d

# PR 合并流程

-   基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.
    由于 dev 是保护分支，所以 gitee 将会自动创建一个 pr 到 dev，不需要手动。
-   dev 有更新后，PR 到 release.

# Todo

这是以前在实习的时候，在紫讯公司写的 todo,
如果后面要重构，那么 mobx, mobx-react 可以删除，这两个库目前只用于 Todo
