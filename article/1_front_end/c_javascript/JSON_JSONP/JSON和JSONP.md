[TOC]

# 名称解释

## JS对象/值

属于JS的对象,或者属于JS的原始值(string,number,boolean等)

# 定义

JSON 指的是 JavaScript 对象标记法（Java*S*cript *O*bject *N*otation）,是一种轻量级的数据交换格式,具有自我描述性且易于理解,它独立于任何语言.

# 描述

JSON:  JavaScript Object Notation,JavaScript对象标记法.

JSON是一种存储和交换数据的语法,它是通过JavaScript 对象标记法(即一种规则)书写的文本.

即JSON是一种语法,它属于文本(类似txt这样的文件),用来序列化`对象、数组、数值、字符串、布尔值和 null` .它基于JavaScript语法,但是JSON却又不是JavaScript的子集,同时JavaScript也不是JSON,参考:[JSON：并不是JavaScript 的子集](http://timelessrepo.com/json-isnt-a-javascript-subset).

**当数据在浏览器与服务器之间进行交互的时候,这些数据只能是文本.(字符串)**

隔壁的<AJAX.md>的实例,其中的send()把请求发送过去,在数据传输这个过程中,它是以**文本**的形式传输的,

​    *(也就是发送的是文本类型的数据,可以打开断点调试查看XHR对象的所有有关response属性的值,其中responseText属性更是说明了这一点),*

只有达到目的地时,才根据目的地的代码,然后可以把这些文本数据**以其他类型解析**成需要的类型,然后再处理这些数据.

而JSON专为此而生,它能够帮助我们把JavaScript对象转换成JSON,

即转换中一种文本形式,然后将JSON(此文本)发送到服务器,然后服务器接收响应再处理这段文本数据,待到处理完毕后,最后再继续用文本形式返还到终端.

当然了,我们也可以把从服务器接收到的任何JSON(文本形式)转换为JavaScript对象形式,然后再使用操作JavaScript对象的方式操作JSON解析的数据.

也就是用以上的形式,我们就能够把JavaScript对象转成JSON(文本),JSON(文本)转成JavaScript对象,就可以轻松的在服务器和浏览器之间进行数据交互,就无需把数据有其他更复杂的解析和注释了.

JSON是一个对象,而不是一个接口,所以我们不需要实现它,就可以使用JSON,而且JavaScript还内建了JSON对象的两个方法. 

也就是说,我们可以直接在JS代码中直接使用JSON.parse()和JSON.stringify();即可,而不需要像XMLHttpRequest接口那样,还要实现它.

# 完整的JSON语法定义

```json
JSON = null
    or true or false
    or JSONNumber
    or JSONString
    or JSONObject
    or JSONArray

JSONNumber = - PositiveNumber
          or PositiveNumber
PositiveNumber = DecimalNumber
              or DecimalNumber . Digits
              or DecimalNumber . Digits ExponentPart
              or DecimalNumber ExponentPart
DecimalNumber = 0
             or OneToNine Digits
ExponentPart = e Exponent
            or E Exponent
Exponent = Digits
        or + Digits
        or - Digits
Digits = Digit
      or Digits Digit
Digit = 0 through 9
OneToNine = 1 through 9

JSONString = ""
          or " StringCharacters "
StringCharacters = StringCharacter
                or StringCharacters StringCharacter
StringCharacter = any character
                  except " or \ or U+0000 through U+001F
               or EscapeSequence
EscapeSequence = \" or \/ or \\ or \b or \f or \n or \r or \t
              or \u HexDigit HexDigit HexDigit HexDigit
HexDigit = 0 through 9
        or A through F
        or a through f

JSONObject = { }
          or { Members }
Members = JSONString : JSON
       or Members , JSONString : JSON

JSONArray = [ ]
         or [ ArrayElements ]
ArrayElements = JSON
             or ArrayElements , JSON
```

在`JSONNumber`（数字内部不允许包含空格）或`JSONString`（字符串内部的空格被解释为相应的字符,否则就有问题了）之外的任何位置可以有多余的空白字符.

JSON只支持这些空白字符： 制表符（[U+0009](http://unicode-table.com/en/0009/)）,回车（[U+000D](http://unicode-table.com/en/000D/)）,换行（[U+00](http://unicode-table.com/en/0020/)0A）以及空格（[U+0020](http://unicode-table.com/en/0020/)）.

## 一些需要注意的语法

- JSON的字符串必须使用""双引号括起来.
  
  即JSON格式的字符串必须要使用双引号括起来的,不能使用单引号.
  
  ​    ~~也许使用单引号将true括起来或许不会错,但是根据JSON的语法定义,我们不应该使用单引号,因为始终有可能会出现意料之外的错误.~~
  
  ​    ~~而使用附和要求的""双引号肯定不会出现因为引号而引发的错误.~~
  
  ​    以上是错误的理解,注意是字符串用双引号括起来,而不是参数用双引号括起来.
  
  ​    只有在解析JSON格式的字符串时才必须使用双引号,详情请看 JSON的示例-简单示例-JSON.parse(),以下是一个简单的例子
  
  ```js
  let x = JSON.parse('{"Name":"Yomua"}');
  console.log(x); // {Name:"Yomua"}
  console.log(x.Name); // Yomua
  ```
  
  ​    请注意console.log(x);的结果,Name属性名称没有双引号,但是在解析值的Name却有双引号,
  
  ​    这是因为JSON格式是一个文本,即是一个字符串,解析值的Name若没有双引号则是不符合JSON语法规范的,因为Name是一个个字符组合,所以它是一串字符,即一个字符串,而不是数字1,2,3这样的类型,
  
  ​    所以必须得加双引号,而输出的Name没有双引号,则是**因为对象被整个输出时,属性本身就不会有双引号**,除非特别设置,比如:
  
  ​        
  
  ```js
  let y = {
      '"Name"' : "Yomua"
  }
  console.log(y); // {"Name":"Yomua"}
  ```
  
  ​    不过这样几乎没有意义,因为你该怎么调用Name属性呢?
  
  ​    `y.Name?还是 y."Name"`,这两者都不行,前者会输出undefined,是因为不存在Name属性,后者会直接报错:Unexpected string, 因为我们无法调用一个对象的字符串属性.
  
  ​    **且JSON的属性名称一定要是双引号括起来的字符串,这是一个规范.是的,key也就是属性名必须用双引号括起来:[W3C](https://www.w3school.com.cn/js/js_json_syntax.asp)**

- JSON.parser()方法中,被解析的JSON格式文本值不能在末尾有逗号.
  
  详情请看:JSON的两个方法 - JSON.parse() - 注意的地方.
  
  ```js
  // 下面两个都是错误的,SyntaxError,它们使用了逗号作为被解析的值的解为.
  JSON.parse("[1, 2, 3, 4, ]");  
  JSON.parse('{"foo" : 1, }'); 
  // 以下是修改过后额正确格式,即去掉结尾的逗号即可.
  JSON.parse("[1, 2, 3, 4]");  
  JSON.parse('{"foo" : 1}'); 
  ```

- 还有更多的语法说明,请看 JSON的两个方法-JSON.stringify()-使用JSON.stringify()的一些注意事项

## 简单直白的简单语法规则

JSON 语法衍生于 JavaScript 对象标记法语法：

- 数据在名称/值对中
  
  "key/name":"value"

- 数据由逗号分隔
  
  "key/name":"value", "key/name":"value"

- 花括号容纳对象
  
  {"key/name":"value", "key/name":"value"}

- 方括号容纳数组
  
  ["key/name":"value","key/name":"value"]

- JSON文本文件的类型后缀名为:.json
  
  JSON文本的[MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)类型为:application/json
  
  ​    即以JSON格式的二进制文件

# 为什么使用JSON/JSON的作用

因为浏览器和服务器之间传输数据的类型只能是文本,而JSON的格式也是文本,又只能是文本,

所以它(JSON文本)能够轻松在服务器和浏览器之间进行相互传输,并用作任何编程语言的数据格式(因为每种语言都肯定有文本).

​    *即JavaScript可以使用JSON与服务器进行数据交互,其他编程语言也可以,例如Java等.*

且JavaScript提供内建函数,能把以JSON格式写的字符串(数据)转换为原生JavaScrip对象,因此如果以JSON格式从服务器接收数据,那么这意味着你可以像操作任何其他JavaScript对象一样操作此数据.

这就代表着JSON能更为简单的与服务器进行交互数据了.

```js
JSON.parse();
```

而且JavaScript还提供另一个内建函数,能够把JavaScript的值(对象,数组,字符串等)转换成JSON的格式,也就是一个文本.

从而将此文本发送到服务器.

```js
JSON.stringify();
```

而且JSON对象也包含这两个方法,有意思的是: JSON除了这两个方法之外,它本身就没有其他任何作用了,它不能被调用也不能被作为构造函数使用什么的.

你能想象吗?浏览器和服务器之间传输的数据类型只能是文本,而JSON也刚好是一种文本格式.

同时JSON自身还包含可以把终端需要发送请求的数据*(这种请求数据通常不是文本)*转换为自身JSON的格式*(即文本)*,从而可以使数据变成文本;

又可以把服务器返回的文本数据类型转为编程语言对应的值(*例如转为JavaScript的对象,数组,字符串等)*

而JavaScript又自己提供JSON对象的这两种方法,简直就是如虎添翼,就不用我们再去实现了.

所以你说你为什么要使用JSON?方便,快捷,简单,不花里胡哨;

那么它的作用还需要说吗,通过它的名字就可以看出来,JavaScript对象标记法: 基于JavaScript的语法,将传输的数据类型进行相互转换,从而使用在各个地方.

# JSON的两个方法

## JSON.parse()

***看示例请看:JSON的示例 - 简单示例 - JSON.parse();***

### 语法

`JSON.parse(text [, receiver] )`

解析一个text称为对象

#### 参数解析

##### text 必选

此参数为: 要被解析成JavaScript值的字符串.

关于JSON的语法格式,请参考以上的: `完整的JSON的语法定义` 或  [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)

##### receiver 可选

###### 描述

**该参数是一个函数!.**

参数其英文意思为: 无线电接收机/接球手等,从其英文意思看去,这个参数的作用类似于一个中介.也确实是这样子.

该参数是一个转换器,如果传入该参数(函数),可以用来修改 解析生成的原始值(也就是JS对应JSON格式的对象/值),此参数在parse()方法返回之前被调用.

​    *为什么receiver参数(函数)是在parse()方法返回之前被调用呢?是因为receiver函数是parse()方法的参数,一个函数的参数怎么能在函数执行完毕后调用呢?这是不现实的,也是不可能的,而且若在之后调用,那么也失去了此参数存在的意义.*

也就是当JSON格式的text文本已经被解析成了JS所对应的对象/值时, 此JS对象/值还会再经历一次转换(也就是经历一次receiver函数的处理)之后,才会被返回.

也就是此JS对象/值经历完转换(receiver函数处理后)完毕后才会把它交给JS去处理.至于最后所返回的对象/值是什么,看的是receiver函数中究竟是如何处理的.

###### 作用

此参数函数最大的作用就是能够在JSON格式的text文本被已经解析成与JS所对应的对象/值时,在它返回之前,再一次对此JS对象/值进行操作/修改等.

**最后经过receiver函数处理完成后才返回最终的值.**即该函数的返回值会作为最终值.

###### receiver函数参数如何处理因解析生成的原始值.

首先已经解析成JS的对象/值以及它所包含的所有属性,会按照一定的顺序,分别去调用receiver函数.

**在调用过程中:**

​    当前属性所属的对象会作为 `this`. 

​    当前属性的名称和值分别会作为第一个参数(属性名)和第二参数(属性值)传入到receiver函数中. 也就是receiver如果有2个及以上的参数,那么第1个参数和第2个参数一定是为: 属性的名字, 属性的值. 

​    请看一下模板:

```js
JSON.parse(text,function(属性名,属性值) {
    .....
})
```

- text
  
  ​    代表parse()函数的第1个参数,即代表要被解析的JSON格式的文本.

- function(name, value){...}
  
  ​    代表parse()函数的第2个参数,也就是一个转换器函数,将解析完成的JSON格式文本所对应的JS的对象/值,把其中的所有属性按照一定的顺序分别调用该函数.
  
  ​    并将当前属性所属的对象当作this值,属性的名称(key和值(value)分别传入到该函数的第一个参数和第二参数.
  
  ​    最后该函数执行完毕后所得到的最终值进行返回,而这个返回值就是: J**SON格式的text文本解析完后生成的JS的对象/值再进一步处理的值.**

**对解析生成的JS值/对象的所有属性,调用的顺序:**

​    从里层的属性开始,一级级往外,最终到达顶层,也就是解析值本身.

​        *此顺序的执行步骤为:从左往右开始执行代码,如果一个属性A中包含另一个属性B,那么这另一个属性B将会比这个属性A先调用receiver函数.*

​        *但是若这个属性A没有包含属性B,那么自然A就会调用receiver函数,详情请看 JSON的示例 - 简单示例 -JSON.parse().*

​    当到达顶层的解析值本身***(JSON格式的text文本解析完后生成的JS的对象/值)***时,是没有属性的.

​    虽然没有属性,也就没有属性名,但是属性值是存在的,也就是解析值本身.

​    所以此解析值在被receiver函数处理时传入的参数是一个""空字符串和解析值本身(它被当作属性值).

**需要注意的是**: 传入到receiver函数的第二个参数:解析值.此解析值是有可能已经被修改过后的,因为我们可以通过这个解析值的属性去修改解析值本身,而属性是先于解析值被receiver函数处理的,所以在处理过程中,修改解析值是有可能存在的.

​    而解析值本身在调用receiver函数时(也就是被receiver函数处理),它的this值是一个比较独特的,即: `{"", 修改过/未修改过的解析值};`

​        *修改过/未修改过的解析值: 因为在遍历被解析成JS对象/值的JSON数据时,可能会修改其属性的值*

在我们编写receiver函数时,需要注意到以上的特例:即解析值本身也是会调用receiver函数的,而这个**解析值本身调用receiver函数的遍历顺序为:** 从内层开始,按照层级顺序,依次向外遍历,也就是没变.

​    

### 返回值

该方法的返回值为Object类型,或一个原始值.

***[也返回一个原始值,例如number,string等,详情了解原始类型/基本类型请看:<基本类型(原始类型).md>***

具体是什么Object(比如函数对象,数组对象,还是对象[对象]等),根据给定的JSON文本的值/对象来返回.

如此代码:  `JSON.parse('1');` 这个的返回类型为number,是一个原始值.

当然了,原始值也可以变成对象,只需要使用new操作符即可,

### 异常

若传入的text参数不符合JSON规范(不符合JSON的语法定义),则会抛出SyntaxError异常.

### 描述

JSON.parse()方法用来将JSON格式的文本(字符串)解析成对应的JavaScript的值/对象,

同时也能用来修改 解析生成的原始值(第二个参数)

​    (即只需使用该方法的可选参数receiver转换器,在该方法(parse())返回之前调用此参数,就能通过此参数修改 解析生成的原始值,即JSON格式文本对应的JS的值/对象).

### 注意的地方

- 值得一提的是,JSON.parse()不允许用逗号作为被解析的值的结尾,例如
  
  ```js
  // 下面两个都是错误的,SyntaxError,它们使用了逗号作为被解析的值的解为.
  JSON.parse("[1, 2, 3, 4, ]");  
  JSON.parse('{"foo" : 1, }'); 
  // 以下是修改过后额正确格式,即去掉结尾的逗号即可.
  JSON.parse("[1, 2, 3, 4]");  
  JSON.parse('{"foo" : 1}'); 
  ```
  
  ​    这在完整的JSON语法定义中也有说到,或者这么说,JSON的一切语法规范都能在里面找到.

- parse()方法解析JSON格式文本时,是不存在变量的,因为JSON格式文本中都是字符串,哪里来的变量?
  
  ```js
  let a = "Yomua";
  JSON.parse('a');
  /*
  Uncaught SyntaxError: Unexpected token a in JSON at position 0
  即语法错误.
  */
  ```

## JSON.stringify()

详情请看:[MDN-stringify();](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

***看示例请看:JSON的示例 - 简单示例 - JSON.stringify();***

### 描述

该方法把一个JavaScript值/对象(如数组对象,函数对象,number原始值,string原始值等,能转换成JSON格式文本的对象/值)转换（序列化）成一个JSON格式的文本(文本也就相当于字符串).

### 语法

`JSON.stringify(value[, replacer, spacel]`

#### 参数解析

##### value 必选

显而易见,这是一个值,要被序列化(转换)成一个JSON格式文本的JS对象/值.

##### replacer 可选

其英文名称:替代者/代替品.

此参数在使用过程中,若是一些特殊的值可能会出现一些特殊的情况,详情请看:使用JSON.strinify()的一些注意事项

它的作用很名字也是一致的,只不过稍微有点区别,因为此参数若写了出来,存在**三种可能.**

- ​    **若该参数是一个函数**,那么在将JS对象/值转换成JSON格式的文本过程中,被转换的JS对象/值的每个属性都会调用此函数.
  
   ​        *JS对象/值的每个属性都会调用此函数,从顶层一直到底层,依照先后顺序依次调用,没有任何属性的JS对象/值则将直接输出:{},*
  
   ​        *若传入的属性名/属性值有一方/全部为空,则为""空字符串的那方/全部 将会对应输出`""`,例如 `"":""`, `a:""`, `"":a`*
  
   ​    且该**函数的返回值会作为其对应的(当前对象的)属性的值.**
  
  - ***作用***
    
    ​    通常将该参数函数用于选择包含在JSON格式文本中的JS的对象/值的属性.
    
    ​    也就是在我们需要将JS的对象/值转换成JSON格式文本时,我们可以自由选择转换哪些JS对象/值的属性.
    
    ​    且此参数作为函数时,和parse()方法的receiver参数函数一样,**拥有两个参数,key(键)和value(值),**
  
  - ***传入replacer参数函数的两个值***
    
    ​    其实这两个参数传递的值也和receiver参数函数的两个参数传递的值是一样的,即都是:属性名和属性值.
  
  - ***调用replacer函数的属性的调用顺序.***
    
    ​    但是JS对象/值的所有属性调用此函数的顺序和parse()方法完全相反,甚至连此参数被执行的顺序也是完全不同:
    
    ​        首先,此参数执行在第一个参数value还未被转换成JSON格式文本之前.
    
    ​        其次第1个调用此参数函数的属性是""空字符串,即传入的属性名是""空字符换,而属性值是JS对象/值本身.
    
    ​            *(这和parse()方法最后才会才会传入""空字符串和解析值本身的调用顺序完全相反,一个是第一个调用,一个是最后一个调用)*
    
    ​        接着属性调用replacer参数函数的顺序和传入的replacer函数的参数将会完全按照属性的先后顺序进行调用,先写的属性先调用,后写的属性后调用,
    
    ​            *注意:这里说的属性是第一个调用replacer函数的属性的值,也就是`"":JS对象本身`.*
    
    ​            *为什么我这么说呢?因为*
    
    ```js
    function replacer(key, value) {
      value = "";
      return value;
    }
    
    var foo={
      foundation:"Mozilla",
      model:"box"
    };·
    var jsonString=JSON.stringify(foo,replacer)
    console.log(jsonString); // ""
    /*
      这就是原因,其结果为:"" (空字符串)
      原因就在于:replacer函数的value = "";
      如果你使用断点调试,你就会发现,递归的属性是来自于第一个调用replacer函数的属性的值,即""空字符串的值(JS对象/值本身) => "" : 
      {foundation:"Mozilla",model:"box"}
    
      在一开始准备递归非String,Boolean, Number, Symbol,函数等任何其他对象时,我们将value变成了"",
      当开始准备递归时,程序发现:咦?怎么回事,没有需要递归的属性呀?(因为需要递归的属性包含在了value中,即:js对象/值 中)
      所以直接就将之返回,最后输出一个""空字符串,代表着程序已经递归完毕了,只不过递归了一个空值.
      parse()方法也是递归的已经被解析成JS对象/值的JSON格式文本,只不过属性调用receiver函数的顺序相反罢了.
    
    */
    ```
    
    ​        即使一个属性的值包含另一个对象中的属性和属性值,也是一样的,并不存在parse()方法中的最里层先调用,然后层层往外,直到顶层的说法.
    
    ​        简而言之,需要被转换成JSON格式文本的JS对象/值若是以下形式,则按照对应的要求进行转换:
  
  - ​    如果是一个Number(一个数值), 转换成相应的字符串作为属性值被添加入 JSON 字符串(文本).
  
  - ​    如果是一个 String(一个字符串), 该字符串作为属性值被添加入 JSON 字符串(文本).
  
  - ​    如果是一个Boolean(一个布尔函数), "true" 或者 "false" 就会作为属性值被添加入 JSON 字符串(文本).
  
  - ​    如果除了以上之外是任何其他对象,该对象递归的按照一定的顺序(先后顺序)将它的值序列化成 JSON 字符串(文本), 每个属性调用 replacer 方法.
    
    ​    除非该对象是一个函数,这种情况将不会被序列化成 JSON 字符串(文本).将被忽略/转换为null.
  
  - ​    如果是该对象的某个属性名为undefined,该属性不会在 JSON 字符串(文本)中输出.
    
    ​    **注意:** 不能用 replacer 方法,从数组中移除值（value）,如若返回 undefined 或者一个函数,将会被 null 取代.
    
    ​    *详情示例请看JSON的示例-复杂示例*

- ​    **若该参数是一个数组,**那么只有包含在这个数组中的属性名,才能最终被转换成JSON格式文本.
  
   ​    那么我们需要序列化的一定是JS对象,而不是JS值(,因为对象才有属性,(数组也不能,它没有属性),否则第二个参数数组如同没有,那就毫无意义了.
  
   ​    这也就意味着,最顶层(即对象本身)无法被转换,因为它的属性名为""

- ​    **若该参数为null或者没有提供**,那么默认代表指定的JS对象/值的所有属性都会被转换成JSON格式文本.

##### space 可选

其英文意思为: 空间.

很显然,其意如其名.它的作用在于指定缩进用的空白字符串,目的是为了美化输出,是的,你没有看作,它是用来美化输出,即将格式变得更好看点,或者说更容易阅读.

此参数美化的是结果字符串里面的间距,也就是被转为JSON格式文本的JS对象/值的字符间距.

并且此参数和第二个参数replacer一样,有3种可能:.

**如果该参数是个数字**,则代表输出的格式中有几个空格,数字最大取值为10,最小取值为1,即[1,10],而且必须是整数,即使写成小数形式,那么虽然不会报错,但是会忽略掉小数点后面的数字.

若取值小于1,则代表没有空格,即为0; 若取值大于10,那么只会取10,也就是超过10的部分会被忽略.

**如果该参数是个字符串,**则每一个字符都将被视作空格(空格本身也是字符),当字符串长度超过10,则和此参数是数字时一样的处理结果,即只取前面10字符,后面则被忽略.

而和该参数是个数字时的区别在于,不可能存在小数和负数.所以就不存在小于1这种情况,因为小于1的字符串则是0.

**如果该参数没有提供/或为null,**则就代表没有空格,和0类似.

## 使用JSON.stringify()和parse()的一些注意事项

- 转换值如果有 toJSON() 方法,该方法定义什么值将被序列化.
  
  ​    也就是JS对象/值若有toJSON()方法,且你调用了它,那么这个方法的返回值将会替代JS对象/值得属性被序列化.
  
  ​    若调用了toJSON()方法,这个方法却没有返回值,即返回undefined.那么就将会对undefined进行序列化,最后得出的结果要么是undefined,又或者是{},[null],也就是该干嘛就干嘛.
  
  ​    **总而言之:一个对象有toJSON()方法且用了此方法,那么这个对象就会变成只有toJSON()方法的返回值,其他什么都没有,也就是此方法的返回值将会替代该方法当前所属的对象被序列化**
  
  ​    *详情示例,请看:JSON得示例-复杂示例=JSON.stringify();*

- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中.
  
  ​    即如果不是数组对象的属性,那么被转为JSON格式的文本(字符串)时,将不能保证此文本(字符串)中的JS对象/属性以某种特定的顺序出现.
  
  ​    同时将JSON文本转为对象也是如此(parse())

- ​    布尔值、数字、字符串的包装对象在序列化过程中会自动先转换成对应的原始值,然后再被序列化成JSON字符串.
  
  ​    这也就说明了: 被包装成对象的原始值,即使添加了属性
  
  ​        *(方法也是属性的一种,即属性中存的是一个函数,只不过为了区分存函数和存值得区别,我们才将存函数的叫做方法,存值的叫做属性.)*
  
  ​    也是无法调用replacer参数函数/无法被replacer参数数组包含,只会转换成原始值.
  
  ​        *详情了解包装对象,请看:<基本类型(原始类型).md>*
  
  ​    即如果你要将一个JS的原始值的包装对象转换成JSON格式文本字符串,那么这包装对象在JSON格式文本字符串中会以原始值的形式存在,
  
  ​    而不是以JS对象的形式,这是很重要的一点,因为例如:把一个字符串原始值包装成字符串对象,其输出的结果,总是让我们大吃一惊.
  
  ```js
      let d = new String("Yomua");
      console.log(d); // String {"Yomua"}
      typeof d; // object
  /*
      其中String {"Yomua"}还包含着: 
          0: "Y"
          1: "o"
          2: "m"
          3: "u"
          4: "a"
          length: 5
          __proto__: String (此属性还包含更多属性)
          [[PrimitiveValue]]: "Yomua"
  */
  ```
  
  ​    所以你看,如果不将JS的包装对象转换成JSON格式文本使用原始值(Primitive Value),那么这到底该怎么转换呢?   这是不现实的.
  
  ​    所以包装对象在转为JSON格式文本时会使用原始值存在于JSON格式文本中.
  
  ​    **简而言之就是:**
  
  ​        当一个原始值被包装成对象时(也就是JS的包装对象),将此包装对象转为JSON格式文本字符串时,会自动的将包装对象转换为其对应的原始值,然后再转换成JSON格式文本字符串.

- `undefined`、任意的函数以及 symbol 值,在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）.
  
  ​    函数、undefined 被单独转换时,会返回 undefined,如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.
  
  `  alert(JSON.stringify(function(){}));`都会返回undefined.
  
  ​    因为它们三者使用JSON.stringify()方法,且使用在对象时它们会被忽略/使用在数组会转换成null.
  
  ​    注意的是:如果函数在序列化之前就已经被转为字符串就可以将之转为JSON数据了.但是这没有意义,因为若需要把jSON数据的函数形式转为JS对象,要使用到eval()函数,且函数还会失去自己的作用域.
  
  ```js
  var obj = { 
      name: "Bill Gates", 
      age: function () {return 62;},
      city: "Seattle" 
  };
  // 将age属性的值转为字符串.
  obj.age = obj.age.toString();
  var myJSON = JSON.stringify(obj);
  console.log(myJSON);
  /*
  {
      "name":"Bill Gates",
      "age":"function () {return 62;}",
      "city":"Seattle"}
  */
  ```
  
  ​    这样是没有意义的,因为函数会失去其作用域还需要用到eval()这个不安全的函数(请永远不要使用它)

- 对包含循环引用的对象（对象之间相互引用,形成无限循环）执行此方法,会抛出错误.

- 所有以 symbol 为属性键的属性都会被完全忽略掉,即便 `replacer` 参数中强制指定包含了它们,也是无用的.

- Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()）,因此会被当做字符串处理.
  
  ​    也就是若Data对象若调用了toJSON()方法或toISOString()方法,那么它们会被当作JS的字符串格式去转换成对应的JSON格式文本．
  
  ​    否则不服务JSON语法规范,就会报错.因为JSON语法规范不允许Dated对象,不像Number,Boolean对象等一样被允许.

- NaN 和 Infinity 格式的数值及 null 都会被当做 null.

- 其他类型的对象,包括 Map/Set/WeakMap/WeakSet,仅会序列化可枚举的属性.

## parse()和stringify()

你们或许注意到了

1. ​    parse()将JSON数据解析成JS对象 
2. ​    stringify()将JS对象序列化(转换)成JSON数据

它们若使用receiver和replacer参数函数,然后它们二者的属性调用此两个参数的顺序完全是相反的.

第1个则是由内到外,层层向上,直到顶层,顶层再传入参数 : "":"修改过/未修改过的值"

第2个则是先传入参数 : "":"修改过/未修改过的值",再由先后顺序,即哪个属性先被执行就让此属性调用replacer参数函数,直到结束.

这样一看,它们的属性调用参数函数的顺序完全是相反,我有一非常恰当的解释,而且此解释刚好吻合为什么会这样:

​    即因为一是解析,一个是转换(序列化),它们二者的功能就是完全相反的,所以它们调用顺序也应该完全相反,且这也是符合堆栈的先入后出的原理:

​            不妨想想,stringify()先将一个JS的a对象序列化成了JSON数据,而后又序列化了b,c,d,最后序列化了 "":"修改过/未修改过的值".

​        此时我们再使用parse()方法准备将JSON数据解析成JS对象时,是不是先解析的是最里层的(即被一个属性的值包起来的属性),也就是d,然后再向外解析,最后解析到顶层:   "":"修改过/未修改过的值".

​        这样就符合先入后出: 先存入顶层,那么顶层就是最后出的.

​        比如一个单开口的瓶子,依次放入东西,再依次取出,是不是最后放的最先取?

# JSON的示例

## 简单示例

### JSON.parse()

- `JSON.parse('"foo"');`
  
  ​    请注意,在 JSON的两个方法- JSON.parse() - 异常 中我们说过,若传入的第一个参数不符合JSON规范,那么则会抛出异常:   Uncaught SyntaxError; 也就是未捕获的语法错误.
  
  ​    而且JSON规范中有一条则是: JSON的字符串(指的是: 需要将服务器的数据解析成JS的字符串对象 或 将JS的字符串对象转换成JSON格式,这两者中的字符串)都要使用双引号括起来.
  
  ​    所以很明显,我们将"foo"这个JSON格式的字符串使用双引号括起来,再在外面使用''单引号与双引号区分.
  
  ​    使用单引号的目的是因为: "foo" 这个是整体,不能将它的""双引号单独看出一个独立的个体,从而变成将foo这个值解析成JS对应的值,这样是会报错的.
  
  ​    且这是parse()函数的格式要求,即第一个参数和第二参数必须使用引号括起来,而我们已经使用了双引号,
  
  ​        *(即使它是一个整体,但是不用单引号而用双引号就会出现引号的匹配错误)*
  
  ​    所以只能使用单引号作为引号将参数括起来.
  
  ```js
  console.log(JSON.parse('"foo"')); // foo
  alert(typeof JSON.parse('"foo"')); // string
  ```
  
  ​    foo则是JS的字符串类型,同时alert()输出的值也证明了这一点:string.

- `JSON.parse('[0,1,"parse"]');`
  
  ​    这是将一个JSON格式的数组解析成JS对应的值/对象,即这里的JSON格式的数组就会被解析成JS中的数组对象.
  
  ​    而"parse"代表数组的字符串值,若没有双引号,则代表一个变量.
  
  ```js
  let arr = JSON.parse('[0,1,"parse"]');
  // 此时"false"是一个数组中的值.
  console.log(arr); // [0, 1, "false"]
  alert(typeof arr); // object
  ```
  
  ```js
  let ohterArr = JSON.parse('[0,1,parse]');
  // 此时false是一个数组中的变量
  console.log(otherArr); // [0, 1, false]
  alert(typeof otherArr); // object
  ```

- `JSON.parse('null');`
  
  ​    将JSON格式的null转为JS对应的值/对象,此时这里对应的JS对象是null对象,是的,null是一个对象,这很显然,不是吗?
  
  ​    undefined返回值才会是undefined.
  
  ​    想要详情了解null和undefined之间的关联吗?请看<h5_css_js.doc>-null,undefined.
  
  ```js
  let nullObj = JSON.parse('null') ;
  console.log(nullOjb); // null
  alert(typeof nullObj); // object
  ```
  
  ​    这个示例的目的告诉我们,只要是JSON格式的文本,且符合规范,而且有对应的JS值或者对象,
  
  ​    那么我们就可以使用JS的自带内建JSON的函数parse()将JSON格式的文本解析成JS对应的值或者JS对象．

- `JSON.parse('1');`
  
  ```js
  let numObj = JSON.parse('1');
  console.log(numObj); // 1
  alert(typeof numObj); // number
  ```
  
  ​    此实例又再一次证明了,JSON的万能:即`JSON.parse('null');`此实例的解释.
  
  ​    将JSON格式的1解析成JS所对应的值/对象,其中解析成的对象是:number,其是一个原始值.

- ```js
  let x=JSON.parse('{"Age" : 20}',function(n,v){
      console.log(v); // 20 还会输出一次：{Age:20}
      if(n === "") {
          return v;
      }else {
          return v*2;
      }
  });
  console.log(x); // {Age:40}
  console.log(x.Age); // 40
  ```
  
  ***'{"Age" : 20}'***
  
  ​    这是需要被解析成JS对象/值得JSON格式得文本.
  
  ​    当被解析完成后,其所对应的JS对象/值为: 对象,即
  
  ​    Age:20},调用typeof后返回类型为:object
  
  ***function(n,v){...}***
  
  ​    转换器函数,调用在parse()方法返回之前,解析完JSON格式文本之后,也就是在调用此函数之前,JOSN格式的文本已经被解析成了对应的JS对象/值,即为: `{Age:20}`
  
  ​    n:对象的属性名; v:对象的属性值.
  
  ​    调用此函数的属性将会按照一定的顺序(从最里层开始,一层层往外,直到顶层)分别调用此函数.
  
  ​    并且将当前属性所属的对象作为this值,属性的名字和属性值分别传入该函数的n参数和v参数(即第一个参数和第二个参数)
  
  ​    直到最顶层:JS对象/值本身(即指的是:JSON格式的文本被解析成所对应的JS对象/值,这对象/值本身)时, 传入的参数和this值才会改变(这是一个特例):
  
  ​        第一个参数将传入""空字符串,第二个参数将传入解析值本身.
  
  ​        this值将等于`{"", 修改过/未修改过的解析值}`
  
  ​    最后将处理完必过后的解析值(JS对象/值)返回,至于接下来的步骤,就是JS中其他代码的事了.
  
  ***if(n === "") {...}else{...}***
  
  ​    判断当前是否为最顶层,也就是当前是不是解析值本身在调用receiver函数,
  
  ​    因为解析值本身在调用receiver函数时,第一个参数n传入进来的总是""空字符串.
  
  ​    如果不是解析值本身在调用receiver函数,则执行另一个处理方法.
  
  ***console.log(v); // 20***
  
  ​    在未对解析值进行处理时,当前属性的值并不会发生改变.
  
  ***console.log(x); // {Age:40}***
  
  ​    将解析值重新进行了一番处理后在返回最终的整个解析值本身.
  
  ***console.log(x.Age); // 40***
  
  ​    得到最终的解析值的Age属性的值.

- ```js
  let x;
  x = JSON.parse('
                 {
                     "Name" : "Yomua", 
                     "Age" : 12,
                     "Hobby" : {
                                 "Sex" : "Girl",
                                 "Game": {
                                         "1":"LOL",
                                         "2":"CF"
                                         }
                               }
                 }, function(n,v){
                     if(this.Name == "Yomua") {
                          a = this.Name;
                     }
                     console.log(v);
                     return v;
                 }')
  /*
      上面的形式为了让我们看的更清楚,清楚这些一一对应关系,下面为直接能够复制粘贴就可以运行的代码(其形式和目的与上面一摸一样.)
  */
  let y;
      y = JSON.parse(
          '{"Name":"Yomua", "Age":12, "Hobby":{"Sex":"Girl", "Game":{"1":"LOL", "2":"CF"}}}', function (n, v) {
              if(this.Name == "Yomua") {
                  a = this.Name;
              }
              console.log(n);
              return v;
          }
    )
  console.log(y);
  console.log(typeof y); // object
  console.log(a); // Yomua
  /*
      Name,Age,Sex,1,2,Game,Hobby, (一个空字符串)
    Yomua
  */
  ```
  
  ***console.log(n);***  

其我们的输出的是每个属性,目的是: 

​        为了让我们更加的了解解析值(JS对象/值)的所有属性,是怎么从最里层,一层层往外,最后直到顶层的.

​    其输出结果为:`Name,Age,Sex,1,2,Game,Hobby, (一个空字符串)`

​    咋一看这个输出结果,不是先从最外层的属性开始一一调用receiver函数的吗?怎么我们却说是从最里层开始,一一层层往外,直到顶层的顺序呢?

​    这是因为你理解错了,**这个顺序的意思是**: 从左往右开始执行代码,如果一个属性A中包含另一个属性B,那么这另一个属性B将会比这个属性A先调用receiver函数.

  ​    但是若这个属性A没有包含属性B,那么自然A就会调用receiver函数.

  ​    而不是你们理解的:直接找到一个解析值(JS对象/值)的最子属性,然后使该属性调用receiver函数,然后再找到第二小的子属性/同级子属性,再调用receiver函数,以此类推到顶层.

  ​        但是你们有没有想过,如果有多个同级的最小子属性,那么该执行谁呢?左边,右边,还是中间?

  ​        所以这里的顺序意思可不是这个,而是上面刚刚才说的意思..

  ​    而空字符串则是因为解析值本身调用receive函数时,它的属性名就为:""空字符串,属性值,则是它本身.

  ***console.log(y);***

  ​    其结果为:{ Name: "Yomua", Age: 12, Hobby: {…} }

  ​    也就是这个最终的返回值为此JS对象.

  ***consle.log(a);***

  ​    其结果为Yomua. 但是为什么我们要加一个判断语句呢?

  ​    这是因为若不加判断语句,那么this.name指的调用当前函数的对象,而最后我们始终会得到一个属性名为空的对象 对象,所以属性名为空,这么会存在属性呢?

  ​    所以最后如果不加判断语句,直接写`a = this.name;` 只会得出undefined.

  ***return v;***

  ​    返回最原始的属性值,即相没有使用receiver参数(函数)

  ***console.log(typeof y);***

  ​    其结果为:object;

  ​    因为这个parse()函数的性质并不会因为多了个转换器receiver参数(函数)就被改变,它依然是将JSON格式的文本转换为所对应的JS对象/值.

  ​    而这里很明显的,这个JSON格式的文本是个对象字面量.

### JSON.stringify();

- ```JS
      let obj = { A: 2, Name: "Yomua" };
      let x = JSON.stringify(obj);
      console.log(x); // {"A":2,"Name":"Yomua"}
  ```
  
  ​    将obj对象转换为JSON格式的文本(字符串).请注意输出的结果:`A":2,"Name":"Yomua"}`
  
  ​    众所周知,JSON格式文本中的字符串是要使用双引号括起来的,而对象的属性就是属于字符串,所以JSON格式的文本需要用双引号将之括起来: "A","Name"
  
  ​    注意:对象的属性是不能作为变量的
  
  ```js
      let x = 'aa'
      let obj = { x: 2, Name: "Yomua" };
      console.log(obj); //{x: 2, Name: "Yomua" }
  ```
  
  - ​    这里输出的obj对象的属性x依然是x,而不是aa

- ```js
      let a = {}, b;
      console.log(typeof a); // object
      b = JSON.stringify(a);
      console.log(b); // {}
      console.log(typeof b); // string
  ```
  
  ​    最初a是被定义成一个无任何属性和值的空对象,所以它typeof 的返回值也是object类型.
  
  ​    但是经过stringify()的转换之后,typeof  a 就会返回string,因为stringify()的目的是将JS对象/值转为JSON格式的文本,而JSON格式的文本中的任何值都是字符串.
  
  ​    请注意: 此方法和parse()方法有些不同的是,**stringify()中**传入需要被转换为JSON格式的JS对象/值时,**字符串不使用双引号也是正确的.**
  
  ​        *(但是这并不妨碍JSON格式文本中此JS字符串是被用双引号括起来的）*
  
  ​    因为传入值的时候并没有被转为JSON格式(只有JSON格式中的字符串才一定使用双引号),所以我们用单双引号皆可,即:
  
  ```js
  let a = 'yomua';
  let b = JSON.stringify(a);
  console.log(b); // "yomua"
  ```
  
  ​    看到了吧,a变量的值为一个原始值,字符串:yomua,且是单引号括起来的字符串,但是被stringify()转换的时候,并没有报任何错误,
  
  ​    但是如果是parse()将a变量解JS对象/值肯定会抛出异常,即:
  
  ​    `let c = JSON.parse("'yomua'");` 这会抛出异常,而有一点一定需要注意,就是JSON格式文本中,是不存在变量的,即
  
  ```js
  let a = 'yomua';
  let c = JSON.parse(a); 
  /*
  Uncaught SyntaxError: Unexpected token a in JSON at position 0
  即语法错误.
  */
  ```
  
  ​    因为JSON格式文本中都是字符串,哪里来的变量可谈?一定要注意这一点.

- ```js
  let c = JSON.stringify([1, false, "false"]);
  console.log(c); //
  console.log(JSON.parse(c));//[1,false,"false"]
  ```
  
   ***console.log(c);***
  
  ​    其转换为JSON格式文本字符串,结果为: [1, false, "false"],为了便于阅读,
  
  ​    我们将JSON格式的文本默认使用''单引号括起来:'[1, false, "false"]'
  
  ​    现在请注意: JSON文本中的第二个结果:false,为什么它没有双引号括起来呢?
  
  ​    这是当然的,JS中的false是属于boolean类型,也也就是一个boolean原始值,而不是字符串,所以在被转为JSON格式文本字符串时,当然不会有双引号.
  
  ​    当此原始值在使用parse()方法被转为JS对象/值时,false就会从JSON格式文本被解析成JS值(原始值),请往下看
  
  ***console.log(JSON.parse(c)); // [1, false, "false"]***
  
  ​    结果为:[1, false, "false"] , 乍一看和输出JSON格式文本字符串一模一样,但是实际上,此结果是JSON的数组对象,其还包含了以下东西:
  
  ​                                            0: 1
  
  ​                                            1: false
  
  ​                                            2: "false"
  
  ​                                            length: 3
  
  ​                                            __ proto __: Array(0)
  
  ​    也即是3个数组的索引和索引值,length属性,以及一个proto属性(此属性还包含了许多其他属性,这里就不赘述了,可以自行去测试)

- `console.log(JSON.stringify({x: 5, y: 6}))`
  
  其结果为: {"x":5,"y":6}
  
  ​     至于x和y为什么用了双引号括住,因为对象创建的字面和数组不同,是不存在变量的,
  
  ​        *(有一种看似是变量的对象字面量的方法,实则不是的,就是:get和set两个方法,*
  
  ​    *悄悄的说一句,它们在使用的时候,用的是表达式的值,也不是变量,哈哈哈.详情请看<对象.md>)*

- ```js
  JSON.stringify(
      [
          new Number(1),
           new String("false"),
           new Boolean(false)
      ]
  );
  /*
      使用单引号表示这是JS格式文本字符串,实际上是不会输出此单引号的.
      '[1,"false",false]'
  */
  ```
  
  ​    在JSON的两个方法 - JSON.stringify - 使用JSON.stringify的一些注意事项中,我们说过:
  
  ​        当一个原始值被包装成对象时(也就是JS的包装对象),将此包装对象转为JSON格式文本字符串时,会自动的将包装对象转换为其对应的原始值,然后再转换成JSON格式文本字符串.
  
  ​    所以new Number(1),new String("false"),new Boolean(false),都分别自动转换为1,"false",false原始值,然后再将之转为JSON格式文本字符串.

- ```js
  // 当undefined、任意的函数以及 symbol 值出现在非数组对象时,会被忽略
      let noArrObj = (JSON.stringify(
              {
                  x: undefined, 
                  y: Object, 
                  z: Symbol(""),
                  e: function b(){
                      console.log("hhh")
                  }
              } 
          )
      )
  
  // 当undefined、任意的函数以及 symbol 值出现在数组对象时,会被转为null
      let arrObj = JSON.stringify(
          [
              undefined, 
              Object, 
              Symbol(""),
              function b(){console.log("hhh")}
          ]
      ); 
  console.log(noArrObj); // {}
  console.log(arrObj);//[null,null,null,null]
  ```
  
     在JSON的两个方法 - JSON.stringify - 使用JSON.stringify的一些注意事项中,我们说过:
  
  ​        undefined、任意的函数(只要是函数)以及 symbol 值,还有对象的不可枚举属性,在使用stringify()将这以上4个值转为JSON格式文本时,
  
  ​    会被忽略(出现在非数组对象中)或被转换成null(出现在数组对象中)
  
  ​    只要出现4个值中的一个,不论是在**非数组对象的属性名**或**属性值**中,亦或者是**出现在数组中**,则当前的值会**被忽略**或**被转换成null.**
  
  ​    同时所有以 symbol 为属性键的属性都会被完全忽略掉,即便 `replacer` 参数(可能是函数/数组/null以及未提供)中强制指定包含了它们也是没用的.

- ```JS
     let x =  JSON.stringify(
          Object.create(
              null,
              {
                 x:{value:'x',enumerable:false},
                 y:{value:'yo',enumerable:true}
              }
          )
      );
      console.log(x); // {"y":"yo"}
  ```
  
  ​    **请注意不可枚举的属性是会被默认忽略掉的**,也就是x{..}.我们设置它的enumerable属性为false,使x这个属性变得不可枚举,所以它会被忽略.
  
  ​    至于数组的不可能枚举属性呢?不知道,数组有没有这个属性还是问题,就算是有,估计也是被转换成null或被忽略.

- 

## 复杂示例

### JSON.parse()

#### receiver转换器 object:value{ array {object} }

```js
let x = JSON.parse(
  '{
     "employees":[
        { "firstName":"Bill", "lastName":"Gates" },
        { "firstName":"Steve", "lastName":"Jobs" },
        { "firstName":"Elon", "lastName":"Musk" }
      ]
    }',
    function(n,v) {
        console.log(n)
        return v;
    }
);
```

```js
//  上面的代码是无法直接运行的,以下才是可以直接运行的代码.
    let x = JSON.parse('{"employees":[{ "firstName":"Bill", "lastName":"Gates" },{ "firstName":"Steve", "lastName":"Jobs" },{ "firstName":"Elon", "lastName":"Musk" }]}',
    function(n,v) {
        console.log(n)
        return v;
    });
/*
firstName
lastName
0
firstName
astName
1
firstName
lastName
2
employees
        (PS:这里是顶层的属性名,""一个空字符串)
*/
```

这一个示例和简单示例中的某一个很像,即都是将每次遍历的属性输出到控制到中. 至于为什么我还要多此一举的将这个示例归纳为复杂示例.

原因在于"employees"属性的值,并不是一个简单的数组或一个对象组成,而是数组中包含着多个对象的值.

而想要将此JSON字符串解析为JS对象/值,遍历其JSON(对应JS的对象)的属性时,我们发现它们输出的结果并不是简单的直接输出:由里到顶层,最后传入"":"未修改/修改过的解析值",而是会多输出一个属性,或者说数组的索引: 0,1,2...,n.

根据输出的结果,我们不难发现:

​    若有个对象a的属性值包含其他对象b的属性,那么就先用对象b的属性来调用receiver函数,最后对象b的属性都已经调用过一次receiver函数之后,再回头使用对象a的属性依次调用receiver函数,直到顶层.

这个原理依然没失效,因为请注意:

​    employees属性的值是一个数组,而这个数组的每个索引又包含着一个对象,所以程序先使用这个对象的属性调用了receiver函数,接着你以为会使继续调用下一个索引存在的对象的属性了吗?不是的,

​    可别忘记了,数组的索引怎么就不是属性名呢?数组也是对象啊,所以它的索引当然也是属性.

​    所以这时候回头调用的是数组的索引0这个属性名,它的值为索引0的值,整个格式也就是: `0 : { firstName:"Bill", lastName:"Gates" }`

​        *(注意,我这里的key,也就是属性名并没有双引号括起来,因为它们早已经在调用receiver函数之前就被转换成了JS对象.*

​    这样依次类推,就不难解释为什么结果会出现0,1,2..,n这样的输出了.这里我要特别写出最顶层调用此函数得key:value,也就是:

​    "": { employees:[
​                                                { firstName:"Bill", lastName:"Gates" },
​                                                { fi rstName:"Steve", lastName:"Jobs" },
​                                                { firstName:"Elon", lastName:"Musk" }
                  ]}

​    *而且和上面的一样,这里的属性名,也就是key都没有双引号的,因为它们都是JS对象的属性,并不需要双引号*

### JSON.stringify()

#### 使用replacer参数作为函数时

JS对象/值的每个属性都会调用此函数,从顶层一直到底层,依照先后顺序依次调用,没有任何属性的JS对象/值则将直接输出:{},若传入的属性名/属性值有一方/全部为空,则为""空字符串的那方/全部将会输出"",例如 `"":""`, `a:""`, `"":a`

```js
    function replacer(key, value) {
        if (typeof value === "string") {
            return undefined;
        }
        return value;
    }

    var foo = { 
        foundation: "Mozilla", 
        model: "box",
        week: 45, 
        transport: "car", 
        month: 7,
         hobby: {
            sex:"Girl", 
            play:"LOL"
        },
        name: "Yomua"
    };
    var jsonString = JSON.stringify(foo, replacer);
    console.log(jsonString);
```

若没有`typeof value === 'string',`则输出结果为: 

```
{
    "foundation":"Mozilla",
    "model":"box",
    "week":45,
    "transport":"car",
    "month":7,
    "hobby:{"sex":"Girl","play":"LOL"},
    "name":"Yomua"
}
```

**若有的话,`typeof value === 'string',`,则为: {"week":45,"month":7}**

当stringify()的第二个参数为函数时,它接收两个参数:属性名,属性值.

​    *详情解释请看JSON的连个方法 - JSON.stringify() - 语法 - 参数解析 - replacer.*

它也是一次只传入一个属性名和一个属性值,但是**和parse()方法的调用顺序是完全相反**的:

​    首先会传入一个""空字符串作为key,然后JS对象/值本身作为value(在parse()方法中这是顶层,属于最后传入的参数).

​    其次会按照属性的先后顺序进行调用此函数,即使一个属性的属性值是包含着一个对象其中的多个属性以及属性值,依然是按照先后顺序进行调用的.

***详情请看: JSON的两个方法 - JSON.stringify() - 语法 - replacer 可选***

#### 使用replacer参数作为数组时

```js
    // 若第二个参数replacer为一个数组时
    let fooObj, result;
    fooObj = {
        name: "Yomua",
        week: "Wednesday",
        game: "LOL",
        month: "February"
    }
    result = JSON.stringify(fooObj, ['week', 'month']);
    console.log(result); // {"week":"Wednesday","month":"February"}
```

当第二个参数replacer为一个数组时,其意为: 只有存在于此参数数组的JS的对象的属性才能够被序列化成JSON格式文本,其他则被忽略.

​    *请注意:若此参数为数组,那么我们需要序列化的一定是JS对象,而不是JS值,因为对象才有属性,(数组也不能,它没有属性),否则第二个参数数组如同没有,那就毫无意义了.*

*毕竟replacer参数数组指定的是需要被序列化成JSON字符串的属性名*

```js
// 使用第3个参数
let c = JSON.stringify({a: 2}, null, " "/1);
let d = JSON.stringify({a: 2}, null, ""/0);
console.log(c);//'{\n"a": 2\n}'
console.log(c);//'{"a": 2}'
/*
    准确来说,会输出:
        {
         "a":2
        }
    还有:
        {"a": 2}
*/
```

也就是若第3个参数不存在,或者说是为0/"",那么JSON格式文本字符串将不会有任何的空格.

若第3个参数指定了,且在[1,10]闭区间且属于整数的情况下,那么数字为几/有几个空格字符串,那么则代表输出时会出现多少空格.

同时不论有几个空格(只要存在1个),那么{}大括号会自动被使用换行符单独一个行隔出来. 即如以下形式:

​    {                                                                                                                                                                                      ...                                                                                                                                               }

#### 使用toJSON()方法

如果一个被序列化的对象拥有toJSON()方法,那么调用该toJSON()方法时,它的返回值将会覆盖默认的序列化行为,即此方法的返回值会被序列化.

```js
var obj = {
    foo: 'foo',
    toJSON: function () {
        return 'bar';
    },
    name:"Yomua"
};
console.log(JSON.stringify(obj));      // '"bar"'
console.log(JSON.stringify({ x: obj })); // '{"x":"bar"}'
```

当我们序列化obj时,由于此对象拥有toJSON()方法,且它将之调用了,所以序列化obj就如同序列化toJSON()方法的返回值,即序列化"bar"这个字符串,得出: ' "bar" '

当然了,如果你不只是序列化obj,而是将obj当作某个对象的属性值来用,则就像与将toJSON()方法的返回值当作属性值.

也就是序列化{x:obj},就相当于序列化 {x:"bar"},最后得出的结果为: '`{"x":"bar"}`',因为此时obj对象就相当于只有一个"bar"值.

​    **总而言之:一个对象有toJSON()方法且用了此方法,那么这个对象就会变成只有toJSON()方法的返回值,其他什么都没有,也就是此方法的返回值将会替代该方法当前所属的对象被序列化**

# JSON和AJAX

## 二者的区别

JSON是浏览器和服务器之间的一种数据传输格式.

AJAX是浏览器和服务器之间进行交互数据的技术(方式).

## 使用AJAX获取数据然后用JSON解析

若我们从服务器所获取的字符串数据的格式是用JSON语法书写的,那么,我们就可以使用JavaScript内建的JSON函数解析此段数据,将之转为JS对象.

而不像AJAX的XHR对象那样,用服务端的格式去获取数据.

```js
    let xhr;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(this.readyState == 4) {
            let jsobObj = JSON.parse(this.responseText);
            console.log(jsobObj)
        }
    }
    xhr.open(
        "GET",
        "被获取的txt文件.txt",
        true
    )
    xhr.send();
```

成功的将txt文件上JSON数据转为了JS对象,此时我们操作其他就直接使用当作JS对象处理就好了,非常的方便.

如果使纯用AJAX来处理数据,就会显得麻烦一些.

总的来说,怎么好用,用什么.所以我们也可以使用JSONP模式,不仅好用,还能跨域

***如果想看这种一样的,但是却比较复杂的示例,请单击:[w3c](https://www.w3school.com.cn/tiy/t.asp?f=json_html_table_dynamic)***

***或者请看H:\Program Way\Program Workplace\Software\IDEA\Note\JavaScript\study_IDEA1 中的JSON文件.***

# JSON 和 JavaScript 对象的区别

## 对象和数组的区别

JSON:**属性名称必须是双引号括起来的字符串**；最后一个属性后不能有逗号.

## 数值

JSON

- 禁止出现前导零( JSON.stringify 方法自动忽略前导零,而在 JSON.parse 方法中将会抛出 SyntaxError);
- 如果有小数点, 则后面至少跟着一位数字.

## 字符串

JSON: 

- 只有有限的一些字符可能会被转义；

- 禁止某些控制字符； 

- Unicode 行分隔符 （[U+2028](http://unicode-table.com/cn/2028/)）和段分隔符 （[U+2029](http://unicode-table.com/cn/2029/)）被允许 ; 

- 字符串必须用双引号括起来.
  
  例如: `JSON.parse('"yomua"');`
  
  ​    ~~也许使用单引号将true括起来或许不会错,但是根据JSON的语法定义,我们不应该使用单引号,因为始终有可能会出现意料之外的错误.~~
  
  ​    ~~而使用附和要求的""双引号肯定不会出现因为引号而引发的错误.~~
  
  ​    在上面已经有解释过了,上面3上是错误的理解.
  
  ​    JSON字符串必须使用双引号括起来,而不是JSON的参数必须使用双引号

- 请参考下面的示例,可以看到 [`JSON.parse()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) 能够正常解析,但将其当作JavaScript解析时会抛出 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 错误：

# JSON和XML

*PS:这里我们说的只是在读取服务器的数据这一方面,谁更优.*

## 描述

从功能上来看,JSON和XML都可以从web服务器上获取(接收)数据,并且它们二者都要都能被XMLHttpRequest对象所读取.(而且它们也都能作为一个最基本的服务器文件被获取数据)

所以这样看来,它们二者似乎雷同,但是为什么会出现两个功能一样的呢?所以它们看似雷同,实则二者中间肯定有个更有用的.

## 示例

我们来看一个JSON和XML的示例.

### JSON示例

```json
{"employees":[
    { "firstName":"Bill", "lastName":"Gates" },
    { "firstName":"Steve", "lastName":"Jobs" },
    { "firstName":"Elon", "lastName":"Musk" }
]}
```

### XML示例

```xml
<employees>
    <employee>
         <firstName>Bill</firstName>
         <lastName>Gates</lastName>
     </employee>
     <employee>
         <firstName>Steve</firstName>
         <lastName>Jobs</lastName>
     </employee>
     <employee>
         <firstName>Elon</firstName>
         <lastName>Musk</lastName>
     </employee>
</employees>
```

### 总结

从以上两个示例来看,JSON和XML都可以值中有值(也就是都是分级的),它们二者所能被获取到的数据(值)都是一样的,那到底谁更好呢?

请往下看.

## JSON vs XML

### JSON和XML的相同点

- JSON 和 XML 都是“自描述的”（人类可读的）
- JSON 和 XML 都是分级的（值中有值）
- JSON 和 XML 都能被大量编程语言解析和使用
- JSON 和 XML 都能被 XMLHttpRequest 读取

### JSON和XML的不同点

- JSON 不使用标签

- JSON 更短

- JSON 的读写速度更快
  
  只有字符串,而XML需要用到接口和对象等.

- JSON 可使用数组
  
  XML作为一个文档,不存在数组可言

最大的不同在于：

XML 必须使用 XML 解析器进行解析.而 JSON 可通过标准的 JavaScript 函数进行解析.

### JSON和XML谁更好?

先回答: 在读取数据这方面JSON更好,因为:

- XML 比 JSON 更难解析.

- JSON 被解析为可供使用的 JavaScript 对象.

- 对于 AJAX 应用程序,JSON 比 XML 更快更易用

- JSON使用JSONP能轻松跨域,而XML还要借助其他条件.

使用 XML

- 读取 XML 文档
- 使用 XML DOM 遍历文档
- 提取变量中存储的值

使用 JSON

- 读取 JSON 字符串
- JSON.Parse JSON 字符串

## 总结

从以上来看,不难发先,如果在读取数据这一方面,JSON是优于XML的.

当然了,如果是其他方面,XML比JSON强,比如XML可以写页面,JSON明显不同.

所以这里我们说的只是在读取服务器的数据这一方面,谁更优.

# JSONP

## 描述

JSONP:JSON with Patting 或 JSON with Prefix,其意思为:JSON填补/JSON前缀.

通过其字面意思来看,我们就可以看出它的大致作用,即为JSON语法补充一些其他东西.

JSONP是JSON的一种"使用模式",其主要用来解决主流浏览器的跨域数访问的问题.因为由于[同源策略](https://zh.wikipedia.org/wiki/%E5%90%8C%E6%BA%90%E7%AD%96%E7%95%A5)的原因,通常来说,位于server1.example.com的网页无法与 server2.example.com的服务器沟通.

在写AJAX的实例时,就出现过这种情况,还记得吗?不记得的话去看<AJAX.md>.

​    *我需要用浏览器的网页来访问自己的电脑上的文件,但是由于同源策略的原因,我无法访问到,因为我这是跨域请求,所以我修改了浏览器的权限之后才做到可以跨域访问.*

​    *但是显然的,我们不可能让每个用户都去这么做,这会失去用户市场的,别说用户不允许,我们自己也无法允许自己写的脚本这么垃圾啊!*

​    *所以JSONP就是用来解决同源策略的问题的.*

那怎么解决呢?即使用HTML的\<script>元素标签,因为此标签是一个例外,它是一个开放的策略.

​    *(想想也是,因为\<script>可以运行在不同的浏览器的网页上,即使域名不同也可以,不难发现的是,似乎凡是拥有src属性的标签,都拥有跨域的能力,例如: img,iframe等.).不然的话,src属性不能跨域,要src属性干嘛*

**利用\<script>元素标签(这个开放的策略),网页可以得到从其他来源动态产生的JSON格式的数据,而像这样使用JSON的模式(方法),就是我们所说的JSONP.**

- 网页:客户端
- 其他来源:需要获取的数据的服务器上文件的地址.

那到底该怎么获取呢?具体步骤又是什么呢?请看下面的:原理

*注意:使用JSONP这种模式(方法)抓到的数据,其实并**不是JSON格式的数据,**而**是任意的JavaScript数据**,**用JavaScript解释器运行**,而不是用JSON.parse()解析器解析.*

​    *而且\<script>元素标签是可以有多个的,也就是我们完全可以新建1个/多个及以上的\<script>元素标签来作为JSONP模式需要用到的script元素*

​    *忘记了JS的外部引用了吗？我们可以通过\<script>引用一个外部的JS文件,当网页被加载时,此外部JS文件也会同样被加载,被执行*

## 作用

解决因同源策略产生的无法跨域交互数据(访问)的问题.

## 原理

在这里,我将解决描述中的疑惑,即我们该如何利用 \<script>标签从服务器上获取数据,静态的获取和动态的获取都有.

### 描述

如果客户想跨域访问某个地址,那么若使用JSONP模式,我们就需要一个\<script>元素标签,

且浏览器还必须为每一个JSONP要求*(使用JSONP模式的请求,也就是访问/获取服务器上文件的数据)*增添一个新的(或是重用),有用的src属性的值到HTML DOM(web网页)里面.

​    *用标准的意思解释就是: 将\<script>元素标签"注入HTML DOM,详情看:[维基百科](https://zh.wikipedia.org/wiki/JSONP)"*

​    *通常来说,\<script>元素标签中的src属性的值为:需要跨域访问的服务器的地址.*

当浏览器执行外部引用的\<script>元素标签,就会抓取scr属性的值,也就是URL,并运行回传的JavaScript.

​    *(也就是会执行URL中的代码,也就是URL中的代码在这个在外部引用的\<script>当前所属的html文件中是公用的,变量,函数等都是公用的)*

也因此,JSONP模式被称作:是一种"让用户利用script元素注入的方式绕开同源策略"的方法.

### 将本地文件作为服务器地址模拟跨域(跨域+静态)

这也是跨域,详情看<AJAX.md>,从网页跨域到本地电脑,协议都不同,一个http一个ftp.

1. 假设我们有个本地的JS文件,名字为cross-domain.js,还有一行代码.
   
   而这个JS文件目的:就是我们自定义的一个需要获取数据的服务器的地址.
   
   ```js
   // cross-domain.js
   alert("跨域成功")
   ```

2. 我们有一个html文件,名字为: client.html, 然后我们为其引入外部的JS文件,即引入cross-domain.js此文件
   
   注意:此html文件和js文件是同一目录.
   
   此文件的目的:模拟客户端的页面
   
   ```html
   <!-- client.html -->
   <script src="cross-domain.js"></script>
   ```
   
   ​    *忘记了JS的外部引用了吗？我们可以通过\<script>引用一个外部的JS文件,当网页被加载时,此外部JS文件也会同样被加载,被执行*

3. ​    当我们运行client.html文件时,会弹出警告框:"跨域成功",这代表着client.html文件成功调用了cross-domain.js这个URL的代码.
   
   ​    也就代表着我们使用 \<script>是可以进行跨域调用的.

### 使用函数来获取服务器地址的数据(跨域+获取+静态)

1. ​    首先要知道需要获取的服务器上的数据的地址.
   
   ​    假设此服务上数据地址是用我自己的电脑的文件的JS文件来作为服务器地址的话,则为:`methodLoaclFile.js`
   
   ​    且在methodLoaclFile.js(这是我们需要获取数据的服务器的JavaScript)的代码为:
   
   ```js
   // methodLoaclFile.js
   localHandler({"result":"我是远程js带来的数据"});
   ```
   
   ​    也就是当此外部JS文件被加载时,就会执行此代码行(外部JS文件被加载时整个文件都会被执行)
   
   ​    (不用 \<script>是因为remote.js是一个外部引用的JS)

2. 然后创建一个名为getData.html的HTML文件,在里面写一个\<script>,\<script>里面是我们自定义的一个函数,这个函数的目的是被跨域的地址的里面的代码调用,即被服务器的地址上的代码调用.
   
   ```html
   <!-- getData.html -->
   <script>
    function localHandler(data) {
        alert("恭喜你,你已经成功从服务器上获取所需要的数据:" + data['result'])
    }
   ```
   
   /*
   
       请注意这个data参数,它接受的是来自methodLoaclFile.js(即服务器上文件的地址)其中localHandler({..})函数传过来的一个对象参数
       刚才我还不知道这个data['result']是怎么获取来自服务器地址的的数据的呢,也不知道data是什么..现在知道了吧
   
   */
   </script>

```
​        *请别忘记了,外部JS在引用时,将会被执行,且<script>标签的先后顺序是非常重要的,在前面的会先被执行,请注意这一点,*

​            *所以本地的html文件必须要放在"注入\<script>元素标签"之前,JavaScript,这个程序中,存在这么一个函数,可以被调用的函数*

​                *"注入<script>元素": 也就是将我们自己写的<script src="需要获取数据的服务器文件地址">标签放入到客户端中,然后可以让客户端(通常是一个web网页)跨域获取/访问/交互服务器上文件地址的数据的一个<script>元素标签.*

​                *简而言之:写一个可以访问/交互/链接/获取服务器上文件地址的数据的一个<script>元素标签到客户端中(web网页中)*

​        *也就是先执行服务器上地址文件的代码,即会执行localHandler()这个函数,然后外部JS文件methodLoaclFile.js发现自身不存在此函数*

​        *就会去寻找调用它的文件中有无此函数,若有,则调用; 若无,则返回undefined,也就是语法错误:localHandler is not defined*

​        *而且请注意:让<script>的src属性值等于服务器上文件的URL,那么这个<script>当前所属的web网页(文件)将如同拥有src属性值所链接到的文件的所有代码,*

​        *且此链接是动态的,即实施更新的,服务器上文件的代码改变,那么src属性值的URL链接的也是会改变的.*
```

3. ​ 接着自己的客户端中(即存在于本机的html文档中)写一个<script>,设置其src属性的值为:需要获取数据的服务器的地址.
   
   ```html
   <script src="methodLoaclFile.js"></script>
   ```
   
   ​    这个必须放在本地html文件之后,原因是程序都先知道有没有此函数然后在调用,详情看第二点的解释.

4. ​    最后执行getData.html文件,就会弹出: `恭喜你,你已经成功从服务器上获取所需要的数据:我是远程js带来的数据`
   
   ​    这很明显的表明了,我们已经跨域成功,且成功获取到了在其他域上的数据.(从网页→本地)

5. ​    看到这你们也应该明白了,所谓的JSONP模式就是对客户端注入\<script>元素标签,并设置其scr的属性值为服务器的地址URL,
   
   ​    然后让服务器端调用客户端的函数,再让服务器端将自己的数据作为i参数传入到客户端的函数中,
   
   ​    最后客户端的函数再用形参接收此数据,从而就能够获取到来自服务器端传入的数据了.
   
   ​    这是一个很简单的原理:
   
   1. 在客户端注入 \<script>元 素
   2. 服务器端调用客户端函数并将自己的数据作为参数传入到客户端函数中.
   3. 客户端的对应回调函数使用形参接收数据,就能够访问/操作/获取服务器端的数据(不过此形参存的数据是服务器端数据的副本罢了)

6. ​    现在在我们已经成功跨域,且通过URL获取到了服务器上文件的数据了,也知道了JSONP模式是怎么一回事欸立,
   
   ​    但是有一点非常关键,我想你们也已经注意到了:
   
   ​        即服务器上的文件怎么知道要调用客户端的哪些函数?要知道,每一个服务器,并不是只面向一个客户端,它是面向N个客户端的,
   
   ​        而每个客户端它们实现的函数都不尽相同,所以到底该怎么做,才能让一个服务器可以调用多个客户端的函数,从而使客户端能够获取服务器的数据.
   
   ​    请往下看

### 动态的获取服务器地址中的数据(跨域+获取+动态)

1. ​    由于服务器需要调用客户端中的函数,将自己数据作为参数传入到客户端函数中,但是这里出现的问题就是:服务器怎么知道客户端的函数名?
   
   ​    服务器也许不知道,但是聪明的开发者可是不是浪得虚名的.它们立马想到:
   
   ​        服务器端能提供的JavaScript数据是动态生成的(即数据是动态传给客户端的回调函数的),
   
   ​        也就是不管你客户端用的回调函数是什么名字,服务端都都能够用你这个回调函数的名字调用函数,然后向此函数传入数据.
   
   ​        那该怎么做呢?请往下看.

2. ​    创建一个名为`client.html`的文件,里面的代码如下
   
   ```html
   <script type="text/javascript">
       let getDataFunction = function (data) {
           alert('你查询的航班结果是：票价 ' + data.price + ' 元,' + '余票 ' + data.tickets + ' 张.');
       };
       let url = "realTimeUpdateData.js?code=CA1999&callback=getDataFunction";
       let script = document.createElement('script');
       script.setAttribute('src', url);
       document.getElementsByTagName('head')[0].appendChild(script); 
   </script>
   ```
   
   ​        ***代码解析***
   
   - ***let getDataFunction = function(){...}***
     
     ​    这里其实不算是一个函数,只能算是一个存入函数的属性,因为实际上我们无法调用function()这个函数的名字(它是一个匿名函数,即使赋予名字也是无法调用的)*详情请看:<函数.md> - 函数的创建 - 函数表达式*
     
     ​    但是不要紧,我们现在依然将它当作回调函数,因为其作用都是一样的.
     
     ​    这个getDataFunction属性控制一个匿名函数,此函数获取的是服务器上文件的数据
   
   - ***script.setAttribute('src', url);***
     
     ​    调用实现了Element接口的script节点对象,使用setAttribute()方法,为\<script>子节点对象设置src属性,并赋予其值:一个URL,服务器上文件的地址.
   
   - ***document.getElementsByTagName('head')[0].appendChild(script);*** 
     
     ​    返回一个元素名为head的HTMLCollection的通用集合,并选择其中索引为0的值,向其添加一个子结点:script这个变量.
     
     ​    简单来说也就是,把\<script>标签加入\<head>中去.
     
     ​    目的为了使用JSONP模式. 也就是注入\<script>元素.
     
     ​    *具体的注入\<script>元素请看:使用函数来获取服务器地址的数据(跨域+获取+静态)*

3. 创建一个作为服务器的文件,名为:realTimeUpdateData.js,里面代码为
   
   ```js
   let callback;
   // 将URL地址以等号=分隔符分开成一个个数组,遍历此数组
   let shear = url.split('=');
   for(let i = 0; i < shear.length; i++) {
       // 获取最后一个被等号分割的值,此值为回调函数
       if(i = shear.length - 1) {
           callback = shear[i];
       }
   }
   window[callback]({
       "code": "CA1999",
       "price": 1780,
       "tickets": 5
   });
   /** ADD 2020/4/14;以上的操作可能会失败,也可选用以下操作 */
   function call() {
       eval(`${callback}({
           "code": "CA1999",
           "price": 1780,
           "tickets": 5
       })`)
   }
   call();
   // 即调用call()方法之后,使用eval(),它会帮你调用callback方法
   ```
   
   ​        ***代码解析***
   
   - ***let callback;***
     
     ​    此变量准备存入的值是客户端的回调函数的名字,其目的不言而喻:
     
     ​        调用客户端的回调函数,将服务器的数据作为参数传入过去,供给客户端的回调函数访问/操作此服务器的数据
     
     ​    至于怎么将客户端的回调函数的名字存入进去呢?请往下看
   
   - ***let shear = url.split('=');***
     
     ​    这个步骤非常关键,将注入的\<script>元素标签的scr的属性值以=号为分隔符,将=号左右两边分开来,
     
     ​    再将每个被分开的值组合成一个数组,第1个值索引为0,第2个值索引为1,以此类推.
     
     ​    这个目的就是URL中的参数分开,让我们获取URL中的回调函数的名字.
     
     ​    因为通常对于一个URL(网页地址)来说,其前面为协议和域名还有端口(通常可省),后面则是参数:路径(对应不同页面),名字(对应不同的数据)
     
     ​    而且它们都是用=号分割,所以我们这里使用split()方法,也以=分割,这样既能获取路径也可以获取名字,从而向正确的服务器地址提交请求.
     
     ​    同时服务器,也可以根据我们所提交请求到的URL的不同参数,返回给我们需要的数据.
     
     ​        *(比如:客户端向一个URL提交请求,此URL包含了客户端需要获取的数据的地址,*
     
     ​        *然后服务器端根据你这个URL的不同参数,就知道你要准备获取哪个地址的数据,再使用这些参数中的某些参数将数据正确返回给你,*
     
     ​        *因为客户端请求的URL中的参数通常包含着客户端需要接收数据的函数,否则服务端无法动态生成数据传递给它,而这函数就是回调函数.)*
   
   - ***for(let i = 0; i < shear.length; i++) {....}***
     
     使用此循环,遍历以=号分割开来而形成的数组
   
   - ***if(i = shear.length - 1) {callback = shear[i]; }***
     
     ​    将数组中的最后一个索引(也就是URL的最后一个=号的右边,这里通常是函数名)赋值给callback.
     
     ​    这样也就相当于我们获取到了客户端回调函数的名字,通过\<script>的src的属性值URL获取到的.
   
   - ***window [callback]({..}***
     
     ​    非常关键的一步.你们应该已经发现了,这个调用函数好像有什么不同.是的,我们多使用了一个*window[functionName] ().*
     
     ​    这是可以使函数的名字变成变量的一个方法.(目前是这样使用的,网上没有查到什么意思2020/2/20)
     
     ​    因为不将函数名字变成变量的话,而是直接使用callback(){},那么就回调用的是callback()这个函数,而不是callback这个变量所存的函数名字指向的函数.
     
     ```js
     /** ADD 2020/4/14;以上的操作可能会失败,也可选用以下操作 */
     function call() {
         eval(`${callback}({
             "code": "CA1999",
             "price": 1780,
             "tickets": 5
         })`)
     }
     call();
     // 即调用call()方法之后,使用eval(),它会帮你调用callback方法
     ```
     
     - [eval()调用函数](https://blog.csdn.net/heni6560/article/details/88312126)

4. ​    有了html文件,也有了服务器的文件,我们直接执行html文件,那么我们就可以成功获取到服务器文件的数据.
   
   ​    而且不论客户端的回调函数的名字如何,服务器端都能正确将数据传递给客户端的回调函数,也就是服务器端按照客户端的需求动态的生成了JS脚本的数据
   
   ​        (回传一段JavaScript的数据,并根据其客户端的函数的名字动态生成执行函数名,然后调用并传入数据,这不是动态生成,这是什么?).
   
   ​        话说如果是一份JSON文件作为服务器地址,由于JSON不是一个JavaScript程序,所以为了它能在\<script>中运行,
   
   ​        我们需要将JSON数据用函数调用包起来然后动态生成,然后从scr的属性值中返回的就会是一个可执行的JavaScript
   
   ​            *(在纯JSON语法中,可都是字符串,没有函数调用,所以如果我们使用函数调用抱住JSON文件所有数据并动态生成,*
   
   ​            *那么这也就成了正常的JavaScript语句. 而这就是所谓的JSONP(JSON的填充"Padding" 或者说 前缀"prefix")*
   
   ​        那么该如何包起来呢?我想上面的示例已经有了很好的解释,即:
   
   ```js
   window[callback] ({
       "code": "CA1999",
       "price": 1780,
       "tickets": 5
   });
   /** ADD 2020/4/14;以上的操作可能会失败,也可选用以下操作 */
   function call() {
       eval(`${callback}({
        "code": "CA1999",
           "price": 1780,
        "tickets": 5
       })`)
   }
   call();
   // 即调用call()方法之后,使用eval(),它会帮你调用callback方法
   ```
   
   ​        {"code": "CA1999","price": 1780,"tickets": 5}这个JSON格式的字符串形式,
   
   ​        此时此JSON数据被包了起来,被callback()函数指针当作参数传入callback()函数中.而window[callback] ()就是动态生成的表现形式.
   
   ​        我们将{"code": "CA1999","price": 1780,"tickets": 5}这个JSON数据填充(Padding)到回调函数callback中,
   
   ​        那么此时若客户端请求这段数据时,得到的将不会单纯的是一个数据叙述(JSON字符串)了,而是一个JavaScript脚本.
   
   ​        客户端是通过注入\<script>元素 请求数据的:
   
   ​        
   
   ```html
   <script src="realTimeUpdateData.js?code=CA1999&callback=callback";>
      </script>
   ```
- ​    很显然,realTimeUpdateData.js是主文件地址,code后面的(包括code)要么属于路径,
  
  ​    要么就是参数(不同的路径,不同的参数,对应着不同的页面/数据,且往往是唯一的)
  
  **总而言之,所谓的JSONP(JSON填充):**
  
  ​    将服务端JSON数据使用回调函数指针包起来作为参数,传递给客户端对应的回调函数,使客户端能通过此回调函数的形参访问到服务端传过来的JSON数据.
  
  ​    而且因为是函数指针(func(JSON数据){})包起来的,所以不存在因为它不是JavaScript数据而无法执行的情况.(用<script>的src属性抓取到的数据一定是任意的JavaScript数据,否则无法执行)

### 疑惑

或许有人会问,为什么本地客户端就不能直接获取服务器端的数据,而要使用服务器端将数据传递给回调函数指针,然后由客户端的回调函数进行处理传过来的参数? 为什么就这么麻烦呢?

我们就不能直接在客户端获取服务端的数据吗?不是说\<script>的src的属性值URL链接到的地址,就相当于当前\<script>所属的HTML文件也有URL中的代码了吗?

既然这样,我们直接获取服务端的数据就好了呀,为什么还要用回调函数传参数这么麻烦的事情?

想法很不错,但是存在一个很大的问题(和静态跨域获取数据的问题类似,这个问题就是服务器端怎么知道客户端的回调函数名字,然后调用回调函数指针传递数据),

这个问题就是客户端怎么知道服务器端有什么数据呢?用户在使用的时候,通常的操作都是非常简单的,单击,双击,输入账号/密码等,难不成用户还需要知道服务器端代码是如何实现的吗?

况且,作为一个前端开发人员,也不需要了解后端(服务器端)的具体实现,只需要知道一些大概理念和操作,会和后台交互数据就行了,

**所以如果我们直接从服务器端拿数据,就得知道服务器端有什么数据,这是不可能的.**

所以我们就换一种思路,我们向服务器端提出请求,比如:我要xxx数据,请你动态生成这段数据给我,

​    *(动态生成客户端回调函数指针,将我需要的数据找到/生成并传递给回调函数)*

这样我们只需要做两个步骤,即1:发送请求,2:接收数据并处理. 简单吧

这过程中,我们根本不需要知道服务器端到底有什么数据,向服务器端提出一个请求(需求),由它给我. 而不是由我去拿.

这就好比对父母说:我要吃饭,请给我饭,然后父母就做晚饭传给你,你就可以开始吃了.  而不是你直接找到父母,然后说:我开始做饭了,自己做完,然后再吃,父母全程旁观,就等于没有作用,你只是跟他们说了一声而已..

### 将函数调用写在客户端，服务端使用 NodeJS 响应请求（发送函数）

```html
<!-- 客户端 -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<body>
    <button 
            type="button" 
            id="submit" 
            onclick="getmessage()"
    >
        jsonp
    </button>
    <script>
        let jsonp = {}
        //定义生成id用的字符集
        jsonp.char = {
            num: '0123456789',
            letter: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        }
        // 随机一个 id（函数名）
        jsonp.newId = function () {
            let id = ''
            for (var i = 0; i < 8; i++) 
                id +=         this.char
                    .letter
                    .charAt(Math.floor
                            (Math.random() * 52)
                           )
            for (var i = 0; i < 4; i++) 
                id += this.char
                    .num
                    .charAt(Math.floor
                            (Math.random() * 10)
                           )
            return id
        }

        // 将 url 的格式转为：
        // http://www.whyhw.com/jsop?key=value&... 
        jsonp.buildUrl = function (url, key, value) {
            if (url && key && value) {
                var sign = '&'
                if (url.indexOf('?' === -1)) sign = '?'
                url += `${sign}${key}=${value}`
            }
            return url
        }

        // 错误提示
        jsonp.error = function (error) {
            console.error(error)
        }

        // 使用 JSONP 去请求后端数据
        jsonp.req = function (options) {
            if (!options) 
                jsonp.error('options should be no null')
            if (!options.url) 
                jsonp.error('url should be no null')

            //创建id
            var id = this.newId()
            //拼接url
            var url = options.url
            var data = options.data
// 若 option不存在 data 属性，则初始化 data，并赋值为一个空对象
            if (!data) data = {}
            // 为 data 添加属性名：callback，值为 id 变量           
            data.callback = id

            for (var key in data) url = jsonp.buildUrl(url, key, data[key])
            // 为注入 <script> 做准备
            var script = document.createElement("script")
            script.setAttribute('id', id)
            script.setAttribute('src', url)

            var callback = function (result) {
                if (options.ownDefineCallback) {
                    try {
                       options.ownDefineCallback(result)
                    } catch (e) {
                        console.error(e.message)
                    }

                    // 善后工作
                    var tmp = document.getElementById(id)
                    tmp.parentNode.removeChild(tmp)
                    eval(id + '=null')
                }

            }
            console.log(id)
            eval(`window.${id}=function(result){callback(result)}`)
            document.head.appendChild(script)
        }

        /** 单击按钮时触发的函数 */
        function getmessage() {
            jsonp.req({
                // 要使用 JSONP 获取数据的请求地址
                url: 'http://localhost:3000/jsonp',
                // 任意一个处理器，第一个参数为接口响应的数据
                ownDefineCallback: function (result) {
                    window.alert(result)
                }
            })
        }
    </script>
</body>

</html>
```

- **var callback = function (result) {...}**
  
  这个函数的目的是：调用开发者定义的 callback，并传递服务端响应过来的数据
  
  开发者在 callback 中，他只需要知道第一个参数是服务端响应过来的数据即可。

- **data.callback = id**
  
  将随机 id 添加到 queryString 中。后端可以通过 queryString 访问到这个 callback.

- **eval( `window.${id}=function(result){callback(result)}`)** 
  
  注：由于模板语法在这个 markdown 文件中会用以上的形式表现，所以无法体现模板语法的存在，不过现在你应该知道了
  
  ​    执行 eval() 中的字符串参数，且 eval() 的返回值为字符串参数的返回值，若字符串参数未有返回值，则返回 undefined。
  
  ​    由于执行的 eval() 中的字符串参数是一个使用了 动态函数名 的函数声明，
  
  ​    所以当后端调用 ` res.send(req.query.callback(响应的数据))` 并传入参数时，这里使用了 动态函数名 的函数声明就会被执行
  
  *TIPS：res.send() 这个方法是 express 库的（应该是）*
  
  ​    在执行 id 这个函数的函数体中，会调用上面的 callback()，并传入服务端响应过来的数据

- **options.ownDefineCallback(result)**
  
  当这个执行时，其 result 参数就是服务端响应过来的数据，然后将这个数据作为参数传递给 ownDefineCallback 函数，
  
  这样开发者只需要使用第一个参数接收数据，然后在函数体中处理这个数据即可
  
  这样就完成了使用 JSONP 跨域

```js
// 服务端
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
// /* GET home page. */
app.get('/jsonp', function (req, res) {
  //获取查询字符串中的callback属性的值（即：前端随机的函数名：id)
    let callback = req.query.callback
    console.log(callback) // 前台随机的 id ，用来作为函数名
    res.send(`${callback}(11)`)
})
// 监听端口号，当监听的端口使用，则提示用户
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
```

## JSONP和AJAX

从以上的描述和示例来看,我们不难发现,JSONP和AJAX是有一些类似的地方发的,但是也有一些不同的地方.

总的来说,它们二者不是完全相等的.

### 相同点

- JSONP目的:访问服务器的数据
  
  AJAX目的:访问服务器的数据

- JSONP请求:向一个URL请求数据,然后把返回的数据由JS进行处理
  
  AJAX请求:向一个URL请求数据,然后把返回的数据由JS进行处理

所以因为以上的两点,jQuery和ext等框架把JSONP作为AJAX的一种形式进行了封装.但是并不是说它们JSONP是AJAX的自己,就和JSON不是JavaScript的子集一样,它们有不同点,请往下看.

### 不同点

- JSONP的核心是利用<script>注入,并且动态生成数据,而且还可以跨域访问.
  
  AJAX的核心则是通过XMLHttpRequest获取非本页的数据.而且还无法跨域访问.
