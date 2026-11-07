# 机构与企业注册验证码必填校验修复
苏州市房地产监测V3 中为机构注册与企业注册的图片验证码、短信验证码补充了与其他字段一致的必填校验。

## 修改内容
- 在 `formModel` 计算属性中将 `codeForm.code`、`codeForm.smsCode` 并入表单 model 以便 Element UI 校验
- 表单项：`图片验证码` 的 `prop="code"`，`验证码` 的 `prop="smsCode"`（企业端原错误 `smsCodeField` 已修正）
- 校验规则新增：`图片验证码不能为空`、`短信验证码不能为空`
- 提交逻辑去掉重复 `msgError` 判空，统一走 `validate()`，未填时红框提示并滚动到首个错误

## 涉及文件
- `src/views/register/components/single-page/CompanyRegisterSingleForm.vue`
- `src/views/institutionRegister/components/single-page/InstitutionRegisterSingleForm.vue`
- `src/utils/registerValidate.js`

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 来源会话ID：25fff776-d3eb-4133-ab57-71b7cce1e3fd
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "register_code_fix",
  "source_extraction_id": "4e19ad089b314ee7a3955a02853db69b",
  "version": 1,
  "memory_type": "entities"
}
-->