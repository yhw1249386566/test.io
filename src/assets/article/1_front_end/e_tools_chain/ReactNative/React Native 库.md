# [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons)

此库配置对于没有接触过原生开发的人而言，有些麻烦。

[all icons](https://oblador.github.io/react-native-vector-icons/)

## [ios](https://github.com/oblador/react-native-vector-icons#ios-setup)

需要在 Apple 公司的设备上才能安装此库

- `cd ios && pod install`

## [Android](https://github.com/oblador/react-native-vector-icons#android-setup)

配置完成后，需要重新 build.

- [可选]: `cd android && ./gradlew clean`

- `yarn android`

## [React Navigation](https://reactnavigation.org/docs/getting-started)

需要安装

- react-native-screens

  React Navigation 核心

- @react-navigation/native
- react-native-safe-area-context

  由 [React Navigation 官网](https://reactnavigation.org/docs/getting-started)推荐

- @react-navigation/native-stack

  创建堆栈导航的模块

- react-native-gesture-handler

  这个库属于其他库的依赖库，不安装启动不了项目

如果需要底部导航栏：

- `yarn add @react-navigation/bottom-tabs`
