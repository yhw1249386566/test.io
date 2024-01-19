# HTTP Cookie

## 作用

HTTP Cookie 是服务器端发送给浏览器端的一小部分数据，浏览器接收到这个数据之后，可以存起来自己用，也可以在后续发送到server端进行一些数据的校验。

一般来说，cookies用在三个方面：

1. session的管理，用来保存登录状态，从而让HTTP请求可以带上状态信息。
2. 用户自定义的设置，这些用户特殊的字段，需要保存在cookies中。
3. 跟踪用户的行为信息。

注意：对于同源请求时, 浏览器会自动加入 cookies 中的数据([credentials](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials) 默认值为 `same-site` -> 参见: [HTTP 访问控制(CORS)](https://www.whyhw.com/feature/article/1_front_end/f_browser_relate/HTTP/HTTP 访问控制(CORS)/HTTP 访问控制(CORS).md#heading-1)-[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS))，所以如果 cookies 中存储了太多的数据，就会导致服务器性能的下降。

## 格式

响应报文：`Set-Cookie: <cookie-name>=<cookie-value>`

例如：

```bash
# 响应报文
HTTP/2.0 200 OK
Content-Type: text/html
Set-Cookie: name=yomua
Set-Cookie: site=www.whyhw.com## 
```

响应报文：`Cookie:<cookie-name>=<cookie-value>`

```bash
# 请求报文
GET /love.html HTTP/2.0
Host: www.whyhw.com
Cookie: name=yomua; site=www.whyhw.com
```

- 注意：这里的 请求报文 中的 Cookie **不需要手动设置**，而是用户代理会自动带上。

## 流程

1. 浏览器发送请求

2. 服务端响应报文返回 Set-Cookie 头

3. 浏览器接收到 Set-Cookie 内容，自动设置到浏览器的 cookie

4. 浏览器发送请求时，自动携带 Cookie 发送给服务端

5. 服务端接收到 Cookie 并处理。

# Reference

- [HTTP Cookie - HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
