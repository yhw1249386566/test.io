# 前言

请保持全局 VPN 开启，环境搭建失败的 99% 原因是因为网络问题。

# 安装 Android Studio

如果是第一次安装：

1. 选择 Custom / 或默认设置（Standard）

   这里选择 Custom 是为了自定义 Android SDK 安装位置。

- 对于预安装虚拟机（最后有 1、2 个 GB 大小的设置），可以选择不勾选，后面自行安装。

- 官方说配置的环境变量都是指的是 用户变量（对当前用户可见），但是我们可以配置 系统变量（对所有用户可见），或者一起配置都可以。

# FAQ

## HXAM

> Intel® HAXM installation failed. To install Intel® HAXM follow the instructions found at: https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows

用于让 Android 模拟器拥有更佳性能的工具，可以依照链接所指内容下载，或不下载。

## 安装 Gradle 失败

打开了全局代理，仍然安装失败：

1. 打开 Android Studio

2. File - Settings - 搜索 Proxy, 选择第 2 个 —— 自动设置代理

3. 点击 Ok 即可。

如果自动配置代理不行：

1. 选择第 3 个: Manual proxy configuration

![](.//picture/手动配置代理.png)

2. 然后点击 Check connection, 搜索: `https://play.google.com/store?hl=zh-CN/`, 如果代理配置成功，则会弹出连接成功的提示。

注：这里的主机名、端口号是自己全局代理来的，如 Clash for Windows

![](.//picture/clash复制终端命令.png)

在弹出的窗口中，选择 CMD 即可复制成功。

## :app:compileDebugJavaWithJavac Failed

Android

1. 打开 Android Studio

2. 使用 Android Studio 打开项目中的 android 文件夹

3. 在 Android Studio 的右下角你将可以看到此项目正在 build, 等 build 完成。

   注：如果没有 build, 查看左下角 - Sync - 右击 android - Reload Gradle Project, 等待完成即可。

4. 回到项目, `cd android && ./gradlew clean`, 再 `npx react-native run android` 即可。

如果仍然出现一些莫名的错误，请重复第 4 个步骤，或查看其他解决方式。
