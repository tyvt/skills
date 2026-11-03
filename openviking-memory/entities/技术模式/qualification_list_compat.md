# 企业资质要件回显兼容双列表去硬编码
苏州市房地产监测V3 中 registerQualification.js 新增兼容方法，企业资质回显兼容 qualificationList 与 qualificationRecordList 双列表并去除硬编码。

## 变更内容
- `src/utils/registerQualification.js` 新增 `extractQualificationListFromPayload` 兼容 `qualificationList` 与 `qualificationRecordList`
- 新增 `resolvePrimaryQualificationFromPayload` 取首条有效资质
- `DeveloperBasicInfoDetail.vue` 的 `detailCallback` 优先从 `getOwnCompany` 的 `data`/`companyRecord` 解析资质
- `licenseBusCode` 改用 `resolveLicenseAppendixBusCode(this.$route)` 替换错误 `'040100'`

## 涉及文件
- company/companyManagement/components/DeveloperBasicInfoDetail.vue
- register/components/QualificationFormSection.vue
- company/companyManagement/components/developerBasicInfoContent.js
- company/companyManagement/components/AgencyBasicInfoDetail.vue
- components/AppendixPackageSection/index.vue
- utils/registerQualification.js
- toB/companyRecord/detail.vue
- company/companyManagement/components/companyBasicInfoShared.js

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/151.md
- 所属项目：苏州市房地产监测V3；来源会话：2cb9ae76-38aa-472e-8890-53457650d811；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_list_compat",
  "source_extraction_id": "dc35d04afcc14f6f9e69bc950ef0eadb",
  "version": 1,
  "memory_type": "entities"
}
-->