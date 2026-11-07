# 计算属性合并表单配合Element UI校验
formModel 用 computed 合并 codeForm.code/smsCode 且 v-model 绑定 codeForm，可正常配合 Element UI validate() 校验；企业端与机构端验证码字段不一致需统一 clearValidate 与清空。

## 实现要点
- formModel 用 computed 合并 codeForm.code/smsCode 且 v-model 绑定 codeForm，可正常配合 Element UI validate() 校验
- 企业端提交 payload 仅含 smsCode 与机构端 imageCode 不一致
- sendCode 需统一调用 clearValidate(['code']) 且 resetForm 清空 codeForm

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3/211.md
- 涉及文件：register/components/single-page/CompanyRegisterSingleForm.vue、institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue、utils/registerValidate.js、utils/registerFormContext.js、register/companyRegister.vue、api/company/companyRegister.js
- 所属项目：苏州市房地产监测V3；来源会话：022a69f3-9841-423f-b378-ec7448b32510；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "computed_form_validate",
  "source_extraction_id": "8d76582b52e848ada33f841ccd2a4531",
  "version": 1,
  "memory_type": "entities"
}
-->