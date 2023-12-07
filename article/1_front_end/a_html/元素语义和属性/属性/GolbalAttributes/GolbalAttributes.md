# [GolbalAttributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

## 描述

GolbalAttributes:全局属性

全局属性存在两种

1. HTML所有元素共有的全局属性
2. 真-全局属性(除HTML全局属性之外的全局属性)

## HTML所有元素共有的全局属性

### 描述

指的是HTML元素共有的属性,它们可以用任何元素中,即使有些全局属性无法对某些元素起作用,但是这并不影响全局属性应用于该元素上面.

## HTML全局属性之外的全局属性

除了基本的HTML全局属性之外，还存在以下全局属性:

- 即直接有关HTML元素的全局属性之外的属性(HTML元素也可以使用)

### xml:lang 和 xml:base 

两者都是从XHTML规范继承，但为了兼容性而被保留的。

### 多重[aria-*](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA)属性 

- 其他博主的解释 : [掘金](https://juejin.im/entry/59edc54a5188255d910ca4f4)

#### reference

- [可访问的Web应用程序和小部件概述](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/An_overview_of_accessible_web_applications_and_widgets)
- [ARIA](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA)
- [什么是ARIA](https://dev.opera.com/articles/introduction-to-wai-aria/)

#### 描述

用于改善可访问性。即:用来描述HTML元素标签的语义. 

主要是通过一些属性进行标签的语义化.***详见:用法***

- 由于HTML5其实已经提供了强大的语义标签,所以请优先选择HTML5中的语义标签.使用ARIA属性作为点缀即可.

- 有关其属性可以查看:[MDN](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Roles/Cell_Role) 

  ​	注意:属性都是规范给的,无法自定义,但是值可以自定义,不过值规范中也有给出一些[经典示范](https://dev.opera.com/articles/introduction-to-wai-aria/)

使用ARIA的第一条规则是: 

​	如果您可以使用具有内置要求的语义和行为的本机功能，而不是重新使用元素并**添加** ARIA角色，状态或属性以使其可访问，则可以这样做.

​	请尽可能使用HTML 元素代替ARIA属性描述.

#### 用法

```html
<div>
  <!--请注意:添加了role和aria-xxx属性 -->
	<div 
       id="ch1Panel" role="tabpanel"
       aria-labelledby="ch1Tab">1
	</div>
    
	<div id="ch2Panel" role="tabpanel" 
       aria-labelledby="ch2Tab">2
	</div>
    
	<div id="quizPanel" role="tabpanel" 
       aria-labelledby="quizTab">demo
	</div>
</div>
```



### [事件处理程序](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Event_handlers) 属性

参见:[全局属性-MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)

