# 概念

lint-staged 的目的是让你在 git commit 之前对你的代码进行一次检查，防止提交💩到你的代码库。

此库是一个代码风格、规范检查。

# 快速开始

终极命令：

1. `npx mrm@2 lint-staged`  参见：[此处](https://github.com/okonet/lint-staged#installation-and-setup) 

   此命令将根据项目依赖项中的代码质量工具安装和配置[husky](https://github.com/typicode/husky)和 lint-staged `package.json`，因此请确保在此之前安装并配置所有代码质量工具，如 [Prettier](https://prettier.io/) 和 [ESLint](https://eslint.org/) 

# 配置

```json
// package.json
  // npx lint-staged 时，将对 js,ts,tsx 执行 eslint src 和 prettire src --write
	"lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint src", 
      "prettier src --write"
    ]
  }
```



# Refrence

- [lint-staged](https://github.com/okonet/lint-staged) 
