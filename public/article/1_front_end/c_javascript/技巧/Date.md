

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

获取当前时间戳: [ + new Date()](https://blog.csdn.net/abxn2002/article/details/53420816)

```js
/** 以下方法都是等效的 */
    (() => {
        console.log(`时间戳ms:${+ new Date()}`);
        console.log(`时间戳ms:${new Date().getTime()}`);
        console.log(`时间戳ms:${new Date().valueOf()}`);
        console.log(`时间戳ms:${new Date() * 1}`);
    })()
```

