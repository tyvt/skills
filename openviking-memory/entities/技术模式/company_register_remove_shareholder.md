# 企业入网确认详情页移除股东信息区块
在 `zhi2-web-admin/src/views/company/companyRegister/detail.vue` 删除「股东信息」Headline、表格、`ShareholderDialog` 及关联 data/computed/methods 与字典加载。

## 关键修复
- 删除股东信息区块（Headline、表格、ShareholderDialog 及关联逻辑、字典加载）
- 同步更新 `company-register-admin-helpers.js` 与 `company-register.spec.js` 断言仅保留法人信息
- 详情页结构变为：基本信息→办公信息→法人信息→要件上传

## 涉及文件
- `src/views/company/companyRegister/detail.vue`
- `src/views/register/components/Step4Shareholders.vue`
- `e2e/register/company-register.spec.js`
- `src/views/company/companyManagement/components/DeveloperBasicInfoForm.vue`、`developerBasicInfoContent.js`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/031.md
- 来源会话ID：afc7fb85-765b-420b-b678-2404699727de

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_remove_shareholder",
  "source_extraction_id": "cc2294dc61514faebe82642a30e5fb6e",
  "version": 1,
  "memory_type": "entities"
}
-->