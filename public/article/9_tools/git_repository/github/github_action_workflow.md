# 概述

Github Action 是一种 CICD, 当我们在项目根目录中添加 .github/workflow 文件夹，并且在此文件夹中添加任意个 `*.yml` 文件，

当 GitHub 仓库有了 `*.yml` 文件后，Github 将会自动执行 `*.yml`，并根据这些文件执行对应命令。

# Yomua Deploy

1. Gitee 通过仓库镜像和 Github 仓库同步

2. 为项目添加 .github/workflow
   
   1. 为项目所在的 GitHub 仓库设置 Github Pages，且设置 package.json 中 `"homepage": "https://yomua.github.io/yomua", ` 
      
      `homepage`  的目的：设置应用的**根路径**，告诉应用去哪里加载资源，即：资源存在哪个地方；注意：**这不是必须的**，因为我们其实可以直接访问当前项目根路径，这个字段通常是因为有时候我们的资源会部署在 CDN 上，你必须告诉打包工具你的CDN地址是什么。
      
      设置 Custom Doman: 将想要的域名映射到 Github，从而访问域名就等于访问项目

以下是一个 workflow 的例子

```yml
name: Build and Deploy
on:
  push:
    branches:
      - release # 当朝 release push 才执行此文件
permissions:
  contents: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3
      - uses: actions/setup-node@v1
        with:
          node-version: 16 # 设置 node 版本

      - name: Install and Build
        run: |
          npm install yarn
          npx yarn install
          npx yarn build

      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@v4 # 使用已有的 action
        with:
          folder: docs # The folder the action should deploy.
          token: ${{ secrets.ACCESS_TOKEN }}
```

# Reference

- [GitHub Actions 入门教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
  
  - add [Encrypted secrets - GitHub Docs](https://docs.github.com/zh/actions/security-guides/encrypted-secrets) 
    
        
