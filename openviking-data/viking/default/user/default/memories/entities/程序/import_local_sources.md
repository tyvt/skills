# import_local_sources
OpenViking 历史会话本地导入脚本，按源与项目把本地会话导入记忆系统。

## 描述
- 支持命令行参数控制导入范围，如 `--skip-extract`、`--sources=cursor`、`--from-project=产品2.0`、`--skip-distill-if-ready`
- 续跑日志写入 `%TEMP%\import-local-sources-resume.log`，段首标记 `======== CURSOR RESUME <时间> ========`
- 进度写入 import-local-sources-state.json，记录各源（如 Cursor）的 imported/memories 字段、已完成项目数与 finishedAt 时间
- 串行调用 import-to-ov.mjs 完成每批 preflight 与 commit
- 每跑一个项目在 `%TEMP%/done-ov-{源}-{项目}.json` 写落盘标记，仅记录成功写入的记忆；重跑经 `--skip=doneFile` 跳过已完成的标题实现断点续跑与回填
- 会话总目录 `memory-migration/out/sessions.jsonl` 收录全部会话（2026-11-09 审计共 6292 条）并标注 source+project，用作完整性核对分母
- 蒸馏阶段 `kept: 0` 表示会话极短无可提取记忆，按设计跳过，非数据丢失

## 已知缺陷
- 第119行 `ex.stdout.trim()` 在不带 `--skip-extract` 运行时会崩溃：子进程 `run()` 用 `stdio: "inherit"`，捕获的 `ex.stdout` 恒为 null；历史成功运行均带 `--skip-extract`

## 关系
- 属于 OpenViking 记忆导入工具链，与 import-to-ov.mjs、snapshot-openviking-memory.mjs、ov-cancel-stuck-commit-tasks.mjs 配合
- import-to-ov.mjs 已加 stripBom 读取 JSON，避免 BOM 导致 JSON.parse 失败

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "import_local_sources",
  "source_extraction_id": "9b041f4494a8441e97a9173275a180e4",
  "version": 4,
  "memory_type": "entities"
}
-->