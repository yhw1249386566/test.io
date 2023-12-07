- [MDN-Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)
- [Web Components大概讲解-阮一峰](http://www.ruanyifeng.com/blog/2019/08/web_components.html)

# [Web Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)

## what is Web Components?

Web Components,其中文翻译为:Web组件.

Web Components是一个技术,该技术允许我们创建可重用的定制元素(自定义的HTML元素),且定制元素的功能是可以封装到"代码"之外,并且能在Web应用中使用的.

而这具有各种功能*(是一个html元素,存在样式(css),交互(js))*的定制元素就是我们所说的web Components,即Web组件.

也就是说,Web组件其实就相当于一个被封装的代码,如同Jquery中封装的Ajax,或者是DOM操作($)等,或者说Web组件类似一个模块,一部分功能等.

如果你使用过诸如vue,react这样的组框架,那么想必你对Web组件并不会陌生,因为这些组件框架都是基于Native Web API创造出来的.

- 定制元素就是开发者自定义的一套模板或者某个元素,就好比我小明造了个冰箱(组件)给其他人用,其他人将这个冰箱克隆(使用JS内置API)

  然后向这个克隆的冰箱中添加东西*(一些JS代码)*或为冰箱贴一些图*(CSS)*,去完善整个克隆的冰箱.

  而源冰箱本身没有被改变,因为会有更多人使用这个冰箱来量身定制自己的冰箱.

  ​	这个冰箱就是我们所说的Web组件,其他人克隆的冰箱(克隆Web组件)就是从我们的代码仓库拷过去的, 

  ​	为这个克隆的冰箱添加自定义功能和外表就是其他人想要把这个冰箱改造的更适合自己,也就是让Web组件更适合自己的需求.

  ​	也就是说,web组件也可能被他人再进行修改以达到最合适的样子.

PS: 再次强调,基础是非常重要,因为编程中的基础,就如同数学中的四则运算般,是一切的基石.

我们可以这么说:基础=本质,如果你去追逐表象(框架,库),那么是无穷尽也,只要你掌握了本质(编程的基础),那么你就可以透过任何表象直看本质,从而极短时间内就可以把外人觉得难的问题解决.

##  为什么会存在Web Components?

这算是一个好问题,但是我想凡是有点编程基础的人都不会问出这个问题,但是,你们知道的,我这个是一篇技术文档,所以总是会面面俱到的*(可能也不会,:))*

作为开发者,我们都知道复用代码的重要性,那么凭什么Web中的元素(标签)及其功能就不能进行复用呢? 

虽然复用Web标签是一个非常好的主意,但是对于HTML的自定义标记结构*(HTML自定义的元素)*来说,通常不是那么容易就能复用的,

因为随着HTML变得越加复杂(包括相关的CSS和JS),我们不得不写代码来呈现这些自定义的UI控件*(HTML自定义的元素)*,并且如果一不留神，多次使用的控件会使我们的页面变得一团糟。

所以为了解决复用Web标签(包括自定义的)的造成了一系列问题*(太复杂的复用方式,不易阅读的复用代码)*,Web Components出现了,它旨在解决这些问题.

## Web Components使用的三项技术

### 描述

Web Components主要由三项技术构成,且这三项技术是可以一起使用来创建和封装指定功能的定制元素(自定义HTML的元素),

然后你就可以在任何地方重用你封装的定制元素,而不必担心代码冲突问题.

至于为什么不用担心代码冲突呢?是因为这三项技术其中的一项技术会解决代码冲突的问题*(Shadow DOM)*,

现在让我们来看看这三项技术分别是什么.

### 三项技术

#### Custom Elements(自定义元素)

一组JavaScript API，允许您定义custom elements及其行为(功能/方法)，然后可以在您的用户界面中按照需要使用它们。

***参见:<CustomElements.md>***

#### Shadow DOM(影子DOM)

一组JavaScript API，用于将封装的“影子”DOM树附加到元素*（与主文档DOM分开呈现）*并控制其关联的功能。

通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。

***参见:<ShadowDOM.md>***

#### HTML template元素(HTML模板元素)

[template](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)和[slot](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot)元素***(参见:\<template slot.md> )***使您可以编写不呈现在页面中显示的标记*(标签)*模板。

然后它们可以作为自定义元素结构的基础被多次重用。

## 实现Web Components的基本方法

### 描述

直到现在,我们已经知道了什么是web组件,为什么会存在web组件以及web组件使用的三项基本技术,

那么理所当然的,我们该去学习如何实现Web组件了.

其实这并不难,实际上Web组件使用的三项技术就包含了实现Web组件的方法,因为Web组件的实现是依赖于实现Web组件三项技术的.

下面让我们一起看看吧.

### 基本方法

1. 请创建一个类或函数*(实际上类就是函数)*指定Web组件的功能,也就是你自定义的这整个模板的作用是什么,如:你自定义了一个组件,具有添加,删除成员的功能.

   PS:如果使用类,请使用ES6规范中的语法.***参见:<class基本用法.md>***

2. 使用[CustomElementRegistry.define()](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomElementRegistry/define)方法注册你新定义的自定义元素,并向其传递要定义的元素名称、指定元素功能的类、以及可选的该元素所继承的父元素。

3. 如果你需要的话,可以使用[`Element.attachShadow()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/attachShadow) 方法将一个shadow DOM附加到自定义元素上.

   接着你就可以使用DOM方法向shadow DOM中添加子元素、事件监听器等等。

   接着可以使用DOM方法将shadow DOM中的内容拷贝到你自定义的元素(某个原生HTML元素)中,这样就实现了实例化Shadow DOM.

4. 如果你需要的话,使用[template](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template) 和[slot](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot)模板元素定义一个HTML模板

   接着再次使用常规DOM方法*(如:Node.cloneNode())*克隆模板并将其附加*(Element.attachShadow())*到您的shadow DOM中,最后实例化这个Shadow DOM.

5. 如果你愿意,你可以在页面上的任何位置使用自定义元素,就像使用原生HTML元素那样.

   PS:自定义元素默认display为inline.











