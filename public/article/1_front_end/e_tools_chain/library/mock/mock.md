# [开始 & 安装](https://github.com/nuysoft/Mock/wiki/Getting-Started#%E5%BC%80%E5%A7%8B--%E5%AE%89%E8%A3%85)

```bash
# 安装
npm install mockjs
```

更多安装参见：[开始 & 安装](https://github.com/nuysoft/Mock/wiki/Getting-Started#%E5%BC%80%E5%A7%8B--%E5%AE%89%E8%A3%85)

# Mock.xxx()

## [Mock.mock()](https://github.com/nuysoft/Mock/wiki/Mock.mock())	

### Mock.mock( rurl, template )

#### 参数解析

rurl：一个 URL 地址

template：一个数据模板

#### 使用

##### 简单示例

首先在一个项目中（如：使用 vue-cli 创建的脚手架项目，vue create project-name），你需要一个用来使用 mockjs 库的 mock.js 文件（可以其他名字），在 mock.js 文件中导入 mockjs 模块（库），

然后使用 `Mock.mock('url','template')`  去规定 mock 需要拦截的 URL，以及当拦截完 URL 后会返回的数据模板。

```js
// mock.js
import Mock from 'mockjs'
// 拦截 URL 为 https://www.baidu.com 的 AJAX 请求。
Mock.mock("https://www.baidu.com", {
    "string|5-10": "★", //随机生成 1-10 个字符串"★"
})
```

接下来可以在 mock.js 文件中直接写 AJAX 请求或在其他文件中导入 mock.js 文件再写 AJAX 请求。

```js
// index.js
import './mock'
let request = new XMLHttpRequest();
// URL 可以任意写，反正都会被 Mock 拦截
request.open("GET", "https://www.baidu.com", true);
request.send();
request.onreadystatechange = function () {
 if (request.readyState === 4 && request.status === 200){
	console.log(request.responseText)
 }
}
```

最后只需要再将 index.js 或 mock.js 文件直接导入到入口文件（main.js）中，让 webpack 在构建依赖图时包含它。

注：只导入 index.js 到入口文件中（main.js，webpack 构建依赖图的入口文件），会使得 Mock 返回两次数据，而只导入 mock.js 文件，只会返回一次。

这是因为：导入 index.js 时，`import './mock'` 语句会使得去执行 mock.js 文件，就会执行一次 Mock.mock()，返回一次数据；

然后又会执行自己的 AJAX 请求，这又会导致 Mock 拦截此请求，又会重新返回数据，这样就会导致返回两次数据。

***参见：H:\ProgramWay\ProgramWorkplace\Software\VSCode\Note\UseFramework\usemockjs***

# umi 项目拦截请求

1. 创建 mock 文件夹

2. 创建 xx.js/.ts，这里用 .js

   ```js
   // xx.js
   import * as mockjs from 'mockjs';
   const delay = (timeout) =>
     new Promise((resolve) => {
       setTimeout(resolve(), timeout);
     });
   
   const successResponse = {
     result_status: true,
     message: 'success',
   };
   
   // 访问 /risk_profiles 时，将被拦截，执行此处 handler
   export default {
     'GET /risk_profiles': async (req, res) => {
       await delay(1500);
       const mockData = mockjs.mock({
         ...successResponse,
         'data|30': [
           { id: '@guid',},
         ],
       });
       res.send(mockData);
     },
     
     'POST /risk_profiles': async (req, res) => {
       await delay(2000);
       const { body } = req;
       res.send({
         ...successResponse,
         data: body,
       });
     },
   };
   
   ```

3. 当访问 `/risk_profiles` 时，将被拦截，执行我们实现的 handler

注意：如果想要非 umi 项目的接口拦截生效，需要把 `xx.js` 导入到使用的地方，这样在导入 mockjs 时，将会自动拦截请求，这是因为 [mockjs 的实现原理](https://blog.csdn.net/weixin_43459866/article/details/111407896#:~:text=%E6%9C%80%E5%90%8E%EF%BC%8Cmockjs%E6%98%AF%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86,%E7%82%B9%E8%BF%98%E6%98%AF%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E3%80%82)（替换 XMLHTTPRequest），[源码在此处](https://github.com/nuysoft/Mock/blob/refactoring/src/mock/xhr/xhr.js) 

如果是 umi 项目，只需要在项目根目录创建 mock，然后将 xx.js 放入 mock 文件夹，umi 将会自动去执行 mock 文件夹下的文件。

Reference

- [UMI 约定式 Mock 文件](https://v3.umijs.org/zh-CN/docs/mock#%E7%BA%A6%E5%AE%9A%E5%BC%8F-mock-%E6%96%87%E4%BB%B6) 

# [模拟数据](http://mockjs.com/examples.html) 

```ts
const mock = Mock.mock({
  'data|20-100': [ // 数组中，存在 20 - 100 个对象
    {
      id: '@guid',
      name: '@name',
      code: '@word',
      createdAt: '@dateTime',
      createdBy: '@name',
      description: '@sentence',
      'riskAttributes|1-10': [
        {
          name: '@name',
          'rules|1-10': [{ id: '@guid', name: '@name', code: '@word' }],
        },
      ],
    },
  ],
});
// mock.data 就能获取到 data 数组数据。
```









