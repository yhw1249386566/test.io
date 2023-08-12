# 技巧

## 预设的 CSS 选择器

如: 我们可以为某个元素预设CSS样式,即: 我们可以使用CSS的选择器给选择某个元素A,并为它设定样式,当元素A匹配我们设定的CSS选择器时,我们设定的该元素匹配的选择器中的样式就会生效.

这样,就会产生和用户互动.

例子:

```html
<style>
    div.showing {
        opacity: 1.0;
    }

    div.hidden {
        opacity: 0;
    }
</style>

<div>Yomua</div>
<button id="show">show</button>
<button id="hide">hide</button>

<script>
    const div = document.querySelector('div');
    const show = document.querySelector('#show');
    const hide = document.querySelector('#hide');

    show.onclick = function () {
        div.setAttribute('class', 'showing');
    }

    hide.onclick = function () {
        div.setAttribute('class', 'hidden');
    }
</script>
```

我们为div设定了两个预设CSS属性,即:当div元素的class属性为showing或hidden时会匹配不同的CSS选择器,从而为div在不同的情况下设定不同的样式.

以此衍生,我们可以为所有HTML元素这么做,这样**即使不使用代码为HTML元素设定样式,也能通过预设的CSS样式设定html元素未来可能用到的样式.**