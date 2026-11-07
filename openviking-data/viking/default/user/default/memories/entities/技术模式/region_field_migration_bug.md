# 机构注册/入网行政区域字段变更前端需兼容旧数据
苏州市房地产监测V3 因接口行政区域字段变更，前端需迁移绑定并兼容旧数据。

## 问题根因
- `/company/companyRecord/detail` 接口将行政区域字段由 `provinceCityArea` 变更为 `administrativeArea`
- 字典为 `ECONOMIC_INSTITUTIONS_REGION`

## 关键修复
- Step1BasicInfo.vue、CompanyBasicInfoForm.vue 与 companyBasicInfoContent.js 同步迁移绑定并提交新字段
- 通过 normalizeCompanyBasicForm() 及 administrativeAreaValue 兼容旧数据
- mergeRecordForm 及详情通过 `administrativeArea || provinceCityArea` 兼容旧数据，加载 ECONOMIC_INSTITUTIONS_REGION 字典展示

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/104.md；src=苏州市房地产监测V3/113.md
- 涉及文件：institution/record/detail.vue、institution/record/index.vue、AgencyApplyDialog.vue、CompanyBasicInfoForm.vue、companyApply/detail.vue、companyRecordAgency/index.vue、companyApplyAudit/detail.vue、companyCancel/detail.vue、companyBasicInfoContent.js、detailMixins.js、companyRecord.js、路由信息.json、institution-helpers.js、institution-register-flow.spec.js
- 来源会话ID：c41f1e6e-6285-4e62-b90d-cf6473627bf9；b87a6819-b6e9-446b-8864-ad0ee4ca0fc1；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_field_migration_bug",
  "source_extraction_id": "1fb73d685c824df4a1f924aabfc03c6d",
  "version": 2,
  "memory_type": "entities"
}
-->