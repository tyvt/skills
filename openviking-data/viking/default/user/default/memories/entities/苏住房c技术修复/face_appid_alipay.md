# 人脸识别支付宝拉起修复
苏住房C小程序修复支付宝无法拉起人脸识别的问题，根因为人脸 appId 误用为业务网关 ID。

## 问题根因
- livenessFaceAuth 的 arg0 必须是 jisnzjk（苏服办 JSSDK 人脸识别网关 ID）
- 修复前误填 szffluzm（业务 API 网关 ID），导致支付宝无法拉起扫脸
- 参考项目 zhi2-mobile-admin-h5-c-unlimited 使用 jisnzjk 可正常拉起人脸

## 修复内容
- 修正人脸 appId：默认使用 jisnzjk，可通过 VITE_APP_SFB_FACE_APP_ID 覆盖
- 恢复支付宝 my.onMessage 桥接：将扫脸结果转发给 SDK 回调（之前移植时遗漏）
- 支付宝超时策略：超时后保留 pending 状态，便于回跳后恢复结果
- 改进 token 解析：从 URL search 和 hash 中正确读取 token 参数
- index.html 增加支付宝 UA 检测处理

## 涉及文件与归属
- 涉及文件：index.html、src/utils/sfbFaceAuth.js、src/hooks/useFaceVerify.js、src/pages/common/face.vue
- 所属项目：苏住房C（zhi2-mobile-shimin）；参考项目：zhi2-mobile-admin-h5-c-unlimited
- 来源会话ID：8cccd282-23de-4677-8488-fd1b2de11ef6；代码基线：none

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "苏住房C技术修复",
  "name": "face_appid_alipay",
  "source_extraction_id": "26b67095e6d743bd8590c67953d37172",
  "version": 1,
  "memory_type": "entities"
}
-->
