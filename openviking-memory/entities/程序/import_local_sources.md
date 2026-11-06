# import_local_sources
OpenViking 历史会话本地导入脚本，按源与项目把本地会话导入记忆系统。

## 描述
- 支持命令行参数控制导入范围，如 `--skip-extract`、`--sources=cursor`、`--from-project=产品2.0`
- 续跑日志写入 `%TEMP%\import-local-sources-resume.log`
- 进度写入 import-local-sources-state.json，记录各源（如 Cursor）已完成项目数、记忆条数与 finishedAt 时间
- 串行调用 import-to-ov.mjs 完成每批 preflight 与 commit

## 关系
- 属于 OpenViking 记忆导入工具链，与 import-to-ov.mjs、snapshot-openviking-memory.mjs 配合

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "import_local_sources",
  "source_extraction_id": "c4e2d2032ea741779f68989ceae7057a",
  "version": 2,
  "memory_type": "entities"
}
-->