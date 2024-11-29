# module

## [fs](https://javascript.ruanyifeng.com/nodejs/fs.html#toc0)

### 描述

fs是filesystem的缩写，该模块提供本地文件的读写能力，基本上是POSIX文件操作命令的简单包装。

但是，这个模块几乎对所有操作提供异步和同步两种操作方式，供开发者选择。

### 读取文件--readFile()和readFileSync()

#### readFile()--异步读取,建议

readFile方法用于异步读取数据。

```js
const fs = require('fs');
fs.readFile('./image.png','utf-8',function (err, buffer) {
  if (err) throw err;
  process(buffer);
});
```

readFile方法的**第一个参数**是文件的路径，可以是绝对路径，也可以是相对路径。注意，如果是相对路径，是相对于当前进程所在的路径（process.cwd()），而不是相对于当前脚本所在的路径。

readFile方法的**第二个参数**是读取文件时以什么样的编码进行读取,**可省略**,但是其默认值似乎是一个看不懂的数据.

readFile方法的**第三个参数**是读取文件完成后才会执行的回调函数。

- 该函数的第一个参数是发生错误时的错误对象，
- 第二个参数是代表文件内容的Buffer实例,就是接收的数据.

- 一个有趣的问题是，为什么 Node 约定，回调函数的第一个参数，必须是错误对象`err`（如果没有错误，该参数就是`null`）？

  ​    原因是执行分成两段，第一段执行完以后，任务所在的上下文环境就已经结束了。

  ​	在这以后抛出的错误，原来的上下文环境已经无法捕捉，只能当作参数，传入第二段。

#### readFileSync()--同步读取,不建议

readFileSync方法用于同步读取文件，返回一个字符串。

```js
const fs = require('fs');
var text = fs.readFileSync(fileName, 'utf8');
// 将文件按行拆成数组
text.split(/\r?\n/).forEach(function (line) {
  // ...
});
```

- 第一个参数是文件路径，
- 第二个参数可以是一个表示配置的对象，也可以是一个表示文本文件编码的字符串。

默认的配置对象是{ encoding: null, flag: 'r' }，即文件编码默认为null，读取模式默认为r（只读）。

如果第二个参数不指定编码（encoding），readFileSync方法返回一个Buffer实例，否则返回的是一个字符串。

### 写入文件--writeFile()和writeFileSync()

#### writeFile()--异步写入,建议

writeFile方法用于异步写入文件。

```js
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
});
```

- 第一个参数是写入的文件名，
- 第二个参数是写入的字符串，
- 第三个参数是回调函数。

回调函数前面，还可以再加一个参数，表示写入字符串的编码（默认是utf8）。

```js
fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
```

#### writeFileSync()--同步写入,不建议

writeFileSync方法用于同步写入文件。

```js
fs.writeFileSync(fileName, str, 'utf8');
```

- 它的第一个参数是文件路径，
- 第二个参数是写入文件的字符串，
- 第三个参数是文件编码，默认为utf8。

### 更多方法使用请看官方文档:[fs](https://javascript.ruanyifeng.com/nodejs/fs.html#toc0)

## [fs-readfile-promise](https://www.npmjs.com/package/fs-readfile-promise)

### 描述

> Based on the principle of [*modular programming*](https://en.wikipedia.org/wiki/Modular_programming), this module has only one functionality [`readFile`](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback), unlike other Promise-based file system modules. If you'd like to use a bunch of other [`fs`](http://nodejs.org/api/fs.html) methods in the Promise way, choose other modules such as [q-io](https://github.com/kriskowal/q-io) and [promise-fs](https://github.com/octet-stream/promise-fs).

基于模块化编程的原理,该模块仅仅只有一个功能:readFile(读取文件),这与其他基于Promise的文件系统模块不同。

如果您想以Promise方式使用许多其他fs方法，请选择其他模块，例如[q-io](https://github.com/kriskowal/q-io)和[promise-fs。](https://github.com/octet-stream/promise-fs)

### 示例

```js
const readfile = require('fs-readfile-promise');
// readfile()返回的是一个promise对象
readfile('./mes.txt') 
    .then(function (data) { 
        console.log(data.toString())
    })
    .then(function () { 
        return readfile('./data.json', 'utf-8'); 
    })
    .then(function (data) { 
        console.log(data)
    })
    ...
```

- ***readfile('./mes.txt')*** 

  ​	返回一个Promise对象, 并将异步操作的结果作为参数传递出去(resolved和rejected都会将其对应结果传递)

  - `.then(function (data)` 

    ​	上面异步状态变为成功时执行的callback并接收来自上面抛出的数据.

- ***.then(function () { return readfile('./data.json', 'utf-8');})***

  ​	当上面的操作都成功时执行该then()方法

  ​	return...,此时这个.then()的返回值为一个promise对象

  - `.then(function (data)` 

    ​	上面promise对象的异步状态变为成功时执行的callback并接收来自上面抛出的数据.





