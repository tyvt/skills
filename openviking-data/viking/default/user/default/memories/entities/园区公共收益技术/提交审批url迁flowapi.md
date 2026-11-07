# 提交审批URL迁flowApi
园区公共收益 2.0 提交/审批接口从 workflow 配置迁到 flowApi 按 moduleName+businessName 拼接并先查 flowConfig 的约定。

## 接口约定
- OperationBtnGroup、ZsSubmit、zs-approval 统一走 `utils/flowApi.js`，默认路径 `/${moduleName}/${businessName}/submit` 与 `/${moduleName}/${businessName}/approval`（例：物业管理区备案 `/property/complex/submit`）
- `route.meta` 仍保留自定义接口最高优先级
- ApprovalProcessDialog 等审核弹窗须对齐 OperationBtnGroup，提交前改用 `flowApi.js` 的 `getApprovalApi`：优先 `route.meta.approvalApi`，否则按 `moduleName`+`businessName` 拼接（如 `/benefit/pubRegulatoryAccount/approval`）

## 流程校验
- 操作前调用 `/flowable/flowConfig/list` 校验当前 `busCode` 是否已配置节点，未配置则拦截提示「审核流程未维护完成，请联系管理员」
- 能否提交/审核由流程节点决定，未配置不发起业务 submit/approval

## 演进说明
- 与苏房系「meta → 流程配置表解析 submitApi」旧三级方案不同，属同一产品线接口约定演进，改园区项目勿照搬 resolveFlowSubmitApi

## 验证与归属
- 验证证据：extracted source=cursor project=园区公共收益
- 验证会话：51f3071e（新增 flowApi.js、操作前 flowConfig 校验；workflow 配置去掉接口字段）
- 补充验证会话：4ad7e2c6（ApprovalProcessDialog 等审核弹窗改走 getApprovalApi，与 OperationBtnGroup 一致；示例路径 pubRegulatoryAccount；代码基线 b6bf87d）
- 涉及文件：utils/flowApi.js、OperationBtnGroup/index.vue、ZsSubmit/index.vue、zs-approval/index.vue、tool/workflow/index.vue、ConfigDialog.vue、zhi2-web-admin/src/views/benefit/components/ApprovalProcessDialog.vue、zhi2-web-admin/src/views/benefit/pubRegulatoryAccount/detail.vue
- 所属项目：园区公共收益；代码基线：479ebe7；来源会话：51f3071e-0992-4ca2-b14d-e0fa6c2d181d

<!-- MEMORY_FIELDS
{
  "category": "园区公共收益技术",
  "name": "提交审批URL迁flowApi",
  "source_extraction_id": "1e816f9fc3aa4168b1160713b0d4dc9c",
  "version": 2,
  "memory_type": "entities"
}
-->