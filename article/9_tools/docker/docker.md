# 名词注解

- 镜像（Image） ：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
- 容器（Container） ：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
- 仓库（Repository） ：仓库可看成一个代码控制中心，用来保存镜像。
- Docker：指的是 Docker 这个应用软件
- docker：指的是通过 Docker 创建的一个沙盒/集装箱（一个由 Docker 创建的实例）

  二者区别：区别在于这个实例达成的目的不同。

镜像和容器：先有镜像再有容器，一个镜像可以有多个容器，每个容器都是保持独立的；一个容器只允许存在一个镜像（好吧，一个容器可以有多个镜像，但记住：这不是一种好方法）

# 概念

Docker 是一个开源的应用容器引擎，Docker 允许你把应用运行在创建的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

- [Docker](https://docs.docker.com/get-docker/) 

  一个能为用户提供创建沙盒的平台。

- docker

  docker：一个沙盒，里面有一些环境，这些环境将能让你的应用程序正常跑起来；每一个 docker 都是一个沙盒/集装箱，docker 能帮你隔离系统和其他 docker，并为你的应用程序提供上下文，让程序能正常跑起来。



# Use

## [镜像使用](https://www.runoob.com/docker/docker-image-usage.html) 

### 创建新的镜像

`$ docker build` 

使用命令 **docker build** ， 从零开始来创建一个新的镜像。为此，我们需要创建一个 Dockerfile 文件，其中包含一组指令来告诉 Docker 如何构建我们的镜像。

每一个指令都会在镜像上创建一个新的层，每一个指令的前缀都必须是大写的。

FROM，指定使用哪个镜像源

RUN 指令告诉docker 在镜像内执行命令，安装了什么。

然后，我们使用 Dockerfile 文件，通过 docker build 命令来构建一个镜像。

### Docker 中运行 ubuntu 镜像并进入终端机交互

目的：你想要在本地使用 Docker 运行一个 ubuntu 镜像

1. `docker pull ubuntu`

   从 Docker 仓库中拉取 ubuntu 镜像

2. `$ docker run -it ubuntu /bin/bash`

   启动容器，并进入使用 -it 命令进入 ubuntu 的终端，且使得该终端具有交互效果。

TIP：若没有 `-i`，则进入终端后无法交互，甚至连 exit 都无法起效。

### 创建自己的 Docker 镜像

你写了个应用，然后将它 push 到 Docker 的仓库中，接着你可以使用 `$ docker pull repo-name` 将仓库作为镜像拉取到本地的 Docker 应用中，最后再使用 `$ docker run imageName`，即可使用指定的镜像启动在容器中。

## [Dockerfile 文件](https://www.runoob.com/docker/docker-dockerfile.html) 

TIP：Dockerfile 的指令每执行一次都会在 docker 上新建一层。所以过多无意义的层，会造成镜像膨胀过大。

# Referecence

- [runoob-docker](https://www.runoob.com/docker/docker-tutorial.html) 
- [Docker](https://docs.docker.com/get-docker/) 
- [如何通俗解释Docker是什么？](https://www.zhihu.com/question/28300645/answer/585166942) 
