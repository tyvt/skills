# 区域树布局组件 RegionTreeLayout
园区物管2.0 的 RegionTreeLayout.vue 内聚侧边栏布局逻辑，并需默认选中顶级、只展开两级，接入 listMixins 缓存体系。

## 组件职责
- `regionTree.vue` 仅负责区域树数据与交互。
- `RegionTreeLayout.vue` 内聚：左侧区域树面板（搜索框 + regionTree）、展开/收起侧边栏（含动画）、树状/平铺展示开关、B 端终端类型判断、`reset()` 方法（清空搜索、重置树选中）。
- 父页面用法：通过 `<region-tree-layout :flat.sync="value" @node-click="nodeClick" ref="regionTreeLayout">` 包裹原列表内容；父页面仅保留 `value`（树状/平铺模式）、`nodeClick` 回调、`handleRangeReset` 中调用 `this.$refs.regionTreeLayout?.reset()`。
- 已完成 16 个页面迁移，包括 complex/index.vue、complexChange/index.vue、complexBuildingAuth/index.vue、syncObligee/index.vue 等。

## 现象与缓存对齐
- 区域/部门树布局要求默认选中最高上级、只展开到二级、切走切回保持选中、关标签重开回默认、其他页互不影响、树区可滚动。
- 若 default-expand-level 设 2 会错误展开到第三级。

## 根因
- Element Tree 的 default-expand-level 从 1（根）开始计数，想只展开两级应设 1 而非 2。
- 列表页筛选状态记忆已有 listMixins + common/cachedSearchParams 按 $route.path 缓存体系，树组件不应另造一套。

## 解决方案
- 树加载完默认选中 treeData[0] 并触发 nodeClick 按顶级筛选；缓存命中时通过 cachedParentDeptId 传给 region-tree 的 initial-selected-id 恢复选中且不重复触发 getList。
- 缓存已清（关标签/其他页首开）自然回顶级；滚动容器设在外层 .type-left-tree（overflow-y:auto），内部树包裹层 height:auto 避免双层滚动。

## 关联信息
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、regionTree.vue 及 16 个迁移页面。
- 所属项目：园区物管2.0；来源会话：47c0000a-51d9-4a99-82c5-48d1b26e9c97、7fe70b14-eb68-49c3-87b6-e00e6b7abf8f；代码基线：7fe15a8cb。

## 验证与归属
- 验证证据：extracted source=cursor project=园区物管2.0


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_layout",
  "source_extraction_id": "5b28c23ba34f4fcf8f92896fe45914b5",
  "version": 2,
  "memory_type": "entities"
}
-->
