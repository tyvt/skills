# flowApi统一流程提交审批
园区公共收益项目前端新增 `utils/flowApi.js` 统一收口流程提交与审批接口、节点校验的技术约定。

## 接口约定
- 默认接口路径拼接为 `/${moduleName}/${businessName}/submit` 或 `/approval`（如物业管理区备案为 `/property/complex/submit`）
- 调用 `/flowable/flowConfig/list` 校验当前 `busCode` 是否已配置流程节点，未配置提示「审核流程未维护完成，请联系管理员」

## 组件改造
- `OperationBtnGroup` 向 `ZsSubmit`、`zs-approval` 传递 `moduleName`、`businessName`
- 「取消提交/取消审核」改走默认审批接口并前置校验流程配置
- `ZsSubmit`/`zs-approval` 提交审批使用默认接口路径（兼容 `route.meta` 自定义配置），操作前校验流程节点

## 行为逻辑
- 有 `moduleName`+`businessName`：自动使用 `/模块/业务/submit` 或 `/approval`
- 未配置流程节点：拦截并提示，不发起请求

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 涉及文件：`utils/flowApi.js`、`tool/workflow/index.vue`、`ConfigDialog.vue`、`ConfigTable.vue`
- 所属项目：园区公共收益
- 来源会话：51f3071e-0992-4ca2-b14d-e0fa6c2d181d

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "flowApi统一流程提交审批",
  "source_extraction_id": "b54bc1ccecb74c09a7332b0885a45cc1",
  "version": 1,
  "memory_type": "entities"
}
-->