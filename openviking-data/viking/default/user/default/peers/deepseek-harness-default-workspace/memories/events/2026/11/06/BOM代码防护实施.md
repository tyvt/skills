# Summary
助手向 memory-migration/import-to-ov.mjs 新增 stripBom、readJsonFile、writeDoneFile；读盘经 readJsonFile 去除 \uFEFF 后再 JSON.parse，写 done 文件用 utf8 不写 BOM；批量处理 99 个 %TEMP%\done-ov-cursor-*.json 文件剥离 BOM，无法解析的按 [] 重写（2026-11-06）。
# 2026-11-06 (Friday) ChatLog:
**user [peer=deepseek-harness-default-workspace]**: 去 BOM + 代码防 BOM，再 补跑失败项
**assistant [peer=deepseek-harness-default-workspace]**: 正在实现 BOM 去除与代码防护，并补跑失败项目；先定位仓库根与 `import-to-ov.mjs` 中所有 JSON 读取点。
...
**assistant [peer=deepseek-harness-default-workspace]**: 正在向 `import-to-ov.mjs` 添加 BOM 剥离 helper，并批量修复 `%TEMP%\done-ov-cursor-*.json`，随后补跑失败项目。
...
**assistant [peer=deepseek-harness-default-workspace]**: 已完成下列动作：

### 1. 代码防 BOM（[`memory-migration/import-to-ov.mjs`](memory-migration/import-to-ov.mjs)）
- 新增 **`stripBom`**、**`readJsonFile`**、**`writeDoneFile`**。
- **读** dist 批次、`--skip`/`done` 进度时一律经 `readJsonFile`（去掉 `\uFEFF` 再 `JSON.parse`）。
- **写** `done` 用 `writeFileSync(..., { encoding: 'utf8' })`，**不写 BOM**。

### 2. 批量去 BOM（`%TEMP%\done-ov-cursor-*.json`）
- 已处理 **99** 个文件：剥离 BOM，无法解析的按 `[]` 重写。

### 3. 队列与门禁
- `ov-cancel-stuck-commit-tasks`：**cancelled 0**（无残留待标取消）。
- preflight **`OV_MAX_COMMIT_QUEUE=64`**：**ok**，`commit_queue=41`。...

<!-- MEMORY_FIELDS
{
  "event_name": "BOM代码防护实施",
  "goal": "实施BOM代码文件修复",
  "summary": "助手向 memory-migration/import-to-ov.mjs 新增 stripBom、readJsonFile、writeDoneFile；读盘经 readJsonFile 去除 \\uFEFF 后再 JSON.parse，写 done 文件用 utf8 不写 BOM；批量处理 99 个 %TEMP%\\done-ov-cursor-*.json 文件剥离 BOM，无法解析的按 [] 重写（2026-11-06）。",
  "ranges": "7-8,13,23-26",
  "source_extraction_id": "c64bd2469e134b1ba893e72e0a24d2a5",
  "version": 1,
  "memory_type": "events"
}
-->