# 名词说明

- [通配符的意思](https://docs.sonarqube.org/latest/analysis/test-coverage/test-execution-parameters/) 

  

# [javascript/typescript sonar 配置说明](javascript/typescript sonar 配置说明) 

# sonar-project.properties 

- [sonar.source, sonar.tests, sonar.exclusions, sonar.test.inclusions 说明](https://docs.sonarqube.org/latest/project-administration/narrowing-the-focus/) 
- [sonar 基本配置说明](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/) 

```bash
# 配置项目在 sonar 中的 key
sonar.projectKey=projectKey

# 定义 sonar 要扫描的【源文件】和【测试源文件】目录 / 文件
sonar.sources = src/ 或 sonar.sources = src/utils.ts
sonar.tests = src/ 或 sonar.sources = src/utils.spec.ts

# 在要扫描的源文件目录 src 中，排除 **/test/**/* 目录
sonar.exclusions = src/**/test/**/*

# 在测试文件目录 src 中，更加精确指定包含测试的文件目录
sonar.test.inclusicons = src/**/test/**/*

# sonar 服务的 url，如：https://sonarqube.hxtrader.com
sonar.host.url = https://sonarqube.hxtrader.com

# 登录 sonar url 时的 用户名token
sonar.login=yomua 或 fc013ea40d81fd09d2601d269e2ce8d14dd5ef99
# 如果 sonar.login 用的是用户名则需要此参数，若用 token 则不需要此参数
sonar.password=loveyou

# javascript/typescript 测试覆盖率报告
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

# Reference

- [SonarQbue 官方](https://docs.sonarqube.org/latest/) 
