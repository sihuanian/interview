## Fiber

> Fiber 是 React 16 版本引入的新概念，支持增量渲染和优先级调度，主要解决了 React 在更新过程中遇到的性能问题。

### 传统协调算法的局限性

- 递归不可中断，采用深度遍历更新组件树，一但开始，无法暂停，可能导致长时间占用主线程，造成页面卡顿

### Fiber 的目标

> fiber 节点是一个链表结构，存储了父节点、子节点、兄弟节点的引用，实现渲染任务的暂停和恢复

- 可中断和恢复，将渲染任务拆分成多个小单元，可暂停和恢复
- 优先级调度，区分任务优先级，优先处理高优先级的任务

### 传统协调调度算法 VS Fiber 协调调度算法

| 维度       | 传统 Stack Reconciler | Fiber Reconciler       |
| ---------- | --------------------- | ---------------------- |
| 任务执行   | 同步、不可中断        | 异步、可中断与恢复     |
| 数据结构   | 递归树                | 链表结构（Fiber 节点） |
| 优先级控制 | 无                    | 支持任务优先级调度     |
| 适用场景   | 简单应用              | 复杂应用、高交互需求   |

## diff 算法

### diff 算法的基本原则

1. 跨层级移动很少发生：节点在不同层级移动，直接销毁重建而非复用
2. 相同类型的组件生成相似的结构：组件类型相同，复用 DOM 节点，类型不同销毁旧节点

## fiber 架构和 diff 算法

| 特性     | Diff 算法                    | Fiber 架构                     |
| -------- | ---------------------------- | ------------------------------ |
| 本质     | 优化 DOM 变更的算法策略      | 实现异步渲染的底层架构         |
| 核心贡献 | 最小化 DOM 操作              | 实现可中断、优先级驱动的更新   |
| 协作方式 | Fiber 利用 Diff 结果更新 DOM | 为 Diff 提供任务调度和结构支持 |
