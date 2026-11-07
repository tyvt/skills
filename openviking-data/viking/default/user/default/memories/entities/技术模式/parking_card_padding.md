# 停车位概要卡片
operatingAssets.vue 组件在停车位卡片中因缺少 padding 导致间距不一致。

## Description
- operatingAssets.vue 中的 .parking-total-card 没有 padding:10px 0 14px
- 其他 Tabs 使用 operating-assets__stats 并带有相同的 padding
- 已应用修正：为 .parking-total-card 添加 padding:10px 0 14px

## Purpose
- 保持运营资产页面各选项卡之间的间距一致性

## Relations
- 涉及文件: benefit/statisticsMapDetail/index.vue, benefit/statisticsMap/operatingAssets.vue, components/Headline/index.vue, benefit/statisticsMap/overviewContent.vue, benefit/statisticsMap/assetLease.vue
- cursor 会话: 870b5b21-223f-480d-b1ef-f92c770baf5b

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：870b5b21-223f-480d-b1ef-f92c770baf5b


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "parking_card_padding",
  "source_extraction_id": "e8a7bac845c54be09b1a363a7c43e8e5",
  "version": 1,
  "memory_type": "entities"
}
-->
