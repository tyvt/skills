# 统计地图停车泊位区块边距修复
统计地图抽屉停车泊位 Tab 汇总卡因缺少统一内边距，与其他 Tab 间距不一致，已修复。

## 问题根因
- `operatingAssets.vue` 中已统一调整区块间距：`collapse-content` 上边距 `24px`→`10px`；经营资产/经营资源统计区用 `operating-assets__stats`，带 `padding: 10px 0 14px`
- 停车泊位汇总区用 `.parking-total-card`，未补同样内边距，导致与下方「停车泊位明细」间距不一致

## 修复方案
- 为 `.parking-total-card` 补充 `padding: 10px 0 14px`，与 `operating-assets__stats` 一致
- 样式：`display: grid; grid-template-columns: 260px 1fr; gap: 24px; padding: 10px 0 14px;`

## 涉及信息
- 涉及文件：zhi2-web-admin/src/views/benefit/statisticsMap/operatingAssets.vue、benefit/statisticsMapDetail/index.vue、components/Headline/index.vue
- 所属项目：产品2.0；来源会话：870b5b21-223f-480d-b1ef-f92c770baf5b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_margin_fix",
  "source_extraction_id": "b837a06438f441dda7f1aae99615b63a",
  "version": 1,
  "memory_type": "entities"
}
-->