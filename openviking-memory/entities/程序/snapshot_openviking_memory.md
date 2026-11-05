# snapshot_openviking_memory
OpenViking 记忆快照脚本，在全部导入完成后执行并提交推送到本地仓库。

## 描述
- 全链路导入完成后运行，带 `--commit --push` 参数
- 输出目标为 `D:epository\skills\openviking-memory`

## 关系
- 属于 OpenViking 记忆导入工具链的收尾环节，在 import-local-sources.mjs / import-to-ov.mjs 之后执行

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "snapshot_openviking_memory",
  "source_extraction_id": "feb0f8a0282f43beb0cbb0b2cc1e0f25",
  "version": 1,
  "memory_type": "entities"
}
-->