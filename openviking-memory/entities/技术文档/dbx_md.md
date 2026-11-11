# DBX.md
zentao-analyzer 技能下的 DBX 查询文档，位于 D:\repository\skills\zentao-analyzer\DBX.md。

## 目的
- 规范 DBX 工具调用，避免执行侧翻车。

## 关键内容（2026-11-10 更新）
- 固定调用模板：dbx_execute_query 必须带 connection_name（无论有无 session_id），附反例错误原文
- 反例 1：tool 名误用 "query" 导致 dbx: tool not found（正确为 dbx_execute_query）
- 反例 2：仅传 session_id 漏 connection_name 导致 CONNECTION_NOT_FOUND

## 关联
- 属于 zentao-analyzer 技能，与 skills_repo 同仓库


<!-- MEMORY_FIELDS
{
  "category": "技术文档",
  "name": "dbx_md",
  "source_extraction_id": "c90ece93bbe24ec7a37656fc59cb0ff1",
  "version": 1,
  "memory_type": "entities"
}
-->