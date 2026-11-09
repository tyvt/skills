# RegionTreeLayout 公共组件
园区物管2.0 将 16 个列表页的「左侧区域树+右侧列表+展开/收起+树状/平铺切换」布局收敛为 RegionTreeLayout 组件。
## 问题背景
- 16 个页面各自实现区域树布局，加展开收起动画时逻辑分散、宽度过渡与右侧内容联动脱节（展开卡顿、宽度先变完右侧才联动）。
- 各页重复拷贝 treeFilterText、treeRenderKey、changeType 及侧边栏样式。
## 组件设计
- RegionTreeLayout.vue 内聚左侧区域树面板（搜索框+regionTree）、展开/收起（含动画）、树状/平铺开关、B 端终端类型判断、reset() 方法（清空搜索、重置树选中）。
- regionTree.vue 仍只负责树数据与交互。
- 页面用法 <region-tree-layout :flat.sync="value" @node-click="nodeClick" ref="regionTreeLayout"> 包住 zs-search-form + zs-table，handleRangeReset 调 this.$refs.regionTreeLayout?.reset()。
## 迁移与范式
- 已迁移 16 个文件（property 4 个 + benefit 12 个），后续新页面直接复用。
- 这是用户明确要求的「逻辑内聚到组件内部」改造范式。
- 来源会话：7fe70b14-eb68-49c3-87b6-e00e6b7abf8f；代码基线：7fe15a8cb。

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "region_tree_layout",
  "source_extraction_id": "1f662bebc4374dd8995f6b2e861fa44a",
  "version": 1,
  "memory_type": "entities"
}
-->