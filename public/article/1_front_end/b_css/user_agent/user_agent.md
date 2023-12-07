# 描述

用户代理是代表一个人的计算机程序，例如，一个在 [Web](https://developer.mozilla.org/en-US/docs/Glossary/World_Wide_Web) 上的 [浏览器](https://developer.mozilla.org/en-US/docs/Glossary/Browser)。

- Web: World wide web 万维网

除了浏览器之外，用户代理可以是抓取网页的机器人、下载管理器或可以访问Web的其他应用程序。

随着向服务器发送的每个请求， 浏览器包含一个可表明身份的 `User-Agent` [HTTP](https://developer.mozilla.org/en-US/docs/Glossary/HTTP) 的协议头，叫作用户代理（UA，User Agent）字符串。

此字符串通常标识浏览器、及其版本号及其主机操作系统。

垃圾邮件机器人、下载管理器和一些浏览器通常会发送一个假UA字符串来宣称自己是不同的客户端。这被称为*用户代理欺骗*。

用户代理的字符串可以被 [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/JavaScript) 在客户端中使用 `navigator.userAgent` 获取。

典型的用户代理字符串如下所示： `"Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:35.0) Gecko/20100101 Firefox/35.0"`. 

通过 `console.log( navigator.userAgent);` 可以成功获取用户代理字符串,其结果为 : 

`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36`

即: 使用的是内核为Mozilla的浏览器,版本号5.0,操作系统是x64位的Windows10系统...剩下的看不懂了.
