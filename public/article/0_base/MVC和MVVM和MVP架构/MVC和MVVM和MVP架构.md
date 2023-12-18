# [MVC](https://zh.wikipedia.org/wiki/MVC)-[MVC](https://www.runoob.com/design-pattern/mvc-pattern.html)

## MVC起源

MVC是软件工程中一种软件架构模式,它是一种理念,而不是一种技术,它的实质其实是一种经验的总结,前人将错误的道路删除,正确的道路总结归纳,最后在此基础上抽象出了这种架构模式: MVC.

同样的还有MVVM架构, ***详见:MVVM*** 

## 什么是MVC架构

### 图表

![](picture\ModelViewControllerDiagram.png)

![](picture\Baidu-MVCabstract.png)

![](picture\Baidu-MVCconcreteness.png)

PS: 是控制器通知视图,将不同的结果呈现给用户的.

Model -> Controller -> View -> 呈现View给用户

***可以详见: 示例 - Java的MVC示例***

### 概念

MVC模式的目的是实现一种动态的程序设计,使程序易于修改和扩展以及简化程序的实现,并且该模式使程序的一部分的重复利用成为可能.

此模式将程序分为了三个部分(三层),将程序的复杂度简化,且使程序结构更加直观,开发人员完全可以根据自身的专场从而确定自己需要开发哪个部分.

这三个部分为:

1. Model 模型
2. View 视图
3. Controller 控制器

### Model 模型

Model 层用于封装应用程序的业务逻辑相关部分的数据以及对数据的**处理方法**. "Model" 负责访问数据,它有直接对数据访问的权力,比如:对数据库的访问等.

Model 层不依赖于 View 层或 Controller 层,也就是说,Model 并不关心它如何被显示(View)又或者被操作(Controller).

但是 Model 层封装的代码获取的数据的变化一般会通过一种刷新机制被公布,让其他层(View层)了解它的数据发生了改变.

为了实现这种机制,那些用于监视此 Model 数据变换的的 View (代码块)必须事先在 Model 注册,从而,View 就可以了解 Model 上发生的改变.

如: [观察者模式](https://zh.wikipedia.org/wiki/%E8%A7%82%E5%AF%9F%E8%80%85%E6%A8%A1%E5%BC%8F)(一种[软件设计模式](https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F))就是一种这样的机制,在JS中,[MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)就提供了这样的一种接口,让 JS 可以监听 DOM 发生的变换.

Model 层在程序中,就是那些用来 增删改查 数据的类,类中存在一些方法.这些类用来做有关于业务逻辑的部分***(详见: 什么是MVC架构-示例-Java的MVC示例)***

所谓的业务逻辑无外乎对数据的增删改查罢了.

至于为什么要把这些操作叫做业务逻辑, 你不妨想想: 业务是什么?是不是有关于资金? 而数据可以带来什么? 数据(信息)就是资金啊!

而操作呢? 操作不就是一个有关逻辑的流程? 所以对于数据的操作,不就是业务逻辑嘛!

### View 视图层

View 顾名思义:视图层. View 层负责显示数据,能够将数据有目的的去显示,这个部分多为前端应用,它的数据来自 Model 层,

但是 View 层通常是不会直接和 Model 层进行交互,而是通过 Controller 层,Controller 层控制 View 层渲染 Model 层的数据到视图, 更新数据也是通过 Controller 层.

PS：初学者可能会搞混 Controller 和 Model 的区别. ***详见: Model 和 Controller的区别.***

### Controller 控制器

Controller 层用来控制应用程序的流程,它作用域 Model 层和 View 层;

它控制数据 流向 Model 层*(M层只是对数据的操作,它需要C层来帮助它启动这部分操作)*,并且在数据发生变化时*(如:数据库的数据发生改变,C层就控制View层去更新视图)*更新视图.

### Model 和 Controller 的区别

初学者可能会搞混 Controller 和 Model,这是因为对于 MVC 设计模式不够熟悉所造成的困扰.

虽然有部分人会觉得 M 能做的事 C 统统可以做到,当然是这样子,因为一开始作者就说过: MVC 并不是技术,而是理念,你可以根据需求添加或者删除某些层,这是很正常的.

至于为什么这个理念要分为 C 和 M, 而不是就只有1个 C ? 

首先你需要理解 C 的应用场景和 C在 MVC 里面的职责是什么,你才能清楚的直到 C 到底和 M 的区别: 

C 在分层里面作为 M 和 V 的桥梁,负责把 V 的请求派发给 M 去处理*(C操作V访问M,从而呈现数据)*,抽出 C 这一层之后会大大提高整体架构的灵活性,并且 C 也可以单独拎出来测试.

提高了灵活性,那么价值不言而喻. 

你要知道,在现实业务场景中, 需求是多变的,如果有一个接口,需要根据不同的状态,不同的类型,不同的客户端等参数来调用不同的业务逻辑, 那么此时 C 的价值就会被完美的体现出来,

它可以让 M 层根据不同状态不同类型的请求或需求拆分成一个个单一职责的业务接口,然后 C 层根据不同的参数来调用 M 层暴露出来具体的业务逻辑接口,

这才是 C 的价值,它隔离了 V 层的变化,也能适应 V 层的变化,而 M 层也相应变得更加稳定.也就是说C层用来控制M和V层,开发者并不会直接控制V和M,而是通过C这个"代理".***(详见:图表)***

如果你使用 C 将 M 层的工作都做了,这不是不可以,只是如果出现了以上场景中的业务,你需要花费更多的时间去完成,成本也会大大增加.

简单来说,你可以认为:

Model 层的核心是数据的抽象, Controller 层是抽象的数据->呈现数据 这一过程的转化逻辑, View 层则是单纯的渲染数据,完成用户交互等行为.

或者认为: C 是控制输入, V 控制输出 M 操作数据.注: Controller 层还可以根据需求由底层到顶层进行更细致的逻辑拆分.

---

Controller 层用来控制数据的输入,至于为什么不使用 View 直接访问 Model, 而是用 C 层操作V访问M呢?不妨想想:  

没有C, 那么我要改变数据,需要通过M,显示数据需要通过V访问M,如果 M 层发生改变，则 V 可能也要改变；但是如果有C，M 层发生改变，V 却不用改变，C 层也不用，只要接口不变就好。

（而 V 直接访问 M，就不存在接口不变的情况，M 发生改变，也就是数据形式可能发生改变，那么 V 需要显示的数据发生改变，它的架构也要跟着改变）

即：只需要使用C操作V访问M,操作M访问数据,这样不仅简化了操作,还使得架构更加清晰

### 示例

#### [JS的MVC示例](https://zh.wikipedia.org/wiki/MVC#.E5.AE.9E.E9.99.85.E8.8C.83.E4.BE.8B)

```html
<script>
  /** 模拟 Model, View, Controller */
  var M = {}, V = {}, C = {}; // 数据库

  /** Model 负责存放资料 */
  M.data = "hello world";

  /** View 负责将资料输出到荧幕上 */
  V.render = (M) => { document.write(M.data); }

  /** Controller 作为一个 M 和 V 的桥梁 */
  C.handleOnload = () => { V.render(M); }

  /** 在网页加载时候呼叫 Controller */
  window.onload = C.handleOnload;
</script>
```

- 网页加载时，执行 C.handleOnload 函数
- C.handleOnload 函数使得 View 层渲染 M 层的数据到页面。

#### [Java的MVC示例](https://www.runoob.com/design-pattern/mvc-pattern.html)

##### 创建模型 Model

```java
// 创建模型 Model
public class Student {
   private String rollNo;
   private String name;
   public String getRollNo() {
      return rollNo;
   }
   public void setRollNo(String rollNo) {
      this.rollNo = rollNo;
   }
   public String getName() {
      return name;
   }
   public void setName(String name) {
      this.name = name;
   }
}
```

##### 创建视图 View

```java
// 创建视图 View
public class StudentView {
   public void printStudentDetails(String studentName, String studentRollNo){
      System.out.println("Student: ");
      System.out.println("Name: " + studentName);
      System.out.println("Roll No: " + studentRollNo);
   }
}
```

##### 创建控制器 Controller

```js
// 创建控制器 Controller
public class StudentController {
   private Student model;
   private StudentView view;

   public StudentController(Student model, StudentView view){
      this.model = model;
      this.view = view;
   }

   public void setStudentName(String name){
      model.setName(name);    
   }

   public String getStudentName(){
      return model.getName();    
   }

   public void setStudentRollNo(String rollNo){
      model.setRollNo(rollNo);      
   }

   public String getStudentRollNo(){
      return model.getRollNo();     
   }

   public void updateView(){           
      view.printStudentDetails(model.getName(), model.getRollNo());
   }  
}
```

##### 使用 StudentController 方法来演示 MVC 设计模式的用法

```java
// 使用 StudentController 方法来演示 MVC 设计模式的用法.
public class MVCPatternDemo {
   public static void main(String[] args) {

      //从数据库获取学生记录
      Student model  = retrieveStudentFromDatabase();

      //创建一个视图：把学生详细信息输出到控制台
      StudentView view = new StudentView();

      StudentController controller = new StudentController(model, view);

      controller.updateView();

      //更新模型数据
      controller.setStudentName("John");

      controller.updateView();
   }

   private static Student retrieveStudentFromDatabase(){
      Student student = new Student();
      student.setName("Robert");
      student.setRollNo("10");
      return student;
   }
}
```

##### 执行输出结果

```basic
执行输出结果:
Student: 
Name: Robert
Roll No: 10
Student: 
Name: John
Roll No: 10
```

##### 总结

显然的,这个示例,是一个基于MVC模式的程序,我们在这里可以清晰的发现 C 层和M层之间的区别.

C层是桥梁, 它用来操作M和V层***(详见:图表)***.

- 在C层里面操作V层,V层访问M,从而呈现数据

- 在C层里面操作M层,M层对数据进行增删改查,
  
  C层还可以对数据进行输入,让M层去添加数据(到数据库)

## [MVC的优点](https://zh.wikipedia.org/wiki/MVC#%E4%BC%98%E7%82%B9)

在最初的[JSP](https://zh.wikipedia.org/wiki/JSP)网页中,像[数据库](https://zh.wikipedia.org/wiki/数据库)查询语句(SQL query)这样的数据层代码和像[HTML](https://zh.wikipedia.org/wiki/HTML)这样的表示层代码是混在一起.

虽然有着经验比较丰富的开发者会将数据从表示层分离开来,但这样的良好设计通常并不是很容易做到的,实现它需要精心地计划和不断的尝试.

MVC可以从根本上强制性地将它们分开.尽管构造MVC应用程序需要一些额外的工作,但是它带给我们的好处是毋庸置疑的.

首先,多个 View 能共享一个 Model .如今,同一个Web应用程序会提供多种用户界面,例如用户希望既能够通过浏览器来收发[电子邮件](https://zh.wikipedia.org/wiki/电子邮件),还希望通过手机来访问[电子邮箱](https://zh.wikipedia.org/wiki/电子邮箱),这就要求Web网站同时能提供[Internet](https://zh.wikipedia.org/wiki/Internet)(电脑)界面和[WAP](https://zh.wikipedia.org/wiki/WAP)(手机)界面.

在MVC设计模式中, Model 响应用户请求并返回响应数据,View 负责格式化数据并把它们呈现给用户,此时的业务逻辑和表示层是分离的,同一个 Model 可以被不同的 View 重用,所以大大提高了代码的可重用性.

其次,Controller 是自包含（self-contained,指高独立内聚）的对象,与 Model 和 View 保持相对独立,所以可以方便的改变应用程序的数据层和业务规则.

例如,把数据库从[MySQL](https://zh.wikipedia.org/wiki/MySQL)移植到[Oracle](https://zh.wikipedia.org/wiki/Oracle),或者把[RDBMS](https://zh.wikipedia.org/wiki/RDBMS)数据源改变成[LDAP](https://zh.wikipedia.org/wiki/LDAP)数据源,只需改变 Model 即可.

一旦正确地实现了控制器,不管数据来自数据库还是[LDAP](https://zh.wikipedia.org/wiki/LDAP)服务器,View 都会正确地显示它们(因为C层用来控制M和V层,开发者并不会直接控制V和M,而是通过C这个"代理")

由于MVC模式的三个模块相互独立,改变其中一个不会影响其他两个,所以依据这种设计思想能构造良好的少互扰性的构件.

此外,Controller 提高了应用程序的灵活性和可配置性.Controller 可以用来连接不同的 Model 和 View 去完成用户的需求,

也可以构造应用程序提供强有力的手段.给定一些可重用的 Model 、 View 和Controller 可以根据用户的需求选择适当的 Model 进行处理,然后选择适当的的 View 将处理结果显示给用户.

## [评价、误解及适用范围](https://zh.wikipedia.org/wiki/MVC#%E8%AF%84%E4%BB%B7%E3%80%81%E8%AA%A4%E8%A7%A3%E5%8F%8A%E9%80%82%E7%94%A8%E8%8C%83%E5%9B%B4)

MVC模式在概念上强调 Model, View, Controller 的分离,**各个模块也遵循着由 Controller 来处理消息**.

Model 掌管数据源,View 负责数据显示的职责分离原则,因此在实现上,MVC 模式的 Framework(框架) 通常会将 MVC 三个部分分离实现.

MVC 职责分离也带来了一个现代软件工程要求的重要特性：可测试性 (Testability),

MVC-based 的应用程序在良好的职责分离的设计下,各个部分可独立行使[单元测试](https://zh.wikipedia.org/wiki/单元测试),有利于与企业内的自动化测试、[持续集成](https://zh.wikipedia.org/wiki/持續整合) (Continuous Integration) 与[持续发行](https://zh.wikipedia.org/w/index.php?title=持續發行&action=edit&redlink=1) (Continuous Delivery) 流程集成,减少应用程序改版部署所需的时间.

---

MVC 模式的应用程序的目的就是希望打破以往应用程序**使用的大杂烩程序撰写方式**,并间接诱使开发人员以更高的架构导向思维来思考应用程序的设计.

因此对于一个刚入门的初学者来说,架构导向的思考会有一定的门槛,需要较多的实现与练习才能具备相应的能力,

大多数的初学者还是较习惯于大杂烩式的程序撰写,所以可能会对 MVC 模式抱持着排斥或厌恶的心态,

然而 MVC (或是其他的[Design Patterns](https://zh.wikipedia.org/w/index.php?title=Design_Patterns&action=edit&redlink=1)) 都是有助于应用程序长远的发展,虽然大杂烩式的程序也可以用来发展长生命周期的应用程序,

但是相较于 MVC,大杂烩式的程序在可扩展性和可维护性 (尤其是可测试性) 上会远比 MVC 复杂很多,

相反的,MVC 模式的应用程序是在初始开发时期必须先思考并使用软件架构,使得开发时期会需要花较多心力,但是一旦应用程序完成后,可扩展性、可维护性和可测试性反而会因为 MVC 的特性而变得容易.

因此,MVC 模式在已有众多优秀 Framework 的现代,早就已经没有不适合小型应用的问题,

小型的应用还是可以由 MVC Framework 的应用来获取 MVC 的优点,同时它也能作为未来小型应用扩展到大型应用时的基础与入门砖.

若一开始就想要做大型应用,那么 MVC 模式的职责分离以及要求开发的架构思考会更适合大型应用的开发.

# MVP

## 起源

MVP模式是从经典的MVC模式演变过来的,所以MVP和MVC的基本思想是基本相同的,但是也有区别.

即: MVP中的M和V并不直接进行交互,而是进行数据绑定,V和M的交互完全在P中发生。而 MVC 中，C 控制 V 直接访问 M，使得 V 会和 M 进行交互。

## 什么是MVP?

MVP从MVC演变而来,通过表示器将视图V与模型M巧妙地分开.

在该模式中,视图通常由表示器初始化,它呈现用户界面（UI）并接受用户所发出命令,但不对用户的输入作任何逻辑处理,而仅仅是将用户输入转发给表示器.

通常每一个视图对应一个表示器,但是也可能一个拥有较复杂业务逻辑的视图会对应多个表示器,(**1** 个视图 对 **多** 个表示器)

每个表示器完成该视图的一部3分业务处理工作,降低了单个表示器的复杂程度,一个表示器也能被多个（其他的）有着相同业务需求的视图复用,增加单个表示器的复用度。

表示器包含大多数表示逻辑,用以处理视图,与模型交互以获取或更新数据等；模型描述了系统（对数据）的处理逻辑,模型对于视图一无所知.

即：P 层控制 表示器和 M 层进行交互，表示器再将从 M 层获取的数据更新到 V 层。

MVP的全称为**Model-View-Presenter**,Model提供数据,View负责显示,Controller/Presenter负责逻辑的处理.

## MVP与MVC重大的区别：

在MVP中View并不直接使用Model,它们之间的通信是通过Presenter(MVC中的Controller)来进行的,所有的交互都发生在Presenter内部,

而在MVC中View会直接从Model中读取数据而不是通过Controller（C 控制 V 访问 M）

由于MVP和MVC都是差不多的,除了以上的区别以外,所以我这里就不单独列出每层的作用了.

## MVP的优点和缺点

### 优点

MVP模式下表示层(View(的优势体现在下面三个方面：

**1、View与Model完全隔离.**

得益于此,Model和View之间具有良好的松耦合设计,这意味着,如果Model或View中的一方发生变化,只要交互接口不变,另一方就没必要对上述变化做出改变.

注：在 MVC 中，由于 C 控制 V 直接访问 M，所以如果 M 发生改变，V 也要相对应的去适应 M 的改变（如：数据改变，呈现数据的方式也要发生改变），因为它们之中并没有那种公共接口。

这使得Model层的业务逻辑具有很好的灵活性和可重用性.

**2、Presenter与View的具体实现技术无关.**

也就是说,采用诸如Windows表单,WPF,Web表单等用户界面构建技术中的任意一种来实现View层,都无需改变系统的其他部分.

甚至为了使B/S,C/S部署架构能够被同时支持,应用程序可以用同一个Model层适配多种技术构建的View层.

**3、可以进行View的模拟测试.**

过去,由于View和Model之间的紧耦合,在Model和View同时开发完成之前对其中一方进行测试是不可能的.

出于同样的原因,对View或Model进行单元测试很困难.现在,MVP模式解决了所有的问题.

在MVP模式中,View和Model之间没有直接依赖,开发者能够借助模拟对象注入测试两者中的任一方.

### 缺点

没有任何设计模式是完美无缺的,MVP也是如此.

MVP的明显缺点是**增加了代码的复杂度**,特别是针对小型Android应用的开发,会使程序冗余.

Presenter中除了应用逻辑以外,还有大量的View->Model,Model->View的手动同步逻辑,会导致**Presenter臃肿,维护困难**.

视图的渲染过程也会放在Presenter中,造成视图与Presenter交互过于频繁,如果**某特定视图的渲染很多,就会造成Presenter与该视图联系过于紧密**,

**一旦该视图需要变更,那么Presenter也需要变更了**,不能如预期的那样降低耦合度和增加复用性.

## 总结

在**MVC中,M并不依赖于V,但是V却依赖于M**的,因为V会直接访问M,这就导致,如果有些业务逻辑在V层中实现,那么当需求改变,需要更改V层时,就比较困难了,至少那些业务逻辑是无法重用的.

不妨想想,在JS中,获取数据后,操作DOM使得数据渲染在页面上,而如果M层换饿了其他M,是不是就无法复用V中业务逻辑了?

而在MVP中,MVP(对MVC)最重大的改变就是在于Presenter完全把Model和View进行了分离.

在交互接口不变(P层不变)的情况下,如果V和M需要变更,另一方就没必要对变化做出改变,因为它们之间并不直接耦合,而是隔了一层P,只要P不变就好.

还是上面那个例子,使用了MVP模式,此时M层换了, 但是P保持变, 那么V就不会受到M层的影响, 因为是V是和P交互,而不是M.

还有例子则是:

如果是MVC模式,V直接访问M, M层的一些方法变了,那么V层对应的方法也需要发生改变,***详见: MVC-MVC - ... - Java的MVC示例.***

但是如果是MVP, 显然的,只要P层保持不变,M和V任意改变,都不会影响对方.

注:在MVC中,M并不依赖于V, 从而V改变,不会影响M,反过来则会.

# MV VM

## 起源

MVVM的起源非常简单,它是由 MVP 模式演变过来的,同时也可以说是 MVC 模式的升级版, 因为  MVP 也是 MVC 演变过来的.

## 概念

MVVM 是 MVP 的升级版,或者说是MVC的改进版. 它对MVP的V进行状态和行为的抽象, 也就是说将View和View中的业务逻辑分开.

这是意思呢?View中为什么会有业务逻辑? ***详见: View层中的业务逻辑***

那View和View中的业务逻辑分开之后, 视图在哪里? 业务逻辑又在哪里呢? 此时的视图在View层, 业务逻辑在ViewModel层.

也就是说,MVVM中的V, 只存在纯的视图,而不包含业务逻辑,业务逻辑都在VM层.

MVVM共分为四个部分:

1. Model 模型

2. View 视图

3. ViewModel 视图模型

4. Binder 绑定器
   
   该层是隐含在MVVM中的,用来绑定声明性数据和命令.

我们知道,MVVM模式是由MVP模式演化过来的,但是它是怎么怎么演化的呢? MVVM是由 MVP 模式 + [WPF](https://baike.baidu.com/item/WPF)结合的应用方式 发展演变过来的一种新型架构模式.

MVVM立足于原有的 MVP模式,通过把WPF的新特性糅合进去,从而应对日益发展的复杂度需求变化.

这就是MVVM的本质,它并没有想象的那么难,就是一个技术和另一个技术的结合,然后经过总结,加工,抽象出来的一种软件工程设计理念罢了.

你能信吗,MVVM诞生于一篇博客,由微软架构师Ken Cooper和Ted Peters开发,最后John Gossman于2005年在他的博客上发表了MVVM.

## [数据绑定](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)-[Baike](https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)

### 概念

数据绑定是将"提供器"的数据源与"消费者"绑定并使其同步的一种通用技术.这通常是由两种不同语言的数据/信息源构成.

如:将HTML元素绑定到JS的对象上,或者是将Java UI元素绑定到Java对象.

在数据绑定的过程中,每个数据的更改都会由 绑定到数据的 元素自动反射(变化). "数据绑定"这一术语也表示一个外部数据会随着元素更改而产生变化,并且底层数据自动更新以反应此更改.

简单来说就是:  两个被绑定的对象(元素和JS对象), 其中一方的数据改变了,那么另一方也会被改变.    

我们从一个Windows窗体的角度来看,"数据绑定"是一种把数据绑定到一种用户界面元素（控件）的通用机制。

在Windows窗体中有两种数据绑定类型：简单绑定和复杂绑定。

### 简单绑定

简单的数据绑定是将一个用户界面元素(如:HTML元素)的属性(如:id, class等)绑定到一个类型实例上的某个属性的方法.

比如: 有个HTML元素,它存在一个class属性,现在我们将这个class属性绑定到new String()这个实例(对象)的某个属性上, 而这种操作,就叫做简单数据绑定.

### 复杂绑定

复杂数据绑定是把一个基于列表的用户界面元素（比如[ComboBox](https://baike.baidu.com/item/ComboBox/9598905)、Grid）绑定到一个数据实例列表（比如[DataTable](https://baike.baidu.com/item/DataTable/5437936)）的方法。

举个例子来说: 将一组HTML元素 绑定到 一个 JS对象列表上.

### WPF的数据绑定

WPF的[数据绑定](https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A)技术和Presentation Model相结合,使得开发人员可以将View和其中的业务逻辑分离,这种数据绑定技术简单且高效,我们通常将这种WPF的数据绑定技术和MVP的结合称之为MVVM.

MVVM和MVP模式是非常相似的, 不过MVVM没有P,有的是VM,这个VM是为View层量身定制的Model,而这个Model也就是ViewModel了,即:为View量身定制的Model.

## Model 模型

没啥好说的,***详见: MVC-MVC - 什么是MVC架构 - Model模型.***

## View 视图

MVVM模式的View不同于MVC或MVP,它是纯视图,也就是,不包含业务逻辑,业务逻辑都在ViewModel层. 其他的和MVC,MVP是一样的.

在MVVM中,View和ViewModel进行了数据绑定.

## ViewModel 视图模型

VM层是MVVM模式的核心层,它是区别于MVP和MVC的关键,它是用来暴露公共属性和命令的 视图的抽象.

也用来取出Model的数据,同时帮忙处理View中因为需要展示数据从而涉及的业务逻辑部分,且 **ViewModel通过数据绑定技术绑定到 View上,**

从而**使得一方更改可以影响另一方**, 看似加强了耦合性,实则节约了开发时间,因为VM通常是由我们使用的框架内部实现的,并不是自己实现.

VM层实际上就是为View层量身定制的Model,不妨想想:VM层的作用是不是用来处理View层中的业务逻辑部分的? 

而View层的业务逻辑无外乎增删改查数据,我们将这部分进行分离,是不是就等于专门为View设计了个Model***(详见: 什么是MVC架构 - Model 模型)***.

VM层不仅分离的View中的业务逻辑部分,还将View和Model分离,使他们不在耦合,这个作用就和MVP中P一样,只要VM公共接口不变,那么M改变不会影响V.

注: VM层类似于MVP中的P, View中的数据需要通过VM访问M获取, 然后在由于数据绑定机制，VM 的更新同时也会更新到 V 中；显然的，这里的 V不能直接访问Ｍ.

---

Wiki中

MVVM的视图模型是一个值转换器，这意味着视图模型负责从模型中暴露（转换）[数据对象](https://zh.wikipedia.org/wiki/对象_(计算机科学))，以便轻松管理和呈现对象。

在这方面，视图模型比视图做得更多，并且处理大部分视图的显示逻辑。视图模型可以实现[中介者模式](https://zh.wikipedia.org/wiki/中介者模式)，组织对视图所支持的[用例](https://zh.wikipedia.org/wiki/用例)集的后端逻辑的访问。

- 中介者模式: 中介者模式定义了一个中介者对象，该对象封装了系统中对象间的交互方式.
  
  比如: 封装了HTML节点对象访问Model中的对象的交互方式.

## Binder 绑定器

使得 数据和命令绑定 并隐含在MVVM模式中.

在Microsoft[解决方案堆](https://zh.wikipedia.org/w/index.php?title=解决方案堆&action=edit&redlink=1)中,绑定器是一种名为[XAML](https://zh.wikipedia.org/wiki/XAML)的[标记语言](https://zh.wikipedia.org/wiki/置标语言).

绑定器使开发人员免于被迫编写样板式逻辑来同步视图模型和视图（因为 VM 和 V 层是绑定的，一方改变，另一方会自动更新）

在微软的堆之外实现时,声明性数据绑定技术的出现是实现该模式的一个关键因素。

## View层中的业务逻辑

通过MVC和MVP模式,我们已经知道,View是用来显示数据给用户看的,但是这并不代表View中就不存在业务逻辑了***(业务逻辑,详见: MVC-MVC -什么是MVC架构-Model模型).***

比如: 你需要在View中显示数据时,是不是需要从M / P（P 控制表示器去访问 M） 去获取数据, 而这种行为,就已经构成了业务逻辑.

所以View中是具有业务逻辑的,至于多少之分, 是根据需求而定的,通常来说,View中的业务逻辑无外乎增删改查.

## 理论基础

MVVM 旨在利用 WPF 中的数据绑定函数,通过从视图层(View)几乎删除所有GUI代码([代码隐藏](https://zh.wikipedia.org/wiki/ASP.NET)),更好地促进视图层开发 与模式其余部分的分离.

笔者注:这里指的删除GUI代码,实际上应该指的是将GUI代码(HTML元素)和其中的业务逻辑分离.

模式的独立使得交互设计师可以专注于用户体验需求,而不是对业务逻辑进行编程。

这样,应用程序的层次可以在多个工作流中进行开发以提高生产力。即使一个开发人员在整个代码库上工作,视图与模型的适当分离也会更加高效,因为基于最终用户反馈,用户界面通常在开发周期中经常发生变化,而且处于开发周期后期。

MVVM模式试图获得MVC提供的功能性开发分离的两个优点,同时利用[数据绑定](https://zh.wikipedia.org/wiki/数据绑定)的优势和通过绑定数据的框架尽可能接近纯应用程序模型。

MVVM使用绑定器(Binder)、视图模型(ViewModel)和任何业务层(Model等)的数据检查功能来验证传入的数据,结果是模型和框架驱动尽可能多的操作,消除或最小化直接操纵视图的 应用程序逻辑(如:减少直接操作DOM).

## 缺点

MVVM不是完美无缺的,它的创作者John Gossman本人直接指出:

- 实现MVVM的开销对于简单的UI操作是"过度的".

- 他说,对于更大的应用来说,推广ViewModel是很困难的.

- 而且,它说明了非常大的应用程序中的数据绑定会导致相当大的内存消耗。
  
  因为数据绑定实际上是在框架内部 通过数据绑定函数实现的,每一个数据绑定函数都会存于栈中,从而占用内存空间.

# 三种模式的区别

## MVC和[MVP](https://baike.baidu.com/item/MVP%E6%A8%A1%E5%BC%8F)的区别

MVP是从MVC演变而来,它们的基本思想有相通的地方：Controller/Presenter负责逻辑的处理,Model提供数据,View负责显示.

MVP与MVC有着一个重大的区别：

在MVP中View并不直接访问Model,它们之间的通信是通过Presenter(MVC中的Controller)来进行的,所有的交互都发生在Presenter内部,而**在MVC中View会直接从Model中读取数据而不是通过Controller**.

或许你会感觉奇怪,我们前面明明是通过C让数据进行呈现的,为什么这里说MVC是V直接访问M呢? 

这是因为,虽然开发者通过C去进行V和M的操作, 但是C的操作是: 使**V访问M**,从而让V获得M的数据,使数据呈现在View上. 所以这里就是 V直接访问M.***详见: Java的MVC示例.***

而MVP不是,V并不直接访问M,而是V->P->M.

*当然了,这有好处(降低V和M的耦合),也有坏处(复杂度较高,代码可能冗余,V和P耦合度可能较高,改变P可能需要改变V), **详见: MVP - MVP的优点和缺点.***

## MVP和MVVM

这几乎不用说了, 好好看以上的知识点,你就明白了.

MVVM在MVP的基础上, 增加了WPF的数据绑定技术,并使View中其中的业务逻辑分开,形成了ViewModel, 然后还使得View和ViewModel实现了数据绑定技术(双向绑定)

而数据绑定技术是通过Binder(绑定器)实现的,它隐含在MVVM中.

MVP则不存在View和其中的业务逻辑分离,它是MVC演变过来的,MVP和MVVM是基本类似的,但是区别就是在于 MVP 不存在数据绑定和 V 层的业务逻辑分离,它只是隔离了View和Model
