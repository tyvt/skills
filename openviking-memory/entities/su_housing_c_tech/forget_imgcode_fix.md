# 忘记密码页图形验证码失败处理修复
苏住房C忘记密码页因共享组件`PhoneForm.vue`未处理发送失败回调，导致按钮卡在「发送中…」且未刷新验证码，已对齐其他表单模式修复。

## 问题根因
- `PhoneForm.vue`的`sendCode`未处理`sendPhoneMessage`失败回调，`sending`一直为`true`
- 图形验证码校验失败后未刷新验证码、未清空输入框
- `form`缺失`imageCode`、`udid`初始字段

## 修复内容
- `PhoneForm.vue`为`ImgCode`增加`ref`，失败调`resetImageCode()`刷新并清空输入
- `sendCode`对齐`phone.vue`与`cancellationForm.vue`：成功`countDown()`，失败`resetImageCode()+onFail()`，校验失败`onFail()`
- 补全`form`中`imageCode`、`udid`初始字段
- `VerifyCode/index.vue`相应调整

## 涉及文件与归属
- 涉及文件：`PhoneForm.vue`、`phone.vue`、`cancellationForm.vue`、`VerifyCode/index.vue`、`api/security.js`、`pages/login/forget.vue`
- 所属项目：苏住房C（zhi2-mobile-shimin）
- 来源会话ID：1b8c2026-4de2-4989-a73b-49a661ba145a；代码基线none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "forget_imgcode_fix",
  "source_extraction_id": "bc0083fed0b94cb88a7ca161c3df36e9",
  "version": 1,
  "memory_type": "entities"
}
-->
