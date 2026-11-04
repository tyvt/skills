# H5接口请求响应未打印console日志
portal-h5-webview.js新增请求日志包装器，为关键H5接口打印请求与响应信息。

## 问题根因
- H5接口请求与响应原先未打印console日志，难以排查

## 解决方案
- 新增requestCtAuthWithLog包装器，每次请求按阶段输出日志
- fetchExternalMaintenanceH5Url（业主决策、维修资金共用）为实际发请求入口
- 请求流程：1. GET getToken 获取 token；2. POST getH5Url 用 token+houseId 换取 H5 地址
- 请求阶段打印：url、method、header、data
- 响应阶段打印：url、method、statusCode、data（原始响应体）
- 失败阶段打印：url、method、error

## 验证与归属
- 涉及文件：utils/portal-h5-webview.js、utils/portal-user.js
- 来源会话：57f4069f-fd57-4bea-aab1-45b00ad189d9
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "小程序技术",
  "name": "portal_h5_logging",
  "source_extraction_id": "d2051067661549999dbed53bf24d0e7d",
  "version": 2,
  "memory_type": "entities"
}
-->