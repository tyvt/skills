- DBX 查询前先查数据字典：ALL_TABLES / ALL_TAB_COLUMNS 各一次，替代多次表名/列名试错；Dameng 上 dbx_list_tables 的 pattern 参数会被忽略，直接查目录 SQL（SELECT TABLE_NAME FROM USER_TABLES WHERE TABLE_NAME LIKE '%X%'；列信息查 ALL_TAB_COLUMNS WHERE OWNER='<schema>' AND TABLE_NAME='<t>'）。
- dbx_execute_query 即使传了 session_id 仍必须传 connection_id，且首次调用也必须带 connection_id，否则 CONNECTION_NOT_FOUND；INSERT zt_action 严格照抄 14 列（files 列用 NULL 占位，列数不匹配是高频错误）。
- DBX connection_name 第三次复发（2026-11-10）证明文档约束对「顺手省略参数」行为无效；用户偏好用脚本或参数校验机制替代文档提醒（已封装 zentao-resolve.mjs）。
- DBX steps/comment 字段被 MCP 按 cell 200 字截断，应使用 UNION ALL 每段一行或 dbx_execute_and_show 拿全量，避免 SUBSTRING 分段仍不全。
- OpenViking detail 配置仅支持 mode=context；配 mode=list 会报 INVALID_ARGUMENT。

<!-- MEMORY_FIELDS
{
  "user": "deepseek-harness-default-workspace",
  "topic": "DBX查询与参数偏好",
  "source_extraction_id": "2db04767ba7f4eb4901f135a19dba987",
  "version": 1,
  "memory_type": "preferences"
}
-->