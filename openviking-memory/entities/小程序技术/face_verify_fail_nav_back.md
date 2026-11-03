# face 页人脸失败参数缺则提示返回上页
pages/face/face.vue 在人脸识别失败或姓名/身份证缺失时提示约1.5秒返回，优先 navigateBack 否则 reLaunch。

## 行为逻辑
- `pages/face/face.vue` 在人脸识别失败或姓名/身份证缺失时提示约 1.5 秒返回
- `goBackAfterFaceFail` 优先 `uni.navigateBack()` 否则 `reLaunch` 至 `externalWebview`
- `fail` 回调中非 `webview not ready` 均返回

## 验证与归属
- 验证证据：extracted source=cursor session=bd4ae7ae-4fdc-458d-b142-9ba6f2c7e325
- 涉及文件：pages/face/face.vue、pages/face/verify.vue、pages/webview/externalWebview.vue、pages/face/bdc.vue、pages.json、pages/webview/h5ExternalWebview.vue、pages/webview/portalH5Webview.vue
- 来源会话ID：bd4ae7ae-4fdc-458d-b142-9ba6f2c7e325；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "face_verify_fail_nav_back",
  "source_extraction_id": "a915952323c7436887ace9fedf19adbf",
  "version": 1,
  "memory_type": "entities"
}
-->