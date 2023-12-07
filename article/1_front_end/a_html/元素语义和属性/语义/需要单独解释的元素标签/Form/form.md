# Form对象

## 描述

一个Form对象则代表一个HTML中的\<form>表单,且form元素***(详见:form元素)***每出现一次,则每一次都会创建一个form对象.

HTML DOM 的每一个节点在 JavaScript 中，都为一个对象，参见：<h5_css_js.doc> 和 

## 用法

### 创建Form对象

```html
<form class='form',id="form-id"></form>
<script>
	console.log(document.querySelector('.form'))
    /** 
    	<form class="form"></form>
    */
</script>
```

通过以上输出结果,我们显然可以知道,form元素会返回自身,但是我们为什么说form元素出现就会创建对象呢? 

这是因为每一个元素对于HTML DOM树来说,都是节点对象,即使是"文本"也不例外.而form元素标签被HTML DOM树转为节点对象后,存在一些方法/属性供我们使用,如:Form.submit(), Form.id等.

`document.querySelector('.form').id ` =>输出结果为: form-id.

***详见:Form对象 - 属性和方法***

## [属性和方法](https://www.w3school.com.cn/jsref/dom_obj_form.asp)

### 描述

需要注意的是: 这些属性通常也能直接写在HTML的form表单元素中.

且以下的id,enctype,method,name,target,className,dir,lang,title属性都是和action属性类似的用法,都是类似的获取/设置/改变其对应的属性的值的.

​	***详见:属性-action - 用法***

​	所以除了action属性之外,其他属性的用法我只简单介绍.

### 属性

#### [action](https://www.w3school.com.cn/jsref/prop_form_action.asp)

##### 描述

Form节点对象的action属性定义了当表单被提交时,被提交的数据要送往哪里去,通常是一个url.

我们既可以通过该属性获取form元素的action属性值,也可以用其设置属性值.

##### 语法

`Form.action = url`

- PS: 还有个方法也可以设置action属性,与其说这个方法可以设置form的action属性,不如说这个这个方法几乎可以设置任意元素的属性和值

  =>`element.setAttribute(propertyName,value)`

  但是我们这里现在只讲的是form节点对象本身有的属性/方法


##### 用法

###### 获取action属性

```html
<body>
    <form action="/test" id="formID1"></form>
    <form action="www.whyhw.com" id="formID2"></form>
    <form action="http://www.whyhw.com" id="formID2"></form>
</body>
<script>
console.log(document.getElementById('formID1').action)
console.log(document.getElementById('formID2').action)
console.log(document.getElementById('formID3').action)
/** 
file:///H:/test
    	
file:///H:/ProgramWay/ProgramWorkplace/Software/VSCode/N
ote/CSS_HTML/%E8%A1%A8%E5%8D%95/www.whyhw.com

http://www.whyhw.com/

/*
    	
</script>
```

通过以上结果,我们显然可以发现: 在你没有指定一些其他协议之前(如https://,http://等),则action属性都默认的是file://协议,即从你本地文件中去加载你指定的url.

只有当你设置了如http协议之后,action属性才会返回的是一个正确的网址,而不是本地文件路径.

###### 设置action属性

```html
<body>
    <form action="/test" id="formID1"></form>
</body>
<script>
    let form = document.getElementById('formID1')
    console.log(`未改变action之前:${form.action}`)
    form.action = 'http://www.whyhw.com';
    console.log(`改变action之后:${form.action}`)
/** 
未改变action之前:file:///H:/test
改变action之后:http://www.whyhw.com/
*/
</script>
```

通过此示例,我们也能发现,通过form.action属性不仅可以获取form表单元素的action属性值,还能改变/设置其值.

- 以下的id,enctype,method,name,target,className,dir,lang,title属性都是和action属性类似,都是这样获取/设置/改变其对应的属性的值的.

#### [id](https://www.w3school.com.cn/jsref/prop_form_id.asp)

可用来获取form元素的id的值,用法如同action属性.

```html
<body>
    <form action="/test" id="formID1"></form>
</body>
<script>
    let fomrID = document.getElementById('formID1');
    console.log(fomrID.id); // formID1
    fomrID.id = 'yomua'
    console.log(fomrID.id); // yomua
</script>
```

#### [method](https://www.w3school.com.cn/jsref/prop_form_method.asp)

##### 描述

如你所想,method属性是用来设置/返回用于表单提交的HTTP的方法,如同fetch(url,**{method:'get'}**)一样的效果***(参见:<Fetch.md>)***

- 如果你想知道get和post有什么区别,**请参见:**
  ***<AJAX.md - AJAX示例 - AJAX请求所需了解的方法 - XMLHttpRequest.open() - 使用GET还是POST >***

且当该属性未指定时,其默认值为get.

注意: 该属性还存在第三个值: dialog,即当表单位于[dialog](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog)元素中时使用,以在提交时关闭对话框。

##### 语法

`Form.method=get|post`

##### 用法

###### method的默认值为get

```html
<body>
    <form action="www.whyhw.com"></form>
</body>
<script>
    let form = document.getElementsByTagName('form')[0]
    console.log(form.method); // get
</script>
```



##### get和post两种不同的方法提交的数据格式不同

- **要想了解get和post之间的其他关系,请参见**:***<get和post.md>***

###### get

浏览器使用的http-get请求,它会把Form表单中的数据附加在原有的url之后(action属性的值).

且以`?`将Form表单中的数据和url分割,且表单中的数据除了数字和字母以外,空格会被转为`+`(加号),而其他符合则会被转为%xx,而这种转译需要依靠一种编码,即:Percent-encoding,即:[WIKI-URL编码](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%88%86%E5%8F%B7%E7%BC%96%E7%A0%81).

经过这种方式编码后,会得出如：%E4%BD%A0%E5%A5%BD,其中％XX中的XX为该符号以16进制表示的ASCII值（这是因为出现了中文）.

同时,Form表单元素中的数据,以key=value的形式出现,若存在多个数据,则每个key=value之间用 `&`进行连接.

PS:有意思的是,如果用户不将url从浏览器的搜索框移动到其他地方,仍然是能发现自己搜索的中文文本,而不是被转化后的%ASCII(16) / ISOLatin-1

​	请思考以下例子.

---

这是一个标准的使用get的url:`https://www.google.com/search?q=%E6%B5%8B%E8%AF%95+%E5%A4%A9%E6%89%8D&oq=%E6%B5%8B%E8%AF%95+%E5%A4%A9%E6%89%8D&aqs=chrome..69i57.3122j0j9&sourceid=chrome&ie=UTF-8	`

透过这串url string,我们很清楚的能发现,`?`, `key=value`,`&`,( `%E6%B5%..`,`+` )的出现,所以我们不难看出,这是一个Form标签使用了get请求.

但是如果我们不将之移动到其他地方,其地址有什么改变吗?

![](picture/get-看上去带有中文的url.png)

通过这张图片,显然: 在没有将url移动到其他地方时,浏览器中的url会进行一种"视觉欺骗",即中文看上去并没有被转换.

​	其原理为:浏览器地址栏里的中文只是想让用户体验好些而已. 因为url在发送请求过程中,浏览器会把中文用字符编码+Percent Encode翻译为真正的url,再发给服务器.

​	并且搜索引擎内部也是通过被转换后的中文进行搜索,而不是转换之前的.

###### post

若在form表单中使用了post,则表单中的数据将会被放置在HTTP的请求体中.

​	*(即实体主体中:\<entity-body>; 注意:这并不是说放在html的body标签中,而是这只是一种格式,**参见:<HTTP请求行-请求头-请求体.md>***),

然后这些放置在请求体中的数据将会和请求头,请求行中其他的内容一起传送给action属性指定的url(通常这是一个处理程序),

最后这些在请求体中的表单数据会通过[stdin:全称为standard input](https://zh.wikipedia.org/wiki/%E6%A8%99%E6%BA%96%E4%B8%B2%E6%B5%81#%E6%A8%99%E6%BA%96%E8%BC%B8%E5%85%A5_(stdin))方式,将表单的数据读取并加以处理

​	*前提是该url指向的程序能处理这些数据,否则是无用功,比如:*

​	*这个action属性的值:url只是一个单纯的网址:http://www.whyhw.com ,这样单击submit按钮,只会跳转到这个网址,这实际上并没有用处,我们为什么不用a标签呢?*

以下是post方法在http协议中的最基本样子(无关的请求头都被省略了.以下示例来自于:[CSDN](https://blog.csdn.net/weixin_30263277/article/details/98229084))

```js
// 请求方法 指定的url 协议版本 <method><request-URL><version>
POST http://www.example.com HTTP/1.1

// 请求头,格式为key:value (有很多个) <headers>
Content-Type: application/x-www-form-urlencoded; 
charset= utf-8
 
// 表单中的数据 <entity-body>
title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3 
```

post请求的enctype属性默认值为application/x-www-form-urlencoded,url指向的程序/服务器会以这串编码对表单数据进行编码.(当然了,我们可以选择修改默认值,只要是能被解析的即可,否则没有意义)

#### [enctype](https://www.w3school.com.cn/jsref/prop_form_enctype.asp)

##### 描述

enctype 属性可设置或返回用于编码表单内容的 MIME 类型.

其中,可以取三种MIME类型:

1. application/x-www-form-urlencoded
2. multipart/form-data
3. text/plain

如果设置的属性不为这三者之一,则JS引擎则将之默认设置为:application/x-www-form-urlencoded,且该值也是form表单元素的enctype的默认值.

##### 用法

```html
<body>
    <form action="/test" id="formID1" class="form" enctype="text/plain">
    </form>
</body>
<script>
    let fomrID = document.getElementById('formID1');
    // text/plain
    console.log(fomrID.enctype)
    
    fomrID.enctype = 'multipart/form-data';
    // multipart/form-data
    console.log(fomrID.enctype)
    
    fomrID.enctype = 'yomua'
    // application/x-www-form-urlencoded
    console.log(fomrID.enctype)
</script>
```

- ***fomrID.enctype = 'yomua'***

  ​	由于该属性值并不合法,所以JS引擎将自动帮我们设置为:

  application/x-www-form-urlencoded

#### [length](https://www.w3school.com.cn/jsref/prop_form_length.asp)

##### 描述

该属性只能读取,不能设置,因为它获取的是form表单元素中input元素的个数.

##### 用法

```html
<body>
    <form action="/test" id="formID1" class="form">
        <input type="submit">
        <input type="search">
        <input type="date">
    </form>
</body>
<script>
    let fomrID = document.getElementById('formID1');
    console.log(fomrID.length); // 3
</script>
```

#### [name](https://www.w3school.com.cn/jsref/prop_form_name.asp)

##### 描述

form表单元素中的name标签规定了表单的名称,且该属性又为脚本提供了一种引用表单的方法.

​	即:name属性用于在 JavaScript 中引用元素或者在表单提交之后引用表单数据,同时的也为提供到指定url的数据进行了标识*(注意:XHTML中name属性被废弃,使用id代替)*

- name属性用来标识数据(XHMTL中已被id属性取代)
- JS通过name属性可引用其表单数据.

**注意:exclamation:**:只有设置了name属性的表单元素,才能在提交表单时传递其表单数据值.

##### name属性和id属性的区别

- name和id属性都可以说是标识符.
- name可重复(名字),id(身份证)不能重复
- 都可以在JS中被引用.
- 经常用于单选框,复选框,或表单提交等(在html中: 因为不设置name属性,无法提交表单中的数据到url中)

##### 语法

`form.name=formName`

##### 用法

由于设置/获取其form表单元素的name属性是非常容易的一件事,所以我们这里主要写一下其他用法:

```html
<form action="https://google.com/search" id="google-api">
    <input name="q" type="search" method='get' 
           value="输出值再回车,即可使用google搜索" />
</form>
```

- 输出值再回车，（这个逗号将被 Precent Encoding 转成 `%16为序列的 Ascii` 的形式。

当我们在页面中出现的输入框输入你想要搜索的数据并按回车后,它将引用Google搜索帮你寻找你所需要的数据(如果你可以使用魔法的话).

这里的name应该是被js引用了,当按回车并跳转到的Google网址为: https://www.google.com/search?q=这是你搜索的数据

​	很明显,我们可以发现,这里的?q中的q就是name属性的值,即这里面的JS中肯的其中有判断,即:若name属性=q,则使用?q=xxx的形式调用API,将xxx给搜索引擎去访问并搜索.

#### [target](https://www.w3school.com.cn/jsref/prop_form_target.asp)

##### 描述

正如你们所预料的那样,form表单中的target属性和a元素标签中的target属性是一样的,其取值可取以下4种类型:

1. _blank - 在一个新的未命名的窗口载入文档(打开新标签)
2. _self - 在相同的框架或窗口中载入目标文档(不打开新标签)
3. _parent - 把文档载入父窗口或包含了超链接引用的框架的框架集
4. _top - 把文档载入包含该超链接的窗口,取代任何当前正在窗口中显示的框架

由于太过简单,这里将不再赘述.

#### [acceptCharset](https://www.w3school.com.cn/jsref/prop_form_acceptcharset.asp)

##### 描述

accept-charset 属性规定服务器处理表单数据所接受的字符集.

accept-charset 属性允许您指定一系列字符集,服务器必须支持这些字符集,从而得以正确解释表单中的数据.

该属性的值是用引号包含字符集名称列表.如果可接受的字符集与用户所使用的字符即不相匹配的话,浏览器可以选择忽略表单或是将该表单区别对待.

此属性的默认值是 "unknown",表示表单的字符集与包含表单的文档的字符集相同.

在理论上,可以使用任何字符集,但并不是所有浏览器都能够理解它们.某种字符集使用的范围越广,浏览器就越有可能理解它.

如需查看所有可用的字符集,请访问: [字符集参考手册](https://www.w3school.com.cn/tags/html_ref_charactersets.asp).

**提示：**请避免使用该属性.应该在服务器端验证文件上传.

- 除了 Internet Explorer,accept-charset 属性得到几乎所有浏览器的支持.

  **注释：**accept-charset 属性无法在 Internet Explorer 中正确地工作.如果 accept-charset 属性设置为 "ISO-8859-1",IE 将发送以 "Windows-1252" 编码的数据.

##### 用法

```html
<body>
    <form id='form' action="#" method="get" 
          accept-charset="utf-8">
    </form>
</body>
<script>
    let form =document.getElementById('form');
    console.log(form.acceptCharset);// utf-8
</script>
```

### 标准(全局)属性

#### [className](https://www.w3school.com.cn/jsref/prop_classname.asp)

##### 描述

顾名思义,用来设置/返回(获取)form表单元素标签的class属性.

除了使用form.className属性之外设置/获取class属性,还有一种通用方式,即:

- doucment.getElementBtId('myid').className

##### 语法

`htmlObjcet.className = xxx`

#### [title](https://www.w3school.com.cn/jsref/prop_title.asp)

设置或返回元素的 title 属性.

语法: `htmlObjcet.title = xxx`

#### [dir](https://www.w3school.com.cn/jsref/prop_dir.asp)

 设置或返回文本的方向,其取值有三种:

1. auto => 由User Agent自己看着办
2. ltr =>left to right,从左→右书写
3. rtl =>right to left,从右→左书写.

注意:如果不设置dir属性,则其默认为空,方向由字体本身定义.

语法为: `htmlObjcet.dir = auto | ltr | trl`  

或可以直接获取其dir属性. let dir =   form.dir

#### [lang](https://www.w3school.com.cn/jsref/prop_lang.asp)

设置或返回元素的语言代码.

需要注意的是,lang属性本身不限制你取值,即可以设置任何值,但是规范之外的取值本身没有任何意义,而且可能会expect result.

`htmlObjcet.lang=xxx`

### 方法

#### [submit()](https://www.w3school.com.cn/jsref/met_form_submit.asp)

##### 描述

它是form表单元素标签(子节点对象)的方法,其作用为:**将表单中的数据提交到你指定的action属性的值.**

- 需要注意的是,在form元素中,若只存在一个input标签,则默认情况下,有没有submit(),或者关于提交表单数据的按钮,我们都能通过回车键进行提交数据.

  ​	即:**form中只有一个input按回车键表单会自动提交,多个input则不会,这是form表单元素的一个特性.**

  原因之一:form表单元素的一个特性.

  原因之二(个人猜测):因为只有一个input标签,则代表没有其他input中的数据需要提交到按action属性值中,所以干脆就设置了这样的特性,以图方便.

当<input type="submit" / >被点击时,就会默认触发该方法,即触发submit(),

而type="submit"按钮的input标签默认不会触发该方法(会触发你设置了事件关联,如:onclick事件)

##### 语法

`formObj.submit()`



#### [reset()](https://www.w3school.com.cn/jsref/met_form_reset.asp)



# form元素

## 描述

form元素标签是一个包含表单元素的区域,form元素本身是不可见的(即使visibility:true也是如此,它是隐式的),

但是可以通过其他标签的协助,如:input,textarea,checkboxes等等,那么form标签就能发挥出非常大的作用. 

通过这些标签,form表单元素可以允许用户在这些标签中输入/选择内容,并可将这些数据提取,然后通过form子节点对象本身的action属性指定其url,

就可以让这些被提取的数据提交到url中,由url进行处理(url所在的文件通常是用来处理数据,不过我们也可以指定不处理数据的url.)

## 属性和方法

- 详见: ***Form对象 - 属性和方法*** ,它们二者是等同的,因为其实它们相当于是一个东西:即子节点对象(对于HTML DOM树来说)


