# 企业入网认证页经纪机构新增业务范围复选块
`AgencyEntryNetworkSections.vue` 为经纪机构在基本信息与机构管理员信息间增加「业务范围」区块，选项取自字典。

## 功能描述
- 针对经纪机构(`!isLeaseOrgan`)在「基本信息」与「机构管理员信息」间增加「业务范围」`Headline`区块
- 使用 `el-checkbox-group`，选项取自字典 `company_business_scenario`

## 查看态处理
- 查看态通过 `buildAgencyBasicContentInfo` 的 `omitBusinessScenario: true` 隐藏原文案
- 字段仍存于 `businessScenario`（逗号分隔）

## 验证与归属
- 验证证据：extracted source=cursor session=ef795d90-6f54-4f25-af97-f78da87e2817
- 涉及文件：AgencyEntryNetworkSections.vue、agencyBasicInfoContent.js、AgencyBasicInfoForm.vue、detail-template.vue、complex/detail.vue、AgencyEntryNetworkDetail.vue、DeveloperEntryNetworkSections.vue
- 所属项目：苏州市房地产监测V3；来源会话：ef795d90-6f54-4f25-af97-f78da87e2817；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_business_scope",
  "source_extraction_id": "154e1f80c9644439946847ff8e8bf216",
  "version": 1,
  "memory_type": "entities"
}
-->