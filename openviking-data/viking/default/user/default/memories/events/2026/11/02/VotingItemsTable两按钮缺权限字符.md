# VotingItemsTable两按钮缺权限字符

VotingItemsTable.vue中viewDecisionDetailButton与resultButton仅设permission: true未设permissionType，导致zs-operate-column无法拼接有效权限字符；需补充对应permissionType值。

**验证证据**：extracted source=cursor session=7136a5c8-1c00-4f90-aefc-bd46f28f354f

**涉及文件**：d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/multiply/components/VotingItemsTable.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/mixins/subTableMixins.js、d:/repository/园区物管2.0/zhi2-web-admin/src/mixins/table.js、d:/repository/园区物管2.0/zhi2-web-admin/src/components/zs-operate-column/zs-operate-column.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/mixins/permsMixins.js、d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/repair/detail.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/election/owner/vote/detail.vue、d:/repository/园区物管2.0/zhi2-web-admin/src/views/autonomy/multiply/detail.vue

**所属项目**：园区物管2.0
**来源会话**：7136a5c8-1c00-4f90-aefc-bd46f28f354f
**代码基线**：none
<!-- MEMORY_FIELDS
{
  "event_name": "调整 VotingItemsTable 中的权限",
  "goal": "为按钮添加 permissionType",
  "summary": "",
  "ranges": "15-20",
  "source_extraction_id": "d844f94ca9c9437188f0c9b246ecc583",
  "version": 1,
  "memory_type": "events"
}
-->