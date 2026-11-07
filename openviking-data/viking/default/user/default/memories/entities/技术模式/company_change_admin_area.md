# 企业变更接口须传行政区划字段
苏州市房地产监测V3 中企业变更接口要求传 administrativeArea 且禁传 provinceCityArea，原 getForm 删除后者未补前者致行政区划为空。

## 问题根因
- `/company/companyRecordChange/add` 要求传 `administrativeArea` 且禁止传 `provinceCityArea`
- 原 `getForm()` 删除 `provinceCityArea` 但未补 `administrativeArea`，致行政区划为空

## 解决方案
- 在 `companyBasicInfoShared.js` 新增 `buildCompanyRecordChangeSavePayload`
- 以 `administrativeArea || provinceCityArea` 提交，兼容新旧字段
- 接入 `toB/companyRecord/detail.vue` 与 `companyRecordAgency/change/detail.vue`

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/016.md；src=苏州市房地产监测V3/216.md
- 涉及文件：companyRecordAgency/change/detail.vue、toB/companyRecord/detail.vue、companyManagement/components/AgencyBasicInfoForm.vue、companyBasicInfoShared.js、companyManagement/components/detail.vue、companyManagement/changeApply/detail.vue、api/company/companyRecord.js、zljg/agencyRecordChangeApply/detail.vue
- 所属项目：苏州市房地产监测V3；来源会话：edb3ac8c-9101-4ea8-871a-f3e115e70ff8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_admin_area",
  "source_extraction_id": "5b55fde1cd1b4f419a674259657b5c37",
  "version": 2,
  "memory_type": "entities"
}
-->