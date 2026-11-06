- 在 `maintenance` 目录下，所有 `<zs-table-column ...>` 上的 `:border="border"` 已全部移除，保留 `<zs-table ...>` 上的 `:border="border"`。
- 复查结果：`<zs-table-column>` 上残留 `:border="border"` 数量为 0。
- 额外跑了 lint，当前无新增报错。
- 示例文件 `zhi2-web-admin/src/views/maintenance/budget/components/voteTable.vue` 已应用此规则。
- 所属项目：园区物管2.0；来源会话：66524776-494d-48a6-ac48-a0938f101732；代码基线：none

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zs-table-column border 属性规范",
  "source_extraction_id": "cc4acf3026944bc4a35a55640ad46ac4",
  "version": 1,
  "memory_type": "preferences"
}
-->