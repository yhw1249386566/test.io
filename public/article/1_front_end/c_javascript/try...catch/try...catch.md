[TOC]

# 异常

## 描述

即在代码执行时,因为各种原因而导致出现的错误.

## try...catch...finally

### 描述

此语句标记要尝试的代码块,并指定一个出现异常时抛出的响应.

也就是说,try...catch目标就是捕获到异常之后再进行处理,而finally代表无论如何(有/无异常)都会执行代码块.

try...catch必须是一对,但catch其实也是可选的,而 finally 也是可选的,它们之间的格式如下.

try...catch...finally(可选) 可以继续1个/多个嵌套try..catch..finally

### 格式

#### try声明通常用3种

①　try...catch

②　try...catch...finally

③　try...finally

##### 第一种

```js
try { 

    try_code block

}catch(exception_varialbe condition ) {

    catch_code block;

} 
```

##### 第二种

```js
try { 

    try_code block

}catch( exception_varialbe | condition) {

    catch_code block;

}finally {

    finally_code block;

}
```

##### 第三种

```js
try { 

    try_code block

}finally {

    finally_code block;

}
```

##### 解释

###### try_code block

需要被执行的语句。

即需要被测试有没有异常的代码块(语句块)

###### catch_code block

如果在try块里有异常被抛出时执行的语句。

若未抛出异常,则此语句被跳过.

###### exception_variable

**异常标识符.**

用于保存关联catch子句的异常对象的标识符。

即用来保存被抛出声明指定的值,也就是异常的值.

这个标识符可以用来获取关于被抛出异常的信息. 也就是说e能保存try所抛出的异常的信息.

在Java中这个代表异常所属的类,此变量前面还要加上类名.

至于***为什么在JS中此异常变量前面不用加上类名表示 变量的类型***:

其一是因为JS是动态类型语言,在执行代码之前不知道类型正确与否(不检查类型),不检查类型,那怎么知道类型呢,那直接申明异常类型就没意义了.

其二是因为当try语句块中出现错误时,它会直接将异常抛给离它最近的catch语句, 而catch(err)中的第一个参数err的类型 = 出现异常的类型.

所以也没必要去写什么err属于什么哪个类, 毕竟在执行try语句块时若出现异常,那肯定知道出现异常的类型是什么了呀~既然知道了异常的类型,

那么抛过去异常, 让形参err接收到,那么err不也时那个类型,属于那个类吗(异常所属的类).

这两个原因就够解释为什么我们只需要写exception_variable,而不需要写所属的类.

###### **<u>exception_varialbe . message</u>**

​    message默认的意思: 获取本来就会报错的信息. 比如一个异常(错误)会报错Reference Error:XXXXX

​    那么exception_varialbe . message 就是 等于这个错误的信息.

###### condition

一个条件表达式。

```js
catch(e if e instanceof TypeError) {....}
 // 以上的代码行 = 以下的代码
catch(e) {
    if(e instanceof TypeError) {
        ...
    }
}
    /*
        第一种写法是不规范的
        第二种写法是规范的.
    */
```

###### finally_code block

在try语句块之后执行的语句块。无论是否有异常抛出或捕获这些语句都将执行。

需要注意的是: 如果try有抛出异常,但是catch没有处理它,即使这样,finally也会执行. 且此语句紧跟在try..catch 或者try语句之后执行.

此语句块通常的作用是用来释放内存.

#### 详细解释finally的重要性.

##### finally释放空间

###### Example

```js
    try {

        console.log("我是外层try");

        try {

            inTry.undefined('我发生异常'); // 内层try抛出异常

        } catch (err) {

            inCatch.undefined('我是内层,也发生异常'); 

            console.log('我是内层catch将被跳过执行'); 

        } finally {

            console.log('我是内层finally'); 
        }

        outTry.jump('由于内层catch发生异常，所以我会被跳过'); 

    } catch (err) { // 捕获的是最近时抛出的一场，即：内层 catch 抛出的异常

       // inCatch:ReferenceError: inCatch is not defined
        console.log('inCatch:' + err); 


    } finally {

        console.log('我是外层finally'); 

    }
```

###### 代码解析

1. **inTry.undefined('我发生异常');**
   
   ​    内层中的try抛出异常

2. **inCatch.undefined('我是内层发生异常');**
   
   ​    内层中的catch处理try抛出的异常时也发生了异常(错误), 将跳过当前所属的try语句块中剩余的所有代码.
   
   ​    即跳过outTry.jump('由于内层catch发生异常，所以我会被跳过'); 

3. **console.log('我是内层catch将被跳过执行');**
   
   ​    此代码行是内层中catch发生异常后接下来的代码,它将会被跳过

4. **console.log('我是内层finally');**
   
   ​    这行代码无论如和都会被执行.
   
   ​    此语句块可以释放内层try和catch中的占用的空间.(即使其中的某些代码被跳过依然能释放)

5. **outTry.jump('我发生异常但我会被跳过');** 
   
   ​    外层try中的代码块

6. **console.log('inCatch:' + err);**
   
   ​    此行是外层catch中的,它用来捕获外层try出现的异常,由于try中嵌套了另一个try..catch..finally语句块, 
   
   ​    且在内层的try语句块抛出异常,catch处理此异常也发生错误(抛出异常)时, 就会被外层的catch所捕获并处理
   
   ​    所以它会输出 → inCatch:ReferenceError: inCatch is not defined
   
   ​    即引用错误,在内层的catch中,inCatch变量是未定义的.
   
   ​    且由于嵌套中的try..catch两个语句都发生了异常,所以若外层try语句块在嵌套的语句块try..catch..finally之后还有代码需要执行,则这所有代码都将被跳过.
   
   ​    也就是说外层的catch处理内层的catch抛出的异常和外层的try抛出的异常.

7. **console.log('我是外层finally');** 
   
   ​    此语句块可以释放外层try和catch中的占用的空间.(即使其中的某些代码被跳过依然能释放)

> 很明显的我们可以看到,内层的catch出现错误的那个代码行后接下来的所有属于当前作用域的代码 都会被跳过执行, 
> 
> 且因为嵌套的catch出现异常,这导致了外层try本该执行的指令也跳过了执行,直接执行外层的catch, 这是不好的,因为被跳过执行的代码块它本身还是存在的,占用了空间,
> 
> 所以我们需要即使可能被跳过也要让之释放,此时finally的重要性就体现出来了,无论你是否抛出异常,是否被跳过,此语句块都可以让你指定哪些标识符会被释放.
> 
> 而应该使用内层的finally还是外层的finally呢? 你是不是这么想的,内层finally既然是嵌套的,那么为什么不使用一个外层的finally就行了呢?
> 
> 而多此一举的使用一个内层的finally?
> 
> 个人理解是因为在嵌套的try..catch..finally语句块中,能提早的用finally释放try..catch中占用的空间,为什么不提早释放呢?
> 
> 反正执行到finally时,try..catch中的空间已经用不到了,况且我们可以选择的释放,而不是全部释放,不是吗?

##### 从finally语句块返回

###### 描述

​    如果从finally块中返回一个值,那么这个值会成为整个try..catch..finally的返回值, 无论是否有return语句在try..catch中,这个值都会是整个的返回值.

即使在catch块中抛出的异常,它的返回值也是finally中返回的值.

```js
    (function tryFunction() {
        try {
            try {
                throw new Error("oops");
                return ex; 
            }
            catch (ex) {
                console.log("inner", ex.message);
                throw ex;
                return ex; 
            }
            finally {
                console.log("finally");
                return ex;
            }
        }
        catch (ex) {
            console.log("outer", ex.message);
        }
    })()
    /*
        inner oops
        finally
        outer ex is not defined
     */    
```

###### 代码解析

1. ​    内层try..catch语句中的return ex;
   
   ​    都将会被跳过,不因为其他什么原因,就是因为有throw抛出异常
   
   当前的函数执行将会被停止,throw后的代码将不会被执行
   
   ​    想一想也是,都出现异常了,后面的代码还有执行的必要吗?

2. 内层finally中的return ex;
   
   ​    上面也说过了.
   
   ​    如果从finally块中返回一个值,那么这个值会成为整个try..catch..finally的返回值,无论是否有return语句在try..catch中,这个值都会是整个try..catch..finally的返回值.
   
   ​    即使在catch块中抛出的异常,它的返回值也是finally中返回的值.

3. console.log("outer", ex.message); 
   
   ​    输出: outer ex is not defined; 即ex未定义
   
   ​    这里的ex本来指的是内层catch中抛出的异常,内层 catch 将抛出一个ex变量，但最终由于内层 finally 中存在返回值（return 语句）
   
   ​    <u>***为什么抛出的是一个未定义的变量,而不是try中抛出的异常信息:oops.***</u> 
   
   ​    这是因为内层的**finally中 写了一个return语句**,它的返回值将会成为同层(内层)catch所抛出的异常的返回值,即变成**内层catch抛出的异常信息.**
   
   ​    又由于finally中的ex根本没有定义,所以它会输出ex is not defined.
   
   NOTICE:
   
   ​    内层finally中的return语句只能用于返回一个标识符(变量等),若返回一个具体的值,例如return 2, 
   
   ​    则当前函数将会被终止执行.因为return语句就是终止当前函数执行,且返回一个值给函数的. 即返回一个值给当前函数,同时给内层catch所抛出的异常信息,但是这个值是具体值,哪里来的异常?
   
   ​    *<u>**而且为什么我这里要用自调用函数,而不是直接使用try..catch..finally这样写下来.**</u>*
   
   ​    这是因为我们使用到了return语句啊! 
   
   ​    上面不是说了吗?return语句是终止函数执行的,如果没有函数,它终止什么? 
   
   ​    所以如果不把try..catch..finally放入函数内部,就直接会报语法错误:即预期表达式, 这里的预期表达式指的就是return用错地方了!

### 嵌套try..catch..finally

**嵌套1个/多个try..catch..finally语句**

```js
    try {
        try {
            throw new Error("oops"); // 抛出异常信息:oops
        }
        catch (ex) { // ex参数存取try语句抛出的异常信息:oops
            console.log("inner", ex.message);
            throw ex; // 继续将ex异常信息oops抛出
        } 
        finally {
            console.log("finally");
        }
    }
    catch (ex) {
        console.log("outer", ex.message); // 得到抛出的异常信息oops
    }
/*
    inner oops
    finally
    outer oops
*/
```

1. 注意,任何被抛出的异常,它只会被最近的catch捕捉一次且仅一次

2. catch代码块也能抛出异常. 它也会被最近的catch捕捉一次且仅一次.
   
   ​    即使此catch(外)是包含抛出异常的catch(内)语句

3. 当然了,finally也能抛出一个异常,如同try语句那样,它也会被最近的catch语句所捕捉且能处理.
   
   ```js
   finally { throw new Error('Yomua')}
   ```
   
   ​    若将以上的代码替换内层嵌套的finally{}, 那外层的catch(ex){}会输出哪个呢? 是输出:<u>inner oops</u>; 还是输出: <u>outer Yomua</u>呢?
   
   ​    结果而论:输出的是后者,即outer Yomua; 这是因为就近原则,即内层finally{}抛出的异常覆盖了内层catch(){}抛出的异常.

### 无条件的catch语句

#### 描述

所谓的无条件的catch语句,即没有condition 条件表达,只有exception_varialbe [异常的变量]的参数(或者说只有一个参数的catch)

当只有exception_varialbe 这个的catch语句时, try抛出的任何异常,catch代码块都会执行. 例如以下代码块:

```js
try {
   throw "myException"; // generates an exception 生成一个异常
}
catch (e) {
   // statements to handle any exceptions 处理任何异常的语句
   logMyErrors(e); // pass exception object to error handler 将异常对象传递给错误处理程序.
     //   error handler:(计)差错处理器.
}
```

- ​    e是一个标识符,即它是一个变量名,也就是参数. 该标识符保存由throw语句指定的值.
- 对于一个try语句来说,catch语句块是唯一的. (除非是条件catch子句,这个条件其实也是唯一的,只不过若用非规范的写法会让人以为有多个catch子句...) 
- 当执行catch语句时,JavaScript才会创建标识符e,并将其添加到当前作用域中.
- 标识符e仅在catch语句块执行时存在,待到执行完成之后,标识符e将不可再用.

### 条件catch子句

#### 描述

字面意思,即catch语句块中可以写if条件判断语句...好吧,这其实是一件很正常的事,但是有趣的是,有着一种不符合ES规范的写反,来达到和if语句一样的效果

#### 规范写法

```js
    try {
        myMethod(); // 可能抛出的三种类型的异常
    }catch(e) {
        if(e instanceof TypeError) {
            // 处理此异常的语句
        }else if(e instanceof RangeError) {
            // 处理此异常的语句
        }else if(e instanceof EvalError) {
            // 处理此异常的语句
        }else {
            // 处理未指定的异常类型的语句
            logMyErrors(e); // 将异常对象传递给e,即传递给异常错误处理程序.
        }
    }
```

#### 不规范/不标准的写法

```js
try {
    myroutine(); 
} catch (e if e instanceof TypeError) {

} catch (e if e instanceof RangeError) {

} catch (e if e instanceof EvalError) {

} catch (e) {

    logMyErrors(e); 
}

/*
    注意,此特性是非标准的!
    它的意思为:
        如果抛出的异常是有指定什么语句去处理它的,则执行与其对应的条件判断.
        如果抛出的异常是未指定的异常,就将此异常交给无条件的catch(e)去处理.

*/
```

1. ​    当用一个无条件catch子句和1个/多个条件语句时,无条件catch子句必须放在最后.
   ​    否则当到达条件语句(有条件的catch)之前所有的异常都会被非条件语句拦截(无条件的catch)
2. 这里的有条件的catch和else if()是相等的,而无条件的catch就如同else语句.

### 其执行过程

1. 当try语句没有出现任何异常,直接继续往下执行,即不执行catch语句块,若有finally则还是会执行完finally在继续往下执行.
2. 若其中有嵌套try..catch..finally则执行完嵌套语句之后,再接着执行try语句代码,然后再往下执行.
3. 执行代码块时可能会因为某些原因而跳过执行.即使finally也一样,例如强制退出try..catch..finally.

### Uncaught 错误

当我们没用 try…catch 去捕获并处理一个代码块的错误时，如果该代码块报错，则控制台中通常会提示我们：`Uncaught 错误类型: 错误的地方`，请注意：Uncaught，即：未捕获。

但是若我们使用了 try…catch 去捕获并处理一个代码块的错误，则若你直接是将捕获的错误信息输出，会得到：`错误类型: 错误的地方`，该错误并不再是未捕获（Uncaught）。

### 总结

1. try..catch..finally(可用) 和Java中的异常差不多,都是用来捕获异常并执行想要在出现异常时执行的代码.

2. try..catch..finally可以进行1个/多个嵌套

3. catch语句中可进行条件判断,有规范/非规范写法.

4. try和catch和finally皆可抛出异常, 所抛出的异常将由最近的catch捕捉. 
   
   若不同的作用域中抛出的多个异常被同一个catch捕捉,那么后抛出的异常会覆盖先抛出的异常,即catch会只捕捉一个异常,
   
   即后抛出的异常.

## throw

### 描述

在上面的try...catch...finaly中我们已经提到了throw,

它是用来抛出一个用户自定义的异常,即控制程序流并生成自定义的错误消息.

且如果执行了throw语句,当前函数的执行将会被停止,也就是说throw所在的代码块,它(throw)后面的代码不会被执行

```js
try {
    throw new Error('Yomua');
    alert('不会被执行,会被跳过.'); // 此代码在throw后,不会被执行
}...
```

并且当执行到throw语句时,控制将被传递到调用堆栈中的第一个catch块.如果调用者函数中没有catch块,**<u>程序</u>**将会中止,这里指的是程序,而不是函数（因为发生了错误，但未被处理，程序报错了当然会终止执行）

1. ​    首先当前函数的执行被终止(不执行当前作用域的throw之后的语句)

2. ​    然后控制将会被传递,也就是程序将会去哪里执行: **即使用(调用)堆栈中的第一个catch块,(<u>在堆栈中的第一个catch块</u>)**

3. ​    也就是说哪个catch块先执行,那个catch就将throw抛出的异常信息捕获,并可以将之处理.

4. ​    非常简单来说,也就是throw抛出的异常信息,将会被离它最近的catch捕获并可以处理.(虽然不准确,但是便于理解)
   
   ​    (离它最近,通常来说就会先被执行,当然在堆栈中,就会是第一个了.)

堆：一大块非结构化的内存区域，用来存放对象。

栈:一种数据结构,主要功能是暂时存放数据和地址,通常用来保护断点和现场。

更多参见：[Yomua-Gitee](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/%E7%BC%96%E7%A8%8B%E5%9F%BA%E7%A1%80/JS%E5%B9%B6%E5%8F%91%E6%A8%A1%E5%9E%8B%E4%B8%8E%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-%E5%A0%86-%E6%A0%88-%E9%98%9F%E5%88%97-%E5%90%8C%E6%AD%A5%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E5%AE%8F%E8%A7%82%E5%BE%AE%E4%BB%BB%E5%8A%A1/JS%E5%B9%B6%E5%8F%91%E6%A8%A1%E5%9E%8B%E4%B8%8E%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF-%E5%A0%86-%E6%A0%88-%E9%98%9F%E5%88%97-%E5%90%8C%E6%AD%A5%E5%BC%82%E6%AD%A5%E4%BB%BB%E5%8A%A1-%E5%AE%8F%E8%A7%82%E5%BE%AE%E4%BB%BB%E5%8A%A1.md) 

### 格式

throw expression

#### expression

即要抛出的表达式.

```js
    function ownException(width,height) {
        if(isNaN(width) || isNaN(height)) {
            throw "Parameter is not a number"
        }
    }

    try {
        ownException(3,'qwe');
    }catch(err) { // 此时err存入的是异常信息,即抛出的异常信息是什么内容.
        console.log(err); 
    }
/*
    Parameter is not a number
*/
```

```js
throw "Yomua"; // 抛出一个异常信息:为Yomua的字符串值
throw 3177102448; // 抛出一个异常信息:为3177102448的数字的值
throw true; // 抛出一个异常信息:为true的布尔值.
```

- 很显然,此时err接收到的是我们个人定义的所抛出的异常,即Parameter is not a nubmer.
- 在throw关键字和值(表达式)之间不允许有行终止符,例如分号;

### throw还能抛出一个对象

#### 描述

我们可以在抛出异常时指定一个对象，也可以抛出一个函数的实例（这也是对象）,然后可以在catch语句块中引用对象的属性.

这好像是显而易见的,因为抛出异常的类型为对象时,那么exception_variable它接收到的就是一个异常对象,当然可以用这个对象里面的属性/方法啦.

#### Example 1

此例子是判断一个字符串是否严格===相等于Yomua,如果不相等,则抛出异常.

```js
    /* 创建 出现异常时，需要被实例化的类 */
    function UserExceptionObject(message) {
        // message: yomua !== Yomua
        this.message = message; 
        this.name = 'UserException'; 
    }

    /* 方法,判断并解决出现异常时需要抛出的数据 */
    function yomua(string) {
        if(string !== 'Yomua') {
               // 抛出一个函数的实例     
            throw new UserExceptionObject(string + ' !== Yomua');
        }else {
            console.log(string + ' === Yomua');
        }
    }

    /* 某块可能出现错误的代码块 */
    try {
        let string = 'yomua';
        yomua(string);
    }catch(err) { 
        console.log(err.message,err.name);
    }
/*
    出现异常时输出:
    yomua !== Yomua UserException

    未出现异常时输出:
    Yomua === Yomua
*/
```

##### 代码解析

1. **UserExceptionObject(){}**
   
   ​    很显然,这个是类,而不是对象,或者方法什么的. 此类将会被实例化过后被抛出.
   
   ​    此类用来确定实例化后的对象,它的属性/方法.
   
   ​    其实就是用来确定捕获到异常时该输出些什么.

2. **yomua(){}**
   
   ​    单纯的一个方法. 用来判断两个字符串是否相等,若相等则输出字符串
   
   ​    若不相等,则实例化UserExceptionObject类,并将之抛出.

3. **try...catch**
   
   ​    try用来测试可能出现的异常代码块是哪些并抛出,catch捕获抛出的异常且处理.
   
   ​    很显然,这里try抛出的异常是yomua(string); 
   
   ​    而又由于在调用yomua()方法时,会执行一遍其方法里面的需要被执行的语句(例如声明), 
   
   ​    所以执行时遇到throw时,将会立即停止执行此函数(方法)并抛出其指定的异常.
   
   ​    而这里的指定的异常就是UserExceptionObject的实例.

4. **console.log(err.message,err.name);**
   
   ​    这里的形参err, 就是其UserExceptionObject的实例,因为在try捕获到异常是throw语句抛过来的,而throw语句抛过来的是一个类的实例,
   
   ​    即对象,所以err当然也接收到的是一个类的实例(对象)
   
   ​    所以我们可以使用err(对象).调用其对象中的属性/方法.即UserExceptionObject对象中的属性/方法,
   
   > ​    这里说UserExceptionObject对象,是因为它被实例化了.
   > 
   > ​    所以变成了对象,但是类UserExceptionObject !== 对象UserExceptionObject,
   > 
   > ​    因为应该是在实例化类时,会复制其一摸一样的类到内存空间中去,而原本的类还是存在的,只不过是虚拟存在,不存在于内存空间中.
   > 
   > ​    每一次实例化类都会经历这一个步骤,因为要知道,所谓的类就是还不存在于内存空间中而已,
   > 
   > ​    换个说法也就是存在于内存空间中的类,就可以称之为对象.

#### Example 2

此例子是判断一个邮政编码是否则符合正确格式,如果不符合则抛出异常.

```js
function ZipCode(zip) {
        zip = new String(zip); 
        pattern = /[0-9]{5}([- ]?[0-9]{4})?/;

        if (pattern.test(zip)) {

            this.value = zip.match(pattern)[0]; 
            this.valueOf = function () { 
                return this.value + ' 是正确的编码';
            };
            this.toString = function () { 
                return String(this.value)
            };
        } else {
            throw new ZipCodeFormatException(zip); 
        }
    }

    /* 需要被实例化然后被抛出此实例的类 */
    function ZipCodeFormatException(value) { 
        this.value = value;
        this.message = "不是正确的邮政编码";
        this.toString = function () {
            return this.value + this.message
        };
    }

    const ZIPCODE_INVALID = -1; // 无效邮箱编码
    const ZIPCODE_UNKNOWN_ERROR = -2; // 未知邮箱编码

    /* 验证邮政编码 */
    function verifyZipCode(z) {
        try {
            z = new ZipCode(z);
        } catch (e) {
            if (e instanceof ZipCodeFormatException) {
                document.write(e.toString())
                return ZIPCODE_INVALID; // 返回值为-1
            } else {
                return ZIPCODE_UNKNOWN_ERROR; //返回值为-2
            }
        }
        return z; 
    }

    document.write(a = verifyZipCode(95060).valueOf() + '</br>');        
    document.write(b = verifyZipCode(9560).valueOf() + '</br>');      
    document.write(c = verifyZipCode("yomua").valueOf() + '</br>');         
    document.write(d = verifyZipCode("95060").valueOf() + '</br>');       
    document.write(e = verifyZipCode("95060 1234").valueOf() + '</br>'); 

/*
    其能被接受的格式:
     *    12345
     *    12345-6789
     *    123456789
     *    12345 6789
     如果构造函数参数传入的格式不符合以上任何一个格式，将会抛出异常

    其输出结果为:
    95060 是正确的编码
    9560不是正确的邮政编码-1
    yomua不是正确的邮政编码-1
    95060 是正确的编码
    95060 1234 是正确的编码
*/
```

##### 代码解析

1. **ZipCode(){}** 
   
   ​    一个'类',抽象了: 用来判断传入的参数是否符合邮编格式,若不符合则抛出一个异常对象,若符合则返回某个值.

2. **ZipCodeFormatException(){}**
   
   ​    一个'类',此类抽象了: 发生异常时,抛出的这个类的实例(对象),即若发生异常,将此类的对象抛出. 
   
   ​    具体是用来说明异常的信息和种类.

3. **verifyZipCode(){}**
   
   ​    某个函数(方法),执行某段代码.
   
   ​    具体的意思: 测试某个代码块是否出现异常,若出现异常则将之捕获并进行一些必要的处理

4. **test() & match()**
   
   ​    test(): 检测一个正则表达式是否与指定的字符串匹配,返回值为true/false.
   
   ​    match(); 检测一个字符串是否匹配正则表达式的结果,其返回值可能为字符串/数组等. 
   
   ​        而match()[0]; 代表只返回一串/个值.

5. **this.valueOf = function (){}**
   
   ​    若调用此方法将返回被正则表达式匹配到的一串字符串值.

6. **function verifyZipCodetry() { try {z = new ZipCode(z); } }**
   
   ​    若 z = new ZipCode(z); 出现异常则将之抛出.
   
   ​    有趣的是,若z = new ZipCode(z);出现异常前,它会先执行ZipCode类代码块,[因为new了它(实例化了它/声明了它),所以要执行.]
   
   ​    然后判断其zip传入的参数是否满足某种格式,不满足则会抛出异常,
   
   ​    即`throw new ZipCodeFormatException(zip); ` , 此异常是一个类的实例,即一个对象.
   
   ​    然后会JS会让程序传递(跳转)到调用堆栈中的第一个catch块去执行.这里的堆栈中的第一个catch块指verifyZipCode(){}中的catch块.
   
   ​    所以在调用verifyZipCodetry()方法时若执行try{}中的语句块出现了异常,那此异常将会被抛出,而所抛出的异常其实就是 :
   
   ​    ``        new ZipCodeFormatException(zip); ``  此对象,或者说是异常对象.

7. **function verifyZipCodetry() { catch(e) { ... } }**
   
   ​    此catch(e)将捕获``new ZipCodeFormatException(zip); ``此异常对象,并可以使用一些代码处理它.
   
   ​    而这里的e即代表``new ZipCodeFormatException(zip); ``异常对象.
   
   ​    因为上面有解释过了,即throw会使JS让程序传递到调用堆栈中的第一个catch块去执行.(若不存在此catch,程序将会终止)

8. **return z;**
   
   ​    返回形参z,即输入的需要被判断的数值.其目的是让其它代码块使用z数值,否则会因为作用域的关系而使此函数以外的地方无法使用

9. **document.write(e = verifyZipCode("xxxx").valueOf() + '</br>');** 
   
   ​    其传递一个需要被判断格式的数值xxxx, 最后返回其字符串匹配到的正则表达式为true的字符串(结果),即返回其xxxx数值.

### throw可以重新抛出异常

###### 描述

很显然这是当然的

```js
try {
    throw n;
}catch(e) {
    if(e <= 50 ) {
        // 若此异常 <= 50,则直接处理
    }else {
        throw n; // 若异常>50(无法处理) ,则重新(继续)将之抛出;
    }
}
```

1. ​    catch中的else中的 `throw  n;`就是将捕获到的异常信息重新使用throw将之抛出, 
   
   ​    那抛出之后,谁来处理它? 根据throw的描述,我们知道:
   
   ​    首先当前函数的执行被终止(不执行当前作用域的throw之后的语句)
   
   ​    然后控制将会被传递,也就是程序将会去哪里执行: 即使用(使用)堆栈中的第一个catch块,
   
   ​        也就是说哪个catch块先调用堆栈,那个catch就将 [开头所说的catch块重新抛出的异常信息 ]捕获,并将之处理.
   
   ​    非常简单来说,也就是catch块重新抛出的异常信息,将会被离它最近的catch捕获并可以处理.(虽然不准确,但是便于理解)
   
   ​    (离它最近,通常来说就会先被执行,当然在堆栈中,就会是第一个了.)

### 总结

1. 这两个例子很显然的写出了 throw是如何抛出对象，且throw的作用以及用法是什么样的了。
2. 简而言之,throw能抛出各种类型（数值,字符串等)，包括对象在内.
3. throw还会终止当前函数的执行,并且控制将被传递到调用堆栈中的第一个catch块,若没有此catch块,整个程序将被终止.
