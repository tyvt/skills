# 建筑弹窗因列错误不显示类型/位置
接口返回的字段是 `position` 但 `buildingTable.vue` 使用了 `address`；在 `SelectDialog` 的渲染中，`zs-table-column.vue` 使用了 `scope.column.type`，与 `$attrs.type` 不一致，导致字典列失效。

## 问题根因
- 接口返回的字段是 `position` 但 `buildingTable.vue` 使用了 `address`
- 在 `SelectDialog` 的渲染中，`zs-table-column.vue` 使用了 `scope.column.type`，与 `$attrs.type` 不一致，导致字典列失效

## 解决方案
- 修改 `buildingTable.vue` 中的 `prop` 和 `dictUrl`
- `zs-table-column.vue` 改为使用 `$attrs.type` 来判断列类型

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：dbc7cb9d-a0a8-4e87-8a32-7d0db2961532
- 记忆类型: bug
- 验证证据: src=产品2.0/035.md
- 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/publicQuery/complex/components/buildingTable.vue, src/views/publicQuery/complex/detail.vue, src/components/zs-select-dialog/zs-select-dialog-func.vue, src/views/property/complex/components/rangeTable.vue, src/views/property/complex/components/houseTable.vue, src/components/zs-table-column/zs-table-column.vue, src/views/building/complexSearch/components/houseTable.vue, src/mixins/table.js
- 所属项目: 产品2.0; 会话: dbc7cb9d-a0a8-4e87-8a32-7d0db2961532; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "building_col_error",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->