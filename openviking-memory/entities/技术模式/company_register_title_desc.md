# 开发企业注册标题下补说明且成功隐藏
企业账号注册页标题改为「企业账号注册（开发企业）」，标题与营业执照间增加说明文案，成功结果页隐藏说明避免冲突。

## 实现要点
- companyRegister.vue 标题改为「企业账号注册（开发企业）」
- 标题与营业执照间增加说明文案
- 通过 v-if="viewMode === 'form'" 于提交成功结果页隐藏说明，避免与结果页冲突

## 验证与归属
- 验证证据：cursor 会话 18b3580d-c81f-4cff-9830-320ca69ec535
- 涉及文件：companyRegister.vue、InstitutionRegisterPage.vue、register-form.scss、CompanyRegisterSingleForm.vue、InstitutionRegisterSingleForm.vue、propertyCompanyRegister.vue、RegisterStepper/index.vue、e2e/register/register-layout.spec.js
- 所属项目：苏州市房地产监测V3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_register_title_desc",
  "source_extraction_id": "ceefa154fa254c5592af0cd4cc7071e5",
  "version": 1,
  "memory_type": "entities"
}
-->