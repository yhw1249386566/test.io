# [Git 远程仓库的基本使用](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8)

## [手动添加远程仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#_%E6%B7%BB%E5%8A%A0%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93)

**git remote add \<远程仓库简写名> \<远程仓库 URL>：**添加一个新的远程仓库，并用指定的名字代指该仓库（使用该命令，前提是当前目录必须是一个 Repository

即：使用 git remote add \<远程仓库简写名> \<远程仓库 URL> 命令手动添加远程仓库时，需要在一个 Repository 中才能添加，否则使用该命令，Git 会报错：

fatal: not a git repository (or any of the parent directories): .git，即：不在一个 Git Repository / 任何父目录中。

注：该命令只是添加远程仓库到当前 Repository，但是当前的 Repository 还并没有远程仓库中的文件（内容），需要使用 `git fetch <远程仓库简写名>` 命令[从远程仓库中抓取](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#_fetching_and_pulling)（*详见：同级目录 - 从远程仓库中抓取与拉取*）文件才行。

也就是说，该命令只是让当前 Repository 引用了远程仓库，仅仅如此罢，你可以直接使用 `git remote` 命令查看当前 Repository 引用了哪些远程仓库。

## [查看远程仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#_%E6%9F%A5%E7%9C%8B%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93)

**git remote show \<remote(远程仓库简写名/url)>：**查看一个指定的远程仓库的信息。通常会列出：

- 你目前在该远程仓库的所处的分支

  HEAD branch: \<branchname>

- 当你在特定的分支上执行 git push 会自动地推送到哪一个远程分支

  Local ref configured for 'git push' 列表中

- 哪些远程分支不在你的本地

- 哪些远程分支已经从服务器上移除了

- 还有当你执行 git pull 时哪些本地分支可以与它跟踪的远程分支自动合并。

  Local branch configured for 'git pull' 这个列表中

## [从远程仓库中抓取与拉取](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#_fetching_and_pulling)

`git fetch <远程仓库简写名>`：访问一个指定的远程仓库，将其中的内容和当前远程仓库所在的仓库内容做对比，如果当前仓库不存在指定的远程仓库的内容，就从远程仓库拉取不存在的内容并拷贝到当前仓库中。

注：当 `git fetch` 命令从服务器上抓取本地没有的数据时，它并不会修改工作目录中的内容，它只会获取数据然后让你自己合并。

**简而言之**：这个命令会访问远程仓库，从中拉取所有你还没有的数据，执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

当使用该命令后，通常，在当前 Repository `.git/refs/remotes` 目录中，就会存在引用的远程仓库文件夹（文件夹名：设置的远程仓库简写名），

这些文件夹中存放的是这些远程仓库中的所有分支，每一个分支就代表着一个项目的版本，

不过需要注意：这些分支文件实际上只是存放它们那个版本的项目的校验和，并不是版本中的文件内容，文件内容存在于 .git 目录的其他地方，这里不予讨论。

所以我们可以通过 `git checkout <远程仓库简写名/分支名>` 这样的方式，切换到某个指定的远程仓库的某个指定分支下，不过，这会让 Git 处于分离头指针状态（*详见：Basic use to Git - 打标签 - 检出（切换）标签（有关分离头指针状态）*）

> Tips: 当你使用  `git fetch origin branchName?` 命令时，你再使用 `git branch` 你会疑惑为什么自己的本地仓库还没有远程仓库中的分支，这时候你只需要直接使用 `git checkout branchName`，git 就会直接切换到你刚刚拿下来的远程仓库的分支。
>
> 之所以你使用 `git fetch` 时，git 不直接给你显示分支名，是因为 fetch 命令仅仅是先获取远程仓库中的分支和现有分支的差异，等你手动的合并或者查看（切换）时才有。

`git pull `：大多数情况下它的含义是一个 `git fetch` 命令紧接着一个 `git merge` 命令，如：

```bash
# 语法格式
$ git pull <远程主机名> <远程分支名>:<本地分支名>
```

```bash
# 例子
$ git pull origin next:master
 # 拉取 origin（remote repository） 的 next 分支，并合并到当前 Repository 中的 master 分支。
 
$ git pull origin next
# 拉取 origin 下的 next 分支，和当前 Repository 中的当前分支合并
# 相当于
$ git fetch origin
$ git merge origin/next
```

也就是说：`git pull` 命令会查找当前分支所跟踪的服务器以及对应分支， 然后从服务器上抓取当前分支版本没有的数据并尝试将数据合并到当前分支，更多有关 `git pull` 参见：[阮一峰-git pull](https://www.yiibai.com/git/git_pull.html)

由于 `git pull` 的魔法经常令人困惑所以通常单独显式地使用 `fetch` 与 `merge` 命令会更好一些。

## 克隆和手动添加远程仓库的区别

git clone 命令和 git remote add \<远程仓库简写名> \<远程仓库 URL> 添加的远程仓库有什么区别呢？

- git clone 命令不需要在一个 Repsository 目录中才能使用，它可以在任何一个目录中使用该命令，将指定的仓库克隆到指定的目录，并可以任意为该克隆的仓库名取名字（git clone \<url> \<RepositoryName>），

  而 git remote 命令添加的远程仓库需要在一个 Repository 中才能使用。

- git clone 命令会默认的将远程仓库的名字*（不是被克隆下来的远程仓库，而是远程仓库本身）*设为：origin，

  而 git remote 命令添加的远程仓库需要手动设置简写名。

若你当前目录在一个通过 git clone 命令克隆下来的远程仓库中，则若使用
git fetch origin（远程仓库默认简写名）命令就可以使你克隆该远程仓库的仓库更新。

这是因为：克隆一个远程仓库后，若该远程仓库又继续更新，则你本地克隆该远程仓库的仓库并不会一起更新，所以你可以使用 git fetch \<远程仓库简写名> 命令使得你本地克隆远程仓库的仓库更新到别人远程仓库的最新版本。

值得注意的是：git fetch 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

如果你的当前分支设置了跟踪远程分支（*阅读下一节和 [Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching) 了解更多信息）*， 那么可以用 `git pull` 命令来自动抓取后合并该远程分支到当前分支。

 这或许是个更加简单舒服的工作流程。在默认情况下，`git clone` 命令会自动设置本地 master 分支跟踪克隆的远程仓库的 `master` 分支*（或其它名字的默认分支）*。 运行 `git pull` 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。

- [git pull](https://git-scm.com/docs/git-pull/en)-[其他参考](https://www.yiibai.com/git/git_pull.html)：取回远程主机某个分支的更新，再与本地的指定分支合并，它的完整格式稍稍有点复杂：

  `git pull [options] [<repository> [<refspec>…]]`

## [推送分支到远程仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#_pushing_remotes)

**git push \<远程仓库的简写名> \<BranchName> ：**将你指定的分支推送到指定的远程仓库中 / 更新远程引用或相关对象。

当你想分享你的项目时，必须将其推送到上游。 这个命令很简单：`git push  `。 当你想要将 `master` 分支推送到 `origin` 服务器时*（再次说明，克隆时通常会自动帮你设置好那两个名字*）， 那么运行这个命令就可以将你所做的备份到服务器：

`$ git push origin master`

只有当你有所克隆服务器的写入权限，并且之前没有人推送过时，这条命令才能生效。 

当你和其他人在同一时间克隆，若他们先推送到上游然后你再推送到上游，你的推送就会毫无疑问地被拒绝。

你必须先抓取他们的工作并将其合并进你的工作后才能推送。 阅读 [Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching) 了解如何推送到远程仓库服务器的详细信息。

`$ git push origin test:maste `

提交本地test分支作为远程的master分支，只写这一句，远程仓库就会自动创建一个 test 分支（若不存在的话）

`$ git push -u origin --all`

将所有分支推送到远程仓库

## [远程仓库的重命名和移除](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E4%BD%BF%E7%94%A8#_%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93%E7%9A%84%E9%87%8D%E5%91%BD%E5%90%8D%E4%B8%8E%E7%A7%BB%E9%99%A4)

**重命名**

**git remote rename \<FromName> \<ToName>：**修改指定远程仓库的的名字（FromName），使之变为 \<ToName>。

值得注意的是这同样也会修改你所有远程跟踪的分支名字。 即：那些过去引用 `<FromName>/master` 的现在会引用 `<ToName>/master`。

**移除**

**git remote remove/rm \<远程仓库简写名（无法使用 url）>：**从当前仓库中，移除一个指定的远程仓库，其原因多数为：你已经从服务器上搬走了或不再想使用某一个特定的镜像了， 又或者某一个贡献者不再贡献了

一旦你使用这种方式删除了一个远程仓库，那么所有和这个远程仓库相关的远程跟踪分支以及配置信息也会一起被删除。

## 远程仓库有关命令

- 以下两种方法每一种都可以将当前仓库下的所有分支推送到远程仓库

  ```bash
  $ git push REMOTE '*:*'
  $ git push REMOTE --all
  #推送所有标签
  $ git push REMOTE --tags
  ```

- 从远程仓库获取所有分支

  ```bash
  $ git clone xxx
  $ git branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
  $ git fetch --all
  $ git pull --all
  ```

  

