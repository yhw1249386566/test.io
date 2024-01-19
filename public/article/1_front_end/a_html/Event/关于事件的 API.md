

# 前言

所有没有 `()` 的都代表属性,如果有 `()` 则代表方法.

且如果属性是只读属性,则会在右边写上两个字:只读 以作为标志

# [Event接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

`Event` 接口表示在 DOM 中发生的任何事件, 一些是用户生成的（例如鼠标或键盘事件），而其他的事件则由 API 生成（例如指示动画已经完成运行的事件，视频已被暂停等等）

事件通常由外部源触发，同样也会以编程方式触发，例如执行一个 `element` 的一个 [HTMLElement.click( )](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click) 方法，或通过定义事件，

然后使用 [EventTarget.dispatchEvent( )](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) 将其派发到一个指定的目标。有许多类型的事件，其中一些使用基于主要事件接口的其他接口。

事件本身包含所有事件通用的属性和方法。

- [Event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
- [Event.stopPropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)
- [Event.stopImmediatePropagation()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation)
- [Event.target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)
- [Event.currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget)

# [EventListener接口](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener)

此接口未实现或继承任何属性,且由于需要与以前遗留的内容进行兼容，EventListener 可以接受一个函数，也可以接受带有 handleEvent() 函数属性的对象。

该接口只有一个方法,该接口的作用就是为事件添加事件处理程序.

- [EventListener.handleEvent()](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener/handleEvent)

# [EventTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget)

EventTarget是一个由可以接收事件的对象实现的接口，并且可以为它们创建(注册)事件侦听器。

# [EventSource](https://developer.mozilla.org/zh-CN/docs/Server-sent_events/EventSource)

`EventSource` 是服务器推送的一个网络事件接口

# API释义

## Event接口

### [Event.target](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/target)

触发事件的对象 (某个DOM元素) 的引用,它和Event.currentTarget是不同的(总是指向事件当前绑定的对象)

### [Event.currentTarget](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/currentTarget) 只读

它总是指向事件绑定的对象,而不是触发事件的对象(这是event.target做的)









