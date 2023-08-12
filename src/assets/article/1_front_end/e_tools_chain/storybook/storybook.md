# [快速开始](https://storybook.js.org/docs/react/get-started/install) 

Storybook 需要安装到已经设置了框架的项目中。它不适用于空项目。有很多方法可以在给定的框架中引导应用程序，即：大部分框架是可以将 storybook 集成进去，或者干脆自带 storybook

# 配置

以下配置基于 `"umi": "^3.5.24"`

```js
// .storybook/main.js
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/manager-webpack5',
  ],
  core: {
    builder: 'webpack5',
  },
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[local]_[hash:base64:5]',
            },
          },
        },
        {
          loader: 'less-loader',
        },
      ],
      include: path.resolve(__dirname, '../src/'),
    });

    config.resolve.alias['@'] = path.resolve(__dirname, '../src/');

    return config;
  },
};

```

```js
// .storybook/preview.js
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

```

- `main.js` 

  此文件中的配置用来作为 storybook 运行时的环境配置，如果 storybook 出现意外错误，通常是因为配置出现了问题。

  错误可参见：error_handler.md

# [示例](https://storybook.js.org/docs/react/writing-stories/introduction) 

```tsx
// Ruleform.stories.tsx
import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '@mui/material';

import RiskRuleForm from '@/pages/Rules/RuleForm';

const Template: ComponentStory<typeof RiskRuleForm> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(!open)}>
        Open
      </Button>
      <RiskRuleForm {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const Index = Template.bind({});

// 除了 argTypes 的方式可以给值，以下方式也可以给值。但这种方式的配置不够强大。
Index.args = {
	mode: 'view',
  initialValues: {
    id: 'id'
  }
};


export default {
  title: 'RiskRules/RiskRulesForm',
  component: RiskRuleForm,
  argTypes: {
    mode: { defaultValue: 'view', control: 'select', options: ['add', 'view'] },
    initialValues: {
      defaultValue: {
        id: 'id',
      },
    },
  },
} as ComponentMeta<typeof RiskRuleForm>;

```

在编写 storybook 时，我们可以给组件添加 React 的基本功能，如：useState 等。

# 参数

- [argTypes](https://storybook.js.org/docs/react/api/argtypes#gatsby-focus-wrapper)  

  用来设置你要写的组件 storybook 的参数，如：

  ```tsx
  argTypes: {
  	mode: {
  		defaultValue: 'view', 
  		control: 'select', 
  		options: ['add', 'view']
  	}
  }
  ```

  [这里](https://storybook.js.org/docs/react/writing-docs/doc-block-argstable#customizing)是 argTypes 的可用配置

  

# Reference

- [storybook](https://storybook.js.org/) 