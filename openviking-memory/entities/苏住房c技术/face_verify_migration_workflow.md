# 从泰兴小程序迁移微信人脸核身实名认证
苏住房C以泰兴小程序已跑通页面为模板，整体迁移居民身份证实名认证的人脸核身链路。

## 迁移落地点
- src/api/security.js 新增 weChatVerify，对接 /security/ctAuth/wechat/verify（与泰兴同名同路径）。
- FormLocal.vue 参照泰兴 pages_common/verifyUser/index.vue 接入：温馨提示收集姓名与身份证号、用户协议与隐私政策勾选（未勾选不允许提交）、uni.startFacialRecognitionVerify 调起人脸、人脸成功 wx.login 拿 code 调 weChatVerify 完成实名、成功後 getUserInfo() 刷新并跳 AuthorizedSuccess。
- 保留重复账号提醒（可继续认证或去登录）与人工审核兜底（人脸失败跳 FormManual）。
- TypeChoose.vue 不改，入口仍进 FormLocal。

## 前置条件与限制
- 人脸核身仅微信小程序真机可用，H5需显式提示「请在微信小程序中进行实名认证」。
- 需微信公众平台开通人脸核身能力，否则 startFacialRecognitionVerify 直接失败。
- 非居民身份证（FormNonLocal）仍走人工审核；迁移后必须真机走完整流程验证，模拟器不具备。

## 验证与归属
- 所属项目：苏住房C；代码基线：4630e8e；来源会话ID：42b7efbf-3412-4580-bb0d-1b92c50a5d89。
- 涉及文件：zhi2-mobile-shimin/src/pages_my/verification/FormLocal.vue、TypeChoose.vue、src/api/security.js、泰兴小程序/src/pages_common/verifyUser/index.vue。
- 验证：用户诉求参考泰兴小程序实现迁移，结论列出六项接入点与两条注意事项。

<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术",
  "name": "face_verify_migration_workflow",
  "source_extraction_id": "70fc14d1e2ea42d0bf2f14201419d722",
  "version": 1,
  "memory_type": "entities"
}
-->