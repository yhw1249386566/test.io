# 什么是 Websocket?

websocket 是一个新的协议，基于 TCP 派生而来的。

> RFC6455 中具有定义：
>
> 『The protocol consists of an opening handshake followed by basic message framing, layered over TCP.』

但是 Websocket 协议和 HTTP 协议的协议体是非常相似的，并且 Websocket 协议是兼容 HTTP 协议的。

# 为什么要创建新的 Websocket 协议？

初次接触 WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

答案很简单，因为 HTTP 协议有一个缺陷：通信只能由客户端发起。即：只有客户端向服务器发送一个请求，服务器才能返回一个响应，不论这中间过程如何，它们之间的关系都是一对一，不变的。

HTTP 协议无法做到让服务器主动向客户端发送信息。这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦，比如：如果想实现一个简单的双端通信（即时通讯），就需要用到“轮询”，而短轮询是非常消耗性能的，长轮询（长连接）又对多个用户同时进行即时通讯不友好，因为 Websocket 协议诞生了。

它用来解决 HTTP 协议无法做到双向实时通信的问题。

TIPS：HTTP/0 -> 单工通信，HTTP/1->半双工通信，HTTP/2->全双工通信

- [单工通信](https://baike.baidu.com/item/%E5%8D%95%E5%B7%A5%E9%80%9A%E4%BF%A1) ：

- [半双工通信](https://baike.baidu.com/item/%E5%8F%8C%E5%90%91%E4%BA%A4%E6%9B%BF%E9%80%9A%E4%BF%A1?fromtitle=%E5%8D%8A%E5%8F%8C%E5%B7%A5%E9%80%9A%E4%BF%A1&fromid=10924584)：双发都能发送且接收消息，但双方不能同一时间进行发送和接收消息

  HTTP 协议：由客户端发送消息，服务端返回响应（可以认为是一种发送给客户端的消息）

- [全双工通信](https://baike.baidu.com/item/%E5%85%A8%E5%8F%8C%E5%B7%A5%E9%80%9A%E4%BF%A1/8752822)：双方都能发送且接收消息，并且能同一时间发送、接受消息。

# HTTP/2 和 Websocket

HTTP/2 和 Webscoket 都是全双工通信，那么它们二者的区别和共同点是什么呢？

## 区别

应用场景不同

HTTP2虽然支持服务器推送资源到客户端，但那不是应用程序可以感知的，主要是让浏览器（用户代理）提前缓存静态资源，所以我们不能指望 HTTP2 可以像 WebSocke t建立双向实时通信。

# Preference

- [Websocket 教程-阮一峰](https://www.ruanyifeng.com/blog/2017/05/websocket.html) 
- [Websockets-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API)  
- [Websocket-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 







