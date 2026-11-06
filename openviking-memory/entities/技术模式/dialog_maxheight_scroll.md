# 弹窗左栏限高超出滚动
在弹窗左栏（标题+搜索+树）设置 `max-height` 并让白底区域 `overflow-y: auto`，实现超出滚动且标题固定。
## 改动说明
- `.sort-left` 设 `max-height: min(560px, calc(72vh - 160px))` 与 `min-height: 0`，随视口缩小且允许收缩。
- `.sort-left-body` 设 `min-height: 0`、`overflow-y: auto`、`overflow-x: hidden`，白底区域滚动。
- 标题固定在上方，超出部分在白底区域内滚动；`deptTree` 内 `.tree-wrap` / `el-tree` 仍可滚动。
## 验证与归属
- 验证证据：extracted source=cursor project=产品2.0
- 涉及文件：selectRangeDialog.vue、deptTree.vue
- 所属项目：产品2.0；来源会话：3fda1aa5-47de-48e9-8ced-e2755c0ecb88；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "dialog_maxheight_scroll",
  "source_extraction_id": "2d4686a934d3454e8470a4b3531e3d9b",
  "version": 1,
  "memory_type": "entities"
}
-->