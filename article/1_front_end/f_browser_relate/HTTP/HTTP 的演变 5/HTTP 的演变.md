# [HTTP 的发展](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)

**HTTP（**HyperText Transfer Protocol）是万维网（World Wide Web）的基础协议。

自 Tim Berners-Lee 博士和他的团队在1989-1991年间创造出它以来，HTTP 已经发生了太多的变化，在保持协议简单性的同时，不断扩展其灵活性。

如今，HTTP 已经从一个只在实验室之间交换文件的早期协议进化到了可以传输图片，高分辨率视频和3D效果的现代复杂互联网协议。

## [万维网的发明](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#%E4%B8%87%E7%BB%B4%E7%BD%91%E7%9A%84%E5%8F%91%E6%98%8E)

1989年， 当时在 CERN 工作的 Tim Berners-Lee 博士（[蒂姆·伯纳斯-李](https://zh.wikipedia.org/zh/蒂姆·伯纳斯-李)）写了一份关于建立一个通过网络传输超文本系统的报告。这个系统起初被命名为 *Mesh*，在随后的1990年项目实施期间被更名为万维网（*World Wide Web）。*它在现有的TCP和IP协议基础之上建立，由四个部分组成：

- 一个用来表示超文本文档的文本格式，*[超文本标记语言](https://developer.mozilla.org/en-US/docs/Web/HTML)*（HTML）。
- 一个用来交换超文本文档的简单协议，超文本传输协议（HTTP）。
- 一个显示（以及编辑）超文本文档的客户端，即网络浏览器。第一个网络浏览器被称为 *WorldWideWeb。*
- 一个服务器用于提供可访问的文档，即 *httpd* 的前身。

这四个部分完成于1990年底，且第一批服务器已经在1991年初在CERN以外的地方运行了。 1991年8月16日，Tim Berners-Lee 在公开的超文本新闻组上发表的文章被视为是万维网公共项目的开始。

HTTP在应用的早期阶段非常简单，后来被称为HTTP/0.9，有时也叫做单行（one-line）协议。

## HTTP 协议版本

HTTP 协议是有很多个版本，如：

- HTTP/0.9 – [单行协议](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#HTTP0.9_%E2%80%93_%E5%8D%95%E8%A1%8C%E5%8D%8F%E8%AE%AE)
- HTTP/1.0 – [构建可扩展性](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#HTTP1.0_%E2%80%93_%E6%9E%84%E5%BB%BA%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7)
- HTTP/1.1 – [标准化的协议](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#HTTP1.1_%E2%80%93_%E6%A0%87%E5%87%86%E5%8C%96%E7%9A%84%E5%8D%8F%E8%AE%AE)
- HTTP/2 - [为了更优异的表现 ](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#HTTP2_-_%E4%B8%BA%E4%BA%86%E6%9B%B4%E4%BC%98%E5%BC%82%E7%9A%84%E8%A1%A8%E7%8E%B0)
- HTTP 并没有停止进化，它的扩展性依然被用来添加新的功能，所以协议版本请根据你所在的年份去判别。

## HTTP 至今仍在活跃的原因

最主要的原因是因为 HTTP 协议的可扩展性、灵活性以及有着规范化组织对其进行了标准化。

正是因为这些原因，HTTP 协议从 [RFC 2616](https://tools.ietf.org/html/rfc2616) 发布于 1999年6月 以来，至今（2020-08-11）约有21年左右，其中另外两个文档 [RFC 7230](https://tools.ietf.org/html/rfc7230)-[RFC 7235](https://tools.ietf.org/html/rfc7235) 发布于2014年6月，作为HTTP/2的预览版本（已经投入使用了）

HTTP 协议足足稳定使用了 21 年，这是多么令人惊叹啊！

## HTTP 的基本用处

### [HTTP 用于安全传输](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#HTTP_%E7%94%A8%E4%BA%8E%E5%AE%89%E5%85%A8%E4%BC%A0%E8%BE%93)

### [HTTP 用于复杂应用](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#HTTP_%E7%94%A8%E4%BA%8E%E5%A4%8D%E6%9D%82%E5%BA%94%E7%94%A8)

### [放松 Web 的安全模型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP#%E6%94%BE%E6%9D%BEWeb%E7%9A%84%E5%AE%89%E5%85%A8%E6%A8%A1%E5%9E%8B)

## 后 HTTP/2 进化

随着 HTTP/2.x 的发布，就像先前的 HTTP/1.x 一样，HTTP 并没有停止进化，HTTP 的扩展性依然被用来添加新的功能。特别的，我们能列举出2016年里HTTP的新扩展：

- 对 Alt-Svc 的支持允许了给定资源的位置和资源鉴定，允许了更智能的CDN缓冲机制。
- [`Client-Hints`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Client-Hints) 的引入允许浏览器或者客户端来主动交流它的需求，或者是硬件约束的信息给服务端。
- 在 Cookie头 中引入安全相关的的前缀，现在帮助保证一个安全的 cookie 没被更改过。

HTTP 的进化证实了它良好的扩展性和简易性，释放了很多应用程序的创造力并且情愿使用这个协议。

今天的 HTTP 的使用环境已经于早期 1990 年代大不相同。HTTP 的原先的设计不负杰作之名，允许了 Web 在 25 年间和平稳健得发展；

修复漏洞，同时却也保留了使 HTTP 如此成功的灵活性和扩展性，HTTP/2 的普及也预示着这个协议的大好前程。



# [世界上的第一个网站](http://info.cern.ch/)

参见：[世界上的第一个网站](http://info.cern.ch/)

