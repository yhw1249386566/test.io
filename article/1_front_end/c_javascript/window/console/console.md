```js
// 代码段 1
const str1 = "hello";
const str2 = "world";
console.log(str1, str2);// hello world

// 代码段 2
console.log("%d年%d月%d日", 2015, 09, 22);// 2015年9月22日
```

代码片段 2 显示，console.log() 可以使用 C 语言 printf() 风格的占位符，不过其支持的占位符种类较少，只支持字符串（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）。	

其中第一个占位符将会使用 console.log() 中，除了当前占位符所在的那个参数，依次从左往右数的第一个参数，第二个占位也是以此类推；若占位符超出参数个数，则将不会显示正确信息，可能是其他数据，如：%d 的 NaN 等

