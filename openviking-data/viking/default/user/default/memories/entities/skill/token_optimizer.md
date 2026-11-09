# token-optimizer
DSH 技能，用于从 dsh-context 投影缓存生成可复跑的 token 优化清单。

## 目的
- 将 token 消耗审计与归因沉淀为可执行 SOP，输出等效成本 TOP 表、低缓存会话清单与模型成本榜。

## 实现
- 位于 D:/repository/skills/token-optimizer，含 SKILL.md 与 analyze.mjs。
- analyze.mjs 零依赖读取 ~/.dsh/storages/session_projcache/sessions 同源数据。

## 关系
- 数据源与 dsh-context 插件面板一致，2026-11-09 由 deepseek-harness-default-workspace 会话创建并提交 git。


<!-- MEMORY_FIELDS
{
  "category": "skill",
  "name": "token_optimizer",
  "source_extraction_id": "015982f6acda4ee1b43529e0a9b4cd38",
  "version": 1,
  "memory_type": "entities"
}
-->