[TOC]



# 前言datalist

[HTML常用标签或属性全称](https://juejin.im/post/5db30a73e51d452a0e212b4e)

请注意,<time datatime="2020-4-30">至今</time>任何的HTML元素都不是为了其默认样式的装饰效果而使用的,开发人员应该考虑到HTML元素标签的语义与正确的应用,而关于样式那是CSS做的事情.

例如:不应该只是为了斜体样式,而去使用em,i元素,只为了粗体而去使用b,strong元素一样.*有关于CSS,请看CSS文件夹.*

<hr />

不正确的嵌套html元素,会导致浏览器在渲染时,将不会按照源码的顺序渲染,如:

```html
    <table>
        <figcaption>yomua</figcaption>
    </table>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/不正确的嵌套html元素.png)

# EasyElement

## time

### 描述

存在开始和结束标签.

与其标签的字面意思意思一样,time元素用来表示24小时制时间或者[公历日期](http://en.wikipedia.org/wiki/Gregorian_calendar),若表示日期则也可包含时间和时区.

**用法提示:** 如果给定的日期不是正常日期或者在公历中最早的日期之前,请不要使用此元素。

**状态提示**: 该元素仍在设计和讨论中([查看有关于此的信息](http://blog.whatwg.org/weekly-time-data))

### 属性

除了可使用全局属性之外,该标签还具有以下属性

#### datetime

该属性表示此元素的时间和日期,并且属性值必须是一个[有效的日期格式,并可包含时间](http://www.w3.org/TR/html5/common-microsyntaxes.html#valid-date-string-with-optional-time)。 如果此值不能被解析为日期,元素不会有一个关联的时间戳.

且如果未定义该属性,则必须在该元素的内容中规定日期或时间,你或许可以不这么做,但是就失去了此语义标签的价值.

#### putdate

该属性仍在被WHATWG 和 W3C组织设计和讨论中,有关信息参见:[此处](http://blog.whatwg.org/weekly-time-data)

### 示例

```html
<p>
	我在<time datetime="2020-02-14">情节</time>这天有个约会.
</p>
```



```html
<p>
	<time datetime="2020-04-29 19:34">现在</time>我仍在持续学习.
</p>
```

## [embed](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/embed)

只存在开始标签,不存在结束标签.

该元素为外部内容嵌入元素,即将外部内容嵌入文档中的指定位置,此内容由外部应用程序或其他交互式内容源（如浏览器插件）提供.

​    请记住,大多数现代浏览器已经**弃用并取消了对浏览器插件的支持**,这表明该元素几乎已经被弃用了,

​    所以如果您希望您的网站可以在普通用户的浏览器上运行,那么依靠 <embed> 通常是**不明智**的.

​    所以该标签在很多浏览器中(如360,chrome等)都不被支持,它依靠的是类似flash这种插件,不过基于Mozilla的浏览器:Firefox支持.

## object param

### [object](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/object)

存在开始和结束标签

html中的object元素,表示:引入一个外部资源,如:一张图片,一个嵌入的浏览上下文,亦或是一个插件所使用的资源.

```html
<body>
    <object data="../meta/demo.png" type="image/png">
    </object>
</body>
```

即:该元素标签可以做到如同img元素标签的功能.它可以嵌入到[form](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)元素中

其常用属性为:

- data,

  ​	一个合法的 URL 作为资源的地址,需要为 data 和 type 中至少一个设置值.

- type

  ​	为data 指定的资源(URL)的 [MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) 类型,需要为 data 和 type中至少一个设置值.

  ​	如:image/jpeg,  image/png, audio/mpeg等

### [param](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/param)

#### 描述

只存在开始标签.

param元素为object元素定义参数.

param元素只能是object的元素.

#### 属性

param元素除了具有全局属性外,还有以下属性:

##### name

参数的名字.

##### value

确定参数的值。

#### 示例

```html
    <object data="./img/5.png"></object>

    <object data="./img/6.png" >
        <param name="picture" value="06">
    </object>
```



## [hr](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hr)

### 描述

只存在开始标签.

hr标签表示内容之间的主体转换,例如:一个故事中的场景的改变,或一个章节的主题的改变,这中间就可以使用hr标签来进行分割.

在HTML的早期版本中,它是一个水平线。现在它仍能在可视化浏览器中表现为水平线,但**目前被定义为语义上的,而不是表现层面上**。

### 属性

该属性只具有全局属性(曾经独有属性已经被淘汰了,因为它们可以被css样式取代.)

### 示例

```html
<style>
    * {padding: 0; text-decoration: none;}
    a:visited {color: blue;}
</style>
	<section>
        <h1>火星救援</h1>
        <article>

            <header>
                <a href="#">宇宙-></a> 
                <a href="#">银河系-></a> 
                <a href="#">火星</a>
            </header>

            <main>
                <h1>搜索行动可能被终止???</h1>
                <p>
                    大部分人已经放弃火星搜索任务,
                    那是不可能完成的事情!
                </p>
            </main>
            <footer>
                <em> 
                	<time datetime="2020-4-30">今日</time> 
                	火星搜索已被停止
                </em>
            </footer>
        </article>
    </section>

    <hr>

    <section>
        <h1>水星救援</h1>
        <article>
            <header>
                <a href="#">宇宙-></a> 
                <a href="#">银河系-></a> 
                <a href="#">水星</a>
            </header>
            <main>
                <h1>找到了生命迹象???</h1>
                <p>宇宙中,水星存在生命!这不是演习!</p>
            </main>
            <footer>
                <em> 
                	<time datetime="2020-4-30">今日</time> 
                	水星上找到了生命存在的痕迹!
                </em>
            </footer>
        </article>
    </section>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/hr.png)

显然的,我们使用了hr标签分割了一个章节中两段不同的内容,这就是hr标签的语义.

当然的,我们可以为hr标签进行一些美化,不过那是css的事,并不在html的讨论范围(曾经有关html样式的html属性已经被css替代)

## [fieldset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset)

### 描述

存在开始标签和结束标签

fieldset 元素通常用来对表单中的控制元素进行分组(也包括 label 元素).

且我们可以在fieldset中使用legend标签为每一组fieldset添加标题,其代码和样式请见示例

### 示例

```html
    <form action="" method="GET">
        <fieldset>
            <legend>form</legend>
            <input type="text" required>
            <input type="submit">
        </fieldset>
    </form>

    <label for="">
        <fieldset>
            <legend>label</legend>
            我是标签
        </fieldset>
    </label>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/fieldset.png)

### 属性

该元素包含[所有全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes),即除了HTML元素本身的全局属性之外,还可以使用其他全局属性.

且它有三个属性,

1. disabled

   如果设置了这个 Boolean值属性, 它的后代表单控制元素也会继承这个属性(*除了首个可选的 legend 元素*),.

   其功能例如:禁止编辑,该元素和它的子元素不会接受任何浏览器事件, 比如点击或者 focus 事件, 一般来说浏览器会将这样的元素展示位灰色.

2. form

   规定fieldset所属的form表单. 这个属性的值与其所属的form的ID相同. 默认值是最近的那个form. 

3. name

   控制元素分组的名称

   The label for the field set is given by the first [`legend`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/legend) element that is a child of this field set.

   即:字段集的标签由作为该字段集的子元素的第一个legend元素给出

# 语义元素(HTML5,以下都只有全局属性)

## [article](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article) 

### 描述

存在开始标签和结束标签.

article元素标签是HTML5中的语义标签,它表示文档/页面/应用/网站中的一个独立结构,即:article元素标签的目的在于成为一个可独立分配的/可复用的结构.

这也表明,即使删除了除article元素之外的其他html元素,存在于article元素中的内容(普通文本和元素)对于读者来说依然是有意义的.

### 使用说明

- article元素通常包含标题元素(h1-h6)作为子元素,因为article元素意为:文章,文章怎么能没有标题呢.

- article元素可以嵌套使用,这代表子article元素的内容必须和父article元素中的内容相关,否则没有嵌套的意义

  如:一个article: 一篇博客文章; 另一个article: 该博客文章的评论

  那么,代表博客文章评论的article元素 可以嵌套在 代表博客文章的article元素中.

- article元素中除了有普通元素(如p,span等)之外,还可以嵌套其他语义元素,如:页眉(header),页脚(footer),旁白(aside).

  恰当的嵌套语义元素,对于屏幕阅读器和浏览器以及其他优化是非常友好的,而且对开发人员来说也是如此,总好过写一堆div,不是吗?

  并且如果你想要对文档(该article元素)进行样式设置,恰当的的语义元素嵌套也是非常有用的,如:你可以很准备的为某篇博客的页脚进行样式设置.

- article元素和section元素可以相互嵌套,如:一本书,可以拆分为若干个章节,每个章节又有相关的文章,每一篇文章又包含相关的信息节

  ```html
      <!--book-article为自定义标签-->
  	<book-article>
        <!-- 第一节 -->  
          <section>
               <!-- 第一章 -->  
              <article>
                   <!-- 第一小节 -->  
                  <section>1</section>
              </article>
          </section>
  
           <!-- 第二节 -->  
          <section>
               <!-- 第一章 -->  
              <article></article>
               <!-- 第二章 -->  
              <article></article>
          </section>
  
      </book-article>
  ```

- article元素通常会嵌套在一个div元素中,因为由于浏览器还不兼容[HTML5大纲](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines),这会导致article元素中的h1标题元素的大小会被强制缩小一些,除非更改CSS样式,***参见:<使用HTML章节与大纲.md>***

  或将h1元素移出article元素,写在article元素上面也是可以的,

  注意: 如果嵌套的article /section/两者相互嵌套 都写了h1元素,则在内层的h1元素默认情况下一定会小于外层的h1元素

### 属性

该元素只具有全局属性

### 示例

#### article和section相互嵌套及div元素作为"根"

```html
    <div>
        <h1>关于恐龙的一篇文章</h1>
        <article class="About dinos">
            <article class="film_review">
                <!-- 页眉 -->
                <header>
                    <h2>侏罗纪公园</h2>
                </header>
                <!-- 主评论 -->
                <section class="main_review">
                    <p>恐龙真是太棒了!</p>
                </section>
                <!-- 用户评论 -->
                <section class="user_reviews">
                    <!-- 第一个用户评论 -->
                    <article class="user_review">
                        <p>好可怕呀!!!</p>
                        <footer>
                            <p>
                                发布于
                                <time datetime="2015-05-16 19:00">May 16</time>
                                ----Lisa
                            </p>
                        </footer>
                    </article>
                </section>
                <!-- 页脚 -->
                <footer>
                    <p>
                        Posted on
                        <time datetime="2015-05-15 19:00">May 15</time>
                        by Staff.
                    </p>
                </footer>
            </article>
        </article>
    </div>
```

从以上示例中,我们可以发现:

​	div元素作为该"文章"的根元素,该文章的标题使用h1元素注明,然后接着就是atricle和section的嵌套,从表明来看,这两个元素的语义类似.

以下为该文章的结构

- 文章标题h1

  ​	|- 页眉header

  ​	|- 主评论section

  ​	|- 用户评论section

  ​		|- 第一个用户评论article

  ​			|- 评论时间和评论人footer

  ​		|- 第二个...article

  ​			|- 评论时间和评论人footer

  ​	页脚footer

- PS:页脚footer并不一样要放入整个页面的下面,还可以放在一篇文章或一个评论的下面,如以上的例子.参见:[使用HTML章节与大纲](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Sections_and_Outlines_of_an_HTML5_document).md

## [section](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)

### 描述

存在开始和结束标签.

section元素标签表示一个包含在HTML文档中的独立部分,通常会包含一个标题元素,至今位置(2020/4/28),没有更具体的语义去解释section.

比如,我们应该把导航菜单写在[nav](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav)元素里面,但是像搜索结果列表和地图显示及其控件没有特定元素来放置它们,可以将它们放入section元素中,当然,div中也行.

### 属性

该元素只存在全局属性

### 使用说明

- 通常每一个section元素都存在一个标题标签,即:每一个section都存在自己的标题结构.
- 如果元素内容可以分为几个部分的话,应该使用article,而不是section
- 不要把section元素作为一个普通的容器来使用,这本应该是div的用法. 
- 一般来说,一个section 应该出现在文档大纲中.
- section元素可以进行嵌套使用

### 示例

#### 使用section

```html
<!-- html5之前的写法 -->

<div>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</div>

<div>
  <h2>Heading</h2>
  <img src="bird.jpg" alt="bird">
</div>

<!-- html5的写法 -->

<section>
  <h1>Heading</h1>
  <p>Bunch of awesome content</p>
</section>

<section>
  <h2>Heading</h2>
  <img src="bird.jpg" alt="bird">
</section>
```

#### 嵌套的section

```html
    <section>
        <h1>外部h1</h1>
        <section>
            <h1>内部h1</h1>
        </section>
        <section>
            <h1>内部h1</h1>
        </section>
    </section>
```

section元素可以进行相互嵌套. 但是和article元素一样的是,如果在section元素内部写了h1元素,则默认情况下该h1元素将会比正常的h1元素小一些.

且如果嵌套的article /section/两者相互嵌套 都写了h1元素,则内层的h1元素默认情况下一定会小于外层的h1元素,形成类似于:外部是h1,而内部像h2的样式

## footer

存在开始和结束标签.

footer元素表示一个离它最近的/父 article元素或section元素的页脚.

当然了,该元素也可以用来表示其他元素的页脚,

一个页脚通常包含该章节作者,版权数据或者与文档相关的链接等信息,至于很多人把该元素直接拿来作为一个页面的底端元素,而不是为了描述某个元素的内容意义,如:作者,相关信息等.

就和很多人把header元素当作一个页面的顶部,而不是将header元素用来作为一个页面的页眉,展示些介绍性的或是辅助导航的实用元素等,***详见:header***

### 属性

该元素仅有全局属性

### 使用说明

- footer元素内的作者信息应包含在address 元素中.
- footer元素不是章节内容,因此在[outline](https://developer.mozilla.org/en-US/docs/Sections_and_Outlines_of_an_HTML5_document)(***大纲 <使用HTML章节与大纲.md>***)中不能包含新的章节.
- footer元素可以在一个web文档中存在多个,只要正确应用即可,如在一个article或section元素的底部.

### 示例

#### 存在于article中的footer

```html
<article>
	<header>
		<h2>The Planet Earth</h2>
		<p>yomua</p>
	</header>

	<p>I Love You</p>
    
    <footer>
    	<address>author:Yhw</address>
        Copyright © 2020 by Yomua. All Rights Reserved. 
    </footer>
</article>
```



## header

### 描述

header元素用于展示介绍性内容,通常包含一组介绍性的或是辅助导航的实用元素.

它可能包含一些标题元素,但也可能包含其他元素,比如 Logo、搜索框、作者名称,等等.

### 属性

此元素仅拥 [全局属性](https://developer.mozilla.org/zh-CN/docs/HTML/Global_attributes)

### 使用说明

- header元素不应该被单纯作为一个容器应用,如作为一个页面顶端的容器应用,除了该容器中包含了一些与其语义相关的元素,

  如:标题元素,log,搜索框等.

  若只是单纯的为了其header这个名字,为什么不直接使用div + class=header呢?

- header元素可以在一个web文档中存在多个,只要正确应用即可,如在一个article或section元素的头部.

### 示例

#### 存在于article中的header

```html
<article>
	<header>
		<h2>The Planet Earth</h2>
		<p>yomua</p>
	</header>

	<p>I Love You</p>
    
    <footer>
    	<address>author:Yhw</address>
        Copyright © 2020 by Yomua. All Rights Reserved. 
    </footer>
</article>
```

## [address](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/address)

### 描述

address元素表示其中的 HTML 提供了某个人或某个组织(等等)的联系信息

由address元素中任何形式的内容所提供的联系信息适用于上下文的背景信息,可以是必要的任何一种联系方式,比如:

真实地址、URL、电子邮箱、电话号码、社交媒体账号、地理坐标等等.

此元素应该包含对应的个人联系信息、团体或组织的名称.

address可以使用在多种语境中,例如在文章开头提供商务的联系方式,或者放在article元素内,指明该文章的作者.

### 属性

该元素只具有全局属性

### 使用说明

- 当表示一个和联系信息无关的任意的地址时,请改用 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/p) 元素而不是 `` 元素.

- 这个元素不能包含除联系信息之外的任何信息,比如出版日期（这应当被包含在time 元素之中）.

- 通常,address元素可以放在footer 元素之中(如果存在的话),

  ***详见:footer - 示例***

### 示例

#### 简单的addresss使用

```html
  <address>
    You can contact author at 
      <a href="http://www.whyhw.com">
    		www.somedomain.com
      </a>.<br>
    If you see any bugs, please 
      <a href="mailto:webmaster@somedomain.com">
    		contact webmaster
      </a>.<br>
    You may also want to visit us:<br>
    Eyes of God <br>
    China<br/>
  </address>
```

## main

### 描述

main元素用来呈现body或应用的主体部分,主体部分由与文档直接相关，或者扩展于文档的中心主题、应用的主要功能部分的内容组成。

且每一个文档(页面)都只能存在一个main元素.

### 使用说明

在文档中，main元素和其中的内容应当是独一无二的。

任何同时存在于任意一系列相关文档中的相同、重复内容都不应当存在于main元素中, 如:

两个文档同时使用一个侧边栏/导航栏链接/版权信息/网站 Logo等,则这些元素都不应该存在于main元素中,而是应该属于其他元素,如header或footer又或者是aside元素.

注意,如果多个文档中同时使用一个搜索框,若该搜索框为文档的主要功能,则可以写在main中,否则不应该写在main元素中.

### 属性

main元素仅包含[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)。

### 可访问性相关

main>元素的行为与 [`main` 界标](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Roles/Main_role)(ARIA的role全局属性)所定义的角色相一致。

 [界标](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques#Landmark_roles)可被辅助技术使用，以快速识别并将用户导航到文档中的分段。

但是现在我们通常使用 main元素，而不是定义 role="main"，除非是考虑[对于旧浏览器的兼容性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/main#Browser_compatibility),那么就要在main元素中使用ARIA属性并设置其值: role="main",以考虑低版本的浏览器可能不支持main元素

### 使用哈希标记#直达main元素

直达内容（skipnav），是一种辅助功能技术，使其用户可以快速跳过大段的重复内容（如主导航栏、信息横幅等）。

这允许用户更快地访问到页面的主要内容。

```html
<body>
  <a href="#main-content">Skip to main content</a>
  <!-- navigation and header content -->

  <main id="main-content">
    <!-- main page content -->
  </main>
</body>
```

## nav

### 描述

nav元素表示页面的一部分，其目的是在当前文档或其他文档中提供导航链接。导航部分的常见示例是菜单，目录和索引。

在同一个文档中,nav元素可以存在多个.

### 使用说明

- 并不是所有的链接都必须使用nav元素包裹,它只用来将一些热门的链接放入导航栏,如:

  ​	footer元素就常用来在页面底部包含一个不常用到的导航栏,没必要加入nav的链接列表.

- 一个网页也可能含有多个nav元素,例如一个nav是网站内的导航列表,另一个nav是本页面内的导航列表.

- 对于屏幕阅读障碍的人,可以使用nav元素来确定是否忽略初始内容.

### 属性

nav元素只包含[全局属性](https://developer.mozilla.org/zh-CN/docs/HTML/Global_attributes).

### 示例

```xml
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav> 
```

是的,我们通常使用ul或ol元素中的li元素来和导航链接(a元素)对应.

## [hgroup](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hgroup)(实验中的元素)

该元素已从W3C规范移除,但是[WHATWG](https://zh.wikipedia.org/wiki/%E7%B6%B2%E9%A0%81%E8%B6%85%E6%96%87%E6%9C%AC%E6%87%89%E7%94%A8%E6%8A%80%E8%A1%93%E5%B7%A5%E4%BD%9C%E5%B0%8F%E7%B5%84)仍然对齐支持(毕竟他们才是大爷),需要注意的是有些编译器可能已经移除了hgroup元素,把他当作开发者自定义的元素了,如VSCode.

hgroup将2个及以上的标题元素组合在一起,形成多级标题.

# 定义 定义元素的元素

- dl: definition list 定义列表
- dt: definition term 定义术语
- dfn: defined a Definition Term  定义一个 定义术语
- dd: definition description 定义描述 

## 描述

这四个通常都是一块出现的

## [dl](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dl)

dl元素标签有可以称之为:一个描述列表的元素标签

dl元素标签是: **一个包含术语定义和有关术语描述的标签.**

其通常用于展示词汇表或者[元数据](https://zh.wikipedia.org/wiki/%E5%85%83%E6%95%B0%E6%8D%AE)又或者某个专业术语.

并且使用该元素时通常也会使用dt,dfn,dd三个元素标签,因为它们可以说是"一体的"

## [dt](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dt)和[dfn](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dfn)

### dt

用于在一个定义列表(dfn)中声明一个术语.

dt元素仅能作为dl元素的子元素(必须是子元素,而不是后代元素,如孙元素等).

且dt元素的紧邻同胞元素通常是dd元素,该元素通常用来解释dt元素中声明的术语. 

若存在多个dt元素,则通常来说,仍然将这些多个dt元素中的术语声明的解释,写在紧邻的一个dd元素中,而不是写多个dd元素.

### dfn

用来表示一个术语的定义.

dfn元素能完美的和dt元素进行配合,因为:

- dfn表示一个术语的定义
- dt用于声明一个术语(在定义列表dl中)

通常dfn存于dt元素中,因为这是语义的关系.

dfn是不一定需要存在于dl元素中的,它可以单独的被使用,去定义一个术语,而dt元素只能存dl元素中,也是定义一个术语.

既然它们都是定义一个术语,而**dt元素又必须是dl的子元素**,所以**不可能被dfn嵌套,所以只能由dt元素去嵌套dfn**.

## [dd](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dt)

用来解释一个描述列表元素(dl元素)中的某一个术语的意思.

即: 用来解释说明,在dl中使用dt(和dfn)定义的某个术语的意思.

同样的,该元素和dt元素一样,必须是dl元素的子元素,无法是孙元素什么的.

如果存在需要多个解释的术语,则依然是只需要一个dd元素即可,将多个术语的解释都可以放置于该元素中.

## 示例

```html
<dl>
    <!-- 声明术语 -->
    <dt>
    	<dfn>
            <!-- 定义了一个术语:Yomua -->
        	Yomua
        </dfn>
         <dfn>
            <!-- 定义了一个术语:Yhw -->
        	Yhw
        </dfn>
    </dt>
    
	<dt>
    	<dfn>
            <!-- 定义了一个术语:yhw -->
        	<abbr title="A name">Yhw</abbr>
        </dfn>
    </dt>
    
   	<!-- 术语意思 -->
    <dd>
		Yomua is very clever. <br />
        Yhw is a name.<br />
    </dd>
</dl>
```

通过以上例子你也应该很清楚这四个元素标签的语义了.

且如果你愿意的话,你也依然可以在dfn元素中假如其他元素,例如:abbr,表示当前定义的这个术语其实是一个缩写,如果以上例子的第二个术语: Yhw一样.



# [figure](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figure)&[figcaption](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/figcaption)

## 内容分类

figure: [Flow content](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#Flow_content), [sectioning root](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Sectioning_roots), palpable content.

figcaption: 无内容分类,因为它通常属于figcaption元素的子类,是一个可选的元素

## 描述

两个元素都存在开始标签和结束标签

其中figure为figcaption的父级,且figcaption可选.

figure元素代表一段独立的内容,  经常与ficaption标签配合使用, 并且作为一个独立的引用单元.

当它属于主内容流（main flow）时,它的位置独立于主体.

这个标签经常是在主文中引用的图片,插图,表格,代码段等等,当**这部分转移到附录中或者其他页面时不会影响到主体**.

## 属性

figure和figcaption都只包含全局属性(属于html的全局和非属于Html的全局)

## figure使用说明

- 通常figure是图像,插图,图表,代码片段等,在文档的主流程中引用,但可以移动到文档的另一部分或附录而不影响主流程.
- 作为[sectioning root](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML_sections_and_outlines#Sectioning_roots),figure元素的内容轮廓将从文档的主要轮廓中排除.
- 通过在其中插入figcaption（作为第一个或最后一个子元素）,可以将标题与元素相关联.图中找到的第一个元素显示为图的标题.

## 示例

```html
<style>
    img {
        width: 100px;
    }
    figcaption {
        background-color: rgb(255, 255, 255);
        width: 100px;
        color: rgb(245, 199, 131);
        /* font-style: italic;
        font-weight: smaller;
        font-family: sans-serif; */
        font: italic smaller sans-serif;
    }
</style>

<body>
    <figure>
        <img src="./img/5.png" alt="动漫图">
        <figcaption>动漫赛高</figcaption>
    </figure>
</body>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/figureANDfigcaption.png)



# 选项菜单控件(select,optgroup,option,datalist)

## select

###  描述

select元素表示一个控件,它提供一个可供选择的选项菜单控件(类似于下拉列表框,但是可以不让它呈现下拉列表框的样式).

在select元素中,使用option元素作为该(菜单)控件的选项,我们可以使用optgroup元素对单个或多个选项进行分组(使用label属性作为分组的标题)

### 属性

- html中的所有属性用法:

  ***参见:[HTML属性参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes) 或 <HTML-ALL-Attributes.md>***

select元素除了有全局属性之外还存在以下属性:

#### [autocomplete](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/%E8%87%AA%E5%8A%A8%E5%AE%8C%E6%88%90%E5%B1%9E%E6%80%A7)

html中的自动补完属性,用于form或者input.

为可输入的字段提供建议值.

#### autofocus

这个属性能够让一个对象在页面加载的时候获得焦点. 

在一个页面上下文中, 只有一个对象可以有这个属性,并且是布尔值(true 或者 false).

#### disabled(禁用指定对象)

这个属性表明一个用户是否可以操控该表单对象. 

如果这个属性没有被明确定义, 则从它的父元素继承, 例如 fieldset;

 如果没有父元素设置 disabled 属性, 那么默认该表单对象 enabled(可用).

#### form

select所关联的form表单 (即select元素所属的表单元素是哪"). 

如果这个属性被明确定义, 那么它的值一定是在同一个document中表单ID. 这样能够让你把select标签放在任何的位置, 不仅限于作为form表单的后代元素.

若该属性未被定义,则默认为其父元素表单,如果父元素表单不存在,则select元素将不会关联任何表单.

#### multiple

##### 描述

这个布尔值的属性标记select是否可以多选. 默认是单选.

如果设置该属性,则select元素的默认样式将被改变.

##### 示例

```html
    <select name="test" multiple >
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
        <option value="">4</option>
        <option value="">5</option>
    </select>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/select-multiple属性未设置时.png)

​											(未设置multiple属性时)

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/select-multiple属性设置时.png)

​											(设置了multiple属性)

通过以上两个结果,我们很容易发现: 如果设置了multiple属性,则select元素的默认样式将被改变,改变成可滚动的选项控件,而不是类下拉列表框了.

注意: 使用size属性可以滚动列表框的可见行数,***详见:size***

#### name

控件名称	

#### required 

规定select的值不能为空(布尔值).

#### size

##### 描述

如果控件显示为滚动列表框,则此属性表示为控件中同时可见的行数。浏览器不需要将选择元素呈现为滚动列表框。默认值为0

*提示: 根据HTML5规范, 默认值应该为1； 但是,在实践中,这样会影响到一些网站,同时其它浏览器也没有那么处理,所以Mozilla 在Firefox中选择继续使用默认值 0 .*

##### 示例

```html
    <select name="test" size="5" multiple >
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
        <option value="">4</option>
        <option value="">5</option>
    </select>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/select-size属性.png)

这里的示例基于了 ***multiple属性*** 中的示例,我们设置size属性值为5,这代表着,当前指定的滚动列表框(select元素)同时可见的行数为5行.

需要注意的是: 如果设置size的属性值大于其select元素中选项的个数,则仍然有效,即将size值改为6:

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/select-size属性-大于选项个数.png)

很明显的,从图中我们可以看见红色椭圆的位置有个空白,这就是size属性值大于选项个数造成的结果.

size属性仍然会留出一个和前面选项的高,宽度一样大小的占位空间.

## optgroup option

### optgroup

#### 描述

optgroup元素其实是个简写,其全称应该为:option group,就和hgroup元素相同,都是代表一个组.

optgroup元素表示一个option元素组,即在select元素中的一组option元素.

且该元素只能为select元素的子元素,将之设置在别的地方,几乎无任何意义.

#### 属性

optgroup元素除了具有全局属性之外,还存在以下属性:

##### disabled

和select元素这个属性一样,将当前指定的选项组设置为禁用.

通常浏览器会置灰这样的控件,它不会再接受任何浏览器事件,例如鼠标点击或者焦点相关的事件.

##### label 必要

选项组的名字,通常来说使用optgroup元素时,该属性必须设置,否则optgroup元素的意义就不大了.

### [option](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/option)

#### 描述

存在开始和结束标签

option元素是select,optgroup,datalist元素中包含的项.

即该元素可用放在以上任意元素中,作为它们的项.

#### 属性

##### disabled

意如其名,和select,optgroup元素中的disabled属性一样的用处.

##### label

通常来说该属性用来表示option元素会显示的文本.

但是这只是通常来说,鉴于浏览器厂商的不同,可能出现的效果也不同,如基于Blink内核的chrome,会将label属性指定的值作为option元素显示的文本; 

而基于Gecko内核的Firefox并不会将label属性的值作为option元素显示的文本,而是将 在option元素中写入的文本作为其选项名.

- Chome版本为:80.0.3987.149
- Firefox版本为:76.0beta

所以我这里始终建议,在option元素中写入文本,而不是使用label属性.如:

```html
<option>文本名字</option>
```

##### selected

selected属性表示当前指定的option元素会呈现为初始选中状态,通常来说一个select控件只能存在一个制定了selected属性的选项(option)

​	*即使selected属性指定的是存在disabled属性的项(option),那么这个被禁用的项仍然会处于初始选中状态,且可被使用,除非你选择其他项,那么该项你将不能继续重新选择,除非你刷新整个页面回到初始状态,*

​	*但是如果是被禁用的组(optgroup)就无法这么做,初始选中状态将会跳过被禁用的组,然后选择它下面的未被禁用的项/组.**详见: 总示例*** 

除非select设置了multiple属性,才能使用selected属性让多个option元素处于初始选中状态.

否则在源码顺序,一个select元素中:靠后设置的selected属性的选项(option)将覆盖前面设置的selected属性的选项(option).

##### value

value属性的值代表若该选项被选中,会提交给表单的值。

如果省略了这个属性,提交给表单的值就从选项元素的文本内容中获取。

## 总示例

<!-- 该示例的样式 -->

```css
<style>
    form {
        height: 50px;

    }
    select {
        padding: 4px 20px;
        border-radius: 10px;
        font-family: Tahoma;
        overflow-y: scroll;
    }
    option:not(:checked),
    select {
        background-color: rgb(255, 255, 255);
    }
    select:hover {
        background-color: #dddfff;
    }
    option {
        border-radius: 10px;
        padding: 0;
        color: violet;
    }
    option:hover {
        transform: scale(2);
    }
</style>
```



```html

	<form action="https://www.google.com/search" id="api"
          method="GET" autocomplete="new-password">
        
        <input name="q" type="search">
        
        <select size="0" form="google-api" name="q">
            
            <optgroup label="组1">    
                <option label="该标签无法使用" 
                        value="我的天" disabled selected>
                    我的天</option>
                <option label="文本" 
                        value="yomua">yomua</option>
            </optgroup>

            <optgroup label="组2">
                <option value="我的天">我的天</option>
                <option value="yhw">yhw</option>
            </optgroup>

            <optgroup label="组3">
                <option value="我的天">我的天</option>
                <option value="yhw">yhw</option>
            </optgroup>
        </select>

        <input type="submit">
    </form>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/select-optgroup-option示例-google.png)

​															**(google浏览器的样子)**

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/select-optgroup-option示例-firefox.png)

​															(Firefox浏览器的样子)

通过以上示例,我们可以清楚的即使是被禁用的项,也仍然可以使用selected属性让它初始被选中;但是如果是被禁用的组(optgroup)就无法这么做,初始选中状态将会跳过被禁用的组选择它下面的项/组.

如: `<optgroup label="组1" disabled selected>`

且我们对比Google和Firefox两个浏览器中渲染的同一个html,css代码,我们可以清楚的发现,组1-第一个项的显示文本是不同的.

这是因为Firefox忽视了第一项的label属性值,而Google没有忽视,所以我始终建议:不要使用label属性,请直接在元素中写入文本,作为其项的显示文本

## [datalist](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/datalist)

### 描述

存在开始和结束标签.

datalist元素包含一组option元素.

它是用来创建一组[建议输入]的选项,这些选项表示:当用户在input元素进行输入时,可以提供建议用户输入的值.

- input的list属性,***参见:<input.md - 属性 - list>***

也就是说,datalist元素几乎必和input元素成双成对出现*(前提是input元素的类型是可供输入的类型,不能是单选/复选/上传文件等类型)*,

通过在input元素中使用list属性指向datalist元素的id(也只能id),从而将input和datalist元素相关联*(有点类似于label和input元素的关联)*.

最后达到的效果为: 当用户选择在input元素中输入数据时,会弹出一个类似于下拉列表的框,里面是datalist中的option元素的值,用来建议用户输入的数据,

当用户选择这些建议输入的数据时,该数据将会自动填充到input元素中.

### 使用说明

datalist元素在某些需要为用户提供输入建议时,是非常有用的一个元素,不过需要注意的是,虽然该元素几乎在任何浏览器中都可以使用,

但是datalist绑定的input元素,是否会出现右边的三角形会根据浏览器的不同而决定***(详见: 示例)***

### 示例

```html
    <input type="text" list="datalist">
    <datalist id="datalist">
        <option>yomua</option>
        <option>yhw</option>
        <option>www.whyhw.com</option>
        <option>2020-5-2 21:06</option>
    </datalist>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/datalist-chrome.png)

通过该渲染结果,我们可以发现,输入框的下面那个框就是datalist元素,而里面选项的值就是option元素. 

同时我们单击input元素就能跳出的该datalist框,就是因为在input元素中使用了list属性指向了datalist的ID值,否则将无法达到此效果.

且若我们选中datalist框中的任何一个选项值,该选项值都会自动的填充至input元素的输入框中.

需要注意的是: datalist中的选项值只是建议,而不是要求,用户完全可以无视并提供任何值, 且输入框中的右边的三角形会根据浏览器的不同导致可能会/不会出现.

如:在chrome中就会出现该三角形; 在Firefox中就不会出现该三角形.

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/datalist-firefox.png)

# 有关标记的元素,以下元素都只具有全局属性

## 描述

曾经web未关注语义的远古版本中,i标签,b标签这些标签只是为了其样式而写,但是在技术迭代的今天,情况已经完全被颠覆了.

现在这些标签是更多为了其语义,而样式是靠CSS来做的.

## i, b, em, mark, strong, u

### [i](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/i)

#### 描述

i元素用于表现因为某些原因需要和普通文本区分开来的文本,例如:一个技术短语,外文短语,小说中人物的思想活动等.

#### 使用说明

i元素在使用时,通常代表着已经没有其他更好的语义元素使用了,如:

- 在需要表示强调或重读,使用em。
- 在需要表示表示重要性,使用strong
- 在需要表示表示相关性,使用mark 。
- 在需要标记著作名,使用cite元素,如一本书、剧本或是一首歌。
- 在需要标记术语时,使用dfn。

使用**class**属性用来识别为何使用该元素是一个很好的办法,这样的话,如果该表示以后需要改变,就可以有选择性地改变样式表。

### [b](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/b)

#### 描述

存在开始和结束标签.

b元素表示:提醒,注意.

b元素和i元素有个概念类似,即:只在没有更好的其他语义元素情况,才会使用b元素,它更多于让用户注意b元素包含的文本

#### 使用说明

- b 应用场合,如:摘要中的关键字、评论中的产品名称,或其他典型的应该加粗显示的文字（除此之外无其它特别强调）。

- 不要将<b>元素与strong、em或mark元素混淆。

  strong元素表示某些重要性的文本

  em强调文本

  mark元素表示某些相关性的文本。

  而b元素不传达这样的特殊语义信;仅仅是在没有其他合适的元素时使用它。

- 不要用b元素来标记标题,请使用h1-h6元素.

- 通过在b元素上添加 class 属性来表示额外的语义信息是一个很好的方式.如<b class="lead" .>来表示段落中的第一句

和所有html5中的语义元素一样,如果不是出于语义目的而使用b元素,那么让文本显示粗体更好的方式是使用将 CSS 的 [font-weight] 属性设置为"bold"。

#### 示例

```html
<span> 
    <b>我</b> <em>爱</em> <i>你</i>
</span>
```

其中b会加粗文本,em会让文本倾斜(着重强调文本),即:

这个示例告诉观察者:

​	请注意"我"("我"并不重要), 

​	强调的是"爱", 

​	"你"只是一个'副词',无关紧要.

### [em](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em)

#### 描述

em元素表示需要着重阅读,着重强调的文本.

em元素可以进行嵌套,嵌套的越深,则代表该元素中的文本越是需要着重阅读.

### [mark](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/mark)

#### 描述

存在开始标签和结束标签.

mark是html中的标记文本元素,表示为引用或符号目的标记/突出指定的文本.

你通常可以为了标记上下文中某个重要的文本,从而使用这个标签或用于显示匹配搜索结果中的单词,如:

​	若你在网页中使用过<kbd>ctrl + F</kbd> 弹出搜索框,从而搜索网页中的内容,你应该会发现,网页中的内容匹配你搜索的词时,通常以高亮显示,效果和mark近乎一样,这就是mark的用处之一.

#### 使用说明

- mark元素当用在引用（q,blockquote）中时,通常用来显示有特殊意义的文本.

  且它可以用来显示特殊审查的材料,即使原作者认为它并不重要。

- mark元素还用来显示与用户当前活动相关的一部分文档内容。

  例如,它可能被用于显示匹配搜索结果中的单词。

- 不要为了语法高亮而用mark 元素; 你应该用strong元素结合适当的CSS来实现这个目的（语法高亮）。

不要把mark元素和strong元素搞混淆；strong元素用来表示文本在上下文的重要性的, 而mark元素是用来表示上下文的关联性的.

### strong

#### 描述

存在开始标签和结束标签

strong元素表示某个文本十分重要,默认样式为粗体.(请将strong元素和b元素区分开来)

#### 使用说明

strong元素用来表示一个文本十分重要,并不会改变整个文本本来的意思,只是单纯的突然这个部分的重要性罢了.

而em元素和strong元素不同而地方在于,em元素可能会改变整个文本的意思,因为em元素强调的是某个文本,应该着重阅读,而不是单纯增加这个文本的重要性.

### [u](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/u)

#### 描述

存在开始和结束标签.

是一个行内元素怒.

u元素表示一个行内被渲染的**非原文的注解**（non-textual）,默认情况下渲染为一个实线下划线，可以用CSS替换。

**u元素应该只用于其语义,而不应该用于装饰.**

#### 使用说明

此元素以前在旧版本的HTML中称为“下划线”元素，但有时仍会以这种方式被滥用。要为文本加下划线，您应该应用包含CSS [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration)属性设置为 `underline` 的样式。

就像所有排版元素那样，u元素在 HTML 4 中废弃，但是在 HTML 5 中恢复了一个新的语义，意思是：**将文本标记为应用了某种形式的非文本注释。**

需要注意的是:在可能和超链接混淆的地方，避免使用u元素。

在大多数情况下，您应该使用<u>以外的元素，例如：

- e,表示强调重点
- b提示注意文字
- mark标记关键词或短语
- strong表明文本具有重要意义
- cite标记书籍或其他出版物的标题
- i表示西方文本中的技术术语，音译，思想或船名

要提供文本注释(给东亚文字添加注解)，请使用ruby元素,要应用带下划线的外观而没有任何语义含义，请使用 [`text-decoration`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-decoration) 属性的值 underline。

#### 属性

u元素只具有全局属性

#### 示例

此示例使用u元素来显示包含拼写错误的段落，这种情况通常就可以使用u元素:

```html
<p>
    This paragraph includes a 
    <u>wrnogly</u>
    spelled word.
</p>
```

以下是显示效果: 

<p>
    This paragraph includes a 
    <u>wrnogly</u>
    spelled word.
</p>

## 元素之间的区别

### b(bold)  vs strong

萌新开发者可能会疑惑,为什么在一个网站中,有各种不同方式来表达同样的东西? b元素和strong元素就是其中一种.

你们可能会问: 使用strong和b元素其默认样式没有什么差别,都只是加粗文本而已,为什么我要多打几个英文字母去写strong元素呢?

这是因为:strong元素是一个逻辑状态,b元素只是一个物理状态.

即:strong元素的逻辑状态可以分离内容和表现(样式)形式,使用逻辑状态允许你用各种不同的方式来表达(样式),如:你想把文字渲染成红色,使用其它大小的字体、带有下划线或其他样式,而不只是加粗的样式.

我们必须要理解strong元素呈现出表现形式并不只是单纯的加粗,它可以做到更多的事情.

---

而bold是一个物理状态,它没有区分表现形式和内容。如果让bold做了加粗文本外的其它任何事情,都将会令人困惑而且也不符合逻辑。

同样也应该注意b元素通常用来想单纯地吸引注意而不增加其重要性,如果想增加文本的重要性,可以使用strong,em元素.

### em vs strong

在HTML4中,strong元素是em元素的派生,即表示强调的强调,但是在HTML5中,strong元素的语义更改了,表示: 内容的重要性*(strong importance for its contents)* ,这是一个非常重要区别.

现在(HTML5),em强调一个内容,可能改变句子的意思,如:

- 我<em .>*喜欢*</em>胡萝卜

  我喜欢<em .>胡萝卜</em>

- 前者强调喜欢才是关键.

  后者强调胡萝卜是关键.

  而这个句子本来的意思只是一个陈述句,使用em元素之后,让该句子的意思更倾向于被指定的文本了.

而strong元素,增加句子部分文本的重要性,并不会改变其意思,如:

- <strong .>**警告!**这个地方**非常危险!** </strong>

  这里增加了警告,非常危险两个词的重要性,但是整个句子的意思并不会偏向于这两个词.

用一个简单的例子,比如:

-   1+1 =  <em .>*2*</em>.

    1+1 =  <strong.>*2*</strong>.

  前者告诉读者,2是需要背下来的,如果推出这个结果并不重要.

  后者告诉读者,2是由1+1推出来的结果,很重要,需要知道为什么这个式子会推出2这个结果.

### em vs i

在html5中,em和i的默认样式都是以斜体显示,一些萌新开发人员就会疑惑,为什么会存在效果一样的元素呢,它们有区别吗?

它们虽然其默认样式是一样的,但是语义却不同.

em元素表示其内容的着重强调; 而 i  标签表示从正常散文中区分出的文本.例如:

​	外来词,虚构人物的思想,或者当指定的文本指的是一个词语的定义,而不是其语义含义.(作品的标题,例如书籍或电影的名字,应该使用cite).

**这意味着,正确使用哪一个取决于具体的场景。**

请注意:两者都不是纯粹为了装饰的目的,那是CSS样式所做的。

一个em的例子可能是:"现在*就*开始做吧!",或:"我们*不得不*做点什么"。

​	人们或软件在阅读文本时,总是会对斜体字的发音使用重读强调(加粗文本亦然)。

一个i元素的例子可能是:"*玛丽女王号*昨晚启航了"。

​	在这里,没有对 "玛丽女王号" 这个词添加强调或重要性,它只是表明,谈论的对象不是一个名叫玛丽的女王,而是一艘名字叫玛丽的船。

​	另一个 的例子可能是:"这个*word*是一篇文章的标题",强调的是word是一篇文章的标题,而不仅仅是一个英文单词.

---

一个通俗的例子: *我认为天圆地方*.

这里应该用的是i标签,即一个虚构的思想,不要强调这个文本.



