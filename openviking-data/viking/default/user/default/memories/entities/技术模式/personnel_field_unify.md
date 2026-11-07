# 经纪人员字段查看编辑显隐不统一修复
showPersonnelRoleField 在查看与编辑模式判断差异，致经纪与专业人员字段数不一致（17/18项），已抽象统一显隐逻辑对齐。

## 问题根因
- showPersonnelRoleField 在查看（basicInfoView）与编辑（AgencyPersonnelBasicInfoFormFields）模式判断逻辑不同
- 导致经纪与专业人员字段数不一致，分别为 17 项与 18 项

## 解决方案
- 抽象 agencyPersonnelBasicInfoFields.js 的 resolveAgencyPersonnelBasicInfoFields 统一 basicInfoView 与 AgencyPersonnelBasicInfoFormFields 显隐
- G 端 view 下将 showPersonnelRoleField 置 true，对齐编辑模式字段数

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/077.md
- 涉及文件：AgencyPersonnelDetail.vue、agencyBasicInfoContent.js、agencyPersonnelBasicInfoFields.js、detailLayout.js、AgencyPersonnelBasicInfoFormFields.vue
- 所属项目：苏州市房地产监测V3；来源会话：78eb4f58-a263-44aa-9a8e-3ccff66ca115；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "personnel_field_unify",
  "source_extraction_id": "11ed185d9cf7459c968ca8c5f71e999c",
  "version": 1,
  "memory_type": "entities"
}
-->