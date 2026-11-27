---
audit_status: valid
last_checked: 2026-11-27T17:54:13+08:00
verdict_note: 苏住房防汛C端 flood.ts 含 bizStatesParam、bizState 映射及 bug 6418 注释，与禅道 6418 修复描述一致。
---
# 禅道 Bug 6418
禅道缺陷 6418 经历 Ref8443 演示数据问题、重开暴露待提交/已提交筛选缺陷、前端修复回退改派后端、按重开决策重做前端修复并 resolved 写回的完整过程。

## Description
- 原始问题：test 构建开 VITE_UI_REF8443=true 导致历史/汛前填报/详情/求援整页被静态演示数据替换；2026-11-11 被 lichandan 重开（截图 fileID 22344），暴露真实逻辑缺陷：手持端汛前检查历史页「待提交」也显示在「已提交」下。
- 原始 Ref8443 修复：`.env.test` 中 `VITE_UI_REF8443` 改为 `false`，`isRef8443()` 在 `VITE_DATA_MODE=remote` 时固定返回 false；`npm run test` 34 单测通过，`uni build -m test` 完成，产物 `VITE_UI_REF8443` 为 `"false"`，包内已无「全部工单 (14)」。

## 根因
- `src/stores/flood.ts` 的 `inspectionRowToRecord` 对每条记录无条件写死 `status: 'submitted'`，忽略后端 `bizState`（0=待提交/1=已提交/2=备案完成）。
- `fetchHistoryRemote` / `countHistory` 从未将 status 筛选传给后端，远程模式待提交/已提交无法分离。
- 合同 `/inspection/page` 仅返回每行 `bizState`，未文档化任何 bizState/status 过滤参数。

## 处理时间线
- 助手提交 d38f648（flood.ts + 测试）并推送 origin/dev，经 DBX 将禅道 6418 置 resolved/fixed、assignedTo=lichandan、zt_action 90837。
- 用户要求改后端而非前端兜底，助手回退前端改动为 a20d87f 并推送（d38f648..a20d87f）。
- 禅道 6418 重开为 active，assignedTo 改为 liqiang，zt_action 90855 记录 reopened 及后端修复建议。
- 助手按重开决策重做前端修复并提交 `26c2892` 推送 origin/dev（分支 dev，单 worktree）：`inspectionRowToRecord` 按 `bizState` 映射（0→待提交、1/2→已提交、缺失→已提交回落，`getRecordAsync` 共用），新增 `bizStatesParam` 在 `fetchHistoryRemote`/`countHistory` 按 tab 透传 `bizStates=0`/`1,2`/不传（all）。
- 新增 `tests/flood-remote.test.ts` 3 用例；vitest 21/21 通过（原 18 + 新增 3）；无 ESLint flat config 未跑 lint，构建未执行。
- 用户要求提交推送并标记 resolved 指给测试。

## 当前状态与写回
- 前端已按重开决策重做并推送（26c2892 → origin/dev）；仍需 liqiang 部署 `v2.0/safety/flood/inspection/page` 的 `bizStates` 多选参数彻底闭环。
- 禅道写回方案：resolution=fixed、resolvedBy=tiany、assignedTo=openedBy=lichandan；元数据 product=79、project=141、execution=142、openedBy=lichandan。
- 项目 141 测试人员为 zhunan、zszhangguojian、lichandan；lichandan 兼报告人，指派回她符合「指给测试」与 ZenTao verify 流程。
- 2026-11-11 会话末已开启新禅道 DBX 事务 session 准备 UPDATE/INSERT 写回（结尾未显示 COMMIT 确认）。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6418",
  "source_extraction_id": "6f28addd109f4ba790f22cb4cbc5a842",
  "version": 5,
  "memory_type": "entities"
}
-->