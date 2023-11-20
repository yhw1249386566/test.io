# 名词解释

- [Time Series ](https://en.wikipedia.org/wiki/Time_series)时间序列

  按时间顺序索引（列出/绘制出）的一系列数据点。

  时间序列是在连续等间隔的时间点上取得的序列。

# [什么是 Grafana](https://grafana.com/docs/grafana/latest/getting-started/) 

Grafana 是开源可视化和分析软件。它允许您查询、可视化、提醒和探索您的指标，无论它们存储在哪里。用简单的英语，它为您提供了将时间序列数据库 (TSDB) 数据转换为精美图表和可视化效果的工具。

Grafana 是一个跨平台的工具——对数据度量分析和可视化。	它将采集到的数据（通过数据源）进行查询，然后可视化显示它，并及时通知监控者。

# [特点](https://www.cnblogs.com/icez/p/Prometheus_Grafana_monitor.html) 

Grafana是一个跨平台的开源的度量分析和可视化工具，可以通过将采集的数据查询然后可视化的展示，并及时通知。它主要有以下六大特点：

1. 展示方式：快速灵活的客户端图表，面板插件有许多不同方式的可视化指标和日志，官方库中具有丰富的仪表盘插件，比如热图、折线图、图表等多种展示方式；
2. 数据源：Graphite，InfluxDB，OpenTSDB，Prometheus，Elasticsearch，CloudWatch和KairosDB等；
3. 通知提醒：以可视方式定义最重要指标的警报规则，Grafana将不断计算并发送通知，在数据达到阈值时通过Slack、PagerDuty等获得通知；
4. 混合展示：在同一图表中混合使用不同的数据源，可以基于每个查询指定数据源，甚至自定义数据源；
5. 注释：使用来自不同数据源的丰富事件注释图表，将鼠标悬停在事件上会显示完整的事件元数据和标记；
6. 过滤器：Ad-hoc过滤器允许动态创建新的键/值过滤器，这些过滤器会自动应用于使用该数据源的所有查询。

# grafana 内置包

以下3个是 Grafana 内置的，它们本质是 npm 包（还有其他更多内置的包）

- [Jaeger ](https://grafana.com/docs/grafana/latest/datasources/jaeger/)

  - Jaeger 提供开源、端到端的分布式跟踪

  - [Jager-doc ](https://www.jaegertracing.io/docs/1.24/)Jaeger 用于[监控和故障排除]基于微服务的分布式系统-

    即：监控系统并排除故障

- [Loki](https://grafana.com/docs/grafana/latest/datasources/loki/)

  - [Loki-npm](https://www.npmjs.com/package/loki)
  - Loki 是 Grafana Labs 的开源日志聚合系统
  - 将其添加为数据源，您就可以在[Explore 中](https://grafana.com/docs/grafana/latest/explore/)构建仪表板或查询日志数据
  - 简单来说：Loki 是专门用于聚集日志数据

- [Prometheus-Grafana](https://grafana.com/docs/grafana/latest/datasources/prometheus/)

  - [Prometheus-npm](https://github.com/prometheus)是一个开源系统监控和警报工具包

  - [Prometheus-doc](https://prometheus.io/docs/introduction/first_steps/) Prometheus是一个监视平台，通过抓取被监视的目标上的HTTP端点从而收集指标。

  - 它通过定时抓取目标{target}/metrics 接口来采集数据的

  - [Grafana 对 Prometheus 的支持](https://prometheus.io/docs/visualization/grafana/)

    即：Grafana 可以从 Prometheus 查询数据

  - 能对服务器 CPU、内存等硬件信息的监控

  - Prometheus 工作时通过HTTP的方式周期性抓取被监控组件的性能数据，任意想要被监控的组件只需要提供对应的HTTP接口即可接入监控，不需要额外的SDK支持或者其他的集成过程，输出被监控组件性能信息的HTTP接口被叫做exporter。
    其中常用的exporter有node_exporter，可以用来输出服务器的CPU使用率，磁盘占用情况，网络带宽使用情况，等基本性能信息。

# grafana 界面

- Edit 界面

  - Metrics：查询的语句->你需要知道当前数据源的哪个指标（数据）

  - Legend：一个标识，更改它可以同步更新图表下方的数据表名的名字

    点击数据表名可以切换到单个数据的图表显示，点击两下可以（不选择任何一个数据表）切换到所有数据的图表显示。

  - \+ Query 添加一个数据源并查询指定数据，它会显示在图表中（[Grafana 支持混合数据源显示在同一图表中](https://www.cnblogs.com/icez/p/Prometheus_Grafana_monitor.html)）

  - Query inspector：用来查看原始请求和响应。即：你可以得到当前查询的 url 的响应体以及它们的请求体。
