# [Histroy Interface](https://developer.mozilla.org/zh-CN/docs/Web/API/History) - [其他教程](https://javascript.ruanyifeng.com/bom/history.html)

## Time Recording

1. 2020-6-21-10:48

## 什么是 History 接口?

History 接口允许使用 JS 代码操作浏览器的某个页面内或者框架(iframe)内访问的会话历史记录.

*History接口不继承任何方法。*如: 某个浏览器的页面 A 中,用户进行点击某个按钮或标签等跳转到了另一个页面 B ,然后此时用户可以单击回退按钮就能 back 到页面 A 中, 然后又可以在页面 A 中点击前进按钮从 forward 到页面 B 中,

而这种操作,依赖于浏览器会忠实的记录下每个页面的会话历史记录,也就是在一个页面中由于触发一些事件(如: click 等)从而在当前页面进行各个页面的跳转,这些跳转的每个页面都会存放到记录中,即:我们将之称之为 会话历史记录.

用户可以通过点击前进或回退按钮,从而让浏览器从记录的页面会话历史中拿出当前页面的上一个或下一个页面地址记录,最后呈现给用户,完成前进或回退功能.

用一点专业的话描述以上操作:

History 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

## 点击回退或前进按钮

当用户点击回退或前进按钮时,会发生什么呢?

实际上,点击回退或前进按钮就是让浏览器调用实现 Hsitroy API 的对象的 back() 或 forward() 方法,从而实现了回退与前进功能.

注: go(number) 也可以实现,但该方法通常是开发者自己调用的,而非因为点击回退或前进按钮从而使浏览器调用的方法.

## History 接口的对象

对于 History 接口来说,浏览器已经内置实现了它的对象, history.

我们可以直接通过 history.xxx 的方式访问它的属性或方法,或者通过 window.history.xxx 的方式访问它的属性或方法,如:

```js
console.log(history === window.history); // true
```

## History 接口的属性和方法

### 属性

History 接口不继承任何方法。

#### [`History.length`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/length) 只读

返回一个整数,该整数表示会话历史中元素的数目,包括当前加载的页。例如,在一个新的选项卡加载的一个页面中,这个属性返回1。

##### 示例

![](picture/History\History.length.png)

#### [`History.scrollRestoration`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/scrollRestoration) 实验性功能

允许Web应用程序在历史导航上显式地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）。

#### [`History.state`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/state) 只读

返回一个表示历史堆栈顶部的状态的值。这是一种可以不必等待`popstate` 事件而查看状态的方式。

即: 该只读属性用来读取开发者使用 pushState() 或 replaceState() 方法添加/修改的状态对象(第一个参数的值).

##### 示例

在这里提前使用了 history.pushState() 方法,但是不影响你们知道 state 只读属性的用处.

![](picture/History\History.state.png)

### 方法

#### [`History.back()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back)

前往上一页, 用户可点击浏览器左上角的返回按钮模拟此方法. 等价于 `history.go(-1)`.

**Note:** 当浏览器会话历史记录处于第一页时调用此方法没有效果,而且也不会报错。

#### [`History.forward()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward)

在浏览器历史记录里前往下一页,用户可点击浏览器左上角的前进按钮模拟此方法. 等价于 `history.go(1)`.

**Note:** 当浏览器历史栈处于最顶端时( 当前页面处于最后一页时 )调用此方法没有效果也不报错。

#### [`History.go()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go)

通过当前页面的相对位置从浏览器历史记录( 会话记录 )加载页面。

比如：参数为-1的时候为上一页,参数为1的时候为下一页. 

当整数参数超出界限时( 译者注:原文为When `integerDelta` is out of bounds ),例如: 如果当前页为第一页,前面已经没有页面了,我传参的值为-1,那么这个方法没有任何效果也不会报错。

调用没有参数的 `go() `方法(相当于刷新该页面,当前页面会刷新)或者不是整数的参数时也没有效果。( 这点与支持字符串作为url参数的IE有点不同)。

注意:只要go()方法的参数指定的是整数,且存在与之相对应的会话历史记录,就会跳转过去.

##### 示例

```js
history.go(4); // 从当前页面开始计算,前进 4 页.
history.go(-2);// 从当前页面开始计算,回退 2 页
```

#### [`History.pushState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)

该方法存在三个参数:

1. `state`：一个与添加的记录相关联的状态对象,主要用于`popstate`事件。该事件触发时,该对象会传入回调函数(这个事件对应的回调函数)。
   
   也就是说,浏览器会将这个对象序列化以后保留在本地,重新载入这个页面的时候,可以拿到这个对象。如果不需要这个对象,此处可以填`null`。
   
   使用该方法之后,立即使用 state 只读属性,就能获取到该 state 对象.

2. `title`：新页面的标题。但是,现在所有浏览器都忽视这个参数,所以这里可以填空字符串。

3. `url`：新的网址,必须与当前页面处在同一个域。浏览器的地址栏将立即显示这个网址。
   
   即: 如果 url 为: `http://www.whwyhw.com` 就会抛出一个 DOM Expectation.
   
   如果新URL是相对路径，那么它将被作为相对于当前URL处理

按指定的名称和URL（如果提供该参数）将数据 push 进会话历史栈,数据被DOM进行不透明处理；并且你可以指定任何可以被序列化的 javascript 对象。

注意: 该方法的第二个参数已经被许多浏览器忽略.

##### 示例

![](picture/History\History.pushState().png)

请注意: pushState() 的第三个参数: url.

当使用该方法为当前页面的记录栈中添加新的会话历史记录后，浏览器地址栏立刻显示`主域名/url`，但并不会跳转到`主域名/url 这地址`，

甚至也不会检查`这个指定的地址`是否存在,它只是成为浏览历史中的最新记录。

这时,在地址栏输入一个新的地址(比如访问`google.com`),然后点击了回退按钮,页面的 URL 将显示`你刚刚添加的会话历史记录的地址`；

请注意: 指定的 `url` 将替换掉当前页面上的地址的域名后的所有字符串.

如:假设一开始页面地址为:`https://www.google.com.hk/undefined?api_key=1234567890`,但是使用了此示例的方法,这这个页面地址将会立即显示为:`https://www.google.com/urlPath`

但是页面是不会跳转过去,而是单纯的显示和向记录栈放入一条新的地址罢了.

注意: **使用该方法添加的新的会话历史记录处于当前页面的前一层**,即需要在当前页面前进才能访问到新添加的会话历史记录.

#### [`History.replaceState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState)

该方法存在三个参数:

1. `state`：一个与添加的记录相关联的状态对象,主要用于`popstate`事件。该事件触发时,该对象会传入回调函数(这个事件对应的回调函数)。
   
   也就是说,浏览器会将这个对象序列化以后保留在本地,重新载入这个页面的时候,可以拿到这个对象。如果不需要这个对象,此处可以填`null`。
   
   使用该方法之后,立即使用 state 只读属性,就能获取到该 state 对象.

2. `title`：新页面的标题。但是,现在所有浏览器都忽视这个参数,所以这里可以填空字符串。

3. `url`：新的网址,必须与当前页面处在同一个域。浏览器的地址栏将立即显示这个网址。

按指定的数据,名称和URL(如果提供该参数),更新历史栈上最新的入口。这个数据被DOM 进行了不透明处理。你可以指定任何可以被序列化的javascript对象。

该方法和 History.pushState() 的参数是一模一样的,且意思也一模一样,除了该方法是修改当前标签页的地址之外,没有任何区别.

##### 示例

如果一开始页面的地址为`https://www.google.com.hk/search?q=wo&oq=wo+&aqs=chrome..69i57j0l2j69i59j0l4.615j0j8&sourceid=chrome&ie=UTF-8`

当使用以下图示例的操作时,页面地址将被改为:`https://www.google.com.hk/replace-address`

![](picture/History\History.replaceState().png)

请注意: 这和 pushState() 方法不同,这个方法是在当前会话历史记录中添加新的地址并且立即显示该地址却不跳转过去,原来的地址还存在;

而 replateState() 方法则是把当前记录栈的最新入口(即当前页面显示的地址)立即更改为指定的地址,但是此时也并不会发生跳转,需要刷新,或者回退再前进才能跳转过去,**唯一不同的是:原来的地址会消失,变为更新后的地址.**

## popstate 事件

每当同一个文档(标签)的浏览历史（即 history 对象）出现变化时，就会触发popstate事件。

注意，仅仅调用 pushState() 方法或 replaceState() 方法 ，并不会触发该事件，只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用History.back()、History.forward()、History.go() 方法时才会触发。

另外，该事件只针对同一个文档(标签页面)，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。使用的时候，可以为popstate事件指定回调函数。

我们为该事件设置的事件监听器(回调函数)的第一个参数是由系统自动传递过啦爹 event 事件对象，

这个 event 事件对象存在 state 属性且该属性指向 pushState() 和 replaceState() 方法为当前 URL 所提供的状态对象（即这两个方法的第一个参数）。

```js
window.onpopstate = function (event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
};

// 或者
window.addEventListener('popstate', function(event) {
  console.log('location: ' + document.location);
  console.log('state: ' + JSON.stringify(event.state));
});
```

以上的 event.state 就是一个状态对象,即: pushState() 方法或 replaceState() 方法 的第一个参数的对象.

注: 在前面说过,这个 state 对象也可以直接通过 history 对象读取 => `history.state`

# 参考资料

- MDN - [History API 与历史记录交互](https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/history)