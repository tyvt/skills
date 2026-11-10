# ZenTao Bug 6426
禅道缺陷 6426：求援工单（rescue work order）列表纯文案修改任务。

## Description
- 模块：求援工单列表（`src/views/flood/rescue/index.vue`）。
- 修改项：状态列 label「业务状态」→「工单状态」；操作列查看按钮 label「详情」→「查看」。
- 性质：纯文案改动，未动表单/接口/流程，按简单 Bug 流程处理，未加载 szfc-page-guard。

## Fix
- 在子模块 `zhi2-web-admin` 的 `bug5897` worktree（实际 `develop/v2.6.2-suzhufang-li` 分支落点）修改文件。
- 主检出为 detached HEAD，改动提交于 `bug5897` 后同步主检出并刷新父仓 gitlink。
- 提交：子模块 `6665aee85`（推送 origin）；父仓 gitlink `97d1017`（推送 origin）。
- ESLint 单文件校验通过（exit 0）。

## Resolution Status
- 禅道缺陷 6426 回写已完成：2026-11-10 DBX 事务化写回，status=active→resolved/fixed、resolvedBy=tiany、resolvedBuild=trunk、assignedTo=lichandan（退回报告人 openedBy=lichandan）、解决时间 2026-11-10 21:28:09。
- 事务含 UPDATE zt_bug + INSERT zt_action（14 列，files=NULL），事务内 + 提交后双重复核落库。
- 关联：product=79、project=141、execution=142。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6426",
  "source_extraction_id": "b207853aafb6424bbe77c58d64034b87",
  "version": 1,
  "memory_type": "entities"
}
-->