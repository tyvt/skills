# 区域树列表页翻页栏不显示修复
无锡市区G项目zhi2-web-admin中，带左侧区域树的列表页因固定视口高度且overflow:hidden，分页栏被挤出，已通过调整布局与表格fill-height修复。

## 根因
- 区域树列表页使用calc(100vh - 120px)固定视口高度且overflow:hidden
- 表格默认按10行计算固定高度，底部分页栏被挤出可视区域

## 修复方案
- index.scss调整：搜索区、说明文字、工具栏不收缩，list-card占满剩余高度，表格容器在剩余空间内收缩为分页留位
- zs-table.vue在区域树列表页(.list-container .region-tree-layout .list-card)内自动启用fill-height，表格容器内滚动

## 影响范围
- 经营资产租赁合同(assetsLeaseContractFiling)
- 经营资源租赁合同(resourcesLeaseContractFiling)
- 停车泊位租赁管理(parkingSpaceContractFiling)
- 所有使用RegionTreeLayout的列表页

## 验证与来源
- 验证：src=无锡市区G（会话93dc00ea-d07f-4b3d-ba3e-0060780b7cdb）
- 涉及文件：index.scss、zs-table.vue等
- 代码基线：none

## 验证与归属
- 所属项目：无锡市区G
- 验证证据：extracted source=cursor project=无锡市区G
- 来源会话：93dc00ea-d07f-4b3d-ba3e-0060780b7cdb


<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "region_tree_pagination",
  "source_extraction_id": "487b125f28014405af5c516b05a5f94f",
  "version": 1,
  "memory_type": "entities"
}
-->
