# 注册表单合并验证码字段兼容校验
苏州市房地产监测V3 中 formModel 通过 computed 合并 codeForm.code/smsCode 且 v-model 绑定 codeForm，与 Element UI validate() 正常配合。

## 实现要点
- formModel 通过 computed 合并 codeForm.code/smsCode 且 v-model 绑定 codeForm，与 Element UI validate() 正常配合
- 提交去除重复验证码手写判空合理
- sendCode 改用 clearValidate(['code']) 统一校验提示
- 机构端 resetForm 清空 codeForm

## 待对齐项
- 企业端提交 payload 仅含 smsCode 需对齐后端

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-leftover/011.md
- 涉及文件：register/components/single-page/CompanyRegisterSingleForm.vue、institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue、utils/registerValidate.js、utils/registerFormContext.js、register/companyRegister.vue、api/company/companyRegister.js
- 所属项目：苏州市房地产监测V3；来源会话：022a69f3-9841-423f-b378-ec7448b32510；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "register_code_merge",
  "source_extraction_id": "708b39ed40c847009c995dd6200f64ae",
  "version": 2,
  "memory_type": "entities"
}
-->