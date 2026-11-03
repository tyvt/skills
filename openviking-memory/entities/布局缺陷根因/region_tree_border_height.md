# RegionTreeLayout 左侧树边框随节点变矮
园区物管2.0 物业 complex 页左侧树面板边框随节点数量收缩变矮，根因是 flex 对齐与 height:auto 覆盖。

## 现象
- 左侧树面板使用 align-self: flex-start 时高度随树节点数量收缩
- .tree-wrap 被覆盖为 height: auto 后树区域不撑满容器，边框「跟着数据变短」

## 根因
- align-self: flex-start 让面板高度由内容决定而非撑满父容器
- .tree-wrap 的 height: auto 覆盖使树区域无法撑满

## 解决方案
- 去掉 align-self: flex-start
- 为 .type-left 设置固定 height/min-height/max-height（如 calc(100vh - 180px)）
- .tree-wrap 使用 height: 100% + overflow: auto，节点少时在固定框内滚动，节点多时在 .type-left-tree 内滚动

## 验证与归属
- 验证：会话 bb65a7e2 用户要求树边框高度固定不随数据缩短，结论明确两点 CSS 根因及 RegionTreeLayout.vue 修改方式
- 涉及文件：zhi2-web-admin/src/views/property/complex/components/RegionTreeLayout.vue、zhi2-web-admin/src/views/property/complex/components/regionTree.vue
- 所属项目：园区物管2.0；来源会话：bb65a7e2-6e02-4948-ae2d-480611ff86ef；代码基线：49e7729ce

<!-- MEMORY_FIELDS
{
  "category": "布局缺陷根因",
  "name": "region_tree_border_height",
  "source_extraction_id": "681170c36c0a48678c1d9fd2cb28823e",
  "version": 1,
  "memory_type": "entities"
}
-->