# 苏服办人脸bfcache僵尸桥导致二次识别超时
无锡市区H5在苏服办App内办完第一户人脸跳第三方页返回后，iOS WKWebView从bfcache恢复使lightAppJssdk桥变僵尸态，第二户waitForSfbFaceSdk超时失败。

## 问题现象
- 用户反馈iPhone苏服办App内第一户人脸通过、第二户（91户两户场景）报「苏服办 SDK 加载超时，请刷新后重试」
- 错误来自sfbFaceAuth.js的waitForSfbFaceSdk轮询8秒拿不到window.lightAppJssdk.face.livenessFaceAuth

## 根因
- 第一户成功后bdc.vue用window.location.replace跳第三方不动产页，返回办第二户时iOS WKWebView从bfcache恢复（pageshow.persisted=true）
- 恢复后lightAppJssdk对象残留但原生JS桥已拆（僵尸态），调用livenessFaceAuth挂起直到8秒超时
- 旧逻辑超时仅展示失败页加「重新识别」按钮，点击仍走僵尸桥反复超时

## 修复方案
- sfbFaceAuth.js：waitForSfbFaceSdk默认超时8000改12000ms；新增isSfbFaceSdkReady()判僵尸态；新增reloadOnceForSfbFaceRecovery()在超时或僵尸态整页reload一次重新注入原生SDK，用sessionStorage 60s闸门防循环
- face.vue：调起失败遇SDK不可用且未就绪自动刷新兜底；「重新识别」僵尸态下改整页刷新；监听pageshow.persisted处理bfcache恢复；成功调起后清除恢复闸门

## 验证与归属
- bun run build通过，产物含修复标记；nginx新增站点无锡市区小程序嵌入H5.conf（127.0.0.1:8106，root指本项目dist），nginx -t通过并已reload
- 子模块dev_wuxi-sfb提交201ce49已推送；父仓main-sfb提交58f794d已推送（更新gitlink）
- 涉及文件：zhi2-mobile-admin-h5-c-unlimited/src/utils/sfbFaceAuth.js、src/pages/face/face.vue
- 所属项目：无锡市区小程序嵌入H5；来源会话：2026-11-04调试会话；代码基线：dev_wuxi-sfb

<!-- MEMORY_FIELDS
{
  "category": "无锡市区小程序嵌入H5技术",
  "name": "sfb_face_bfcache_bug",
  "source_extraction_id": "bdcb472899dc4e87a8cb8be9dbada890",
  "version": 1,
  "memory_type": "entities"
}
-->