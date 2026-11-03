# 人脸识别非H5自调摄像头仅微信环境跳转小程序核验
太仓一网通办H5 的人脸识别依赖微信小程序原生页跳转核验，H5 页面仅作结果展示未调用摄像头。

## 功能说明
- 人脸识别依赖微信小程序原生页跳转核验
- H5 的 faceSuccess.vue、faceError.vue 仅作结果展示
- 未调用 getUserMedia 等摄像头 API

## 环境差异
- 本地 npm run dev 自动跳过核验
- 非微信环境因缺失 wx.miniProgram.navigateTo 及 JSSDK 不可用

## 验证与归属
- 验证证据：src=太仓一网通办H5/004.md
- 涉及文件：src/views/decision/common/faceSuccess.vue、src/views/decision/components/FaceStep.vue、src/router/index.ts、src/views/decision/ParticipateIn.vue、src/views/decision/common/faceError.vue、src/api/modules/auth.ts、src/views/election/ElectionForm.vue、src/views/owner-decision/ParticipateIn.vue
- 所属项目：太仓一网通办H5；来源会话：b060c68b-f941-46b5-a260-a8364b05b083；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "face_verify_miniprogram",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 2,
  "memory_type": "entities"
}
-->