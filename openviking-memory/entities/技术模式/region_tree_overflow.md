# 区域树列表页固定高度溢出致分页不可见
园区物管2.0 带左侧区域树的列表页因固定视口高度 + overflow:hidden，将底部分页栏挤出可视区域。

## 根因
- 列表页使用固定视口高度 calc(100vh - 120px) 且 overflow: hidden，表格按 10 行计算高度，底部分页栏被挤出可视区域不可见。

## 解决方案
- index.scss 调整布局令 list-card 占满剩余高度。
- zs-table.vue 在 .list-container .region-tree-layout .list-card 内启用 fill-height，使表格容器内滚动。
- 惠及 assetsLeaseContractFiling 等使用 RegionTreeLayout 的页面。

## 验证与归属
- 验证：cursor 会话 93dc00ea-d07f-4b3d-ba3e-0060780b7cdb。
- 涉及文件：benefit/assetsLeaseContractFiling/index.vue、benefit/resourcesLeaseContractFiling/index.vue、benefit/parkingSpaceContractFiling/index.vue、mixins/listMixins.js、property/complex/components/RegionTreeLayout.vue、mixins/table.js、styles/index.scss、components/zs-pagination/zs-pagination.vue。
- 来源会话：93dc00ea-d07f-4b3d-ba3e-0060780b7cdb。

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_overflow",
  "source_extraction_id": "59460bd227de48aaac7eed677d51a6cc",
  "version": 1,
  "memory_type": "entities"
}
-->