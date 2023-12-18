[TOC]

# [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

## 描述

Set 是 ES6 中新添加的一种数据结构，它和 Map 不同，Set 并不是以键值对的方式存储，它反而类似于数组，但是和数组不同的是，Set 中的每个值都是唯一的。

并且 Set 本身是一个构造器（构造函数），我们可以通过实例化 Set 来创建一个 Set 的实例：

```js
const set = new Set()
```

- TIP：Map 的 key 也是唯一的，但是 key 所对应的值不是，详见：<a href='#向Map对象中嵌入重复的键则会覆盖前者'>向Map对象中嵌入重复的键则会覆盖前者</a>

## 语法

- new Set([iterable]);

`new Set([iterable]);` 代表的是我们可以向 Set() 中传递一个可选的可迭代对象，这和 `new Map([iterable])`  的行为是一样的。

## 示例

### 向 Set() 传递一个可迭代对象

```js
const set = new Set([1,2,3]);
console.log(...set); // 1 2 3
```

### Set() 的值是唯一的，后面重复值将忽略

```js
const set = new Set([1, 2, 3, 4, 1, 2, 3])
console.log(...set); // 1 2 3 4
```

### 无法通过获取数组索引值的方式获取 Set 值

```js
const set = new Set([1, 2, 3, 4])
set[0]; // error
```

### 向 Set 的实例添加值

```js
const set = new Set();
set.add(5);
console.log(...set); // 5
```

### 向 Set 实例加入值时，不会发生类型转换

Set 内部判断两个值是否不同，使用的算法叫做 “Same-value-zero equality”，它类似于精确相等运算符（===）。

主要的区别是：向 Set 加入值时认为 NaN 等于自身，而精确相等运算符认为 NaN 不等于自身。

```js
    const set = new Set();
	// 5 和 '5' 并不是重复值
    set.add(5);
    set.add('5');
    console.log(set); // Set(2) {5, "5"}
	
	// NaN 在 Set 中等于自身
    set.add(NaN);
    set.add(NaN);
    console.log(set); // Set(3) {5, "5", NaN}
	
	// NaN 使用 === 和自身作比较时，它们并不相等，即使使用 == 也一样。
    console.log(NaN === NaN); // false
    console.log(NaN == NaN); // false
```

### 虽无法在 new Set() 时向 Set() 添加 {}，但是可以使用 Set 的实例 add() 添加 {}

虽然我们无法在 new Set() 时，向 Set() 中添加 {}，但是我们可以使用 Set.prototype.add() 向 Set 实例中添加 {}，这是因为：使用 set.add() 时，程序已经默认 set 是一个可迭代对象，插入 {} 只是单纯的往可迭代对象中添加 {}。

 值得注意的是：向 set 添加的 {} 总是认为它们不是相等的。

```js
	const mySet = new Set({}); // error,object is not iterator object
	const set = new Set()
    set.add({})
    set.size // 1
    set.add({})
    set.size // 2
    console.log(set); // Set(2) {{…}, {…}}
```

### Set 可以和 Map 一起使用，反之亦然

```js
    const map = new Map([
        [1, 2],
        [2, 3],
        [3, 4]
    ])
    // 向 Set 中添加 map 作为 Set 的值
    const set = new Set(map)
    let setIterator = set.values()
    console.log(setIterator.next().value) // [1, 2]
    console.log(setIterator.next().value) // [2, 3]
    console.log(setIterator.next().value) // [3, 4]
```

把 map 作为参数传递给 Set() 时，Set() 中存的是 map 中的”键值对“：[key,value]

### 获取 Set 的值通常只能使用遍历

```js
    const set = new Set([1, 2, 3, 4, 1, 2, 3]);
    set.forEach((v, k) => {
        console.log(v, k)
    })
/**
    1 1
    2 2
    3 3
    4 4
*/
```

- Set.prototype.forEach(callback[,thisArg])

- `forEach` 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。

  - callback：一个回调函数，接受三个参数。

    - currentValue

      currentValue 是正在被操作的元素。

    - currentKey 可选

      由于 Set 集合没有索引，所以 currentKey 也表示这个正在被操作的元素。

    - set 可选

      调用当前 `forEach` 方法的集合对象

这里的 v 和 k 代表当前正在被操作的元素和当前元素的索引，但是由于 Set 集合并没有索引，所以 第一个参数和第二个参数都代表当前正在被操作的元素。

当然，除了 forEach() 之外还有其他很多方式，如：for…of,Set.prototype.values() 等等

### [Map 实例的方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set#%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)

### [Map 实例属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set#Properties)

Map 实例的属性只有一个：

[`Set.prototype.size`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/size)：返回 Set 对象中的值的个数

## 参考文档

- [MDN-Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [阮一峰-Set](https://es6.ruanyifeng.com/?search=Set&x=0&y=0#docs/set-map#Set)

# [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

## 描述

Map是一个对象,它的作用为保存键值对,即如: `key: "key的值", value: "value的值"`这样的形式,

且JS中的任何值(类型)都可以作为Map对象中的key或value.

## 为什么有Map对象

在ES6之前,还不存在Map对象,只有Object对象,而Object对象本质上就是键值对的集合(Hash解构),

即key:value这样的形式,虽说这样是很不错,但是Object是存在限制的,例如:

- 最大的限制就是:Object的key只能存储字符串,不能存储任何其它类型的值, 如果存储了其他类型的值,则JS引擎会尝试将之自动转换为字符串,若不能转换,则报错,
- 并且Object对象不存在迭代器，有关迭代器，参见：[yomua-gitee-迭代器和生成器以及协议](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/JavaScript%E8%A7%A3%E6%9E%90/ES6/%E5%BC%82%E6%AD%A5%E6%93%8D%E4%BD%9C%20%E2%88%9A%C3%97/Generator&Thunk/%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E7%94%9F%E6%88%90%E5%99%A8%E4%BB%A5%E5%8F%8A%E5%8D%8F%E8%AE%AE.md)

基于以上两点,Map数据结构(对象)应运而生,它类似于对象,也存储键值对,但是其"键"的范围却面向与JS的任何类型的值,

也就是说Map提供了一种"值"和"值"的对应,而Object则是"键"与"值"的对应,所以基于这点来看,Map结构是一种相较于Object来说更完善的Hash结构的实现,何况**Map还是一个迭代器**呢.

## 语法

`new Map([iterator])`

### 参数解析

#### iterator可选

iterator即一个可迭代的对象,可以是数组或者是其他任何的iterator对象,它是可选的,需要注意的是,在选择这样的写法时,中括号无法省略，注意：`null会被当做undefined。`

- 虽说是只要是可迭代对象就行,但是iterator只接受数组和任何具有 Iterator 接口、**且每个 Map 都是一个双元素的数组的数据结构作为参数,其他则不行**。

  狭义的讲（这意味着这句话并不是那么正确，只是方便你理解）：Map 接受一个二维数组，其中数组中的每个元素都是一个数组，里面应该只存入两个值，第一个值：key，第二个值：value。

  例如：[ [key,value],[],[]  ]

- 多个数组中使用逗号分割,其中每个数组的索引0,1分别代表:键,值

其意思为: 将中括号中的键值对,作为其Map对象的键值对. 其写法通常为:

```js
let map = new Map([
    ['我是键', '我是值', 1, 2],
    [1, 2],
    [{'Name':'Yomua'}, {Love:'Yhw'}]
])
console.log(map); 
typeof map; // object
```

注意,其中中括号里面的如果有很多个键值对则要用逗号分隔,且**键值对只能写在数组中**, 数组中的索引0和1分别对应键和值, 如果有多余的索引,则被忽略.

以上的示例,其结果为:

![](picture/new Map([]).png)

​	即输出:{"我是键" => "我是值", 1 => 2, {Name:Yomua} => {Love:"Yhw"} }

- 看到这个=>箭头了吗,是的Map对象和Object还是有点区别的,即=>左边代表key,右边代表value.(但是实际上map仍是object)

  意思应该为: key对应的是(=>) value.

## 描述续

### new Map([])相当于调用forEach()和Map.prototype.set()

当我们使用new Map()构造函数新建Map对象时,其实相当于调用()圆括号中的数组的forEach()方法,然后在这个forEach()方法的第一个参数(callback)中,

将这个数组中的嵌套数组的索引0和1的值作为callback的形参变量,再让Map对象调用set()方法将索引0和1的值分别作为key和value存入到Map对象中.

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
/* 等效于 */ 
const map = new Map();
const items = [
  ['name', '张三'],
  ['title', 'Author']
]
items.forEach(
	function([key, value]) {
        return map.set(key, value)
    }
)
```

- ***function([key, value])*** 

  key和value分别接收的是当前正被遍历的数组的索引值,其中key为第0个索引值,value为第1个索引值,参见<各类属性&方法.md>

- ***return map.set(key, value)***

  调用map的set()方法,设置key为键,value为值,然后将被改变的值的Map对象返回.

### 向Map对象中嵌入重复的键则会覆盖前者

对于Map数据结构来说,同一个Map中,无法存在两个相同的键的值,即如果后面存入的键和前面的某个键相同,则**后面键和值会覆盖前面的键和值**,值就不会这样子,Map允许值完全重复.

至于为什么会这样子,是因为Map对象保存键值对时,能够记住键的原始插入顺序,并且在被遍历时,Map对象是按插入的先后先后顺序返回的值的.

即先插入(存入)Map中的键,将被先输出,后插入的后输出:

```js
   let map = new Map([
        ['我是键', '我是值'],
        [1, 2],
        [{ 'Name': 'Yomua' }, { Love: 'Yhw' }]
    ])
    for(let p of map) {
        console.log(p)
    }
/**
    ["我是键", "我是值"]
    [1, 2]
    [{ 'Name': 'Yomua' }, { Love: 'Yhw' }]
*/
```

### Map键的绑定

请看以下的 *Map的方法-最常用-Map.prototype.get(key)*.

由此可知,Map的键其实是跟内存地址绑定的,只要内存地址不同,就视为两个键,即使这个两个键所存的值是一样的都无关紧要.

这就解决了同名属性碰撞（clash）的问题,我们扩展别人的库的时候,如果使用对象作为键名,就不用担心自己的属性与原作者的属性同名.

但是有一点例外,**如果 Map 的键是一个简单类型的值（数字、字符串、布尔值,这种原始值）,则只要两个值严格相等,Map 将其视为一个键,**

​	*比如0和-0就是一个键,布尔值true和字符串true则是两个不同的键.*

另外,undefined和null也是两个不同的键.虽然NaN不严格相等于自身,但 Map 将其视为同一个键.

## Map的属性

### Map.prototype.constructor

返回一个函数,它创建了实例的原型.默认是Map函数.

### Map.prototype.size

#### 描述

返回Map对象的键值对的数量.

#### 示例

```js
    let { log } = console;
    const map = new Map([
        [0, 'yomua'],
        [1, 'yhw']
    ])
    log(map.size); // 2
```



## Map的方法

### 最常用

#### [`Map.prototype.set(key, value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set)

##### 描述

设置Map对象中键的值.返回该Map对象.

如果key已经有值,则对应的键值会被更新,否则就生成该键和值.

有意思的是,set()方法返回的是当前的Map对象,即谁调用set()方法,则谁会被设置键和值以及被更新. 所以我们可以采用链式的写法.	

​	*因为每调用一次set()方法,Map的实例会直接被更新,即实时更新,所以可以采用链式写法.*

##### 示例

```js
    const m = new Map();
    m.set('edition', 6)        // 键是字符串
    m.set(262, 'standard')     // 键是数值
    console.log(m.set(undefined, 'nah'))  // 键是 undefined
```

- ​	链式写法

```js
    let map = new Map()
        .set(0, "a")
        .set(1, "b")
        .set(2, "c");
    console.log(map);
/**
	map实例中的索引0,1,2分别对应的key和value为:
		0,a
		1,b
		2,c
*/
```

- 使用表达作为key

```js
    let x = 1 + 2;
    let map = new Map()
        .set(0, "a")
        .set(1, "b")
        .set(x, "c");
    console.log(map);
/**
	map实例中的索引0,1,2分别对应的key和value为:
		0,a
		1,b
		3,c
*/
```

再使用一个表达式(变量)作为其set()方法设置的key值时,会自动将该表达式计算出来的值作为其key值,而不是将整个表达式作为其key.

#### [`Map.prototype.get(key)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/get)

返回键对应的值,如果不存在,则返回undefinfed.

需要注意的是: 只有对同一个对象的引用,Map对象才会将之认为是同一个键,否则仍然会返回undefined.

```js
const map = new Map();
map.set(['a'], 555); // key: ["a"] , value: 555
map.get(['a']) // undefined
```

- ​    上面set()方法设置的key为 `["a"]`,get()方法获取的也是 `["a"]`,但是却返回undefined,这是因为这两个值实际上是不同的实例,

  ​	即它们的内存地址空间是不一样的,因为get()方法在获取 `["a"]`值对应的内存地址空间时,查询的value是不存在的,当然为undefined.
  
  ​	如果将["a"]改为单个a,则get就可以获取到对应的value,因为["a"]代表数组,"a"代表原始值,
  
  ​	编译器会为每个数组提供不同的内存地址空间存放它们,而如果只是原始值,编译器则不会这么做,
  
  ​	**编译器会将相同值的原始值认为是一个变量.**
  
  **即:如果 Map 的键是一个简单类型的值（数字、字符串、布尔值）,则只要两个值严格相等,Map 将其视为一个键,**
  
- 如果要获取key=['a']的value,我们需要将set和get中的['a'],设置为内存地址一样,即可以使用一个变量存取['a'],然后我们获取这个变量即可:

  ```js
    let x = ['a']
    const map = new Map();
    map.set(x, 555); // key: ["a"] , value: 555
    map.get(x) // 555
  ```

  

同样的道理,如果内存地址不同,JS的Map对象就会将之视为两个键,即使其名字相同也不会覆盖.

```js
const map = new Map();
const k1 = ['a'];
const k2 = ['a'];
map
.set(k1, 111)
.set(k2, 222);
map.get(k1) // 111
map.get(k2) // 222
```

- k1 和 k2的值都是 `['a']`,但是它们的变量名不同,这就代表存储 `['a']`值的地址不同,

  因为对于这中间简单赋值来说,其值直接存于变量中,变量都不同,所以key自然不同,自然不会被覆盖.

- 需要注意的是,我们这里的get()方法中使用的是变量,因为set()方法的第一个参数也是变量,

  如果在get()方法中直接使用 `['a']`获取其值,是获取不到的,还是那个理:即内存地址空间不同.

#### [`Map.prototype.has(key)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/has)

返回一个布尔值,表示Map实例是否包含键对应的值.

```js
    let x = 'yhw';
	let y = 'yhw';
    let map = new Map()
        .set(0, "a")    
        .set(1, "b")
        .set(x, "c");
    console.log(map.has('yhw')); // true
	console.log(map.has(x)); // true
	console.log(map.has(y)); // true
    console.log(map.has('yomua')) // false
```

**has()方法不像get()方法那样,必须严格的让内存地址空间相同,才能返回其值.**

has()方法**只需要判断指定的值是否存在于当前调用该方法的map实例中,而不会去判断指定的值的内存地址空间和map实例中的key的内存地址空间的区别.**

所以才会出现以上状况,即: 两个值相同的变量,在被当作has()指定的值时,其返回都为true, 可实际上我们用的是其中一个变量x作为其Map实例的key.

这就表明了刚才的观点,has()方法不会在意内存地址空间是否不同,只在意表面的值是否相等.

#### [`Map.prototype.delete(key)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)

如果 `Map` 对象中存在该元素,则移除它并返回 *`true`*；否则如果该元素不存在则返回 `false`,即会调用 `Map.prototype.has(key)` 将返回 `false` .

```js
    let x = 'yhw';
    let map = new Map()
        .set(0, "a")
        .set(1, "b")
        .set(x, "c");	
    console.log(map.delete(0)); // true
    console.log(map.delete('0'));// false
    console.log(map);
/** 
	map的索引0,对应的key和value为: 1,"b"
	map的索引1,对应的key和value为: "yhw","c"
*/
```

需要注意的是: 只要调用了delete()方法,都会直接删除指定的key,如果不存在,则返回false. 

即使delete()方法存在于console.log()中也一样.

#### [`Map.prototype.clear()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)

移除Map对象的所有键/值对 .不存在返回值

```javascript
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

### 遍历Map结构的方法

#### 描述

**Map结构的遍历顺序,就是插入键值对的顺序.**

且除了forEach()方法没有返回值以外,其他的方法都是返回一个对象,

- keys()和values()返回一个iterator对象,且里面存了key 或 value
- entries和@@iterator几乎是等效的,它们返回的iterator对象,里面按照每个元素插入顺序存储,其存的是key,value数组,即: [key,value]

#### [`Map.prototype.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)

**返回一个新的 `Iterator`对象**, 它按插入顺序包含了Map对象中每个元素的**键** 

```js
    const map = new Map([
        ["天才小丸子", "yomua"],
        ['爱你', "yhw"]

    ])
    console.log(map.keys()); // 输出iterator对象
/**
    0: "天才小丸子"
    1: "爱你"
0代表第Map中的第0个索引,1代表第1个索引
*/
```

由于key()方法返回的是一个iterator对象,所以我们可以通过遍历的方式,将存入其中的key取出来. 或者通过next()返回的CommonJS对象的value属性,将之一个个取出来.

```js
/* for...of语句遍历 上边的Map实例.*/
    for(let p of map.keys()){
        console.log(p)
    }
/**
    天才小丸子
    keys().html:22 爱你
*/


/* 使用next()一个个遍历 */
    let iteratorMap = map.keys();
    let one = iteratorMap.next();
    let two = iteratorMap.next();
    console.log(one)
    console.log(two)
/**
    {value: "天才小丸子", done: false}
    {value: "爱你", done: false}
*/
```

- PS: 想知道更多关于迭代器的内容,参见<迭代器和生成器以及协议.md

  ​    简略讲一下:  这里为什么只使用next()方法就可以进行迭代了,这是因为使用next()方法就相当于调用生成器函数,

  ​	每一个next()方法在被调用时,就会执行一次生成器函数(生成器函数会记住上一次执行到哪个位置了), 即就相当于执行了`yield next()`

  ​	然后这个yield语句被执行完之后,该生成器函数就会被暂停执行,直到下一个next()方法被调用,

  ​		*但如果本次执行的next()方法会导致生成器函数直接被执行完毕,则下一次调用next()方法返回的对象的value属性的值将为:undefined.*

  ​	所以根据生成器函数会保存自己执行到了哪个位置,自然只需要重复调用next()方法就可以遍历一个迭代器对象(生成器函数)了.

#### [`Map.prototype.values()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/values)

**返回一个新的`Iterator`对象,**它按插入顺序包含了Map对象中每个元素的**值** 

具体使用方法和keys()方法没什么区别,唯一的区别,就是存入的是map实例的value.

```js
    const map = new Map([
        ["天才小丸子", "yomua"],
        ['爱你', "yhw"]

    ])
    for (let p of map.values()) {
        console.log(p)
    }
/**
	yomua
	yhw
*/
    let iteratorMap = map.values();
    let one = iteratorMap.next();
    let two = iteratorMap.next();
    console.log(one.value)
    console.log(two.value)
/**
	yomua
	yhw
*/
```



#### [`Map.prototype.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)

- entries:进入

**返回一个新的 `Iterator` 对象**,它按插入顺序包含了Map对象中每个元素的 **`[key, value]`** `数组`.

该方法和直接使用Map.prototype[@@iterator],即直接使用Map的自带接口,其几乎是等效的行为.

```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

/* 或者 */
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

#### `Map.prototype.forEach()`

##### 描述

按插入顺序,为 `Map`对象里的每一键值对调用一次callbackFn函数.如果为forEach提供了thisArg,它将在每次回调中作为this值.

该map的forEach()和数组的forEach()方法在概念上是相同的,*参见<各类属性&方法.md>*,即都接收两个参数 :callback和thisArg.	

##### 参数解析

###### callback 必选

接收三个参数

- **`value`** - 元素的值
- **`key`** - 元素的键
- **`Map`** - 当前正在被遍历的`对象`

###### thisArg 可选

可选,`callback` 执行时的 `this` 的指向.

##### 示例

```js
// 
function logMapElements(value, key, map) {
	console.log(key, value);
}
// 实例化Map并基于初始key和value,然后在遍历并输出.
	new Map([
        ["foo", 3], ["bar", {'Name'}], ["baz", undefined]
    ])
        .forEach(logMapElements);
/*
    3
    {Name: "Yomua"}
    undefined
*/
```



#### [`Map.prototype[@@iterator]()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator)

**返回一个新的`Iterator`对象**,它按插入顺序包含了Map对象中每个元素的 **`[key, value]`** `数组`.

这是Map结构的默认接口,即一个迭代器对象,keys(),values()等遍历方法都是基于此接口的实现,使用此接口,我们才可以直接进行遍历Map的实例.

相当于使用了 Map.prototype.entries();

```js
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

## Map和其它结构的互换

### Map结构可以转为数组结构

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

- ***[...map.keys()]***

  先获取返回的iterator对象,然后将iterator对象迭代(使用的是next()方法)

- ***[...map.entries()]***

  先获取返回的iterator对象,然后将iterator对象迭代,此对象存储的是`[key,value] `,且是以此(数组)形式.

- ***[...map]***

  如同调用entries()方法

### 转为数组的Map结构并且使用filter()

结合数组的map方法、filter方法,可以实现 Map 的遍历和过滤（Map 本身没有map和filter方法）.有关filter()方法,参见<各类属性&方法.md>

```js
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3));
// 产生 Map 结构 {1 => 'a', 2 => 'b'}
console.log(map1); // {1 => "a", 2 => "b"}
```

- ***[...map0].filter(([k, v]) => k < 3));***

  将map0实例转为数组之后,调用数组实例的filter()方法,向其传入一个回调函数,判断当前倍遍历的key是否小于3,如果小于,则返回true并放入filter()方法自己生成的新数组中.

### Map转为对象

如果所有 Map 的键都是字符串,它可以无损地转为对象.

```javascript
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

如果有非字符串的键名,那么这个键名会被转成字符串,再作为对象的键名.

### 对象转为Map

```js
    function objToStrMap(obj) {
        let strMap = new Map();
        for (let k of Object.keys(obj)) {
            strMap.set(k, obj[k]);
        }
        return strMap;
    }

    console.log(objToStrMap({ yes: true, no: false }))
// Map {"yes" => true, "no" => false}
```

- ***Object.keys(obj)***

  ​	该方法会返回一个 : 由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和使用 [`for...in`](5a6904a14c2e67b3a362729feb17cce7.html) 循环遍历该对象时返回的顺序一致 .

  ​	即返回值为一个新数组: 一个对象的可枚举属性和值组成的新数组.

  其数组中的属性和值的顺序为: 当使用 `for...in` 循环遍历该对象时的顺序.

### Map转为JSON

Map 转为 JSON 要区分两种情况.一种情况是,Map 的键名都是字符串,这时可以选择转为对象 JSON.

```javascript
        function strMapToJson(map) {
            let obj ={};
            for(let [key,value] of  map) {
                obj[key] = value;
            }
            return JSON.stringify(obj);
        }

        let myMap = new Map().
            set('yes', "yomua").
            set('no', 'yhw');
        console.log(strMapToJson(myMap))
// '{"yes":true,"no":false}'
```

- ​    创建一个方法接收整个map实例,在方法中定义一个对象,然后循环map实例,每次循环,

  ​	都将map实例的key作为对象的key,map实例的value作为对象的value,

  ​	最后返回一个: 使用JSON.stringify()方法将ob对象转为JSON格式的值.

另一种情况是,Map 的键名有非字符串,这时可以选择转为数组 JSON.

```javascript
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map()
    .set(true, 7)
    .set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

- ***return JSON.stringify([...map]);***

  先将转过来的map实例在语法层面上展开,然后存入到数组中.

  最后将该数组解析为JSON格式.

### JSON转为Map

JSON 转为 Map,正常情况下,所有键名都是字符串.

```javascript
    function objToStrMap(obj) {
        let map = new Map();
        for (let k of Object.keys(obj)) {
            map.set(k, obj[k]);
        }
        return map;
    }
    function jsonToStrMap(jsonStr) {
        return objToStrMap(JSON.parse(jsonStr));
    }
 console.log(jsonToStrMap('{"yes": true, "no": false}'))
// Map(2) {"yes" => true, "no" => false}
```

- ***return objToStrMap(JSON.parse(jsonStr));***

  ​	将JSON格式的字符串转为对象之后,传入objToStrMap()函数,

  ​	这个函数将接收对象作为其形参,然后实例化一个Map; 接着循环Object.keys(obj)方法返回的一个存有对象的属性名的数组,

  ​	并将这个数组中的值(对象的属性名)赋值给k,每一次循环赋值时,都在循环内部使用map.set()方法将对象的属性名作为map的key,对象的value作为map的value.

  ​	直到最后循环完毕后,设置整个objToStrMap()方法的返回值为:设置完key和value的map.

  ​	再最后我们回到jsonToStrMap()函数的return,也就是此时这里的return语句返回的是 objToStrMap()方法的返回值,即为: map

但是,有一种特殊情况,整个 JSON 就是一个数组,且每个数组成员本身,又是一个有两个成员的数组.这时,它可以一一对应地转为 Map.这往往是 Map 转为数组 JSON 的逆操作.

即直接将数组JSON解析为对象,然后将该对象作为参数传递给Map()构造函数即可.

```javascript
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
    jsonToMap(
        '[
            [true,7],
            [{"foo":3},
            ["abc"]]
        ]'
    )
// Map {true => 7, Object {foo: 3} => ['abc']}
```

# [Map 和 Set 区别和共同点](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024181109440) 