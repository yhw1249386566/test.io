# [创建和发布组织包](https://docs.npmjs.com/creating-and-publishing-an-organization-scoped-package) 

1. 在命令行上，创建一个目录，其中包含您要创建的包的名称。
   `mkdir /path/to/package/directory`
2. 导航到新创建的包目录。
    `cd /path/to/package/directory`
3. 要创建组织范围的包，请在命令行上运行：
   `npm init --scope=<your_org_name>`
   注意: 此命令会将你的当前文件夹初始化为 `npm` 文件夹, 帮你自动创建一个 `package.json`; 
   若你已有 `package.json` 则直接下一步.
4. 验证包是否正在使用您的组织范围，请\在文本编辑器中打开包的`package.json`: 
   检查 `name` 字段的名字是否为: `@your_org_name/<pkg_name>` -> `@yomua/y-hooks`

   ​

# Reference

- 要使用 `yarn` 管	理 monorepo 项目， 参见: `9_tools/project_manager_type`
  - [What monorepo?-EN](https://www.perforce.com/blog/vcs/what-monorepo) 
  - [Monorepo 好处 - EN](https://danluu.com/monorepo/) 
  - [Monorepo-知乎 - ZH](https://zhuanlan.zhihu.com/p/77577415) 

