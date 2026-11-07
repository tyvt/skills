# 经营用房已出租行须按rentStatus映射绿色
园区物管2.0 中 pubHouseTable 按 rentStatus 映射行颜色，已出租显绿。

## 问题描述
- `pubHouseTable.vue` 原直接引用后端 `color` 字段致已出租显示红色

## 解决方案
- `getRowStyle` 按 `rentStatus` 映射：`'1'` 绿 `#d1efcb`，其他红 `#f7cbcb`，与 `operatingAssets.vue` 一致
- 物业用房无租赁列仍用 `color` 字段

## 涉及文件
- benefit/pubHouse/components/pubHouseTable.vue
- benefit/pubHouse/components/assetPositionSubTable.vue
- publicQuery/complex/components/pubHouseTable.vue
- benefit/statisticsMap/operatingAssets.vue 等

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 所属项目：园区物管2.0；代码基线：none
- 来源会话：3f441280-c7e8-4f56-84ea-ee7480edfb5d

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "rent_status_color",
  "source_extraction_id": "fbfd30739822481d9cd63130bdfc329b",
  "version": 1,
  "memory_type": "entities"
}
-->