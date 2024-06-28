# [HTTP 访问控制（CORS）](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

## [CORS 概念](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)

### 描述

CORS：Cross-Origin Resource Sharing，跨域资源共享。

CORS 是一个系统，它由一系列传输的 [HTTP头 ](https://developer.mozilla.org/en-US/docs/Glossary/Header)组成，这些 HTTP 头决定**浏览器是否阻止**前端 JavaScript 代码获取跨域请求的响应。

虽然 [同源安全策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) 默认阻止“跨域”获取资源，但是 CORS 给了 web 服务器这样的权限：即**服务器**可以选择，允许跨域请求访问到它们的资源。

注：使用 CORS 是解决跨域的手段之一，并不是唯一手段。以下是网上的解决方案：

- 通过 jsonp 跨域 (通过注入 `script`, 使得 get 请求能跨域)
- document.domain + iframe 跨域
- location.hash + iframe
- window.name + iframe 跨域
- postMessage 跨域
- nginx 代理跨域(通过反向代理)
- nginx代理跨域
- nodejs 中间件代理跨域
- WebSocket 协议跨域

### CORS 头

服务端响应头

- [`Access-Control-Allow-Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) 

  指示请求的资源能共享给哪些域。

- [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) 
  指示浏览器此次对**跨域**请求的响应, 是否允许暴露给前端 JS 代码.
  ​
  即: 若此次请求使用了 [credentials](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials), 且值为 `include`, 那么这个响应头需要为 `true`, 浏览器才会允许响应内容返回给 JS, 否则浏览器将阻止响应返回给 JS.
  **注意:** 这里强调了是跨域请求, 是因为对于同源请求, 浏览器不会检查 CORS 请求头和响应头的设置, 所以除了 `credentials: omit` , 浏览器都会发送凭据(Cookie, authorization headers 或 TLS client certificates).

- [`Access-Control-Allow-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)

  用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。

- [`Access-Control-Allow-Methods`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Methods)

  指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。

- [`Access-Control-Expose-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)

  指示哪些 HTTP 头的名称能在响应中列出。

- [`Access-Control-Max-Age`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Max-Age)

  指示预请求的结果能被缓存多久。

客户端请求头

- [`Access-Control-Request-Headers`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Headers)

  用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。

- [`Access-Control-Request-Method`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Request-Method)

  用于发起一个预请求，告知服务器正式请求会使用哪一种 [HTTP 请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)。

- [`Origin`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Origin)

  指示获取资源的请求是从什么域发起的。

## 描述

跨域资源共享（[CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS)） 是一种机制，它使用额外的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Glossary/HTTP) 头来让（服务器）告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。

当一个资源 从 与该资源本身所在的服务器**不同的域、协议或端口** 请求一个资源时，资源会发起一个**跨域 HTTP 请求**。

- domain：域，通常指站点主机，如：`www.whyhw.com`，这里的域就是 whyhw。

比如，站点 `http://domain-a.com` 的某个 HTML 页面通过 \<img> 标签的 src 属性请求 `http://domain-b.com/image.jpg`，那么显而易见：这个 \<img> 标签发起了一个跨域的 HTTP 请求。

实际上，网络上的许多页面都会加载来自不同域的CSS样式表，图像和脚本等资源。

出于安全原因，浏览器限制从脚本内发起的跨源 HTTP 请求。 

例如：XMLHttpRequest 和 Fetch API 遵循同源策略；这意味着使用这些 API 的Web应用程序只能从加载应用程序的同一个域请求 HTTP 资源，除非响应报文包含了正确CORS响应头。

 （译者注：这段描述不准确，并不一定是浏览器限制了发起跨站请求，也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了。）

跨域资源共享（ [CORS](https://developer.mozilla.org/zh-CN/docs/Glossary/CORS) ）机制允许 Web 应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。

现代浏览器支持在 API 容器中（例如 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) ）使用 CORS，以降低跨域 HTTP 请求所带来的风险。

需要注意的是：配置 CORS 需要服务端的配合，即：服务端来配置 CORS，使得前端 JavaScript 代码能跨域请求，也就是说：服务端声明了 “安全的客户端域名有哪些”，浏览器才会把带着 Cookie 的请求发给服务器，否则浏览器可不敢发送，万一请求一个钓鱼网站，那不就是糟透了？

注：即使是 JSONP，其实也是服务器端和客户端代码联合起来把跨域访问变成跨域资源下载。或者说是把应该 AJAX 完成的事情变成了下载一个 JS 文件，所以SONP也是需要服务器端配合的

## [什么情况下需要 CORS？](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E4%B8%8B%E9%9C%80%E8%A6%81_CORS_%EF%BC%9F)

跨域资源共享标准（ [cross-origin sharing standard](http://www.w3.org/TR/cors/) ）允许在下列场景中使用跨域 HTTP 请求：

- 前文提到的由 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 发起的跨域 HTTP 请求。
- Web 字体(CSS 中通过` @font-face `使用跨域字体资源), [因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用](https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements)。
- [WebGL 贴图](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)
- 使用 `drawImage` 将 Images/video 画面绘制到 canvas

本文概述了跨域资源共享机制及其所涉及的 HTTP 头（参见：[原文](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)）

## [CORS 标准与其功能概述](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E5%8A%9F%E8%83%BD%E6%A6%82%E8%BF%B0)

跨域资源共享标准新增了一组 HTTP 首部字段，允许服务器声明哪些源站通过浏览器有权限访问哪些资源。

另外，规范要求，对那些可能对服务器数据产生副作用的 HTTP 请求方法（特别是 [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 以外的 HTTP 请求，或者搭配某些 MIME 类型的 [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 请求），浏览器必须首先使用 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS) 方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。

服务器确认允许之后，才发起实际的 HTTP 请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 [Cookies ](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)和 HTTP 认证相关数据）。

CORS请求失败会产生错误，但是为了安全，在 JavaScript 代码层面是无法获知到底具体是哪里出了问题，你只能查看浏览器的控制台以得知具体是哪里出现了错误。

接下来的内容将讨论相关场景，并剖析该机制所涉及的 HTTP 首部字段。

## [若干访问控制场景](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E8%8B%A5%E5%B9%B2%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E5%9C%BA%E6%99%AF)

这里，我们使用三个场景来解释跨域资源共享机制的工作原理。这些例子都使用 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 对————例子请参见：[若干访问控制场景](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E8%8B%A5%E5%B9%B2%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6%E5%9C%BA%E6%99%AF)（简单请求、预检请求、附带身份凭证的请求 各一个例子）

### [简单请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)

简单请求也就是不会触发 [CORS 预检请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%A2%84%E6%A3%80%E8%AF%B7%E6%B1%82)的请求，请注意：该术语并不属于 [Fetch](https://fetch.spec.whatwg.org/) （其中定义了 CORS）规范，这“简单请求”只是我们单方面的定义的术语。

​    若请求满足所有下述条件，则该请求可视为“简单请求”：

- 使用下列方法之一：

  - [`GET`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET) 
  - [`HEAD`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD) 
  - [`POST`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST) 

- 除了被用户代理自动设置的首部字段（例如 `Connection`，`User-Agent`）和在 Fetch 规范中定义为 [禁用首部名称](https://fetch.spec.whatwg.org/#forbidden-header-name) 的其他首部，允许人为设置的字段为 Fetch 规范定义的 [对 CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)。

  该集合为：

  - [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
  - [`Accept-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)
  - [`Content-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)
  - [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) （需要注意额外的限制）
  - `DPR`
  - `Downlink`
  - `Save-Data`
  - `Viewport-Width`
  - `Width`

- `Content-Type` 的值仅限于下列三者之一：

  - `text/plain`
  - `multipart/form-data`
  - `application/x-www-form-urlencoded`

- 请求中的任意[`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象均没有注册任何事件监听器；[`XMLHttpRequestUpload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequestUpload) 对象可以使用[`XMLHttpRequest.upload`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/upload) 属性访问。

- 请求中没有使用 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream) 对象。

**注意:** 这些跨域请求与浏览器发出的其他跨域请求并无不同。如果服务器未返回正确的响应首部，则请求方不会收到任何数据。因此，那些不允许跨域请求的网站无需为这一新的 HTTP 访问控制特性担心。

WebKit Nightly 和 Safari Technology Preview 为[`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept), [`Accept-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language), 和 [`Content-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language) 首部字段的值添加了额外的限制。

如果这些首部字段的值是“非标准”的，WebKit/Safari 就不会将这些请求视为“简单请求”。

WebKit/Safari 并没有在文档中列出哪些值是“非标准”的，不过我们可以在这里找到相关讨论：

- [Require preflight for non-standard CORS-safelisted request headers Accept, Accept-Language, and Content-Language](https://bugs.webkit.org/show_bug.cgi?id=165178),
- [Allow commas in Accept, Accept-Language, and Content-Language request headers for simple CORS](https://bugs.webkit.org/show_bug.cgi?id=165566), 
- [Switch to a blacklist model for restricted Accept headers in simple CORS requests](https://bugs.webkit.org/show_bug.cgi?id=166363)。

其它浏览器并不支持这些额外的限制，因为它们不属于规范的一部分。

例子参见：[简单请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E7%AE%80%E5%8D%95%E8%AF%B7%E6%B1%82)

### [预检请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%A2%84%E6%A3%80%E8%AF%B7%E6%B1%82) 

预检请求：要求必须首先使用 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)  方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求，即：当服务器通过预检请求时，浏览器就可以发送实际请求，从而获取有用的数据。

预检请求的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响，因为预检请求使用的 [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)  方法不会对服务器资源产生影响，它是 HTTP/1.1 协议中定义的方法，用以从服务器获取更多信息。

例子参见：[预检请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%A2%84%E6%A3%80%E8%AF%B7%E6%B1%82)

#### 预检请求与重定向

大多数浏览器不支持针对于预检请求的重定向。如果一个预检请求发生了重定向，浏览器将报告错误：

> The request was redirected to 'https://example.com/foo', which is disallowed for cross-origin requests that require preflight

> Request requires preflight, which is disallowed to follow cross-origin redirect

CORS 最初要求该行为（即：报错这一行为），不过[在后续的修订中废弃了这一要求](https://github.com/whatwg/fetch/commit/0d9a4db8bc02251cc9e391543bb3c1322fb882f2)。在浏览器的实现跟上规范之前，有两种方式规避上述报错行为：

- 在服务端去掉对预检请求的重定向；
- 将实际请求变成一个简单请求。

如果上面两种方式难以做到，我们仍有其他办法：

- 发出一个简单请求（使用  [Response.url](https://developer.mozilla.org/en-US/docs/Web/API/Response/url) 或 [XHR.responseURL](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL)）以判断真正的预检请求会返回什么地址。
- 发出另一个请求（真正的请求），使用在上一步通过[Response.url](https://developer.mozilla.org/en-US/docs/Web/API/Response/url) 或 [XMLHttpRequest.responseURL](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseURL)获得的URL。

不过，如果请求是由于存在 Authorization 字段而引发了预检请求，则这一方法将无法使用。这种情况只能由服务端进行更改。

### [附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)  

[XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 与 CORS 的一个有趣的特性是：可以基于  [HTTP cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) 和 HTTP 认证信息发送身份凭证。

一般而言，对于跨域 [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 请求，浏览器**不会**发送身份凭证信息。

如果要发送凭证信息，需要设置 `XMLHttpRequest `的 `withCredentials = true` 特殊标志位。

例子参见：[附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)

#### [附带身份凭证的请求与通配符](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82%E4%B8%8E%E9%80%9A%E9%85%8D%E7%AC%A6) 

**目的：**要不要在请求头中携带 Cookie (身份凭证信息, Cookie 只是其中一种) 发送给后端。	

对于附带身份凭证的请求，服务器不得设置 `Access-Control-Allow-Origin` 的值为“`*`”。

这是因为附带身份凭证的请求头中携带了 `Cookie` 信息，如果 `Access-Control-Allow-Origin` 的值为“`*`”，请求将会失败。

而将 `Access-Control-Allow-Origin` 的值设置为指定的域（domain，如： `http://foo.example`），则请求将成功执行。

另外，响应头若也携带了 Set-Cookie 字段，则尝试对 Cookie 进行修改, 如果操作失败，将会抛出异常。

#### 第三方 cookies

注意：在 CORS 响应中设置的 cookies 适用一般性第三方 cookie 策略。在上面的例子*（例子参见：[附带身份凭证的请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82)）*中，页面是在 `foo.example` 加载，

但是第 20 行的 cookie 是被 `bar.other` 发送的，如果用户设置其浏览器拒绝所有第三方 cookies，那么将不会被保存。

- 第 20 行：

  `Set-Cookie: pageAccess=3; expires=Wed, 31-Dec-2008 01:34:53 GMT`

意思为：该行先是被服务器通过响应报文给了客户端，然后客户端就会保存该 cookie。

在以后的请求中，若该 cookie 未过期，则该 cookie 会被客户端直接使用（即：直接附加在请求中，传给服务端，而不需要重新在服务端下载），

也就是说，该 cookie 会被 bar.other（客户端）发送，但是如果用户设置其浏览器拒绝所有第三方 cookies，那么将不会被保存。

## [HTTP 响应头字段 - 用于跨域请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#http_%E5%93%8D%E5%BA%94%E6%A0%87%E5%A4%B4%E5%AD%97%E6%AE%B5)

响应首部字段指的是：当客户端发出的请求到服务端，服务端接收请求并法除响应报文，其中：响应报文中的响应头，就是设置响应首部字段的地方。

### [Access-Control-Allow-Credentials](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#access-control-allow-credentials) 

目的：要不要在请求头中携带 Cookie (身份凭证信息, Cookie 只是其中一种) 发送给后端。	

如果请求的发出带有 `credentials`, 那么请求的响应头必须返回 `Access-Control-Allow-Credentials: true`, 否则浏览器对于发出的请求的响应将不会返回给 JavaScript 代码.

即: [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials) 头指定了当浏览器的 `credentials` 设置为 `true/false` 时是否允许浏览器读取 response 的内容

例子:

```js
fetch('xxxx', {
	credentials: true // 此请求带有 credentials
})
```

## [HTTP 请求头字段 - 用于跨域请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#http_%E8%AF%B7%E6%B1%82%E6%A0%87%E5%A4%B4%E5%AD%97%E6%AE%B5)

和 [HTTP 响应头字段 - 用于跨域请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#http_%E5%93%8D%E5%BA%94%E6%A0%87%E5%A4%B4%E5%AD%97%E6%AE%B5) 响应首部字段指的是 类似，[HTTP 响应头字段 - 用于跨域请求](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#http_%E5%93%8D%E5%BA%94%E6%A0%87%E5%A4%B4%E5%AD%97%E6%AE%B5) 是客户端发送给服务端的请求报文中，请求报文的请求头所配置的。

## [HTTP 请求头](https://developer.mozilla.org/zh-CN/docs/Glossary/Header)

- 什么是消息？***参见：HTTP 消息.md，***

  即：指的是请求报文和响应

在前文——HTTP 响应头和请求头字段两节中，我们已经知道跨域请求和响应的大概配置内容会有什么，现在让我们来了解一下，HTTP 首部有什么用吧。

**HTTP header**（HTTP 首部，HTTP 头）表示在 HTTP 请求或响应中用来传递附加信息的字段，修改所传递的消息/消息主体（***参见：HTTP 消息.md，即：指的是请求报文和响应***）的语义，或者使其更加精确。

通常来说，我们将请求和响应报文的 HTTP head 称之为：请求头或响应头。

消息首部不区分大小写，开始于一行的开头，后面紧跟着一个 `:` 和与之相关的值（键：值，这样的形式）。字段值在一个换行符（CRLF）前或者整个消息的末尾结束（即：一行就是一个字段值，或者一个消息就是一个字段值）。

按照惯例，可以把消息首部（即：请求/响应报文 首部）分为几类，尽管这种划分不存在于任何一份规范文档中：

- [General header](https://developer.mozilla.org/en-US/docs/Glossary/General_header)：通常/一般首部（头），可以应用于请求和响应中，但是与在消息主体中的数据无关。
- [Request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)：请求首部（头），含有与所要获取的资源或者客户端自身相关的附加信息。
- [Response header](https://developer.mozilla.org/en-US/docs/Glossary/Response_header)：响应首部（头），含有与响应相关的附加信息，比如它的位置或者与服务器相关的信息（名称、版本号等）。
- [Entity header](https://developer.mozilla.org/en-US/docs/Glossary/Entity_header)：实体首部（头），含有与消息主体相关的附加信息，比如长度或者MIME类型。

一个仅包含一个首部的请求：

```bash
# 请求行
GET /example.http HTTP/1.1 
# 请求头（header 或 首部），以 键:值 的形式表现。
Host: example.com
```

一些典型的响应首部：

```html
304 Not Modified
Access-Control-Allow-Origin: *
Age: 2318192
Cache-Control: public, max-age=315360000
Connection: keep-alive
Date: Mon, 18 Jul 2016 16:06:00 GMT
Server: Apache
Vary: Accept-Encoding
Via: 1.1 3dc30c7222755f86e824b93feb8b5b8c.cloudfront.net (CloudFront)
X-Amz-Cf-Id: TOl0FEm6uI4fgLdrKJx0Vao5hpkKGZULYN2TWD2gAWLtr7vlNjTvZw==
X-Backend-Server: developer6.webapp.scl3.mozilla.com
X-Cache: Hit from cloudfront
X-Cache-Info: cached
```

# FAQ

## 跨域请求不携带 cookie 的问题

- 前端需要设置 [credentials: include](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials) - 对于 fetch
  对于 XHR 则需要设置: [withCredentials: true](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/withCredentials) 

- 服务端响应头则需要设置:

  `Access-Control-Allow-Origin: <origin>` 
  授权的访问源
  `Access-Control-Max-Age: <delta-seconds>` 
  预检授权的有效期，单位：秒
  `Access-Control-Allow-Credentials: true | false` 
  是否允许携带 Cookie
  `Access-Control-Allow-Methods: <method>[, <method>]*` 
  允许的请求动词
  `Access-Control-Allow-Headers: <field-name>[, <field-name>]*`
  额外允许携带的请求头
  `Access-Control-Expose-Headers: <field-name>[, <field-name>]*` 
  额外允许访问的响应头

注意: `Access-Control-Allow-Origin: *` 是无效的, [跨域请求时, 响应头不允许设置为通配符](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS#%E9%99%84%E5%B8%A6%E8%BA%AB%E4%BB%BD%E5%87%AD%E8%AF%81%E7%9A%84%E8%AF%B7%E6%B1%82%E4%B8%8E%E9%80%9A%E9%85%8D%E7%AC%A6), 必须指定具体的源. 

TIP: 如果仍然不能解决跨域请求不携带凭据(比如: cookie) 的问题, 则: 

- 设置 Cookie 时配置了: domain, path, Expires/Max-Age 等.
- 浏览器的问题, 浏览器版本存在缺陷 - 重启电脑, 更新浏览器, 换电脑重试.
- 浏览器禁用了 cookie
- 浏览器插件有问题
- 浏览器隐藏了 cookie.

# Reference

- MDN上的 [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) --HTTP 访问控制（CORS）

- 维基百科上的 [Cross-origin resource sharing](https://zh.wikipedia.org/wiki/Cross-origin resource sharing) --- 跨域资源共享

- [HTTP head（HTTP 首部）](https://developer.mozilla.org/zh-CN/docs/Glossary/Header)