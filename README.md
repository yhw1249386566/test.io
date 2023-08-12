# 概述

Author: Yomua

# md 

用 react-markdown 解析

使用 markdown-navbar 做导航栏

# Theme

https://antdtheme.com/dark

https://naotu.baidu.com/file/051d287cb41ee79e951017bf5980340d

-   为组件添加 theme，请把 css 写在当前组件所在的文件夹中。这个目的是为了达到 [关注点分离](https://zh.wikipedia.org/zh-hans/%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB) 的目的。

-   如果一定要存在全局 css 变量，参见 `如何添加 theme 对应的 className 和 变量名` 一节。

- layout 中或 pages 中可以使用 global css 属性（这只是当前考虑可以使用，在未来或许 global 只能用于 layout）

## 如何添加 theme 对应的 className 和 变量名

组件中：

-   className => 组件名-{theme}；
    例如：text-dark, text-light

-   css 变量名 => 所在文件夹名-组件名-{任意要取的 className 名}；
    例如：--component-text-primary-color

全局变量 \_global.css 中：

-   global-{任意要取的 className 名}；
    例如：--global-primary-background-color

# 如何为项目封装一个组件

1. 在 component 文件夹中创建组件名
2. 使用 useTheme() 获取 theme，基于 theme 设置 className-light/dark
3. 在 className-light/dark 中添加 css theme 变量
4. 应用 css 变量，为组件提供 light & dark 模式样式

注意：组件必须要高内聚，低耦合！且在封装中的组件中，禁止存在任何全局变量！！！

# Feature

## 如何添加 Feature

1. src/pages/constant - FeatureList 添加对应对象
2. src/pages/feature 中添加此对象应该渲染哪个组件

注意：我们可以将 src/pages/feature 改为动态加载 Feature，但这会造成页面闪烁问题 —— 此问题是由于第一次渲染没数据，update() 后才有数据造成的。Reference: src/pages/feature - dynamicFeature.tsx

## 如何添加 Feature - Article

添加 Article 的方法为：在 src/assets/article 中直接添加你要的 .md 文件即可。

- 程序会在构建前运行 yarn build-article，预构建 src/assets/article 文件树放入 src/articleDir.js 并导出

- src/pages/feature/article 会根据文件树生成文件目录到页面，点击对应目录时，将动态导入（ *import()* ）对应的文件，从而显示在页面。

## Todo

这是以前在实习的时候，在紫讯公司写的 todo,
如果后面要重构，那么 mobx, mobx-react 可以删除，这两个库目前只用于 Todo

## Gpt3

这是使用 OpenAI 的一个开放 AI 接口: [gpt3](https://platform.openai.com/docs/models/gpt-3-5) 完成的一个 demo.

- 由于此项目是静态项目，直接使用 [GPT 的 API](https://platform.openai.com/docs/api-reference/chat/create#chat/create-stream) 似乎不能直接在前端完成流式传输，所以可能需要考虑一个 GPT 的一个 URL 作为 API，使用 fetch - Response 完成流式传输。

# 流程

## 开发流程

1.  切换到 dev 分支，pull release

2.  基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.
    或： push 当前分支，并手动使当前分支 PR 到 dev.

    由于 dev 是保护分支，所以 gitee 将会自动创建一个 pr 到 dev，不需要手动。

3.  PR 合并后，使 dev PR 到 release

4.  合并 PR，将自动开始执行 <a href='#Build & Deploy'>Build & Deploy</a>.

## PR 合并流程

-   基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.
    由于 dev 是保护分支，所以 gitee 将会自动创建一个 pr 到 dev，不需要手动。
-   dev 有更新后，PR 到 release.

## Build & Deploy

项目设置了 github action, 且 gitee 上设置了仓库镜像（这个功能会让 gitee 帮忙 push 到 github yomua 仓库），

我们只需要在 gitee 上做以下操作，即可自动将更新推送到 Github Pages，

1. 将 feature 分支合并到 dev
2. 将 dev 合并到 release

若此若做，我们就成功将项目部署到 whyhw.com 上，经过的步骤有：

1.  Gitee yomua 仓库将会同步到 Github yomua 仓库，

2.  release 有更新时，将会自动触发工作流

    因为 Github yomua 仓库中设置了 <a href='https://docs.github.com/en/actions/using-workflows/about-workflows'>workflow</a>（即：<a href='https://docs.github.com/en/actions/quickstart'>github action</a>）

        workflow 触发将自动将项目打包编译到 github gh-pages 分支，

    -   NOTICE: action 包含 workflow

3.  Github Pages 将会使用 gh-pages 作为基分支，将它部署到线上，

    最后我们使用 Custom Domain，让 www.whyhw.com 作为代理，这样访问 whyhw.com 时，将能看到部署成功的项目。


# TODO
-   将 umi 框架从项目移除，更改为手动搭建项目流程（基于 webpack）
-   React 已经升级到 18.x, 将为现有代码和后续代码渐进式升级到 18.x
-   为移动端适配 UI
-   实时更新已有文章，并且更新完成之后可以下载已有文章成为 md 文件，但是刷新之后不保留此文件。
