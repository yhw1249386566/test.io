# ava

一个测试库，类似于 Jest，不过各有所劣和所优。

# 将 ava 集成到 [SonarQube](https://docs.sonarqube.org/latest/) 

> 参见：[stackoverflow](https://stackoverflow.com/questions/56755397/merge-coverage-for-sonarqube-with-istabuljs-nyc) 

对于 SonarQube 来说，XML 格式的覆盖率测试文件不是必须的，它只需要 **lcov** 格式的文件，若你想要使用 ava 生成该文件，请执行以下步骤：

1. 执行 `nyc ava && nyc report --reporter=lcov --report-dir=.nyc_coverage` 命令

   nyc ava: 执行所有 *.spec.ts 测试

   --reporter=lcov 生成 lcov 格式的覆盖率测试文件

   --report-dir：生成的覆盖率文件夹在根目录的位置=>在这里，将在项目根目录创建 `.nyc_coverage` 的文件夹，并在文件夹下生成测试报告

2. 告诉 SonarQube 你配置的 **lcov** 文件在哪里，如使用 sonar-project.properties 文件配置：

   ```
   sonar.projectKey=任意名字
   // sonarqube 服务器的地址
   sonar.host.url=https://sonarqube.hxtrader.com
   // 登录 token
   sonar.login=fc013ea40d81fd09d2601d269e2ce8d14dd5ef99
   // lcov 文件在哪
   sonar.javascript.lcov.reportPaths=.nyc_coverage/lcov.info
   ```

TIP：你可以在任何能配置 SonarQube 的文件中写类似于上面这种配置即可，只要 SonarQube 能扫描到你的配置文件即可，且 SonarQube 专注于质量检测，覆盖率测试只是其中一部分。

# 用命令使用 ava

## [生成测试报告](https://github.com/avajs/ava-docs/blob/main/zh_CN/readme.md#%E4%BB%A3%E7%A0%81%E8%A6%86%E7%9B%96%E7%8E%87) 

- 需要 [nyc](https://github.com/istanbuljs/nyc)

  nyc 能根据测试工具的反馈，生成人类可读的测试报告已经机器可读的测试覆盖率等。

单独得到某个文件的测试报告：

- `nyc  --reporter=lcov --reporter=text --report-dir=.nyc_coverage ava 文件绝对路径`

  注意：如果将此命令放入 pakage.json 的 scripts 中，则需要使用 `npx` 调用 `nyc`

得到所有文件的测试报告：

- `npx nyc ava && npx nyc report --reporter=lcov --reporter=text --report-dir=.nyc_coverage`

# 指标含义

- %stmts是语句覆盖率（statement coverage）：是不是每个语句都执行了？
- %Branch分支覆盖率（branch coverage）：是不是每个if代码块都执行了？
- %Funcs函数覆盖率（function coverage）：是不是每个函数都调用了？
- %Lines行覆盖率（line coverage）：是不是每一行都执行了？
- Uncovered Line #s 未覆盖的行：黄色表示行语句部分覆盖，红色标色完全没覆盖。

# FAQ

## 本地显示成功，但 SonarQube 或 github 对应 pr 上显示失败（[参见:此处](https://blog.csdn.net/a910196454/article/details/111348833)）

我们知道，sonarqube 分析分为两个步骤：

1. SonarQube 客户端工具在你的本地代码上运行，编译分析报告，然后将其提交给 sonarqube 服务器。
2. 分析报告在服务器端处理，并在数据库中更新对应项目数据

步骤1是同步进行，而步骤2是异步进行的，所以在相关后台任务完成之前，分析尚未完成，就会导致即使本地显示 Success，但是对于后台服务器来说，你的检测仍为失败。

若你是 SonarQube 管理员，可以在 **管理>项目>后台任务** 中查看对应的任务，若任务的状态为 PENDING，则表示它正在排队，若任务状态为 IN_PROGRESS，则表示任务已到达队列的开头，并且正在服务器端进行集成。

TIP：这种集成不是立即发生的，需要计算对应项目的汇总指标和更新对应项目数据库数据，另外项目的大小和服务器可用的资源，会影响它的执行时长。

## pr 分析失败，但是 branch 分析成功，可能

- pr 的目标分支不在 Sonar 上，需要先让目标分支存在于 Sonar 上。

# Reference

- [ava](https://github.com/avajs/ava) 
- [SonarQube](https://docs.sonarqube.org/latest/) 
