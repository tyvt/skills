# 外部开发企业注册要求 organType 01
在外部开发企业注册中，`organType` 必须统一为 `01`（开发企业），与页面标题«企业账户注册（开发企业）»相符。

## 修改点
- 表单初始值在 `src/utils/registerValidate.js`
- `getQueryParams()` 在 `src/views/company/companyRegister/index.vue`
- 测试草稿在 `e2e/fixtures/register-helpers.js`

## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 来源会话：bc67591b-a7e5-4c59-bfbf-ecc997f7c3f3
- 记忆类型: pattern
- 验证证据: src=产品2.0/033.md
- 涉及文件: d:/repository/产品2.0/zhi2-web-admin/src/views/company/companyRegister/index.vue, src/views/register/companyRegister.vue, src/api/company/companyRegister.js, src/views/register/components/companyInfo.vue, e2e/fixtures/company-helpers.js, src/views/company/companyRegister/detail.vue, src/views/login.vue, src/utils/registerValidate.js
- 所属项目: 产品2.0; 会话: bc67591b-a7e5-4c59-bfbf-ecc997f7c3f3; 代码库: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "outnet_register_organ",
  "source_extraction_id": "1f13dccd594c4d2ea1f0df489b324a34",
  "version": 1,
  "memory_type": "entities"
}
-->