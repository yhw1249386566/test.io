# [label](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/label)

## 描述

存在开始和结束标签.

label元素通常用来表示某个元素的说明.即我们可以将label元素和其他元素关联起来,如:input元素.

在使用label元素时,请根据它的<strong>功能性</strong>使用,而不是单纯的为了使用它而使用,因为label元素并没有什么特殊的样式,它也只是一个行内元素. <i>如果只是想将文本放入一个行内元素中,请使用span 或 p元素.</i>

## label元素的功能性(作用)

label元素的主要功能: 是可以将它自己和某个其他元素相关联,可以形成视觉和编程(源码)上的关联.

通常来说,我们将label元素和input元素进行联动(关联),且一个input元素可以和多个label元素关联.

## label元素和input元素关联的好处(为什么要关联)

如果我们将一个label标签和input标签相关联,我们可以得到以下几点好处:

1. label标签显示的文本将会和input元素在视觉上(可能是一个按钮,或者一个text,或是复选框等)相关联,且同时这两个元素也会在编程上相关联.

   这意味着: 当用户点击到input元素时,屏幕阅读器可以读出标签,使在使用辅助技术的用户更容易理解应输入哪些数据.

2. 当我们单击label或input元素时,相关联的元素将被自动的激活,如:单击label元素,则input元素会被激活; 单击input元素,则label元素会被激活.

   这种增加的命中区域为激活 input 提供了方便，包括那些使用触摸屏设备的。

   且我们还可以以这种功能实现一些有趣的效果,如:单击input元素,label元素内容变红,或者反过来也是如此.

## 如何将label元素和input元素关联

### 第一种方法

将input元素写在label元素开始和结束标签之间.

用此方法之后,我们就不需要写label元素的for属性了,因为这种关联性是隐含的

### 第二种方法

为input元素设置id属性值,接着在label元素中使用for属性,将input元素的id值作为for属性的值.

顾名思义for,就是关于(for的一种中文翻译)的意思,即使用for关联指定的id值.即input属性的id.

使用此方法后,我们可以任意的在当前document中移动label或input元素,即使是这样,它们依然是关联的.

## label标签的使用事项

- 一个input元素可以和多个label标签关联,即input元素和label元素的关系是: 一对多。

  反过来则不行，因为 id 是唯一的，而 label 标签是由 for 属性关联 input 元素的 id 属性实现关联的，多个 input 元素的 id 属性，怎么能相同呢。

- label标签本身并不直接和form元素关联,而是和form元素相关联的元素关联,如:input元素.

- 当点击或者触碰label标签时,该label标签相关联的控件(如input)也会被如同被点击或者触碰了一样. 如:点击label标签,触发click事件,那么相关联的控件(如input)也会触发click事件.

## label元素的属性

label元素除了包含全局属性之外,还有以下独特的属性:

*这说的独特并不是说其他元素一定不存在该属性,而是这些属性用在label中和其他元素中是有区别的.*

### for

前文我们已经提到了for属性(*如何将label元素和input元素关联)*,我相信你们也大概了解了它的作用,不过我还是要例行公事的讲一遍.

for属性能够标记和form元素相关的属性(如input)的id.

让当前的label元素的 for 属性指定的 id 的元素能够相互影响.

注意:A \<label> element can have both a for attribute and a contained control element, as long as the for attribute points to the contained control element.

翻译为:一个\<label>元素可以有一个for属性和一个包含的控件元素，只要for属性指向包含的控件元素。

可是以下的意思,因为这句话的意思我也有点看不懂,但是不要紧,不妨碍我们使用for属性.

```html
<label for='input'> 
	<input id='input' type='text'>
</label>
```

### form 属性

 表示和label元素关联的form元素,即label元素属于哪个form元素,因为label本身就是必须和form元素有关的元素 相关联.

此属性值必须是同一文档中form元素的ID。

如果未指定此属性值，label元素必须是form元素的后代。

但是如果指定了此属性值且该值为form的id，则你可以将label元素放置在文档的任何位置，而不仅仅是作为form元素的后代。 

----

PS:如果只是单纯的将label元素和表单(form)相关的元素 相关联,而表单并不存在,是可以这么做的,但是意义不大（因为 \<input> 元素不和 \<form> 元素关联，其用处近乎没有）,如:

```html
<input type="radio" id="input" name="yomua">
<label for="input" >label</label>
```

以上示例并不存在form元素,只是仅仅为了将label和input相关联,达到单击选中input/label时可以影响另一个元素的效果.

虽然我们可以利用这种做法做出以下效果: 

- 多个复选框被选中,则相应的label值也被选中;

-  一组单选框中选择一个单选框,则对应的label值也被选中;

- 用多个label标签作为跳转面板的按钮(如手机qq点击下面的按钮,就换一个面板一样),并将之和一组单选框关联,然后将单选框隐藏,并写注册监听事件等.

  最后就可以达到一个效果: 单击label就换一个面板.

- ....

- PS：做到以上效果有更好的选择，如：vue 框架的路由系统 或使用 “CSS预设”（参见：***别人的组件示例 文件夹* 或 <元素使用技巧.md>**）

虽然以上的效果看上去不错,但是意义不大,因为前二者效果我们选中了label值,那此值该送往何处?

后一个效果看上去很赞,实现了单击某个文本就跳转一个面板. 可是我们可以用更好更快的实现:vue自带的监听功能,或者通过原生JS,css去实现它.

----

所以如果要使用label元素关联一个表单相关的元素时,这里的form属性必须指向同一个文档的form元素的id,或者**label元素是** 当前关联的 表单相关元素所属的 **form元素的后代.（label 元素是 input 元素所属的 form 元素的后代）**

## 可访问性问题

### 相互影响的内容

不要在`label`元素内部放置会相互影响的元素，比如[anchors](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)(a标签)，或者[buttons](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button)。这样做会让用户更难激活/触发与label相关联的表单元素input.

<!-- Bad -->

```html
<label for="tac">
  <input id="tac" type="checkbox" name="demo">
    我同意这些条款和条件
	<a href="demo.html">测试使用</a>
</label>
```

<!-- Good -->

```html
<label for="tac">
	<input id="tac" type="checkbox" name="demo">
	我同意这些条款和条件
</label>

<p>
	<a href="terms-and-conditions.html">测试使用</a>
</p>
```

注：将 inplut 元素写在 label 元素中，那么它们将自动关联，而不需要使用 label 的 for 属性。