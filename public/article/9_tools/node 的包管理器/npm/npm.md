# 基础

## 什么是npm

https://zhuanlan.zhihu.com/p/23928404

### 名称解释

npm: ~~node package manager,即node包管理器.~~这是错误的中文翻译,其npm官方辟谣了: 

> "npm" doesn't stand for "Node Package Manager".
>
> It stands for "npm Is Not An Acronym".
>
> Why not "NINAA"? Because then it would be an acronym.

中文翻译为:

> "npm"不代表"node包管理器"。
>
> 它表示:"npm不是一个缩写词"。
>
> 为什么我们不用"NINAA"代理npm呢？因为那时NINAA将成为一个首字母缩略词。
>

也就是说,npm的意思为:npm不是一个缩写词,但是也不妨让我们将它理解为包管理器.

因为实际上,连维基百科都是这么认为的..

### npm是什么

npm的用处和它的全称中文意思简直不要太吻合,**其作用是将各个模块进行统一的管理(下载,发布等),**这些模块就是如jQuery,BootStrap等.

npm的作者是 [Isaac Z. Schlueter](https://link.zhihu.com/?target=https%3A//github.com/isaacs) ,是一个外国程序员用JavaScript(运行在Node.js上)写的

## 为什么要使用npm

我们知道什么是npm之后,但是为什么要使用node package manager呢? 

现在让我们不妨想想,在各种社区(如GitHub等)还未兴起的年代,前端程序共享代码通常都是依靠网址来共享的,

比如若你想使用jQuery,或者vue等,那么你点击jQuery,vue网站上提供的链接就可以下载jQuery和vue了(现在也有很多人这么做),然后放到自己的网站上使用. 

但是当一个网站(例如我们自己的网站)依赖的代码(别人写的模块,供我们调用的,也就是API)越来越多时,许多程序员就发现这是一件很麻烦的事情:

1. 去 jQuery 官网下载 jQuery
2. 去 BootStrap 官网下载 BootStrap
3. 去 Underscore 官网下载 Underscore
4. ……

所以有些程序就会嫌麻烦,觉得很浪费时间,于是一个名为: [Isaac Z. Schlueter](https://link.zhihu.com/?target=https%3A//github.com/isaacs) 的程序员给出了一个解决方案: 用一个工具把这些代码集中到一起管理吧.

而这个工具就是使用JavaScript(运行在Node.js)写的npm,全称为:node package manager.

于是npm诞生了.npm也是一个类似社区的存在.

> ​	社区:拥有共同职业或兴趣的人们，自发组织在一起，通过分享信息和资源进行合作。虚拟社区的参与者经常会在线讨论相关话题，或访问某些网站。

而节约时间,集中管理,解决繁琐就是我们为什么要使用npm的原因

## npm实现的思路和名字的由来

1. ​    买个服务器作为代码仓库(registry.注册表),在里面放所有需要被共享的代码

2. ​    发邮件通知xxx的作者使用npm publish把代码提交到registry(代码仓库中)上,然后再给它们(xxx)取个名字(注意大小写)

   ​		xxx指的是:需要被共享的代码,例如:jQuery,BootStrap等. 而通知它们的作者(开发者)的原因很简单,

   ​		因为这些代码(API)都是这些作者拥有的,如果私自商业或大规模使用,是犯法的.

   ​		而取名字的目的是因为作者同意将代码使用npm工具发布到registry中时,可以让其他人通过这个名字索引快捷的找到这个被共享的代码.   

3. ​    社区中的其他朋友如果想要使用这些被共享的模块,如想要使用:jQuery,BootStrapdd等,

   ​	就把这些模块写道packager.json文件里,然后运行npm install,npm工具就会自动帮他们下载这些模块代码.

4. 下载完的代码会出现在node_modules目录里面,就可以随意使用了

   ​	这个目录是可以通改变的.

   ​		请看E:\Program Software\Environment\JavaScript\Node.js,此目录下的<请看.md> 或单机:[改变Node.js的全局安装位置](https://www.cnblogs.com/zhouyu2017/p/6485265.html)

而这些被下载完成之后,可以使用的代码叫做package包,而这也是npm名字的由来.Node Package Manager. node包管理.

## npm的发展与红火

在npm实现的思路和名字的由来 第二步中我们讲到,npm的作者Isaaz 发送邮件给模块的作者,想要让此作者发布自己的项目. 

但是要知道的是,这些模块的各个作者们,凭什么要干这些吃力不讨好的事情?靠爱发电吗?是不是.

而只有社区里的人(程序员的圈子中)觉得[npm是个宝],很牛逼,是个钻石的时候,别人才会考虑使用npm,并将自己的项目通过npm将之发布到npm的代码仓库registry中.

那么问题来了,npm这个工具是怎么让其他人觉得它是个宝的?

这就要说到另一个有趣的的东西:Node.js了(详情请看<Node.js.md>)

npm能如此火爆的原因离不开Node.js,Node.js也离不开npm,它们二者是相辅相成的.

在Node.js刚被写出来的那段时间,缺少一个包管理器,于是各种原因和因素之下他们遇到了,即Node.js的作者:Ryan Dahl 和 npm的作者Isaaz 相互遇见,然后一拍即合,抱团取暖.

最终,Node.js这个开发环境内置了npm工具.

后来的事大家都知道了,Node.js火了,变成了通向大前端的时代(全栈工程师)的一把钥匙.

而理所当然的是,Node.js火了,那么这意味着npm也火了,因为Node.js需要使用到npm工具.

于是大家纷纷开始使用npm来共享JS代码,那些牛逼项目的作者(如Jquery,BootStrap的作者)也将自己的项目发布到npm的代码仓库中.

​		*更多人知道自己的项目,能给自己带来更多的成就和曝光,非常有好处,所以自然就有人原因发布自己的项目了呗,同时还能利别人,落下个美名,何乐而不为?*

所以到了今天,你可以使用npm install juqery来下载jQuery代码了.

## 后续

Node.js 目前由 Ryan Dahl(作者) 当时所在的公司 joyent 继续开发。

Ryan Dahl 现在已经去研究 AI 和机器学习了，并且[他把 Node.js 的维护权交给了 Isaaz](https://link.zhihu.com/?target=https%3A//groups.google.com/forum/%23!topic/nodejs/hfajgpvGTLY)。(npm的作者)

而 Isaaz 维护了一段时间后，辞职了，成立了一个公司专门维护 npm 的 registry，公司名叫做 [npm 股份有限公司](https://link.zhihu.com/?target=https%3A//www.npmjs.com/about%23about-npm-inc)……谁说开源不能赚钱的~

## 社区的力量

回顾前端的发展是你会发现，都是社区里的某个人，发布了一份代码，最终影响前端几年的走向。比如 jQuery，比如 Node.js，比如 npm。（其实其他语言也是这样的）

所以，社区的力量是巨大的。

## package定义

我们都知道要手动安装一个包时，执行 npm install <package> 命令即可。这里的第三个参数 package 通常就是我们所要安装的包名，

默认配置下 npm 会从默认的源 (Registry) 中查找该包名对应的包地址，并下载安装。

但在 npm 的世界里，除了简单的指定包名, package 还可以是一个指向有效包名的 http url/git url/文件夹路径。

阅读 [npm的文档](https://docs.npmjs.com/getting-started/packages#what-is-a-package-)， 我们会发现package 准确的定义，其实只要一个package满足7种格式定义,即就可以被下载.至于是哪7种,请看官方文档链接.

# 使用简写

在CLI中使用npm时,我们可以对npm的各种命令进行简写操作,只要支持. 并且也可以不进行简写操作, 例如:

`npm install jquery -g` 可以等于 `npm install jquery -global`

`npm ls` == `npm lis` == `npm list` 列出npm包的清单.

# npm版本发展过程npm2-npm5

## npm2

npm2在安装依赖包时,采用的是简单的递归安装方法,假设要下载 两个dependencies包:webpack,conf.

执行 `npm install` 后，npm 2 依次递归安装 `webpack` 和 `nconf` 两个包到 node_modules 中。执行完毕后，我们会看到 ./node_modules 这层目录只含有这两个子目录。

进入更深一层 nconf 或 webpack 目录，将看到这两个包各自的 node_modules 中，已经由 npm 递归地安装好自身的依赖包。

包括 ./node_modules/webpack/node_modules/webpack-core , ./node_modules/conf/node_modules/async 等等。

而每一个包都有自己的依赖包，每个包自己的依赖都安装在了自己的 node_modules 中。

依赖关系层层递进，构成了一整个依赖树，这个依赖树与文件系统中的文件结构树刚好层层对应。

### 优点

这样的目录结构优点在于层级结构明显，便于进行傻瓜式的管理:

### 缺点

对复杂的工程, node_modules 内目录结构可能会太深，导致深层的文件路径过长而触发 windows 文件系统中，文件路径不能超过 260 个字符长的错误

部分被多个包所依赖的包，很可能在应用 node_modules 目录中的很多地方被重复安装。随着工程规模越来越大，依赖树越来越复杂，这样的包情况会越来越多，造成大量的冗余。

例如:若两个包都依赖于另一个包,那么这两个包都会安装相同的包,并且是一摸一样的包,而项目一旦扩大,那么这种冗余就会更加严重.

## npm3 - 扁平结构

为了解决npm2的问题，npm 3 的 node_modules 目录改成了更加扁平状的层级结构。文件系统中 webpack, nconf, async*(请看npm2-缺点)* 的层级关系变成了平级关系，处于同一级目录中。

也就是说, webpack, conf即使都依赖async包,那么由于 node 的模块加载机制,他们都可以在上一级 node_modules 目录中找到 async 库。

所以 webpack 和 nconf 的库代码中 `require('async')` 语句的执行都不会有任何问题。

### 优点

解决了npm2出现的问题:即不会在有多余的包被安装.

实际的工程项目中，依赖树不可避免地会有很多层级，很多依赖包，其中会有很多同名但版本不同的包存在于不同的依赖层级，

对这些复杂的情况, npm 3 都会在安装时遍历整个依赖树，计算出最合理的文件夹安装方式，使得所有被重复依赖的包都可以去重安装。

但是需要注意:如果是同名但不同版本的包也是无法放到同一级目录的,因为npm规范:同层不能有两个同名子目录.

## npm5  package-lock.json文件

npm 5 发布于 2017 年也是目前最新的 npm 版本，这一版本依然沿用 npm 3 之后扁平化的依赖包安装方式，此外最大的变化是增加了 `package-lock.json` 文件。

详情了解package-lock.json请看  `package-lock.json`

### 优点

其优点就是增加了package-lock.json,且此文件可以自动生成,不必开发人员手写.

# npm的使用

## npm init

用来初始化项目,创建package.json文件.

注意里面的包的命名不能有大写字母,且只支持URL字符,所以我们看到的所有package都是小写和一组词.

若你觉得不需要修改默认设置,则一直回车即可.

若使用了-f（代表force）、-y（代表yes），则跳过提问阶段，直接生成一个新的package.json文件。

## npm install moduel_name -g/-S/-D

### -g

-g: 其中g指的就是global,即全局

### -S/-d

-S:即 --save,写入dependencies,依赖.

里面的插件是需要发布到生产环境的.

即一个程序在程序在开发时,运行时需要用到的模块,就放入这里面.

### -D

-D:即 --save-dev,  写入devDependencies,开发环境依赖模块.

里面的插件只用于开发环境，不用于生产环境.

即一个模块在程序运行时并不需要就放入这里面.

- 注意: 千百万不要使用小写: -d,否则会被安装到生产环境依赖的.

  你们注意看这里的Dependencies是不是大写的D

  而生产环境依赖dependencies,则是小写的d.

### 默认

`npm install module_name` 本地安装(将安装包放在 ./node_modules 下),使用细节中有讲.

## npm root

npm root 查看当前包的安装路径.

也可以查全局的安装包的安装路径.

`npm root -g` 或 `npm root -global`

## npm help

查看npm的帮助,即如何使用说明,和说明书一样.

如果要单独查看install命令的帮助，可以使用`npm help install`,举一反三,我们也可以使用 `npm help global`查看全局说明文但.

注意除了 `npm help`,其余的`npm help xxx`,都会跳转网页至官网,让你查看说明文档.

## npm ls

ls: list, 查看依赖树的清单,将之一一罗列出来.

可以这样使用 : `npm ls -g`  `npm list` `npm lis -g`

这样都是对的.

## npm install --dependencies -g

若在一个项目的CLI种使用此命令,将会将package-lock.json的dependencies的所有依赖模块下载到全局目录.

而 `npm instal`l 命令则是将 package.json 文件中的依赖下载到当前目录。

## npm 命令使用

- `npm update <package-name>`

  指定需要更新的包，对单个软件包进行更新。

  `npm unpdate` 检查所有软件包是否有满足版本限制*（详见：pakage.json-指南 - 软件包版本号）*的更新版本。

  值得注意的是：用这种命令更新的包，如果存在主版本（如1.0.0中的1更新），则 npm 并不会帮你去更新它，因为它们（根据定义）会引入重大的更改，`npm` 希望为你减少麻烦。

  ```bash
  # 若要将所有软件包更新到新的主版本，则需要全局地安装 npm-check-updates 软件包：
  npm install -g npm-check-updates

  #然后运行以下命令，这将会升级 package.json 文件的 dependencies 和 devDependencies 中的所有版本，以便 npm 可以安装新的主版本。
  ncu -u

  # 最后在使用以下命令，就 npm 包管理器就可以连同主版本也更新了。
  npm update
  ```

  ​

- `npm list` 

  在当前目录中，查看所有已安装的 npm 软件包（包括它们的依赖包）的最新版本。

  `npm list -g` 

  在 npm 的全局目录中，查看所有已安装的 npm 软件包（包括它们的依赖包）的最新版本。

  `npm list <packagename>`

  通过指定名称来获取指定包的版本号。

  ` npm list --depth=0`

  列出当前项目的 package.json 文件中的所有依赖包的版本号（仅仅列出当前的版本号，旧版本以及最新版本则不列出）

- `npm view <packagename> version`

  查看软件包（需要的依赖包）在 npm 仓库上最新的可用版本

  注：是查看 npm 仓库上，而不是当前项目中的最新版本。

- `npm view <package> versions`（比上面的命令多了个 `s`）

  查看指定的软件包所有的版本（以升序的排序显示）

- `npm install <package>@<version>`

  在当前目录安装指定包的指定版本号。

- `npm install <package>@<version>`

  在全局安装指定包的指定版本。

# 使用细节

## 未加-g/指定目录

若直接使用npm install,uninstall,update等这些命令,没有指定全局或者指定位置,则将会安装,卸载,更新到默认目录,即:C:\Users\Administrator

即它将创建一个node-moduel文件到C:\Users\Administrator,将我们下载,更新的包放入里面(若卸载的话,也是从这个目录)

然后再创建一个JSON文件:package-lock.json ,

接着CLI(Command Line)则会提醒:

> npm WARN saveError ENOENT: no such file or directory, open 'C:\Users\Administrator\package.json'
> npm notice created a lockfile as package-lock.json. You should commit this file.
> npm WARN enoent ENOENT: no such file or directory, open 'C:\Users\Administrator\package.json'
> npm WARN Administrator No description
> npm WARN Administrator No repository field.
> npm WARN Administrator No README data
> npm WARN Administrator No license field.

- npm WARN 保存错误 ENOENT： 没有此类文件或目录，打开"C：\Users\Administrator\Package.json"通知创建了一个锁文件作为包-lock.json。您应该提交此文件。
- npm WARN enoent ENOENT：没有此类文件或目录，打开"C：\Users\Administrator\Package.json"
- npm WARN 管理员 无说明
- npm WARN 管理员 无存储库字段。
- npm WARN 管理员无 README 数据
- npm WARN 管理员无许可证字段。



# [npx的使用](http://nodejs.cn/learn/the-npx-nodejs-package-runner)

npx指的是局部的意思,即使用局部的包, 如果一个包存于局部,可以使用npx执行,否则可能无法执行.

# error resolve

## yarn 错误：EINVAL: invalid argument....

使用 yarn 安装依赖时出现 `error An unexpected error occurred: "EINVAL: invalid argument, mkdir 'C:\\Users\\Administrator\\'G:\\Cache\\frontend_tools_chain\\yarn''"`

这是由于 yarn 的缓存路径无法正确访问或设置错误，可以去 `C:\Users\Administrator\yarnrc` 文件中将 `G:\\Cache\\frontend_tools_chain\\yarn` 更改为 `G:\Cache\frontend_tools_chain\yarn`，即：用一个斜杠，而非两个。

**或直接删除 .yarmrc 文件**

# Reference

- [package.json中 npm依赖包版本前的符号的意义](https://blog.csdn.net/hahei2020/article/details/73844714)

  - [语义化版本2.0](https://semver.org/lang/zh-CN/)

- [npm的较深讲解](https://juejin.im/post/5ab3f77df265da2392364341)

- [npm模块安装机制](https://www.ruanyifeng.com/blog/2016/01/npm-install.html)






