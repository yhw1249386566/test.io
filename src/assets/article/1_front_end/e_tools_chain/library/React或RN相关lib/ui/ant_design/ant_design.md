# 快速开始

## 安装

1. `yarn create @umijs/umi-app`
2. `yarn` / `yarn install`
3. `yarn add antd`  或使用 `yarn add @umijs/preset-react -D` （这个是一个插件集，包括 antd、dva、国际化等常用插件）
4. `配置 sass`（详见：<a href='#[使用 sass](https://www.yuque.com/cherishtheyouth/kw0nhk/oudd6p)'>使用 sass</a>）
5. `yarn start`

## 配置 config

 :zap:：如果你要使用 `config` 文件夹，单独去配置 `umi` 的各种配置选项，请做如下操作：

1. 在 umi 目录顶层创建 `config` 文件夹，在里面创建 `config.ts` 文件
2. 将脚手架创建的 `.umirc.ts`  中的代码复制到 `config.ts` 文件中
3. 删除 `.umirc.ts` 
4. 如果你愿意的话，可以继续在 `config` 文件夹中创建 `routes.ts` 来单独导出一个路由配置，然后在 `config.ts` 中使用 routes:你导出的路由配置文件来使用路由配置。

一个简单的 Ant Design 项目就搭建好了。

> 安装 umi 有其他方法，参见：[gitee-umi](https://gitee.com/yomua/privatenotes/blob/master/Difficult%20Concept/FrontEndToolsChain/library/react_related/umijs/umijs.md) 

## 配置 typescript.json（或 tscomfing.json)

下面让我们来配置一下基本的 `typescript.json` 文件，预防一些不必要的错误把！

```json
compilerOptions:{
    // 额外添加
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "removeComments": true,
    "noImplicitAny": false,
    "noImplicitThis": false
}
```

## 配置 typings.d.ts

```json
declare module '*.css';
declare module '*.less';
declare module "*.png";
declare module "*.scss";
declare module "umi";
declare module "axios";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
```

## [使用 sass](https://www.yuque.com/cherishtheyouth/kw0nhk/oudd6p)

1. `npm install --save @umijs/plugin-sass`  使用 `yarn create @umijs/umi-app` 时才用这个

   ` yarn add @umijs/plugin-sass --dev ` **使用 yarn create umi 时必须使用这个**

2. `npm audit fix`

   `yarn audit fix` **使用 yarn create umi 时必须使用这个**

3. `npm install --save node-sass sass-loader`

    `yarn add  node-sass sass-loader` **使用 yarn create umi 时必须使用这个**

4. ```ts
   // .umirc.ts(js)
   export default defineConfig({
     nodeModulesTransform: {
       type: 'none',
     },
     routes: [
       { path: '/', component: '@/pages/index' },
     ],
     "sass": { }, // 配这里
   });
   ```

5. 然后在 `.d.ts` 中声明 sass: `declare module "*.scss";`

# [Ant Desgin](https://ant.design/index-cn)

[Ant Design](https://ant.design/index-cn) 每个组件都有默认 class，开发者为 [Ant Design](https://ant.design/index-cn) 库的组件添加的 class，将会自动的添加到默认 class 的后面。

# 组件的使用

## Input

假设你是如此使用 \<Input> 组件：

```tsx
<Form>
	<Form.Item>
    	<Input />
    </Form.Item>
</Form>
```

若你想动态改变 Input 中的值，在 React 时，你通常会使用 [受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components) 这么一个形式，但是若你使用以上的写法，那么你无法使用 `setState` 去更新 \<Input> 中的值。

你需要通过 `setFieldsValue` 去更新，模板如下：

```tsx
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
const Demo = () => {
  const [form] = Form.useForm();
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!', // 改变 name=’note' 的 <Form.Item> 里面 <Input> 的 value 值。
      Form.Item 的 name: 你要为 Input 动态更新的值,
    });
  };
  return (
    <Form 
        form={form}  // 必要 
        name="control-hooks" }
    >
      <Form.Item
        // 指定 name 属性，从而可以通过 userForm() 返回的 
        // Hook 的 setFieldsValue 去更改在 <Form.Item> 中的 <Input> 的 alue 
        name="note"
        label="Note"
        rules={[{required: true,},]}
      >
        <Input />
      </Form.Item>
          
      <Form.Item {...tailLayout}>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
          
    </Form>
  );
};

export default Demo;
```

首先我们需要通过 `Form.useForm()` 获取 Hook，才能对表单数据域进行交互。

> 注意 `useForm` 是 [React Hooks](https://reactjs.org/docs/hooks-intro.html) 的实现，只能用于函数组件，class 组件请查看下面的[例子](https://ant.design/components/form-cn/#components-form-demo-control-hooks)

然后使用 `useForm` Hook 自带的 `setFieldsValue` 方法并向之传入一个对象，这个对象的 key：你想要改变的 Input 组件的父组件 Input.Item 的 name 属性的值，对象的 value 则是你想要动态改变的值。

再在 \<Form form={form}> 中通过 Form 组件内置的 `form` 属性获取 `userForm` Hook 的实例

最后在你包裹 \<Input /> 组件的 \<Form.Item name='xxx'> 中使用 name 属性为它指定一个名字，从而让你操作身处其中的 \<Input>

## [Tabs](https://ant.design/components/tabs-cn/#components-tabs-demo-editable-card) 

```tsx
 <Tabs
	type="editable-card"
	onChange={this.onChange}
	activeKey={activeKey}
	onEdit={this.onEdit}
>
	{panes.map(pane => (
		<TabPane tab={xxx} key={activeKey}>
			xx
		</TabPane>
	))}
</Tabs>
```

- onChange：指定的回调的第一个参数自动接收你切换面板时，目标面板的 key
- activeKey：当前激活 tab 面板的 key，控制 Tabs 此时显示哪个 tab
- onEdit：新增和删除 tasb 调用的回调

TabPane

- key：这里的 key 需要和 `<Tabs />` 的 activeKey 相同，否则无效。

  即：我们使用 key 来决定每一个面板的唯一值，再使用 activeKey 来决定通过这个唯一值来显示哪个面板

## [Table](https://ant.design/components/table-cn) 

### [API](https://ant.design/components/table-cn/#API)

- dataSource

  指定表格的数据源，通常是一个数组，你可以认为数组中的每个索引都代表一行。

  注：[React 的规范](https://zh-hans.reactjs.org/docs/lists-and-keys.html#keys) 要求，所有的数组组件必须绑定 `key`。

  在 Table 组件中，`dataSource` 和 `columns` 里的数据值都需要指定 `key` 值。对于 `dataSource` 默认将每列数据的 `key` 属性作为唯一的标识。 

  如果 `dataSource[i].key` 没有提供，你应该使用 `rowKey` 来指定 `dataSource` 的主键，如下所示。若没有指定，控制台会出现警告提示（key 不存在，React 会报错），表格组件也会出现各类奇怪的错误。	

  ```jsx
  // 比如你的数据主键是 uid
  return <Table rowKey="uid" />;
  // 或
  return <Table rowKey={record => record.uid} />;
  ```

  其中，rowKey 代表的是每一个行（dataSource 的每一个项）的 key。

- columns

  用来指定表格的列，它是一个数组，数组的每个项代表一列，详见：<a href='#[Colum](https://ant.design/components/table-cn/#Column)'>Column</a>，查看 colums 数组每个项的参数以及其意思。
  
- onChange

  当做出分页、排序、筛选时触发，如：点击第二页、选择每页多少条数等。

  它是一个回调函数 =>

  ```tsx
  <Table
  	onChange={(pagination[,filters][,sorter][,extra])=>{}}    
  />
  ```

  pagination:object =>current:当前页面页码，pageSize:每页展示条数，total:总数

  

#### [Colum](https://ant.design/components/table-cn/#Column) 

- dataIndex 数据索引

  即：当前列在数据源（dataSource）中对应的数据。其中 dataIndex 将指向 dataSource 的属性名。

  若存在 dataIndex，但不存在 rendex()，则使用 dataIndex 指向的 dataSource 的属性值作为其当前列的值。

- render

  render 是一个渲染函数，它接收一个参数函数，该参数函数接收三个参数：

  1. currentRowValue 当前行的该列值
  2. currentRowData 当前行数据
  3. currentRowIndex 当前行索引

  render() 的返回值将作为当前列的值。

  注：render 只有当需要渲染复杂的列的数据时才需要用到，如：

  ```tsx
  import { Table } from 'antd';
  const dataSource = [
    {key: "1",name: "Yomua",},
    {key: "2",name: "YHW",},
  ];
  const colums = [
  	{
          title:'键值', dataIndex:'key',
          render:(currentValue,crow,cindex) => {/** ... */return <b>{currentValue}</b>}
      },
  	{
          title:'名字', ataIndex:'name',
        render:(currentValue,crow,cindex) => {/** ... */return <a>{currentValue}</a>}
      },
  ]
  // 将渲染 2 行 2 列的数据，每行都具有 key 和 name 属性如下所示：
  //  <b>1</b>   <a>Yomua</a>
  //  <b>2</b>   <a>YHW</a>
  ReactDOM.render(<Table columns={columns} dataSource={dataSource} />, app);
  // 或使用  <Column />，它是 columns 的语法糖。
  ReactDOM.render(
      <Table dataSource={dataSource} >
      	<Column dataIndex="key" render={()=>{}} />
  		<Column dataIndex="name" render={()=>{}} />
      </Table>
      document.querySelector('#app')
  );
  ```
  
  ​		值得一提是：我们可以重复使用 dataSource 中的属性作为 dataIndex.x





# Pit

## 样式不生效？

当前组件导入 `import "antd/dist/antd.css";`，这原因是因为：css-loader 在 options 中配置了module： true 的问题，这样会开启 css-module，会默认对所有的类名与动画名启用。



​    taskID: 1000,

​    childTaskID: 1000,

​    storeName: 'Qongvin-GB',

​    sku: 'HCY-UKFBA-JM08260-01',

​    title: 'outdoor sport',

​    type: 'percentage off',

​    discount: 'percentage off',

​    fullReduction: 'percentage off',

​    budget: 'percentage off',

​    startDate: '2021-03-01',

​    endDate: '2021-03-01',

​    buildTime: '2021-03-01 13:50:03',

​    endTime: '2021-03-01 13:50:03',

​    ret: '0',

​    msg: '创建成功',

​    operation: '重试',