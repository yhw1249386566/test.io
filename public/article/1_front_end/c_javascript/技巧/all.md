- ***参见:<h5_css_js.doc - 位运算符 - XOR运算>***[W3C详解](https://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)

  ```
  var toggle = 0;
  console.log("开关：" + (toggle ^= 1)); // 0
  console.log("开关：" + (toggle ^= 1)); // 1
  
  ```

- 判断一个变量是不是 number类型 ： length === +length

- 小数取整：

  ```
    1.234 | 0
    ~~1.234 // 参见<<h5_css_js.doc - 位运算符 - NOT位运算(~)>
    1.234 >> 0
  ```

- 延迟函数

  ```js
      const delay = ms => new Promise((resolve) => setTimeout(resolve, 1000))
      delay().then(data => { console.log('同步任务完成执行我') })
      console.log('同步任务')
  /**
      同步任务
      同步任务完成执行我
  */
  ```

- ```js
  (function () {
  console.log((![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]);
  })();
  ```

  