# 注册流程使用 getDicts 配合真实字典
注册流程的组件曾使用不兼容的硬编码字段；已改为通过 `getDicts()` 调用真实的字典接口。

## 修改点
- `Step2LegalPerson.vue` 和 `ShareholderDialog.vue` 使用 `document_type`
- `Step1CompanyInfo.vue` 使用 `company_qualification_level`
- 已更新 `e2e/fixtures/register-helpers.js` 和 `e2e/fixtures/register-mocks.js`

## 验证与归属
- 记忆类型: pattern
- 验证证据: src=产品2.0/034.md
- 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/register/components/Step3Appendix.vue, src/views/company/companyRegister/detail.vue, src/views/tool/fjflpz/components/FjDialog.vue, e2e/fixtures/register-mocks.js, src/api/company/companyRegister.js, e2e/fixtures/register-helpers.js, src/views/register/companyRegister.vue, src/views/register/components/companyInfo.vue
- 所属项目: 产品2.0; 会话: 008732db-2f2d-46d5-8491-ec57ab3fe2ea; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_getdicts_api",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->