# 概念

## 多个 eslint 配置文件，择其一

如果在同一目录中有多个配置文件，ESLint将只使用一个。优先顺序是：

- eslintrc.js
- eslintrc.yaml/eslintrc.yml
- eslintrc.json
- eslintrc
- package.json

## .eslintignore 文件可以使 eslint 忽略某些目录或文件



- 添加 . eslintignore 文件

.eslintignore文件是一个纯文本文件，每行包含一个模式。它会影响其包含目录中的文件以及所有子目录。

- 以 # 开头的行被当作注释，不影响忽略模式。
- 路径是相对于 .eslintignore 的位置或当前工作目录。
- 以 ! 开头的行是否定模式，它将会重新包含一个之前被忽略的模式

如下

```js
# 忽略第三方包
**/node_modules
# 忽略配置文件
build/*.js
config/*.js
```

如果 .eslintignore 未找到文件并且未指定备用文件，eslint 将在 package.json 中查找eslintIgnore 以检查要忽略的文件。

## 0、1、2 的意义

- 0：关闭 off
- 1：警告 warn
- 2：错误 error

# 使用

## 简单使用

- 全局安装 eslint

  npm i -g eslint

  注：本地安装 eslint 可能会导致无法使用 eslint 命令，这大概是因为编译器使用 eslint 命令时，寻找的是全局安装目录下的 eslint，并没有配置本地安装的目录。

- 在项目根目录下创建配置文件

  .eslintrc / .eslintrc.js / ...（详见：概念）

- 对配置文件 .eslintrc 进行[规则](https://cn.eslint.org/docs/rules/)配置

- 使用 eslint xxx.js 命令检查某个 js 文件是否符合规则。

## rules:{} 中的属性的使用

### [quote-props](https://cn.eslint.org/docs/rules/quote-props)

- 类型：Array | Object

- 选项：

  Array：

  ​	"always"（默认）

  ​	"as-needed"

  ​	"consistent"

  ​	"consistent-as-needed"

  Object：

  ​	"keywords": true

  ​	"unnecessary": true（默认）

  ​	"unnecessary": false

  ​	"numbers": true

- 格式

  ```json
  {
  	rules:{
  		quote-props:[
  			"error/warn/off",
  			"任意数组选项（一个）"
  		]
  		// 对象不知到咋搞，用数组吧
  		quote-props:{
  			
  		}
  	}
  }
  ```

- 详解

  对于该属性来说，Array / Object，里面的选项都只能选一个

# 格式化

- eslint + vscode 格式化代码，[点我](https://segmentfault.com/a/1190000021143326?utm_source=sf-related)

# 常用配置

## 配置

```json
// .eslintrc.js
module.exports = {
  rules: {
    /**
     * 警告
     */
    //  使用严格等于 ===
    "eqeqeq": [1],
    //  禁止使用arguments.caller或arguments.callee
    "no-caller": [1],
    //  任何未声明的变量的引用都会引起一个警告，参见：https://cn.eslint.org/docs/rules/no-undef
    "no-undef": [1],
    // 在非 production 环境下禁用 Console 对象的方法，但可以使用 Console.xxx
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 在非 production 环境下禁用 degugger，通常在部署代码前开启。
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    /**
     * 错误
     */
    // 对象字面量属性名称是否使用引号，只能有一个配置
    "quote-props": [
      // 出现时报错（2），warn（1）：警告；off（0）：关闭。
      "error",
      //  当没有严格要求时，禁止对象字面量属性名称使用引号
      "as-needed",
    ],
    //  缩进使用4个空格 
    "indent": ["error", 4],
    //  不允许出现with
    "no-with": [2],
    //  不准使用 var
    "no-var": "error",
    //  禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)，否则报错
    "semi": [
      "error",
      "never",
    ],
  },

  // 指定支持的 JS 语言选项
  "parserOptions": {
    /**
     * 设置为3,5（默认），6,7或8以指定要使用的 ecmascript 语法的版本。
     * 您也可以设置为2015年（与6）相同，2016年（与7相同）或2017（与8相同）使用年份命名。
     */
    "ecmaVersion": 6,
    // 设置为"script"（默认）或者"module"您的代码位于 ecmascript 模块中。
    "sourceType": "module",
    // 一个对象，指示您想要使用哪些其他语言功能：
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  // 设置 JS 的运行环境，更多参见：https://cn.eslint.org/docs/user-guide/configuring#specifying-environments
  "env": {
    "browser": true,
    "node": true,
  }
}



```

### 可选配置

```json
// .eslintrc.js
module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "extends": "vue",
  "plugins": ["flow-vars", "react"],
  "globals": {
    "$": true,
    "define": true,
    "require": true
  },
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "amd": true
  },
  "rules": {
    // 不需要
    "space-before-function-paren": 0,
    "eol-last": 0,
    "no-extra-semi": 0,
    "semi": 0,
    "eqeqeq": 0,
    "one-var": 0,
    "no-undef": 0,

    // 警告
    "no-extra-boolean-cast": 1,
    "no-extra-parens": 1,
    "no-empty": 1,
    "no-use-before-define": [1, "nofunc"],
    "complexity": [1, 10],
    "no-unused-vars": 1,

    // vue
    "flow-vars/define-flow-type": 1,
    "flow-vars/use-flow-type": 1,

    // react
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,

    // 错误
    "comma-dangle": [2, "never"],
    "no-debugger": 2,
    "no-constant-condition": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty-character-class": 2,
    "no-invalid-regexp": 2,
    "no-func-assign": 2,
    "valid-typeof": 2,
    "no-unreachable": 2,
    "no-unexpected-multiline": 2,
    "no-sparse-arrays": 2,
    "no-shadow-restricted-names": 2,
    "no-cond-assign": 2,
    "no-native-reassign": 2,

    // 代码风格
    "no-else-return": 1,
    "no-multi-spaces": 1,
    "key-spacing": [1, {
      "beforeColon": false,
      "afterColon": true
    }],
    "block-scoped-var": 2,
    "consistent-return": 2,
    "accessor-pairs": 2,
    "dot-location": [2, "property"],
    "no-lone-blocks": 2,
    "no-labels": 2,
    "no-extend-native": 2,
    "no-floating-decimal": 2,
    "no-loop-func": 2,
    "no-new-func": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-throw-literal": 2,
    "no-return-assign": [2, "always"],
    "no-redeclare": [2, {
      "builtinGlobals": true
    }],
    "no-unused-expressions": [2, {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-useless-call": 2,
    "no-useless-concat": 2,
    "no-void": 2,
    "no-with": 2,
    "space-infix-ops": 2,
    "valid-jsdoc": [2, {
      "requireParamDescription": true,
      "requireReturnDescription": true
    }],
    "no-warning-comments": [2, {
      "terms": ["todo", "fixme", "any other term"],
      "location": "anywhere"
    }],
    "curly": 1,

    // common js
    "no-duplicate-imports": 1
  }
};
```



## [为何使用 semi（强制是否全部使用分号）](https://cn.eslint.org/docs/rules/semi)

使用强制分号是因为可能你认为的没有错误，会报错，如：

```js
    var globalCounter = {}

    (function () {
        var n = 0
        globalCounter.increment = function () {
            return ++n
        }
    })()
```

由于 JS 的 ASI（自动插入分号）机制，你可能认为在 第一个语句的末端会添加分号来结束该行，但实际上不是这样的，

ASI 机制在这里并不会自动的为第一行末端插入分号，而这就导致下面的自执行函数（函数表达式）被认为加在了 `var globalCounter = {}` 这个语句的 `{}` 后面，

所以当执行该代码时，会出现运行时错误：index.html:16 Uncaught TypeError: {} is not a function

# 参考文档

- [Eslint 官方文档](https://cn.eslint.org/)
- [ESlint 规则详解](https://cn.eslint.org/docs/rules/)（都是 rules:{} 属性中的）
- [Eslint 高级配置](https://cn.eslint.org/docs/user-guide/configuring)
- [知乎](https://zhuanlan.zhihu.com/p/51113634)