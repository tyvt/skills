# H5接口请求响应未打印console日志
portal-h5-webview.js新增请求日志包装器，为关键H5接口打印请求与响应信息。

## 问题根因
- H5接口请求与响应原先未打印console日志，难以排查

## 解决方案
- 新增requestCtAuthWithLog包装器
- 为fetchExternalMaintenanceH5Url的getToken、getH5Url请求打印url、method、header、data
- 同时打印响应statusCode与data

## 验证与归属
- 涉及文件：utils/portal-h5-webview.js、utils/portal-user.js
- 来源会话：57f4069f-fd57-4bea-aab1-45b00ad189d9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_h5_logging",
  "source_extraction_id": "13a6f7e5d40744838e74b52e260871ff",
  "version": 1,
  "memory_type": "entities"
}
-->