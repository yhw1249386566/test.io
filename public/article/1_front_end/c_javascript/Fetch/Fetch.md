# Fetch API

## 描述

Fetch API 提供了一个JavaScript接口,用于访问和操纵 HTTP 管道的一些具体部分,例如请求和响应.

它还提供了一个位于 WorkerOrGlobalScope mixin中的fetch()方法用于发起获取资源的请求.(详见:fetch)

且对于Fetch API来说,任何使用过XMLHttpRequest接口的人都能轻松上手该Fetch  API,并且这个新的API提供了更为强大的,更为灵活的功能集.

## 概念及用法

Fetch 提供了对 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 和 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) （以及其他与网络请求有关的）对象的通用定义.

使之今后可以被使用到更多地应用场景中:无论是service workers、Cache API、又或者是其他处理请求和响应的方式,甚至是任何一种需要你自己在程序中生成响应的方式.

它同时还为有关联性的概念,例如CORS和HTTP原生头信息,提供一种新的定义,取代它们原来那种分离的定义.

在Fetch API中,发送请求或者获取资源,需要使用fetch()方法,它在很多接口中都被实现了,因此在几乎所有环境中都可以用这个方法获取到资源.***(详见:fetch)***

## [fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

### 描述

fetch()方法位于 WorkerOrGlobalScope mixin中,它用于发起获取资源的请求.

fetch()方法返回一个promise对象,这个 promise对象会在请求响应后被 resolve,*即从pendding ->fulfilled(resolved)*,

且对方(url的那一方)会传回 [`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象,即:服务器会回传一个Response对象给fetch(),这个对象就是fetch()返回的Pormise对象的异步操作结果.

[`    Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window) 和 [`WorkerGlobalScope`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerGlobalScope) 都实现了 WorkerOrGlobalScope。这意味着基本在任何场景下只要你想获*取资源,都可以使用位于WorkerOrGlobalScope 中的 `fetch()` 方法.

且注意:fetch() 方法由 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Security/CSP/CSP_policy_directives) 的 connect-src指令控制,而不是它请求的资源

### 语法

`fetch(input[, initObj]);`

#### 参数解析

##### input 必选

定义要获取的资源.这可能是：

- 一个 [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/API/USVString) 字符串,包含要获取资源的 URL。
  
  一些浏览器会接受 `blob:` 和 `data:` 作为 schemes.

- 一个 [`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 对象.

##### initObj 可选

`该参数`是一个对象,同时也是一个config(即config对象,如同module.exports={}作用),该对象包括所有对请求的设置,可选的参数有:

- method: 请求使用的方法,如 GET、``POST。
- mode: 请求的模式,如 cors、 no-cors 或者 same-origin。
- headers:请求的头信息,形式为 [`Headers`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 的对象或包含 [`ByteString`](https://developer.mozilla.org/zh-CN/docs/Web/API/ByteString) 值的对象字面量.
- body: 请求的 body 信息：可能是一个 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)、[`BufferSource`](https://developer.mozilla.org/zh-CN/docs/Web/API/BufferSource)、[`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)、
- credentials
- cache:
- redirect
- referrer:
- referrerPolicy:
- integrity

具体详情请看 [fetch() - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#%E5%8F%82%E6%95%B0)

#### 返回值

fetch()方法返回一个promise对象***(参见:<Promise.md>)***.

当promise被resolve(请求成功)时,则对方(url一方所在的用户代理)回传Response对象作为异步操作的结果.*(详见:Response接口)*,

一旦Response对象被返还,则就能使用一些方法操作这个response对象,比如:比如定义内容或者处理方法***(详见: Body)***

- 注意:无论请求是否成功,都会返回一个promise对象.

否则异步操作失败(请求失败),*详见: 可能出现的状况*

##### 可能出现的状况

当遇到网络错误时,[`fetch()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WorkerOrGlobalScope/fetch) 返回的 promise 会被 reject,并传回 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError),虽然这也可能因为权限或其它问题导致.

成功的 fetch() 检查不仅要包括 promise 被 resolve,还要包括 [`Response.ok`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/ok) 属性为 true,且HTTP 404 状态并不被认为是网络错误.

- 被reject: 即promise对象状态从pending => rejected
  
  ​    也就是说获取资源失败(异步请求失败)

- 被resolve: 即promise对象状态从pending => fulfilled/resolved
  
  ​    获取资源成功(异步请求成功)

https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

### 例外

| 类型           | **描述**                                                                                                                                                                                               |
|:------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AbortError` | The request was aborted (using [`AbortController.abort()`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController/abort)).                                                                 |
| `TypeError`  | Since [Firefox 43](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/43), `fetch()` will throw a `TypeError` if the URL has credentials, such as `http://user:password@example.com`. |

### 用法

#### fetch请求网址数据

```js
 fetch(`https://xxxx.xxx.xx`,{
    method:"get",
    mode:"cors"
}) 
    .then(r => r.json()) 
    .then(data => {
        ...
    });
```

- ***fetch(url地址/Requset对象,{需要设置的请求的属性} )***
  
  ​    向url发出请求,获取资源. 并设置请求的属性.
  
  ​    然后返回一个Promise对象,并在该请求被响应后,将Promise对象改为resolve并回传一个Response对象.
  
  ​        即此时的Response对象就是Promise对象异步操作的结果,此结果将会被传递出去(给下面的then()的resolved/rejected的回调函数).
  
  ​            *这里是传递给.then()方法的resolved回调函数(即第一个参数)*

- ***.then(r => r.json())*** 
  
  ​    r=>r.json()是一个resolved回调函数,其形参r接收来自一个Promise对象的异步操作结果:Response对象.(即fetch()这对象的结果)
  
  ​    **r.json():**
  
  ​        调用response对象实现的Body接口的json()方法:**挂起一个流操作并且在完成时读取其(Response对象的)值.**
  
  ​        并且json()方法的返回值为一个Promise对象,该对象的异步处理结果为:Response对象的值.
  
  ​        注意:.json()方法此会将bodyUsed状态改为已使用（true）.
  
  - 此代码相当于: .then(r =>{return r.json()});
    
    ​    提这个的目的在于,返回值promise对象需要return回去,否则下一个.then()方法咋使用?部return函数外部可获取不到json()的返回值:promise对象.

- ***.then(data => {...});***
  
  ​    data=>{...}: 一个resolved回调函数. 当上面的json()方法返回的Promise对象为resolved时,即:
  
  ​        流操作完成且读取到Response对象的值时,就接收该对象的异步处理结果,并执行该resolved回调函数.
  
  ​    其中data形参接收的是: r.json()返回的Promise对象的异步操作结果:来自fetch()请求的URL地址的数据

#### JSONP请求网址数据

上面的fetch可能会造成跨域问题,我们可以使用JSONP(注入script)解决跨域.

```js
let url = 'http://www.whyhw.com/api/JSONP.js?=get';
function get (data) {
    console.log(data)
}
let script = document.createElement('script');
script.setAttribute('src', url);
document.getElementsByTagName('head')[0].appendChild(script);
```

- 后台可以自己去查-.- . ***也可以参见:<JSON和JSONP.m***d>

- 这大概意思为: 创建script元素,为之添加src属性以及对应的值,并将这个script添加到第1个head的位置.
  
  最后调用 将一个api名发给后台:JSONP.js,让后台向这个接口(一个函数)中传点数据.

### 总结

1. fetch()请求一个地址的数据并[可选]设置其请求包含的设置,最后返回一个Promise对象,且当该对象请求被响应时,就向外传递一个Response对象

2. 使用then()方法捕获Promise的状态,如果为resolved,就执行第一个参数:resolved回到函数,并接收来自Promise对象异步操作做的结果:Response对象
   
   ​    然后在该回调函数中,我们可以使用Response对象实现的Body接口的方法/属性来操作Response对象.如:[Body.json](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)

3. 根据以上的resolved回调函数执行的操作,判断是否继续使用then方法或者其他操作.

## [Request接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)

### 实验性接口

- 相当于一个资源请求。

:exclamation:**这是一个实验中的功能**

此功能某些浏览器尚在开发中,请参考[浏览器兼容性表格](https://developer.mozilla.org/zh-CN/docs/Web/API/Request#Browser_compatibility)以得到在不同浏览器中适合使用的前缀.

由于该功能对应的标准文档可能被重新修订,所以在未来版本的浏览器中该功能的语法和行为可能随之改变.

且Request接口的对象实现了Body接口,即request对象也能使用Body接口中的方法和属性.

2020/4/11

### 构造器(构造函数)

- 同样是实验性中的功能

#### Request()

构造器创建一个新的Request对象.

##### 语法

`var myRequest = new Request(input, init);`    

##### 参数解析

其Request()构造器接受的参数和fetch()方法接受的参数是一样的.详情请看:
[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)

### 属性和方法参见:官方文档

## [Response接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)

### 描述

- 相当于请求的响应
  
  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 的 Response 接口呈现了对一次请求的响应数据.

你可以使用 [Response.Response()](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response) 构造函数来创建一个 Response 对象,但通常更可能遇到的情况是: 其他的API操作返回了一个 Response 对象.

例如一个service worker 的 [Fetchevent.respondWith](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetchevent/respondWith),或者一个简单的 [GlobalFetch.fetch()](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch).

且Response接口的对象实现了Body接口,即response对象也能使用Body接口中的方法和属性.

### 构造器(构造函数)

#### [Response()](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response)

##### 描述

`Response`()构造函数创建了一个新的 [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 对象.

##### 语法

`let myResponse = new Response(body, init);`

##### 参数解析

###### body 可选

一个定义response中body的对象. 可以是其中一个:

- [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)
- BufferSource
- [`FormData`](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)
- [`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)
- [`USVString`](https://developer.mozilla.org/zh-CN/docs/Web/API/USVString)

###### init 可选

一个参数(options)对象,包含要应用到response上的任何自定义设置. 可能参数(options)是:

- status: response的状态码, 例如:200.
- statusText: 和状态码关联的状态消息, 例如: OK.
- headers:你想加到response上的任何headers, 包含了一个 [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers) 对象或满足对象语法的 [ByteString](https://developer.mozilla.org/zh-CN/docs/Web/API/ByteString) key/value 对 (详见 [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)).

### 属性和方法参见:官方文档

## [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)

### 描述

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 的 **Headers** 接口允许您对HTTP请求和响应头执行各种操作。 

这些操作包括:

- 检索

- 设置

- 添加

- 删除。
  
  一个Headers对象具有关联的头列表，它最初为空，由零个或多个键值对组成,你可以使用 [`append()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/append) 方法添加 之类的方法添加到此(参见 [Examples](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers#Examples))。

在该接口的所有方法中，标题名称由不区分大小写的字节序列匹配。

出于安全考虑，某些头只能由用户代理控制。这些头信息包括 [forbidden header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name) 和 [forbidden response header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_response_header_name)。

一个Headers对象也有一个关联的guard，它具有不可变的值，request，request-no-cors，response或none。 这会影响 [set()](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/set), [delete()](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/delete), 和[append()](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/append) 方法 改变header. 参考更多信息,请看 [Guard](https://developer.mozilla.org/en-US/docs/Glossary/Guard).

你可以通过 [Request.headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/headers) 和[Response.headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Response/headers) 属性检索一个Headers对象, 并使用 [Headers.Headers()](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/Headers) 构造函数创建一个新的Headers 对象.

一个实现了Headers 的对象可以直接用于 [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 结构中, 而不是 [entries()](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/entries): for (var p of myHeaders) 等价于 for (var p of myHeaders.entries()).

### [构造器(构造函数)](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers/Headers)

#### 语法

`var myHeaders = new Headers([init]);`

##### 参数解析

###### init 可选

通过一个包含任意 [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) 的对象来预设你的 Headers. 可以是一个[ByteString](https://developer.mozilla.org/zh-CN/docs/Web/API/ByteString) 对象; 或者是一个已存在的 Headers 对象. 

### 属性和方法参见:官方文档

## [Body](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)

### 描述

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 中的 Body [mixin](https://developer.mozilla.org/zh-CN/docs/Glossary/Mixin) 代表响应/请求的正文,允许你声明其内容类型是什么以及应该如何处理.

Body被[`Request`](https://developer.mozilla.org/zh-CN/docs/Web/API/Request) 和[`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)实现,并为这些对象提供了一个相关联的主体*（字节流）*和一个已使用的标志*（最初未设置）*以及一个MIME类型*（最初为空字节序列）*.

### 属性和方法参见:官方文档

## 最佳实践

### 来自 Chat Gpt

```ts
// 封装请求函数
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    // 将到达后端，但是后端认为是失败的请求，抛出异常。
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

// 使用请求函数获取数据并处理响应
const getUserData = async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  try {
    const userData = await fetchData(url);
    console.log(userData);
    // 对userData进行处理，例如渲染到页面上
  } catch (error) {
    console.error('getUserData Error:', error);
    // 显示错误提示，例如在页面上显示错误信息
  }
};

// 调用函数
getUserData();
```

## 注意事项

1. [Fetch]()[fetch() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 只在请求没有到达后端时，才会发生异常，即：会被 catch 捕捉。
   
   只要 Fetch 请求到达后端，那么 Fetch 返回的 promise 都会是 resolve 状态。
   
   即：请求到达后端，但后端返回状态码 404, 500, promise 也会是 resolve 状态。
   
   ⚠️：有种特殊情况，即：后端返回的状态码不在 200~299 之间，但 catch 也能捕捉到后端请求返回的状态码错误，这种行为通常是因为浏览器的原因，浏览器认为 404, 500 等错误是异常状态，所以主动将该请求抛出异常，从而被 catch 捕捉。

2. 记得包含 credentials
   
   与 XHR 不同，fetch 在默认情况下不包括请求中的任何 cookie

3. 上传JSON时忘记设置`Content-Type` to `application/json`
   
   如果不包含该头，服务器可能会返回一个`400`个`Bad Request` ，因为`endpoint`不支持纯文本内容类型，或者无法处理这种文本的body，这取决于API的实现。但无论如何，您的API可能会返回HTTP错误状态。
   
   ```ts
   fetch('https://wwww.whyhw.com', {
       headers:{'Content-Type':'application/json'}
   })
   ```

## Reference

- [Fetch API 教程 - 阮一峰的网络日志](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html) 

- [fetch() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 
