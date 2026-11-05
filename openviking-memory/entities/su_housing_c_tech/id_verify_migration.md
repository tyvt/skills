# 身份证微信实名认证迁移
苏住房C 项目已迁移泰兴小程序的微信身份证实名认证能力，新增 API 并更新认证页。

## 改动说明
- 新增 src/api/security.js 的 weChatVerify 接口，对接 /security/ctAuth/wechat/verify
- 更新 FormLocal.vue 参考泰兴 pages_common/verifyUser/index.vue 接入完整人脸识别流程
- 认证流程：TypeChoose（居民身份证）→ FormLocal → 填写姓名/身份证号 + 微信人脸识别

## 功能细节
- 温馨提示收集姓名和身份证号；需勾选《用户协议》《隐私政策》才能提交
- uni.startFacialRecognitionVerify 调起人脸核身，成功后 wx.login + weChatVerify 完成实名
- 保留重复账号提醒（可继续认证或去登录），人脸失败可跳 FormManual 人工审核
- 认证成功调用 userStore.getUserInfo() 刷新用户信息

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：src/api/security.js、FormLocal.vue、pages_common/verifyUser/index.vue、TypeChoose.vue
- 来源会话ID：42b7efbf-3412-4580-bb0d-1b92c50a5d89
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "id_verify_migration",
  "source_extraction_id": "87e33cf0079f4bbcb47a8d1b6a3d7a99",
  "version": 1,
  "memory_type": "entities"
}
-->