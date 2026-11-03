# 机构详情删前两字段重排改名去管理员前缀
苏州市房地产监测V3中机构基本信息查看态与编辑态同步调整字段顺序、改名并去管理员前缀。

## 变更内容
- 删除前2字段：机构备案状态、是否达成备案条件
- 剩余字段按标注顺序重排
- 机构名称改企业名称、机构别名改机构简称
- 管理员信息字段去"管理员"前缀

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/161.md
- 涉及文件：companyManagement/components/AgencyBasicInfoDetail.vue、AgencyBasicInfoForm.vue、agencyBasicInfoContent.js、zljg/companyRecord/detail.vue、toB/agencyRecord/detail.vue、e2e/fixtures/register-helpers.js、e2e/register/register-layout.spec.js、AgencyEntryNetworkSections.vue
- 所属项目：苏州市房地产监测V3；来源会话：a86872e6-6e7a-49c4-b361-c04bed9de6a4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_detail_field_reorder",
  "source_extraction_id": "a80b2fd6890746ea80eb4641c8c2c4f9",
  "version": 1,
  "memory_type": "entities"
}
-->