# 公司成立资产验证
苏住房G项目中公司页面必填字段验证的技术规范。

## 描述
- `companyManagement/components/detail.vue` 原本没有针对 `foundingDate` 和 `registeredAssets` 的必填规则。
- 在 `rules` 中添加规则后，在编辑模式下开始显示红色星号并进行验证。
- 登记、审计和机构变更历史模块已经具备验证。

## 验证与归属
- 验证证据: src=苏住房G/037.md
- 涉及文件: company/companyRegister/dialog.vue, table.vue, companyRegister/components/companyInfo.vue, companyRegister/detail.vue, toB/companyRecord/detail.vue, companyManagement/components/detail.vue, publicQuery/propertyCompany/detail.vue, register/components/accountInfo.vue
- 所属项目: 苏住房G; 会话: b9d18492-03d8-4a9e-b3b7-9057c3686e1c; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_founding_asset_validation",
  "source_extraction_id": "c6f4b8de214b47529df7b54c7e26ac75",
  "version": 1,
  "memory_type": "entities"
}
-->