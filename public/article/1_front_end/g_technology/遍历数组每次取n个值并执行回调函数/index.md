传入指定数组，和初始化最大个数；

将每次从指定数组中取指定的数组个数，并执行传入的回调函数，并将当前取的数组内容和总共取的内容传递给此回调函数

```ts
export const sliceExecutor = <T>(
  fn: (value: T[], allData: T[]) => Promise<void>,
  config: {
    max: number;
    initialValue: T[]; // 每次取 max,然后执行一次 fn,并将取出来的 value 给 fn
  }
) => {
  const { max, initialValue } = config;

  let index = 0;
  const currentData: any[] = [];

  return async function go() {
    const target = index + max;
    const beforeIndex = index; 

    for (; index < target; index++) {
      const item = initialValue[index];
      if (item) {
        currentData.push(item);
      }
    }

    await fn(currentData.slice(beforeIndex, target), currentData);

    if (index < initialValue.length) {
      requestAnimationFrame(async () => {
        go();
      });
    }
  };
};


const delay = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

const data = Array.from({ length: 63 }, (value, index) => ({
  item: index,
}));

const executor = sliceExecutor(
  async (currentData, allData) => {
    await delay(1000);

    console.log("__currentData", currentData);
    console.log("__allData", allData);
  },
  { max: 5, initialValue: data }
);

executor();
```

- `sliceExecutor` 第一个参数不传入 `async` 而是使用 promise 也可以做到以上效果：

```ts
const data = Array.from({ length: 63 }, (value, index) => ({
  item: index,
}));

function getItem(currentData, allData) {
  // await fn() 时，会等待此 promise 完成才走下一步
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ currentData, allData });
    }, 1000);
  }).then((result) => {
    console.log("__currentData", currentData);
    console.log("__allData", allData);
  });
}

const executor = sliceExecutor(getItem, { max: 5, initialValue: data });

executor();

```
