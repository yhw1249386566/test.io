# 安装

- `npm i -g sass`

# 使用

- 在命令行中运行 Sass：
  
  ```
  sass input.scss output.css
  ```

- 监视单个 Sass 文件，每次修改并保存时自动编译：
  
  ```
  sass --watch input.scss:output.css
  ```
  
  监听 Input.scss 文件，并保存时编译到同级目录的 output.css

- 监视整个文件夹：
  
  ```
  sass --watch src/assets/sass:src/assets/css
  ```
  
  监听 app/sass 文件，并实施编译到 public/stylesheets

- 更多命令的用法请通过 `sass --help` 获取帮助。

# sass 和 node 不兼容的问题

通过 `nvm` 安装（参见：[nvm.md](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/FrontEndToolsChain/Node.js/nvm.md)）稳定版本的 node，下载对应的 node-sass

1. `nvm install node@14.15.0` 
2. `npm install node-sass@4.14.0 `

# scss 和 sass

Scss 是 Sass 3 引入新的语法，是 Sassy CSS 的简写，是 CSS3 语法 的超集，也就是说所有有效的 CSS3 样式也同样适合于Sass。

说白了 Scss 就是 Sass 的升级版，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。

也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。另外，SCSS 还能识别大部分 CSS hacks（一些 CSS 小技巧）和特定于浏览器的语法，例如：古老的 IE filter 语法。

我们平时都将 scss 和 sass 都称之为 Sass，只不过 scss 是 sass 的升级版（超集

两者之间不同之处主要有以下两点：

1、文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 Scss 是以“.scss”后缀为扩展名。

2、语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 Scss 的语法书写和我们的CSS 语法书写方式非常类似。

# 规则

## SassScript

在 CSS 属性的基础上 Sass 提供了一些名为 SassScript 的新功能。

assScript 可作用于任何属性，允许属性使用变量、算数运算等额外功能。

通过 interpolation，SassScript 甚至可以生成选择器或属性名，这一点对编写 mixin 有很大帮助。

即：SassScript 是内嵌于 sass/scss 中的一个东西，我们可以直接使用它，就像在 less 中直接使用四则运算、变量等操作。

## scss 变量（$varName:value）

### 变量定义

SassScript 最普遍的用法就是变量，变量以美元符号开头，赋值方法与 CSS 属性的写法一样：

```scss
// 语法格式
$varName:value;

// 示例    
$width:5px;

// 使用变量
#main {
    width:$width
}
```

### 所有是变量的地方都必须要用 `$varName` 形式

如：在 <a href="#sass 函数指令 ">sass 函数指令 </a> 节中的自定义函数的和参数中，我们需要使用 `$varName` 形式去定义参数。

在：<a href="#定义/使用有参数的 Mixin">定义/使用有参数的 Mixin</a> 节中，我们定义一个接收参数的 Mixin，Mixin 中的参数也必须要用 `$varName` 的形式。

### 变量存在作用域

变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量）；不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。

且局部变量可以转换为全局变量可以添加 `!global` 声明：

```scss
#root {
    $width:5em; // 声明 #root 内的局部变量
    width:$width;// width:5em
}
#main {
  $w: 1em !global; // 将局部变量 $width 提升为全局变量。
  width: $w; width:1em
}

#sidebar {
  width: $w; // 使用全局变量 => width:1em
}
```

### 为变量定义默认值

我们可以为一个变量赋予默认值，当变量为 null 或 undefined 时，则默认值生效，否则使用变量本身的值，如：

```scss
// 未使用默认值的例子
$content: "content";
$content: "default value" !default;
#main {
  content: $content;
}
// 被编译为：
#main {
  content: "content";
}
```

```scss
// 使用了默认值的例子
$content: null;
$content:  "default value" !default;
#main {
  content: $content;
}
// 被编译为：
#main {
  content:  "default value";
}
```

## scss 关键词参数

关键词参数：在向函数传值的时候，可以为实参增加函数参数的名字作为标识符，这样可以更容易阅读，并且能打乱顺序传值

```scss
@mixin test($h, $w) {
    width : $w;
    height: $h;
}
div {
    // 在向 test() Mixin 传递参数时，为参数增加对应的关键词参数
    @include test($w:100px, $h:200px)
}
// 编译为
div {
  width: 100px;
  height: 200px;
}
```

关键词参数给函数提供了更灵活的接口，以及容易调用的参数。

关键词参数可以打乱顺序使用，如果使用默认值也可以省缺，另外，参数名被视为变量名，下划线、短横线可以互换使用。

## scss 选择器嵌套

### 使用

Sass 允许将一套 CSS 样式嵌套进另一套样式中，内层的样式将它外层的选择器作为父选择器，这和 less 是差不多的。

例如：

```scss
#main p {
  color: #00ff00;
  width: 97%;

  .redbox {
    background-color: #ff0000;
    color: #000000;
  }
}
// 编译为
#main p {
  color: #00ff00;
  width: 97%; }
#main p .redbox {
    background-color: #ff0000;
    color: #000000; 
}
```

### 父选择器 `&`

#### & 的基本使用

在嵌套 CSS 规则时，有时也需要直接使用嵌套外层的父选择器，例如，当给某个元素设定 `hover` 样式时，或者当 `body` 元素有某个 classname 时，可以用 `&` 代表嵌套规则外层的父选择器。

```scss
a {
  font-weight: bold;
  text-decoration: none;
  &:hover { text-decoration: underline; }
  body.firefox & { font-weight: normal; }
}
// 编译为
a {
  font-weight: bold;
  text-decoration: none; }
a:hover {
    text-decoration: underline; 
}
body.firefox a {
    font-weight: normal; 
}
```

#### 多重嵌套 &，& 会一层层向下传递

编译后的 CSS 文件中 `&` 将被替换成嵌套外层的父选择器，如果含有多层嵌套，最外层的父选择器会一层一层向下传递：

```scss
#main {
  color: black;
  a {
    font-weight: bold;
    &:hover { color: red; }
  }
}
// 编译为
#main {
  color: black; }
#main a {
    font-weight: bold; 
}
#main a:hover {
      color: red;
}
```

#### & 必须为选择器的第一个字符，可以跟随正确的后缀

`&` 必须作为选择器的第一个字符，其后可以跟随后缀生成复合的选择器，例如

```scss
#main {
  color: black;
  &-sidebar { border: 1px solid; }
}
// 编译为
#main {
  color: black; 
}
  #main-sidebar {
    border: 1px solid; 
}
```

当父选择器含有不合适的后缀时，Sass 将会报错。

## scss 属性嵌套

有些 CSS 属性遵循相同的命名空间 (namespace)，比如 `font-family, font-size, font-weight` 都以 `font` 作为属性的命名空间。

为了便于管理这样的属性，同时也为了避免了重复输入，Sass 允许将属性嵌套在命名空间中，我们以 `namespaceName: {}` 这样的语法格式用以区分属性嵌套和选择器嵌套。

例如：

```scss
.funky {
    // 使用 ，namespaceName: {} 这样的形式就能使用相同的 namespaceName-
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
// 编译为
.funky {
  font-family: fantasy;
  font-size: 30em;
  font-weight: bold; 
}
```

## scss 运算

### 概念

scss/sass 中，所有数据类型均支持相等运算 `==` 或 `!=`，此外，每种数据类型也有其各自支持的运算方式，如：数字类型支持四则运算等。

### 数字运算（四则运算）

#### 概念

SassScript 支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值。

```scss
p {
  width: 1in + 8pt;
}
```

编译为

```css
p {
  width: 1.111in; 
}
```

关系运算 `<, >, <=, >=` 也可用于数字运算，相等运算 `==, !=` 可用于所有数据类型。

#### 除法运算

`/` 在 CSS 中通常起到分隔数字的用途，SassScript 作为 CSS 语言的拓展当然也支持这个功能，同时也赋予了 `/` 除法运算的功能。

也就是说，如果 `/` 在 SassScript 中把两个数字分隔，编译后的 CSS 文件中也是同样的作用。

以下三种情况 `/` 将被视为除法运算符号：

- 如果值，或值的一部分，是变量或者函数的返回值
- 如果值被圆括号包裹
- 如果值是算数表达式的一部分

```scss
p {
  font: 10px/8px;             // 非除法运算
  $width: 1000px;
  width: $width/2;            // 使用变量，/ 为除法
  width: round(1.5)/2;        // 使用了函数，/ 为除法
  height: (500px/2);          // 值被 () 包裹，/ 为除法
  margin-left: 5px + 8px/2px; // / 在算数表达式中，/ 为触发
}
```

编译为

```css
p {
  font: 10px/8px;
  width: 500px;
  height: 250px;
  margin-left: 9px; }
```

## scss 插值语句（#{}）

### 插入 SassScript

```scss
p:before {
  content: "I ate #{5 + 10} pies!";
}
// 编译为：
p:before {
  content: "I ate 15 pies!"; 
}
```

### 用在运算表达式中，保证 `/` 不被当作除法运算

如果需要使用变量，同时又要确保 `/` 不做除法运算而是完整地编译到 CSS 文件中，只需要用 `#{$varname}` 插值语句将变量包裹。

```scss
p {
  $font-size: 12px;
  $line-height: 30px;
  font: #{$font-size}/#{$line-height};
}
```

编译为

```css
p {
  font: 12px/30px; 
}
```

### 插入的值为 null 时视作插入空字符串

```scss
$value: null;
p:before {
  content: "I ate #{$value} pies!";
}
```

编译为

```css
p:before {
  content: "I ate pies!"; 
}
```

## scss 导入（@import）

### 导入 .scss/sass

scss 通过 @import 指令导入其他 scss/sass 文件，当我们使用 @import 命令时，如果没有指定扩展名，Sass 将会试着寻找文件名相同，扩展名为 `.scss` 或 `.sass` 的文件并将其导入。

```scss
@import "foo.scss";
// 或
@import "foo";
```

Sass 允许同时导入多个文件，例如同时导入 rounded-corners 与 text-shadow 两个文件：

```scss
@import "rounded-corners", "text-shadow";
```

导入文件也可以使用 `#{ }` 插值语句，但不是通过变量动态导入 Sass 文件，只能作用于 CSS 的 `url()` 导入方式：

```scss
$family: unquote("Droid+Sans");
@import url("http://fonts.googleapis.com/css?family=\#{$family}");

// 编译为
@import url("http://fonts.googleapis.com/css?family=Droid+Sans");
```

### scss 中 @import 会被当作普通 css 语句的情况

以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件。

- 文件拓展名是 `.css`；
- 文件名以 `http://` 开头；
- 文件名是 `url()`；
- `@import` 包含 media queries。

```scss
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);

// 编译为
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);
```

### 只导入 .scss/.sass，但却不编译成 .css

如果需要导入 SCSS 或者 Sass 文件，但又不希望将其编译为 CSS，只需要在文件名前添加下划线，这样会告诉 Sass 不要编译这些文件，但导入语句中却不需要添加下划线。

例如，将文件命名为 `_colors.scss`，便不会编译 `_colours.css` 文件。

```scss
@import "colors"; // 导入语句中不需要添加下划线
```

上面的例子，导入的其实是 `_colors.scss` 文件

注意，不可以同时存在添加下划线与未添加下划线的同名文件，否则添加下划线的文件将会被忽略。

### 嵌套 @import

大多数情况下，一般在文件的最外层（不在嵌套规则内）使用 `@import`，其实，也可以将 `@import` 嵌套进 CSS 样式或者 `@media` 中，与平时的用法效果相同，只是这样导入的样式只能出现在嵌套的层中。

假设 example.scss 文件包含以下样式：

```scss
// example.scss 
.example {
  color: red;
}
```

然后导入到 `#main` 样式内·

```scss
#main {
  @import "example";
}
```

将会被编译为

```css
#main .example {
  color: red;
}
```

> Directives that are only allowed at the base level of a document, like @mixin or @charset, are not allowed in files that are @imported in a nested context. 译者：这一句不理解，所以未翻译。

不可以在混合指令 (mixin) 或控制指令 (control directives) 中嵌套 `@import`。

## scss 继承（@extend）

### 混合和继承

- 混合：
  
  将使用 @mixin mixinName {} 格式定义的 scss 使用 @include 包含到其他选择器/另一个 Mixin 中。

- 继承
  
  使选择器 A 继承选择器 B 中的所有一切。

- 在 Mixin 和 extend 中，最好使用 Mixin，参见：[为了性能，选择 Mixin 吧](https://www.sass.hk/skill/sass143.html)

### 使用

使用 `@extend` 可以告诉 Sass 将一个选择器下的所有样式继承给另一个选择器：

```html
<div>
    <div class="error">
        <div class="seriousError intrusion"></div>
    </div>
</div>
```

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  // .seriousError 将继承 .error 的所有样式
  @extend .error;
  border-width: 3px;
}

// .seriousError 编译为：
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
  border-width: 3px;
}
```

如果 .seriousError 所属的 HTML 标签中，还有其他以空格分隔的 class，那么若 `.error 其他class` 中书写的样式同样也会继承给 .seriousError。

注：这看起来是应当的，因为就算使用 css 去写，`.error 其他class{}` 中写的样式和 `.seriousError{} ` 写的样式都是会应用到同一个标签中的。

那么这有什么用呢，没啥用，只是编译成 css 需要实现的一个特性罢了。

```scss
.error.intrusion {
  background-image: url("/image/hacked.png");
}
.seriousError {
  // .seriousError 将继承 .error 的所有样式
  @extend .error;
  border-width: 3px;
}

// .seriousError 编译为：
.seriousError {
  background-image: url("/image/hacked.png");
  border-width: 3px;
}
```

### 选择器的多重继承

注：在使用多重继承时，后定义的样式享有优先权。

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  // 或使用这种写法：
  @extend .error,.attention;
  border-width: 3px;
}
```

### 延伸的 scss 继承

一个选择器 A 继承了另一个选择器 B，那么在后面，我们使得选择器 C 继承 A 时
C 将同时拥有 A 和 B 的样式，如：

```scss
.A {
    color:red;
}
.B {
    @extend .A;
    font-size:16px;
}
.C {
    @extend .B;
    width:100px;
}
// C 编译成 css 为：
.c {
    color:red;
    font-size:16px;
    width:100px;
}
```

## sass 混合指令（Mixin）

### 混合和继承

- 混合：
  
  将使用 @mixin mixinName {} 格式定义的 scss 使用 @include 包含到其他选择器/另一个 Mixin 中。

- 继承
  
  使选择器 A 继承选择器 B 中的所有一切。

- 在 Mixin 和 extend 中，最好使用 Mixin，参见：[为了性能，选择 Mixin 吧](https://www.sass.hk/skill/sass143.html)

### 定义 Mixin 和使用 Mixin

 是的，和 less 的 Mixin 很不同，less 只需要将其他选择器放入另一个选择器，就混合完成（其他选择器将拥有另一个选择器的一切）；

而 Sass 明显麻烦一些，需要先定义一个要使用的 Mixin，然后才能在其他选择器/混合/顶层作用域中通过 MixinName 使用。

```scss
// 语法格式
@mixin mixinName[(arguments)] {} // 定义 Mixin
@include mixinName[(arguments)]; // 使用 Mixin
```

其中：[(arguments)] 代表的是定义/使用 Mixin 时，

- 可以选择定义一个接收变量的 Mixin（能在 Mixin 中使用该变量）
- 可以向 存在定义了参数的 Mixin 中，传递指定的参数。

### 示例

#### 简单使用

```scss
// 定义 Mixin
@mixin large-text { 
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
// 使用 Mixin
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
// 编译为：
.page-title {
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  color: #ff0000;
  padding: 4px;
  margin-top: 10px; 
}
```

##### 在 .scss 的顶层作用域使用 Mixin

```scss
@mixin silly-links {
  a {
    color: blue;
    background-color: red;
  }
}
@include silly-links;
// 编译为
a {
  color: blue;
  background-color: red; 
}
```

##### 包含其他 Mixin 的 Mixin

```scss
@mixin highlighted-background { background-color: #fc0; }
@mixin header-text { font-size: 20px; }
@mixin compound {
  @include highlighted-background; // 将其他 Mixin 用于此
  @include header-text; // 将其他 Mixin 用于此
  color:red;
}

// 相当于：
@mixin compound { 
    background-color: #fc0;
    font-size: 20px;
    color:red;
}
```

注：混合样式中应该只定义后代选择器，这样可以安全的导入到文件的任何位置

##### 在使用 Mixin 中（@include）使用<a href='#scss 关键词参数'>关键词参数</a>

```scss
// 为 test Mixin 的 $width 增加默认值 100px
@mixin test($color, $width:100px) {
    width: $width;
    color: $color;
}
p {
    @include test($color: blue);
}

// 编译为
p {
  width: 100px;
  color: blue;
}
```

#### 定义/使用有参数的 Mixin

在定义有参数的 Mixin 时，需要将参数写进圆括号里，并且以逗号分隔。

使用有参数的 Mixin 时，需要按照使用的那个  MixinName 参数的顺序，再将想要赋的值一 一对应的写进圆括号（这和 JS 中普通使用函数参数是一样的）：

```scss
// 定义有参数的 Mixin
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
// 使用有参数的 Mixin
p { @include sexy-border(blue, 1in); }

// 编译为
p {
    border-color: blue;
    border-width: 1in;
    border-style: dashed; 
}
```

注意：在向 Mixin 传递参数时，需要明确传递参数，否则单位不会默认加：

```react
@mixin setElAttr($width, $height) {
    width : $width;
    height: $height;
}

.footer {
    @include setElAttr(1919, 288);
}
// 直接编译，不会默认加单位
.footer {
  width: 1919;
  height: 288;
}
```

#### 在定义有参数的 Mixin 时，使用默认值

混合指令也可以使用给变量赋值的方法给参数设定默认值，然后，当这个指令被引用的时候，如果没有给参数赋值，则自动使用默认值：

```scss
@mixin sexy-border($color, $width: 1in) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}
p { @include sexy-border(blue); }
h1 { @include sexy-border(blue, 2in); }

// 编译为
p {
  border-color: blue;
  border-width: 1in;
  border-style: dashed; 
}

h1 {
  border-color: blue;
  border-width: 2in;
  border-style: dashed; 
}
```

#### 向定义的 Mixin 中导入样式

在前文，我们使用 Mixin 的格式是：`@mixin mixinName[(argument)]`，即：直接将 Mixin 混合到我们的选择器中。

现在，我们可以在**使用 Mixin 时，反而向定义的 Mixin 那里导入内容**，而这样做，导入的内容将出现在定义 Mixin 的 `@content` 那个位置。

语法格式为：

```scss
//  不再是单纯的直接引用 Mixin，而是多加了： {}
@include mixinName {
    // 需要导入的内容
}
```

```scss
@mixin apply-to-ie6-only {
  * html {
    color:red;
    @content; // 使用该 Mixin 时，向这个 Mixin 导入的内容将出现在这
  }
}
// 向 apply-to-ie6-only Mixin 导入 #logo{}
@include apply-to-ie6-only {
  #logo {
    background-image: url(/logo.gif);
  }
}

// 相当于
@mixin apply-to-ie6-only {
  * html {
    color:red;
    #logo {
        background-image: url(/logo.gif);
      }
  }
}

// 编译为
* html #logo {
    color:red;
    background-image: url(/logo.gif);
}
```

#### 将 @mixin 和 @include 简写为：`=`、 `+`

**为便于书写，`@mixin` 可以用 `=` 表示，而 `@include` 可以用 `+` 表示**，所以上面的例子可以写成：

```scss
=apply-to-ie6-only {
    * html {
        @content
    }

}

+apply-to-ie6-only {
    #logo {
        background-image: url(/logo.gif)
    }
}
```

**注意：** 当 `@content` 在指令中出现过多次或者出现在循环中时，额外的代码将被导入到每一个地方。

#### [使用命名参数](https://sass-lang.com/documentation/at-rules/mixin#arguments)

```scss
@mixin example-mixin($background-color, $border-color) {
  background-color: $background-color;
  border-color: $border-color;
}

// 使用命名参数
@include example-mixin($border-color: red, $background-color: blue);
```

使用命名参数，你可以按照任意顺序传递参数，只需要确保参数名称和对应的值是正确的即可。

## scss 占位选择器

### 概念

```scss
// 占位选择器的定义
%占位选择器名
// 使用
选择器 {
    @extend %占位选择器名
}
// 选择器 将替换掉 %占位选择器名，并将自身的 css 和占位选择器合并
```

有时，我们需要定义一套样式并不是给某个元素用，而是只能通过 `@extend` 指令使用，其他使用方法都不可以。

尤其是在制作 Sass 样式库的时候，希望 Sass 能够忽略用不到的样式，即：忽略使用占位选择器的 scss/sass 样式。

```scss
%arbitrary {
    color:red;
}
#root {
    @extend %arbitrary;
    font-size:16px;
}

// 编译为
#root {
  color: red;
}
#root {
  font-size: 16px;
}
// 相当于
#root {
  color: red;
  font-size: 16px;
}
```

### 使用

使用占位选择器只需要向平常使用 id/class 选择器那样正常使用就行，只不过它除了通过 `@extend` 指令之外会被 Sass 忽略罢了，如：

```scss
#a .content %box {
    width:200px;
    height:200px;
    background-color:gray;
}

#root {
    // 通过展位选择器的名字使用它。
    @extend %box;
    color:red;
    font-size:16px;
}

// #root 编译 css 为：
#a .content #root {
    width:200px;
    height:200px;
    background-color:gray;
    color:red;
    font-size:16px;
}
```

## sass 控制指令

### @if

当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码：

```scss
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
  @if null  { border: 3px double; }
}
// 编译为
p {
  border: 1px solid; 
}
```

`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明，例如：

```scss
$type: monster;
p {
  @if $type == ocean {
    color: blue;
  } @else if $type == matador {
    color: red;
  } @else if $type == monster {
    color: green;
  } @else {
    color: black;
  }
}
// 编译为：
p {
  color: green; 
}
```

### @for

`@for` 指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动。

这个指令包含两种格式：

1. `@for $varName from <start> through <end> {scss} `
   
   设置变量的值为：[start,end]，并在闭区间内进行循环，
   
   每一次循环，{} 的 内容输出一次

2. `@for $varName from <start> to <end> {scss}`
   
   设置变量的值为：[start,end)，并在右半开区间内进行循环，
   
   每一次循环，{} 的 内容输出一次

以上二者的区别在于 `through` 与 `to` 的含义：当使用 `through` 时，条件范围包含 `<start>` 与 `<end>` 的值，=> [start,end]

而使用 `to` 时条件范围只包含 `<start>` 的值不包含 `<end>` 的值，=> [start,end)

另外，`$varName` 可以是任何变量，比如 `$i`；`<start>` 和 `<end>` 必须是整数值。

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}
```

编译为

```scss
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
.item-3 {
  width: 6em; 
}
// ----------------
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
```

## sass 函数指令

### 使用

注意：在使用自定义函数，并且写参数时，我们需要使用 `$varName`  形式定义函数参数，因为早在一开始 <a href="#scss 变量（$varName:value）">scss 变量（$varName:value）</a> 一节中，我们就说过了：变量都是要以 `$` 开头去命名。

- 有自定义函数，当然 SassScript 也有内置的函数，如：hsl()，参见：[SassScript:Function](http://sass-lang.com/docs/yardoc/Sass/Script/Functions.html)

Sass 支持自定义函数，并能在任何属性值或 SassScript 中使用，函数的值通过 return 返回出来。

```scss
$grid-width: 40px;
$gutter-width: 10px;
// 自定义函数，变量必须为 $varName 形式，否则会报错
@function grid-width($n) {
  @return $n * $grid-width + ($n - 1) * $gutter-width;
}
#sidebar { width: grid-width(5); }

// 编译为
#sidebar {
  width: 240px; 
}
```

注意：Sass 在编译一个表达式，它需要计算表达式的值才能进行编译，所以我们无法在一个表达式使用多个无法兼容的单位，如：`100px * 100vw` 是错误的，详见：<a href='#scss 运算'>scss 运算</a>

### 自定义的函数使用<a href='#scss 关键词参数'>关键词参数</a>

```scss
#sidebar { 
width: grid-width($n: 5); 
}
```
