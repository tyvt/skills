# changeBuilding误用value致列表异常
泰兴小程序 `src/pages_facility` 中 `unitList` 相关逻辑在 `changeBuilding` 内误用 `currentBuilding.value` 导致数据状态异常，需修正响应式变量引用。

## 问题根因
- `src/pages_facility` 中 `unitList` 相关逻辑在 `changeBuilding` 内误用 `currentBuilding.value`。
- 误用响应式变量引用导致数据状态异常。

## 解决方案
- 修正 `changeBuilding` 内的响应式变量引用，避免误用 `.value`。

## 验证与归属
- 验证证据：src=泰兴小程序/022.md
- 涉及文件：d:/repository/泰兴小程序/src/pages_facility/facility.vue、d:/repository/泰兴小程序/src/hooks/useAreaDict.js、d:/repository/泰兴小程序/src/pages_owner/repair/chooseFacility.vue、d:/repository/泰兴小程序/src/pages_owner/house/verify.vue、d:/repository/泰兴小程序/src/api/property.js、d:/repository/泰兴小程序/src/pages/index/property.vue
- 来源会话ID：6a37a278-9845-42f7-b74d-370fb350d16a
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "changebuilding_value_misuse",
  "source_extraction_id": "5fe64a913e8e4332b1aa5926a136ded7",
  "version": 1,
  "memory_type": "entities"
}
-->