# ZenTao Bug 6372
禅道缺陷 6372：开发企业管理 → 企业变更管理，主管部门审核通过后详情页仍错误显示「提交」按钮。

## Description
- 模块：开发企业管理 → 企业变更管理（企业变更详情页 `@/views/toB/companyRecord/detail.vue`）。
- 现象：主管部门（审核方）审核/批准后，页面仍出现「提交」按钮，按设计不应出现。

## Root Cause
- 提交按钮可见性 `showSubmitBtn` 依赖 `shouldShowAgencyChangeSubmit(this.form)`，该函数内部用 `resolveAgencyChangeToolbarBizState(form) === '0'`（待提交/草稿）判断。
- 该函数基于 `displayStatus` 字段；开发方变更数据模型使用 `bizState` 而非 `displayStatus`，且 `displayStatus` 未赋值（undefined）。
- 函数将 undefined 的 `displayStatus` 回退视为草稿 '0'，导致审核后（`bizState='2'`）仍返回 '0' → 按钮错误显示。
- 开发页面 `changeBizState` 取 `String(change.bizState ?? '0')`，是开发变更的真正状态，但按钮逻辑未使用它。

## Fix
- 将 `showSubmitBtn` 与 `showChangeEditBtn` 的显隐条件改为基于 `this.changeBizState === '0'`（待提交）。
- 移除不再使用的 `resolveAgencyChangeToolbarBizState` / `shouldShowAgencyChangeSubmit` 导入。
- 在独立 worktree 中修改：主仓 worktree + 子模块专用分支 `fix/bug-6372-developer-change-submit-btn`。
- 提交：子模块 `c4c8f2e6b`（修复），父仓 gitlink `11ffa3f4d`；均推送至 origin（`-u` 设上游）。

## Resolution Status
- 代码已提交并推送（截至 2026-11-09 会话）。
- 禅道缺陷 6372 确认：status=active、product=2、project=200、execution=201、openedBy=lichandan。
- 计划回写：assignedTo=lichandan、resolvedBy=tiany；DBX 事务化 UPDATE zt_bug + INSERT zt_action 进行中（会话结束前未完成，需 connection_id + session_id 绑定事务）。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6372",
  "source_extraction_id": "29c055ed7bcf4c31b9fa5a9506ed7533",
  "version": 2,
  "memory_type": "entities"
}
-->