# 禅道 Bug 6418
禅道缺陷 6418 经历 Ref8443 演示数据问题、重开暴露待提交/已提交筛选缺陷、前端修复后回退改派后端修复的完整过程。

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

## 当前状态
- 禅道 6418 为 active，assignedTo=liqiang，等待后端 service-expand 补充筛选参数或修复数据返回。
- 前端改动保持回退状态；bizState→tab 映射属前端职责无法移除，按 tab 筛选若后端支持参数应交后端。

<!-- MEMORY_FIELDS
{
  "category": "zentao_bug",
  "name": "zentao_bug_6418",
  "source_extraction_id": "3dc6568a32f64189b049ae2b833fb8ac",
  "version": 4,
  "memory_type": "entities"
}
-->