# [react](https://zh-hans.reactjs.org/)

## 没有报错，但数据却不正确

- 没有报错，但数据却是不正确的（或不是最新的），请考虑你是否在某个地方使得当前数据是缓存的

  如：使用了 React.memo / useMemo() / useCallback() / shouldComponentUpdate() 等

- 更新时并没有让当前数据更新。

  使用了 uesEffect() 

注意：

- useMemo, useEffect, useCallback，它们的第二个参数：deps 可能是一个自己定义的函数

## 组件刷新导致 prop 更新，从而导致以来此 prop 的 useEffect 更新

```tsx
const Table = (props) => {
  const { dataSource = [], setDataSource } = props ?? {};

  useEffect(() => {
    if (dataSource.length >= 0) {
      setDataSource(dataSource);
    }
  }, [dataSource]);

  return <div></div>;
};

const Yomua = () => {
  return <Table />;
};

```

当 `Table` 组件刷新时，`prop-dataSource` 也会被重新赋值，所以会导致 `useEffect` 无限执行，导致 `Maximum update depth expected`。

但是当我们传递 `<Table dataSource={[]}/>` 就可以解决此问题，因为当 `Table` 组件内部自己触发刷新，会使用上层组件的 `dataSource`，而上层组件的 `dataSource` 没有变化，所以不会一直执行 `useEffect`。

或者可以在 `Table` 组件中这么做：`const activeDataSource = useMemo( () => dataSource, [dataSource])`；这样记忆 `dataSource`，当 `Table` 组件刷新时，由于 上层组件传递 `dataSource` 没有变化，所以不会导致 `useEffect` 执行。


# [react-native](https://www.react-native.cn/)

## jest-haste-map: Watchman crawl failed. Retrying once with node crawler.

macOS 中：

- [授予 Terminal 和 watchman 完全磁盘访问权限](https://stackoverflow.com/questions/58318341/why-watchman-crawl-failed-error-in-react-native-immediately-after-updating-to) （先用这个）
- [降级 watchman](https://github.com/facebook/watchman/issues/1030) （不行再用这个）

## 使用 ScrollView 包裹组件然后向下滑动无法滑动到最底部

### 为什么？

如果

```react
<Box h={10}>
    <Row h={2}></Row>
    // 加个背景色，我们就可以轻松发现 Component 的高度，然后进行滑动，能发现 ScrollView 的高度不够
  <Component h={8} bg='red'> 
      <ScroolView>
        <SomeComponent1 />
      <SomeComponent2 />
    </ScroolView>
  </Component>
</Box>
```

如果此时对 Component 内容进行触摸向下滑动，会导致最底部的内容（\<SomeComponent2 />）无法显示。

- 可以手一直向下滑动过去，但是手一旦移开，就会往上滑一段距离，从而无法显示最底部内容。

这是因为 \<ScrollView> 滑动的距离比 Component 高度小，导致  \<ScrollView/> 包裹的内容无法显示全。

### 解决方法

将 \<ScrollView> 提取到外层。

```react
<Box h={10}>
    <Row h={2}></Row>
  <ScroolView>
    <Component h={8}>
            <SomeComponent1 />
            <SomeComponent2 />
    </Component>
    </ScroolView>
</Box>
```

# 环境

## Exported variable 'xxx' has or is using name '接口名' from external module "模块路径" but cannot be named.

- 这错误通常是因为你的 interact 没有 export 就被使用了，就会报错。

## unexception token

- 当前环境不支持最新的 ES 语法，导致无法识别。如：`??`、`?.`
- 在不正常的位置添加了符号，如：不小心在 json 中添加了 `,` 等

# [storybook](https://storybook.js.org/docs/react/get-started/introduction)

## React, less, 映射符(@) 使用 storybook 报错

**报的错误**：this.getOptions is not a function，can't reslove '@/pages '等各种错误。

**为什么报错**：通常是因为运行 storybook 时，无法读取正确的配置，导致的错误。

**解决方法**：

1. 在 .storybook/main.js 对 storybook 进行运行时配置，[此处](https://storybook.js.org/docs/react/configure/overview)。
2. [使用现有的 webpack 配置](https://storybook.js.org/docs/react/builders/webpack#using-your-existing-config)。

以下是解决标题错误的方法：

```json
// package.json
{
  "devDependencies": {
    "css-loader": "^6.7.1",
    "less": "4.1.1",
    "less-loader": "7.0.0", // 因兼容性问题，此 loader 版本不能太高
    "style-loader": "3.3.1",
    "@storybook/builder-webpack5": "^6.5.9",
    "@storybook/manager-webpack5": "^6.5.9",
  }
}
```

```js
// ./storybook/main.js
const path = require('path');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/manager-webpack5',
  ],
  core: {builder: 'webpack5',},
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {loader: 'style-loader',},
        {
          loader: 'css-loader',
          options: {modules: { localIdentName: '[local]_[hash:base64:5]',},},
        },
        {loader: 'less-loader',},
      ],
      include: path.resolve(__dirname, '../src/'),
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src/'),
    };
    return config;
  },
};
```

# mac

## 在访达中搜索

`shift + command + G` 

## watchman 错误

### 解决方法1

在访达中进行搜索，/usr/local/var/run/watchman/\<user-name>-state/，删除里面的 log, pid, state，再重新跑服务。

### [How can I resolve "Unable to talk to your watchman" errors](https://stackoverflow.com/questions/69981387/how-can-i-resolve-unable-to-talk-to-your-watchman-errors)

mobile 打不开项目，可能是因为 watchman 没用启动，打开 `Terminal`，运行命令 `watchman --foreground --logfile=/dev/stdout`，然后重启启动项目即可。

### Failed to lock pidfile - Resource temporarily unavailable, and my pid = 20314

删除 /usr/local/var/run/watchman 中的 \<user>-state，然后重新启动 watchman `watchman --foreground --logfile=/dev/stdout`，最后重新启动项目即可。

# [sonarqube](https://docs.sonarqube.org/latest/)

## You must define the following mandatory properties for ‘Unknown’: sonar.projectKey

- 你可能根目录不存在 `sonar-project.properties` 文件或没配置 `sonar.projectKey = `
- 你根目录的 sonarqube 文件的名字错了，如：`snoar-project.properties`，在这里应该是 `son..` 而非 `sno..`

## PR 分析后，报告上传失败

即：类似于 `https://sonarqube.hxtrader.com/dashboard?id=ms_risk_engine_ui&pullRequest=85` 这样的链接中没有分析报告。

如何在 Sonarqube 上查看某个分支属于 pr 或者 branch：在 Sonqrube 中，在项目的名字旁边，点击分支，然后直接搜索之后，如果有头显示 Pull Reuqest 则是 pr，否则就是 branch.

建议先使用解决方法 2，不行再用解决方法 1.

1. 解决方法：在 Jenkins 的 PR Analysis 流程中，找到报告处理的信息:

```json
{
  task: {
  id: "AYHdGUslhrHHQvAVhEYJ",
  type: "REPORT",
  componentId: "AYHcSUJehrHHQvAVhEWX",
  componentKey: "ms_risk_engine_ui",
  componentName: "ms_risk_engine_ui",
  componentQualifier: "TRK",
  status: "FAILED",
  submittedAt: "2022-07-08T09:17:11+0000",
  submitterLogin: "admin",
  startedAt: "2022-07-08T09:17:11+0000",
  executedAt: "2022-07-08T09:17:11+0000",
  executionTimeMs: 64,
  errorMessage: "Could not find target branch 'null' in project",
  hasScannerContext: true,
  pullRequest: "85",
  warningCount: 0,
  warnings: [ ]
  }
}
```

看到 errorMessage 为 `Could not find target branch 'null' in project`，通常可能的原因是因为 Github 中的主分支名字（main）和 Sonarqube 中的主分支名字（master）不匹配。

修改其中任意一方的名字，让二者匹配即可。参见：[此处](https://github.com/mc1arke/sonarqube-community-branch-plugin/issues/283#issuecomment-1028076692)。

2. 解决方法：查看合并分支（feature）和被合并分支（master）是否都在 Sonarqbue 上，如果不在，需要让二者都存在于 Sonarqube 中。

   参见：[此处](https://github.com/mc1arke/sonarqube-community-branch-plugin/issues/533#issuecomment-1092381833)。

## npx yarn install 失败

可能是服务器的原因。

# monorepo 的项目中启动某个项目失败

1. 到 monorepo 中具体的项目 A，使用 `yarn`
2. 根据项目 A 中的 package.json 命令启动项目

如果成功启动就跳过以下步骤，如果没有，请继续看：

1. 根据失败的信息做事，如果错误信息缺少依赖，则根据哪里缺少依赖，就去哪里安装。

   如：可能会提示你 mono repo 根目录缺少依赖，那么就去根目录安装指定依赖（不要直接使用 yarn）。

   注意：别在根目录使用 `yarn`，因为这可能会导致你在启动某个项目时，提示依赖错误

# Browser Error

## chrome 您的连接不是私密连接

- 点击高级 - 直接敲击键盘输入：`thisisunsafe` - 回车

  **NOTICE：是直接键盘输入后回车，并不是在地址栏输入。也就是说直接空敲即可。**

  Reference: [手把手教会你解决 Chrome 访问非受信证书页面时，提示「您的连接不是私密连接」错误的方法..._运维之美的博客-CSDN博客](https://blog.csdn.net/easylife206/article/details/107171565) 

# github 进不去

- [连接GitHub提示远程主机关闭连接_git 提示 远程端意外关闭网络连接_week@eight的博客-CSDN博客](https://blog.csdn.net/qq_43431735/article/details/106031021)

- mac 清除缓存 sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder

- 流量被劫持，断 VPN，尝试用国内网络访问。

# 技巧

- 如果浏览器 Console 中提示你出现了某个错误，但是你去代码中搜索该错误（复制错误字符串）却没有搜索到，你可以尝试直接在 Console 报错的位置那里，点进去查看是那个文件出现的错误，这通常能解决 99% 的问题。

# 解决bug的思路

1. bug是什么

2. 找到bug

3. 定位bug所在的代码块

4. 根据代码块理清上下文逻辑，并找到bug具体发生在逻辑链上的哪个地方

5. 根据逻辑推敲发生此bug的原因

6. 通过bug发生的原因提出解决方案

7. 应用解决方案，并思考解决方案是否会带来的新的问题。

   如果会，那么就重复第6，第7步骤，直到提出合理的解决方案。

或详见《方法论.md》

> 1. 问题是什么？
>
>    如：点击 Login 按钮后，登录页面卡住不同
>
> 2. 找到问题发生于何处？
>
>    如：发生于登录页面
>
> 3. 问题如何发生的，怎么才能稳定触发问题的发生？
>
>    如：每次点击 Login 按钮时，登录页面就会卡住不动。
>
> 4. 为什么能稳定触发此问题的发生？
>
>    如：在代码中，点击 Login 按钮时，会进入死循环，导致页面卡住。
>
> 5. 解决问题后要达到什么效果？
>
>    如：解决问题后达到的效果为：点击 Login 按钮，进入系统，而非卡在登陆界面。
>
> 6. 如何解决问题？
>
>    如：将死循环代码解析，替换/删除即可解决。 
>
> 7. 解决此问题后，会影响到其他任何地方吗？如果会影响，为什么会影响？影响是好还是坏？如果是坏的，那如何避免此影响的产生或如何解决此影响？如果是好的，那就保留该影响。
>
>    如：不会对其他任何地方产生影响。
>
>    如：会影响到模块 A，因为模块 A 依赖于此改动，此影响是不好的，只需要做 xxx 即可避免此影响/解决此影响。
>
> 按照以上的方式将一个问题剖析之后，就可以有个良好的思路去解决该问题

# ts 报错

## This is not the tsc command you are looking for

This is not the tsc command you are looking for

To get access to the TypeScript compiler, tsc, from the command line either:

- Use npm install typescript to first add TypeScript to your project before using npx
- Use yarn to avoid accidentally running code from un-installed packages

解决方法:

1. `yarn add typescript`
   `npm i typescript`
2. 或者你安装了 `tsc` 在项目中, 这实际上并不需要; typescript 自带 tsc; 
   `yarn remove tsc`
   `npm install tsc`
   `pnpm remove tsc`