# [CSP 指令——Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy)

## 概述

CSP 指令指的是 HTTP 响应头：`Content-Security-Policy`。

该响应头允许站点管理者控制用户代理（通常是浏览器）能够为指定的页面加载哪些资源。

除了一些少数例外情况，通常设置的策略（Policy）主要涉及指定服务器的源和脚本结束点，这将帮助防止跨站脚本攻击（`Cross-Site Script`）（[XSS](https://developer.mozilla.org/en-US/docs/Glossary/XSS)）。

如需更多信息，请查阅[Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)。

## 语法

`Content-Security-Policy: <policy-directive>; <policy-directive>`

## 指令

指令分为多种，分别是：

1. **[获取指令](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E8%8E%B7%E5%8F%96%E6%8C%87%E4%BB%A4%EF%BC%9AFetch_directives)：参见：[Fetch directives](https://developer.mozilla.org/zh-CN/docs/Glossary/Fetch_directive)**
   
   通过获取指令来控制某些可能被加载的确切的资源类型的位置。

2. [**文档指令：Document directives**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E6%96%87%E6%A1%A3%E6%8C%87%E4%BB%A4_Document_directives)
   
   文档指令管理文档属性或者worker环境应用的策略。

3. [**导航指令：Navigation directives**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E5%AF%BC%E8%88%AA%E6%8C%87%E4%BB%A4_Navigation_directives)
   
   导航指令管理用户能打开的链接或者表单可提交的链接

4. [**报告指令**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E6%8A%A5%E5%91%8A%E6%8C%87%E4%BB%A4)
   
   报告指令控制 CSP 违规的报告过程。
   
   更多请看 [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) 报头。

5. [**其他指令：Other directives**](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E5%85%B6%E4%BB%96%E6%8C%87%E4%BB%A4_Other_directives)
   
   不属于以上四种的指令。

## [CSP 和 Workers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#CSP_%E5%92%8C_Workers)

- [Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)：指的是 Worder 接口是 [Web Workers API ](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)的一部分，是一种可由脚本创建的后台任务，任务执行中可以向其创建者收发信息。

[Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker) 一般来说不会被创建它的文档*（或者 不会被父级的 Worker）*的CSP策略管理；如果要为 Worker 指定CSP策略，可以为 Worker 脚本的请求的响应的头部设置CSP 策略。 

例外的情况是：如果 Worker 脚本的来源是一个全局唯一ID*（比如，Worker 的  URL 是一个结构化的数据或者 [BLOB 类文件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)）*，

那么在这种情况下，这个 Worker 会继承它所属的文档的 CSP 策略；或者创建它*（也是 Worker，只不过是子级）*的 Worker（*这个 Worker 是父级）* 的 CSP 策略。

## 多内容安全策略

CSP 允许在一个资源中指定多个策略, 包括通过 `Content-Security-Policy` 头, 以及 [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only) 头，和 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta) 组件。

你可以像以下实例一样多次调用 `Content-Security-Policy` 头。 特别注意这里的 [`connect-src`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src) 指令。 

尽管第二个策略允许连接, 第一个策略仍然包括了 `connect-src 'none'`。添加了附加的策略后，只会让资源保护的能力更强，也就是说不会有接口可以被允许访问，等同于最严格的策略，`connect-src 'none'` 强制开启。

```html
<!-- 请用 源代码模式 查看：ctrl + / -->
Content-Security-Policy: default-src 'self' http://example.com;
                         connect-src 'none';
Content-Security-Policy: connect-src http://example.com/;
                         script-src http://example.com/
```

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E7%A4%BA%E4%BE%8B)

示例：禁用不安全的内联/动态执行, 只允许通过 https 加载这些资源 (images, fonts, scripts, etc.)

```html
// header
Content-Security-Policy: default-src https:

// meta tag
<meta http-equiv="Content-Security-Policy" content="default-src https:">
```

示例：已经存在的一个网站，用了太多内联代码修复问题，而且想确保资源只从 https 加载，并且禁止插件：

```html
Content-Security-Policy: default-src https: 'unsafe-eval' 'unsafe-inline'; object-src 'none'
```

示例：还没有开始实施上面的策略；相反，只是开始上报可能会发生违反安全策略的行为：

```html
Content-Security-Policy-Report-Only: default-src https:; report-uri /csp-violation-report-endpoint/
```

查看 [Mozilla Web Security Guidelines](https://wiki.mozilla.org/Security/Guidelines/Web_Security#Examples_5) 上的更多例子.
