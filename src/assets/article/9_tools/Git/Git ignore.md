# [.gitignore 文件](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93#_ignoring)-[阮一峰](https://www.liaoxuefeng.com/wiki/896043488029600/900004590234208) 

通常来说，一个 Repository 中，总会有些无需纳入 Git 的管理的文件，也不希望这些文件总是出现在 Untracked files 列表中（git status 命令会使得未跟踪文件出现在 Untracked files 中）；

在这种情况下，开发者可以在某个 Repository 根目录/子目录中，创建一个名字为：`.gitignore` 的文件（可以不用书写文件名），在该文件中配置需要忽略的目录/文件，其中大致过程如下：

1. 创建 .gitignore 文件（cmd：type nul>文件名（可选）.后缀名）
2. 在 .gitignore 文件中配置需要忽略的目录/文件
3. 将 .gitignore 文件存入暂存区（git add .gitignore）
4. 将 .gitignore 文件提交到 Repository（git commit [-m "Remarks"]）

注意：开发者不需要从零开始配置 .gitignore 文件，Github 已经为我们准备了各种配置文件，只需要组合一下就可以使用了，这些配置文件：[点我](https://github.com/github/gitignore)

使用 .gitignore 忽略文件的基本原则为：

- 忽略操作系统自动生成的文件，比如缩略图等；
- 忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的 .class文件；
- 忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

有些时候，开发者可能发现想添加一个文件到 Git 的 Repository 中，却发现无法添加，通常是因为 .gitignore 中的配置忽略了该文件：

```bash
$ git add App.class
The following paths are ignored by one of your .gitignore files:
App.class
Use -f if you really want to add them.
```

就像以上提示所说的那样，开发者可以使用 -f 来强制添加一个已被忽略的文件到 Git Repository：`$ git add -f App.class`

若开发者想查看 .gitignore 中忽略某个文件的详细配置，可以通过：
git check-ignore命令：

```bash
$ git check-ignore -v <filename/filepath>
# 在 .gitignore 的第2行中，*.[oa] 忽略了指定的 <filename/filepath>
.gitignore:2:*.[oa]     <filename/filepath>

```

.gitignore 文件中支持 glob 模式，

- glob 模式：shell 所使用的简化了的正则表达式。

现在让我们来看看 .gitignore 文件的格式规范吧：

- 所有空行或者以 `#` 开头的行都会被 Git 忽略。

- 可以使用标准的 glob 模式匹配，它会递归地应用在整个工作区中。

- 匹配模式可以以（`/`）开头防止递归。

- 匹配模式可以以（`/`）结尾指定目录。

- 要忽略指定模式以外的文件或目录，可以在模式前加上叹号（`!`）取反。

- 星号（`*`）：匹配零个或多个任意字符；

- `[abc]` ：匹配任何**一个**列在方括号中的字符 

  这个例子要么匹配一个 a，要么匹配一个 b，要么匹配一个 c；

  如果在方括号中使用短划线分隔两个字符， 表示所有在这两个字符范围内（不包含本身）的都可以匹配：

   `[0-9]` 表示匹配所有 0 到 9 的数字。 

- 问号（`?`）：只匹配**一个**任意字符；

- 两个星号（`**`）：表示匹配任意中间目录，

  比如 `a/**/z` 可以匹配 `a/z` 、 `a/b/z` 或 `a/b/c/z` 等。

Note：在最简单的情况下，一个 Repository 可能只根目录下有一个 .gitignore 文件，它递归地应用到整个仓库中。 

然而，子目录下也可以有额外的 .gitignore 文件。子目录中的 .gitignore 文件中的规则只作用于它所在的目录中。 （Linux 内核的源码库拥有 206 个 .gitignore 文件。）

多个 .gitignore 文件的具体细节超出了本书的范围，更多详情见 man gitignore 。

