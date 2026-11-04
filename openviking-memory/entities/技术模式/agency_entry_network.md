# 代理认证中别名和关联的必填字段
房地产代理网络接入认证必须提交非必填字段 `companyAlias` 和 `industryAssociation`。

## 上下文
- `AgencyEntryNetworkDetail.vue` 中的 `buildEntryNetworkSavePayload()` 针对非租户代理发送不带空格的 `companyAlias` 和有值的 `industryAssociation`
- `AgencyEntryNetworkSections.vue` 支持编辑（maxlength=150，字典 `INDUSTRY_ASSOCIATION`）和通过 `agencyBasicInfoContent.js` 的 `DetailTemplate` 查看

## 文件与备注
- `companyRecord.js` 的 `saveAgencyEntryNetwork` 收到了补充注释
- 验证证据: src=苏州市房地产监测V3/259.md
- 涉及文件: companyRecord.js, AgencyEntryNetworkDetail.vue, AgencyEntryNetworkSections.vue, agencyBasicInfoContent.js, companyBasicInfoShared.js, companyRecordAgency/change/detail.vue, AgencyBasicInfoForm.vue
- 所属项目: 苏州市房地产监测V3; 会话: 55b4a7f2-9aca-4e4f-906e-0245c0774837

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_entry_network",
  "source_extraction_id": "106e4b7ccbcd45ba9141a4e92b902135",
  "version": 1,
  "memory_type": "entities"
}
-->