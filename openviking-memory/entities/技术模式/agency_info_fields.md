# 经纪机构基本信息字段调整
苏州市房地产监测V3 中经纪机构基本信息（查看态+编辑态）按设计图完成字段删减、重排与改名。

## 改动内容
- 删除基本信息前 2 个字段：`AgencyBasicInfoDetail.vue` 查看态移除「机构备案状态」「是否达成备案条件」，页面顶部状态条备案状态保留不受影响
- 剩余字段按标注顺序调整（查看态与编辑态一致）：统一社会信用代码 → 企业名称 → 机构简称 → 机构类型 → 行政区域 → 行业协会组织 → 成立日期 → 注册资本 → 注册地址 → 法定代表人信息 → 公司联系电话 → 加盟品牌 → 经营地址 → 经营范围
- 字段改名：机构名称 → 企业名称、机构别名 → 机构简称（含输入框 placeholder）
- 机构管理员信息字段去掉「管理员」前缀：管理员类别→类别、管理员姓名→姓名、管理员联系电话→联系电话、管理员证件类型→证件类型、管理员证件号码→证件号码（租赁机构分支同步处理）
- `InstitutionRegisterSingleForm.vue` 的 diff 为工作区原有改动，未触碰

## 验证与归属
- 验证证据：extracted source=workbuddy project=苏州市房地产监测V3
- 涉及文件：zhi2-web-admin/src/views/company/companyManagement/components/AgencyBasicInfoDetail.vue、agencyBasicInfoContent.js
- 所属项目：苏州市房地产监测V3；来源会话ID：a86872e6-6e7a-49c4-b361-c04bed9de6a4；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_info_fields",
  "source_extraction_id": "3891d95391874d31a54dc15319f2aa38",
  "version": 1,
  "memory_type": "entities"
}
-->