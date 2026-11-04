# Detail Vue 字段重组
`companyRegister/detail.vue` 已按照注册流程重新组织为四个部分。

## 变更
- 重组为基本信息、办公信息、机构管理员信息和附件上传部分
- 字段名称与注册流程对齐；移除了冗余的机构类型和 `bankTable`

## 涉及文件
- `src/views/company/companyRegister/detail.vue`
- `src/views/register/components/Step1CompanyInfo.vue`, `Step2LegalPerson.vue`, `Step3Appendix.vue`
- `src/views/register/companyRegister.vue`, `accountInfo.vue`, `registerValidate.js`, `dialog.vue`

## 验证与归属
- 验证证据: 提取自 cursor session=005d84fc-8f79-4a0c-9b99-de4b2a6bcd0a
- 代码基线: none; 所属项目: Produto 2.0

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_detail_reorg",
  "source_extraction_id": "ea712054da3f4c828e9962a4a272fca7",
  "version": 1,
  "memory_type": "entities"
}
-->