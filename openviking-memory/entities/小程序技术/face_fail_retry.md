# 人脸识别失败当前页重试
face.vue 人脸识别失败改为当前页展示失败态并提供重试，而非自动后退。

## 行为变更
- 移除 goBackAfterFaceFail，改 pageStatus="failed" 当前页展示失败界面
- 点「重新识别」重置自动重试计数回到 verifying 并再调 startFaceVerify()
- 参数缺失也展示失败页但不显示重试按钮（canStartVerify 为 false）

## 页面状态
- `verifying`：展示「正在进行人脸识别」提示
- `failed`：失败图标 + 失败文案 + 「重新识别」按钮
- 样式与 verify.vue 保持一致（蓝色主按钮、灰色背景）

## 页面上下文
- 典型页面栈：实名认证(verify) → 不动产授权(bdc) → 人脸识别(face)

## 验证与归属
- 验证：微信开发者工具进入人脸识别页，故意取消或失败一次确认失败页与重试流程
- 涉及文件：pages/face/face.vue、pages/face/verify.vue、pages/face/bdc.vue
- 项目路径：d:\repository\小程序\wygl-wxxcx-dev-slh
- 来源会话ID：da4b6a8b-12d3-4758-b4f7-1405bf4f9282
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "face_fail_retry",
  "source_extraction_id": "a9326b71aa6c4102918e3d346abe1e23",
  "version": 2,
  "memory_type": "entities"
}
-->