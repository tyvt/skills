# 账户注销接口流程
苏住房C小程序（zhi2-mobile-shimin 市民端）账户注销按步骤调用 3 个后端接口（外加发验证码）。

## 流程概览
- 注销须知：`cancellationWarning.vue`（配置 `szf.user.cancellation`，不直接调注销接口）
- 手机验证：`cancellationForm.vue`
- 选择原因并提交：`cancellationReason.vue`

## 实际调用接口
- 接口定义在 `security.js` 与 `msg.js`，路径挂在 `/api/v2.0`，文本载明共调 3 个后端接口（外加发验证码）
- 发短信：`sendPhoneMessage` POST `/msg/sms/sendVerificationCode`，用途注销验证码，`source: 'CT_DEL_PHONE'`
- 下一步：`delPhone` POST `/security/ctAuth/unRegisterValidate`，校验短信 + 图形

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`cancellationWarning.vue`、`cancellationForm.vue`、`cancellationReason.vue`、`src/api/security.js`
- 来源会话ID：d04c9121-4f3c-42c3-ae56-3dc2be847843
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "account_cancellation_flow",
  "source_extraction_id": "f52854a4bf0f4d3c8f51f968519959b1",
  "version": 1,
  "memory_type": "entities"
}
-->