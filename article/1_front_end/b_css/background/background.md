# Background

## background-color

当为一个背景色设置透明度时，子元素透明度的计算会基于父元素，并且它们的颜色会进行混合：

```html
<style>
  .parent {
    height: 100px;
    width: 100px;
    background-color: rgba(81, 82, 85, 0.3);
  }

  .son {
    height: 100px;
    width: 100px;
    background-color: rgba(81, 82, 85, 0.3); 
  }
</style>

<!-- 根据颜色混合原理，最后这个样式相当于： -->
<style>
  .parent {
    height: 100px;
    width: 100px;
  }

  .son {
    height: 100px;
    width: 100px;
    /** 可能会有小数点的误差，比如：千分之一的误差等等，这是正常的。 */
    background-color: rgba(81, 82, 85, 0.51);
  }
</style>

<body>
  <div class="parent">
    <div class="son">test</div>
  </div>
</body>
```

- 注意：子元素最后得到的颜色将会和父元素的颜色混合，从而造成的效果：最后得到的颜色将会比 0.3 透明度的颜色更深。

通过 [mix-blend-mode ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode) 属性可以决定背景色如何混合。

Reference：《CSS 权威指南》

ChatGpt 给出的答案（对）：

> 根据颜色叠加的原理，如果子元素和父元素具有相同透明度的背景色，它们叠加后的透明度背景色可以通过以下公式计算得出：
> 
> 叠加后的红色通道 = 子元素红色通道 x 子元素透明度 + 父元素红色通道 x 父元素透明度 x (1 - 子元素透明度)
> 叠加后的绿色通道 = 子元素绿色通道 x 子元素透明度 + 父元素绿色通道 x 父元素透明度 x (1 - 子元素透明度)
> 叠加后的蓝色通道 = 子元素蓝色通道 x 子元素透明度 + 父元素蓝色通道 x 父元素透明度 x (1 - 子元素透明度)
> 叠加后的透明度 = 子元素透明度 + 父元素透明度 x (1 - 子元素透明度)
> 
> 应用于您提供的示例代码，将得到以下计算结果：
> 
> - 叠加后的背景色：rgba(81, 82, 85, 0.51)
> - son 元素的透明度：0.3
> - parent 元素的透明度：0.3
> 
> 因此，当 parent 元素和 son 元素具有相同透明度的背景色时，它们叠加后的背景色是 rgba(81, 82, 85, 0.51)。
