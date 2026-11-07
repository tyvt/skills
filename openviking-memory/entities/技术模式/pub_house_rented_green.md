# 经营用房已出租行绿色背景
园区物管2.0 经营用房详情页按 `rentStatus` 映射行背景色，已出租显示绿色。

## 问题根因
- `pubHouseTable.vue` 行背景色直接用后端返回 `color` 字段，与页面说明（绿色=正常出租，红色=空置）不一致
- 「已出租」行错误显示为红色

## 修复方案
- `getRowStyle` 中按 `rentStatus` 映射：`rentStatus === '1'`（已出租）→ 绿色 `#d1efcb`；其他（空置/闲置）→ 红色 `#f7cbcb`
- 颜色值与统计地图模块 `operatingAssets.vue` 保持一致
- 物业管理用房（`houseCategory == '1'`）无租赁状态列，仍沿用后端 `color` 字段

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 验证：cursor 会话 3f441280 提取，已修复
- 涉及文件：pubHouseTable.vue、operatingAssets.vue、pubHouse/components/assetPositionSubTable.vue、publicQuery/complex/components/pubHouseTable.vue
- 所属项目：园区物管2.0；来源会话：3f441280-c7e8-4f56-84ea-ee7480edfb5d；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "pub_house_rented_green",
  "source_extraction_id": "ac80b5d8fa304846a9b0db0e9fb8bf49",
  "version": 1,
  "memory_type": "entities"
}
-->