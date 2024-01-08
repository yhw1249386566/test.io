[TOC]



# 名称规定

XHR = XMLHttpRequest

# 定义

一个综合了多项技术的浏览器端网页开发技术.

详情来源请看:

- 维基百科:[AJAX](https://zh.wikipedia.org/wiki/AJAX)
- W3C:[AJAX](https://www.w3school.com.cn/js/js_ajax_intro.asp)

# 描述

***当数据在浏览器与服务器之间进行交互的时候,这些数据只能是文本.(字符串)***

AJAX: Asynchronous JavaScript And XML,异步的JavaScript和XML.

虽说AJA中中的X是XML,而AJAX应用程序又可以使用XML来传输数据,

​	*(传输请求: 请求发送到XML/HTML/Json/PHP/Txt/ASP等文件的URL,然后它们响应并处理完必后返回数据,再由终端的JavaScript以正确方法处理数据)*

但是这并不代表其数据的格式就无法被代替了,

如JSON等就可以替换XML,成为另一种格式,形成所谓的AJAJ.即Asynchronous JavaScript And Json.)  另外的还有HTML,TXT,PHP,ASP等都行的.

而且虽说AJAX其名译为异步的,但是这并不代表客户端和服务器之间一定需要异步,这并不是必须的.(比如还能用同步,但是不建议使用,否则就没意义了,何况,某些浏览器中,已经将AJAX的同步弃用了.)

AJAX就如同定义说的那般一样,是一套多项技术的集合体,所以AJAX从来就不是编程语言,请一定要记住这一点,它是技术的集合体.

# 作用(优点)

- ***PS:存在于该 作用(优点)的无序列表解释AJAX的作用和优点.***

- AJAX最大的作用: 就是能够在不更新整个页面的前提下维护数据.

  使得Web应用程序能更为迅捷地回应用户动作,并避免了在网络上发送那些没有被改变的信息.

- AJAX并不需要任何浏览器插件,只需要用户允许JavaScript在浏览器上执行即可.

在传统的Web应用(没有实现AJAX技术等的应用)中: 我们允许用户端填写表单(form),当提交表单时就像网页服务器发送一个请求.

服务器接受并处理请求,然后送回一个新的处理完必的网页,但是显然这个做法浪费了许多宽带.

这是因为 用户提交的网页 和 服务器处理文完毕后的网页 中的大部分HTML代码是相同的,例如\<body> \<titile>等的各种元素,所以这才造成了宽带的浪费.

而由于每次用户和应用的交互都需要向服务器发送请求,且应用的回应时间依赖于服务器的回应时间(应用什么时候回应用户依赖于服务器什么时候回应应用),

又因为用户界面响应应用的回应也需要时间,而且这依赖于用户终端的性能等各种情况,这就导致:用户界面的响应往往比本机应用响应服务器回应慢得多.

这里忽略网速因素影响: 因为当我们触发一个事件(提交表单),觉得一个没有AJAX技术的Web应用很慢时,这并不是一定代表应用提交请求给服务器,服务器处理请求并回应应用速度慢,反之,这两者很可能早就完成了,那么为什么仍然慢呢?

​		*当然有时确实是服务器的问题,它同时处理来自很多终端的请求的情况等.,造成缓慢以及其他情况..(所以异步的好处就体现出来了,不必等待服务器响应JavaScript就能做自己的事情)*

这是因为由于终

端性能问题: 即应用响应了服务器所返还的数据,将此数据回应给用户(即用户解面)时的这个步骤因为性能限制导致呈现速度过慢,所以造成了用户感觉速度慢的原因.

> 比如: 在同一个网络下,用户在应用中触发一个请求事件:提交文件
>
> 此时应用将此请求事件发送给服务器,
>
> 服务器接收到了请求并处理完必请求后,再将处理完毕的数据返还给应用
>
> 应用接收到了来自服务器返还的请求后,最后将此新数据呈现给用户,即用户看到的用户界面.

很显然的根据以上例子,应用最后将新数据呈现给用户界面所需要的时间是最久的,而且再更冗长,繁琐的事件中,这个时间将会令人感到烦躁.原因在例子上面那段有说明. (总不能等待你响应完成我再做其他事情吧?)

所以必须想出一个解决办法,而AJAX技术由此而生.

- 使用AJAX技术的应用可以仅向服务器发送并取回必须的数据*（当然，你需要和服务端提前沟通，哪些是必要的！）*,并在客户端采用JavaScript处理来自服务器的回应.

  若此若做,这样服务器和浏览器之间交互的数据就大量减少,服务器回应更快,同时很多的处理工作可以在发出请求的客户端机器上完成.

  因此(Web)服务器的负荷也较少了.

- 若AJAX使用异步发送请求,则JavaScript不必必须等服务器响应,而是可以在服务器响应的这段时间内,可以: 执行其他脚本,或干其他任何事情,而在服务器响应完必返回响应时JavaScript才开始处理.

# 缺点

显然的,和cookie一样(<Cookie.md>,AJAX存在优点的情况下也有缺点.

- AJAX可能破坏浏览器的后退与加入收藏书签功能.

  ​	在动态更新页面的情况下，用户无法回到前一个页面状态，这是因为浏览器仅能记下历史记录中的静态页面.

  ​		*(譬如:[例子](https://www.w3school.com.cn/tiy/t.asp?f=js_ajax_first),在这个超链接所呈现的例子中,当我们动态修改网页的数据时,无法使用回退键,将整个网页/数据返还到未修改的状态,*

  ​		*这是由于局部刷新,网页本身并未发生实质性的页面跳转,永远停留在第一个地址,浏览器也不会记录history,自然连back键(回退见)都不能点。)*

  ​	一个被完整读入的页面与一个已经被动态修改过的页面之间的可能差别非常微妙；	

  ​	用户通常都希望单击后退按钮，就能够取消他们的前一次操作，但是在Ajax应用程序中，却无法这样做.

  ​	但是开发者已经有了各种办法解决此问题.

  ​	**解决AJAX动态更新无法回退:**

  ​	譬如:HTML5 之前的方法大多是在用户单击后退按钮访问历史记录时，通过创建或使用一个隐藏的IFRAME来重现页面上的变更。

  ​	*（例如，当用户在Google Maps中单击后退时，它在一个隐藏的IFRAME中进行搜索，然后将搜索结果反映到Ajax元素上，以便将应用程序状态恢复到当时的状态）。*

  ​	**至于关于无法将状态加入收藏或书签的问题:**

  ​	HTML5之前的一种方式是使用URL片断标识符（通常被称为锚点，即URL中#后面的部分）来保持追踪，允许用户回到指定的某个应用程序状态。

  ​	（许多浏览器允许JavaScript动态更新锚点，这使得Ajax应用程序能够在更新显示内容的同时更新锚点。）

  ​	HTML5 以后可以直接操作浏览历史，并以字符串形式存储网页状态，将网页加入网页收藏夹或书签时状态会被隐形地保留。

  ​	上述两个方法也可以同时解决无法后退的问题。

- AJAX本质上是一个浏览器端的技术,无可避免存在浏览器的兼容性问题. (这个可以解决,通过使用AJAX库即可)

- AJAX应用可能极难维护.

  ​	因为AJAX技术之主要目的在于局部交换客户端及服务器之间的数据。

  ​	如同传统之主从架构，无可避免的会有部分的业务逻辑会实现在客户端/部分在客户端,部分在服务器。

  ​	由于业务逻辑可能分散在客户端及服务器,且以不同之程序语言实现,这导致Ajax应用程序极难维护。

  ​	如有用户接口或业务逻辑之更动需求,再加上一个JavaScript/DOM/CSS之兼容性问题(每个浏览器的实现都有可能存在一些不同)

  ​	所以Ajax应用往往变成程序员的梦魇.	

- AJAX应用可能会陷入程序典型的多进程（process）或多线程（thread）的竞争（racing）问题

  ​    因为Ajax是以异步的方式向服务器提交需求.对服务器而言,其与传统的提交窗体需求并无不同,

  ​	而且由于是以异步之方式提交,如果同时有多个Ajax需求及窗体提交需求,将无法保证哪一个需求先获得服务器的响应。

  ​	所以程序员因此必须自行处理或在JavaScript里面动手脚以避免这类竞争问题的发生（如Ajax需求未响应之前，先disable提交按钮），这又不必要的增加了程序员的负担。

  ​	当前已知有自动处理此问题之开发框架似乎只有[ZK](https://zh.wikipedia.org/wiki/ZK)。

- 有一个不是缺点的缺点,即进行Ajax开发时, 网络延迟的选择.

  ​	即用户发出请求到服务器发出响应之间的间隔——需要慎重考虑。如果不给予用户明确的回应，

  ​	没有恰当的预读数据，或者对XMLHttpRequest的不恰当处理，都会使用户感到厌烦[7]。

  ​	通常的解决方案是，使用一个可视化的组件来告诉用户系统正在进行后台操作并且正在读取数据和内容。
  
  > ​		比如,浏览器的下载功能,当我们随意去一个网页中下载某个文件时,就需要向服务器提交请求,而这个请求通常来说也是异步请求.
  >
  > ​		但是你有没有发现,网页会弹出一个下载记录条提示你下载(从服务器返回的数据)到哪里了,是不是?
  >
  > ​		如果没有这个下载记录条,你有可能就会觉得"卡了",自己点击下载没有效果,你就会连续的点击,但是实际上,你已经提交过请求了,
  >
  > ​		而你连续点击下载时,就是重复多次提交请求,上一个请求可能会因为你当前的请求而终止,又可能出现多次成功提交请求导致重复下载数据的情况.
  >
  > ​		你电脑就会因为一直被占用太多的资源,导致宕机.
  >
  > ​		所以异步下载数据时,给用户一个积极的响应是很有必要的.

# AJAX框架分类

前面说到AJAX的缺陷: 多线程/多进程 竞争资源的问题可以使用ZK框架来解决,这里我们就讲一下AJAX框架的分类.

## 针对业务逻辑分散

在缺点中,我们说过有些项目的业务逻辑可能太分散了,所针对业务逻辑分散这点,AJAX框架可分为两大类:

- 胖客户端（fat client）架构

  将业务逻辑及表现层放在浏览器，数据层放在服务器：因为所有的程序以JavaScript执行在客户端，只有需要数据时才向服务器要求服	务，此法又称为胖客户端（fat client）架构。

  ​	服务器在此架构下通常仅用于提供及储存数据。

  ​	此法的好处在于程序员可以充分利用JavaScript搭配业务逻辑来做出特殊的用户接口，以符合终端用户的要求。

  ​	但是问题也不少，主因为:

  ​		第一:JavaScript语言本身之能力可能不足以处理复杂的业务逻辑

  ​		第二:JavaScript的执行性能一向不好。

  ​		第三:JavaScript访问服务器数据,仍需适当的服务器端程序之配合

  ​		第四:浏览器兼容性的问题又出现。

  ​	有些Ajax开发框架如DWR企图以自动生成JavaScript之方式来避免兼容的问题，并开立通道使得JavaScript可以直接调用服务器端的Java程序来简化数据的访问。

  ​	但是前述第一及第二两个问题仍然存在(即兼容性和业务逻辑分散问题,各部分实现所用程序语言不同)，

  ​	程序员必须费相当的力气才能达到应用程序之规格要求，或可能根本无法达到要求。

-  瘦客户端（thin client）架构，或中心服务器（server-centric）架构

   将表现层、业务逻辑、及数据层放在服务器，浏览器仅有用户接口引擎（User Interface engine）；此法又称为瘦客户端（thin client）架构，或中心服务器（server-centric）架构。

   ​	浏览器的用户接口引擎仅用于反映服务器的表现层以及传达用户的输入回到服务器的表现层。

   ​	由浏览器所触发之事件亦送回服务器处理，根据业务逻辑来更新表现层，然后反映回浏览器。

   ​	因为所有应用程序完全在服务器执行，数据及表现层皆可直接访问，

   ​	程序员只需使用服务器端相对较成熟之程序语言（如Java语言）即可，不需再学习JavaScript/DOM/CSS，在开发应用程序时相对容易。	缺点在于用户接口引擎以及表现层通常以标准组件的形式存在，如需要特殊组件（用户接口）时，往往须待原框架之开发者提供，缓不济急。

   ​	如开源码Ajax开发框架[ZK](https://zh.wikipedia.org/wiki/ZK)当前支持XUL及XHTML组件，尚无XAML之支持。

# AJAX的组成

虽说AJAX是一个多项技术的集合,但是编写代码时,仅仅只需要:

- 浏览器内建的XMLHttpRequest对象

  用来从Web服务器请求数据

- JavaScript和HTML DOM

  用来处理、显示或使用数据
  

`XHR对象: 客户端与服务器进行交互的接口` 

`JavaScript:处理来自服务器相应的数据` 

`DOM:JavaScript操作文档(web网页)的接口.` 

只需要以上两点,那么你就可以编写AJAX应用.

但是这并不代表AJAX只由这两个部分组成,因为硬是要说的话,XMLHttpRequest对象实现的XMLHttpRequest接口还继承了其他多个接口.

那么这其他多个接口就不能被划分为AJAX的组成了?很显然不是.

而只不过XMLHttpRequest接口是最经常被使用的那部分,所以才说只由这两部分组成.



# AJAX如何工作

请看图1-1,用图的方式只说明了AJAX如何工作,省略了其他各种形式(例如省略了协议的作用等)

![](/picture/AJAX 如何工作.png)

​																图1-1

根据图,我们可知:

1. 浏览器中侦听到了某事件(例如页面加载,按钮点击等)

2. 使用由JavaScript创建的XMLHttpRequest对象

   此对象可与服务器进行交互.

3. 由XMLHttpRequest对象向Web服务器发送请求.

   这期间在互联网上需要经过一系列加工,例如需要符合协议等.

4. Web服务器处理终端发送的请求

5. Web服务器将响应请求并处理数据,完毕后再将数据发送回终端.

6. 采由终端的JavaScript处理被服务器所返回的数据(你可以实用XHR对象将服务器数据解析为特定格式,再由JS来处理也行哟).

7. 再由JavaScript执行正确的动作(如更新页面等)

# XMLHttpRequest

以下的文档: ***详见:MDN-API参考文档的XMLHttpRequest***

## 描述

**请注意: Http,ttp为小写,不是HTTP.**

XMLHttpRequest接口继承了多个接口,所以在使用XMLHttpRequest接口的对象的方法/属性/事件等时,并不一定是XMLHttpRequest接口本身的方法/属性/事件,可能是它从其他接口继承过来的.

又或者是XHR对象实现了其他接口.

此接口允许网页在不影响用户操作的前提下更新页面的局部内容,可以与服务器进行交互.

## XMLHttpRequest接口和对象

在AJAX的组成中我们说过,AJAX除了JavaScript和DOM,剩下的那部分就是XMLHttpRequest对象了.

而XMLHttpRequest对象是实现的XMLHttpRequest接口,这显而易见.

实现XMLHttpRequest接口的XMLHttpRequest对象,可以与服务器进行交互.可以通过此接口从URL(URI包含URL,这是服务器(上的文件地址))获取数据,而无需让整个页面刷新.

*当然,除了XMLHttpRequest对象实现了XMLHttpRequest接口,我们亦可以自创实现XMLHttpRequest接口的对象,且XHR对象还可能实现了其他接口.*

这就代表着XMLHttpRequest接口的对象允许网页在不影响用户操作的前提下更新页面的局部内容.

在AJAX编程中,XMLHttpRequest接口以及实现它的对象被大量使用.

XMLHttpRequest和AJAX一样,所说其名字都有XML,但是这并不代表XMLHttpRequest对象只能获取XML的数据,.

相反,XMLHttpRequest可以用于获取任何类型的数据,不仅如此,它甚至还支持HTTP以外的协议(包括file:// 和 FTP)等.

若你的通信流程需要从服务器接收**事件**或**消息**（***参见：<Event.md>***）数据,或许可以考虑通过[EventSource](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/EventSource)接口使用Server-sent事件的方法,(搜索MDN-API的EventSource),而不是使用XMLHttpRequest对象.

而对于全双工通信,[WebSocket](https://zh.wikipedia.org/wiki/WebSocket)则可能是更好的选择.(详情请搜索:MDN-API的WebSocket)

- 全双工:全双工（full-duplex）的系统允许二台设备间同时进行双向数据传输。一般的电话、手机就是全双工的系统，因为在讲话时同时也可以听到对方的声音。

## XMLHttpRequest(),构造函数

### 语法

`let myRequest = new XMLHttpRequest()`

### 描述

该构造函数和其他构造函数没有什么不同,都是使用new操作符创建.

该构造函数用于创建一个XMLHttpRequest接口的对象,这很明显.

在以下我们会列举一些XMLHttpRequest接口的属性和方法,而在调用任何的属性和方法前,必须先创建XMLHttpRequest接口的对象,或通过其他方法间接得到一个XMLHttpRequest对象.

这也是一句废话~不过我只是想说明XHR是个接口,要由JavaScript实现才能实用,而不是直接就是对象,直接就可以使用了.

## XMLHttpRequest接口的属性

XMLHttpRequest接口继承了XMLHttpRequestEventTarget接口和 EventTarget接口的属性。

以下列举出XMLHttpRequest接口部分属性

### XMLHttpRequest.onreadystatechange

#### 描述

当 readyState(就绪状态)属性发生变化时调用的 EventHandler(事件处理程序/相对应的处理函数)。

​	*判断XHR对象当前处于什么状态?处于被创建,还是请求被发送,亦或者成功失败等,如果处于这状态这其中一个,那么就触发callback,即需要执行的动作.*

也就是只要readyState属性发生变化,就执行相应的函数(事件处理程序).

而readyState属性发生变化,则会触发readystatechange事件,所以也可以这么说:当readyState属性发生改变时,就会触发readystatechange事件,并调用相关的处理函数(事件处理程序)

**`警告:这个属性不该用于同步的requests对象,并且不能在内部(C++)代码中使用.`**

**`用于同步请求没有意义,因为同步请求,发送完请求必须等到服务器的响应,JavaScript才可以做别的事情,所以readyState在同步请求的状态只有:0,1,4（往下看）; `**

**`没有2(send())的原因是因为,发送请求过之后,不能做任何的其他事情(包括判断状态),除非等到服务器响应/请求失败/未成功发送等情况.`**

当一个来自 XMLHttpRequest 对象的请求被 abort() 方法取消时，其对应的 readystatechange 事件不会被触发。

> UPDATE: 在下面的浏览器版本中会触发 
>
> Firefox 51.0.1, Opera 43.0.2442.991, Safari 10.0.3 (12602.4.8), Chrome 54.0.2840.71, Edge, IE11 例子在 [here](https://jsfiddle.net/merksam/ve5oc0gn/) - 重新加载几次页面即可。

#### 语法

`XMLHttpRequest.onreadystatechange = callback;`

当readState的值被改变,触发readystatechange事件时,callback函数会被调用.

### XMLHttpRequest.readyState 只读

返回 一个无符号短整型（unsigned short）数字，表示XMLHttpRequest代理当前所处的对象.

一个XMLHttpRequest代理总是处于下列表格状态的一个:

- 代理: 替代...处理...

- XMLHttpRequest代理: 替代XMLHttpRequest处理某事.

  也就是指的是实现XMLHttpRequest接口的对象.

| 值   | 状态               | 描述                                                         |
| ---- | ------------------ | ------------------------------------------------------------ |
| `0`  | `UNSENT`           | 代理被创建，但尚未调用 open() 方法。                         |
| `1`  | `OPENED`           | `open()` 方法已经被调用。                                                在这个状态中,可以通过 setRequestHeader()方法来设置请求的头部,可以调用 send()方法来发起请求。 |
| `2`  | `HEADERS_RECEIVED` | `send()` 方法已经被调用，并且头部和状态已经可获得,即响应头也已经被接收在.                                                    也就是说请求已经发送给服务器,此请求已经被服务器接收.                                                                                                                               若send()方法只要使用,可以说 头部和状态是必能获得的,因为就算没有使用setRequestHeader()设置头部,send()也会发送一个默认值得头部到服务器. |
| `3`  | `LOADING`          | 下载中； `responseText` 属性已经包含部分数据。         即响应体部分正在被接收,如果 `responseType` 属性是“text”或空字符串， `responseText` 将会在载入的过程中拥有部分响应数据。                                                             注意:在此状态时,XHR对象已经获取到了来自服务器响应的数据了. |
| `4`  | `DONE`             | 下载操作已完成。即请求操作已经完成。                       这意味着数据传输已经彻底完成或失败。 |

> 在IE中，状态有着不同的名称，并不是 `UNSENT`，`OPENED` ， `HEADERS_RECEIVED`， `LOADING` `和 DONE, 而是 READYSTATE_UNINITIALIZED` (0)，`READYSTATE_LOADING` (1) ， `READYSTATE_LOADED` (2) ， `READYSTATE_INTERACTIVE` (3) `和 READYSTATE_COMPLETE` (4) 。

### XMLHttpRequest.status 只读

该属性的使用数字作为返回值,表示XMLHttpRequest对象的状态,和readyState只读属性一样,表状态.

#### 返回值

status属性的返回值是一个无符号整型.

它只存在两个值:

1. 0
2. 200

##### 0

在请求完成前,即网页向服务器发送请求,服务器响应请求并返还一段处理好的数据给网页之前,它的值为0. 若XMLHttpRequest出错,浏览器返回的status值也为0.

也就是说status值为0 代表着请求未完成(未被服务器响应并返回)或XMLHttpRequest对象出现错误.

若请求的URL是本地txt文件,那么其对应的XHR对象的status的值也为0.

##### 200

若status的值为200,则代表一个成功的请求,即请求完成(发送请求且服务器响应并返回),中间也没有出任何错误.

若在服务器中没有明确指定status值,那么XMLHttpRequest.status 将会默认为200。	

status值为200,代表者由XMLHttpRequest对象发送的请求是必须成功发送且接收到来自服务器的响应请求，且终端(发送请求的终端)正在下载来服务器的数据.

#### 例子

```js
var xhr = new XMLHttpRequest();
console.log('UNSENT', xhr.status); //(未设置请求) UNSENT 0

xhr.open('GET', '/server', true);
console.log('OPENED', xhr.status); //(已初始化) OPENED 0

xhr.onprogress = function () { // onprogress = callback 是在请求完成之前周期性调用的函数。
  console.log('LOADING', xhr.status); //(服务器返回的的请求(新数据)正在被下载) LOADING 200
};

xhr.onload = function () { // onload 是 XMLHttpRequest 请求成功完成时调用的函数。
  console.log('DONE', xhr.status); //(完成传输) DONE 200
};

xhr.send(null);
```

也就是说status值在XMLHttpRequest对象的状态为:

- **unset和open()时值为: 0**
- **onprogre(下载服务器返回的数据时,即Loading)和DONE(浏览器与服务器之间的传输成功完成)时的值为: 200**

我想你们也发现了, 0对应的是readyState属性的unset和opened状态,200对应的是loading和done状态.

至于为什么没有对应发送请求的状态?emmm,我想应该不需要~,毕竟发送完请求,那么这请求要么失败,要么就成功.



### XMLHttpRequest.response 只读

将服务器响应(返回)的数据以一个 ArrayBuffer、Blob、Document，或 DOMString，JavaScript Object类型返回.。

具体是哪种类型取决于 XMLHttpRequest.`responseType`属性 的值。

其中包含整个响应体（response body）。

此属性让你可以通过尝试设置 `responseType`属性的值,以便通过特定的类型请求数据.

使用 response属性需要再open()初始化请求之后,send()发送请求 之前调用,即在它们二者的中间部分调用此属性(没有初始化请求,怎么设置请求?发送完请求,设置请求又有什么用?).

且若请求未完成/未成功,则取值为null. 

但是有个例外,在读取文本文件(如txt)的数据时,若responseType的值是"text"或""空字符串,并且XHR对象的readyState状态是LOADING(3)时(即正在下载来自服务器的数据), 

​	*请注意:处于LOADING状态,这代表整个请求未完成 /未成功,理应返回null的,但是我上面说的是个例外!!!*

那么此时response的值不是null,而是到目前为止(即你使用这个属性返回一个值时)该请求已经取得的内容. 	

## XMLHttpRequest接口的方法

以下列出XMLHttpRequest接口的部分方法.

- XMLHttpRequest.abort()

  如果请求已被发送，则立刻中止请求。

- XMLHttpRequest.getAllResponseHeaders()

  以字符串的形式返回所有用 CRLF 分隔的响应头，如果没有收到响应，则返回 null。

- XMLHttpRequest.getResponseHeader()

  返回包含指定响应头的字符串，如果响应尚未收到或响应中不存在该报头，则返回 null。

- XMLHttpRequest.open()

  初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 openRequest()。

  ***在AJAX示例的AJAX请求中有详细说明.***

- XMLHttpRequest.setRequestHeader();

  ​	设置HTTP请求头部的数据.此方法若使用,则只能在open()和send()方法之间使用.

  ​    如果没有设置 [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept) 属性，则此发送出[`send()`](af2451b80072fcb6fa29eb6f688860ca.html) 的值为此属性的默认值`*/*` 。
  
  ​	也就是send()发送出的Accept(Accept 请求头用来告知（服务器）客户端可以处理的内容类型)值为:`*/*`
  
  ***在AJAX示例的AJAX请求中有详细说明.***
  
- XMLHttpRequest.send()

  发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。

  ***在AJAX示例的AJAX请求中有详细说明.***

## 事件处理器

作为实现了XMLHttpRequest接口的onreadystatechange属性的对象,所有浏览器都支持onreadystatechange属性.

而后来,许多浏览器还实现了一些额外的事件,如onload、onerror、onprogress 等.*(详情请看MDN-API参考文档,搜索XMLHttpRequest,其中的事件处理器,并点击[Using XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)。)*

更多现代浏览器，包括 Firefox，除了可以设置 on * 属性外，也提供标准监听器 addEventListener() API 来监听XMLHttpRequest 事件.此API为EventTarget接口的API.

## 事件

以下事件不一定都是XMLHttpRequest接口本身的事件,有可能是从其他接口继承而来的事件,例timeout事件的接口为ProgressEvent接口.

所谓的事件就是某个动作,比如:按钮点击,浏览器刷新等,可以说事件如同属性/方法一样,即当某个事件(方法)被触发,则执行以下动作..

以下列出部分有关XMLHttpRequest的事件.

- abort

  当 request 被停止时触发,例如当程序调用 XMLHttpRequest.abort() 时。

  或也可以使用 onabort 属性。

- error

  当request遭遇错误时触发。

  或也可以使用 onerror 属性

- load

  XMLHttpRequest请求成功完成时触发。

  或也可以使用 onload 属性.

- loadend

  当请求结束时触发, 无论请求成功 ( load) 还是失败 (abort 或 error)。

  也可以使用 onloadend 属性。

- loadstart

  接收到响应数据时触发。

  或也可以使用 onloadstart 属性。

- progress

  接收数据开始周期触发。

  或也可以使用 onprogress 属性。

- timeout

  在预设时间内没有接收到响应时触发。

  或也可以使用 ontimeout 属性。

# XMLHttpRequestEventTarget

## 描述

XMLHttpRequestEventTarget接口是一个**描述**事件处理程序的接口,你可以在一个用于处理XMLHttpRequest事件的对象中使用到该事件处理程序.

(简略而言即: 可以在一个对象中使用到XMLHttpRequestEventTarget接口,只不过此对象是处理XMLHttpRequest事件的对象)

XMLHttPRequestEventTarget接口的属性被XMLHttpRequest接口继承.

而由于XMLHttpRequestEventTarget接口是起描述事件处理程序的接口的作用的,所以我们几乎不使用直接实现此接口的对象,只是间接使用此接口,

例如通过使用实现XMLHttpRequest接口的对象来使用XMLHttpRequestEventTarget接口的属性等.

## 属性

在XMLHttpRequest接口的事件中,我们每个事件后都有说: 或也可以使用onxxx属性,这是因为XMLHttpRequest接口继承了XMLHttpRequestEventTarget接口.

而在XMLHttpRequestEventTarget接口中是存在onxxx这些属性,所以才说XMLHttpRequest接口的事件属性:或也可以使用onxxx.

以下列举出XMLHttpRequestEventTarget的部分属性:

- XMLHttpRequestEventTarget.onabort

  当请求失败时调用该方法

- XMLHttpRequestEventTarget.onerror

  当请求发生错误时调用该方法

- XMLHttpRequestEventTarget.onload

  当一个HTTP请求正确加载出内容后返回时调用。

- XMLHttpRequestEventTarget.onloadstart

  当一个HTTP请求开始加载数据时调用。

- XMLHttpRequestEventTarget.onprogress

  间歇调用该方法用来获取请求过程中的信息。

- XMLHttpRequestEventTarget.ontimeout

  当时间超时时调用；只有通过设置XMLHttpRequest对象的timeout属性来发生超时时，这种情况才会发生。

- XMLHttpRequestEventTarget.onloadend

  当内容加载完成，不管失败与否，都会调用该方法

# [EventTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)

详情搜索:MDN-API的EventTarget

## 描述

EventTarget接口是一个由可以接受事件的对象实现的接口,并且可以为它们创建侦听器.

- 它们: 指实现EventTarget接口,可以接收事件的对象

- 此对象不一定只实现了EventTarget接口,可能还实现了其他多个接口,其他多个接口又有可能各种继承接口等.

  这个关系就和DOM的对象和接口之间的关系一样有趣,复杂交错.

Element，document 和 window 是最常见的事件目标，但是其他对象也可以是事件目标，比如XMLHttpRequest，AudioNode，AudioContext接口的对象等.

许多事件目标（包括元素，文档和 window）还支持通过 onxxx 属性和属性设置事件处理程序。

即它们继承了XMLHttpRequestEventTarget接口或有关XMLHttpRequestEventTarget接口的接口等.

## [构造函数](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/EventTarget)

`EventTarget();`

创一个新的EventTarget接口的实例,即创建一个EventTarget对象.

`let myEventTarget = new EventTarget()`

## EventTarget接口的方法

- EventTarget.addEventListener()

  在EventTarget上注册特定事件类型的事件处理程序。

- EventTarget.removeEventListener()

  EventTarget中删除事件侦听器。

- EventTarget.dispatchEvent()

  将事件分派到此EventTarget。

# 服务器响应的属性/方法

## 属性

- responseText

  获取字符串形式的响应数据

  此属性以字符串形式返回服务器响应的数据

  (即服务器响应发送过来的请求并处理一段数据,再将数据返还给浏览器,而浏览器接收到此新数据,新数据将会以字符串的形式显示).

  `console.log(xhr.responseText)`

- responseXML

  获取 XML 数据形式的响应数据

  在XMLHttpRequest对象中有一个内建的XML解析器,使用responseXML属性,JS将会把服务器的响应数据解析为XML DOM对象,并将之返回.

  同时此属性也可以用到HTML来.详情请看: `AJAK示例 - GET方法示例 -使用XML文档作为服务器上的文件 - XHR.responseXML`

  注：若你将 responseType 属性设置为 “Docuemnt”，则 responseXML 属性将以 HTML DOM 的形式返回。
  
  

## 方法

- getResponseHeader()

  从服务器返回特定的头部信息

- getAllResponseHeaders()

  从服务器返回所有头部信息



# AJAX示例

## AJAX请求所需了解的方法

### 描述

首先要写一个请求示例,我们需要知道以下两个方法的用途,即open()和send(),以及可选的方法setRequestHeader();还有一个能反映: 实现XMLHttpRequest接口的对象的状态,只需要使用onreadystatechange属性即可获取XHR对象的状态,

同时还可以用XHR.status属性值(状态码(,知道请求处于哪种状态.

使用实现XMLHttpRequest接口的对象的open()和send()方法,即可初始化请求和向服务器上的文件发送请求.

### XMLHttpRequest.open();

初始化一个请求.也就是设置请求,比如初始其发送请求的方法,异步还是同步,向哪里发送等.(这个不是发送请求),

​	*注意:此方法的第二参数URL,虽然指的是服务器,但是请不要理解错了,这个服务器的范围很广,*

*譬如: 在浏览器需要与服务器上的某个文件进行交互,那么我们需要的是这个文件的URL,而不是单纯的服务器的URL*

**即创建一个请求并赋予初始值.**

此方法需要在JavaScript代码中使用,若需要从原生代码(Native Code)初始化一个请求,请使用:openRequest()替代.

- 原生代码/本地代码(Native Code): 编译后可直接依附操作系统运行,不需要经过如虚拟机之类的东西. 

  所以执行速度快,但是缺乏移植性等.

  JavaScript并不是Native Code,它需要经过翻译才能被执行.

**注意：**为已激活的请求调用此方法（`open()`或`openRequest()`方法已被调用时又重新调用）相当于调用`abort()`。即终止该请求.

#### 语法

*申明: xhrReq,是指实现XMLHttpRequest接口的对象*

`xhrReq.open(method, url);`

`xhrReq.open(method, url, [async]);`

`xhrReq.open(method, url, [async], [user]);`

`xhrReq.open(method, url, [async], [user], [password]);`

##### 参数说明

###### method 必选

要使用的HTTP协议,比如:GET,POST,PUT,DELETE等.

对于非HTTP(S) URL将忽略此参数,即服务器的URL不是HTTP(S)协议传输.

- *GET* - 从指定的资源请求数据。
- *POST* - 向指定的资源提交要被处理的数据

对于其他的HTTP方法,请看以下图1-3

![](/picture/HTTP方法简略.png)

​																		图1-3

###### url(即URL)必选

一个DOMString,它表示要向服务器发送请求的URL.

也就是说该参数为发送请求到服务器的某文件上,这个服务器文件的URL(位置).

- DOMString: 一个UTF-16的字符串.即一个关于文档(网页)的字符串.

  由于JavaScript已经使用了这样的字符串,所以DOMString直接映射到一个String.

  即使用String就等于使用DOMString.

该服务器上的文件可以是任何类型,如.txt,.xml等, 又或者是如服务器脚本文件:.asp, .php等(这些脚本文件可以在发送

###### async 可选	

一个可选的布尔参数.其默认值为:true.

- true:表示要不要异步执行操作 

  且已完成事务的通知,可供事件监听器使用

  *我们建议使用异步操作.*

- false:send()方法直到收到答复前不会返回

  *我们不推荐使用同步发送请求的方式*,因为若服务器缓慢或繁忙等,那么发送请求的应用程序(终端/网页)将被挂起或停止.

  且同步 XMLHttpRequest 正在从 Web 标准中移,即使这个过程可能需要很多年。

  现代开发工具被鼓励对使用同步请求做出警告，并且当这种情况发生时，可能会抛出 InvalidAccessError 异常。

如果`multipart`属性为`true`则该参数必须为`true`，否则将引发异常。

###### user 可选

可选的用户名用于认证用途；默认为null。

###### password 可选	

可选的密码用于认证用途，默认为null。

#### 使用GET还是POST

通常我们初始化请求时,一般使用的这两个HTTP协议,但是它们两个何时使用比较好呢?

GET比POST更简单更快,可用于大多数情况.

但是,在以下情况之下,我建议始终使用POST :

- 缓存文件不是选项(更新服务器上的文件或数据库)
- 向服务器发送大量数据(POST无大小限制)
- 发送用户输出(因为POST可包含未知字符),POST比GET更强大更安全.

且若当我们使用GET方法来发送信息,请为open()的第二个参数,即服务器地址的URL部分添加一个唯一的ID,这是为了避免我们在获取URL对应的服务器响应的信息时,

可能会得到一个缓存的结果,即可能会获得的信息是服务器以前与浏览器交互数据而留下来的缓存数据(*请看以下GET和POST对比*).例如:

```js
let xhr = new XMLHttpRequest();
xhr.open("GET","/demo/demo_get.asp?t=" + Math.random(), true);
```

- 我们为URL额外增加Math.radom()随机数,表示这个是唯一ID,当然了,实际情况并不会如此简单.

#### GET和POST对比

详情可看:[W3C](https://www.w3school.com.cn/tags/html_ref_httpmethods.asp) 或参见：***<get和post.md>***

GET和POST是HTTP的方法,是最常见的两种方法.

要搞清楚它们,我们首先的知道,什么是HTTP？简单来说:

- 超文本传输协议（HTTP）的设计目的是保证客户机与服务器之间的通信。
- HTTP 的工作方式是客户机与服务器之间的请求-应答协议。
- web 浏览器可能是客户端，而计算机上的网络应用程序也可能作为服务器端。
- 举例：客户端（浏览器）向服务器提交 HTTP 请求；服务器向客户端返回响应,响应包含关于请求的状态信息以及可能被请求的内容。

**GET:   从指定的资源请求数据**

- 查询字符串（名称/值对）是在 GET 请求的 URL 中发送的：

  `/test/demo_form.asp?name1=value1&name2=value2`

**POST: 向指定的资源提交要被处理的数据**

- 其查询字符串(名称/值)对是在 POST 请求的 HTTP 消息主体中发送的

  `POST /test/demo_form.asp HTTP/1.1`
  `Host: w3schools.com`
  `name1=value1&name2=value2`

以下图1-2为它们区别的图表表示:

![](/picture/GET和POST对比.png)

​																	图1-2

~~对于以上图1-2的对数据长度的限制似乎有些令人疑惑,因为网上的说法有些区别:[来自CSDN](https://blog.csdn.net/gftygff/article/details/83891366)~~

已解惑, 即:get和post本身没有对数据进行限制,对数据长度进性限制的是url,即:浏览器/服务器可能会对url本身进行限制,而get是依赖于url的,post不依赖.

- 2020/4/23-如果想更深入的了解,请参见:***<get和post.md>***

### XMLHttpRequest.setRequestHeader() 可选使用的方法

该方法是在发送请求前,设置HTTP请求头部的方法.

此方法必须在open()和send()方法之间调用,这就是为什么我将此方法写到open()和send()方法之间的原因.

注意:如果对同一个请求头赋值,只会生成一个合并了多个值的请求头.

若没有设置Accept(此属性用来告知服务器/客户端能处理的内容类型)属性,则send()发送出的Accept(接受)值为此属性的默认值: `*/*`

即会发送的请求将会带一个默认的请求头部: */*

#### 语法

myReq.setRequestHeader(header,value);

- myReq: 实现XMLHttpRequst接口的对象

##### 参数说明

###### header

属性的名称,即请求头部的名称.

###### value

属性的值,即请求头部的值.

### XMLHttpRequest.send()

#### 描述

该方法用于发送HTTP请求,通常发送方式默认为异步请求.

- 若是异步请求:则此方法会在请求发送后立即返回(不必等待服务器响应)
- 若是同步请求:则此方法直到响应到达后才会返回语法(必须要等待服务器响应)

**XMLHttpRequest.send([请求主体])**方法接受一个可选的参数作为请求主体.

使用open()方法设置请求时,若该设置的请求使用的HTTP协议若是GET或HEAD,则应将请求主体设置为**null.**

若在open()和send()方法之间没有使用XMLHttpRequest.setRequestHeader() (设置HTTP请求头部的方法)方法设置Accept(接受)属性(即头部信息),

则send()会发送带有 `*/*`值的Accept(接受) 头部信息,也就是默认为其设置一个头部.

- [Accept](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept(接受)):Accept请求头用来告知服务器/客户端可以处理的内容类型,这种内容类型用[MIME类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)来表示.

  也就是说无论你有没有使用setRequestHeader()方法,始终会设置Accept(接受)(接受)属性的值,来告知服务器/客户端可以接受的内容类型.

  - MIME

    通常称为

     Multipurpose Internet Mail Extensions(多用途因特网邮件扩充; 或 MIME 类型 

    它是一种标准，用来表示文档、文件或字节流的性质和格式。

    格式为:type/subtype,例如:text/xml,text/html 

    简意为: 以人类可读方式显示一个XML/HTML文档.

**Note:** 请注意不要使用一个简单的AarryBuffer对象作为send()方法的可选参数，

ArrayBuffer已经不再是ajax规范的一部分,它已经从AJAX规范中去除.请改用ArrayBufferView.

#### 语法

`XMLHttpRequest.send();`

`XMLHttpRequest.send(ArrayBuffer data);`

`XMLHttpRequest.send(ArrayBufferView data);`

`XMLHttpRequest.send(Blob data);`

`XMLHttpRequest.send(Document data);`

`XMLHttpRequest.send(DOMString? data);`

`XMLHttpRequest.send(FormData data);`

##### 参数说明

###### send()

send()方法中没有任何的可选参数,则代表直接将初始化的请求发送给服务器.

同时若没有使用setRequestHeader()方法设置Accept(接受)头部信息,则会给一个默认Accept(接受)头部信息: `*/*`,会将此默认得头部信息一同发送到服务器,如同使用了setRequestHeader()一样.

 *(毕竟一个请求没有头部,就相当于一个人没有头一样,它必须有个默认头.)*

且没有任何参数的send()方法应当用于HTTP的GET方法,因为在描述中我们说过: 若初始化的请求使用的HTTP的方法是GET/HEAD,则应当将使用send(null).

即将参数设置为null,也就是空, 所以send(null) == send();

所以send()方法/send(null)应该用于GET/HEAD

###### send(一个字符串参数)

对于有可选参数的send(string)方法来说,这些参数的意思已经在它们的名字上体现了.

且有字符串参数的send()方法应该用于HTTP的POST  .

详情请看<MDN-XMLHttpRequest.send())

## AJAX实例

### GET方法示例

了解完以上的方法之后,我们来看一些例子

#### 未使用服务器URL的AJAX

此示例就相当于一个蓝图

```html
<html>
<body>
    <button onclick = 'aboutAJAX()'>使用AJAX添加数据			</button>
     <p id = 'p'></p>
</body>  
<script>
    function aboutAJAX() {
        // 创建XMLHttpRequest接口的对象
        let xhr = new XMLHttpRequest();
        // 当 xhr 的状态改变时，就执行回调函数.
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 0) {
                document.getElementById('p').innerHTML =
                '我是失败的请求,因为需要发送的服务器的URL不存在'
            }
        }
        // 初始化请求S
        xhr.open('GET','这是一个服务器上文件的URL',true);
        // 设置请求头部,可选方法,如若不写,会有默认值:*/*
      //  xhr.setRequestHeader('头部名称','头部需要的值');
		// 发送请求
        xhr.send(null);
    }
</script>
</html>
```

***代码解析***

- **xhr.onreadystatechange = function() {...}**

  判断xhr对象当前所处5个状态的哪一个,并执行callback,即执行相关函数.

  五个状态分别为:

  1. unset

  2. opened

  3. headers received(响应头已被接收)(send()方法被调用,并且头部和状态已经可获得,即响应头也已经被接收在)

     就是说请求已经发送给服务器,此请求已经被服务器接收.

  4. loading(正下载来自服务器返回的数据)

  5. done(传输完成/失败)

- if(xhr.readyState == 4 && xhr.status == 0){..}**

  若xhr对象的传输数据状态是彻底完成/失败 且xhr对象的状态是请求未完成或xhr对象错误.

  而在这个示例中,很明显的这行代码的意思可以翻译为: 如果xhr对象的传输数据是失败/成功的 且 xhr对象的请求未完成/xhr对象出错.

  则执行相关函数.

  ​	简而言之: 若xhr对象的传输数据失败且若出错则执行相关函数.

- **xhr.setRequestHeader('头部名称','头部需要的值');**

  这是可选的函数. 如若不写,那么send()也会默认发送出的Accept(接受)的值,即发送出默认的头部信息,其值为: `*/*`

- **xhr.send(null);**

  send()方法我不在解释,以上详解了. 这里只说明为什么我写了个参数null.

  这是因为使用open()初始化请求时,若HTTP协议为GET或HEAD时(即open()的一个参数),那么在调用send()方法时,应为它的可选参数,即请求主体设置为null.

#### 使用txt作为服务器上的文件

##### 描述

使用HTTP的GET方法,将txt作为服务器上的文件,并获取txt上的数据  

- **注意**: 在运行此程序之前,需要获取让浏览器能访问本地文件的权限,否则将会报错: 已拦截跨源请求：同源策略禁止读取位于xxxx地址的远程资源（原因：CORS 请求不是 http）。

  因为从浏览器跨域到本地电脑.

- 其chrome的解决方法: 

  ​	创建chrome.exe的快捷方法,并打开属性-快捷方式-目标,在chrome.exe后面添加一个空格,并根据版本加入以下字符串: 

  ​	chrome在之前版本的谷歌浏览器中使用 `--args --disable-web-security`

  ​    2016年3月之后的新版本需要使用 `--args --disable-web-security --user-data-dir`

  ​	之后就直接使用此快捷方式打开即可,打开出现: `您使用的是不受支持的命令行标记：- disable-web- security。稳定性和安全性会有所下降` 即代表成功

##### 示例

```html
<html>
<body>
    <button onclick='aboutAjaxGET();'>请求数据</button>
</body>
<script>
    function aboutAjaxGET() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status ==0) {
                console.log(this.responseText);
            }
        }
        xhr.open('GET','./myAjax.txt',true);
        xhr.send(null);
    }
/*
 *	控制台将输出: txt上存在的数据.
 */
</script>
</html>

```



在XMLHttpRequest.open() -- 语法 -- 参数说明 -- URL 中我们讲过,URL可以是任何类型,如txt,xml等的文件,又或者是服务器脚本文件,如asp,php等.

所以这里我们使用txt作为服务器的文件,向txt文件发送请求,使txt响应请求并处理相应情况再返回新的数据,最后由JS来处理这段返还由txt返还的数据.

而这里我们使JS让txt所返还的数据呈现到控制台上.

当然在请求发送过去后,由于异步操作,JavaScript可以去干别的事,不必等服务器的响应,只需要在服务器响应时,再过来处理就行.

***代码解析***

​	其中有大部分代码都已经在 未使用服务器URL的AJAX 上有详细解释过了,这里介绍的是一些没有解释过,或比较重要的地方.

- ***xhr.onreadystatechange = function() {...}***

  ​    为什么先使用onreadystatechange()此方法,而不是先使用open(),setRequestHeader(),send()

  ​	这是因为XHR对象状态包括一个unset,即未调用open()方法,所以为了保证XHR对象的状态至少都可能存在,

  ​	所以把onreadystatechange()方法放到开头.否则将此方法写到open()的下面,就不存在unset状态了.

- ***if(this.readyState == 4 && this.status ==0) {..}***

  解析这行判断代码行是因为,this.status == 0.

  ​	为什么已经完成了传输数据,且是成功的完成传输数据,或者说是成功完成了请求,status的值依然为0? 这个0不是代表请求未完成或XHR对象出现错误嘛?

  ​	这是因为请求本地txt文件时,status/状态码的值始终为0.

-  ***console.log(this.responseText);***

   为什么我要说这么一个简单的代码行?

   ​    这是首先因为this.responseText中的this通常是XHR对象,而responseText则代表XHR对象的responseText属性,这是一个默认属性,与之相对的还有response,responseType,status属性等.

   ​	其次是因为若我们将这行代码改成以渲染的方式得到数据,将会报错,即改成如此形式:

    `document.getElementByID('p').innerHTML =(this.responseText);`

   ​	浏览器会报错:  Uncaught TypeError: Cannot set property 'innerHTML' of null , 语法错误: 不能将innerHTML属性设置为空.

   ​	具体的原因我并不知道,也许这是由于使用了本地txt文件作为服务器的局限性.

   ​	~~我知道因为什么了,因为txt文件不是HTML文件,我们也没有将之解析为HTML格式,所以txt自然也不存在DOM树和节点对象等.~~

   ​	~~既然不存在这二者,那么我们当然无法使用实现DOM的Document接口的document对象了,何况还有实现了Element接口的对象.~~

   ​	~~所以自然获取不到txt文件上的responseText属性的值.~~

   ​	~~使用document对象获取的是HTML DOM~~	

   ​	以上为错误想法,因为我们使用的就是xhr对象的responseText,是能获取到txt文件的数据的~.


#### 使用XML文档作为服务器上的文件

在用XML文档作为服务器上的文件,并向之获取数据,我们需要先知道

##### `XMLHttpRequest.responseXML 只读`

###### 定义

**返回一个包含请求检索的HTML或XML的Doucment(网页)**,

也就是responseXML属性返回一个XML/HTML的Document接口,能让JavaScript处理/操作XML,HTML文档.

​	*注意:想要返回一个html的Document必须有前置条件,请往下看*

###### 描述

responseXML属性,从英文直译过来应该是响应/回答XML文档.

也就是通过这个英文意思,我们能知道它能对XML文档有所响应,同时和AJAX,XHR这些一样,名称还不够包含它的功能,它可以它还能对HTML文档有所响应

虽然responseXML属性可以响应XML和HTML文档,但是默认情况下,依然是当作`text/xml`解析. 

而当responseType属性的值设置为"document"并且请求已异步开始执行时,响应就会被当作 `text/html`来解析.

​	*当作text/xml 和text/html解析的意思为: 解析成一个人类可读的xml/html文档.*

虽说看上去需要解析为text/xml和text/html需要两个不同的条件,但是实际上responseXML可以同时在html和xml中工作,所以responseXML属性在历史上堪称神迹(现在已经有之更好的替代品了)

也就是XML/HTML文档作为请求的服务器文件时,你可以使用responseXML来将它们解析并返回,再由JavaScript进行处理.

但是若请求未成功/尚未发送/检索的数据无法被正确解析为XML/HTML,那么返回的值为null.

且服务器没有明确指出 Content-Type 头是 "text/xml" 还是 "application/xml"(二进制数据的XML文档), 

你可以使用XMLHttpRequest.overrideMimeType() 强制 XMLHttpRequest 解析为 XML.

###### 返回值

返回一个Document接口,此接口可能包含从XHR接口的对象中收到的HTML节点/XML节点.

也可能是在没有收到任何数据或数据类型错误的情况下返回的 null.

###### InvalidStateError

在使用responseXML时,如果需要设置responseType属性的值,那么必须是'document'或""空字符串,否则将InvalidStateError(无效的状态错误)

想想也是,responseXML只读属性,就是解析一个html/xml文档,如果responseType(响应类型)不是document或"",那html/xml文档我们就完全无法控制.

因为实际上,document是一个实现了Document接口的对象,我们需要通过这个对象来操作XML DOM / HTML DOM, 否则即使将之解析成了text/xml 或text/html文档,又有何意义?又不能操作.

在请求为异步执行时:

至于设置成""空字符串,则是如同没设置一样,responseXML就默认解析为text/xml文档.

而设置"document"值时,则是代表以text/html文档解析.

##### `Element.getElementsByTagName(nodeName)` 

###### 定义

此方法返回一个[**动态的,包含所有指定标签名字的元素**]的[HTMLCollection](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)的通用集合,

(HTMLCollection的通用集合: 也就是指HTMLCollection接口中包含的通用集合:generic collection)

简而言之:将某个Element接口下的节点对象(包括继承此接口并且实现接口的对象)下的指定名字的子元素打包成一个HTMLCollection的通用集合,且此集合是实时更新

**返回一个HTMLCollection接口包含的元素的通用集合.**

**该集合的内容为: 指定Element节点对象(包括根节点:document)下的指定名字的元素(节点对象).**

**集合特性为: 实时更新.随着有关集合的文档内容该变而改变.**



###### 描述

*一个Element接口的getElementsByTagName()方法*

请注意getElementsByTagName: 在Element后面有个***s!***

getElement`s`ByTagName: 其英文直译过来: 获取元素的标记名.

此方法返回一个[**动态的,包含所有指定标签名字的元素**]的[HTMLCollection](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)的通用集合,也就是指HTMLCollection接口中包含的通用集合:generic collection, 

且指定的元素(Element)的子树(所有子元素)会被搜索,但不包括根元素自身.

省略掉形容词,即: **获取一个Element接口的对象(包括继承此接口且实现接口的对象)的子树,并让此子树返回一个HTMLCollection所拥有的通用集合.**只不过这HTMLCollection的通用集合是动态(跟随文档更新而跟新,)且我们能指定此是哪些数据罢了.

也就是当HTML DOM (逻辑树)的结构发生改变(增删改查 一个节点等),那么这个所返回的集合也会跟着改变.

这代表着对一个节点对象重复是使用getElementsByTagName()是愚蠢的.(但是请你注意,你改变了服务器上的文件代码,是否需要更改对应的JS以防止数据获取失败等).

例如:查找某个节点对象(元素)下,一个标签名字为"h1"的元素,

```js
let htmlCollection = nodeObj.getElementsByTagName('h1')
/*
	将nodeObj节点对象(元素)下的所有的h1元素,组合成一个为HTMLCollection的集合.
*/
```

如果是HTML文档中的某个元素调用了`getElementsByTagName函数，` 运行前会将参数转为小写字母形式。故不建议在驼峰式命名的SVG元素中使用。 

而且请注意,参数nodeName只能是字符串,无法是变量.

#####  `Node.childNodes([index])`

###### 定义

返回一个NodeList对象的集合(类数组对象).

该集合内容为:指定节点下的所有子元素(子节点对象).

该集合特性为: 实时更新.即随着有关该集合文档的内容改变而改变.

若指定集合的一个索引位置,则意思为: 返回集合中,第i个索引的整个节点对象(包括节点本身和以下所有子节点对象(回车符等也算是节点对象))

###### 描述

一个Node接口的childNodes()方法

**该方法返回某个节点对象(Node)下的所有子节点对象(元素)的[NodeList](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)集合**(此集合是一个类数组对象)

```js
let nodeList = Node.childNodes;
/*
	获取Node节点对象的所有子节点对象的NodeList集合.
	请注意:子节点对象包括回车符,请看以下实例
*/
```

```html
<div id = 'div'>这个文字这里有个回车符,是一个节点对象 0
    <h1>1</h1>这个文字这里有个回车符,是一个节点对象 1,2
    <h1>2</h1>这个文字这里有个回车符,是一个节点对象 3,4
    <h1>3</h1>这个文字这里有个回车符,是一个节点对象 5,6
    <h1>4</h1>这个文字这里有个回车符,是一个节点对象 7.8
    <h1>5</h1>这个文字这里有个回车符,是一个节点对象 9,10
</div>
<script>
    let nodeObj = document.getElementById('div')
	let nodeList = nodeObj.childNodes;
    console.log(nodeList);
/*
	将会输出:
	NodeList(11) 
	[text,h3,text,h3,text,h3,text,h3,text,h3,text]
*/
</script>
```

- 根据所得到的结果,我们发现div节点对象中似乎一看过去只存在5个节点对象,但是结果却存在11个节点对象,即11个元素.

  这是因为回车符也是一个节点对象.

我们也可以通过`index`可选参数,返回指定的某个节点对象(Node)的指定索引位置上的元素(节点对象)具体是什么.

```js
// 这里的例子以上面为蓝图
	let nodeList = nodeObj.childNodes[0];
    console.log(nodeList); // #text
	nodeObj.childNodes[1]: //  <h1>1</h1>
	nodeObj.childNodes[2]: //  #text
/*
	即得出来的指定的索引得结果,与类数组对象(NodeList集合)上的索引位置得元素一一对应,只不过若是text文本类型的数据,则前面要有#.	
*/
```

#####  `Node.nodeValue`

这个Node接口的属性怕不是这三个属性/方法中最简单的一个了.

返回(获取)/设置当前节点对象的值.

下面的例子以Node.childNodes([index])的实例为蓝图.

```js
let node0 = nodeObj.childNodes[1]; // <h1>1</h1>
let nodeValue = node0.childNodes[0].nodeValue;
console.log(nodeValue); // 1
/*
	若只有node0.childNodes[0],则此结果为带引号的: "1"
*/
```

注意: 	且请注意:1也是节点对象,它不是值!!
	`nodeObj.childNodes[1].nodeValue;`得出的结果为null,也就是不存在.

这是因为 ` nodeObj.childNodes[1]`的结果: <h1>1</h1>,我们直接使用nodeValue获取的是当前节点对象的值,也就是h1的值,而不是1这个节点对象,这是一个常犯的错误,错误的认为1是值,而不是节点对象.

所以我们应当先使用childNodes属性获取h1节点对象的子节点对象,然后子节点对象再使用nodeValue属性,获取当前子节点对象的值,才是1.

##### 实例

```html
<body>
    <button onclick = 'aboutXML();'>获取XML文档数据</button>
</body>
<script>
    // Col == Collection
    let xhr,xmlDocObj, rootCol, rootChildCol;
    let  txt = '';
    function aboutXML() {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState==4&&this.status== 200) {
                xmlDocObj = this.responseXML;
                rootCol = xmlDocObj.getElementsByTagName('TRACK');
                for (let i = 0; i < rootCol.length;i++) {
                    rootChildCol = rootCol[i].childNodes;
                    rootGrandsonCol = rootChildCol[1].childNodes;
                    txt = txt + rootGrandsonCol[0].nodeValue + '\n'
                }
                console.log(txt)
                // 获取所有来自服务器响应的头部信息
                console.log(this.getAllResponseHeader());
            }
        }
        xhr.open('GET', 'https://www.w3school.com.cn/demo/music_list.xml', true);
        xhr.send(null);
    }
    
/* 其最后输出的结果为:
    再见
    All I Ask
    之乎者也
    Never Be Alone
    慢慢
    Complicated
    三生三世
    Five Hundred Miles
    演员
    Numb
    给未来的自己
    The Monster
    我终于失去了你
    Main Titles
    传奇
    完美生活
*/
/*
date: Fri, 14 Feb 2020 13:17:41 GMT
content-encoding: gzip
etag: "79e658e98fd51:0"
last-modified: Tue, 21 May 2019 05:46:36 GMT
server: Microsoft-IIS/10.0
x-powered-by: ASP.NET
vary: Accept-Encoding
content-type: text/xml
status: 304
cache-control: no-cache,no-cache
accept-ranges: bytes
content-length: 1607
*/
</script>
```

***代码解析***

-  ***xmlDocObj = this.responseXML;***

   ​	将与服务器交互数据的xhr对象,解析为人类可读的xml文档,并返回一个document对象.

   ​    即,将xml文档的接口暴露给JavaScript,使JavaScript通过实现DOM的Document接口的document对象操作和访问当前[终端发送请求给服务器上文件的]xml文档

- ***rootCol = xmlDocObj.getElementsByTagName('TRACK');***

  ​	返回一个HTMLCollection接口包含的元素的通用集合.

  ​    该集合的内容为: 指定节点对象下的指定名字的元素(节点对象).

  ​    集合特性为: 实时更新.随着有关集合的文档内容该变而改变.

  ​    也就是:将指定名字的元素打包成一个HTMLCollection的通用集合,    且集合是实时更新的.

  ​    并且指定名字的元素下的所有子元素(子树)会被搜索,但不包括该指定名字的元素.

  ​		这和Document.getElementsByTagName()类似,但是这个Document接口的getElementsByTagName()方法会搜索整个文档结构,包括根节点,而不是从指定名字的元素下所有子元素搜索.

- ***rootChildCol = rootCol[i].childNodes***

  返回一个NodeList对象的集合(类数组对象).

  该集合内容为:指定节点下的所有子元素(子节点对象).

  该集合特性为: 实时更新.即随着有关该集合文档的内容改变而改变.

- ***rootChildCol[1].childNodes***

  ​    rootChildCol: [text, title, text, artist, text, album, text, country, text, company, text, year, text]

  ​    而rootChildCol[1]则代表: title这个节点. 将此节点用XML文档代码的方式显示出来则是: <TITLE>再见</TITLE>

  ​    它的子节点对象(文本节点对象)为: txt

  ​    而这个集合就是: NodeList [tetxt]

- ***rootGrandsonCol[0].nodeValue*** 

  返回一个节点对象的值.

  此节点对象在: 指定节点对象集合的索引位置为0的第方.

-  ***console.log(this.getAllResponseHeader());***

   ​    该方法为XHR接口的方法,目的是为了返回所有来自服务器响应的头部信息. (即服务器接收请求并处理完必后再发给终端,使用此方法能获取服务器发到终端来的所有头部信息)

   ​    而且请注意:此方法是返回当前请求的头部信息!! 因为对于复合请求 (multipart requests)来说,它们的请求有2个及以上

   ​	所以这里强调返回的是当前请求,而不是最初的请求.

   对于获得服务器请求的头部信息来说,除了获取来自服务器响应的所有头部信息,当然也有能获取特定的头部信息了.

   ​	***XHR.getResponseHeader( '头部信息的名称' );***

   ​	例如用以上实例作为蓝图: 

   ​    `this.getResponseHeader('last-modified')`

   ​	得到结果:Tue, 21 May 2019 05:46:36 GMT

   

   

#### 使用HTML文档作为服务器上的文件

##### 描述

此实例所用的方法和 "使用XML文档作为服务器上的文件" 是大同小异的,或者可以这么说,两者几乎毫无区别,除了此实例多设置了一个responseType属性的值.

##### 实例

```html
<body>
    <h1>XMLHttpRequest 对象</h1>
    <button onclick='aboutHTML();'>获取本地HTML文档数据</button>
</body>
<script>
    let xhr, htmlDocObj, rootCol,rootChildCol, nodeValue;
    let txt = '';
    function aboutHTML() {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState ==4&&this.status == 0) {
                htmlDocObj = this.responseXML;
                rootCol = htmlDocObj.getElementsByTagName('div')
                for (let i = 0; i<rootCol.length; i++) {
                    rootChildCol = rootCol[i].childNodes;
                    rootGrandsonCol = rootChildCol[1].childNodes;
                    txt = txt + 	rootGrandsonCol[0].nodeValue + '\n'
                }
                console.log(txt)
                console.log(this.getAllResponseHeaders)
            }
        }
        xhr.open('GET', '被responseXML解析的HTML.html', true);
        // 关键步骤!必须设置,否则responseXML就会以text/xml解析
        xhr.responseType = 'document'
        xhr.send(null);
    }
</script>
```

***代码解析***

很显然,我使用的是本地/原生代码(Native Code)作为一个服务器上的文件,来被请求数据的,详情了解Native Code: 请ctrl + F作用于本篇 ,再搜索Native Code

- ***xhr.responseType = 'document'***

  ​    这步很关键,是和 "使用XML文档作为服务器上的文件" 有所区别的,因为在XML文档的实例当中,不需要写这一步.

  ​    这是因为  XHR.responseXML属性本身就被设置成这样: 即当responseType = "document"且请求已经以异步开始执行时,JS就会把服务器上返回的响应以人类可读的HTML文档来解析.

  *详情请看: 使用XML文档作为服务器上的文件 - XHR.responseXML*

- ***htmlDocObj.getElementsByTagName('div')***

  ​	获取HTML文档下所有div元素(节点对象),并将之组合成一个实时更新的HTMLCollection的通用集合.

- ***rootChildCol = rootCol[i].childNodes***

  ​	获取指定的节点对象下的所有子节点对象,并将之组合成一个实时更新的NodeList集合.

### POST方法示例

#### 描述

使用HTTP的POST和GET, 它们的区别在*AJAX示例-XMLHttpRequest()-使用GET还是POST* 中,我们已经讲过了,

而在这我所写的例子中很难体现出来

#### 示例

```html
<html>
<body>
<button type="button" onclick="aboutAjaxPOST()">获取数据</button>
</body>
<script>
    
    function aboutAjaxPOST() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status== 0) {
                console.log(this.responseText);
            }
        }
        xhr.open('POST','./myAjax.txt',true);
        // 如使用GET方法那样，可添加一个可选的方法
     // xhr.setRequestHeader("name", "value");
        // HTTP的方法不是GET/HEAD,所以不给send()方法null参数.
        xhr.send();
    }
/*
	name: content-type,内容的类型
	value: application / x-www-form-url encoded,					应用程序 	/   URL编码形式
*/
</script>
</html>
```

***代码解析***

- ***xhr.onreadystatechange = function() {...}***

  ​    将判断XHR对象的状态放到开头的原因和GET方法的示例是一样的.

  ​	即:这是因为XHR对象状态包括一个unset,即未调用open()方法,所以为了保证XHR对象的状态至少都可能存在,

  ​	所以把onreadystatechange()方法放到开头.否则将此方法写到open()的下面,就不存在unset状态了.
  
- setRequestHeader()方法,例如:

  ```js
  xhr.setRequestHeader(
  
  	"Content-Type", "application/x-www-form-urlencoded"
  
  );
  ```

  

### 使用回调函数完成请求

#### 以下看似是回调函数,其实不是

```html
<body>
    <button type="button" onclick="useCallback();">获取数据</button>
</body>
<script>
    function useCallback() {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status ==0) {
                myCallback(this);
            } 
        }
        xhr.open('GET','./myAjax.txt',true);
        xhr.send(null);
    }
    function myCallback(xhr) {
        console.log(xhr.responseText);
    }
</script>
```

请注意,这里没有使用到回调函数,即myCallback()函数不是一个回调函数,它只是一个简单的被调用的函数而已,而不是回调函数.(别被我取的名字所迷惑)

因为myCallbcak()函数没有作为参数给另一个函数,它并没有被创建副本.

***详情请看<函数.md>-回调函数***

#### 使用回调函数完成请求

```html
<body>
    <button type="button" onclick="useCallback(myCallback);">获取数据</button>
</body>
<script>
    function useCallback(formalParameter) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status ==0) {
                formalParameter(this);
            } 
        }
        xhr.open('GET','./myAjax.txt',true);
        xhr.send(null);
    }
    function myCallback(xhr) {
        console.log(xhr.responseText);
    }
</script>
```

***代码解析***

- ***onclick="useCallback(myCallback);"***

  ​    将myCallbcak整个函数(包括代码)作为参数传递给useCallback()函数.

  ​    注意这里的myCallback没有小括号,因为我们需要的不是它的返回值当作参数,而是将它本身当作参数,

- ***formalParameter(this);***

  ​	使用`useCallback(formalParameter)`函数的形参创建了一个传递过来的某东西的副本

  ​	*(当然这里是除了对象之外的东西,因为对象无法创建副本,它是易变的,它通过引用来寻址,而不是通过值,详情请看<对象.md>)*

  :`maCallback(),`

  此形参如同指针一般指向了其链接的myCallback()函数.

  ​	指针是什么就不用说了把,指针指向的内存空间地址,而内存空间地址的数据再怎么改变,指针依然能操作它.

### 使用php作为作为服务器上的文件

php是另一门脚本语言,只不过这个脚本语言是运行在服务器上的.

这里我们将以php文件作为获取数据的来源,即作为一个服务器,来获取它里面的数据.

但是由于我涉猎php语言不深,所以这里仅仅写下它的示例以及正确的解析.如要运行,还需要一些环境的安装等,所以在开头,我会给个超链接,可以直接运行的:用JavaScript获取php的数据的代码.

```html
<body>
    <h2>请在下面的输入字段中键入字母 A-Z：</h2>
    
    <p>
        搜索建议：
        <span id="txtHint"></span>
    </p>
    
    <p>姓名：<input type="text" id="txt1" onkeyup="showHint(this.value)">
    </p>
    
</body>
<script>
    function showHint(str) {
        var xhttp;
        if (str.length == 0) {
            document.getElementById("txtHint").innerHTML = "";
            return;
        }
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status==0) {
                document.getElementById("txtHint").innerHTML = this.responseText;
                console.log(this.responseText)
            }
        };
        xhttp.open("GET", "demo.php?q=" + str, true);
        xhttp.send();
    }
</script>
```

若将php需要运行的环境全部安装好了之后,将这段html源码贴到html文件正确的地方, 在新建一个.php文件,作为服务器文件.

**代码解析**

- ***onkeyup="showHint(this.value)">***

  onkeyup: 一个事件处理函数,处理keyup事件的函数.

  keyup:在当前元素上释放键盘按键时会触发`keyup事件.`即按下键然后释放后,触发此事件.

  this.value: 当前松开的键的value.

- ***xhttp.open("GET", "demo.php?q=" + str, true)***

  "demo.php?q=" + str :  引号中代表着php文件的URL

  str则代表`this.value`,即刚刚释放的键.

此处的获取php文件数据的示例只是一个大概,但是在忽略掉我们获取的是PHP文件时,则和获取txt,html,xml等文档的数据区别不大.

因为获取数据只需要一个对应的服务器的URL以及适配的接口即可.

而在这里我将这个示例单独拿出来讲,只是想说明,AJAX发送请求以及响应请求可以使用任何的类型来传输数据,也就是 描述 中所说的. 

**此示例达到的作用就是一个: "点题".**

### 单击就动态更新页面(服务器文件为XML)

```html
<style>
    table,th,td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th,td {
        padding: 5px;
    }
</style>
<body>
    <p>请点击某个曲目，可显示专辑信息。</p>
    <p id='showMUSIC'></p>
    <table id="tableElement"></table>
</body>
<script>

let x, i, xhr, xmlDoc, table;
    xhr = new XMLHttpRequest();
    xhr.open("GET", "被获取的XML文档.xml", true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            xmlDoc = xhr.responseXML;
            x = xmlDoc.getElementsByTagName("TRACK");
            table = "<tr><th>艺术家</th><th>曲目</th></tr>";
            for (i = 0; i < x.length; i++) {
                table += "<tr onclick ='displayMUSIC(" + i + ")'><td>";
                table += x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue;
                table += "</td><td>";
                table += x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
                table += "</td></tr>";
            }
            document.getElementById("tableElement").innerHTML=table;
        }
    }
    function displayMUSIC(i) {
        document.getElementById("showMUSIC").innerHTML =
            "<ul>" +
            "<li>曲目：" +
            x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue + "</li>" +
            "<li>艺术家：" +
            x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue + "</li>" +
            "<li>专辑：" +
            x[i].getElementsByTagName("ALBUM")[0].childNodes[0].nodeValue + "</li>" +
            "<li>国家：" +
            x[i].getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue + "</li>" +
            "<li>公司：" +
            x[i].getElementsByTagName("COMPANY")[0].childNodes[0].nodeValue + "</li>" +
            "<li>年份：" +
            x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue + "</li>" +
            "</ul>";
    } 	
</script>
```

**代码解析**

- ***table = "\<tr>\<th>艺术家\</th>\<th>曲目\</th>\</tr>";***

  其目的创建一个表格,包含:一行两列(其中列是表头)
  
  而table变量则是这个表格的表头
  
-  ***for (i = 0; i < x.length; i++) {...}***

  ​	此循环的目的是显而易见的.

  ​	为table表格添加一行两列的单元格,其单元格HTML源代码格式为为: 

  ```html
  <tr> 
  	<td>ARTIST节点对象的子节点对象的值</td>
  	<td>TITLE节点对象的子节点对象的值</td> 
  </tr>
  ```

  其中内容为: 

  ​	首先将得出的XML文档中的所有TRACK元素的HTMLCollection的通用集合进行遍历.

  ​	每次遍历,都取出该集合中第i个索引的**ARTIST节点对象的子节点对象的值** 以及 **TITLE节点对象的子节点对象的值.**

  ​	而此值就为每一列的的内容.

- ***onclick ='displayMUSIC(" + i + ")'***

  ​	这是table表格中每行的单击事件,即每次用鼠标单击一次表格中的行,就会触发对应的执行函数displayMUSIC();

  ​	而`" + i + "`则是将i转换成变量形式,使得每一行都对应一个i值.

  ​	第一行(不包括表头)的索引从0开始.

  ​	这个方法就可以让我们,单击第i行时,触发第i行的单击事件,并执行相应的处理函数.

  ​	而在处理函数中,我们也只需要获取此行是第几行,然后找到XML中的对应数据以一种格式呈现给用户.

- ***document.getElementById("tableElement").innerHTML = table;***

  将已经完善的表格渲染进入节点对象的ID为:tableElement里面.

  ```html
  <table id='tableElement'>
  <tbody>
      <tr><th>艺术家</th><th>曲目</th></tr>
      <tr onclick="displayMUSIC(0)">
          <td>值</td>
          <td>值</td>值
      </tr>
          <tr onclick="displayMUSIC(1)">
          <td>值</td>
          <td>值</td>值
      </tr>
          <tr onclick="displayMUSIC(2)">
          <td>值</td>
          <td>值</td>值
      </tr>
      ......
      
      
  </tbody>
  </table>
  ```

  其中表格最终呈现出来的源代码就为以上的样子.

### 获取其他网站的数据

是的,早就在上面我们已经重复说过,AJAX可以与服务器进行交互,所以这个例子就是以其他网站作为服务器上的文件获取它的数据.

这个网站,是我在网上随便找的一个网站.

这个实例又再一次告诉我们,AJAX获取数据的能力真的很强大!

```html
<body>
    <button onclick="demo();">获取</button>
</body>
<script>
    let xhr;
    function demo() {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                let htmlDoc = this.responseXML;
                console.log( htmlDoc.getElementById('cb_post_title_url').childNodes[0].nodeValue); // 将输出: Ajax与JSON的一些总结
            }
        }
        xhr.open(
            "GET", "https://www.cnblogs.com/rush/archive/2012/05/15/2502264.html"
            ,true);
        xhr.responseType = 'document';
        xhr.send();
    }
</script>
```

以上的URL就是我随便找的一个网站,通过responseXML属性,将之以HTML文档方式解析,我就能够有它的接口,从而操作这个文档,以获取我需要的数据

