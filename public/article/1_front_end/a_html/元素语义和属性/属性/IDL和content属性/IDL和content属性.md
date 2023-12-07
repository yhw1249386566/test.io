# [IDL属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes)和content属性

IDL:Interface Defined Language,[接口定义语言](https://zh.wikipedia.org/wiki/%E6%8E%A5%E5%8F%A3%E6%8F%8F%E8%BF%B0%E8%AF%AD%E8%A8%80)

## content和IDL

### content属性

content属性是您从内容（HTML代码）中设置的属性,您可以设置它，通过[`element.setAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/setAttribute)或获取它[`element.getAttribute()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute).

即使期望值你想要是整数,但是content属性也必须依然是字符串.

​	例如,要使用content属性将input元素设置maxlength为42,则必须调用setAttribute("maxlength", "42")该元素.

- 即:content属性是在HTML中设置的属性.

### IDL属性

IDL属性也称为JavaScript属性.即:您可以使用JavaScript属性（例如）读取或设置这些属性element.foo.

IDL属性将始终使用（但可能会转换）底层的content属性,以便在获取它时返回一个值,并在设置它时将一些内容保存在content属性中.

换句话说,IDL属性实质上反映了内容属性.

- 即:IDL属性是可以通过JS获取/设置的属性

**大多数情况下,IDL属性会在实际使用时返回其值**.

​	例如,\<input>元素的默认类型是“text”,因此如果设置input.type= “foobar”,

​	\<input>元素将是text类型（在外观和行为上）,但是“type”内容属性的值将是“foobar”.而type IDL属性(通过JS获取)又将返回字符串“text”.

**IDL属性并不总是字符串.例如,**

​	input.maxlength是一个数字（有符号的长）.

​	当使用IDL属性时,读取或设置所需类型的值,因此input.maxlength总是返回一个数字,当设置input.maxlength时,它需要一个数字.

​	如果您传递另一个类型,它将自动转换为类型转换的标准JavaScript规则指定的数字.

### 总结

content属性是在HTML中设置的属性,而通常大部分content属性又可以通过js获取,所以这些能被js获取的content属性又可以被称为: IDL属性 

​	



