# 埋点401静默处理修复
苏住房C小程序 `eventData/add` 返回 401 时不再阻塞跳转，已改为静默处理。

## 修复内容
- `redirect/index.vue` 埋点改为「先跳转、埋点后台发」，移除 `.finally` 等待
- `appAnalytics.js` 增加 `skipAuth:true`，与 `noReject`、`skipToken` 一起确保埋点失败不弹错
- `httpInstance.js` 中带 `noReject` 或 `skipAuth` 的请求遇 401 不再执行 `userStore.clear()` 和 `appLogin()`

## 效果与归属
- 从 redirect 中转页进入目标页不再等埋点返回，埋点 401 不触发登录或报错
- 涉及文件：redirect/index.vue、appAnalytics.js、httpInstance.js、api/index.js、menuRouteMap.js
- 项目：苏住房C（zhi2-mobile-shimin）；来源会话ID：885fa7c0-9559-4361-80e6-9a88eb687621

## 验证与归属
- 所属项目：苏住房C
- 验证证据：extracted source=cursor project=苏住房C


<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "track_401_silent_fix",
  "source_extraction_id": "d4aeab4b2dbf4b6c807c6259816b7573",
  "version": 1,
  "memory_type": "entities"
}
-->
