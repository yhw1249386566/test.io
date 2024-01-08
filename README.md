# 概述

Author: Yomua

# 快速开始

1. `yarn`

2. `yarn build-article`

3. `yarn start-dev`

可选

-   `yarn build` 生成编译后结果。

# 目录结构

## public

### .nojekyll

此文件用来告诉 github 此网站不是用 jekyll 创建，不要用 jekyll 来渲染 markdown 文件内容。

github pages [默认使用 jekyll](https://docs.github.com/zh/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll) 来渲染 markdown 内容。

如果不这么做，我们这里 public/article 下的所有 markdown 文件，

如果出现了不能被 jekyll 解析的内容（如：`{{}}`），github action 就会部署失败。

为什么要放在 public/ 里面，因为 github action 会使用最终我们的打包后的结果。

### article

此文件夹用来存放 feature-article 功能显示的文章。

所有文章均是 `.md` 后缀, 即: 使用 markdown 语法。

对于 `.md` 文件中的图片, 其存放目录应该为: `./picture` 下, 即:

当前 `.md` 文件的同级目录, 存在 `picture` 文件夹, 里面有图片，结构大概长这样:

```
|- test.md
|- picture
 |- img1.png
 |- img2.jpg
 |- img3.gif
```

目前图片支持: `.jpg, .png, .gif`.

其他格式不做要求。

### picture

此文件夹递归 `public/article` 下的所有 `picture` 文件夹, 取出里面的图片, 最后用同样的命名复制到此文件夹的.

目的: github pages 挂载 `yomua` 项目时, `.md` 文件中若使用 `picture/图片名` 这样的格式引入图片,

相当于请求 `网址/picture/图片名` -> `https://www.whyhw.com/picture/图片名` , 所以为了能正确显示, 就这么做了.

[一个图片的地址例子](https://www.whyhw.com/picture/ModelViewControllerDiagram.png)

## src/config

目录: /config

由于目前还没有将 umi config 迁移到 webpack, 所以以下说的都是 umi 配置。

plugin

-   `[dotenv](https://www.npmjs.com/package/dotenv)`

    添加此插件，用来在打包时注入 /.env 数据到 process.env 中。

loader

-   `html-loader`

-   `markdown-loader`

    用来解析 .md 文件，提供给 react-markdown 使用。

# Module

对于 npm 的包来说，其实有些包不需要下载，可以自己写在 npm 仓库中，比如：

-   y-screw

-   y-enchant

注意: 目前此仓库中的 /packages 可以完全使用自己的 [npm 仓库](https://www.npmjs.com/settings/yomua/packages)代替。

## Module 说明

**production**

-   `umi`

    脚手架, 后面会使用 webpack 或 vite 替换

-   `mobx`, `mobx-react`

    目前只用于 page - Todo

-   `react-markdown`, `rehype-raw`, `remark-gfm`, `markdown-navbar`, `github-markdown-css`

    目前只用于 markdown

-   `openai`

    目前只用于 page - Gpt

-   `three`

    目前没用, 曾经使用于 page - Three

-   `react-custom-scrollbars-2`

    用于美化 scrollbar 样式

-   `eventemitter3`

    用于分发订阅事件

-   `@ant-design/pro-layout`

    用于加载 ant-design 相关组件; 如: `import { Card } from 'antd'`

    为什么不使用 `antd` 此包？ 当然可以，不过都一样，我懒得换，后面可能会换。

    TIP: `antd` 的版本号为: "4.24.15", 可以从导入的 `antd` 包点进去查看。

-   `@fortawesome/react-fontawesome`

    用于加载 FontAwesome

**dev**

-   `dotenv`

    目前生产不需要它, 我们只需要在打包前、打包时将 .env 文件注入到 process.env 中即可。

# 命名

<!-- **文件名使用蛇形命名，不用小驼峰，如：**

-   my_user

为什么？有些系统对文件名大小写敏感，有些不敏感，这可能导致一些意料之外的事故。

git 根据配置也可以大小写敏感或不敏感。 -->

**文件夹/文件使用 kebab-case 风格命名，不用小驼峰，如：**

-   my-user

为什么？有些系统对文件名大小写敏感，有些不敏感，这可能导致一些意料之外的事故。

git 根据配置也可以大小写敏感或不敏感。

kebab-case 和 蛇形 命名二者类似, 只要保持项目中的风格一致即可.

对于 hooks 的文件命名则使用小驼峰.

**组件名使用大驼峰命名，如：**

-   MyUser

**常量、枚举使用全大写蛇形命名，如：**

-   MY_USER

**变量名使用小驼峰命名，如：**

-   myUser

# Theme

https://antdtheme.com/dark

https://naotu.baidu.com/file/051d287cb41ee79e951017bf5980340d

-   对于组件、页面能使用全局样式就使用全局样式，实在不行才写局部样式。

    为什么变了？这是为了方便以后将每个 Card 作为微应用时，可以更好的进行样式替换。

    并且这样做，能更好的适配各种主题，不需要在每一个地方都改变。

-   ~~为组件添加 theme，请把 css 写在当前组件所在的文件夹中。~~

    ~~这个目的是为了达到 [关注点分离](https://zh.wikipedia.org/zh-hans/%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB) 的目的。~~

-   ~~如果一定要存在全局 css 变量，参见 `如何添加 theme 对应的 className 和 变量名` 一节。~~

-   ~~layout 中或 pages 中可以使用 global css 属性。~~

    ~~这只是当前考虑可以使用，在未来或许 global 只能用于 layout~~

## 如何添加 theme 对应的 className 和 变量名

必要时才添加

组件中：

-   className => 组件名-{theme}；

    例如：text-dark, text-light

-   css 变量名 => 所在文件夹名-组件名(文件名和组件名一样可忽略)-{任意要取的 className 名}；

    例如：--component-text-primary-color, --article-text-color

全局变量 \_global.css 中：

-   --global-{任意要取的 className 名}；

    例如：--global-primary-background-color

# 流程

## 开发流程

1.  切换到 dev 分支，pull release

2.  基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.

    或： push 当前分支，并手动使当前分支 PR 到 dev.

3.  PR 合并后，使 dev PR 到 release

4.  合并 PR，将自动开始执行 <a href='#Build & Deploy'>Build & Deploy</a>.

## PR 合并流程

-   基于 dev 分支拉出新分支，然后进行修改，最后直接 push 到 dev.

-   dev 有更新后，PR 到 release.

## Build & Deploy

项目设置了 github action, 且 gitee 上设置了仓库镜像

TIP: 这个功能会让 gitee 帮忙 push 到 github yomua 仓库。

我们只需要在 gitee 上做以下操作，即可自动将更新推送到 Github Pages，

1. 将 feature 分支合并到 dev

2. 将 dev 合并到 release

若此若做，我们就成功将项目部署到 whyhw.com 上，经过的步骤有：

1.  Gitee yomua 仓库将会同步到 Github yomua 仓库，

2.  release 有更新时，将会自动触发工作流（.github/workflows/build.yml）

    因为 Github yomua 仓库中设置了 <a href='https://docs.github.com/en/actions/using-workflows/about-workflows'>workflow</a>（即：<a href='https://docs.github.com/en/actions/quickstart'>github action</a>）

        workflow 触发将自动将项目打包编译到 github gh-pages 分支，

    -   NOTICE: github action 的意思涵盖 github workflow

3.  Github Pages 将会使用 gh-pages 作为基分支，将它部署到线上，

    最后我们使用 Custom Domain，让 www.whyhw.com 作为代理，

    这样访问 whyhw.com 时，将能看到部署成功的项目。

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

注意：我们可以将 src/pages/feature 改为动态加载 Feature，

但这会造成页面闪烁问题 —— 此问题是由于第一次渲染没数据，update() 后才有数据造成的。

Reference: src/pages/feature - dynamicFeature.tsx

## 如何添加 Feature - Article

添加 Article 的方法为：在 src/assets/article 中直接添加你要的 .md 文件即可。

-   程序会在构建前运行 yarn build-article，

    预构建 src/assets/article 文件树放入 src/articleDir.js 并导出

-   src/pages/feature/article 会根据文件树生成文件目录到页面，点击对应目录时，

    将动态导入（ _import()_ ）对应的文件，从而显示在页面。

## Todo

这是以前在实习的时候，在紫讯公司写的 todo,

如果后面要重构，那么 mobx, mobx-react 可以删除，这两个库目前只用于 Todo

## Gpt3

这是使用 OpenAI 的一个开放 AI 接口: [gpt3](https://platform.openai.com/docs/models/gpt-3-5) 完成的一个 demo.

-   由于此项目是静态项目，直接使用 [GPT 的 API](https://platform.openai.com/docs/api-reference/chat/create#chat/create-stream) 似乎不能直接在前端完成流式传输，

    所以可能需要考虑一个 GPT 的一个 URL 作为 API，使用 fetch - Response 完成流式传输。

# TODO

-   将 umi 框架从项目移除，更改为手动搭建项目流程（基于 webpack）

-   使用 WebGL 尝试修改首页，比如：一个打开的 3d 书，每一页一个功能，有个目录之类的

-   为 article 添加搜索目录功能，可以根据关键词搜索对应路径、文件。

-   三端：PC(网页 + 手机端适配) + Mobile(ios, Android) + 小程序，可使用 taro

-   搞一个 SDK 包，比如：yhook，直接使用 monorepo 项目管理方式 √ 已经有初始项目了，

    参见：[npm 仓库](https://www.npmjs.com/settings/yomua/packages)

    注意: 目前我们以项目中的 packages 作为最新包使用, 等到各个包稳定后, 才更新到 npm 仓库,

    不然, 可能后续要经常更新包, 会很麻烦.

-   实时更新已有文章，并且更新完成之后可以下载已有文章成为 md 文件，但是刷新之后不保留此文件。

-   React 已经升级到 18.x, 将为现有代码和后续代码渐进式升级到 18.x

-   解决 history 路由挂载到 github pages 上，访问时出现 404 问题。

    原因：访问 https://www.whyhw.com/article/test.md 时，路径不匹配，找不到对应文件。

    可以做一个代理，当访问 article/ 目录或访问 .md 文件，则代理到 xxx

-   让图片解决方法更通用，即：找 article/ 下的所有图片（而非只是 picture/ 的目录），

    如果在非 picture/ 目录下发现的图片，就将此目录（如：目录 img/test.png）同样提取到 /public/ 中（比如：/public/img/test.png）

-   采用微前端架构，每一个 item 都是一个独立应用，可采用 [qiankun](https://qiankun.umijs.org/zh),

    或其他框架: [Single-spa](https://github.com/single-spa/single-spa), [Garfish](https://www.garfishjs.org/) 等。

-   对于 .env 文件，后面可以使用命令加参数的方式去识别是 dev 或 prod, 从而加载不同的 .env 文件。

    如: yarn start-dev --mode dev --env file=dev.env (可以写到 package.json)

    TIP: .env 通常放的是不同环境带来的值，而不是常量，

    比如: SCROLL_SPEED 是不能放入环境变量中的。我这里只是先放在 .env, 后期会修改。

-   后期可以将生产依赖（dependence）手动实现;

    react, react-dom, webpack; 希望有时间, 有精力...

-   目前文章中的图片出现了问题; 因为我们现在使用了 history 路由模式,

    导致如果文章中的图片是 `[picture/xx.png]` 这样的相对路径时,

    它会拼接当前 url 作为请求 -> `https://www.whyhw.com/feature/article/a_base/xx.png`,

    解决: `[picture/xx.png]` -> `[/picture/xx.png]`;

    由相对路径改成绝对路径, 好处是图片在线上时没有问题, 且使用 markdown 打开 .md 文件也能显示图片; 坏处是在 vscode 中预览图片会失败, 因为解析的是根目录, 比如: `D:/code/yomua/xx.png`

-   考虑暂存文章内容到本地, 并设置过期时间, 这样就不需要每次点击都要发送请求.

-   目前此项目使用的包管理器是 `yarn`, 但是由于 `yarn` 和 `npm` 它们安装包的时候, 都是将包摊平安装到 node_modules

    即: 若一个包有依赖, 依赖还有依赖, 那么就把它们摊平到同一层再安装, Ref: [npm's flat tree](https://www.pnpm.cn/pnpm-vs-npm#npms-flat-tree).

    这会导致即使项目中没有明确指示 dep 或 devDep 都能使用其他项目的依赖.

    => 通常没有什么后果, 但如果使用包 A, 且使用了包 B(是 A 的依赖, 但项目中没有明确依赖), 更新 A, 而 A 删除了 B, 这就导致项目运行失败.

    所以现在要做的是: 检查项目中是否有使用了包, 但此包并没有在项目的 package.json 中明确依赖的情况;

    后期: 可能改成使用 [pnpm](https://www.pnpm.cn/pnpm-cli), 也可能不改, 二者都有优劣:

    `yarn`: 这种做法可以[节约磁盘空间](https://pnpm.cn/pnpm-vs-npm#npms-flat-tree), 特别是大型项目;

    `pnpm`: 采用将所有包安装到硬盘上的一个特定目录, 项目在安装包时, 采用 "链接" 形式, 通过此特定目录将包链接到项目, 给项目使用.

    => 也可以[节约大量磁盘空间](https://www.pnpm.cn/motivation), 并且 node_modules 中的文件依赖[更容易被观察](https://www.pnpm.cn/motivation#creating-a-non-flat-node_modules-directory).

    [详细对比 npm/yarn, pnpm](https://juejin.cn/post/7098260404735836191)
