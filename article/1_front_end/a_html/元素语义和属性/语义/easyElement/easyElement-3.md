# 有关文本方向元素(bdi bdo)

## [bdi](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/bdi)(不确定文本书写方向时使用)

### 描述

存在开始和结束标签.

该元素是行内元素.

bdi元素是双向隔离元素,即告诉浏览器,让它使用双向算法将bdi元素指定的文本与周围的文本隔离,

bdi元素的作用是:网站可能动态的插入一些文本且不知道所插入文本的方向性时,才使用该元素.

bdi元素有点类似于bdo元素,但是请不要混淆它们,bdo元素是已经确定某个指定的文本的书写方向会改变时,才使用bdo元素.

### 使用说明

尽管同样的显示效果可以通过使用CSS规则 [`unicode-bidi`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unicode-bidi)：隔离span或者其他文本格式化元素，但语义信息只能通过bdi元素传递。

特别是，当浏览器允许忽略CSS样式时，在这种情况下，使用bdi仍然可以保证文本正确显示，而使用CSS样式来传递语义时就显得毫无用处。

### 属性

该元素除了全局属性之外,还具有以下属性:

#### dir

dir属性不继承父元素。

如果没有设置，默认值即为auto，以便浏览器根据元素内容决定元素内容的方向。

其属性值可以设置为:ltr,rtl等,但是通常不需要设置,因为一旦这样做了,则就确定了bdi元素中的文本的书写方向,那么和bdi元素的语义就背道而驰了,

所以如果需要设置dir属性,则应该使用bdo元素.

## [bdo](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/bdo)(确定文本书写方向时使用)

### 描述

​    存在开始和结束标签.

该元素是行内元素.

bdo元素是已经确定某个指定的文本的书写方向会改变时,才使用bdo元素,请不要和bdi元素混淆*(网站可能动态的插入一些文本且不知道所插入文本的方向性时,才使用bdi元素)*

### 属性

该元素除了全局属性之外,还具有以下属性:

#### dir

文本在元素内容中呈现的方向。

可能的值是:

- ltr:表示文本应该按从左到右的方向移动
- rtl:指示文本应该按从右到左的方向移动。

如若不需要设置该属性,则代表指定的文本的书写方向可能是不确定的,应该使用bdi元素,而不是bdo元素.

# Alog Element

## [dialog](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog)

### 描述

存在开始和结束标签.

dialog元素表示一个对话框或其他交互式组件，例如一个检查器或者窗口。

### 属性

该元素除了全局属性之外,还具有以下属性:

#### open

指示这个对话框是激活的和能互动的。当这个 open 特性没有被设置，对话框不应该显示给用户。

注意:但是 tabindex 特性不能被使用在dialog元素上。

### 使用说明

- form元素可在此对话框中使用，但form元素***(参见: "<form.md>)***需要指定属性method="dialog" 。

  当提交表单时，对话框的 [`returnValue`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDialogElement/returnValue) 属性(dialog元素的返回值)将会等于表单中使用的提交按钮的 value 。

-  [`::backdrop`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::backdrop) CSS 伪元素可用于更改背景元素样式，例如在对话框被打开激活时，调暗背景中不可访问的内容。

  仅当使用 [HTMLDialogElement.showModal()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDialogElement/showModal) 显示对话框时才会绘制 backdrop 背景。

  需要注意的是:并不是所有浏览器都支持showModal()方法,如Firefox76.0b8并不支持该方法.

### 示例

```html
<body>
    <!-- Simple pop-up dialog box containing a form -->
    <dialog id="favDialog">
        <form method="dialog">
            <p><label>Favorite animal:
                    <select>
                        <option></option>
                        <option>Brine shrimp</option>
                        <option>Red panda</option>
                        <option>Spider monkey</option>
                    </select>
                </label></p>
            <!-- <menu> -->
                <button value="cancel">Cancel</button>
                <button id="confirmBtn" value="default">Confirm</button>
            <!-- </menu> -->
        </form>
    </dialog>

    <menu>
        <button id="updateDetails">Update details</button>
    </menu>

    <output aria-live="polite"></output>
</body>
<script>
    (function () {
        var updateButton = document.getElementById('updateDetails');
        var favDialog = document.getElementById('favDialog');
        var outputBox = document.getElementsByTagName('output')[0];
        var selectEl = document.getElementsByTagName('select')[0];
        var confirmBtn = document.getElementById('confirmBtn');

        // “Update details” button opens the <dialog> modally
        updateButton.addEventListener('click', function onOpen() {
            if (typeof favDialog.showModal === "function") {
                favDialog.showModal();
            } else {
                alert("The dialog API is not supported by this browser");
            }
        });
        // "Favorite animal" input sets the value of the submit button
        selectEl.addEventListener('change', function onSelect(e) {
            confirmBtn.value = selectEl.value;
        });
        // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
        favDialog.addEventListener('close', function onClose() {
            outputBox.value = favDialog.returnValue + " button clicked - " + (new Date()).toString();
        });
    })();

</script>
```

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/dialog-chrome.png)

​														(chrome)

![](H:\All Note\Write Program Way\Language\JavaScript Note\Own Note\Difficult Concept\HTML\ElementSemanticANDAttribute\ElementSemantic\easyElement\picture/dialog-firefox.png)

​														(FireFox)



# 有关脚本元素(script noscript)

## [script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

### 描述

存在开始和结束标签.

我想各位都对此元素并不陌生,script用于嵌入或引用可执行脚本,若想使用JS,则必须使用该元素,除非是外部JS,

但是外部的JS需要用到html页面时,仍然需要使用script元素引用外部js.

### 属性

该元素除了具有全局属性外,还有以下属性:

#### src

这个属性定义引用外部脚本的URI，这可以用来代替直接在文档中嵌入脚本。指定了 src 属性的script元素标签内不应该再有嵌入的脚本。

#### 内联脚本无法使用的属性(没有src的script)

##### async [HTML5](https://developer.mozilla.org/zh-CN/docs/HTML/HTML5)

该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有**src**属性的脚本）。

关于浏览器支持请参见[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#浏览器兼容性)。另可参见文章[asm.js的异步脚本](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts)。

- 从脚本中创建的脚本默认为异步.

##### defer

这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。

如果缺少 src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。

对动态嵌入的脚本使用 async=false 来达到类似的效果。

#### type

该属性定义script元素包含或src引用的脚本语言。

属性的值为MIME类型; 支持的MIME类型包括:

- text/javascript(默认值)
- text/ecmascript
- application/javascript
- application/ecmascript。

**如果没有定义这个属性，脚本会被视作JavaScript。**

如果MIME类型不是JavaScript类型（上述支持的类型），则该元素所包含的内容会被当作数据块而不会被浏览器执行。

如果type属性为***module***，代码会被当作JavaScript模块 。请参见:
 [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/),或 ***参见:<Module.md>***

在Firefox中可以通过定义type=application/javascript;version=1.8来使用如let声明这类的JS高版本中的先进特性。 

但请注意这是个非标准功能，其他浏览器，特别是基于Chrome的浏览器可能会不支持。

#### crossorigin

那些没有通过标准[CORS](https://developer.mozilla.org/zh-CN/docs/HTTP_access_control)检查的正常`script` 元素传递最少的信息到 [`window.onerror`](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)。

可以使用本属性来使那些将静态资源放在另外一个域名的站点打印错误信息。参考 [CORS 设置属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes)了解对有效参数的更具描述性的解释。

```html
<script src="" crossorigin="anonymous"></script>
```

#### text

和 textContent 属性类似，本属性用于设置元素的文本内容。但和 textContent 不一样的是，本属性在节点插入到DOM之后，此属性被解析为可执行代码。

#### 更多属性参见:[MDN-script](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script#%E5%B1%9E%E6%80%A7)



## [noscript](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/noscript)

### 描述

存在开始和结束标签.

一些萌新可能并不知晓此元素,他们更认识script元素,但是noscript元素的作用也是毋庸置疑的:

如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在 noscript元素中定义脚本未被执行时的替代内容。

也就是说:若浏览器禁止/不支持script元素,则noscript元素里面的内容会被执行,这也就是说:script元素并不是所有浏览器都支持的.

需要注意的是:可能有人会想,浏览器不支持script元素,但是却会执行noscript元素,我只需要将js代码放入noscript元素不就行了吗?

是个好主意!可惜,浏览器实际上是禁止使用脚本,script元素被禁止只是附带的,也就是说浏览器不允许计算机语言的嵌入,所以这个想法是错误的.

任何浏览器都支持该元素.

### 属性

该元素只具有全局属性.

### 示例

```html
<noscript>
  <!-- anchor linking to external file -->
  <a href="http://www.whyhw.com/">External Link</a>
</noscript>
<p>Rocks!</p>
```

若浏览器允许脚本执行,则页面会显示:

- Rocks!

若浏览器不允许脚本执行,则页面会显示:

- <a href="http://www.whyhw.com/">External Link</a>

  Rocks!

# map和area元素

## [map](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/map)

### 描述

存在开始和结束标签.

map元素通常和area元素一起使用来定义一个图像映射(一个可点击的链接区域),***参见: [W3C](https://www.w3school.com.cn/tiy/t.asp?f=html_areamap)***

### 属性

该元素除了具有全局属性外,还有以下属性:

#### name

name属性 给map一个名字用来查询，这个属性是必须的，值必须不能为空并且不能带空格。

name属性不准与同文档中其他map元素的值相同，如果map属性的id属性也被添加，则name属性和id属性的值必须相同。

## [area](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/area)

### 描述

只存在开始标签.

area元素 在图片上定义一个热点区域，可以关联一个超链接。

**area元素仅在map元素内部使用。**

### 属性

该元素除了具有全局属性外,还有以下属性:

#### **`shape`**

相关联的热点的形状。

HTML 5和HTML 4的规范定义了:

- rect，它定义了一个矩形区域;
- 圆圈，它定义了一个圆形区域;
- 多边形，它定义了一个多边形;
- 默认情况下，这表示整个区域超出了任何定义的形状。

许多浏览器，特别是Internet Explorer 4和更高版本，支持弧形、多边形和矩形作为形状的有效值;这些值{ { Non-standard_inline } }(非标准的).

#### 更多属性,参见:[MDN-area](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/area#%E5%B1%9E%E6%80%A7)



