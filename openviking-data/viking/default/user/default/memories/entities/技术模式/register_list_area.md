# 机构注册列表页区域字段改名
苏州市房地产监测V3中institutionRegister/page的搜索及表格字段provinceCityArea须统一改为administrativeArea，并兼容旧数据。

## 问题根因
- institutionRegister/index.vue搜索与表格仍用provinceCityArea，未统一新字段
- institutionRegister.js的pageInstitutionRegisters未透传新参
- formatRegion未兼容旧数据回退provinceCityArea

## 解决方案
- index.vue的queryParams、resetQuery、表单项model及列prop同步改名administrativeArea
- institutionRegister.js的pageInstitutionRegisters透传新参
- formatRegion兼容旧数据回退provinceCityArea

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/115.md
- 涉及文件：institution/record/index.vue、company/institutionRegister/detail.vue、company/institutionRegister/index.vue、mixins/listMixins.js、mixins/table.js、api/institution/institutionRegister.js、company/companyCancel/index.vue、company/companyApplyAudit/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：90b0db5f-1875-41f4-8bc9-1e1a01c65775；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_list_area",
  "source_extraction_id": "a96f2a8bf0c74ea3bdbaaf4355ce91e5",
  "version": 1,
  "memory_type": "entities"
}
-->