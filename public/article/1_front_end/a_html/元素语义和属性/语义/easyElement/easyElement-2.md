# details和summary

## 描述

这两个属性在ie中,并不被支持 ,即使是edge也一样,该死的!

## details

### 描述

存在开始和结束标签

HTML details元素可创建一个挂件,仅在被切换成展开状态时,它才会显示内含的信息.summary元素可为该部件提供概要或者标签.

通常使用小三角形在屏幕上显示公开窗口小部件,该小三角形旋转（或扭曲）以指示打开/关闭状态,三角形旁边有一个标签.

如果该元素的第一个子元素*(其实只要是子元素即可)*是summary元素 ,则该元素的内容用作公开窗口小部件的标签.

如果details元素中未存在summary元素,则该挂件标题(摘要)会根据浏览器的内核不同去默认显示,如基于Blink内核的chrome,显示为:详细信息.

如果details元素中存在多个summary元素,则details元素的标题将会以首次出现的summary元素中的文本为准.

---

details元素只能存在两种状态,关闭和打开状态.

注意:details元素的默认状态位:关闭,且不幸的是,目前没有内置方法可以为打开和关闭之间的过渡设置动画.<i> <time>2020-5-2</time> </i>

### 属性

details元素除了包含全局属性之外,还存在以下属性:

#### open

此布尔值属性指示详细信息（即元素的内容）当前是否可见.

默认值为,false表示细节不可见; 当设置了open属性后,details中的内容就变成可见状态.

### 事件

除了HTML元素支持的常见事件之外,该元素还支持toggle事件,只要details元素的状态在打开和关闭之间发生变化,该事件就会分派给该元素.

该事件它在状态更改后发送的, 如果在浏览器监听到该事件(状态改变 )之前,状态进行了多次更改,则触发的多个事件会被合并,只会发送一个被合并后的事件.

You can listen for the `toggle` event to detect when the widget changes state:

```js
details.addEventListener("toggle", event => {
  if (details.open) {
    /* the element was toggled open */
  } else {
    /* the element was toggled closed */
  }
});
```



## summary

### 描述

存在开始和结束标签

summary元素和它的中文翻译一样,只是为了给details元素提供一个内容的摘要或标题或图例.

 如果summary 元素在浏览器内不能被正确解析和渲染,则会展示details标签内的其他内容.

### 属性

该属性只有[全局属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

### 自定义左边显示的样式

details元素中自带的三角形可以在在summary元素中自定义,但并没有得到广泛支持.

由于该元素非标准化的,因此在实验性实施阶段,浏览器如何支持此自定义项有所不同,我们不得不暂时使用多种方法.

summary元素支持 [`list-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style)缩写属性或者完全属性,比如[`list-style-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type),可以使用它们任意改变三角（通常是使用[`list-style-image`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-image)）.

例如,我们可以使用`list-style: none`移除三角形.

但是根据浏览器的不同,其效果也不同,如chrome:设置list-style属性并没有任何用处; 而Firefox却可以.

![](/picture/summary-list-style-type.png)

以上结果的css和html样式为:

```css
summary {
	list-style-type:circle;
}
<details >
	<summary>Yomua</summary>
	我的宝贝
</details>
```



## 示例

```html
<details >
	<summary>Yomua</summary>
	我的宝贝
</details>
```

![](/picture/details summary.png)

![](/picture/details summary-open.png)

```html
    <details>
        <summary>内容</summary>
        <p>我是需要展示的p元素</p>
        <a href="#">我是需要展示的a元素</a>
    </details>
```

![](/picture/detailsANDsummary.png)

# samp kbd code var pre(都只有全局属性)

## [samp](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/samp)

### 描述

存在开始和结束标签.

samp元素全称为: sample,即:样品,样本.

samp元素用于标识计算机程序输出,默认情况下,浏览器会使用monotype字体作为samp元素的文本字体.

samp元素是一个行内元素.

有意思的是,如果samp元素和kbd元素相互嵌套,则其语义将会大为不同.

### 属性

samp元素 只存在全局属性.

### 接口

该元素实现了 `HTMLElement` 接口.

**Implementation note:** 基于 Gecko 1.9.2 及以上,Firefox 还为该元素实现了[HTMLSpanElement](https://developer.mozilla.org/en/DOM/span) 接口.

### 注意

可以使用 CSS 选择器来定义samp元素的css规则,从而覆盖浏览器的缺省字体monotype.

不过,用户设置的偏好可能会优先于指定的 CSS 使用.

### 示例

```html
<p> 
	由超算计算出来的结果为:
	<samp>
		三十四万二千四百四十一
	</samp>
</p>
```

![](/picture/samp.png)

## [kbd](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/kbd) 

### 描述

存在开始和结束标签

kbd元素是键盘输入元素,用来表示用户输入,即通过键盘的按下,将指令输入到电脑中,然后电脑执行这段指令,而这个指令就称之为键盘输入元素或用户输入.

kbd元素是一个行内元素(和samp元素一样),同时会以浏览器的默认monospace字体显示.

kbd元素的默认样式和字体和samp元素的默认样式和字体是一样的

有意思的是,如果kbd元素和samp元素相互嵌套或和另一个kbd元素嵌套,其语义将会大为不同.

### 属性

kdb元素仅支持[全局属性](https://developer.mozilla.org/en-US/docs/HTML/Global_attributes).

### 使用说明

通过定义CSS规则可以改变kbd的默认字体.用户首选项设置可能会比该CSS规则具有更高优先级.

- 只有kbd一个元素时,代表用户通过键盘输入的指令.

- 当<kbd>元素处于<samp>元素之中时,它代表着被系统回显的输入.

  ​	*回显:你在键盘上按下一个“键”,如果在电脑上同时显示出你按的内容,这就是回显；如果没有显示,就不是回显.*

- 当<kbd>元素中包含<samp>元素时(samp处于kbd元素中),该输入是基于系统输出的,比如调用某个菜单项.

- 当<kbd>元素处于另一个<kbd>元素之中时,它代表了一个实际的按键,或是该输入机制下的某个单位输入.

### 示例

#### 只有kbd元素:表示需要用户通过键盘输入的指令.

```html
<p> 请按<kbd>ctrl + s</kbd>保存当前数据. </p>
```

![](/picture/kbd.png)

## samp和kbd元素的示例

### kbd元素处于samp元素中

当kbd元素处于samp元素中,代表着被系统回显的输入.

- 回显:你在键盘上按下一个“键”,如果在电脑上同时显示出你按的内容,这就是回显；如果没有显示,就不是回显.
- 那么这句话的意思为: 在samp中的kbd中的文本,当被输入时,将会被计算机同步显示

```html
    <p>
        请按
        <samp>
            <kbd>Q</kbd>
        </samp>
        键,将同时在当前文本框显示你你所按下的
        <samp>Q</samp>(这里的Q代表计算机程序输出).
    </p>
```



### samp处于kbd元素中

当samp处于kbd元素中时,该输入是基于系统输出的,比如调用某个菜单项.

即kbd中的samp元素中的文本,表示当按照文本要求按下键盘的按键时,操作系统会输出些什么(如调用任务管理器,或某个菜单.)

```html
    <p>
        使用
        <kbd>
            <samp>ctrl +shift + `</samp>
        </kbd>
         可调用任务管理器
    </p>
```

![](/picture/samp处于kbd元素中.png)

### kbd元素处于另一个kbd元素中

当<kbd>元素处于另一个<kbd>元素之中时,它代表了一个实际的按键,或是该输入机制下的某个单位输入.

```html
    <p>
        请按
        <kbd>
            <kbd>ctrl + s</kbd>
        </kbd>
        保存当前数据.
    </p>
```

![](/picture/kbd.png)

## code 

### 描述

code元素用来呈现一段计算机代码,该代码以浏览器的默认等宽字体显示.

和samp元素,kbd元素相同的是,它也是行内元素.

### 属性

code元素只存在全局属性.

### 注意

CSS 规则可以覆盖浏览器默认的 code 标签字体样式. 但用户设置的浏览器字体选项可能会超过 CSS 的优先级, 使之无效.

这和前面连个元素是一样的:samp元素和kbd元素.

### 示例

```html
    <p>
        这是一段计算机代码,它非常的<strong>重要</strong>
        <code>
            void function() {
                alert('I Love You!')
            }()
        </code>
    </p>
```

![](/picture/code.png)

## [var](https://www.w3school.com.cn/tags/tag_var.asp)

### 描述

存在开始和结束标签.

var标签表示变量的名称或者用户提供的值,它通常以斜体且等宽字体表示.

var标签是计算机文档中应用的另一个小窍门,这个标签经常与code 和pre一起使用,用来显示计算机编程代码范例及类似方面的特定元素.

就像其他与计算机编程和文档相关的标签一样,var 标签不只是让用户更容易理解和浏览你的文档,而且将来某些自动系统还可以利用这些恰当的标签,从你的文档中提取信息以及文档中提到的有用参数.

我们再一次强调,提供给浏览器的语义信息越多,浏览器就可以越好地把这些信息展示给用户.

### 属性

var元素只具有[全局属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes).

### 示例

```html
    <p>
        数学计算:
        <var>x</var> = <var>y++</var>
    </p>
```

![](/picture/var.png)

## [pre](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/pre)

### 描述

存在开始和结束标签.

pre元素表示预定义的格式文本,存在于该元素之中的文本通常都会以源文件的格式进行编排,并以等宽字体展现,即使是文本中的空白符(如空格和换行等)都会显示出来.

需要注意的是:如果在pre元素你需要展现: '<' or '>' 等,请将之转为[字符实体](https://www.w3school.com.cn/html/html_entities.asp),这是因为'<'可能会被当作pre元素的结束标签,从而导致整个超出预期的结果,即使大部分浏览器都能正确是被'<',但是我始终建议将它们转为字符实体.

### 属性

pre元素只具有全局属性(曾经的属性以前全部弃用)

### 示例

```html
    <pre>
        我
            爱
                你
        &lt;
        &gt;
    </pre>
```

![](/picture/pre.png)

### 可访问性 &lt fsf &gt

请为使用预格式化文本创建的任何图像或图表提供备用说明(描述),这是非常重要的,且备用说明应清晰、简明地描述pre元素创建的图像或图表的内容.

因为低视力的人在借助屏幕阅读器等辅助技术进行浏览时,可能无法理解浏览器按顺序读出的预格式化文本字符所代表的内容.

所以就要我们使用,如:figure和figcaption元素的组合,再加上id和[ARIA](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA)的role属性以及aria-labelledby属性的组合,提示浏览器将pre元素中的预格式化文本以img形式进行渲染,最后使用figcaption元素作为图像的备用描述,如:

- [aria-*](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA) 属性***参见: <GlobalAttributes.md-GlobalAttributes-HTML全局属性之外的全局属性-多重aria属性 >***

```html
    <figure role="img" aria-labelledby="cow-caption">
        <pre>
        ___________________________
       &lt; 在我的领域中我是专家. &gt;
        ---------------------------
               \   ^__^ 
                \  (oo)\_______
                   (__)\       )\/\
                       ||----w |
                       ||     ||
        </pre>
        <!-- cow:奶牛 -->
        <figcaption id="cow-caption">
            一只牛在说:"我是这个领域的专家."
        </figcaption>
    </figure>
```

![](/picture/pre的可访问性.png)

我们使用了ARIA中的role全局属性以及aria-labelledby全局属性,描述了figure元素的作用,

再加上figure元素本身的语义***(参见:<easyElement-1.md>),***可谓是让该示例变得更加清楚,一目了然,使得浏览器能更加准确的进行渲染,使得如屏幕阅读器也能准确的翻译html,从而让视力低下的人有更好的体验(正常人/开发者也能受益)

请注意,浏览器渲染的结果中的: '<'和'>',在源码中使用的字符实体,就是为了放置浏览器错误地将'<'和'>' 作为其结束标签,从而导致超出预期的结果.

# del和ins

## [del](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/del) 

### 显示

<del >This paragraph has been deleted.</del >

### 描述

存在开始和结束标签.

del元素一些从文档中删除的文本内容*(依然存在于文档中,只是在删除的文本上划了条中划线)*,比如可以在需要显示修改记录或者源代码差异的情况使用这个标签.

与del对应的元素是ins元素:  表示文档中添加的内容.

需要注意的是:del标签通常（但不一定要）在文字上显示删除线.

del元素在任何浏览器中都可以使用.

### 属性

del元素除了具有全局属性之外,还有以下独立属性:

#### cite

提供一个URI,其中的资源(内容)解释作出修改的原因*(比如:根据某次会议讨论).*

该属性值(url)可以是任意的路径和有效网址:如相对/绝对路径以及任意一个有效网址.

需要注意的是:ins元素中的cite属性,可能没被主流浏览器支持.(del元素的cite属性也可能是如此,但是mdn上没讲,我也不清楚)

#### datetime

这个属性说明修改的时间和日期,这里的时间和日期格式要符合[规范](https://html.spec.whatwg.org/multipage/infrastructure.html#valid-date-string-with-optional-time).

如果设置的值不符合该规范,那么它将没有任何意义.

## [ins](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ins)

### 显示

<ins>这一段文本是新插入至文档的。</ins>

### 描述

存在开始和结束标签.

ins元素表示已经被插入文档中的内容,默认的样式会使用一条下划线标明哪行/段文本被插入进文档.

与ins对应的元素是del元素:  表示文档中已经删除的内容.

需要注意的是:ins标签通常（但不一定要）在文字上显示下划线.

del元素在任何浏览器中都可以使用.

### 属性

ins的属性和del元素属性的内容概念是类似的.

#### cite

cite 属性的值指向一个文档的 URL或相对/绝对路径,该文档解释了文本被插入或修改的原因.（目前该属性还没有被主流浏览器支持）

#### datetime

该特性指示的此修改发生的时间和日期,并且该特性的值必须是[一个有效的日期或者时间字符串](http://www.w3.org/TR/2011/WD-html5-20110525/common-microsyntaxes.html#valid-date-string-with-optional-time).

如果该值不能被解析为日期或者时间,则该元素不具有相关联的时间标记.

## 总示例

```html
<del cite="http://www.whyhw.com" 
     datetime="2020-5-2 11:56">
	<p>“I apologize for the delay.”</p>
</del>

<ins cite="../howtobeawizard.html" 
     datetime="2020-5-2 0:01">
	<p>“A wizard is never late …”</p>
</ins>
```

![](/picture/ins del.png)

通过以上渲染结果,可以发现: 设置cite和datetime属性并不会让ins和del元素中的文本内容变成超链接什么的,只是让浏览器或开发者知道这些信息罢了,用户并不清楚.

可能在以后的某些系统访问时,会根据我们设置的这些元素属性获取到一些有用的信息.

# 有关引用的元素(q blockquote cite)

## [q](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/q)

### 描述

存在开始和结束标签.

q元素的全称为:quotation,即引用语.

q元素用来表示一个封闭的并且是短的行内引用的文本,这个标签是用来引用短的文本,所以请不要引入换行符; 对于长的文本的引用请使用blockquote替代.

且q元素为一个行内元素,在使用q元素时,它其中的引用短语会默认存在于双引号 `""`之中,这对双引号使用的是 ::before和::after伪元素添加的.(可以手动删除,如设置这两个伪元素的content属性为none即可.

### 属性

q元素除了具有全局属性之外,还有以下属性

#### cite

这个属性的值是URL,意在指出被引用的文本的源文档或者源信息. 这个属性重在解释这个引用的参考或者是上下文.

## [blockquote](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/blockquote)

### 描述

blockquote元素是一个块级引用元素,代表其中的文字是引用内容.

通常在渲染时,这部分的内容会有一定的缩进.

若引文来源于网络,则可以将原内容的出处 URL 地址设置到 cite属性上,若要以文本的形式告知读者引文的出处时,可以通过<cite>元素.

注意:这是cite属性而不是cite元素,请与之区分开来.

### 属性

#### cite

该属性的用处和q元素的cite属性的用处是一样的.

是一个标注引用的信息的来源文档或者相关信息的URL.通常用来描述能够解释引文的上下文或者引用的信息.

注意:这是cite属性而不是cite元素,请与之区分开来.

## [cite](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/cite)

### 描述

cite标签表示一个作品的引用,且必须包含作品的标题.

这个引用可能是一个根据适当的上下文约定关联引用的元数据的缩写.

### 属性

cite元素只存在全局属性,由于它是cite元素,当然不会存在cite属性,因为cite元素的作用已经包含了cite属性的作用了.

### 使用说明

- 适用场合可能包括一本书,一张纸,一篇散文,一首诗,一个分数,一首歌,一部电影,一个电视节目,一个游戏,一个雕塑,一幅画,戏剧制作,一个剧本,一个歌剧,一种音乐,一个展览 ,一个法律案件报告,一个计算机程序,一个网站,一个网页,博客或评论,论坛帖子或评论 ,或者书面或口头陈述,等等.

- W3C规范,对创造性的工作而言,cite元素可能包括作者的名字,

  而WHATWG宣布,它可能在任何情况下都不包括一个人的名字.

  <i>这两个规范真有意思,有兴趣可以去了解一下它们的爱恨情仇.</i>

- 在blockquote元素或者q元素上使用cite元素或者cite属性来标明参考的在线资源通常是非常有用的.

- 为了避免在使用cite元素时默认字体为斜体,可以使用css的font-style属性重新进行设置.

## 总示例

```html
<!-- 设置长引用保留换行符,合并空白符,且文字转行 -->
<style>
    blockquote {white-space: pre-line;}
</style>

	<section>
        <h1>有关引用的元素</h1>
        
        <!-- 短引用 一章-->
        <article>
            <h1>短引用</h1>
            <p>
                有一个非常热血澎湃的句子:
                <q>手握日月摘星辰,世间无我这般人.</q> <br />
            </p>
        </article>

        <!--长引用 一章-->
        <article>
            <h1>长引用和作品引用(cite)</h1>
            <blockquote>
                陋室空堂,当年笏满床；衰草枯杨,曾为歌舞场.
                蛛丝儿结满雕梁,绿纱今又在篷窗上.
                说什么脂正浓,粉正香,如何两鬓又成霜？
                昨日黄土陇头送白骨,今宵红灯帐底卧鸳鸯.
                金满箱,银满箱,转眼乞丐人皆谤.
                正叹他人命不长,那知自己归来丧！
                训有方,保不定日后作强梁；
                择膏粱,谁承望流落在烟花巷！
                因嫌纱帽小,致使锁枷扛；
                昨怜破袄寒,今嫌紫蟒长.
                乱哄哄,你方唱罢我登场,反认他乡是故乡.
                甚荒唐,到头来,都是为他人做嫁衣裳！
                <footer>
                    
                    <!-- 作者信息 -->
                    <address>author:曹雪芹</address>
                    
                    <!-- 作品名称引用 -->
                    <cite>&laquo;A Dream of Red Mansions&raquo;</cite>
                </footer>
            </blockquote>
        </article>
    </section>
```

![](/picture/q blockquote cite.png)

需要注意的是,在我使用这个示例时,p元素无法包含blockquote元素,即使在源码中将blockquote元素写入p元素中,但是html中仍然是将它们两个分离,单独渲染.

# 进度条元素(progress meter)

## [progress](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/progress) 

### 显示

<progress id="file" max="100" value="70"> 70% </progress>

### 描述

存在开始和结束标签.

progress是一个行内元素,其意为:进程, 它用来表示一项任务的完成进度.

需要注意的是,没有一个规范规定该元素具体如何显示,而是让浏览器开发商自己决定,不过通常情况下,该元素都显示为一个进度条形式.

且progress元素和meter元素是有区别的,虽然它们通常都以进度条的形式表现,可元素语义和某些情况下progress元素与meter元素并不一样.

如:progress元素还存在一个不确定状态,这个不确定状态会导致progress元素展现出的进度条是动态的.

### 属性

progress元素除了全局属性之外,还存在以下独特属性:

#### max

该属性描述了这个progress元素所表示的任务一共需要完成多少工作.

#### value

该属性用来指定该进度条已完成的工作量.

如果没有value属性,则该进度条的进度为"不确定",也就是说,进度条不会显示任何进度,你无法估计当前的工作会在何时完成*(比如在下载一个未知大小的文件时,下载对话框中的进度条就是这样的).*

也就是不确定状态的progress元素,是动态进度条.

我们可以使用CSS伪类[`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate)用来匹配那些不确定的进度条,即可以当某个progress元素是不确定的状态时,我们可以通过该伪类选择到它,并给它设置其CSS样式.

如: `progress:indeterminate{写下你的样式}`

## [meter](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/meter)

### 显示

<meter low="69" high="80" max="100"value="84">B</meter>

### 描述

存在开始和结束标签.	

meter元素是一个行内元素,且IE并不兼容meter元素.

meter元素用来显示已知范围的标量值或者分数值,不同于progress元素,它默认情况下一定展示为一个静态进度条,而progress元素则在不确定状态下是动态的进图条.

### 属性

meter元素除了全局属性之外,还存在以下独特属性:

#### value

meter元素当前的数值.

如果设置了最小值和最大值（分别由min属性和max属性定义）,它必须介于最小值和最大值之间.

如果没有指定或者格式有误,则value值即为0.

如果给定的值不在最小值和最大值之间,它的值就等于它最接近的一端的值.

需要注意的是,如果设定该值,则除非min和max的值分别为0,1,否则都要设置mix和max的值,换言之,默认的min和max值分别为0和1.

#### min

值域的最小边界值.

如果设置了,它必须比最大值要小.如果没设置,默认为0.

#### max

值域的上限边界值.

如果设置了,它必须比最小值要大.如果没设置,默认为1.

#### low

定义了低值区间的上限值

​	*（译者注：如果value介于min和low之间,该元素就会表现出低值的视觉效果,value落在(min,low)、(high,max)等不同的开区间会使浏览器渲染该元素时出不同的视觉效果）.*

如果设置了,它必须比最小值属性大,并且不能超过high值和最大值.未设置或者比最小值还要小时,其值即为最小值.

#### high

定义了高值区间的下限值.如果设置了,它必须小于最大值,同时必须大于low值和最小值.如果没有设置,或者比最大值还大,其值即为最大值.

#### optimum

其英文意思为:最佳效果；最适宜条件

这个属性用来指示最优/最佳取值.它必须在正确的值域内（由最小值属性和最大值属性定义）.

当使用了low和high属性时,它指明哪一个取值范围是更好的.例如,假设它介于最小值和low之间,那么lower区间就被认为是更佳的取值范围.

#### form

该属性将本元素与对应的form元素关联.

例如:一个计量器可能用来显示某个数值输入框（input元素,number类型）的范围.

只有当计量器元素被用作表单关联的元素时,该属性才应当被使用；即便如此,如果它作为表单的后代元素出现,它仍然有可能被省略.

## 总示例

```html
    <progress max="100" value="20"></progress>

    <!-- 低值视觉效果 -->
    <meter min="100" max="500" 
           low="200" high="400" value="150"></meter>
    <!-- 高值视觉效果 -->
    <meter min="100" max="500" 
           low="200" high="400" value="450"></meter>
    <!-- 没有视觉效果 -->
    <meter min="100" max="500" 
           low="200" high="400" value="200"></meter>
```

![](/picture/progress meter.png)

通过以上结果表明,如果meter元素的value值落在(min,low)和(high,max)开区间之间,则会产生低/高值视觉效果.

但是如果不落在这两个开区间之间,如(value=200),就不会产生视觉效果.

PS: progress元素的不确定状态导致的进图条的动态请自己尝试.

# Along（单独的）元素

## [small](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/small)

### 描述

存在开始和结束标签.

small元素是一个行内元素,顾名思义:它可以让指定的文本的字体变小一号。(例如从大变成中等，从中等变成小，从小变成超小)

在HTML5中，除了它的样式含义，这个元素被重新定义为表示边注释和附属细则，包括版权和法律文本。

### 属性

small元素只具有全局属性.

### 示例

```html
这个页面的版权所有:
<small>Copyright ©2020 Yomua. All Rights Reserved</small>
```

显示效果为: 

​	这个页面的版权所有:<small>Copyright ©2020 Yomua. All Rights Reserved</small>

需要注意的是:虽然我们可以通过CSS样式单独设置某个标签(如span),从而达到small元素的视觉效果,但是其语义是不同的.

因为对于<time datetime="2020-5-3">当今</time>的浏览器来说,small元素是具有语义的,***详见:描述.***,而CSS只是单纯为了样式罢了.

## [output](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/output)

### 描述

存在开始和结束标签.

output是一个行内元素.

output元素用来表示计算/用户操作 的结果.

### 使用说明

output元素通常和表单(form)相关元素 相关联*(如同label元素和表单相关元素相关联类似)*, 用来得出两个表单进行计算后得出的结果.

### 属性

ouput除了具有全局属性,还有以下独特的属性:

#### for

其它影响计算结果的标签的ID，可以多个。

#### form

与当前标签有关联的form（从属的表单）。

该属性的值必须是当前文档内的表单元素的ID。

如果未指明该属性，output标签必须是一个form的后代标签。

该属性的用处在于可以让output标签脱离form标签，存在于一个网页文档的任意位置。

#### name

name属性,即output元素的标识符之一,和ID属性类似.

### 示例

```html
<form 
  id="form"
  oninput="result.value=
           parseInt(a.value)+
           parseInt(b.value)+
           parseInt(c.value)" 
     >
	<input type="range" name="b" value="50" /> +
	<input type="number" name="a" value="10" /> =
	<output name="result" value="" for="i3"></output>
</form>
<input type="number" 
       name="c" 
       value="20" 
       id="i3"
       form="form"> +
```

![](/picture/output.png)

oninput: 一个[`EventHandler`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventHandler)事件,即当用户尝试向指定的元素(form)输入时执行该事件.

而这里的三个input都是form相关元素,所以当用户改变其值时,会触发oninput事件.

即：使用 output 元素的 name 属性值引用 output 元素，使得 a.value + b.value + c.value 的和等于 output 元素的 value 属性，这样通过触发 oninput 事件，就可以使得动态更新页面上的值。

## [wbr](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/wbr)

### 描述

只存在开始标签

wbr元素: 一个文本中的位置，其中浏览器可以选择来换行，虽然它的换行规则可能不会在这里换行。

也就是说,wbr元素有点像br元素,但是wbr元素不会强制文本在这里换行,而是由浏览器自己决定.

### 属性

wbr元素仅仅包含 [全局属性](https://developer.mozilla.org/en-US/docs/HTML/Global_attributes)

### 使用说明

这个元素首先在 Internet Explorer 5.5 中实现，并且在 HTML5 中官方定义。

在 UTF-8 编码的页面中， 表现为 U+200B ZERO-WIDTH SPACE（零宽空格）代码点。

特别是，它表现为 Unicode bidi BN 代码点，也就是说，它对 bidi-ordering 没有影响：

div dir=rtl123,456展示123,456而不是456,123，当不拆成的两行时候。

出于相同原因， <﻿wbr﻿>元素不会在换行的地方引入连字符。为了使连字符仅仅在行尾出现，使用连字符软实体 (&﻿shy;) 来代替。

### 示例

*[Yahoo 代码规范](https://web.archive.org/web/20121105171040/http://styleguide.yahoo.com/)* 推荐 [在标点之前为 URL 换行](https://web.archive.org/web/20121105171040/http://styleguide.yahoo.com/editing/treat-abbreviations-capitalization-and-titles-consistently/website-names-and-addresses)，以便避免将标点符号留在行尾，这会让读者将 URL 的末尾搞错。

```html
<p>http://this<wbr>.is<wbr>.a<wbr>.really<wbr>.long<wbr>.example<wbr>.com/With<wbr>/deeper<wbr>/level<wbr>/pages<wbr>/deeper<wbr>/level<wbr>/pages<wbr>/deeper<wbr>/level<wbr>/pages<wbr>/deeper<wbr>/level<wbr>/pages<wbr>/deeper<wbr>/level<wbr>/pages</p>
```

此示例我测试多个浏览器时,仍然是显示在一行中,但是MDN上却表现为

2020-9-14：只需要将浏览器宽度缩小即可显示多行，但是如果去掉 \<wbr>，就只会显示一行:

![](/picture/wbr.png)



## [textarea](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/textarea)

### 描述

存在开始和结束标签.

textarea元素是一个行内元素,表示一个多行纯文本编辑控件,它可以和表单元素进行相关联。

该元素同时也是置换元素，因为 textarea 元素需要用户输入内容才会显示，否则浏览器本身是不会主动渲染 textarea 的内容的。

### 属性

textarea元素除了具有全局属性之外,还有以下属性:

#### autocomplete

是否使用浏览器的记忆功能自动填充文本。可能的值有：

- off: 不使用浏览器的记忆自动填充，使用者必须输入他们想要输入的所有内容。或者网页提供了自己的自动填充方法。
- on: 浏览器根据用户之前输入的内容或者习惯，在用户输入的时候给出相应输入提示。

如果不指明autocomplete属性，浏览器会从父级的表单元素上解析是不是开启这个属性。

表单元素可以是textarea元素的父级元素或者textarea的form属性有跟表单相同的id（参见下面的form属性）。更多请查看[form](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)元素的autocomplete 属性**(参见<form.md>)**

#### autofocus 

页面加载完毕之后是否自动给本元素添加焦点。

只有跟表格关联的才能使本属性生效。

#### cols

文本域的可视宽度。必须为正数，默认为20 (HTML5)。

不同于rows属性,该属性默认情况下不会造成横向滚动条出现.

#### rows

元素的输入文本的行数（显示的高度）。

注意:这个只是代表默认情况下textare元素能显示多少行的高度,但是随着行超过rows指定的值,则textarea元素会出现纵向滚动条,来装下多余的文本.

#### form 

指定跟自身相关联的表单。

值必须为本文档内的表单的ID，如果未指定，就是跟当前所属的表单元素相关联。这就允许你在文档的任意地方放置文本域元素。

当然了也可以不设置该属性,就代表textarea元素未和任何表单元素相关联.

#### disabled

禁用文本域。默认为false。如果未指定，也可以从父级上如[fieldset](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/fieldset)继承而来。

#### maxlength

允许用户输入的最大字符长度 (Unicode) 。未指定表示无限长度。

#### minlength

允许用户输入的最小字符长度(Unicode) 

#### name

元素的名称。

#### placeholder

向用户提示可以在控件中输入的内容。 

在渲染提示时，占位符文本中的回车符(\r)或换行符(\n)一定会被作为行断（换行）处理。

#### readonly

不允许用户修改元素内文本。和 disabled 属性不同的是，这个能让用户点击和选择元素内的文本。

如果在表单里，这个元素的值还是会跟随表单一起提交。

#### required 

提示用户这个元素的内容必填。

#### selectionDirection 

选择textarea元素中文本的书写方向,如:rtl,ltr等.

#### selectionEnd

当前选中的最后一个字符的位置索引。

*似乎没用.*

#### selectionStart

当前选中的第一个字符的位置索引。

*似乎没用.*

#### spellcheck

该属性设为true时，表明该元素会做拼写和语法检查。

属性值为default时，表明元素有默认行为，可能会基于父元素的spellcheck值; 属性值为false时，表明元素不做拼写和语法检查。

#### wrap

指定文本换行的方式。默认为soft。可能的值为：

- hard: 在文本到达元素最大宽度的时候，浏览器自动插入换行符(CR+LF) 。比如指定 cols值。
- soft: 在到达元素最大宽度的时候，不会自动插入换行符。

PS: 在默认情况下,似乎两者都差不多,因为浏览器中的textarea在超过col(宽度)时,都会换行.

# 表格相关元素(table)

## [table](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table)

### 描述

存在开始和结束标签.

table是块级元素.

table元素想必大家都不陌生,即:表格元素,且在CSS还未有flex或grid布局时,web普遍都用的是表格布局.

虽然现在表格布局已经被淘汰了,但是表格有元素仍有用处,如: 不得不依靠表格显示的数据,或需要将数据分门别类等,table元素无疑是很友好的.

table元素是通过二维数据表 表示的信息.

### 属性

曾经的table元素具有许多属性,但是由于CSS的出现,所以现在的table元素只具有全局属性了,曾经的属性都已经被扫进了历史的坟墓.

### 示例

```html
    <table>
        <thead>
            <th colspan="2">The table header</th>
        </thead>

        <tbody>
            <tr>
                <td>1</td>
                <td>2</td>
            </tr>

            <tr>
                <td>3</td>
                <td>4</td>
            </tr>
        </tbody>
    </table>
```

## [caption](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/caption)

### 描述

存在开始和结束标签

caption元素,顾名思义:标题.

caption元素展示一个表格的标题， 它常常作为table元素的第一个子元素出现，同时显示在表格内容的最前面，但是，它同样可以被CSS样式化，所以，它同样可以出现在任何一个一个相对于表格的任意位置。

且caption元素会在默认情况下,居中于表格的中间且处于表格之外.

### 属性

caption元素只具有全局属性(曾经的属性已被弃用)

### 使用说明

当table元素是 caption 的父元素，且caption是table元素的唯一后代的时候，请使用figcaption元素替代caption元素.

PS: 这种情况是很少见的,也就是说一个table元素中,只能具有caption元素,不能有其他任何元素,才能将caption元素升级成figcaption.

<em>2002-5-3 亲测,即使caption元素是table元素的唯一后代,一旦将caption元素写成figcaption,则会导致嵌套元素错误,即浏览器渲染时,将会把figcaption元素渲染到table元素之外(在控制台中)</em>

### 示例

```html
    <table>
        <caption>人与自然</caption>
        <tr>
            <td>很长的第一列</td>
            <td>很长的第二列</td>
        </tr>

        <tr>
            <td>很长的第一列</td>
            <td>很长的第一列</td>
        </tr>
    </table>
```

![](/picture/table-caption.png)

显然的,caption元素会在默认情况下,居中于表格的中间且处于表格之外.

## colgroup和col

### [colgroup](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/colgroup)

#### 描述

colgroup元素其实和optgroup元素类似,都是为某个元素进行分组,二colgroup元素是为col元素进行分组,存放的是col元素.

#### 使用说明

colgroup元素除了单纯的为col元素进行分组之外,还能单独的设置span属性,从而达到和col元素作用一样的效果.***详见:col-使用说明.***

#### 属性

colgroup元素除了全局属性之外,还有以下属性:

##### span

此属性包含一个正整数，指示该元素跨越的连续列数。

如果不存在，则默认值为1。

### [col](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/col)

#### 描述

存在开始标签。

col元素定义表格中的列，并用于定义所有公共单元格上的公共语义。它通常位于colgroup元素内.

此元素允许使用CSS进行样式列，但只有少数属性将对该列产生影响（请参阅列表的[CSS 2.1规范](https://www.w3.org/TR/CSS21/tables.html#columns)）.

#### 属性

col除了全局属性之外,还有以下属性:

##### span

该属性值为一个正整数，表示该 col 元素横跨的列数,默认值为1.

#### 使用说明

col元素其实可以说是用于渲染表格的样式的,因为实际上,col元素使用span属性,可以指定自己横跨按当前所属的表格的列数,

但是如果没有样式,这个横跨其实完全表现不出来,***详见:总示例.***

## 表格头和表格体和表格脚

### [thead](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/thead) 

#### 描述

存在开始和结束标签.

thead元素定义了一组表格的列头和行,相当于表格的页眉.

#### 属性

只具有全局属性(曾经的属性已经被淘汰)

### [tbody](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tbody) 

#### 描述

存在开始和结束标签.

tbody元素定义了当前表格的主体列和行,表明它们是表的主体.

#### 属性

只具有全局属性(曾经的属性已经被淘汰)

#### 使用说明

- 如果table元素中存在thead元素,则tbody元素必须在thead元素之后;
  如果存在tfoot元素,则tboy元素必须在tfoot元素之间.
- tbody元素可以在一个表格中存在多个,但是必须是连续的,这代表,该表格有多个不同的部分,每部分允许使用CSS单独设置样式.
- table元素中,若存在tbody元素,则所有非页眉(thead),页脚(tfoot)的tr或td都必须存在于tbody元素中



### [tfoot](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tfoot)

#### 描述

存在开始和结束标签.

tfoot元素定义了一组表格中各列所属的行,相当于页脚.

#### 属性

只具有全局属性(曾经的属性已经被淘汰)

### 注意

thead,tbody,tfoot元素必须按顺序存在于table元素中,即使在源码中故意设置不按顺序摆放这三个元素,每个浏览器仍然会按正确的顺序去渲染该table元素.

### 总示例

```html
    <table>
        <caption>Council budget (in £) 2018</caption>

        <!-- 表头 -->
        <thead>
            <tr>
                <th scope="col">Items</th>
                <th scope="col">Expenditure</th>
            </tr>
        </thead>

        <!-- 表脚 -->
        <tfoot>
            <th scope="row">Human</th>
            <td>20,000</td>
        </tfoot>

        <!-- 表体 -->
        <tbody>
            <tr>
                <th scope="row">Donuts</th>
                <td>3,000</td>
            </tr>
            <tr>
                <th scope="row">Stationery</th>
                <td>18,000</td>
            </tr>
        </tbody>

    </table>
```

![](/picture/tbody-表头,体,角.png)

请注意: 上面的示例中,我未按正确的顺序去书写thead,tbody,tfoot元素,但是浏览器仍然正确的渲染,即使在浏览器的源码(控制台中)中,也仍然是我写的这个顺序,

## 表头和行和列元素

### [th](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/th)

#### 描述

存在开始和结束标签.

th元素定义表格内的表头单元格。

这部分特征是由 scope 和 headers 属性准确定义的,也就是说th元素实际上相当于每行tr的小标题.

th元素也和td元素类似,相当于一个单元格,即代表列.

#### 属性

该元素具有全局属性外,还有以下独特属性:

##### colspan

这个属性包含一个正整数表示了th元素的单元格中扩展列的数量。

默认值为1,超过1000的值被视作1000。

##### rowspan

这个属性包含一个正整数表示了每个单元格中扩展行的数量。默认值为1. 

如果该值被设置为 0, 这个单元格就被扩展为(theader | tbody | tfoot)中表格部分的最后一个元素。

比65534大的值被视作65534。

##### headers

这个属性包含了一个空间分隔的字符串的列表, 每个与其他th元素相关联的id 属性一一对应。

##### scope

这个枚举属性定义了表头元素 (在th中定义) 关联的单元格。它可能有以下值：

- row: 表头关联一行中所有的单元格。
- col: 表头关联一列中所有的单元格。
- rowgroup:表头属于一个行组并与其中所有单元格相关联。这些单元格可以被放在表头的左侧或右侧，取决于table 元素中 dir 属性的值 
- colgroup: 表头属于一个列组并与其中所有单元格相关联。
- auto:有浏览器自己觉决定.

### [tr](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/tr)

#### 描述

存在开始和结束标签.

tr元素定义表格中的行,且td和th元素都可以存在于tr中.

#### 属性

该元素具有全局属性

### [td](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/td)

#### 描述

存在开始和结束标签.

td元素定义了一个包含数据的表格单元格,即定义表格中的列

#### 属性

该元素具有全局属性外,还有以下属性:

- colspan
- rowspan
- headers

以上三个属性的用法和***th - 属性*** 中的用法一模一样.

## 总示例

参见:[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/table)(往下滑)

# 东亚文字注解元素(ruby rb rp rt rtc)

## 显示

<ruby>
    <rb>我的天</rb>
    <rt>wo de tian</rt>
    <rtc>wo ai ni</rtc>
</ruby>

## ruby

### 描述

存在开始和结束标签.

是一个行内元素.

ruby元素是用来注解东亚文字,如:为东亚文字注音或做字符注释.

几乎兼容任何浏览器(包括IE,手机端中的浏览器可能不兼容)

### 属性

只存在全局属性.

## rb

### 描述

存在开始和结束标签.

是一个行内元素.

rb元素是用来分割ruby元素中需要被注解的文本,每一个rb元素应该只包含属于同一组的文本.

几乎兼容任何浏览器(包括IE,手机端中的浏览器可能不兼容)

### 属性

只存在全局属性.

## rp

### 描述

存在开始和结束标签.

是一个行内元素.

rp元素用来为那些不能使用ruby元素的(不能展示ruby元素的效果的)浏览器,提供随后的圆括号,如果可以兼容ruby元素的浏览器,则会忽略rp元素.

几乎兼容任何浏览器(包括IE,手机端中的浏览器可能不兼容)

### 属性

只存在全局属性.

## rt

### 描述

存在开始和结束标签.

是一个行内元素.

rt元素用来注解ruby元素中的文本,通常是跟着文本/rb元素的后面,因为rt元素在文本后面,那么注解的字符会显示在文本的上面, 否则就会显示在文本的左边.

几乎兼容任何浏览器(包括IE,手机端中的浏览器可能不兼容)

### 属性

只存在全局属性.

## rtc

### 描述

存在开始和结束标签.

是一个行内元素.

rtc元素可以说是注解的注解,因为它会显示在rt元素注解的上面,但是对于不支持该元素的浏览器来说,rtc元素中的注解会显示在ruby元素文本的右边.

注意: 该元素除了FireFox支持以外,没有任何浏览器支持.

### 属性

只存在全局属性.

## 注意点

需要注意的是: rb,rp,rt,rtc元素都必须直接为ruby元素的子元素(不能是孙元素等),且这四个元素都只能使用在ruby元素中,无法使用在其他任何元素之内.

## 总示例

```html
    <span>
        <ruby>
            <rb>冕</rb>
            <rp>(</rp>
            <rt>mian</rt>
            <rp>)</rp>

            <rb>曌</rb>
            <rp>(</rp>
            <rt>zhao</rt>
            <rp>)</rp>
        </ruby>
        
        <ruby>
            <rb>我的天</rb>
            <rt>wo de tian</rt>
            <rtc>wo ai ni</rtc>
        </ruby>
    </span>
```

![](/picture/ruby-chrome.png)

​																(chrome)

![](/picture/ruby-firefox.png)

​																(Firefox)

```html
<!-- 如果某个浏览器不支持ruby元素 -->
<ruby>
  	<rb>漢</rb> 
    <rp>(</rp>
    <rt>han</rt>
    <rp>)</rp>
    
  	<rb>字</rb> 
    <rp>(</rp>
    <rt>zi</rt>
    <rp>)</rp>
</ruby>
```

如果某个浏览器不支持ruby元素,可能会展现以下的效果:

![](/picture/ruby-nosupport.png)

# 列表元素(ol ul li)

## [ol](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/ol)

### 描述

存在开始和结束标签.

该元素是块级元素.

ol元素全称为: ordered list,有序列表.

ol元素表示多个有序列表项，通常渲染为有带编号的列表。

### 使用说明

- 通常，有序列表条目和它前面的编号一起显示，它的编号可以是任何形式，如数字、字母或者罗马数字，甚至可以是小子弹(CSS中的)

  而这种样式（小子弹）并没有在 HTML 页面内定义，而是在其关联的 CSS 中，使用了 [`list-style-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type) 属性。

- HTML 并没有对ol和ul元素的深度和反复使用次数（overlap）作出限制。

- ol 和ul都是列表项。

  它们的不同点在于ol元素里条目的顺序是有意义的。

   对于该选择哪一个去使用,我们建议：尝试去更改列表项的顺序，如果其含义改变了，那么应该使用 ol元素，否则使用ul更合适。

### 属性

该元素除具有全局属性外,还有以下独立属性:

#### reversed 

这个布尔属性规定了列表的条目采用倒序，即最不重要的条目放在列表第一个位置。

需要注意的是:reversed属性只影响ol元素的自带编号,不会影响源码或浏览器渲染li元素项的顺序,如:

```html
    <ol reversed>
        <li>a</li>
        <li>b</li>
    </ol>
```

![](/picture/ol-reversed.png)

#### type

编号类型:

- 'a' 表示小写字母编号；
- 'A' 表示大写字母编号；
- 'i' 表示小写罗马数字编号；
- 'I' 表示大写罗马数字编号；
- '1' 表示数字编号（默认值）。

除非在封闭的li元素中使用不同的type属性*(li元素的type属性已被弃用,请使用CSS list-stype-type代替)*，否则类型集将用于整个列表。

**Note:** 这个属性在 HTML4中弃用，但是在 HTML5 中被重新引入。除非列表中序号很重要（比如，在法律或者技术文件中的条目通常被需要所引用），否则请使用 CSS [`list-style-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type) 属性替代。

#### start

这是整数属性，规定了列表得条目序号的开始的值。

尽管列表条目的序号可能是罗马字母顺序，如 XXXI， 或者字母，但是这个start属性的值总是使用数字表示。

比如想要元素序号从字母 “C” 开始，请使用: `ol start="3"`.

**Note**: 这个属性在 HTML4中弃用，但是在 HTML5 中被重新引入。

### 示例

```html
    <ol reversed start="4" type="A">
        <li>这里应该是E</li>
        <li>这里应该是D</li>
        <li>这里应该是C</li>
    </ol>
```

![](/picture/ol-example.png)

## ul

### 描述

存在开始和结束标签.

该元素是块级元素.

ul元素全称为: unordered list,无序列表,表示一个内可含多个元素的无序列表或项目符号列表.

### 属性

该元素只具有全局属性(曾经的属性都被弃用).

### 使用说明

- ul元素用来将没有数字顺序的一组数据进行分组，并且它们的数字顺序是没有意义的。如: 

  ​	无序列表的列表项通常通过一个字符进行装饰，这些字符的形式可以是点，圆乃至方形．虽然这个字符没有直接在页面上定义，但是可以用与之相关的 CSS 对其进行操作，例如使用 [list-style-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/list-style-type)属性。

- 在 ul和ol元素中，嵌套列表没有深度和嵌套顺序的限制。

- ul和ol元素二者都代表一组数据，不过它们彼此是有区别的，ol元素中的顺序是有意义的;

   ul则只是单纯的进行分组,如果想表达的数据的语义可能会变,则应该使用ul,而不是ol.

### 示例

```html
<ul>
  <li>first item</li>
  <li>second item</li>
  <li>third item</li>
</ul>
```

![](/picture/ul-example.png)

## li

### 描述

存在开始和结束标签.

该元素是块级元素.

li元素是ol或ul元素的列表项,一个li元素代表一个列表项.

li元素用于表示列表里的条目,它必须包含在一个父元素里：一个有序列表(ol)，一个无序列表(ol)，或者一个菜单 (menu,(已被弃用))。

在无序列表里，列表条目通常用点排列显示；在有序列表里，列表条目通常在左边显示按升序排列的计数，例如数字或者字母。

### 属性

该元素只具有全局属性(曾经的属性都被弃用).

## 总示例

### 嵌套ol和ul元素.

```html
<ul>
  <li>first item</li>
  <li>second item      <!-- 这里不存在li的结束标签 -->
    <ol>
      <li>second item first subitem</li>
      <li>second item second subitem</li>
      <li>second item third subitem</li>
    </ol>
  </li>                <!-- 这里是li的结束标签 -->
  <li>third item</li>
</ul>
```

![](/picture/ol-ul-mixin.png)

## 相关知识

使用[CSS 计数器](https://developer.mozilla.org/Web/Guide/CSS/Counters)，用于处理复杂的嵌套列表,参见《CSS权威指南》P793.

# [source](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source)(相关元素:audio,video,picture)

## 描述

只存在开始标签.

单独开一个章节讲述source元素是因为,source元素可以存在三个元素之内,但是这三个元素并不是都有关联的:

1. picture
2. video
3. audio

source元素指定多个媒体资源。这是一个空元素。它通常用于以[不同浏览器支持的多种格式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Supported_media_formats)提供相同的媒体内容。

即source元素是为了解决浏览器之间的兼容性问题而出现的元素.

*(即一个资源用多种格式使用在不同的浏览器中,以保证每个浏览器都能使用相同的资源)*

如果一个浏览器支持多个source元素,则只有第一个source元素会被应用.

## 属性

source元素除了具有全局属性之外,还有以下属性:

### src

当source元素存在于video或audio元素中,且需要连接媒体资源时会使用到 src属性, 其值是一个URL(绝对/相对路径都/网址都行).

需要注意的是:当source元素处于picture元素中时,不能使用该属性,需要使用srcset来连接资源*(source必须为picture元素的直接子元素,即不能为孙元素等)*.

### srcset(实验中功能2020-5-4)

当source元素处于picture元素中且是picture元素的直接子元素时*(即不能为孙元素等)*，srcset属性才有效。

srcset属性用来连接一个资源.*(似乎该属性可以存在一个/多个,由逗号分隔的资源列表,详见[MDN-source](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source))*

srcset属性的值,可能是:

1. 一个图片的URL，
2. a width descriptor, that is a positive integer directly followed by 'w'. The default value, if missing, is the infinity.
3. a pixel density descriptor, that is a positive floating number directly followed by 'x'. The default value, if missing, is 1x.

Each string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, 

there must be only one string containing the same tuple of width descriptor and pixel density descriptor.

The browser chooses the most adequate image to display at a given point of time.

### type

指定source元素连接(src或srcset)的资源的MIME类型，可以选择使用codecs参数。有关如何指定编解码器的信息，请参见 [RFC 4281](http://tools.ietf.org/html/rfc4281)

### media(实验性API)

media属性类似于媒体查询[Media query](https://developer.mozilla.org/en-US/docs/CSS/Media_queries),该属性用来指示source元素连接的资源的媒体的类型,只要当媒体类型满足该属性条件时,source元素才会应用,否则不会.

注意: media属性应该只在当source元素处于picture元素中才使用.***详见: picture img -picture -属性 -media***

# picture img

## picture

### 描述

存在开始和结束标签.

该元素为行内元素.

picture元素包可能含0/多个source元素和一个img元素, 目的是为了不同的显示设备或者根据用户代理是否支持某个类型 来更换picture元素中的多个不同的图片.

若使用了picture元素,则浏览器会选择picture元素中最匹配的source元素，如果没有一个source元素匹配,

则选择img元素的 src属性中的URL指向的图片,最后User Agent选则的图像呈现在页面中.

### 属性

picture元素只具有全局属性,下面的属性是当source元素处于picture元素中时才会使用到的属性.

#### media(用于source元素)

media 属性允许你提供一个用于给用户代理作为选择哪个source元素的依据的媒体条件(media condition)（类似于媒体查询）。

如果这个媒体条件匹配结果为 false，那么这个source元素会被跳过。

```html
<picture>
    <!-- 虽说srcset是一个实验性属性,但是src属性无法替代它. -->
  <source srcset="demo-1.png" media="(min-width: 600px)">
  <img src="demo-2.png" alt="MDN">
</picture>
```

如果用户该元素所在的媒体样式的最小宽度不是600px(即>=600px,才会应用),则source元素会被忽略.

#### type(用于source元素)

`type` 属性允许你为source元素的 srcset 属性指向的资源指定一个 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)。

如果用户代理不支持指定的类型，那么这个source元素会被跳过。

```html
<picture>
  <source srcset="demo-1.svg" type="image/svg+xml">
  <img src="demo-2.png" alt="MDN">
</picture>
```

如果用户代理不支持image/svg+xml MIME类型,则source元素会被忽略.

### 使用说明(CSS的object-position/fit使用)

你可以使用 [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-position) 属性调整元素框架内图像的位置，
用 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) 属性控制图片如何调整大小来适应框架。

**提示：**请在img子元素上使用这些属性，而不是picture 元素。

- object-position:规定了[可替换元素](1de27985dbd81f5cad8516f53531d5a5.html)的内容，在这里我们称其为对象（即 object-position 中的 object），在其内容框(中的位置.
- object-fit:指定[可替换元素](1de27985dbd81f5cad8516f53531d5a5.html)的内容应该如何适应到其使用的高度和宽度确定的框.



## [img](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)

### 描述

只存在开始标签.

该元素为行内元素.

img将一份图像嵌入文档.

存在于picture元素中的img元素,就相当于switch语句中的default用法一样,即:当picture元素中没有一个source元素符合条件时,则使用img元素作为其渲染图片.

### 属性

img元素除了具有全局属性之外,还有以下元素:

#### src(必须)

#### alt(建议必须)

其他属性参见: [MDN-img](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)



## 总示例

```html
<picture>
	<source srcset="http://whyhw.com/api/img/png/5.png" 
		media="(min-width: 375px)" 
			type="image/png">
	<img src="http://whyhw.com/api/img/png/6.png" />
</picture>
```

当picture元素所在的媒体设备宽度 >=375px且User Agent支持image/png时,使用5.png图片;当小于375px且不支持image/png时,使用6.png.

渲染结果如图所示*(这里使用了浏览器自带的手机模拟)*:

![](/picture/picture-media-374.png)

![](/picture/picture-media-375.png)

# 至今(2020-5-3)不被兼容的元素

## [menu](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/menu#Browser_compatibility)



























