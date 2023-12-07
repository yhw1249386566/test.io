# 前言

由于 react-native [更新频繁](https://reactnative.cn/versions)（一个月更新一次版本），所以本文档仅供参考，正式的请以官方文档-[EN](https://reactnative.dev/docs/getting-started)-[CN](https://reactnative.cn/docs/getting-started)作为标准使用。

注：尽管您的项目可能会因为 react-native 更新频繁而导致放弃新版本的 RN(react-native 的简写)，但是笔者/官方仍然建议使用最新版本的 RN，即使这会导致您在迁移项目时的困难，但这是最好的，因为旧版本的 RN 将不被开发团队维护更新（缺人和资源）

> 由于 RN 的频繁更新，故本文档尽可能不讲解详细的技术内容，而只是提供思路或解决办法。

# [什么是 React Native](https://reactnative.cn/docs/getting-started)

React- Native（也称为 RN）是依赖于 React，基于 JavaScript 的一个移动应用程序框架，它允许您为 iOS 和 Android 构建原生渲染的移动应用程序。

简单来说，你可以使用 RN 来编写 iOS 或 Android 或其他平台的 App，并且只需要编写一套代码即可多端运行。

注意：RN 编写的应用本质上是一个 native（原生）应用，但是由于中间需要经过解析（将 JS 代码解析为原生代码），所以性能上与 Native App 相比还是略逊一筹。

# 开发 RN 前所需知识

开发 RN 前首先需要你具备以下基本知识：

- JavaScript、HTML5、CSS3
- React、Node
- Android 和 iOS 开发的基本知识
- 等一些其他相关技术栈

接着就是需要准备开发环境，由于环境搭建过于繁琐，所以请直接看[官方文档-搭建开发环境](https://reactnative.cn/docs/environment-setup)；

当环境搭建完成后，你就可以开始使用任意编译器（推荐 [VSCode](https://code.visualstudio.com/)）做你的代码开发工作；

若你想知道如何创建一个新 RN 项目或运行一个已有的 RN 项目，请参见[此处](https://reactnative.cn/docs/environment-setup)（模拟器的使用也可参见）；

# 开发 RN 和开发 React 的区别

由于 RN 是依赖于 React，所以 React 需要的环境 RN 也需要，并且 RN 还需要准备有关 iOS or Android 的相关开发环境；除此之外 RN 本身具有一些[原生组件](https://reactnative.cn/docs/components-and-apis)和[相关 API](https://reactnative.cn/docs/accessibilityinfo)。

实际上，仅以开发体验本身来说，除了你可能需要从 Web -> Mobile 以外，几乎没有体验上的差别；

值得注意的是：使用 RN 开发时，开发者可能不能随心所欲创建组件，而需要使用 RN 提供或相关社区提供的原生组件来作为你的组件，用于显示在 iOS 和 Android 中，否则若你以一个简单的 React 组件使用于 RN 项目中，该组件可能在 iOS 或 Android 上有 UI 以及兼容性等各种问题。

并且需要知道的是，由于 Mobile 并不想 Web 端那样有浏览器的支持，所以无法使用浏览器特有的 BOM 以及元素，如：div, p,span...这些元素自然无法使用，当然你可以使用 \<View />, \<Text /> 这些 RN 的原生组件来替代它们。

# 会 React 如何快速上手 React Native

在假设你会 React 的前提下，上手 React Native 是非常快的。

你完全可以将 React Native 的开发认为是组件的“搭积木”，换成 React 话来说就是：直接使用别人的组件，传递相应的 props 和写一些 state，来使得页面具有交互性，再用接口获取点数据，让页面动态起来。

很简单不是吗？只谈上手 RN，这是非常快的，掌握好 RN 组件的功能，以及组件对应的 prop，和看一看样式如何编写，那么这就和写 React 一样。

# 术语

- [原生组件](https://reactnative.cn/docs/intro-react-native-components#%E5%8E%9F%E7%94%9F%E7%BB%84%E4%BB%B6)

  RN 中指的原生组件是：封装了`在 Android 开发中使用 Kotlin 或 Java 编写的视图`、`在 iOS 开发中使用Swift 或 Objective-C 编写的视图`的相关视图组件。

  大概就是在代码构建中使用 React 组件，代码通过 RN 运行时，RN 就会为这些 React 组件创建相应的 Android 和 iOS 视图。

  RN 允许您为自己创建原生组件，而 RN 自身提供的组件也是原生组件，或称之为核心组件（RN 的）

  这意味着原生组件是跨平台的！

# 快速开始

**React Native CLI 直接搭建**

1. 安装[开发环境](https://reactnative.cn/docs/environment-setup)

2. `npx react-native init OwnProjectName` 使用 npx 初始化一个新的 RN 项目

   > 如果你是想把 React Native 集成到现有的原生项目中，则步骤完全不同，请参考[集成到现有原生应用](https://reactnative.cn/docs/integration-with-existing-apps)。

   选择指定版本的 RN 或某项目模板来创建 RN 项目：

   `npx react-native init AwesomeProject --version X.XX.X`

   `npx react-native init AwesomeTSProject --template react-native-template-typescript`

3. 准备 iOS 或 Android 手机或对应的模拟器来运行程序。

**expo - [基本搭建](https://docs.expo.dev/get-started/create-a-project/)**

使用 Expo 后，Expo 不允许你对 Android 或 IOS 原生代码进行操作。

1. 安装[开发环境](https://reactnative.cn/docs/environment-setup)
2. `npx create-expo-app my-app`
3. `npx expo start`
   启动开发服务器，通过手机端 Expo 扫描二维码，就可以运行在手机上。

**expo - [prebuild](https://docs.expo.dev/workflow/prebuild/)**

即：使用 expo 帮我们打包、启服务这些，但是仍然保留 React Native 对原生的操作能力。

1. 安装[开发环境](https://reactnative.cn/docs/environment-setup)
2. `npx create-expo-app my-app`
3. `npx expo prebuild`
4. `npx expo start`
   启动开发服务器，通过手机端 Expo 扫描二维码，就可以运行在手机上。

- `npx expo run:android` | `npx expo run:ios`
  这两个命令将会打开对应的模拟器，并将程序运行模拟器上。

# 调试

## 在物理设备上调试 React Native

[有线](https://reactnative.cn/docs/running-on-device#android-50-%E5%8F%8A%E4%BB%A5%E4%B8%8A%E4%BD%BF%E7%94%A8-adb-reverse-%E5%91%BD%E4%BB%A4-1) - 由 React Native CLI 搭建

1. 做好准备工作
2. 通过数据线将物理设备和电脑相连
3. 打开手机开发者模式，并允许 USB 调试
4. 在项目根目录输入 `adb devices` 查看所有可连接的设备，并查看物理设备是否在列表中。
5. 项目根目录运行 `adb reverse tcp:8081 tcp:8081`
   将 Android 设备上的 8081 端口与本地计算机上的 8081 端口进行转发，让设备上的应用程序可以通过 8081 端口访问本地开发服务器提供的 JavaScript 包。
6. 运行 `npx react-native run-android` 启动调试

TIP: 请不要连接多个调试设备，否则可能会有问题。即：使用 `adb devices` 出现多个设备。

[无线](https://reactnative.cn/docs/running-on-device#android-50-%E4%BB%A5%E4%B8%8B%E9%80%9A%E8%BF%87-wi-fi-%E8%BF%9E%E6%8E%A5%E4%BD%A0%E7%9A%84%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8-1) - 由 React Native CLI 搭建

1. 做好准备工作
2. 已经通过数据线将物理设备和电脑相连过一次，并且正确安装了对应 App
3. 确保电脑和手机设备在**同一个 Wi-Fi 环境**下（这样即使一方/双方都开了代理也仍然有效）
4. 在手机设备运行安装的 app，并**摇晃手机**，这会打开开发者菜单。
   摇晃之前，会看到一个“红屏”错误提示。
5. 点击 `Change Bundle Location`，输入计算机的 IP 地址和对应端口号，比如：`192.168.1.1:8081`.
   **在 Mac 上**，你可以在系统设置/网络里找查询你的 IP 地址。**在 Windows 上**，打开命令提示符并输入`ipconfig ` 来查询你的 IP 地址。**在 Linux 上**你可以在终端中输入 `ifconfig `来查询你的 IP 地址。
   端口号：通常使用 React Native CLI 启动的本地开发服务器，端口号为：`8081`，或者你可以自己指定：`react-native start --port 8000`
6. 回到**开发者菜单**然后选择 `Reload JS`

## 在模拟器上调试

Android

由于 Android Studio 自带的安卓模拟器太卡，所有采用[雷电模拟器](https://www.ldmnq.com/)来调试。

- 下载完雷电模拟器之后，需要在右上角 - 软件设置 - 性能设置 - 分辨率 - 手机版，选择任意分辨率，点击保存设置，重启雷电模拟器即切换到手机版。

- 在项目的终端中，使用 `adb devices` 查看雷电模拟器是否连接成功，如果没成功，则重启电脑。

# 打包

## 简单打包

### Android

[React Native 打包](https://reactnative.cn/docs/signed-apk-android#%E7%94%9F%E6%88%90%E5%8F%91%E8%A1%8C-apk-%E5%8C%85)

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

以上命令将会在根目录生成 `/android/app/build` 文件夹，其中 apk 文件在 `build/apk/release`

TIP: 如果更改了 android 文件夹，需要再重新执行一次以上命令。

# 会 React 但不熟 React Native

当你是一个对 React 有经验但对 React Native 还是新手的人，以下是从零开始搭建一个 React Native 项目并确保未来可扩展性的一般步骤：

1. **准备环境**：

   - 安装 Node.js：确保你已经安装了 Node.js。你可以从官方网站下载并安装 Node.js。
   - 安装 npm 或 Yarn：npm 是 Node.js 的默认包管理器，但你也可以选择使用 Yarn。安装 npm 或 Yarn，以便安装项目依赖。

2. **安装 React Native CLI**：

   - 使用 npm 或 Yarn 全局安装 React Native CLI。运行以下命令之一：
     ```
     npm install -g react-native-cli
     ```
     或
     ```
     yarn global add react-native-cli
     ```

3. **创建新项目**：

   - 运行以下命令来创建新的 React Native 项目，将"YourApp"替换为你的项目名称：
     ```
     react-native init YourApp
     ```

4. **项目结构**：

   - 探索新项目的文件结构，主要关注`index.js`、`App.js`和`package.json`文件。

5. **开发**：

   - 打开`App.js`文件，并开始开发你的应用程序。React Native 使用 React 的组件模型，所以你会在 React Native 中使用类似的组件和状态管理。

6. **模拟器/设备测试**：

   - 使用 Android 模拟器或 iOS 模拟器（或实际设备）来测试你的应用程序。你可以使用`react-native run-android`（Android）或`react-native run-ios`（iOS）来启动应用程序。

7. **学习 React Native**：

   - 学习 React Native 的基础知识，包括组件、样式、路由、状态管理等。官方文档是一个很好的起点。

8. **安装依赖库**：

   - 根据项目需求，使用 npm 或 Yarn 来安装第三方依赖库，例如导航库、状态管理库、图形库等。

9. **组件重用**：

   - 鼓励组件的重用。将组件分解为可复用的部分，以提高可扩展性。

10. **测试和调试**：

    - 使用调试工具和测试框架来确保应用程序的质量。React Native 有许多用于测试和调试的工具。

11. **版本控制**：

    - 使用版本控制工具（如 Git）来管理项目的源代码。

12. **文档和注释**：

    - 为代码编写文档和注释，以便自己和其他开发人员更容易理解代码。

13. **构建和发布**：

    - 学习如何构建和发布 React Native 应用程序。对于 Android，你需要生成 APK 或 AAB 文件，对于 iOS，你需要配置证书和发布到 App Store。

14. **继续学习**：

    - 不断学习 React Native 的高级主题，如性能优化、原生模块集成、安全性等。

15. **参考文档和社区**：

    - React Native 社区非常活跃，你可以在 GitHub、Stack Overflow、论坛和博客中找到丰富的资源和解决方案。

16. **可扩展性**：

    - 在项目的早期考虑应用程序的架构和组织方式，以便在未来易于扩展。使用分层架构、状态管理工具和模块化代码来提高可扩展性。

17. **自动化测试**：

    - 考虑引入自动化测试，包括单元测试和端到端测试，以确保未来的更 改不会破坏现有功能。

总之，逐步学习并积累 React Native 经验，同时遵循最佳实践和不断改进你的项目，将帮助你构建可扩展、高质量的 React Native 应用程序。同时，积极参与 React Native 社区，寻求帮助和分享经验。

# Reference

- [react-native 中文网](https://reactnative.cn/docs/getting-started)
- [Native App、Hybrid App、React Native App、Web App 区别](https://zhuanlan.zhihu.com/p/34082051)
- [React Native 环境搭建详细过程](https://juejin.cn/post/7100099751755907102)
