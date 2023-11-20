# [使用 Git 前的配置](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%88%9D%E6%AC%A1%E8%BF%90%E8%A1%8C-Git-%E5%89%8D%E7%9A%84%E9%85%8D%E7%BD%AE)

## 配置说明

安装完 Git 后，则你可能想要定制使用 Git 的环境。每台计算机只需要配置一次 Git 环境，程序升级时会保留 Git 配置信息，且你可以在任何时候再次通过运行命令来修改它们。

Git 自带一个 `git config` 的工具来帮助设置控制 Git 外观和行为的配置变量。 这些变量存储在三个不同的位置：

1. `Git 所安装的位置/etc/gitconfig` 文件：: 包含系统上每一个用户及他们仓库的通用配置。

   如果在执行 git config 时带上 --system 选项，那么它就会读写该文件中的配置变量（由于它是系统配置文件，因此你需要管理员或超级用户权限来修改它）。

2. `~/.gitconfig 或 ~/.config/git/config` 文件：只针对当前用户。

   ~/ 意为：当前用户所在的盘符，即：根目录，通常为：C 盘，即：`~/`相当于 `C:/`。你可以传递 --global 选项让 Git 读写此文件，这会对你系统上 所有 的仓库生效。

3. 当前 Git 仓库中的 config 文件（即：`.git/config`）：针对当前存在 config 文件的仓库。 

   你可以传递 --local 选项让 Git 强制读写此文件，虽然默认情况下用的就是它 （当然，你需要进入某个 Git 仓库中才能让该选项生效）。

对于以上 3 个配置文件来说，每一个级别的配置文件会覆盖上一个级别的配置，如：.git/config 的配置变量会覆盖 ~/.gitconfig 的配置变量。*（注：只有配置文件中有冲突的配置变量，那么下一级才会覆盖上一级的配置文件的环境变量，否则配置文件中的环境变量将一起使用）*

在 Windows 系统中，Git 会查找 `$Home` 目录下（一般是：`C:\Users\$User(用户名)` 目录下）的 `.gitconfig` 文件，同时 Git 也会查找 `Git 根目录/etc/gitconfig` 文件；

> 如果你在 Windows 上使用 Git 2.x 以后的版本，那么还有一个系统级的配置文件，Windows XP 上在 `C:\Documents and Settings\All Users\Application Data\Git\config` ，
>
> Windows Vista 及更新的版本在 `C:\ProgramData\Git\config` 。
>
> 此文件只能以管理员权限通过 `git config -f ` 来修改。

你可以通过：`$ git config --list --show-origin` 命令查看 Git 的所有的配置以及它们所在的文件和其路径。

## 用户信息的配置

安装完 Git 后，要做的第一件事就是设置你的用户名和邮件地址。

这一点很重要，因为每一个 Git 提交都会使用这些信息，它们会写入到你的每一次提交中，不可更改：

```bash
$ git config --global user.name "Yomua"
$ git config --global user.email yomua.yhw@gmail.com
```

再次强调，如果使用了 `--global` 选项，那么该命令只需要运行一次，因为之后无论你在该系统上做任何事情， Git 都会使用那些信息。

当你想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 `--global` 选项的命令来配置。

笔者注：很多 GUI 工具都会在第一次运行时帮助你配置这些信息。

## Git 的文本编辑器的配置

既然用户信息已经设置完毕，现在你可以配置默认文本编辑器了，当 Git 需要你输入信息时会调用它。 如果未配置，Git 会使用操作系统默认的文本编辑器。

如果你想使用不同的文本编辑器，例如 Emacs，可以这样做：

```bash
$ git config --global core.editor emacs
```

在 Windows 系统上，如果你想要使用别的文本编辑器，那么必须指定可执行文件的完整路径。 它可能随你的编辑器的打包方式而不同。

对于 Notepad++，一个流行的代码编辑器来说，你可能想要使用 32 位的版本， 因为在本书编写时 64 位的版本尚不支持所有的插件。 如果你在使用 32 位的 Windows 系统，或在 64 位系统上使用 64 位的编辑器，那么你需要输入如下命令：`$ git config --global core.editor "'...目录/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"`

Note：Vim、Emacs 和 Notepad++ 都是流行的文本编辑器，通常程序员们会在 Linux 和 macOS 这类基于 Unix 的系统或 Windows 系统上使用它们。 如果你在使用其他的或 32 版本的编辑器，请在 [`core.editor`](https://git-scm.com/book/zh/v2/ch00/_core_editor) 中查看设置为该编辑器的具体步骤。

warning：如果你不这样设置编辑器，那么当 Git 试图启动它时你可能会被弄糊涂、不知所措。 例如，在 Windows 上 Git 在开始编辑时可能会过早地结束。

## 使得 Git 大小写敏感

当你更改一个 Git Repository 的文件名（从大写变为小写，如：READEME.md => reademe.md），然后 `git add`、`git commit -m "xx"、` `git push` 到远程仓库，远程仓库将默认没有发生任何改变，因为 Git 对大小写不敏感。

所以这可能会造成在合作完成项目时，出现因为文件大小写而导致 Error 的原语，所以我们需要配置 Git，使它大小写敏感：

```bash
# 全局设置大小写敏感 
$ git config --global core.ignorecase false 

# 本地设置大小写敏感
$ git config core.ignorecase false
```

## [配置 SSH（通过它可推送到仓库而无需输入用户密码）](https://gitee.com/help/articles/4181#article-header0)

1. 打开 Git CMD，输入

   `ssh-keygen -t rsa -C "xxxxx@xxxxx.com"  ` 

   后面的邮箱 "xxx" 代表一个标志，不一定要用邮箱，按照提示回车。

2. 此时在你的 `~/.ssh/id_rsa.pub` 中存在你的公钥，或当前 Git CMD 显示的一长串公钥。

3. 将你的公钥放到 Gitee-设置-安全设置-SSH 公钥-添加公钥中。

4. 在 Git CMD 中将该公钥添加到信任列表，从而可以通过它推动到你添加公钥的账户的任意仓库中，输入：

   `ssh -T git@gitee.com` 

当然，你可以在一台电脑使用[多个账户配置多个 SSH-KEY](https://gitee.com/help/articles/4229#article-header0):

当有多个 git 账号时，比如：

1. 一个 gitee，用于公司内部的工作开发；
2. 一个 github，用于自己进行一些开发活动；

方法：

1. 生成一个公司用的 SSH-Key

   `ssh-keygen -t rsa -C 'xxxxx@company.com' -f ~/.ssh/gitee_id_rsa` 

2. 生成一个 github（个人用的） 用的 SSH-Key

   `ssh-keygen -t rsa -C 'xxxxx@qq.com' -f ~/.ssh/github_id_rsa` 

3. 在 ~/.ssh 目录下新建一个 config 文件，添加如下内容（其中 Host 和HostName 填写 git 服务器的域名，IdentityFile 指定私钥的路径）

   ```bash
   # gitee
   Host gitee.com
   HostName gitee.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/gitee_id_rsa
   # github
   Host github.com
   HostName github.com
   PreferredAuthentications publickey
   IdentityFile ~/.ssh/github_id_rsa
   ```

4. 用 ssh 命令分别测试

   ```bash
   $ ssh -T git@gitee.com
   $ ssh -T git@github.com
   ```

   这里以 gitee 为例，成功的话会返回下图内容

   ![输入图片说明](https://images.gitee.com/uploads/images/2018/0921/161137_b71ef6be_967230.png)

   

## 使得 Git 可以正确显示中文

```bash
$ git config --global core.quotepath false
```

参考：[此处](https://zhuanlan.zhihu.com/p/133706032#:~:text=%E8%A7%A3%E5%86%B3git%20bash%20%E7%BB%88%E7%AB%AF%E6%98%BE%E7%A4%BA%E4%B8%AD%E6%96%87%E4%B9%B1%E7%A0%81&text=%E6%89%8D%E8%83%BD%E6%AD%A3%E7%A1%AE%E6%98%BE%E7%A4%BA%E4%B8%AD%E6%96%87.,%E6%A1%86%E9%80%89%E4%B8%BA%20UTF%2D8%20%E3%80%82) 

## 检查配置信息

使用 `git config --list` 命令来列出所有 Git 当时能找到的配置。

你可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如：`/etc/gitconfig` 与 `~/.gitconfig`），这种情况下，Git 会使用它找到的**每一个变量的最后一个配置（ 那个配置文件所在的最低级别的目录）**。

​	=> 也就是在 ***配置说明*** 一节中笔者讲过的：不同文件的配置变量，只有在冲突时，级别低的*（Git 根目录(高) -> ~/.gitconfig -> 仓库目录(低)）*会覆盖级别高的配置变量，而不冲突的配置变量，则会合并使用。

你也可以通过输入 `git config `： 来检查 Git 的某一项配置

```bash
$ git config user.name
Yomua
```

Note： 由于 Git 会从多个文件中读取同一配置变量的不同值，因此你可能会在其中看到意料之外的值而不知道为什么。 

此时，你可以查询 Git 中该变量的 **原始** 值，它会告诉你哪一个配置文件最后设置了该值：`$ git config --show-origin rerere.autoUpdate file:/home/johndoe/.gitconfig	false

## windows 一些实用配置

- 下载  TortoiseGit 可以使 windows 的 git 文件目录存在小图标，能一眼看见此 git 目录中的文件是否被修改、暂存等。