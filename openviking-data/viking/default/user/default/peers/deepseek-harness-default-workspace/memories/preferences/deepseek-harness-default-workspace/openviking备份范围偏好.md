- 要求所有影响记忆质量的数据都备份到 Git，包括 sessions 与 vectordb，不能只备份 memories/ 与 peers/*/memories/。
- 原始导出文件（cursor/workbuddy/opencode 会话）也应纳入 Git 备份，但须放在独立顶层目录（如 memory-migration-archive/），不混入 openviking-data/ 纯镜像。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "OpenViking备份范围偏好",
  "source_extraction_id": "5f0deedf3a1348f0950086f0dbf8d58a",
  "peer_id": "deepseek-harness-default-workspace",
  "version": 2,
  "memory_type": "preferences"
}
-->