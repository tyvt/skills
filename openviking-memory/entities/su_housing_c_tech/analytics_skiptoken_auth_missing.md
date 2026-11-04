# 埋点请求配置skipToken致鉴权头缺失
appAnalytics.js 中 analyticsConfig 设置 skipToken:true，httpInstance.js 拦截器因此不写入 Authorization 头，埋点接口无 token。

## 问题根因
- appAnalytics.js 中 analyticsConfig 设置 skipToken:true
- httpInstance.js 拦截器因此不写入 Authorization 头
- 埋点接口无 token

## 解决方案
- 移除 skipToken:true，保留 noReject 与 skipAuth
- 使登录后埋点带 token

## 验证与归属
- 验证证据：extracted source=cursor session=8ba13bf1-5e01-4af8-b8f3-4680fb5623ac
- 涉及文件：api/appAnalytics.js、api/httpInstance.js、api/index.js
- 所属项目：苏住房C（zhi2-mobile-shimin）；来源会话：8ba13bf1-5e01-4af8-b8f3-4680fb5623ac；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "su_housing_c_tech",
  "name": "analytics_skiptoken_auth_missing",
  "source_extraction_id": "6e5b846ebcdc448fb91edbfc90ee8dc1",
  "version": 1,
  "memory_type": "entities"
}
-->