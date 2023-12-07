# 什么是 Test

所谓的对 React Test 就是对组件进行测试。

即：模拟一个环境（通常是浏览器），让组件在模拟出来的环境中去跑执行，在执行的过程中，使用了一些钩子函数（某些测试库或React 自带的测试库存在的这些钩子函数，如：组件准备运行执行，运行完成后等）去执行一些操作，比如：判断组件是否成功被渲染，判断组件的 props 是否正确等。

再使用一些其他操作，如：断言操作等（前端测试和后端测试有些重叠的）

这样做，就能直接对该组件进行模拟运行并测试组件是否符合预期。这样就不用让项目运行或让组件运行在浏览器上时才能通过在页面上“点击、输入”等方式对组件进行黑盒测试（功能测试）。

测试的目的是尽早发现错误，然后更正；测试时，需要尽可能多的覆盖每个逻辑，当然这种尽可能是根据情况而言的，因为很多情况下，穷尽所有可能是不可能的，我们只能尽可能让一个用例就能覆盖多个情况。

Tips：测试是一门大学问，入门容易而学精难。

# 快速开始

这里我们使用 JEST 库进行测试，当然你可以选择任何其他库。

- yarn add jest (RN 和 React 都需要安装)
- 根据测试 RN 还是 React 安装相关库

## [测试 RN](https://jestjs.io/zh-Hans/docs/tutorial-react-native) 

- yarn add  @types/jest、jest、@testing-library/jest-native

- 配置 package.json

  ```json
  "scripts":{"test": "jest"},
  "jest": {
          "preset": "react-native",
          "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"],
          "transformIgnorePatterns": [
              "node_modules/(?!(jest-)?react-native|@?react-navigation)"
          ],
          "setupFiles": [
              "./node_modules/react-native-gesture-handler/jestSetup.js"
          ]
  },
  ```

- 为某个 RN 组件创建一个新测试，如：ButtonGroup.test.tsx/js

  ```react
  import React from 'react'
  import { render, fireEvent, waitFor } from '@testing-library/react-native'
  import ButtonGroup from './ButtonGroup' // 需要测试的组件
  
  test('这是一个测试用例', async () => {
    const el_props = {buttons: []}
    const { getByTestId, getByText, queryByTestId, toJSON } = render(
      <ButtonGroup el_props={el_props}/>)
  })
  
  ```

- 运行测试：yarn test 或 jest，更多相关命令参见：[Jest CLI](https://jestjs.io/zh-Hans/docs/cli) 

  启用观察者模式：yarn test --watch OR jest --watch => 保存测试用例时自动重新执行 jest

## [测试 React](https://jestjs.io/zh-Hans/docs/tutorial-react) 

可使用 [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro)。

1. `yarn add -D  jest @types/jest @testing-library/react`

2. 配置 package.json

   ```json
   "jest": {
   	"verbose": true,
   	"transform": {
   		"^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
   	},
   	"moduleNameMapper": {
   		"\\.(css|less|scss|sss|styl)$": "jest-css-modules"
   	},
   }
   ```

   `yarn add -D ts-jest jest-css-modules` 

3. 配置 `.babelrc` 

   ```json
   {
       "presets": ["@babel/env", "@babel/react"],
       "test": ["jest"]
   }
   ```

4. 写一个测试

   以下测试都是简写，并不是所有完整代码，只是提供一个示例。

   ```react
   // index.tsx
   import classNames from "classnames";
   import BSButton, { ButtonProps } from "react-bootstrap/Button"
   import "./index.scss"
   
   const Button = (props:any) => {
     const { children, className = '', type = 'default' } = props
     const cn = classNames('components-ui-btn',className)
   
     return (
       <BSButton {...props} className={cn} variant={type}>
         {children}
       </BSButton>
     )
   }
   
   export default Button
   ```

   

   ```react
   // button.test.tsx
   import React, { ElementType } from 'react'
   import { fireEvent, render } from '@testing-library/react'
   import Button from './index'
   
   const setup = (RenderEl: ElementType, props?: any) => {
     const utils = render(<RenderEl {...props} >{props?.children}</RenderEl>)
     return utils
   }
   
   const props = {
   	className: 'testClassName',
   	...
   }
   
   describe('ButtonTest', () => {
     test('...correct', async () => {
       const { getByText } =
             setup((props) => <Button {...props}>{props?.children}</Button>, props)
       const btn = getByText('btn')
       const btnClassNameArr = btn.className.split(' ')
       expect(getByText('btn')).toBeTruthy()
       expect(btnClassNameArr.indexOf('testClassName')).not.toEqual(-1)
       fireEvent.click(btn)
     })
   })
   ```

   



# Example

## React

> 此示例需要配置 jest 字段 testEnvironment:"jsdom"

存在一个需要被测试的组件：

```react
import React from 'react';
export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {document.title = `You clicked ${this.state.count} times`;}
  componentDidUpdate() {document.title = `You clicked ${this.state.count} times`;}
  handleClick() {this.setState(state => ({count: state.count + 1,}));}
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}
```

接着新建一个测试文件：CounterComponent.test.js，

然后里面导入一些包作为环境，再写一些测试代码：

```react
import React from 'react';
import ReactDOM from 'react-dom';
// 测试库中的 act 函数
import { act } from 'react-dom/test-utils';
// Counter 组件将被测试
import Counter from './Counter';
let container;
console.log('hello')
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // 首先测试 render 和 componentDidMount
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // 再测试 render 和 componentDidUpdate
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('You clicked 1 times');
  expect(document.title).toBe('You clicked 1 times');
});
```

最后再运行：`yarn test` or `npm test`  开始跑测试代码（会模拟一个环境出来供组件执行，通常是模拟浏览器），通过终端（Terminal），你可以看到你写的测试代码是否成功执行或失败，就能针对测试结果修改组件、更新组件。

# Reference

- [Jest](https://jestjs.io/zh-Hans/docs/getting-started) 
- [Create- React- App 测试](https://www.html.cn/create-react-app/docs/running-tests/) 
- [React- CN 官方文档-测试](https://zh-hans.reactjs.org/docs/testing.html)  
- [react-native-testing-libraray](https://testing-library.com/docs/react-native-testing-library/intro/) / [ReactNative Testing](https://reactnative.cn/docs/testing-overview)
- React [Test Utities](https://zh-hans.reactjs.org/docs/test-utils.html#gatsby-focus-wrapper) / [Test Renderer](https://zh-hans.reactjs.org/docs/test-renderer.html)  / [Testing Library](https://testing-library.com/docs/guide-disappearance/#asserting-elements-are-not-present) 

