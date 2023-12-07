# [!DOCTYPE html](https://www.w3school.com.cn/tags/tag_doctype.asp) - [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/Doctype)

```html
<!DOCTYPE html>
```

- 在HTML5之前,曾经存在三种<!DOCTYPE>声明,在HTML5中只有以上一种.

- 任何浏览器都支持该标签

- 该标签的作用是:指示web浏览器(让web浏览器知道)关于当前页面应该使用哪个HTML版本进行编写的指令

- 该标签必须声明在文档的第一行,且要位于<html>标签之前.

- HTML5不基于SGML所以不需要引用[DTD](https://www.w3cschool.cn/dtd/dtd-intro.html)

- 这个声明的目的是防止浏览器在渲染文档时,切换到我们称为“[怪异模式(兼容模式)](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Quirks_Mode_and_Standards_Mode)”的渲染模式.

   确保浏览器按照最佳的相关规范进行渲染,而不是使用一个不符合规范的渲染模式..

# [head](https://www.w3school.com.cn/tags/tag_head.asp)-[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/head)

## 描述

```html
<head>
</head>
```

 标签用于定义文档的头部,它是所有头部元素的容器.<head> 中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等等.

文档的头部描述了文档的各种属性和信息,包括文档的标题、在 Web 中的位置以及和其他文档的关系等.

绝大多数文档头部包含的数据都不会真正作为内容显示给读者.

下面这些标签可用在 head 部分:

- [base](https://www.w3school.com.cn/tags/tag_base.asp)
- [link](https://www.w3school.com.cn/tags/tag_link.asp)
- [meta](https://www.w3school.com.cn/tags/tag_meta.asp)
- [script](https://www.w3school.com.cn/tags/tag_script.asp)
- [style](https://www.w3school.com.cn/tags/tag_style.asp)
- [title](https://www.w3school.com.cn/tags/tag_title.asp)

title标签:定义文档的标题,它是 head 部分中唯一必需的元素.

## 提示和注释

**提示：**应该把 <head> 标签放在文档的开始处,紧跟在 <html> 后面,并处于 <body> 标签或 <frameset> 标签之前.

**提示：**请记住始终为文档规定标题！

## head中basic标签

### base

base 标签为页面上的所有链接规定默认地址或默认目标.


通常情况下,浏览器会从当前文档的 URL 中提取相应的元素来填写相对 URL 中的空白.

使用 \<base> 标签可以改变这一点.浏览器随后将不再使用当前文档的 URL,而使用指定的基本 URL 来解析所有的相对 URL.这其中包括 \<a>、\<img>、\<link>、\<form> 标签中的 URL.

### link

### scirpt

### style

### [meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

#### 描述

meta标签是重要的标签之一,需要花精力去详细的深入了解它.

meta标签属于[Main content categories](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)中的Metadata content

meta元素标签表示那些不能由其他 HTML 相关元素表示的任何元数据信息. 其他相关元素,如:  \<base> \<link> \<style> \<title>以及 \<scrip>

以下属性的详情,请参见:[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta).

#### meta的属性

注意: 全局属性 name 在 meta元素中具有特殊的语义(类型);

另外:在同一个 <meta> 标签中,name, http-equiv 或者 charset 三者中任何一个属性存在时,[itemprop](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/itemprop) 属性(全局属性)不能被使用.

- 即:这四个属性无法混用,既无法出现在一个meta标签中.

此元素当然也包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes).

且该属性不仅仅只有以下我们书写的属性,例如,name属性的值:还有format-detection, apple-mobile-web-app-capable等等.(参见,bilibili的[直播页面](https://live.bilibili.com/3600178)的meta属性)

##### charset

此特性声明当前文档所使用的字符编码,但该声明可以被任何一个元素的 **lang** 特性的值覆盖.

只建议使用鼓励使用 UTF-8.如: <meta charset="UTF-8">

##### content

此属性包含http-equiv 或name 属性的值,具体取决于所使用的值.

也就是说:这个属性用来当作http-equiv 或name 属性的一个"description".

##### http-equiv

###### 描述

这个枚举属性定义了能改变服务器和用户引擎行为的编译,而这个编译值使用content属性来定义.

即该枚举属性能改变二者的编译行为.

###### 有关兼容性的设置(IE)

参见:[stackoverflow](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do) or [CSDN](https://blog.csdn.net/u012118993/article/details/57083804)

` <meta http-equiv="X-UA-Compatible"content="ie=edge,chrome=1"/>`

- X-UA-Compatible是自从IE8新加的一个设置,对于IE8以下的浏览器是不识别的. 通过在meta中设置X-UA-Compatible的值,可以指定网页的兼容性模式设置.

- 其中"IE=Edge,chrome=1″: IE = edge告诉IE使用最新的引擎渲染网页.

  chrome=1可以激活[Chrome Frame.](https://baike.baidu.com/item/%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8%E5%86%85%E5%B5%8C%E6%A1%86%E6%9E%B6/4008106?fromtitle=Google%20Chrome%20Frame&fromid=554580)
  
  - edge:边缘

在网页中指定的模式优先权高于服务器中(通过HTTP Header)所指定的模式. 兼容性模式设置优先级：meta tag > http header

常用的例子：

```html
<meta http-equiv="X-UA-Compatible" content="IE=7">  
#以上代码告诉IE浏览器,无论是否用DTD声明文档标准,IE8/9都会以IE7引擎来渲染页面.  
<meta http-equiv="X-UA-Compatible" content="IE=8">  
#以上代码告诉IE浏览器,IE8/9都会以IE8引擎来渲染页面.  
<meta http-equiv="X-UA-Compatible" content="IE=edge">  
#以上代码告诉IE浏览器,IE8/9及以后的版本都会以最高版本IE来渲染页面.  
<meta http-equiv="X-UA-Compatible" content="IE=7,IE=9">  
<meta http-equiv="X-UA-Compatible" content="IE=7,9">  
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
#以上代码IE=edge告诉IE使用最新的引擎渲染网页,chrome=1则可以激活Chrome Frame.
```

注意事项：

1. 根据官网定义X-UA-compatible 标头不区分大小写;不过,它必须显示在网页中除 title 元素和其他 meta 元素以外的所有其他元素之前.如果不是的话,它不起作用
2. content的内容是IE=8,或者IE=edge等值,注意不是IE8或者直接写个edge的值,否则不起作用
3. 如果对WEb服务器了解,可以直接配置一下VirtualHost: Apache:

##### name

该属性定义文档级元数据的名称.如果meta中的其中一个属性设置了itemprop, http-equiv or charset ,就不能在设置这个属性了.

以下为name属性的值,注意这些'值'其实就相当于类型,需要使用content属性去定义其值具体用来做什么.

###### [renderer](https://blog.csdn.net/adc_god/article/details/51531263)

告诉浏览器这个网址应该用哪个内核渲染,浏览器就会在读取到这个标签后,立即切换对应的内核.并将这个行为应用于这个二级域名下所有网址.

其值使用content属性er书写.

```html
<html>
  <head>
    <meta name="renderer" content="webkit|ie-comp|
                                   ie-stand" />
  </head>
  <body>
  </body>
</html>
```

content的取值为webkit,ie-comp,ie-stand之一,区分大小写,分别代表用webkit内核,IE兼容内核,IE标准内核. 

1. 若页面需默认用极速核,增加标签：<meta name="renderer" content="webkit"> 
2. 若页面需默认用ie兼容内核,增加标签：<meta name="renderer" content="ie-comp"> 
3. 若页面需默认用ie标准内核,增加标签：<meta name="renderer" content="ie-stand">

各渲染内核的技术细节

| 内核            | Webkit    | IE兼容 | IE标准                        |
| :-------------- | --------- | ------ | ----------------------------- |
| 文档模式        | Chrome 21 | IE6/7  | IE9/IE10/IE11(取决于用户的IE) |
| HTML5支持       | YES       | NO     | YES                           |
| ActiveX控件支持 | NO        | YES    | YES                           |

###### viewport

它提供有关视口初始大小的提示,仅供移动设备使用.***详见:有关手机端***

使用content属性去定义其值.

###### author

就是这个文档的作者名称,可以用自由的格式去定义；使用content属性去定义其值.

###### keywords

包含与逗号分隔的页面内容相关的单词.使用content属性去定义其值.

###### description

其中包含页面内容的简短和精确的描述. 使用content属性去定义其值.

一些浏览器,如Firefox和Opera,将其用作书签页面的默认描述.

###### referrer(实验性功能)

制所有从该文档发出的 HTTP 请求中HTTP Referer 首部的内容. 

使用content属性去定义其值,参见:[MDN-meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

###### [format-detection](https://www.bbsmax.com/A/D854XQyW5E/)

其中文的意思是“格式检测”,顾名思义,它是用来检测html里的一些格式的.

我相信你们肯定遇到过: 明明写的一串数字没加链接样式,而某些设备,如iPhone会自动把该数字加链接样式、并且点击这个数字还会自动拨号！

若我们并不想这么做,想去掉这个拨号链接,那该如何操作呢？即使用meta元素的name属性的format-detection,来修改元数据信息.

关于meta的format-detection属性主要是有以下几个设置：

- `meta name="format-detection" content="telephone=no/yes"`

  telephone=no/yes 禁止/允许把数字转化为拨号链接！

- `meta name="format-detection" content="email=no/yes"`

  email=no/yes 告诉设备禁止/允许识别邮箱,点击邮箱地址不自动跳转或发送右键.

- `meta name="format-detection" content="address=no/yes"` 

  adress=no/yes 禁止/允许跳转至地图！

如若不设置,其该属性的contend中的默认值都为yes.

###### apple-mobile-web-app-capable

`<meta name='apple-mobile-web-app-capable' content=yes/no />`

设置Web应用是否以全屏模式运行: 该元素标签将删除默认的苹果工具栏和菜单栏,即在Mobile Safari(一种浏览器)中删除.

如果content设置为yes,Web应用会以全屏模式运行,反之为no,则不会,<b>默认值为no</b>.

~~可以通过只读属性window.navigator.standalone来确定网页是否以全屏模式显示.~~该属性并不存在,2020-4-30.

但是存在window.navigator.Navigator是一个接口,表示  用户代理的状态和标识. 它允许脚本查询它和注册自己进行一些活动.

###### [apple-mobile-web-app-status-bar-style](https://stackoverflow.com/questions/6582732/what-does-apple-mobile-web-app-status-bar-style-do)

在name属性的值是基于apple-mobile-web-app-capable该属性值,如果apple-mobile-web-app-capable属性值为no,则apple-mobile-web-app-status-bar-style将不生效.

其目的在于: 一旦应用进入全屏模式（即用户已将网站添加到其主页）,我们还可以使用来控制页面顶部剩余的状态栏的颜色的name属性:`apple-mobile-web-app-status-bar-style`,

根据官方文档,该name属性值对应的content属性值为:

```
如果将内容设置为default,则状态栏显示为正常.
如果设置为black,则状态栏为黑色背景.
如果设置为black-translucent,则状态栏为黑色且半透明.
如果设置为default 或 black,则Web内容显示在状态栏下方(状态栏覆盖web内容)
    如果设置为black-translucent,则Web内容显示在整个屏幕上,且状态栏将会遮盖部分的web内容
```

注意事项：

1. 该name属性所属的meta元素,仅在您加载的*第一*页上有效；导航到另一个页面将使地址栏和导航按钮重新出现.

   因此,如果您希望此方法有效,则必须构建单个页面网站（对于多个“页面”,请考虑使用Ajax页面加载方法,例如jQuery Mobile框架中使用的方法）.

2. 且该属性值仅当您*通过应用程序快捷方式图标*访问网页时,此方法才有效;如果您直接从Mobile Safari中导航到该网站,则没有任何效果.

###### [theme-color(实验性功能)](https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color)-[或参考这](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android)

`<meta name="theme-color" content="一个人任何有效的css颜色值"`

theme-color:主题颜色.

我们可以通过meta元素的name属性值:theme-color设置一个web的工具栏(菜单栏)颜色.

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\InitElement\picture/meta-theme-colro.png)

以上红色箭头指的就是该属性值所该表的菜单栏的颜色.

###### [supported-color-schemes](https://github.com/whatwg/html/issues/4504)

##### scheme(已被弃用)

#### 关于手机端

```html
<meta name="viewport" content="width=device-width,initial-scale=1" />
```

- **name="viewport"**

  指浏览器的视区

- **content="width=device-width"**

  将设备的宽度 赋值给浏览器视区宽度. 此时就相当于浏览器视区宽度等于设备宽度

- **initial-scale=1"**

  初始化缩放比例,将当前的浏览器布局窗口认为是已经缩放过后的,并让这缩放过后的视区宽度等于设备宽度

  相当于width=device-width

#### 有关meta的常见设置

以下设置只为最基本的配置,若你需要详情,请参见:[meta](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meta)

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge, chrome=1" />
    <meta name="keywords" content="个人博客,结构性知识,博客,技术性网站,knowledge,blog,yomua,yhw" />
    <meta name='author' content="www.whyhw.com" />
    <meta name="description" content="本网站旨在为作者本人打造一个优秀的'蛛网'似的结构性知识" />
    <meta name="referrer" content="origin" />
</head>
```

#### 总结

name属性就是用来作为描述一个类型,而这个类型具体用来干什么我们使用content属性的值来描述它.

- name属性存在很多类型,请参阅官方文档.content也是这样

http-quiv就没什么好说明的,charset也是如此.