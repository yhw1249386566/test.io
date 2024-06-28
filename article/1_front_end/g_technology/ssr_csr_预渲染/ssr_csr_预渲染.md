# SSR

## 概念

SSR：Server Side Rendering 服务端渲染。

SSR：解决 [FP 和 FMP](https://github.com/LuckyWinty/fe-weekly-questions/issues/56) 慢的问题，对于交互还是要靠浏览器重新渲染一遍 HTML 结构，从而完成事件绑定等交互操作。

SSR 的项目通常是由前端通过 [Node](https://nodejs.org/en) 实现，并且通常会将前端的静态资源和 node 混在一起写。

- 即：如果没有 SSR 时，前端项目只需要负责对组件、CSS、JS 等这些静态资源的开发。
  但是如果要写 SSR，前端项目还需要引入 node，在 node 中编写接口，当访问此接口时返回 html 给前端，前端再渲染。

## 流程

前端服务器：部署前端资源的服务器，比如：部署 js, css, html, 图片等。

后端服务器：部署后端资源的服务器，比如：提供接口请求的代码。

以下忽略后端流程：

1. 浏览器向前端服务器请求页面
2. 前端服务器向后端请求数据
3. 前端服务器拿到数据后，在 node 中将数据和 React 进行关联，并将最后的 React  组件实例转成 html 返回给浏览器
4. 浏览器拿到 html 之后就解析并绘制
   注意：此时 **FP 和 FMP 已经完成**，但是还差 TTI(Time to Interactive ，可交互时间)
5. 浏览器在解析 SSR 返回的 html 时，若里面存在  \<script>，那么浏览器同时也会向此 \<script/> 的 [src 指向的地址发送请求](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web/How_the_Web_works#%E8%A7%A3%E6%9E%90%E7%BB%84%E6%88%90%E6%96%87%E4%BB%B6%E7%9A%84%E9%A1%BA%E5%BA%8F)，请求 JS 资源。
   注意：这个 \<script> 是在 ssr 时，由 node 插入到返回的 html 中的，用来绑定事件，做一些交互操作的。
6. 当浏览器成功获取到 JS 资源后，就开始边编译边执行。
7. 这个 JS 脚本会帮我们对服务端进行请求数据，绑定事件到 SSR 返回的 HTML 上，
   直到这一步（图中是第 11 步），**TTI 也完成了**。
8. 剩下的就是常规 SPA 该做的了，即用户做一些交互操作，JS 发送请求到后端，后端返回数据，前端 JS 拿到数据，然后用这份数据重新渲染 DOM，更新网页内容（图中 12，13，14 步骤）

![](/picture/ssr流程.png)

​																	(ssr流程)



一些想法，但还未整理：

- 前端的资源（JS，CSS，HTML，图片，React 组件等）将和 node 耦合。

- 通过在前端写 node，然后浏览器通过地址 `whyhw.com` 访问前端服务器，会触发 `/` 路由请求，然后这个请求可能会去访问后端，得到数据，通过这个数据去渲染同构组件，并将带有数据的同构组件转成 html。

  然后会有个 .js 文件使用 React 的 API，用来将同构组件通过 webpack 编译成一个新的 js 文件，用来让前端执行，以为 SSR 渲染的 html 绑定事件。
  会将此 js 文件插入到 SSR 渲染的 html 中，比如：`<script src ='main.js'>`

  前端拿到 html  后，浏览器会解析并绘制，并请求 \<script> 的 src 指向的 main.js，然后浏览器会边编译边执行 main.js，此时就会绑定事件到同构组件上。
  因为 main.js 是由同构组件通过 React API 编译出来的，React 会帮我们处理这个。

- 同构：
  有一个公共组件 A ，node 会把组件 A 转成 html，返回给前端，搞定 FP 和 FMP。

  组件 A 将通过 React API，webpack 被编译成 js.
  前端将拿到 html，浏览器将渲染 html 并加载里面，组件 A 编译过后的 JS 文件，执行这份 JS 文件，让 JS 找到 html 中应该有的事件并重新绑定。

- 为什么要有同构？

  因为在服务端不能绑定事件

  1. 服务端没有dom，不能绑定事件

     服务端返回的是字符串

     服务端没有script
  
- 注水和脱水
  即：服务端将初始数据共享给客户端需要同构的组件。
  也是利用同构的原理。
  当服务端返回 html 后，浏览器拿来渲染，但是此时渲染的 html 是没有带数据的，不进行注水和脱水，只是为此 html 绑定了事件，但没有初始化数据。
  所以在服务端返回 html 的时候，我们还需要在返回的 html 中插入 \<script> 指定一个脚本，在这个脚本中将初始数据注入到浏览器的 window 对象，比如: `window._INIT_STATE = {name:'yomua'}` ，然后当浏览器执行这个 \<script/> 的时候，`_INIT_STATE` 就被附加到 window 对象了，在 window._INIT_STATE 这个 \<script/> 中，也就可以通过 `window_INIT_STATW` 拿到数据，从而带数据的渲染组件。



## Reference

- [知乎](https://zhuanlan.zhihu.com/p/357538660) 
- [页面渲染指标](https://web.dev/user-centric-performance-metrics/) 

