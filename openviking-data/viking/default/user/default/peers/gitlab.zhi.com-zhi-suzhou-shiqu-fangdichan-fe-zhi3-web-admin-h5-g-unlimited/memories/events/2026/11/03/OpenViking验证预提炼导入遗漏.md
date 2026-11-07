# Summary
2026-11-02 验证 BatchAddMessageRequest maxItems=100；将带 type/files/evidence/sessionIds/baseline 的预提炼记忆原样导入 OpenViking 时，VLM 仅保留语义分类与关键落地文件，丢失 sessionIds、baseline、evidence 原文及部分路径；批量 3 条仅写入 1 条、更新 1 条、丢失 1 条，证实用覆盖合并导致信息遗漏。
# 2026-11-03 (Tuesday) ChatLog:
2026-11-02 验证 BatchAddMessageRequest maxItems=100；将带 type/files/evidence/sessionIds/baseline 的预提炼记忆原样导入 OpenViking 时，VLM 仅保留语义分类与关键落地文件，丢失 sessionIds、baseline、evidence 原文及部分路径；批量 3 条仅写入 1 条、更新 1 条、丢失 1 条，证实用覆盖合并导致信息遗漏。

<!-- MEMORY_FIELDS
{
  "event_name": "OpenViking验证预提炼导入遗漏",
  "goal": "记录导入缺陷验证",
  "summary": "2026-11-02 验证 BatchAddMessageRequest maxItems=100；将带 type/files/evidence/sessionIds/baseline 的预提炼记忆原样导入 OpenViking 时，VLM 仅保留语义分类与关键落地文件，丢失 sessionIds、baseline、evidence 原文及部分路径；批量 3 条仅写入 1 条、更新 1 条、丢失 1 条，证实用覆盖合并导致信息遗漏。",
  "ranges": "0",
  "source_extraction_id": "bee96469eef746da9f0a87a46cff2e91",
  "version": 1,
  "memory_type": "events"
}
-->