# 序号列宽60透传绕过全局80致表头截断
页面传 width="60" 在 zs-table-column.vue 原样透传，绕过全局 FIXED_TYPE_WIDTH=80，致扣除 padding 后表头「序号」被 ellipsis 裁切不全。

## 问题根因
- 页面传 width="60" 在 zs-table-column.vue 原样透传，未与全局 FIXED_TYPE_WIDTH=80 取较大值
- 扣除 padding 后可用宽度不足，表头「序号」被 ellipsis 裁切显示不全

## 修复方案
- zs-table-column.vue 改为取 width 与 80px 较大值
- 新增 table-header--fixed 类关闭 ellipsis 避免表头截断
- BuildingDialog.vue、SelectRoomDialog.vue、RegulatoryAccountDialog.vue、VotingItemsDialog.vue 原生列宽改为 80

## 验证与归属
- 验证证据：src=苏州市房地产监测V3/136.md
- 涉及文件：zs-table-column.vue、styles/index.scss、zs-table.vue、dataEntryDetail/index.vue、ListTemplate.js、RelatedBuildingsTable.vue、bankTable.vue、JymxTable.vue
- 来源会话：361222fd-00ea-45a7-a172-1112a1552ff8；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "seq_col_truncate",
  "source_extraction_id": "622bc94388724ad38c296348aac87c4e",
  "version": 2,
  "memory_type": "entities"
}
-->