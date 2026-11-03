# 区域树布局默认选中与缓存对齐
园区物管2.0 的 RegionTreeLayout 需默认选中顶级、只展开两级，并将树选中状态接入 listMixins 的 cachedSearchParams 缓存体系。
## 现象
- 区域/部门树布局要求默认选中最高上级、只展开到二级、切走切回保持选中、关标签重开回默认、其他页互不影响、树区可滚动。
- 若 default-expand-level 设 2 会错误展开到第三级。
## 根因
- Element Tree 的 default-expand-level 从 1（根）开始计数，想只展开两级应设 1 而非 2。
- 列表页筛选状态记忆已有 listMixins + common/cachedSearchParams 按 $route.path 缓存体系，树组件不应另造一套。
## 解决方案
- 树加载完默认选中 treeData[0] 并触发 nodeClick 按顶级筛选；缓存命中时通过 cachedParentDeptId 传给 region-tree 的 initial-selected-id 恢复选中且不重复触发 getList。
- 缓存已清（关标签/其他页首开）自然回顶级；滚动容器设在外层 .type-left-tree（overflow-y:auto），内部树包裹层 height:auto 避免双层滚动。
## 关联信息
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、regionTree.vue。
- 所属项目：园区物管2.0；来源会话：47c0000a-51d9-4a99-82c5-48d1b26e9c97；代码基线：7fe15a8cb。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_layout",
  "source_extraction_id": "d666360db8d5471ab075b4f725e5c78b",
  "version": 1,
  "memory_type": "entities"
}
-->