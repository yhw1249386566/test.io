# package.json 

[package.json](https://javascript.ruanyifeng.com/nodejs/packagejson.html)-[指南](http://nodejs.cn/learn/the-package-json-guide)

## 基础

package.json 文件是当前它所属项目的清单，代表着当前项目的配置、依赖等

package.json 文件必须符合 JSON 格式规范，否则，尝试以编程的方式访问其属性的程序则无法读取它，且大部分编译器都会在该文件不符合 JSON 文件规范时报错。

虽然 package.json 文件对内容格式有硬性要求，但是对内容没有要求（你可以书写任何内容）。

## [package.json 文件结构](http://nodejs.cn/learn/the-package-json-guide#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)

## package.json 文件内容的属性分类

- name

  设置软件包的名称, 只能是全小写英文

  => `/[a-z]/g`

- author

  列出软件包的作者名称。

- contributors

  除作者外，该项目可以有一个或多个贡献者。 此属性是列出他们的数组。

- bugs

  链接到软件包的问题跟踪器，最常用的是 GitHub 的 issues 页面。

- homepage

- 设置软件包的主页。

- version

  指定软件包的当前版本。

- license

  指定软件包的许可证。

- keywords

  此属性包含与软件包功能相关的关键字数组。

- description

  此属性包含了对软件包的简短描述。

- repository

  此属性指定了此程序包仓库所在的位置。

- `"repository": "github:nodejscn/node-api-cn",`

  当然，除了 github 之外，还有：

  ```json
  "repository": "gitlab:nodejscn/node-api-cn",
  "repository": "bitbucket:nodejscn/node-api-cn",
  # 下面为显式地设置版本控制系统
  "repository": {
    "type": "git",
    "url": "https://github.com/nodejscn/node-api-cn.git"
  }
  ```

- main

  设置 CommonJS 入口

- module

  设置 ESModule 入口
  **注意:** 即使你开发的库是在 ESModule, 别人也使用 ESModule, 但是当环境是   ` node + ESModule` 时, 再 引用你的包时, 却仍然是寻找 main 字段.

  参见:https://github.com/SunshowerC/blog/issues/8

- private

  如果设置为 `true`，则可以防止应用程序/软件包被意外发布到 `npm`上。

- scripts

  可以定义一组可以运行的 node 脚本。

- dependencies

  设置作为（生产环境）依赖安装的 `npm` 软件包的列表。

- devDependencies

  设置作为开发（环境）依赖安装的 `npm` 软件包的列表。

- engines

  设置此软件包/应用程序要运行的 Node.js 或其他命令的版本。

- browserslist

  用于告知要支持哪些浏览器（及其版本）。 Babel、Autoprefixer 和其他工具会用到它，以将所需的 polyfill 和 fallback 添加到目标浏览器。

  [查看更多关于 browserlist 属性](https://www.npmjs.com/package/browserslist)

- 除了以上列出的每个项目都可以设置的属性之外，还存在一些为 ESLint、Babel 这样的插件服务的特有的属性，如：`eslintConfig`、`babel` 属性等。

## [软件包版本号](http://nodejs.cn/learn/the-package-json-guide#%E8%BD%AF%E4%BB%B6%E5%8C%85%E7%89%88%E6%9C%AC) 

在 *[package.json 文件结构](http://nodejs.cn/learn/the-package-json-guide#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)* 一节中，我们可以看到类似这样的版本号：`〜3.0.0` 或 `^0.13.0`， 那么它们是什么意思，还可以使用哪些其他的版本说明符？

该符号（这样的版本号）指定了软件包能从该依赖接受的更新。

鉴于使用了 semver（语义版本控制），所有的版本都有 3 个数字，第一个是主版本，第二个是次版本，第三个是补丁版本，具有以下规则：

- `~`: 如果写入的是 `〜0.13.0`，则只更新补丁版本：即 `0.13.1` 可以，但 `0.14.0` 不可以。
- `^`: 如果写入的是 `^0.13.0`，则接受更新补丁版本和次版本：即 `0.13.1`、`0.14.0`、依此类推。
- `*`: 如果写入的是 `*`，则表示接受所有的更新，包括主版本升级。
- `>`: 接受高于指定版本的任何版本。
- `>=`: 接受等于或高于指定版本的任何版本。
- `<=`: 接受等于或低于指定版本的任何版本。
- `<`: 接受低于指定版本的任何版本。

还有其他的规则：

- 无符号: 仅接受指定的特定版本。
- `latest`: 使用可用的最新版本。

还可以在范围内组合以上大部分内容，例如：`1.0.0 || >=1.1.0 <1.2.0`，即使用 1.0.0 或从 1.1.0 开始但低于 1.2.0 的版本。

# [package-lock.json](http://nodejs.cn/learn/the-package-lock-json-file)

[官方文档](https://docs.npmjs.com/configuring-npm/package-lock-json.html)

**package-lock.json文件：旨在跟踪被安装的每个软件包的确切版本，以便产品可以以相同的方式被 100％ 复制（即使软件包的维护者更新了软件包）。**

在我们下载一个package时,总会在当前下载package的路径下,看见一个package-lock.json文件,那么这个文件是用来干什么的呢?

其实这个是2017年发布的npm5,增加的一个文件,此文件最大的作用就是:锁定依赖安装结构.

**其官方是这样描述的:**

对于使用npm修改node_modules树或package.json的任何操作，都会自动生成package-lock.json。 

它描述生成的精确树(即结构)，因此后续安装(其他人安装时)能够生成相同的树，而不考虑中间依赖更新,

因为package-loack.jsn记录了整个结构,包括各个模块的版本信息,安装信息,结构目录等,所以自然就不因为中间的模块更新从而导致出现安装时造成了node_modules 不一样的问题.

在以前我们仅仅用package.json 记录依赖，但是由于 [semver range 的机制](http://nodejs.cn/learn/the-package-json-guide#%E8%BD%AF%E4%BB%B6%E5%8C%85%E7%89%88%E6%9C%AC)*（详见：package.json-指南-软件包版本号）*：一个月前由 A 生成的 package.json 文件，B 在一个月后根据它执行 npm install 所得到的 node_modules 结果很可能许多包都存在不同的差异（补丁版本或次版本的差异）

虽然 semver 机制的限制使得同一份 package.json 不会得到大版本不同的依赖包,但同一份代码在不同环境安装出不同的依赖包,依然是可能导致意外的潜在因素.

而`package-lock.json` 会固化当前安装的每个软件包的版本，当运行 `npm install`时，`npm` 会使用这些确切的版本，从而避免因为版本差异造成的错误。

并且当运行 `npm update` 时，`package-lock.json` 文件中的依赖的版本会被更新。

注：`package-lock.json` 文件需要被提交到 Git 仓库，以便被其他人获取（如果项目是公开的或有合作者，或者将 Git 作为部署源）。

package-lock.json文件官方描述的用途是:

- 描述一个依赖关系树的单一表示，这样可以确保队友，部署和持续集成安装完全相同的依赖关系。
- 为用户提供一种工具，使其可以“时间旅行”到以前的状态，`node_modules`而不必提交目录本身。
- 为了通过可读的源代码控制差异更好地了解树的变化。
- 并允许npm跳过以前安装的软件包的重复元数据解析，从而优化安装过程。

关于`package-lock.json`它的一个关键细节是它不能发布，并且如果在toplevel(顶级软件包)包以外的任何地方找到它，它将被忽略.

​	***即该文件若不在项目顶层文件,那么它就会被忽略***

**简单来说就是这个**package-lock.json文件提供了"保存"node_modules状态的能力,只要有一个这样的文件,不管在哪台机器上/哪种环境下执行**npm install(安装pakage-lock.json的所有依赖包)**都可以得到完全相同的node_modules结果.

前提是你和对方的 npm 版本都是在 5 以上，否则需要手动生成。

当然了,相同作用的文件在 npm 5 之前就有，称为 npm-shrinkwrap.json 文件，二者作用完全相同，

不同的是后者需要手动生成，而 npm 5 默认会在执行 npm install 后就生成 package-lock 文件，并且建议你提交到 git/svn 代码库中。所以package-lock文件完全可以顶替npm-shrinkwrap.json文件.

package-lock和npm-shrinkwrap.json文件共享的是一种格式的文件,该格式本质上是相同的文件,即这两个文件的格式本质上是相同的.

虽说package-lock.json是极好的用来保存node_modules状态的文件,而且防止因为环境以及其他问题从而导致安装的node_modules不一样的情况的好东西,

但是一个就像软妹币也并不是所有人都爱的,有人会觉得package-lock.json文件很复杂,不好用,而这些反对声音显然影响到了npm的作者,所以npm对此也提供了禁用的方法: `npm config set package-lock false`

# 命令

- npm update

  运行该命令，`package-lock.json` 文件中的依赖的版本会被更新。

- npm install

  在 npm5 及以上版本会使用 package-lock.json 文件中的确切版本下载依赖。

- npm config set package-lock false

  将禁用 package-lock 的自动生成


# FAQ

## 开发一个包设置了 module 入口却不生效

```js
// package.json 
{
  type: "module", 
  module: "./dist/index.js"
}
```

即使你开发的库是在 ESModule, 别人也使用 ESModule, 但是当环境是   ` node + ESModule` 时, 再 引用你的包时, 却仍然是寻找 main 字段.

参见: https://github.com/SunshowerC/blog/issues/8

解决方法是, 将 module 换成 main, 或额外新加 main 字段

```js
// package.json 
{
  type: "module", 
  module: "./dist/index.js", 
+ main: "./dist/index.js"
}
```

