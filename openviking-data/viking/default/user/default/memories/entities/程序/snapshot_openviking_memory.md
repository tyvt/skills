# snapshot_openviking_memory
OpenViking 记忆快照脚本，在全部导入完成后执行并提交推送到本地仓库。

## 描述
- 全链路导入完成后运行，带 `--commit --push` 参数
- 输出目标为 `D:epository\skills\openviking-memory`

## 关系
- 属于 OpenViking 记忆导入工具链的收尾环节，在 import-local-sources.mjs / import-to-ov.mjs 之后执行
- 被 Windows 计划任务 OpenViking-Memory-Snapshot 每天 03:00 调用（顺序②，与 snapshot-openviking-data.mjs 并列）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "snapshot_openviking_memory",
  "source_extraction_id": "7ab171ffd54748fc90dd07f7ad5c3fc0",
  "version": 2,
  "memory_type": "entities"
}
-->