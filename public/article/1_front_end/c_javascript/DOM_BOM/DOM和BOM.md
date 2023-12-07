# [Window 接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)

实现 Window 接口的 `window` 对象代表一个包含 DOM 文档*以及 BOM* 的窗口

- 注意：这里的 BOM 用斜体表示，是因为 BOM 不是一个标准化的规则，它由每个浏览器各自实现。
  
  但是有关 BOM 的属性/方法 仍挂载到 `window` 对象上，如：`window.location`, `window.alert`。

而代表 DOM 的 `document` 对象作为一个属性挂载到 `window` 上 =>

```ts
window.document === document
```

TIPS: 

1. Window 是一个接口，不是一个构造函数，我们无法 `new`（实例化） 它

# 什么是DOM？

## 名词解释

DOM: Docuemtn Object Model,译为: 文档对象模型.是HTML和XML文档的编程接口

DOM接口: 一系列接口的总成, 比如有实现了HTMLTableElement DOM 接口的table对象等.

文档: 即页面, 一个文档就是一个页面,反过来也是如此,一个页面就是一个文档.

## 定义

一个W3C制定的标准,以节点和对象组成的结构集合, 并用接口的方式使实现此接口的对象,能够对该结构进行访问和操作,从而改变文档的结构、样式和内容等.

图1-2,则是节点和对象组成的结构集合----DOM树

![](../../picture/DOM图1-2.png)

​                                                                    (图1-2)

## 描述

根据定义,DOM将一个文档解析为一个由节点和对象(包括属性和方法的对象)组成的结构集合,即代表所有节点和对象[的集合]构成一个文档,也就是一种文档的显示形式(以下会有说明)

所以既然DOM是将一个文档解析为一个节点和对象组成的结构集合,这就代表着节点和对象之间是有联系的,而这个联系就是节点和对象之间存在包含关系,即节点包含着对象,也就是DOM在解析文档时,将所有节点都定义成一个个对象使用.

然后通过JS实现DOM的接口的对象,我们就可以用对象的操作和访问的形式使用存储在DOM的接口中的内容. *注意:一个对象可能不止实现一个DOM的接口,可能实现多个DOM的接口.*

​    *接口中的内容: 一系列相关的属性和方法(没有方法体). 这里按我的理解应该指: 跟节点的访问和操作有关的属性和方法* ,

因为DOM的接口是一系列相关的属性和方法组成,所以当此接口被实现成为对象时,这个对象就包含着DOM的接口的一系列相关的属性和方法其中的一部分或全部. *实现一个接口,不一定要实现它的所有内容*

而节点又被定义为对象,即节点包含着是属性和方法的,这些属性和方法是实现DOM的接口得到的,所以也就是节点对象也实现了DOM的接口的一些方法.

所以我们使用节点对象和实现DOM的接口的对象就可以操作和访问文档,对文档进行任何操作或响应.

比如: document对象,这代表文档本身;  

​           table对象,它是实现了 HTML TableElement DOM接口的对象,同时也实现了Element接口(上面有说到,1个对象可能实现多个接口以达到目的)或者其他接口,用来访问HTML的表格; 

以下是实现Document接口的document对象的使用.

```js
<p>我是p1节点.</p>
<p>我是p2节点.</p>


paragraphs = document.getElementsByTagName("p");
alert(paragraphs[1].nodeName); // P.注意这里是大写P.
/*
    以上代表使用JS实现的DOM接口之一的document对象,访问其中的方法getElementsByTagName(),以获取第二个节点的名字.
*/
```

​    注意: 所有操作和创建web页面(文档)的属性,方法以及事件都会被组织成对象的形式.  所以我们操作文档上的某个内容,也可以是认为在操作对象的某个属性/方法.

*因为节点就是被定义成对象,所有使用对象的属性和方法进行操作,就相当于对节点进行操作.*

根据以上表明,DOM是文档(web页面)和程序语言(比如JavaScript)之间的一座桥连,它将文档和程序语言连接了起来.

使得程序语言(JS)可以通过实现的DOM的接口的对象操作和访问文档(web页面)
$$
所以操作/访问一个web页面 = DOM +  程序脚本语言
$$
*DOM也是浏览器不同的表现(显示)形式之一*

- **表现形式**

​    *因为一个文档就是一个页面,而这个文档可以由浏览器直接显示(一打开浏览器所看到的画面);*

​    *又可以由HTML源码显示出来(F12 or ctrl + shift + i),* 

​    *而着两种就是所谓的表现形式.* 

DOM也是一种表现形式, 由节点和对象组成的结构集合的表现形式.

通常使用逻辑树来显示DOM解析的文档(web页面),树的每个分支的终点(即每个矩形)都是一个节点(node),每个节点都包含着对象(objects). 节点还可以关联上事件处理器,一旦某一事件被触发,那些事件处理器就会被执行.

请看图1-1,HTML DOM树.,或者叫做逻辑树.

当文档(页面/网页)被加载时,浏览器会创建文档(页面)对象模型,即Documet Object Model----DOM. 

而这文档对象模型若化为图形的形式则为以下的形式----[HTMl] DOM树,*在这里我们使用HTML文档作为例子,所以创建的是HTML DOM树,以此类推,还有XML DOM树等.*

这个文档对象模型DOM,由HTML文档对象模型被结构化而来. 而这就是DOM解析的文档的显示形式.

![](../../picture/HTML DOM树.png)

​                                                                    (图1-1)

通过这个HTML DOM树,即通过这个文档对象模型, 再使用JS实现的DOM的接口的对象(比如实现了节点对象),JS(程序语言)就能获得创建动态HTML的所有力量. 比如以下几种:

> - JavaScript 能改变页面中的所有 HTML 元素
> - JavaScript 能改变页面中的所有 HTML 属性
> - JavaScript 能改变页面中的所有 CSS 样式
> - JavaScript 能删除已有的 HTML 元素和属性
> - JavaScript 能添加新的 HTML 元素和属性
> - JavaScript 能对页面中所有已有的 HTML 事件作出反应
> - JavaScript 能在页面中创建新的 HTML 事件

还有一个与上面类似的HTML DOM图,请看以下图1-2.

很明显的,当文档对象模型,即DOM被结构化成一个树型的图时,更能让我们直观的明白一个文档(页面)是如何被操作和访问的,即通过节点进行访问和操作,更易理解和阅读.

![](../../picture/DOM图1-1.png)

​                                                                    (图1-2)

图1-2 对应的HTML页面为

```html
<html>
  <head>
    <title>Sample Page</title>
  </head>
  <body>
    <p>hello world!</p>
  </body>
</html>
```

注意: 虽然 [W3C DOM](http://www.w3.org/DOM/) 和[WHATWG DOM](https://dom.spec.whatwg.org/)标准在绝大多数现代浏览器中都有对DOM的基本实现,但是许多浏览器都对W3C制定的DOM标准进行了扩展,

所以使用时DOM的接口时必须注意兼容性,文档(页面)可能会在不同的浏览器上使用不同的DOM来访问.

# HTML DOM

## 定义

**HTML DOM是由W3C制定的一个如何进行增删改查,响应事件等的一个标准,或者说是接口. 它和DOM是类似的存在,只不过是专门为HTML制定的DOM而已.**

## 描述

DOM是文档和编程语言之间的桥梁，是编程语言的接口。

而HTML DOM很显然就是 HTML文档和JavaScript(脚本编程语言)之间得桥梁,也就是JavaScript的接口,它同时也是HTML的标准的文档对象模型,

它定义了:

- 作为*对象*的 HTML 元素
- 所有 HTML 元素的*属性*
- 访问所有 HTML 元素的*方法*
- 所有 HTML 元素的*事件*

简而言之:HTML DOM是一个类似DOM一样的标准,它制定了如何获取,更改,添加,删除,即响应事件等的HTML元素的标准

而且跟DOM一样,HTML DOM也是将文档解析成一个节点和对象组成的结构集合后,将节点定义为对象使用. 毕竟HTML DOM也是DOM,只不过是针对HTML的而已.

## HTML DOM or DOM中所有内容都是节点/对象

根据W3C制定的标准,在HTML DOM中,HTML文档的所有事物都是节点,亦或者都是对象.

- 整个文档是文档节点(对象)
- 每个 HTML 元素是元素节点(对象)
- HTML 元素内的文本是文本节点(对象)
- 每个 HTML 属性是属性节点(对象)
- 所有注释是注释节点(对象)

而DOM显然也是如此,即任何文档(如HTML,XML)的所有事物都以节点和对象构成. 我们下面以HTML DOM为例.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <p>我是内容节点</p>
</body>
</html>
```

以上中除了<!DOCTYPE html> 其他都是节点(这是说明文档是该怎么被解析),或者说是对象,下图1-3则是与上面例子对应的 DOM树.

![](../../picture/HTML DOM树所有内容都是节点or对象.png)

​                                                            图1-3

对于上图HTML DOM树的解析

**HTML是Root 节点,即根节点**

​    <u>*head是HTML的子节点,也是body的同胞节点*</u>

- meta是head的子节点,是title的同胞节点
- title是head的子节点,是meta的同胞节点
  - Docuemnt是title的子节点

​    <u>*body是HTML的子节点,也是head的同胞节点*</u>

- p是body的子节点,是meta,title的表兄弟节点(其实这个可以不用管)
  - 我是内容节点 是p的子节点

而所有则都也被定义为对象,即上述所说的都能是对象,而p的内容"我是内容节点" 也是对象.

HTML文档有了HTML DOM,在DOM树中所有节点(内容)都能被Javascript访问/修改/响应事件等.

或者说任何文档的DOM也是如此,有了DOM将节点定义成对象,就能通过实现DOM的接口的对象(这些节点对象就是实现了DOM的接口)就能轻松操作整个网页,在配合上独属于JavaScript的BOM,浏览器会被我们玩弄于股掌之间.

而没有BOM的脚本语言也无需担心,因为BOM对于每个现代浏览器来说都是默认实现且和DOM关联的,也就是其余脚本语言只要实现DOM,也有BOM的功能.

## 为什么要分清HTML DOM和DOM

在使用DOM的过程中,为什么会有各种文档自己实现的DOM呢?而不是直接使用DOM? 比如HTML DOM 和XML DOM 为什么不直接使用DOM?

这是因为每个文档的标准都不同,以及一些其他原因,例如: 在HTML DOM中,有些接口,属性,方法,或者节点本身是弃用了,而XML文档却没有弃用.

所以各类文档才会在DOM的基础上研究出独属于自己的DOM,再根据自己的需求增加或减少DOM的接口等.

# 可能会导致错误的认知

## 所有DOM中内容都是节点对象.

在HTML DOM或DOM处理中一的一种常见错误是误认为元素这个节点对象中包含的内容是文本

譬如: `<p>yomua</p>`,

常有人认为 `yomua`是文本,这是一种错误的认知,它不是文本,而是文本节点,或者说是文本对象/文本节点对象等.

在 什么是HTML DOM? - HTML DOM or DOM中所有内容都是节点/对象 中我们也说过了,任何文档被DOM解析时都是节点对象. 元素节点对象中的内容也不能例外.

否则若认为 `yomua`是文本,则无法操作它.因为DOM只能操作节点对象,而不是文本.

### 示例

```html
<body>
    <p id="p">我是文本节点对象,而不是文本</p>
</body>
<script>
 let x=document.getElementById('p').firstChild
 let y=document.getElementById('p').firstChild.nodeValue;
    alert(x); // 弹出警示框: [object Text]
       console.log(x); // "我是文本节点对象,而不是文本"
    console.log(y); // 我是文本节点对象,而不是文本
</script>
```

以上例子中,p元素节点对象中的内容还是节点对象,

**One:** 它使用了实现Document接口的document对象其中的getElementById()方法,查找ID为p的元素,

**Two:** 并使用了元素节点对象实现的Node接口的只读属性firstChild,获取p(当前)元素节点对象中的第一个子节点(若没有子节点,则返回null)

- 注意:在Gecko中,任意多个的空白符都将导致文本节点的插入,包括一个到多个空格符,换行符,制表符等等.

- ​    
  
  ```html
  <p>
  </p>
  ```
  
  以上只有1个p元素,它看上去没有任何内容,若使用firstChild属性,会返回null吗?不,不会返回null,因为p元素节点中包含着一个回车符,而回车符也是节点对象.
  
  `<p></p>`只有这样的元素节点对象使用firstChild属性所返回的值才是null

此时若使用 `alert(x)`,获取到的p元素的第一个子节点为: **[object Text]**; 

若使用 `console.log(x)`,获取到的p元素的第一个子节点为: **"我是文本节点对象,而不是文本"**

[object Text]直接证明了p元素所包含的子节点为一个文本对象,而是用console.log得出的值则很难体现,这是因为console.log的局限性所导致的.

​    *Console对象并不是JavaScript的~详情在以后会说到*    

**Three**: 在使用此p元素节点对象包含的第一个子节点对象,所实现的Node接口的nodeValue属性,获取当前节点对象的值.

而从以上所述,无不表明p元素节点对象所包含的内容还是节点对象,否则根本没有属性,也无法使用firstChild获取到p元素节点对象所包含的内容(因为此属性是获取当前元素节点对象的第一个**子节点对象**)

# DOM和JavaScript

DOM并不是一个编程语言,它只是一个标准,如同ES那样,其实只是一个描述,一个标准,任何的浏览器/程序脚本语言都可以实现DOM,并加之扩展.

JS亦是如此,如果没有DOM,JavaScript语言也不会有任何网页、XML页面以及涉及到的元素的概念模型.

在文档中,每个元素都是该文档所属的DOM(文档对象模型)的一部分,因此文档可以使用DOM和一个脚本语言(如JS)来访问和处理.*而DOM图就是如同图1-1,1-2 那些图.*

​    ***每个元素包括: 整个文档、文档头部、文档中的表格、表头、表格中的文本等等,也就是所有节点等。***

最开始的时候,JS和DOM是交织在一起的,它们可以说是不分彼此,但是最终还是演变成了两个独立的实体,JavaScript和DOM.  

> 据我猜测: 这是由于利益分配不均衡而导致的,比如各个脚本语言都实现自己的DOM,导致一个脚本语言只能运行在特定的环境,
> 
> 这全是为了抢夺市场(利益),而这导致整个网页时代进步缓慢,无法共用,互联等情况,所以W3C就制定了一个标注:DOM, 
> 
> 让脚本语言去实现DOM,这样就不至于一个脚本语言只能特定的环境上运行,而是一个程序跑遍大江南北.

不过即使演变成了两个独立的实体,但是JavaScript依然能操作DOM,只需要依靠实现DOM接口的对象即可. 而又因为如此,所有我们可以得出以下等式(公式):
$$
API(web或xml页面) = DOM + 脚本语言(如JS)
$$

# 如何访问DOM?

## 首先明白如何通过DOM,用脚本语言操作/访问文档

这很简单,在---什么是DOM→描述中,我就有提到过类似的了,即如何使用脚本语言访问和操作文档:

*各种帮助文档给出的答案是: 通过实现DOM中的接口的对象,来操作DOM解析的[以节点和对象组成的结构集合的]逻辑树,从而对逻辑树上的一个个节点对象进行访问和各种操作.*

*而一个个节点对象又对应着文档上的一个个元素,比如:<body> <p> <html>等,所以操作节点对象就是对元素的操作,而对所有元素的操作,就是对一个文档的操作.*

很显然,通过DOM我们能使用脚本语言操作和访问文档(web页面),首先肯定是必须要能访问DOM,才能通过它进行对文档的操作/访问.

## 其次再是如何访问DOM

**至于如何访问DOM 呢? 呵,我刚刚说的以上那么多还不懂吗? 即使用实现DOM的接口的对象,就是访问到DOM了.**

比如[docuement](https://developer.mozilla.org/zh-CN/docs/Web/API/document)和[window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)对象,它们对应的API分别为Doucemnt接口和Window接口(注意此接口为BOM的接口,但是在MDN上的示例是属于DOM的,详情请看 BOM的常用接口 - Window接口 - 描述),这两个接口都属于DOM.

- 其中document对象可以操作文档本身,
- window对象(注意此接口为BOM的接口,但是在MDN上的示例是属于DOM的,详情请看 BOM的常用接口 - Window接口 - 描述)可以操作/访问文档的子类,即访问/操作web页面的各种元素.

当然这两个接口只是DOM的其中一部分,DOM还有其他一部分,比如table对象实现的HTMLTableElement DOM接口.

*说这些,只不过是想让你明白,DOM包含的接口不仅仅只有1个,它有许多个,因为DOM代表着文档对象模型,而不是DOM接口!是DOM的接口,即DOM包含着的接口*

且在使用DOM时,我们不需要做任何额外的特殊的操作.

## 为什么不同的浏览器都可以用同一个脚本语言操作/访问文档?

虽然不同的浏览器都有对DOM的不同的实现,但是这些实现对当前的DOM标准而言,都会呈现出不同程度的一致性,即不同的浏览器之间实现的DOM的接口,都有些方面是会趋于相同,一致的.

每个web浏览器也都会使用一些文档对象模型DOM,即实现DOM,从而使页面可以被脚本语言访问/操作.

所以不同的浏览器的几乎都可以用同一个程序脚本语言操作/访问文档.

## 使用/访问DOM的示例

```html
 <!-- 使用实现Window接口的window对象,并使用window对象的alert()函数显示一个警示信息 --> 

<body onload = 'window.alert("我是window对象的alert()")'>

 <!-- 当页面被加载时,就会弹出一条警示框:我是window对象的alert() -->
```

以上为一个非常简单的DOM的Window接口(注意此接口为BOM的接口,但是在MDN上的示例是属于DOM的,详情请看 BOM的常用接口 - Window接口 - 描述)的调用示例.

当然了,除了这种简单的使用DOM以外,还有一些稍微复杂一点的使用DOM,比如:  当文档被装载或者当整个DOM可以被有效使用时,JavaScript可以设定一个函数来运行DOM.

```html
 <!-- 下面的函数会创建一个新的h1元素,并为之添加内容 -->
<html>
    <head>
        <script>
            // 当文档被加载时会运行的函数
            window.onload = function(){
                h1 = document.creatElement('h1');
                h1_text = document.createElement('Yomua')
                h1.appendChild(h1_text);
                document.body.appendChild(h1);
            }
        </script>
    </head>
</html>

<!-- 
    此时运行这个html时,会在页面上显示一个为h1字体的,其中内容为Yomua的.    
-->
```

***代码解析***

- **window.onload = function() {statements...};**
  
  即当窗口被加载或当整个DOM可以被使用时,就调用实现DOM的Window接口的window对象,并执行其onload函数,

- **document.creatElement('h1');**
  
  使用实现DOM的Document接口的document对象,并调用其creatElement()函数(方法), 
  
  也就是为整个文档(web页面)创建一个h1节点对象,在没有被DOM解析的结构集合,html页面的源码显示形式
  
  中0,此时应该是创建h1元素.

- **document.creatTextNode('Yomua')**
  
  同上面那句一样,只不过其函数功能为:创建某个节点的文本(内容)为Yomua.

- **h1.appendChild(h1_text);**
  
  调用h1节点对象的appendChild()函数,其功能为: 为h1节点增加一个孩子内容, 其中内容是h1_text变量所存储的内容.

- **document.body.appendChild(h1);**
  
  和上面一个document一样的,只不过变成了: 使用文档的body节点对象,调用其appendChild()方法,添加一个孩子,其孩子为h1变量,
  
  而h1变量的内容为: h1节点对象.即在HTML的源码显示形式上为h1元素.
  
  而在逻辑树上则是将h1节点对象添加到body下面的分支上,以body为父亲.

# 关于DOM接口和对象之间的关系

## 描述

在 什么是DOM? → 名词解释中,我说过DOM接口,其实是一系列接口的总称.是这样的,没有任何问题.

但是请注意实现DOM接口的对象和DOM接口之间的关系不要搞混.

因为一个对象可以实现多个DOM接口,这代表着这个对象有着多个接口的属性和方法.

 例如: HTML的form元素,即<form>,它实现了HTMLFormElement接口,并从中获取它的name属性, 又实现了HTMLElement接口并从中获取className属性以及实现了其他接口等.

而在上面我举得这个form元素例子中,我们再获取属性时,都是从form元素中,哦不,应该是认为从form这个节点对象中获取属性的.(因为DOM在解析文档时将文档解析成节点和对象的结构集合,且节点被包含(被定义)成对象),而不是从接口中直接获取.

而且请注意: 有时你发现一个对象实现了多个接口,而这个对象却可以使用这些接口中不存在的属性/方法,请不要惊讶,因为请不要忘记了,接口之间是可以有继承关系的,即<u>一个接口可以继承另一个/多个接口(接口的多继承),而这被继承的一个/多个接口又可以继承另一个/多个接口,以此可以一直继承,直到最上层.</u>

所以千万别认为只实现了一个接口的对象有的属性/方法很少,不,是很多的,因为这个接口有父接口,又有爷接口,祖先接口等等..

比如: table节点对象实现了HTML Table Element Interface(接口),又由于table节点对象其实也是HTML的元素,所以table节点对象也实现了Element接口. 

同时HTML元素对于DOM来说是组成web页面or XML页面的逻辑树中的一个节点,所以table也实现了最基本的Node接口, 同时Element接口也继承于Node接口.

且不仅仅一个对象可以实现多个接口,同时1个接口也可以被多个对象实现.

## 示例

此示例是关于1个对象(即节点对象,或者说是元素,节点等,在不同的场合有不同的叫法,但是可以统一认为是对象)使用其中的属性和方法时,会用到的接口的属性和方法.

通常我们得到一个对象引用(即对象的名字,实现接口的对象的名字)时,我们就直接使用其中的属性和方法,但是不知其属性/方法从哪里来的,具体又从哪个接口来的? 知其然而不知其所以然.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <table border="0" id="table" class=" name ">
        [table_text]
    </table>
</body>

<script>
    var table = document.getElementById("table");
    // Node/Element interface
    var tableAttrs = table.attributes; 
    for (var i = 0; i < tableAttrs.length; i++) {
        // HTMLTableElement interface: border attribute
        if (tableAttrs[i].nodeName.toLowerCase() == "border")
            table.border = "1";
    }
    // HTMLTableElement interface: summary attribute
    table.summary = "note: increased border";
    console.log(table.summary)
</script>

</html>
```

***代码解析***

- ***document.getElementById("table");***

- ***table.attributes;*** 
  
  使用了实现Element接口和Node接口的对象,此时使用Element接口和Node接口的对象的名字,即对象引用为:table,并使用其实现了接口中的属性attributes,
  
  *这里table因为不仅仅是一个元素,也是一个节点,所以又实现了Node接口*
  
  其功能为:返回该元素所有属性节点的一个实时集合.
  
  即 得到一个NameNodeMap对象的集合,此集合不是数组,所以没有数组的方法,而且其属性节点的索引顺序随浏览器不同而不同.
  
  - 属性节点: 元素中的属性,比如p元素的class属性.
    
    为什么叫属性节点呢?因为我们一直再强调,DOM解析的是一个对象和节点的结构集合,其节点被定义为对象,不光实现DOM的对象是节点,其属性也是节点.
  
  所以若我们有这么一行代码: `console.log(table.attributes);`会得到如下的集合:
  
  ```js
  amedNodeMap {
      0: border, 
      1: id, 
      2: class,
         // 这个其实就是总结,在集合中也会体现
         border: border, 
         id: id, 
         class: class, 
         length: 3
  }
  ```
  
  显然,从上面的输出结果来看,这是一个NameNodeMap对象的集合,
  
  且attributes属性是以字符串形式的`名:值`为一对,而每一对 `名:值`都对应一个属性节点,即对应一个元素的属性.

- ***table.summary*** 
  
  使用实现HTMLTableElement接口的对象,其此时使用该接口的对象的名字,即对象引用为: table,并使用其实现了HTMLTableElement接口中的属性summary,
  
  其功能为:描述一个表格
  
  所以 `console.log(table.summary)`将会输出里面所包含的内容.

从以上的后面两个代码来看,我们一个table对象实现了3个接口,而你若不了解DOM和DOM的接口的话,你肯定只知其然而不知其所以然.

比如你只知道我使用docuement对象的某个方法就能获取HTML的节点,并且这个节点也能使用属性/方法,而不知道这个节点其实是个对象,且它实现了3个/多个以上的接口才能做到让你使用属性/方法操作它.

实现的3个接口分别为 : Element接口,Node接口,HTMLTableElement接口.

# DOM的最基本的数据类型

在 <基本类型(原始类型).md>一文中,我们知道数据类型就是某个数据属于什么类型,它属于这个类型的意义和为什么属于这个类型.

而这里我要讲的就是当使用实现DOM的接口的对象,其中的一些方法/属性时,会返回什么样的类型,这些返回的类型的意义又是什么?

|              | 最基本也是最重要的数据类型.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|:------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| document     | 当一个成员返回 `document` 对象 （例如，元素的 `ownerDocument` 属性返回它所属于 `document` ) ，这个对象就是root `document` 对象(根文档)本身。                                                                  [DOM `document`Reference](https://developer.mozilla.org/zh-CN/docs/DOM/document) 一章对 `document` 对象进行了描述。                                                                                                                                                                                                                                                                                         |
| element      | `element` 是指由 DOM API 中成员返回的类型为 `element` 的一个元素或节点。                                                                                 例如:  [document.createElement()](72d3d95a3d0d2cd4cb26a583243232da.html) 方法会返回一个 `node` 的对象引用，也就是说这个方法返回了在DOM中创建的 `element`。 `element` 对象实现了 DOM `Element` 接口以及更基本的 `Node` 接口，参考文档将两者都包含在内。                                                                                                                                                                                                                                           |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| nodeList     | `nodeList` 是一个元素的数组，如从 [document.getElementsByTagName()](45e0763726248a1c60e4e0b29030071d.html) 方法返回的就是这种类型。 `nodeList` 中的条目由通过下标有两种方式进行访问：       1                        list.item(1)                                                                                           2                        list[1]                                                                                                      以上这两种方式是等价的，第一种方式中 **`item()`** 是 `nodeList` 对象中的单独方法。                                                            后面的方式则使用了经典的数组语法来获取列表中的第二个条目。 |
| attribute    | 当 `attribute` 通过成员函数 (例如，通过 **`createAttribute()`**方法) 返回时，它是一个为属性暴露出专门接口的对象引用。                                                                              DOM中的属性也是节点，就像元素一样，只不过您可能会很少使用它。                                                                                                                                                                                                                                                                                                                                                                           |
| namedNodeMap | `namedNodeMap` 和数组类似，但是条目是由name或index访问的，虽然后一种方式仅仅是为了枚举方便，因为在 list 中本来就没有特定的顺序。                                                                                           出于这个目的，  `namedNodeMap` 有一个 item() 方法，你也可以从  `namedNodeMap` 添加或移除条目。                                                                                                                                                                                                                                                                                                                          |

# DOM中核心接口包括其属性/方法

在这里我将列出一些常用的DOM中的接口和接口的属性和方法,但是这里并不会描述它们的全部功能,只是让你了解当你使用DOM时会用到的常用的接口和接口的属性/方法是什么.

首先,在使用DOM时,最最常用的两个接口无疑是:Document接口和Window接口

*(注意此接口为BOM的接口,但是在MDN上的示例是属于DOM的,详情请看 BOM的常用接口 - Window接口 - 描述),*

而实现它们两个的对象document对象, window对象简直就是香馍馍.

document对象表示文档本身的根节点,window对象表示浏览器中的内容.

这两个接口分别实现的对象,配上继承Node接口的Element接口,若某个对象引用能实现这三个常用接口:Document,Window,Element; 那么这个对象(即节点)将可以做到许多事情.

比如在本节的 示例 的table对象,它实现了多个接口.

## 常用的接口的属性/方法,即API

下面是在web和XML页面脚本中使用DOM时,一些常用的API(即接口方法/属性)的简要列表.

- [document.getElementById(id)](https://developer.mozilla.org/zh-CN/docs/DOM/document.getElementById)
- document.getElementsByTagName(name)
- [document.createElement(name)](https://developer.mozilla.org/zh-CN/docs/DOM/document.createElement)
- parentNode.[appendChild](https://developer.mozilla.org/zh-CN/docs/DOM/Node.appendChild)(node)
- element.[innerHTML](https://developer.mozilla.org/zh-CN/docs/DOM/element.innerHTML)
- element.[style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style).left
- element.[setAttribute()](https://developer.mozilla.org/zh-CN/docs/DOM/element.setAttribute)
- element.[getAttribute()](https://developer.mozilla.org/zh-CN/docs/DOM/element.getAttribute)
- element.[addEventListener()](https://developer.mozilla.org/zh-CN/docs/DOM/element.addEventListener)
- [window.content](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/content)
- [window.onload](https://developer.mozilla.org/zh-CN/docs/DOM/window.onload)
- [window.dump()](https://developer.mozilla.org/zh-CN/docs/DOM/window.dump)
- [window.scrollTo()](https://developer.mozilla.org/zh-CN/docs/DOM/window.scrollTo)

## 常用的接口

以下接口是在使用DOM时,我们常用到的DOM的接口,和常用的DOM的接口的属性和方法不同,常用的接口包含常用的属性/方法.

### Node接口

#### 描述

Node接口是DOM的接口中一个许多接口都会继承它的接口,

以下接口都从Node接口继承其方法和属性

- [`Document`](186d4bd4eb897b1283583d3be6646c5a.html),
- [`Element`](5338bae26106d935989cfb4c7be7fbe4.html),
- [`Attr`](cd6f5237386510617d470f88628595a4.html),
- [`CharacterData`](6573bf1f2613f3aa30157e201644189e.html) (which [`Text`](23b4fdc91ac40ce464f13a8017fbba94.html), [`Comment`](c0dd1037b217b004eeaa3acd328f32db.html), and [`CDATASection`](9f7faf9633b2fd0d0112d887e0d36fca.html) inherit), [`ProcessingInstruction`](4ef5bf2634d9b583585d45280056b150.html),
- [`DocumentFragment`](2d2b668bfb638c2d413f3d2f86692853.html),
- [`DocumentType`](724c2e1afed0a6381694143fd5f9ee2c.html), 
- [`Notation`](98d02f29f9fc774c38c428ad99a6e5dc.html),
- [`Entity`](https://developer.mozilla.org/zh-CN/docs/Web/API/Entity),
- [`EntityReference`](https://developer.mozilla.org/zh-CN/docs/Web/API/EntityReference)

在方法和属性不相关的特定情况下, 这些继承自Node接口的接口在使用时,可能会返回null,或许它们可能会抛出异常,

比如: 在不允许有子节点的节点下,尝试添加子节点的操作. 

即可以使用实现Document接口的document对象,并用其careteElement()和appendChild()这两方法,将子节点添加到不允许有子节点的节点上.

就有可能会抛出异常,或错误.

#### 作用

Node接口允许我们使用相似的方式对待不同的DOM API;

比如:在不同的DOM的API中继承同一组方法,或者用同样的方式测试.

就好像一个节点对象可以使用多个接口中相同的属性/方法.

#### Node接口的属性

Node接口的的属性一般是从其父接口EventTarget接口继承的属性

以下列出一些基本属性

- [`Node.firstChild`](ebf533857b199391700e5a3a86ba1675.html) 只读
  
  返回该节点的第一个子节点[`Node`](6d874204ab61ba862524362521782495.html)，如果该节点没有子节点则返回`null`。

- [`Node.isConnected`](1f9741d73877854dac0c417539005b61.html)只读
  
  返回一个布尔值用来检测该节点是否已连接(直接或者间接)到一个上下文对象上，比如通常DOM情况下的[`Document`](186d4bd4eb897b1283583d3be6646c5a.html)对象，或者在shadow DOM情况下的[`ShadowRoot`](ea23f9f7540b4f49bae3d76e5395b17e.html)对象。

- [`Node.lastChild`](31e5ac9da84b87aaed257490a3edcc8e.html) 只读
  
  返回该节点的最后一个子节点[`Node`](6d874204ab61ba862524362521782495.html)，如果该节点没有子节点则返回`null`。

#### Node接口的方法

和属性一样,Node接口其大部分方法从父接口EventTarget接口继承。

以下同样列出一些基本方法

- [`Node.appendChild()`](4ff59414a10a614df68977372ed8c227.html)
  
  将指定的 childNode 参数作为最后一个子节点添加到当前节点。
  如果参数引用了 DOM 树上的现有节点，则节点将从当前位置分离，并附加到新位置。

- [`Node.cloneNode()`](da55cfee3e02974fbde9ef5195f88060.html)
  
  克隆一个 [`Node`](6d874204ab61ba862524362521782495.html)，并且可以选择是否克隆这个节点下的所有内容。默认情况下，节点下的内容会被克隆。

- [`Node.compareDocumentPosition()`](f2d0f663aa12218096d934ee0813445e.html)

- 比较当前节点与文档中的另一节点的位置。

- [`Node.contains()`](46b588ed07795e3ed025c730450622d9.html)
  
  返回一个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 布尔值，来表示传入的节点是否为该节点的后代节点。

- [`Node.getRootNode()`](5650ac3172a7bcb65ddc0395d1eaee8e.html)
  
  返回上下文对象的根结点。如果shadow root节点存在的话，也可以在返回的节点中包含它。

- [`Node.removeChild()`](c3a14a0b906d819cee6e5f0441154e15.html)
  
  Removes a child node from the current element, which must be a child of the current node.
  
  ---从当前元素中移除子节点，该子节点必须是当前节点的子节点。其返回值为:返回删除的节点。

#### 示例

使用Node接口的removeChild()方法,可以移除当前元素中的某个子节点or所有子节点.

```js
// 以下示例为删除某个元素下的所有子节点.
function removeAllChildren(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
}
```

- element代表文档的某个元素,也就是节点,即节点对象.
  
  这个节点对象实现了Node接口,Element接口等等. 
  
  它现在使用的firstChild()方法属于Node接口的方法,或者说属于Node接口的父接口:EventTarget.
  
  只不过对象的firstChild()方法是接口的firstChild()方法具体的实现,因为接口的方法是没有方法体的.
  
  → 对象的element.removeChild()是接口Element.removeChild()的具体实现.

### Element接口

##### 描述

Element接口是一个通用性非常强的基类,这里说的基类,指的是父接口

因为所有文档(web页面)下的对象(即节点对象/元素)都继承自此接口.毕竟它的英文意思就是:元素.

Element接口描述了所有相同种类的元素(节点对象)具有的方法和属性,形象化来说,也就是将相同的种类的节点对象放在一堆,然后在解释这堆[相同种类的节点对象]的属性/方法.

某些接口在继承Element接口的同时,也增加了一些额外功能的接口(即增加了一些额外的API,(方法/属性),或者说实现了其他的接口)专门描述Element接口的具体行为. 

比如:HTMLElement接口.它继承了Element接口,但是它自己也有一些Element接口不拥有的API(属性/方法). 且HTMLElement接口是所有HTML元素基本接口.

类似的还有SVGElement接口,它是所有SVG元素的基本接口. 

而我说的这些如同上面的HTMLElement,SVGElement接口等的接口,它们的大多数功能是根据它们的需求在更深层级的接口中被进一步制定的.

(其实不用管这个,只需要知道这个接口干什么用的就差不多了,如有需求在细细研究)

#### Element接口的属性

对于Element接口的属性来说,它的属性有绝大多数都继承自它的祖先接口Node,并且还扩展了Node的父接口:EventTarget

同时还从以下的接口中继承了属性    

- ParentNode
- ChildNode
- NonDocumentTypeChildNode
- Animatable。

以下列出一些基本的属性

- [`Element.attributes`](e34319273d0fedf6d30048b81ec9bc30.html) 只读
  
  返回一个与该元素相关的所有属性集合 [`NamedNodeMap`](173aa2c7d6f60498274e46225e225a92.html)。

- [`Element.classList`](9cf1dc658e67584ea4088c4acc310527.html) 只读
  
  返回该元素包含的 class 属性，是一个 [`DOMTokenList`](a86842b95a2aaab5b9c60a07398503c6.html)。

- [`Element.className`](cb001ffbab4ab0a1db6c41f1e99da280.html)
  
  一个 [`DOMString`](a475d816c1f8f89d5fa81ca3ec633ceb.html)，表示这个元素的 class。

- [`Element.clientHeight`](3d9ce1f1e39718d28cca88fbbb6f64ff.html) 只读
  
  返回[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 表示内部相对于外层元素的高度。

#### Element接口的方法

Element接口的方法和它的属性差不多,也继承自别的接口.

从 Node接口继承和EventTarget等接口继承,并且还实现了ParentNode、ChildNode、NonDocumentTypeChildNode和Animatable等接口的方法。

以下为一些基本的方法

- [`Element.getElementsByClassName()`](18566f1b4216f4a2ad89f026f6ce486f.html)
  
  参数中给出类的列表，返回一个动态的HTMLCollection ，包含了所有持有这些类的后代元素。

- [`Element.getElementsByTagName()`](66e53c97b775f8508b51d676e6621247.html)
  
  返回一个活动的HTMLCollection，包含来自当前元素的特定标记名的所有后代元素。

- [`Element.getElementsByTagNameNS()`](319d70c3832f843220683a538c8fb661.html)
  
  从当前元素返回包含特定标记名称和命名空间的所有子代元素的活动HTMLCollection。

- [`Element.hasAttribute()`](1620d9f17268e22b43a7d06b33be8f30.html)
  
  返回一个布尔值 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，指示元素是否具有指定的属性。

#### Element接口的事件

使用addEventListener()侦听这些事件，或者将事件侦听器分配给该接口的oneventname属性。

所以文档的元素(节点对象)才拥有侦听事件以及响应事件的功能,

*(虽然节点对象的事件的功能肯定不只从这个一个接口中继承或者从一个属性/方法中继承,而是从多个接口,多个属性/方法)*

不然你以为若没有这些接口的属性/方法,节点对象本身就有了?想太多了!

以下列出一些基本的事件类型.

- [cancel](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/cancel_event)
  
  当用户指示浏览器希望关闭当前打开的对话框时，触发<dialog>。
  例如，当用户按下Esc键或单击作为浏览器UI一部分的“关闭对话框”按钮时，浏览器可能触发此事件。
  
  也可以通过oncancel属性获得。

- [error](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/error_event)
  
  当资源加载失败或无法使用时触发。
  例如，如果脚本执行错误或无法找到图像或无效。
  
  也可以通过onerror属性获得。

还有一些各种事件: 如

- Clipboard events 剪贴板事件
- Fullscreen events 全屏事件
- Mouse events 鼠标事件
- Keyboard events 键盘事件
- ...

### Document接口

#### 描述

Document接口表示任何在浏览器中载入的网页, 并且Document接口可以作为网页内容的入口,即DOM树.它是非常关键的一个接口.

DOM树应该包含了所有的HTML元素,如:<body>,<table>,<title>这样的元素.

Document接口为网页文档本身(即web网页本身)提供了全局操作功能,能解决如何获取页面的URL,或着如何在网页中创建一个新的元素,或者是添加,修改,删除,这样的问题.

且Document接口描述了任何类型的文档的通用属性和方法,也就是说,根据不同的文档(HTML,XML,SVS,...),还能使用更多的API,更多的其他的接口

​    譬如使用'text/html'作为内容类型的HTML文档,还实现了HTMLDocument接口,而XML和SVG文档则额外实现了XMLDocument接口. 

这一点和HTMLElement,XMLElement接口很像.

*所以,在DOM的接口中有许多类似的这样的事情,即一个接口继承了另一个接口,又再此另一个接口上增加了一些额外功能的接口,目的是为了一些其他东西(例如文档)提供特定的需求*

*比如:继承了Document接口,但是再次接口的基础上又增加了HTMLDocument接口,专门来为HTML文档提供Docuement接口中没有的一些额外功能.*

*这是因为Document接口是公用的,任何文档都可以实现它,比如就有用XML文档实现的web网页(文档),它也继承Document公用接口,但是同时也有自己的Document接口:XMLDocument接口.*

​    所以才说,根据不同的文档类型,能使用更多的API,来供我们调用,操作和访问文档,而这些更多的API通常是某个文档的专用的,如:HTMLDocuemnt,XMLDocuemnt等.

#### 构造器

[Document()](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/Document)

##### 语法

new Document();

此构造器会创建一个新的Document对象,即实现了Docuement~~接口~~构造器的对象,该对象和最基本的实现的Document接口的document对象一样是表示在浏览器中加载的页面,并作为页面内容的入口点.

~~即实现的新的对象也能拥有如同document对象一样的功能~~

而新对象似乎不拥有如同document对象的访问和操作文档的方式.

因为新对象是实现的是Docuemnt()构造函数,而不是Document接口,它只拥有Document()构造函数的属性和方法.

比如：

```JS
let x = new Document();
x.write('x'); // 会报错,错吧实现Docemnt()构造函数的对象x当作实现了Document接口的document对象来使用.
```

#### 属性

是的,Document接口中除了方法,当然还有属性.至于Document接口的方法这里就不继续赘述了.

这些属性继承自Node接口和EventTarget接口.以下列出MDN中列出的属性,当然只是极少的一部分.

- [`Document.anchors`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/anchors) 只读
  
  返回文档中所有锚点元素的列表。

- [`Document.scripts`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scripts) 只读
  
  返回文档中所有的[<script>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)元素。

- [`Document.domain`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/domain)
  
  获取或设置当前文档的域名。

- [`Document.cookie`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)
  
  返回一个使用分号分隔的 cookie 列表，或设置（写入）一个 cookie。

- ...

#### 总结

大概Document就以上的几点了,当然了Document接口也有方法,但是MDN中没有列出来,这里我就没必要继续赘述,方法比如:**`Document.write()`**等

至于其他的,就不用继续赘述了~这些已经够了.毕竟做为一个接口,大部分人其实只需要知道怎么用,不要知道它的具体的实现.

而我弄了这么多,如果以后还想继续了解,那就以后补充..

### CSS接口

#### 描述

很错愕吗? 没想到还存在CSS接口这一说?嘿,我如果跟你说,不仅存在CSS接口,甚至还存在着许多又跟CSS有关的接口呢? 比如: CSSValue接口,继承CSSValue接口的CSSValueList接口,CSSRule接口等等.

更可能让你在震惊的是,CSS竟然没有实现它的对象,是的,也就是说,没有任何对象实现CSS接口,或者说到2020/2/5,尚且还没有实现CSS接口的对象.

而且不仅没有实现CSS接口的对象,我们也无法创建实现CSS接口的对象.

所以至今,2020/2/5,CSS接口仅仅只包含静态的方法,所以它又被称之为使用接口或着工具接口.

- 静态方法: 通常指,在不创建对象的情况下就可以被使用的方法,此类方法不必和对象绑定在一起

而且请注意:这里说的CSS接口,就是指CSS接口,而不是指CSS的接口,这两者是有区别的,前者指CSS接口这一个接口,后者指有关CSS的接口.

而有关CSS的接口根据接口的不同,是可以进行实例化的,譬如:CSSRuleList接口,而rules.item(index)中的rules对象就是实现了CSSRuleList接口的对象.

而且有关CSS的接口是脚本语言能控制CSS的关键,因为这些接口也是属于DOM的一部分,若没有关于CSS的接口,就好像没有Document接口,Window接口

*(注意此接口为BOM的接口,但是在MDN上的示例是属于DOM的,详情请看 BOM的常用接口 - Window接口 - 描述),*

等.就无法使用脚本语言操作CSS的内容

#### 有关于CSS的接口的作用

对于关于CSS的众多接口来说,其作用就是为了让CSS暴露给脚本语言,如(JS),就和其他接口一样,它们的目的都是这个,让脚本语言通过接口实现的对象or通过接口操作/访问接口们所属于的那个东西.

而在这里,关于CSS的接口的作用就是为了让脚本语言操作/访问CSS的内容.

# DOM的mixin

## 描述

2020/2/7 不知道是否正确的理解

mixin:混合,混入

*通过网络上搜索mixin,得到的是Vue有种mixin机制,是一种混合机制.*

*通常组件在引用之后相当于在父组件内开辟了一块单独的空间，来根据父组件props传过来的值进行相应的操作，单本质上两者还是泾渭分明，相对独立。*

*但是依靠mixin则是在引入组件之后，则是将组件内部的内容如data等方法、method等属性与父组件相应内容进行合并。相当于在引入后，父组件的各种属性方法都被扩充了。*

*单纯组件引用：*

*父组件 + 子组件 >>> 父组件 + 子组件*

*mixins：*

*父组件 + 子组件 >>> new父组件*

而DOM种的mixin应该也和这个差不多,即将接口和接口混合,也就是将某两个或多个接口进行一种公共特性的描述.

比如:WindowOrWorkerGlobalScope, 此WindowOrWorkerGlobalScope mixin就是对 Window 和WorkerGlobalScope 接口的公共特性的描述。

WindowOrWorkerGlobalScope是一个mixin,即混合,而不是一个Interface,所以不能创建它的对象; 而像这类的mixin存在并不少.

你们有没有发现mixin有些像工具接口,例如CSS接口,都是无法被实现,不过它们还是有本质的区别的,mixin主要的是描述多个接口的公共 特性,而CSS接口则是一个充满静态方法可以直接被使用的接口.

mixin是直接无法被使用,而工具接口至少可以被使用,这是本质的区别.而且一个是描述,一个是工具.

在这里我们举个例子,这个例子就是以上的WindowOrWorkerGlobalScope.

## WindowOrWorkerGlobalScope mixin

### 描述

WindowOrWorkerGlobalScope不是一个Interface,而是一个mixin,它无法被实现,即无法创建任何对象.

WindowOrWorkerGlobalScope mixin是对 Window 和WorkerGlobalScope 接口的公共特性的描述。

所以它也有属性,且有只属于它的属性/方法,而这些属性/方法同时被Window和WorkerGlobalScope的对象实现.

### 属性

 这些属性由WindowOrWorkerGlobalScope mixin 定义，同时被 Window 和 WorkerGlobalScope的对象实现。

- WindowOrWorkerGlobalScope.caches只读
  
  返回与当前上下文相关联的CacheStorage 对象。这个对象提供了一些功能，例如存储可供离线使用的 asstes，以及对 requests 生成自定义的 responses 。

- WindowOrWorkerGlobalScope.indexedDB只读
  
  提供一种机制，以供应用可以异步访问 indexed databases；返回  IDBFactory 对象。

### 方法

以下方法由 WindowOrWorkerGlobalScope mixin 定义，同时被 Window 和 WorkerGlobalScope 实现。

- WindowOrWorkerGlobalScope.atob()
  
  对 base-64加密的数据字符串进行解码。

- WindowOrWorkerGlobalScope.btoa()
  
  从二进制数据中创建 base-64 编码的 ASCII 字符串。

# DOM存在Level

Reference: https://www.w3.org/TR/DOM-Level-2-Views/

是的,DOM以及各种文档的DOM都存在Level,即在某个时期,在旧的DOM中制定出了新的标准,从而出现新的DOM.

比如: DOM 1, DOM2...等等.     

# ----------------

# 什么是BOM？

## 名词解释

BOM: Browser Object Model,浏览器对象模型

## 描述

*和DOM有些相似,都有自己的接口,和一些特定的作用.不过也有区别,不像DOM有自己的标准等.*

通过BOM可以对浏览器窗口进行访问和操作,开发者也可以移动窗口、改变状态栏中的文本以及执行其他与页面内容不直接相关的动作。

但是有个很严重的问题:即BOM没有如同DOM一样有任何相关的标准,它只是JavaScript的一个部分.也就是说,其他实现ES的脚本语言不一定有BOM这个东西,但是或许在制定DOM标准时,就已经将非标准的BOM归纳在了DOM上

因为在一些帮助文档(MDN)种,并没有关于BOM的介绍,但是依然存在着Window接口和实现它的window对象.这说明DOM默认关联于浏览器,即DOM关联着只属于JS的BOM的接口.

而且因为没有相关的标准,所以每个浏览器都有自己的BOM实现,这就更加证明了在没有BOM的脚本语言中,它们实现DOM时,就也实现了BOM,因为浏览器其实已经默认自己实现了BOM,且将BOM与DOM关联.

> *有了DOM将节点定义成对象,就能通过实现DOM的接口的对象(这些节点对象就是实现了DOM的接口)就能轻松操作整个网页,在配合上独属于JavaScript的BOM,浏览器会被我们玩弄于股掌之间.*
> 
> *而没有BOM的脚本语言也无需担心,因为BOM对于每个现代浏览器来说都是默认实现且和DOM关联的,也就是其余脚本语言只要实现DOM,也有BOM的功能.*

不过虽说每个浏览器都有自己的BOM实现,但是有一些事实上的标准(不成文的规定),比如浏览器都具有一个窗口对象和一个导航对象,但是每种浏览器可以为这些对象或其他对象定义自己的属性和方法,也就是扩展了功能.

不过虽说有了事实上的标准,但是仍然存在兼容性的问题,所以对于现代的浏览器而言,几乎都实现了相同的BOM的接口(不这样就造成各种问题,比如网页将发展缓慢等),而这些接口又可以被称之为BOM的接口.

比如:Window接口,Screen接口等.

## 定义

通过实现BOM的接口的对象/DOM接口本身(工具接口)对浏览器窗口进行访问和操作,让开发者也可以移动窗口、改变状态栏中的文本以及执行其他与页面内容不直接相关的动作.

## BOM的作用

BOM 主要处理浏览器的窗口和框架，不过通常浏览器特定的 JavaScript 扩展都被看做 BOM 的一部分。这些扩展包括但不限于：

- 弹出新的浏览器窗口
- 移动、关闭浏览器窗口以及调整窗口大小
- 提供 Web 浏览器详细信息的定位对象
- 提供用户屏幕分辨率详细信息的屏幕对象
- 对 cookie 的支持
- IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象

# BOM的常用接口

### Window接口

包含 DOM 和 BOM.

-> document 对象挂载在 window 上

#### 描述

window对象表示一个包含DOM文档的窗口,即window对象表示一个"窗口",只不过这个窗口包含DOM文档罢了,就像一个画框,包含了一幅画,这里的画框就是window对象,而这幅画代表着DOM文档，而画框的框就是 BOM.

window对象是全局变量(对象也是变量,只不过是包含了变量的变量,详情请看<对象.md>,它代表了当前脚本正在运行的窗口, 它将这窗口暴露给脚本语言(如JavaScript)代码.

其目的不言而喻,让脚本语言拥有可以操作/访问文档所在窗口的能力。

若在一个拥有标签页功能的浏览器中(比如Chrome,可以开很多个标签这类的浏览器),这些浏览器中存在的一个个标签都拥有自己的window对象, 换句话来说,就是这些一个个标签不会共享同一个window对象.

即标签页是独立的,也就是每个窗口是独立的. 不过虽然这些标签页独立,不共享window对象,但这并不代表就没有一些办法使某个标签页的某些功能作用域整个窗口(作用域所有标签/整个浏览器的窗口)

譬如:window.resizeTo属性和window.resizeBy属性之类的属性/方法将会作用域所有标签页,即整个窗口/浏览器,而不是只会作用域当前window对象所属的那个标签页中.

通常而言,如果一样东西无法恰当的作用域于某个标签,则它将会作用于整个窗口.

#### 定义

Window接口是浏览器的窗口or浏览器中某个标签的窗口.

Window接口是脚本语言和DOM文档的窗口之间的桥梁,它将自身(窗口)暴露给脚本语言(因为Window接口是API,其作用就是让别人调用的.).

通过实现Window接口的window对象,可以通过脚本语言(如JS)操作/访问DOM文档的窗口.

# DOM DOM树 HTML 更深的理解

DOM是浏览器自己的理解,HTML是人类的理解,浏览器需要把HTML转换成DOM才能将之渲染出去,浏览器为了保证渲染结果和HTML的层次结构是一样的,所以有理解了一层:DOM树,将HTML转换成DOM树,然后再进行渲染.

浏览器自己的理解DOM,是具有属性和方法的,因为它把HTML的标签甚至是文本,全部看作是一个对象; 而HTML是不具有属性和方法的,它就是一个单纯的HTML罢了.

而正是因为浏览器将HTML理解成DOM和DOM树,所以我们才能使用编程的方式(JS)添加HTML的标签,在浏览器的理解中,是添加对象(节点对象),

然后浏览器会根据你把这个对象添加到哪个位置,从而更新自己的DOM树,并将你添加的对象放入DOM树中,如:

```js
const header = document.createElement('header');
const h1 = document.createElement('h1');
h1.textContent = 'Hello world!';
header.appendChild(h1);
document.body.appendChild(header);
```

这段代码就是典型的为DOM树添加对象(节点)的例子,浏览器会将这段代码理解成DOM,然后将对象添加到DOM树之后, 才会将之渲染为HTML,即人类易读的格式.

这段代码对HTML来说,将会生成以下结构的的HTML：

```html
<body>
  <header>
    <h1>Hello world</h1>
  </header>
</body>
```

- 灵感来源于: [此处](https://developers.google.com/web/fundamentals/web-components/shadowdom)
