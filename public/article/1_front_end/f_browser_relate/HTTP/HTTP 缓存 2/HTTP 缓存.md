# 名词描述

- 本地：即用户计算机的文件系统中。
- 中间缓存：通过代理服务器对资源进行缓存，缓存到代理服务器里面。（类似于 [CDN](https://aws.amazon.com/cn/what-is/cdn/)）

# [概念](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E6%A6%82%E8%A7%88) 

浏览器缓存指的就是：在访问网页时，对一些网页资源、网络资源进行存储到**本地或服务器**。这样，当用户下次访问时，可以直接使用缓存数据，而不需要再次去服务端下载，从而提高网页加载速度。

缓存可以分为：

1. [私有缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E7%A7%81%E6%9C%89%E7%BC%93%E5%AD%98) 
   浏览器缓存，每个用户的缓存存储在本地，不与他人共享。
2. [共享缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%85%B1%E4%BA%AB%E7%BC%93%E5%AD%98) 
   用户之间可以共享的缓存，位置在客户端与服务器之间，即：代理服务器上，而非用户本地。
   可以细分为：
   - 代理缓存
     通常不由服务端开发者管理，一些代理自己实现的缓存以减少网络流量。
   - 托管缓存
     由服务端开发者实现，以降低服务器负载。

为了便于理解私有缓存，我们可以将**浏览器缓存（私有缓存）**人为分为两种类型：

1. 强缓存
   浏览器不向服务器发送请求，直接使用存储在本地的数据。
2. 协商缓存
   浏览器会向服务器发送请求，但会通过某些手段判断是否返回[304](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/304)，告诉浏览器使用本地缓存内容。

# 什么叫做存储到本地或服务器？

当浏览器对一个资源（比如：图片，数据等）进行缓存的时候，私有缓存它所缓存的地方实在用户本地计算机的文件系统中。

- 对于私有缓存：
  如：local storage，session storage，cookie 开发主动进行缓存；
  又或者通过响应头 `Expires`, `Cache-Control`, `ETag`, `Last-Modified` 让浏览器自己缓存，
  它们的**缓存位置都是用户本地计算机中**。
  比如：Google 浏览器进行缓存的时候，在 Windows 上， 它将数据存在用户本地计算机的文件系统中，路径可能为： `C:\Users\\AppData\Local\Google\Chrome\User Data\Default\cache` 。
- 对于共享缓存：
  由于需要让不同用户之间进行缓存共享，所以此缓存是存在代理服务器上的。
  服务器就不需要重复计算，而是直接返回结果。

# 浏览器缓存有几种缓存策略可以缓存到本地

1. `local storage`，`session storage`，`cookie ` 
2. HTTP 标头：
   `Expires`, `Cache-Control`：强缓存
   `If-None-Match/ETag`, `If-Modified-Since/Last-Modified` ：协商缓存
3. 浏览器数据库：[IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) ，[WebSQL](https://www.runoob.com/html/html5-web-sql.html) 
4. [Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API) 

# 私有缓存

私有缓存是绑定到特定客户端的缓存——通常是浏览器缓存。由于存储的响应不与其他客户端共享，因此私有缓存可以存储该用户的个性化响应。

如果响应包含个性化内容并且你只想将响应存储在私有缓存中，则必须指定 `private` 指令。

```
Cache-Control: private
```

# 共享缓存

共享缓存位于客户端和服务器之间，可以存储能在用户之间共享的响应。共享缓存可以进一步细分为**代理缓存**和**托管缓存**。

## 代理缓存

通常不由服务开发人员管理。

由代理服务器管理，使用 HTTP 标头来对缓存进行一种控制，比如：`Cache-Control`。

## 托管缓存

由服务开发人员管理。托管缓存的特性因部署的产品而异。在大多数情况下，你可以通过 `Cache-Control` 标头和你自己的配置文件或仪表板来控制缓存的行为。

CDN 就是托管缓存的一种实现，由服务端开发者去进行配置的这么一个操作。

# [启发式缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%90%AF%E5%8F%91%E5%BC%8F%E7%BC%93%E5%AD%98) 

HTTP 尽可能的去对响应进行一个缓存，因此即使没有 `Cache-Control` 响应头，但是如果满足某些条件，响应也会被存储和重用。这称为**启发式缓存**。

# 便于理解分：强缓存和协商缓存

## 强缓存



浏览器的强缓存是浏览器缓存的一种策略，它指的是当浏览器请求某个资源时，在资源的缓存有效期内，浏览器直接从本地缓存中读取并使用该资源，而不发送请求到服务器。

对于` Cache-Control` 和 `Expires` 请求/响应头来说，浏览器更倾向使用指定请求的有效期，而非指定请求的过期时间，这是因为时间格式难以解析，也发现了很多实现的错误，有可能通过故意偏移系统时钟来诱发问题；参见：[Expires 或 max-age](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#expires_%E6%88%96_max-age) 

### Cache-Control

指定请求的有效期

1. 浏览器通过请求访问服务端
2. 服务端主动设置请求返回的一个响应头为 `Cache-Control:max-age=<seconds>`，
   `Cache-Control: max-age=3600` 表示资源在被缓存后将在 3600 秒（1 小时）后过期。
3. 对于有 `Cache-Control` 响应头的请求，浏览器将会缓存此请求的数据。
   当第一次访问请求得到 Cache-Control 设置的有效期，浏览器在下一次访问此请求时，如果此请求的缓存仍然是有效期，那么浏览器将不访问服务器，而是直接使用缓存的数据。

### Expires

指定请求的缓存过期时间

1. 浏览器通过请求访问服务端

2. 服务端主动设置请求返回的一个响应头为 `Expires`
   `Expires: Tue, 15 Nov 2077 08:12:31 GMT`，资源将在 2077 年 11 月 15 日的 08:12:31 GMT 之后被视为过期。

3. 对于有 `Expires` 响应头的请求，的浏览器将会缓存此请求的数据。

   当 **当前时间 < Expires 设置的过期时间** 时，浏览器将会在下一次访问此请求时，不访问服务器，而是使用缓存的数据。

注意：Expires 指定过期时间，浏览器怎么判断过期的？浏览器会通过本地客户端时间判断是否过期，所以这是有风险的行为：

- 它依赖于服务器和客户端的时钟同步。如果客户端的时间与服务器的时间不一致，可能会导致缓存不正常地过期或未过期。
- 它不支持灵活的缓存控制，因为它只提供了一个固定的过期时间点，而不能根据资源的实际情况来动态调整。

现代的 Web 开发更倾向于使用 `Cache-Control` 头部，其中 `max-age=<seconds>`  `<seconds>` 指的是请求从第一次发起作为 0 秒开始计算。

## [协商缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%AA%8C%E8%AF%81%E5%93%8D%E5%BA%94) 

通过请求头和响应头的配合，来告诉浏览器此次请求是否使用缓存。

协商缓存，也可以称之为[验证响应](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%AA%8C%E8%AF%81%E5%93%8D%E5%BA%94)。

###  If-None-Match / ETag

1. 浏览器通过请求访问服务端

2. 服务端主动设置请求返回的一个响应头为：ETag
   ETag: 通过某种方式进行签名（如 md5 对请求和请求 id 进行签名），得到一个唯一值

3. 浏览器拿到此响应头 ETag 后，将 ETag 和此请求的数据存储到本地

4. 浏览器发起下一次请求时，添加请求头：`If-None-Match: ETag`

5. 服务端接收到此请求，通过某种方式得到新签名（比如：查询数据并对此数据重新进行签名），使用新签名和请求头中的 If-None-Match进行对比：

   如果相等：返回 304，告诉浏览器此次请求可以使用缓存数据
   如果不相等：将新数据重新返回，并重新设置响应头 Eag 为新签名

6. 浏览器端就可以通过状态码是不是 304，从而决定是否使用缓存数据。

###  If-Modified-Since / Last-Modified

1. 浏览器通过请求访问服务端

2. 服务端主动设置请求返回的一个响应头为：Last-Modified
   Last-Modified: 此请求最后一次更新的时间

3. 浏览器拿到此响应头 Last-Modified后，将 Last-Modified和此请求的数据存储到本地

4. 浏览器发起下一次请求时，添加请求头：`If-Modified-Since: Last-Modified` 

5. 服务端接收到此请求，通过某种方式得到新的资源最后修改时间，使用新的资源最后修改时间和请求头中的 If-Modified-Since进行对比：

   如果相等：返回 304，告诉浏览器此次请求可以使用缓存数据
   如果不相等：将新数据重新返回，并重新设置响应头 Last-Modified 为新的修改时间。

6. 浏览器端就可以通过状态码是不是 304，从而决定是否使用缓存数据。

# [请求折叠](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E8%AF%B7%E6%B1%82%E6%8A%98%E5%8F%A0) 

如果不同客户端的多个相同的请求同时到达共享缓存，中间缓存（代理服务器）将代表自己将单个请求转发到源服务器，

然后源服务器可以将一个请求的结果重用于所有客户端发过来请求。这称为**请求折叠**。

所以请求折叠时，即使请求的某个响应中给出了 `max-age=0` 或 `no-cache`，它也会被重用，例如：

- 客户端 A 和客户端 B 同时发送了相同的请求到代理服务器实现的中间缓存，A 的之前的响应头中有 `Cache-Control`，B 没有。

  但此时由于代理服务器折叠了这两个请求，代理服务器将请求合并成一个转发给源服务器，

  源服务器本身对于此类请求是做了缓存的，且此时缓存仍然是有效的，在处理折叠的请求时，按照缓存策略返回缓存数据，所以会导致 A 客户端此次的请求仍然是缓存中的，而非新响应。
  如果响应是针对特定用户个性化的，并且你不希望某类请求被折叠，数据被共享，则应添加 `private` 指令，这样就可以避免此类请求被折叠导致请求没被验证，返回了缓存中的数据。

![](.//picture/请求折叠.png)

​														      	(请求折叠)

# 缓存的使用

## [默认缓存设置](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%BB%98%E8%AE%A4%E8%AE%BE%E7%BD%AE) 

缓存的默认行为（即对于没有 `Cache-Control` 的响应）不是简单的“不缓存”，而是根据所谓的“[启发式缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%90%AF%E5%8F%91%E5%BC%8F%E7%BC%93%E5%AD%98) ”进行隐式缓存。

如果不想被隐式设置启发式缓存，最好显式地为所有响应提供一个默认的 `Cache-Control` 标头。

为确保默认情况下始终传输最新版本的资源，通常的做法是让默认的 `Cache-Control` 值包含 `no-cache`：

```bash
Cache-Control: no-cache
# 或：如果服务实现了 cookie 或其他登录方式，并且内容是为每个用户个性化的，那么也必须提供 private，以防止与其他用户共享
Cache-Control: no-cache, private
```

## [强制重新验证](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%BC%BA%E5%88%B6%E9%87%8D%E6%96%B0%E9%AA%8C%E8%AF%81) 

响应仍然会被缓存，但是在读取缓存时会重新向服务端发送请求验证。

`Cache-Control: no-cache` 

`Cache-Control: max-age=0, must-revalidate` 

## [禁止缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E4%B8%8D%E4%BD%BF%E7%94%A8%E7%BC%93%E5%AD%98) 

响应不会被缓存，永远会向服务端发送请求获取新数据。

`Cache-Control: no-store ` 

如果已经为特定 URL 存储了旧响应，则 `no-store` 不会阻止旧的响应被重用（但是可以通古 `no-cache` 重新验证）

有些过时的，兼容 `no-store` 的实现，参见：[过时的 no-store 实现](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%85%BC%E5%AE%B9%E8%BF%87%E6%97%B6%E7%9A%84%E5%AE%9E%E7%8E%B0)。

注意：不建议随意授予 `no-store`，因为你失去了 HTTP 和浏览器所拥有的许多优势，包括浏览器的后退/前进缓存。参见：[no-store 失去了什么](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#no-store_%E4%B8%A2%E5%A4%B1%E4%BA%86%E4%BB%80%E4%B9%88) 

## [重新加载和强制重新加载缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD%E5%92%8C%E5%BC%BA%E5%88%B6%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD) 

对请求和响应执行验证。

[重新加载](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD)：`Cache-Control: max-age=0` 

[强制重新加载](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%BC%BA%E5%88%B6%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD)：它和强制重新验证一样，使用同一个方法：`Cache-Control: no-cache` 

## [长时间对请求的缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E9%81%BF%E5%85%8D%E9%87%8D%E6%96%B0%E9%AA%8C%E8%AF%81)

永远不会改变的内容应该被赋予一个较长的 `max-age`。

如：`Cache-Control: max-age=31536000`。

但是这种情况会有个问题，如果我们使用了[缓存破坏](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E7%BC%93%E5%AD%98%E7%A0%B4%E5%9D%8F)，这种方式会在下一次版本更新导致浏览器仍然会发送请求，所以我们可以改变指定，如下：

`Cache-Control: max-age=31536000, immutable`

这可以防止被【缓存破坏】（下面的节）时，进行不必要的重新验证。

## [删除通过max-age存储的缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E5%88%A0%E9%99%A4%E5%AD%98%E5%82%A8%E7%9A%84%E5%93%8D%E5%BA%94) 

除了一些特殊的方法，基本上没有办法删除用很长的 `max-age` 存储的响应。

因为一旦存储响应，服务器就无法执行任何操作——由于缓存，不再有请求到达服务器，如下响应头，max-age 很大：

```
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1024
Cache-Control: max-age=31536000

<!doctype html>
…
```

解决方法：

1. 规范中提到的方法之一是使用不安全的方法（例如 POST）发送对同一 URL 的请求，但对于许多客户端而言，通常很难故意这样做。
2. 使用 `Clear-Site-Data: cache` 。[并非所有浏览器都支持它](https://groups.google.com/a/mozilla.org/g/dev-platform/c/I939w1yrTp4)——即使使用它，它也只会影响浏览器缓存，而不会影响中间缓存。

所以，如果不能确定响应是 `max-age` 指定的时间内不变的话，就不要使用这么长的时间；一旦使用，就要确保任何存储的响应都将保留其 `max-age` 期间。

一句忠告：缓存虽然减少了对服务器的访问，但同时也意味着服务器失去了对该 URL 的控制

## [缓存破坏](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching#%E7%BC%93%E5%AD%98%E7%A0%B4%E5%9D%8F)  

对于每个版本会变化的，但资源在当前版本需要缓存的资源，通常的最佳实践是每次内容变化时都改变 URL（整个），这样 URL   的改变会使得浏览器重新发送请求，而不需要让用户主动强制清空缓存这种操作（..以前公司好像有这么做过）

简单的做法是：使用包含基于版本号或哈希值的更改部分的 URL 来提供 JavaScript 和 CSS。一些方法如下所示。

```bash
# version in filename
bundle.v123.js

# version in query
bundle.js?v=123

# hash in filename
bundle.YsAIAAAA-QG4G6kCMAMBAAAAAAAoK.js

# hash in query
bundle.js?v=YsAIAAAA-QG4G6kCMAMBAAAAAAAoK
```

为什么不使用 `Cache-Control:max-age` 或 `Expires`, `ETag`, `Last-Modified` 这样的手段呢？

这是因为对于当前版本不会改变，未来的版本可能会改变的资源来说，使用上述这些手段是不好控制缓存的有效期，不能确定什么时候刷新资源。

但是如果缓存的资源是静态不可变文件，其内容永远不会改变，我们可以使用上述这些手段，给个很大的有效期即可。

# Reference

- [MDN HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching) 