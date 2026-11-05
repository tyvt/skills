# 苏服办登录后V1 token缺失修复
苏住房C苏服办登录流程（App.vue的initSfbUser）漏掉V2换V1 token调用，已修复。

## 问题原因
- 苏服办登录ticket换token成功只保存V2 token（`accessToken`），未调用`getTokenV1()`
- 普通登录页和redirect页登录后都会调用，苏服办流程漏掉，导致依赖V1 token的接口异常

## 修复方案
- 在`initSfbUser`设置V2 token后立即调用`getTokenV1()`，结果写入`userStore.tokenV1`
- 成功写tokenV1，失败写空字符串

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：App.vue、user.js等
- 来源会话ID：cf09ca87-b417-43c0-b05d-5168f3aa3e55

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "sfb_login_v1_token_fix",
  "source_extraction_id": "7eca3a8230794a36a6dc360689fe3cb5",
  "version": 1,
  "memory_type": "entities"
}
-->