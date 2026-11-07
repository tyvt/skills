# 企业入网变更备案返回按钮修复
苏州市房地产监测V3 项目修复「详情-企业入网变更备案」页面「返回」按钮无效问题。

## 根因
- 管理端列表点「查看」进入详情时 `buildDetailNavigation` 未带 `backUrl`
- 详情页 `handleChangeBack` 无 `backUrl` 时回退当前详情路径，看似无反应

## 修复方案
- `buildDetailNavigation` 列表跳详情自动写入 `backUrl: listRoute.path`
- `handleChangeBack`（`toB/companyRecord/detail.vue`、`toB/agencyRecord/detail.vue`）：有 `backUrl` 回列表；管理端变更详情(`isChange`)无 `backUrl` 回退父路径；企业端编辑变更回基本信息查看页(`formMode=view`)

## 归属信息
- 涉及文件：`toB/companyRecord/detail.vue`、`toB/agencyRecord/detail.vue`、`detail-template.vue`、`路由信息.js`
- 所属项目：苏州市房地产监测V3
- 来源会话：b0618937-c210-4a03-8724-c92b7c9cc651
- 验证证据：extracted source=cursor project=苏州市房地产监测V3

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "company_change_back_fix",
  "source_extraction_id": "bea5b1d885d5493fa705dd0a513cf1a1",
  "version": 1,
  "memory_type": "entities"
}
-->