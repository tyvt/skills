# 人脸识别失败当前页重试
face.vue 人脸识别失败改为当前页展示失败态并提供重试，而非自动后退。

## 行为变更
- 移除 goBackAfterFaceFail，改 pageStatus="failed" 当前页展示失败界面
- 点「重新识别」重置自动重试计数回到 verifying 并再调 startFaceVerify()
- 参数缺失也展示失败页但不显示重试按钮（canStartVerify 为 false）

## 验证与归属
- 验证：011.md 会话 da4b6a8b 人脸识别失败后退取消改展示失败页面+重试
- 涉及文件：pages/face/face.vue
- 来源会话ID：da4b6a8b-12d3-4758-b4f7-1405bf4f9282
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "face_fail_retry",
  "source_extraction_id": "fcb833032af14e8ea003acd1fc6646fe",
  "version": 1,
  "memory_type": "entities"
}
-->