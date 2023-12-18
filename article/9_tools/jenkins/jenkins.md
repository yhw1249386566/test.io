# 名词注解

``` 1
// Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any 
    stages {
        stage('Stage 1') {
            steps {
                echo 'Hello world!' 
            }
            steps {
                sh 'make' 
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true 
            }
        }
    }
}
```



1. `agent` 是声明式流水线的一种特定语法

   指示 Jenkins 为整个流水线分配一个执行器（在 Jenkins 环境中的任何可用代理/节点上）和工作区

2. `stages` 是声明式流水线的一种特定语法

   描述 [stage of this Pipeline](https://www.jenkins.io/zh/doc/book/pipeline/#stage) 的语法块的集合

3. `stage` 是声明式流水线的一种特定语法

   是一个描述 [stage of this Pipeline](https://www.jenkins.io/zh/doc/book/pipeline/#stage) 的语法块

4. `steps ` 是声明式流水线的一种特定语法

   它描述了在这个 `stage` 中要运行的步骤。

5. `echo` 写一个简单的字符串到控制台输出

6. `sh` 步骤调用 `make` 命令，只有命令返回的状态码为零时才会继续。

   任何非零的返回码都将使流水线失败。

   `sh` = `shell`,  是一个执行给定的shell命令的流水线 

7. `archiveArtifacts` 捕获符合模式（``**/target/*.jar``）匹配的交付件并将其保存到 Jenkins master 节点以供后续获取



# 概念

一个开源的，可以[CI/CD（持续集成/持续交付 or 持续部署）](https://www.redhat.com/zh/topics/devops/what-is-ci-cd）)的软件。

通过运行一个名为 [Jenkinsfile](https://www.jenkins.io/zh/doc/book/pipeline/jenkinsfile/) 的文本文件里面的配置，让开发人员在本地所做的修改可以自动的进行**提交 -> 测试 -> 部署**等基本流程。

- 通俗的语言来说，即：让程序如流水线（pipeline）般进行开发->测试->部署，
- 专业来说，即：将基于版本控制管理的软件持续的交付到您的用户和消费者手中。

Jenkins 的 Jenkinsfile 文件支持两种流水线语法（TIP：两种语法**可以**同时使用，参见：[此处](https://www.jenkins.io/zh/doc/book/pipeline/#:~:text=%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5%E3%80%82-,%E5%A3%B0%E6%98%8E%E5%BC%8F%E5%92%8C%E8%84%9A%E6%9C%AC%E5%8C%96%E7%9A%84%E6%B5%81%E6%B0%B4%E7%BA%BF%E8%AF%AD%E6%B3%95,%E6%A0%B9%E6%9C%AC%E4%B8%8A%E6%98%AF%E4%B8%8D%E5%90%8C%E7%9A%84%E3%80%82) ）：

1. 声明式语法

   使用 `anent`，是声明式流水线的一种特定语法

2. 脚本式语法

   使用 `node` ，是脚本化流水线的一种特定语法

   脚本式流水线包含条件测试（如上所示），循环，try/catch/finally 块甚至函数

   

# Use

## [Jenkins 和 Github 的集成](https://resources.github.com/whitepapers/practical-guide-to-CI-with-Jenkins-and-GitHub/) 

# Referecence

- [官方-入门指南](https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/) 
