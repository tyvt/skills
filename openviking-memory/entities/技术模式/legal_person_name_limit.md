
# 企业注册法人姓名长度限制为30字符
苏州市房地产监测V3 的 zhi2-web-admin 在企业注册页对法人姓名输入框增加长度限制，避免超长提交触发后端 400 错误。

## 问题根因
- 前端未对法人姓名输入框限制长度
- 后端对超过 30 字符的法人姓名返回 400 错误

## 修复方案
- Vue 输入框增加 `maxlength="30"` 与 `show-word-limit`，使用 `v-model.trim` 去除空格
- 校验规则设为 `{ min: 2, max: 30 }` 拦截超长提交
- `e2e/fixtures/register-helpers.js` 的 `REGISTER_MAX_LENGTH_FIELDS.step2` 中法人姓名 max 由 150 改为 30

## 涉及文件
- `src/utils/registerValidate.js` 与 `views/register/components/Step2LegalPerson.vue`
- `views/register/companyRegister.vue` 与 `e2e/fixtures/register-helpers.js`
- `views/institution/company/index.vue` 与 `e2e/register/company-register-fields.spec.js`
- `views/institutionRegister/components/Step2AdminInfo.vue` 与 `views/register/components/Step1CompanyInfo.vue`

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/255.md
- 来源会话ID：e3d71734-ab93-48dc-b3f5-54b9eddd55be
- 所属项目：苏州市房地产监测V3；代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "legal_person_name_limit",
  "source_extraction_id": "aed79d0c8ddc4144a39077955e6f65cf",
  "version": 2,
  "memory_type": "entities"
}
-->