# 我发起的流程撤回405与approvalApi校验收敛
园区公共收益项目(zhi2-web-admin)中，「我发起的」点撤回报405，根因是流程配置 approvalApi 写成纯数字导致拼成 /api/v2/2。

## 问题根因
- 工具→工作流→流程配置里 approvalApi 配成 `2` 等不含 `/` 的非法值，与 baseURL 拼接后非真实业务路径，网关返回 Method Not Allowed
- 旧版 process.vue 撤回常缺当前节点 key，且未校验 approvalApi，错误配置会直接发请求

## 解决方案
- 在 flowApi.js 收敛 withdrawProcess：approvalApi 必须含 `/`，否则拒绝直调
- 异常时从业务详情 path 推导（如 /benefit/xxx/123 → /benefit/xxx/approval）
- 先调 flowViewer 取当前节点 key，再 POST 审批接口
- process.vue 与详情页撤回统一走该函数；联调时 approvalApi 改成 /benefit/pubAllotNotice/approval

## 验证与归属
- 验证：会话 b81ac1e2 撤回请求 URL /api/v2/2、POST、405；结论写 approvalApi 错配为 2，新增 withdrawProcess 校验与 key 补齐
- 涉及文件：src/utils/flowApi.js、src/views/flowable/process.vue、src/views/tool/workflow/components/ConfigDialog.vue
- 所属项目：园区公共收益；来源会话：b81ac1e2-1917-4945-a8fc-a5c38eb2ae6f；代码基线：0c9b8c2

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "withdraw_approvalapi_405",
  "source_extraction_id": "29493589c3594a7899ab33fce14ca423",
  "version": 1,
  "memory_type": "entities"
}
-->