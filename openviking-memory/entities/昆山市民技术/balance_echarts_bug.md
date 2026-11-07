# 经营性收支公示柱状图 echarts 复用 Bug
昆山市民小程序经营性收支公示页因误用 encode 且无 dataset、重复 init 导致图表错乱与重影。

## 问题根因
- `pages_benefit/balancePublicity` 横向柱图若 `series.encode` 指向 `amount`/`product` 但未配置 `dataset`，坐标轴映射错乱、轴文字叠在一起
- `option` 变化时重复 `echarts.init` 且不 `dispose` 会导致图表重影

## 解决方案
- 改用标准 `yAxis.data` + `series.data`，金额标在柱右侧
- 有数据再 `v-if` 挂载图表，避免 `display:none` 宽高为 0
- 分包内 `echarts-uniapp.vue`：已有实例只 `setOption(..., { notMerge: true })`，卸载时 `dispose`，宽高 0 时短延迟重试

## 验证与归属
- 验证证据：extracted source=cursor project=昆山市民
- 所属项目：昆山市民；代码基线：38d1482
- 来源会话ID：fa8264ba-ca5d-4343-b44e-a4907db958f0
- 验证证据：src=昆山市民/006.md
- 涉及文件：src/pages_benefit/balancePublicity/index.vue、src/pages_benefit/balancePublicity/echarts-uniapp/echarts-uniapp.vue、src/pages_vote/vote/components/BarOption.js、src/pages_benefit/benefit/benefitAnalysis.vue、src/pages_vote/vote/components/echarts-uniapp/echarts-uniapp.vue、src/pages_benefit/balancePublicity/echarts-uniapp/wx-canvas.js

<!-- MEMORY_FIELDS
{
  "category": "昆山市民技术",
  "name": "balance_echarts_bug",
  "source_extraction_id": "41290def6eab418c91baea7174a07d93",
  "version": 2,
  "memory_type": "entities"
}
-->