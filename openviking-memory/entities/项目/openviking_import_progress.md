# OpenViking Cursor 历史导入进度（2026-11-07）

## 覆盖面
- Cursor 会话项目数：**99**（`sessions.jsonl`）
- 有 distill 草稿项目：**72**；零草稿（去重/无可抽取）：**27**
- 可导入唯一标题：**2586**；`done-ov-cursor-*` 与 distill 对照 **missingTitles=0**
- 补跑 job `pwsh-918417bfc7db4dcb`：**completed exit 0**（2026-11-07）

## 质量治理（本轮）
1. **葡语路径**：`audit-pt-final` → **ptDirs/ptPaths/ptBody = 0**；葡语路径已迁至 `entities/技术模式/ts_inline_semicolon.md`
2. **溯源补全**：`patch-ov-cursor-evidence.mjs --apply` 按 sessionId 对齐，**3218** 条补 `extracted source=cursor`
3. **状态文件**：`refresh-cursor-import-state.mjs` 重算 `%TEMP%/import-local-sources-state.json`

## 运维备注
- 定时监控 `schedule-1dc49c3b…` 已 **paused**
- 导入口径：以 **title/done** 为准

## 验证与归属
- 验证证据：extracted source=cursor project=memory-migration
- 审计：`memory-migration/out/cursor-evidence-patch-report.json`

<!-- MEMORY_FIELDS
{
  "category": "项目",
  "name": "openviking_import_progress",
  "version": 1,
  "memory_type": "entities"
}
-->
