# 被配置覆盖的机构变更提交 API
在 Suzhou Real Estate Monitoring V3 项目中，`resolveSubmitApi` 读取菜单 meta 或流程配置，导致机构变更请求命中旧接口。

## 问题根因
- `resolveSubmitApi` 优先使用菜单 meta 或流程配置中的 `submitApi`
- 这使得机构变更请求命中了废弃的接口

## 解决方案
- `src/views/toB/agencyRecord/detail.vue` 固定调用 `COMPANY_RECORD_CHANGE_SPECIAL_SUBMIT_API`
- 在该文件中移除了 `resolveSubmitApi` 的导入

## 验证与归属
- 验证证据: src=苏州市房地产监测V3-rest/153.md
- 所属项目: 苏州市房地产监测V3
- 涉及文件: companyRecordChange.js, companyRecord.js, toB/companyRecord/detail.vue, toB/agencyRecord/detail.vue, companyRecordChangeRoute.js, AgencyBasicInfoDetail.vue, zljg/companyRecord/detail.vue, flowApi.js
- 会话: 01a162e4-b96d-70c5-a400-760f72c3e01d; Base: none

<!-- MEMORY_FIELDS
{
  "category": "padrao_tecnico",
  "name": "agency_change_submit_api",
  "source_extraction_id": "21ad71f1e972470cb366751ddbf5140c",
  "version": 1,
  "memory_type": "entities"
}
-->