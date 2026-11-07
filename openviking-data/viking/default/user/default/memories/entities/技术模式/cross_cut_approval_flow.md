# 横切式审批流改造与一页一busCode架构冲突
苏住房G项目中，非本地机构走不同审批流的实现通过动态resolver横切多处，与既定「一页一busCode」架构冲突，需独立分支并整体回退。

## 问题现象
- 业务要求非本地机构走另一条审批流，实现加 resolver（resolveFlowBusCode/effectiveBusCode）在提交与审核前动态算流程编码
- 横切 zs-approval、ApprovalProcessDialog、mixins/approval.js、OperationBtnGroup 及多个详情页共 9+ 文件
- 动态 resolver 让同一页面不同数据走不同流程，前后端对账、E2E断言、要件挂载失去固定锚点，易「走错流程/流程未配置」

## 根因
- V3 架构约定「一个页面/菜单对应一个确定 busCode，从 route.meta 取」（已知 #295/#371/#512/#939）
- 动态解析把确定性编码变运行时求值，分支偏差难排查，与确定编码架构天然冲突

## 解决方案
- ①横切改造先做独立 feature 分支，主干不合，避免长期悬 develop
- ②确认不上时整分支回退：建备份分支（父仓与子模块各同名），develop 上 revert 提交，子模块与父仓分别提交、父仓只更新指针
- ③回退后 9 个消费方全部还原为 meta.busCode，grep 自检 localOrganizationFlow/resolveFlowBusCode/flowBusCode/effectiveBusCode 零引用
- ④列表列纯 UI 改动保留，不连 UI 一起回滚
- ⑤全量 lint 历史噪声与本次无关，别当回归

## 验证与归属
- 验证：会话 ab359fc6 备份分支 feature/non-local-approval-flow（子模块 d7a67ab/父仓 a6778f3）；develop/v2.6.2-suzhufang revert c1b1fa2a1 删 localOrganizationFlow.js 与 mixin，恢复多处为 route.meta.busCode；父仓 cc45c82 只更新指针未提交 env/.env；src 内已无相关引用
- 涉及文件：zhi2-web-admin/src/utils/localOrganizationFlow.js、mixins/localOrganizationFlowMixin.js、mixins/approval.js、components/zs-approval/index.vue、ApprovalProcessDialog.vue、OperationBtnGroup/index.vue 等 9 文件
- 所属项目：苏住房G；来源会话：ab359fc6-1781-4c5e-bea1-768d7797d2ba；代码基线：ad5bbd9

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "cross_cut_approval_flow",
  "source_extraction_id": "04514741d2024b92a72103d8b2d8e96e",
  "version": 1,
  "memory_type": "entities"
}
-->