# 定义

nvm是一个可以在node版本之间相互切换的的一个运行在CLI的东西.

# 安装

## 描述

https://github.com/coreybutler/nvm-windows/releases

进入此网站,下载Assets: [nvm-setup.zip](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip),当然,或者直接点击此也可以.

PS:下载可能需要用到VPN.所以我在F:\Program Install Package\Program Software\Environment\FrontEnd\nvm此目录中提供了一个2020/3/7的最新压缩包

## 细节

安装时的路径不要有中文和空格,否则会报错,当时不报错,那么也会造成后面的使用错误.

- **任何的目录最好都不要有空格和中文**

- 且nvm的路径要大于node的路径.

  即node的路径不能在nvm的上一级,或者上上级等.

  这里推荐一个路径: D:\nvm\nvm, D:\nvm

  前者由于nvm会自己创造一个nvm文件,所以会多余,后者是node的安装路径(如果强行新建一个文件和第2个nvm同级,在安装nvm时这个文本会被强制换成nvm,我也不清楚为什么.

  **安装完成之后还需要修改一些东西,请往下看:**

当nvm安装完成,就可以使用命令界面cmd, 安装node.

`nvm install latest` 安装最新的node,由于node会内置npm,所以此时npm也被安装.

`nvm install 12.16.1`, 可以指定版本行的安装.

然后可以使用nvm use xxxx(版本号) 使用node的哪个版本.

此时你就可以使用npm和node命令了.

但是如果你出现: `不是内部或外部命令，也不是可运行的程序或批处理文件`

请往下看

## 出现不是内部或外部命令...

https://blog.csdn.net/Cynthia_Wiki/article/details/99571750

原因：环境变量中用户变量和系统变量中 NVM_SYMLINK 路径使用默认的node 安装路径 C:\Program Files\nodejs

解决办法：在 nvm 安装路径下新增一个空的nodejs文件夹，并且设置环境变量 NVM_SYMLINK为 H:\ProgramWay\LibraryData\node\nvm\nodejs （自己的 nvm 安装路的 nodejs 文件夹的位置），此时 node -v 可以查看版本，npm -v也可以查看版本。

注：当你设置完这个，搞定了一个 node 版本 出现的 npm 不是外部命令的问题，但是继续使用 nvm install node版本 命令下载的版本以然会出现 npm 不是外部命令的问题，则请仔细看在下载过程中，CLI 是不是有报错：

```
Downloading npm version 6.14.7... Error while downloading https://github.com/npm/cli/archive/v6.14.7.zip - Get https://codeload.github.com/npm/cli/zip/v6.14.7: dial tcp 192.30.253.120:443: i/o timeout
panic: runtime error: invalid memory address or nil pointer dereference
[signal 0xc0000005 code=0x0 addr=0x20 pc=0x5c6eb0]
```

当出现这个错误，通常则是连接不到远程地址，导致无法下载 npm，所以你需要手动的为你下载的 node 版本下载一个对应的 npm，接下来的步骤可以参考：[CSDN](https://blog.csdn.net/p3118601/article/details/92622393)

或在 nvm 根目录的 setting.ext 后加两行。

```
root: D:\nvm
path: D:\nvm\nodejs
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

注：如果，node和npm安装都不成功

经常非发生这种状况：明明信息显示node和npm都安装成功了，也nvm use v6.10.2 了。但是还是找不到Node和npm的命令，按照网上资料应该是他没有配置node环境变量，自己看了下，确实没有配置，但是配置好之后依然不成功， 所以这种情况下，只能卸载nvm，重新安装该软件，重新试一遍。

 win10系统安装nvm经常会出现问题，有时nvm安装了，但是cmd  输入 nvm 找不到命令，有时即使可以正常用nvm安装node,但是键入node命令和npm命令提示拒绝访问，这时候同理卸载nvm重新安装一下就好了。

