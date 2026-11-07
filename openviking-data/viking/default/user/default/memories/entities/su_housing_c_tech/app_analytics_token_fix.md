# 埋点请求缺失 token 修复
苏住房C小程序 `appAnalytics.js` 埋点请求因 `skipToken: true` 未带登录 token，已修复。

## 问题根因
- `appAnalytics.js` 所有埋点请求共用 `analyticsConfig` 并设置 `skipToken: true`
- `httpInstance.js` 请求拦截仅当未设置 `skipToken` 时才写入 `Authorization`

## 修复内容
- 从 `analyticsConfig` 去掉 `skipToken: true`，保留 `noReject: true`（失败不弹错）与 `skipAuth: true`（401 不触发重新登录）
- 修复后 `/appAnalytics/eventData/add` 及同文件 `projectData/primary/add`、`projectData/resale/add`、`projectData/smart/add` 在登录态均带 token

## 验证与归属
- 验证证据：extracted source=cursor project=苏住房C
- 涉及文件：`api/appAnalytics.js`、`api/httpInstance.js`、`api/index.js`
- 来源会话ID：8ba13bf1-5e01-4af8-b8f3-4680fb5623ac
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "app_analytics_token_fix",
  "source_extraction_id": "f52854a4bf0f4d3c8f51f968519959b1",
  "version": 1,
  "memory_type": "entities"
}
-->