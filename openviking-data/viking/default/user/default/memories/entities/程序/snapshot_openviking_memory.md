# snapshot_openviking_memory
OpenViking 记忆快照脚本，在全部导入完成后执行并提交推送到本地仓库。

## 描述
- 脚本路径为 `D:\repository\skills\scripts\snapshot-openviking-data.mjs`。
- 全链路导入完成后运行，带 `--commit --push` 参数
- 输出目标为 `D:\repository\skills\openviking-memory`

## 关系
- 属于 OpenViking 记忆导入工具链的收尾环节，在 import-local-sources.mjs / import-to-ov.mjs 之后执行
- 被 Windows 计划任务 OpenViking-Memory-Snapshot 每天 03:00 调用（顺序②，与 snapshot-openviking-data.mjs 并列）

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "snapshot_openviking_memory",
  "source_extraction_id": "4d95a7db424b4cacb4344294a41d299d",
  "version": 3,
  "memory_type": "entities"
}
-->