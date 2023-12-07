# [为 Git 命令添加别名](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-Git-%E5%88%AB%E5%90%8D)

`git config --global alias.xx <OrderName>`：使用该命令可以为指定的 
\<OrderName> 添加一个 xx 别名，然后我们就可以使用 xx 执行 \<OrderName>。

```bash
$ git config --global alias.ci commit
$ git config --global alias.unstage 'reset HEAD --'
# 执行完以上命令后
$ git commit 
$ git reset HEAD -- fileA (详见：Git 的撤销操作)
# 等价于
$ git ci
$ git unstage -- fileA
```

为 Git 命令使用别名是因为有些 Git 命令的语义并不是那么清楚，随着开发人员继续深入使用 Git，命令之间可能会记混淆，所以开发人员可以主动为命令创建一个具有语义的别名，从而可以更好的使用 Git。

Git 只是简单地将别名替换为对应的命令；然而，你可能想要执行外部命令，而不是一个 Git 子命令。 

如果是这样的话，可以在命令前面加入 `!` 符号。 若你自己要写一些与 Git 仓库协作的工具的话，那这会很有用。 我们现在演示将 `git visual` 定义为 `gitk` 的别名：

```bash
$ git config --global alias.visual '!gitk'
```

注：git visual 是外部命令，而不是 Git 命令。
