# [Git 的撤销操作](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C)

## git checkout -- \<filename> 和 git reset HEAD [--] \<filename>

**git checkout -- \<filename>：**该命令把修改了但却还未暂存的已追踪文件的本次修改撤销，撤销到上一次提交时（git commit）该文件的样子。

**git reset HEAD [--] \<filename>：**该命令把暂存区中的指定文件，从暂存区中移除（取消暂存），使得从暂存区中移除的文件，出现在：Changes not staged for commit 列表中*（使用 git status 命令即可查看当前目录状态，可以查看：未追踪文件/修改的已追踪文件等，详见：[查看 Repository 某个文件当前的状态](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_checking_status)*）

注：中括号的内容可选，因为不适用 `--` 也行，如：
git reset HEAD \<fileName>，***参见：[取消暂存的文件](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%92%A4%E6%B6%88%E6%93%8D%E4%BD%9C#_unstaging)*** 

以上两个命令可以配合使用，如：你不小心修改了一个已追踪文件，又误操作的将之放入暂存区，那么你可以这么使用：

1. git checkout -- \<filename>
   
   将该文件从暂存区中移除

2. git reset -- \<filename>
   
   撤销该文件的本次修改，使之还原到上一次提交时的版本。

注：这两个命令实际上都是很危险的，需要小心使用。如：git checkout -- \<filename> 命令会把你指定的文件的本地的任何修改操作都使用上一次提交时该文件的版本覆盖。

你可以参见：[Git 工具-重置揭秘](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86#_git_reset) 查看 Git 的 reset 和 checkout 命令的意思。

如果你想撤销一个文件的本地修改（修改了已追踪文件，但仍未暂存，即在：Changes not staged for commit 列表中），但仍然想保留（记录）对那个文件做出的修改，你可以参见：[Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching)。

记住，在 Git 中任何 **已提交** 的东西几乎总是可以恢复的。 甚至那些被删除的分支中的提交或使用 --amend 选项覆盖的提交也可以恢复 （阅读 [数据恢复](https://git-scm.com/book/zh/v2/ch00/_data_recovery) 了解数据恢复）。 

然而，任何你未提交的东西丢失后很可能再也找不到了，至少在 Git 中是这样的，除非你使用其他方式恢复。

## git restore [--staged] 目录名/文件名

- `$ git restore src/`  
  
  撤销 src 目录下所有修改了但未存入暂存区的文件。
  
  `$ git restore src/index.tsx`  
  
  撤销 src/index.tsx 文件所有修改了但未存入暂存区的内容。

- `$ git restore --staged src/`  
  
  撤销 src 目录下所有修改了且存入暂存区的文件。
  
  `$ git restore --staged src/index.tsx`  
  
  撤销 src/index.tsx 文件所有修改了且存入暂存区的内容。

以上命令和 <a>git checkout -- \<filename> 和 git reset HEAD [--] \<filename></a> 这一小节达到的目的都是差不多的：撤销内容。

## git commit --amend

**git commit --amend：**撤销上一次提交，以 git commit --amend 命令的提交替代上一次的提交。

笔者注：你可以在上一次提交到本次使用 git commit --amend 前进行任何操作，如：对文件进行修改，或不修改就直接使用该命；

即：如果自上次提交以来你还未做任何修改（例如，在上次提交后马上执行了此命令 或 做了其他未修改 Repository 文件的操作后执行此命令等）， 那么快照会保持不变，而你所修改的只是给 Repository 的提交信息，

但是如果你自上次提交以来对 Repository 文件进行了修改，这使用该命令的提交除了会更新 Repository 中的提交信息，还会更新你所修改的文件内容。

Note：git commit --amend 命令的意思并不是说将上一次的提交 **原位替换** 掉，而是说：把上一次的提交 fill（填充），从效果上来说就是：如同上一次的提交操作从未存在过一般，不会出现在 Git Repository 的历史中，理解这一点是非常重要的。

修补提交（git commit --amend）最明显的价值是可以稍微改进你最后的提交，而不会让“啊，忘了添加一个文件”或者 “小修补，修正笔误”这种提交信息弄乱你的 Repository 历史。

- 原位提交：将本次所做的操作覆盖上一次的操作，但是上一次的操作在历史记录中仍然存在。

在使用该命令进行修补提交时，Git 就相当于重新进行了一次新的提交，只不过该提交会让上一次的提交“从未存在过”，

所以修补提交会重新计算当前提交的各种信息，如：当前提交时间、重新计算所有子目录的校验和、提交备注等，更多关于提交[对象]的信息，详见：***Git 分支 - 分支简介***。

# 

# Reference

- [如何撤销 Git 操作？ - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2019/12/git-undo.html)
