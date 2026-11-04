# 具有可配置接口和参数传递的区域树
组件 region-tree-layout 接收 treeUrl 和 treeParams，并将其传递给 regionTree.vue，为空时采用 fallback。

## Description
- index.vue 为 region-tree-layout 定义 tree-url='/system/dept/complexTree' 和 :tree-params='{}'
- RegionTreeLayout.vue 新增 props treeUrl 和 treeParams，并传递给 regionTree.vue
- 当 treeParams 为空时，不发送任何查询参数
- 接口返回与现有组件兼容的 id/label/children 结构

## Purpose
- 使区域树可通过 URL 和参数配置，同时保持兼容性

## Relations
- 涉及文件: property/workOrder/order/index.vue, property/complex/components/RegionTreeLayout.vue, property/complex/components/regionTree.vue, mixins/listMixins.js, mixins/table.js
- Cursor 会话: ca01e574-0616-48a5-8f5a-4a6bbe304b4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_passthrough",
  "source_extraction_id": "c5b76c7f353b4c2186e12cd717b9e62b",
  "version": 1,
  "memory_type": "entities"
}
-->