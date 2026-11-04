# 太仓一网通办H5人脸识别实现方式
太仓一网通办H5 的人脸识别由微信小程序完成核验，H5 仅负责流程编排与结果展示，可用性随运行环境变化。

## 环境可用性
- 生产环境 + 微信小程序 WebView：可用，跳转到小程序人脸识别页完成核验
- 本地开发（npm run dev）：自动跳过人脸识别，直接走成功流程
- 普通浏览器 / 非微信环境：不可用，依赖 wx.miniProgram.navigateTo，无微信 JSSDK 会失败

## 实现架构
- 整体为 H5 编排流程 + 微信小程序做人脸核验 + 回调 H5 的架构
- H5 的 faceSuccess.vue、faceError.vue 仅结果展示 UI（静态图 + 提示文案），不调用 getUserMedia，不做人脸比对
- 核心组件为 FaceStep.vue

## 适用模块
- 业主决策：/decision/.../form/:id
- 业主决策（另一套）：/owner-decision/.../form/:id
- 业委会选举：/election/form/:id
- 上述模块均在最后一步调用 FaceStep.vue 做人脸识别

## 验证与归属
- 验证证据：extracted source=cursor project=太仓一网通办H5
- 涉及文件：faceSuccess.vue、faceError.vue、FaceStep.vue
- 所属项目：太仓一网通办H5；来源会话：b060c68b-f941-46b5-a260-a8364b05b083；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "face_recognition_impl",
  "source_extraction_id": "b620b21275c34065997323fd9392c72d",
  "version": 1,
  "memory_type": "entities"
}
-->