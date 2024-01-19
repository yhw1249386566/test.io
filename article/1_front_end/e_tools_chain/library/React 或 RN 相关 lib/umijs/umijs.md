# 快速开始

## 安装

1. `yarn create @umijs/umi-app` umi 官方推荐，建议使用，参见[此处](https://umijs.org/zh-CN/docs/getting-started#%E7%8E%AF%E5%A2%83%E5%87%86%E5%A4%87)
   
   根据选项，选择适用自己项目的
   
   `yarn create umi` 

2. `yarn ` 
   
   安装依赖

3. `yarn start` 
   
   一个简单的 umi 项目就运行起来了。

## 配置 typescript.json

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
   
   ` yarn add @umijs/plugin-sass --dev ` **若使用 yarn create umi 时必须使用这个**

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
   
    注意：使用 sass 的 css 文件后缀名为：`.scss`

PS：若使用 `npm` 的方式安装失败，则直接使用 `yarn` 的方式安装。

# 打包

- 打包后想要运行，需要再 `.umirc.ts` 或你[自定义的配置文件](https://umijs.org/zh-CN/docs/config#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)（config/xx）中配置
  
  ```ts
  export default defineConfig({
    publicPath: './',
    history: {
      type: 'hash'
    },
  ```

- 这样之后，直接运行 `yarn build` 或 `umi build` 即可打包，并且打包后能成功运行。

# [HTML 模板](https://umijs.org/zh-CN/docs/html-template)

## 概念和使用

umijs 中存在一个默认 HTML 模板，但是我们可以覆盖它，即：umiJS 规定：若`src/pages/document.ejs` 文件存在，则 umi 会将之作为默认模板，比如：

> TIP：.ejs [EJS](https://ejs.bootcss.com/#install) 库生成的文件，它能利用普通的 JavaScript 代码生成 HTML 页面，也能在 HTML 中写 JS.

```ejs
<!DOCTYPE html>
<html>
<head>
  <meta charSet="utf-8" />
  <title>Your App</title>
  <!-- EJS 的简单用法 -->
  <link rel="icon" type="image/x-icon" href="<%= context.config.publicPath %>favicon.png" />
</head>
<body>
    <!-- 在模板文件中最好存在根元素 -->
  <div id="root"></div>
</body>
</html>
```

如果你需要针对某些特定页面使用特定模板，这时候需要用到配置文件，请在路由中配置，如下示例：

```js
// .umirc.js/.umirc.ts
// config/routes.ts   config/routes.js
{
  "pages": {
    "/": { document: "./a.ejs" },
    "/list": { document: "./b.ejs" }
  }
}
```

如果 pages 里面指定的和 document.ejs 或 umi 内置模板发生冲突，则它们的优先级为：`pages 里指定 > pages/document.ejs > umi 内置模板。` 

## 作用

umijs 的模板文件的作用是：可以在其中引入不支持 npm 的第三方库等，还能配置一些根样式。

## 参考文献

- [Umjs 3.x](https://www.bookstack.cn/read/umijs-3.x/docs-html-template.zh-CN.md)
- [Umjs 文档](https://umijs.org/zh-CN/docs/html-template)
- [Umijs 网络](https://www.yuque.com/beibanqiuningmeng/storage/xpyrfv)

# [父子路由](https://umijs.org/zh-CN/docs/routing#routes)

## 基本概念

现在有如下路由配置：

```tsx
export default {
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/list', component: 'list' },
        { path: '/admin', component: 'admin' },
      ],
    }, 
  ],
}
```

通过这份路由配置我们可以知道，路由地址 `/list` 和 `/admin` 都是 `/` 路由地址的子路由地址；那么我们如何使用子路由呢？

细心的你应该已经尝试过：如果你按照这路由配置去运行程序，在浏览器地址上输入 `/list` 或 `/admin` 时，对应的 `list` 或 `admin` 组件并没有渲染！

这是因为子路由需要通过特殊的方式来使用，无法直接按照父路由的使用方式， 其子路由的使用方式为：**在父路由地址对应的组件的渲染函数中，通过在其中使用 `props.children` 就能获取到所有子路由的组件并渲染到父路由组件中！** 至于为什么是 `props.children`，您可以看看[这里](https://zh-hans.reactjs.org/docs/composition-vs-inheritance.html#containment)。

```tsx
// index.tsx
const Index = (prsop: any) => (<>{props.children}</>)
```

现在你再在页面地址中输入：`/list` 或 `/admin`，umi 就会去寻找离它们两个最近的父路由并将之渲染，这样父路由（`index`）一旦被渲染，就会由于父路由组件的渲染函数中存在 `props.children` 的关系，子路由组件也将被渲染。

这样就达到，输入 `/list` 或 `/admin` 就会渲染 `list` **或** `admin` 组件的效果（实际上它们是**因为渲染了父路由组件 `index` 从而顺便被渲染出来的罢了**，不信你可以通过在父路由组件的渲染函数中多新增一条数据，然后输入 `/list` 或 `/admin` 时，就会发现渲染的对应子组件中将会包含你刚刚新增的一条数据）。

- 这里说的 `或` 是因为：在父组件使用 `props.children`，`umi` 会自动的根据你对应的子路由地址渲染正确的子路由组件，而不是一股脑地将父组件所有的子组件渲染出来！

请注意：正如我刚才所说的，若你没在父路由地址 `/` 对应的组件 `index` 中，使用 `props.children`，那么你即使直接输入 `/list` 或 `/admin`，都无法获取到它们两个的组件的。

这是因为，当一个或多个路由地址是另一个路由地址的子路由地址时，那么在你向浏览器输入子路由地址时，

 `umi` 就会将你输入的子路由地址的信息以及对应的子路由组件的信息作为 `props.children` 属性（一个对象）的值传递给父路由地址对应的父组件的 `props` 中，

从而使得父路由组件可以通过 `props.children` 获取你输入的子路由地址的组件、地址等信息，并将之渲染到页面。

## 子路由地址和父路由地址一样

承接上面 基本概念 一节。

现有如下配置：

```ts
export default {
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/', component: 'list' },
      ],
    }, 
  ],
}
```

有意思的是，如果一个子路由地址和父路由地址是一样的，且你在父路由地址对应的组件中有使用 `{props.children}`，那么当你输入 `/` 时，由于子路由地址和父路由地址是一样的，所以此时的 `umi` 会将 `/` 对应的子组件 `list` 作为 `props.children` 的值发送给父组件 `index` 中的 `props`。

所以这其中的流程大致为：`umi`     将把 `/` 子路由地址对应的子组件 `list` 以及它的路由地址等信息作为 `props.children` 发送给父路由地址 `/` 对应的父组件 `index` 的 `props` 中，然后 `umi` 将会先去加载父组件 `index`，当遇到 `props.children` 时，将会将子组件 `list` 渲染出来，然后继续加载父组件或执行完毕。

这是因为，它们的地址都是一样的 '/'，umi 并不知道你的实际加载需求，所以直接默认你想加载最深处的子路由地址 '/'，

从而就会使得从最深处的子路由地址的最高祖辈路由地址，一层层的往下加载，直到最深处的路由地址：'/'。

比如：有 1 个层级关系：A -> B -> C -> D，如果用户输入 D 路由地址，那么就需要先加载 C，想加载 C 就要加载 B，想要加载 B 就要加载 A；所以加载 D 必须，先从 A -> B -> C，最后才能加载 D.

当然的，这种子路由地址和父路由地址一样，然后想让它们按照从最高祖辈直到最深处路由地址对应的组件渲染，**首先得保证每一个父组件都有使用 `props.children` 让父组件渲染出子组件。**

使用这种方式的好处在于你可以设置一些全局布局，比如：

```react
<Layout> 路由地址为： "/"
    <Contain> 路由地址为： "/"
        <App /> 路由地址为： "/"
    </Contain>
</Layout>
```

这样，我们就能渲染出 App 组件，同时还能使用 Layout 和 Contain 组件设置的布局和一些其他属性。

# 配置

## 使用 chainWebpack 字段更改 umi 内置 webpack 配置

### 介绍

使用 umi 脚手架时，你可能很想要更改 umi 中的 webpack 配置，或是添加，或是删除一些。

umi 很人性化的通过内置了一个  `chainWebpack` 字段来使用 [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain) | [CN](https://github.com/Yatoo2018/webpack-chain/tree/zh-cmn-Hans) 及其 API 来更改它自身的 webpakc 配置。

下面让我们通过向 umi 中添加 1 个 [webpack-sprite](https://www.npmjs.com/package/webpack-spritesmith)（[这里](https://zhuanlan.zhihu.com/p/72381081)有步骤）插件，来简单讲解 chainWebpakc 的使用吧

### 示例：添加 [webpack-sprite](https://www.npmjs.com/package/webpack-spritesmith) 插件

```ts
// .umirc.ts
import { defineConfig } from 'umi';

const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith'); // 导入插件
// 格式模板，即：当精灵图制作完成后，生成的对应的 css 格式。
// 若不使用格式模板，则 webpack-spritesmith 将自动生成 .scss 格式的文件
var templateFunction = function (data) { 
  var shared = '.icon { background-image: url(I);background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image).replace('W', data.spritesheet.width).replace('H', data.spritesheet.height)
  var perSprite = data.sprites.map(function (sprite) {
    return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
      .replace('N', sprite.name)
      .replace('W', sprite.width)
      .replace('H', sprite.height)
      .replace('X', sprite.offset_x)
      .replace('Y', sprite.offset_y);
  }).join('\n');
  return shared + '\n' + perSprite;
};

export default defineConfig({
  chainWebpack(config, { webpack }) {
    // 使用插件
    /**
     * 第一个参数：将导入的插件赋给的变量名
     * 第二个参数：一个数组，里面为你想要为该插件配置的任何参数选项
     * config.plugin(name)：这里的 name 是任意的，为你的插件取个名字
     */
    config.plugin('webpackSprite').use(SpritesmithPlugin, [
      {
        src: {
          cwd: path.resolve(__dirname, './src/components/panel1/assets/img'),
          glob: '*.png'
        },
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprites.png'),
          css: [
            [path.resolve(__dirname, './src/assets/css/sprites.scss'), {
              // 引用自己的模板
              format: 'function_based_template' // 不使用格式模板将自动生成 .scss 格式
            }],
          ]
        },
        // 不使用格式模板将自动生成 .scss 格式
        customTemplates: { 'function_based_template': templateFunction,},
        apiOptions: {cssImageRef: "../img/sprite.png" //css根据该指引找到sprite图},
        spritesmithOptions: {padding: 20}, // 生成精灵图时，每个图之间存在空隙
      }
    ]); 

    /** 配置 loader */
    config.module
      .rule('compile')
      .test(/\.html$/i)
      .use('html-loader')
      .loader('html-loader')Ï
  },

});
```

一下是在使用  `config.plugin('monaco-editor').use(pluginName, options)`   的第二个参数时，对应的 wepack 配置。

```js
// webpack.config.js
{
    // 下图的 new SpritesmithPlugin({..}) 的参数对象对应的就是下面的第二个参数：options
    // config.plugin('monaco-editor').use(pluginName, options)  
    plugins: [
      new SpritesmithPlugin({
        /*
        目标小图标，这里就是你需要整合的小图片的老巢。
        现在是一个个的散兵，把他们位置找到，合成一个
        */
        src: {
          cwd: path.resolve(__dirname, './src/assets/icon'),
          glob: '*.png'
        },
        // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式，自己配置想生成去哪里就去哪里
        target: {
          image: path.resolve(__dirname, './src/assets/images/sprite.png'),
          css: [
            [path.resolve(__dirname, './src/assets/css/sprite.scss'), {
              // 引用自己的模板
              format: 'function_based_template'
            }],
          ]
        },
        // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
        customTemplates: {
          'function_based_template': templateFunction,
        },
        // 样式文件中调用雪碧图地址写法（Readme这么写的）
        apiOptions: {
          cssImageRef: '~sprite.png'
        },
        // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
        spritesmithOptions: {
          padding: 20
        }
      })
    ]
}
```



## 将 less 注入到全局

```ts
lessLoader: {
  // Reference： https://juejin.cn/s/less-loader%20modifyvars%20hack
  modifyVars: {
      hack: 'true; @import "~@/assets/less/_index.less";',
  },
},
```
