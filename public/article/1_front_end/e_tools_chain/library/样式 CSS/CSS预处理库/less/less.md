[TOC]

# less教程连接

[W3C](https://www.w3cschool.cn/less/)

[less中文网](http://lesscss.cn/)

# 描述

## 定义

LESS是一个CSS预处理器,可以为网站启用可自定义,可管理和可重用的样式表. 

CSS预处理器(less)是一种脚本语言,可扩展CSS并将其编译为常规CSS语法,以便可以通过Web浏览器读取.

 它提供诸如变量,函数, mixins(混合) 和操作等功能,可以构建动态CSS.

## 目的

less最主要的目的就是提高CSS的可复用性,易维护性,易读性.

## 为什么要使用less

- less能创建更为简洁的CSS样式,且能以非常容易的方式创建跨浏览器友好(兼容性强)的CSS.
- less使用的是JS设计的,并且创建在live中使用,其编译速度比其他CSS预处理器更快.
- less能让我们的CSS样式模块化,提高CSS的可复用性,易维护性,易读性.

## less缺点

- 如果你是学习新的CSS预处理需要时间。
- 由于模块之间的紧密耦合，应当采取更多的努力来重用和/或测试依赖模块。
- 与旧的预处理器(例如Sass)相比，LESS具有较少的框架，Sass由框架 Compass ， Gravity和 Susy 组成。

# 安装

使用node命令安装: `npm i -g less`

这里使用全局安装,本地安装(我这里)的vscode无法识别,即无法使用less.

# 使用

## 客户端和服务器端使用

安装完成less之后,使用less也非常简单,有两种方式可以使用less,即

1. 在客户端使用,即在开发环境使用,引用less.js来让浏览器自己编译less自己嵌入网页中,这样可以达到一种less热更新的作用.
   
   ```js
    <link rel="stylesheet/less" type="text/less" href="demo.less">
    <script src="less.min.js" type="text/javascript"></script>
   ```
   
   即将: less下载下之后,dist文件中的less.js 或 less.min.js就是了.
   
   但是我们并不推荐在生产环境中使用这种方式,效率慢.

2. 在服务器端使用,即在浏览器环境中使用,通过lessc命令能将less文件编译成css文件,然后就可以正常的使用这个css文件.
   
   `lessc sourceFile.less targetFile.css`
   
   即将sourceFile.less编译到targetFile.css,(注意:targetFile.css只能和.less文件在同一级目录或下一级目录,否则无法编译

## 插件

less是存在插件的,这些插件帮助我们更好的管理网站,即扩展网站的功能,它们使我们更加轻松.

请看: [W3C-插件](https://www.w3cschool.cn/less/less_plugins.html)

# 规则

- less似乎只允许使用类选择器和ID选择器进行一切操作,如Mixins混合和封装,以及扩展等.
  
  不过这两个选择器确实够用了. 你想使用属性选择器也可以,只不过似乎不能进行Mixins操作等.

## less变量

### 变量定义

less中允许定义变量,不过需要使用@符号. 其语法为: `@varName:value;`
即,一个@变量名 + 冒号: + 值.

请注意在每个定义变量的语句后面加上分号,表示一行的结束

`@color:red;`定义一个名字为color的变量名,其值为red.

变量有全局变量和局部变量,全局变量即没有定义在某个属性的样式之类,而局部变量指的是定义在一个属性的变量之内,这个属性只能用于当前属性即嵌套的后代属性中.

如果局部变量和全局变量名字相等,则局部变量会覆盖全局变量(就和一个编程语言一样),这是就近原则的关系(即因为程序从上到下执行)

### 变量插值

变量插值是评估包含一个/多个变量的表达式/文字的过程,产生其中变量用其对应值替换的输出. 即变量可以在less的很多地方中使用,例如:选择器名称,属性名称URL和@importy语句

#### 选择器中使用变量

```less
@ownVar: h2;
@{ownVar} { color: red}
// 等效于
h2 { color:red }
```

- 使用时,要使用@{},这样less才会将之识别为变量

#### url中使用变量

```less
@imageUrl  : "./other/VQBTQHW(P9%@%HTTE@ULCGB.png";
div {
    background-image: url(@imageUrl) ;
}
// 等效于
div {
    background-image: url("./other/VQBTQHW(P9%@%HTTE@ULCGB.png") ;
}
```

#### import语句中使用变量

```less
@path : "//www.w3cschool.cn/less";
@import "@{path}/external1.less";
.myclass{
 color : #A52A2A;
}
// 等效于"//www.w3cschool.cn/less";
@import "www.w3cschool.cn/less/external1.less";
```

- 使用时,要使用@{},这样less才会将之识别为变量

#### 属性名/值使用变量

```less
@my-property: color;
@color:red;
.myclass {
  background-@{my-property}: @color;
}
// 等效于
.myclass {
    background-color: red;
}
```

- 在属性名中使用变量时,若要使用变量则要添加@{}(无论是否是用该变量替换属性名全部/一部分),否则less无法将之识别为变量
  
  但是在属性值中直接使用@name即可,无需添加{}.

### 变量嵌套

less支持一个变量的值是另一个变量,而这另一个变量的值又能使另另一个变量,如此往复.

```less
@col  : #ca428b;
@color: @col;
.myclass {
    color:@color;
}
// 等效于
.myclass {
    color:#ca428b;
}
```

### 变量的延迟加载

即一个变量可以先使用再声明,编译成CSS 或直接由浏览器动态生成时都是正确的.

```less
.myclass {
    color:@color;
}
@color: red
// 等效于
.myclass {
    color:red;
}
```

- 依然被正确编译

### 变量存在作用域

变量有全局变量和局部变量,全局变量即没有定义在某个属性的样式之类,

而局部变量指的是定义在一个属性的变量之内,这个属性只能用于当前属性即嵌套的后代属性中.

如果局部变量和全局变量名字相等,则局部变量会覆盖全局变量(就和一个编程语言一样),这是就近原则的关系(即因为程序从上到下执行)

且如果局部变量名字相同,则后面的局部变量覆盖前面的局部变量的值.无论是多后面. 

即在后面的变量是不会被所谓变量提升的,它依然在后面,只不过是可以先使用在声明罢了. *参见 less混合(Mixins)-不在选择器内部调用Mixins封装实例.*

### 总结

所谓的变量就是使用@varName:value定义的一个类似编程语言中的变量,且拥有一些编程语言中的变量的一些基本用处,如:

可以重复使用, 可以用于url/选择器名,import语句,属性名等,又可以让一个变量的值为另一个变量,以及变量的延迟加载等.

## less父选择器&

### 描述

&符号在less中代表当前父选择器的名字.

```less
a {
  color: #5882FA;
  &:hover {
    background-color: #A9F5F2;
  }
}
//等效于
.a {color: #5882FA;}
.a:hover {background-color: #A9F5F2;}
```

### 多次使用父选择器&

我们可以多次使用父选择器,在使用时可以配上一些其他选择器,如+紧邻同胞选择器等.

只需要记住: &代表的就是(等于)父选择器的选择器名即可.

```less
.select {
  & + & {color: #A9F5F2;}

  & & {color: #D0FA58;}

  && {color: #81BEF7;}

  &, &_class1 {color: #A4A4A4;}
}
// 等效于
.select {
    .select + .select {color: #A9F5F2;}
    .select .select {color: #D0FA58;}
    .select.select {color: #81BEF7;}

    .select,
    .select_class1 {color: #A4A4A4;}
}
```

### &的组合爆炸

这个标题,并不是哗众取宠,而是真实的! 当在一个选择器中使用&符号时,如果父选择器有多个(如:.p , div{...}),则&会将所有的可能取值都列出来:

```less
.p,
div {
    color: red;
    &+& {
        height: 600px;
    }
}
// 等效于
.p,
div {
  color: red;
}
.p + .p,
.p + div,
div + .p,
div + div {
  height: 600px;
}
```

- 如果只有单独的&, 那么其编译结果为:
  
  ```less
  div {
    color: red;
    height: 600px;
  }
  ```
  
  因为单独的&其实仍然代表: .p, div, 所以里面的样式会被合并.

## less支持一个元素的后代和超元素嵌套

即一个选择器中可以嵌套一个子选择器,前提是这个子选择器所在的HTML源码的位置也要是这个超选择器HTML源码所在的位置的子元素.

```less
div {
    header {
        color:red;
    }
}
/* 等效于 */
div header {}
```

代表将所有的div元素的所有后代元素header的前景色改为red.

## less支持四则运算

LESS支持一些算术运算，例如加号(+)，减号( - )，乘法(*)和除法(/)，它们可以对任何数字，颜色或变量进行操

 操作节省了大量的时间，当你使用变量，让感到就像是简单的数学工作。

```less
@fonSize: 10px;
.myclass {
    font-size: @fonSize * 3;  // 10px * 3 = 30px
}
// 等效于
.myclass {
    font-size: 30px;  
}
```

## less转义`~`

- 属性值能进行转义
  
  属性名无法转义,否则出错.

```less
p {
  color: ~"green";
}
```

使用 `lessc sourceFile.less targetFile.css` 命令编译以上文件,我们可以得到一个CSS:

```css
p {
  color: green;
}
```

即,我们得出结论: ~"some_text"中的任何内容将显示为 some_text ,转义符+双引号中的内容,永远在CSS中是等于: 双引号中的内容(不包括双引号)

## when语句

### 描述

when语句用在一个选择器后或一个Mixins封装实例后.其语法为:

1. `选择器名 when(比较expression){}` 
   
   即当when语句的小括号中的比较expression为true时才会将该选择器执行(编译)

2. `选择器名() when(比较expression){}`
   
   即当when语句的小括号中的比较expression为true时才会将该选择器执行(编译)

以上两种用法都是一样的,只不过用于不同的情况罢了,when语句有五种简单的运算符: `<，>，<=，>=和=`,其中除了=号之外的运算符,都只能和数字之间进行比较,否则会被忽略.

且同时我们可以在比较运算符的两边的值进行简单的+-*/计算,

### 示例

#### 用于选择器名后

```less
@fontsize: 100px;
.a when(@fontsize > 10) {
    font-size: @fontsize *10;
}
.b {
    .a;
}
// 等效于
.a {
  font-size: 1000px;
}
.b {
  font-size: 1000px;
}
```

有趣的是,我们可以在比较运算符的两边的值进行简单的+-*/计算,

```
@fontsize: 100px;
.a when(@fontsize * 10 > 10 + 10 ) {
    font-size: @fontsize *10;
}
// 等效于
.a {font-size: 1000px;}
```

#### 用于Mixins封装实例

```less
.a(@width) when(@width * 10 > 100) {
    font-size: @width;
}

.b {.a(100px);}
// 等效于
.b {font-size: 100px;}
```

即意为: 当某个选择器中调用.a这个封装实例时,如果传入的参数*10 大于100[px],则就将此示例中的一切克隆过去(不包过内部的其他子封装实例)

### 逻辑运算符and和not的使用

```less
.a(@width) when(@width * 10 > 100px) and (@width*10 > 100px + 400px) {
    font-size: @width;
}
.b {.a(100px);}
// 等效于
.b {font-size: 100px;}
```

and和not即相当JS中的&&和!, 即逻辑与和逻辑非运算发.以上示例的意思为:
传入给.a封装实例的@width变量,如果*10 > 100px 和 * 10 > 100px +400px,此封装实例内部的实现才能被调用执行.

逻辑非也是差不多样子使用,只不过意思变成了 如果 @witdh*10不大于100px才执行内部实现, 即相当于 `!(@width * 10 > 100px)` or 
`(@width * 10 ><= 100px)`

and和not连个逻辑运算符的使用是非常简单的,当然它们二者也能用于普通的选择器: 
`#y when not (expression) and (expression) not (expression) {...}`

- less语法实现这个的目的在于,可以更好的进行组合条件的使用,从而保证其封装实例or选择器能用到正确的地方.

## less混合(Mixins)

- Mixins混合相当于克隆,和less扩展(extend继承)是不一样的,前者将但其他选择器中的一切克隆到当前选择器中
  
  后者将当前选择器继承(放)到其他选择器上

- Mixins：A 的一切都给 B
  
  exnteds：A 继承 B  的一切

### 将一个选择器中的所有内容给另一个选择器

less语言中的混合指的是将一组CSS样式,使用类名/ID名的方式用于另一组CSS样式, 若此若做,后者将拥有前者的全部属性.

```less
.myclass {
    .div; // 使用 Mixins
}

.div {
    display        : grid;
    justify-content: space-between;
    span {
        height:600px;
    }
    align-items: baseline;
}

// 等效于
.myclass {
  display: grid;
  justify-content: space-between;
  align-items: baseline;
}
.myclass span {
  height: 600px;
}
.div {
  display: grid;
  justify-content: space-between;
  align-items: baseline;
}
.div span {
  height: 600px;
}
```

**很明显的,请看less语言写的css:** 

​    类名包含myclass这组词*(.myclass 相当于 p[class~=myclass])*的元素将获得.div元素自身的一切样式,还会获得所有的.div元素的后代元素,包括后代元素的后代元素.

请看less编译成css的样式:

​    很明显的,在上面我们说的是正确的, .myclass有着.div的所有属性,同时也有其后代元素span, 此时形成了一个新的元素: `.myclass span`,即.myclass元素下的所有的span元素.

​    同时less中的.div元素也被转换成了两个元素, .div和.div span. 因为CSS可不允许嵌套元素. 

请看以上示例,css的.div选择器中并不会包括其后代span元素的height:600px;

### mixins中还能包含伪元素/伪类

```less
a {
    .b;
    height: 600px;
}

.b {
    &:hover {
        background-color: black;
        color           : red;
    }

    color: black;
}
// 等效于
a {
  color : black;
  height: 600px;
}
a:hover {
  background-color: black;
  color           : red;
}

.b {
  color: black;
}
.b:hover {
  background-color: black;
  color           : red;
}
```

- & 代指当前此符号处于的超选择器名.

通过以上示例,我们能轻松的发现,less语言中的a选择器混合b选择器时,将拥有.b自身所有CSS样式以及.b的所有后代元素,包括伪元素和伪类.

所以被编译成css时为: a , a:hover , 当然了less语言中的.b选择器也会被编译成两个选择器,即: .b, .b:hover.

### 使用mixins时可以指定选择哪个选择器下的所有样式(命名空间)

- 官方称之为: Mixins命名空间

使用mixins时可以指定选择器下的所有样式,而不是只能选择超选择器(父选择器),即我们可以指定某个选择器得到某个选择器下的子选择器中的一切(包括选择器)

```less
#a {
    color: red;
    .aa {
        background-color: gray;
        width           : 100px;
        .aaa {
            display: grid;
        }
    }
    .aa {
        height: 100px;
    }
}
.b {
    #a>.aa;
}
// 等效于
#a {
  color: red;
}
#a .aa {
  background-color: gray;
  width: 100px;
}
#a .aa .aaa {
  display: grid;
}
#a .aa {
  height: 100px;
}

.b {
  background-color: gray;
  width: 100px;
  height: 100px;
}
.b .aaa {
  display: grid;
}
```

很明显的,我们发现less语言中的 `.b {#a>.aa;}`样式中的: #a>.aa, 表示选择#a选择器下的直接(所有)子选择器.aa, 并将此子选择.aa下的所有内容(包括它里面本身的子选择或伪元素等)都克隆给选择器.b.

克隆规则照旧不变,即先克隆.aa本身的属性给.b,然后若.aa有子选择器,则一并克隆给.b,如: .b .aa的子选择 等.

然后再将#a选择器CSS属性包括器以下的子选择器解析成CSS即可.

### 受保护的命名空间(when语句)

即可以让某个选择器使用when语句来判断,小括号中的内容为真时才执行选择器的里面的样式,否则不执行.

```less
@color: blue;
#a when(@color = blue) {
    height: 600px;
    #b;
}
#b {
    color: red;
    #bb {background-color: gray;}
}
// 等效于
#a {
  height: 600px;
  color: red;
}
#a #bb {background-color: gray;}
#b {color: red;}
#b #bb {background-color: gray;}
```

即当@color的变量为true时,才会执行#a选择器下的样式,包括Mixins.

如果@color不为blue,则#a选择器以及里面的样式将被完全忽略,不会被less编译.

需要注意的是:如果@color不存在,编译时会报错,即:NameError: variable @color is undefined . less不允许使用未定义的变量.

### Mixins封装和when语句(Less Mixin Guards)

即我们既可以在一个选择器使用when语句,也能将when语句用于Mixins封装实例中.

### !important关键字

!important参见: <h5_css_js.doc> 

在less中的!important关键字和css中的!important关键字是一样的效果的,不过这里我们需要特别说明,如果将!important用于Mixins中,

即用于将一个选择器a中的一切克隆给另一个选择器b,如果b在使用Mixins时,使用了!important关键字,则得到的克隆的样式后都会声明!important关键字. 

包括其克隆过来的子选择器中的所有样式.

```less
#a {
    color: red;
    #aa {
        background-color: gray;
    }
}
#b {#a !important;}
// 等效于    
#a {color: red;}
#a #aa {background-color: gray;}

#b {color: red !important;}
#b #aa {background-color: gray !important;}
```

请注意#b和#b #aa两个选择器,它们其中的样式属性都都在其值后声明了!important关键字.

所以在将!important关键字用于Mixin时要小心这一点.

### less不输出Mixins封装

就是Mixins封装,在选择器后面添加()小括号,less编译器将不会把此选择器()编译成CSS代码

```less
.a(){
  padding-left: 100px;
}
.myclass{
  background : #64d9c0;
  .a;
}
// 等效于
.myclass {
  background: #64d9c0;
  padding-left: 100px;
}
```

需要注意: 不管`选择器名字(){}`这样的形式出现在less的哪个位置,都不会被编译,包括里面的一切.

```less
.class1 {
    height: 600px;

    .class2 {
        width: 600px;

        .val(@param) {
            font-size       : @param;
            color           : green;
            background-color: gray;
        }
    }
}
.myclass {
    .class1>.class2>.val(20px);
}
// 等效于
.class1 {
  height: 600px;
}
.class1 .class2 {
  width: 600px;
}
.myclass {
  font-size: 20px;
  color: green;
  background-color: gray;
}
```

我们可以很清楚的通过以上实例发现,`.val(@param) {..}`并不会被编译,这是因为它成为了Mixins封装,而且不论它在哪里都不会被编译,这是一个很重要的点.

### Minxins可以具有多个参数(Mixins封装)

- Mixins封装允许多个相同名字的Mixins封装实例,这很正常,就好像我们能在CSS中一样可以写多个相同名字的选择器一样.

这是什么意思呢?就是说**可以将一个选择器当作类似函数来使用,即将一个选择器封装作为需要复用的CSS样式,然后为其定义"参数",以及封装选择器内部的实现,**

​    *(参数可以使用key:value的形式指定其默认值,只要传过来的值严格===undefined,则此默认值就会被使用.)*

**然后在另一个选择器执行Mixins操作,就能成功将这个封装选择器的一些克隆给当前选择器了(包括子选择器).**

```less
.border(@width, @style, @color: black) {
    border: @width @style @color;
    color : red;

    .a {
        height: 600px;
    }
}

.myheader {
    .border(2px, dashed);
}
// 等效于
.myheader {
     border: 2px dashed black;
}
.myheader .a{
     height: 600px;
}
```

此时`.border(...){...}`已经变成了类似于函数封装的那种封装选择器,只要有某个CSS元素需要使用和.border这个选择器中一样的css属性,但是希望自己指定值,就可以使用.border这个封装的选择器.

而且**更为优秀的是,封装的选择器是不会被编译成CSS样式的**,即`.border(...){...}`无法出现在CSS样式中,只有调用此Mixins封装的选择器才会被编译.

- PS:Mixins封装的参数中,可以使用分号;或逗号,分割参数,其结果是等效的,也允许分号和逗号一起使用,不过分号通常是用来分割不同意义的参数值.

### 调用Mixins封装时指定向哪个参数传参

也就是在某个选x择器中,调用一个封装的选择器时,我们可以指定将某个值传递给哪个参数,这样我们就可以不管参数传递的顺序是什么了.

我们用以上的例子(Mixins封装中的例子),只不过改变一下"实参"的形式.

```less
.border(@width, @style, @color: black) {
    border: @width @style @color;
    color : red;

    .a {
        height: 600px;
    }
}
.myheader {
    .border(@width: 20px, @style: solid, gray);
}
// 等效于
.myheader {
    border:20px solid gray;
    color:red;
}
.myheader .a {height:600px}
```

虽然less语法这样子看上去似乎有点复杂,对比CSS而言好像代码更多,但是请不要忽略了这种Mixins封装的复用性以及易维护性和可读性.

这里,我们**将.border选择器封装成了一个"函数",并让之接收3个参数,其中最后一个参数指定其默认值,然后在其选择其内部将这三个形参赋值给border属性.**

**然后我们再在.myheader选择器上使用Mixins封装的函数,并向其传递三个参数,其中两个参数指定了属性名,也就是官方所讲的: 命名参数.**

这样做的好处在于,我们不需要在使用Mixins封装时,去让实参刻意迎合封装选择器中的形参位置(如果不可以迎合,则会造成选择器内部在匹配变量时造成的值的错误:

```less
.border(@height, @style, @color: black) {
    height: @width;
}
.myheader {
    .border(solid, 20px, gray);
}
// 等效于
.myheader {
    height:solid; // 这是个错误的值.
}
```

现在传递参数时,直接在实参中指定要将此值赋值给哪个形参变量即可.

需要注意的是:实参的写法要和形参的写法一样,即它们的名字要一样,毕竟Mixins封装并不是真正的函数,只是类函数形式,要写成: @varName:value.

还需要注意的是: 传参时,若传过去的**实参的个数大于形参能接收的个数,则多余的实参会被忽略,即使是用以下的@arguments变量也没用.**

### @arguments的使用

和JS本身自带的arguments的对象类似但却不同,less语法中的@arguments的概念也是能获取到所有**形参的个数**,即将形参全部存入@arguments变量中.

```less
.a(@width, @height: 600px, @color, @bc: gray) {
    width           : @width;
    height          : @height;
    background-color: @bc;
    color           : @color;
    box-shadow      : @arguments;
}

.b {
    .a(@color: red, @width: 600px)
}
// 等效于
.b {
  width: 600px;
  height: 100px;
  background-color: gray;
  color: red;
  box-shadow: 600px 100px red gray;
}
```

一些常识就不说了,让我们关注less语法中的:`box-shadow: @arguments;`
我们可以很明显的发现,这里的box-shadow属性使用的@arguments变量,其意为:

将该Mixins封装中的参数全部依次赋予box-shadow属性,作为其属性值. (至于这些属性哪个不能作为box-shadow属性的值,不在less语法考虑访问,除非你使用了受保护的命名空间(即when语句)或一些其他办法.

### @rest...的使用

是的,你没看错,less语法中真的什么都可以啊,竟然还存在ES6中的剩余参数*(参见<展开语法.md>&<变量的解构赋值.md>)*.
只不过在less语法中,剩余参数有两种写法: 

1. `...`
2. `@rest...`

这两种写法在使用和概念上都是等效的,而剩余参数的作用还需要说吗?当然是接收余下的所有实参传递过来的参数,且只能写在参数的最后一位,否则无法编译成CSS样式(因为他是剩余参数).

**剩余参数只能用在Mixins封装实例的形参中**,无法用在实参中,也无法用于给属性的赋值等.

所以@rest...或...通常和@arguments变量一起使用,即将所有余下的参数都赋值给一个属性.

```less
.a(@width, @rest...) {
    width: @arguments;
}
.b {
    .a(100px, 200px, 300px, 400px, 500px)
}
// 等效于
.b {width: 100px 200px 300px 400px 500px;}
```

以上的示例,就是我们前文讲到的那样:@rest...或...通常和@arguments变量一起使用,即将所有余下的参数都赋值给一个属性.

- PS:这里的`@rest...`可以替换为`...` ,这样更为的简洁.

### Mixins封装实例的模式匹配

即如果有相同名字的Mixins封装实例,那么我们该如何区分相同名字的Mixins封装呢? less语法给了我们答案: 通过模式匹配就可以选择指定的Mixins封装(此方法在普通情况下也适用)

*我们可以把模式匹配理解为Java中相同名字但却不同参数的有参构造函数,我们知道,在Java中,有参构造的名字是相同的,*

*将他们区分开头的标志在于其参数个数和参数类型的不同,这样我们调用其有参构造然后指定参数类型和参数个数,就可以调用指定的有参构造函数了.*

其模式匹配也基于这个原理,只不过更为简化罢了,less语法的模式匹配:

​    是使用**赤裸裸的不加双引号的纯字符串(英文+数字+横线- + 下划线_/纯英文/纯数字)**去匹配的,即在**实参的单位**(600px,1in)**和变量之前**(@var:100px),使用不加双引号的字符串去**匹配Mixins形参中的同样位置的字符串.**

​    且更为好的是,这个模式的匹配可以更加的精准,即可以使用多个被分割(,/;)的不加双引号的字符串去进行模式匹a配.

```less
.a(border-left1, 100; ...) {
    border-left: @arguments;
}

.a(border_right1, 100; @border-right) {
    border-right: @border-right
}
.b {
    .a(border_right1,100; 100px);
}
// 等效于
.b {
    border-right:100px;
}
```

- ***border-left1, 100;***
  
  ​    需要被匹配的模式,调用此Mixins封装实例时,需要先写入需要匹配哪个实例的模式,这样就能指定应用哪个Mixins封装.
  
  ​    我们可以使用`英文+数字+横线- + 下划线_/纯英文/纯数字`等这类形式(好像只要不是特殊字符就可以),书写Mixins封装实例中需要被匹配的模式的内容.
  
  ​    需要被匹配的模式的内容可以有多种,通常以逗号分隔,分号也行,但不建议,因为我们常使用分号来作为不同类型的参数之间的分隔符.
  
  ​    即如以上示例:  `border-left1, 100; ...`  使用分号;分割被匹配的模式和接收实参的形参. 同时不同意义之间的形参也能使用分号分隔,这样通俗易懂,且易于阅读.

- ***.a(border_right1,100; 100px);***
  
  ​    使用Mixins封装中写的模式内容,去指定我们调用哪个Mixins封装实例,其顺序和内容要和Mixins封装实例中的模式内容要一摸一样,否则无法编译,
  
  ​    且注意: **这里说的一模一样,包括Mixins封装实例中的以逗号分割还是以分号分割的逗号,和分号; 都要一摸一样,否则也无法编译.**

### Mixins封装实例的返回值

所谓的返回值也就是利用Mixins混合功能,让Mixins封装实例内部使用属性时,让该属性的值变成形参(变量),这样在一个选择器中调用此Mixins封装实例并向之传入参数时,就能得到一个值为动态的属性.

```less
.a(@x) {@bgcolor: @x;}
.b {
    .a(red);
    background-color: @bgcolor;
}
// 等效于
.b {
    background-color:red;
}
```

- .b选择其中调用.a(red); 相当于:
  
  ```less
  .b {
      @x:red;
      @bgcolor:@x;
      background-color:@bgcolor
  }
  ```

以这样的形式,达到类似于让一个Mixins封装实力具有所谓的返回值,即调用封装实力就返回给我们一个变量.

其实就是利用了Mixins混合本身就有的功能而已,即使用Mixins混合会将一个选择器中的一切克隆到当前使用Mixins混合的选择器当中罢了.

### 嵌套的Mixins封装实例

即我们能在一个Mixins封装中嵌套Mixins封装,且不限个数,这就相当于JS中的函数嵌套函数一样,同样的变量是存在作用域,但是我们知道,超函数的变量可以用在子函数的内部,less语法中嵌套的Mixins封装也是如此.

```less
.a(@value) {
    .aa() {
        font-size: @value;
    }
    width:@value;
}

.b {
    .a(30px);
    .aa;
}
// 等效于
.b {
    width:30px;
    font-size:30px;
}
```

**我仍还需要再提醒你们几句:**

​    即Mixins封装实例并不会被编译,不会被编译,不会编译,它就如同一个调用的API一样,我们调用且传值,然后Mixin封装实例将结果反馈给我们.

即将它存在的一切样式反馈给我们(包括子选择器),但是Mixins封装实例嵌套的**另一个Mixins封装实例,可不在反馈的范围**,

因为这另一个Mixins封装实例也是一个API,需要调用才能使用,只不过这个API能使用它的超API的变量罢了.就如同以上示例一般.

### 将Mixins封装实例封装到一个规则集(变量)中

即**我们可以将多个相同/不同意义的Mixins封装实例,又再一次进行封装,让这些Mixins封装实例在一个规则集中**,然后如果要**使用的话:**

​    **只需要调用一次规则集再调用所需要Mixins封装实例**,就可以将Mixins封装实例正常的使用.

​    需要注意的是:调用规则集时要使用()小括号,以和定义变量的形式区分开来.

至于为什么要将Mixins封装实例封装到一个规则集(变量)中,这是因为为了更加的抽象,即**为了更加的简洁以及封装,让我们更容易地维护**.

- 所谓的封装到规则集中,就是**封装到一个变量中,所以要使用类似`@varName:`这样的形式**,但是不同的是**value要加大括号**,表示这个变量是一个规则集.

```less
@detached-ruleset: {
    .x() {
        font-family     : "Comic Sans MS";
        background-color: #AA86EE;
    }

    .y(@display: none, @justify-content: start) {
        display        : @display;
        justify-content: @justify-content;
    }
}

.cont {
    @detached-ruleset();
    .x();
    .y(grid, space-between);
}
// 等效于
.cont {
    font-family     : "Comic Sans MS";
    background-color: #AA86EE;
    display        : grid;
    justify-content: space-between;
}
```

所以从以上示例来看,规则集这个东西还是很有用的不是吗,如**果我们给规则集好好取一个名字,那么在后期维护时,**

**我们一看这个规则集的名字就知道这个规则集中包含了什么样的样式,从而更快的维护或修改不是吗?**

### 不在选择器内部调用Mixins封装实例

即我们不一定需要在某个选择器内部调用Mixins封装实例,或许你可能会问:封装实例又不会被编译,这要调用有什么意义吗? 

这句话对也不会,在前文中,我们讲过: Mixins封装实例是不会被编译的,它里面的子封装实力也是如此,但是如果它里面的是1个/多个选择器呢? 

当然就会被编译啊,因为只有Mixins封装实例不被编译,选择器这种依然会被编译,即使它处于一个Mixins封装实例中.

```less
@usedScope: global;
.mixin() {
    @usedScope: mixin;
    .cont when (@usedScope=global) {
        background-color: red;
        color           : black;
    }
    .style when (@usedScope=mixin) {
        background-color: yomua;
        color           : yomua;
    }
    @usedScope: global;
}
.mixin();
// 等效于
.cont {
    background-color: red;
    color           : black;
}
```

上述示例由于里面的局部变量覆盖了全局变量,且后面的@usedScope: global;变量覆盖了开头的@usedScope: mixin;局部变量,

这就导致@usedScope为global,所以此时.cont会被编译成CSS样式,其余则会被忽略.

这个示例也告诉我们,在后面的变量是不会被所谓变量提升的,它依然在后面,只不过是可以先使用在声明罢了.

### 总结

**所谓的Mixins混合**,即将一个选择器中的一切都克隆给调用Mixins的选择器.

而**Mixins封装就更为简单了**,即创建一个可复用的"选择器函数",然后在其他选择器中调用此函数[并向其传递参数/指定了确切传递给哪个(形参)变量的参数], 

从而将选择器函数中的一切都克隆到当前选择器(包括子选择器),而选择器函数却不会被编译.

**最后就是**Mixins封装实例中的模式匹配了,就是在实例中指定一个匹配模式,然后在其他选择器中调用Mixins封装时,需要先写和实例中的匹配模式包括分隔符一模一样的内容,然后在正常的传递参数即可.

​    这个模式匹配的目的在于:当有2个及以上的Mixins封装实例的名字一样时才使用这种模式匹配,当然了你也可以直接使用,但没有意义.

至于@resst.../...参数和@arguments变量的使用,就和它们在JS中的概念类似.

- @resst.../...: 只能放在形参中的最后一位,接收实参中余下的所有参数
- @arguments: 存放的是形参中的所有变量/单位(100px),并不存在匹配模式.

## less的导入

和CSS的导入类似,即使用@import语句可以将一个less文件,导入到另一个less文件中,并能使用里面的变量等,即相当于把导入的文件书写在被导入的文件里面.

```js
// a.less 文件
.myclass{
    color: #FF8000;
}
.myclass1{
    color: #5882FA;
}
// b.less文件
.myclass2 {
    color: red;
}
// 将a.less文件导入到b.less文件
@import "./a.less" 
// 此时若将b.less文件进行编译成css文件,得到以下CSS文件
.myclass{
    color: #FF8000;
}
.myclass1{
    color: #5882FA;
}
.myclass2 {
    color: red;
}
```

很明显的我们可以发现,less语法中也支持@import语句,且也是依然把导入的文件中的样式直接全部放到被导入文件的最前面.(<link />这样的形式也是如此.)

而且如果你使用import语句时,它可以导入不同文件,具体的取决于文件的扩展名:

- @import "style";      // imports the style.less 
- @import "style.less"; // imports the style.less 
- @import "style.php";  // imports the style.php as a less file 
- @import "style.css";  // it will kept the statement as it is

### @import导入选项

参见: [W3C](https://www.w3cschool.cn/less/less_import_options.html)

## less扩展(extend继承)

- Mixins混合相当于克隆,和less扩展(extend继承)是不一样的,前者将但其他选择器中的一切克隆到当前选择器中
  
  后者将当前选择器继承(放)到其他选择器上

- Mixins：A 的一切都给 B
  
  exnteds：A 继承 B  的一切

所谓的less扩展就是让一个选择器使用extend伪类去继承另一个选择器的样式.

```less
#a {
    font-size: 100px;
    &:extend(.b);
}
.b {color: red;}
// 等效于
#a {font-size: 100px;}

.b,
#a {
  color: red;
}
```

- 请注意#a中的 &:extend(.b); 其意思为: 让#a这个选择器继承.b选择器的样式,就在.b这个选择器上,写个#a → .b, #a{...}
  
  怎么样,是不是非常简单.

由于我们说过扩展就是使用extend伪类继承另一个选择器的样式,所以extend自然可以直接用到选择器上,而且需要注意,我们可以在extend()括号中添加多个选择器,让指定的选择器去继承它们.

```less
#a:extend(.b, #c) {font-size: 100px;}
.b {color: red;}
#c {height: 600px;}
// 等效于
#a {font-size: 100px;}

.b,
#a {
  color: red;
}

#c 
#a:{height:600px}
```

从以上示例中,我们能轻松的出一个结论:使用less扩展(继承)extend(继承)时,当前使用:

​    extend()伪类的选择器,将会写到()小括号中指定的选择器上,并用逗号,的形式分割,且调用extend()的选择器是写到指定的选择器的的下面的.

## less函数

### 类型检查函数isxxx()

isxxx(); 代表当前小括号中的内容是否是xxxx.

- iscolor
- isnumber
- isstring
- iskeyword
- isurl

以下函数检查值是否在特定单位中

- ispixel
- ispercentage
- isem
- isunit

```less
.a(@color) when (iscolor(@color)) {
    color: @color;
}

.b {
    .a(red);
}
// 等效于
.b {color:red;}
```

- 如果以上的示例中,.b选择器调用.aMixins封装时,传入的参数不为颜色color参数,则.a()就如同没调用一般, .b选择器中的其他代码依然会被编译.

### [字符串函数](https://www.w3cschool.cn/less/less_string_functions.html)

### [列表函数](https://www.w3cschool.cn/less/less_list_functions.html)

#### length(list)

##### 描述

得到指定的(以逗号/空格分割)列表的长度(integer),不会存在任何单位.

索引从1开始计算.

##### 参数解析

###### list

一个以逗号或空格分割的列表.

##### 示例

```less
p {
    @list    : 10px 20px 30px 40px;
    @val     : length(@list);
    font-size: @val;
}
// 等效于
p {
    font-size:4
}
```

#### extract(list, index)

##### 描述

选择指定的list列表中的第index位置的值,然后将之返回.

##### 参数解析

###### list

一组以逗号或空格分割的列表(值)

###### index

索引.指的是list中的索引,其最开头为1,不是0.

如果指定0为list列表中的索引,则其结果返回:**extract(list列表本身,0)**,这是固定的返回值.

##### 示例

###### 以空格分割指定index为1

```less
p {
    @list    : 10px 20px 30px 40px;
    @val     : extract(@list, 1);
    font-size: @val;
}
// 等效于
p {
    font-size:10px
}
```

###### 以空格分割指定index为0

```less
p {
    @list    : 10px 20px 30px 40px;
    @val     : extract(@list, 0);
    font-size: @val;
}
// 等效于
p {
    font-size: extract(10px 20px 30px 4
}
```

### [数学函数](https://www.w3cschool.cn/less/less_math_functions.html)

### [类型函数](https://www.w3cschool.cn/less/less_type_functions.html)

### 颜色相关

#### [颜色定义函数](https://www.w3cschool.cn/less/less_color_defination_functions.html)

#### [颜色通道函数](https://www.w3cschool.cn/less/less_color_channel_functions.html)

#### [颜色操作](https://www.w3cschool.cn/less/less_color_operation.html)

#### [颜色混合函数](https://www.w3cschool.cn/less/less_color_blending_functions.html)

## less循环

即使用Mixins封装实例配上when语句,然后在内部再调用当前Mixins封装实例,然后传值,判断值是否小于/大于/小于等于/大于等于什么的,就继续执行,否则停止.

```less
.a(@width) when (@width <=50) {
    .a(@width + 10px);
    width   : @width;
}

.b {.a(10px); // 执行5次循环}
// 等效于
.b {
  width: 50px;
  width: 40px;
  width: 30px;
  width: 20px;
  width: 10px;
}
```

- ***.a(@width + 10px);***
  
  调用当前.a封装示例, 并向其传入@width+10px此动态实参.
  
  配合上when (@width <=50)语句,我们就可以实现,循环调用less的Mixins封装实例.

循环只能用于Mixins封装中,无法使用在普通的选择器上,因为无法调用当前选择器并复制,就无法做到让普通选择器自己迭代.

## less合并

即使用一个Mixins封装实例和调用此实例的选择器,将Mixins封装实力中和该选择器中相同的属性值通过 `+ 或 +_`符号进行值合并, 其中 `+`代表合并时以逗号,分割, `+_`代表以空格分割.(将合并符号放到属性名的后面,冒号的前面)

在合并时,Mixins封装实例的值会被移动到当前属性的值的最前面,选择器中的属性的值会被移动到最后面.

且合并时,会将逗号这种分隔符也一并合并到对应的位置.

​    *并且less的选择器内部使用合并符号时,可能会被提示: Unknown property,但是这没什么大不了的,依然能合并.*

且以这样的方式可以将选择器内部和Mixins封装实例内部多个相同的属性的值进行合并, Mixins封装实例中先写的属性值会被排在最前面,以此类推,直到选择器中的属性的值.

```less
.myfunc() {
    box-shadow+_: 5px 5px 5px grey;
    box-shadow+_: yomua, yomua;
}

.class {
    .myfunc();
    box-shadow+_: 0 0 5px #f78181;
}
// 等效于
.class {
    box-shadow:5px 5px 5px grey yomua, yomua 0 0 5px #f78181;
}
```

值得一提的是: 我们可以混用合并符号,即 `+` 和 `+_`符号一起使用,不过需要注意,它们一个以逗号分隔,一个以空格分割.

```less
.myfunc() {
    box-shadow+_: 5px 5px 5px grey;
    box-shadow+ : yomua yhw;
}

.class {
    .myfunc();
    box-shadow+: 0 0 5px #f78181;
}
// 等效于
.class {
box-shadow: 5px 5px 5px grey, yomua yhw, 0 0 5px #f78181;
}
```

对于使用 `+`合并符号的那个属性来说,它的前后位置都会使用逗号进行分割,除非它是在属性的值的最前面或最后面,

那么此时它只有1面会使用逗号进行分割,因为最前面的不孕使用逗号,最后面又只能使用分号.

# 使用less时的技巧和注意点

- 在使用简写属性,如:grid等,需要设置斜杠/ 时,如果直接写会报错:
  
  ```less
  .restGrid(@rows: none, @columns: none) {
      grid: @rows / @columns;
  }
  div {
      .restGrid(@rows: 1fr 1fr 1fr);
  }
  ```
  
  ​    这样写会报错: `SyntaxError: Operation on an invalid type in '你的当前文件路径'`,即提示你无法这样子操作,操作无效.
  
  ​    所以为了能正常的在less中使用 诸如/斜杠这一类的特殊字符,需要使用less自带的转义符号 `~`,进行转义,改成类似以下形式:
  
  ​    
  
  ```less
  .restGrid(@rows: none, @columns: none) {
      grid: @rows ~"/" @columns;
  }
  div {
      .restGrid(@rows: 1fr 1fr 1fr);
  }
  
  // 等效于
  div {
    grid: 1fr 1fr 1fr / none;
  }
  ```
  
  ​    这样就可以编译,不会报错,且单双引号都可以,且转义符号 `~`还可以用在传值的时候.
  
  ```less
  .restGrid(@areas: "1 1 1"1fr  " 1 1 1"1fr  "1 1 1"1fr ~"/" 1fr 1fr 1fr);
  ```

- Mixins封装实例如果有多个参数,若你调用此封装实例,只选择部分参数,那么除了第一个参数,其他都要设置默认值.
  
  ```less
  .restGrid(@rows: none, @columns) {
      grid: @rows ~"/" @columns;
  }
  div {
      .restGrid(@rows: 1fr 1fr 1fr);
  }
  /**
  RuntimeError: No matching definition was found for `.restGrid(@rows:1fr 1fr 1fr)`
  即当前的封装实例无法调用
  */
  ```
  
  ​    出错的原因就是因为我们没有为多个参数使用默认值,只需要重新设置默认值就可以编译通过.
  
  ```less
  .restGrid(@rows: none, @columns: none) {
      grid: @rows ~"/" @columns;
  }
  div {
      .restGrid(@rows: 1fr 1fr 1fr);
  }
  
  // 等效于
  div {
    grid: 1fr 1fr 1fr / none;
  }
  ```
  
  ​    通过编译. 注意虽然封装实力的第一个参数可以不用默认值,但是我建议都写上.