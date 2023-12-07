

# MathML

有关MathML的元素可能会因为浏览器不同导致兼容性的不同,如基于Blink内核的chrome无法正确显示有关MathML的元素,

而基于Gecko内核的Firefox却可以正确的显示.





- [Wiki--MathML](https://zh.wikipedia.org/wiki/%E6%95%B0%E5%AD%A6%E7%BD%AE%E6%A0%87%E8%AF%AD%E8%A8%80)
- [菜鸟教程--MathML](https://www.runoob.com/html/html5-mathml.html)
- [What is MathML?](https://www.w3.org/Math/whatIsMathML.html)
- [MDN--MathML](https://developer.mozilla.org/zh-CN/docs/Web/MathML)(请查看左边的相关主题)

- [MDN--<math>](https://developer.mozilla.org/zh-CN/docs/Web/MathML/Element/math)(请查看左边的相关主题)



除了MathML的元素之外,其余有关math的元素

- sup

## sup

### 描述

存在开始和结束标签.

sup元素全称为:superscripted,上标.

sup元素会让指定的文本变得更小且上移,即出现一个上标.



### 属性

sup元素只具有[全局属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes)

### 使用说明

- sup元素应该只用其排本和其语义目的(上标),因为sup指定的文本会改变自身含义.
- 如果sup指定的文本是一个使用在数学或法语缩写中(如2^x, 
  M<sup>lle</sup>等),则应该考虑使用MathML公式.
- sup元素不能只用于样式上的目的,比如产品名称的样式,时应该使用 [CSS](https://developer.mozilla.org/en-US/docs/CSS)样式： [vertical-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align) 属性的 super 值能实现相同效果。

### 示例

```html
    <span>
        This text is <sup>superscripted</sup>
    </span>
```

显示效果为:<span> This text is <sup>superscripted</sup></span>

## [sub](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/sub)

### 描述

存在开始和结束标签.

sub元素的全称为:subscript,即下标.

sub元素定义了一个文本区域，出于排版的原因，与主要的文本相比，应该展示得更低并且更小,即下标.

### 属性

sub元素只存在全局属性.

### 使用说明

和sup元素一样

- sub元素应该只用其排本和其语义目的(下标),因为sub指定的文本会改变自身含义.

- 如果sub指定的文本是一个使用在数学中的文本,则应该考虑使用MathML公式(如: log<sub>2</sub>)

- sub元素不能只用于样式上的目的,比如产品名称的样式,时应该使用 [CSS](https://developer.mozilla.org/en-US/docs/CSS)样式： [vertical-align](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align) 属性的 sub 值能实现相同效果。

- 且要注意，sup和sub元素无法使用在同一个元素,你应该使用 [MathML](https://developer.mozilla.org/en-US/docs/MathML) 来同时产生下标和上标，代表它的上标和下标.

  如: 化学符号旁边的下标和上标，代表它的序号和核子数。

### 示例

```html
<p>水的化学符号为: H<sub>2</sub>O </p>
```

上面示例显示结果为: 水的化学符号为: H<sub>2</sub>O





