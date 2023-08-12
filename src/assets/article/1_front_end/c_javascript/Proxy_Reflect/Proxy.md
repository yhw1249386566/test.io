# Proxy

## 概念

Proxy （构造函数）用于修改某些操作的默认行为，这等同于在语言层面做出修改，属于一种“元编程”（meta programming），即对编程语言进行编程。

你可以简单的将 Proxy 理解为：在目标对象之前假设一个“拦截器”，外界对目标对象的任何访问，都必须先通过这个拦截器，因此，这提供了一个机制：在外界访问目标对象时，我们可以**对外界的访问进行过滤或改写**。

由于 Proxy 的中文意译是：代理，所以你可以将它称作“代理器”，又或者是“拦截器”。

- 作者注：我喜欢称之为”拦截器”，其意更明。

值得注意的是：当你为某个对象 A 架设了一层拦截器之后，你直接使用 A 是没有效果，需要使用这层拦截器对象才有用，并且使用代理（proxy）访问目标对象时，其目标对象的 this 将会指向代理对象（proxy）。

Proxy 不仅可以代理普通的字面量对象（`const obj = {}`），也可以代理任何实例（`const xx = new XX()`）。

并且你在设置拦截器时，可以自定义要拦截什么，而对于没有明确设置拦截的访问，则该访问将会保持默认行为。Proxy 支持的拦截，详见：<a href='#Proxy 支持的拦截'>Proxy 支持的拦截</a> 

## 语法

```tsx
const proxy = new Proxy(target, handler:object)
```

- targete

  要拦截的目标对象

- handler

  一个对象，它里面的属性是拦截成功时所做的行为，参见：<a href='#Proxy 支持的拦截'>Proxy 支持的拦截</a> 

## Proxy 支持的拦截

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截 `propKey in proxy `的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 使用

### 基本使用

#### 不为目标对象设置任何拦截

若不为目标对象设置拦截，则等同于直接通向原对象。

即：相当于：proxy 对象等同于 目标对象。

```javascript
var target = {};
var handler = {};
var proxy = new Proxy(target, handler);
proxy.a = 'b';
target.a // "b"
```

#### 拦截对目标对象的访问

```js
const obj = {
    key:22,
    name:'yomua',
}

const handler = {
  get: function(target, property) { // 拦截了对 obj 的所有访问，导致 proxy 在访问任何属性时返回 35
    return 35;
  }
}
const proxy = new Proxy(obj,handler);

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

#### 拦截对目标对象的赋值

```tsx
  const person = {name: "yomua"};
  const proxy = new Proxy(person, {
    set: function (target, property, value [,proxy](代理对象本身)) {
      console.log('目标对象')
      console.log(target); // {name:"yomua"}
      console.log('拦截的属性名')
      console.log(property); // a
      console.log('拦截的属性值'); // 2
      console.log(value)
      target[property] = value; // 将值赋予对应的属性
    },
    get: function (t, p) {return t[p]}; // 直接将目标对象的属性值返回
  });
  proxy.a = 2; // 当对代理对象的属性赋值时，Proxy 将会拦截且执行 set();
  console.log(proxy.a); // 2
  console.log(person.a); // 2
```

#### 将 Proxy 作为目标对象的属性

```javascript
const handler = {
  get: function(target, property) { return 666;}
}
const object = { proxy: new Proxy(target, handler) };
object.proxy.name; // 666
```

#### 将 Proxy 作为目标对象的原型对象

Proxy 实例也可以作为其他对象的原型对象。

```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35
```

上面代码中，`proxy` 对象是 `obj` 对象的原型，`obj` 对象本身并没有 `time` 属性，所以根据原型链，会在 `proxy` 对象上读取该属性，导致被 Proxy 拦截。

#### 一个拦截器可以设置多个拦截操作

```javascript
var handler = {
  get: function(target, name) { // 拦截对目标对象的访问
    if (name === 'prototype') {return Object.prototype;}
    return 'Hello, ' + name;
  },
  apply: function(target, thisBinding, args) {return args[0]}, // 拦截 Proxy 实例作为函数调用的操作
  construct: function(target, args) {return {value: args[1]}}// 拦截 Proxy 实例作为构造函数调用的操作
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

fproxy(1, 2) // 1，被 apply() 拦截
new fproxy(1, 2) // {value: 2}，被 construct() 拦截
fproxy.prototype === Object.prototype // true，被 get() 拦截
fproxy.foo === "Hello, foo" // true，被 get() 拦截/
```

### 使用 this 的注意事项

虽然 Proxy 可以代理针对目标对象的访问，但它不是目标对象的透明代理。

即不做任何拦截的情况下，也无法保证与目标对象的行为一致。主要原因就是在 Proxy 代理的情况下，目标对象内部的`this ` 关键字会指向 Proxy 代理。

#### 使用 Proxy 代理的目标对象，其 this 总是指向 Proxy 实例

```tsx
const target = {judgeThis: function () {console.log(this === proxy);}};
const handler = {};
const proxy = new Proxy(target, handler);
target.judgeThis() // false
proxy.judgeThis()  // true
```

上面代码中，一旦 `proxy` 代理 `target.judgeThis`，后者内部的 `this` 就是指向 `proxy`，而不是 `target`。

#### 目标对象的 this 若发生改变，可能会导致 proxy 无法代理目标对象

```javascript
const wm = new WeakMap();
class Person {
  constructor(name) {wm.set(this, name);}
  get name() {return wm.get(this);}
}
const jane = new Person('Jane');
jane.name // 'Jane'
const proxy = new Proxy(jane, {});
proxy.name // undefined
```

上面代码中，我们很容易可以发现，name() 返回的是 wm 中是否有对应的 this，并返回对应值。

在 Person 的 constructor() 中，我们为 vm 设置了 person 的值为 name（Jane），所以 jane.name 将会输出 Jane.

而由于在 `const proxy = new Proxy(jane, {});` 这行代码中，我们是的 proxy 代理了 Person，所以当使用用 `proxy.name` 时，会导致被代理的对象中的 this 指向 proxy，

所以  `wm.get(this)` 其实此时相当于 ` wm.get(proxy)`，而这也就导致了最后 `proxy.name` 为 undefined.

#### JS 的原生对象的内部属性，无法使用 Proxy 进行代理及解决方法

有些原生对象的内部属性，只有通过正确的 `this` 才能拿到，所以 Proxy 也无法代理这些原生对象的属性，而如果你非要进行代理，那么后果自然是无法得到正确的值，一个大大的 :x: 在等着你。

```js
const target = new Date();
const handler = {};
const proxy = new Proxy(target, handler);
proxy.getDate();
// TypeError: this is not a Date object.
```

本示例中，`getDate` 方法只能在 `Date` 实例上面拿到，如果 `this` 不是 `Date` 实例就会报错。

当然，我们拥有解决方法：`this` 绑定原始对象，就可以解决这个问题。

```js
const target = new Date('2015-01-01');
const handler = {
  get(target, prop) {
    // 若代理访问的是 getDate 属性，则将该属性函数的 this 绑定为 target
    if (prop === 'getDate') {return target.getDate.bind(target);}
    return Reflect.get(target, prop);
  }
};
const proxy = new Proxy(target, handler);
proxy.getDate() // 1
```

- 在一个实例中，它的函数其实也可以认为是一个属性，我将之称为属性函数。

## 一些示例

### 使用 Proxy 完成一个简单的观察者模式

<!-- 定义 observable 和 observe -->

```ts
const set = new Set();
const observable = obj => new Proxy(obj, {
  set: function (target, key, value, receiver) {
    // 先执行默认行为得到最新数据，再通知观察者；否则观察者会观察到旧的数据，而非最新数据
    const result = Reflect.set(target, key, value, receiver);
    set.forEach(observer => observer()); 
    return result;
  },
})
const observe = func => set.add(func);
```

- `const set = new Set();` 

  这里是存放观察者的地方

- `observable` 

  观察某个对象，当该对象发生变化时，通知所有观察者（observe）

  - `set.forEach(observer => observer());` 

    若观察对象发生了改变，将会发送一条广播，使得所有观察者都知道。

    即：使得每个在 set 中的观察者都被执行（这就相当于广播）

- `observe`

  使用该函数来知道“谁”是观察。

  即：定义一个观察者，会将观察者存放到“观察者之家”：set.

  当观察者接收到被观察对象的广播时，将会执行。

<!-- 使用定义的 observable 和 observe -->

```ts
// 观察一个对象
const obj = observable({
  name: '张三',
  age: 20
});

// 定义观察者（所有的观察者都会在被观察对象改变时执行，因为被观察对象发生改变时将会发送广播通知所有观察者。
observe(() => {console.log(`${obj.name}`)})
observe(() => {console.log(obj.age)})

// 改变被观察对象
obj.name = 'yomua';

/**
 * yomua
 * 20
 */
```



## 注意点

- 当你为某个对象 A 架设了一层拦截器之后，你直接使用 A 是没有效果，需要使用这层拦截器对象才有用。

  ```tsx
  const obj = {key:22,}
  const handler = {
    get: function(target, property) {
      return 35;
    }
  }
  const proxy = new Proxy(obj,handler);
  obj.key; // 22，并不会返回 35，因为这里直接使用了目标对象，而非代理对象。
  ```

- <a href='#使用 this 的注意事项'>使用 this 的注意事项</a>

























































