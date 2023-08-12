# [Content Categories](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories)

## 名称

Content Categories中文翻译为:内容分类

## 描述

每一个HTML元素都必须遵循定义了它可以包含哪一类内容的规则. 这些规则被归类为几个常见的元素内容模型(content model).

​	也就是说,每个HTML元素,都必须遵循一系列规则,这些规则定义了该元素应该包含什么类型的内容.

每个HTML元素都存在于0个、1 个或多个内容模型,每个模型都有一些规则使得元素所包含的内容必须遵循一个HTML规范文档( HTML-conformant document).

​	即:在这些内容模型中的各个HTML元素,必须遵循相对应的规则,如果一个HTML元素处于多个模型中,则它遵守的规则是根据上下文而定的,***可以参考: 流式元素 - 某种情况下才会属于此类的少数其他元素.***

而内容分类基本分为以下三种:

1. 主内容类,描述了很多元素共享的内容规范；
2. 表单相关的内容类,描述了表单相关元素共有的内容规范；
3. 特殊内容类,描述了仅仅在某些特殊元素上才需要遵守的内容规范,通常这些元素都有特殊的上下文关系.

## Main Content Categories

### 描述

由于主内容类是内容分类的关键,我不知道为什么MDN上并没有将其他两类,而是都在讲主内容类.

想要尝试搜索,但是搜索到的内容又不够友好,所以在这里,我也先不写有关其他两类的讲解.

### 元数据内容(Metadata content)

#### 什么是元数据?

在了解元数据内容之前,我们必须先明白一个概念,什么是[元数据](https://zh.wikipedia.org/wiki/%E5%85%83%E6%95%B0%E6%8D%AE).

​	维基百科告诉我们:元数据用来描述其他数据信息的数据.元数据存在三种不同的种类,分别为:

1. **记叙性元数据**

   ​	描述用于发现和辨别意义的资源.它可以包括如:标题,摘要,作者和某关键字等元素.

2. **结构性元数据**

   ​	有关于数据容器的元数据,指示如何整理其中复合的对象,如:页面以什么排序方式组成章节.

3. **管理性元数据**

   ​	用来管理资源的信息,如:数据产生的时间和方式,或文件种类和其他技术信息等,以及谁有权限访问它.

   ​	某些国家:电话,网页,IP链接等这些元数据由国家来存储.

#### HTML包含的元数据标签

对于HTML来说,属于元数据内容这一类的元素,用来修改文档其余部分的陈述或者行为,建立与其他文档的链接,或者传达其他外带信息.

HTML中的元数据标签主要用来作为:记叙性元数据,不过其他两类也可以用到.以下可***参见:<InitElement.md>***

- base
- link
- meta 
- noscript
- script 
- style
- title

### 流式元素(Flow content)

此类元素通常包含文本或植入的内容.

### 章节元素(Sectioning content)

隶属于分节内容模型的元素,在当前的大纲中创建一个[分节](https://developer.mozilla.org/en-US/docs/Sections_and_Outlines_of_an_HTML5_document),此分节将定义[header](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)元素、[footer](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/footer)元素和标题元素([heading content](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/Content_categories#Heading_content))的范围.

属于此类的元素有:[article](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/article),[aside](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/aside),[nav](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/nav),[section](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/section)

:warning:注意:不要将本内容模型与[sectioning root](https://developer.mozilla.org/en-US/docs/Sections_and_Outlines_of_an_HTML5_document#sectioning_root) category 混淆,[sectioning root](https://developer.mozilla.org/en-US/docs/Sections_and_Outlines_of_an_HTML5_document#sectioning_root) category 的作用是把它的内容与常规的大纲隔离.

### 标题元素(Heading content)

标题内容 定义了分节的标题,而这个分节可能由一个明确的分节内容元素直接标记,也可能由标题本身隐式地定义.

属于此类的元素由: h1到h6以及[hgroup](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/hgroup)(即标题组)

:warning:注意:尽管[header](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/header)标签可能包含一些标题内容,但header并不是标题内容本身

### 短语元素(Phrasing content)

短语元素(Phrasing content)规定文本和它包含的标记.一些Phrasing content就构成了段落.

PS:一些其他的元素也属于这个分类,但是只有当如下特殊情况时才会实现:

### 嵌入元素(Embedded content)

Embedded content输入另一个资源或者将来自另一种标记语言或命名空间的内容插入到文档中.

### 交互元素(Interactive content)

交互式内容包含为用户交互而特别设计的元素. 

仅在特殊情形下才会属于此类的元素有:

## 表单相关内容(Form-associated content)

表单相关的内容 包含 拥有表单父节点(exposed by a **form** attribute)的元素,一个表单父节点可以是[form](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form)元素,也可以是其id在表单属性中被指定了的元素.

 此类包含了几个子类:

1. 可列举的元素(listed)
2. 可标签的元素(labelable)
3. 可提交的元素(submittable)
4. 可重置的元素(resettable)

## 支持脚本元素

支持脚本的元素不会直接渲染输出在页面文档中.当然,他们被用来存放脚本代码,脚本代码所要用到的数据.

这些支持脚本的元素有:<script> <template>