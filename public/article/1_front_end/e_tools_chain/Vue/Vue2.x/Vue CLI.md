# [Vue Cli](https://cli.vuejs.org/zh/guide/)

https://juejin.im/post/6844903552519766029)

## 概念

### HTML 和静态资源

#### [url 转换规则](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#url-%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99)

- 如果 URL 是一个绝对路径 (例如 `/images/foo.png`)，它将会被保留不变。

- 如果 URL 以 `.` 开头，它会作为一个相对模块请求被解释且基于你的文件系统中的目录结构进行解析。

- 如果 URL 以 `~` 开头，其后的任何内容都会作为一个模块请求被解析。这意味着你甚至可以引用 Node 模块中的资源：

  ```html
  <img src="~some-npm-package/foo.png">
  ```

- 如果 URL 以 `@` 开头，它也会作为一个模块请求被解析。它的用处在于 Vue CLI 默认会设置一个指向 `/src` 的别名 `@`。**(仅作用于模版中)**

## 创建脚手架时选择的配置

[linter / formatter 配置选择](https://blog.csdn.net/NancyFyn/article/details/106259338)

[选择 vue-router 的两种模式的区别](
