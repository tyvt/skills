- `detail-container` 原滚动会引发与 `app-main` 双层滚动条冲突，须避免直接滚动外层容器。
- `detail-container` 设 `overflow: hidden` 且 `height: calc(100vh - 120px)`，滚动移交内层 `detail-from-container`（`flex:1; min-height:0; overflow-y:auto`）。
- 移除 `OperationBtnGroup` 的 `position: sticky`，避免内层滚动异常（验证：src=苏州市房地产监测V3/135.md；来源会话 057dc9a5-e1bd-4c11-b65c-c659a035ce17）。

## 验证与归属
- 所属项目：苏州市房地产监测V3
- 验证证据：extracted source=cursor project=苏州市房地产监测V3


<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "detail-container滚动规范",
  "source_extraction_id": "d1b43200925c4df49770b0ec94e83ec7",
  "version": 1,
  "memory_type": "preferences"
}
-->
