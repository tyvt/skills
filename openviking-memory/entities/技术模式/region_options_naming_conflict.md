# 组件data与mixin同名regionOptions冲突
苏州市房地产监测V3 中 AgencyEntryNetworkDetail.vue 因组件 data 与 detailMixins 同名 regionOptions 触发 Vue2 同名限制警告，已重命名修复。

## 问题根因
- `AgencyEntryNetworkDetail.vue` 使用 `detailMixins`（`area.js`）已 computed `regionOptions`
- 组件 data 中同名 `regionOptions` 定义触发 Vue2 同名限制警告

## 修复方案
- 组件 data 中 `regionOptions` 重命名为 `administrativeRegionOptions`
- 同步修改 `AgencyEntryNetworkDetail.vue` 与 `AgencyEntryNetworkAdminDetail.vue` 的 data、`initDict`、模板 `:region-options`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/313.md
- 涉及文件：AgencyEntryNetworkDetail.vue、companyOrganContext.js、area.js、detailMixins.js、AgencyEntryNetworkAdminDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：5bc132a2-9d67-4e01-bb16-34e9f3a56c64；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_options_naming_conflict",
  "source_extraction_id": "8298b83dd6b24dbbbfaf79725dcec981",
  "version": 1,
  "memory_type": "entities"
}
-->