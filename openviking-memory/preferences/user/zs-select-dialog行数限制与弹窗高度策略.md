- 限制 zs-select-dialog 表格可视高度最多 10 行（SELECT_DIALOG_MAX_VISIBLE_ROWS = 10），每页 20 条时超出部分在 tbody 内滚动，弹窗不被撑出视口
- 恢复 zs-dialog 默认的 88vh 高度限制，移除弹窗无限撑高样式
- 保留 refreshTableLayout() 在数据加载后重算表格和弹窗布局
- 适用于园区公共收益项目 zhi2-web-admin

<!-- MEMORY_FIELDS
{
  "user": "user",
  "topic": "zs-select-dialog行数限制与弹窗高度策略",
  "source_extraction_id": "ba7d59c85b1e426abf2d99029459c78e",
  "version": 1,
  "memory_type": "preferences"
}
-->