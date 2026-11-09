# snapshot_openviking_data
OpenViking 全量质量数据快照脚本，由 Windows 计划任务每日调用。

## 描述
- 生成全量质量 data 快照
- 拷贝 vectordb 前会短暂停 `openviking-server` 服务再拉起

## 关系
- 被 `run-openviking-snapshots.ps1` 包装，作为每日计划任务顺序①执行
- 与 `snapshot-openviking-memory.mjs` 并列由计划任务每天 03:00 调用

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "snapshot_openviking_data",
  "source_extraction_id": "7ab171ffd54748fc90dd07f7ad5c3fc0",
  "version": 1,
  "memory_type": "entities"
}
-->