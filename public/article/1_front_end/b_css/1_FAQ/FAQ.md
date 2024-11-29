# 布局

需求：一个元素，分为左右两栏，每栏里的内容上边距 10px

1. 先决定大致布局，用来确定该模块大致是什么样
   
   如：使用 flex，让布局左右分布，并让子元素 flex:1 平均得到容纳块宽度

2. 在子元素内部使用 margin-top:10px 让每栏中的内容增加 10px 的上边距。

简而言之：先规定大致布局，使用 `flex`、 `grid`、`table` 等，再使用边距 padding、定位 positin、宽高 width/height 等去规定子元素小细节。

这个流程的好处：能让布局清晰明了，容易掌控，不容易崩，并且写的又快又准又好。

# grid 和 flex 的选择

- grid 应用场景：二维场景
  
  如：一行N列的情况

- flex 应用场景：一维场景
  
  如：只需要 从左 -> 右 依此填充

- 混合使用

# 内容太长超出容纳块

文本超长如何显示

容纳块变小，导致元素内容溢出或被覆盖

- 显示滚动条

- 内容超出隐藏+省略号（*先规定容纳块内部元素超出后隐藏 overflow: hidden，然后规定内容元素 overflow:hidden; text-overflow: ellipsis*）
  
  注意：内容元素还要使用 overflow:hideen 是因为：text-overflow 只会规定如何向用户显示为展示的溢出内容，而不是强制让文本截断。

- 换行

- 让内容同步变小（通过@media 或单位%, em, rem 等）

容纳块太大，内容太少，导致容纳块显得空旷

- `justify-content:space-between/arrount` 等让子元素在左右两边/平均分布

- 让内容同步放大（通过@media 或单位%, em, rem 等）

# 宽高

- 让父元素根据内容改变宽度或高度：
  
  `width或height:fit-content/min-content/max-content`

- 对于一个背景来说，在正常情况下其所有字内容都在背景之中。
  
  但是若背景变小，子内容太长导致撑出背景而溢出，且出现滚动条时，背景将会无法完全覆盖子内容，此时，可以让背景的宽度为:
  
  `width: min-content/max-content`

# [position: sticky](https://www.zhangxinxu.com/wordpress/2020/03/position-sticky-rules/)

- https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/使用 position: sticky 贴边时，请注意如果你要贴的那个容纳块存在 padding，则贴边将贴在内边距里面，而非外面。
  
  https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/UI 效果表示为：没有紧紧贴边，而是与边（顶部/左边/右边/下边）存在一定距离。

# 边距使用

- margin 通常用在元素和元素的间距之间
- padding 通常用在让元素内部内容离元素边框边界多远。

# [flex布局且子元素flex:1时元素大小可能不一致](https://codesandbox.io/s/flexbu-ju-qie-zi-yuan-su-flex-1shi-yuan-su-da-xiao-ke-neng-bu-yi-zhi-s6dxxy)

- 使用 [Grid 布局](https://codesandbox.io/s/wang-ge-bu-ju-jie-jue-flexbu-ju-qie-zi-yuan-su-flex-1shi-da-xiao-bu-yi-zhi-de-wen-ti-nx3m4x)可以解决此问题，但是 Grid 布局也不是完美的，如果规定了子元素最大宽度，则从外观看：
  
  无法同时满足：
  
  - 弹性正确
  - 间距正确
  
  想要满足需要使用 `javaScript` 实时计算样式。

# CSS 属性详解

- overflo
  
  应用于容纳块，当容纳块内部元素超出容纳块本身时，此属性决定如何显示内部元素

- text-overflow
  
  应用于需要如何向用户发出未显示的溢出内容信号的元素，此属性决定应用它的元素该如何显示溢出内容。
  
  *通常和 overflow-hidden* 一起使用

# 视区太宽元素太少/太小

- 让元素总是处于视区的中间，规定元素最大和最小的大小，使内容都在此元素中。

# 在 chrome 开发者工具中不能修改 css

1. 如果你在样式表右边看见：`user agent stylesheet`，这说明这是浏览器默认为 html 元素添加的样式，你不能直接修改，你只能通过覆盖它从而达到修改的目的。
   
   <img title="" src="/picture//user_agent_styleseet.png" alt="">
   
   （user_agent_styleseet.png）

2. 如果没有看到 `user agent stylesheet`，仍然无法修改 css, 这通常是因为样式是在代码中通过 JavaScript **动态生成**的，或者在页面加载时通过 JavaScript **直接应用到元素**上的，而不是通过 CSS 文件引入的
   
   此时，开发者工具中的样式面板会将这些样式归类为 `computed styles` 而非 `matched CSS rules`。
   
   因为这些样式不是从样式表中继承的，而是通过 JavaScript 生成的。因此，你无法直接在开发者工具中修改它们。
   
   如果想要修改这些样式，你需要找到应用这些样式的 JavaScript 代码，并修改它们。
   
   注意：不能修改的样式，通常是以**斜体**出现。

# 
