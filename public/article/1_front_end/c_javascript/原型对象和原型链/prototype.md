# 原型对象Prototype和prototype属性&原型链

## Prototype原型对象和prototype属性

- 这里的所有对象将不包括null对象
- PS:`console.log(Prototype)` 是会报错的，它会告诉你，不存在 Prototype.

除了null对象之外的所有对象(包括Object)都继承Prototype对象,而除了null 或Prototype对象其余所有对象都继承Object对象.

所有对象都默认有一个prototype属性,又或者说是指针,指向Prototype原型对象.

可以使用prototype指针指向其他指针,这样做的后果是: 将[其他指针]指向的属性/方法 会存在于prototype指针指向的Prototype对象的内存地址空间中.

即当前对象的所有实例都可以调用其[其他指针] 所指向的属性/方法.因为对象继承Prototype对象,那么存于Prototype对象中的属性/方法当然也被继承.

​ NOTICE：其他对象的实例则不可以调用,除非有其他关系导致可以调用(例如继承)

### prototype属性

1. prototype是为了节约内存空间,将对象(类的实例)的相同行为存放在Prototype原型对象 这个公共的空间中.
2. 而对象的不同属性存放在类中(简单的赋值语句是不会申请内存空间的,详情请看《现代操作系统》一书,所以这大大的节约了内存空间.

## 原型链

### 意为

JavaScript会一层层的对象往上寻找。

当实例对象本身没有某个属性或方法时,它会到构造函数的prototype属性指向的内存空间中去寻找该属性或方法。

(即object.prototype,指向的Prototype对象中）

若指向的内存空间中不存在属性/方法且它指向的是另一个实例,

→object.prototype = object2~~(可以是对象/函数/类/实例)~~

则会在object2中寻找某个属性/方法,若找不到,则再object2.prototype中寻找,

若object2.prototype指向的内存空间中也没有属性方法,且存在另一个实例,则...

如此反复,直到一个对象的原型对象为null 或直接不存在该属性/方法

因为根据定义null没有原型对象,并作为这个原型链的最后一环。

### 搜索轨迹为

object本身→instace2.protype(若指向另一个object3)→object3.prototype(若指向另一个instanceN)→...→objectN.prototype →null

**这就是原型对象的特殊之处**

- <u>object指的是对象,或者也可以说是类的实例</u>

### 值得注意的点

1. 需要注意的是,原型链只寻找到null对象（或没有找到该属性/方法）就停止,且原型链上的所有节点都是对象,不能是字符串,数字等原始类型.
   
   如: `某个构造函数.prototype = 1;` 这是没有意义的，虽然因为 JS 是动态类型缘故它不会报错。

2. 当实例对象本身就有某个属性或方法时,它将不会去构造函数的prototype属性指向的对象中去寻找该属性/方法。

### 其原型链的图形表示

<img title="" src=".//picture/原型链.png" alt="">

# [_ proto_和prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

- `__proto__`（隐式原型）与prototype（显式原型）
  
  注意：是两个 `__` 下划线

JavaScript中任意对象都有一个内置属性`[[prototype]]`, 在ES5之前没有标准的方法访问这个内置属性,但是大多数浏览器都支持通过 `__proto__` 来访问（这是浏览器内置的，并非 ES 的标准）

ES5中有了对于获取这个内置属性（prototype）的方法： Object.getPrototypeOf().

Note: Object.prototype 这个对象是个例外,它的 `__proto__` 值为null

每个实例对象（ object ）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（**prototype** ）

原型对象也有一个自己的原型对象( `__proto__` ) ,层层向上直到一个对象的原型对象为 `null`。根据定义,`null` 没有原型,并作为这个**原型链**中的最后一个环节。

几乎所有 JavaScript 中的对象都是位于原型链顶端的 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 的实例（除了 Prototype，Object 继承于它）。

`__proto__` 是私有的（且是浏览器内置的），prototype 是公共的。



# Reference

ES6 ---阮一峰 的 class继承一章 往下滑的

- 类的prototype 属性和_proto _属性
- 实例的 __ proto__ 属性
- 原生构造函数的继承
- Mixin 模式的实现
