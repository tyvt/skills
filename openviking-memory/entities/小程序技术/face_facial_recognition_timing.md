# face.vue 人脸识别时序与重试
pages/face/face.vue 采用 Vue2 写法，调整人脸识别调用时机与失败重试，规避 webview not ready 报错。

## 调用时机
- onLoad：只解析参数，不立即发起人脸识别
- onReady：延迟 300ms 后再调用 startFacialRecognitionVerify

## 失败重试
- 若为 webview not ready，最多重试 3 次，每次间隔 500ms
- 仍失败则提示「人脸识别启动失败，请重试」

## 验证与归属
- 验证证据：extracted source=cursor project=小程序
- 涉及文件：pages/face/face.vue、pages/face/verify.vue
- 所属项目：小程序；来源会话ID：f3266edb-f8f0-4d5e-9fbf-b55ae9f2fdac；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "face_facial_recognition_timing",
  "source_extraction_id": "1571c5bfb625441c962d9eab86b058e3",
  "version": 1,
  "memory_type": "entities"
}
-->