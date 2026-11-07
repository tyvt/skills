# 合同审批接口路径须为 flowable/task
苏州市房地产监测V3 的 contractRequest.js 将合同审批接口路径由 /flowable/definition 改为 /flowable/task 以匹配路由。

## 改动内容
- `contractRequest.js` 的 `getFlowViewer` 与 `isApprovalAuth` 路径由 `/flowable/definition/*` 改为 `/flowable/task/*`
- 匹配合同预售审批页 `/flowable/task/flowViewer` 路由

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 验证证据：src=苏州市房地产监测V3-rest/093.md
- 涉及文件：contractRequest.js、路由信息.json、vite.config.js、api/flowable/definition.js、api/flowable/todo.js、flow.vue、CashsaleDetail.vue、api/index.js
- 来源会话：957b5194-9887-4b03-a4b2-f48dde8ed5fa；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_api_path",
  "source_extraction_id": "1056cdb0ea05475b865e7d490ec11c28",
  "version": 1,
  "memory_type": "entities"
}
-->