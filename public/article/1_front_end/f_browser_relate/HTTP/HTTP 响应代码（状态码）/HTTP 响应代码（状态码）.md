# [状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

## 描述

这里讲的状态码(status)指: 服务器接客户端发送过来的请求并将该请求处理完成后的一个表示.

即表示该请求是否处理成功,或者说该请求目前的状态是什么?

有意思的是,HTTP协议中给出的状态码是无法更改的,但是其状态码的解释可以更改,这并不违反协议,例如:你完全可以将404解释成服务器出现问题,而不是因为页面丢失的原因,但是大家通常都不这么干,没有意义.

## 状态码的大致返回值的作用

1xx:：保留，将来使用。

2xx：成功 － 操作被接收、理解、接受（received, understood, accepted）。

3xx：重定向（Redirection）－ 要完成请求必须进行进一步操作。

4xx：客户端出错 － 请求有语法错误或无法实现。

5xx：服务器端出错 － 服务器无法实现合法的请求。

参见:[RFC文档.](http://www.kaiyuanba.cn/content/develop/rfc/RFC1945.htm)