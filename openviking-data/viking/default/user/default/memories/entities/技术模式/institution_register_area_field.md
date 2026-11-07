# 机构注册页地区字段替换为administrativeArea并兼容旧数据
苏州市房地产监测V3 中机构注册页地区字段由 `provinceCityArea` 改为 `administrativeArea`，并兼容旧数据。

## 变更要点
- `institutionRegister/index.vue` 的 `queryParams`、`resetQuery`、搜索表单项及表格列 `prop` 均由 `provinceCityArea` 替换为 `administrativeArea`
- `formatRegion` 优先读新字段以兼容旧数据

## 接口与逻辑
- `institutionRegister.js` 为 `pageInstitutionRegisters` 补充字段注释
- `getList()` 透传 `administrativeArea` 筛选

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/158.md
- 涉及文件：institution/record/index.vue、company/institutionRegister/detail.vue、company/companyCancel/index.vue、listMixins.js、table.js、institutionRegister.js、company/companyApplyAudit/detail.vue、company/institutionRegister/index.vue
- 所属项目：苏州市房地产监测V3；来源会话：90b0db5f-1875-41f4-8bc9-1e1a01c65775；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "institution_register_area_field",
  "source_extraction_id": "fcc5ba53c4b941589a4680bf29e3e0cd",
  "version": 1,
  "memory_type": "entities"
}
-->