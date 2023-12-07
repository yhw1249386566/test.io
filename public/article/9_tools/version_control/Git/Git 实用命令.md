# [提取某个/多个 commit 的所有改变](https://git-scm.com/docs/git-cherry-pick) | [阮一峰](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

`git cherry-pick` 

- `git cherry-pick e4692381b70744738d89012e6dbb1427fbdb04d4(某个 Hash 值)` 
  
  将指定的 commit 的所有修改提取出来并应用到当前分支，且自动提交

- `git cherry-pick -n e4692381b70744738d89012e6dbb1427fbdb04d4(某个 Hash 值) `
  
  将指定的 commit 的所有修改提取出来并应用到当前分支，且不自动提交，只是将修改暂存

- `git cherry-pick <HashA>..<HashB>`
  
  `git cherry-pick A..B`  (A, B] ，即：将 A 至 B 中的所有 commit 内容提取并自动提交，**不包含 A，包含 B.**

- `git cherry-pick <HashA>^..<HashB>`
  
  `git cherry-pick A^..B` [A, B] ，即：将 A 至 B 中的所有 commit 内容提取并自动提交，**包含 A，包含 B.**
  
  - 注意：上面的命令可以转移从 A 到 B 的所有提交。它们必须按照正确的顺序放置：**提交 A 必须早于提交 B，否则命令将失败，但不会报错。**
    
    A 先提交，B 后提交。
1. 49429289bfff22237b11146675c70771a1a06e7a A

2. d3f3a7913f9a4530e3f21f440d54a9509fd3d3f5 B

3. 49429289bfff22237b11146675c70771a1a06e7a C

# [将某一个版本的所有修改取消并保留其他版本的内容](https://cloud.tencent.com/developer/article/1489059) [EN](https://git-scm.com/docs/git-revert)

`git revert`

- `git revert -n e4692381b70744738d89012e6dbb1427fbdb04d4(某个 Hash 值)`
  
  将指定的 commit 的所有修改撤销，然后指定 commit 后的所有修改重新作为暂存文件，我们可以使用 `git commit` 重新提交，这将产生一个新的 commit，此 commit 将包含除指定 commit 内容之外的所有内容。
  
  TIP: 如果使用 `revert` 命令时，出现冲突，则解决即可。
