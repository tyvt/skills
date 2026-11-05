
# 微信人脸核身后 wechat/verify 调用说明
苏住房C(zhi2-mobile-shimin)认证流程中 wechat/verify 仅在微信人脸核身成功后才会被调用，模拟器无法完成核身故不会发请求。

## 调用链路
- 提交认证 → getRepeatByIdTypeAndIdNumber（成功）→ uni.startFacialRecognitionVerify（微信人脸核身）
- 核身 success → wx.login → wechat/verify（仅此处发请求）
- 核身 fail → 直接弹「认证失败」，无 wechat/verify 请求

## 模拟器说明
- 模拟器中 startFacialRecognitionVerify 基本不支持或无法正常完成，会走 fail 回调，故看到「认证失败」且无 /security/ctAuth/wechat/verify 请求

## 验证方式
- 用真机打开微信小程序（开发者工具 → 预览 → 手机扫码），在 Network 确认人脸核身完成后出现 wechat/verify
- Console 中人脸核身失败通常有相关报错

## 验证与归属
- 所属项目：苏住房C；来源会话：13ed1683-e44e-4216-95c3-4499d21022e8
- 涉及文件：src/api/security.js、src/pages_my/verification/FormLocal.vue、src/pages_my/verification/FormNonLocal.vue
- 代码基线：none


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "wechat_verify_face_recognition",
  "source_extraction_id": "85eda2beba664de9b5d23d9ab50c962c",
  "version": 1,
  "memory_type": "entities"
}
-->