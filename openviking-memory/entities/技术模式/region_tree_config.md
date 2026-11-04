# 用于工单的可配置区域树
region-tree-layout 组件接受可配置的树 URL 和参数，并传递给 regionTree.vue。

## Description
- index.vue 在 region-tree-layout 中定义 tree-url='/system/dept/complexTree' 和 :tree-params='{}'
- RegionTreeLayout.vue 暴露 treeUrl 和 treeParams 属性，传递给 regionTree.vue
- 当 treeParams 为空时，不向接口发送任何查询参数

## Purpose
- 使区域树可由工单列表页面配置

## Relations
- 响应兼容现有组件的 id/label/children 结构
- 涉及文件: property/workOrder/order/index.vue, complex/components/RegionTreeLayout.vue, complex/components/regionTree.vue, mixins/listMixins.js, mixins/table.js
- 光标会话: ca01e574-0616-48a5-8f5a-4a6bbe304b4b

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_config",
  "source_extraction_id": "e8a7bac845c54be09b1a363a7c43e8e5",
  "version": 1,
  "memory_type": "entities"
}
-->