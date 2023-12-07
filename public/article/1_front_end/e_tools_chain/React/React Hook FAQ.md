# FAQ

## useEffect 竞态锁 - [Codeline](https://codesandbox.io/s/useeffectjing-tai-suo-oe4936?file=/src/App.js)

### 为什么会有 useEffect 竞态锁 这个概念？

如果一个 useEffect 中存在发送请求这类任务，且多次使得此 useEffect 执行，那么由于请求返回的时间是不确定的 —— 先发送的请求，可能最后返回；最后发送的请求，可能最先返回。

那么这会导致一个问题：【先发送请求，最后返回】得出的数据会**覆盖** 【后发送请求，最先返回】的数据，

这样旧数据覆盖新数据不是我们想要的结果，我们想要的结果是：最后发送请求，得出的结果；而不是最先发送请求/其他时候请求的结果，

于是为了解决此类问题，就出现了“锁”概念。

### 如何使用竞态锁

既然我们是想要获取最后一次的数据，那么存在两种方式：

1. 防抖
   
   可以实现，但是防抖的使用场景明显不是这里。

2. 竞态锁

我们这里讲第二种方法：竞态锁。

------

我们如果要保证同一个 useEffect 执行多次发送多次请求，最后一次请求的数据，不 会被其他时候请求的数据覆盖，那么我们需要利用到 [清除函数](https://zh-hans.reactjs.org/docs/hooks-effect.html#%E4%BD%BF%E7%94%A8-hook-%E7%9A%84%E7%A4%BA%E4%BE%8B)。

- 清除函数：除了会在组件卸载时执行，
  
  在每一次重新渲染组件时，
  
  **先执行上一次** [useEffect A] 中的清除函数，
  
  **再执行本次**的 [useEffect A] 函数。

于是我们可以得到以下代码：

```jsx
useEffect(() => {
  // 默认解锁
  let useLock = false;

  async function fetchData() {
    await delay(id);

    // 如果此次传递给 useEffect 的回调函数被上锁了，则不执行后续操作。
    if (useLock) {
      return;
    }

    setValue(id);
  }

  fetchData(); 

  return () => {
    // 多次重复执行 useEffect 时，
    // 为上一个 useEffect 的回调函数加锁，防止多次执行副作用操作。
    useLock = true;
  };
}, [id]);
```

更多参见：[Codeline - useEffect 竞态锁](https://codesandbox.io/s/useeffectjing-tai-suo-oe4936?file=/src/App.js) 

### 一个应用简单场景

在一个 Table 中，存在过滤器和切换页码：

- 当先切换到第 2 页，然后选择过滤
  
  注意：选择过滤时，我们会默认切换到第 1 页，因为这是后端过滤，我们事先不知道过滤后的数据有多少条。

若此若做，我们希望此次**数据是过滤后的**；但是由于切换页码也会导致发送请求给后端，所以此次发送了两个请求：

1. 过滤参数发送请求

2. 页码改变时发送请求

而这就可能导致竞争条件的出现：**过滤请求先发送成功，然后页码改变时的请求才姗姗返回**，从而此次数据只包含切换页码到第一页的数据，而没有过滤参数的数据。
所以为了防止竞争，我们设置一把锁，保证多次连续的请求中，只让最后一次的请求发送成功，终止前面的所有请求。

### 自定义一个 useLockFn

```ts
const useLockFn = (fn) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const lockFnRef = useRef((...args) => {
    const fn = fnRef.current;
    if (!fn) return;
    setTimeout(() => {
      fnRef.current(...args);
    }, 0);
  });

  return lockFnRef.current;
};

```

- 通过 `useRef` 创建两个引用 `fnRef` 和 `lockFnRef`。
- 在 `fnRef` 中保存传递给 `useLockFn` 的函数。
- 在 `lockFnRef` 中保存一个函数，该函数会延迟执行 `fnRef` 中保存的函数。
- 每次调用 `lockFnRef` 时，实际上是调用了保存在 `lockFnRef` 中的函数，该函数会清除上一个延迟执行的任务，然后重新设置一个新的延迟执行任务。这样，只有最后一次调用 `lockFnRef` 会执行 `fnRef` 中保存的函数，之前的调用都会被清除。

### Reference

- [英文讲解 - 竞态锁](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
