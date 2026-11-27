---
audit_status: valid
last_checked: 2026-11-27T10:41:03+08:00
verdict_note: 在苏住房C仓源码命中核心符号(8/8)addeventlistener,balancepublicity,echarts,function，涉及文件存在，描述与现状一致，判有效。
---
# ECharts 5.3+ 初始化 el 监听非函数报错
苏住房C 移动端 ECharts 5.4.1 初始化阶段报 `el.addEventListener is not a function`，源自 ECharts 5.3+ 行为变化。

## 问题现象
- 报错 `el.addEventListener is not a function` 源自 ECharts 5.3+（项目 5.4.1）初始化阶段

## 涉及文件
- src/pages_benefit/components/echarts-uniapp/echarts-uniapp.vue
- src/pages_benefit/balancePublicity/index.vue
- src/pages_benefit/budget/index.vue
- src/pages_benefit/components/echarts-uniapp/wx-canvas.js
- src/pages_benefit/components/echarts-uniapp/echarts-instance.js
- src/pages_owner/income/components/StatisticsCard.vue

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 验证证据：src=苏住房C/072.md
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：8cedd4de-3840-43fc-828d-12511bc40dc9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "echarts_listener_error",
  "source_extraction_id": "792ac32c904246d5a8d095eccd5645e4",
  "version": 1,
  "memory_type": "entities"
}
-->