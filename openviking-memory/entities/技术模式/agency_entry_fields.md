# 经纪机构入网认证新增可选字段对接
苏州市房地产监测V3 中 `/company/companyRecord/entryNetwork/save` 在经纪机构入网认证侧对接了两个非必填字段。

## 改动内容
- 保存入参（`AgencyEntryNetworkDetail.vue` 的 `buildEntryNetworkSavePayload`）：非租赁机构（经纪）时一并提交 `companyAlias`（去空格，空则不传）与 `industryAssociation`（有值则传，空则不传）
- 编辑表单（`AgencyEntryNetworkSections.vue`）：经纪机构编辑态可填写机构别名（maxlength=150，非必填）与行业协会组织（zs-select + INDUSTRY_ASSOCIATION 字典，可清空）
- 查看态通过 `agencyBasicInfoContent.js` 的 `DetailTemplate` 展示这两项
- API 注释（`companyRecord.js` 的 `saveAgencyEntryNetwork`）补充可选字段说明

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：AgencyEntryNetworkDetail.vue、AgencyEntryNetworkSections.vue、agencyBasicInfoContent.js、companyRecord.js
- 所属项目：苏州市房地产监测V3；来源会话：55b4a7f2-9aca-4e4f-906e-0245c0774837；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_entry_fields",
  "source_extraction_id": "b6235e8c83234c6da6eb786bbea65930",
  "version": 1,
  "memory_type": "entities"
}
-->