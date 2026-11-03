# 身份证校验按GB11643算校验码非前端bug
AgencyPersonnelDetail.vue 中身份证校验使用 isValidIdNumber 按国标 GB 11643 计算第18位校验码，校验位不符提示为预期行为。

## 问题根因
- AgencyPersonnelDetail.vue 调用 @/utils/idCard.js 的 isValidIdNumber 进行身份证格式校验
- 校验逻辑严格按国标 GB 11643 计算第18位校验码

## 预期行为
- 填写号码校验位不符时提示为预期行为，非前端缺陷
- 不应作为 bug 修复，属正常国标校验

## 验证与归属
- 验证证据：src=cursor session=911f3164-2978-4d09-81ed-b2633e226cbf
- 涉及文件：company/staffManagement/components/detail.vue、toB/personnelRecord/components/detail.vue、institution/agencyPersonnel/components/AgencyPersonnelDetail.vue、utils/idCard.js
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_id_gb11643",
  "source_extraction_id": "b35c8cec348f4300ac901e68405922f1",
  "version": 1,
  "memory_type": "entities"
}
-->