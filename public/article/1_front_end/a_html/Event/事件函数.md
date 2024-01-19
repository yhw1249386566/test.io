# addEventListener和removeEventListener

## [EventTarget.addEventListener()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

### 描述

addEventListener函数是EventTarget接口的一个API.

该函数为指定的对象注册一个事件监听器,用来监听指定对象上的事件的发生并执行对应的事件处理函数.

指定的对象(事件目标)可以是一个文档上的元素 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element),[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)和[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)或者任何其他支持事件的对象 (比如 `XMLHttpRequest`).

addEventListener函数的工作原理很简单: 将实现了[`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)的函数/对象 添加到调用了它的 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)上指定的事件类型的 事件侦听器列表中. 

### 语法

```js
target.addEventListener(type, listener, options);
target.addEventListener(type, listener, useCapture);
target.addEventListener(type, listener, useCapture, wantsUntrusted 非标准的);  // Gecko/Mozilla only
```

#### 参数详解

##### type 必选

表示监听[事件的类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)(一个字符串)

##### listener 必选

当被监听的事件类型触发时,会执行的事件处理程序.

listener 必须是一个实现了 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口的对象,或者是一个[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions).

是的,该参数可以是一个对象,只需要这个对象带有handleEvent属性即可,如:

```js
buttonElement.addEventListener('click', {
  handleEvent: function (event) {
    // do something...
  }
});
```

***参见:  [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口.***

需要注意的是:listener参数之所以可以是一个实现了EventListener接口的对象,是因为这是需要与以前遗留的内容进行兼容,	

所以我们并不建议在非需要兼容性的情况下,使用实现EventListener接口的对象中的handleEvent属性作为事件处理程序.

##### options 可选

一个用来配置事件有关信息的**对象**,可用的选项如下:

- **capture** Boolean类型 可选

  顾名思义: 捕获, 即如果设置该属性为true,则代表使当前元素在一系列相关元素*(祖先和后代的关系)*中触发事件的顺序基于事件捕获机制. 

  false则是基于事件冒泡,同时这也是默认值.

  ***(详见: 事件冒泡和事件捕获)***

- **once** Boolean类型 可选

  顾名思义:一次, 表示 listener参数在添加之后最多只调用一次.

  如果该属性值为true,listener 会在其被调用之后自动移除,如果为fasle,则代表不会被自动删除.

  **passive** Boolean类型 可选

  设置为true时,表示 listener参数中, 永远不会调用 [preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)方法,如果 listener参数 仍然调用了这个函数,客户端将会忽略它并抛出一个控制台警告.

  -  [preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault):当一个事件没有被显示处理时,就阻止它默认的动作发生,但事件仍然会继续 基于事件冒泡/事件捕获机制 传递下去.

     即阻止一个事件的默认行为发生**(详见:使用option参数的可选项passive属性改善滚屏性能 中的示例)**

  也就是说,在事件处理程序中,无法阻止一个事件的默认的动作发生,如:

  ​	本来在一个事件处理程序(对象的属性函数,***详见:同级目录-listener*** /函数)中,

  ​	我们可以调用Event.preventDefault()方法使一个复选框可以触发单击事件,但是却无法使复选框被选中 这一默认行为,

  ​	但是如果设置了passive属性值为true时,即使我们调用该方法也无法阻止复选框被选中这一默认行为,甚至客户端将会忽略该方法并抛出一个控制台警告.

##### useCapture 可选 Boolean类型

该属性和options属性的capture选项是等效的,即:决定当前元素和其相关元素*(祖先和后代的关系)*触发同名事件 是基于事件捕获 还是 事件冒泡机制***(详见: 事件冒泡和事件捕获)***

简单来说就是: 决定了事件传播的顺序是冒泡还是捕获.

该属性的默认值为false,即基于事件冒泡机制,这也是所有现代浏览器默认的值.

如果该属性的值为true,则代表当前元素的时间基于事件捕获机制.

---

为什么有了options参数中的可选项**capture**却还要有这个属性呢,这样岂不是效果重复了?

这是因为useCapture是历史的遗留.

在旧版本的DOM的规定中, `addEventListener()`的第三个参数(useCapture)是一个布尔值表示是否在捕获阶段调用事件处理程序.

但是随着时间的推移,很明显需要更多的选项.与其在方法之中添加更多参数*（传递可选值将会变得异常复杂）*,

倒不如把第三个参数改为一个包含了各种属性的对象,这些属性的值用来设置事件侦听器的有关参数,而这个对象就是现今我们看到的option参数.

**注意:** `useCapture` 仅仅在现代浏览器最近的几个版本中是可选的.例如 Firefox 6以前的版本都不是可选的,但是为了能够提供更广泛的支持,你应该提供这个参数.

##### wantsUntrusted非标准的

如果为 true, 则事件处理程序会接收网页自定义的事件.

此参数只适用于 Gecko（[chrome](https://developer.mozilla.org/zh-CN/docs/Glossary/Chrome)的默认值为true,其他常规网页的默认值为false）,主要用于附加组件的代码和浏览器本身.

### 返回值

undefined

### 事件为什么会一直被监听?

我们知道,如果为一个事件目标(如某个元素)注册一个事件监听器,那么在默认情况下,该元素不论在任何时刻触发指定的被监听的事件,都会使事件处理程序执行,这也代表着该元素上的事件一直在被客户端所监听,

而这是怎么实现的呢?

很简单,对于事件监听器来说,事件目标(元素)上的事件会处于 "目标阶段",类似事件冒泡阶段和事件捕获阶段这种概念.

*注意:这并不是说,目标阶段 等于冒泡阶段或者捕获阶段,它们只是概念上类似.*

在目标阶段上事件,会一直触发事件目标(元素)上的所有的对应监听器,而不在乎这个监听器在注册时是否基于事件捕获或事件冒泡机制.

而这种**在目标阶段一直触发事件目标上的监听器的这种操作,就是为什么事件目标上的事件会一直被监听的原因.**

以下是一浅显易懂的例子:

```html
<body>
    <button>点击</button>

</body>
<script>
	const button = document.querySelector('button');
    function demo() {console.log(1)}
    button.addEventListener('click', demo())
</script>
```

以上的例子中,我们在为button按钮注册事件监听器的时候就调用的demo函数,这表示如果,如果click事件确实会一直触发事件监听程序(demo函数),那么demo函数就会直接被执行.

很显然,click事件确实会一直触发事件监听程序,所以当一个事件被监听时,会一直触发事件监听器.

所以即使我们不点击button按钮,浏览器的Console仍然将会直接输出: 1.

### 有关options参数的安全检测

#### 为什么要进行该函数options参数的安全性检测?

我们知道,由于历史的遗留,一些旧版本的浏览器会假定addEventListener()函数的第三个参数是一个布尔值,而不会像现代浏览器一般,假定是布尔值或对象,

而这假定第三个参数只是布尔值的后果就是,如果开发者使用options参数对象作为addEventListener函数的第三个参数,很可能导致的后果就是当事件触发时,浏览器报错,其原因是因为当前用户的浏览器不支持将第三个参数设置为一个对象,

为了解决这种不可接受的错误,所以我们需要在将addEventListener的第三个参数设置为options对象时,进行以下安全性(是否可用)检测.

#### 检测方法

PS:以下的检测方法有问题,因为我实际测试的时候,浏览器并不会自己调用options.passive***(有关于对象访问器,参见:<对象.md>)***,所以passiveSupported将始终为false,我也并不知道是不是我的自己的问题...

现代浏览器一般都支持第三个参数为对象,至于如果工作硬是要求...以后再说吧,hhh. 2020-5-20.

检测方法是非常简单的,如:

```js
var passiveSupported = false;

try {
  var options = Object.defineProperty({}, "passive", {
    get: function() {
      passiveSupported = true;
    }
  });

  window.addEventListener("test", null, options);
} catch(err) {}
```

这段代码为 passive 属性创建了一个带有getter函数的 options 对象；getter设定了一个标识, passiveSupported,被调用后就会把其设为true.

那意味着如果浏览器检查 options 对象上的 passive 值时, passiveSupported 将会被设置为 true；否则它将保持 false.

然后我们调用 addEventListener() 去设置一个指定这些选项的空事件处理器,这样如果浏览器将第三个参数认定为对象的话,这些选项值就会被检查.

你可以利用这个方法检查options之中任一个值.只需使用与上面类似的代码,为选项设定一个getter.

当你想实际创建一个是否支持options的事件侦听器时,你可以这样做：

```js
someElement.addEventListener("mouseup", handleMouseUp, passiveSupported? { passive: true } : false);
```

我们在 someElement 这里添加了一个mouseup.

对于第三个参数,如果 passiveSupported 是 true ,我们传递了一个 passive 值为 true 的 options 对象；如

果相反的话,我们知道要传递一个布尔值,于是就传递 false 作为 useCapture 的参数.

如果你愿意,你可以用一个类似 [Modernizr](https://modernizr.com/docs) 或 [Detect It](https://github.com/rafrex/detect-it) 的第三方库来帮助你做这项测试.

### 为什么要使用addEventListener?

在 *事件介绍 - 该使用哪种机制* 一节中,我已经说过为什么要使用addEventListener,但是不是很完整,所以这里我将做个补充

- 它允许给一个事件注册多个监听器. 特别是在使用[AJAX](https://developer.mozilla.org/zh-CN/docs/Glossary/AJAX)库,JavaScript模块,或其他需要第三方库/插件的代码.
- 它提供了一种更精细的手段控制 listener(事件处理程序) 的触发阶段.(即可以选择一系列元素(祖先和后代的关系)中的同名事件触发的顺序是基于捕获还是冒泡).
- 它对任何 DOM 元素都是有效的,而不仅仅只对 HTML 元素有效.

### 在某个事件处理程序中为DOM添加事件监听器

当一个 EventListener在 EventTarget正在处理事件的时候(即事件处理程序正在执行时)被注册到 EventTarget上,它不会被立即触发,但可能在事件流后面的事件触发阶段被触发,例如可能在捕获阶段添加,然后在冒泡阶段被触发.

如:

```html
<style>
    div {
        width: 100px;
        height: 100px;
        background-color: gray;
    }
</style>
<div>
	<button>点击</button>
</div>
<script>
    const div = document.querySelector('div');
    const button = document.querySelector('button');
    button.addEventListener('click', function () {
        console.log('button');
        // 事件处理程序中添加的事件监听器
        div.addEventListener('click', 
                             () => { console.log('div')})
    })
</script>
```

![](/picture/在某个事件处理程序中为DOM添加事件监听器.png)

当我们单击button按钮时,将会输出: button \<br/> div.

这其实就是一个顺序执行的问题,因为单击button按钮时,会触发它的click事件处理程序,默认情况下会首先执行完该事件处理程序,

如果我们在该事件处理程序中为它的父元素注册一个同名事件click,那么当button按钮的click事件处理程序执行完成时,会继续冒泡到父元素执行同名click事件处理程序,由于我们已经为父元素注册了一个同名事件,

那么自然,父元素的同名事件也会执行,这个在事件处理程序中为它的父元素注册同名事件,然后同名事件会在冒泡阶段被触发的本质就是 程序的顺序执行.

### 同一个EventTarget注册多个相同的事件处理器

同一个 EventTarget 注册了多个相同的 EventListener,那么重复的实例会被抛弃.

所以这么做不会使得 EventListener 被调用两次,也不需要用 [removeEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener) 手动清除多余的EventListener ,

因为重复的都被自动抛弃了,前提是第三个参数值*(如useCapture参数 或 options参数对象其中的属性值)*一致,如果第三个参数的值不一致,此时就算重复定义,也不会被抛弃掉.

注意:这里指的相同的事件处理器是: 使用同一个对象名或同一个函数名.

```js
EventTarget.addEventListener('click', handler)
EventTarget.addEventListener('click', handler)
```

此时这种情况下,单击一次事件目标,只能触发一次handler函数; 但是若第三个参数指不一样,则仍然会触发两个事件处理函数handler:

```js
EventTarget.addEventListener('click', handler)
EventTarget.addEventListener('click', handler,{passive:true})
```

### 事件处理程序中this指向的问题

#### addEventListener函数中this的指向

通常来说this指向的是触发事件的元素的引用,而这种特性在多个相似的元素使用同一个通用事件监听器时非常让人满意.

当使用 addEventListener() 为一个元素注册事件监听器的时候,事件处理程序里的 this 指向(即它的值)是该元素的引用.其与传递给事件处理函数的 event 参数的 currentTarget 属性的值一样.

#### html事件属性的值若为JS语句的this的指向

即使一个事件是使用HTML元素上的属性注册的(如onclick),那么在这个html事件属性上对应的JavaScript语句的this的指向也仍然是当前注册该事件的元素的引用, 也是等于Event.currentTarget.

这是因为html事件属性的值若是一个JavaScript语句,那么JS语句实际上会被包裹在一个处理函数中,而在这个处理函数中使用this的效果和使用addEventListener来绑定事件的效果是一样的.

```html
// 单击p元素时,Console将输出: p
<p onclick="console.log(this.localName)" </p>
```

#### html事件属性的值若为函数的this的指向

若HTML事件属性不是JavaScript语句,而是一个函数,则该函数中的this指向和标准规则里面是一样,即指向全局(window)对象,在严格模式中,this值为undefined.

```html
<p onclick="demo()" </p>
<script>
	function demo() {console.log(this)}
</script>
```

当我们单击p元素时,this值将指向:window对象.

![](/picture/html事件属性若值为函数其内部this指向的问题.png)

### [使用 option参数的可选项passive属性 改善滚屏性能](https://developers.google.com/web/updates/2016/06/passive-event-listeners)

- **详见: 语法 - 参数详解 - options 可选**

根据规范,option参数的可选项passive属性值的默认值始终为false.

但是,这引入了处理某些触摸事件（以及其他）的事件监听器在尝试处理滚动事件时阻止浏览器的主线程的可能性,从而导致滚动处理期间性能可能大大降低(**浏览器需要等待对应的事件监听器执行完毕才会去执行事件的默认行为**)

即:当用户通过可触摸设备在浏览器滚动时(向上/下滑动),会触发默认的滚动事件,该事件被触发时会执行对应的监听器并会使事件的默认行为发生:使浏览器发生滚动.

- 默认行为:不需要开发者特意设置,也会执行的默认动作(代码块)

但由于这个默认行为是可以在监听器中使用preventDefault()方法阻止的,而如果默认touchmove事件的监听器中阻止了该事件的默认行为发生,

则页面就会无法滚动,所以浏览器必须首先知道事件监听器中是否会调用preventDefault()方法阻止事件的默认行为发生(页面滚动行为),

但浏览器如果无法预先知道监听器中是否会调用preventDefault()方法,那么浏览器只能先等监听器执行完毕后再去执行默认行为,

而监听器的执行是需要耗费时间的,甚至耗费的时间可能会很明显,而这就直接导致用户在滚动页面时,会感觉延迟、卡顿,

就算(touchmove)事件的监听器是一个空函数,但执行空函数仍然也要花费时间,所以为了解决页面滚动延迟问题,我们需要**让浏览器事先知道事件监听器中不可能调用preventDefault()方法去阻止事件默认行为的发生**,

而这只需要将addEventListener()函数的第三个参数对象options的可选属性passive的值设置为true即可.

```js
// 当触点在触控平面上移动时触发touchmove事件
myDOM.addEventListener('touchmove', 
                      function listener(){...}
                      { passive: true });
```

为touchmove事件添加{passive:true}后,浏览器就知道该事件的监听器中无法使用preventDeafult()方法去阻止默认行为的发生(这同样适用于鼠标滑动滚动事件)

这就会使在可触摸的设备上进行滑动 或 在正常的PC端的浏览器上使用鼠标滑轮进行滚动时 不会由于需要执行对应事件的监听器从而造成页面卡顿和延迟问题.

注意:除了touchmove事件之外,还有一些事件也会影响滚屏性能,如:touchstart事件、touchend事件.

- touchstart 手指触摸屏幕时触发,即使已经有手指在屏幕上也会触发。
- touchmove 手指在屏幕滑动时触发.
- touchend 手指从屏幕时移开时触发.

如果没有设置options参数对象的可选属性passive为true,你不妨想象一下,当你在可触摸设备的浏览器上进行页面滚动时,

你将手指按在屏幕上并进行滑动时,

首先会触发touchstart事件,由于浏览器不知道你这个事件是否会阻止该事件的默认行为*(使浏览器可以滚动或缩放页面,如果组阻止了它,则浏览器无法发生滚动或缩放页面这一行为),*

所以User Agent会执行完touchstart的监听器之后,才会因为你手指进行滑动时又触发touchmove事件,但是又由于浏览器不知道你是否会在该事件的监听器中阻止该事件的默认行为发生(滑动页面),所以浏览器会执行完监听器后才会继续滑动.

这一想想就觉得不可接受,太耗时了,用户会奔溃的,他们会直接关闭你的页面!

- touchstart和touchmove事件的默认行为都是和页面是否能滚动有关.

所以某些浏览器为了防止此问题（特别是Chrome和Firefox）,它们已将在文档级节点对象上的( [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)，[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)和[`Document.body`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/body))touchstart和touchmove事件的passive选项的默认值更改为true

这可以防止浏览器必须调用事件监听器且等待事件监听器执行完毕从而导致在用户滚动时无法即使使页面呈现的问题.

## EventTarget.removeEventListener()

### 作用

删除使用 [`EventTarget.addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 方法添加的事件。

### 语法

```js
target.removeEventListener(type, listener[, options]);
target.removeEventListener(type, listener[, useCapture]);
```

#### 参数解析

1. type

   一个字符串，表示需要移除的事件类型，如 `"click"`。

2. listener

   需要从目标事件移除的 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 函数。

3. options

   表示一个指定事件侦听器其他有关信息的可选对象.	

4. useCapture

   指定需要移除的 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 函数是否为捕获监听器。如果无此参数，默认值为 `false`。

这四个参数对应的就是addEventListener()函数中的参数.

需要注意的是后第四个参数必须和对应的需要被移除的事件监听器的配置是一样的,否则无法移除.

例如:如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，这两次事件需要分别移除。

两者不会互相干扰。移除捕获监听器不会影响非捕获版本的相同监听器，反之亦然。

**详见 : 匹配要删除的事件监听**

### 返回值

undefined

### 匹配要删除的事件监听

removeEventListener()函数必须匹配前两个参数,而**第三个参数只需要匹配options参数对象的capture属性 或者 useCapture属性, 其他值不需要匹配也能删除.**

#### 匹配useCaputure属性

```js
element.addEventListener("mousedown", 
                         handleMouseDown, 
                         true);
```

```js
element.removeEventListener("mousedown", 
                            handleMouseDown, 
                            false);     // 失败

element.removeEventListener("mousedown", 
                            handleMouseDown, 
                            true);      // 成功
```

#### 匹配option参数对象的capture属性

```js
element.addEventListener("mousedown", 
                         handleMouseDown, 
                         {capture:true});
```

```js
element.removeEventListener("mousedown", 
                            handleMouseDown, 
                            {capture:false});     // 失败

element.removeEventListener("mousedown", 
                            handleMouseDown, 
                            {capture:true});      // 成功
```

#### 匹配非capture或useCapture的属性

```js
element.addEventListener("mousedown", 
                         handleMouseDown, 
                         {passive:true,once:true});
```

```js
element.removeEventListener("mousedown", 
                          handleMouseDown,
                          {passive:true 或 false,
                           once:true 或 false}); // 成功
```

#### 总结

通过以上的三个示例,我们知道:

removeEventListener()只需要匹配addEventListener()的第三个参数的 option参数对象的可选capture属性 或者 useCapture属性, 其他值不需要匹配也能删除事件目标注册的事件监听器.

但值得注意的是,一些浏览器版本在这方面会有些不一致, 除非你有特别的理由, 使用与调用 addEventListener() 时配置的参数去调用removeEventListener()是明智的.

即:我始终建议, 您使用removeEventListener()去移除一个DOM的事件监听器时,removeEventListener()中的参数需要完全匹配 在您前面使用addEventListener()为DOM注册事件监听器时的参数 要一致,以防止可能出现的兼容性问题.

### 事件监听器被移除后会立即终止

一个 [`EventTarget`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget) 上的 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 被移除之后，如果此事件正在执行，会立即停止。 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 移除之后不能被触发，但可以重新绑定。

在EventTarget上,调用removeEventListener()函数去移除一个未注册的EventListener(事件监听程序),是没有任何用处的.

## [Polyfill 解决兼容性](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/removeEventListener#Polyfill)

一些比较旧的浏览器不支持 `addEventListener()` 和 `removeEventListener()` 方法。

可以将以下代码复制到脚本的开头来兼容这些旧版本的浏览器。值得注意的是，这个解决方案仍然不适用于 IE 7 及更早的 IE，因为 `Element.prototype` 属性直至 IE 8 才支持。

```js
if (!Element.prototype.addEventListener) {
  var oListeners = {};
  function runListeners(oEvent) {
    if (!oEvent) { oEvent = window.event; }
    for (var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type]; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        for (iLstId; iLstId < oEvtListeners.aEvts[iElId].length; iLstId++) { oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent); }
        break;
      }
    }
  }
  Element.prototype.addEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
    if (oListeners.hasOwnProperty(sEventType)) {
      var oEvtListeners = oListeners[sEventType];
      for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
        if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
      }
      if (nElIdx === -1) {
        oEvtListeners.aEls.push(this);
        oEvtListeners.aEvts.push([fListener]);
        this["on" + sEventType] = runListeners;
      } else {
        var aElListeners = oEvtListeners.aEvts[nElIdx];
        if (this["on" + sEventType] !== runListeners) {
          aElListeners.splice(0);
          this["on" + sEventType] = runListeners;
        }
        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
          if (aElListeners[iLstId] === fListener) { return; }
        }     
        aElListeners.push(fListener);
      }
    } else {
      oListeners[sEventType] = { aEls: [this], aEvts: [ [fListener] ] };
      this["on" + sEventType] = runListeners;
    }
  };
  Element.prototype.removeEventListener = function (sEventType, fListener /*, useCapture (will be ignored!) */) {
    if (!oListeners.hasOwnProperty(sEventType)) { return; }
    var oEvtListeners = oListeners[sEventType];
    for (var nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) { nElIdx = iElId; break; }
    }
    if (nElIdx === -1) { return; }
    for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
      if (aElListeners[iLstId] === fListener) { aElListeners.splice(iLstId, 1); }
    }
  };
}


```







