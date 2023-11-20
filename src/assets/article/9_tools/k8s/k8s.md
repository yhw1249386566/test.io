# k8s 是什么

k8s 全称为：Kubernetes

一个可移植、扩展，管理 docker 的开源平台。

运用集群技术，为 docker 提供一个同样的环境，达到跨平台的目的。

K8s 包含1个或以上的 Node，每个 Node 又包含kubelet、kube-proxy、Pod，其中 Pod 是 k8s 管理的基本单元（最小单元），用来存放 docker 的。

K8s

Node

Kubelet、kube-proxy、pod

K8s 是通过管理 **pods** 从而间接管理到 **docker** 的，每个 pods 可以有1个或多个 docker，但是约定俗成的是：一个 **pods** 下的 **docker** 都是要存在关联的，否则毫无关系的 **docker** 应该置入另一个 **pods.**

# 为什么会有 k8s?

随着 dcoker 越来越多，管理成本就会增加，所以我们需要一个工具来帮助我们管理和维护这些 docker，而 k8s 就是在此需求上诞生。

# Reference

- [k8s-知乎](https://zhuanlan.zhihu.com/p/162928436) 
- [k8s-CN](https://kubernetes.io/zh/) 
