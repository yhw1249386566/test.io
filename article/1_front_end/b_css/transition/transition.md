[TOC]

# 前情提要 P862

CSS过渡指的是: 在一段时间内,把CSS属性的初始值变为另一个值,而不是使该值瞬间变化.P862

​    如:某个元素的初始值宽度为200px,当鼠标移动上去时宽度变为100px,在默认情况下,元素的宽度会瞬间从200px->100px,中间的时间可以忽略不计,

​    而使用过渡属性则可以控制让该元素的宽度200px在n秒/n毫秒内过渡到100px,让用户可以明显的发现这种变化.

# 基本概念

- 过渡指的是一个值向目标值过渡的整个过程.

- 我们将未变化之前的值称之为始态,变化后的目标值称之为终态.
  
  **始态**:通常指元素该被初始化后的值(页面加载时元素所处的状态).P866
  
  **终态**:元素通过某种手段被改变后的值.P867

- 元素可以通过伪类*(如:hover)*, 改变自身的状态*(如:invalid->vaild)*,或通过修改元素的属性
  
  *(如: 为元素添加id,使用预设CSS操作: 用这个id选择器提早为元素设定样式然后改变CSS属性值时,为之设定过渡)*等,
  
  都可以触发过渡效果(transition) P864

- **通常过渡属性(transition)需要应用在目标值（终态）所在的样式块中**. P899
  
  如:你需要把CSS属性的值A,用过渡效果过渡到B,则你需要在B所在的样式块中使用过渡属性,而不是在值A所在的样式块。
  
  如果你将过渡属性使用在了值A所在的样式块,则表示：在当前元素, 当前的样式块以外的样式块中,如果改变了需要应用过渡效果的属性,则每个样式块都会应用值A所在的过渡属性，而不存在自己的过渡，
  
  - 简单理解：一个样式块 A 中存在 transition 且指定了过渡属性，那么当 A 的样式块中被指定属性发生变化时，此属性将应用过渡效果。
  
  如：
  
  ```html
  <style>
    div {
      background-color: green;
      width: 100px;
      height: 100px;
         /** one 和 two 都将应用此过渡属性 */
      transition:
        background-color 1s ease-out 50ms;
    }
  
    .one:hover {
      background-color: red;
    }
  
    .two:hover {
      background-color: blue;
    }
  </style>
  
  <body>
    <div class="one"></div>
    <div class="two"></div>
  </body>
  ```
  
  除非在目标值所在的样式块单独使用过渡属性,这样当起始值->过渡值时,就会应用过渡值所在的样式块的过渡属性，这是因为后者覆盖了前者，如：
  
  ```html
  <style>
    div {
      background-color: green;
      width: 100px;
      height: 100px;
  
    }
  
    .one:hover {
      /** 单独为终态应用过渡属性 */
      transition:
        background-color 1s ease-out 50ms;
      background-color: red;
    }
  
    .two:hover {
      /** 单独为终态应用过渡属性 */
      transition:
        background-color 3s ease-out 50ms;
      background-color: blue;
    }
  </style>
  ```

- **IE9以及更久版本的浏览器通常来说不支持过渡属性**,但是你**仍然可以为它们添加**过渡属性. P863
  
  只是因为:使用过渡属性从而出现的元素的**过渡效果,是不会影响最终元素的状态的**,那些在使用旧版浏览器的人,仍然能看到有效信息,只是元素将会瞬间完成变化(始态->终态),而不是有个慢慢转换的过程.

- 使用transition-delay属性让过渡效果**延迟50ms左右才开始进行过渡,**这是一种**非常合宜的用户体验**,因为有时用户只是不小心触发了过渡效果 或者 在准备结束过渡时给用户重新一个选择是否继续的机会.
  
  而50ms是一个刚好的时间,不大不小,不会影响用户的体验,用户甚至感觉不到有这个延迟,但延迟是真实存在的,对于计算机而言. P868

# 过渡的四个属性和一个简写属性

CSS中,定义过渡效果的有4个属性,然后还有一个简写属性将这4个属性组合起来使用.

其中分别为:

1. transition-property
2. transition-duration
3. transition-timing-function
4. transition-delat

## transition-property P868

- transition-property属性用来指定当前元素中,**哪些CSS属性可以被过渡,没有被指定的属性将被瞬间过渡**(默认值). P868 - P869

- transition-property属性的取值: P868
  
  **none** P871 - P872
  
  当前元素中,所有属性都不可被过渡,禁用过渡效果.
  
   **all** 默认值 P870
  
  当前元素中,所有属性都可被过渡
  
  **\<poperty-name>**
  
  指定哪些属性可以被过渡,多个属性名则以逗号分隔.

- **all值和\<property-name>可以一起使用**,而none则只能单独使用.一起使用all和\<property-name>时,需要注意,**all需要在最前面**,否则存在于后面的all,将**会覆盖前面**的所有\<property-name>的取值.
  
  同样的,\<property-name>存在于后面也会覆盖all中的同名属性.
  
  而这样做的**目的是:想让所有元素都有过渡效果,但是同时想让指定的元素能设置不同的过渡持续时间或过渡延迟** P871
  
  ***(详见:transition-duration 和 transition-delay)***
  
  { 
  
  ​    transition-property: color, transform, opacity;
  
  ​    transition-duration:1s, 2s ,3s;
  
  ​    transition-delay: 200ms, 1s, 2s;
  
  }
  
  即: 当前元素中,只有color, transform, opacity三个属性可以存在过渡效果,其他元素则禁用; 
  
  且color, transform, opacity属性发生变化时会在200ms,1s,2s延迟后在开始发生过渡效果,分别持续1s,2s,3s时间才过渡完毕. P871

- 并不是所有元素都存在过渡,也即是说,有些元素无法过渡.
  
  如:border-style等.因为不存在中间值.

## transition-duration P874

- transition-duration 属性用来设置CSS属性始态到终态需要花费的时间.
  
  取值为: 以逗号分割的时间长度列表 或 单个时间值,其单位为ms或s.
  
  P874

- transition-duration 属性的值只能为正数,不能为负数,否则整个声明失效. P875
  
  注意:**transition简写属性**中,transition-duration和transition-delay的值**都可以为负数**,
  
  当它们相减**<=0时,则元素瞬间过渡**,当它们相减**>0**时,则**元素将从中间某个值开始过渡**. 这个和负的transition-delay属性值类似. P884

- 如果**过渡总时间**(transition-duration和transition-delay的值相减)**>0s,则会触发transitionend事件**,
  
  即使transition-delay的值为负(*该属性可以设置负属性值P884)*,但是如果**<0,则不会触发transitionend事件**. P875

- 如果在两个状态之间来回过渡,而只有其中一个状态声明了过渡持续时间,那么只有在向这个状态过渡时,持续时间才起作用.
  
  如:
  
  ```css
  input:vaild {
      transition-duration:1s; color: red 
  }
  input:invaild {
      transition-duration:0.2s; 
      color: green
  }
  ```
  
  当红色向绿色过渡时,持续时间将为0.2s; 当绿色像红色过渡时,持续时间将为1s P875
  
  也就是说过渡属性通常都需要应用在目标值所在的样式块中.P899
  
  ***详见:基本概念.***

- 使用transition-duration 属性**可以为你明确指定能使用过渡效果的属性单独添加过渡时间**.
  
  也就是**,除了为把每个指定的过渡属性应用统一的过渡时间之外,还可以单独设置不同的过渡时间**. P875
  
  如: 
  
  ```css
  CSS选择器 {
  transition-property:all, color, width, height;
  transition-duration:1s,2s,3s,400s;
  }
  ```
  
  即: 将除了color, width, height的所有可过渡属性的过渡时间设置为1s,而color, width, height属性的过渡时间分别设置为2s,3s,400ms.

- 如果transition-duration设置的属性值的个数 和 transition-property属性值的个数相比, 
  
  若transition-**duration个数较多**,那么**多余的值将被忽略**; 
  
  若transition-**property值个数较多**,则**会重复使用transition-duration的值**; 
  
  (**成组复制使用**,如:如果有duration三个值,则三个值将直接复制然后对应给property值使用,如果使用之后,duration的值有多余,则被忽略,这和transition-delay一样)P876
  
  注意:如果**transition-duration的值刚好只有2个**,且**小于transition-property属性值的个数**,则剩余的transition-propety值:
  
  **奇数将使用第一个持续时间,偶数将使用第二个持续时间**.P876

## transition-timing-function P877 - P882

- transition-timing-function属性能控制过渡的步调,即:能使过渡缓入缓出,缓入快出,快如缓出,先平稳过渡然后再步进甚至弹跳数次等效果.
  
  P877

- 取值: 多个以逗号分隔的参数 | 单个参数 P877
  
  **cubic-bezier()**
  
  指定一个三次方贝塞尔曲线
  
  **ease** 默认值
  
  慢速开始,然后加速,再慢下来,结束时再特别慢.
  
  **linear**
  
  整个过渡过程保持相同的速度(匀速)
  
  **ease-in**
  
  缓入快出
  
  **ease-out**
  
  快入缓出
  
  **ease-in-out**
  
  缓入缓出,但中间较快.
  
  **step等取值**(由于不常用,所以这里不赘述,参见:P877)
  
   P877

- 除了步进关键字(step等)以外,其他关键字定义的是渐进时序函数(以上取值中的第2个-第6个),这是描述**平滑曲线的三次方贝塞尔函数的别名**,同时**这5个时续渐进函数也是规范预定义的函数**. P877

## transition-delay P882

- **transition-delay 是延迟过渡**,它的作用为: 再触发过渡变化与准备开始过渡之间引入一定的延迟时间.P882
  
  取值为: 多个时间值以逗号分开 | 单个时间值. 单位为s / ms P883
  
  **transition-delay属性的值可以为负**.P884

- transition-delay属性的值如果是多个,则它的目的和transition-duration一样,即:为由transition-property指定的允许过渡属性单独设置延迟时间. P883

- 如果transition-delay属性的值存在多个,则**后一个值对应的属性的延迟效果 会在前一个值对应的属性的延迟效果时间+过渡结束后(过渡时间) 结束后才触发**. P884
  
  而第一个值,则是过渡开始前需要延迟的时间. P883
  
  如:
  
  ```css
      div {
          background-color: green;
          width: 100px;
          height: 100px;
          transition-property: 
              background-color, width, height;
      }
  
      div:hover {
          background-color: red;
          width: 200px;
          height: 200px;
          transition-delay: 1s, 1s, 200ms;
          /** 或者 */
          transition-delay: 1s;
      }
  ```
  
  当鼠标移动到div元素上时:
  
  **前者的意思为**: 在颜色green开始过渡到red时,先延迟1s后才开始进行过渡,当过渡完成之后再继续延迟1s,
  
  才开始由width:100px 过渡到200px, 到这个也过渡结束后,再延迟200ms,才开始由height:100px ->200px, 然后整个div元素的过渡才结束(如果没被打断的话)
  
  **后者的意思为**:在开始过渡这三个属性之前,先延迟1s后,这三个属性同一时间内一起开始过渡,谁先完成由根据过渡持续时间而定.
  
  P883

- 和transition-duration一样的还有: 如果transition-delay 属性的取值个数 > transition-property属性值的个数,则transition-delay的多余值会被忽略.
  
  如果transition-delay的值个数 < transition-property属性值的个数,则将重复使用前面(成组复制使用)的值. P883 *(这和transition-duration的情况一样)*
  
  并且如果transition-delay 的值刚好为两个,且个数 < transition-property属性值的个数,则剩余的transition-propety值:
  
  **奇数将使用第一个持续时间,偶数将使用第二个持续时间**.P883,P876
  
  ***详见: transition-duration.***

- 你可以为transition-delay的属性值设置负数,如果设定的**负数的绝对值 < transition-duration(两个值相减>0)**,则过渡效果将从元素的中间某个位置开始过渡.P884.
  
  如果设定的**负数的绝对值 >= transition-duration**,则元素将不存在过渡效果,因为它们两个的**值相减<=0.**同时也不会触发transitionend事件,因为这就像没有使用有关transition的属性一样. P885

- **默认情况下**,如果在一个元素本身应用了延迟效果,则这个**延迟效果会在终态 重新返回到始态时又被应用**. P855
  
  ```css
  div {
      color:green;
      transition-property:color;
      transition-delay:1s;
  }
  div:hover {color:red;}
  ```
  
  当鼠标移动到div元素时将延迟1s后由始态->终态; 当鼠标从div元素移出去时,div元素仍然会延迟1s后从终态->始态.

- 默认情况下,当一个元素的CSS属性由**终态->始态时,它的过渡效果将是由始态->终态的相反结果**.
  
  (前提是,**始态和终态都应用了同一个transition有关属性**,也就是说需要**应用在元素(div)本身上,而不是目标值(div:hover)所在的样式块中**) P855

## transition 简写属性 P885

- transition属性把以上的4个属性合而为一,其取值为:它们4个属性的取值. P885
  
  transition属性的**取值可以为任意的4个及以内的个数,只要符合以上4个属性的取值即可**,也就是说transition的值可以是1个,或者两个,三个,四个都行(亲测)
  
  transition: all 0s ease 0s √ 默认值 P885 
  
  transition: all  √
  
  transition: all 0s √
  
  transition: all 0s ease √

- transition属性里面的持续时间和延迟时间可以为正数,负数,小数.
  
  但这两个的属性的值为负数时,如果:
  
  transition-delay属性值 + transition-duration属性值 **<=** 0, 则元素将**瞬间过渡并且不会触发transitionend事件.**
  
  如果 **>** 0, 则**元素将触发transitionend事件**

- transition的属性取值可**以为none**,即禁用任何过渡效果.P886

- transition的属性取值也可以为: **任意个以逗号分割的单次过渡**.P886
  
  单次过渡包含: 以上4个属性中的取值.
  
  ```css
  div:hover {
      transition:
          color 200ms,
          width 1s ease-out,
          height 2s ease-in 50ms;
  }
  
  /** 等效于 */
  div:hover {
      transition-property:color, width, height;
      transition-duration:200ms, 1s, 2s;
      transition-timing-function:
          ease,ease-out,ease-in;
      transition-delay:0s, 0s, 50ms;
  }
  ```
  
  意思为:
  
  当鼠标移动到div元素上时,color属性将**立即开始过渡**,**持续时间为200ms**,当color属性**过渡结束后**;
  
  **立即开始**width属性的过渡,**并持续1s,且使用缓出效果**,当width属性**过渡结束**后;
  
  **延迟50ms**后,在开始height属性的过渡效果,**持续时间为2s,并使用缓入效果**,等到height属性**过渡结束,这整个div元素过渡完成.**
  
  P887

- transition属性中**第1次出现的时间单位值是transition-duration属性值, 第2次出现的时间单位才是transition-delay属性值.**P886
  
  如: transition: 2s; =>transition-duration:2s
  
   transition:1s all 2s ; =>transition-duration:1s; transition-delay2s
  
  P886

- transition简写属性声明过渡效果不能和使用单独的过渡属性声明效果混在一起. P887

# 过渡事件 P872

- 在DOM中,不管是哪个方向的过渡,不管过渡持续多久,延迟多长,也不管过渡的属性是单独声明的还是涵盖在all中,过渡<strong>结束</strong>后都会触发transitionend事件. P872
  
  **需要注意的是:前提是存在过渡且过渡的时间+延迟时间 > 0 才会触发过渡时间.**

- 简写属性可能会触发多次transitionend事件,因为简写属性中每个支持动画的属性都有各自的transitionend事件. P872

- 例如:简写属性:border; 如果存在过渡效果,则它会触发8次transitionend事件.P873
  
  border-left/right/top/bottom-width会触发四次transitionend事件.
  
  border-left/right/top/bottom-color会触发四次transitionend事件.
  
  border-style不触发transitionend事件(因为边框样式不存在过渡)
  
  这样border简写属性总共可以出发8次transitionend事件.P873

- 监听transitionend事件的简单操作为:
  
  ```js
  myElement.addEventListener('transitionend', 
                             (e)=>{
      // do something...
  
  });
  ```
  
  和transitionend事件有关的三个API为:
  
  **propertyName**:结束过渡的CSS属性的名称(过渡结束后才会触发事件)
  
  **pseudoElement**: 应用过渡效果的伪元素,前面有两个冒号;如果过渡效果应用到常规DOM*(没有使用伪元素)*节点*(元素)*上,返回空字符串.
  
  **elapsedTime**:过渡的持续事件,单位为s.
  
  P874

# 反向过渡:退回起点 P887

- 在前面 ***过渡的四个属性和一个简写属性 - transition-delay***  中有个关于鼠标悬停就会应用过渡效果的示例,使用的操作是通过伪类:hover实现.
  
  如果你有去实验的话,你会发现: 如果你将鼠标移开元素,则元素的各个CSS属性都将**通过相同的过渡(始态->终态)回到默认状态,延迟也相同,唯一的区别就是: 时序函数是相反的.** P887
  
  想要做到这操作的**前提**是: 始态->终态的过渡效果 和 终态->始态的过渡效果都要**应用同一个过渡**,否则它们将分别应用目标值所在的样式块的过渡.

- 也就是说,浏览器默认会把**实现相同过渡效果的 始态和终态的 来回过渡 进行时序函数相反的操作**,而**其他如:延迟,持续时间,应用过渡/的属性都将一致.**

- ```css
  div {
          background-color: green;
          width: 100px;
          height: 100px;
          transition: 
              background-color 1s ease-out 50ms;
      }
      div:hover {background-color: red;}
  ```
  
  当鼠标移动到div元素时,将延迟50ms后,开始进行持续1s的**缓出快入**过渡效果,直到div元素变成red.
  
  当鼠标移除div元素后,仍然会先延迟50ms,然后再开始进行持续1s的**缓入快出**过渡效果,直到div元素变成green.
  
  P888(使用相反的时序函数)

# 逆转中断的过渡P889

- 即过渡还未完全结束,就被用户打断.如: 鼠标移动到元素上面会触发过渡效果,但是过渡效果还未结束,用户就将鼠标移除,从而打断了过渡效果的继续. P889

- 被打断过渡效果的元素仍然会存在反向过渡,不过这个反向过渡会根据各个浏览器自己的规则进行反向过渡; 
  
  但通常来说,这个**反向过渡的持续时间会和正向过渡的使用的时间相近**(可能相等,也可能不相等) P890

- **有些浏览器中如果过渡效果被打断**,那么它的反向过渡仍然会应用本来正向过渡效果会持续的时间,也就是说**: 反向过渡的时间仍会是:transition-delay + transition-duration的值.** P890

# 其他

## 支持动画的属性和值 P891 - P895

## 过渡是效果增强 P896

## 打印过渡 P896

# 总结

- 所有的单独过渡属性的值,存在多个,都是以逗号分隔,且transition-duration和transition-delay 与 transition-property属性的值是**一一对应关系**(如果存在多个等量的值的话.)
  
  如果transition-duration和transition-delay的参数个数 > transition-property参数个数, 则多余的值被忽略;
  
  若小于,则transition-property多余的参数会使用它们两个属性前面的值(第一个值)
  
  如果它们两个属性的值刚好为2个,则transition-property属性奇数使用 第一个值,偶数使用第2个值.