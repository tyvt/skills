# 产品2.0接口模块名重构：maintenance改为dataProperty
产品2.0前端全局排查并修改接口 moduleName，将 `maintenance` 相关改为 `dataProperty`。

## 修改要点
- 按 `moduleName/businessName` 写法全局排查，将原 `moduleName: 'maintenance'` + 目标 `businessName`（`facility`/`facilityDefinition`/`facilityFieldDefinition`/`facilityFundAllotRange`/`standardItem`/`standardItemType`）改为 `moduleName: 'dataProperty'`。
- 示例：`facilityTable.vue` 中 `moduleName: 'dataProperty', businessName: 'facility'`。

## 涉及文件
- zhi2-web-admin/src/views/publicQuery/complex/components/facilityTable.vue
- zhi2-web-admin/src/views/maintenance/facility/index.vue
- zhi2-web-admin/src/views/maintenance/facilityDefinition/facilityDefinitionDialog.vue
- zhi2-web-admin/src/views/maintenance/facilityDefinition/FieldTableDialog.vue

## 验证与归属
- 验证证据：extracted source=cursor project=2-0
- 所属项目：2-0；来源会话ID：f27111ea-1764-4c3e-9978-077951c4dd1b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "moduleName_dataProperty_refactor",
  "source_extraction_id": "bd566589708446009d22ce7852b518b2",
  "version": 1,
  "memory_type": "entities"
}
-->