# 禅道Bug 6105 价格备案变更详情流程记录为空
房产管理系统价格备案申请变更详情侧栏「流程记录」为空，后端备注指向 presale/acLog/acLogHistory。

## 根因
- 变更详情页 changeDetail.vue 未设置 `:show-audit="false"`
- 默认「流程查看」走 ApprovalProcess（Flowable），而价格备案变更应走 acLogHistory（showApproval）
- 后端备注指向 `presale/acLog/acLogHistory` 接口

## 修复状态
- 已确认 worktree 内子模块可编辑
- 已实现 `showApproval` 与 `changeDetail` 的改动（进行中）
- 根因已定位，正在修复（截至 2026-11-03）

## 相关上下文
- 用户于 2026-11-03 提交禅道 Bug 6105 链接发起分析
- 与价格备案流程记录相关的历史缺陷见 zentao_bug_6059 等

<!-- MEMORY_FIELDS
{
  "peer_id": "gitlab.zhi.com-zhi-suzhou-shiqu-fangdichan-fe-zhi3-web-admin-h5-g-unlimited",
  "category": "缺陷任务",
  "name": "zentao_bug_6105",
  "source_extraction_id": "90d2bde119644ee4b32ffa417b714c39",
  "version": 1,
  "memory_type": "entities"
}
-->