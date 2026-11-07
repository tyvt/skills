# 同 DOM 重复 init 致 ECharts 实例已存在告警
组件在 mounted 及 watch 中直接 echarts.init 同一 DOM 且绑定匿名 resize 监听，导致实例已存在告警与监听泄漏。

## 问题根因
- 组件（如 communityStatistics.vue）在 mounted 及 watch 中直接 echarts.init 同一 DOM
- 绑定匿名 resize 监听函数导致无法移除，产生监听泄漏与实例已存在告警

## 解决方案
- 改用 echarts.getInstanceByDom(dom) || echarts.init(dom) 复用实例
- resize 监听用组件字段保存引用，销毁时 removeEventListener 与 dispose
- watch 中套 $nextTick 确保 DOM 就绪后再操作

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 验证证据：src=2-0/019.md
- 涉及文件：communityStatistics.vue
- 所属项目：2-0；来源会话ID：2a9f420a-f2ff-426a-a5c2-7881713c1a52；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_dup_init",
  "source_extraction_id": "07d76519daf74721861ef48c23fa6ca0",
  "version": 1,
  "memory_type": "entities"
}
-->