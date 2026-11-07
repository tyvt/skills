# 修复变更接口中的 companyRecordId 参数
在项目 zhi2-web-admin 中，修复了代理机构注册变更 API 中缺失 companyRecordId 的问题。

## 修复
- `companyRecord.js` 中的 `getLastChangeByLogin` 接收可选参数 `data`/`config` 以兼容
- `companyRecordAgency/detail.vue` 中的 `startChange()` 传递 `{ companyRecordId: this.companyRecordId }`
- 租赁端现在正确地重用该调用

## 文件
- src/api/company/companyRecord.js
- src/views/company/companyRecordAgency/detail.vue
- src/views/company/companyManagement/components/AgencyBasicInfoDetail.vue
- src/views/company/companyManagement/components/DeveloperBasicInfoDetail.vue
- src/views/zljg/companyRecordAgency/detail.vue
- e2e/company/company-record-flow.spec.js
- src/views/company/companyRecordAgency/index.vue

## 验证
- 会话: 7228345d-b39b-4e14-b319-e0de248ed26e

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：7228345d-b39b-4e14-b319-e0de248ed26e


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "record_id_param",
  "source_extraction_id": "a4c1b4b28e954766b9f8128b10303b6f",
  "version": 1,
  "memory_type": "entities"
}
-->
