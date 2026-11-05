# 左侧树面板边框高度固定不随数据缩短
园区物管2.0 中 property/complex 左侧树面板边框高度原随节点数量收缩，已改为固定高度。

## 现象
- 左侧树面板边框高度随节点数量变化，数据少时边框被压矮
- .tree-wrap 被覆盖为 height:auto，树区域不撑满容器

## 根因
- .type-left 使用 align-self: flex-start，高度随内容收缩
- .tree-wrap 被覆盖为 height:auto，树区域不会撑满容器

## 解决方案
- 去掉 align-self: flex-start，为 .type-left 设置固定 height / min-height / max-height: calc(100vh - 180px)，边框高度保持恒定
- 将 .tree-wrap 改回 height:100% 和 overflow:auto，节点少时在固定区域内滚动

## 验证与归属
- 验证会话 bb65a7e2：调整样式后数据少时左侧边框保持 calc(100vh - 180px) 高度，数据多时在 .type-left-tree 内滚动
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、regionTree.vue
- 所属项目：园区物管2.0；来源会话：bb65a7e2-6e02-4948-ae2d-480611ff86ef；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "tree_border_height",
  "source_extraction_id": "793e90a635f3499bbab7253a2e8af34a",
  "version": 1,
  "memory_type": "entities"
}
-->