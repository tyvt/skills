# 基本信息附件按机构类型取 busCode 定 busId
`companyRecord.js` 新增 `resolveAgencyBasicInfoAppendixBusCode()` 按机构类型返回 `jjjgxx` 或 `zljgxx` 作为附件 busCode。

## 实现细节
- `AgencyBasicInfoDetail.vue` 的 `licenseBusCode` 调用该函数获取 busCode
- `licenseAppendixBusId` 固定为 `String(companyRecordId)`，不在变更审核中切换 busId

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/158.md
- 涉及文件：api/company/companyRecord.js、company/companyManagement/components/AgencyBasicInfoDetail.vue、e2e/company/register-basic-info-appendix.spec.js、e2e/fixtures/appendix-package-helpers.js、toB/agencyRecord/detail.vue、company/companyRecordAgency/detail.vue、zljg/companyRecord/detail.vue、company/companyManagement/components/DeveloperBasicInfoDetail.vue
- 所属项目：苏州市房地产监测V3；来源会话：ecd8f5a4-0f8d-4a9a-961f-96307805176b；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_appendix_buscode",
  "source_extraction_id": "f6c19f19494240c78561d94bce477288",
  "version": 1,
  "memory_type": "entities"
}
-->