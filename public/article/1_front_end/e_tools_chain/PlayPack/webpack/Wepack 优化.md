# 按需加载

通过各个手段去分离，然后组装代码成 chunk, 最后只有 chunk 被使用到才进行请求，然后加载，就称之为代码分割技术。

# [SplitChunksPlugin](https://webpack.docschina.org/plugins/split-chunks-plugin/) 

通过此插件进行配置，能对公共模块进行提取，从而在全局中共享。

此插件使用于代码分离技术中，防止公共模块被反复加载、重复打包。