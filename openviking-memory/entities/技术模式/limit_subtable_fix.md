# Bug: 从查看切换到编辑时子表消失
在项目 苏州市房地产监测V3 中，当在房屋限制中从查看模式切换到编辑模式时，子表因数据未填充而消失。

## 原因
- 查看模式使用 `houseLimitLineData`；编辑模式使用 `selectedHouses`。
- 切换时，`selectedHouses` 变为空，且 API 不返回 `houseList`，导致消失。

## 解决方案
- `limitFormMixin.js` 添加 `hydrateSelectedHousesForEdit()` 以按优先级填充，并提取辅助方法以解耦。

## 验证与归属
- 验证证据: src=苏州市房地产监测V3/128.md
- 涉及文件: limitFormMixin.js, limitCancel.vue, limitAdd.vue, detailMixins.js, main.js, house-limit-helpers.js, house-limit-list-detail.spec.js, .workbuddy/memory/2026-09-23.md
- 会话: de78bf5d-ff1d-4c2d-b6b5-2faf54f81d39; Base: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "limit_subtable_fix",
  "source_extraction_id": "9a72ed1246ed49b9a2c86e9dac3adbdd",
  "version": 1,
  "memory_type": "entities"
}
-->