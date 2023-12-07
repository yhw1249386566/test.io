# API

## Jest

用来运行测试，写测试模块，模拟测试模块等。

### 配置

```js
"jest": {
	"verbose": true,
	"testRegex":"(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$", // 匹配要测试的文件
}
```

### describe()

将多个相关测试（test()）组合在一起的块

### test()

使用 test() 去运行一个测试代码块。

### render(el:ElementType)

在 Node 环境中模拟渲染一个组件，真实程度和真实组件差不多，只不过它不会被真实渲染（可以使用 JsDom 模拟浏览器环境）

### jest 模拟

#### jest.fn()

创建Mock函数最简单的方式

#### jest.mock(moduleName,factory?,options?)

去模拟一个模块，然后用 factory 去作为模块的执行代码

- moduleName 模块名

- factory 调用模块会执行的代码

- options 一个对象，接收一个值 => {virtual:boolean} 

  > The third argument can be used to create virtual mocks – mocks of modules that don't exist anywhere in the system
  >
  > 第三个参数可用于创建虚拟模拟—系统中任何地方都不存在的模块模拟.
  >
  > 即：不使用该参数，则 moduleName 必须是在当前项目中存在的模块，否则将报错。

若没有第三个参数，则 `jest.mock(moduleName,factory)` 的意思为：模拟一个已有模块，当你调用该模块时（moduleName()），将触发 factory，如：

```js
jest.mock('numeral', () => {
  return jest.fn((num) => num)
})
const mockNumeralFn = require('numeral')
mockNumeralFn(66); // 66
```

若存在第三个参数，则意思就变了：

```js
// 模拟一个未在项目中的模块，
jest.mock('numeralMock', num => num, { virtual: true })
const mockNumeral = require('numeralMock')
// Returns the jest object for chaining. 返回用于链接的jest对象。
mockNumeral(66); // {_input:66,_value:66}
```

### await waitFor()

等待断言内部出现

### [断言](https://jestjs.io/zh-Hans/docs/expect) 

#### expect().toBeTruthy()

断言的值是否为真实的（有没有）

#### expect().toBeFalsy()

断言的值是否为虚假的（有没有）

快照测试

```react
// 将组件序列化成字符，保存至本地文件夹：_snapshots_
const tree = render(<SelectTest {...props} />).toJSON();
// 将当前组件树和保存的组件树对比，若有做更改则报错。
expect(tree).toMatchSnapshot();
```

## [ReactNative-TestingLibrry](https://testing-library.com/docs/react-native-testing-library/intro/) 

用来渲染和查询。

- getByText(arg:string | Regex)

  查询某个元素是否包含某个字符串


## [React-Testing-Library](https://testing-library.com/docs/react-testing-library/api) 

用来渲染和查询。

# 将 jest 集成到 [SonarQube](https://docs.sonarqube.org/latest/) 

和 ava 继承进去差不多应该。参见：ava.md

# 指标含义

- %stmts是语句覆盖率（statement coverage）：是不是每个语句都执行了？
- %Branch分支覆盖率（branch coverage）：是不是每个if代码块都执行了？
- %Funcs函数覆盖率（function coverage）：是不是每个函数都调用了？
- %Lines行覆盖率（line coverage）：是不是每一行都执行了？
- Uncovered Line #s 未覆盖的行：黄色表示行语句部分覆盖，红色标色完全没覆盖。

# FAQ

## 有关Jest

### [jest 配置](https://jestjs.io/zh-Hans/docs/configuration#verbose-boolean) 

```js
jest: {
  // 指示是否应在 jest 执行时报告每个单独的测试。
  // 执行后，所有错误也仍将显示在底部。请注意，如果只有一个测试文件正在运行，它将默认为true.
  verbose:true,
    
  // 这个选项告诉 Jest 测试中所有导入的模块都应该自动模拟。
  // 测试中使用的所有模块都将具有替换实现，从而保持 API 表面。
  automock:false,
  
  // 默认 {"\\.[jt]sx?$": "babel-jest"}
  // 希望能够在 node 中使用尚不支持的模块/新的功能，它能插入许多匹配，将 JavaScript 的未来版本编译为当前版本
	transform:"", 
    
  //代表需要被Mock的资源名称
  moduleNameMapper:{
		"\\.(css|less|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(css|less|scss|sss|styl)$": "jest-css-modules",
  },
  
  // 配置文件，在运行测试案例代码之前，Jest会先运行这里的配置文件来初始化指定的测试环境
  setupFiles:[
		'./test/setup.js',
  ]
    
  // 是否生成测试覆盖报告，如果开启，会增加测试的时间
  collectCoverage:false,
    
  // 用正则来匹配不用测试的文件
  testPathIgnorePatterns:[
    '/node_modules/',
  ],
 
	// 用正则来匹配需要测试的文件，默认：(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$
  testRegex: "(/__tests__/.*|(\\.)+(test|spec))\\.[jt]sx?$",

}
```



#### node 环境导致 window is not defined

因 utils 中使用了 window，但最新 jest 环境默认设置为：node，所以运行 jest 会报错：window is not defined。

**解决方法：在 package.json 中添加如下配置：**

```
   "jest": {
        "globals": {
            "window": {}
          }
    }
```

#### 为 jest 模拟 DOM 环境

```json
// 在相关 jest 配置上，如：package.json -> jest 里面：
“jest”:{
	"testEnvironment":"jsdom"
}
```

#### 提示未启用 'jsx' 语法

```json
// with typescript -
"jest": {
    "transform": {
       "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    },
}

// with js -
"jest": {
    "transform": {
       "^.+\\.(js|jsx)$": "babel-jest"
    },
}
```

#### 运行 jest 出现无法解析 .scss, .less 等文件

 你需要在 jest 配置：如：jest.congfig.js, package.json->jest 中添加：

```json
"moduleNameMapper": {
	"\\.(css|less|scss|sss|styl)$": "jest-css-modules"
}
```

### Your test suite must contain at least one test

这是因为测试文件没有一个 `test`，添加以下代码即可：

```js
test('',()=>{
	...
})
```



### JEST tests complete successfully but returns exit status 1

- 可能是因为快照测试是旧的，运行 `yanr test -u` 即可。

### AsyncStorage is null

render(\<Component/>) 时，因 utils.ts 导入` importAsyncStoragefrom'@react-native-community/async-storage' `报错：AsyncStorage is null，

- **临时解决方法：**`import { AsyncStorage } from'react-native';`

- **尝试解决方法：**

  使用命令：`expo install @react-native-async-storage/async-storage `❌

**已解决：**https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/

**新建文件 jestSetupFile.js，添加以下内容：**

```
importmockAsyncStoragefrom'@react-native-community/async-storage/jest/async-storage-mock';
jest.mock('@react-native-community/async-storage', () =>mockAsyncStorage);
```

**修改 pacekage.json 的 "jest" 字段配置**

```
"jest":{
  "setupFiles": [
    "./jestSetupFile.js"
   ]
}
```

### 无法导入一个本地模块

uitils 中导入 expo-firebase-analytics，在运行测试时，会报错：无法导入一个本地模块。

解决方法：在测试组件使用 jest.mock() 模拟此模块（类似的报错也能这么解决）[点我](https://bleepcoder.com/cn/react-native-firebase/541844735/question-how-i-can-test-my-functions-with-jest)

```
jest.mock('模拟模块路径（../node_modules/expo-firebase-analytics）', () => {
  return () => ({
    function_that_you_want_to_mock: jest.fn(),
  });
});
```

### 无法导入一个外部模块

若测试组件导入：import Icon from 'xxx' 报错：无法导入一个外部模块

**暂时解决方法：**将之相关代码注释。

**尝试解决方法：**

- sadd: package.jsojn -> "type":"model"，并修改 babel.config.js -> babel.config.cjs 和添加 -> presets: [['@babel/preset-env',{targets: {node: 'current'}}]] ❌
- 为 package.json - jest 添加：["transformIgnorePatterns": ["node_modules/(?!variables/.*)" \]](https://stackoverflow.com/questions/61781271/jest-wont-transform-the-module-syntaxerror-cannot-use-import-statement-outsi) 报错：[type ErrorHandle...](https://stackoverflow.com/questions/66652403/jest-config-is-throwing-type-errorhandler-error-mixed-isfatal-boolean) ❌

**已解决，做如下 package.json  jest 字段配置**

```
   "jest": {
        "verbose": true,
        "preset": "react-native",
        "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
        "transformIgnorePatterns": [],
        "testEnvironment": "node",
        "moduleFileExtensions": ["ts","tsx","js","jsx","json","node"],
        "moduleNameMapper": {
            ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub"
        }
    }
```

## Babel 相关错误

### [Plugin/Preset files are not allowed to export objects](https://stackoverflow.com/questions/47878222/jest-test-babel-error-plugin-preset-files-are-not-allowed-to-export-objects)

出现该错误的环境：

```json
"dependencies": {
  "@babel/core": "^7.14.8",
  "babel-loader": "^8.2.2",
}
"devDependencies": {
  "jest": "^27.0.6",
  "@types/jest": "^27.0.0",
}
```

原因：Babel 的版本和配置冲突所导致： `babel Bridge 旨在涵盖 6 到 7 之间的任何问题`

[如何解决](https://stackoverflow.com/questions/47878222/jest-test-babel-error-plugin-preset-files-are-not-allowed-to-export-objects)：

所做的只是允许使用的工具`babel-core`传递到`@babel/core`. 整个包就是[这一行代码](https://github.com/babel/babel-bridge/blob/a23894936dc6f1b92d7a1067aaa239ce98f0c495/index.js#L2)。

如果您正在使用`@babel/core`，则需要使用适用于 Babel 7 的插件。这意味着`babel-preset-react`应该更改为`@babel/preset-react`，`babel-preset-env` 改成	`@babel/preset-env`并且您 `.babelrc` 应该是：

```json
{
  "presets": [
    "@babel/env",
    "@babel/react",
  ]
}
```

同样，`babel-polyfill`应该是`@babel/polyfill`。

这些都没有得到很好的记录，因为 Babel 7 仍然是一个不稳定的测试版。

## 测试时因库导致的错误

### [react-fontawesome](https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react) 

#### [Cound not find icon react-fontawesome](https://stackoverflow.com/questions/48002619/cound-not-find-icon-react-fontawesome) 

```react
// index.test.tsx
import TestComponent from "./index"
import { library } from "@fortawesome/fontawesome-svg-core";
// 添加你在 TestComponent 中使用的 icon
import { faTimes, faCalendar } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faCalendar); // 添加进来
```

使用以上操作，就可以解决该错误。

## ava/jest 出现类似于 '无法导入一个外部模块' 等错误

ava/jest 和 typescript 一起使用写测试时，如果提示类似于: [外部模块不能导入]，通常可能是 ava/jest 和 typescript 版本不一致，升级到一致即可。

- 

# Reference

- [Jest](https://jestjs.io/zh-Hans/docs/getting-started) 
