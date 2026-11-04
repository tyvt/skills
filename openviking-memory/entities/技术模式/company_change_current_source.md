# 变更页面上当前值的主要来源是变更详情
在苏州市房地产监测V3项目中，变更页面“当前值”中的企业基本信息主数据来自变更详情接口。

## 关键事实
- 企业基本信息的“当前值”来自 `POST /company/companyRecordChange/detail` 中的 `data.companyRecordChange`
- `toB/companyRecord/detail.vue` 通过 `getDetail()` 将变更详情记录到表单中
- `companyRecord/detail` 仅用于变更前比较或资质回退

## 验证与归属
- 验证证据: src=cursor session=3f9ce4c0-b3bb-452e-a7ac-6701f6c35e2e
- 涉及文件: toB/companyRecord/detail.vue, api/company/companyRecord.js, company/companyManagement/components/DeveloperBasicInfoDetail.vue, DeveloperBasicInfoForm.vue, utils/registerQualification.js
- 所属项目: 苏州市房地产监测V3; 会话: 3f9ce4c0-b3bb-452e-a7ac-6701f6c35e2e

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_current_source",
  "source_extraction_id": "ba65b1d725fd4ce6a4a63d7ccdd79309",
  "version": 1,
  "memory_type": "entities"
}
-->