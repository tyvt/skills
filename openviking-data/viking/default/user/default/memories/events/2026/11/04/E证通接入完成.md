# Summary
昆山市民 uni-app 小程序于本次开发完成腾讯云 E 证通接入，替换了原先微信小程序原生的 uni.startFacialRecognitionVerify 人脸识别流程。主要变更包括：在 pages.json 中注册 E 证通中转页 mp_ecard_sdk/index/index；将原生微信页面（.wxml/.js）改为 uni-app 的 index.vue 以保证可编译；在 App.vue 的 onLaunch 中调用 initEid() 初始化 SDK，并在 onShow 中排除从 eID 数字身份小程序（appid wx0e2cb0b052a91c92）返回的场景以避免 SDK 回调冲突；新增 src/pages/common/useEidVerify.js 统一处理获取 EidToken、调用 startEid() 跳转 eID 小程序核身、核身后提交 eidToken 校验；在 src/api/modules/estate.js 新增 getEidToken 与 faceRecognition 接口。所属项目：昆山市民。
# 2026-11-04 (Wednesday) ChatLog:
**user**: 【记忆类型】preference
【标题】已完成腾讯云 E 证通接入，并替换了微信小程序原生的
【内容】已完成腾讯云 E 证通接入，并替换了微信小程序原生的 `uni.startFacialRecognitionVerify` 人脸识别流程。主要变更如下： ## 已完成的改动 ### 1. SDK 配置 - 在 `pages.json` 中注册 E 证通中转页 `mp_ecard_sdk/index/index` - 将原生微信页面（`.wxml/.js`）改为 uni-app 的 `index.vue`，保证项目可正常编译 - 在 `App.vue` 的 `onLaunch` 中调用 `initEid()` 初始化 SDK - 在 `onShow` 中排除从 eID 数字身份小程序（`wx0e2cb0b052a91c92`）返回的场景，避免与 SDK 回调冲突 ### 2. 核身流程封装 新增 `src/pages/common/useEidVerify.js`，统一处理： 1. 向后端获取 `EidToken` 2. 调用 `startEid()` 跳转 eID 数字身份小程序完成核身 3. 核身完成后将 `eidToken` 提交后端校验 ### 3. API 调整 在 `src/api/modules/estate.js` 新增： - `getEidToken` — 获取核身凭证 - `faceRecognition` — 参数由原先的 `key`（微信 `verifyRes
【验证证据】extracted source=cursor project=昆山市民
【涉及文件】`pages.js ; 将原生微信页面（`.wxml/.js ; `index.vue ; `App.vue
【所属项目】昆山市民
【来源会话ID】557ceece-0aee-4751-ad10-916eb7fccb30
【代码基线】none
【语言要求】请用简体中文抽取并写入记忆，不要输出葡萄牙语或其他语言。

<!-- MEMORY_FIELDS
{
  "event_name": "E证通接入完成",
  "goal": "E证通接入",
  "summary": "昆山市民 uni-app 小程序于本次开发完成腾讯云 E 证通接入，替换了原先微信小程序原生的 uni.startFacialRecognitionVerify 人脸识别流程。主要变更包括：在 pages.json 中注册 E 证通中转页 mp_ecard_sdk/index/index；将原生微信页面（.wxml/.js）改为 uni-app 的 index.vue 以保证可编译；在 App.vue 的 onLaunch 中调用 initEid() 初始化 SDK，并在 onShow 中排除从 eID 数字身份小程序（appid wx0e2cb0b052a91c92）返回的场景以避免 SDK 回调冲突；新增 src/pages/common/useEidVerify.js 统一处理获取 EidToken、调用 startEid() 跳转 eID 小程序核身、核身后提交 eidToken 校验；在 src/api/modules/estate.js 新增 getEidToken 与 faceRecognition 接口。所属项目：昆山市民。",
  "ranges": "0-5",
  "source_extraction_id": "504160be5b154de1982659399a7ac8a2",
  "version": 1,
  "memory_type": "events"
}
-->