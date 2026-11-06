# 机构注销详情租赁机构模板对齐修复
苏州市房地产监测V3 中机构注销详情在非开发企业时复用了 AgencyBasicInfoForm 只读模式，但租赁机构仍走经纪机构「基本信息」模板，与 AgencyBasicInfoDetail 三段式布局不一致，已对齐修复。

## 问题根因
- 机构注销详情在非开发企业时复用 AgencyBasicInfoForm 只读模式
- 租赁机构仍走经纪机构「基本信息」模板（机构简称、行业协会、成立日期等），与 AgencyBasicInfoDetail 三段式布局不一致

## 修改内容
- AgencyBasicInfoForm.vue（isLeaseOrgan && isView）：与开业详情对齐为营业执照信息、法定代表人信息、管理员信息三段
- 字段由 buildLeaseOpeningLicenseContentInfo / buildLeaseLegalPersonContentInfo / buildLeaseAdminPersonContentInfo 生成（如「注册日期」「经营场所」）
- 底部「机构管理员信息」在租赁只读时隐藏避免重复
- 新增 businessScenarioOptions 用于「业务范围」字典展示
- companyCancel/detail.vue 加载 company_business_scenario 字典传入；租赁注销 show-admin-section=true，经纪注销仍为 false

## 归属信息
- 所属项目：苏州市房地产监测V3；来源会话：44476e9b-4f1c-4e47-83f0-e9b5128ca3cd
- 涉及文件：AgencyBasicInfoForm.vue、companyCancel/detail.vue

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "agency_cancel_lease_detail_fix",
  "source_extraction_id": "062bfd8103c04866b9a3c11ac95d1557",
  "version": 1,
  "memory_type": "entities"
}
-->