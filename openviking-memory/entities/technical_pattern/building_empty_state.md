# Building Empty State Plain Text
buildingTable.vue empty data prompt was changed to plain text, removing the OverviewEmptyTip component and jump logic.

## Change
- Empty state text: "暂无数据，请先到物业管理区域详情页维护授权的楼幢范围"
- Removed OverviewEmptyTip component and goEmptyFiling navigation logic
- Kept top-right property management area detail button; maintenance entry separated from empty state prompt

## Files
- publicQuery/complex/detail.vue
- publicQuery/complex/components/buildingTable.vue
- publicQuery/complex/components/OverviewEmptyTip.vue
- publicQuery/complex/components/overviewEmpty.scss

## Attribution
- Source session: b5037f07-6db9-4962-b4ff-c907c3a62fea
- Code baseline: none

## 验证与归属
- 所属项目：产品2.0
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：b5037f07-6db9-4962-b4ff-c907c3a62fea


<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "building_empty_state",
  "source_extraction_id": "d091c1719d0b45a59013948f120e8a2d",
  "version": 1,
  "memory_type": "entities"
}
-->
