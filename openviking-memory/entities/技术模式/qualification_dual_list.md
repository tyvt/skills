# 资质回显兼容双列表且动态解析许可编码
苏州市房地产监测V3 中资质回显兼容双列表结构并以路由动态解析 licenseBusCode 去除硬编码。

## 变更要点
- registerQualification.js 新增 extractQualificationListFromPayload 与 resolvePrimaryQualificationFromPayload 兼容 qualificationList 与 qualificationRecordList
- DeveloperBasicInfoDetail.vue 的 detailCallback 优先解析 getOwnCompany 的 data/companyRecord
- licenseBusCode 调用 resolveLicenseAppendixBusCode(this.$route) 去除硬编码 '040100'

## 验证与归属
- 验证证据：src=苏州市房地产监测V3-rest/108.md
- 涉及文件：company/companyManagement/components/DeveloperBasicInfoDetail.vue、register/components/QualificationFormSection.vue、company/companyManagement/components/developerBasicInfoContent.js、company/companyManagement/components/AgencyBasicInfoDetail.vue、components/AppendixPackageSection/index.vue、utils/registerQualification.js、toB/companyRecord/detail.vue、company/companyManagement/components/companyBasicInfoShared.js
- 所属项目：苏州市房地产监测V3；来源会话：2cb9ae76-38aa-472e-8890-53457650d811；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_dual_list",
  "source_extraction_id": "5ef47723b89e4bcab4d342f6dc3a4700",
  "version": 1,
  "memory_type": "entities"
}
-->