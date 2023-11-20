# [Git Hooks](https://git-scm.com/docs/githooks) 

git hook 指的是在可以 git 的各个生命周期执行一些命令，类似于 react 的生命周期。

## 简介

Git 也有钩子函数，即：在 commit,push,recieve 等命令前、后会执行的一段脚本（Git 自带脚本是用shell或Perl语言，但你可以写JavaScript或其他语言的脚本），通过 Git 暴露出来的钩子，我们可以使用这些钩子来检测我们的commit、push 是否符合要求。

当然，除了我们手动写之外，我们也可以使用一些库来帮我们完成这些工作，如：pre-commit、husky 等。

### Git Hooks 能做什么

1. Git Hooks是定制化的脚本程序，所以它实现的功能与相应的git动作相关,如下几个简单例子：
2. 多人开发代码语法、规范强制统一
3. commit message 格式化、是否符合某种规范
4. 如果有需要，测试用例的检测
5. 服务器代码有新的更新的时候通知所有开发成员
6. 代码提交后的项目自动打包（git receive之后）
7. ...等等

# Git hook 库

## husky

### [快速开始](https://zhuanlan.zhihu.com/p/366786798) 

1. `npm install -D husky`

2. 在 package.json 添加：

   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

   prepare脚本会在`npm install`（不带参数）之后自动执行。也就是说当我们执行npm install安装完项目依赖后会执行 `husky install`命令，该命令会创建.husky/目录并指定该目录为git hooks所在的目录。

3. `npx husky add .husky/pre-commit "npm run test"`

   将会在你的根目录存在 `.husky/pre-commit` 文件，且存在命令 `npm run test`

   你可以在 pre-commit 文件中添加你想要在 git commit 之前的任何可用命令。
