# 会话查询插件
DSH（DeepSeek Harness）的会话查询工具插件，插件 id 为 optional-tool-session-query。

## 功能
- 插件 dsh-tool-session-query（lib L955）注册 5 个工具：session_search、session_event_search、session_trace、session_event_trace、session_event_read。
- 禁用 optional-tool-session-query 会移除该插件注册的全部 5 个 session_* 工具。

## 配置
- 全局禁用写在 dsh web profile 配置 ~/.dsh/profiles/web/cordis.patch.yml 顶层：- id: optional-tool-session-query / disabled: true。
- 2026-11-14 实施后 --dump-config 验证 disabled:true，预计每步减少约 1,254 token。

<!-- MEMORY_FIELDS
{
  "category": "技术组件",
  "name": "session_query_plugin",
  "source_extraction_id": "e9e2df348a7b4f8f9fd5b13664775b77",
  "version": 1,
  "memory_type": "entities"
}
-->