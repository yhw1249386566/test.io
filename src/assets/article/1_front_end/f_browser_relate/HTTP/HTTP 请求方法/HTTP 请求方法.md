# HTTP 请求方法

- get 和 post 请求方法在浏览器中和它们本身的区别，参见：
  
  ***<get和post.md>***

HTTP 定义了一组**请求方法**, 以表明要对给定资源执行的操作。

指示针对给定资源要执行的期望动作. 虽然他们也可以是名词, 但这些请求方法有时被称为 HTTP 动词。

每一个请求方法都实现了不同的语义，但一些共同的特征由一组共享：例如一个请求方法可以是 [safe](https://developer.mozilla.org/zh-CN/docs/Glossary/safe)、 [idempotent](https://developer.mozilla.org/zh-CN/docs/Glossary/幂等)、或 [cacheable](https://developer.mozilla.org/en-US/docs/Glossary/cacheable).

- [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET)
  
  GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据.

- [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD)
  
  HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体.

- [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)
  
  POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用. 

- [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT)
  
  PUT方法用请求有效载荷替换目标资源的所有当前表示。

- [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE)
  
  DELETE方法删除指定的资源。

- [CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT)
  
  CONNECT方法建立一个到由目标资源标识的服务器的隧道。

- [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)
  
  OPTIONS方法用于描述目标资源的通信选项。

- [TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE)
  
  TRACE方法沿着到目标资源的路径执行一个消息环回测试。

- [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH)
  
  PATCH方法用于对资源应用部分修改。

# 另见

与该文章相关的有：

- [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)，或参见：<HTTP 消息（请求报文和响应报文）.md>