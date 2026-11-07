# 房屋弹窗表格scope.row插槽约定
苏州市房地产监测V3 的 HouseSelectDialog.vue 楼幢号等列改用 `#default="{ scope }"` 与 `scope.row` 以遵循 `zs-table-column` 插槽约定，避免渲染报错。

## 实现要点
- `HouseSelectDialog.vue` 楼幢号等列改用 `#default="{ scope }"` 与 `scope.row` 遵循 `zs-table-column` 插槽约定
- `normalizeBuilding` 与 `normalizeHouse` 统一 `buildCode`/`buildNo` 查询链及展示名，确保选房字段对齐

## 涉及文件
- zhi2-web-admin/src/views/building/houseLimit/components/HouseSelectDialog.vue
- zhi2-web-admin/src/views/building/houseLimit/houseLimitConstants.js
- zhi2-web-admin/e2e/building/house-limit-real-api-flow.spec.js
- zhi2-web-admin/src/views/building/houseLimit/limitFormMixin.js
- zhi2-web-admin/package.json
- zhi2-web-admin/e2e/fixtures/house-limit-helpers.js
- zhi2-web-admin/src/main.js
- .workbuddy/memory/2026-09-23.md

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/118.md
- 来源会话：09f6b31e-b744-41e8-aa52-b2310e44a3a9；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "house_dialog_scope_row",
  "source_extraction_id": "1b549fb6f5f74e96a56ee33f14963762",
  "version": 2,
  "memory_type": "entities"
}
-->