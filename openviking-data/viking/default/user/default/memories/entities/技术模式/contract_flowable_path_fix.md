# 合同接口flowable路径由definition改为task
苏州市房地产监测V3 的 `contractRequest.js` 中 `getFlowViewer` 和 `isApprovalAuth` 接口路径已从 `/flowable/definition/*` 改为 `/flowable/task/*`。

## 背景
- 原 `/flowable/definition/*` 路径不正确，合同预售审批页接口调用失败

## 修改内容
- `contractRequest.js` 的 `getFlowViewer` 和 `isApprovalAuth` 接口路径由 `/flowable/definition/*` 改为 `/flowable/task/*`
- 重新部署前端后，在合同预售审批页（`/flowable/task/flowViewer`）刷新验证

## 验证与归属
- 验证证据：extracted source=cursor project=苏州市房地产监测V3
- 涉及文件：`contract/utils/contractRequest.js`、`api/flowable/definition.js`、`api/flowable/todo.js`、`vite.config.js`、路由信息
- 所属项目：苏州市房地产监测V3
- 来源会话ID：957b5194-9887-4b03-a4b2-f48dde8ed5fa

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "contract_flowable_path_fix",
  "source_extraction_id": "756cd836611b4b25b7366c1b7ae83809",
  "version": 1,
  "memory_type": "entities"
}
-->