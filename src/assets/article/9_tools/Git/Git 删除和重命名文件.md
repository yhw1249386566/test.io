# [删除 Git 的文件](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_removing_files)

rm:remove

git rm

如果要删除 Git Repository 中的某个文件/目录，则必须先从已跟踪文件（tracked file）清单中移除，然后将 Git 记录的这次操作提交（git commit）到 Repository。

开发者可以使用两种方法将一个文件/目录从 Git Repository 中删除（使该文件不被纳入 Git 的版本控制）：

1. 使用 **git rm \<filename/filepath>** 命令删除指定文件/目录，那么再下一次提交（git commit）中，Git 将不会把该文件/指定目录下的所有文件纳入到版本控制中。

2. 先从 Repository 目录中手动删除一个指定文件/目录，接着使用 
   git add \<DeletedFileName/DeletedFilePath> 命令将已删除的文件/目录记录且放入 Changes not staged for commit 列表（使用 git status 即可查看当前 Repository 目录的状态）中，

   - 这个 git add 命令是必须的，因为对于手动从 Repository 目录中删除文件/目录，

     对于 Git 来说，就相当于对该文件/目录进行了修改，那么 Git 就会把这个删除操作记录下来，

     以 Changes not staged for commit（修改了已跟踪的文件，但未放入暂存区）这样的形式告诉开发者，该文件/目录被修改（或说被删除）），

   最后再使用 git commit 命令将暂存区的内容提交到 Git Repository，这样，手动删除的 Repository 目录中的文件就从 Git 的版本控制中移除。

   - 因为 Changes not staged for commit 列表下的文件，不存在于暂存区中，

     而 git commit 命令是提交暂存区的文件到 Repository 中并对当前 Repository 做一次快照，所以未暂存的文件将被丢弃。

   注：如果直接使用 git commit 命令将一个手动从 Repository 目录中删除的文件提交，则已删除的文件会出现在 Changes not staged for commit 列表中。

有一种情况是，开发者想将文件从 Git 的版本控制中移除（不让 Git 继续追踪），但是却想在磁盘（或者说 Repository 中）中保留该文件，只需要使用 
**git rm --cached \<filename/foldername>** 命令即可做到。

这种操作是非常有用的，我们知道，Git 的命令通常都支持 glob 模式（建议的正则表达式的表达方法，***详见：一些重要点 - [glob 模式](https://rgb-24bit.github.io/blog/2018/glob.html)***），而 git rm 命令也不例外。

那么当你忘记在 .gitignore 中添加对某些/某个文件的忽略时，导致在 Repository 中出现了一堆如 .a 这样的编译生成文件存入到了暂存区，这种情况下，这一操作尤其有用。

且 git rm 命令后面可以列出文件或者目录（递归的遍历目录下的文件）的名字： git rm --\<filename/foldername>

使用 glob 模式：`$ git rm log/\*.log`

请注意到星号 * 之前的反斜杠 `\`， 因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。 此命令删除 log/ 目录下扩展名为 .log 的所有文件。 

类似的比如：`$ git rm \*~`；该命令会删除所有名字以 `~` 结尾的文件。



# [移动（重命名）Git 的文件](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_git_mv)

mv:move

git mv

在 Git 中，使用 **git mv \<OldFileName> \<NewFileName>** 命令对 Repository 中的文件进行改名操作；

注：如果重命名 Git Repository 的已跟踪文件，那么 Git 会把重命名过后的文件存入到暂存区中，但还没提交到仓库，需要开发者手动提交。

至于为什么笔者说使用该命令对文件重命名时，Git 会自动地将重名后的文件存入到暂存区，是因为，使用该命令就相当于执行以下三条命令：

1. $ mv \<OldFileName> \<NewFileName>

   重命名文件

2. $ git rm \<OldFileName>

   将旧文件删除

3. $ git add \<NewFileName>

   将新文件添加到暂存区

不论是使用 git mv 命令或是使用以上三条命令，Git 都会意识到这是一次重命名操作，所以不管何种方式得出的结果都是一样的。 

两者唯一的区别是：git mv 是一条命令而非三条命令，直接用 git mv 方便得多。 不过有时候用其他工具批处理重命名的话，要记得在提交前删除
（git rm \<filename/foldername>）旧的文件名，再添加（git add \<filename/foldername>）新的文件名。
