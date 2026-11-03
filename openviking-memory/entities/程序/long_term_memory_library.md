# long-term-memory 记忆库
位于 D:\repository\skills\long-term-memory 的 AGENTS.md 引用记忆库，曾作为 DeepSeek Harness 的长期记忆方案。

## 损坏状态
- 2026-11-02 发现 221 个 md 文件中 202 个为零填充（全 0x00 NUL）损坏，仅 19 个正常
- 损坏自首次提交 f68cd9e 起即存在，本地 HEAD（fbe7869）与远程 origin/main 同为损坏内容，无可恢复好版本
- 历史提交 c389b8d 曾修复同类"零填充"事故，说明为反复发生问题

## 关系
- 原属 DeepSeek Harness 长期记忆，现由 OpenViking 替代
- 修复需删除零填充残骸重建，旧经验实质已丢失

<!-- MEMORY_FIELDS
{
  "category": "程序",
  "name": "long_term_memory_library",
  "source_extraction_id": "76e15299e6404cf8a65083de3a631b32",
  "version": 1,
  "memory_type": "entities"
}
-->