# 名词注解

- 无头模式

  不打开浏览器，使用者只能知道 Puppeteer 在运行，而不能直接看到浏览器。

  类似于使用 `node app.js` 运行一个 `.js` 文件一样

- 有头模式

  打开浏览器，使用者可以看到 Puppeteer 操作浏览器的过程。

# API

.innerHTML 能得到元素内容。

注意：如果没有这个，`$eval`, `$$eval` 得不到值

## [Page](https://pptr.dev/api/puppeteer.page)

### [Page.$eval](https://pptr.dev/api/puppeteer.page._eval) 

可以通过它得到获取到指定元素，并将元素传入第二个参数函数，作为函数的参数。

```ts
// 第 2 个参数执行时，是不被使用者感知的，即使在里面 log 也不会出现在控制台。
const searchValue = await page.$eval('#input', el => {
  console.log('input') // 不会显示在终端
	return el.value
});
```

注意：每个元素所拥有的方法是不一样的，如：

- div 元素没有 value 属性，要获取里面的内容可以使用 innerHTML
- input 元素有 value 属性，要获取值可以使用 value

### [Page.$$eval](https://pptr.dev/api/puppeteer.page.__eval) 

```tsx
const divsContent = await page.$$eval('div', divs => {
  return options.map(div => div.innerHTML);
});
```

可以通过它得到获取到元素数组，并将元素数组传入第二个参数函数，作为函数的参数。

# [概念](https://pptr.dev/) 

Puppeteer 是一个 Node 库，它提供 API 来滴控制 Chrome 或 Chromium 浏览器。

简单来说，就是：可以通过 Puppeteer 提供的 API 来操作浏览器，比如：查找某个/多个元素，点击某个元素，得到元素内容 等等，类似于 DOM。

在浏览器中手动执行的大多数操作都可以使用 Puppeteer 完成！



# Reference

- [Puppeteer](https://pptr.dev/) 