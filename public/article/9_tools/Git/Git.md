# Log

- 2021-8-13 11:41 add FAQ
- 2021-03-21 18:35 添加内容
- 2020-07-18 07:13 添加内容
- 2020-07-11 09:48 添加内容
- 2020-07-10 23:00 添加内容
- 2020-07-08 11:25 写下整个文章
- author：yomua

# 前言

Git 基本介绍和学习

# [Kernel](https://zh.wikipedia.org/wiki/%E5%86%85%E6%A0%B8)

将软件发出的数据转移成数据处理的指令，并提交给 CPU 及电脑中的其他电子组件处理，Kernel 是现代操作系统最基本的部分。

一种为众多应用程序提供安全访问计算机硬件的软件，这种访问是有限的，并且由 Kernel 决定一个程序在什么时候对某部分硬件操作多长时间。

严格地说：内核并不是计算机系统中必要的组成部分。有些程序可以直接地被调入计算机中执行；

这样的设计，说明了设计者不希望提供任何硬件抽象和操作系统的支持；它常见于早期计算机系统的设计中。

但随着电脑技术的发展，最终，一些辅助性程序，例如程序加载器和调试器，被设计到机器内核当中，或者写入在只读记忆体里。

这些变化发生时，操作系统内核的概念就渐渐明晰起来了！

更多参见：参见：[Wiki](https://zh.wikipedia.org/wiki/%E5%86%85%E6%A0%B8)

# Shell-[Wiki](https://zh.wikipedia.org/wiki/%E6%AE%BC%E5%B1%A4)-[Baidu](https://baike.baidu.com/item/Shell/99702)

## 基本概念

Shell 俗称：“壳”，用来和 Kernel （内核）区分。

Shell 是指：为使用者提供操作界面的应用程序（软件）。

对于大多数情况来说，Shell 这个词是指：在 OS（Operation System)中，为访问 Kernel 所提供的一种服务程序，以后如果不特别注明，则 Shell 指的就是命令行式 Shell。

不过，Shell 也可用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的界面（GUI），与之相对的是：Kernel，Kernel 不提供和用户的交互功能。

因此，Shell 通常分为两类：

1. 命令行与图形界面，命令行 Shell 提供一个[命令行界面（CLI）](https://zh.wikipedia.org/wiki/%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%95%8C%E9%9D%A2)
2. [图形用户界面（GUI）](https://zh.wikipedia.org/wiki/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2) 

## 图释

![](.//picture/Shell.png)

## 命令行式 Shell

命令行式 Shell 有：bash / sh / ksh / csh / zsh（Unix/linux 系统）等。

最为人熟知的命令行 Shell，应该就是 Windows 的 CMD 界面。

传统意义上，Shell 指的是命令行式 Shell，而不是图形用户界面 Shell，以后如果不特别注明，则 Shell 指的就是命令行式 Shell。

Shell 是操作系统的最外层，它管理用户与操作系统之间的交互，为用户提供访问 OS Kernel 的方法。

用户可以通过交互式方法（键盘输入等）和 OS 之间进行通讯，也可以通过非交互式方法和 OS 之间进行通讯。

- 交互式 Shell：等待用户输入命令，再执行输入的命令。

- 非交互式 Shell：Shell 不与用户进行交互，而是读取存放在文件中的命令，再去执行这些命令，当文件中的命令被执行完比，则 Shell也就终止了。

  非交互式使用的是 Shell Script 方法和 OS 之间进行通讯。

  Shell Script：放在文件中的一串 Shell 和操作系统命令，它们可以被复用。本质上，Shell Script 是命令行的命令简单的组合到一个文件里面，通过执行该文件去访问 OS。

## 图形界面 Shell

图形用户界面 Shell：GUI Shell，如最广泛的：Window Explorer（MicroSoft Windows 系列操作系统），

还有：Linux Shell，其中 [linux](https://baike.baidu.com/item/linux) shell 包括 X window manager (BlackBox和FluxBox），以及功能更强大的 CDE、GNOME、KDE、 XFCE。

# [Git Bash/CMD/GUI](https://stackoverflow.com/questions/45034549/difference-between-git-gui-git-bash-git-cmd)

## What's the Git Bash?

[Git：](https://baike.baidu.com/item/GIT/12647237)一组命令行实用程序 或者说 一个开源的分布式版本控制系统（由命令行组成）。

[Bash：](https://baike.baidu.com/item/bash)Bourne-Again-Shell 的缩写，一个命令行界面，一个命令处理器，同时也是一个 Shell（大多数系统，如：Linux/Mac OS X 默认的 Shell），所以它能接收用户的输入且也能从文件（被称为 Script）从读取命令并执行。

Bash 是一个 Unix Shell 和 命令行语言，并且它是 Linux（Ubuntu 等）和 OS X 上的默认 Shell。

**Git Bash：**顾名思义，一个 Git 的 Shell（用 Bash 作为 Shell 来用于 Git），适用于 MicroSoft Windows 环境的应用程序，它为 Git 命令行提供一个仿真层，用来作为用户和 OS Kernel 的交互方法；用外行术语来说：任何运行在 Linux 终端设备上的 Git 都被称之为 Git Bash。

如果要在 Windows 上使用 Bash（命令行），需要下载一个名为 Git Bash 的程序，而 Git Bash 则允许我们在 Windows 环境下轻松访问 Bash 以及一个叫做 Git 的工具。

即：Git Bash 能让开发者使用 Bash 去执行所有 Git 的功能，这和 CMD、GUI 是一样的，只不过的方法不同。

## What's the Git CMD?

Git CMD 就像带有 `git` 命令的常规 Windows 命令提示符（CMD）一样，它使开发者可以通过命令行（CMD）使用所有 Git 功能。

Git CMD 相当于 Linux 中的 bad-ass 终端，当开发者在 Windows 上安装 Git 并习惯于使用命令行（CMD）时，就会使用 Git CMD 运行 Git 命令。

## What's the Git GUI?

Git GUI 是能让开发使用使用图形用户界面（GUI）去执行 Git 的功能，本质上是针对不喜欢“黑屏”（又称 CMD）编码的用户。

如：开发者要提交一些更改从本地仓库到暂存队列，则使用 Git GUI 需要单击某个按钮提交更改，而使用 Git CMD 则需要使用命令：'git commit -m'

## 使用 Git Bash/CMD/GUI？

我建议新手应该学习并使用 Git Bash 去使用 Git 的所有功能，除非一些特殊情况的开发者应该使用 Git CMD。

我始终不建议开发者一上来就使用 Git GUI，它会让你无法弄清 Git 的优点以及其中的思想，让你变得呆滞。

# [What is the Git?](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F)

Git 类似于绝大多数的 VCS（Version Control System），但是 Git 在对信息的存储和认知方式上和绝大多数 VCS 有很大差异，理解这些差异将有助与避免使用Git 中的困惑。

## [直接记录快照，而非差异比较](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F#_%E7%9B%B4%E6%8E%A5%E8%AE%B0%E5%BD%95%E5%BF%AB%E7%85%A7%E8%80%8C%E9%9D%9E%E5%B7%AE%E5%BC%82%E6%AF%94%E8%BE%83)

Git 对待数据的（存储/读取）方法是：Git 像是把数据看作是对小型文件系统的一系列快照。 

 在 Git 中，每当你提交更新或保存项目状态时，它基本上就会对当时的全部文件创建一个快照并保存这个快照的索引。 

为了效率，如果文件没有修改，Git 不再重新存储该文件，而是只保留一个链接指向之前存储的文件。 Git 对待数据更像是一个 **快照流**。

而其他大部分 VCS 以文件变更列表的方式存储信息，这类系统*（CVS、Subversion、Perforce、Bazaar 等等）* 将它们存储的信息看作是一组基本文件和每个文件随时间逐步累积的差异 *（它们通常称作 **基于差异（delta-based）** 的版本控制）*。

![](.//picture/其他 VCS 的对待数据方式.png)

（其他 VCS 的对待数据方式）

![](.//picture/Git 对待数据的方式.png)

（Git 对待数据的方式）

 Git 更像是一个小型的文件系统，提供了许多以此为基础构建的超强工具，而不只是一个简单的 VCS。 稍后我们在[Git 分支](https://git-scm.com/book/zh/v2/ch00/ch03-git-branching)讨论 Git 分支管理时，将探究这种方式对待数据所能获得的益处。

## [Git 近乎所有操作都是本地执行](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F#_%E8%BF%91%E4%B9%8E%E6%89%80%E6%9C%89%E6%93%8D%E4%BD%9C%E9%83%BD%E6%98%AF%E6%9C%AC%E5%9C%B0%E6%89%A7%E8%A1%8C)

## [Git 保证完整性](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F#_git_%E4%BF%9D%E8%AF%81%E5%AE%8C%E6%95%B4%E6%80%A7)（有关校验和）

**Git 中所有的数据在存储前计算校验和，然后以校验和来引用。**

 这意味着不可能在 Git 不知情时更改任何文件内容或目录内容。 这个功能建构在 Git 底层，是构成 Git 哲学不可或缺的部分。 若你在传送过程中丢失信息或损坏文件，Git 就能发现。

Git 用以计算校验和的机制叫做 [SHA-1 散列（hash，哈希）](https://zh.wikipedia.org/wiki/SHA-1)。 这是一个由 40 个十六进制字符（0-9 和 a-f）组成的字符串，基于 Git 中文件的内容或目录结构计算出来，所以每一个校验和可以认为是一个 Git Repository 的版本（一个 git commit 后保存的一个快照）或者说是一个 Repository 文件

SHA-1 哈希看起来是这样：

```console
24b9da6552252987aa493b52f8696cd6d3b00373
```

Git 中使用这种哈希值的情况很多，你将经常看到这种哈希值。 实际上，Git 数据库中保存的信息都是以文件内容的哈希值来索引，而不是文件名。

所以你在 Git Bash 中输入 git log 查看 Git 的提交历史，通常只能查看到这串以 40 位二进制替代文件名的引用。

## [Git 一般只添加数据](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-Git-%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F#_git_%E4%B8%80%E8%88%AC%E5%8F%AA%E6%B7%BB%E5%8A%A0%E6%95%B0%E6%8D%AE)

## Git 的已追踪文件只存在三种状态

Git 有三种状态，你的文件可能处于其中之一： 

1. **已提交（committed）**

   已提交表示数据已经安全地保存在本地数据库中。

2. **已修改（modified）** 

   已修改表示修改了文件，但还没保存到数据库中。

3. **已暂存（staged）**

   已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

如果 Git 目录中保存着特定版本的文件，就属于 **已提交** 状态。

如果文件已修改并放入暂存区，就属于 **已暂存** 状态。 

如果自上次检出后，文件作了修改但还没有放到暂存区域，就是 **已修改** 状态

在 [Git 基础](https://git-scm.com/book/zh/v2/ch00/ch02-git-basics-chapter)（或***详见：Basic use to Git***）  一章，你会进一步了解这些状态的细节， 并学会如何根据文件状态实施后续操作，以及怎样跳过暂存直接提交。

## Git 项目的三个阶段

Git 项目的三个阶段，可以对应 Git 的已追踪文件存在的三种状态：

在工作目录中修改文件（已修改），在暂存区中放入文件（已暂存），在 Git 目录中存放已提交的项目版本快照（已提交）。

1. **Git 目录**

   存放所有已提交的版本（每次提交都会为 Repository 生成快照）

2. **暂存区**

   存放所有放入暂存区（git add）但未提交的文件。 

3. **工作区**

   当前所在的 Git Repository 中的某个项目版本。

Git 目录：Git 用来保存项目的元数据和对象数据库的地方。即： `.git directory(Repository)`，用来存在项目的所有版本。这是 Git 中最重要的部分，从其它计算机克隆仓库时，复制的就是这里的数据。

暂存区：一个文件，保存了下次将要提交的文件列表信息，一般在 Git 仓库目录中。 按照 Git 的术语叫做“索引”，不过一般说法还是叫“暂存区”。

工作区：项目的某个版本独立提取出来的内容。 这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改。不妨想想，默认情况下，使用 Git Bash 时（或任何一个 Git Shell），开发者一直处于最新的提交中，也就是最新的版本中。

![](.//picture/Git 项目的三个阶段.png)

（Git 项目的三个阶段）



# [Why use Git?](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)

凡是对任何项目/软件/文件来说，如果能保留每一次的修改，且能随时恢复每次修改时记录下的当前的项目/软件/文件快照，

那么这会使开发人员在开发过程中不会因为担心被修改的内容在未来可能还会使用，导致被修改的内容保留，

那么若此若做多了，会使得保留的内容太多，太冗长，很难维护，也很难查找，还可能因为一些疏忽导致保留的内容被覆盖或者被修改却忘记重新保留。

所以版本控制系统（软件）应运而生，它可以解放开发者的人力资源，系统化、专业化的对项目/软件/文件进行管理，它会自动帮开发者记录下项目每次变化的快照，从而使得任何时刻都可以恢复到该快照的时间点，这种行为，可以称之为：时间回溯。

其中，版本控制系统又分为：

- 集中化的版本控制系统
- 分布式版本控制系统

而 Git 正是分布式版本控制系统，它相比集中化的版本控制系统优势在于不会担心因为中央服务器的故障导致整个项目无法进行提交、更新，

因为对于分布式版本控制系统来说，每台客户端并不只提取最新版本的文件快照， 而是把代码仓库完整地镜像下来，包括完整的历史记录。 

这么一来，任何一处协同工作用的服务器发生故障，事后都可以用任何一个镜像出来的本地仓库恢复。 因为每一次的克隆操作，实际上都是一次对代码仓库的完整备份。

更进一步，许多这类系统都可以指定和若干不同的远端代码仓库进行交互。籍此，你就可以在同一个项目中，分别和不同工作小组的人相互协作。 你可以根据需要设定不同的协作流程，比如层次模型式的工作流，而这在以前的集中式系统中是无法实现的。

# Git 常用术语

1. 仓库（Repository）
   受版本控制的所有文件修订历史的共享数据库
2. 工作空间（Workspace) 
   本地硬盘或 Unix 用户帐户上编辑的文件副本
3. 工作树/区（Working tree）
   工作区中包含了仓库的工作文件。您可以修改的内容和提交更改作为新的提交到仓库。
4. 暂存区（Staging area）
   暂存区是工作区用来提交更改（commit）前可以暂存工作区的变化。
5. ![img](https://pic1.zhimg.com/50/v2-c7fe88de655ee2da10270da9bdf0db48_hd.jpg?source=1940ef5c)![img](https://pic1.zhimg.com/80/v2-c7fe88de655ee2da10270da9bdf0db48_720w.jpg?source=1940ef5c)
6. 索引（Index）
   索引是暂存区的另一种术语。
7. 签入（Checkin）
   将新版本复制回仓库
8. 签出（Checkout）
   从仓库中将文件的最新修订版本复制到工作空间
9. 提交（Commit）
   对各自文件的工作副本做了更改，并将这些更改提交到仓库
10. 冲突（Conflict）
    多人对同一文件的工作副本进行更改，并将这些更改提交到仓库
11. 合并（Merge）
    将某分支上的更改联接到此主干或同为主干的另一个分支
12. 分支（Branch）
    从主线上分离开的副本，默认分支叫master
13. 锁（Lock）
    获得修改文件的专有权限。
14. 头（HEAD）
    头是一个象征性的参考，最常用以指向当前选择的分支。
15. 修订（Revision）
    表示代码的一个版本状态。Git通过用SHA1 hash算法表示的ID来标识不同的版本。
16. 标记/标签（Tags）
    标记指的是某个分支某个特定时间点的状态。通过标记，可以很方便的切换到标记时的状态。

# Basic use to Git

## 一些重要点

### Git 管理目录/文件夹意思

Git 可以管理 Repository 根目录下的子文件夹，但是请注意：Git 并不能管理子文件夹本身，而是管理子文件夹中的子文件，

这个意思为：如果子文件夹中不存在任何文件，则你无法使用 git add demo(文件夹名) 去将文件夹追踪/存入到暂存区，

因为 git add \<foldername> 命令的意思为：将 \<foldername> 里面的所有文件都递归的进行 追踪/存入到暂存区。参见：[跟踪新文件-Git](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_tracking_files)

### [glob 模式](https://rgb-24bit.github.io/blog/2018/glob.html)

## [获取 Git Repository](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)

通常有两种获取 Git 项目仓库的方式：

1. 将尚未进行版本控制的本地目录转换为 Git 仓库；
2. 从其它服务器 **克隆** 一个已存在的 Git 仓库。

两种方式都会在你的本地机器上得到一个工作就绪的 Git 仓库。

### [Git 的初始化](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)-[阮一峰](https://www.liaoxuefeng.com/wiki/896043488029600/896827951938304)

Git 的初始化：使某个文件夹（目录）中的所有文件开始被 Git 管理。

**git init**

1. 在任何一个地方创建一个空文件夹（或使用现有文件），其路径中必须不带中文，且建议不带空格。
2. 使用 Git Bash（或其他编辑器），并用 cd 命令转到该文件夹的位置
3. 在 Git Bash 中使用 git init 命令，将该文件夹（包括其里面的所有文件，若有）初始化成一个 Git 的 Repository。

Note：git init 命令初始化 Git Repository 完成之后，会在初始化的文件夹中存在一个 .git 子目录（文件夹），

这个子目录含有初始化的 Git Repository 中的所有必须文件，这些文件是 Git 的骨干，即：该子目录是 Git 用来跟踪管理版本库的。

没事千万别动该子目录中的文件，否则可能导致该 Git Repository 损坏，导致整个 Repository 不可用。

如果你想知道 .git 子目录中的文件的用处，参见：[Git 内部原理](https://git-scm.com/book/zh/v2/ch00/ch10-git-internals) 来了解更多关于到底 `.git` 文件夹中包含了哪些文件的信息

### [克隆现有的仓库](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93#_git_cloning)

使用 `git clone <url>` 命令可以克隆指定的 Git 仓库服务器上的几乎所有数据。

对于 `git clone <url>` 命令来说，Git 克隆的是该 Git 仓库服务器上的几乎所有数据，而不是仅仅复制完成你的工作所需要文件，当你执行 `git clone` 命令的时候，默认配置下远程 Git 仓库中的每一个文件的每一个版本都将被拉取下来。 

事实上，如果你的服务器的磁盘坏掉了，你通常可以使用任何一个克隆下来的用户端（开发者所使用的个人计算机）来重建服务器上的仓库 （虽然可能会丢失某些服务器端的钩子（hook）设置，但是所有版本的数据仍在，参见：[在服务器上搭建 Git](https://git-scm.com/book/zh/v2/ch00/_getting_git_on_a_server) ）。

一个简单例子：`git clone https://github.com/libgit2/libgit2`

以上命令会在当前使用该命令时，所在的路径（目录）下创建一个名为 “libgit2” *（默认情况下，使用克隆的仓库的名字作为本地仓库名）*的目录*（以上路径有两个 libigt2，前一个指的是后一个 libgit2 所在的文件夹的路径，后一个指的是 Repository 的名字）*，

并在这个目录下初始化一个 `.git` 文件夹， 从远程仓库拉取下所有数据放入 `.git` 文件夹，然后从中读取最新版本的文件的拷贝。

如果你进入到这个新建的 libgit2 文件夹，你会发现所有的项目文件已经在里面了，准备就绪等待后续的开发和使用。

如果你想在克隆远程仓库的时候，自定义本地仓库的名字，你可以通过额外的参数指定新的目录名：

`$ git clone https://github.com/libgit2/libgit2 mylibgit`

这会执行与上一条命令相同的操作，但目标目录名变为了 `mylibgit`。

注：Git 支持多种数据传输协议。 上面的例子使用的是 `https://` 协议，不过你也可以使用 `git://` 协议或者使用 SSH 传输协议，比如：

`user@server:path/to/repo.git` ， [在服务器上搭建 Git](https://git-scm.com/book/zh/v2/ch00/_getting_git_on_a_server) 将会介绍所有这些协议在服务器端如何配置使用，以及各种方式之间的利弊。

` git clone -b <remotebranchname> <remote>`：从 remote 远程仓库中中克隆指定分支

## [Git 仓库中的文件的已跟踪和未跟踪](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

初始化 Git Repository 后，那么该 Repository 目录下的所有文件，都可以说存在以下两个状态之一的情况：

1. 已跟踪（Tracked）
2. 未跟踪（Untracked）

**已跟踪的文件：**是指那些被纳入了版本控制的文件，在上一次快照中有它们的记录，在工作一段时间后， 它们的状态可能是未修改，已修改或已放入暂存区。简而言之，已跟踪的文件就是 Git 已经知道的文件。

**未跟踪的文件：**工作目录中除已跟踪文件外的其它所有文件。未跟踪我呢见既不存在于上次快照的记录中，也没有被放入暂存区。

注：初次克隆某个仓库的时候，工作目录中的所有文件都属于已跟踪文件，并处于未修改状态，因为 Git 刚刚检出了它们， 而你尚未编辑过它们。

在开发者编辑过某些文件之后，由于自上次提交后（git commit）你对它们做了修改，Git 会将它们标记为已修改文件。 

在工作时，你可以选择性地将这些修改过的文件放入暂存区，然后提交所有已暂存的修改，如此反复，从而在 Git 的 Repository 中更新修改的文件***（详见：Git 的两个核心命令）***。

![](.//picture/文件的状态变化周期.png)

（文件的状态变化周期）

## [查看仓库中文件的状态](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

### [查看 Repository 某个文件当前的状态](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_checking_status)

git status

- Git Bash 中：在 Git Repository 目录中，使用 git status \<filename> 命令，可以查看该文件的当前状态。
- 如若直接使用 git status 命令，则代表查看当前目录的状态。

Note：`git status` 命令查看的目录/文件的状态，显示的是大致状态，而不会显示你为指定的目录/文件更新过了什么内容（这可以通过 [git diff](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_git_diff_staged) 命令方式做到）

```bash
# 表明当前 Git 仓库相当干净，即
# 所有已跟踪文件在上次提交后都未被更改过。
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

### [查看已暂存和未暂存文件的详细修改内容](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_git_diff_staged)

**git diff [--staged/--cached]**

使用 git status 命令只会输出修改/暂存/未暂存/未追踪/已追踪等的文件名，而不会输出本次详细修改了什么内容；

如果开发者想知道本次提交（git commit）之前具体修改了什么地方，可以使用 git diff 命令，直接输入 git diff 命令意为：

当前对哪些文件/目录做了更新，但未存入到暂存区域的文件的详细内容是什么？而git status 会告诉你更新的文件名，并不会告诉你更新了什么详细内容。

```bash
$ git diff
diff --git a/readme.txt b/readme.txt
index dab8dfd..39fb4d6 100644
--- a/readme.txt
+++ b/readme.txt
@@ -5,3 +5,4 @@ this is my modify.
 再一次修改，第4次。
 再一次修改，第5次。
 再一次修改，第6次。
+再一次修改，第7次。
```

这里直接使用 git diff 命令，其中 + 号处代表此次修改的已追踪文件，但还未存入到暂存区的文件修改了什么内容。

注：git diff 命令本身只能查看尚未存入的暂存区的改动，并不是查看自上次提交以来所做的所有改动，也就是说：直接使用 git diff 命令无法查看：当文件/目录修改后就存入到暂存区域的该文件/目录；

如上一个示例中，我们使用 git add readme.txt 命令将本次修改的 readme.txt 文件存入到暂存区，那么再使用 git diff 命令将什么都不会显示，因为 readme.txt 已经存入到了暂存区。

如果想通过 git diff 命令查看暂存区中已修改的文件的详细内容，需要使用
git diff --cached 命令：查看已暂存起来的变化。

```bash
$ git add readme.txt
$ git diff # 直接使用 git diff 命令什么都不会显示
$ git diff --cached
diff --git a/readme.txt b/readme.txt
index dab8dfd..9105e69 100644
--- a/readme.txt
+++ b/readme.txt
@@ -5,3 +5,5 @@ this is my modify.
 再一次修改，第4次。
 再一次修改，第5次。
 再一次修改，第6次。
+再一次修改，第7次。
```

Note：在写作此文时，我们使用 git diff 来分析文件差异。 但是你也可以使用图形化的工具或外部 diff 工具来比较差异。 可以使用 git difftool 命令来调用 emerge 或 vimdiff 等软件（包括商业软件）输出 diff 的分析结果。 使用 git difftool --tool-help 命令来看你的系统支持哪些 Git Diff 插件。



## [Git 的两个核心命令](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)-[阮一峰](https://www.liaoxuefeng.com/wiki/896043488029600/896827951938304)

Git 存在两个核心功能：

1. [git add \<filename\>](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_tracking_files)
2. [git commit [-m "Remarks"(可选)]](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_committing_changes) 

### [git add \<filenameORfilepath\>](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_tracking_files)

一个多功能命令，它的意思可能有如下几种 ：

- 使 Git 开始追踪指定文件/目录

  如果 git add \<filepath/foldername>：递归地跟踪指定目录下的所有文件。

- 将已追踪的指定文件放入暂存区（即使这个文件在被追踪的情况下又被修改，也可以这么做）

- 合并时，把有冲突的文件标记为已解决状态

以上三种的 git add 命令的意思其实可以理解为：精确地将内容添加到下一次提交（git commit）中。

git add \<filename/filepath/foldername\> 命令是可以在使用 git commit 命令之前多次使用的，即：

可以多次使用 git add 命令，使得多个文件/目录下的所有文件都 被存入到暂存区/开始追踪/在合并时将冲突的文件标记为已解决状态，然后就可以使用 
git commit 命令一次性将暂存区中的内容全部提交到 Repository，完成 Git 记录文件的修改。

`git add -A`：在没有指定 \<pathspec> （路径）时，追踪当前 Git 仓库中所有未追踪的文件。

### [git commit [-m "Remarks"(可选)]](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_committing_changes)

将 git 暂存区中的内容提交到 Repository(仓库)，其中：-m "Remarks" 指的是为此次提交到 Repository 的操作取个备注名。

不过，即使只使用 [git commit](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_committing_changes) 命令，也可以做到这样，只不过仅使用 
git commit 命令会使得 Bash 进入到 [vim](https://www.vim.org/) 模式（进入到的编辑器是通过 Shell 的环境变量 EDITOR 指定的，一般为 vim 或 emacs），开发者需要在 vim 模式中写此次提交的备注。

请记住，提交时会记录放在暂存区域的快照。 任何还未暂存的文件仍然保持已修改状态（已被 Git 追踪且修改了，但未存放于暂存区（再一次 git add）），可以在下次提交时存放于暂存区（git add），再纳入到版本管理。

每一次运行提交操作，都是对你整个项目（整个 Repository）作一次快照，以后可以回到这个状态（某一次快照中），或者进行比较（对快照进行比较）；

至于在 Repository 中但是是 Untracked 状态，则 git commit 时不会讲 Untracked 状态的文件纳入版本控制，自然以后在回到某个状态时，Untracked 状态的文件会保持不变。

## 前面命令的流程-> git init/add/commit

现在我们知道如何初始化一个 Git Repository（`git init`）或 克隆一个仓库（`git clone <url>`），也知道如何精确的地将内容添加到（git add）下一次提交（git commit）中，现在让笔者来说一下初始化 Repository 的大概流程吧：

1. 在计算机中任意一个位置新建一个文件夹。
2. 使用 git init 命令初始化该文件夹目录
3. 对该仓库（初始化的文件夹）进行一些配置（可选）
4. 精确地将一个/多个/文件目录中的文件添加（git add）到下一次提交
5. 修改已追踪文件/暂存区中的文件，对文件内容进行编辑（可选）
6. 提交（git commit）暂存区中的已跟踪文件。
7. 反复执行 4、5、6（执行过程中可能会有其他命令执行，但是已经超过以上命令的使用，所以这里不予讨论）

基本的工作流程：

1. 在工作区（***详见：What is the Git - Git 项目的三个阶段***）修改文件
2. 将你想要下次提交的更改选择性地暂存，这样只会将更改的部分添加到暂存区。
3. 提交更新，找到暂存区的文件，将快照永久性存储到 Git 目录。

# Reference

- [Git Document](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
- [Git Reference](https://git-scm.com/docs) 很有用，可以作为 Git Document 的补充，有些注意事项存在于这里。
