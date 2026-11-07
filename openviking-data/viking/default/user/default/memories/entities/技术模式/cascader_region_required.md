# 级联组件region非必填避免Vue告警
苏州市房地产监测V3 中 `location-cascader.vue` 的 `region` 设 `required: true` 致未传 prop 时 Vue 告警，已移除并新增 `defaultValue` 兼容。

## 根因与修复
- `location-cascader.vue` 中 `region` 设 `required: true` 致未传 prop 时 Vue 告警
- 移除 `required` 并新增 `defaultValue` 兼容逗号字符串或数组
- 同步逻辑优先 `region` 否则解析 `defaultValue`
- `eorg/detail.vue` 的 `setErogName` 写入 `form.provinceCityArea` 实现区划回显

## 涉及文件
- `src/components/location-cascader/location-cascader.vue`
- `src/views/stock/eorg/detail.vue`
- `src/main.js`
- `src/views/company/companyRegister/detail.vue`
- `src/views/institution/company/index.vue`
- `src/views/supervision/deposit/contractmain/components/BuyerDialog.vue`
- `src/views/company/companyManagement/components/DeveloperBasicInfoForm.vue`
- `src/api/eorg/eorg.js`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/172.md
- 来源会话ID：e660a1c1-9825-434a-be21-3120be9ea83f
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cascader_region_required",
  "source_extraction_id": "295ffa7531404838aa299598fc454f39",
  "version": 1,
  "memory_type": "entities"
}
-->