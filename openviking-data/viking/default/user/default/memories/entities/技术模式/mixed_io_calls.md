# 慢 I/O 与快调用混批根因
将慢 I/O 与快调用混在同一批次处理会导致问题，此为需记录的工程经验。

## 问题根因
- 根本原因是把慢 I/O 和快调用混在同一批里，使批次整体受慢操作拖累或引发错误。

## 经验总结
- 慢 I/O 与快调用应分离到不同批次或队列处理，避免混合在同一批。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "mixed_io_calls",
  "source_extraction_id": "be74e43c3e1542dfb919150a55d62ae8",
  "version": 1,
  "memory_type": "entities"
}
-->