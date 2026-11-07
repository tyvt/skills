# 维修面板Y轴刻度修正
在 Suzhou Housing G 项目中，维修趋势图的Y轴末端标记不均匀且左侧边距过大；已修正。

## 原因与解决方案
- 在 RepairPanel.vue 中，grid.left 从 44 改为 8，同时保持 containLabel。
- 新函数 buildTrendYScale 根据峰值计算间隔，且 max=ceil(maxVal/interval)*interval，min:0。
- 这消除了Y轴末端的非均匀间距。

## 涉及文件
- src/views/home/v2/components/RepairPanel.vue
- src/views/home/v2/components/EChartsBox.vue
- src/views/home/v2/components/PublicBenefit.vue
- package.json, tests/e2e/home-v2.spec.mjs, tests/e2e/home-v2-mocks.js

## 验证
- 验证证据: 苏住房G/088.md (内部文档)。
- 来源会话: 0f8fb539-1a29-4d91-bc69-d033c6762e16。
- 代码基线: none.

## 验证与归属
- 所属项目：苏住房G
- 验证证据：extracted source=cursor project=苏住房G


<!-- MEMORY_FIELDS
{
  "category": "缺陷修复",
  "name": "repair_panel_yaxis",
  "source_extraction_id": "d932d4a67f654d5dbfff00e631306d33",
  "version": 1,
  "memory_type": "entities"
}
-->
