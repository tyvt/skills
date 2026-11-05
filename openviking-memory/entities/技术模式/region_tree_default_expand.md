# 部门树默认选中顶级且只展开二级
园区物管2.0 物业复杂页面 regionTree 组件调整默认选中与展开行为。

## 需求与改动
- default-expand-level 由 2 改为 1（Element Tree level 1 为根，只展开两级不再展开到第三级）
- 树加载完成默认选中 treeData[0]（最上级部门），无缓存时触发 nodeClick 按顶级部门筛选
- 本页记忆/关闭重置/其它页默认顶级：沿用 listMixins + common/cachedSearchParams（按 $route.path）及标签关闭时 removeSearchParams
- 切换回未关标签从缓存读 parentDeptId 恢复选中不重复触发 getList；关标签再开回顶级
- 通过 cachedParentDeptId 传给 region-tree 的 initial-selected-id
- 树区域滚动容器改为 .type-left

## 验证与归属
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、regionTree.vue、src/views/property/complex/index.vue
- 所属项目：园区物管2.0
- 来源会话ID：47c0000a-51d9-4a99-82c5-48d1b26e9c97

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_default_expand",
  "source_extraction_id": "ca96a95541ed44c7b78f9358b4b4b46d",
  "version": 1,
  "memory_type": "entities"
}
-->