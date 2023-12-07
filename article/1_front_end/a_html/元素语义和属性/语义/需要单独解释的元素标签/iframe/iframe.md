# [iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#%E5%AE%9A%E4%BD%8D%E5%92%8C%E7%BC%A9%E6%94%BE)

## 什么是iframe

iframe元素是HTML中的内联框架元素,表示嵌套的浏览上下文([Browsing Context](https://developer.mozilla.org/zh-TW/docs/Glossary/Browsing_context),通常指html页面.),所以iframe元素又可以称之为浏览上下文(页面)的容器.

- [浏览上下文](https://www.w3.org/html/ig/zh/wiki/HTML5/browsers)(或[参考这](https://developer.mozilla.org/zh-TW/docs/Glossary/Browsing_context)):一个浏览器展示文档(页面document对象)的环境,通常来说,这个环境指的是当前浏览器的标签,但是也可能是一个窗体或是一个框架中的页面,就如我们现在所讲的iframe元素一样.

每个iframe元素都存在一个嵌套的浏览上下文,即:一个html页面或者null*(即使不指定src属性,仍然会创建一个存在基本标签的文档,该文档存在完整的环境).*

也就是说iframe元素可以将另一个html页面嵌入到当前的页面中,即使嵌入的html页面走的是ftp协议(本地的html文件),也依然能嵌入.

且每一个嵌入的html页面(浏览上下文)都有自己的[会话历史记录](https://developer.mozilla.org/zh-CN/docs/Web/API/History)和[DOM树](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Using_the_W3C_DOM_Level_1_Core).

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\需要单独解释的元素标签\iframe\picture/iframe.png)

## **[子浏览上下文](https://whatwg-cn.github.io/html/multipage/browsers.html#%E5%B5%8C%E5%A5%97%E6%B5%8F%E8%A7%88%E4%B8%8A%E4%B8%8B%E6%96%87)**

如果一个iframe元素的[(包括)shadow的根（shadow root)](https://dom.spec.whatwg.org/#concept-shadow-including-root)是一个html页面*(浏览上下文)*A,且B也嵌入于该iframe元素中*(不在存于shadow的根中)*,且iframe元素是[已连接的](https://dom.spec.whatwg.org/#connected),

则我们将B*(浏览上下文)*称之为A*(存在于shadow的根中的浏览上下文)*的子浏览上下文(*即子页面*)

## 为什么不要使用多个iframe

由于对于iframe元素中的嵌入的浏览上下文来说,每个嵌入的浏览上下文都有自己的[会话历史记录](https://developer.mozilla.org/zh-CN/docs/Web/API/History)和[DOM树](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Using_the_W3C_DOM_Level_1_Core)(完整的文档环境),所以页面上的每个iframe元素都会增加内存消耗和其它计算资源.

*即使不写src属性也是一样的,因为iframe元素仍然会创建一个有基本元素的页面.详见: 什么是iframe元素*

:zap: 虽然理论上来说,你能够在代码中写出来无限多的iframe元素,但是嵌入多个iframe元素时,你最好还是先看看这么做会不会导致某些性能问题.

## iframe的属性

iframe元素除了包含全局属性之外,还存在以下属性:

### src

被嵌套的页面的 URL 地址。

使用 about:blank 值可以嵌入一个遵从[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)的空白页。

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\需要单独解释的元素标签\iframe\picture/空白页ablout-black.png)

在 Firefox （version 65及更高版本）、基于 Chromium 的浏览器、Safari/iOS 中使用代码移除 iframe 的 src 属性（例如通过 [`Element.removeAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/removeAttribute) ）,

将会导致 `about:blank` 被载入iframe,即iframe元素将会嵌套一个只存在最基本的元素标签的空白页面,如上图所示.

### name

用于定位嵌入的浏览上下文的名称,即规定要嵌入的html页面的名称.

该名称可以用作a标签与form标签的 target 属性值，也可以用作input 标签和 button标签的 formtarget 属性值，

即单击a标签会跳转到iframe元素中指定的url去(会在新标的浏览器标签中打开),其他三个标签也是类似的效果.

```html
<iframe name="ifrmae" src="http://www.whyhw.com"></iframe>
<a href="../iframe.html" target="iframe">11</a>
```

且该属性还可以用作 [`window.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) 方法的 windowName 参数值。

### srcdoc (HTML5中的元素)

该属性是一段HTML代码，这些代码会被渲染到 iframe生成的document中。

如果浏览器不支持 srcdoc 属性，则会渲染 src 属性表示的内容。

如:

```html
<iframe name="ifrmae" src="http://www.whyhw.com" 
        srcdoc="
        	<em>
            	您的浏览器支持srcdoc属性
        	</em>
">
</iframe>
```

在支持该属性的浏览中(如chrome,firefox,360极速浏览器),显示的是斜体:您的浏览器支持srcdoc属性; 而不是该网址http://www.whyhw.com中的内容.

而不支持该属性的浏览器*(如IE 11.1039.17763.0, Edge 44.17763.831.0)*,将会显示http://www.whyhw.com该网址的内容.

需要注意的是,srcdoc属性中的标签仍然处于一个完整的文档(页面中).

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\需要单独解释的元素标签\iframe\picture/srcdoc.png)



### allow

用于为iframe元素指定其[特征策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/策略特征).

- 特征策略:提供了一种机制去声明哪些功能可以通过你的网络,且是可以被用的（或者不被使用的）。

  这就允许你通过特征策略的该用处,来很好的锁定功能，即使代码很老，或者包含第三方的内容。



### referrerpolicy

表示在获取 iframe 资源时如何发送 [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) 首部.

该属性的有关值,请参见: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

### sandbox

该属性对呈现在 iframe 框架中的内容启用一些额外的限制条件。

属性值可以为空字符串（这种情况下会启用所有限制），也可以是用空格分隔的一系列指定的字符串。

该属性的有关值,请参见: [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe)

### 两个历史遗留属性

#### allowfullscreen

设置为`true`时，可以通过调用iframe的[`requestFullscreen()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen) 方法激活全屏模式。

这是一个历史遗留属性，已经被重新定义为 `allow="fullscreen"`

#### allowpaymentrequest

设置为`true`时，跨域的iframe 就可以调用 [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)。

这是一个历史遗留属性，已经被重新定义为 `allow="payment"`.

### 实验性属性

#### csp

对嵌入的资源配置[内容安全策略](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)。 查看 [`HTMLIFrameElement.csp`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/csp) 获取详情。

#### importance 

表示iframe元素的 `src` 属性指定的资源的加载优先级。允许的值有：

- `auto` (default)

  不指定优先级。浏览器根据自身情况决定资源的加载顺序

- `high`

  资源的加载优先级较高

- `low`

  资源的加载优先级较低

## 如何阻止一个网页别嵌入其iframe中

### 描述

我们知道有些恶意的开发者将别人的网页嵌入到iframe中,然后使用一些CSS样式和脚本让其用户在浏览器该iframe时,无法得知原来的网站,这是令人深恶痛觉的,所以在此,我给出以下办法

### 用脚本阻止iframe元素索引某个网页

```js
if (window != window.top) {
    window.top.location.replace(window.location)
    // 这是直接代替外窗，你也可以干别的
}
```

```js
if (top != self) {
    top.location = self.location;
}
```

### [设置HTTP响应头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/X-Frame-Options)	



