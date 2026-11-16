# 太仓一网通办H5人脸识别实现方式
太仓一网通办H5 的人脸识别由微信小程序完成核验，H5 仅负责流程编排与结果展示。

## 环境可用性
- 生产环境 + 微信小程序 WebView：可用，跳转到小程序人脸识别页完成核验
- 本地开发（npm run dev）：自动跳过人脸识别，直接走成功流程
- 普通浏览器 / 非微信环境：不可用，依赖 wx.miniProgram.navigateTo，无微信 JSSDK 会失败

## 实现架构
- H5 编排流程 + 微信小程序核验 + 回调 H5；核心组件为 FaceStep.vue
- faceSuccess.vue、faceError.vue 仅结果展示 UI（静态图 + 提示文案），不调用 getUserMedia，不做人脸比对

## 适用模块与归属
- 业主决策 /decision/.../form/:id、业主决策另一套 /owner-decision/.../form/:id、业委会选举 /election/form/:id，均在该模块最后一步调用 FaceStep.vue 做人脸识别
- 验证证据：extracted source=cursor project=太仓一网通办H5；所属项目太仓一网通办H5；来源会话 b060c68b-f941-46b5-a260-a8364b05b083；代码基线 none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "face_recognition_impl",
  "source_extraction_id": "caa424bb789b4b16974099b9a48110c6",
  "version": 2,
  "memory_type": "entities"
}
-->