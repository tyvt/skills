# 企业基本信息资质/要件回显修复
苏州市房地产监测V3 完成企业基本信息资质/要件回显修复，涉及工具函数与详情组件改造。

## 改动点
- registerQualification.js：新增 extractQualificationListFromPayload（同时识别 qualificationList 与 qualificationRecordList）；新增 resolvePrimaryQualificationFromPayload（取首条有效资质供只读详情使用）
- DeveloperBasicInfoDetail.vue：detailCallback 优先从 getOwnCompany 的 data / companyRecord 解析资质；无有效行时再走 pageNoPermissions；licenseBusCode 改为 resolveLicenseAppendixBusCode(this.$route)，去掉错误的 '040100'
- toB/companyRecord/detail.vue 同步调整

## 验证与归属
- 涉及文件：utils/registerQualification.js、company/companyManagement/components/DeveloperBasicInfoDetail.vue、toB/companyRecord/detail.vue、register/components/QualificationFormSection.vue
- 所属项目：苏州市房地产监测V3；来源会话ID：2cb9ae76-38aa-472e-8890-53457650d811；代码基线：none
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "qualification_echo_fix",
  "source_extraction_id": "ef4db781436145ec93f7842d9de5a47f",
  "version": 1,
  "memory_type": "entities"
}
-->