# 树面板边框高度固定修复
园区物管2.0 中左侧树面板（区域树）边框高度已改为不随节点数量变化，始终固定。

## 问题原因
- `.type-left` 使用 `align-self: flex-start`，高度会随内容收缩
- `.tree-wrap` 被覆盖为 `height: auto`，树区域不会撑满容器

## 修改方案
- 去掉 `align-self: flex-start`，为 `.type-left` 设置固定 `height` / `min-height` / `max-height: calc(100vh - 180px)`，边框高度保持恒定
- 将 `.tree-wrap` 改回 `height: 100%` 和 `overflow: auto`，节点少时在固定区域内滚动，而不是压矮整个边框
- 数据少时左侧边框保持 `calc(100vh - 180px)` 高度；数据多时在 `.type-left-tree` 内滚动

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue；zhi2-web-admin/src/views/property/complex/components/regionTree.vue
- 所属项目：园区物管2.0；来源会话：bb65a7e2-6e02-4948-ae2d-480611ff86ef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_panel_fixed_height",
  "source_extraction_id": "a3b4d96863af4d6c83ce3353de8d51c8",
  "version": 1,
  "memory_type": "entities"
}
-->