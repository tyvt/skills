# ECharts 实例复用与 resize 监听修复
在 zhi2-web-admin 的多个统计组件中，因重复 echarts.init 与匿名 resize 监听导致 `There is a chart instance already initialized on the dom` 告警，已统一改为复用实例并清理监听。

## 问题根因
- 组件在 `mounted` 与 `watch(dataList)`/`watch(setOption)` 中均调用 `drawCharts()`，每次直接 `echarts.init(dom)` 不复用已有实例。
- 反复 `window.addEventListener('resize', () => ...)` 使用匿名函数，无法移除，导致监听越绑越多。

## 解决方案
- 改用 `echarts.getInstanceByDom(dom) || echarts.init(dom)` 复用实例。
- resize 监听只绑定一次：用组件字段保存 handler，销毁时 `removeEventListener`。
- 组件销毁时执行 `chart.dispose()` 清理。
- watch 里用 `$nextTick` 避免 DOM 未渲染就初始化。

## 涉及文件与归属
- 涉及文件：`zhi2-web-admin/src/views/benefit/dataStatistics/components/communityStatistics.vue`、`paymentsStatistics.vue`、`quarterPaymentsStatistics.vue`、`managementTypeStatistics.vue`。
- 所属项目：2-0；来源会话ID：2a9f420a-f2ff-426a-a5c2-7881713c1a52；验证证据：extracted source=cursor project=2-0。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_reuse_fix",
  "source_extraction_id": "b22c5c3f66104829a41402eaeb1ba6a1",
  "version": 1,
  "memory_type": "entities"
}
-->