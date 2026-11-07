# 机构录入保存包含别名和协会字段
在 苏州市房地产监测V3 项目中，在 `AgencyEntryNetworkDetail.vue` 中非租赁机构录入的保存提交了可选字段 `companyAlias` 和 `industryAssociation`。

## 实现要点
- 通过 `buildEntryNetworkSavePayload()` 在 `AgencyEntryNetworkDetail.vue` 中保存非租赁机构录入时提交可选的 `companyAlias` 和 `industryAssociation`
- `AgencyEntryNetworkSections.vue` 在编辑模式下集成这两个字段（字典 `INDUSTRY_ASSOCIATION`）
- 查看模式复用 `agencyBasicInfoContent.js` 中的 `DetailTemplate`
- `companyRecord.js` 接收接口注释

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 来源会话：55b4a7f2-9aca-4e4f-906e-0245c0774837
- 验证证据: src=苏州市房地产监测V3-leftover/059.md
- 涉及文件: companyRecord.js, AgencyEntryNetworkDetail.vue, AgencyEntryNetworkSections.vue, agencyBasicInfoContent.js, companyBasicInfoShared.js, companyRecordAgency/change/detail.vue, AgencyBasicInfoForm.vue
- 所属项目: 苏州市房地产监测V3; 会话: 55b4a7f2-9aca-4e4f-906e-0245c0774837; Baseline: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_network_fields",
  "source_extraction_id": "f2d584df3e2d406aa5752d9d6b7f9f3f",
  "version": 2,
  "memory_type": "entities"
}
-->