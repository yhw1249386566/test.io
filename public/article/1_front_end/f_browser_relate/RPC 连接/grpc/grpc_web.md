# 概念

gRPC 实现了 rpc.

gRPC 最初由谷歌开发，是一个高性能远程过程调用框架，基于 HTTP/2 实现。但由于浏览器没有直接暴露 HTTP/2，所以 Web 应用程序不能直接使用 gRPC。gRPC- Web 是一个标准化协议，它解决了这个问题，可以在浏览器中使用 gRPC。

1. 前端编译 `.proto` 文件为：`*_pb.js`，`*_grpc_web_pb.js` .

2. 在客户端导入此两个文件，并实例化后端暴露出来的1个/多个 class，并传入要访问的 URL.

   ```js
   // client.js
   const { HelloRequest, HelloReply } = require("./helloworld_pb.js");
   const { GreeterClient } = require("./helloworld_grpc_web_pb.js");
   
   var client = new GreeterClient("http://localhost:8080");
   ```

3. 后端会启动一个服务，用来代理我们访问的 `url:port`，此代理的作用是用来把前端发出的请求转换成后端能识别的格式。

   即：后端监听 9090 端口，前端访问 8080 端口，后端通过代理，映射到 9090 端口，从而触发后端的回调函数，后端处理完成之后，再返回响应，最终前端收到此响应，完成一次请求过程。

   注意：后端处理完成后，再返回响应这一步骤，具体是如何返回的，可能是：

   - 返回响应给 9090，通过代理将响应转发到 8080，前端就能接收到响应。

# 快速开始

参考 [hello word 示例](https://github.com/grpc/grpc-web/tree/master/net/grpc/gateway/examples/helloworld)。

## Mac 中的使用

1. 安装 [gprc web](https://github.com/grpc/grpc-web/releases) 插件

   选择 darwin-x86_64

2. 安装 protoc

   `brew install protoc` 使用该命令要先安装 [brew](https://brew.sh/index_zh-cn).

3. 打开 Terminal（终端），输入: `open /usr/local/bin` 打开 bin 目录

4. 将 gprc web 插件重命名为 `protoc-gen-grpc-web` 并移动到 bin 目录

5. 打开终端，使用 `sudo chmod +x /usr/local/bin/protoc-gen-grpc-web` 命令将 grpc-web 插件弄成可执行文件。

将 `.protoc` 文件编译成 js 的例子： 现在 `test` 文件夹下有一份 `helloworld.protoc` 文件，编译成 js，步骤如下：

1. 打开终端，输入 `cd test` 

2. `sudo protoc -I=. helloworld.proto --js_out=import_style=commonjs:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.`

   注意：若在该步骤提示 gprc-web 插件没权限打开，则进入：`系统偏好设置 - 安全性与隐私 -通用 - 将 [允许从以下位置下载的 App] 中显示的 grpc-web 插件允许打开即可`。

编译好之后，你将会看到如下两份文件：

- `helloworld_grpc_web_pb.js` 
- `helloworld_pb.js `

在使用编译好的 `.js` 文件时，你可能需要到以下开发依赖包：

```json
  "devDependencies": {
    "@grpc/grpc-js": "~1.1.8",
    "@grpc/proto-loader": "~0.5.4",
    "google-protobuf": "~3.14.0",
    "grpc-web": "~1.3.1",
  }
```

## windows 使用

参见：[此处](https://segmentfault.com/a/1190000023699243) 

# hello world 示例：服务，客户端，docker 的关系

1. node ./server.js

   跑后端服务，绑定端口，绑定后可以监听端口，如：9090

   若出现错误: `No address added out of total 1 resolved`，则说明此端口无法绑定。

2. 跑 docker

   它将 指定端口(server.js 中配置)转发到 指定端口(envoy.yaml 中配置)

   即：将 8080 端口转发到 9090 端口

3. 运行一个 web 服务（client.js）

   `python3 -m http.server 8081 &`  

   client.js 中将监听 8080 端口，docker 会帮我们将它转发到 9090 端口，从而得到 9090 端口的数据。

打开：`localhost:8081` 网址。

- 后端绑定 9090
- 前端监听 8080
- docker 将前端监听的 8080 转发到 9090，从而实现前端得到后端数据

# Reference 

- [grpc web 官网](https://github.com/grpc/grpc-web) 
