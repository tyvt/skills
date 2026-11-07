# Web chart repeated init: reuse via getInstanceByDom plus single resize bind plus dispose
Warning `There is a chart instance already initialized on the dom` comes from mounted and watch(dataList/setOption) calling drawCharts() many times, each doing echarts.init(dom) and binding resize with an anonymous function (cannot remove).

## Solution
- Unified pattern: `echarts.getInstanceByDom(dom) || echarts.init(dom)`.
- Store the resize handler in a component field; bind only once.
- In `beforeUnmount`/`destroyed`, call `removeEventListener` + `chart.dispose()`.
- Use `$nextTick` before drawing when triggered by watch.
- Batch-align isomorphic componentCharts in benefit statistics, monitor, property dashboard, etc.

## Verification & Attribution
- Evidence: session 2a9f420a, stack at communityStatistics.vue:35; batch-fixed benefit/dataStatistics and multiple componentCharts.
- Files: zhi2-web-admin/src/views/benefit/dataStatistics/components/communityStatistics.vue, zhi2-web-admin/src/views/dataStatistics/components/componentCharts.vue, zhi2-web-admin/src/views/monitor/components/ComponentCharts.vue
- Project: 2-0; Source session: 2a9f420a-f2ff-426a-a5c2-7881713c1a52; Code baseline: none

## 验证与归属
- 所属项目：2-0
- 验证证据：extracted source=cursor project=2-0
- 来源会话：2a9f420a-f2ff-426a-a5c2-7881713c1a52


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "echarts_repeat_init",
  "source_extraction_id": "f56bb86d24e844988a244c2e70075655",
  "version": 1,
  "memory_type": "entities"
}
-->
