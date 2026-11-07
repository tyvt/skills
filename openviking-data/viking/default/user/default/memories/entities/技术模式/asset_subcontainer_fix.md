# 修复因缺少 sub-container 导致的资产表格无竖线问题
表格的全局竖线仅出现在位于 `.sub-container` 内且 `border` 激活的表格中；模块 benefit/assetLeaseApply 的 `houseTable.vue` 已调整为使用 sub-container。

## 解决方案
- `houseTable.vue` 现已被 `sub-container` 包裹
- 序号列宽度改为 80px
- 数据列增加了 `min-width`
- 预计租金值列添加了 `slot-width='120'` 以修正间距

## 涉及的文件
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/houseTable.vue
- zhi2-web-admin/src/components/zs-table/zs-table.vue
- zhi2-web-admin/src/styles/index.scss
- zhi2-web-admin/src/components/zs-table-column/zs-table-column.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subVenueTable.vue
- zhi2-web-admin/src/components/Headline/index.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subAdvertiseTable.vue
- zhi2-web-admin/src/views/benefit/assetLeaseApply/components/subOtherTable.vue

## 验证
- 源会话: 598aac99-dabd-44cd-9cf8-08c0eb4260e3 (extracted source=cursor)
- 代码基线: none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "asset_subcontainer_fix",
  "source_extraction_id": "1a2b75746c8a4c628333ce0a17314818",
  "version": 1,
  "memory_type": "entities"
}
-->