# [贮藏与清理](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E8%B4%AE%E8%97%8F%E4%B8%8E%E6%B8%85%E7%90%86) 

## 贮藏

### [什么是贮藏（git stash）](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E8%B4%AE%E8%97%8F%E4%B8%8E%E6%B8%85%E7%90%86#_%E8%B4%AE%E8%97%8F%E5%B7%A5%E4%BD%9C)

有时，当你在项目的一部分上已经工作一段时间后，所有东西都进入了混乱的状态， 而这时你想要切换到另一个分支做一点别的事情。

问题是，你**不想仅仅因为过会儿回到这一点而为做了一半的工作创建一次提交**。 

针对这个问题的答案是 `git stash` 命令。

### 使用贮藏

使用贮藏前，你需要先将修改暂存（`git add`），且当前仓库必须有一次初始提交（git commit）。

- `git stash` 能将你当前**暂存区的文件**先暂时保存到栈中，从而使得你可以在不 commit 时切换分支，且在你使用 `git status` 查看被贮藏的修改时，会显示你的分支是干净的。

- 你可以多次使用 `git stash` 来贮藏你的修改，每一次的贮藏都会将暂存区的文件暂存到栈中。

- 若你想恢复贮藏之前的状态，请使用 `git stash apply`，该命令会将你最近的一次贮藏到暂存区，但是这并不会把这个已恢复的贮藏删去，它仍会保留在栈中，

  除非你使用 `git stash drop [stash@{n}]` 来删除栈中最近/指定的贮藏，

  当然你可以 `git stash pop [stash@{n}]` 来应用贮藏后并立即删掉最近/指定贮藏。

- 如果你想恢复指定的贮藏，请使用：`git stash apply stash@{n}`，在此之前你也可以使用 `git stash list` 来查看你贮藏了几次。

  PS：如果报错，则可能是因为 `stash@{n}` 未转义的原因，修改为：

  ```bash
  git stash apply stash@`{n`}
  ```

  此情况通常出现在 windows 系统上，对于 linux 系统来说不存在这种问题。

n：表示想恢复第几次贮藏的文件。

- 如果你连续多次将 n 次贮藏恢复，则你的暂存区中将存在每一次贮藏恢复的文件。

  有意思的是：你在一个分支中的贮藏，可以到另一个分支中将之应用，但是值得注意的是：如果你在应用时，有任何与贮藏导致冲突的暂存文件，Git 都会产生合并冲突（若没有，则是直接应用）。

- 如果你想要贮藏未追踪文件也未必不可：`git stash -u` or `git stash --include-untracked`，

  甚至是贮藏已经明确通过 .gitignore 忽略的文件：`git stash -a` or `git stash --all`（PS ：不经常用）

注意：`git stash apply` 相当于以下命令 ，即：序列为 0 的 stash 代表的是最新的贮藏，越往后，则越旧。

```bash
git stash apply stash@{n} 或 git stash apply stash@`{n`}
```

### [从贮藏创建一个分支](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E8%B4%AE%E8%97%8F%E4%B8%8E%E6%B8%85%E7%90%86#_%E4%BB%8E%E8%B4%AE%E8%97%8F%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E5%88%86%E6%94%AF) 

```bash
git stash branch <new branchname>
```

### [为 stash 添加备注](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-push-p--patch-S--staged-k--no-keep-index-u--include-untracked-a--all-q--quiet-m--messageltmessagegt--pathspec-from-fileltfilegt--pathspec-file-nul--ltpathspecgt82308203) 

```bash
git stash -m '备注信息'
git stash list

# 将会显示
stash@{0}: On master: 备注信息
stash@{1}: WIP on master: 8d0fe69 init project
```

- `On master`  表示此次 stash 具有备注消息
- `WIP on master`  表示此次 stash 未有备注消息，将按照默认消息显示，即：[WIP on branchname ..](https://git-scm.com/docs/git-stash) 

注意：`git stash` === `git stash push`，在 2017 年之前，使用 `git stash save` 命令，但是[此命令已被弃用](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E8%B4%AE%E8%97%8F%E4%B8%8E%E6%B8%85%E7%90%86)，完全被 `git stash push` 替代。

## [清理](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E8%B4%AE%E8%97%8F%E4%B8%8E%E6%B8%85%E7%90%86#_git_clean)



## [命令总结](https://git-scm.com/docs/git-stash#Documentation/git-stash.txt-push-p--patch-S--staged-k--no-keep-index-u--include-untracked-a--all-q--quiet-m--messageltmessagegt--pathspec-from-fileltfilegt--pathspec-file-nul--ltpathspecgt82308203) 

### 贮藏

[stash@{n}]：表示可选

- `git stash`  将当前暂存区的文件贮藏到栈中。

- `git stash apply [stash@{n}]` 将最近/指定的贮藏恢复到暂存区 

- `git stash list` 查看所有贮藏

- `git stash drop [stash@{n}]` 删除最近/指定贮藏

- `git stash pop [stash@{n}]` 恢复最近/指定的贮藏并立即删除它

- `git stash -u` 贮藏未追踪文件

- `git stash -m` 添加备注信息

- `git stash branch branchName` 

  从[最近的贮藏+当前分支]检出一个新分支，该新分支将包含贮藏的文件+新分支中现有的文件

### 清理

- `git clen -f -n`  清理未追踪文件（.gitignore 指定的文件不在此列）

- `git clean -n` or `git clean -d -n` 告诉你将会删除哪些文件

- `git clean -x -i` 以交互模式来运行 clean 命令

  ```bash
  $ git clean -x -i
  Would remove the following item:
    "a.docx"
  *** Commands ***
      1: clean                2: filter by pattern    3: select by numbers
      4: ask each             5: quit                 6: help
  ```

- `git clean -f -f -d` 强调式删除未追踪文件（在一个仓库中又克隆了一个仓库，会导致用普通清理命令时，Git 会拒绝删除这个子仓库）
