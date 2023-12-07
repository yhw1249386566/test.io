# Mac 中启动 Android 模拟器失败

如果你不是通过 Android Studio 安装的 sdk，则其路径可能不同，请自行确定清楚

```
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

- [配置环境变量](https://reactnative.cn/docs/next/environment-setup#3-%E9%85%8D%E7%BD%AE-android_home-%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)

- 这只对一个终端生效，关闭终端此环境就没了。

# HTTP 支持

目前，新版 IOS 或 Android 系统都不支持 http 请求，可以使用一下做法支持。

TIP: 有时 React Native 似乎直接允许 HTTP 请求。

## IOS

https://segmentfault.com/a/1190000002933776

## Android

- `/android/app/src/main/AndroidManifest.xml` application 配置 `android:networkSecurityConfig="@xml/network_security_config"`

- 创建 `/android/app/src/main/res/xml/network_security_config.xml`

- 在 `network_security_config.xml` 配置

```
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```

# 安装库、修改配置等操作不生效

对于 Android 和 IOS 来说，通常需要重新 build 即可。

## Android

- [可选]: `cd android && ./gradlew clean`

- ` yarn android`

如果是物理设备，则需要删除设备上的应用程序，重新安装。

## IOS

- `cd ios && pod install`

# APP 改名

## Android

1.  在 `android/app/src/main/AndroidManifest.xml` 找到 `android:label`,

    此配置指的就是 Android App Name.

`android:label="@string/app_name"`:

`@string/`: `/android/app/src/main/res/values/strings.xml`.

`app_name` 指的是 `strings.xml` 中 `name="app_name"`

即: 对于 `AndroidManifest.xml` 中带有 `@/` 的配置，都可以在 `/android/app/src/main/res` 找到对应配置

2. `npx react-native run-android`

# 什么时候需要重新 build ios / build android

在一个库会修改原生代码时，需要重新 build, 比如: `react-native-vector-icons`.

如果一个库不会修改原生代码，只是提供新功能，就不用 build, 比如: `moment`

TIP: 并不是所有组件库都需要重新 build, 比如: react-native-step-indicator

# Error

- `ViewProps ERROR`: React Native Svg 不适应 React Native 0.72+ 版本的问题

- [Failed to install the app. Make sure you have the Android development environment ](https://stackoverflow.com/questions/56891033/facing-issue-failed-to-install-the-app-make-sure-you-have-the-android-develop)

  解决方法：

  ```bash
  cd android
  ./gradlew clean
  ```

  ​ 通常环境有问题，都是因为代理软件不够稳定造成的。
  ​ 通常环境有问题，都是因为代理软件不够稳定造成的。

- LOG Running "AwesomeProject" with {"rootTag":41}  
  ERROR Invariant Violation: "AwesomeProject" has not been registered. This can happen if:

* Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.
* A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called., js engine: hermes

可能是 `/index.js` 没有正确注册 App，查看是否正确注册。

- "RNCSafeAreaProvider" was not found in the UIManager.

如果是物理设备无线连接本地服务器，那么此错误可能是由于你物理设备上对应的 APP 版本太旧。

解决方法：删除物理设备现有 APP，重新使用有线连接，重新安装 APP，再启动即可，

# 在 build 中出现莫名错误

## Android

`npx react-native android` 出现错误:

- cd android && ./gradlew clean

- 在打开的 Node.js 终端中，看到 info JS server already running，请按回车

  以及在你启动 android 时的终端，也要时刻注意按回车。

# 物理设备中启动项目失败

通过 wifi 启动失败

1. `adb reverse tcp:8081 tcp:8081`

   建立本地和设备之间的端口转发（端口映射），即: 设备上的应用可以通过 localhost:8081 访问到本地主机 8081 的端口号。
   第 1 个 8081: 本地主机端口号。
   第 2 个 8081: 设备上的端口号。

2. `yarn start`

如果还不行，那么重新安装 App

1. 卸载手机 APP, 重新将手机连接到电脑，并打开手机 USB 调试模式。

2. 在终端中进入项目目录: `adb devices` 查看是否有手机设备

3. build: 使用 `npx react-native run android`

   将会自动在手机上安装 App。

4. 重新通过 wifi 启动或直接使用有线连接启动。
